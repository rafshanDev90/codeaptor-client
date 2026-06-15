"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getTools, CliTool } from "@/lib/api";
import ToolIcon from "@/components/tool-icon";

export default function TrendingTools() {
  const [tools, setTools] = useState<CliTool[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        let res = await getTools({ featured: "true", limit: "8" });
        if (cancelled) return;
        if (res.data.tools.length < 4) {
          res = await getTools({ limit: "8" });
          if (cancelled) return;
        }
        setTools(res.data.tools.slice(0, 8));
      } catch {
        if (!cancelled) {
          try {
            const fallback = await getTools({ limit: "8" });
            if (!cancelled) setTools(fallback.data.tools.slice(0, 8));
          } catch {}
        }
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  if (tools.length === 0) return null;

  return (
    <section className="relative z-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Overlap the hero via negative margin */}
        <div className="-mt-16 md:-mt-32 pb-12 md:pb-20">
          <div className="flex items-center justify-between pb-6">
            <h2 className="font-nacelle text-xl font-semibold text-gray-200">
              Trending CLI Tools
            </h2>
            <Link
              href="/browse"
              className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
            >
              Browse all &rarr;
            </Link>
          </div>

          <div className="grid grid-flow-row-dense gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((tool, idx) => {
              const cat = tool.category;
              const catName = typeof cat === "object" ? cat.name : "";
              const tagline = tool.tagline || tool.description?.slice(0, 90);

              return (
                <Link
                  key={tool._id}
                  href={`/tool/${tool.name}`}
                  className="group relative flex flex-col rounded-2xl border border-gray-800 bg-gray-900 p-5 transition-all hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/5"
                  data-aos="fade-up"
                  data-aos-delay={(idx % 4) * 75}
                >
                  {tool.isFeatured && (
                    <span className="absolute right-3 top-3 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-400">
                      Featured
                    </span>
                  )}

                  <div className="flex items-center gap-3">
                    <ToolIcon
                      iconUrl={tool.iconUrl}
                      displayName={tool.displayName}
                      size={36}
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-nacelle text-base font-semibold text-gray-200">
                        {tool.displayName}
                      </h3>
                      {catName && (
                        <span className="inline-block rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-medium text-indigo-300">
                          {catName}
                        </span>
                      )}
                    </div>
                  </div>

                  {tagline && (
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-400">
                      {tagline}
                    </p>
                  )}

                  <div className="mt-auto flex items-center gap-3 pt-4 text-xs text-gray-500">
                    {tool.metrics?.stars != null && tool.metrics.stars > 0 && (
                      <span className="flex items-center gap-1">
                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.751.751 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                        </svg>
                        {(tool.metrics.stars / 1000).toFixed(1)}k
                      </span>
                    )}
                    {tool.language && <span>{tool.language}</span>}
                    {tool.installCommand && (
                      <span className="ml-auto rounded-md bg-gray-800 px-2 py-1 font-mono text-[10px] text-indigo-400 transition-colors group-hover:bg-indigo-500/10">
                        {tool.packageManager
                          ? `${tool.packageManager} install`
                          : "install"}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
