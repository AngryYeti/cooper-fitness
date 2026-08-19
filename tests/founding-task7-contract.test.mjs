import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");

test("public session-status bounds session IDs and keeps no-store behavior", () => {
  const route = read("src/app/api/founding/session-status/route.ts");
  const client = read("src/lib/founding/client.ts");
  const verifier = read("src/lib/founding/session-status.ts");
  assert.match(route, /sessionId\.length\s*>\s*\d+|slice\(0,\s*\d+\)/);
  assert.match(route, /Cache-Control["']?\s*:\s*["']no-store/i);
  assert.match(route, /consumeSessionStatusRateLimit/);
  assert.doesNotMatch(route, /consumeCheckoutRateLimit/);
  assert.match(client, /statusRateLimitBuckets/);
  assert.match(client, /STATUS_RATE_LIMIT_MAX\s*=\s*60/);
  assert.match(verifier, /\^cs_\[A-Za-z0-9_\]\+\$/);
});
