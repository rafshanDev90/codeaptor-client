export const metadata = {
  title: "Terms of Service",
  description: "CLI Hub terms of service — learn about the terms governing your use of our CLI tool directory.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <h1 className="pb-6 font-nacelle text-3xl font-semibold text-gray-200 md:text-4xl">Terms of Service</h1>
        <div className="space-y-4 text-sm leading-relaxed text-indigo-200/65">
          <p>Last updated: June 2026</p>
          <p>
            By using CLI Hub ("the Service"), you agree to the following terms. If you do not agree, please
            do not use the Service.
          </p>
          <h2 className="pt-4 font-nacelle text-lg font-semibold text-gray-200">Use of Service</h2>
          <p>
            CLI Hub is provided as a free, open-source directory of command-line tools. All information is
            provided for informational purposes and may not be accurate, complete, or current. We make no
            warranties regarding the accuracy of the information presented.
          </p>
          <h2 className="pt-4 font-nacelle text-lg font-semibold text-gray-200">Third-Party Links</h2>
          <p>
            The Service contains links to third-party websites and tools. We are not responsible for the
            content, availability, or practices of those third-party services.
          </p>
          <h2 className="pt-4 font-nacelle text-lg font-semibold text-gray-200">No Warranty</h2>
          <p>
            The Service is provided "as is" without any warranty, express or implied. We are not liable for
            any damages arising from the use of the Service.
          </p>
          <h2 className="pt-4 font-nacelle text-lg font-semibold text-gray-200">Changes</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the Service after
            changes constitutes acceptance of the new terms.
          </p>
          <h2 className="pt-4 font-nacelle text-lg font-semibold text-gray-200">Contact</h2>
          <p>
            For questions, open an issue on our{" "}
            <a href="https://github.com/rafshanDev90/codeaptor-client" className="text-indigo-400 hover:text-indigo-300">
              GitHub repository
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}
