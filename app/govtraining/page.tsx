"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const day1Topics = [
  "FSC Codes, NSNs & How to Find Opportunities",
  "Finding & Vetting the Right Suppliers",
  "Reading RFQs, Proposals & Contract Flowdowns",
  "Competitive Bid Pricing Strategy",
];

const day2Topics = [
  "ASTM & MIL-STD-2073 Packaging Requirements",
  "Building Strong Vendor Relationships",
  "VSM, WAWF & Invoicing Submissions",
  "Full Contract Review & P.O. Creation",
];

const jumpstartWeeks = [
  { week: "Week 1", title: "FSCs & Finding the Right Vendor", desc: "Choose the correct FSC codes and source reliable vendors so your quotes stay competitive and compliant." },
  { week: "Week 2", title: "Understand & Review of RFQ", desc: "Break down each section of an RFQ, interpret requirements correctly, and avoid common mistakes." },
  { week: "Week 3", title: "Bidding on Government Contracts", desc: "Pricing strategy, delivery terms, packaging requirements, and how to submit strong quotes." },
  { week: "Week 4", title: "Q&A and Tools to Streamline", desc: "Get answers and learn the tools, shortcuts, and workflows that make contracting faster." },
];

const results = [
  { value: "100%", label: "Of trained members have won a contract within 90 days" },
  { value: "2", label: "Training Programs — In-Person & Virtual" },
  { value: "6 mo", label: "Post-Training Mentorship (MasterClass)" },
];

export default function GovTrainingPage() {
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-15 py-24 md:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#03ACED]/15 border border-[#03ACED]/40 rounded-full text-xs font-semibold text-[#03ACED] uppercase tracking-wider mb-6">
              Government Contracting Education
            </div>
            <Image
              src="/images/govtraining-logo.png"
              alt="GovTraining"
              width={300}
              height={60}
              className="h-14 w-auto brightness-0 invert mb-6"
            />
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
              Learn to <span className="text-[#03ACED]">Win Government Contracts</span> — From A to Z
            </h1>
            <p className="text-lg text-[#ccc] leading-relaxed mb-4">
              We don&apos;t just teach you <em>what</em> to do — we teach you <em>how</em>. Hands-on, practical training built from the exact system we use to win and deliver government contracts every day.
            </p>
            <p className="text-sm text-[#03ACED] font-semibold mb-8">
              100% of trained members have won a contract within the first 90 days.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#programs" className="bg-[#03ACED] text-black px-8 py-4 rounded-lg font-bold text-[15px] hover:bg-[#02a0db] transition-colors">
                See Training Programs →
              </a>
              <a href="#consult" className="bg-white/[0.06] text-white px-8 py-4 rounded-lg font-semibold text-[15px] border border-white/[0.12] hover:bg-white/10 transition-colors">
                Book a Free Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 px-6 border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8">
          {results.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#03ACED]">{s.value}</div>
              <div className="text-xs uppercase tracking-[2px] text-[#999] mt-2 max-w-[200px] mx-auto">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPETENCE CURVE */}
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            <div>
              <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
                Our Training Philosophy
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6">
                We Get You to <span className="text-[#03ACED]">Mastery</span> — Not Another Upsell
              </h2>
              <p className="text-[#bbb] leading-relaxed mb-6">
                Most people enter government contracting not knowing what they don&apos;t know. That&apos;s Stage 1. Then reality hits — the codes, the compliance, the paperwork — and confidence drops. That&apos;s the Valley of Despair.
              </p>
              <p className="text-[#bbb] leading-relaxed mb-6">
                With over 10 years of business training experience, we don&apos;t just hand you a manual and walk away. We guide you through the struggle phase with real examples, real materials, and real mentorship — until government contracting becomes second nature.
              </p>
              <p className="text-white font-semibold">
                Our goal: get you to Stage 4 — where competence and confidence meet. That&apos;s true mastery, and that&apos;s where winning contracts becomes second nature.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              {/* Custom Competence Curve SVG */}
              <svg viewBox="0 0 700 420" className="w-full" xmlns="http://www.w3.org/2000/svg">
                {/* Background */}
                <rect width="700" height="420" rx="16" fill="#111318" />

                {/* Grid lines */}
                <line x1="70" y1="50" x2="70" y2="350" stroke="#1a1f2e" strokeWidth="1" />
                <line x1="70" y1="350" x2="660" y2="350" stroke="#1a1f2e" strokeWidth="1" />
                {[100, 150, 200, 250, 300].map((y) => (
                  <line key={y} x1="70" y1={y} x2="660" y2={y} stroke="#1a1f2e" strokeWidth="0.5" strokeDasharray="4" />
                ))}

                {/* Axis labels */}
                <text x="30" y="200" fill="#666" fontSize="11" fontWeight="600" transform="rotate(-90,30,200)" textAnchor="middle" fontFamily="Inter,sans-serif">CONFIDENCE</text>
                <text x="365" y="395" fill="#666" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="Inter,sans-serif">COMPETENCY</text>

                {/* Gradient fills for phases */}
                <defs>
                  <linearGradient id="struggleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E94615" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#E94615" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="successGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#03ACED" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#03ACED" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Phase backgrounds */}
                <rect x="190" y="50" width="220" height="300" fill="url(#struggleGrad)" rx="4" />
                <rect x="410" y="50" width="250" height="300" fill="url(#successGrad)" rx="4" />

                {/* The curve */}
                <path
                  d="M 80,330 C 110,320 140,100 190,90 C 240,80 270,310 330,320 C 370,325 420,280 480,190 C 530,110 580,85 640,75"
                  fill="none"
                  stroke="#03ACED"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Stage dots */}
                <circle cx="190" cy="90" r="7" fill="#E94615" />
                <circle cx="330" cy="320" r="7" fill="#E94615" />
                <circle cx="480" cy="190" r="7" fill="#03ACED" />
                <circle cx="640" cy="75" r="7" fill="#22c55e" />

                {/* Stage labels */}
                {/* Stage 1 */}
                <rect x="148" y="58" width="22" height="22" rx="4" fill="#E94615" />
                <text x="159" y="74" fill="white" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">1</text>
                <text x="178" y="68" fill="#ccc" fontSize="11" fontWeight="600" fontFamily="Inter,sans-serif">You don&apos;t know</text>
                <text x="178" y="82" fill="#999" fontSize="10" fontFamily="Inter,sans-serif">what you don&apos;t know</text>

                {/* Valley of Despair */}
                <text x="330" y="348" fill="#E94615" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">Valley of Despair</text>

                {/* Stage 2 */}
                <rect x="255" y="278" width="22" height="22" rx="4" fill="#E94615" />
                <text x="266" y="294" fill="white" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">2</text>
                <text x="285" y="290" fill="#ccc" fontSize="11" fontWeight="600" fontFamily="Inter,sans-serif">Reality hits</text>

                {/* Phase of Struggle label */}
                <text x="300" y="250" fill="#E94615" fontSize="14" fontWeight="800" textAnchor="middle" fontFamily="Inter,sans-serif" opacity="0.5">PHASE OF STRUGGLE</text>

                {/* Stage 3 */}
                <rect x="452" y="160" width="22" height="22" rx="4" fill="#03ACED" />
                <text x="463" y="176" fill="white" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">3</text>
                <text x="483" y="158" fill="#ccc" fontSize="11" fontWeight="600" fontFamily="Inter,sans-serif">Building</text>
                <text x="483" y="172" fill="#999" fontSize="10" fontFamily="Inter,sans-serif">confidence</text>

                {/* Stage 4 */}
                <rect x="610" y="48" width="22" height="22" rx="4" fill="#22c55e" />
                <text x="621" y="64" fill="white" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">4</text>
                <text x="595" y="43" fill="#22c55e" fontSize="11" fontWeight="700" fontFamily="Inter,sans-serif">True Mastery</text>
                <text x="595" y="31" fill="#22c55e" fontSize="10" fontFamily="Inter,sans-serif">Competence + Confidence</text>

                {/* GovTraining gets you here - prominent */}
                <rect x="385" y="285" width="250" height="40" rx="8" fill="#03ACED" fillOpacity="0.15" stroke="#03ACED" strokeWidth="1.5" />
                <text x="510" y="305" fill="#03ACED" fontSize="13" fontWeight="800" textAnchor="middle" fontFamily="Inter,sans-serif">GOVTRAINING GETS YOU HERE</text>
                <text x="510" y="319" fill="#03ACED" fontSize="10" fontWeight="500" textAnchor="middle" fontFamily="Inter,sans-serif" opacity="0.7">From Stage 1 → Stage 4</text>
                {/* Arrow from label to stage 4 */}
                <path d="M 560,285 C 580,260 610,200 630,120" fill="none" stroke="#03ACED" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#arrowhead)" />
                <defs>
                  <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#03ACED" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* TWO PROGRAMS SIDE BY SIDE */}
      <section id="programs" className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Choose Your Path
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-16">
            Two Programs. One Mission: You Win.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* MASTERCLASS */}
            <div className="bg-gradient-to-br from-[#03ACED]/10 via-[#03ACED]/5 to-transparent border border-[#03ACED]/30 rounded-3xl p-10 relative overflow-hidden">
              <span className="absolute top-6 right-6 text-[10px] uppercase tracking-wider bg-[#03ACED] text-black font-bold px-3 py-1 rounded-full">
                Flagship
              </span>
              <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-3">
                In-Person Training
              </div>
              <h3 className="text-3xl font-black mb-2">MasterClass</h3>
              <div className="mb-6">
                <span className="text-3xl sm:text-4xl font-black text-[#03ACED]">$4,000</span>
                <span className="text-sm text-[#999] ml-2">+ $1,000 travel fee outside LA</span>
              </div>
              <p className="text-sm text-[#bbb] leading-relaxed mb-6">
                Two full days, face-to-face. We walk you through bidding, packaging, compliance, vendor traceability, quality requirements, and real DLA workflows using real parts, real materials, and real examples.
              </p>
              <div className="space-y-2 mb-8">
                {["2 consecutive days, in-person", "Real materials and live demonstrations", "6 months post-training mentorship", "1 month free GovScraper access", "Held at WeWork/Regus — we come to your city"].map((f) => (
                  <div key={f} className="flex items-center gap-3 text-sm text-[#ccc]">
                    <span className="text-[#03ACED]">✓</span> {f}
                  </div>
                ))}
              </div>
              <Link href="/masterclass" className="block text-center bg-[#03ACED] text-black py-3 rounded-lg font-semibold text-sm hover:bg-[#02a0db] transition-colors">
                Learn More About MasterClass →
              </Link>
            </div>

            {/* JUMPSTART */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-10 relative overflow-hidden">
              <span className="absolute top-6 right-6 text-[10px] uppercase tracking-wider bg-white/10 text-white font-bold px-3 py-1 rounded-full">
                Virtual
              </span>
              <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-3">
                Virtual Training
              </div>
              <h3 className="text-3xl font-black mb-2">Jumpstart!</h3>
              <div className="mb-6">
                <span className="text-3xl sm:text-4xl font-black text-[#03ACED]">$500</span>
                <span className="text-sm text-[#999] ml-2">4 weeks via Zoom</span>
              </div>
              <p className="text-sm text-[#bbb] leading-relaxed mb-6">
                A focused, four-week program that gives you the fundamentals. How to read RFQs, how to quote, how packaging works, how delivery works, and how to avoid costly mistakes new contractors make.
              </p>
              <div className="space-y-2 mb-8">
                {["1 hour per week, 4 weeks", "Groups of 5 max — personal attention", "2 weeks free GovScraper access", "Practical and built for busy people", "Start bidding with clarity and confidence"].map((f) => (
                  <div key={f} className="flex items-center gap-3 text-sm text-[#ccc]">
                    <span className="text-[#03ACED]">✓</span> {f}
                  </div>
                ))}
              </div>
              <Link href="/jumpstart" className="block text-center bg-white/10 text-white py-3 rounded-lg font-semibold text-sm border border-white/[0.12] hover:bg-white/15 transition-colors">
                Learn More About Jumpstart! →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL LEARN - MASTERCLASS TOPICS */}
      <section className="py-16 md:py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            MasterClass Curriculum
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            What the MasterClass Covers
          </h2>
          <p className="text-[#bbb] mb-12 max-w-2xl">
            Everything you need to confidently bid, win, and deliver government contracts — taught through real-world examples and hands-on exercises.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Day 1 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#03ACED] text-black text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">Day 1</span>
                <span className="text-sm text-[#999]">Procurement Foundation</span>
              </div>
              <div className="space-y-3">
                {day1Topics.map((topic, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-[#03ACED]/30 transition-colors">
                    <span className="text-[#03ACED] font-bold text-lg min-w-[32px]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm text-[#ccc]">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Day 2 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-white/10 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/[0.12]">Day 2</span>
                <span className="text-sm text-[#999]">Advanced Techniques</span>
              </div>
              <div className="space-y-3">
                {day2Topics.map((topic, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-[#03ACED]/30 transition-colors">
                    <span className="text-[#03ACED] font-bold text-lg min-w-[32px]">{String(i + 5).padStart(2, "0")}</span>
                    <span className="text-sm text-[#ccc]">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JUMPSTART WEEK BY WEEK */}
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Jumpstart Curriculum
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-16">
            4 Weeks to Your First Bid
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jumpstartWeeks.map((w) => (
              <div
                key={w.week}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-[#03ACED]/30 transition-colors"
              >
                <div className="text-[#03ACED] text-sm font-bold uppercase tracking-wider mb-3">{w.week}</div>
                <h3 className="text-lg font-bold mb-3">{w.title}</h3>
                <p className="text-sm text-[#bbb] leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-16 md:py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
              Compare Programs
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Which One Is Right For You?
            </h2>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-3 border-b border-white/[0.06]">
              <div className="p-6"></div>
              <div className="p-6 text-center bg-[#03ACED]/[0.06] border-x border-white/[0.06] relative">
                <div className="absolute -top-0 left-1/2 -translate-x-1/2">
                  <span className="bg-[#03ACED] text-black text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-b-lg">Recommended</span>
                </div>
                <h3 className="text-xl font-black mt-3">MasterClass</h3>
                <div className="text-3xl font-black text-[#03ACED] mt-1">$4,000</div>
                <p className="text-[10px] text-[#999] mt-1">+ $1,000 travel outside LA</p>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-black mt-3">Jumpstart!</h3>
                <div className="text-3xl font-black text-[#03ACED] mt-1">$500</div>
                <p className="text-[10px] text-[#999] mt-1">4 weeks via Zoom</p>
              </div>
            </div>
            {/* Feature rows */}
            {[
              ["Format", "2-day in-person", "Virtual (Zoom)"],
              ["Group Size", "Private — just you", "Max 5 people"],
              ["Duration", "2 consecutive days", "1 hr/week × 4 weeks"],
              ["Mentorship", "6 months included", "—"],
              ["GovScraper Access", "1 month free", "2 weeks free"],
              ["Materials", "Hands-on with real parts", "Virtual demos"],
              ["Location", "We come to your city", "Your laptop"],
              ["Best For", "Ready to master it all", "Getting started fast"],
            ].map(([label, mc, js], i) => (
              <div key={i} className="grid grid-cols-3 border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02] transition-colors">
                <div className="px-6 py-4 flex items-center text-sm text-[#999] font-medium">{label}</div>
                <div className="px-6 py-4 flex items-center justify-center text-sm text-white font-medium bg-[#03ACED]/[0.03] border-x border-white/[0.04]">{mc}</div>
                <div className={`px-6 py-4 flex items-center justify-center text-sm ${js === "—" ? "text-[#444]" : "text-[#ccc]"}`}>{js}</div>
              </div>
            ))}
            {/* CTA row */}
            <div className="grid grid-cols-3 border-t border-white/[0.06]">
              <div className="p-6"></div>
              <div className="p-6 bg-[#03ACED]/[0.06] border-x border-white/[0.06]">
                <Link href="/masterclass" className="block text-center bg-[#03ACED] text-black py-3 rounded-lg font-semibold text-sm hover:bg-[#02a0db] transition-colors">
                  Learn More →
                </Link>
              </div>
              <div className="p-6">
                <Link href="/jumpstart" className="block text-center bg-white/10 text-white py-3 rounded-lg font-semibold text-sm border border-white/[0.12] hover:bg-white/15 transition-colors">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONSULTATION FORM */}
      <section id="consult" className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
              Not Sure Which Program?
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Book a Free Consultation
            </h2>
            <p className="text-[#bbb]">
              Talk with our team to find the right training path for where you are in government contracting.
            </p>
          </div>
          <ConsultForm />
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

function ConsultForm() {
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
          topic: "GovTraining - Consultation Request",
          message: `Training consultation request.\nInterested in: ${data.get("program") || "Not specified"}\nExperience: ${data.get("experience") || "Not specified"}\nMessage: ${data.get("message") || "None"}`,
          source: "GovTraining Consultation Form",
        }),
      });
      if (res.ok) { setStatus("sent"); form.reset(); } else { setStatus("error"); }
    } catch { setStatus("error"); }
  }

  if (status === "sent") {
    return (
      <div className="bg-white/[0.03] border border-[#03ACED]/30 rounded-2xl p-12 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-2xl font-bold mb-2">Consultation Request Received!</h3>
        <p className="text-[#bbb] mb-6">Want to schedule your call right now?</p>
        <a
          href="https://www.calendly.com/mendsourcing/govtraining"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#03ACED] text-black px-8 py-4 rounded-lg font-bold text-[15px] hover:bg-[#02a0db] transition-colors inline-flex items-center gap-2"
        >
          Schedule My Consultation →
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
          <input name="phone" type="tel" maxLength={14} className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors" placeholder="(555) 000-0000"
            onInput={(e) => { const input = e.currentTarget; let v = input.value.replace(/\D/g, "").slice(0, 10); if (v.length >= 7) v = `(${v.slice(0,3)}) ${v.slice(3,6)}-${v.slice(6)}`; else if (v.length >= 4) v = `(${v.slice(0,3)}) ${v.slice(3)}`; else if (v.length >= 1) v = `(${v}`; input.value = v; }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-medium text-[#bbb] mb-2">Company *</label>
          <input name="company" required className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors" placeholder="Company Name" />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#bbb] mb-2">Interested In</label>
          <select name="program" className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors">
            <option value="" className="bg-[#111]">Select a program...</option>
            <option value="MasterClass ($4,000)" className="bg-[#111]">MasterClass — $4,000 (In-Person)</option>
            <option value="Jumpstart ($500)" className="bg-[#111]">Jumpstart! — $500 (Virtual)</option>
            <option value="Not sure yet" className="bg-[#111]">Not sure yet — help me decide</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium text-[#bbb] mb-2">Government Contracting Experience</label>
        <select name="experience" className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors">
          <option value="" className="bg-[#111]">Select...</option>
          <option value="Brand new" className="bg-[#111]">Brand new — never done government contracting</option>
          <option value="Some experience" className="bg-[#111]">Some experience — a few bids or contracts</option>
          <option value="Experienced" className="bg-[#111]">Experienced — active contractor looking to improve</option>
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-xs font-medium text-[#bbb] mb-2">Anything else we should know?</label>
        <textarea name="message" rows={3} className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors resize-none" placeholder="Tell us about your goals..." />
      </div>
      <button type="submit" disabled={status === "sending"} className="w-full py-4 bg-[#03ACED] text-black font-bold text-sm rounded-lg hover:bg-[#02a0db] transition-colors disabled:opacity-50">
        {status === "sending" ? "Sending..." : "Book My Free Consultation →"}
      </button>
      {status === "error" && <p className="text-red-400 text-sm mt-3 text-center">Something went wrong. Email us at sales@mendsourcing.com</p>}
    </form>
  );
}
