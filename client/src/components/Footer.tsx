import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const companyLinks = [
  { label: "About Us", path: "/about" },
  { label: "Our Companies", path: "/companies" },
  { label: "What We Do", path: "/what-we-do" },
  { label: "Innovation", path: "/innovation" },
  { label: "Impact", path: "/#impact" },
];

const businessLinks = [
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
    <footer className="w-full bg-[#0B1220] text-white border-t border-white/10 pt-20 pb-12 overflow-hidden" data-testid="footer-main">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-9 w-9 rounded-md bg-white text-[#214ECF] inline-flex items-center justify-center text-base font-extrabold tracking-[-0.08em]"
              >
                H
              </span>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white">HEALWEAL</span>
                <span className="text-[11px] font-semibold text-[#22C1FF] tracking-widest uppercase">
                  Build Better.
                </span>
              </div>
            </div>

            <p className="text-[#98A2B3] text-sm leading-relaxed max-w-sm">
              Healweal builds, operates and scales businesses at the intersection of technology, entrepreneurship, and human needs. Creating enduring long-term value.
            </p>

            <div className="flex items-center gap-3 mt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#214ECF] hover:border-[#214ECF] transition-all duration-200 group"
                  data-testid={`link-social-${social.name.toLowerCase()}`}
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="w-4 h-4 brightness-0 invert opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Company */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Company</h3>
              <ul className="flex flex-col gap-2.5">
                {companyLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.path}>
                      <span className="text-sm text-[#98A2B3] hover:text-white transition-colors cursor-pointer inline-block">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Businesses */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Businesses</h3>
              <ul className="flex flex-col gap-2.5">
                {businessLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#98A2B3] hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Connect</h3>
              <ul className="flex flex-col gap-2.5">
                {connectLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.path}>
                      <span className="text-sm text-[#98A2B3] hover:text-white transition-colors cursor-pointer inline-block">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Legal</h3>
              <ul className="flex flex-col gap-2.5">
                {legalLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.path}>
                      <span 
                        className="text-sm text-[#98A2B3] hover:text-white transition-colors cursor-pointer inline-block"
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

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#667085]">
          <p>© 2026 Healweal. All Rights Reserved.</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00B388] animate-pulse" />
            <span className="text-[#98A2B3]">Operating globally across 5 industry sectors</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
