"use client";

import { useState } from "react";
import Image from "next/image";
import CertificateModal from "./CertificateModal";

/**
 * CertBadges — the two white pill badges (AS9100 + ISO 9001) used in the
 * homepage hero and anywhere else we need trust markers. Clicking either
 * opens the official certificate PDF in the cinematic CertificateModal.
 */
export default function CertBadges() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="View AS9100 Rev. D certificate PDF"
        className="group bg-white rounded-xl px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-3 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(3,172,237,0.25)] cursor-pointer"
      >
        <Image src="/images/as9100-cert.png" alt="AS9100 Rev. D Certified" width={50} height={50} className="h-10 sm:h-12 w-auto" />
        <div className="text-left">
          <div className="text-xs font-bold text-gray-900">AS9100</div>
          <div className="text-[10px] text-gray-500">Rev. D Certified</div>
        </div>
      </button>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="View ISO 9001:2015 certificate PDF"
        className="group bg-white rounded-xl px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-3 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(3,172,237,0.25)] cursor-pointer"
      >
        <Image src="/images/iso9001-cert.png" alt="ISO 9001:2015 Certified" width={50} height={50} className="h-10 sm:h-12 w-auto" />
        <div className="text-left">
          <div className="text-xs font-bold text-gray-900">ISO 9001</div>
          <div className="text-[10px] text-gray-500">2015 Certified</div>
        </div>
      </button>

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
