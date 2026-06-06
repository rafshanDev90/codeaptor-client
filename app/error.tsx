"use client";

import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-20">
      <div className="mx-auto max-w-md text-center">
        <img
          src="/images/error.jpeg"
          alt="Something went wrong"
          className="mx-auto mb-8 h-48 w-auto rounded-2xl object-cover"
        />
        <h1 className="mb-2 font-nacelle text-2xl font-semibold text-gray-200">
          Something went wrong
        </h1>
        <p className="mb-8 text-indigo-200/65">
          An unexpected error occurred. It has been logged and we&apos;ll look into it.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={reset}
            className="btn rounded-full bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Try again
          </button>
          <Link
            href="/"
            className="btn rounded-full bg-gray-800 px-6 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700"
          >
            Go home
          </Link>
        </div>
        {process.env.NODE_ENV === "development" && (
          <details className="mt-8 text-left">
            <summary className="cursor-pointer text-sm text-indigo-400">
              Error details
            </summary>
            <pre className="mt-2 overflow-auto rounded-lg bg-gray-900 p-4 text-xs text-red-400">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
