import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GovAdmin — Post-Award Contract Administration for DLA & DoD Suppliers",
  description:
    "You won the award. GovAdmin handles everything after: WAWF receiving reports and invoices, post-award requests, SAM.gov, DIBBS, JCP, SBA and SPRS upkeep, and award tracking. Run by the team behind 350+ DLA awards.",
  alternates: { canonical: "/govadmin" },
  openGraph: {
    title: "GovAdmin — Post-Award Contract Administration",
    description:
      "Receiving reports, invoices, post-award requests and registration upkeep for DLA & DoD suppliers. We don't bid for you. We run what you win.",
    url: "https://mendsourcing.com/govadmin",
    type: "website",
  },
};

export default function GovAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
