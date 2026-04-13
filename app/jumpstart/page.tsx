import Link from "next/link";
import Hero from "@/components/Hero";

export const metadata = { title: "GovTraining Jumpstart! | MeND Sourcing Solutions" };

const weeks = [
  {
    num: "Week 1",
    title: "FSCs & Finding the Right Vendor",
    desc: "Learn how to choose the correct FSC codes and source reliable vendors so your quotes stay competitive and compliant.",
  },
  {
    num: "Week 2",
    title: "Understand & Review of RFQ",
    desc: "Break down each section of an RFQ, interpret requirements correctly, and avoid the common mistakes new contractors make.",
  },
  {
    num: "Week 3",
    title: "Bidding on Government Contracts",
    desc: "Step-by-step bidding guidance, including pricing strategy, delivery terms, packaging requirements, and how to submit strong quotes.",
  },
  {
    num: "Week 4",
    title: "Q&A and Tools to Streamline",
    desc: "Get answers to your questions and learn the tools, shortcuts, and workflows that make government contracting faster and easier.",
  },
];

const features = [
  {
    title: "4 Weekly Sessions",
    sub: "1 Hour / Week",
    desc: "A focused, four-week structure that teaches the essentials without overwhelming you.",
  },
  {
    title: "Groups of 5 Max",
    sub: "Small & Personal",
    desc: "Small group sessions ensure you get personal attention, real interaction, and space to ask questions.",
  },
  {
    title: "Free GovScraper Access",
    sub: "2 Weeks Free",
    desc: "Try the platform during your training to source RFQs and build early confidence with real opportunities.",
  },
];

const learnings = [
  "FSC and NSN Breakdown",
  "How to Read a Request for Quote",
  "Finding the Right Suppliers",
  "Learn How to Build Strong Relationships",
  "Understand the Nuances of Government Contracts",
  "Bid Pricing Tool to be Competitive",
];

export default function JumpstartPage() {
  return (
    <>
      <Hero
        title="GovTraining Jumpstart!"
        subtitle="A four-week, one-hour-per-week Zoom program that teaches the core concepts of government contracting."
      />

      {/* 4-Week Breakdown */}
      <section className="py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Course Breakdown
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-16">
            4 Weeks to Your First Bid
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {weeks.map((w) => (
              <div
                key={w.num}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-[#03ACED]/30 transition-colors"
              >
                <div className="text-[#03ACED] text-sm font-bold uppercase tracking-wider mb-3">
                  {w.num}
                </div>
                <h3 className="text-lg font-bold mb-3">{w.title}</h3>
                <p className="text-sm text-[#bbb] leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Prop */}
      <section className="py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold tracking-tight">
              Small Investment — Big Payoff
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="text-center bg-white/[0.03] border border-white/[0.06] rounded-2xl p-10"
              >
                <h3 className="text-lg font-bold mb-1">{f.title}</h3>
                <div className="text-[#03ACED] text-sm font-semibold mb-4">{f.sub}</div>
                <p className="text-sm text-[#bbb] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-[#03ACED]/10 to-transparent border border-[#03ACED]/30 rounded-2xl p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-5xl font-black text-[#03ACED] mb-2">$500</div>
                <p className="text-[#bbb] mb-6">
                  Government contracting training done at the convenience of your laptop.
                </p>
                <h3 className="text-lg font-bold mb-4">What You&apos;ll Learn:</h3>
                <ul className="space-y-2">
                  {learnings.map((l) => (
                    <li key={l} className="flex items-center gap-3 text-sm text-[#ccc]">
                      <span className="text-[#03ACED]">✓</span> {l}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center">
                <Link
                  href="/#contact"
                  className="bg-[#03ACED] text-black px-8 py-4 rounded-lg font-bold text-[15px] hover:bg-[#02a0db] transition-colors inline-flex items-center gap-2"
                >
                  RSVP Your Spot Today! →
                </Link>
                <p className="text-sm text-[#bbb] mt-6">
                  Not sure? <Link href="/#contact" className="text-[#03ACED] font-semibold">Book a call</Link> to get clear direction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
