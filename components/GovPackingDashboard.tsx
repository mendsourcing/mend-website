"use client";

import { useEffect, useState } from "react";

interface GovPackingStats {
  dlaContracts: number;
  dollarAmount: number;
  quotesReceived: number;
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

  const cards = [
    { value: stats.dlaContracts.toLocaleString(), label: "DLA Contracts" },
    { value: formatDollar(stats.dollarAmount), label: "Contract Value" },
    { value: stats.quotesReceived.toLocaleString(), label: "Quotes Received" },
    { value: stats.ordersCompleted.toLocaleString(), label: "Orders Completed" },
    {
      value: stats.inProgress.toString(),
      label: "In Progress",
      live: true,
    },
  ];

  return (
    <section className="py-24 px-6 md:px-15 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-green-400 font-medium">
            Updated daily &middot; Last synced {formatDate(stats.lastSynced)}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cards.map((card) => (
            <div
              key={card.label}
              className="bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-2xl p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-black text-[#03ACED] mb-1">
                {card.value}
              </div>
              <div className="text-xs uppercase tracking-[2px] text-white/70 flex items-center justify-center gap-2">
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
