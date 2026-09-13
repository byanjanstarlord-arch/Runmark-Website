import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { docArticles } from "@/lib/docs-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/features",
    "/docs",
    "/playground",
    "/changelog",
    "/roadmap",
    "/community",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const docRoutes = Object.keys(docArticles).map((key) => ({
    url: `${siteConfig.siteUrl}/docs/${key}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...routes, ...docRoutes];
}
