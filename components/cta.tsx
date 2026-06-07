import Link from "next/link";

export default function Cta() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="bg-linear-to-r from-transparent via-gray-800/50 py-12 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="pb-8 font-nacelle text-3xl font-semibold text-gray-200 md:text-4xl"
              data-aos="fade-up"
            >
              Ready to find your next CLI tool?
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-lg text-indigo-200/65" data-aos="fade-up" data-aos-delay={200}>
              Browse 77 curated CLI tools across 10 categories. AI-powered, community-vetted, always up to date.
            </p>
            <div className="mx-auto flex max-w-xs flex-col items-center gap-4 sm:max-w-none sm:flex-row sm:justify-center">
              <div data-aos="fade-up" data-aos-delay={400}>
                <Link
                  className="btn group w-full bg-linear-to-t from-indigo-600 to-indigo-500 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16)] sm:w-auto"
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
              <div data-aos="fade-up" data-aos-delay={600}>
                <Link
                  className="btn w-full bg-gray-800 text-gray-300 hover:bg-gray-700 sm:w-auto"
                  href="/browse"
                >
                  Explore Categories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
