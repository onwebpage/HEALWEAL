import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";

const companyLinks = [
  { label: "About Us", path: "/about" },
  { label: "Our Platform", path: "/companies" },
  { label: "What We Do", path: "/what-we-do" },
  { label: "Innovation", path: "/innovation" },
  { label: "Impact", path: "/#impact" },
];

const platformLinks = [
  { label: "Hapdax", path: "https://hapdax.in/", external: true },
  { label: "Kepwe", path: "https://kepwe.in/", external: true },
  { label: "Zelevos", path: "https://zelevos.com/", external: true },
  { label: "Thinkatic", path: "https://thinkatic.com/", external: true },
  { label: "Healweal Business School", path: "https://healwealbusinessschool.in/", external: true },
];

const connectLinks = [
  { label: "Careers", path: "/careers" },
  { label: "Insights", path: "/insights" },
  { label: "Partnerships", path: "/contact" },
  { label: "Contact", path: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Terms of Use", path: "/terms-of-use" },
  { label: "Cookie Policy", path: "/privacy-policy#cookies" },
  { label: "Disclaimer", path: "/disclaimer" },
];

const socialLinks = [
  { name: "LinkedIn", url: "https://www.linkedin.com/company/healwealin/", icon: "/figmaAssets/linkedin.svg" },
  { name: "Instagram", url: "https://www.instagram.com/healwealin/", icon: "/figmaAssets/instagram.svg" },
  { name: "X (Twitter)", url: "https://x.com/Healwealin", icon: "/figmaAssets/twitter.svg" },
  { name: "YouTube", url: "https://www.youtube.com/@Healwealin", icon: "/figmaAssets/youtube.svg" },
];

export const Footer = () => {
  return (
    <footer className="w-full bg-[#FAFAFC] text-black border-t border-black/[0.08] pt-16 pb-12 overflow-hidden" data-testid="footer-main">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 pb-12 border-b border-black/[0.08]">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <Link href="/" className="inline-block">
              <img
                src="/healweal-logo-full.png"
                alt="Healweal — Build Better"
                className="h-9 w-auto object-contain"
              />
            </Link>

            <p className="text-[#52525B] text-sm leading-relaxed max-w-sm font-normal">
              Healweal builds, operates and scales businesses at the intersection of technology, entrepreneurship, and human needs. Creating enduring long-term value.
            </p>

            <div className="flex items-center gap-2.5 mt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-8 h-8 rounded-full bg-white border border-black/[0.10] flex items-center justify-center hover:bg-black hover:border-black transition-all duration-200 group shadow-xs"
                  data-testid={`link-social-${social.name.toLowerCase().replace(/[\s()]/g, "-")}`}
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="w-3.5 h-3.5 opacity-70 group-hover:brightness-0 group-hover:invert group-hover:opacity-100 transition-all"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Company */}
            <div className="flex flex-col gap-3.5">
              <h3 className="text-xs font-bold text-black uppercase tracking-wider">Company</h3>
              <ul className="flex flex-col gap-2.5">
                {companyLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.path}>
                      <span className="text-[13.5px] text-[#52525B] hover:text-black transition-colors cursor-pointer inline-block">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform */}
            <div className="flex flex-col gap-3.5">
              <h3 className="text-xs font-bold text-black uppercase tracking-wider">Platform</h3>
              <ul className="flex flex-col gap-2.5">
                {platformLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13.5px] text-[#52525B] hover:text-black transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="flex flex-col gap-3.5">
              <h3 className="text-xs font-bold text-black uppercase tracking-wider">Connect</h3>
              <ul className="flex flex-col gap-2.5">
                {connectLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.path}>
                      <span className="text-[13.5px] text-[#52525B] hover:text-black transition-colors cursor-pointer inline-block">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-3.5">
              <h3 className="text-xs font-bold text-black uppercase tracking-wider">Legal</h3>
              <ul className="flex flex-col gap-2.5">
                {legalLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.path}>
                      <span 
                        className="text-[13.5px] text-[#52525B] hover:text-black transition-colors cursor-pointer inline-block"
                        data-testid={`link-legal-${item.label.toLowerCase().replace(/ /g, "-")}`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <p>© 2026 Healweal. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy-policy">
              <span className="hover:text-black transition-colors cursor-pointer">Privacy Policy</span>
            </Link>
            <Link href="/terms-of-use">
              <span className="hover:text-black transition-colors cursor-pointer">Terms of Use</span>
            </Link>
            <Link href="/disclaimer">
              <span className="hover:text-black transition-colors cursor-pointer">Legal</span>
            </Link>
            <Link href="/about">
              <span className="hover:text-black transition-colors cursor-pointer">Site Map</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
