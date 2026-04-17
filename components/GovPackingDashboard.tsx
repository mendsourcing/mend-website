"use client";

import { useEffect, useRef, useState } from "react";

interface GovPackingStats {
  dlaContracts: number;
  dollarAmount: number;
  ordersCompleted: number;
  inProgress: number;
  lastSynced: string;
}

type Format = "comma" | "dollar" | "suffix";

function formatValue(n: number, format: Format, suffix = ""): string {
  if (format === "dollar") {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
    return `$${n}`;
  }
  if (format === "suffix") {
    return `${Math.round(n)}${suffix}`;
  }
  return new Intl.NumberFormat("en-US").format(Math.round(n));
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Smooth count-up using requestAnimationFrame + easeOutQuint for a satisfying
// slowdown. Respects prefers-reduced-motion (snaps straight to the value).
function AnimatedNumber({
  to,
  format = "comma",
  suffix = "",
  durationMs = 1600,
  delayMs = 0,
}: {
  to: number;
  format?: Format;
  suffix?: string;
  durationMs?: number;
  delayMs?: number;
}) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduce || to === 0) {
      setDisplay(to);
      return;
    }

    const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current - delayMs;
      if (elapsed < 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / durationMs, 1);
      setDisplay(to * easeOutQuint(progress));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(to);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [to, durationMs, delayMs]);

  return <>{formatValue(display, format, suffix)}</>;
}

// Static-value card that still gets a subtle fade-in on mount.
function StaticValue({ value }: { value: string }) {
  return <>{value}</>;
}

interface Card {
  label: string;
  animated: boolean;
  value: number | string;
  format?: Format;
  suffix?: string;
}

export default function GovPackingDashboard() {
  const [stats, setStats] = useState<GovPackingStats | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((data) => {
        if (data.govpacking) setStats(data.govpacking);
      })
      .catch(() => {});
  }, []);

  if (!stats) {
    return (
      <div className="hidden lg:flex flex-col gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white/[0.06] backdrop-blur-md border border-white/[0.1] rounded-xl py-4 px-6 w-[220px] animate-pulse"
          >
            <div className="h-8 bg-white/10 rounded mb-1" />
            <div className="h-3 bg-white/5 rounded w-2/3 mx-auto" />
          </div>
        ))}
      </div>
    );
  }

  const cards: Card[] = [
    { label: "DLA Contracts", animated: true, value: stats.dlaContracts, format: "comma" },
    { label: "Contract Value", animated: true, value: stats.dollarAmount, format: "dollar" },
    { label: "GovPacking Orders Completed", animated: true, value: stats.ordersCompleted, format: "comma" },
    { label: "GovPacking Orders In Progress", animated: true, value: stats.inProgress, format: "comma" },
    { label: "Manufacturing Partners", animated: true, value: 62, format: "comma" },
    { label: "Years Experience", animated: true, value: 16, format: "suffix", suffix: "+" },
  ];

  const renderValue = (c: Card, delayMs: number) =>
    c.animated ? (
      <AnimatedNumber
        to={c.value as number}
        format={c.format}
        suffix={c.suffix}
        delayMs={delayMs}
      />
    ) : (
      <StaticValue value={c.value as string} />
    );

  return (
    <>
      {/* Desktop: vertical stack — staggered fade-in + slide-from-right */}
      <div className="hidden lg:flex flex-col gap-3">
        <div className="flex items-center gap-1.5 justify-end mb-1">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-[10px] text-green-400/80 font-medium">
            Synced {formatDate(stats.lastSynced)}
          </span>
        </div>
        {cards.map((card, i) => (
          <div
            key={card.label}
            className="stat-card bg-white/[0.07] backdrop-blur-md border border-white/[0.12] rounded-xl py-3 px-5 text-right w-[320px] transition-all hover:border-[#03ACED]/40 hover:bg-white/[0.09]"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <div className="text-2xl font-black text-[#03ACED] leading-tight tabular-nums">
              {renderValue(card, i * 120)}
            </div>
            <div className="text-[10px] uppercase tracking-[1.5px] text-white/50 font-semibold flex items-center justify-end gap-1.5 mt-0.5 whitespace-nowrap">
              <span className="w-1 h-1 bg-green-400 rounded-full" />
              {card.label}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile/Tablet: 2-column grid */}
      <div className="lg:hidden w-full">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-[10px] text-green-400/80 font-medium">
            Synced {formatDate(stats.lastSynced)}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {cards.map((card, i) => (
            <div
              key={card.label}
              className="stat-card bg-white/[0.07] backdrop-blur-md border border-white/[0.12] rounded-xl py-3 px-3 text-center"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="text-xl sm:text-2xl font-black text-[#03ACED] leading-tight tabular-nums">
                {renderValue(card, i * 100)}
              </div>
              <div className="text-[9px] uppercase tracking-[1px] text-white/50 font-semibold flex items-center justify-center gap-1.5 mt-1">
                <span className="w-1 h-1 bg-green-400 rounded-full" />
                <span className="truncate">{card.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes statCardIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .stat-card {
          opacity: 0;
          animation: statCardIn 520ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .stat-card {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
