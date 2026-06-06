"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HeroHome() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/browse?search=${encodeURIComponent(query.trim())}`);
  }

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center md:pb-20">
            <h1
              className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl"
              data-aos="fade-up"
            >
              Discover the best CLI tools
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-xl text-indigo-200/65"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                A curated directory of command-line tools for developers. ML-powered categorization,
                community-vetted, and always up to date.
              </p>

              {/* Search */}
              <form onSubmit={handleSubmit} className="mx-auto mb-8 max-w-xl" data-aos="fade-up" data-aos-delay={400}>
                <div className="relative">
                  <svg className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search CLI tools..."
                    className="w-full rounded-xl border border-gray-700 bg-gray-800/60 py-3.5 pl-12 pr-4 text-base text-gray-200 placeholder-gray-500 outline-none transition-colors focus:border-indigo-500"
                  />
                </div>
              </form>

              <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
                <div data-aos="fade-up" data-aos-delay={600}>
                  <Link
                    className="btn group mb-4 w-full bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                    href="/browse"
                  >
                    <span className="relative inline-flex items-center">
                      Browse All Tools
                      <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                        -&gt;
                      </span>
                    </span>
                  </Link>
                </div>
                <div data-aos="fade-up" data-aos-delay={800}>
                  <Link
                    className="btn relative w-full bg-linear-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%] sm:ml-4 sm:w-auto"
                    href="#0"
                  >
                    Submit a Tool
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto grid max-w-xs grid-cols-3 gap-8 sm:max-w-md" data-aos="fade-up" data-aos-delay={1000}>
            <div className="text-center">
              <div className="mb-1 font-nacelle text-3xl font-semibold text-gray-200">300+</div>
              <div className="text-xs text-indigo-200/65">CLI Tools</div>
            </div>
            <div className="text-center">
              <div className="mb-1 font-nacelle text-3xl font-semibold text-gray-200">10</div>
              <div className="text-xs text-indigo-200/65">Categories</div>
            </div>
            <div className="text-center">
              <div className="mb-1 font-nacelle text-3xl font-semibold text-gray-200">ML</div>
              <div className="text-xs text-indigo-200/65">Powered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
