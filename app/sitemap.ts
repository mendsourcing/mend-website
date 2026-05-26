import type { MetadataRoute } from "next";

const BASE_URL = "https://mendsourcing.com";

const routes = [
  "",
  "/govscraper",
  "/packaging-logistics",
  "/govtraining",
  "/masterclass",
  "/jumpstart",
  "/upcoming-courses",
  "/government-contracting",
  "/government-defense-contracting",
  "/federal",
  "/part-identifier",
  "/about-us",
  "/quality",
  "/po-terms-conditions",
  "/ppe-safety-distribution",
  "/blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/blog" ? "daily" : "weekly",
    priority: path === "" ? 1.0 : path === "/federal" ? 0.9 : 0.7,
  }));
}
