import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import LeadCaptureForm from "@/components/LeadCaptureForm";

export const metadata = {
  title: "How We 10x'd Our GovCon Business | MeND Sourcing Solutions",
  description: "The systems behind 10x growth in government contracting — and how GovScraper powers them.",
};

export default function TenXPage() {
  return (
    <>
      <Hero title="How We 10x'd Our GovCon Business" subtitle="The exact systems — opportunity flow, bidding cadence, and packaging — behind the growth." />
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <Reveal direction="up">
            <h2 className="text-2xl font-bold text-white mb-4">The short version</h2>
            <ul className="space-y-3 text-[#bbb] text-[15px] leading-relaxed">
              <li>• Stop searching for opportunities by hand — let them come to you daily, matched to what you sell</li>
              <li>• Bid on a cadence, not on inspiration</li>
              <li>• Never lose an awarded contract to packaging or compliance mistakes</li>
            </ul>
            <p className="text-[#888] text-sm mt-6">Want the full playbook? Leave your details and we&apos;ll send you the 14-page Vertical Guide — the exact DLA bidding process behind the growth — or <a href="https://calendly.com/mendsourcing/govscraper" className="text-[#03ACED] hover:underline" target="_blank" rel="noopener noreferrer">book a 15-minute demo</a>.</p>
          </Reveal>
          <Reveal direction="left" delay={120}>
            <LeadCaptureForm tag="10x Business" source="10x_your_business" potential="govscraper" cta="Send Me the Playbook" successNote="The guide is in your inbox — or grab it right here:" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
