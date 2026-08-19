import assert from "node:assert/strict";
import { test } from "node:test";
import { FoundingConfigError, getFoundingConfig } from "../src/lib/founding/config";

const exactPrice = "price_1U5WCxK67H8U3fOqXS60McFP";
const exactProduct = "prod_V5hcsMgIEK4Srk";

function setValidEnv() {
  process.env.FOUNDING_HOMEPAGE_ENABLED = "true";
  process.env.FOUNDING_CHECKOUT_ENABLED = "true";
  process.env.FOUNDING_CRM_ORIGIN = "https://crm.example.com";
  process.env.FOUNDING_INTERNAL_API_SECRET = "a".repeat(40);
  process.env.NEXT_PUBLIC_SITE_URL = "https://cooper.fitness";
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL = "support@cooper.fitness";
  process.env.NEXT_PUBLIC_FOUNDING_TERMS_URL = "https://cooper.fitness/legal/terms?campaign=founding";
  process.env.NEXT_PUBLIC_FOUNDING_PRIVACY_URL = "https://cooper.fitness/legal/privacy";
  process.env.NEXT_PUBLIC_FOUNDING_REFUND_POLICY_URL = "https://cooper.fitness/legal/refunds";
  process.env.FOUNDING_STRIPE_PRICE_ID = exactPrice;
  process.env.FOUNDING_STRIPE_PRODUCT_ID = exactProduct;
}

test("founding config preserves configured legal URL paths and query strings", () => {
  setValidEnv();
  const config = getFoundingConfig();
  assert.equal(config.termsUrl, "https://cooper.fitness/legal/terms?campaign=founding");
  assert.equal(config.privacyUrl, "https://cooper.fitness/legal/privacy");
  assert.equal(config.refundPolicyUrl, "https://cooper.fitness/legal/refunds");
});

test("founding config rejects any Stripe IDs other than the approved offer", () => {
  setValidEnv();
  process.env.FOUNDING_STRIPE_PRICE_ID = "price_other";
  assert.throws(() => getFoundingConfig(), FoundingConfigError);
  setValidEnv();
  process.env.FOUNDING_STRIPE_PRODUCT_ID = "prod_other";
  assert.throws(() => getFoundingConfig(), FoundingConfigError);
});
