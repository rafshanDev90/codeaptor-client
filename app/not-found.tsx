import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The CLI tool page you are looking for does not exist or has been removed.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <span className="mb-4 text-7xl font-bold text-indigo-500/30">404</span>
      <h1 className="font-nacelle text-2xl font-semibold text-gray-200">Page Not Found</h1>
      <p className="mt-2 max-w-md text-center text-gray-400">
        The CLI tool or page you are looking for does not exist or has been removed.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-400"
        >
          Go Home
        </Link>
        <Link
          href="/browse"
          className="rounded-xl border border-gray-700 px-5 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:border-gray-600 hover:text-gray-200"
        >
          Browse Tools
        </Link>
      </div>
    </div>
  );
}
