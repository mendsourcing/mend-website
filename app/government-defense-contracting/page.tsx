"use client";

import { useState } from "react";
import Hero from "@/components/Hero";

const stats = [
  { num: "64", label: "SDVOSB Contracts" },
  { num: "142", label: "Trusted Manufacturing Partners" },
  { num: "284", label: "Awarded CLINs Serviced" },
  { num: "4/5", label: "Green Average Rating" },
  { num: "2.8", label: "SPRS Score" },
  { num: "$2.8M", label: "In Awarded Contracts" },
];

const steps = [
  "Review of the RFQ",
  "Collaborate with Trusted Suppliers and Procure",
  "Analyze Quotes, Bid, and Secure the Award",
  "Order the Item and Provide Flowdowns to Subcontractors",
  "Receive the Item, Inspect, Package, & Deliver",
];

const platforms = ["DIBBS", "SAM.gov", "NECO", "SAF/AQC"];

export default function DefenseContractingPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");

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
          topic: "Gov't & Defense Contracting - Lead",
          message: "Lead from defense contracting page",
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
          <p className="text-[#888] text-base leading-relaxed max-w-3xl mb-8">
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
          <h2 className="text-4xl font-extrabold tracking-tight mb-16">
            Our Achievements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="text-center bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6"
              >
                <div className="text-3xl font-black text-[#03ACED] mb-2">{s.num}</div>
                <div className="text-xs text-[#888] leading-tight">{s.label}</div>
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
        <div className="max-w-7xl mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Looking to Win Government Contracts?</h2>
          <p className="text-[#888] mb-10">
            Our team can get you up to speed and ready to win. Add your contact information below.
          </p>
          {formStatus === "sent" ? (
            <div className="bg-white/[0.03] border border-[#03ACED]/30 rounded-2xl p-10">
              <div className="text-3xl mb-3">✅</div>
              <p className="text-lg font-bold">Thank you! We&apos;ll be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="firstName" required placeholder="First Name" className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED]" />
                <input name="lastName" required placeholder="Last Name" className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="email" type="email" required placeholder="Email" className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED]" />
                <input name="phone" type="tel" placeholder="Phone" className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED]" />
              </div>
              <button type="submit" disabled={formStatus === "sending"} className="w-full py-4 bg-[#03ACED] text-black font-bold rounded-lg hover:bg-[#02a0db] transition-colors disabled:opacity-50">
                {formStatus === "sending" ? "Sending..." : "Start Winning Contracts Now! →"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
