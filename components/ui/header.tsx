"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "./logo";

export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = search.trim();
    if (q) router.push(`/browse?search=${encodeURIComponent(q)}`);
    else router.push("/browse");
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-950/40 backdrop-blur-md border-b border-gray-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Left: Logo Slot */}
          <div className="flex items-center">
            <Link href="/" className="transition-opacity hover:opacity-90">
              <Logo />
            </Link>
          </div>

          {/* Center: Clean & Subtle Search Input */}
          <form onSubmit={handleSubmit} className="flex-1 max-w-sm" role="search">
            <div className="relative w-full">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search CLI tools..."
                className="w-full rounded-xl border border-gray-800 bg-gray-900/40 px-3 py-1.5 pl-9 text-sm text-gray-200 placeholder-gray-500 outline-none transition-all focus:border-indigo-500/40 focus:bg-gray-900/80 focus:ring-1 focus:ring-indigo-500/20"
              />
              <svg
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </div>
          </form>

          {/* Right: Clean Text Navigation to Balance Structure */}
          <div className="flex items-center gap-6">
            <Link 
              href="/browse" 
              className="text-sm font-medium text-gray-400 transition-colors hover:text-gray-100"
            >
              Explore
            </Link>
            <Link 
              href="https://github.com" 
              target="_blank" 
              className="text-sm font-medium text-gray-400 transition-colors hover:text-gray-100"
            >
              GitHub
            </Link>
          </div>
          
        </div>
      </div>
    </header>
  );
}
