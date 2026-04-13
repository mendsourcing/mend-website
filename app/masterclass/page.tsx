import Link from "next/link";
import Hero from "@/components/Hero";

export const metadata = { title: "GovTraining MasterClass | MeND Sourcing Solutions" };

const steps = [
  {
    num: "01",
    title: "Determine Dates and Location",
    desc: "2 consecutive days at a WeWork or Regus near you. We come to your city.",
  },
  {
    num: "02",
    title: "Day #1 - Procurement Foundation",
    desc: "FSC Codes, vendor sourcing, RFQs, Contract Flowdowns, and Competitive Bidding.",
  },
  {
    num: "03",
    title: "Day #2 - Advanced Techniques",
    desc: "Inspection & Packaging Standards, Packing Lists, VSM, PIEE, WAWF System, and Q&A.",
  },
  {
    num: "04",
    title: "Post Training - Mentorship",
    desc: "6 months of ongoing support and mentorship after your training is complete.",
  },
];

const subjects = [
  "FSC and NSN Breakdown",
  "Entire Contract Review",
  "Finding the Right Suppliers",
  "Creation of the P.O.",
  "How to Read a Request for Quote (RFQ) and Proposal",
  "Requirements for ASTM and MIL-STD-2073",
  "Learn How to Build Strong Relationships",
  "VSM Entries and WAWF Submissions",
  "Bid Pricing Tool to be Competitive",
  "Invoicing and the Receiving Report",
];

export default function MasterClassPage() {
  return (
    <>
      <Hero
        title="GovTraining MasterClass"
        subtitle="Our most in-depth training — designed to master bidding, packaging, and compliance."
      />

      {/* Course Topics */}
      <section className="py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Two-Day In-Person Course
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-12">
            What You&apos;ll Learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl p-5"
              >
                <span className="text-[#03ACED] font-bold text-sm">✓</span>
                <span className="text-sm text-[#ccc]">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            How It Works
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-16">
            4 Simple Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-[#03ACED]/30 transition-colors"
              >
                <div className="text-[#03ACED] text-4xl font-black opacity-30 mb-4">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-[#888] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: "🏢", title: "Always In Person", desc: "Never over Zoom. Face-to-face with real materials." },
              { icon: "🤝", title: "6 Months Mentorship", desc: "Ongoing support after your training is complete." },
              { icon: "🔍", title: "Free GovScraper Access", desc: "One month free access to our RFQ scraping tool." },
            ].map((f) => (
              <div
                key={f.title}
                className="text-center bg-white/[0.03] border border-white/[0.06] rounded-2xl p-10"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-[#888]">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="bg-gradient-to-br from-[#03ACED]/10 to-transparent border border-[#03ACED]/30 rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Master Government Contracting?</h3>
            <div className="text-5xl font-black text-[#03ACED] mb-2">$4,000</div>
            <p className="text-sm text-[#888] mb-2">Los Angeles, CA location</p>
            <p className="text-sm text-[#888] mb-8">+ $1,000 travel fee if we come to your location within the USA</p>
            <Link
              href="/#contact"
              className="bg-[#03ACED] text-black px-8 py-4 rounded-lg font-bold text-[15px] hover:bg-[#02a0db] transition-colors inline-flex items-center gap-2"
            >
              RSVP Your Spot Today! →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
