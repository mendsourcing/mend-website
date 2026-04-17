"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const services = [
  {
    title: "Full-Service Packaging",
    desc: "We handle everything — from decoding your packing codes to sourcing materials, packaging your items, and shipping them to the government. You send us the parts, we deliver them compliant.",
    icon: "📦",
  },
  {
    title: "Materials & Supplies",
    desc: "Need to package in-house? We supply ASTM and MIL-STD compliant barrier materials, containers, cushioning, dunnage, and more — shipped directly to your facility.",
    icon: "🏗️",
  },
  {
    title: "MIL-STD-129 Labels",
    desc: "Custom printed MIL-STD-129 compliant labels for unit and intermediate containers. Starting at $50 for up to 1,000 labels with FedEx Ground shipping.",
    icon: "🏷️",
  },
];

const codeCategories = [
  "Preservation Method",
  "Cleaning & Drying",
  "Preservation Material",
  "Wrap Material",
  "Cushioning & Dunnage Material",
  "Cushioning & Dunnage Thickness",
  "Unit Container",
  "Optional Procedures",
  "Intermediate Container",
  "Pack Code (Level A)",
  "Special Marking Codes",
];

const whyGovPacking = [
  {
    title: "100% Compliance Guaranteed",
    desc: "Every order we package meets ASTM and MIL-STD-2073 specifications. We don't ship until it's right.",
  },
  {
    title: "Keep Your Bid Price Strong",
    desc: "Our quotes are designed to help you win by keeping packaging costs low. We review our competition regularly — and we're still waiting for another packaging house to beat our pricing.",
  },
  {
    title: "376 Packing Codes Decoded",
    desc: "Our system decodes all 12 categories of MIL-STD-2073 packing codes instantly. No more guessing what the codes mean.",
  },
  {
    title: "AS9100 & ISO 9001 Certified",
    desc: "Backed by MeND Sourcing's aerospace-grade quality certifications. Your shipments are in hands that meet the highest industry standards.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Send Us Your Contract",
    desc: "Provide your RFQ or award document with the packing codes. We decode everything and prepare a detailed quote.",
  },
  {
    num: "02",
    title: "We Source & Prepare",
    desc: "We source compliant materials — barrier wraps, containers, cushioning, labels — everything your shipment needs.",
  },
  {
    num: "03",
    title: "Package to Specification",
    desc: "Your items are packaged to exact MIL-STD-2073 and ASTM requirements. Every unit and intermediate container is labeled per MIL-STD-129.",
  },
  {
    num: "04",
    title: "Ship & Deliver",
    desc: "We handle the shipment documentation, receiving reports, and delivery tracking. You get paid, we handle the rest.",
  },
];

export default function GovPackingPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-[72px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0a1018] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(3,172,237,0.06),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-15 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal direction="up" delay={0} className="inline-flex items-center gap-2 px-4 py-2 bg-[#03ACED]/15 border border-[#03ACED]/40 rounded-full text-xs font-semibold text-[#03ACED] uppercase tracking-wider mb-6">
              Government Packaging Specialists
            </Reveal>
            <Reveal direction="up" delay={80}>
              <Image
                src="/images/govpacking-logo.png"
                alt="GovPacking"
                width={300}
                height={60}
                className="h-14 w-auto brightness-0 invert mb-6"
              />
            </Reveal>
            <Reveal direction="up" delay={180} as="h1" className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
              ASTM &amp; MIL-STD-2073 <span className="text-[#03ACED]">Packaging Compliance</span>
            </Reveal>
            <Reveal direction="up" delay={260} as="p" className="text-lg text-[#bbb] leading-relaxed mb-4 max-w-2xl">
              Whether you need us to package your products to specification or supply the compliant materials for your team, we ensure 100% compliance on every government contract.
            </Reveal>
            <Reveal direction="up" delay={340} as="ul" className="space-y-2 mb-8">
              {["Full-service packaging to contract spec", "Compliant materials & supplies shipped to you", "100% compliance guaranteed on every order"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-[#ccc]">
                  <span className="text-[#03ACED]">✓</span> {item}
                </li>
              ))}
            </Reveal>
            <Reveal direction="up" delay={420} className="flex flex-wrap gap-4">
              <a
                href="#quote"
                className="group bg-[#03ACED] text-black px-8 py-4 rounded-lg font-bold text-[15px] hover:bg-[#02a0db] transition-colors inline-flex items-center gap-2"
              >
                Request a Packaging Quote <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="https://govpacking.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/[0.06] text-white px-8 py-4 rounded-lg font-semibold text-[15px] border border-white/[0.12] hover:bg-white/10 transition-colors"
              >
                Enter Packing Codes on GovPacking.com
              </a>
            </Reveal>
          </div>
            <Reveal direction="left" delay={200} className="hidden lg:block">
              <div className="bg-white/[0.04] backdrop-blur border border-white/[0.08] rounded-2xl p-3 shadow-2xl">
                <Image
                  src="/images/govpacking-hero.png"
                  alt="GovPacking Website"
                  width={800}
                  height={500}
                  className="rounded-xl w-full"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            What We Offer
          </Reveal>
          <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-16">
            Packaging Services &amp; Materials
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((svc, i) => (
              <Reveal
                key={svc.title}
                direction="up"
                delay={i * 120}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-10 hover:border-[#03ACED]/30 transition-colors"
              >
                <div className="text-3xl mb-4">{svc.icon}</div>
                <h3 className="text-xl font-bold mb-3">{svc.title}</h3>
                <p className="text-sm text-[#bbb] leading-relaxed">{svc.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY GOVPACKING */}
      <section className="py-16 md:py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Why GovPacking
          </Reveal>
          <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-16">
            Why Contractors Trust Us
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyGovPacking.map((item, i) => (
              <Reveal
                key={i}
                direction="up"
                delay={i * 120}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-10 hover:border-[#03ACED]/30 transition-colors"
              >
                <div className="text-[#03ACED] text-3xl sm:text-4xl font-black opacity-20 mb-4">0{i + 1}</div>
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-[#bbb] leading-relaxed">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PACKING CODES */}
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up" className="bg-gradient-to-br from-[#03ACED]/10 via-[#03ACED]/5 to-transparent border border-[#03ACED]/30 rounded-3xl p-10 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#03ACED]/20 rounded-full text-[10px] font-bold text-[#03ACED] uppercase tracking-wider mb-4">
                  MIL-STD-2073 Decoder
                </div>
                <h2 className="text-3xl font-black tracking-tight mb-4">
                  376 Packing Codes. Decoded Instantly.
                </h2>
                <p className="text-[#bbb] leading-relaxed mb-6">
                  Our packing code decoder covers all 12 categories of MIL-STD-2073. Enter your codes and get clear, plain-language instructions on exactly how to package your items.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {codeCategories.map((cat) => (
                    <span key={cat} className="text-[11px] bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-1.5 text-[#ccc]">
                      {cat}
                    </span>
                  ))}
                </div>
                <a
                  href="https://govpacking.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#03ACED] text-black px-6 py-3 rounded-lg font-bold text-sm hover:bg-[#02a0db] transition-colors inline-flex items-center gap-2"
                >
                  Try the Packing Code Decoder →
                </a>
              </div>
              <div className="text-center">
                <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-2xl p-8 inline-block">
                  <div className="text-6xl font-black text-[#03ACED] mb-2">376</div>
                  <div className="text-xs text-[#999] uppercase tracking-wider">Packing Codes</div>
                  <div className="mt-6 pt-6 border-t border-white/[0.06] grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-black text-white">12</div>
                      <div className="text-[10px] text-[#999] uppercase tracking-wider">Categories</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-white">100%</div>
                      <div className="text-[10px] text-[#999] uppercase tracking-wider">Coverage</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 md:py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            How It Works
          </Reveal>
          <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-16">
            From Contract to Compliant Delivery
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <Reveal
                key={step.num}
                direction="left"
                delay={i * 120}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-[#03ACED]/30 transition-colors"
              >
                <div className="text-[#03ACED] text-3xl sm:text-4xl font-black opacity-20 mb-4">{step.num}</div>
                <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-[#bbb] leading-relaxed">{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LABELS PRICING */}
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
              MIL-STD-129 Labels
            </Reveal>
            <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Compliant Labels, Fast
            </Reveal>
            <Reveal direction="up" delay={160} as="p" className="text-[#bbb] max-w-xl mx-auto">
              Custom printed MIL-STD-129 compliant labels for unit and intermediate containers. Shipped via FedEx Ground.
            </Reveal>
          </div>
          <Reveal direction="up" className="max-w-md mx-auto bg-gradient-to-br from-[#03ACED]/15 to-transparent border border-[#03ACED]/30 rounded-2xl p-10 text-center">
            <div className="text-5xl font-black text-[#03ACED] mb-2">$50</div>
            <p className="text-sm text-[#bbb] mb-6">Up to 1,000 total labels</p>
            <div className="space-y-2 text-sm text-[#ccc] mb-8">
              <div className="flex justify-between border-b border-white/[0.06] pb-2">
                <span>Additional labels</span>
                <span className="font-semibold">$0.05 each</span>
              </div>
              <div className="flex justify-between">
                <span>FedEx Ground shipping</span>
                <span className="font-semibold">$11.95</span>
              </div>
            </div>
            <a
              href="https://govpacking.com/request-mil-std-129-labels"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#03ACED] text-black py-3 rounded-lg font-semibold text-sm hover:bg-[#02a0db] transition-colors"
            >
              Order Labels on GovPacking.com →
            </a>
          </Reveal>
        </div>
      </section>

      {/* QUOTE / DEMO REQUEST */}
      <section id="quote" className="py-16 md:py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
              Get Started
            </Reveal>
            <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Let&apos;s Discuss Your Packaging Needs
            </Reveal>
            <Reveal direction="up" delay={160} as="p" className="text-[#bbb]">
              Tell us about your contract and we&apos;ll prepare a quote. Or schedule a call to walk through your requirements.
            </Reveal>
          </div>
          <PackagingForm />
        </div>
      </section>

      {/* BACK */}
      <section className="py-16 px-6 text-center">
        <Link href="/" className="text-[#03ACED] text-sm font-semibold hover:underline">
          ← Back to MeND Sourcing Solutions
        </Link>
      </section>
    </>
  );
}

function PackagingForm() {
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
          topic: "GovPacking - Packaging Quote Request",
          message: `Packaging inquiry from GovPacking page.\nContract/NSN: ${data.get("contract") || "Not provided"}\nMessage: ${data.get("message") || "None"}`,
          source: "GovPacking Quote Form",
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
        <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
        <p className="text-[#bbb] mb-6">Want to schedule a call now to discuss your packaging needs?</p>
        <a
          href="https://www.calendly.com/mendsourcing/govpacking"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#03ACED] text-black px-8 py-4 rounded-lg font-bold text-[15px] hover:bg-[#02a0db] transition-colors inline-flex items-center gap-2"
        >
          Schedule a Call Now →
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
            name="phone" type="tel" maxLength={14}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-medium text-[#bbb] mb-2">Company *</label>
          <input name="company" required className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors" placeholder="Company Name" />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#bbb] mb-2">Contract # or NSN</label>
          <input name="contract" className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors" placeholder="e.g. SPE4A5-24-Q-0123 or 5306-01-184-7652" />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-xs font-medium text-[#bbb] mb-2">Tell us about your packaging needs</label>
        <textarea name="message" rows={4} className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors resize-none" placeholder="Describe what you need packaged, any specific requirements, or questions..." />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-4 bg-[#03ACED] text-black font-bold text-sm rounded-lg hover:bg-[#02a0db] transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Submit Packaging Request →"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-sm mt-3 text-center">Something went wrong. Email us at sales@mendsourcing.com</p>
      )}
    </form>
  );
}
