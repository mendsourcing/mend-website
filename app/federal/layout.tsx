import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Federal & Cybersecurity — CMMC Level 2 Compliance",
  description:
    "MeND is a DoD contractor and SDVOSB pursuing CMMC Level 2 certification. NIST SP 800-171 Rev. 2 controls implemented across 14 security domains. CMMC enforcement begins November 2026, full implementation by 2028.",
  keywords: [
    "CMMC",
    "CMMC Level 2",
    "Cybersecurity Maturity Model Certification",
    "NIST SP 800-171",
    "DoD contractor",
    "SDVOSB",
    "DLA cybersecurity",
    "Defense Industrial Base",
    "DFARS 252.204-7012",
    "DFARS 252.204-7021",
    "DFARS 252.204-7025",
    "CUI",
    "Controlled Unclassified Information",
    "FCI",
    "Federal Contract Information",
    "C3PAO",
    "Secureframe",
    "MeND Sourcing Solutions",
  ],
  alternates: {
    canonical: "https://mendsourcing.com/federal",
  },
  openGraph: {
    title: "Federal & Cybersecurity — CMMC Level 2 Compliance | MeND Sourcing Solutions",
    description:
      "Securing the defense supply chain through CMMC compliance. MeND is actively pursuing CMMC Level 2 certification under NIST SP 800-171 Rev. 2.",
    url: "https://mendsourcing.com/federal",
    siteName: "MeND Sourcing Solutions",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Federal & Cybersecurity — CMMC Level 2 Compliance | MeND Sourcing Solutions",
    description:
      "Securing the defense supply chain through CMMC compliance. CMMC enforcement begins November 2026, full implementation by 2028.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function FederalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
