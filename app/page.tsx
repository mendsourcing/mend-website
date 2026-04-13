import Link from "next/link";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

const partners = ["Acufast", "MS Aerospace", "Novaria Group", "Space Lok", "Twist Tite"];

const b2bServices = [
  {
    logo: "/images/govpacking-logo.png",
    name: "GovPacking",
    desc: "Decode MIL-STD-2073 & ASTM government packaging requirements with precision. Streamline your compliance process.",
    href: "/packaging-logistics",
    cta: "Package Your Contract",
  },
  {
    logo: "/images/govscraper-logo.png",
    name: "GovScraper",
    desc: "Automated DLA & DIBBS solicitation scraping. Get real-time RFQs without manually downloading PDFs.",
    href: "https://www.govscraper.com",
    cta: "See GovScraper In Action",
    external: true,
  },
  {
    logo: "/images/govtraining-logo.png",
    name: "GovTraining",
    desc: "Expert-led courses on government contract bidding, compliance, and procurement. MasterClass and Jumpstart programs available.",
    href: "/govtraining",
    cta: "Win More Contracts",
  },
];

const b2gServices = [
  {
    num: "01",
    title: "Contract Management & Fulfillment",
    desc: "Complete follow-up and management to ensure every part arrives on time, every time. From award to close-out.",
  },
  {
    num: "02",
    title: "Part Identifying Procurement",
    desc: "Identify exact parts, link to NSN, and source directly from manufacturers to reduce costs and lead times.",
  },
  {
    num: "03",
    title: "Supplier Relationship Management",
    desc: "Extensive annual audits of approved manufacturers ensuring quality, reliability, and compliance.",
  },
];

const whyMend = [
  { icon: "⏱", title: "15+ Years", desc: "Procurement and contracted work experience" },
  { icon: "✅", title: "AS9100 & ISO9001", desc: "High level quality certification" },
  { icon: "🎖", title: "Veteran Owned", desc: "Owned and operated by veterans" },
  { icon: "👂", title: "Listen First", desc: "Execute second approach" },
  { icon: "⭐", title: "Quality First", desc: "Timeliness and exceeding expectations" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-[72px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1580532224583-df27f865580b?w=1920&q=80&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/[0.88] via-black/60 to-black/[0.82]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-15 w-full flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="max-w-[720px]">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#03ACED]/15 border border-[#03ACED]/40 rounded-full text-xs font-semibold text-[#03ACED] uppercase tracking-wider mb-8">
              <span className="w-1.5 h-1.5 bg-[#03ACED] rounded-full animate-pulse" />
              Veteran Owned &amp; Operated
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
              Simplifying{" "}
              <span className="text-[#03ACED]">Government</span> Contracting at
              Peak Efficiency
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-[560px] mb-10 leading-relaxed">
              Unraveling procurement and supply chain complexities to uncover
              opportunities within government contracting. AS9100 &amp; ISO9001
              certified.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/#contact"
                className="bg-[#03ACED] text-black px-8 py-4 rounded-lg font-bold text-[15px] hover:bg-[#02a0db] transition-colors inline-flex items-center gap-2"
              >
                Start Your Contract →
              </Link>
              <Link
                href="#services"
                className="bg-white/[0.06] text-white px-8 py-4 rounded-lg font-semibold text-[15px] border border-white/[0.12] hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                Explore Services
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <Image src="/images/as9100-cert.png" alt="AS9100 Rev. D Certified" width={80} height={80} className="h-16 w-auto opacity-70" />
              <Image src="/images/iso9001-cert.png" alt="ISO 9001:2015 Certified" width={80} height={80} className="h-16 w-auto opacity-70" />
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-12">
            {[
              { num: "190+", label: "Awarded Contracts" },
              { num: "62", label: "Manufacturing Partners" },
              { num: "14+", label: "Years Experience" },
            ].map((s) => (
              <div key={s.label} className="text-right">
                <div className="text-6xl font-black tracking-tight">
                  {s.num.replace("+", "")}
                  {s.num.includes("+") && (
                    <span className="text-[#03ACED]">+</span>
                  )}
                </div>
                <div className="text-xs text-white/50 uppercase tracking-[2px] mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="py-12 px-6 border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-12">
          <span className="text-xs uppercase tracking-[2px] text-[#999] font-semibold">
            Trusted By
          </span>
          {partners.map((p) => (
            <div
              key={p}
              className="flex items-center gap-3 text-[#aaa] text-sm font-medium"
            >
              <div className="w-10 h-10 rounded-lg bg-[#03ACED]/10 flex items-center justify-center text-[#03ACED] font-bold text-sm">
                {p[0]}
              </div>
              {p}
            </div>
          ))}
        </div>
      </section>

      {/* B2B SERVICES */}
      <section id="services" className="py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Business-to-Business
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Our B2B Solutions
          </h2>
          <p className="text-lg text-[#aaa] max-w-[560px] mb-16">
            Powerful tools and training designed to help businesses win and
            manage government contracts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {b2bServices.map((svc) => (
              <div
                key={svc.name}
                className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl p-10 transition-all hover:border-[#03ACED]/30 hover:bg-[#03ACED]/[0.03] hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#03ACED] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="h-12 mb-6 flex items-center">
                  <Image
                    src={svc.logo}
                    alt={svc.name}
                    width={200}
                    height={48}
                    className="h-10 w-auto brightness-0 invert"
                  />
                </div>
                <h3 className="text-[22px] font-bold mb-3">{svc.name}</h3>
                <p className="text-[15px] text-[#bbb] leading-relaxed mb-5">
                  {svc.desc}
                </p>
                {svc.external ? (
                  <a
                    href={svc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#03ACED] text-sm font-semibold"
                  >
                    {svc.cta} →
                  </a>
                ) : (
                  <Link
                    href={svc.href}
                    className="inline-flex items-center gap-2 text-[#03ACED] text-sm font-semibold"
                  >
                    {svc.cta} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2G SERVICES */}
      <section className="py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Business-to-Government
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Direct Government Services
          </h2>
          <p className="text-lg text-[#aaa] max-w-[560px] mb-16">
            End-to-end contract management and procurement for defense and
            government agencies.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              {b2gServices.map((f) => (
                <div key={f.num} className="flex gap-5">
                  <div className="text-[32px] font-black text-[#03ACED]/30 min-w-[48px]">
                    {f.num}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">{f.title}</h4>
                    <p className="text-sm text-[#bbb] leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-[400px] h-[400px] rounded-full border-2 border-[#03ACED]/20 flex items-center justify-center relative">
                <div className="w-[300px] h-[300px] rounded-full border border-[#03ACED]/10 flex items-center justify-center">
                  <div className="w-[160px] h-[160px] rounded-full bg-[#03ACED]/[0.08] flex items-center justify-center text-5xl">
                    ⚙️
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY MEND */}
      <section className="py-24 px-6 md:px-15 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#03ACED]/[0.03] via-transparent to-[#E94615]/[0.02]" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
              Why MeND
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              What Sets Us Apart
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {whyMend.map((w) => (
              <div
                key={w.title}
                className="text-center p-8 bg-white/[0.02] border border-white/[0.06] rounded-2xl hover:border-[#03ACED]/20 transition-colors"
              >
                <div className="text-3xl mb-4">{w.icon}</div>
                <h4 className="text-[15px] font-semibold mb-2">{w.title}</h4>
                <p className="text-xs text-[#bbb] leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
              Get in Touch
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Have Questions?
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-extrabold mb-6">
                Let&apos;s work together
              </h3>
              <p className="text-[#bbb] text-base leading-relaxed mb-8">
                Whether you need packaging compliance, procurement support, or
                government contracting training, we&apos;re here to help.
              </p>
              <div className="space-y-5">
                <div className="flex gap-4 items-center">
                  <div className="w-11 h-11 rounded-xl bg-[#03ACED]/10 flex items-center justify-center text-[#03ACED]">
                    📍
                  </div>
                  <span className="text-[#ccc] text-[15px]">
                    1713 E. 58th Pl. Unit G, Los Angeles, CA 90001
                  </span>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-11 h-11 rounded-xl bg-[#03ACED]/10 flex items-center justify-center text-[#03ACED]">
                    ✉️
                  </div>
                  <a
                    href="mailto:sales@mendsourcing.com"
                    className="text-[#ccc] text-[15px] hover:text-[#03ACED] transition-colors"
                  >
                    sales@mendsourcing.com
                  </a>
                </div>
              </div>
              <div className="mt-10">
                <span className="text-xs text-[#aaa] uppercase tracking-[2px]">
                  Follow Us
                </span>
                <div className="flex gap-3 mt-3">
                  {[
                    { label: "YT", href: "https://www.youtube.com/@mendsourcing" },
                    { label: "X", href: "https://x.com/supertris10" },
                    { label: "LI", href: "https://www.linkedin.com/in/tristanwthomas/" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#bbb] text-sm hover:text-[#03ACED] hover:bg-white/10 transition-all"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
