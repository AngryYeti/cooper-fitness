# Cooper Fitness Recipe Library

**Date:** 2026-08-28  
**Status:** Design approved in chat; awaiting written-spec review before implementation

## Goal

Add a public, blog-style recipe library to the existing Cooper Fitness website. The library should give busy adults 30+ practical, mostly whole-food meals they can search, filter, cook, meal-prep, and reuse as social content. It should grow into a cookbook without requiring a new CMS or changing the existing marketing site.

## Audience and content principles

- Busy adults, with a slight emphasis on dads/parents, who want fat loss, muscle gain, energy, and sustainable eating.
- Grocery-store ingredients, short active prep, and realistic leftovers.
- Protein and fibre are useful anchors, not promises of medical outcomes.
- Whole-food-first; canned beans, frozen vegetables, microwave grains, rotisserie chicken, and similar convenience staples are allowed when they improve repeatability.
- Recipe wording and instructions are original adaptations. Source pages are credited and linked; published recipes are not copied wholesale.

## Information architecture

- `/recipes` is the public hub and the only new top-level navigation item.
- `/recipes/[slug]` is the detail route for each recipe.
- The existing `/blog` route and every existing marketing route remain unchanged.
- Recipe detail pages include breadcrumb navigation and Recipe structured data where fields are available.

## Hub experience

The first viewport will communicate “quick, high-protein meals that fit real life,” followed by:

1. A text search field for recipe name, ingredient, or tag.
2. Filter chips for meal type: breakfast, lunch, dinner, snack, meal prep, staple.
3. Secondary filters for prep time, high protein, high fibre, freezer-friendly, and vegetarian.
4. A result count and compact sort control (recommended, fastest, highest protein).
5. Responsive recipe cards showing title, short description, meal type, active time, protein/fibre badges, and the first visual/content cue.

Filtering and searching are client-side against the static recipe dataset so the first edition needs no database, login, or external service.

## Detail experience

Each detail page contains:

- Title, description, category and time summary.
- Servings, calories, protein and fibre when available, explicitly labeled as estimates.
- Grocery-friendly ingredient list.
- Concise original method steps.
- Storage, reheating, and freezer guidance.
- Practical substitutions and a “make it work on a busy day” shortcut.
- A small “content angle” note for a future reel, carousel, or story.
- Source/inspiration links with clear attribution.
- A restrained coaching CTA consistent with the rest of the site.

## Initial content target

The first library release will contain approximately 60 entries:

- 12 breakfasts
- 12 lunches
- 18 dinners
- 10 snacks
- 8 meal-prep staples/sauces

The content data will use a stable schema with slug, title, summary, category, tags, active/total time, servings, nutrition, ingredients, steps, storage, substitutions, content angle, source URL, source label, and published status. The schema will remain CMS-ready so a later admin/editor workflow can replace the static data without changing the public routes.

## Source and nutrition policy

- Use first-party recipe publishers for reproducible ingredients, methods, storage, and published nutrition estimates.
- Use public Instagram/TikTok/Facebook pages as trend and presentation signals, not as authoritative nutrition sources.
- Social-derived figures are labeled creator-supplied or approximate and are not presented as verified.
- Recipe pages will not make disease, weight-loss, or performance guarantees. Nutrition values are starting estimates and can change with brands, substitutions, and portions.

## Visual direction

Reuse the existing Cooper Fitness dark, warm, blue-accented visual system and typography. The recipe surface should feel more editorial and approachable than the service pages: clear food-forward hierarchy, generous white space, strong scanability, and no dense dashboard chrome. Cards should remain readable on mobile and support keyboard focus states.

## Implementation boundaries

- Reuse the current Next.js App Router, Tailwind/shadcn primitives, metadata helpers, breadcrumbs, and CTA components.
- Add recipe data and small focused components; do not introduce a database or CMS in this first release.
- Keep existing blog data and routes intact.
- Add sitemap entries and metadata for the new public routes.
- Verify with the existing build, lint, and launch-readiness tests plus focused route checks.

## Success criteria

- A visitor can find a recipe by name, ingredient, category, or constraint in a few seconds.
- A detail page answers “what do I need, how long will it take, and what happens to leftovers?” without scrolling through a long essay.
- The initial set is broad enough to support a cookbook and at least several weeks of social content.
- Existing pages remain visually and functionally unchanged.
- Build and tests pass, and the recipe hub renders without a blocking runtime error.
