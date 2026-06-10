import type { Metadata } from "next";
import ToolDetailClient from "@/components/tool-detail-client";
import Breadcrumb from "@/components/breadcrumb";

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

  const seo = tool.seo || {};
  const title = seo.metaTitle || `${tool.displayName} — CLI Hub`;
  const description = seo.metaDescription || tool.tagline || tool.description?.slice(0, 160) || `Learn about ${tool.displayName} CLI tool`;

  const ogTitle = seo.ogTitle || title;
  const ogDesc = seo.ogDescription || description;

  const ogImage = seo.ogImage
    ? { url: seo.ogImage, width: 1200, height: 630, alt: ogTitle }
    : tool.iconUrl
      ? { url: tool.iconUrl, width: 256, height: 256, alt: tool.displayName }
      : { url: "/images/hero-image-01.jpg", width: 1920, height: 918, alt: title };

  return {
    title,
    description,
    alternates: {
      canonical: `/tool/${tool.name}`,
    },
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      type: "article",
      url: `${BASE_URL}/tool/${tool.name}`,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDesc,
      images: [ogImage.url],
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
      <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6">
        <Breadcrumb
          items={[
            { label: "CLI Hub", href: "/" },
            ...(catName ? [{ label: catName, href: `/browse?category=${catSlug}` }] : []),
            { label: tool.displayName },
          ]}
        />
      </div>
      <ToolDetailClient tool={tool} />
    </>
  );
}
