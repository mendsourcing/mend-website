import Reveal from "@/components/Reveal";
import LeadCaptureForm from "@/components/LeadCaptureForm";

export const metadata = {
  title: "Free GovCon Vertical Guide | MeND Sourcing Solutions",
  description: "The GovCon Vertical Guide — your fast-track playbook to winning DLA contracts. Free 14-page PDF from MeND Sourcing Solutions.",
};

const insideItems = [
  { title: "The Right Verticals", desc: "The government contracting verticals with the best entry points right now — and how to pick yours." },
  { title: "How DLA Actually Works", desc: "The 9-step workflow from finding a solicitation to fulfilling the award — where new contractors lose money, and how not to." },
  { title: "Packaging & Compliance", desc: "The MIL-STD packaging and compliance requirements that make or break a bid." },
  { title: "Opportunities On Autopilot", desc: "How we went from $200K to $2M in quarterly awards by letting matched opportunities come to us daily." },
];

export default function GuidePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-[72px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920&q=80&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-15 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#03ACED]/15 border border-[#03ACED]/40 rounded-full text-xs font-semibold text-[#03ACED] uppercase tracking-wider mb-6">
                Free 14-Page Playbook
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
                The <span className="text-[#03ACED]">GovCon Vertical Guide</span>
              </h1>
              <p className="text-lg text-[#ccc] leading-relaxed mb-4">
                Your fast-track playbook to winning DLA contracts — the exact step-by-step bidding process behind <strong className="text-white">$7M+ in awards and 200+ contracts</strong>.
              </p>
              <p className="text-sm text-[#03ACED] font-semibold mb-8">
                Enter your details and it&apos;s in your inbox in seconds — plus an instant download link.
              </p>
            </div>
            <Reveal direction="left" delay={120}>
              <div className="rounded-2xl border border-[#03ACED]/30 shadow-[0_0_40px_rgba(3,172,237,0.15)] overflow-hidden">
                <LeadCaptureForm tag="PDF Vertical Guide" source="verticalguide" potential="govscraper" cta="Send Me the Guide" successNote="The guide is in your inbox — or grab it right here:" />
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
              What&apos;s <span className="text-[#03ACED]">Inside</span>
            </h2>
            <p className="text-[#bbb] text-base max-w-2xl mb-12">
              Fourteen pages, zero theory — built from the system we run every day at MeND Sourcing.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insideItems.map((item, i) => (
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
