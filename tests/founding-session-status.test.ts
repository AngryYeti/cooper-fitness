import assert from "node:assert/strict";
import { before, test } from "node:test";
import {
  fetchFoundingFulfillmentStatus,
  isConfirmedFoundingSession,
  verifyFoundingSessionWithDependencies,
  type FoundingSessionLike,
} from "../src/lib/founding/session-status";
import { FOUNDING_STRIPE_PRICE_ID, FOUNDING_STRIPE_PRODUCT_ID } from "../src/lib/founding/types";

const validSession: FoundingSessionLike = {
  status: "complete",
  mode: "payment",
  payment_status: "paid",
  payment_intent: "pi_test",
  metadata: {
    campaign: "founding-fathers-2026",
    offer: "12-week-coaching",
    cohort: "founding",
  },
  line_items: {
    has_more: false,
    data: [{
      quantity: 1,
      amount_total: 39900,
      currency: "usd",
      price: {
        id: FOUNDING_STRIPE_PRICE_ID,
        product: FOUNDING_STRIPE_PRODUCT_ID,
      },
    }],
  },
};

before(() => {
  process.env.FOUNDING_HOMEPAGE_ENABLED = "true";
  process.env.FOUNDING_CHECKOUT_ENABLED = "true";
  process.env.FOUNDING_CRM_ORIGIN = "https://crm.example.com";
  process.env.FOUNDING_INTERNAL_API_SECRET = "a".repeat(40);
  process.env.NEXT_PUBLIC_SITE_URL = "https://cooper.fitness";
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL = "support@cooper.fitness";
  process.env.NEXT_PUBLIC_FOUNDING_TERMS_URL = "https://cooper.fitness/terms";
  process.env.NEXT_PUBLIC_FOUNDING_PRIVACY_URL = "https://cooper.fitness/privacy";
  process.env.NEXT_PUBLIC_FOUNDING_REFUND_POLICY_URL = "https://cooper.fitness/refunds";
  process.env.FOUNDING_STRIPE_PRICE_ID = FOUNDING_STRIPE_PRICE_ID;
  process.env.FOUNDING_STRIPE_PRODUCT_ID = FOUNDING_STRIPE_PRODUCT_ID;
});

test("session verifier confirms only the exact paid founding offer", () => {
  assert.equal(isConfirmedFoundingSession(validSession, FOUNDING_STRIPE_PRICE_ID, FOUNDING_STRIPE_PRODUCT_ID), true);
});

test("session verifier rejects untrusted amount, product, metadata, or payment state", () => {
  for (const change of [
    { payment_status: "unpaid" },
    { mode: "subscription" },
    { payment_intent: null },
    { metadata: { ...validSession.metadata, campaign: "other" } },
    { line_items: { data: [{ ...validSession.line_items!.data![0], amount_total: 39901 }] } },
    { line_items: { data: [{ ...validSession.line_items!.data![0], currency: "cad" }] } },
    { line_items: { data: [{ ...validSession.line_items!.data![0], price: { id: "price_other", product: FOUNDING_STRIPE_PRODUCT_ID } }] } },
  ]) {
    assert.equal(isConfirmedFoundingSession({ ...validSession, ...change }, FOUNDING_STRIPE_PRICE_ID, FOUNDING_STRIPE_PRODUCT_ID), false);
  }
});

test("session verifier rejects an extra line item", () => {
  assert.equal(isConfirmedFoundingSession({
    ...validSession,
    line_items: {
      data: [
        ...validSession.line_items!.data!,
        { ...validSession.line_items!.data![0] },
      ],
    },
  }, FOUNDING_STRIPE_PRICE_ID, FOUNDING_STRIPE_PRODUCT_ID), false);
});

test("session verifier rejects a line-item list with more items than returned", () => {
  assert.equal(isConfirmedFoundingSession({
    ...validSession,
    line_items: { has_more: true, data: validSession.line_items!.data },
  }, FOUNDING_STRIPE_PRICE_ID, FOUNDING_STRIPE_PRODUCT_ID), false);
});

test("session verifier rejects an omitted has_more flag", () => {
  const withoutFlag = { ...validSession.line_items! };
  delete withoutFlag.has_more;
  assert.equal(isConfirmedFoundingSession({
    ...validSession,
    line_items: withoutFlag,
  }, FOUNDING_STRIPE_PRICE_ID, FOUNDING_STRIPE_PRODUCT_ID), false);
});

test("paid exact Stripe session confirms only after CRM fulfillment is FULFILLED", async () => {
  const retrieveStripe = async () => validSession;
  assert.equal(await verifyFoundingSessionWithDependencies("cs_test", retrieveStripe, async () => "FULFILLED"), "confirmed");
  assert.equal(await verifyFoundingSessionWithDependencies("cs_test", retrieveStripe, async () => "PROCESSING"), "processing");
  assert.equal(await verifyFoundingSessionWithDependencies("cs_test", retrieveStripe, async () => "NOT_FOUND"), "processing");
});

test("CRM outage and malformed fulfillment data remain processing after exact paid Stripe validation", async () => {
  const retrieveStripe = async () => validSession;
  assert.equal(await verifyFoundingSessionWithDependencies("cs_test", retrieveStripe, async () => { throw new Error("offline"); }), "processing");
  assert.equal(await verifyFoundingSessionWithDependencies("cs_test", retrieveStripe, async () => null), "processing");
});

test("invalid Stripe sessions never call CRM or claim payment", async () => {
  let crmCalls = 0;
  const invalid = { ...validSession, payment_status: "unpaid" };
  assert.equal(await verifyFoundingSessionWithDependencies("cs_test", async () => invalid, async () => {
    crmCalls += 1;
    return "FULFILLED";
  }), "not_confirmed");
  assert.equal(crmCalls, 0);
});

test("CRM fulfillment status request is server-authenticated and bounded", async () => {
  const originalFetch = globalThis.fetch;
  let request: Request | undefined;
  globalThis.fetch = async (input, init) => {
    request = new Request(String(input), init);
    return new Response(JSON.stringify({ state: "FULFILLED" }), { status: 200 });
  };
  try {
    assert.equal(await fetchFoundingFulfillmentStatus("cs_test"), "FULFILLED");
    assert.equal(request?.url, "https://crm.example.com/api/founding/session-status?session_id=cs_test");
    assert.equal(request?.method, "GET");
    assert.equal(request?.headers.get("authorization"), `Bearer ${"a".repeat(40)}`);
    assert.equal(request?.cache, "no-store");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
