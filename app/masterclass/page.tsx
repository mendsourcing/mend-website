"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const day1Topics = [
  { title: "FSC Codes, NSNs & How to Find Opportunities", desc: "Understand how Federal Supply Classes and National Stock Numbers work, and learn to identify the right opportunities for your business." },
  { title: "Finding & Vetting the Right Suppliers", desc: "How to source reliable vendors, evaluate pricing, and build a network of manufacturers you can count on." },
  { title: "Reading RFQs, Proposals & Contract Flowdowns", desc: "Break down every section of an RFQ, interpret requirements correctly, and understand what the government is really asking for." },
  { title: "Competitive Bid Pricing Strategy", desc: "Use our pricing methodology to submit bids that are competitive enough to win — without leaving money on the table." },
];

const day2Topics = [
  { title: "ASTM & MIL-STD-2073 Packaging Requirements", desc: "Hands-on with real materials. Learn how to decode packing codes and package items to exact government specifications." },
  { title: "Building Strong Vendor Relationships", desc: "The single hardest part of government contracting. We teach you how to approach, negotiate, and maintain long-term supplier partnerships." },
  { title: "VSM, WAWF & Invoicing Submissions", desc: "Walk through the entire delivery and payment process — from Vendor Shipment Module entries to Wide Area Workflow submissions." },
  { title: "Full Contract Review & P.O. Creation", desc: "End-to-end contract walkthrough. Create purchase orders, manage flowdowns, and handle every document the government requires." },
];

const includes = [
  { icon: "🏢", title: "Always In Person", desc: "Never over Zoom. Two full days, face-to-face, with real parts and real packaging materials." },
  { icon: "🤝", title: "6 Months Mentorship", desc: "We don't disappear after training. You get 6 months of ongoing support for questions, contract reviews, and guidance." },
  { icon: "🔍", title: "1 Month GovScraper", desc: "Free access to our RFQ scraping platform so you can start finding and bidding on contracts immediately." },
  { icon: "📍", title: "We Come To You", desc: "Training held at a local WeWork or Regus in your city. Or join us in Los Angeles at no additional travel cost." },
  { icon: "📦", title: "Real Materials", desc: "Work with actual packaging materials, labels, and parts. Not slides — real hands-on exercises." },
  { icon: "📋", title: "Complete Toolkit", desc: "Leave with our bid pricing tool, contract templates, packaging checklists, and a repeatable system you can use immediately." },
];

export default function MasterClassPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-[72px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-15 py-24 md:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#03ACED]/15 border border-[#03ACED]/40 rounded-full text-xs font-semibold text-[#03ACED] uppercase tracking-wider mb-6">
              Flagship In-Person Training
            </div>
            <Image
              src="/images/govtraining-logo.png"
              alt="GovTraining"
              width={200}
              height={40}
              className="h-10 w-auto brightness-0 invert mb-4"
            />
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
              <span className="text-[#03ACED]">MasterClass</span>
            </h1>
            <p className="text-lg text-[#ccc] leading-relaxed mb-4 max-w-xl">
              Two full days. Face-to-face. We sit with you and walk through every step of government contracting — bidding, packaging, compliance, vendor relationships, and real DLA workflows — using real parts, real materials, and real examples.
            </p>
            <p className="text-sm text-[#03ACED] font-semibold mb-8">
              You leave with total confidence, a repeatable process, and the ability to win and deliver contracts correctly the first time.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <a href="#enroll" className="bg-[#03ACED] text-black px-8 py-4 rounded-lg font-bold text-[15px] hover:bg-[#02a0db] transition-colors">
                RSVP Your Spot →
              </a>
              <Link href="/govtraining#programs" className="bg-white/[0.06] text-white px-8 py-4 rounded-lg font-semibold text-[15px] border border-white/[0.12] hover:bg-white/10 transition-colors">
                Compare Programs
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <div className="text-3xl font-black text-[#03ACED]">$4,000</div>
                <div className="text-xs text-[#999]">+ $1,000 travel outside LA</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-3xl font-black text-white">2 Days</div>
                <div className="text-xs text-[#999]">In-person, in your city</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            What&apos;s Included
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-16">
            More Than Just Training
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {includes.map((item) => (
              <div key={item.title} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-[#03ACED]/30 transition-colors">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-[#bbb] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DAY 1 & DAY 2 CURRICULUM */}
      <section className="py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Two-Day Curriculum
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">
            What You&apos;ll Master
          </h2>
          <p className="text-[#bbb] mb-16 max-w-2xl">
            Every topic is taught through real-world examples and hands-on exercises — not slides and theory.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Day 1 */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-[#03ACED] text-black text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg">Day 1</span>
                <span className="text-sm text-[#bbb] font-medium">Procurement Foundation</span>
              </div>
              <div className="space-y-4">
                {day1Topics.map((topic, i) => (
                  <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 hover:border-[#03ACED]/30 transition-colors">
                    <div className="flex items-start gap-4">
                      <span className="text-[#03ACED] font-black text-lg min-w-[32px]">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h4 className="text-[15px] font-bold mb-1">{topic.title}</h4>
                        <p className="text-sm text-[#bbb] leading-relaxed">{topic.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Day 2 */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-white/10 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg border border-white/[0.12]">Day 2</span>
                <span className="text-sm text-[#bbb] font-medium">Advanced Techniques</span>
              </div>
              <div className="space-y-4">
                {day2Topics.map((topic, i) => (
                  <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 hover:border-[#03ACED]/30 transition-colors">
                    <div className="flex items-start gap-4">
                      <span className="text-[#03ACED] font-black text-lg min-w-[32px]">{String(i + 5).padStart(2, "0")}</span>
                      <div>
                        <h4 className="text-[15px] font-bold mb-1">{topic.title}</h4>
                        <p className="text-sm text-[#bbb] leading-relaxed">{topic.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            How It Works
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-16">
            4 Simple Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Pick Your Dates", desc: "Choose 2 consecutive days that work for you. We'll book a professional space in your city." },
              { num: "02", title: "Day 1 — Foundation", desc: "FSC codes, suppliers, RFQs, pricing strategy — the full procurement pipeline from start to finish." },
              { num: "03", title: "Day 2 — Advanced", desc: "Packaging, vendor relationships, WAWF, invoicing, contract review — everything to deliver and get paid." },
              { num: "04", title: "6 Months Mentorship", desc: "Training doesn't end on Day 2. We're with you for 6 months — questions, reviews, and guidance." },
            ].map((step) => (
              <div key={step.num} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-[#03ACED]/30 transition-colors">
                <div className="text-[#03ACED] text-4xl font-black opacity-20 mb-4">{step.num}</div>
                <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-[#bbb] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING CTA */}
      <section className="py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#03ACED]/15 via-[#03ACED]/5 to-transparent border border-[#03ACED]/30 rounded-3xl p-12 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-black mb-4">Ready to Master Government Contracting?</h2>
                <div className="mb-6">
                  <span className="text-5xl font-black text-[#03ACED]">$4,000</span>
                  <p className="text-sm text-[#999] mt-1">Los Angeles, CA — no travel fee</p>
                  <p className="text-sm text-[#999]">+ $1,000 if we travel to your city within the USA</p>
                </div>
                <ul className="space-y-2 mb-6">
                  {["2 full days, in-person", "6 months mentorship", "1 month free GovScraper", "Complete toolkit & templates", "100% of members win within 90 days"].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-[#ccc]">
                      <span className="text-[#03ACED]">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center">
                <a href="#enroll" className="bg-[#03ACED] text-black px-10 py-4 rounded-lg font-bold text-base hover:bg-[#02a0db] transition-colors inline-flex items-center gap-2">
                  RSVP Your Spot Today →
                </a>
                <p className="text-xs text-[#999] mt-4">Limited availability — we only train one client at a time.</p>
                <div className="mt-6">
                  <Link href="/jumpstart" className="text-[#03ACED] text-sm font-semibold hover:underline">
                    Not ready? Check out Jumpstart! ($500) →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENROLLMENT FORM */}
      <section id="enroll" className="py-24 px-6 md:px-15">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
              Enroll Now
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">
              RSVP Your MasterClass Spot
            </h2>
            <p className="text-[#bbb]">
              Fill out the form below and we&apos;ll reach out to confirm your dates and location.
            </p>
          </div>
          <EnrollForm />
        </div>
      </section>

      {/* BACK */}
      <section className="py-16 px-6 text-center">
        <Link href="/govtraining" className="text-[#03ACED] text-sm font-semibold hover:underline">
          ← Back to All Training Programs
        </Link>
      </section>
    </>
  );
}

function EnrollForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [locationChoice, setLocationChoice] = useState<"la" | "come_to_me">("la");

  const totalCost = locationChoice === "come_to_me" ? 5000 : 4000;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/masterclass-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone"),
          company: data.get("company"),
          location: locationChoice,
          preferredDates: data.get("dates") || "TBD",
          message: data.get("message") || "",
        }),
      });
      const result = await res.json();
      if (result.url) {
        window.location.href = result.url; // Redirect to Stripe Checkout
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 md:p-12">
      {/* Location Choice */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-[#bbb] mb-3">Training Location *</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setLocationChoice("la")}
            className={`p-4 rounded-xl border text-left transition-all ${
              locationChoice === "la"
                ? "border-[#03ACED] bg-[#03ACED]/10"
                : "border-white/10 bg-white/[0.02] hover:border-white/20"
            }`}
          >
            <div className="text-sm font-bold text-white">I&apos;ll come to Los Angeles</div>
            <div className="text-xs text-[#999] mt-1">$4,000 total — no travel fee</div>
          </button>
          <button
            type="button"
            onClick={() => setLocationChoice("come_to_me")}
            className={`p-4 rounded-xl border text-left transition-all ${
              locationChoice === "come_to_me"
                ? "border-[#03ACED] bg-[#03ACED]/10"
                : "border-white/10 bg-white/[0.02] hover:border-white/20"
            }`}
          >
            <div className="text-sm font-bold text-white">Come to my city</div>
            <div className="text-xs text-[#999] mt-1">$5,000 total — includes $1,000 travel</div>
          </button>
        </div>
      </div>

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
          <input name="phone" type="tel" maxLength={14} className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors" placeholder="(555) 000-0000"
            onInput={(e) => { const input = e.currentTarget; let v = input.value.replace(/\D/g, "").slice(0, 10); if (v.length >= 7) v = `(${v.slice(0,3)}) ${v.slice(3,6)}-${v.slice(6)}`; else if (v.length >= 4) v = `(${v.slice(0,3)}) ${v.slice(3)}`; else if (v.length >= 1) v = `(${v}`; input.value = v; }}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium text-[#bbb] mb-2">Company *</label>
        <input name="company" required className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors" placeholder="Company Name" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-medium text-[#bbb] mb-2">Preferred Dates</label>
          <input name="dates" className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors" placeholder="e.g. First week of May" />
        </div>
        {locationChoice === "come_to_me" && (
          <div>
            <label className="block text-xs font-medium text-[#bbb] mb-2">Your City</label>
            <input name="city" className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors" placeholder="e.g. Dallas, TX" />
          </div>
        )}
      </div>
      <div className="mb-6">
        <label className="block text-xs font-medium text-[#bbb] mb-2">Anything else?</label>
        <textarea name="message" rows={3} className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors resize-none" placeholder="Tell us about your experience level or any specific topics you want to focus on..." />
      </div>

      {/* Deposit Summary */}
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-[#bbb]">MasterClass Total</span>
          <span className="text-sm text-white font-bold">${totalCost.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-[#bbb]">Non-refundable deposit (due now)</span>
          <span className="text-sm text-[#03ACED] font-bold">$500</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-white/[0.06]">
          <span className="text-sm text-[#bbb]">Remaining (cash, check, or ACH before start)</span>
          <span className="text-sm text-white font-bold">${(totalCost - 500).toLocaleString()}</span>
        </div>
        <p className="text-[10px] text-[#999] mt-3">Minimum 4 weeks lead time required. Deposit is non-refundable.</p>
      </div>

      <button type="submit" disabled={status === "sending"} className="w-full py-4 bg-[#03ACED] text-black font-bold text-sm rounded-lg hover:bg-[#02a0db] transition-colors disabled:opacity-50">
        {status === "sending" ? "Redirecting to payment..." : `Pay $500 Deposit & Enroll →`}
      </button>
      {status === "error" && <p className="text-red-400 text-sm mt-3 text-center">Something went wrong. Email us at sales@mendsourcing.com</p>}
    </form>
  );
}
