import Hero from "@/components/Hero";

export const metadata = { title: "GovPacking - Packaging & Logistics | MeND Sourcing Solutions" };

const packagingCodes = [
  {
    title: "Packaging Codes Unboxed",
    desc: "We provide a comprehensive service for decoding all MIL-STD-2073 packaging codes. Our expert team reviews the contract, deciphers the all too-confusing packaging codes, and provides you with detailed instructions on proper packaging techniques.",
    cta: { label: "Packaging Decoder", href: "https://govpacking.com/" },
  },
  {
    title: "Parts Packed Correctly",
    desc: "Precision in Every Package: We adhere to precise size, count, and weight specifications for all container types. Our in-house algorithm optimizes packaging, using the smallest boxes for parts, reducing excess material, weight, and cost.",
  },
  {
    title: "Unit & Intermediate Labels",
    desc: "We offer high-quality labels for unit and intermediate containers, ensuring full compliance with MIL-STD-129. Our labels contain all the necessary information to meet government packaging standards. $0.45 per label, with processing and direct shipping.",
    cta: { label: "Create Your Labels", href: "https://govpacking.com/" },
  },
  {
    title: "Shipment & Documents Done Accurately",
    desc: "We ensure accurate shipments and provide comprehensive documents. From receiving reports to invoices and tracking documents, our meticulous approach guarantees on-time delivery and payment for every package.",
    cta: { label: "Request Quote for Packing", href: "https://govpacking.com/" },
  },
];

export default function PackagingLogisticsPage() {
  return (
    <>
      <Hero
        title="Unboxing the World of Packaging & Logistics"
        subtitle="At MeND, we serve as your dedicated partner, simplifying the intricacies of packaging and logistics."
      />

      {/* Sourcing Materials */}
      <section className="py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Sourcing Package Material
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-6">
            Finding the Type of Material You Need
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              "Bags - Poly, Watervaporproof, & More",
              "Boxes, Corrugated & Weather Resistant",
              "Barcode Labeling & Printers",
              "Anti-Static Lining & More",
            ].map((item) => (
              <div
                key={item}
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 text-sm text-[#ccc]"
              >
                {item}
              </div>
            ))}
          </div>
          <a
            href="https://govpacking.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#03ACED] text-black px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#02a0db] transition-colors"
          >
            Visit GovPacking to Learn More →
          </a>
        </div>
      </section>

      {/* Kitting */}
      <section className="py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Kitting & Package Preparation
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-12">
            Customized Solutions Tailored to Your Request
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-10">
              <h3 className="text-xl font-bold mb-4">Custom Kitting Solutions</h3>
              <ul className="space-y-3 text-[#888] text-sm">
                <li className="flex gap-3">
                  <span className="text-[#03ACED]">→</span>
                  Discuss with our team about your kitting needs
                </li>
                <li className="flex gap-3">
                  <span className="text-[#03ACED]">→</span>
                  Guaranteed delivery date with each quote and competitive pricing
                </li>
              </ul>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-10">
              <h3 className="text-xl font-bold mb-4">Package Labeling & RFID Integration</h3>
              <ul className="space-y-3 text-[#888] text-sm">
                <li className="flex gap-3">
                  <span className="text-[#03ACED]">→</span>
                  Labels provided as needed to complete your shipment
                </li>
                <li className="flex gap-3">
                  <span className="text-[#03ACED]">→</span>
                  Order batches of RFID labels to keep track of your inventory
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MIL-STD */}
      <section className="py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            MIL-STD-2073 & MIL-STD-129R
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-16">
            Military Standard Packaging
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packagingCodes.map((item, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-10 hover:border-[#03ACED]/30 transition-colors"
              >
                <div className="text-[#03ACED] text-4xl font-black opacity-20 mb-4">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-[#888] leading-relaxed mb-4">
                  {item.desc}
                </p>
                {item.cta && (
                  <a
                    href={item.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#03ACED] text-sm font-semibold"
                  >
                    {item.cta.label} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
