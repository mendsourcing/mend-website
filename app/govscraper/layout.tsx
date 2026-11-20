import type { Metadata } from "next";

const title = "GovScraper | Your DLA RFQs, Pulled Daily";
const description =
  "GovScraper scrapes 3,000+ DLA solicitations a day and delivers the RFQs that match your CAGE and capabilities. Free CAGE tier, 7-day Pro trial. Built by MeND Sourcing Solutions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/govscraper" },
  openGraph: {
    type: "website",
    url: "https://mendsourcing.com/govscraper",
    siteName: "MeND Sourcing Solutions",
    title,
    description,
    images: [{ url: "/images/og-govscraper.png", width: 1200, height: 630, alt: "GovScraper by MeND. Your DLA RFQs, pulled daily." }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/og-govscraper.png"],
  },
};

export default function GovScraperLayout({ children }: { children: React.ReactNode }) {
  return children;
}
