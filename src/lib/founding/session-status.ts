import "server-only";
import { getStripe } from "@/lib/stripe";
import { getFoundingConfig } from "./config";
import { FOUNDING_STRIPE_PRICE_ID, FOUNDING_STRIPE_PRODUCT_ID } from "./types";

export const FOUNDING_PRODUCT_NAME = "Cooper Fitness Founding Fathers — Six-Month Coaching";
export const FOUNDING_CAMPAIGN = "founding-fathers-2026";
export const FOUNDING_OFFER = "six-month-coaching";
export const FOUNDING_COHORT = "founding";
export const FOUNDING_AMOUNT = 29900;
export const FOUNDING_CURRENCY = "usd";

export type FoundingFulfillmentState = "FULFILLED" | "PROCESSING" | "NOT_FOUND";
export type FoundingSessionVerification = "confirmed" | "processing" | "not_confirmed";

export type FoundingSessionLike = {
  status?: string | null;
  mode?: string | null;
  payment_status?: string | null;
  payment_intent?: string | { id?: string | null } | null;
  metadata?: Record<string, string | undefined> | null;
  line_items?: {
    has_more?: boolean;
    data?: Array<{
      quantity?: number | null;
      amount_total?: number | null;
      currency?: string | null;
      price?: {
        id?: string | null;
        product?: string | { id?: string | null; name?: string | null } | null;
      } | null;
    }>;
  } | null;
};

function configuredId(name: string): string | null {
  const value = process.env[name]?.trim();
  return value || null;
}

function paymentIntentId(value: FoundingSessionLike["payment_intent"]): string | null {
  if (typeof value === "string") return value || null;
  if (value && typeof value === "object" && typeof value.id === "string") return value.id || null;
  return null;
}

function productId(value: string | { id?: string | null; name?: string | null } | null | undefined): string | null {
  if (typeof value === "string") return value || null;
  if (value && typeof value === "object" && typeof value.id === "string") return value.id || null;
  return null;
}

export function isConfirmedFoundingSession(
  session: FoundingSessionLike,
  expectedPriceId: string,
  expectedProductId: string,
): boolean {
  if (expectedPriceId !== FOUNDING_STRIPE_PRICE_ID || expectedProductId !== FOUNDING_STRIPE_PRODUCT_ID) return false;
  const item = session.line_items?.data?.[0];
  const price = item?.price;
  const metadata = session.metadata;
  const product = price?.product;

  return session.line_items?.has_more === false
    && session.line_items?.data?.length === 1
    && session.status === "complete"
    && session.mode === "payment"
    && session.payment_status === "paid"
    && Boolean(paymentIntentId(session.payment_intent))
    && metadata?.campaign === FOUNDING_CAMPAIGN
    && metadata.offer === FOUNDING_OFFER
    && metadata.cohort === FOUNDING_COHORT
    && item?.quantity === 1
    && item.amount_total === FOUNDING_AMOUNT
    && item.currency?.toLowerCase() === FOUNDING_CURRENCY
    && price?.id === expectedPriceId
    && productId(product) === expectedProductId
    && (typeof product !== "object" || product === null || product.name === FOUNDING_PRODUCT_NAME);
}

export function parseFoundingFulfillmentStatus(input: unknown): FoundingFulfillmentState | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const value = input as Record<string, unknown>;
  if (Object.keys(value).length !== 1 || !Object.hasOwn(value, "state")) return null;
  return value.state === "FULFILLED" || value.state === "PROCESSING" || value.state === "NOT_FOUND"
    ? value.state
    : null;
}

export async function fetchFoundingFulfillmentStatus(sessionId: string): Promise<FoundingFulfillmentState | null> {
  try {
    const config = getFoundingConfig();
    const response = await fetch(`${config.crmOrigin}/api/founding/session-status?session_id=${encodeURIComponent(sessionId)}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${config.internalApiSecret}`,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    return parseFoundingFulfillmentStatus(await response.json());
  } catch {
    return null;
  }
}

export async function verifyFoundingSessionWithDependencies(
  sessionId: string,
  retrieveStripeSession: (sessionId: string) => Promise<FoundingSessionLike>,
  retrieveFulfillmentStatus: (sessionId: string) => Promise<FoundingFulfillmentState | null>,
): Promise<FoundingSessionVerification> {
  const expectedPriceId = configuredId("FOUNDING_STRIPE_PRICE_ID");
  const expectedProductId = configuredId("FOUNDING_STRIPE_PRODUCT_ID");
  if (expectedPriceId !== FOUNDING_STRIPE_PRICE_ID || expectedProductId !== FOUNDING_STRIPE_PRODUCT_ID || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return "not_confirmed";

  let session: FoundingSessionLike;
  try {
    session = await retrieveStripeSession(sessionId);
  } catch {
    return "not_confirmed";
  }

  if (!isConfirmedFoundingSession(session, expectedPriceId, expectedProductId)) return "not_confirmed";

  try {
    return await retrieveFulfillmentStatus(sessionId) === "FULFILLED" ? "confirmed" : "processing";
  } catch {
    return "processing";
  }
}

export async function verifyFoundingSession(sessionId: string): Promise<FoundingSessionVerification> {
  return verifyFoundingSessionWithDependencies(
    sessionId,
    async (id) => getStripe().checkout.sessions.retrieve(id, {
      expand: ["line_items.data.price.product"],
    }) as Promise<FoundingSessionLike>,
    fetchFoundingFulfillmentStatus,
  );
}
