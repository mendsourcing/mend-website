"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface NavChild {
  label: string;
  href: string;
  // Sub-page of the item above it (rendered indented)
  indent?: boolean;
}

interface NavItem {
  label: string;
  // Omitted for pure menu headers like "GovCon Services"
  href?: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  {
    label: "GovCon Services",
    children: [
      { label: "GovScraper", href: "/govscraper" },
      { label: "GovPacking", href: "/packaging-logistics" },
      { label: "GovAdmin - Post Award", href: "/govadmin" },
      { label: "GovTraining", href: "/govtraining" },
      { label: "GovTraining MasterClass", href: "/masterclass", indent: true },
      { label: "GovTraining Jumpstart!", href: "/jumpstart", indent: true },
      { label: "Upcoming Courses", href: "/upcoming-courses", indent: true },
    ],
  },
  {
    label: "Government Contracting",
    href: "/government-contracting",
    children: [
      {
        label: "Gov't & Defense Contracting",
        href: "/government-defense-contracting",
      },
      { label: "Part Identifier / Stock List", href: "/part-identifier" },
      { label: "Federal / CMMC", href: "https://security.mendsourcing.com" },
    ],
  },
  {
    label: "Stay Connected",
    href: "/newsletter",
    children: [
      { label: "The Weekly MeND Newsletter", href: "/newsletter" },
      { label: "GovCon Vertical Guide", href: "/guide" },
    ],
  },
  {
    label: "About Us",
    href: "/about-us",
    children: [
      { label: "Quality", href: "/quality" },
      { label: "Contact Us", href: "/#contact" },
      { label: "PO - Terms & Conditions", href: "/po-terms-conditions" },
    ],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 w-full z-50 px-6 md:px-15 h-[72px] flex items-center justify-between bg-[#0a0a0a]/85 backdrop-blur-xl border-b border-[#03ACED]/15">
      <Link href="/" className="flex-shrink-0">
        <Image
          src="/images/mend-logo.png"
          alt="MeND Sourcing Solutions"
          width={160}
          height={52}
          className="h-11 w-auto"
          priority
        />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden lg:flex items-center gap-8">
        {navItems.map((item) => (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() =>
              item.children && setOpenDropdown(item.label)
            }
            onMouseLeave={() => setOpenDropdown(null)}
          >
            {item.href ? (
              <Link
                href={item.href}
                className="text-[#ccc] text-sm font-medium hover:text-[#03ACED] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={openDropdown === item.label}
                onClick={() =>
                  setOpenDropdown(openDropdown === item.label ? null : item.label)
                }
                className="text-[#ccc] text-sm font-medium hover:text-[#03ACED] transition-colors inline-flex items-center gap-1"
              >
                {item.label}
                <svg className="w-3 h-3 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
            {item.children && openDropdown === item.label && (
              <div className="absolute top-full left-0 pt-2 min-w-[240px]">
                <div className="bg-[#111] border border-white/10 rounded-lg py-2 shadow-xl">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block py-2 text-sm hover:text-[#03ACED] hover:bg-white/5 transition-colors ${child.indent ? "pl-8 pr-4 text-[13px] text-[#aaa]" : "px-4 text-[#ccc]"}`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        <Link
          href="/#contact"
          className="bg-[#03ACED] text-black px-6 py-2.5 rounded-md font-semibold text-sm hover:bg-[#02a0db] transition-colors"
        >
          Get a Quote
        </Link>
      </div>

      {/* Mobile Toggle */}
      <button
        className="lg:hidden text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {mobileOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-[72px] left-0 w-full bg-[#0a0a0a]/98 backdrop-blur-xl border-b border-white/10 py-6 px-6 max-h-[calc(100vh-72px)] overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.label} className="mb-4">
              {item.href ? (
                <Link
                  href={item.href}
                  className="block text-white font-medium mb-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <span className="block text-white font-medium mb-2">{item.label}</span>
              )}
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={`block py-1 text-sm hover:text-[#03ACED] ${child.indent ? "pl-8 text-[#999]" : "pl-4 text-[#bbb]"}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          <Link
            href="/#contact"
            className="block mt-4 bg-[#03ACED] text-black text-center px-6 py-3 rounded-md font-semibold"
            onClick={() => setMobileOpen(false)}
          >
            Get a Quote
          </Link>
        </div>
      )}
    </nav>
  );
}
