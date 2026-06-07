"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getToolBySlug } from "@/lib/api";
import type { CliTool } from "@/lib/api";
import ToolIcon from "@/components/tool-icon";

const PKG_CMD: Record<string, string> = {
  npm: "npm install", pip: "pip install", brew: "brew install",
  go: "go install", cargo: "cargo install", apt: "apt install",
};

export default function ToolDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [tool, setTool] = useState<CliTool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    async function load() {
      try {
        const res = await getToolBySlug(slug);
        setTool(res.data.tool);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) return <div className="flex justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" /></div>;
  if (error) return (
    <div className="py-20 text-center">
      <p className="text-lg text-red-400">{error}</p>
      <Link href="/browse" className="mt-2 inline-block text-indigo-400 hover:underline">&larr; Back to browse</Link>
    </div>
  );
  if (!tool) return null;

  const cat = tool.category;
  const catName = typeof cat === "object" ? cat.name : "";
  const pkgCmd = PKG_CMD[tool.packageManager || ""];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Link href="/browse" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-gray-200">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to browse
      </Link>

      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <ToolIcon iconUrl={tool.iconUrl} displayName={tool.displayName} size={56} />
          <div className="min-w-0 flex-1">
            <h1 className="font-nacelle text-2xl font-bold text-gray-200">{tool.displayName}</h1>
            {catName && (
              <span className="mt-1 inline-block rounded-full bg-indigo-500/10 px-3 py-0.5 text-xs font-medium text-indigo-300">
                {catName}
              </span>
            )}
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            {tool.isFeatured && (
              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">Featured</span>
            )}
            {tool.language && (
              <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-400">{tool.language}</span>
            )}
          </div>
        </div>

        {tool.description && (
          <p className="mt-4 leading-relaxed text-gray-400">{tool.description}</p>
        )}

        {tool.installCommand && (
          <div className="mt-6">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Install</h2>
            <div className="rounded-lg bg-gray-950 px-4 py-3 font-mono text-sm text-cyan-400">
              {pkgCmd ? `${pkgCmd} ${tool.installCommand}` : tool.installCommand}
            </div>
          </div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-800 bg-gray-950/50 p-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Links</h3>
            <div className="space-y-1.5 text-sm">
              <a href={tool.officialUrl} target="_blank" rel="noopener" className="flex items-center gap-2 text-indigo-400 hover:underline">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Official Site
              </a>
              {tool.downloadUrl && (
                <a href={tool.downloadUrl} target="_blank" rel="noopener" className="flex items-center gap-2 text-indigo-400 hover:underline">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download
                </a>
              )}
            </div>
          </div>

          {tool.metrics && (
            <div className="rounded-lg border border-gray-800 bg-gray-950/50 p-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Metrics</h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                {tool.metrics.stars > 0 && (
                  <div>
                    <div className="text-lg font-bold text-gray-200">{(tool.metrics.stars / 1000).toFixed(1)}k</div>
                    <div className="text-[10px] text-gray-500">Stars</div>
                  </div>
                )}
                {tool.metrics.forks > 0 && (
                  <div>
                    <div className="text-lg font-bold text-gray-200">{(tool.metrics.forks / 1000).toFixed(1)}k</div>
                    <div className="text-[10px] text-gray-500">Forks</div>
                  </div>
                )}
                {tool.metrics.downloads > 0 && (
                  <div>
                    <div className="text-lg font-bold text-gray-200">{(tool.metrics.downloads / 1e6).toFixed(1)}M</div>
                    <div className="text-[10px] text-gray-500">Downloads</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {tool.features && tool.features.length > 0 && (
          <div className="mt-6">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Features</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {tool.features.map((f, i) => (
                <div key={i} className="rounded-lg border border-gray-800 bg-gray-950/50 p-3">
                  <div className="font-medium text-gray-200">{f.title}</div>
                  {f.desc && <div className="mt-1 text-sm text-gray-400">{f.desc}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {tool.alternatives && tool.alternatives.length > 0 && (
          <div className="mt-6">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Alternatives</h2>
            <div className="flex flex-wrap gap-2">
              {tool.alternatives.map((alt, i) => (
                <span key={i} className="rounded-full border border-gray-800 bg-gray-950 px-3 py-1 text-xs text-gray-400">{alt}</span>
              ))}
            </div>
          </div>
        )}

        {tool.docs?.quickStart && (
          <div className="mt-6">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Quick Start</h2>
            <div className="rounded-lg bg-gray-950 px-4 py-3 font-mono text-sm leading-relaxed text-cyan-400 whitespace-pre-wrap">{tool.docs.quickStart}</div>
          </div>
        )}

        {tool.seo?.keywords && tool.seo.keywords.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-1.5">
            {tool.seo.keywords.map((kw, i) => (
              <span key={i} className="rounded bg-gray-800 px-2 py-0.5 text-[10px] text-gray-500">{kw}</span>
            ))}
          </div>
        )}

        <div className="mt-6 border-t border-gray-800 pt-4 text-xs text-gray-500">
          Added on {new Date(tool.createdAt).toLocaleDateString()}
          {tool.version && <> &middot; v{tool.version}</>}
          {tool.packageManager && <> &middot; {tool.packageManager}</>}
        </div>
      </div>
    </div>
  );
}
