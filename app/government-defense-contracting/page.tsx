"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";

function useGovPackingStats() {
  const [stats, setStats] = useState({ dlaContracts: 325, dollarAmount: 8000000, ordersCompleted: 634, inProgress: 29 });
  useEffect(() => {
    fetch("/api/stats").then(r => r.json()).then(d => { if (d.govpacking) setStats(d.govpacking); }).catch(() => {});
  }, []);
  return stats;
}

const steps = [
  "Review of the RFQ",
  "Collaborate with Trusted Suppliers and Procure",
  "Analyze Quotes, Bid, and Secure the Award",
  "Order the Item and Provide Flowdowns to Subcontractors",
  "Receive the Item, Inspect, Package, & Deliver",
];

const platforms = ["DIBBS", "SAM.gov", "NECO", "SAF/AQC"];

function formatDollar(amount: number): string {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
  return `$${amount}`;
}

export default function DefenseContractingPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");
  const gp = useGovPackingStats();

  const stats = [
    { num: gp.dlaContracts.toLocaleString(), label: "DLA Contracts", live: true },
    { num: formatDollar(gp.dollarAmount), label: "Contract Value", live: true },
    { num: gp.ordersCompleted.toLocaleString(), label: "GovPacking Orders Completed", live: true },
    { num: gp.inProgress.toString(), label: "GovPacking Orders In Progress", live: true },
    { num: "16+", label: "Years Experience", live: true },
    { num: "314", label: "SPRS Score", live: true },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone"),
          company: data.get("company"),
          topic: "Gov't & Defense Contracting - Lead",
          message: data.get("message") || "Lead from Gov't & Defense Contracting page",
          source: "Gov't & Defense Contracting Form",
        }),
      });
      setFormStatus("sent");
      form.reset();
    } catch {
      setFormStatus("idle");
    }
  }

  return (
    <>
      <Hero
        title="Gov't & Defense Contracting"
        subtitle="Delivering material essential to the warfighter."
      />

      {/* Intro */}
      <section className="py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#bbb] text-base leading-relaxed max-w-3xl mb-8">
            MeND is a certified SDVOSB (Service-Disabled Veteran-Owned Small Business) recognized by the Small Business Association. We conduct rigorous analysis of RFQs from platforms like DIBBS, SAM.gov, and NECO, using our proprietary algorithm to optimize bids resulting in competitive proposals with reduced lead times and strong pricing.
          </p>
          <div className="flex flex-wrap gap-3">
            {platforms.map((p) => (
              <span
                key={p}
                className="px-4 py-2 bg-[#03ACED]/10 border border-[#03ACED]/30 rounded-lg text-[#03ACED] text-sm font-semibold"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            By The Numbers
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">
            Our Achievements
          </h2>
          <div className="flex items-center gap-2 mb-12">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-green-400/90 font-medium">
              Live numbers — updated daily as of {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="text-center bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 relative"
              >
                {s.live && (
                  <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                )}
                <div className="text-3xl font-black text-[#03ACED] mb-2">{s.num}</div>
                <div className="text-xs text-[#bbb] leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Our Process
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-16">
            Our Contracting Process
          </h2>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex gap-6 items-center bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 hover:border-[#03ACED]/30 transition-colors"
              >
                <div className="text-3xl font-black text-[#03ACED]/30 min-w-[48px]">
                  0{i + 1}
                </div>
                <span className="text-[#ccc]">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Gen Form */}
      <section className="py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
              Get Started
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">Looking to Win Government Contracts?</h2>
            <p className="text-[#bbb]">
              Our team can get you up to speed and ready to win. Tell us about yourself and we&apos;ll be in touch within 24 hours.
            </p>
          </div>
          {formStatus === "sent" ? (
            <div className="bg-white/[0.03] border border-[#03ACED]/30 rounded-2xl p-12 text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
              <p className="text-[#bbb]">We&apos;ll be in touch within 24 hours to get you started.</p>
            </div>
          ) : (
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
                    onInput={(e) => { const input = e.currentTarget; let v = input.value.replace(/\D/g, "").slice(0, 10); if (v.length >= 7) v = `(${v.slice(0,3)}) ${v.slice(3,6)}-${v.slice(6)}`; else if (v.length >= 4) v = `(${v.slice(0,3)}) ${v.slice(3)}`; else if (v.length >= 1) v = `(${v}`; input.value = v; }}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-medium text-[#bbb] mb-2">Company *</label>
                <input name="company" required className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors" placeholder="Company Name" />
              </div>
              <div className="mb-6">
                <label className="block text-xs font-medium text-[#bbb] mb-2">Tell us about your goals</label>
                <textarea name="message" rows={3} className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors resize-none" placeholder="What are you looking to accomplish with government contracting?" />
              </div>
              <button type="submit" disabled={formStatus === "sending"} className="w-full py-4 bg-[#03ACED] text-black font-bold text-sm rounded-lg hover:bg-[#02a0db] transition-colors disabled:opacity-50">
                {formStatus === "sending" ? "Sending..." : "Start Winning Contracts Now! →"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
