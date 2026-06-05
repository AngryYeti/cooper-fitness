import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

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

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
