import type { Metadata } from "next";
import { Suspense } from "react";
import BrowseContent from "./browse-content";

const API_URL = process.env.API_URL || "http://localhost:3000";
const BASE_URL = "https://getcli.vercel.app";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const category = params.category;
  const search = params.search;

  let title = "Browse CLI Tools — CLI Hub";
  let description =
    "Browse our curated collection of command-line tools for developers. Search by category or keyword to find the perfect CLI tool for your workflow.";

  if (category) {
    try {
      const res = await fetch(`${API_URL}/api/v1/cli-tools/categories`, {
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        const body = await res.json();
        const cat = body.data?.categories?.find((c: { slug: string; name: string }) => c.slug === category);
        if (cat) {
          title = `${cat.name} CLI Tools — CLI Hub`;
          description = `Browse our curated collection of ${cat.name.toLowerCase()} CLI tools and command-line utilities. Find the best ${cat.name.toLowerCase()} tools for your terminal workflow.`;
        }
      }
    } catch {}
  }

  if (search) {
    const prefix = category ? `"${search}" in ${category.charAt(0).toUpperCase() + category.slice(1)}` : `"${search}" CLI Tools`;
    title = `${prefix} — CLI Hub`;
    description = `Search results for "${search}" — find CLI tools matching your query in our curated directory.`;
  }

  return {
    title,
    description,
    alternates: { canonical: "/browse" },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/browse`,
      images: [{ url: "/images/hero-image-01.jpg", width: 1920, height: 918, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/hero-image-01.jpg"],
    },
  };
}

async function fetchToolsForLd() {
  try {
    const res = await fetch(`${API_URL}/api/v1/cli-tools?limit=50`, {
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return [];
    const body = await res.json();
    return body.data?.tools || [];
  } catch {
    return [];
  }
}

export default async function BrowsePage() {
  const tools = await fetchToolsForLd();

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Browse CLI Tools",
    description: "Curated collection of command-line tools for developers",
    numberOfItems: tools.length,
    itemListElement: tools.map((t: any, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: t.displayName,
        description: t.tagline || t.description?.slice(0, 160),
        url: `${BASE_URL}/tool/${t.name}`,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "All",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <Suspense fallback={<div className="flex justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" /></div>}>
        <BrowseContent />
      </Suspense>
    </>
  );
}
