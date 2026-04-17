"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CompetenceCurve — animated SVG diagram for the GovTraining page.
 *
 * Draws the confidence-vs-competency curve from left to right when it enters
 * the viewport, plotting the four stage badges (1→4) with their labels fading
 * in sequentially at the moment the curve passes each point.
 *
 * Timing (total ≈ 4.6s):
 *   - 0.0s  curve starts drawing from the origin
 *   - 0.6s  stage 1 + "You don't know what you don't know"
 *   - 1.4s  "Phase of Struggle" phase backdrop fades in
 *   - 2.0s  stage 2 + "Reality hits" + "Valley of Despair"
 *   - 2.8s  success phase backdrop fades in
 *   - 3.0s  stage 3 + "Building confidence"
 *   - 4.0s  stage 4 + "True Mastery" + "Competence + Confidence"
 *   - 4.4s  "GOVTRAINING GETS YOU HERE" callout
 *
 * Respects prefers-reduced-motion.
 */
export default function CompetenceCurve() {
  const ref = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const r =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (r) {
      setReduce(true);
      setPlay(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`cc-root ${play ? "cc-play" : ""} ${reduce ? "cc-reduce" : ""} max-w-4xl mx-auto`}>
      {/* ============ MOBILE — vertical stage list ============ */}
      <div className="md:hidden bg-[#111318] rounded-2xl p-6 border border-white/[0.06]">
        <div className="text-[10px] uppercase tracking-[2.5px] text-[#03ACED] font-bold mb-6 text-center">
          The Learning Journey
        </div>
        <div className="space-y-5">
          {[
            { num: "1", color: "#E94615", title: "You don't know", sub: "what you don't know", phase: "" },
            { num: "2", color: "#E94615", title: "Reality hits", sub: "Valley of Despair", phase: "Phase of Struggle" },
            { num: "3", color: "#03ACED", title: "Building", sub: "confidence", phase: "GovTraining gets you here" },
            { num: "4", color: "#22c55e", title: "True Mastery", sub: "Competence + Confidence", phase: "" },
          ].map((s, i) => (
            <div key={s.num} className="cc-mstage flex items-start gap-4" style={{ animationDelay: `${i * 400 + 300}ms` }}>
              <div
                className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-sm"
                style={{ backgroundColor: s.color }}
              >
                {s.num}
              </div>
              <div className="flex-1 pt-1.5">
                <div className="text-[15px] font-bold text-white">{s.title}</div>
                <div className="text-[13px] text-[#999]">{s.sub}</div>
                {s.phase && (
                  <div
                    className="mt-1 text-[10px] uppercase tracking-[1.5px] font-bold"
                    style={{ color: s.num === "3" ? "#03ACED" : "#E94615" }}
                  >
                    {s.phase}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-5 border-t border-white/10 text-center">
          <div className="text-[10px] uppercase tracking-[2px] text-[#03ACED] font-bold">
            From Stage 1 → Stage 4
          </div>
          <div className="text-xs text-white/60 mt-1">Our goal: get you to true mastery</div>
        </div>
      </div>

      {/* ============ DESKTOP — animated SVG ============ */}
      <svg viewBox="0 0 700 420" className="hidden md:block w-full" xmlns="http://www.w3.org/2000/svg">
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

        {/* Defs */}
        <defs>
          <linearGradient id="struggleGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E94615" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#E94615" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="successGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#03ACED" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#03ACED" stopOpacity="0" />
          </linearGradient>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#03ACED" />
          </marker>
        </defs>

        {/* Phase backgrounds — fade in at their timings */}
        <rect className="cc-phase cc-phase-struggle" x="190" y="50" width="220" height="300" fill="url(#struggleGrad)" rx="4" />
        <rect className="cc-phase cc-phase-success" x="410" y="50" width="250" height="300" fill="url(#successGrad)" rx="4" />

        {/* The curve — animated stroke-dash drawing */}
        <path
          className="cc-curve"
          d="M 80,330 C 110,320 140,100 190,90 C 240,80 270,310 330,320 C 370,325 420,280 480,190 C 530,110 580,85 640,75"
          fill="none"
          stroke="#03ACED"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={1}
        />

        {/* Stage dots — fade/pop in when curve arrives */}
        <g className="cc-stage cc-stage-1">
          <circle cx="190" cy="90" r="7" fill="#E94615" />
        </g>
        <g className="cc-stage cc-stage-2">
          <circle cx="330" cy="320" r="7" fill="#E94615" />
        </g>
        <g className="cc-stage cc-stage-3">
          <circle cx="480" cy="190" r="7" fill="#03ACED" />
        </g>
        <g className="cc-stage cc-stage-4">
          <circle cx="640" cy="75" r="7" fill="#22c55e" />
        </g>

        {/* Stage 1 label */}
        <g className="cc-label cc-label-1">
          <rect x="148" y="58" width="22" height="22" rx="4" fill="#E94615" />
          <text x="159" y="74" fill="white" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">1</text>
          <text x="178" y="68" fill="#ccc" fontSize="11" fontWeight="600" fontFamily="Inter,sans-serif">You don&apos;t know</text>
          <text x="178" y="82" fill="#999" fontSize="10" fontFamily="Inter,sans-serif">what you don&apos;t know</text>
        </g>

        {/* Phase of Struggle label */}
        <text className="cc-label cc-label-struggle" x="300" y="250" fill="#E94615" fontSize="14" fontWeight="800" textAnchor="middle" fontFamily="Inter,sans-serif" opacity="0.5">PHASE OF STRUGGLE</text>

        {/* Stage 2 label */}
        <g className="cc-label cc-label-2">
          <rect x="255" y="278" width="22" height="22" rx="4" fill="#E94615" />
          <text x="266" y="294" fill="white" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">2</text>
          <text x="285" y="290" fill="#ccc" fontSize="11" fontWeight="600" fontFamily="Inter,sans-serif">Reality hits</text>
          <text x="330" y="348" fill="#E94615" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">Valley of Despair</text>
        </g>

        {/* Stage 3 label */}
        <g className="cc-label cc-label-3">
          <rect x="452" y="160" width="22" height="22" rx="4" fill="#03ACED" />
          <text x="463" y="176" fill="white" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">3</text>
          <text x="483" y="158" fill="#ccc" fontSize="11" fontWeight="600" fontFamily="Inter,sans-serif">Building</text>
          <text x="483" y="172" fill="#999" fontSize="10" fontFamily="Inter,sans-serif">confidence</text>
        </g>

        {/* Stage 4 label */}
        <g className="cc-label cc-label-4">
          <rect x="610" y="48" width="22" height="22" rx="4" fill="#22c55e" />
          <text x="621" y="64" fill="white" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">4</text>
          <text x="595" y="43" fill="#22c55e" fontSize="11" fontWeight="700" fontFamily="Inter,sans-serif">True Mastery</text>
          <text x="595" y="31" fill="#22c55e" fontSize="10" fontFamily="Inter,sans-serif">Competence + Confidence</text>
        </g>

        {/* GovTraining callout */}
        <g className="cc-label cc-callout">
          <rect x="385" y="285" width="250" height="40" rx="8" fill="#03ACED" fillOpacity="0.15" stroke="#03ACED" strokeWidth="1.5" />
          <text x="510" y="305" fill="#03ACED" fontSize="13" fontWeight="800" textAnchor="middle" fontFamily="Inter,sans-serif">GOVTRAINING GETS YOU HERE</text>
          <text x="510" y="319" fill="#03ACED" fontSize="10" fontWeight="500" textAnchor="middle" fontFamily="Inter,sans-serif" opacity="0.7">From Stage 1 → Stage 4</text>
          <path d="M 560,285 C 580,260 610,200 630,120" fill="none" stroke="#03ACED" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#arrowhead)" />
        </g>
      </svg>

      <style jsx>{`
        /* ---------- initial states (pre-animation) ---------- */
        :global(.cc-root .cc-curve) {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
        }
        :global(.cc-root .cc-phase),
        :global(.cc-root .cc-stage),
        :global(.cc-root .cc-label) {
          opacity: 0;
        }

        /* ---------- play state ---------- */
        :global(.cc-play .cc-curve) {
          animation: ccDraw 4s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        @keyframes ccDraw {
          to {
            stroke-dashoffset: 0;
          }
        }

        /* Phase backdrops */
        :global(.cc-play .cc-phase-struggle) {
          animation: ccFade 600ms ease-out 1.4s forwards;
        }
        :global(.cc-play .cc-phase-success) {
          animation: ccFade 600ms ease-out 2.8s forwards;
        }

        /* Stage dots — pop in when curve arrives. transform-origin set per dot */
        :global(.cc-play .cc-stage) {
          animation: ccPop 500ms cubic-bezier(0.22, 1.2, 0.36, 1) forwards;
          transform-box: fill-box;
          transform-origin: center;
        }
        :global(.cc-play .cc-stage-1) { animation-delay: 0.55s; }
        :global(.cc-play .cc-stage-2) { animation-delay: 1.95s; }
        :global(.cc-play .cc-stage-3) { animation-delay: 2.95s; }
        :global(.cc-play .cc-stage-4) { animation-delay: 3.95s; }

        @keyframes ccPop {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          60% {
            opacity: 1;
            transform: scale(1.6);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Text labels — fade + slight slide in */
        :global(.cc-play .cc-label) {
          animation: ccLabel 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        :global(.cc-play .cc-label-1) { animation-delay: 0.75s; }
        :global(.cc-play .cc-label-struggle) { animation-delay: 1.4s; }
        :global(.cc-play .cc-label-2) { animation-delay: 2.15s; }
        :global(.cc-play .cc-label-3) { animation-delay: 3.15s; }
        :global(.cc-play .cc-label-4) { animation-delay: 4.15s; }
        :global(.cc-play .cc-callout) { animation-delay: 4.45s; }

        @keyframes ccFade {
          to {
            opacity: 1;
          }
        }
        @keyframes ccLabel {
          0% {
            opacity: 0;
            transform: translateY(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Mobile stages — staggered fade+slide in when play triggers */
        :global(.cc-root .cc-mstage) {
          opacity: 0;
          transform: translateX(-8px);
        }
        :global(.cc-play .cc-mstage) {
          animation: ccMStageIn 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes ccMStageIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Reduced motion — snap to final state */
        :global(.cc-reduce .cc-curve) {
          stroke-dashoffset: 0;
        }
        :global(.cc-reduce .cc-phase),
        :global(.cc-reduce .cc-stage),
        :global(.cc-reduce .cc-label),
        :global(.cc-reduce .cc-mstage) {
          opacity: 1;
          transform: none;
        }
      `}</style>
    </div>
  );
}
