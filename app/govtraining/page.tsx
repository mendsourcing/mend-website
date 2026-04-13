import Link from "next/link";
import Hero from "@/components/Hero";

export const metadata = { title: "GovTraining - Government Contracting Training | MeND Sourcing Solutions" };

export default function GovTrainingPage() {
  return (
    <>
      <Hero
        title="Training Done In Person or Via Zoom!"
        subtitle="We teach HOW — not just WHAT. Practical, hands-on training for military contractors at all experience levels."
      />

      {/* Intro */}
      <section className="py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-lg text-[#bbb] leading-relaxed mb-6">
            Our training modules cover contract review, strategic packaging solutions (MIL-STD &amp; Commercial), WAWF billing, contract modification, and quality inspection (AS9100 &amp; ISO9001). Whether you&apos;re brand new or looking to sharpen your skills, we provide the practical foundation to be self-sufficient in government contracting.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* MasterClass */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-10 hover:border-[#03ACED]/30 transition-colors">
            <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
              Flagship Program
            </div>
            <h3 className="text-2xl font-bold mb-4">GovTraining MasterClass</h3>
            <p className="text-sm text-[#bbb] leading-relaxed mb-6">
              Our flagship, in-person training designed to take you from zero to fully capable in every step of government contracting. We sit with you face-to-face and walk through bidding, packaging, compliance, vendor traceability, quality requirements, and real DLA workflows.
            </p>
            <p className="text-sm text-[#bbb] leading-relaxed mb-8">
              You leave with total confidence, a repeatable process, and the ability to win and deliver contracts correctly the first time.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/masterclass"
                className="bg-[#03ACED] text-black px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#02a0db] transition-colors"
              >
                Learn About MasterClass →
              </Link>
              <span className="text-lg font-bold text-[#03ACED]">$4,000</span>
            </div>
          </div>

          {/* Jumpstart */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-10 hover:border-[#03ACED]/30 transition-colors">
            <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
              Virtual Program
            </div>
            <h3 className="text-2xl font-bold mb-4">GovCon Jumpstart!</h3>
            <p className="text-sm text-[#bbb] leading-relaxed mb-6">
              A four-week, one-hour-per-week virtual program that gives you the fundamentals you need to get started quickly. We cover the core essentials — how to read RFQs, how to quote, how packaging works, how delivery works, and how to avoid the common mistakes new contractors make.
            </p>
            <p className="text-sm text-[#bbb] leading-relaxed mb-8">
              Streamlined, practical, and built for busy people who want to start executing without committing to in-person training yet.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/jumpstart"
                className="bg-[#03ACED] text-black px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#02a0db] transition-colors"
              >
                Learn About Jumpstart! →
              </Link>
              <span className="text-lg font-bold text-[#03ACED]">$500</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Not Sure Which Training Fits You?</h2>
          <p className="text-[#bbb] mb-8">
            Speak with our team to get clear direction and choose confidently.
          </p>
          <Link
            href="/#contact"
            className="bg-[#03ACED] text-black px-8 py-4 rounded-lg font-bold text-[15px] hover:bg-[#02a0db] transition-colors inline-flex items-center gap-2"
          >
            Book My Call →
          </Link>
        </div>
      </section>
    </>
  );
}
