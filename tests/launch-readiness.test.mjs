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

test("recipe library stays standalone while remaining in the sitemap", () => {
  const sitemap = read("src/app/sitemap.ts");
  const header = read("src/components/layout/marketing-header.tsx");

  assert.match(sitemap, /publishedRecipes/);
  assert.match(sitemap, /\/recipes\/\$\{recipe\.slug\}/);
  assert.doesNotMatch(header, /href: ["']\/recipes["']/);
});

test("recipe subdomain serves the recipe hub at its root", () => {
  const middleware = read("src/middleware.ts");

  assert.match(middleware, /recipes\.cooper\.fitness/);
  assert.match(middleware, /NextResponse\.rewrite/);
  assert.match(middleware, /pathname === ["']\/["']/);
  assert.match(middleware, /pathname = ["']\/recipes["']/);
});

test("recipe cards use staple-ingredient food visuals", () => {
  const card = read("src/components/recipes/recipe-card.tsx");
  const visuals = read("src/lib/recipes/visuals.ts");

  assert.match(card, /getRecipeVisual/);
  assert.match(card, /visual\.ingredient/);
  assert.match(card, /visual\.src/);
  assert.match(visuals, /Built around|ingredient/);
  assert.match(visuals, /\/recipes\/berries\.jpg/);
  assert.match(visuals, /\/recipes\/chicken-alt2\.jpg/);
  assert.match(visuals, /breakfast-burrito-bowl[\s\S]*burrito/);
  assert.match(visuals, /marry-me-chicken-meatballs[\s\S]*chickenMeatballs/);
  assert.match(visuals, /chicken-piccata-meatball-orzo[\s\S]*chickenMeatballs/);
  assert.match(visuals, /turkey-meatball-marinara-bowls[\s\S]*turkeyMeatballs/);
  assert.match(visuals, /ground-turkey-vegetable-stir-fry[\s\S]*groundTurkey/);
  assert.match(visuals, /ground-turkey-zucchini-skillet[\s\S]*groundTurkey/);
  assert.match(visuals, /match-v3\/breakfast-burrito-bowl\.jpg/);
  assert.match(visuals, /match-v3\/ground-turkey\.jpg/);
  const AI_RECIPE_VISUALS = [
    ["cottage-cheese-chicken-sausage-frittata", "frittata"],
    ["cottage-cheese-scrambled-eggs", "scrambledEggs"],
    ["egg-white-turkey-bacon-muffins", "eggMuffin"],
    ["peanut-butter-banana-protein-smoothie", "smoothie"],
    ["buffalo-chicken-rice-bowls", "buffaloChickenBowl"],
    ["chicken-shawarma-sheet-pan", "chickenShawarma"],
    ["chicken-taco-rice-bowls", "chickenTacoBowl"],
    ["greek-chicken-rice-bowls", "greekChickenBowl"],
    ["honey-sriracha-chicken-broccoli-bowls", "honeySrirachaChickenBowl"],
    ["asian-chicken-chili-crisp-salad", "asianChickenSalad"],
    ["chicken-egg-roll-bowl", "chickenEggRollBowl"],
    ["greek-chicken-meal-prep-rice-bowl", "greekChickenMealPrepBowl"],
    ["classic-greek-yogurt-chicken-salad", "greekYogurtChickenSalad"],
    ["green-goddess-chicken-chickpea-salad", "greenGoddessChickenChickpeaSalad"],
    ["pesto-chicken-vegetable-pasta-salad", "pestoChickenPastaSalad"],
    ["thai-inspired-chicken-slaw", "thaiChickenSlaw"],
    ["loaded-egg-muffin-snack", "loadedEggMuffin"],
  ];

  for (const [slug, visualKey] of AI_RECIPE_VISUALS) {
    assert.match(visuals, new RegExp(`"${slug}"\\s*:\\s*"${visualKey}"`));
    assert.match(visuals, new RegExp(`${visualKey}: \\{[\\s\\S]*?/recipes/ai-v1/`));
    assert.match(visuals, new RegExp(`${slug}\\.jpg`));
  }
  const AI_V2_SLUGS = [
    "whipped-cottage-cheese-berry-bowl",
    "high-protein-oat-waffles",
    "apple-pie-overnight-oats",
    "tropical-yogurt-oat-parfaits",
    "blueberry-banana-baked-oatmeal",
    "breakfast-burrito-bowl",
    "lemon-berry-yogurt-bowl",
    "banana-nut-protein-oats",
    "ground-turkey-vegetable-stir-fry",
    "shrimp-fajita-bowls",
    "lemon-chili-shrimp-quinoa-bowls",
    "marry-me-chicken-meatballs",
    "chicken-piccata-meatball-orzo",
    "easy-turkey-chili",
    "mediterranean-turkey-bowls",
    "ground-turkey-zucchini-skillet",
    "vegan-quinoa-edamame-bowl",
    "salmon-vegetable-sheet-pan",
    "turkey-meatball-marinara-bowls",
    "shrimp-cabbage-roll-bowl",
    "cottage-cheese-sweet-potato-beef-bowl",
    "tuna-white-bean-salad",
    "five-ingredient-salmon-salad",
    "tuna-egg-salad-crunch-box",
    "lentil-crunch-salad",
    "mediterranean-bean-salad",
    "lemon-dijon-yogurt-dressing",
    "green-goddess-yogurt-sauce",
    "freezer-brown-rice-quinoa-blend",
    "sheet-pan-roasted-vegetables",
    "freezer-chicken-turkey-meatballs",
    "black-bean-corn-salsa",
    "edamame-hummus-crunch-dip",
    "make-ahead-oat-jar-base",
    "apple-chia-peanut-butter-pudding",
    "greek-cottage-cheese-snack-bowl",
    "edamame-hummus-vegetable-cups",
    "berry-cottage-cheese-breakfast-snack",
    "roasted-chickpea-crunch",
    "greek-yogurt-berry-nut-cup",
    "tuna-cucumber-boats",
    "cottage-cheese-caprese-cups",
    "whole-food-trail-mix",
  ];

  for (const slug of AI_V2_SLUGS) {
    assert.match(visuals, new RegExp(`"${slug}"\\s*:\\s*\\{[^\\n]*?/recipes/ai-v2/${slug}\\.jpg`));
    assert.equal(existsSync(new URL(`../public/recipes/ai-v2/${slug}.jpg`, import.meta.url)), true);
  }
  assert.ok((visuals.match(/\/recipes\/(?:unique-v2|match-v3|ai-v1|ai-v2)\//g) ?? []).length >= 120);
  assert.ok((visuals.match(/\/recipes\/ai-v1\//g) ?? []).length >= 34);
  assert.ok((visuals.match(/\/recipes\/ai-v2\//g) ?? []).length >= 86);
});
