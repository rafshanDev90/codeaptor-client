"use client";

import Image from "next/image";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 font-inter text-base text-gray-200 antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-md text-center">
            <Image
              src="/images/error.jpeg"
              alt="Something went wrong"
              width={400}
              height={200}
              className="mx-auto mb-8 h-48 w-auto rounded-2xl object-cover"
            />
            <h1 className="mb-2 font-nacelle text-2xl font-semibold text-gray-200">
              Critical error
            </h1>
            <p className="mb-8 text-indigo-200/65">
              A critical error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={reset}
              className="btn rounded-full bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-500"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
