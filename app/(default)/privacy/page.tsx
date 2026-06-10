export const metadata = {
  title: "Privacy Policy",
  description: "CLI Hub privacy policy — learn how we handle your data when you use our CLI tool directory.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <h1 className="pb-6 font-nacelle text-3xl font-semibold text-gray-200 md:text-4xl">Privacy Policy</h1>
        <div className="space-y-4 text-sm leading-relaxed text-indigo-200/65">
          <p>Last updated: June 2026</p>
          <p>
            CLI Hub ("we", "our", "us") operates the CLI Hub website. This page informs you of our policies
            regarding the collection, use, and disclosure of personal data when you use our service.
          </p>
          <h2 className="pt-4 font-nacelle text-lg font-semibold text-gray-200">Information We Collect</h2>
          <p>
            We do not collect any personally identifiable information. The site does not require registration,
            and we do not use cookies for tracking. Anonymous usage data may be collected via standard server
            logs (IP address, browser type, pages visited) for operational purposes only.
          </p>
          <h2 className="pt-4 font-nacelle text-lg font-semibold text-gray-200">Third-Party Services</h2>
          <p>
            This site may link to third-party websites (e.g., GitHub, npm). We are not responsible for the
            privacy practices of those services. We do not share any data with third parties.
          </p>
          <h2 className="pt-4 font-nacelle text-lg font-semibold text-gray-200">Changes</h2>
          <p>
            We may update this policy from time to time. Changes will be posted on this page.
          </p>
          <h2 className="pt-4 font-nacelle text-lg font-semibold text-gray-200">Contact</h2>
          <p>
            If you have any questions, please open an issue on our{" "}
            <a href="https://github.com/rafshanDev90/codeaptor-client" className="text-indigo-400 hover:text-indigo-300">
              GitHub repository
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}
