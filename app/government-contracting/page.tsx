import Hero from "@/components/Hero";
import CompetitiveAdvantage from "@/components/CompetitiveAdvantage";

export const metadata = { title: "Aerospace Distribution | MeND Sourcing Solutions" };

const products = [
  { name: "Bolts & Screws", examples: "AN, MS, NAS, BACB" },
  { name: "Nuts & Nutplates", examples: "MS21042, NAS1291, Plate Nuts" },
  { name: "Threaded Inserts", examples: "Heli-Coil, KEENSERTS, Tridair" },
  { name: "Pins & Collars", examples: "Hi-Lok, Hi-Lite, Taper-Lok" },
  { name: "Washers", examples: "AN960, MS15795, Countersunk" },
  { name: "Rivets & Tooling", examples: "MS20470, NAS1398, Cherrymax" },
];

const markets = [
  { name: "Commercial Aircraft", examples: "Boeing 737, 747, 777, 787 Dreamliner, Airbus A320, A350" },
  { name: "General Aviation", examples: "Cessna, Piper, Beechcraft, Cirrus, Mooney" },
  { name: "Military & Defense", examples: "F-15, F-18, F-22, F-35, C-17, C-130" },
  { name: "Business & Regional Jet", examples: "Gulfstream, Bombardier, Embraer, Dassault Falcon" },
  { name: "Rotary Aircraft & Helicopter", examples: "Sikorsky Black Hawk, Bell, Airbus Helicopters, Boeing Chinook" },
];

export default function GovernmentContractingPage() {
  return (
    <>
      <Hero
        title="Aerospace — Distribution"
        subtitle="Engineering fastener solutions and offering parts from the world's leading manufacturers."
      />

      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            What We Supply
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
            Products We Supply — Quality You Deserve
          </h2>
          <p className="text-[#bbb] text-base leading-relaxed max-w-3xl mb-12">
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
                    key={p.name}
                    className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4"
                  >
                    <span className="text-[#03ACED] mt-0.5">→</span>
                    <div>
                      <div className="text-sm text-white font-medium">{p.name}</div>
                      <div className="text-xs text-[#999] mt-0.5">{p.examples}</div>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                  <span className="text-[#03ACED]">→</span>
                  <span className="text-sm text-[#bbb] italic">
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
                    key={m.name}
                    className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4"
                  >
                    <span className="text-[#03ACED] mt-0.5">→</span>
                    <div>
                      <div className="text-sm text-white font-medium">{m.name}</div>
                      <div className="text-xs text-[#999] mt-0.5">{m.examples}</div>
                    </div>
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
