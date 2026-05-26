import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mendsourcing.com"),
  title: {
    default: "MeND Sourcing Solutions | Government Contracting at Peak Efficiency",
    template: "%s | MeND Sourcing Solutions",
  },
  description:
    "Simplifying government contracting. Veteran-owned SDVOSB, AS9100 & ISO9001 certified, pursuing CMMC Level 2. GovPacking, GovScraper, GovTraining, and more.",
  keywords: [
    "government contracting",
    "procurement",
    "supply chain",
    "aerospace",
    "defense",
    "veteran owned",
    "SDVOSB",
    "CMMC",
    "NIST 800-171",
    "GovPacking",
    "GovScraper",
    "GovTraining",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mendsourcing.com",
    siteName: "MeND Sourcing Solutions",
    title: "MeND Sourcing Solutions | Government Contracting at Peak Efficiency",
    description:
      "Simplifying government contracting. Veteran-owned SDVOSB, AS9100 & ISO9001 certified, pursuing CMMC Level 2.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MeND Sourcing Solutions | Government Contracting at Peak Efficiency",
    description:
      "Simplifying government contracting. Veteran-owned SDVOSB, AS9100 & ISO9001 certified, pursuing CMMC Level 2.",
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
  icons: {
    icon: "/favicon-mend.png",
    apple: "/favicon-mend.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />

        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
