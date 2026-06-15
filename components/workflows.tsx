"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCategoryCounts } from "@/lib/api";

const CATEGORIES = [
  "AI", "Cloud", "Database", "DevOps", "Frontend",
  "Kubernetes", "Productivity", "Security", "Testing", "Backend",
];

export default function Workflows() {
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
      <style>{`
        @keyframes cat-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scroll-track {
          animation: cat-scroll 50s linear infinite;
          width: fit-content;
        }
        .scroll-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-16">
          <div className="pb-6 text-center">
            <h2 className="font-nacelle text-2xl font-semibold text-gray-200 md:text-3xl">
              Browse by Category
            </h2>
          </div>

          <div className="overflow-hidden">
            <div className="scroll-track flex gap-3">
              {[...CATEGORIES, ...CATEGORIES].map((name, idx) => {
                const slug = name.toLowerCase();
                const count = counts[slug];
                return (
                  <Link
                    key={`${slug}-${idx}`}
                    href={`/browse?category=${slug}`}
                    className="flex shrink-0 items-center gap-2 rounded-full border border-gray-700 bg-gray-900/60 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-indigo-500/40 hover:text-indigo-300"
                  >
                    {name}
                    {count != null && (
                      <span className="rounded-full bg-gray-800 px-2 py-0.5 text-[10px] tabular-nums text-gray-500">
                        {count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
