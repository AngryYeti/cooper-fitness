import type {
  Recipe,
  RecipeCategory,
  RecipeNutrition,
  RecipeSource,
  RecipeTag,
} from "./types";

type RecipeInput = {
  slug: string;
  title: string;
  summary: string;
  category: RecipeCategory;
  tags?: RecipeTag[];
  activeMinutes: number;
  totalMinutes?: number;
  servings?: number;
  nutrition?: RecipeNutrition;
  ingredients: string[];
  steps: string[];
  storage: string;
  substitutions?: string[];
  shortcut: string;
  contentAngle: string;
  source: RecipeSource;
  published?: boolean;
};

export function defineRecipe(input: RecipeInput): Recipe {
  return {
    ...input,
    tags: input.tags ?? [],
    totalMinutes: input.totalMinutes ?? input.activeMinutes,
    servings: input.servings ?? 4,
    nutrition: input.nutrition ?? {},
    substitutions: input.substitutions ?? [],
    published: input.published ?? true,
  };
}
