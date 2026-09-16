import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import LeadCaptureForm from "@/components/LeadCaptureForm";

export const metadata = {
  title: "More on GovCon | MeND Sourcing Solutions",
  description: "Get government contracting insights from the MeND team — opportunities, packaging, and winning strategies.",
};

export default function GovConPage() {
  return (
    <>
      <Hero title="Want More on GovCon?" subtitle="Insights from the team that packages, ships, and wins government contracts every week." />
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <Reveal direction="up">
            <h2 className="text-2xl font-bold text-white mb-4">Straight from the floor</h2>
            <p className="text-[#bbb] text-[15px] leading-relaxed mb-4">
              We run MIL-SPEC packaging, government contracting training, and GovScraper — a daily opportunity feed for contractors. Drop your email and we&apos;ll keep you in the loop with what&apos;s actually working in GovCon right now.
            </p>
            <p className="text-[#888] text-sm">No spam. Real insights, occasional offers, one-click unsubscribe.</p>
          </Reveal>
          <Reveal direction="left" delay={120}>
            <LeadCaptureForm tag="Social Media Finds" source="more-on-govcon" cta="Keep Me Posted" successNote="You're on the list — talk soon." />
          </Reveal>
        </div>
      </section>
    </>
  );
}
