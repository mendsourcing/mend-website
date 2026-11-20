import type { Metadata } from "next";

const title = "GovPacking | MIL-STD Packaging & Logistics for DLA Awards";
const description =
  "MIL-STD-2073 and MIL-STD-129 packaging, labeling, and logistics for government contractors. AS9100 and ISO9001 certified. Ship your DLA awards right the first time with MeND Sourcing Solutions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/packaging-logistics" },
  openGraph: {
    type: "website",
    url: "https://mendsourcing.com/packaging-logistics",
    siteName: "MeND Sourcing Solutions",
    title,
    description,
    images: [{ url: "/images/og-packaging.png", width: 1200, height: 630, alt: "GovPacking by MeND. MIL-STD packaging done right." }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/og-packaging.png"],
  },
};

export default function PackagingLogisticsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
