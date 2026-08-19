import "server-only";
import type {
  FoundingCheckoutResult,
  FoundingConfig,
  FoundingInventory,
  FoundingPurchaser,
} from "./types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

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

function publicNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : 0;
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
  const value = body && typeof body === "object" ? body as Record<string, unknown> : {};
  const state = value.state === "OPEN" || value.state === "HELD" || value.state === "FULL"
    ? value.state
    : "FULL";
  return {
    state,
    purchasedCount: publicNumber(value.purchased_count),
    pendingCount: publicNumber(value.pending_count),
    capacity: publicNumber(value.capacity),
  };
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
    if (parsedUrl.protocol !== "https:") throw new Error("non-https checkout URL");
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
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function consumeCheckoutRateLimit(ip: string, now = Date.now()): { allowed: boolean; retryAfter: number } {
  for (const [key, bucket] of rateLimitBuckets) {
    if (bucket.resetAt <= now) rateLimitBuckets.delete(key);
  }
  const current = rateLimitBuckets.get(ip);
  if (!current || current.resetAt <= now) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfter: Math.ceil(RATE_LIMIT_WINDOW_MS / 1000) };
  }
  if (current.count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
  }
  current.count += 1;
  return { allowed: true, retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
}

export function failClosedInventory(status = 503): Response {
  return Response.json(
    { state: "FULL", purchasedCount: 0, pendingCount: 0, capacity: 0 },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}
