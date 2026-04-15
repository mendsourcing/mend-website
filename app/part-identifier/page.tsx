import Link from "next/link";
import Hero from "@/components/Hero";
import CompetitiveAdvantage from "@/components/CompetitiveAdvantage";

export const metadata = { title: "Part Identifier & Stock List | MeND Sourcing Solutions" };

const sampleInventory = [
  { pn: "NAS77A6-008P", desc: "Bushing", nsn: "3120-01-338-1043", condition: "In Stock", lead: "Immediate", qty: 100 },
  { pn: "ST4M166-4-003", desc: "Bushing", nsn: "3120-00-272-3583", condition: "In Stock", lead: "Immediate", qty: 75 },
  { pn: "BACB30VN6K8", desc: "Bushing", nsn: "3120-01-164-8765", condition: "In Stock", lead: "Immediate", qty: 50 },
  { pn: "NAS77A3-024", desc: "Bushing", nsn: "3120-00-141-7832", condition: "In Stock", lead: "Immediate", qty: 200 },
  { pn: "MS21922WDG6", desc: "Bushing", nsn: "5365-00-876-5432", condition: "In Stock", lead: "Immediate", qty: 150 },
  { pn: "JSFE3C6-4", desc: "Bushing", nsn: "3120-01-555-9876", condition: "In Stock", lead: "Immediate", qty: 80 },
];

export default function PartIdentifierPage() {
  return (
    <>
      <Hero
        title="Part Identifier & Stock List"
        subtitle="Our guarantee — transparency and trust."
      />

      {/* Intro */}
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#bbb] text-base leading-relaxed max-w-3xl mb-8">
            The industry has been plagued with archaic processes — hidden in-house inventory, abstract lead times, and outdated quoting methods. We believe it&apos;s time for a change. We offer current inventory &amp; lead times, inventory on demand, accessible parts with P/N &amp; associated NSN, and transparent request-for-quote processes.
          </p>
          <div className="flex flex-wrap gap-4">
            {["Current Inventory & Lead Time", "Inventory on Demand", "Parts with P/N & NSN", "Request for Quote"].map((item) => (
              <span key={item} className="px-4 py-2 bg-[#03ACED]/10 border border-[#03ACED]/30 rounded-lg text-[#03ACED] text-sm font-semibold">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Inventory Table */}
      <section className="py-16 md:py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Inventory List
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Sample Stock Items
          </h2>
          <p className="text-sm text-[#bbb] mb-10">
            Contact us for the full inventory list. Use CTRL+F to search.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-[#03ACED] font-semibold text-xs uppercase tracking-wider">Part Number</th>
                  <th className="text-left py-3 px-4 text-[#03ACED] font-semibold text-xs uppercase tracking-wider">Description</th>
                  <th className="text-left py-3 px-4 text-[#03ACED] font-semibold text-xs uppercase tracking-wider">NSN</th>
                  <th className="text-left py-3 px-4 text-[#03ACED] font-semibold text-xs uppercase tracking-wider">Condition</th>
                  <th className="text-left py-3 px-4 text-[#03ACED] font-semibold text-xs uppercase tracking-wider">Lead Time</th>
                  <th className="text-left py-3 px-4 text-[#03ACED] font-semibold text-xs uppercase tracking-wider">Qty</th>
                </tr>
              </thead>
              <tbody>
                {sampleInventory.map((item, i) => (
                  <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                    <td className="py-3 px-4 text-[#ccc] font-mono text-xs">{item.pn}</td>
                    <td className="py-3 px-4 text-[#bbb]">{item.desc}</td>
                    <td className="py-3 px-4 text-[#bbb] font-mono text-xs">{item.nsn}</td>
                    <td className="py-3 px-4"><span className="text-green-400 text-xs font-semibold">{item.condition}</span></td>
                    <td className="py-3 px-4 text-[#bbb]">{item.lead}</td>
                    <td className="py-3 px-4 text-[#ccc]">{item.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/#contact"
              className="bg-[#03ACED] text-black px-8 py-4 rounded-lg font-bold text-[15px] hover:bg-[#02a0db] transition-colors inline-flex items-center gap-2"
            >
              Request Full Inventory / Quote →
            </Link>
          </div>
        </div>
      </section>

      <CompetitiveAdvantage />
    </>
  );
}
