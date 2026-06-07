"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getTools, getCategories, CliTool } from "@/lib/api";

export default function Testimonials() {
  const [toolCount, setToolCount] = useState<number | null>(null);
  const [catCount, setCatCount] = useState<number | null>(null);
  const [featured, setFeatured] = useState<CliTool | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fallback = setTimeout(() => {
      if (!cancelled) {
        setToolCount(77);
        setCatCount(10);
      }
    }, 4000);

    async function load() {
      try {
        const [toolsRes, catRes] = await Promise.all([
          getTools(),
          getCategories(),
        ]);
        if (cancelled) return;
        clearTimeout(fallback);
        setToolCount(toolsRes.results);
        setCatCount(catRes.data.categories.length);
        const ft = toolsRes.data.tools.find((t) => t.isFeatured);
        if (ft) setFeatured(ft);
      } catch (e) {
        console.error("Testimonials error:", e);
        if (!cancelled) setError(String(e));
      }
    }
    load();
    return () => { cancelled = true; clearTimeout(fallback); };
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="border-t border-gray-800 py-12 md:py-20">
        <div className="mx-auto max-w-3xl pb-12 text-center">
          <span className="inline-flex items-center gap-3 pb-3 text-sm text-indigo-200/65">
            <span className="h-px w-8 bg-indigo-200/30" />
            CLI Hub by the Numbers
            <span className="h-px w-8 bg-indigo-200/30" />
          </span>
          <h2 className="pb-4 font-nacelle text-3xl font-semibold text-gray-200 md:text-4xl">
            Curated, categorized, and powered by ML
          </h2>
          <p className="text-lg text-indigo-200/65">
            Every number represents hours saved searching GitHub for the right tool.
          </p>
        </div>

        <div className="mx-auto grid max-w-sm items-stretch gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div className="flex h-full flex-col">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/15">
                <svg className="h-5 w-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="mb-1 font-nacelle text-4xl font-semibold text-gray-200">{toolCount ?? "—"}</div>
              <div className="text-sm font-medium text-gray-400">Curated CLI Tools</div>
              <p className="mt-2 text-sm text-indigo-200/65">
                Every tool is vetted, categorized, and kept up to date. No abandoned repos, no spam.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div className="flex h-full flex-col">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/15">
                <svg className="h-5 w-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <div className="mb-1 font-nacelle text-4xl font-semibold text-gray-200">{catCount ?? "—"}</div>
              <div className="text-sm font-medium text-gray-400">ML-Classified Categories</div>
              <p className="mt-2 text-sm text-indigo-200/65">
                From AI to Kubernetes — our neural network sorts every tool into the right bucket.
              </p>
            </div>
          </div>

          {featured ? (
            <Link
              href={`/tool/${featured.name}`}
              className="group rounded-2xl border border-gray-800 bg-gray-900 p-6 transition-all hover:border-indigo-500/50"
            >
              <div className="flex h-full flex-col">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/15">
                  <svg className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="mb-1 font-nacelle text-lg font-semibold text-gray-200 group-hover:text-indigo-300">
                  {featured.displayName}
                </div>
                <div className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                  Featured Tool
                </div>
                <p className="mb-3 line-clamp-3 text-sm text-indigo-200/65">
                  {featured.description}
                </p>
                <div className="mt-auto flex items-center gap-2 text-xs text-gray-500">
                  {featured.language && (
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-indigo-400" />
                      {featured.language}
                    </span>
                  )}
                  <span className="ml-auto text-indigo-400 opacity-0 transition-opacity group-hover:opacity-100">
                    Details &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ) : (
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
              <div className="flex h-full flex-col items-center justify-center py-8 text-center">
                <p className="text-sm text-gray-500">{error ? "Failed to load" : "Loading featured tool..."}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
