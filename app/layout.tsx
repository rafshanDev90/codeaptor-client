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

export const metadata = {
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
  },
  twitter: {
    card: "summary_large_image",
    title: "CLI Hub — Curated CLI Tools Directory",
    description: "Discover the best command-line tools for developers. Search, browse, and find the perfect CLI tool for your workflow.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CLI Hub",
  description: "Curated directory of command-line tools for developers. Search, browse, and find the perfect CLI tool for your workflow.",
  url: "https://getcli.vercel.app",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "All",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
