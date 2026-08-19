import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");

test("founding campaign files exist and the homepage is reversible", () => {
  for (const path of [
    "src/components/founding/founding-homepage.tsx",
    "src/components/founding/founding-checkout-form.tsx",
    "src/components/founding/founding-inventory-cta.tsx",
    "src/components/founding/founding-sections.tsx",
    "src/app/(marketing)/founding/success/page.tsx",
    "src/app/(marketing)/founding/cancel/page.tsx",
    "src/app/api/founding/session-status/route.ts",
    "src/lib/founding/session-status.ts",
  ]) {
    assert.equal(existsSync(new URL(path, root)), true, `${path} is missing`);
  }

  const homepage = read("src/app/(marketing)/page.tsx");
  assert.match(homepage, /isFoundingCampaignEnabled/);
  assert.match(homepage, /HeroSection/);
  assert.match(homepage, /FoundingHomepage/);
  assert.match(homepage, /force-dynamic/);
  assert.match(read("src/components/founding/founding-checkout-form.tsx"), /useId/);
});

test("campaign source contains the approved homepage copy and current photography", () => {
  const source = [
    read("src/components/founding/founding-homepage.tsx"),
    read("src/components/founding/founding-sections.tsx"),
    read("src/components/founding/founding-checkout-form.tsx"),
    read("src/components/founding/founding-inventory-cta.tsx"),
  ].join("\n");

  for (const copy of [
    "FOUNDING FATHERS*",
    "Five people. Six months. One plan built around real life.",
    "Individualized strength training, sustainable nutrition guidance, and weekly accountability for adults ready to make a real commitment.",
    "$299 USD TOTAL",
    "ONE-TIME FOUNDING RATE · DIRECT CHECKOUT",
    "*FATHERHOOD NOT REQUIRED. COMMITMENT IS.",
    "Focused work. Repeatable structure.",
    "A plan that leaves room for life.",
    "Every week has a next move.",
    "Coaching built for the week you actually have.",
    "Five places to build the first version of Cooper Fitness together.",
    "GET STARTED TODAY",
    "SPOT TEMPORARILY HELD",
    "JOIN THE WAITLIST",
  ]) {
    assert.ok(source.includes(copy), copy);
  }

  assert.match(source, /evanactionweb\.png/);
  assert.match(source, /evanselfiegym\.jpeg/);
});

test("campaign-rendered source excludes unsupported proof and promises", () => {
  const source = [
    read("src/components/founding/founding-homepage.tsx"),
    read("src/components/founding/founding-sections.tsx"),
    read("src/components/founding/founding-checkout-form.tsx"),
    read("src/components/founding/founding-inventory-cta.tsx"),
  ].join("\n");

  for (const forbidden of [
    "+80 lb",
    "24 hr",
    "daily check-ins",
    "unlimited messaging",
    "bloodwork",
    "1,524",
    "30-minute workouts",
    "testimonial",
  ]) {
    assert.equal(source.toLowerCase().includes(forbidden.toLowerCase()), false, forbidden);
  }
});

test("success and cancel pages use safe payment copy and no fulfillment", () => {
  const success = read("src/app/(marketing)/founding/success/page.tsx");
  const cancel = read("src/app/(marketing)/founding/cancel/page.tsx");
  assert.match(success, /You’re in\./);
  assert.match(success, /Payment received\. We’re preparing your onboarding details now\./);
  assert.match(success, /We couldn’t verify this checkout yet\./);
  assert.match(success, /status === "processing"/);
  assert.doesNotMatch(success, /fulfill|crm|createProfile|sendEmail/i);
  assert.match(cancel, /No payment was taken\./);
  assert.match(cancel, /RETURN TO THE OFFER/);
  assert.doesNotMatch(cancel, /crm|fulfill|stripe/i);
});

test("session status is server-only and never trusts the browser session", () => {
  const verifier = read("src/lib/founding/session-status.ts");
  const route = read("src/app/api/founding/session-status/route.ts");
  assert.match(verifier, /server-only/);
  assert.match(verifier, /29900/);
  assert.match(verifier, /usd/i);
  assert.match(verifier, /payment/);
  assert.match(verifier, /founding-fathers-2026/);
  assert.match(verifier, /Cooper Fitness Founding Fathers — Six-Month Coaching/);
  assert.match(verifier, /getStripe/);
  assert.match(verifier, /not_confirmed|processing/);
  assert.doesNotMatch(route, /fulfill|crm|metadata.*session_id/i);
});

test("campaign metadata and controls are inclusive and fail closed", () => {
  const rootLayout = read("src/app/layout.tsx");
  const homepage = read("src/app/(marketing)/page.tsx");
  const sticky = read("src/components/marketing/sticky-cta.tsx");
  assert.match(rootLayout, /busy adults/);
  assert.match(homepage, /busy adults/);
  assert.match(homepage, /OriginalHomePage/);
  assert.match(sticky, /return null/);
  assert.match(sticky, /safe-area-inset-bottom/);
});
