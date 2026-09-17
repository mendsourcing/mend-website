import Reveal from "@/components/Reveal";
import LeadCaptureForm from "@/components/LeadCaptureForm";

export const metadata = {
  title: "The Weekly MeND | MeND Sourcing Solutions",
  description: "One email a week on what we're doing at MeND Sourcing — packaging shipped, contracts won, new videos, GovScraper and training updates.",
};

const weeklyItems = [
  { title: "The Real Numbers", desc: "Packaging quotes sent and orders shipped that week — straight from our floor, no fluff." },
  { title: "Everything We Created", desc: "Every video and post we made that week, pulled from our socials — so you never miss what we put out." },
  { title: "GovScraper Updates", desc: "What the daily opportunity feed is surfacing and what's new in the platform." },
  { title: "Training & GovCon Insights", desc: "Upcoming GovTraining cohorts and what we're seeing in government contracting right now." },
];

export default function NewsletterPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-[72px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-15 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#03ACED]/15 border border-[#03ACED]/40 rounded-full text-xs font-semibold text-[#03ACED] uppercase tracking-wider mb-6">
                Stay Connected
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
                The <span className="text-[#03ACED]">Weekly MeND</span>
              </h1>
              <p className="text-lg text-[#ccc] leading-relaxed mb-4">
                One Email a Week: What We Shipped, Built, and Won at MeND Sourcing.
              </p>
              <p className="text-sm text-[#03ACED] font-semibold mb-8">
                Written by the team actually doing the day to day work. Sent out Friday nights. One-click unsubscribe.
              </p>
            </div>
            <Reveal direction="left" delay={120}>
              <div className="rounded-2xl border border-[#03ACED]/30 shadow-[0_0_40px_rgba(3,172,237,0.15)] overflow-hidden">
                <LeadCaptureForm tag="MeND Weekly" source="newsletter" cta="Join The Weekly MeND" successNote="You're in — first issue lands Friday night." />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
              What You&apos;ll Get <span className="text-[#03ACED]">Every Week</span>
            </h2>
            <p className="text-[#bbb] text-base max-w-2xl mb-12">
              An honest look inside a working government contracting operation — across GovScraper, GovPacking, GovTraining, and our own contracts.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {weeklyItems.map((item, i) => (
              <Reveal key={item.title} direction="up" delay={i * 80}>
                <div className="bg-white/[0.04] border border-white/[0.1] rounded-2xl p-8 h-full hover:border-[#03ACED]/40 transition-colors">
                  <div className="text-[#03ACED] font-black text-sm uppercase tracking-wider mb-3">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-[#bbb] text-[15px] leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
