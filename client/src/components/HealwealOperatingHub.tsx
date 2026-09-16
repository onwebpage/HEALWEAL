import { useState } from "react";
import { motion } from "framer-motion";
import { companyBrandAssets } from "@/lib/companyBrandAssets";

interface CompanyHubNode {
  id: string;
  name: string;
  subtitle: string;
  url: string;
  icon: string;
  logoClass?: string;
  // Polar placement relative to center: angle in degrees, radius in px
  angle: number;
}

const HUB_COMPANIES: CompanyHubNode[] = [
  {
    id: "thinkatic",
    name: "Thinkatic",
    subtitle: "AI & Cloud",
    url: "https://thinkatic.com/",
    icon: companyBrandAssets.thinkatic.icon,
    logoClass: companyBrandAssets.thinkatic.logoClass,
    angle: 216, // Top-Left (~-144°)
  },
  {
    id: "hbs",
    name: "HBS",
    subtitle: "EdTech",
    url: "https://healwealbusinessschool.in/",
    icon: companyBrandAssets.hbs.icon,
    logoClass: companyBrandAssets.hbs.logoClass,
    angle: 288, // Top-Right (~-72°)
  },
  {
    id: "hapdax",
    name: "Hapdax",
    subtitle: "Healthcare",
    url: "https://hapdax.in/",
    icon: companyBrandAssets.hapdax.icon,
    logoClass: companyBrandAssets.hapdax.logoClass,
    angle: 0, // Middle-Right
  },
  {
    id: "kepwe",
    name: "Kepwe",
    subtitle: "FinTech",
    url: "https://kepwe.in/",
    icon: companyBrandAssets.kepwe.icon,
    logoClass: companyBrandAssets.kepwe.logoClass,
    angle: 72, // Bottom-Center / slightly right
  },
  {
    id: "zelevos",
    name: "Zelevos",
    subtitle: "Travel & Experiences",
    url: "https://zelevos.com/",
    icon: companyBrandAssets.zelevos.icon,
    logoClass: companyBrandAssets.zelevos.logoClass,
    angle: 144, // Bottom-Left
  },
];

export const HealwealOperatingHub = () => {
  // Thinkatic is selected by default
  const [activeId, setActiveId] = useState<string>("thinkatic");

  // Orbit radius for desktop layout
  const ORBIT_RADIUS = 182;

  return (
    <div
      className="relative w-full max-w-[680px] mx-auto overflow-hidden rounded-3xl border border-black/[0.08] bg-white py-8 sm:py-16 px-3 sm:px-4 flex flex-col items-center justify-center select-none shadow-xs"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.035) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
      }}
      data-testid="healweal-operating-hub"
    >
      {/* Desktop & Tablet Orbital Arena (>= 640px) */}
      <div className="hidden sm:flex relative w-[560px] md:w-[620px] h-[520px] sm:h-[540px] items-center justify-center">
        {/* Outer subtle circular ring */}
        <div
          className="absolute rounded-full border border-black/[0.05] pointer-events-none w-[500px] h-[500px] sm:w-[520px] sm:h-[520px]"
          aria-hidden="true"
        />

        {/* Inner dashed orbital ring line */}
        <div
          className="absolute rounded-full border border-dashed border-black/[0.10] pointer-events-none w-[340px] h-[340px] sm:w-[364px] sm:h-[364px]"
          aria-hidden="true"
        />

        {/* Center Card: HEALWEAL OPERATING HUB (White normally, turns black on hover with white text) */}
        <a
          href="https://healwealcorp.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="z-20 w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-white text-black shadow-md flex flex-col items-center justify-center p-5 border border-black/[0.12] text-center cursor-pointer transition-all duration-300 hover:bg-black hover:text-white hover:border-black hover:scale-[1.03] hover:shadow-xl group"
          data-testid="hub-center-card"
          title="Healweal Operating Hub — healwealcorp.in"
        >
          {/* Status dot at top center: black normally, white on hover */}
          <div className="w-2.5 h-2.5 rounded-full bg-black mb-3 group-hover:bg-white group-hover:scale-110 transition-all duration-300" />
          <span className="font-extrabold text-base sm:text-lg tracking-tight text-black group-hover:text-white leading-none transition-colors duration-300">
            HEALWEAL
          </span>
          <span className="text-[10px] sm:text-[11px] text-[#71717A] group-hover:text-[#D4D4D8] tracking-wider uppercase font-semibold mt-1.5 transition-colors duration-300">
            OPERATING HUB
          </span>
        </a>

        {/* 5 Satellite Brand Cards orbiting the center */}
        {HUB_COMPANIES.map((company) => {
          const rad = (company.angle * Math.PI) / 180;
          const x = Math.round(Math.cos(rad) * ORBIT_RADIUS);
          const y = Math.round(Math.sin(rad) * ORBIT_RADIUS);
          const isActive = activeId === company.id;

          return (
            <div
              key={company.id}
              className="absolute z-30 transition-all duration-300"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
              onMouseEnter={() => setActiveId(company.id)}
              onFocus={() => setActiveId(company.id)}
            >
              <a
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`hub-company-${company.id}`}
                className={`group flex items-center gap-3 px-4 py-3 rounded-2xl bg-white transition-all duration-200 cursor-pointer min-w-[155px] ${
                  isActive
                    ? "border-2 border-black shadow-md scale-[1.03]"
                    : "border border-black/[0.08] shadow-xs hover:border-black/[0.25]"
                }`}
                title={`Visit ${company.name} — ${company.url}`}
              >
                {/* Logo container */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-black/[0.06] bg-white flex items-center justify-center flex-shrink-0 p-1">
                  <img
                    src={company.icon}
                    alt={`${company.name} logo`}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Company Name & Subtitle */}
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-black leading-snug">
                    {company.name}
                  </span>
                  <span className="text-xs text-[#71717A] font-medium leading-none mt-0.5">
                    {company.subtitle}
                  </span>
                </div>
              </a>
            </div>
          );
        })}
      </div>

      {/* Mobile Adaptive Layout (< 640px) */}
      <div className="sm:hidden w-full flex flex-col items-center gap-5 relative px-1">
        {/* Subtle background dashed orbit arc */}
        <div
          className="absolute top-8 left-1/2 -translate-x-1/2 w-[240px] h-[240px] rounded-full border border-dashed border-black/[0.08] pointer-events-none"
          aria-hidden="true"
        />

        {/* Center Card */}
        <a
          href="https://healwealcorp.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="z-10 w-36 h-32 rounded-2xl bg-white text-black shadow-md flex flex-col items-center justify-center p-3 border border-black/[0.12] text-center transition-all active:scale-95 hover:bg-black hover:text-white hover:border-black group"
          data-testid="hub-center-card-mobile"
          title="Healweal Operating Hub — healwealcorp.in"
        >
          <div className="w-2 h-2 rounded-full bg-black mb-2 group-hover:bg-white transition-colors" />
          <span className="font-extrabold text-sm tracking-tight text-black group-hover:text-white leading-none transition-colors">
            HEALWEAL
          </span>
          <span className="text-[9px] text-[#71717A] group-hover:text-[#D4D4D8] tracking-wider uppercase font-semibold mt-1 transition-colors">
            OPERATING HUB
          </span>
        </a>

        {/* 5 Satellite Cards Grid */}
        <div className="w-full grid grid-cols-2 gap-2 z-10 pt-1">
          {HUB_COMPANIES.map((company, index) => {
            const isActive = activeId === company.id;
            const isFifth = index === 4;

            return (
              <a
                key={company.id}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setActiveId(company.id)}
                className={`flex items-center gap-2 p-2.5 rounded-xl bg-white transition-all duration-200 shadow-2xs cursor-pointer ${
                  isFifth ? "col-span-2 mx-auto min-w-[160px] max-w-[200px]" : ""
                } ${
                  isActive
                    ? "border-2 border-black ring-1 ring-black/10 shadow-xs"
                    : "border border-black/[0.08] active:border-black"
                }`}
                data-testid={`hub-company-mobile-${company.id}`}
                title={`Visit ${company.name} — ${company.url}`}
              >
                <div className="w-7 h-7 rounded-lg overflow-hidden border border-black/[0.06] bg-white flex items-center justify-center p-0.5 flex-shrink-0">
                  <img
                    src={company.icon}
                    alt={company.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-col text-left overflow-hidden">
                  <span className="text-xs font-bold text-black leading-none truncate">
                    {company.name}
                  </span>
                  <span className="text-[10px] text-[#71717A] font-medium leading-tight mt-0.5 truncate">
                    {company.subtitle}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

