import Reveal from "@/components/Reveal";
import LeadCaptureForm from "@/components/LeadCaptureForm";

export const metadata = {
  title: "The Weekly MeND Newsletter | MeND Sourcing Solutions",
  description: "One email a week built to help you win government contracts: our real numbers, insights into the DLA, and tools you can use.",
};

const weeklyItems = [
  { title: "By the Numbers for MeND", desc: "Packaging quotes sent, packing jobs on the board, active GovScraper members, and DLA bids submitted that week. Real numbers you can benchmark your own business against." },
  { title: "Insights into the DLA", desc: "One tip each week that makes your next bid sharper: rule changes, deadlines, and lessons from the bids we run every day." },
  { title: "MeND at Scale", desc: "Contracts won under our CAGE 8HHU7, the dollars behind them, and how many are in active work. The honest scoreboard, including the weeks we win nothing." },
  { title: "New Videos This Week", desc: "Every video we published that week, with one-click links to watch on YouTube." },
  { title: "GovScraper Feature", desc: "One feature or workflow highlight each week that surfaces the opportunities worth your time." },
  { title: "Training Dates & a Note from Tristan", desc: "Upcoming GovCon Jumpstart! and MasterClass dates before they fill, plus a short note on what Tristan is seeing in GovCon right now." },
];

type NewsletterStatus = {
  lastIssue: { label: string; sentAtText: string } | null;
  nextIssue: { label: string; dateText: string };
} | null;

// Live issue tracker from the CRM: which issue went out last, which lands
// next. Refreshes every 5 minutes; page still renders if the CRM is down.
async function getNewsletterStatus(): Promise<NewsletterStatus> {
  try {
    const r = await fetch("https://services.mendsourcing.com/api/newsletter/status", { next: { revalidate: 300 } });
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

export default async function NewsletterPage() {
  const status = await getNewsletterStatus();
  return (
    <>
      {/* HERO */}
      <section className="relative pt-[72px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1920&q=80&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-15 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#03ACED]/15 border border-[#03ACED]/40 rounded-full text-xs font-semibold text-[#03ACED] uppercase tracking-wider mb-6">
                Stay Connected
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
                The <span className="text-[#03ACED]">Weekly MeND</span> Newsletter
              </h1>
              <p className="text-lg text-[#ccc] leading-relaxed mb-4">
                One email a week built to help you win government contracts: the real numbers from our business, insights into the DLA, and tools that take the busy work off your plate.
              </p>
              <p className="text-sm text-[#03ACED] font-semibold mb-6">
                Written by the team actually doing the day to day work. Sent out Friday nights. One-click unsubscribe.
              </p>
              {status && (
                <div className="flex flex-wrap gap-3 mb-8">
                  {status.lastIssue ? (
                    <>
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-xs font-semibold text-white">
                        Last issue: #{status.lastIssue.label} · {status.lastIssue.sentAtText}
                      </span>
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#03ACED]/15 border border-[#03ACED]/40 rounded-full text-xs font-semibold text-[#03ACED]">
                        Next up: #{status.nextIssue.label} · {status.nextIssue.dateText}
                      </span>
                    </>
                  ) : (
                    <span className="inline-flex items-center gap-3 px-6 py-4 bg-[#03ACED] rounded-2xl text-base md:text-lg font-black text-white shadow-[0_0_40px_rgba(3,172,237,0.4)]">
                      First issue lands {status.nextIssue.dateText}
                    </span>
                  )}
                </div>
              )}
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
              An honest look inside a working government contracting operation, built to help you win your own: DLA contracting, GovScraper, GovPacking, and GovTraining.
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
