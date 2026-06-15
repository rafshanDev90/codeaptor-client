"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getCategoryCounts } from "@/lib/api";

export default function HeroHome() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [stats, setStats] = useState({ tools: 0, categories: 0 });

  useEffect(() => {
    getCategoryCounts()
      .then((res) => {
        const counts = res.data.counts;
        const total = counts.reduce((s: number, c: any) => s + c.count, 0);
        setStats({ tools: total, categories: counts.length });
      })
      .catch(() => {});
  }, []);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) router.push(`/browse?search=${encodeURIComponent(query.trim())}`);
    },
    [query, router]
  );

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          <div className="pb-6 text-center md:pb-10">
            <h1
              className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-4xl font-semibold text-transparent md:text-5xl"
              data-aos="fade-up"
            >
              Discover the best CLI tools
            </h1>
            <p
              className="mx-auto max-w-2xl text-base text-indigo-200/65 md:text-lg"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              Curated command-line tools for developers. Search, browse, and find the perfect CLI for your workflow.
            </p>
          </div>

          {/* Search bar — Amazon style */}
          <div className="mx-auto max-w-2xl" data-aos="fade-up" data-aos-delay={200}>
            <form onSubmit={handleSearch} className="flex items-center overflow-hidden rounded-xl bg-gray-800 ring-1 ring-gray-700 transition-all focus-within:ring-2 focus-within:ring-indigo-500">
              <div className="flex items-center pl-4 pr-2 text-gray-500">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search 200+ CLI tools..."
                className="flex-1 bg-transparent py-3.5 text-base text-gray-200 placeholder-gray-500 outline-none"
              />
              <button
                type="submit"
                className="flex items-center gap-2 bg-indigo-600 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
              >
                Search
              </button>
            </form>
          </div>

          {/* Stats bar — positioned close under search, well above overlap zone */}
          <div
            className="mx-auto mt-6 flex flex-wrap justify-center gap-x-10 gap-y-3 text-center"
            data-aos="fade-up"
            data-aos-delay={300}
          >
            <div>
              <div className="font-nacelle text-2xl font-bold text-gray-100">
                {stats.tools || "200+"}
              </div>
              <div className="text-xs text-gray-500">CLI Tools</div>
            </div>
            <div>
              <div className="font-nacelle text-2xl font-bold text-gray-100">
                {stats.categories || "15+"}
              </div>
              <div className="text-xs text-gray-500">Categories</div>
            </div>
            <div>
              <div className="font-nacelle text-2xl font-bold text-gray-100">
                Curated
              </div>
              <div className="text-xs text-gray-500">By Developers</div>
            </div>
          </div>
        </div>

        {/* Extra bottom spacing so overlap only hits empty gradient zone */}
        <div className="h-24 md:h-40" />
      </div>

      {/* Gradient fade for overlap with grid below */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none" />
    </section>
  );
}
