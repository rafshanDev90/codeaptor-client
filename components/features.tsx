export default function Features() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1] md:py-20">
          <div className="mx-auto max-w-3xl pb-4 text-center md:pb-12">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                Why CLI Hub?
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Built for developers who live in the terminal
            </h2>
            <p className="text-lg text-indigo-200/65">
              We curate, categorize, and rank the best CLI tools so you don't have to search GitHub every time.
            </p>
          </div>
          <div className="mx-auto grid max-w-sm gap-12 sm:max-w-none sm:grid-cols-2 md:gap-x-14 md:gap-y-16 lg:grid-cols-3">
            <article>
              <svg className="mb-3 fill-indigo-500" xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                <path d="M8 1.5A1.5 1.5 0 0 1 9.5 0h5A1.5 1.5 0 0 1 16 1.5V3h4.5A1.5 1.5 0 0 1 22 4.5v16a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 20.5v-16A1.5 1.5 0 0 1 3.5 3H8V1.5ZM8 6a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z" opacity=".48" />
                <path d="M10 3h4V1.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V3ZM4 17.5a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1h-15a.5.5 0 0 1-.5-.5Z" />
              </svg>
              <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">Curated Collection</h3>
              <p className="text-indigo-200/65">
                Every tool is vetted by real developers. No spam, no abandoned repos, no "hello world" tutorials pretending to be tools.
              </p>
            </article>
            <article>
              <svg className="mb-3 fill-indigo-500" xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                <path d="M12 .5a11.5 11.5 0 1 0 0 23 11.5 11.5 0 0 0 0-23Z" opacity=".48" />
                <path d="M12 6a1 1 0 0 1 1 1v4.586l2.707 2.707a1 1 0 0 1-1.414 1.414l-3-3A1 1 0 0 1 11 12V7a1 1 0 0 1 1-1Z" />
              </svg>
              <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">ML-Powered Categorization</h3>
              <p className="text-indigo-200/65">
                Our neural network auto-classifies tools into categories. Trained on 300+ GitHub repos with community-vetted topic tags.
              </p>
            </article>
            <article>
              <svg className="mb-3 fill-indigo-500" xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                <path d="m3.031 9.05-.593-.805 1.609-1.187.594.804a6.966 6.966 0 0 1 0 8.276l-.594.805-1.61-1.188.594-.805a4.966 4.966 0 0 0 0-5.9Z" />
                <path d="m7.456 6.676-.535-.845 1.69-1.07.534.844a11.944 11.944 0 0 1 0 12.789l-.535.845-1.69-1.071.536-.845a9.944 9.944 0 0 0 0-10.647Z" />
                <path d="m11.888 4.35-.514-.858 1.717-1.027.513.858a16.9 16.9 0 0 1 2.4 8.677 16.9 16.9 0 0 1-2.4 8.676l-.513.859-1.717-1.028.514-.858A14.9 14.9 0 0 0 14.003 12a14.9 14.9 0 0 0-2.115-7.65Z" opacity=".48" />
              </svg>
              <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">Always Growing</h3>
              <p className="text-indigo-200/65">
                New tools added weekly from GitHub, npm, and community submissions. Open-source and community-driven.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
