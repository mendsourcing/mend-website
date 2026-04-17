"use client";

/**
 * LocationMap — real Google Maps of MeND HQ with a tactical HUD overlay.
 * Shows the actual lay of the land (streets, buildings) while keeping the
 * defense/ops aesthetic via CSS dark-mode filter + cyan brand tint + HUD.
 *
 * HQ: 1713 E. 58th Pl. Unit G, Los Angeles, CA 90001
 * Coords: 33.9935° N, 118.2706° W
 *
 * No API key required (uses the free google.com/maps embed format).
 */

const LAT = 33.9935;
const LON = -118.2706;
const ZOOM = 15;

const MAP_EMBED = `https://www.google.com/maps?q=${LAT},${LON}&z=${ZOOM}&hl=en&output=embed`;
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=1713+E+58th+Pl+Unit+G+Los+Angeles+CA+90001`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=1713+E+58th+Pl+Unit+G+Los+Angeles+CA+90001`;

export default function LocationMap() {
  return (
    <div className="relative w-full">
      <div className="relative bg-[#05080d] border border-[#03ACED]/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(3,172,237,0.08)]">
        {/* ============ HEADER BAR ============ */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-[#03ACED]/20 bg-[#03ACED]/[0.03] relative z-20">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#03ACED] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#03ACED]" />
            </span>
            <span className="text-[10px] uppercase tracking-[2.5px] font-bold text-[#03ACED]">
              MeND Operations Center
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 font-mono text-[10px] text-white/50 tabular-nums">
            <span>{LAT.toFixed(4)}° N</span>
            <span className="text-[#03ACED]/40">·</span>
            <span>{Math.abs(LON).toFixed(4)}° W</span>
          </div>
        </div>

        {/* ============ MAP BODY ============ */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-[#05080d]">
          {/* Real Google Maps iframe — dark-tinted via CSS filter */}
          <iframe
            src={MAP_EMBED}
            title="MeND Operations Center — 1713 E. 58th Pl., Los Angeles"
            className="absolute inset-0 w-full h-full border-0"
            style={{
              filter:
                "invert(0.92) hue-rotate(180deg) saturate(0.35) brightness(0.95) contrast(1.05)",
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Cyan brand tint over the map (screen blend) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(3,172,237,0.18), rgba(3,172,237,0.06) 40%, rgba(233,70,21,0.04))",
              mixBlendMode: "overlay",
            }}
          />

          {/* Vignette for depth */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(5,8,13,0.65) 100%)",
            }}
          />

          {/* ==================== HUD OVERLAY ==================== */}
          {/* All pointer-events-none so the map stays interactive underneath */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Corner HUD brackets */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#03ACED]/80" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#03ACED]/80" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#03ACED]/80" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#03ACED]/80" />

            {/* Scanner sweep line */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="lm-scanner absolute top-0 bottom-0 w-[120px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(3,172,237,0.35), transparent)",
                }}
              />
            </div>

            {/* Center crosshair + pulse rings on MeND HQ */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {/* Concentric pulse rings */}
              <span className="lm-ring lm-ring-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block rounded-full border border-[#03ACED]" />
              <span className="lm-ring lm-ring-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block rounded-full border border-[#03ACED]" />
              <span className="lm-ring lm-ring-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block rounded-full border border-[#03ACED]" />

              {/* Static reference ring */}
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block w-[90px] h-[90px] rounded-full border border-dashed border-[#03ACED]/40" />

              {/* Crosshair ticks */}
              <div className="relative w-14 h-14 flex items-center justify-center">
                {/* top tick */}
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-[#E94615]" />
                {/* bottom tick */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-[#E94615]" />
                {/* left tick */}
                <span className="absolute top-1/2 left-0 -translate-y-1/2 h-0.5 w-3 bg-[#E94615]" />
                {/* right tick */}
                <span className="absolute top-1/2 right-0 -translate-y-1/2 h-0.5 w-3 bg-[#E94615]" />
                {/* center dot */}
                <span className="lm-pulse-dot block w-3 h-3 rounded-full bg-[#E94615] shadow-[0_0_16px_rgba(233,70,21,0.9)]" />
              </div>
            </div>

            {/* Target callout label — positioned top-right of HQ */}
            <div className="absolute top-[28%] left-[62%] hidden md:block">
              {/* Leader line from callout back toward crosshair */}
              <svg
                className="absolute -left-[70px] top-4 overflow-visible"
                width="80"
                height="40"
              >
                <line
                  x1="80"
                  y1="0"
                  x2="0"
                  y2="40"
                  stroke="#03ACED"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  opacity="0.7"
                />
                <circle cx="0" cy="40" r="2" fill="#03ACED" />
              </svg>
              <div className="bg-[#0a0a0a]/95 border border-[#03ACED]/60 rounded px-3 py-2 shadow-lg backdrop-blur-sm">
                <div className="text-[9px] font-mono font-bold text-[#03ACED] tracking-[1.5px] mb-0.5">
                  ◉ MEND HQ · TGT-01
                </div>
                <div className="text-[10px] font-mono text-white leading-tight">
                  1713 E. 58TH PL UNIT G
                </div>
                <div className="text-[10px] font-mono text-white leading-tight">
                  LOS ANGELES, CA 90001
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============ FOOTER BAR ============ */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 justify-between px-4 sm:px-5 py-3 border-t border-[#03ACED]/20 bg-[#03ACED]/[0.03] relative z-20">
          <div className="flex items-center gap-4 font-mono text-[10px] text-white/60 tabular-nums">
            <span>
              <span className="text-[#03ACED]/60">LAX</span> 10.2 MI
            </span>
            <span className="text-[#03ACED]/30">·</span>
            <span>
              <span className="text-[#03ACED]/60">DTLA</span> 4.8 MI
            </span>
            <span className="text-[#03ACED]/30">·</span>
            <span>
              <span className="text-[#03ACED]/60">PORT</span> 12.1 MI
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[1.5px] font-bold text-white/70 hover:text-[#03ACED] transition-colors"
            >
              View on Maps
              <span className="inline-block transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <span className="text-[#03ACED]/30">|</span>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[1.5px] font-bold text-[#E94615] hover:text-[#f25930] transition-colors"
            >
              Plot Course
              <span className="inline-block transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.lm-ring) {
          width: 30px;
          height: 30px;
          animation: lmRing 3.6s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }
        :global(.lm-ring-2) {
          animation-delay: 1.2s;
        }
        :global(.lm-ring-3) {
          animation-delay: 2.4s;
        }
        @keyframes lmRing {
          0% {
            width: 30px;
            height: 30px;
            opacity: 0.9;
            border-width: 2px;
          }
          80% {
            opacity: 0.1;
          }
          100% {
            width: 240px;
            height: 240px;
            opacity: 0;
            border-width: 0.5px;
          }
        }

        :global(.lm-pulse-dot) {
          animation: lmPulseDot 1.8s ease-in-out infinite;
        }
        @keyframes lmPulseDot {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.35);
            opacity: 0.75;
          }
        }

        :global(.lm-scanner) {
          animation: lmSweep 6s linear infinite;
          left: -120px;
        }
        @keyframes lmSweep {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(100vw + 120px));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.lm-ring),
          :global(.lm-scanner),
          :global(.lm-pulse-dot) {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
