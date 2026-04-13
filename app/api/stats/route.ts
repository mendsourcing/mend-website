import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  // Fetch live stats from GovPacking API
  let govpackingStats = {
    dlaContracts: 325,
    dollarAmount: 8000000,
    quotesReceived: 1243,
    ordersCompleted: 634,
    inProgress: 29,
    lastSynced: new Date().toISOString(),
  };

  try {
    const res = await fetch("https://govpacking.com/api/site/stats", {
      cache: "no-store",
    });
    if (res.ok) {
      govpackingStats = await res.json();
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
      yearsExperience: 14,
    },
    lastSynced: new Date().toISOString(),
  });

  resp.headers.set("Access-Control-Allow-Origin", "*");
  return resp;
}
