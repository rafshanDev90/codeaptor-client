"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getTools, getCategories, CliTool } from "@/lib/api";
import ToolIcon from "@/components/tool-icon";

const PKG_COLORS: Record<string, string> = {
  npm: "#cb3837", pip: "#3775a9", brew: "#fbb040",
  go: "#00add8", cargo: "#f97316", apt: "#e95420",
};

export default function BrowseContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tools, setTools] = useState<CliTool[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string; slug: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get("search") || "");

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const params: Record<string, string> = {};
        if (search) params.search = search;
        if (category) params.category = category;
        const [toolsRes, catRes] = await Promise.all([getTools(params), getCategories()]);
        setTools(toolsRes.data.tools);
        setCategories(catRes.data.categories);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [search, category]);

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      router.push(`/browse?${params.toString()}`);
    },
    [searchParams, router]
  );

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    updateParams("search", query.trim());
  }

  function toggleCategory(slug: string) {
    updateParams("category", category === slug ? "" : slug);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 font-nacelle text-3xl font-semibold text-gray-200">Browse CLI Tools</h1>

      {/* Search */}
      <form onSubmit={handleSearch} className="relative mb-6 max-w-xl">
        <svg className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search CLI tools..."
          className="w-full rounded-xl border border-gray-700 bg-gray-800/60 py-3 pl-12 pr-4 text-base text-gray-200 placeholder-gray-500 outline-none transition-colors focus:border-indigo-500"
        />
      </form>

      {/* Category filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => toggleCategory("")}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
            !category
              ? "border-indigo-500 bg-indigo-500/20 text-indigo-300"
              : "border-gray-700 text-gray-400 hover:border-indigo-500/50 hover:text-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => toggleCategory(cat.slug)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              category === cat.slug
                ? "border-indigo-500 bg-indigo-500/20 text-indigo-300"
                : "border-gray-700 text-gray-400 hover:border-indigo-500/50 hover:text-gray-200"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
        </div>
      ) : tools.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-gray-400">No tools found</p>
          <p className="mt-1 text-sm text-gray-500">Try different search terms or category</p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-gray-500">{tools.length} tool{tools.length !== 1 ? "s" : ""} found</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((tool) => {
              const cat = tool.category;
              const catName = typeof cat === "object" ? cat.name : "";
              const pkgColor = PKG_COLORS[tool.packageManager || ""];

              return (
                <Link
                  key={tool._id}
                  href={`/tool/${tool.name}`}
                  className="group block rounded-2xl border border-gray-800 bg-gray-900 p-5 transition-all hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5"
                >
                  <div className="flex items-start gap-3">
                    <ToolIcon iconUrl={tool.iconUrl} displayName={tool.displayName} size={40} />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-nacelle text-base font-semibold text-gray-200">
                        {tool.displayName}
                      </h3>
                      {catName && (
                        <span className="mt-0.5 inline-block rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-300">
                          {catName}
                        </span>
                      )}
                    </div>
                    {pkgColor && (
                      <span
                        className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold text-white"
                        style={{ backgroundColor: pkgColor }}
                      >
                        {tool.packageManager}
                      </span>
                    )}
                  </div>

                  {tool.description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-400">
                      {tool.description}
                    </p>
                  )}

                  <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                    {tool.metrics?.stars > 0 && (
                      <span className="flex items-center gap-1">
                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.751.751 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                        </svg>
                        {(tool.metrics.stars / 1000).toFixed(1)}k
                      </span>
                    )}
                    {tool.language && <span>{tool.language}</span>}
                    <span className="ml-auto text-indigo-400 opacity-0 transition-opacity group-hover:opacity-100">
                      Details &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
