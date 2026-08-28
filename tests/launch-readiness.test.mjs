import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("sitemap includes published blog post routes", () => {
  const sitemap = read("src/app/sitemap.ts");

  assert.match(sitemap, /publishedPosts/);
  assert.match(sitemap, /\/blog\/\$\{post\.slug\}/);
});

test("inquiry route does not log EmailJS secrets or CRM configuration", () => {
  const inquiryRoute = read("src/app/api/inquiry/route.ts");

  assert.doesNotMatch(inquiryRoute, /EmailJS body/);
  assert.doesNotMatch(inquiryRoute, /accessToken.*console\.log|console\.log.*accessToken/s);
  assert.doesNotMatch(inquiryRoute, /CRM_WEBHOOK_URL.*console\.log|console\.log.*CRM_WEBHOOK_URL/s);
});

test("purchase notifications are handled by a signed Stripe webhook", () => {
  const webhookPath = "src/app/api/stripe-webhook/route.ts";

  assert.equal(existsSync(new URL(`../${webhookPath}`, import.meta.url)), true);

  const webhookRoute = read(webhookPath);
  assert.match(webhookRoute, /constructEvent/);
  assert.match(webhookRoute, /STRIPE_WEBHOOK_SECRET/);
  assert.match(webhookRoute, /payment_intent\.succeeded/);
  assert.match(webhookRoute, /purchase_notified/);
});

test("Supabase references are removed from public project configuration", () => {
  const envExample = read(".env.example");
  const services = read("SERVICES.txt");

  assert.doesNotMatch(envExample, /SUPABASE/i);
  assert.doesNotMatch(services, /SUPABASE/i);
});

test("recipe library is discoverable from navigation and sitemap", () => {
  const sitemap = read("src/app/sitemap.ts");
  const header = read("src/components/layout/marketing-header.tsx");

  assert.match(sitemap, /publishedRecipes/);
  assert.match(sitemap, /\/recipes\/\$\{recipe\.slug\}/);
  assert.match(header, /href: ["']\/recipes["']/);
});
