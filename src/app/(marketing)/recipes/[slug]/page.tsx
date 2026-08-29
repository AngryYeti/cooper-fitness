import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Clock3, ExternalLink, Snowflake } from "lucide-react";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/schema";
import { CTASection } from "@/components/marketing/cta-section";
import { Badge } from "@/components/ui/badge";
import { getRecipe, publishedRecipes } from "@/lib/recipes";
import type { Recipe } from "@/lib/recipes/types";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

const CATEGORY_LABELS: Record<Recipe["category"], string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
  "meal-prep": "Meal prep",
  staple: "Staple",
};

const TAG_LABELS: Record<string, string> = {
  "high-protein": "High protein",
  "high-fibre": "High fibre",
  "freezer-friendly": "Freezer friendly",
  vegetarian: "Vegetarian",
  "no-cook": "No cook",
  "one-pan": "One pan",
  "make-ahead": "Make ahead",
};

function isoDuration(minutes: number) {
  return `PT${Math.max(1, minutes)}M`;
}

function nutritionSchema(recipe: Recipe) {
  const nutrition: Record<string, string> = {};
  if (recipe.nutrition.calories !== undefined) nutrition.calories = `${recipe.nutrition.calories} calories`;
  if (recipe.nutrition.protein !== undefined) nutrition.proteinContent = `${recipe.nutrition.protein} g`;
  if (recipe.nutrition.fibre !== undefined) nutrition.fiberContent = `${recipe.nutrition.fibre} g`;
  return Object.keys(nutrition).length > 0 ? nutrition : undefined;
}

export function generateStaticParams() {
  return publishedRecipes.map((recipe) => ({ slug: recipe.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const recipe = getRecipe(slug);
    if (!recipe) return {};

    return generatePageMetadata({
      title: recipe.title,
      description: recipe.summary,
      path: `/recipes/${recipe.slug}`,
      type: "article",
    });
  });
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) notFound();

  const breadcrumbs = [
    { name: "Recipes", href: "/recipes" },
    { name: recipe.title, href: `/recipes/${recipe.slug}` },
  ];
  const recipeNutrition = nutritionSchema(recipe);
  const recipeSchema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.summary,
    author: { "@type": "Person", name: "Evan Cooper" },
    publisher: { "@type": "Organization", name: SITE_NAME },
    url: `${SITE_URL}/recipes/${recipe.slug}`,
    recipeCategory: CATEGORY_LABELS[recipe.category],
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.steps.map((step) => ({ "@type": "HowToStep", text: step })),
    prepTime: isoDuration(recipe.activeMinutes),
    totalTime: isoDuration(recipe.totalMinutes),
    recipeYield: `${recipe.servings} servings`,
    ...(recipeNutrition ? { nutrition: { "@type": "NutritionInformation", ...recipeNutrition } } : {}),
  };

  return (
    <div className="pt-8">
      <BreadcrumbSchema items={breadcrumbs} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }} />

      <article className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div>
            <Link href="/recipes" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Back to recipes
            </Link>
            <header>
              <Badge variant="secondary" className="mb-5">{CATEGORY_LABELS[recipe.category]}</Badge>
              <h1 className="max-w-3xl text-4xl font-medium tracking-tight md:text-6xl">{recipe.title}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{recipe.summary}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                <Badge variant="outline"><Clock3 className="mr-1.5 h-3.5 w-3.5" /> {recipe.activeMinutes} min hands-on</Badge>
                <Badge variant="outline">{recipe.totalMinutes} min total</Badge>
                <Badge variant="outline">{recipe.servings} servings</Badge>
                {recipe.tags.slice(0, 3).map((tag) => <Badge key={tag} variant="secondary">{TAG_LABELS[tag] ?? tag}</Badge>)}
              </div>
            </header>

            <div className="mt-12 grid gap-10 md:grid-cols-2">
              <section>
                <p className="section-label mb-4">What you need</p>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {ingredient}
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <p className="section-label mb-4">How to make it</p>
                <ol className="space-y-5">
                  {recipe.steps.map((step, index) => (
                    <li key={step} className="flex gap-4 text-sm leading-relaxed text-muted-foreground">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/40 text-xs font-mono text-primary">{index + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <section className="rounded-[20px] border border-white/10 bg-white/[0.035] p-6">
                <p className="section-label mb-3">Make it work on a busy day</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{recipe.shortcut}</p>
              </section>
              <section className="rounded-[20px] border border-white/10 bg-white/[0.035] p-6">
                <p className="section-label mb-3">Swaps</p>
                <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {recipe.substitutions.map((swap) => <li key={swap}>• {swap}</li>)}
                </ul>
              </section>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28">
            <section className="rounded-[24px] border border-white/10 bg-white/[0.035] p-6">
              <p className="section-label mb-4">At a glance</p>
              <dl className="space-y-4 text-sm">
                {recipe.nutrition.calories !== undefined && <div className="flex items-center justify-between gap-4"><dt className="text-muted-foreground">Calories</dt><dd className="font-medium">{recipe.nutrition.calories}</dd></div>}
                {recipe.nutrition.protein !== undefined && <div className="flex items-center justify-between gap-4"><dt className="text-muted-foreground">Protein</dt><dd className="font-medium">{recipe.nutrition.protein}g</dd></div>}
                {recipe.nutrition.fibre !== undefined && <div className="flex items-center justify-between gap-4"><dt className="text-muted-foreground">Fibre</dt><dd className="font-medium">{recipe.nutrition.fibre}g</dd></div>}
                <div className="flex items-center justify-between gap-4"><dt className="text-muted-foreground">Storage</dt><dd className="max-w-[170px] text-right font-medium">{recipe.storage}</dd></div>
              </dl>
              {Object.keys(recipe.nutrition).length > 0 && <p className="mt-5 text-xs leading-relaxed text-muted-foreground">Nutrition is a source estimate. Brands, portions, and substitutions change the numbers.</p>}
            </section>

            {recipe.tags.includes("freezer-friendly") && (
              <div className="flex items-start gap-3 rounded-[20px] border border-white/10 bg-white/[0.035] p-5 text-sm text-muted-foreground">
                <Snowflake className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Freezer-friendly option included.
              </div>
            )}

            <section className="rounded-[20px] border border-white/10 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Adapted from</p>
              <a href={recipe.source.url} target="_blank" rel="noreferrer" className="mt-2 flex items-start justify-between gap-3 text-sm text-foreground transition-colors hover:text-primary">
                <span>{recipe.source.label}</span><ExternalLink className="mt-0.5 h-4 w-4 shrink-0" />
              </a>
              {recipe.source.note && <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{recipe.source.note}</p>}
            </section>
          </aside>
        </div>
      </article>

      <CTASection
        title="Want the plan around the food?"
        description="Coaching connects your meals, training, and real schedule into something you can repeat."
        buttonText="Book Free Consultation"
        buttonHref="https://cooper.fitness/#contact"
      />
    </div>
  );
}
