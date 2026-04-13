import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "MeND Sourcing Solutions | Government Contracting at Peak Efficiency",
  description:
    "Simplifying government contracting. Veteran-owned, AS9100 & ISO9001 certified. GovPacking, GovScraper, GovTraining, and more.",
  keywords: [
    "government contracting",
    "procurement",
    "supply chain",
    "aerospace",
    "defense",
    "veteran owned",
    "SDVOSB",
    "GovPacking",
    "GovScraper",
    "GovTraining",
  ],
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
