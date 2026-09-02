import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Recipe } from "@/lib/recipes/types";
import { getRecipeVisual } from "@/lib/recipes/visuals";

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

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const visibleTag = recipe.tags[0];
  const visual = getRecipeVisual(recipe);

  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group block rounded-[20px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card className="h-full overflow-hidden border-white/10 bg-white/[0.035] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/60 group-hover:bg-white/[0.06]">
        <div className="relative h-44 overflow-hidden bg-muted">
          <Image
            src={visual.src}
            alt={visual.alt}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5" />
          <div className="absolute inset-x-5 top-4 flex items-center justify-between gap-3 text-[0.65rem] font-mono uppercase tracking-[0.16em] text-white/85">
            <span className="rounded-full border border-white/25 bg-black/35 px-2.5 py-1 backdrop-blur-sm">{CATEGORY_LABELS[recipe.category]}</span>
            <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-2.5 py-1 backdrop-blur-sm"><Clock3 className="h-3.5 w-3.5" /> {recipe.activeMinutes} min</span>
          </div>
          <div className="absolute bottom-4 left-5">
            <span className="text-[0.65rem] font-mono uppercase tracking-[0.15em] text-white/75">Built around</span>
            <p className="mt-1 text-base font-medium text-white">{visual.ingredient}</p>
          </div>
        </div>
        <CardHeader className="gap-3 pb-3">
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-xl leading-tight transition-colors group-hover:text-primary">
              {recipe.title}
            </CardTitle>
            <ArrowUpRight className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{recipe.summary}</p>
        </CardHeader>
        <CardContent className="flex min-h-[56px] flex-wrap content-start gap-2">
          {recipe.nutrition.protein !== undefined && (
            <Badge variant="outline">{recipe.nutrition.protein}g protein</Badge>
          )}
          {recipe.nutrition.carbs !== undefined && (
            <Badge variant="outline">{recipe.nutrition.carbs}g carbs</Badge>
          )}
          {recipe.nutrition.fat !== undefined && (
            <Badge variant="outline">{recipe.nutrition.fat}g fat</Badge>
          )}
          {recipe.nutrition.fibre !== undefined && (
            <Badge variant="outline">{recipe.nutrition.fibre}g fibre</Badge>
          )}
          {visibleTag && <Badge variant="secondary">{TAG_LABELS[visibleTag] ?? visibleTag}</Badge>}
        </CardContent>
      </Card>
    </Link>
  );
}
