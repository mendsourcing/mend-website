import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import QualityCertCards from "@/components/QualityCertCards";

export const metadata = { title: "Quality Assurance | MeND Sourcing Solutions" };

const qaItems = [
  "Research and understanding of U.S. and worldwide quality specifications",
  "Internal weekly inspections",
  "Annual 3rd party audits",
  "Opportunities for continuous improvement",
  "Sourcing and quality control for accuracy",
];

export default function QualityPage() {
  return (
    <>
      <Hero
        title="Quality Assurance"
        subtitle="Commitment to quality assurance, elevating standards, and ensuring excellence in every aspect of our products and services."
      />

      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Our Commitment
          </Reveal>
          <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
            Ensuring Excellence in Every Detail
          </Reveal>
          <Reveal direction="up" delay={160} as="p" className="text-[#bbb] text-base leading-relaxed max-w-3xl mb-16">
            Our AS9100 and ISO9001 certifications underscore our unwavering dedication to quality excellence. We meticulously review and optimize Quality System Procedures (QSPs), conduct supplier audits, and perform thorough inspections to deliver reliable, top-tier products and services.
          </Reveal>

          <QualityCertCards />

          <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Quality Program
          </Reveal>
          <Reveal direction="up" delay={80} as="h2" className="text-3xl font-extrabold tracking-tight mb-6">
            Quality Assurance Program
          </Reveal>
          <Reveal direction="up" delay={160} as="p" className="text-[#bbb] text-base leading-relaxed max-w-3xl mb-12">
            MeND Sourcing Solutions will always put client satisfaction over corporate profits. We achieve this through a planned and balanced quality assurance program, which is a fundamental component of our long-term Strategic Plan.
          </Reveal>

          <div className="space-y-4">
            {qaItems.map((item, i) => (
              <Reveal
                key={i}
                direction="left"
                delay={i * 90}
                className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl p-5"
              >
                <span className="text-[#03ACED] font-bold text-sm">✓</span>
                <span className="text-sm text-[#ccc]">{item}</span>
              </Reveal>
            ))}
          </div>

          <p className="text-sm text-[#bbb] mt-12">
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
