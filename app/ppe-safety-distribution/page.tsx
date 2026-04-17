import Hero from "@/components/Hero";
import CompetitiveAdvantage from "@/components/CompetitiveAdvantage";
import Reveal from "@/components/Reveal";

export const metadata = { title: "PPE & Safety Distribution | MeND Sourcing Solutions" };

const categories = [
  {
    title: "PVC, Nitrile, & Natural Latex",
    desc: "Precision and comfort in PPE: Explore our range of PVC, Nitrile, and Natural Latex gloves for superior hand protection.",
  },
  {
    title: "Neoprene & Butyl",
    desc: "Hand protection with Neoprene and Butyl gloves — premium solutions for ultimate safety and comfort.",
  },
  {
    title: "ANSI Cut Levels A4 - A7",
    desc: "Unrivaled cut protection: ANSI Cut Level A4 to A7 gloves for superior safety and performance.",
  },
  {
    title: "Cold & Heat Protection",
    desc: "Stay safe in extreme temperatures: Cold and heat protection gloves for optimal comfort and safety.",
  },
];

const featuredProducts = [
  "Showa M7005PFXS Nitrile, Powder-Free",
  "Showa DEX Nighthawk Defender Disposable",
  "MAGID D-ROC Lightweight Gloves - Cut Level A9",
  "Carhartt Insulated System 5 Work Glove",
  "MAGID WeldPro Welding Gloves",
  "MAGID DuraMaster TB525E Cow Grain",
];

export default function PPESafetyPage() {
  return (
    <>
      <Hero
        title="PPE & Safety — Distribution"
        subtitle="Providing the material you need from world-class manufacturers. Covering you from head to toe."
      />

      {/* Intro */}
      <section className="py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Our Expansion
          </Reveal>
          <Reveal direction="up" delay={80} as="h2" className="text-4xl font-extrabold tracking-tight mb-6">
            Elevating Excellence in PPE &amp; Safety
          </Reveal>
          <Reveal direction="up" delay={160} as="p" className="text-[#bbb] text-base leading-relaxed max-w-3xl mb-16">
            We specialize in sourcing top-tier protective equipment from industry-leading manufacturers, implementing our own supply chain process. We serve renowned organizations prioritizing safety with swift service, personalized interactions, and solving sourcing challenges. No safety demand is too extreme.
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((c, i) => (
              <Reveal
                key={i}
                direction="up"
                delay={i * 120}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-10 hover:border-[#03ACED]/30 transition-colors"
              >
                <h3 className="text-lg font-bold mb-3">{c.title}</h3>
                <p className="text-sm text-[#bbb] leading-relaxed">{c.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Most Popular
          </Reveal>
          <Reveal direction="up" delay={80} as="h2" className="text-4xl font-extrabold tracking-tight mb-12">
            Featured Products
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredProducts.map((p, i) => (
              <Reveal
                key={p}
                direction="up"
                delay={i * 90}
                className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-[#03ACED]/30 transition-colors"
              >
                <span className="text-[#03ACED]">→</span>
                <span className="text-sm text-[#ccc]">{p}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CompetitiveAdvantage />
    </>
  );
}
