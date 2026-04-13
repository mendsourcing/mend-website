import Hero from "@/components/Hero";
import CompetitiveAdvantage from "@/components/CompetitiveAdvantage";

export const metadata = { title: "Aerospace Distribution | MeND Sourcing Solutions" };

const products = [
  "Bolts & Screws",
  "Nuts & Nutplates",
  "Threaded Inserts",
  "Pins & Collars",
  "Washers",
  "Rivets & Tooling",
];

const markets = [
  "Commercial Aircraft",
  "General Aviation",
  "Military & Defense",
  "Business & Regional Jet",
  "Rotary Aircraft & Helicopter",
];

export default function GovernmentContractingPage() {
  return (
    <>
      <Hero
        title="Aerospace — Distribution"
        subtitle="Engineering fastener solutions and offering parts from the world's leading manufacturers."
      />

      <section className="py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            What We Supply
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-6">
            Products We Supply — Quality You Deserve
          </h2>
          <p className="text-[#888] text-base leading-relaxed max-w-3xl mb-12">
            MeND is a distinguished and fully certified fastener authority, specializing in the procurement of high-performance AN, MS, and NAS components for the aerospace industry. We are AS9100 and ISO 9001 certified, committed to quality, timely delivery, and personalized service.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-lg font-bold mb-6 uppercase tracking-wider text-[#03ACED]">
                Aerospace Products
              </h3>
              <div className="space-y-3">
                {products.map((p) => (
                  <div
                    key={p}
                    className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4"
                  >
                    <span className="text-[#03ACED]">→</span>
                    <span className="text-sm text-[#ccc]">{p}</span>
                  </div>
                ))}
                <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                  <span className="text-[#03ACED]">→</span>
                  <span className="text-sm text-[#888] italic">
                    And more — provide the part number or NSN and we&apos;ll source it
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 uppercase tracking-wider text-[#03ACED]">
                Core Markets
              </h3>
              <div className="space-y-3">
                {markets.map((m) => (
                  <div
                    key={m}
                    className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4"
                  >
                    <span className="text-[#03ACED]">→</span>
                    <span className="text-sm text-[#ccc]">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CompetitiveAdvantage />
    </>
  );
}
