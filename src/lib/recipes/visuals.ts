import type { Recipe } from "./types";

type RecipeVisual = {
  ingredient: string;
  src: string;
  alt: string;
};

const VISUALS: Record<string, RecipeVisual> = {
  avocado: { ingredient: "Avocado", src: "/recipes/avocado.jpg", alt: "Fresh avocado halves" },
  banana: { ingredient: "Banana", src: "/recipes/banana.jpg", alt: "Ripe bananas" },
  berries: { ingredient: "Berries", src: "/recipes/berries.jpg", alt: "Fresh berries in a bowl" },
  beef: { ingredient: "Lean beef", src: "/recipes/beef.jpg", alt: "Sliced grilled beef" },
  beans: { ingredient: "Beans", src: "/recipes/beans.jpg", alt: "Beans in a white bowl" },
  chicken: { ingredient: "Chicken", src: "/recipes/chicken-alt2.jpg", alt: "Sliced chicken with rice and vegetables" },
  cottageCheese: { ingredient: "Cottage cheese", src: "/recipes/yogurt.jpg", alt: "Creamy yogurt bowl with fresh fruit" },
  eggs: { ingredient: "Eggs", src: "/recipes/eggs.jpg", alt: "Eggs ready for breakfast" },
  energyBites: { ingredient: "Energy bites", src: "/recipes/energy-bites.jpg", alt: "Homemade energy bites with nuts" },
  vegetables: { ingredient: "Vegetables", src: "/recipes/vegetables.jpg", alt: "Colourful vegetables in a bowl" },
  hummus: { ingredient: "Hummus", src: "/recipes/hummus.jpg", alt: "Hummus with olive oil and herbs" },
  lentils: { ingredient: "Lentils", src: "/recipes/lentils.jpg", alt: "Seasoned lentils in a bowl" },
  nuts: { ingredient: "Nuts & seeds", src: "/recipes/nuts.jpg", alt: "Mixed nuts and seeds" },
  oats: { ingredient: "Oats", src: "/recipes/oats.jpg", alt: "Warm oats in a breakfast bowl" },
  pasta: { ingredient: "Pasta", src: "/recipes/pasta.jpg", alt: "Pasta with fresh ingredients" },
  potatoes: { ingredient: "Potatoes", src: "/recipes/potatoes.jpg", alt: "Roasted potatoes" },
  rice: { ingredient: "Rice", src: "/recipes/rice.jpg", alt: "Steamed rice in a bowl" },
  salmon: { ingredient: "Salmon", src: "/recipes/salmon.jpg", alt: "Cooked salmon with vegetables" },
  shrimp: { ingredient: "Shrimp", src: "/recipes/shrimp.jpg", alt: "Fresh shrimp in a bowl" },
  tuna: { ingredient: "Tuna", src: "/recipes/salmon.jpg", alt: "Fresh fish with vegetables" },
  turkey: { ingredient: "Turkey", src: "/recipes/chicken-alt2.jpg", alt: "Sliced turkey with rice and vegetables" },
  yogurt: { ingredient: "Greek yogurt", src: "/recipes/yogurt.jpg", alt: "Greek yogurt with fruit" },
};

const RULES: Array<{ key: keyof typeof VISUALS; terms: string[] }> = [
  { key: "energyBites", terms: ["energy bite", "trail mix"] },
  { key: "hummus", terms: ["hummus"] },
  { key: "shrimp", terms: ["shrimp", "prawn"] },
  { key: "salmon", terms: ["salmon"] },
  { key: "tuna", terms: ["tuna"] },
  { key: "chicken", terms: ["chicken"] },
  { key: "beef", terms: ["beef"] },
  { key: "turkey", terms: ["turkey"] },
  { key: "avocado", terms: ["avocado"] },
  { key: "berries", terms: ["berries", "berry", "blueberry", "strawberry"] },
  { key: "banana", terms: ["banana"] },
  { key: "eggs", terms: ["egg"] },
  { key: "cottageCheese", terms: ["cottage cheese"] },
  { key: "yogurt", terms: ["yogurt", "kefir"] },
  { key: "oats", terms: ["oat", "granola"] },
  { key: "pasta", terms: ["pasta", "orzo"] },
  { key: "rice", terms: ["rice"] },
  { key: "potatoes", terms: ["potato"] },
  { key: "lentils", terms: ["lentil"] },
  { key: "beans", terms: ["bean", "chickpea"] },
  { key: "nuts", terms: ["nut", "almond", "peanut", "seed", "tahini"] },
  { key: "vegetables", terms: ["vegetable", "broccoli", "cabbage", "carrot", "zucchini", "spinach"] },
];

const FALLBACK = VISUALS.vegetables;

export function getRecipeVisual(recipe: Recipe): RecipeVisual {
  const searchable = `${recipe.title} ${recipe.ingredients.join(" ")}`.toLowerCase();
  const match = RULES.find((rule) => rule.terms.some((term) => searchable.includes(term)));

  return match ? VISUALS[match.key] : FALLBACK;
}
