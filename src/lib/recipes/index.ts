import { breakfastRecipes } from "./breakfasts";
import { dinnerRecipes } from "./dinners";
import { lunchRecipes } from "./lunches";
import { mealPrepRecipes } from "./meal-prep";
import { snackRecipes } from "./snacks";
import type { Recipe, RecipeCategory } from "./types";

const recipes: Recipe[] = [
  ...breakfastRecipes,
  ...lunchRecipes,
  ...dinnerRecipes,
  ...snackRecipes,
  ...mealPrepRecipes,
];

export const recipeCategories: { id: RecipeCategory; label: string }[] = [
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
  { id: "snack", label: "Snack" },
  { id: "meal-prep", label: "Meal prep" },
  { id: "staple", label: "Staples" },
];

export const publishedRecipes = recipes.filter((recipe) => recipe.published);

export function getRecipe(slug: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.slug === slug && recipe.published);
}
