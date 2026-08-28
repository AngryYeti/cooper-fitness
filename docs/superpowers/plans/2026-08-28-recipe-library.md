# Cooper Fitness Recipe Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a public, searchable, cookbook-scale recipe library to the existing Cooper Fitness Next.js site without changing the current blog or marketing routes.

**Architecture:** Keep recipes in a typed, static data layer split by category, expose a server-rendered `/recipes` hub with a focused client-side search/filter component, and expose statically generated `/recipes/[slug]` detail pages with recipe metadata and structured data. Reuse the current blog, metadata, breadcrumb, card, badge, CTA, and navigation patterns so a later CMS can replace the data layer without changing the public route contract.

**Tech Stack:** Next.js 15 App Router, TypeScript, React 19, Tailwind CSS v4, existing shadcn/ui primitives, Node test runner, ESLint.

**Spec:** `docs/superpowers/specs/2026-08-28-recipe-library-design.md`

## Global Constraints

- The existing `/blog` route and every existing marketing route remain unchanged.
- The first library release contains approximately 60 entries: 12 breakfasts, 12 lunches, 18 dinners, 10 snacks, and 8 meal-prep staples/sauces.
- Recipe wording and instructions are original adaptations; source pages are credited and linked rather than copied wholesale.
- Nutrition values are estimates, labeled as such, and never presented as medical or guaranteed outcomes.
- Use the existing Cooper Fitness dark, warm, blue-accented visual system and typography.
- Do not introduce a database, CMS, login, or new external service for this release.
- Verify with the existing build, lint, launch-readiness tests, and focused recipe route checks.

---

### Task 1: Add the typed recipe domain and public exports

**Files:**
- Create: `src/lib/recipes/types.ts`
- Create: `src/lib/recipes/index.ts`
- Test: `tests/recipe-library.test.mjs`

**Interfaces:**
- Produces `Recipe`, `RecipeCategory`, `RecipeTag`, `RecipeNutrition`, and `RecipeSource` types.
- Produces `publishedRecipes: Recipe[]`, `getRecipe(slug: string): Recipe | undefined`, and `recipeCategories` for the UI.

- [ ] **Step 1: Write the failing structural test**

Add tests that assert the recipe module exports the required symbols and the data file contains all six category identifiers.

```js
test("recipe domain exports the library contract", () => {
  const types = read("src/lib/recipes/types.ts");
  const index = read("src/lib/recipes/index.ts");
  assert.match(types, /export type Recipe/);
  assert.match(types, /activeMinutes/);
  assert.match(index, /publishedRecipes/);
  assert.match(index, /getRecipe/);
  for (const category of ["breakfast", "lunch", "dinner", "snack", "meal-prep", "staple"]) {
    assert.match(index, new RegExp(`category: [\\\"']${category}[\\\"']`));
  }
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `npm test -- --test-name-pattern="recipe domain exports"`

Expected: FAIL because the recipe module does not exist yet.

- [ ] **Step 3: Implement the domain contract**

Create the types with lower-case stable category/tag IDs and optional nutrition fields:

```ts
export type RecipeCategory = "breakfast" | "lunch" | "dinner" | "snack" | "meal-prep" | "staple";
export type RecipeTag = "high-protein" | "high-fibre" | "freezer-friendly" | "vegetarian" | "no-cook" | "one-pan" | "make-ahead";
export type RecipeNutrition = { calories?: number; protein?: number; fibre?: number };
export type RecipeSource = { label: string; url: string; note?: string };
export type Recipe = {
  slug: string;
  title: string;
  summary: string;
  category: RecipeCategory;
  tags: RecipeTag[];
  activeMinutes: number;
  totalMinutes: number;
  servings: number;
  nutrition: RecipeNutrition;
  ingredients: string[];
  steps: string[];
  storage: string;
  substitutions: string[];
  shortcut: string;
  contentAngle: string;
  source: RecipeSource;
  published: boolean;
};
```

Use `publishedRecipes = recipes.filter((recipe) => recipe.published)` and `getRecipe` by slug. Keep the public index surface stable even if category data is split later.

- [ ] **Step 4: Run the focused test and verify it passes**

Run: `npm test -- --test-name-pattern="recipe domain exports"`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/recipes tests/recipe-library.test.mjs
git commit -m "feat: add recipe library domain model"
```

### Task 2: Research and author the breakfast, lunch, and meal-prep data

**Files:**
- Create: `src/lib/recipes/breakfasts.ts`
- Create: `src/lib/recipes/lunches.ts`
- Create: `src/lib/recipes/meal-prep.ts`
- Modify: `src/lib/recipes/index.ts`
- Create: `docs/recipes/report-source.md`
- Test: `tests/recipe-library.test.mjs`

**Interfaces:**
- Produces `breakfastRecipes: Recipe[]`, `lunchRecipes: Recipe[]`, and `mealPrepRecipes: Recipe[]`.
- Each record includes the complete `Recipe` shape, source URL, original adaptation text, storage guidance, and a social content angle.

- [ ] **Step 1: Record source evidence before authoring**

Create `docs/recipes/report-source.md` with the researched source title, publisher, URL, access note, and the fields used for each recipe. Use first-party recipe pages for facts and label any social inspiration as creator-supplied.

- [ ] **Step 2: Add 12 breakfast recipes**

Use grocery-friendly recipes such as whipped cottage cheese bowls, overnight oats, egg-and-vegetable muffins, Greek-yogurt bowls, protein waffles, breakfast burrito bowls, and savoury cottage-cheese bowls. Each recipe must include active/total time, serving count, ingredients, original steps, storage, substitutions, and source attribution.

- [ ] **Step 3: Add 12 lunch recipes**

Include no-cook and batch options such as tuna-white-bean salad, chicken-chickpea salad, turkey wraps, lentil/feta bowls, salmon rice bowls, turkey Mediterranean bowls, and high-protein pasta salads. Keep the active prep practical for workday cooking.

- [ ] **Step 4: Add 8 meal-prep staples/sauces**

Include versatile components such as turkey chili, cooked grains, roasted vegetables, lemon-yogurt sauce, green-goddess dressing, edamame hummus, bean salsa, and freezer-friendly chicken or turkey meatballs. Each entry should state how it combines with other library recipes.

- [ ] **Step 5: Wire the category arrays into the public index and test counts**

Import the three arrays into `src/lib/recipes/index.ts`, combine them with the other category arrays when present, and add structural tests for 12 breakfast, 12 lunch, and 8 meal-prep records.

- [ ] **Step 6: Run the focused test**

Run: `npm test -- --test-name-pattern="recipe library counts"`

Expected: PASS with the three category counts.

- [ ] **Step 7: Commit**

```bash
git add src/lib/recipes docs/recipes/report-source.md tests/recipe-library.test.mjs
git commit -m "feat: add breakfast lunch and meal prep recipes"
```

### Task 3: Research and author the dinner and snack data

**Files:**
- Create: `src/lib/recipes/dinners.ts`
- Create: `src/lib/recipes/snacks.ts`
- Modify: `src/lib/recipes/index.ts`
- Modify: `docs/recipes/report-source.md`
- Test: `tests/recipe-library.test.mjs`

**Interfaces:**
- Produces `dinnerRecipes: Recipe[]` and `snackRecipes: Recipe[]` using the same `Recipe` contract.

- [ ] **Step 1: Add 18 dinner recipes**

Cover one-pan, skillet, sheet-pan, bowl, slow-cooker, and freezer-friendly patterns: buffalo chicken rice bowls, chicken shawarma sheet pan, turkey stir fry, taco bowls, shrimp fajita bowls, salmon trays, turkey meatballs, lean beef bowls, bean-and-chicken chilli, and vegetarian grain bowls. Target at least four vegetarian or fish-forward entries and at least six recipes tagged one-pan, freezer-friendly, or make-ahead.

- [ ] **Step 2: Add 10 snack recipes**

Include apple-chia pudding, Greek cottage-cheese bowls, edamame hummus with vegetables, egg muffins, yogurt bark, tuna cucumber boats, roasted chickpeas, cottage-cheese caprese cups, fruit-and-yogurt parfaits, and a high-protein trail mix adaptation. State when a snack is best paired with fruit, vegetables, or whole-grain toast to improve fibre or satiety.

- [ ] **Step 3: Add source provenance and nutrition caveats**

Append the dinner/snack source records to `docs/recipes/report-source.md`. Use creator-supplied social macros only when clearly labeled as approximate and never as the sole support for a nutrition claim.

- [ ] **Step 4: Add count and slug integrity tests**

Assert 18 dinner and 10 snack records, unique slugs, and source URLs beginning with `https://`.

- [ ] **Step 5: Run the focused test**

Run: `npm test -- --test-name-pattern="recipe library counts|recipe slug integrity"`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/recipes docs/recipes/report-source.md tests/recipe-library.test.mjs
git commit -m "feat: add dinner and snack recipes"
```

### Task 4: Build the searchable recipe hub

**Files:**
- Create: `src/components/recipes/recipe-library.tsx`
- Create: `src/components/recipes/recipe-card.tsx`
- Create: `src/app/(marketing)/recipes/page.tsx`
- Test: `tests/recipe-library.test.mjs`

**Interfaces:**
- `RecipeLibrary({ recipes }: { recipes: Recipe[] })` renders the interactive hub.
- `RecipeCard({ recipe }: { recipe: Recipe })` renders a keyboard-focusable link to `/recipes/${recipe.slug}`.

- [ ] **Step 1: Write the failing route/component checks**

Assert the hub page imports `publishedRecipes`, renders `RecipeLibrary`, and includes the search/filter labels from the spec.

- [ ] **Step 2: Implement the recipe card**

Use the existing Card and Badge primitives. Show category, title, summary, active time, protein/fibre badges when available, and one practical tag. Add visible `focus-visible` treatment and a predictable hover state.

- [ ] **Step 3: Implement client-side search, filter, and sort**

Use a controlled text field and filter buttons/selects. Search title, summary, ingredients, tags, and category. Support category, max active minutes, high-protein, high-fibre, freezer-friendly, and vegetarian filters. Support recommended, fastest, and highest-protein ordering. Announce result count with a polite live region.

- [ ] **Step 4: Implement the server-rendered hub page**

Add metadata through `generatePageMetadata`, breadcrumbs, the editorial hero, the library component, and the existing CTA. Keep the first viewport useful without requiring JavaScript for the page title and introductory copy.

- [ ] **Step 5: Run focused tests and lint**

Run: `npm test -- --test-name-pattern="recipe hub"`  
Run: `npm run lint`

Expected: PASS with no new lint errors.

- [ ] **Step 6: Commit**

```bash
git add src/app/(marketing)/recipes src/components/recipes tests/recipe-library.test.mjs
git commit -m "feat: add searchable recipe hub"
```

### Task 5: Build recipe detail pages and structured metadata

**Files:**
- Create: `src/app/(marketing)/recipes/[slug]/page.tsx`
- Test: `tests/recipe-library.test.mjs`

**Interfaces:**
- `generateStaticParams()` returns published recipe slugs.
- `generateMetadata({ params }): Promise<Metadata>` uses the recipe title and summary.
- The page renders a complete `Recipe` record or calls `notFound()`.

- [ ] **Step 1: Write the failing detail-route checks**

Assert the detail route contains `generateStaticParams`, `generateMetadata`, `notFound`, breadcrumbs, and Recipe JSON-LD.

- [ ] **Step 2: Implement the route**

Render title, category, summary, time/servings/nutrition badges, ingredients, original method steps, storage, substitutions, busy-day shortcut, content angle, attribution link, and existing CTA. Keep nutrition labeled “source estimate” or “approximate” where appropriate.

- [ ] **Step 3: Add Recipe structured data**

Emit `@type: "Recipe"` with name, description, author, recipeIngredient, recipeInstructions, prepTime, totalTime, recipeYield, and nutrition only for available fields. Use ISO 8601 duration values and avoid inventing image URLs.

- [ ] **Step 4: Run the build and focused checks**

Run: `npm test -- --test-name-pattern="recipe detail"`  
Run: `npm run build`

Expected: PASS; every published recipe slug statically generates without a runtime error.

- [ ] **Step 5: Commit**

```bash
git add src/app/(marketing)/recipes/[slug] tests/recipe-library.test.mjs
git commit -m "feat: add recipe detail pages"
```

### Task 6: Integrate navigation, sitemap, and final verification

**Files:**
- Modify: `src/components/layout/marketing-header.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `tests/launch-readiness.test.mjs`
- Modify: `tests/recipe-library.test.mjs`

**Interfaces:**
- The main and mobile navigation expose `/recipes` as “Recipes.”
- The sitemap includes `/recipes` and every published `/recipes/[slug]` route.

- [ ] **Step 1: Add the Recipes navigation item**

Add a single top-level `Recipes` link to desktop and mobile navigation while preserving all existing labels, dropdown behavior, and CTA placement.

- [ ] **Step 2: Add recipe sitemap entries**

Import `publishedRecipes`, add `/recipes` to static routes, and map each published slug with its content date or a stable library update date.

- [ ] **Step 3: Extend launch-readiness tests**

Assert the sitemap contains `publishedRecipes` and `/recipes/${recipe.slug}`, and the header contains `/recipes`.

- [ ] **Step 4: Run the complete verification suite**

Run: `npm test`  
Run: `npm run lint`  
Run: `npm run build`

Expected: all tests pass, lint is clean, and the production build succeeds.

- [ ] **Step 5: Start the local preview and verify representative routes**

Start the existing dev script, verify `/recipes`, one breakfast detail page, one dinner detail page, and one meal-prep detail page respond without blocking errors, then hand the preview to the user for review.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/marketing-header.tsx src/app/sitemap.ts tests
git commit -m "feat: integrate recipe library navigation and sitemap"
```

