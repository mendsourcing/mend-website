"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import CertificateModal from "./CertificateModal";

/**
 * QualityCertCards — the two big clickable certificate cards for the /quality
 * page. Clicking either opens the official PDF in the cinematic modal.
 */
export default function QualityCertCards() {
  const [open, setOpen] = useState(false);

  const cardBase =
    "group text-left bg-gradient-to-br from-[#03ACED]/10 to-transparent border border-[#03ACED]/30 rounded-2xl p-10 flex flex-col items-center text-center cursor-pointer transition-all hover:border-[#03ACED]/70 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(3,172,237,0.2)] w-full";

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Reveal direction="left">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open AS9100D certificate PDF"
            className={cardBase}
          >
            <Image
              src="/images/as9100-cert.png"
              alt="AS9100 Rev. D Certified"
              width={150}
              height={150}
              className="h-28 w-auto mb-6 transition-transform duration-500 group-hover:scale-105"
            />
            <h3 className="text-2xl font-bold mb-4">AS9100D Certified</h3>
            <p className="text-sm text-[#bbb] leading-relaxed">
              The aerospace quality management standard that ensures we meet the stringent requirements of the aerospace industry for safety, reliability, and quality.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[2px] font-bold text-[#03ACED] opacity-0 group-hover:opacity-100 transition-opacity">
              View Certificate
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </div>
          </button>
        </Reveal>

        <Reveal direction="right" delay={120}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open ISO 9001:2015 certificate PDF"
            className={cardBase}
          >
            <Image
              src="/images/iso9001-cert.png"
              alt="ISO 9001:2015 Certified"
              width={150}
              height={150}
              className="h-28 w-auto mb-6 transition-transform duration-500 group-hover:scale-105"
            />
            <h3 className="text-2xl font-bold mb-4">ISO 9001:2015 Certified</h3>
            <p className="text-sm text-[#bbb] leading-relaxed">
              The international standard for quality management systems, demonstrating our ability to consistently provide products and services that meet customer and regulatory requirements.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[2px] font-bold text-[#03ACED] opacity-0 group-hover:opacity-100 transition-opacity">
              View Certificate
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </div>
          </button>
        </Reveal>
      </div>

      <CertificateModal
        open={open}
        onClose={() => setOpen(false)}
        src="/certifications/mend-as9100-iso9001-2025.pdf"
        downloadAs="MeND-AS9100D-ISO9001-2025.pdf"
        title="Quality Certifications"
        subtitle="AS9100 Rev. D · ISO 9001:2015 · 2025"
      />
    </>
  );
}
