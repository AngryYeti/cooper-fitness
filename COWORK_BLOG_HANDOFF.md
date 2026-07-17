# Cowork Handoff: Weekly Blog Post for Cooper Fitness

**Setup instruction (run once):** Schedule this task to run weekly (e.g. every Monday at 9:00 AM) using the schedule skill. Each run executes the workflow below.

---

## Task

Write and publish one new SEO blog post for the Cooper Fitness website, then push it live.

## Project context

- Repo: `https://github.com/AngryYeti/cooper-fitness` (local: `C:\Users\evanc\cooperfitnessapp`), Next.js 15, branch `main`. Pushing to `main` auto-deploys via Vercel to https://cooper.fitness.
- Blog posts live in **one file**: `src/lib/blog/posts.ts` — an array of `BlogPost` objects:
  ```ts
  { slug, title, description, date, category, content, published }
  ```
  `content` is an HTML string using only `<p>`, `<h2>`, `<h3>`, `<ul>`, `<li>`, `<strong>`. No images, no custom components.
- The sitemap, blog index, Article JSON-LD schema, and metadata are all generated automatically from this array. Adding a post object with `published: true` is the entire publish step — touch nothing else.

## Audience and voice

Target reader: **busy parents, complete beginners to fitness**, skeptical of fads, short on time. Voice: plain-spoken, encouraging, zero jargon, honest about timelines (results in weeks-to-months, never overnight). Every post ends with a `<h2>The bottom line</h2>` summary section. Read 2–3 existing posts in the file first and match their style.

## SEO requirements per post

- ~1,000–1,200 words.
- Target one long-tail keyword a busy parent would search (examples: "how to start working out as a busy mom", "15 minute workouts for parents", "how to lose weight with no time to cook", "getting back into fitness after kids"). Put the keyword in the title, slug, first paragraph, and at least one `<h2>`.
- `title`: under 60 characters, keyword-first. `description`: 150–160 characters, compelling. `slug`: lowercase-hyphenated, keyword-rich. `date`: today's date (YYYY-MM-DD). `category`: one of "Weight Loss", "Personal Training", "Habits" (new categories are allowed but these three get styled gradients). `published: true`.
- **Check existing slugs and titles in the file first** — never duplicate or closely overlap a topic already covered.
- Where natural, link to one relevant service page in the content using a plain `<a href="/services/...">` (options: `/services/online-weight-loss-coaching`, `/services/online-personal-training`, `/services/nutrition-coaching`).

## Workflow

1. Pull latest `main`.
2. Read `src/lib/blog/posts.ts` — note existing topics, match voice.
3. Pick a fresh long-tail topic, write the post, append the object to the `blogPosts` array.
4. Verify: `npx tsc --noEmit` must pass.
5. Commit with a message like `feat: add blog post "<title>"` and push to `main`.
6. **Report the short commit hash in your summary** (user requirement), plus the post title, target keyword, and live URL (`https://cooper.fitness/blog/<slug>`).

## Guardrails

- Only modify `src/lib/blog/posts.ts`. No other file changes.
- No medical claims, no guaranteed results, no specific weight-loss numbers promised.
- If the push fails or typecheck fails, report the error instead of force-pushing or bypassing checks.
