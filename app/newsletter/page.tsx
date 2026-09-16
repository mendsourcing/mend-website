import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import LeadCaptureForm from "@/components/LeadCaptureForm";

export const metadata = {
  title: "The MeND Weekly | MeND Sourcing Solutions",
  description: "One email a week on what we're doing at MeND Sourcing — packaging shipped, contracts won, new videos, GovScraper and training updates.",
};

export default function NewsletterPage() {
  return (
    <>
      <Hero title="The MeND Weekly" subtitle="One Email a Week: What We Shipped, Built, and Won at MeND Sourcing." />
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <Reveal direction="up">
            <h2 className="text-2xl font-bold text-white mb-4">What you&apos;ll get every week</h2>
            <ul className="space-y-3 text-[#bbb] text-[15px] leading-relaxed">
              <li>• The real numbers — packaging quotes sent and orders shipped that week</li>
              <li>• Every video and post we created that week, pulled from our socials — so you never miss what we put out</li>
              <li>• GovScraper updates and what the daily opportunity feed is surfacing</li>
              <li>• Upcoming GovTraining cohorts and what we&apos;re teaching</li>
              <li>• What we&apos;re seeing in government contracting right now</li>
            </ul>
            <p className="text-[#888] text-sm mt-6">Written by the team actually doing the work. Fridays. One-click unsubscribe.</p>
          </Reveal>
          <Reveal direction="left" delay={120}>
            <LeadCaptureForm tag="MeND Weekly" source="newsletter" cta="Join The MeND Weekly" successNote="You're in — first issue lands Friday." />
          </Reveal>
        </div>
      </section>
    </>
  );
}
