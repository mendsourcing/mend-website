const advantages = [
  {
    title: "Simplified Supply Chain",
    quote:
      "MeND provided a single touchpoint from procurement, to order, to packaging, to delivery, and even the contract close out.",
  },
  {
    title: "Locally Sourced",
    quote:
      "The price per unit was by far cheaper than most distributors I reached out to. Price, lead-time, and quality were never jeopardized.",
  },
  {
    title: "Transparent Communication",
    quote:
      "I never felt like I didn't know the status. For issues I had to be aware of, they reached out — for ones that didn't, they felt empowered and took control.",
  },
];

export default function CompetitiveAdvantage() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-15">
      <div className="max-w-7xl mx-auto">
        <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
          Why Choose Us
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-16">
          Competitive Advantage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advantages.map((a, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-10 hover:border-[#03ACED]/30 transition-all"
            >
              <div className="text-[#03ACED] text-5xl font-black mb-6 opacity-20">
                0{i + 1}
              </div>
              <h3 className="text-xl font-bold mb-4">{a.title}</h3>
              <p className="text-[#bbb] text-sm leading-relaxed italic">
                &ldquo;{a.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
