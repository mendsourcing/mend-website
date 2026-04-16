"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const weeks = [
  { week: "Week 1", title: "FSCs & Finding the Right Vendor", desc: "Choose the correct FSC codes and source reliable vendors so your quotes stay competitive and compliant." },
  { week: "Week 2", title: "Understand & Review of RFQ", desc: "Break down each section of an RFQ, interpret requirements correctly, and avoid common mistakes new contractors make." },
  { week: "Week 3", title: "Bidding on Government Contracts", desc: "Pricing strategy, delivery terms, packaging requirements, and how to submit strong quotes that win." },
  { week: "Week 4", title: "Q&A and Tools to Streamline", desc: "Get answers and learn the tools, shortcuts, and workflows that make government contracting faster and easier." },
];

const includes = [
  { icon: "💻", title: "100% Virtual", desc: "Done entirely over Zoom. Join from anywhere — all you need is a laptop and internet." },
  { icon: "👥", title: "Groups of 5 Max", desc: "Small group sessions ensure you get personal attention, real interaction, and space to ask every question." },
  { icon: "🔍", title: "2 Weeks GovScraper", desc: "Free access to our RFQ platform so you can start sourcing opportunities during training." },
  { icon: "📅", title: "1 Hour Per Week", desc: "Focused sessions that teach the essentials without overwhelming you. Built for busy people." },
  { icon: "🎯", title: "Practical & Actionable", desc: "No theory dumps. Every session is built around real examples you can apply immediately." },
  { icon: "📋", title: "Start Bidding Fast", desc: "By Week 4, you'll have the knowledge and tools to submit your first competitive bid." },
];

export default function JumpstartPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-[72px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=1920&q=80&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-15 py-24 md:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#03ACED]/15 border border-[#03ACED]/40 rounded-full text-xs font-semibold text-[#03ACED] uppercase tracking-wider mb-6">
              Virtual Training Program
            </div>
            <Image
              src="/images/govtraining-logo.png"
              alt="GovTraining"
              width={200}
              height={40}
              className="h-10 w-auto brightness-0 invert mb-4"
            />
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
              <span className="text-[#03ACED]">Jumpstart!</span>
            </h1>
            <p className="text-lg text-[#ccc] leading-relaxed mb-4 max-w-xl">
              A focused, four-week virtual program that gives you the fundamentals of government contracting. Learn to read RFQs, find vendors, price bids, and avoid the costly mistakes that trip up new contractors.
            </p>
            <p className="text-sm text-[#03ACED] font-semibold mb-8">
              4 weeks. 1 hour per week. Everything you need to submit your first bid with confidence.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <a href="#enroll" className="bg-[#03ACED] text-black px-8 py-4 rounded-lg font-bold text-[15px] hover:bg-[#02a0db] transition-colors">
                Enroll Now — $500 →
              </a>
              <Link href="/govtraining#programs" className="bg-white/[0.06] text-white px-8 py-4 rounded-lg font-semibold text-[15px] border border-white/[0.12] hover:bg-white/10 transition-colors">
                Compare Programs
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <div className="text-3xl font-black text-[#03ACED]">$500</div>
                <div className="text-xs text-[#999]">Per person</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-3xl font-black text-white">4 Weeks</div>
                <div className="text-xs text-[#999]">Via Zoom, 1 hr/week</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-3xl font-black text-white">Max 5</div>
                <div className="text-xs text-[#999]">Per cohort</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            What&apos;s Included
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-16">
            Built for Busy People
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

      {/* WEEK BY WEEK */}
      <section className="py-16 md:py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            4-Week Curriculum
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            From Zero to First Bid
          </h2>
          <p className="text-[#bbb] mb-16 max-w-2xl">
            Each week builds on the last. By the end, you&apos;ll have everything you need to confidently enter the government contracting space.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {weeks.map((w, i) => (
              <div key={w.week} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-[#03ACED]/30 transition-colors relative">
                <div className="absolute top-4 right-4">
                  <span className="bg-[#03ACED]/10 text-[#03ACED] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {w.week}
                  </span>
                </div>
                <div className="text-[#03ACED] text-3xl sm:text-4xl font-black opacity-20 mb-4">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="text-lg font-bold mb-3">{w.title}</h3>
                <p className="text-sm text-[#bbb] leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING CTA */}
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#03ACED]/15 via-[#03ACED]/5 to-transparent border border-[#03ACED]/30 rounded-3xl p-12 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-black mb-4">Ready to Get Started?</h2>
                <div className="mb-6">
                  <span className="text-5xl font-black text-[#03ACED]">$500</span>
                  <p className="text-sm text-[#999] mt-1">Per person — everything included</p>
                </div>
                <ul className="space-y-2 mb-6">
                  {["4 weekly sessions, 1 hour each", "Groups of 5 max", "2 weeks free GovScraper access", "Practical and actionable content", "Start bidding with confidence"].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-[#ccc]">
                      <span className="text-[#03ACED]">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center">
                <a href="#enroll" className="bg-[#03ACED] text-black px-10 py-4 rounded-lg font-bold text-base hover:bg-[#02a0db] transition-colors inline-flex items-center gap-2">
                  Enroll Now →
                </a>
                <p className="text-xs text-[#999] mt-4">Next cohort starts soon — limited to 5 spots.</p>
                <div className="mt-6">
                  <Link href="/masterclass" className="text-[#03ACED] text-sm font-semibold hover:underline">
                    Want deeper training? Check out MasterClass ($4,000) →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENROLLMENT FORM */}
      <section id="enroll" className="py-16 md:py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
              Enroll Now
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Join the Next Jumpstart! Cohort
            </h2>
            <p className="text-[#bbb]">
              Fill out the form below and pay $500 to secure your spot. We&apos;ll reach out to coordinate your cohort dates.
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

interface Cohort {
  id: number;
  title: string;
  start_date: string;
  end_date: string | null;
  max_seats: number;
  seats_taken: number;
  price: number;
  status: string;
}

function EnrollForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [selectedCohort, setSelectedCohort] = useState("");

  useState(() => {
    // Pull all open + visible cohorts. Full ones stay in the list but render
    // as a disabled "Fully Booked" option (instead of being hidden), so
    // visitors can see upcoming dates that will open up later.
    fetch(`${process.env.NEXT_PUBLIC_CRM_URL || "https://services.mendsourcing.com"}/api/training-cohorts?status=open&program=jumpstart`)
      .then((r) => r.json())
      .then((data) => setCohorts(Array.isArray(data) ? data : []))
      .catch(() => {});
  });

  function formatCohortDate(d: string) {
    // Parse as local calendar date — not UTC midnight — so PST viewers don't
    // see the previous day.
    const dateOnly = typeof d === "string" ? d.split("T")[0] : d;
    const [y, m, day] = String(dateOnly).split("-").map(Number);
    const dt = new Date(y, (m || 1) - 1, day || 1);
    return dt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    const cohort = cohorts.find((c) => c.id.toString() === selectedCohort);

    try {
      const res = await fetch("/api/jumpstart-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone"),
          company: data.get("company"),
          preferredDates: cohort ? `${cohort.title} — Starting ${formatCohortDate(cohort.start_date)}` : (data.get("dates") || "Next available cohort"),
          cohortId: selectedCohort || null,
          message: data.get("message") || "",
        }),
      });
      const result = await res.json();
      if (result.url) {
        window.location.href = result.url;
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
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
          <input name="phone" type="tel" maxLength={14} className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors" placeholder="(555) 000-0000"
            onInput={(e) => { const input = e.currentTarget; let v = input.value.replace(/\D/g, "").slice(0, 10); if (v.length >= 7) v = `(${v.slice(0,3)}) ${v.slice(3,6)}-${v.slice(6)}`; else if (v.length >= 4) v = `(${v.slice(0,3)}) ${v.slice(3)}`; else if (v.length >= 1) v = `(${v}`; input.value = v; }}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium text-[#bbb] mb-2">Company *</label>
        <input name="company" required className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors" placeholder="Company Name" />
      </div>

      {/* Cohort Selection */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-[#bbb] mb-2">Select Your Cohort *</label>
        {cohorts.length > 0 ? (
          <select
            value={selectedCohort}
            onChange={(e) => setSelectedCohort(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors"
          >
            <option value="" className="bg-[#111]">Choose a start date...</option>
            {cohorts.map((c) => {
              const isFull = c.seats_taken >= c.max_seats;
              const label = isFull
                ? `${c.title} — Starts ${formatCohortDate(c.start_date)} — Fully Booked`
                : `${c.title} — Starts ${formatCohortDate(c.start_date)}`;
              return (
                <option
                  key={c.id}
                  value={c.id}
                  disabled={isFull}
                  className="bg-[#111]"
                  style={isFull ? { color: "#666" } : undefined}
                >
                  {label}
                </option>
              );
            })}
          </select>
        ) : (
          <div>
            <p className="text-xs text-[#999] mb-2">No upcoming cohorts scheduled yet. Enter your preferred start date and we&apos;ll coordinate with you.</p>
            <input name="dates" className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors" placeholder="e.g. First week of May, or 'next available'" />
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-xs font-medium text-[#bbb] mb-2">Anything else?</label>
        <textarea name="message" rows={3} className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors resize-none" placeholder="Tell us about your experience level or goals..." />
      </div>

      {/* Payment Summary */}
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-[#bbb]">GovTraining Jumpstart! — Per Person</span>
          <span className="text-lg text-[#03ACED] font-bold">$500</span>
        </div>
        <p className="text-[10px] text-[#999] mt-2">4 weekly sessions via Zoom. Groups of 5 max. Includes 2 weeks free GovScraper access.</p>
      </div>

      <button type="submit" disabled={status === "sending"} className="w-full py-4 bg-[#03ACED] text-black font-bold text-sm rounded-lg hover:bg-[#02a0db] transition-colors disabled:opacity-50">
        {status === "sending" ? "Redirecting to payment..." : "Pay $500 & Enroll →"}
      </button>
      {status === "error" && <p className="text-red-400 text-sm mt-3 text-center">Something went wrong. Email us at sales@mendsourcing.com</p>}
    </form>
  );
}
