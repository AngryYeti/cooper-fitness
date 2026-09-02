import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("recipe domain exports the library contract", () => {
  const types = read("src/lib/recipes/types.ts");
  const index = read("src/lib/recipes/index.ts");

  assert.match(types, /export type Recipe/);
  assert.match(types, /activeMinutes/);
  assert.match(index, /publishedRecipes/);
  assert.match(index, /getRecipe/);

  for (const category of ["breakfast", "lunch", "dinner", "snack", "meal-prep", "staple"]) {
    assert.match(index, new RegExp(`id: [\\\"']${category}[\\\"']`));
  }
});

test("recipe library has cookbook-scale category counts", () => {
  const files = {
    breakfast: "src/lib/recipes/breakfasts.ts",
    lunch: "src/lib/recipes/lunches.ts",
    dinner: "src/lib/recipes/dinners.ts",
    snack: "src/lib/recipes/snacks.ts",
    "meal-prep": "src/lib/recipes/meal-prep.ts",
  };
  const expected = { breakfast: 12, lunch: 12, dinner: 18, snack: 10, "meal-prep": 8 };

  for (const [category, path] of Object.entries(files)) {
    const source = read(path);
    const count = (source.match(/slug:/g) || []).length;
    assert.equal(count, expected[category], `${category} count`);
  }
});

test("recipe library slugs and source URLs are unique and web-safe", () => {
  const paths = [
    "src/lib/recipes/breakfasts.ts",
    "src/lib/recipes/lunches.ts",
    "src/lib/recipes/dinners.ts",
    "src/lib/recipes/snacks.ts",
    "src/lib/recipes/meal-prep.ts",
  ];
  const source = paths.map(read).join("\n");
  const slugs = [...source.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const url of [...source.matchAll(/url: "([^"]+)"/g)].map((match) => match[1])) {
    assert.match(url, /^https:\/\//);
  }
});

test("recipe hub is wired to the searchable library", () => {
  const page = read("src/app/(marketing)/recipes/page.tsx");
  const library = read("src/components/recipes/recipe-library.tsx");
  const card = read("src/components/recipes/recipe-card.tsx");
  const index = read("src/lib/recipes/index.ts");

  assert.match(page, /publishedRecipes/);
  assert.match(page, /RecipeLibrary/);
  assert.match(library, /Search recipes/i);
  assert.match(index, /meal-prep/i);
  assert.match(library, /high-protein/i);
  assert.match(library, /aria-live/);
  assert.match(card, /recipes\//);
});

test("recipe detail route provides metadata and Recipe structured data", () => {
  const page = read("src/app/(marketing)/recipes/[slug]/page.tsx");

  assert.match(page, /generateStaticParams/);
  assert.match(page, /generateMetadata/);
  assert.match(page, /notFound/);
  assert.match(page, /Breadcrumbs/);
  assert.match(page, /@type.*Recipe/);
  assert.match(page, /recipeIngredient/);
});
