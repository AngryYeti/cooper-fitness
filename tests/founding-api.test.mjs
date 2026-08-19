import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");

test("founding public proxy modules and routes exist", () => {
  for (const path of [
    "src/lib/founding/config.ts",
    "src/lib/founding/types.ts",
    "src/lib/founding/client.ts",
    "src/app/api/founding/inventory/route.ts",
    "src/app/api/founding/checkout-session/route.ts",
  ]) {
    assert.equal(existsSync(new URL(path, root)), true, `${path} is missing`);
  }
});

test("public proxy keeps CRM calls server-side and uses the internal bearer", () => {
  const client = read("src/lib/founding/client.ts");
  const config = read("src/lib/founding/config.ts");
  assert.match(client, /server-only/);
  assert.match(config, /FOUNDING_INTERNAL_API_SECRET/);
  assert.match(client, /Authorization/);
  assert.match(client, /Bearer/);
  assert.match(client, /cache:\s*["']no-store["']/);
  assert.match(client, /checkout_url/);
  assert.match(client, /reservation_expires_at/);
  assert.doesNotMatch(client, /stripe|purchaser records|customer_id/i);
});

test("inventory is a fail-closed public DTO", () => {
  const route = read("src/app/api/founding/inventory/route.ts");
  const client = read("src/lib/founding/client.ts");
  assert.match(client, /OPEN/);
  assert.match(client, /HELD/);
  assert.match(client, /FULL/);
  assert.match(client, /FULL/);
  assert.match(route, /no-store/);
  assert.match(route, /503/);
});

test("checkout validates origin and applies a per-IP rate limit", () => {
  const route = read("src/app/api/founding/checkout-session/route.ts");
  const client = read("src/lib/founding/client.ts");
  assert.match(route, /Origin/);
  assert.match(client, /Host/);
  assert.match(route, /rate/i);
  assert.match(route, /429/);
  assert.match(client, /name/);
  assert.match(client, /email/);
  assert.match(client, /JSON\.stringify\(\{\s*name:\s*purchaser\.name,\s*email:\s*purchaser\.email\s*\}\)/);
});

test("founding environment values are documented", () => {
  const env = read(".env.example");
  for (const key of [
    "FOUNDING_HOMEPAGE_ENABLED",
    "FOUNDING_CHECKOUT_ENABLED",
    "FOUNDING_CRM_ORIGIN",
    "FOUNDING_INTERNAL_API_SECRET",
    "NEXT_PUBLIC_SUPPORT_EMAIL",
    "NEXT_PUBLIC_FOUNDING_TERMS_URL",
    "NEXT_PUBLIC_FOUNDING_PRIVACY_URL",
    "NEXT_PUBLIC_FOUNDING_REFUND_POLICY_URL",
  ]) {
    assert.match(env, new RegExp(`^${key}=`, "m"), `${key} missing`);
  }
});
