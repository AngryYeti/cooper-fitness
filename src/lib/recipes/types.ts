export type RecipeCategory =
  | "breakfast"
  | "lunch"
  | "dinner"
  | "snack"
  | "meal-prep"
  | "staple";

export type RecipeTag =
  | "high-protein"
  | "high-fibre"
  | "freezer-friendly"
  | "vegetarian"
  | "no-cook"
  | "one-pan"
  | "make-ahead";

export type RecipeNutrition = {
  calories?: number;
  protein?: number;
  fat?: number;
  carbs?: number;
  fibre?: number;
};

export type RecipeSource = {
  label: string;
  url: string;
  note?: string;
};

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
