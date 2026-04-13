"use client";

import { useEffect, useState } from "react";

interface GovPackingStats {
  dlaContracts: number;
  dollarAmount: number;
  ordersCompleted: number;
  inProgress: number;
  lastSynced: string;
}

function formatDollar(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount}`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function GovPackingDashboard() {
  const [stats, setStats] = useState<GovPackingStats | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((data) => {
        if (data.govpacking) {
          setStats(data.govpacking);
        }
      })
      .catch(() => {});
  }, []);

  if (!stats) return null;

  const topRow = [
    { value: stats.dlaContracts.toLocaleString(), label: "DLA Contracts", live: true },
    { value: formatDollar(stats.dollarAmount), label: "Contract Value", live: true },
    { value: stats.ordersCompleted.toLocaleString(), label: "GovPacking Orders Completed", live: true },
  ];

  const bottomRow = [
    { value: stats.inProgress.toString(), label: "GovPacking Orders In Progress", live: true },
    { value: "62", label: "Manufacturing Partners", live: false },
    { value: "16+", label: "Years Experience", live: false },
  ];

  return (
    <section className="py-16 px-6 md:px-15 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-[#0d1520]/75 backdrop-blur-[2px]" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-green-400/90 font-medium">
            Updated daily &middot; Last synced {formatDate(stats.lastSynced)}
          </span>
        </div>

        {/* Top row - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {topRow.map((card) => (
            <div
              key={card.label}
              className="bg-white/[0.07] backdrop-blur-md border border-white/[0.12] rounded-2xl py-6 px-8 text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-[#03ACED] mb-2">
                {card.value}
              </div>
              <div className="text-[11px] uppercase tracking-[2px] text-white/60 font-semibold flex items-center justify-center gap-2">
                {card.live && (
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                )}
                {card.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bottomRow.map((card) => (
            <div
              key={card.label}
              className="bg-white/[0.07] backdrop-blur-md border border-white/[0.12] rounded-2xl py-6 px-8 text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-[#03ACED] mb-2">
                {card.value}
              </div>
              <div className="text-[11px] uppercase tracking-[2px] text-white/60 font-semibold flex items-center justify-center gap-2">
                {card.live && (
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                )}
                {card.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
