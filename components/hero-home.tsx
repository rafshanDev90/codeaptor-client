"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ToolIcon from "@/components/tool-icon";
import { getTools, CliTool } from "@/lib/api";

const CARD_GRADIENTS = [
  "from-orange-500/20 to-amber-500/10",
  "from-blue-500/20 to-indigo-500/10",
  "from-purple-500/20 to-pink-500/10",
  "from-emerald-500/20 to-teal-500/10",
  "from-cyan-500/20 to-sky-500/10",
  "from-rose-500/20 to-red-500/10",
];

export default function HeroHome() {
  const [tools, setTools] = useState<CliTool[]>([]);
  const [marqueeTools, setMarqueeTools] = useState<CliTool[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await getTools({ featured: "true", limit: "3" });
        if (cancelled) return;
        if (res.data.tools.length >= 3) {
          setTools(res.data.tools.slice(0, 3));
        } else {
          const fallback = await getTools({ limit: "3" });
          if (!cancelled) setTools(fallback.data.tools.slice(0, 3));
        }
      } catch (e) {
        console.error("HeroHome error:", e);
      }
    }
    async function loadMarquee() {
      try {
        const res = await getTools({ limit: "30" });
        if (!cancelled) setMarqueeTools(res.data.tools);
      } catch (e) {
        console.error("HeroHome marquee error:", e);
      }
    }
    load();
    loadMarquee();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="relative overflow-hidden">
      <style>{`
        @keyframes marquee-ltr {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-track {
          animation: marquee-ltr 120s linear infinite;
          width: fit-content;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center md:pb-16">
            <h1
              className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl"
              data-aos="fade-up"
            >
              Discover the best CLI tools
            </h1>
          </div>

          <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-aos="fade-up" data-aos-delay={300}>
            {tools.map((tool, idx) => {
              const cat = tool.category;
              const catName = typeof cat === "object" ? cat.name : "";
              const pkgCmd = tool.packageManager
                ? `${tool.packageManager} install ${tool.installCommand}`
                : tool.installCommand;

              return (
                <Link
                  key={tool._id}
                  href={`/tool/${tool.name}`}
                  className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br ${CARD_GRADIENTS[idx % CARD_GRADIENTS.length]} p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gray-700 hover:shadow-xl`}
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ToolIcon iconUrl={tool.iconUrl} displayName={tool.displayName} size={36} />
                        <h3 className="font-nacelle text-xl font-bold text-gray-100">{tool.displayName}</h3>
                      </div>
                      {catName && (
                        <span className="rounded-full bg-gray-900/80 px-2.5 py-0.5 text-xs font-medium text-indigo-300">
                          {catName}
                        </span>
                      )}
                    </div>
                    <p className="mb-4 text-sm text-gray-400">{tool.tagline || tool.description?.slice(0, 100)}</p>
                  </div>

                  {tool.installCommand && (
                    <div className="rounded-lg border border-gray-900 bg-gray-950 p-3 font-mono text-xs text-indigo-400">
                      <span className="text-gray-600">$</span> {pkgCmd || tool.installCommand}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Infinite Scrolling Tool Bar */}
          {marqueeTools.length > 0 && (
            <div className="mb-16 overflow-hidden" data-aos="fade-up" data-aos-delay={400}>
              <div className="marquee-track flex gap-4">
                {[...marqueeTools, ...marqueeTools].map((tool, idx) => {
                  const cat = tool.category;
                  const catName = typeof cat === "object" ? cat.name : "";
                  return (
                    <Link
                      key={`${tool._id}-${idx}`}
                      href={`/tool/${tool.name}`}
                      className="flex shrink-0 items-center gap-3 rounded-xl border border-gray-800 bg-gray-900/60 px-4 py-2.5 transition-colors hover:border-indigo-500/40"
                    >
                      <ToolIcon iconUrl={tool.iconUrl} displayName={tool.displayName} size={28} />
                      <span className="whitespace-nowrap text-sm font-medium text-gray-200">{tool.displayName}</span>
                      {catName && (
                        <span className="rounded-full bg-gray-800 px-2 py-0.5 text-xs text-indigo-400">{catName}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex justify-center" data-aos="fade-up" data-aos-delay={500}>
            <Link
              className="btn group bg-linear-to-t from-indigo-600 to-indigo-500 px-6 py-3 text-white shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.16)] transition-all hover:brightness-110"
              href="/browse"
            >
              <span className="relative inline-flex items-center font-medium">
                Browse All Tools
                <span className="ml-1 transition-transform group-hover:translate-x-1">-&gt;</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
