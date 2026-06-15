import Link from "next/link";
import ToolIcon from "@/components/tool-icon";

interface SimilarTool {
  _id: string;
  name: string;
  displayName: string;
  tagline?: string;
  description?: string;
  iconUrl?: string;
  packageManager?: string;
  language?: string;
  metrics?: {
    stars?: number;
    forks?: number;
    downloads?: number;
  };
  category?: { _id: string; name: string; slug: string } | string;
}

export default function SimilarTools({ tools }: { tools: SimilarTool[] }) {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-8 sm:px-6">
      <h2 className="mb-4 font-nacelle text-xl font-semibold text-gray-200">Similar Tools</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => {
          const cat = tool.category;
          const catName = typeof cat === "object" ? cat.name : "";
          const pkgColor: Record<string, string> = {
            npm: "#cb3837", pip: "#3775a9", brew: "#fbb040",
            go: "#00add8", cargo: "#f97316", apt: "#e95420",
          };
          const color = pkgColor[tool.packageManager || ""];

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
                {color && (
                  <span
                    className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {tool.packageManager}
                  </span>
                )}
              </div>

              {(tool.tagline || tool.description) && (
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-400">
                  {tool.tagline || tool.description}
                </p>
              )}

              <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                {tool.metrics?.stars != null && tool.metrics.stars > 0 && (
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
    </div>
  );
}
