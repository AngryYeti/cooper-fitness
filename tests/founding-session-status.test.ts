import assert from "node:assert/strict";
import { test } from "node:test";
import { isConfirmedFoundingSession, type FoundingSessionLike } from "../src/lib/founding/session-status";

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
        id: "price_founder",
        product: "prod_founder",
      },
    }],
  },
};

test("session verifier confirms only the exact paid founding offer", () => {
  assert.equal(isConfirmedFoundingSession(validSession, "price_founder", "prod_founder"), true);
});

test("session verifier rejects untrusted amount, product, metadata, or payment state", () => {
  for (const change of [
    { payment_status: "unpaid" },
    { mode: "subscription" },
    { payment_intent: null },
    { metadata: { ...validSession.metadata, campaign: "other" } },
    { line_items: { data: [{ ...validSession.line_items!.data![0], amount_total: 29901 }] } },
    { line_items: { data: [{ ...validSession.line_items!.data![0], currency: "cad" }] } },
    { line_items: { data: [{ ...validSession.line_items!.data![0], price: { id: "price_other", product: "prod_founder" } }] } },
  ]) {
    assert.equal(isConfirmedFoundingSession({ ...validSession, ...change }, "price_founder", "prod_founder"), false);
  }
});
