"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { RecipeCard } from "@/components/recipes/recipe-card";
import { recipeCategories } from "@/lib/recipes";
import type { Recipe, RecipeCategory } from "@/lib/recipes/types";

type SortOption = "recommended" | "fastest" | "protein";
type CategoryFilter = "all" | RecipeCategory;
type TimeFilter = "all" | "15" | "30" | "45";

const TAG_LABELS: Record<string, string> = {
  "high-protein": "High protein",
  "high-fibre": "High fibre",
  "freezer-friendly": "Freezer friendly",
  vegetarian: "Vegetarian",
};

const TIME_OPTIONS: { value: TimeFilter; label: string }[] = [
  { value: "all", label: "Any time" },
  { value: "15", label: "15 min hands-on" },
  { value: "30", label: "30 min hands-on" },
  { value: "45", label: "45 min hands-on" },
];

export function RecipeLibrary({ recipes }: { recipes: Recipe[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [time, setTime] = useState<TimeFilter>("all");
  const [sort, setSort] = useState<SortOption>("recommended");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setActiveTags((current) => current.includes(tag)
      ? current.filter((value) => value !== tag)
      : [...current, tag]);
  };

  const filteredRecipes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const maxMinutes = time === "all" ? Number.POSITIVE_INFINITY : Number(time);

    const matches = recipes.filter((recipe) => {
      const searchable = [
        recipe.title,
        recipe.summary,
        recipe.category,
        ...recipe.tags,
        ...recipe.ingredients,
      ].join(" ").toLowerCase();

      return (
        (!normalizedQuery || searchable.includes(normalizedQuery)) &&
        (category === "all" || recipe.category === category) &&
        recipe.activeMinutes <= maxMinutes &&
        activeTags.every((tag) => recipe.tags.includes(tag as Recipe["tags"][number]))
      );
    });

    return [...matches].sort((a, b) => {
      if (sort === "fastest") return a.activeMinutes - b.activeMinutes || a.title.localeCompare(b.title);
      if (sort === "protein") return (b.nutrition.protein ?? 0) - (a.nutrition.protein ?? 0) || a.title.localeCompare(b.title);
      return a.category.localeCompare(b.category) || a.title.localeCompare(b.title);
    });
  }, [activeTags, category, query, recipes, sort, time]);

  return (
    <div className="space-y-8">
      <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-4 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div>
            <label htmlFor="recipe-search" className="section-label mb-2 block">Search the library</label>
            <Input
              id="recipe-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search recipes, ingredients, or tags"
              aria-label="Search recipes"
            />
          </div>
          <div>
            <label htmlFor="recipe-sort" className="section-label mb-2 block">Sort by</label>
            <select
              id="recipe-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="flex h-11 w-full rounded-sm border border-border bg-card px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="recommended">Recommended</option>
              <option value="fastest">Fastest first</option>
              <option value="protein">Highest protein</option>
            </select>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <p className="section-label mb-2">Meal</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by meal">
              <button type="button" onClick={() => setCategory("all")} aria-pressed={category === "all"} className={`rounded-full border px-4 py-2 text-sm transition-colors ${category === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"}`}>All recipes</button>
              {recipeCategories.map((item) => (
                <button key={item.id} type="button" onClick={() => setCategory(item.id)} aria-pressed={category === item.id} className={`rounded-full border px-4 py-2 text-sm transition-colors ${category === item.id ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"}`}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="recipe-time" className="section-label mb-2 block">Hands-on time</label>
              <select id="recipe-time" value={time} onChange={(event) => setTime(event.target.value as TimeFilter)} className="flex h-11 w-full rounded-sm border border-border bg-card px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {TIME_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </div>
            <div>
              <p className="section-label mb-2">Priority tags</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(TAG_LABELS).map(([tag, label]) => (
                  <button key={tag} type="button" onClick={() => toggleTag(tag)} aria-pressed={activeTags.includes(tag)} className={`rounded-full border px-3 py-2 text-xs transition-colors ${activeTags.includes(tag) ? "border-primary bg-primary/15 text-foreground" : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {filteredRecipes.length} {filteredRecipes.length === 1 ? "recipe" : "recipes"} found
        </p>
        {(query || category !== "all" || time !== "all" || activeTags.length > 0) && (
          <button type="button" onClick={() => { setQuery(""); setCategory("all"); setTime("all"); setActiveTags([]); }} className="text-sm text-primary underline-offset-4 hover:underline">Clear filters</button>
        )}
      </div>

      {filteredRecipes.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredRecipes.map((recipe) => <RecipeCard key={recipe.slug} recipe={recipe} />)}
        </div>
      ) : (
        <div className="rounded-[24px] border border-dashed border-border px-6 py-14 text-center">
          <p className="text-lg font-medium">Nothing matches those filters yet.</p>
          <p className="mt-2 text-sm text-muted-foreground">Try a broader ingredient search or clear one of the filters.</p>
        </div>
      )}
    </div>
  );
}
