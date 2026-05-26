"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import TurnstileWidget from "@/components/TurnstileWidget";

const cmmcDomains = [
  "Access Control",
  "Awareness & Training",
  "Audit & Accountability",
  "Configuration Management",
  "Identification & Authentication",
  "Incident Response",
  "Maintenance",
  "Media Protection",
  "Personnel Security",
  "Physical Protection",
  "Risk Assessment",
  "Security Assessment",
  "System & Communications Protection",
  "System & Information Integrity",
];

const journey: { date: string; status: "complete" | "in-progress" | "upcoming"; title: string; body: string }[] = [
  {
    date: "Step 1",
    status: "complete",
    title: "Secureframe Consultation & Onboarding",
    body: "Completed initial consultation with Secureframe, established our organizational account, and gained access to the Secureframe compliance dashboard. This gives MeND a centralized platform for managing every NIST SP 800-171 control, evidence, and policy required for CMMC Level 2.",
  },
  {
    date: "Step 2",
    status: "in-progress",
    title: "Dedicated Federal Google Workspace",
    body: "Stood up a separate Google Workspace tenant on federal.mendsourcing.com to isolate Controlled Unclassified Information (CUI) from our commercial environment. DNS, MX, SPF, DKIM, and DMARC are live; identity, device, and data-loss-prevention policies are being configured.",
  },
  {
    date: "Next",
    status: "upcoming",
    title: "Policy Implementation & Evidence Collection",
    body: "Rolling out the full set of Secureframe-managed policies, mapping each to NIST SP 800-171 controls, and connecting Secureframe to our infrastructure for automated, continuous evidence collection.",
  },
  {
    date: "Next",
    status: "upcoming",
    title: "Internal Readiness Assessment",
    body: "Self-assessment against all 110 NIST SP 800-171 controls, gap remediation, and documentation of our System Security Plan (SSP) and Plan of Action & Milestones (POA&M).",
  },
  {
    date: "Final",
    status: "upcoming",
    title: "C3PAO Third-Party Assessment",
    body: "Engagement with a Certified Third-Party Assessor Organization (C3PAO) to formally validate compliance and award MeND its CMMC Level 2 certification.",
  },
];

const dlaPhases = [
  {
    phase: "Phase 1",
    label: "Initial Implementation",
    date: "10 Nov 2025",
    body: "Begins at 48 CFR Rule Effective Date. When applicable, solicitations and contracts will require Level 1 (FCI) or Level 2 Self-Assessment (CUI/CDI).",
  },
  {
    phase: "Phase 2",
    label: "C3PAO Assessment",
    date: "10 Nov 2026",
    body: "12 months after Phase 1. When applicable, solicitations and contracts will require Level 2 C3PAO Assessment (CUI/CDI).",
  },
  {
    phase: "Phase 3",
    label: "DIBCAC Assessment",
    date: "10 Nov 2027",
    body: "24 months after Phase 1. When applicable, solicitations and contracts will require Level 3 DIBCAC Assessment (CUI/CDI).",
  },
  {
    phase: "Phase 4",
    label: "Full Implementation",
    date: "10 Nov 2028",
    body: "36 months after Phase 1. All solicitations and contracts will include applicable CMMC Level requirements as a condition of contract award.",
  },
];

const dlaProcurementNotes = [
  { level: "Level 1 Self-Assessment", note: "L39", sto: "None", desc: "CMMC Level 1 Self-Assessment Requirement for Federal Contracting Information (FCI)" },
  { level: "Level 2 Self-Assessment", note: "L40", sto: "RD004", desc: "CMMC Level 2 Self-Assessment Requirement (Phase In: Nov 10, 2025 – Nov 10, 2028)" },
  { level: "Level 2 C3PAO", note: "L41", sto: "RD005", desc: "CMMC Level 2 Certified Third-Party Assessment Organization (C3PAO) Requirement (Phase In: Nov 10, 2025 – Nov 10, 2028)" },
  { level: "Level 3 DIBCAC", note: "L42", sto: "None", desc: "CMMC Level 3 Defense Industrial Base Cybersecurity Assessment Center (DIBCAC) Assessment Requirement" },
];

export default function FederalPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!turnstileToken) { setFormStatus("error"); return; }
    setFormStatus("sending");
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
          topic: "Federal / CMMC - Inquiry",
          message: data.get("message") || "Inquiry from Federal / CMMC page",
          source: "Federal / CMMC Form",
          recipient: "tristan@federal.mendsourcing.com",
          turnstileToken,
        }),
      });
      if (res.ok) {
        setFormStatus("sent");
        form.reset();
      } else {
        setFormStatus("error");
        setTurnstileToken("");
        setTurnstileKey((k) => k + 1);
      }
    } catch {
      setFormStatus("error");
      setTurnstileToken("");
      setTurnstileKey((k) => k + 1);
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://mendsourcing.com/#organization",
        name: "MeND Sourcing Solutions",
        url: "https://mendsourcing.com",
        logo: "https://mendsourcing.com/favicon-mend.png",
        sameAs: ["https://www.linkedin.com/company/mend-sourcing-solutions"],
      },
      {
        "@type": "WebPage",
        "@id": "https://mendsourcing.com/federal#webpage",
        url: "https://mendsourcing.com/federal",
        name: "Federal & Cybersecurity | CMMC Level 2 Compliance",
        description:
          "MeND is a DoD contractor and SDVOSB pursuing CMMC Level 2 certification under NIST SP 800-171 Rev. 2. CMMC enforcement begins November 2026, full implementation by 2028.",
        isPartOf: { "@id": "https://mendsourcing.com/#organization" },
        about: {
          "@type": "Thing",
          name: "Cybersecurity Maturity Model Certification",
        },
      },
      {
        "@type": "Service",
        name: "CMMC Level 2 Compliant Federal Contracting",
        provider: { "@id": "https://mendsourcing.com/#organization" },
        areaServed: "United States",
        serviceType: "DoD Defense Contracting",
        description:
          "Federal contracting services aligned to NIST SP 800-171 Rev. 2 across 14 security domains, in active pursuit of CMMC Level 2 certification.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero
        title="Federal &amp; Cybersecurity"
        subtitle="Securing the defense supply chain through CMMC compliance."
      />

      {/* Intro */}
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Cybersecurity Maturity Model Certification
          </Reveal>
          <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
            Why CMMC Matters
          </Reveal>
          <Reveal direction="up" delay={160} as="p" className="text-[#bbb] text-base leading-relaxed max-w-3xl mb-6">
            The Cybersecurity Maturity Model Certification (CMMC) is the Department of Defense&apos;s framework for protecting Federal Contract Information (FCI) and Controlled Unclassified Information (CUI) across the Defense Industrial Base. As a DoD contractor and SDVOSB, MeND treats cybersecurity as a core operational requirement — not a checkbox.
          </Reveal>
          <Reveal direction="up" delay={240} as="p" className="text-[#bbb] text-base leading-relaxed max-w-3xl">
            Our federal cybersecurity program is built around NIST SP 800-171 Rev. 2, with controls implemented across 14 security domains and continuously monitored.
          </Reveal>
          <Reveal direction="up" delay={320} as="p" className="text-[#bbb] text-base leading-relaxed max-w-3xl mt-6">
            CMMC enforcement begins <span className="text-white font-semibold">November 2026</span> and reaches <span className="text-white font-semibold">full implementation by 2028</span>. MeND is aligning ahead of the rollout so contracting officers, partners, and subcontractors can rely on us through every phase.
          </Reveal>
        </div>
      </section>

      {/* CMMC L2 In Progress */}
      <section className="py-16 md:py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up" className="bg-white/[0.03] border border-[#03ACED]/30 rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-green-400/90 font-medium uppercase tracking-wider">MeND&apos;s Status: In Progress</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              CMMC Level 2 Certification &mdash; Underway
            </h2>
            <p className="text-[#bbb] text-base leading-relaxed max-w-3xl mb-4">
              MeND is actively pursuing <span className="text-white font-semibold">CMMC Level 2</span> certification, the standard required for any DoD contractor handling Controlled Unclassified Information. Implementation of all 110 NIST SP 800-171 controls is in progress, with formal third-party assessment scheduled upon completion.
            </p>
            <p className="text-[#bbb] text-base leading-relaxed max-w-3xl">
              This investment ensures our customers, partners, and subcontractors can confidently share sensitive program data with us &mdash; today and as the DoD enforces CMMC across all new contracts.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Compliance Journey Timeline */}
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Our Compliance Journey
          </Reveal>
          <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            CMMC Level 2 Progress Log
          </Reveal>
          <Reveal direction="up" delay={160} as="p" className="text-[#bbb] text-base leading-relaxed max-w-3xl mb-12">
            Transparency matters. Below is a public log of every milestone in our path to CMMC Level 2 — what&apos;s done, what&apos;s in motion, and what&apos;s next.
          </Reveal>
          <div className="relative">
            <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-white/[0.08]" aria-hidden="true" />
            <div className="space-y-6">
              {journey.map((step, i) => {
                const dot =
                  step.status === "complete"
                    ? "bg-green-400"
                    : step.status === "in-progress"
                    ? "bg-[#03ACED] animate-pulse"
                    : "bg-white/20";
                const label =
                  step.status === "complete"
                    ? { text: "Complete", cls: "text-green-400 bg-green-400/10 border-green-400/30" }
                    : step.status === "in-progress"
                    ? { text: "In Progress", cls: "text-[#03ACED] bg-[#03ACED]/10 border-[#03ACED]/30" }
                    : { text: "Upcoming", cls: "text-[#999] bg-white/[0.04] border-white/10" };
                return (
                  <Reveal
                    key={step.title}
                    direction="up"
                    delay={i * 90}
                    className="relative pl-12 md:pl-16"
                  >
                    <span className={`absolute left-2.5 md:left-4.5 top-6 w-3 h-3 rounded-full ${dot} ring-4 ring-[#0a0a0a]`} />
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 md:p-8 hover:border-[#03ACED]/30 transition-colors">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-xs uppercase tracking-[2px] text-[#999] font-semibold">{step.date}</span>
                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border ${label.cls}`}>
                          {label.text}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-[#bbb] text-sm leading-relaxed">{step.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* DLA-Specific CMMC Requirements */}
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            DLA Cybersecurity Requirements
          </Reveal>
          <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            What you Need to Know
          </Reveal>
          <Reveal direction="up" delay={160} as="p" className="text-[#bbb] text-base leading-relaxed max-w-3xl mb-12">
            As a DLA contractor, MeND is preparing for the agency&apos;s phased rollout of CMMC requirements. Below is what suppliers, subcontractors, and customers need to know.
          </Reveal>

          {/* DFARS Provisions */}
          <Reveal direction="up" delay={200} as="h3" className="text-xl font-bold text-white mb-4">
            Governing DFARS Provisions
          </Reveal>
          <Reveal direction="up" delay={240} as="p" className="text-[#bbb] text-sm leading-relaxed max-w-3xl mb-6">
            DFARS provision <span className="text-white font-semibold">252.204-7025(b)(1)</span> and DFARS clause <span className="text-white font-semibold">252.204-7021(d)(1)(i)</span> together state the CMMC level required for a specific solicitation or contract.
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <Reveal direction="up" delay={280} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
              <div className="text-xs uppercase tracking-wider text-[#03ACED] font-bold mb-2">DFARS 252.204-7025(b)(1)</div>
              <p className="text-[#bbb] text-sm leading-relaxed">
                Sets the CMMC level required by the solicitation. The level (or higher) is required prior to award for each contractor information system that will process, store, or transmit Federal Contract Information (FCI) or Controlled Unclassified Information (CUI) during contract performance.
              </p>
            </Reveal>
            <Reveal direction="up" delay={340} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
              <div className="text-xs uppercase tracking-wider text-[#03ACED] font-bold mb-2">DFARS 252.204-7021(d)(1)(i)</div>
              <p className="text-[#bbb] text-sm leading-relaxed">
                Requires the contractor to have and maintain the specified CMMC level (or higher) for the duration of the contract on all information systems used in performance of the contract, task order, or delivery order that process, store, or transmit FCI or CUI.
              </p>
            </Reveal>
          </div>

          {/* DLA Phased Rollout */}
          <Reveal direction="up" as="h3" className="text-xl font-bold text-white mb-4">
            DLA Phased Implementation Timeline
          </Reveal>
          <Reveal direction="up" delay={80} as="p" className="text-[#bbb] text-sm leading-relaxed max-w-3xl mb-8">
            DLA is implementing CMMC using a three-year phased approach beginning <span className="text-white font-semibold">November 10, 2025</span>. After November 10, 2028, suppliers must have a completed CMMC Level 2 Self-Assessment uploaded to SPRS to be eligible for contract award.
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {dlaPhases.map((p, i) => (
              <Reveal
                key={p.phase}
                direction="up"
                delay={i * 100}
                className="bg-gradient-to-br from-[#03ACED]/10 to-transparent border border-[#03ACED]/20 rounded-2xl p-6"
              >
                <div className="text-xs uppercase tracking-wider text-[#03ACED] font-bold mb-1">{p.phase}</div>
                <div className="text-lg font-extrabold text-white mb-1">{p.label}</div>
                <div className="text-xs text-[#bbb] font-mono mb-3">{p.date}</div>
                <p className="text-[#bbb] text-sm leading-relaxed">{p.body}</p>
              </Reveal>
            ))}
          </div>

          {/* Procurement Notes Table */}
          <Reveal direction="up" as="h3" className="text-xl font-bold text-white mb-4">
            DLA Procurement Notes &amp; Standard Text Objectives
          </Reveal>
          <Reveal direction="up" delay={80} as="p" className="text-[#bbb] text-sm leading-relaxed max-w-3xl mb-6">
            Suppliers will see DLA Procurement Notes (PN) and/or Standard Text Objectives (STO) in contracts indicating a current or future CMMC requirement.
          </Reveal>
          <Reveal direction="up" delay={160} className="overflow-x-auto bg-white/[0.03] border border-white/[0.06] rounded-2xl mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left text-xs uppercase tracking-wider text-[#03ACED] font-bold px-6 py-4">CMMC Level</th>
                  <th className="text-left text-xs uppercase tracking-wider text-[#03ACED] font-bold px-6 py-4">Procurement Note</th>
                  <th className="text-left text-xs uppercase tracking-wider text-[#03ACED] font-bold px-6 py-4">STO</th>
                  <th className="text-left text-xs uppercase tracking-wider text-[#03ACED] font-bold px-6 py-4">Description</th>
                </tr>
              </thead>
              <tbody>
                {dlaProcurementNotes.map((row) => (
                  <tr key={row.note} className="border-b border-white/[0.04] last:border-0">
                    <td className="px-6 py-4 text-white font-semibold whitespace-nowrap">{row.level}</td>
                    <td className="px-6 py-4 text-[#03ACED] font-mono font-bold">{row.note}</td>
                    <td className="px-6 py-4 text-[#bbb] font-mono">{row.sto}</td>
                    <td className="px-6 py-4 text-[#bbb]">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          {/* Self-Assessment Resources */}
          <Reveal direction="up" as="h3" className="text-xl font-bold text-white mb-4">
            Self-Assessment Resources
          </Reveal>
          <Reveal direction="up" delay={80} as="p" className="text-[#bbb] text-sm leading-relaxed max-w-3xl mb-6">
            Official resources for Level 1 and Level 2 self-assessments and for finding C3PAO third-party assessors:
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://dodcio.defense.gov/Portals/0/Documents/CMMC/AssessmentGuideL1v2.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-[#03ACED]/30 transition-colors"
            >
              <div className="text-xs uppercase tracking-wider text-[#03ACED] font-bold mb-1">DoD CIO</div>
              <div className="text-white font-semibold mb-1">CMMC Level 1 Assessment Guide (PDF)</div>
              <div className="text-[#999] text-xs">Official Level 1 self-assessment guide</div>
            </a>
            <a
              href="https://www.projectspectrum.io/#/cyber-readiness-check"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-[#03ACED]/30 transition-colors"
            >
              <div className="text-xs uppercase tracking-wider text-[#03ACED] font-bold mb-1">Project Spectrum</div>
              <div className="text-white font-semibold mb-1">Cyber Readiness Check</div>
              <div className="text-[#999] text-xs">DoD-sponsored Level 1 &amp; 2 self-assessment platform</div>
            </a>
            <a
              href="https://cyberab.org/Catalog#!/c/s/Results/Format/list/Page/1/Size/9/Sort/NameAscending"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-[#03ACED]/30 transition-colors"
            >
              <div className="text-xs uppercase tracking-wider text-[#03ACED] font-bold mb-1">Cyber AB</div>
              <div className="text-white font-semibold mb-1">C3PAO Marketplace</div>
              <div className="text-[#999] text-xs">Find authorized third-party assessors for Level 2 certification</div>
            </a>
            <a
              href="https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-171r2.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-[#03ACED]/30 transition-colors"
            >
              <div className="text-xs uppercase tracking-wider text-[#03ACED] font-bold mb-1">NIST</div>
              <div className="text-white font-semibold mb-1">SP 800-171 Rev. 2 (PDF)</div>
              <div className="text-[#999] text-xs">Official 110-control publication — basis for Level 2</div>
            </a>
          </div>
        </div>
      </section>

      {/* NIST 800-171 Domains */}
      <section className="py-16 md:py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            NIST SP 800-171
          </Reveal>
          <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            14 Security Domains
          </Reveal>
          <Reveal direction="up" delay={160} as="p" className="text-[#bbb] text-base leading-relaxed max-w-3xl mb-12">
            Every CMMC Level 2 control maps to one of the 14 NIST SP 800-171 security families. Our policies, procedures, and tooling cover each one.
          </Reveal>
          <div className="flex flex-wrap gap-3">
            {cmmcDomains.map((d, i) => (
              <Reveal
                key={d}
                direction="up"
                delay={i * 40}
                as="span"
                className="px-4 py-2 bg-[#03ACED]/10 border border-[#03ACED]/30 rounded-lg text-[#03ACED] text-sm font-semibold"
              >
                {d}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Secureframe Partnership */}
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Compliance Partner
          </Reveal>
          <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8">
            Powered by <span className="text-green-400">Secureframe</span>
          </Reveal>
          <Reveal direction="up" delay={160} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 md:p-12">
            <p className="text-[#bbb] text-base leading-relaxed mb-6">
              MeND has partnered with <a href="https://secureframe.com/" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline font-semibold">Secureframe</a>{" "}to automate and accelerate our CMMC Level 2 readiness. Secureframe&apos;s platform handles continuous control monitoring, evidence collection, policy management, and audit preparation across the full NIST SP 800-171 control set.
            </p>
            <p className="text-[#bbb] text-base leading-relaxed mb-6">
              <span className="text-white font-semibold">Looking to start your own CMMC journey?</span> If you&apos;re considering Secureframe for your organization, reach out to us first &mdash; we can connect you with our contacts to secure better pricing than going direct.
            </p>
            <a
              href="mailto:tristan@federal.mendsourcing.com?subject=Secureframe%20Referral%20Inquiry"
              className="inline-flex items-center gap-2 bg-[#03ACED] text-black px-6 py-3 rounded-md font-semibold text-sm hover:bg-[#02a0db] transition-colors"
            >
              Get Secureframe Referral Pricing →
            </a>
          </Reveal>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 md:py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Reveal direction="up" className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
              Federal Inquiries
            </Reveal>
            <Reveal direction="up" delay={80} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Talk to Our Federal Team
            </Reveal>
            <Reveal direction="up" delay={160} as="p" className="text-[#bbb]">
              Questions on CMMC, our compliance posture, or Secureframe referrals? Reach out directly to{" "}
              <a href="mailto:tristan@federal.mendsourcing.com" className="text-[#03ACED] hover:underline">
                tristan@federal.mendsourcing.com
              </a>
              {" "}or use the form below.
            </Reveal>
          </div>
          {formStatus === "sent" ? (
            <Reveal direction="up" className="bg-white/[0.03] border border-[#03ACED]/30 rounded-2xl p-12 text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
              <p className="text-[#bbb]">We&apos;ll be in touch within 24 hours.</p>
            </Reveal>
          ) : (
            <Reveal direction="up" delay={240}>
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
                  <label className="block text-xs font-medium text-[#bbb] mb-2">How can we help?</label>
                  <textarea name="message" rows={3} className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors resize-none" placeholder="CMMC questions, Secureframe referral, or general federal inquiries..." />
                </div>
                <TurnstileWidget
                  key={turnstileKey}
                  onVerify={setTurnstileToken}
                  className="mb-4 flex justify-center"
                />
                <button type="submit" disabled={formStatus === "sending" || !turnstileToken} className="group w-full py-4 bg-[#03ACED] text-black font-bold text-sm rounded-lg hover:bg-[#02a0db] transition-colors disabled:opacity-50">
                  {formStatus === "sending" ? "Sending..." : (
                    <>
                      Send Inquiry <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </>
                  )}
                </button>
                {formStatus === "error" && (
                  <p className="text-red-400 text-sm mt-3 text-center">Something went wrong. Email us at tristan@federal.mendsourcing.com</p>
                )}
              </form>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
