import "server-only";
import type {
  FoundingCheckoutResult,
  FoundingConfig,
  FoundingInventory,
  FoundingPurchaser,
} from "./types";
import { FOUNDING_CHECKOUT_HOST } from "./types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_MAX_ENTRIES = 1024;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();
const STATUS_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const STATUS_RATE_LIMIT_MAX = 60;
const STATUS_RATE_LIMIT_MAX_ENTRIES = 2048;
const statusRateLimitBuckets = new Map<string, { count: number; resetAt: number }>();
const FULL_INVENTORY: FoundingInventory = {
  state: "FULL",
  purchasedCount: 0,
  pendingCount: 0,
  capacity: 0,
};


export class FoundingProxyError extends Error {
  readonly status: number;

  constructor(message: string, status = 503) {
    super(message);
    this.name = "FoundingProxyError";
    this.status = status;
  }
}

function authorization(secret: string): string {
  // Keep the secret in a server-only module and never include it in a public DTO.
  return `Bearer ${secret}`;
}

function crmHeaders(config: FoundingConfig): HeadersInit {
  return {
    Accept: "application/json",
    Authorization: authorization(config.internalApiSecret),
  };
}

async function crmRequest(config: FoundingConfig, path: string, init?: RequestInit): Promise<Response> {
  try {
    return await fetch(`${config.crmOrigin}${path}`, {
      ...init,
      headers: { ...crmHeaders(config), ...(init?.headers ?? {}) },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    throw new FoundingProxyError("Founding service unavailable");
  }
}

export function parseFoundingInventory(input: unknown): FoundingInventory {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { ...FULL_INVENTORY };
  const value = input as Record<string, unknown>;
  const state = value.state;
  const purchasedCount = value.purchased_count;
  const pendingCount = value.pending_count;
  const capacity = value.capacity;
  const validState = state === "OPEN" || state === "HELD" || state === "FULL";
  const validNumbers = [purchasedCount, pendingCount, capacity].every(
    (count) => typeof count === "number" && Number.isSafeInteger(count) && count >= 0,
  );
  if (!validState || !validNumbers) return { ...FULL_INVENTORY };

  const purchased = purchasedCount as number;
  const pending = pendingCount as number;
  const total = purchased + pending;
  const validCapacity = capacity as number;
  if (purchased > validCapacity || pending > validCapacity || total > validCapacity) {
    return { ...FULL_INVENTORY };
  }
  const expectedState = purchased >= validCapacity
    ? "FULL"
    : total < validCapacity
      ? "OPEN"
      : pending > 0
        ? "HELD"
        : null;
  const stateConsistent = expectedState !== null && state === expectedState;
  if (!stateConsistent) return { ...FULL_INVENTORY };
  return {
    state,
    purchasedCount: purchased,
    pendingCount: pending,
    capacity: validCapacity,
  };
}

export async function fetchFoundingInventory(config: FoundingConfig): Promise<FoundingInventory> {
  const response = await crmRequest(config, "/api/founding/inventory");
  if (!response.ok) throw new FoundingProxyError("Founding inventory unavailable");

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new FoundingProxyError("Founding inventory unavailable");
  }
  return parseFoundingInventory(body);
}

export function parseFoundingPurchaser(input: unknown): FoundingPurchaser {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new FoundingProxyError("Invalid purchaser", 400);
  }
  const value = input as Record<string, unknown>;
  if (Object.keys(value).some((key) => key !== "name" && key !== "email")) {
    throw new FoundingProxyError("Invalid purchaser", 400);
  }
  if (typeof value.name !== "string" || typeof value.email !== "string") {
    throw new FoundingProxyError("Invalid purchaser", 400);
  }
  const name = value.name.trim().replace(/\s+/g, " ");
  const email = value.email.trim().toLowerCase();
  if (name.length < 1 || name.length > 100 || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    throw new FoundingProxyError("Invalid purchaser", 400);
  }
  return { name, email };
}

export async function createFoundingCheckout(
  config: FoundingConfig,
  purchaser: FoundingPurchaser,
): Promise<FoundingCheckoutResult> {
  const response = await crmRequest(config, "/api/founding/checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: purchaser.name, email: purchaser.email }),
  });
  if (!response.ok) {
    throw new FoundingProxyError("Founding checkout unavailable", response.status === 409 ? 409 : 503);
  }

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new FoundingProxyError("Founding checkout unavailable");
  }
  const value = body && typeof body === "object" ? body as Record<string, unknown> : {};
  const checkoutUrl = typeof value.checkout_url === "string" ? value.checkout_url : "";
  const expiresAt = typeof value.reservation_expires_at === "string" ? value.reservation_expires_at : "";
  let parsedUrl: URL;
  if (!checkoutUrl || !expiresAt) throw new FoundingProxyError("Founding checkout unavailable");
  try {
    parsedUrl = new URL(checkoutUrl);
    if (parsedUrl.protocol !== "https:" || parsedUrl.hostname.toLowerCase() !== FOUNDING_CHECKOUT_HOST || parsedUrl.username || parsedUrl.password || parsedUrl.port) {
      throw new Error("unapproved checkout URL");
    }
    if (Number.isNaN(Date.parse(expiresAt))) throw new Error("invalid expiry");
  } catch {
    throw new FoundingProxyError("Founding checkout unavailable");
  }
  return { checkoutUrl: parsedUrl.toString(), expiresAt: new Date(expiresAt).toISOString() };
}

function normalizedOrigin(value: string): string | null {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export function isSameOrigin(request: Request, configuredOrigin: string): boolean {
  const expectedOrigin = configuredOrigin;
  const expected = normalizedOrigin(expectedOrigin);
  if (!expected) return false;
  const origin = request.headers.get("Origin");
  if (origin) return normalizedOrigin(origin) === expected;
  const host = request.headers.get("Host");
  if (!host) return false;
  return host.toLowerCase() === new URL(expected).host.toLowerCase();
}

export function clientIp(request: Request): string {
  if (request.headers.get("x-vercel-id")?.trim()) {
    const forwarded = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
    return forwarded || "vercel-unknown";
  }
  return "untrusted-request";
}

export function consumeCheckoutRateLimit(ip: string, now = Date.now()): { allowed: boolean; retryAfter: number } {
  for (const [key, bucket] of rateLimitBuckets) {
    if (bucket.resetAt <= now) rateLimitBuckets.delete(key);
  }
  const current = rateLimitBuckets.get(ip);
  if (!current || current.resetAt <= now) {
    if (rateLimitBuckets.size >= RATE_LIMIT_MAX_ENTRIES) {
      const oldest = rateLimitBuckets.keys().next().value as string | undefined;
      if (oldest) rateLimitBuckets.delete(oldest);
    }
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfter: Math.ceil(RATE_LIMIT_WINDOW_MS / 1000) };
  }
  if (current.count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
  }
  current.count += 1;
  return { allowed: true, retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
}

export function getCheckoutRateLimitSize(): number {
  return rateLimitBuckets.size;
}

export function consumeSessionStatusRateLimit(ip: string, now = Date.now()): { allowed: boolean; retryAfter: number } {
  for (const [key, bucket] of statusRateLimitBuckets) {
    if (bucket.resetAt <= now) statusRateLimitBuckets.delete(key);
  }
  const current = statusRateLimitBuckets.get(ip);
  if (!current || current.resetAt <= now) {
    if (statusRateLimitBuckets.size >= STATUS_RATE_LIMIT_MAX_ENTRIES) {
      const oldest = statusRateLimitBuckets.keys().next().value as string | undefined;
      if (oldest) statusRateLimitBuckets.delete(oldest);
    }
    statusRateLimitBuckets.set(ip, { count: 1, resetAt: now + STATUS_RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfter: Math.ceil(STATUS_RATE_LIMIT_WINDOW_MS / 1000) };
  }
  if (current.count >= STATUS_RATE_LIMIT_MAX) {
    return { allowed: false, retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
  }
  current.count += 1;
  return { allowed: true, retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
}

export function failClosedInventory(status = 503): Response {
  return Response.json(
    FULL_INVENTORY,
    { status, headers: { "Cache-Control": "no-store" } },
  );
}
