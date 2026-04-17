import Link from "next/link";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import GovPackingDashboard from "@/components/GovPackingDashboard";
import Reveal from "@/components/Reveal";
import LocationMap from "@/components/LocationMap";
import CertBadges from "@/components/CertBadges";

const vendorLogos = [
  { name: "Boeing", src: "/images/vendors/boeing.png", hasBg: true },
  { name: "Acufast", src: "/images/vendors/acufast.webp", hasBg: true },
  { name: "MS Aerospace", src: "/images/vendors/ms-aerospace.jpeg", hasBg: true },
  { name: "Novaria Group", src: "/images/vendors/novaria-group.webp", hasBg: false },
  { name: "Space-Lok", src: "/images/vendors/space-lok.png", hasBg: true, tall: true },
  { name: "WG", src: "/images/vendors/wg.webp", hasBg: false },
];

const services = [
  {
    logo: "/images/govscraper-logo.png",
    name: "GovScraper",
    desc: "We scrape and organize over 2,000 DLA solicitations daily so you don't have to. GovScraper filters the noise and delivers the RFQs that match your capabilities — saving members an average of 2 hours every day.",
    forThose: "Cut through the clutter and bid smarter, not harder.",
    href: "/govscraper",
    cta: "See GovScraper In Action",
  },
  {
    logo: "/images/govpacking-logo.png",
    name: "GovPacking",
    desc: "Government packaging doesn't have to be confusing. We decode ASTM and MIL-STD-2073 requirements, source the right materials, and make sure every shipment leaves your dock fully compliant.",
    forThose: "Take the guesswork out of military packaging compliance.",
    href: "/packaging-logistics",
    cta: "Package Your Contract",
  },
  {
    logo: "/images/govtraining-logo.png",
    name: "GovTraining",
    desc: "Whether you're just getting started or ready to master the entire process, our hands-on training gives you the real-world knowledge to bid, win, and deliver government contracts with confidence.",
    forThose: "Build a foundation or go deep — and start winning.",
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
  {
    num: "04",
    title: "Packaging & Fulfillment",
    desc: "Military-spec packaging compliant with ASTM standards and MIL-STD-2073. We decode the codes, source the right materials, and ship every contract ready for acceptance.",
  },
];

const whyMend = [
  { icon: "⏱", title: "16+ Years", desc: "Deep experience in procurement and government contracting" },
  { icon: "✅", title: "AS9100 & ISO9001", desc: "Certified quality standards for aerospace and defense" },
  { icon: "🎖", title: "Veteran Owned", desc: "Proudly owned and operated by military veterans" },
  { icon: "👂", title: "Listen First", desc: "Understand the mission before executing the solution" },
  { icon: "⭐", title: "Quality First", desc: "On-time delivery that exceeds every expectation" },
  { icon: "🚀", title: "Disruptive Innovation", desc: "Refining procurement, training, packaging, and fulfillment" },
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

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-15 w-full flex flex-col lg:flex-row items-center justify-between gap-12 py-24 lg:py-0">
          <div className="max-w-[720px] w-full">
            <Reveal direction="up" delay={0} className="inline-flex items-center gap-2 px-4 py-2 bg-[#03ACED]/15 border border-[#03ACED]/40 rounded-full text-xs font-semibold text-[#03ACED] uppercase tracking-wider mb-6 md:mb-8">
              <span className="w-1.5 h-1.5 bg-[#03ACED] rounded-full animate-pulse" />
              Veteran Owned &amp; Operated
            </Reveal>
            <Reveal direction="up" delay={80} as="h1" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
              Simplifying{" "}
              <span className="text-[#03ACED]">Government</span> Contracting at
              Peak Efficiency
            </Reveal>
            <Reveal direction="up" delay={180} as="p" className="text-base sm:text-lg md:text-xl text-white/70 max-w-[560px] mb-8 md:mb-10 leading-relaxed">
              Unraveling procurement and supply chain complexities to uncover
              opportunities within government contracting. AS9100 &amp; ISO9001
              certified.
            </Reveal>
            <Reveal direction="up" delay={260} className="flex flex-wrap gap-3 sm:gap-4 mb-8 md:mb-10">
              <Link
                href="/#contact"
                className="group bg-[#03ACED] text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-[15px] hover:bg-[#02a0db] transition-colors inline-flex items-center gap-2"
              >
                How Can We Help?
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="#services"
                className="group bg-white/[0.06] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-[15px] border border-white/[0.12] hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm inline-flex items-center gap-2"
              >
                Explore Services
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 opacity-60 group-hover:opacity-100">→</span>
              </Link>
            </Reveal>
            <Reveal direction="up" delay={340} className="flex flex-wrap items-center gap-3 sm:gap-4">
              <CertBadges />
            </Reveal>
          </div>

          <GovPackingDashboard />
        </div>
      </section>

      {/* TRUSTED BY - SCROLLING LOGOS */}
      <section className="py-10 border-y border-white/[0.06] overflow-hidden">
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-[3px] text-[#999] font-semibold">
            Trusted By
          </span>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
          <div className="flex animate-scroll">
            {[...vendorLogos, ...vendorLogos].map((v, i) => (
              <div key={`${v.name}-${i}`} className="flex-shrink-0 mx-6 sm:mx-10 flex items-center justify-center h-16">
                <div className={`flex items-center justify-center px-3 sm:px-4 py-2 rounded-lg ${v.hasBg ? "bg-white" : ""}`}>
                  <Image
                    src={v.src}
                    alt={v.name}
                    width={160}
                    height={60}
                    className={`${v.tall ? "h-10 sm:h-14" : "h-7 sm:h-9"} w-auto object-contain`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B SERVICES */}
      <section id="services" className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Our Products & Services
          </Reveal>
          <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Our Solutions
          </Reveal>
          <Reveal direction="up" delay={160} as="p" className="text-lg text-[#aaa] max-w-[560px] mb-16">
            Powerful tools and training designed to help you win and
            manage government contracts.
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <Reveal
                key={svc.name}
                direction="up"
                delay={i * 120}
                className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl p-10 transition-all hover:border-[#03ACED]/30 hover:bg-[#03ACED]/[0.03] hover:-translate-y-1 relative overflow-hidden flex flex-col"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#03ACED] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="h-12 mb-6 flex items-center overflow-hidden">
                  <Image
                    src={svc.logo}
                    alt={svc.name}
                    width={200}
                    height={48}
                    className="h-10 w-auto brightness-0 invert transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-[22px] font-bold mb-3">{svc.name}</h3>
                <p className="text-[15px] text-[#bbb] leading-relaxed mb-4 flex-1">
                  {svc.desc}
                </p>
                <div className="pt-4 border-t border-white/[0.06] mb-5">
                  <span className="text-[11px] uppercase tracking-[2px] text-[#03ACED] font-semibold">For Those Looking To:</span>
                  <p className="text-sm text-white/80 mt-1">{svc.forThose}</p>
                </div>
                <Link
                  href={svc.href}
                  className="inline-flex items-center gap-2 text-[#03ACED] text-sm font-semibold"
                >
                  {svc.cta}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* B2G SERVICES */}
      <section className="py-16 md:py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Business-to-Government
          </Reveal>
          <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Direct Government Services
          </Reveal>
          <Reveal direction="up" delay={160} as="p" className="text-lg text-[#aaa] max-w-[560px] mb-16">
            End-to-end contract management and procurement for defense and
            government agencies.
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              {b2gServices.map((f, i) => (
                <Reveal key={f.num} direction="left" delay={i * 120} className="flex gap-5">
                  <div className="text-[32px] font-black text-[#03ACED]/30 min-w-[48px]">
                    {f.num}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">{f.title}</h4>
                    <p className="text-sm text-[#bbb] leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </Reveal>
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
      <section className="py-16 md:py-24 px-6 md:px-15 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#03ACED]/[0.03] via-transparent to-[#E94615]/[0.02]" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
              Why MeND
            </Reveal>
            <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              What Sets Us Apart
            </Reveal>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {whyMend.map((w, i) => (
              <Reveal
                key={w.title}
                direction="up"
                delay={i * 90}
                className="text-center p-6 md:p-7 bg-white/[0.02] border border-[#03ACED]/30 rounded-2xl hover:border-[#03ACED]/70 hover:-translate-y-1 hover:bg-[#03ACED]/[0.05] hover:shadow-[0_0_24px_rgba(3,172,237,0.15)] transition-all duration-300"
              >
                <div className="text-3xl mb-4">{w.icon}</div>
                <h4 className="text-[15px] font-semibold mb-2">{w.title}</h4>
                <p className="text-xs text-[#bbb] leading-relaxed">{w.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
              Get in Touch
            </Reveal>
            <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Have Questions?
            </Reveal>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Reveal direction="right" delay={0}>
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
              {/* Tactical HQ map */}
              <div className="mt-10">
                <LocationMap />
              </div>
            </Reveal>
            <Reveal direction="left" delay={120}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
