import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/schema";
import { CTASection } from "@/components/marketing/cta-section";
import { RecipeLibrary } from "@/components/recipes/recipe-library";
import { publishedRecipes } from "@/lib/recipes";
import { isFoundingCampaignEnabled } from "@/lib/founding/config";

export const metadata: Metadata = generatePageMetadata({
  title: "Recipes",
  description: "Quick, high-protein recipes and meal-prep ideas built for busy adults and real life.",
  path: "/recipes",
});

export default function RecipesPage() {
  const breadcrumbs = [{ name: "Recipes", href: "/recipes" }];
  const campaignEnabled = isFoundingCampaignEnabled();

  return (
    <div className="pt-8">
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />
        <div className="max-w-3xl">
          <p className="section-label mb-4">The Cooper kitchen library</p>
          <h1 className="text-balance text-4xl font-medium tracking-tight md:text-6xl">Food that fits the week you actually have.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Quick, high-protein recipes with enough fibre to keep you going — plus meal-prep ideas that make the next busy day easier.
          </p>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RecipeLibrary recipes={publishedRecipes} />
        </div>
      </section>

      <CTASection
        title="Want the plan around the recipes?"
        description={campaignEnabled
          ? "Join the five-member founding cohort for 12 weeks of personalized training, flexible nutrition, weekly accountability, and direct coaching access."
          : "Get coaching that connects your meals, training, and real schedule into something you can repeat."}
        buttonText={campaignEnabled ? "See Founding Offer" : "Book Free Consultation"}
        buttonHref={campaignEnabled ? "https://cooper.fitness/#founding-offer" : "https://cooper.fitness/#contact"}
        buttonTarget="_blank"
      />
    </div>
  );
}
