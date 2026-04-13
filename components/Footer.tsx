import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { label: "Part Identifier", href: "/part-identifier" },
  { label: "Aerospace Distribution", href: "/government-contracting" },
  { label: "PPE & Safety", href: "/ppe-safety-distribution" },
  {
    label: "Gov't & Defense Contracting",
    href: "/government-defense-contracting",
  },
  { label: "GovPacking", href: "/packaging-logistics" },
  { label: "GovTraining", href: "/govtraining" },
  { label: "Quality", href: "/quality" },
  { label: "Terms & Conditions", href: "/po-terms-conditions" },
];

const socialLinks = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@mendsourcing",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/supertris10",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tristanwthomas/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 md:px-15 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="/images/mend-logo.png"
              alt="MeND Sourcing Solutions"
              width={160}
              height={52}
              className="h-11 w-auto mb-4"
            />
            <p className="text-sm text-[#aaa] leading-relaxed">
              Simplifying government contracting at peak efficiency. Veteran
              owned &amp; operated.
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#bbb] hover:text-[#03ACED] hover:bg-white/10 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-[2px] text-[#03ACED] font-semibold mb-6">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#aaa] hover:text-[#03ACED] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[2px] text-[#03ACED] font-semibold mb-6">
              Contact
            </h4>
            <div className="space-y-4 text-sm text-[#aaa]">
              <p>1713 E. 58th Pl. Unit G</p>
              <p>Los Angeles, CA 90001</p>
              <a
                href="mailto:sales@mendsourcing.com"
                className="block hover:text-[#03ACED] transition-colors"
              >
                sales@mendsourcing.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#999]">
            &copy; {new Date().getFullYear()} MeND Sourcing Solutions. All
            rights reserved.
          </p>
          <p className="text-xs text-[#999]">
            Veteran Owned Small Business (SDVOSB)
          </p>
        </div>
      </div>
    </footer>
  );
}
