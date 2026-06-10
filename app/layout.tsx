import "./css/style.css";

import { Inter } from "next/font/google";
import localFont from "next/font/local";

import Header from "@/components/ui/header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const nacelle = localFont({
  src: [
    {
      path: "../public/fonts/nacelle-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/nacelle-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/nacelle-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/nacelle-semibolditalic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-nacelle",
  display: "swap",
});

const BASE_URL = "https://getcli.vercel.app";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
  title: {
    default: "CLI Hub — Curated CLI Tools Directory",
    template: "%s — CLI Hub",
  },
  description: "Discover the best command-line tools for developers. Search, browse, and find the perfect CLI tool for your workflow.",
  openGraph: {
    title: "CLI Hub — Curated CLI Tools Directory",
    description: "Discover the best command-line tools for developers. Search, browse, and find the perfect CLI tool for your workflow.",
    type: "website",
    siteName: "CLI Hub",
    url: BASE_URL,
    images: [
      {
        url: "/images/hero-image-01.jpg",
        width: 1920,
        height: 918,
        alt: "CLI Hub — Curated CLI Tools Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CLI Hub — Curated CLI Tools Directory",
    description: "Discover the best command-line tools for developers. Search, browse, and find the perfect CLI tool for your workflow.",
    images: ["/images/hero-image-01.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CLI Hub",
  description: "Curated directory of command-line tools for developers. Search, browse, and find the perfect CLI tool for your workflow.",
  url: BASE_URL,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "All",
};

const searchJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/browse?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CLI Hub",
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo.svg`,
  description: "Curated directory of command-line tools for developers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(searchJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${nacelle.variable} bg-gray-950 font-inter text-base text-gray-200 antialiased`}
      >
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
