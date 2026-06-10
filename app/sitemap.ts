import type { MetadataRoute } from "next";

export const revalidate = 86400;

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
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const apiUrl = process.env.API_URL || "http://localhost:3000";

  const [toolsRes, catsRes] = await Promise.allSettled([
    fetch(`${apiUrl}/api/v1/cli-tools?limit=1000`, { signal: AbortSignal.timeout(3000) }),
    fetch(`${apiUrl}/api/v1/cli-tools/categories`, { signal: AbortSignal.timeout(3000) }),
  ]);

  if (toolsRes.status === "fulfilled" && toolsRes.value.ok) {
    try {
      const body = await toolsRes.value.json();
      const tools = body.data?.tools || [];
      for (const tool of tools) {
        const date = tool.updatedAt || tool.createdAt;
        entries.push({
          url: `${BASE_URL}/tool/${tool.name}`,
          lastModified: date ? new Date(date) : new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    } catch {}
  }

  if (catsRes.status === "fulfilled" && catsRes.value.ok) {
    try {
      const body = await catsRes.value.json();
      const categories = body.data?.categories || [];
      for (const cat of categories) {
        entries.push({
          url: `${BASE_URL}/browse?category=${cat.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.5,
        });
      }
    } catch {}
  }

  return entries;
}
