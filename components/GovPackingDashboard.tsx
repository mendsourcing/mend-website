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

  if (!stats) {
    return (
      <div className="hidden lg:flex flex-col gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white/[0.06] backdrop-blur-md border border-white/[0.1] rounded-xl py-4 px-6 w-[220px] animate-pulse">
            <div className="h-8 bg-white/10 rounded mb-1" />
            <div className="h-3 bg-white/5 rounded w-2/3 mx-auto" />
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    { value: stats.dlaContracts.toLocaleString(), label: "DLA Contracts", live: true },
    { value: formatDollar(stats.dollarAmount), label: "Contract Value", live: true },
    { value: stats.ordersCompleted.toLocaleString(), label: "GovPacking Orders Completed", live: true },
    { value: stats.inProgress.toString(), label: "GovPacking Orders In Progress", live: true },
    { value: "62", label: "Manufacturing Partners", live: true },
    { value: "16+", label: "Years Experience", live: true },
  ];

  return (
    <>
      {/* Desktop: vertical stack */}
      <div className="hidden lg:flex flex-col gap-3">
        <div className="flex items-center gap-1.5 justify-end mb-1">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-[10px] text-green-400/80 font-medium">
            Synced {formatDate(stats.lastSynced)}
          </span>
        </div>
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white/[0.07] backdrop-blur-md border border-white/[0.12] rounded-xl py-3 px-5 text-right w-[320px]"
          >
            <div className="text-2xl font-black text-[#03ACED] leading-tight">
              {card.value}
            </div>
            <div className="text-[10px] uppercase tracking-[1.5px] text-white/50 font-semibold flex items-center justify-end gap-1.5 mt-0.5 whitespace-nowrap">
              {card.live && (
                <span className="w-1 h-1 bg-green-400 rounded-full" />
              )}
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
          {cards.map((card) => (
            <div
              key={card.label}
              className="bg-white/[0.07] backdrop-blur-md border border-white/[0.12] rounded-xl py-3 px-3 text-center"
            >
              <div className="text-xl sm:text-2xl font-black text-[#03ACED] leading-tight">
                {card.value}
              </div>
              <div className="text-[9px] uppercase tracking-[1px] text-white/50 font-semibold flex items-center justify-center gap-1.5 mt-1">
                {card.live && (
                  <span className="w-1 h-1 bg-green-400 rounded-full" />
                )}
                <span className="truncate">{card.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
