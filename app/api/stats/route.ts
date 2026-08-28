import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Live source of truth: GovPacking site stats API. Returns all five metrics.
// Numeric fields may arrive as strings — coerce before use.
const STATS_URL = "https://govpacking.com/api/site/stats";

// Fallbacks only used if the upstream fetch fails (last known values, 2026-08-28)
const FALLBACK = {
  dlaContracts: 351,
  dollarAmount: 10442460,
  quotesReceived: 1705,
  ordersCompleted: 142,
  inProgress: 27,
};

function num(v: unknown, fallback: number): number {
  const n = typeof v === "string" ? parseFloat(v) : typeof v === "number" ? v : NaN;
  return Number.isFinite(n) ? n : fallback;
}

export async function GET() {
  let govpackingStats = { ...FALLBACK, lastSynced: new Date().toISOString() };

  try {
    const res = await fetch(STATS_URL, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      govpackingStats = {
        dlaContracts: num(data.dlaContracts, FALLBACK.dlaContracts),
        dollarAmount: num(data.dollarAmount, FALLBACK.dollarAmount),
        quotesReceived: num(data.quotesReceived, FALLBACK.quotesReceived),
        ordersCompleted: num(data.ordersCompleted, FALLBACK.ordersCompleted),
        inProgress: num(data.inProgress, FALLBACK.inProgress),
        lastSynced: typeof data.lastSynced === "string" ? data.lastSynced : new Date().toISOString(),
      };
    }
  } catch {
    // Use fallback values above
  }

  const resp = NextResponse.json({
    site: "mend-website",
    govpacking: govpackingStats,
    company: {
      totalContracts: govpackingStats.dlaContracts,
      manufacturingPartners: 62,
      yearsExperience: new Date().getFullYear() - 2010,
    },
    lastSynced: govpackingStats.lastSynced,
  });

  resp.headers.set("Access-Control-Allow-Origin", "*");
  return resp;
}
