import assert from "node:assert/strict";
import { test } from "node:test";
import { isConfirmedFoundingSession, type FoundingSessionLike } from "../src/lib/founding/session-status";
import { FOUNDING_STRIPE_PRICE_ID, FOUNDING_STRIPE_PRODUCT_ID } from "../src/lib/founding/types";

const validSession: FoundingSessionLike = {
  status: "complete",
  mode: "payment",
  payment_status: "paid",
  payment_intent: "pi_test",
  metadata: {
    campaign: "founding-fathers-2026",
    offer: "six-month-coaching",
    cohort: "founding",
  },
  line_items: {
    data: [{
      quantity: 1,
      amount_total: 29900,
      currency: "usd",
      price: {
        id: FOUNDING_STRIPE_PRICE_ID,
        product: FOUNDING_STRIPE_PRODUCT_ID,
      },
    }],
  },
};

test("session verifier confirms only the exact paid founding offer", () => {
  assert.equal(isConfirmedFoundingSession(validSession, FOUNDING_STRIPE_PRICE_ID, FOUNDING_STRIPE_PRODUCT_ID), true);
});

test("session verifier rejects untrusted amount, product, metadata, or payment state", () => {
  for (const change of [
    { payment_status: "unpaid" },
    { mode: "subscription" },
    { payment_intent: null },
    { metadata: { ...validSession.metadata, campaign: "other" } },
    { line_items: { data: [{ ...validSession.line_items!.data![0], amount_total: 29901 }] } },
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
