import Hero from "@/components/Hero";

export const metadata = { title: "Quality Assurance | MeND Sourcing Solutions" };

export default function QualityPage() {
  return (
    <>
      <Hero
        title="Quality Assurance"
        subtitle="Commitment to quality assurance, elevating standards, and ensuring excellence in every aspect of our products and services."
      />

      <section className="py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Our Commitment
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-6">
            Ensuring Excellence in Every Detail
          </h2>
          <p className="text-[#888] text-base leading-relaxed max-w-3xl mb-16">
            Our AS9100 and ISO9001 certifications underscore our unwavering dedication to quality excellence. We meticulously review and optimize Quality System Procedures (QSPs), conduct supplier audits, and perform thorough inspections to deliver reliable, top-tier products and services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-[#03ACED]/10 to-transparent border border-[#03ACED]/30 rounded-2xl p-10">
              <h3 className="text-2xl font-bold mb-4">AS9100D Certified</h3>
              <p className="text-sm text-[#888] leading-relaxed">
                The aerospace quality management standard that ensures we meet the stringent requirements of the aerospace industry for safety, reliability, and quality.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#03ACED]/10 to-transparent border border-[#03ACED]/30 rounded-2xl p-10">
              <h3 className="text-2xl font-bold mb-4">ISO 9001:2015 Certified</h3>
              <p className="text-sm text-[#888] leading-relaxed">
                The international standard for quality management systems, demonstrating our ability to consistently provide products and services that meet customer and regulatory requirements.
              </p>
            </div>
          </div>

          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Quality Program
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-6">
            Quality Assurance Program
          </h2>
          <p className="text-[#888] text-base leading-relaxed max-w-3xl mb-12">
            MeND Sourcing Solutions will always put client satisfaction over corporate profits. We achieve this through a planned and balanced quality assurance program, which is a fundamental component of our long-term Strategic Plan.
          </p>

          <div className="space-y-4">
            {[
              "Research and understanding of U.S. and worldwide quality specifications",
              "Internal weekly inspections",
              "Annual 3rd party audits",
              "Opportunities for continuous improvement",
              "Sourcing and quality control for accuracy",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl p-5"
              >
                <span className="text-[#03ACED] font-bold text-sm">✓</span>
                <span className="text-sm text-[#ccc]">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-[#888] mt-12">
            For further assistance, please contact us at:{" "}
            <a
              href="mailto:sales@mendsourcing.com"
              className="text-[#03ACED] font-semibold hover:underline"
            >
              sales@MeNDsourcing.com
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
