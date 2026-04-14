import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  // Fetch live stats from MeND Services CRM
  let govpackingStats = {
    dlaContracts: 325,
    dollarAmount: 8000000,
    quotesReceived: 1019,
    ordersCompleted: 634,
    inProgress: 29,
    lastSynced: new Date().toISOString(),
  };

  try {
    const res = await fetch("https://services.mendsourcing.com/api/govpacking-stats", {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      govpackingStats = {
        ...govpackingStats,
        quotesReceived: data.quotesReceived ?? govpackingStats.quotesReceived,
        ordersCompleted: data.ordersCompleted ?? govpackingStats.ordersCompleted,
        lastSynced: new Date().toISOString(),
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
      yearsExperience: 16,
    },
    lastSynced: new Date().toISOString(),
  });

  resp.headers.set("Access-Control-Allow-Origin", "*");
  return resp;
}
