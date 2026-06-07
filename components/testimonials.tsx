"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getTools, getCategories, CliTool } from "@/lib/api";

export default function Testimonials() {
  const [toolCount, setToolCount] = useState<number | null>(null);
  const [catCount, setCatCount] = useState<number | null>(null);
  const [featured, setFeatured] = useState<CliTool | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [toolsRes, catRes] = await Promise.all([
          getTools(),
          getCategories(),
        ]);
        if (cancelled) return;
        setToolCount(toolsRes.results);
        setCatCount(catRes.data.categories.length);
        const ft = toolsRes.data.tools.find((t) => t.isFeatured);
        if (ft) setFeatured(ft);
      } catch (e) {
        console.error(e);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1] md:py-20">
        <div className="mx-auto max-w-3xl pb-12 text-center">
          <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
            <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
              CLI Hub by the Numbers
            </span>
          </div>
          <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
            Curated, categorized, and powered by ML
          </h2>
          <p className="text-lg text-indigo-200/65">
            Every number represents hours saved searching GitHub for the right tool.
          </p>
        </div>

        <div className="mx-auto grid max-w-sm items-stretch gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
          {/* Stat: Total tools */}
          <div className="relative rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-6 backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
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

          {/* Stat: Categories */}
          <div className="relative rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-6 backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
            <div className="flex h-full flex-col">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/15">
                <svg className="h-5 w-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <div className="mb-1 font-nacelle text-4xl font-semibold text-gray-200">{catCount ?? "—"}</div>
              <div className="text-sm font-medium text-gray-400">ML-Classified Categories</div>
              <p className="mt-2 text-sm text-indigo-200/65">
                From AI to Kubernetes — our neural network sorts every tool into the right bucket (88.3% accuracy).
              </p>
            </div>
          </div>

          {/* Featured tool card */}
          {featured ? (
            <Link
              href={`/tool/${featured.name}`}
              className="group relative rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-6 backdrop-blur-xs transition-all before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:before:[background:linear-gradient(to_right,var(--color-indigo-800),var(--color-indigo-700),var(--color-indigo-800))_border-box]"
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
            <div className="relative rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-6 backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
              <div className="flex h-full flex-col items-center justify-center py-8 text-center">
                <p className="text-sm text-gray-500">No featured tool</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
