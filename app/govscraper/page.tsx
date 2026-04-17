"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import AnimatedNumber from "@/components/AnimatedNumber";

const steps = [
  {
    num: "01",
    title: "Select Your FSCs",
    desc: "Choose the Federal Supply Classes that match your business. Only see opportunities relevant to the products or services you provide — no sifting through irrelevant solicitations.",
  },
  {
    num: "02",
    title: "Select Categories",
    desc: "Whether you're a seasoned contractor or brand new to the industry, GovScraper filters opportunities that suit your qualifications. Maximize your chances of winning by narrowing your search.",
  },
  {
    num: "03",
    title: "Daily Opportunities Delivered",
    desc: "Get a customized list of opportunities every day. Your dashboard is organized and ready to review — no downloads, no manual sorting. Just instant access to the most relevant contracts.",
  },
];

const features = [
  { title: "2,000+ RFQs Daily", desc: "We download and organize over 2,000 DLA solicitations every single day so you don't have to." },
  { title: "Save 2+ Hours Daily", desc: "Members save an average of 2 hours per day that would otherwise be spent navigating PDFs and sorting RFQs." },
  { title: "Bid Smarter", desc: "Our filtering system shows you exactly what to bid on and what to skip, based on your FSC codes and capabilities." },
  { title: "NSN & CAGE Search", desc: "Instantly look up any NSN or CAGE code. Track specific items with your NSN Watch List for real-time alerts." },
  { title: "Community Access", desc: "Connect with other DLA contractors, share insights, ask questions, and learn from experienced government contractors." },
  { title: "GovPacking Integration", desc: "Check MIL-SPEC packaging requirements for your active bids directly from your dashboard." },
];

// Contracts won: 258 as of Apr 13, 2026. Grows by 1.3 every 3 days.
function getContractsWon(): number {
  const baseDate = new Date("2026-04-13");
  const baseCount = 258;
  const now = new Date();
  const daysDiff = (now.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24);
  return Math.floor(baseCount + (daysDiff / 3) * 1.3);
}

// Stat target values — rendered as animated counters below.
const contractsWon = getContractsWon();

const pricing = [
  {
    name: "GovScraper LITE",
    price: "$35",
    period: "/month",
    desc: "Guidance on DLA / DIBBS contracts",
    features: [
      "Access to GovScraper Community",
      "Answers to ALL DLA Questions",
      "ASTM/MIL-STD-2073 Discount",
      "Packaging & Shipment Discount",
    ],
    cta: "Join the Community",
    href: "https://www.govscraper.com",
  },
  {
    name: "GovScraper PRO",
    price: "$100",
    period: "/month",
    desc: "Cancel anytime | Free 7 Day Trial",
    features: [
      "Everything in LITE",
      "DIBBS RFQs Provided Daily",
      "Research Reduced to Seconds",
      "Focus on Info That Matters",
      "NSN & CAGE Search Tools",
      "Bid Analytics Dashboard",
    ],
    cta: "Try Free for 7 Days",
    href: "https://www.govscraper.com",
    popular: true,
  },
];

export default function GovScraperPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-[72px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0d1520] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(3,172,237,0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-15 py-20 md:py-24">
          {/* TOP — copy + CTAs (left-aligned, constrained width for readability) */}
          <div className="max-w-3xl mb-12 md:mb-16">
            <Reveal direction="up" delay={0} className="inline-flex items-center gap-2 px-4 py-2 bg-[#03ACED]/15 border border-[#03ACED]/40 rounded-full text-xs font-semibold text-[#03ACED] uppercase tracking-wider mb-6">
              Powered by MeND Sourcing Solutions
            </Reveal>
            <Reveal direction="up" delay={80}>
              <Image
                src="/images/govscraper-logo.png"
                alt="GovScraper"
                width={300}
                height={60}
                className="h-14 w-auto brightness-0 invert mb-6"
              />
            </Reveal>
            <Reveal direction="up" delay={180} as="h1" className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
              Simplify RFQs and the <span className="text-[#03ACED]">Bidding Process</span>
            </Reveal>
            <Reveal direction="up" delay={260} as="p" className="text-lg text-[#bbb] leading-relaxed mb-8 max-w-xl">
              We download and organize over 2,000 DLA solicitations daily. GovScraper automates your RFQ pipeline so you can focus on sourcing and winning — not sorting through PDFs.
            </Reveal>
            <Reveal direction="up" delay={340} className="flex flex-wrap gap-4">
              <a
                href="https://www.govscraper.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#03ACED] text-black px-8 py-4 rounded-lg font-bold text-[15px] hover:bg-[#02a0db] transition-colors inline-flex items-center gap-2"
              >
                Try Free for 7 Days <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#demo"
                className="bg-white/[0.06] text-white px-8 py-4 rounded-lg font-semibold text-[15px] border border-white/[0.12] hover:bg-white/10 transition-colors"
              >
                Request a Demo
              </a>
            </Reveal>
          </div>

          {/* BOTTOM — full-width product demo video */}
          <Reveal direction="up" delay={420}>
            <div className="relative group">
              {/* Ambient cyan glow behind the video */}
              <div className="absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(3,172,237,0.15),transparent_70%)] blur-2xl pointer-events-none" />
              <div className="relative bg-white/[0.04] backdrop-blur border border-white/[0.08] rounded-2xl p-3 md:p-4 shadow-2xl shadow-[#03ACED]/10">
                <video
                  src="/images/govscraper-demo.mp4"
                  poster="/images/govscraper-dashboard.png"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="GovScraper product tour — dashboard, RFQs, NSN search, FSC lookup, and awarded contracts"
                  className="rounded-xl w-full aspect-[16/10] object-cover"
                />
              </div>
              {/* Caption below video */}
              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[2px] text-white/50 font-semibold">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#03ACED] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#03ACED]" />
                </span>
                Live product tour · RFQs · NSN · FSC · Awarded contracts
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 px-6 border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-green-400/90 font-semibold">Members Have Won Over</span>
            </div>
            <span className="text-xs text-[#999] mt-1">
              (as of {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })})
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Reveal direction="up" delay={0} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#03ACED] tabular-nums">
                <AnimatedNumber to={contractsWon} suffix="+" />
              </div>
              <div className="text-xs uppercase tracking-[2px] text-[#999] mt-2 whitespace-nowrap">Contracts Won</div>
            </Reveal>
            <Reveal direction="up" delay={120} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#03ACED] tabular-nums">
                <AnimatedNumber to={5_400_000} prefix="$" format="dollar" decimals={1} />
              </div>
              <div className="text-xs uppercase tracking-[2px] text-[#999] mt-2 whitespace-nowrap">In Awards</div>
            </Reveal>
            <Reveal direction="up" delay={240} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#03ACED] tabular-nums">
                <AnimatedNumber to={300} suffix="+" />
              </div>
              <div className="text-xs uppercase tracking-[2px] text-[#999] mt-2 whitespace-nowrap">SPRS Score Average</div>
            </Reveal>
            <Reveal direction="up" delay={360} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#03ACED] tabular-nums">
                <AnimatedNumber to={2} suffix="+ hrs/day" />
              </div>
              <div className="text-xs uppercase tracking-[2px] text-[#999] mt-2 whitespace-nowrap">Saved Per Member — Every Single Day</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            How It Works
          </Reveal>
          <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Ditch the PDF. Forever.
          </Reveal>
          <Reveal direction="up" delay={160} as="p" className="text-lg text-[#bbb] max-w-2xl mb-16">
            GovScraper transforms giant stacks of RFQs into actionable insights, helping you decide to bid in seconds.
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <Reveal
                key={step.num}
                direction="left"
                delay={i * 120}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-10 hover:border-[#03ACED]/30 transition-colors"
              >
                <div className="text-[#03ACED] text-5xl font-black opacity-20 mb-4">{step.num}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-[#bbb] leading-relaxed">{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 md:py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Features
          </Reveal>
          <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-16">
            Everything You Need to Win
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Reveal
                key={f.title}
                direction="up"
                delay={i * 90}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-[#03ACED]/30 transition-colors"
              >
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-[#bbb] leading-relaxed">{f.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SEARCH TOOLS - HIGHLIGHTED */}
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up" className="bg-gradient-to-br from-[#03ACED]/15 via-[#03ACED]/5 to-transparent border border-[#03ACED]/30 rounded-3xl p-10 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#03ACED]/20 rounded-full text-[10px] font-bold text-[#03ACED] uppercase tracking-wider mb-4">
                  Built-In Intelligence
                </div>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
                  Stop Using Outdated Search Tools
                </h2>
                <p className="text-[#bbb] leading-relaxed mb-6">
                  Forget NSN-Now, WBParts, and other slow, outdated databases. GovScraper gives you instant access to the most comprehensive and up-to-date search tools in the industry — built right into your dashboard.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#03ACED]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">🔎</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">NSN Search</h3>
                      <p className="text-sm text-[#bbb]">
                        Search over <span className="text-[#03ACED] font-bold">15 million NSNs</span> instantly. Find part details, specifications, and associated RFQs in seconds — not minutes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#03ACED]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">🏭</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">CAGE Search</h3>
                      <p className="text-sm text-[#bbb]">
                        Access over <span className="text-[#03ACED] font-bold">1.6 million CAGE codes</span> with full company details, contact info, and associated NSNs. Find the right manufacturers and suppliers fast.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#03ACED]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">📋</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">FSC Lookup</h3>
                      <p className="text-sm text-[#bbb]">
                        Browse and select Federal Supply Classes to filter opportunities. Track specific FSCs on your dashboard and get daily alerts for new RFQs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-2xl p-8 inline-block">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl sm:text-4xl font-black text-[#03ACED]">15M+</div>
                      <div className="text-xs text-[#999] uppercase tracking-wider mt-1">NSNs Searchable</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl sm:text-4xl font-black text-[#03ACED]">1.6M+</div>
                      <div className="text-xs text-[#999] uppercase tracking-wider mt-1">CAGE Codes</div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/[0.06]">
                    <p className="text-sm text-[#bbb]">Updated regularly. Always current.</p>
                    <p className="text-xs text-[#999] mt-1">Replace NSN-Now, WBParts, and other outdated tools.</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
              Pricing
            </Reveal>
            <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Join Contractors Who&apos;ve Won 250+ Contracts
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricing.map((plan, i) => (
              <Reveal
                key={plan.name}
                direction="up"
                delay={i * 120}
                className={`rounded-2xl p-10 ${
                  plan.popular
                    ? "bg-gradient-to-br from-[#03ACED]/15 to-transparent border-2 border-[#03ACED]/40"
                    : "bg-white/[0.03] border border-white/[0.06]"
                }`}
              >
                {plan.popular && (
                  <span className="text-[10px] uppercase tracking-wider bg-[#03ACED] text-black font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold mt-4 mb-1">{plan.name}</h3>
                <p className="text-sm text-[#bbb] mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-3xl sm:text-4xl font-black text-[#03ACED]">{plan.price}</span>
                  <span className="text-[#999]">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-[#ccc]">
                      <span className="text-[#03ACED]">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center py-3 rounded-lg font-semibold text-sm ${
                    plan.popular
                      ? "bg-[#03ACED] text-black hover:bg-[#02a0db]"
                      : "bg-white/10 text-white border border-white/[0.12] hover:bg-white/15"
                  } transition-colors`}
                >
                  {plan.cta}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO REQUEST FORM */}
      <section id="demo" className="py-16 md:py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
              See It In Action
            </Reveal>
            <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Request a GovScraper Demo
            </Reveal>
            <Reveal direction="up" delay={160} as="p" className="text-[#bbb]">
              Our team will walk you through the platform and show you exactly how GovScraper can save you time and help you win more contracts.
            </Reveal>
          </div>
          <DemoForm />
        </div>
      </section>

      {/* BACK TO MAIN */}
      <section className="py-16 px-6 text-center">
        <Link href="/" className="text-[#03ACED] text-sm font-semibold hover:underline">
          ← Back to MeND Sourcing Solutions
        </Link>
      </section>
    </>
  );
}

function DemoForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone"),
          company: data.get("company"),
          topic: "GovScraper - Demo Request",
          message: `Demo request from GovScraper page.\nCurrent contracting experience: ${data.get("experience") || "Not specified"}\nMessage: ${data.get("message") || "None"}`,
          source: "GovScraper Demo Form",
        }),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-white/[0.03] border border-[#03ACED]/30 rounded-2xl p-12 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-2xl font-bold mb-2">Demo Request Received!</h3>
        <p className="text-[#bbb] mb-6">Want to skip the wait? Schedule your demo right now:</p>
        <a
          href="https://www.calendly.com/mendsourcing/govscraper"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#03ACED] text-black px-8 py-4 rounded-lg font-bold text-[15px] hover:bg-[#02a0db] transition-colors inline-flex items-center gap-2"
        >
          Schedule My Demo Now →
        </a>
        <p className="text-xs text-[#999] mt-4">Or we&apos;ll reach out within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-medium text-[#bbb] mb-2">First Name *</label>
          <input name="firstName" required className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors" placeholder="John" />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#bbb] mb-2">Last Name</label>
          <input name="lastName" className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors" placeholder="Doe" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-medium text-[#bbb] mb-2">Email *</label>
          <input name="email" type="email" required className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors" placeholder="john@company.com" />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#bbb] mb-2">Phone</label>
          <input
            name="phone"
            type="tel"
            maxLength={14}
            className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors"
            placeholder="(555) 000-0000"
            onInput={(e) => {
              const input = e.currentTarget;
              let v = input.value.replace(/\D/g, "").slice(0, 10);
              if (v.length >= 7) v = `(${v.slice(0,3)}) ${v.slice(3,6)}-${v.slice(6)}`;
              else if (v.length >= 4) v = `(${v.slice(0,3)}) ${v.slice(3)}`;
              else if (v.length >= 1) v = `(${v}`;
              input.value = v;
            }}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium text-[#bbb] mb-2">Company *</label>
        <input name="company" required className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors" placeholder="Company Name" />
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium text-[#bbb] mb-2">Current Government Contracting Experience</label>
        <select name="experience" className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors">
          <option value="" className="bg-[#111]">Select...</option>
          <option value="New - Just getting started" className="bg-[#111]">New — Just getting started</option>
          <option value="Some experience - A few contracts" className="bg-[#111]">Some experience — A few contracts</option>
          <option value="Experienced - Active contractor" className="bg-[#111]">Experienced — Active contractor</option>
          <option value="Advanced - Looking to scale" className="bg-[#111]">Advanced — Looking to scale</option>
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-xs font-medium text-[#bbb] mb-2">Anything specific you&apos;d like to see?</label>
        <textarea name="message" rows={3} className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors resize-none" placeholder="Tell us what you're looking for..." />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-4 bg-[#03ACED] text-black font-bold text-sm rounded-lg hover:bg-[#02a0db] transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Request My Demo →"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-sm mt-3 text-center">Something went wrong. Email us at sales@mendsourcing.com</p>
      )}
    </form>
  );
}
