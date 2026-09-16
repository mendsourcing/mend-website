import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import LeadCaptureForm from "@/components/LeadCaptureForm";

export const metadata = {
  title: "Free GovCon Vertical Guide | MeND Sourcing Solutions",
  description: "The 2025 GovCon Vertical Guide — which government contracting verticals to pursue and how to win in them. Free 14-page PDF.",
};

export default function GuidePage() {
  return (
    <>
      <Hero title="The GovCon Vertical Guide" subtitle="14 pages on which contracting verticals to pursue — and how to win them." />
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <Reveal direction="up">
            <h2 className="text-2xl font-bold text-white mb-4">What&apos;s inside</h2>
            <ul className="space-y-3 text-[#bbb] text-[15px] leading-relaxed">
              <li>• The government contracting verticals with the best entry points right now</li>
              <li>• How DLA solicitations actually work — and where new contractors lose money</li>
              <li>• Packaging &amp; compliance requirements that make or break a bid</li>
              <li>• How to find opportunities matched to what you already sell</li>
            </ul>
            <p className="text-[#888] text-sm mt-6">Enter your details and we&apos;ll email you the guide instantly — plus a direct download link.</p>
          </Reveal>
          <Reveal direction="left" delay={120}>
            <LeadCaptureForm tag="PDF Vertical Guide" source="verticalguide" cta="Send Me the Guide" successNote="The guide is in your inbox — or grab it right here:" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
