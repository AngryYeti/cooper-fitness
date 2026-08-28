import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Recipe } from "@/lib/recipes/types";

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

const CATEGORY_STYLES: Record<Recipe["category"], string> = {
  breakfast: "from-amber-200/30 via-orange-100/10 to-transparent",
  lunch: "from-emerald-200/25 via-teal-100/10 to-transparent",
  dinner: "from-sky-200/25 via-blue-100/10 to-transparent",
  snack: "from-rose-200/25 via-pink-100/10 to-transparent",
  "meal-prep": "from-violet-200/25 via-indigo-100/10 to-transparent",
  staple: "from-cyan-200/25 via-sky-100/10 to-transparent",
};

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const visibleTag = recipe.tags[0];

  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group block rounded-[20px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card className="h-full overflow-hidden border-white/10 bg-white/[0.035] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/60 group-hover:bg-white/[0.06]">
        <div className={`relative h-32 overflow-hidden bg-gradient-to-br ${CATEGORY_STYLES[recipe.category]}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_45%)]" />
          <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-[0.65rem] font-mono uppercase tracking-[0.18em] text-foreground/65">
            <span>{CATEGORY_LABELS[recipe.category]}</span>
            <span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" /> {recipe.activeMinutes} min hands-on</span>
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
          {recipe.nutrition.fibre !== undefined && (
            <Badge variant="outline">{recipe.nutrition.fibre}g fibre</Badge>
          )}
          {visibleTag && <Badge variant="secondary">{TAG_LABELS[visibleTag] ?? visibleTag}</Badge>}
        </CardContent>
      </Card>
    </Link>
  );
}
