"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  open: boolean;
  onClose: () => void;
  /** PDF file URL */
  src: string;
  /** Downloadable filename */
  downloadAs?: string;
  /** Dialog title shown in the header */
  title?: string;
  /** Subline shown under the title */
  subtitle?: string;
}

/**
 * CertificateModal — cinematic "certificate unlocked" modal.
 *
 * Entrance choreography (total ~0.9s):
 *   0ms      backdrop fade + blur
 *   50ms     modal container scales from 0.88 → 1.0 with spring ease
 *   250ms    corner HUD brackets expand outward from center
 *   350ms    header status bar slides down
 *   450ms    cyan scan-line sweeps top → bottom across the PDF (single pass)
 *   550ms    PDF iframe fades in
 *   700ms    footer actions slide up
 *
 * Esc closes. Backdrop click closes. Uses a portal for proper stacking.
 * Respects prefers-reduced-motion.
 */
export default function CertificateModal({
  open,
  onClose,
  src,
  downloadAs = "certificate.pdf",
  title = "Quality Certifications",
  subtitle = "AS9100 Rev. D · ISO 9001:2015",
}: Props) {
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Only render the portal on the client
  useEffect(() => setMounted(true), []);

  // Esc-to-close + body scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  const modal = (
    <div
      className="cm-root fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <div className="cm-backdrop absolute inset-0 bg-black/80 backdrop-blur-md" aria-hidden="true" />

      {/* Modal body — stop click propagation so clicks inside don't close */}
      <div
        ref={contentRef}
        className="cm-container relative z-10 w-full max-w-5xl h-[92vh] flex flex-col bg-[#0a0d14] border border-[#03ACED]/40 rounded-2xl shadow-[0_0_60px_rgba(3,172,237,0.25)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient corner brackets animating outward */}
        <span className="cm-bracket cm-bracket-tl absolute top-3 left-3 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-l-2 border-[#03ACED] pointer-events-none" aria-hidden="true" />
        <span className="cm-bracket cm-bracket-tr absolute top-3 right-3 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-r-2 border-[#03ACED] pointer-events-none" aria-hidden="true" />
        <span className="cm-bracket cm-bracket-bl absolute bottom-3 left-3 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-l-2 border-[#03ACED] pointer-events-none" aria-hidden="true" />
        <span className="cm-bracket cm-bracket-br absolute bottom-3 right-3 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-r-2 border-[#03ACED] pointer-events-none" aria-hidden="true" />

        {/* Header */}
        <div className="cm-header relative flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-[#03ACED]/20 bg-[#03ACED]/[0.03]">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22c55e]" />
            </span>
            <div className="min-w-0">
              <div className="text-[9px] sm:text-[10px] uppercase tracking-[2px] sm:tracking-[2.5px] font-bold text-[#22c55e]">
                ◉ Certificate Verified
              </div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5 truncate">
                {title}
              </div>
              <div className="text-[10px] sm:text-[11px] text-white/50 font-mono truncate">
                {subtitle}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="group relative flex-shrink-0 p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] hover:border-[#03ACED]/40 transition-colors"
            aria-label="Close certificate viewer"
          >
            <svg className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* PDF body */}
        <div className="cm-body relative flex-1 min-h-0 bg-[#05080d]">
          {/* Scan-line sweep (single pass) */}
          <div className="cm-scanline absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#03ACED] to-transparent shadow-[0_0_16px_rgba(3,172,237,0.8)] pointer-events-none z-10" aria-hidden="true" />

          {/* Cyan grid overlay fading in — gives "scanner display" vibe */}
          <div
            className="cm-grid absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(3,172,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(3,172,237,0.06) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
            aria-hidden="true"
          />

          {/* Actual PDF */}
          <iframe
            src={`${src}#view=FitH&toolbar=1&navpanes=0`}
            title={title}
            className="cm-iframe absolute inset-0 w-full h-full bg-white"
            style={{ border: 0 }}
          />
        </div>

        {/* Footer — status strip only (no external links) */}
        <div className="cm-footer relative flex items-center justify-between gap-3 px-4 sm:px-6 py-2.5 sm:py-3 border-t border-[#03ACED]/20 bg-[#03ACED]/[0.03]">
          <div className="text-[9px] sm:text-[10px] font-mono text-white/50 tabular-nums truncate">
            DOC · MEND-QMS-{new Date().getFullYear()} · ENCRYPTED
          </div>
          <div className="flex flex-shrink-0 items-center gap-2 text-[9px] sm:text-[10px] uppercase tracking-[1.5px] font-bold text-[#22c55e]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#22c55e]" />
            </span>
            Authenticated
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Backdrop fade-in */
        :global(.cm-root .cm-backdrop) {
          animation: cmBackdropIn 300ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
        }
        @keyframes cmBackdropIn {
          to { opacity: 1; }
        }

        /* Main container — spring scale-in */
        :global(.cm-root .cm-container) {
          animation: cmContainerIn 520ms cubic-bezier(0.22, 1.12, 0.36, 1) 50ms forwards;
          opacity: 0;
          transform: scale(0.88) translateY(20px);
        }
        @keyframes cmContainerIn {
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Corner brackets expanding outward */
        :global(.cm-root .cm-bracket) {
          animation: cmBracketIn 500ms cubic-bezier(0.22, 1, 0.36, 1) 250ms forwards;
          opacity: 0;
          transform: scale(0.4);
        }
        :global(.cm-root .cm-bracket-tl) { transform-origin: top left; }
        :global(.cm-root .cm-bracket-tr) { transform-origin: top right; }
        :global(.cm-root .cm-bracket-bl) { transform-origin: bottom left; }
        :global(.cm-root .cm-bracket-br) { transform-origin: bottom right; }
        @keyframes cmBracketIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Header + footer slide-in */
        :global(.cm-root .cm-header) {
          animation: cmHeaderIn 500ms cubic-bezier(0.22, 1, 0.36, 1) 350ms forwards;
          opacity: 0;
          transform: translateY(-8px);
        }
        :global(.cm-root .cm-footer) {
          animation: cmFooterIn 500ms cubic-bezier(0.22, 1, 0.36, 1) 700ms forwards;
          opacity: 0;
          transform: translateY(8px);
        }
        @keyframes cmHeaderIn { to { opacity: 1; transform: translateY(0); } }
        @keyframes cmFooterIn { to { opacity: 1; transform: translateY(0); } }

        /* Grid + iframe fade */
        :global(.cm-root .cm-grid) {
          animation: cmFade 600ms ease-out 450ms forwards;
          opacity: 0;
        }
        :global(.cm-root .cm-iframe) {
          animation: cmFade 600ms ease-out 550ms forwards;
          opacity: 0;
        }
        @keyframes cmFade { to { opacity: 1; } }

        /* Single-pass scan line sweep */
        :global(.cm-root .cm-scanline) {
          animation: cmScan 1100ms cubic-bezier(0.55, 0, 0.45, 1) 450ms forwards;
          opacity: 0;
          top: 0;
        }
        @keyframes cmScan {
          0% { opacity: 0; top: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { opacity: 0; top: 100%; }
        }

        /* Reduced-motion — snap everything into place immediately */
        @media (prefers-reduced-motion: reduce) {
          :global(.cm-root .cm-backdrop),
          :global(.cm-root .cm-container),
          :global(.cm-root .cm-bracket),
          :global(.cm-root .cm-header),
          :global(.cm-root .cm-footer),
          :global(.cm-root .cm-grid),
          :global(.cm-root .cm-iframe) {
            animation: none;
            opacity: 1;
            transform: none;
          }
          :global(.cm-root .cm-scanline) {
            display: none;
          }
        }
      `}</style>
    </div>
  );

  return createPortal(modal, document.body);
}
