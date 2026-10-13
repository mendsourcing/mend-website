"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import AnimatedNumber from "@/components/AnimatedNumber";
import TurnstileWidget from "@/components/TurnstileWidget";

// Everything on this page is what happens AFTER a supplier wins. MeND does
// not bid on anyone's behalf — that line is repeated on purpose.

const handled = [
  {
    icon: "🧾",
    title: "WAWF Receiving Reports & Invoices",
    desc: "We complete your PIEE items, the receiving report and invoice (Combo or 2-in-1), submitted correctly the first time so DFAS pays on schedule. Rejections get reworked within one business day.",
  },
  {
    icon: "📬",
    title: "Post-Award Requests",
    desc: "Delivery-date extensions, administrative modifications, cancellations and clarifications. Filed when needed and tracked until answered, so a slipped date never becomes a delinquency.",
  },
  {
    icon: "📋",
    title: "Contract Review & Pressing Issues",
    desc: "Every award is read the day it lands: packaging and marking, QAP, first article or production lot testing, IUID, certifications, shelf life. You get a plain-English list of what's due and when.",
  },
  {
    icon: "🪪",
    title: "SAM.gov, CAGE & DIBBS",
    desc: "Registrations tracked and renewed before they expire: SAM annual renewal, reps & certs, CAGE accuracy, DIBBS account health. A lapsed SAM means you can't be paid. It doesn't lapse on our watch.",
  },
  {
    icon: "🔐",
    title: "JCP Certification (DD Form 2345)",
    desc: "Keep your Joint Certification Program status current so you never lose access to the controlled technical data in C-Folders, the drawings you need to quote and build.",
  },
  {
    icon: "📊",
    title: "Award Tracking & Status",
    desc: "Every open award in one tracker: produced, shipped, accepted, invoiced, paid, closed. Weekly status to you, monthly registration report, nothing falls through.",
  },
];

const alsoIncluded = [
  "SBA set-aside status (SDVOSB, VOSB, WOSB, 8(a), HUBZone): recertification dates and filings",
  "SPRS / NIST SP 800-171 score: validity tracking and resubmission",
  "DFAS payment follow-up and contract closeout",
  "Reps & certs refresh at SAM renewal",
];

const outcomes = [
  {
    title: "Paid Faster",
    desc: "Receiving reports and invoices that clear WAWF on the first pass. No rejection loops, no 30-day resets on your cash.",
  },
  {
    title: "Nothing Lapses",
    desc: "SAM, CAGE, DIBBS, JCP, SBA and SPRS renewed on a calendar we own, with 90/60/30-day reminders to you.",
  },
  {
    title: "Review-Ready Records",
    desc: "Every award, submission and acknowledgement filed where you, or a DCMA QAR, can find it in seconds.",
  },
  {
    title: "Your Evenings Back",
    desc: "Stop doing WAWF at 11pm. Run your shop, win the next award, and let us run the paperwork you already won.",
  },
];

const steps = [
  {
    num: "01",
    title: "Post-Award Review",
    desc: "A 30-minute call. We look at your open awards, your registrations, and who's doing the admin today, then scope the account.",
  },
  {
    num: "02",
    title: "Onboarding",
    desc: "We get set up inside your PIEE/WAWF (under your GAM), DIBBS and SAM.gov, confirm JCP and SBA status, and load every open award into the tracker.",
  },
  {
    num: "03",
    title: "We Run Every Award",
    desc: "Contract review, receiving reports, invoices, post-award requests, payment follow-up and closeout, on every award you win.",
  },
  {
    num: "04",
    title: "Monthly Status & Renewals",
    desc: "A monthly registrations report, renewals filed early, and a standing tracker you can open any time.",
  },
];

const whoFor = [
  { title: "Manufacturers & OEMs", desc: "You build the part. We handle the government paperwork that gets it accepted and paid." },
  { title: "Distributors & Resellers", desc: "High award counts and thin margins mean every rejected invoice hurts. We keep the queue clean." },
  { title: "New DLA Suppliers", desc: "First few awards in hand and no idea what PIEE is. We've done this 350+ times; we'll show you once and then do it for you." },
  { title: "Owners Doing It Themselves", desc: "If you're the one logging into WAWF at night, this is the hire that pays for itself." },
];

const whyMend = [
  {
    title: "We've Done It 350+ Times, For Ourselves",
    desc: "MeND is an SDVOSB and a DLA supplier first. Every receiving report, invoice and post-award request we file for you is one we've filed on our own awards.",
  },
  {
    title: "AS9100D & ISO 9001:2015 Certified",
    desc: "Aerospace-grade quality system behind your paperwork. Records, traceability and document control are how we already operate.",
  },
  {
    title: "Packaging & Admin Under One Roof",
    desc: "GovPacking packages and labels your shipment; GovAdmin files the paperwork on it. One team, one status, no hand-offs.",
  },
  {
    title: "We Don't Bid For You",
    desc: "No pass-through, no cut of your award, no competing for your work. You win it in your name. We run what you win.",
  },
];

const faqs = [
  {
    q: "Do you bid on contracts for us?",
    a: "No. GovAdmin starts the day you win. If you want help finding and bidding opportunities, that's GovScraper and GovTraining: separate tools, your name on the bid.",
  },
  {
    q: "What do we need to give you?",
    a: "A user account for us in your PIEE/WAWF (your GAM approves it), DIBBS access, a point-of-contact role in SAM.gov, and your JCP data-custodian details. We walk you through each one during onboarding.",
  },
  {
    q: "Do you touch our money?",
    a: "Never. DFAS pays you directly to the bank account in your SAM registration. We make sure the paperwork gets it there on time.",
  },
  {
    q: "Can we use GovAdmin without GovPacking?",
    a: "Yes. GovAdmin covers the administration on every award whether you package in-house, use GovPacking, or use someone else.",
  },
  {
    q: "What about CMMC?",
    a: "CMMC Level 1 and Level 2 self-assessment prep is available as an add-on. We prepare the assessment, SSP and SPRS submission; a third-party C3PAO assessment, if you need one, is separate.",
  },
  {
    q: "How is it priced?",
    a: "Every supplier's award volume and registrations are different, so we scope each account individually after the Post-Award Review. Plans start as low as $500/month.",
  },
];

export default function GovAdminPage() {
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
                Post-Award Contract Administration
              </Reveal>
              <Reveal direction="up" delay={80}>
                <Wordmark className="text-4xl md:text-5xl mb-6" />
              </Reveal>
              <Reveal direction="up" delay={180} as="h1" className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
                You Won the Award. <span className="text-[#03ACED]">We Handle Everything After.</span>
              </Reveal>
              <Reveal direction="up" delay={260} as="p" className="text-lg text-[#bbb] leading-relaxed mb-4 max-w-2xl">
                Receiving reports, government invoices, post-award requests for modifications, SAM.gov registrations, DIBBS registrations, JCP certification renewals, SBA certification renewals, SPRS upkeep, and award tracking. All run by the SDVOSB team that has administered 350+ DLA awards of its own.
              </Reveal>
              <Reveal direction="up" delay={340} as="ul" className="space-y-2 mb-8">
                {["WAWF receiving reports & invoices filed right the first time", "Registrations that never lapse: SAM, CAGE, DIBBS, JCP, SBA, SPRS", "We don't bid for you. You win it; we run it."].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#ccc]">
                    <span className="text-[#03ACED]">✓</span> {item}
                  </li>
                ))}
              </Reveal>
              <Reveal direction="up" delay={420} className="flex flex-wrap gap-4">
                <a
                  href="#review"
                  className="group bg-[#03ACED] text-black px-8 py-4 rounded-lg font-bold text-[15px] hover:bg-[#02a0db] transition-colors inline-flex items-center gap-2"
                >
                  Book a Post-Award Review <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="#included"
                  className="bg-white/[0.06] text-white px-8 py-4 rounded-lg font-semibold text-[15px] border border-white/[0.12] hover:bg-white/10 transition-colors"
                >
                  See What&apos;s Included
                </a>
              </Reveal>
            </div>
            <Reveal direction="left" delay={200}>
              <ProofPanel />
            </Reveal>
          </div>
        </div>
      </section>

      {/* NO-BID STRIP */}
      <section className="px-6 md:px-15 -mt-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up" className="bg-[#03ACED]/[0.07] border border-[#03ACED]/30 rounded-2xl px-8 py-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="text-xs uppercase tracking-[2px] text-[#03ACED] font-bold whitespace-nowrap">The one thing we don&apos;t do</div>
            <p className="text-sm text-[#ccc] leading-relaxed">
              We don&apos;t bid for you, we don&apos;t take a percentage of your award, and we never compete for your work. Pass-through &ldquo;we&apos;ll bid as the prime&rdquo; arrangements put your revenue in someone else&apos;s name. GovAdmin keeps the award yours. We just run the paperwork.
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHAT WE HANDLE */}
      <section id="included" className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            What We Handle
          </Reveal>
          <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Everything Between &ldquo;Award&rdquo; and &ldquo;Paid&rdquo;
          </Reveal>
          <Reveal direction="up" delay={160} as="p" className="text-[#bbb] mb-16 max-w-2xl">
            Six things every DLA and DoW supplier has to get right on every award. We do all six, on every award you win.
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {handled.map((item, i) => (
              <Reveal
                key={item.title}
                direction="up"
                delay={i * 90}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-[#03ACED]/30 transition-colors"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-[#bbb] leading-relaxed">{item.desc}</p>
              </Reveal>
            ))}
          </div>
          <Reveal direction="up" delay={120} className="mt-8 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8">
            <div className="text-[11px] uppercase tracking-[2px] text-[#03ACED] font-semibold mb-4">Also included on every plan</div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {alsoIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#ccc]">
                  <span className="text-[#03ACED] mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-16 md:py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            What You Get
          </Reveal>
          <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-16">
            Clean Paperwork. Faster Cash. Fewer Surprises.
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {outcomes.map((item, i) => (
              <Reveal
                key={item.title}
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

      {/* HOW IT WORKS */}
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            How It Works
          </Reveal>
          <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-16">
            From Award Notice to Closeout
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
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

      {/* WHO IT'S FOR */}
      <section className="py-16 md:py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Who It&apos;s For
          </Reveal>
          <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-16">
            Built for Suppliers Who Win
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoFor.map((item, i) => (
              <Reveal
                key={item.title}
                direction="up"
                delay={i * 100}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-[#03ACED]/30 transition-colors"
              >
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-[#bbb] leading-relaxed">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MEND */}
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Why GovAdmin
          </Reveal>
          <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-16">
            Run by a Supplier, Not a Consultant
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyMend.map((item, i) => (
              <Reveal
                key={item.title}
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

      {/* PRICING */}
      <section className="py-16 md:py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-4xl mx-auto">
          <Reveal direction="up" className="bg-gradient-to-br from-[#03ACED]/15 via-[#03ACED]/5 to-transparent border border-[#03ACED]/30 rounded-3xl p-12 md:p-16 text-center">
            <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">Pricing</div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Ask Us About Pricing</h2>
            <p className="text-[#bbb] leading-relaxed max-w-2xl mx-auto mb-2">
              Every supplier&apos;s award volume and registrations are different, so we scope each account individually after a short Post-Award Review.
            </p>
            <p className="text-white font-semibold mb-8">Plans start as low as $500/month.</p>
            <a
              href="#review"
              className="group bg-[#03ACED] text-black px-10 py-4 rounded-lg font-bold text-base hover:bg-[#02a0db] transition-colors inline-flex items-center gap-2"
            >
              Book a Post-Award Review <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <p className="text-xs text-[#999] mt-4">30 minutes. We&apos;ll tell you exactly what we&apos;d take off your plate.</p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-4xl mx-auto">
          <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Questions
          </Reveal>
          <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-12">
            Straight Answers
          </Reveal>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <Reveal key={f.q} direction="up" delay={i * 60} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 md:p-8">
                <h3 className="text-base font-bold mb-2">{f.q}</h3>
                <p className="text-sm text-[#bbb] leading-relaxed">{f.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEW REQUEST */}
      <section id="review" className="py-16 md:py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
              Get Started
            </Reveal>
            <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Book a Post-Award Review
            </Reveal>
            <Reveal direction="up" delay={160} as="p" className="text-[#bbb]">
              Tell us a little about your awards and registrations. We&apos;ll come to the call knowing exactly what we&apos;d handle for you.
            </Reveal>
          </div>
          <ReviewForm />
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

// Text wordmark until a designed logo exists — matches the Gov___ family.
function Wordmark({ className = "" }: { className?: string }) {
  return (
    <div className={`font-black tracking-tight leading-none ${className}`} aria-label="GovAdmin">
      <span className="text-white">Gov</span>
      <span className="text-[#03ACED]">Admin</span>
    </div>
  );
}

// Live proof, same source as the homepage stat cards.
function ProofPanel() {
  const [awards, setAwards] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => {
        const n = Number(d?.govpacking?.dlaContracts);
        if (Number.isFinite(n) && n > 0) setAwards(n);
      })
      .catch(() => {});
  }, []);

  const years = new Date().getFullYear() - 2010;

  return (
    <div className="bg-white/[0.04] backdrop-blur border border-white/[0.08] rounded-2xl p-8 shadow-2xl">
      <div className="text-[10px] uppercase tracking-[2px] text-[#03ACED] font-semibold mb-6">Our own post-award track record</div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="text-4xl font-black text-[#03ACED] tabular-nums">
            {awards !== null ? <AnimatedNumber to={awards} suffix="+" /> : "350+"}
          </div>
          <div className="text-[11px] uppercase tracking-wider text-white/60 mt-1">DLA Awards Administered</div>
        </div>
        <div>
          <div className="text-4xl font-black text-white tabular-nums">{years}+</div>
          <div className="text-[11px] uppercase tracking-wider text-white/60 mt-1">Years in DoW Supply</div>
        </div>
        <div>
          <div className="text-2xl font-black text-white">AS9100D</div>
          <div className="text-[11px] uppercase tracking-wider text-white/60 mt-1">&amp; ISO 9001:2015</div>
        </div>
        <div>
          <div className="text-2xl font-black text-white">SDVOSB</div>
          <div className="text-[11px] uppercase tracking-wider text-white/60 mt-1">Service-Disabled Veteran-Owned</div>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-white/[0.06] space-y-2">
        {["Receiving reports & invoices", "Post-award requests", "SAM · DIBBS · JCP · SBA · SPRS", "Award tracking to closeout"].map((t) => (
          <div key={t} className="flex items-center gap-2 text-xs text-[#ccc]">
            <span className="w-1 h-1 bg-green-400 rounded-full" /> {t}
          </div>
        ))}
      </div>
    </div>
  );
}

const registrationOptions = ["SAM.gov", "DIBBS", "PIEE / WAWF", "JCP (DD 2345)", "SBA certification", "SPRS score"];

function ReviewForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!turnstileToken) { setStatus("error"); return; }
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    const registrations = data.getAll("registrations").map(String);

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
          topic: "GovAdmin - Post-Award Review Request",
          message: [
            "Post-Award Review request from GovAdmin page.",
            `CAGE code: ${data.get("cage") || "Not provided"}`,
            `Awards in last 12 months: ${data.get("awards") || "Not provided"}`,
            `Registrations in place: ${registrations.length ? registrations.join(", ") : "None selected"}`,
            `Who handles WAWF today: ${data.get("wawf") || "Not provided"}`,
            `Message: ${data.get("message") || "None"}`,
          ].join("\n"),
          source: "GovAdmin Post-Award Review Form",
          turnstileToken,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setTurnstileToken("");
        setTurnstileKey((k) => k + 1);
      }
    } catch {
      setStatus("error");
      setTurnstileToken("");
      setTurnstileKey((k) => k + 1);
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-white/[0.03] border border-[#03ACED]/30 rounded-2xl p-12 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
        <p className="text-[#bbb] mb-6">Want to lock in your Post-Award Review now?</p>
        <a
          href="https://www.calendly.com/mendsourcing/govadmin"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#03ACED] text-black px-8 py-4 rounded-lg font-bold text-[15px] hover:bg-[#02a0db] transition-colors inline-flex items-center gap-2"
        >
          Schedule the Call →
        </a>
        <p className="text-xs text-[#999] mt-4">Or we&apos;ll reach out within 24 hours.</p>
      </div>
    );
  }

  const inputCls = "w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors";

  return (
    <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-medium text-[#bbb] mb-2">First Name *</label>
          <input name="firstName" required maxLength={100} className={inputCls} placeholder="John" />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#bbb] mb-2">Last Name</label>
          <input name="lastName" maxLength={100} className={inputCls} placeholder="Doe" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-medium text-[#bbb] mb-2">Email *</label>
          <input name="email" type="email" required maxLength={254} className={inputCls} placeholder="john@company.com" />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#bbb] mb-2">Phone</label>
          <input
            name="phone" type="tel" maxLength={14}
            className={inputCls}
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
          <input name="company" required maxLength={100} className={inputCls} placeholder="Company Name" />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#bbb] mb-2">CAGE Code</label>
          <input name="cage" maxLength={7} className={`${inputCls} uppercase tracking-wider`} placeholder="e.g. 1ABC2" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-medium text-[#bbb] mb-2">Awards in the last 12 months</label>
          <select name="awards" className={`${inputCls} bg-[#111]`} defaultValue="">
            <option value="" className="bg-[#111]">Choose one...</option>
            {["None yet, just getting started", "1–5", "6–20", "21–50", "50+"].map((o) => (
              <option key={o} value={o} className="bg-[#111]">{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-[#bbb] mb-2">Who handles WAWF today?</label>
          <select name="wawf" className={`${inputCls} bg-[#111]`} defaultValue="">
            <option value="" className="bg-[#111]">Choose one...</option>
            {["Me, the owner", "Office / bookkeeper", "A consultant", "Nobody, it's late", "We haven't needed it yet"].map((o) => (
              <option key={o} value={o} className="bg-[#111]">{o}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium text-[#bbb] mb-3">Registrations you have in place today</label>
        <div className="flex flex-wrap gap-2">
          {registrationOptions.map((r) => (
            <label key={r} className="inline-flex items-center gap-2 px-3 py-2 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-[#ccc] cursor-pointer hover:border-[#03ACED]/50 has-[:checked]:border-[#03ACED] has-[:checked]:bg-[#03ACED]/10 transition-colors">
              <input type="checkbox" name="registrations" value={r} className="accent-[#03ACED]" />
              {r}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-xs font-medium text-[#bbb] mb-2">Anything else?</label>
        <textarea name="message" rows={4} maxLength={2000} className={`${inputCls} resize-none`} placeholder="Open awards, deadlines coming up, registrations you're worried about..." />
      </div>
      <TurnstileWidget
        key={turnstileKey}
        onVerify={setTurnstileToken}
        className="mb-4 flex justify-center"
      />
      <button
        type="submit"
        disabled={status === "sending" || !turnstileToken}
        className="w-full py-4 bg-[#03ACED] text-black font-bold text-sm rounded-lg hover:bg-[#02a0db] transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Request My Post-Award Review →"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-sm mt-3 text-center">Something went wrong. Email us at sales@mendsourcing.com</p>
      )}
    </form>
  );
}
