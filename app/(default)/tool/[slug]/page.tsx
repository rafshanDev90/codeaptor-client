import type { Metadata } from "next";
import ToolDetailClient from "@/components/tool-detail-client";

const API_URL = process.env.API_URL || "http://localhost:3000";
const BASE_URL = "https://getcli.vercel.app";

async function fetchTool(slug: string) {
  try {
    const res = await fetch(`${API_URL}/api/v1/cli-tools/${slug}`, {
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data.tool;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = await fetchTool(slug);

  if (!tool) {
    return { title: "Tool Not Found" };
  }

  const title = `${tool.displayName} — CLI Hub`;
  const description = tool.tagline || tool.description?.slice(0, 160) || `Learn about ${tool.displayName} CLI tool`;

  return {
    title,
    description,
    alternates: {
      canonical: `/tool/${tool.name}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${BASE_URL}/tool/${tool.name}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = await fetchTool(slug);

  if (!tool) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-red-400">Tool not found</p>
        <a href="/browse" className="mt-2 inline-block text-indigo-400 hover:underline">&larr; Back to browse</a>
      </div>
    );
  }

  const cat = tool.category;
  const catName = typeof cat === "object" ? cat.name : "";
  const catSlug = typeof cat === "object" ? cat.slug : "";

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.displayName,
    description: tool.tagline || tool.description?.slice(0, 160),
    url: `${BASE_URL}/tool/${tool.name}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    ...(tool.officialUrl && { url: tool.officialUrl }),
    ...(tool.metrics?.stars > 0 && {
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: Math.min(5, Math.round((tool.metrics.stars / 1000) * 5) / 5),
        ratingCount: tool.metrics.stars,
      },
    }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "CLI Hub",
        item: BASE_URL,
      },
      ...(catName
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: catName,
              item: `${BASE_URL}/browse?category=${catSlug}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: tool.displayName,
            },
          ]
        : [
            {
              "@type": "ListItem",
              position: 2,
              name: tool.displayName,
            },
          ]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ToolDetailClient tool={tool} />
    </>
  );
}
