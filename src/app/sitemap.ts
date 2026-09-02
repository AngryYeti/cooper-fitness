import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { publishedPosts } from "@/lib/blog/posts";
import { publishedRecipes } from "@/lib/recipes";

// Bump when static page content meaningfully changes — real dates build
// crawler trust; a fresh Date() on every build does the opposite.
const STATIC_PAGES_UPDATED = new Date("2026-07-17");
const RECIPE_LIBRARY_UPDATED = new Date("2026-08-28");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/programs",
    "/pricing",
    "/founder",
    "/services/online-weight-loss-coaching",
    "/services/online-personal-training",
    "/services/nutrition-coaching",
    "/faq",
    "/testimonials",
    "/blog",
    "/recipes",
  ];

  const staticEntries = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: STATIC_PAGES_UPDATED,
    changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const blogEntries = publishedPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const recipeEntries = publishedRecipes.map((recipe) => ({
    url: `${SITE_URL}/recipes/${recipe.slug}`,
    lastModified: RECIPE_LIBRARY_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries, ...recipeEntries];
}
