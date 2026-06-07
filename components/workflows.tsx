"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCategoryCounts, CategoryCount } from "@/lib/api";

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

const CAT_ICONS: Record<string, string> = {
  ai: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  cloud: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
  database: "M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4m0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4",
  devops: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  frontend: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  kubernetes: "M12 2l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z M12 22l-2-4h-4l3-3-1-4 4 2 4-2-1 4 3 3h-4z",
  productivity: "M13 10V3L4 14h7v7l9-11h-7z",
  security: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  testing: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  backend: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
};

export default function Workflows() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    getCategoryCounts().then((res) => {
      if (cancelled) return;
      const map: Record<string, number> = {};
      for (const c of res.data.counts) map[c.slug] = c.count;
      setCounts(map);
    }).catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return (
    <section>
      <style>{`
        @keyframes cat-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .cat-track {
          animation: cat-marquee 60s linear infinite;
          width: fit-content;
        }
        .cat-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                Browse by Category
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Find exactly what you need
            </h2>
            <p className="text-lg text-indigo-200/65">
              Every CLI tool is categorized by purpose. Click a category to explore.
            </p>
          </div>

          <div className="overflow-hidden">
            <div className="cat-track flex gap-5">
              {[...CATEGORIES, ...CATEGORIES].map((cat, idx) => (
                <Link
                  key={`${cat.slug}-${idx}`}
                  href={`/browse?category=${cat.slug}`}
                  className="group flex w-64 shrink-0 flex-col gap-3 rounded-2xl border border-gray-800 bg-gray-900/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10">
                      <svg className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={CAT_ICONS[cat.slug]} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-nacelle text-base font-semibold text-gray-200">{cat.name}</h3>
                      <span className="text-xs text-indigo-400">{counts[cat.slug] ?? "•"} tools</span>
                    </div>
                  </div>
                  <p className="text-sm text-indigo-200/65 leading-snug">{cat.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
