import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { publishedPosts } from "@/lib/blog/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/programs",
    "/pricing",
    "/services/online-weight-loss-coaching",
    "/services/online-personal-training",
    "/services/nutrition-coaching",
    "/faq",
    "/testimonials",
    "/blog",
  ];

  const blogRoutes = publishedPosts.map((post) => `/blog/${post.slug}`);

  return [...routes, ...blogRoutes].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
