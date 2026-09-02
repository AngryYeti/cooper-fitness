import assert from "node:assert/strict";
import { before, test } from "node:test";
import {
  clientIp,
  consumeCheckoutRateLimit,
  consumeSessionStatusRateLimit,
  createFoundingCheckout,
  fetchFoundingInventory,
  getCheckoutRateLimitSize,
  isSameOrigin,
  parseFoundingInventory,
} from "../src/lib/founding/client";
import type { FoundingConfig } from "../src/lib/founding/types";
import { GET as inventoryGET } from "../src/app/api/founding/inventory/route";
import { POST as checkoutPOST } from "../src/app/api/founding/checkout-session/route";

const config: FoundingConfig = {
  homepageEnabled: true,
  checkoutEnabled: true,
  crmOrigin: "https://crm.example.com",
  internalApiSecret: "a".repeat(40),
  siteOrigin: "https://cooper.fitness",
  supportEmail: "support@cooper.fitness",
  termsUrl: "https://cooper.fitness/terms",
  privacyUrl: "https://cooper.fitness/privacy",
  refundPolicyUrl: "https://cooper.fitness/refunds",
};

function inventoryResponse(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

before(() => {
  process.env.FOUNDING_HOMEPAGE_ENABLED = "true";
  process.env.FOUNDING_CHECKOUT_ENABLED = "true";
  process.env.FOUNDING_CRM_ORIGIN = config.crmOrigin;
  process.env.FOUNDING_INTERNAL_API_SECRET = config.internalApiSecret;
  process.env.NEXT_PUBLIC_SITE_URL = config.siteOrigin;
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL = config.supportEmail;
  process.env.NEXT_PUBLIC_FOUNDING_TERMS_URL = config.termsUrl;
  process.env.NEXT_PUBLIC_FOUNDING_PRIVACY_URL = config.privacyUrl;
  process.env.NEXT_PUBLIC_FOUNDING_REFUND_POLICY_URL = config.refundPolicyUrl;
  process.env.FOUNDING_STRIPE_PRICE_ID = "price_1UBFsOK67H8U3fOqRw3dEIhw";
  process.env.FOUNDING_STRIPE_PRODUCT_ID = "prod_VBd8KVVN9wW0cM";
});

test("inventory parser accepts a complete valid projection", () => {
  assert.deepEqual(parseFoundingInventory({
    state: "HELD",
    purchased_count: 2,
    pending_count: 3,
    capacity: 5,
  }), {
    state: "HELD",
    purchasedCount: 2,
    pendingCount: 3,
    capacity: 5,
  });
});

test("partial or inconsistent OPEN inventory fails closed", () => {
  for (const body of [
    { state: "OPEN" },
    { state: "OPEN", purchased_count: 1, pending_count: 0, capacity: 1 },
    { state: "OPEN", purchased_count: -1, pending_count: 0, capacity: 5 },
    { state: "OPEN", purchased_count: 1.5, pending_count: 0, capacity: 5 },
    { state: "HELD", purchased_count: 1, pending_count: 0, capacity: 5 },
    { state: "HELD", purchased_count: 4, pending_count: 2, capacity: 5 },
  ]) {
    assert.deepEqual(parseFoundingInventory(body), {
      state: "FULL",
      purchasedCount: 0,
      pendingCount: 0,
      capacity: 0,
    });
  }
});

test("inventory semantics keep partial capacity OPEN and full pending capacity HELD", () => {
  assert.deepEqual(parseFoundingInventory({
    state: "OPEN",
    purchased_count: 2,
    pending_count: 1,
    capacity: 5,
  }), {
    state: "OPEN",
    purchasedCount: 2,
    pendingCount: 1,
    capacity: 5,
  });
  assert.deepEqual(parseFoundingInventory({
    state: "HELD",
    purchased_count: 2,
    pending_count: 3,
    capacity: 5,
  }), {
    state: "HELD",
    purchasedCount: 2,
    pendingCount: 3,
    capacity: 5,
  });
  assert.deepEqual(parseFoundingInventory({
    state: "HELD",
    purchased_count: 2,
    pending_count: 1,
    capacity: 5,
  }).state, "FULL");
});

test("inventory route returns a no-store zero FULL DTO for malformed CRM data", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => inventoryResponse({ state: "OPEN" });
  try {
    const response = await inventoryGET();
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.deepEqual(await response.json(), {
      state: "FULL",
      purchasedCount: 0,
      pendingCount: 0,
      capacity: 0,
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("inventory client sends the internal bearer and no-store request", async () => {
  const originalFetch = globalThis.fetch;
  let request: Request | undefined;
  globalThis.fetch = async (input, init) => {
    request = new Request(String(input), init);
    return inventoryResponse({ state: "OPEN", purchased_count: 1, pending_count: 0, capacity: 5 });
  };
  try {
    assert.deepEqual(await fetchFoundingInventory(config), {
      state: "OPEN",
      purchasedCount: 1,
      pendingCount: 0,
      capacity: 5,
    });
    assert.equal(request?.url, "https://crm.example.com/api/founding/inventory");
    assert.equal(request?.headers.get("authorization"), `Bearer ${config.internalApiSecret}`);
    assert.equal(request?.cache, "no-store");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("same-origin protection accepts configured Origin or Host and rejects mismatches", () => {
  assert.equal(isSameOrigin(new Request("https://cooper.fitness/api/founding/checkout-session", {
    headers: { Origin: "https://cooper.fitness" },
  }), config.siteOrigin), true);
  assert.equal(isSameOrigin(new Request("https://cooper.fitness/api/founding/checkout-session", {
    headers: { Origin: "https://evil.example" },
  }), config.siteOrigin), false);
  assert.equal(isSameOrigin(new Request("https://cooper.fitness/api/founding/checkout-session", {
    headers: { Host: "cooper.fitness" },
  }), config.siteOrigin), true);
  assert.equal(isSameOrigin(new Request("https://cooper.fitness/api/founding/checkout-session", {
    headers: { Host: "evil.example" },
  }), config.siteOrigin), false);
});

test("non-Vercel forwarding headers share a stable fallback bucket", () => {
  const first = new Request("https://cooper.fitness/api/founding/checkout-session", {
    headers: { "x-forwarded-for": "198.51.100.1", "x-real-ip": "198.51.100.1" },
  });
  const second = new Request("https://cooper.fitness/api/founding/checkout-session", {
    headers: { "x-forwarded-for": "198.51.100.2", "x-real-ip": "198.51.100.2" },
  });
  assert.equal(clientIp(first), clientIp(second));
  assert.equal(clientIp(new Request("https://cooper.fitness", {
    headers: { "x-vercel-id": "yyz1::abc", "x-vercel-forwarded-for": "203.0.113.10" },
  })), "203.0.113.10");
});

test("rate limiter exhausts a bucket and evicts expired and excess entries", () => {
  const now = 1_000_000;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    assert.equal(consumeCheckoutRateLimit("stable", now).allowed, true);
  }
  assert.equal(consumeCheckoutRateLimit("stable", now).allowed, false);
  for (let index = 0; index < 2_000; index += 1) {
    consumeCheckoutRateLimit(`ip-${index}`, now);
  }
  assert.ok(getCheckoutRateLimitSize() <= 1_024);
  assert.equal(consumeCheckoutRateLimit("stable", now + 10 * 60 * 1000 + 1).allowed, true);
});

test("session-status limiter is separate and larger than checkout capacity", () => {
  const now = 2_000_000;
  for (let attempt = 0; attempt < 60; attempt += 1) {
    assert.equal(consumeSessionStatusRateLimit("shared-ip", now).allowed, true);
  }
  assert.equal(consumeSessionStatusRateLimit("shared-ip", now).allowed, false);
  assert.equal(consumeCheckoutRateLimit("shared-ip", now).allowed, true);
});

test("checkout route filters CRM response to hosted URL and expiry", async () => {
  const originalFetch = globalThis.fetch;
  let request: Request | undefined;
  globalThis.fetch = async (input, init) => {
    request = new Request(String(input), init);
    return new Response(JSON.stringify({
      checkout_url: "https://checkout.stripe.com/c/pay/cs_test",
      reservation_expires_at: "2030-01-02T03:04:05.000Z",
      stripe_session_id: "cs_test",
      customer_id: "cus_test",
    }), { status: 200, headers: { "Content-Type": "application/json" } });
  };
  try {
    const response = await checkoutPOST(new Request("https://cooper.fitness/api/founding/checkout-session", {
      method: "POST",
      headers: { Origin: "https://cooper.fitness", "Content-Type": "application/json", "x-real-ip": "192.0.2.2" },
      body: JSON.stringify({ name: "  Jane   Doe ", email: " JANE@example.com " }),
    }));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      checkoutUrl: "https://checkout.stripe.com/c/pay/cs_test",
      expiresAt: "2030-01-02T03:04:05.000Z",
    });
    assert.equal(request?.headers.get("authorization"), `Bearer ${config.internalApiSecret}`);
    assert.deepEqual(await request?.json(), { name: "Jane Doe", email: "jane@example.com" });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("checkout rejects non-HTTPS URLs and malformed expiry values", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({
    checkout_url: "http://checkout.example/pay",
    reservation_expires_at: "not-a-date",
  }), { status: 200 });
  try {
    await assert.rejects(
      createFoundingCheckout(config, { name: "Jane Doe", email: "jane@example.com" }),
      /unavailable/,
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("checkout rejects arbitrary HTTPS hosts, suffix attacks, credentials, and non-HTTPS URLs", async () => {
  const originalFetch = globalThis.fetch;
  const urls = [
    "https://evil.example/pay",
    "https://checkout.stripe.com.evil.example/c/pay/cs_test",
    "https://user:pass@checkout.stripe.com/c/pay/cs_test",
    "http://checkout.stripe.com/c/pay/cs_test",
  ];
  try {
    for (const checkoutUrl of urls) {
      globalThis.fetch = async () => new Response(JSON.stringify({
        checkout_url: checkoutUrl,
        reservation_expires_at: "2030-01-02T03:04:05.000Z",
      }), { status: 200 });
      await assert.rejects(
        createFoundingCheckout(config, { name: "Jane Doe", email: "jane@example.com" }),
        /unavailable/,
      );
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});
