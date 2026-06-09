import type { MetadataRoute } from "next";

const BASE_URL = "https://getcli.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/browse`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  try {
    const apiUrl = process.env.API_URL || "http://localhost:3000";
    const res = await fetch(`${apiUrl}/api/v1/cli-tools?limit=200`, {
      signal: AbortSignal.timeout(5000),
    });

    if (res.ok) {
      const { data } = await res.json();
      for (const tool of data.tools) {
        entries.push({
          url: `${BASE_URL}/tool/${tool.name}`,
          lastModified: new Date(tool.updatedAt || tool.createdAt),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }
  } catch {
    // API unavailable during build — return static entries only
  }

  try {
    const apiUrl = process.env.API_URL || "http://localhost:3000";
    const res = await fetch(`${apiUrl}/api/v1/cli-tools/categories`, {
      signal: AbortSignal.timeout(5000),
    });

    if (res.ok) {
      const { data } = await res.json();
      for (const cat of data.categories) {
        entries.push({
          url: `${BASE_URL}/browse?category=${cat.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.5,
        });
      }
    }
  } catch {
    // fallback
  }

  return entries;
}
