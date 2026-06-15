"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCategoryCounts } from "@/lib/api";

const CAT_ICONS: Record<string, string> = {
  ai: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  cloud: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
  database: "M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4m0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4",
  devops: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z",
  frontend: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  kubernetes: "M12 2l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4zM12 22l-2-4h-4l3-3-1-4 4 2 4-2-1 4 3 3h-4z",
  productivity: "M13 10V3L4 14h7v7l9-11h-7z",
  security: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  testing: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  backend: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
};

const CATEGORIES = [
  { name: "AI", slug: "ai", desc: "Machine learning, LLMs, AI agents" },
  { name: "Cloud", slug: "cloud", desc: "AWS, GCP, Azure, serverless" },
  { name: "Database", slug: "database", desc: "SQL, NoSQL, caching, search" },
  { name: "DevOps", slug: "devops", desc: "CI/CD, Docker, infrastructure" },
  { name: "Frontend", slug: "frontend", desc: "Build tools, React, bundlers" },
  { name: "Kubernetes", slug: "kubernetes", desc: "K8s, Helm, monitoring" },
  { name: "Productivity", slug: "productivity", desc: "Terminal, Git, automation" },
  { name: "Security", slug: "security", desc: "Vulnerability scanning, audit" },
  { name: "Testing", slug: "testing", desc: "Test runners, E2E, coverage" },
  { name: "Backend", slug: "backend", desc: "Servers, APIs, runtimes" },
];

export default function PopularCategories() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    getCategoryCounts()
      .then((res) => {
        if (cancelled) return;
        const map: Record<string, number> = {};
        for (const c of res.data.counts) map[c.slug] = c.count;
        setCounts(map);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t border-gray-800 pb-12 pt-12 md:pb-20 md:pt-16">
          <div className="pb-8 text-center">
            <h2 className="font-nacelle text-2xl font-semibold text-gray-200 md:text-3xl">
              Popular Categories
            </h2>
            <p className="mt-2 text-indigo-200/65">
              Browse CLI tools by category to find exactly what you need
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.filter((c) => (counts[c.slug] ?? 0) > 0).map((cat, idx) => (
              <Link
                key={cat.slug}
                href={`/browse?category=${cat.slug}`}
                className="group flex items-start gap-4 rounded-2xl border border-gray-800 bg-gray-900/60 p-5 transition-all hover:-translate-y-0.5 hover:border-indigo-500/40 hover:shadow-lg"
                data-aos="fade-up"
                data-aos-delay={(idx % 3) * 80}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10">
                  <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={CAT_ICONS[cat.slug]} />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-nacelle text-base font-semibold text-gray-200">{cat.name}</h3>
                    <span className="shrink-0 rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-300">
                      {counts[cat.slug] ?? 0}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-indigo-200/65">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-700 px-5 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:border-gray-600 hover:text-gray-200"
            >
              View all categories
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
