import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useSpring, 
  useInView,
  useReducedMotion,
  useMotionValueEvent
} from "framer-motion";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Activity, 
  CreditCard, 
  ShoppingBag, 
  Cpu, 
  GraduationCap, 
  Layers, 
  Database, 
  Bot
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

import { companyBrandAssets } from "@/lib/companyBrandAssets";
import { HealwealOperatingHub } from "@/components/HealwealOperatingHub";

// 6 Core Platform Entries
const platformItems = [
  {
    id: "docgo",
    name: "DocGo",
    industry: "Healthcare",
    headline: "Foundational Healthcare Solutions.",
    description: "Our foundational healthcare technology venture, delivering innovative solutions that simplify clinic workflows and patient care.",
    brandIcon: null,
    icon: Activity,
    website: null,
    tag: "Healthcare",
  },
  {
    id: "hapdax",
    name: "Hapdax",
    industry: "Healthcare",
    headline: "Making Healthcare More Connected.",
    description: "Developing intelligent health platforms, OPD clinic management systems, and clinical infrastructure that empower physicians and patients.",
    brandIcon: companyBrandAssets.hapdax.icon,
    icon: Activity,
    website: "https://hapdax.in/",
    tag: "Healthcare",
  },
  {
    id: "kepwe",
    name: "Kepwe",
    industry: "Finance",
    headline: "Building Better Financial Experiences.",
    description: "Next-generation financial intelligence, algorithmic market technologies, and modern tools to empower individual and institutional wealth creation.",
    brandIcon: companyBrandAssets.kepwe.icon,
    icon: CreditCard,
    website: "https://kepwe.in/",
    tag: "FinTech",
  },
  {
    id: "thinkatic",
    name: "Thinkatic",
    industry: "Technology and AI",
    headline: "Technology That Moves Business Forward.",
    description: "Applied artificial intelligence, enterprise digital design, and intelligent software engineering that transform legacy operational workflows.",
    brandIcon: companyBrandAssets.thinkatic.icon,
    icon: Cpu,
    website: "https://thinkatic.com/",
    tag: "AI & Tech",
  },
  {
    id: "zelevos",
    name: "Zelevos",
    industry: "Travel & Experiences",
    headline: "Making Every Journey Simpler.",
    description: "Zelevos is a modern travel platform that brings flights, hotels, food ordering, travel planning, and guided experiences into one seamless journey. From booking a flight and finding the right stay to discovering local food and exploring new places with trusted guides, Zelevos helps people plan, book, and enjoy travel more simply.",
    brandIcon: companyBrandAssets.zelevos.icon,
    icon: ShoppingBag,
    website: "https://zelevos.com/",
    tag: "Travel",
  },
  {
    id: "hbs",
    name: "HBS",
    industry: "Education",
    headline: "Building Skills for the Future.",
    description: "Healweal Business School provides executive mentorship, high-impact business curriculums, and future-ready leadership programs.",
    brandIcon: companyBrandAssets.hbs.icon,
    icon: GraduationCap,
    website: "https://healwealbusinessschool.in/",
    tag: "Education",
  },
];

// 5 Key Industries
const industries = [
  {
    number: "01",
    name: "Healthcare",
    tagline: "Connected Clinical Ecosystems",
    description: "We build intuitive digital platforms that eliminate healthcare friction—connecting OPD workflows, diagnostic records, and personalized care into one seamless experience.",
    icon: Activity,
    company: "Hapdax",
    metric: "Unified Health Records",
    highlight: "Deploying cloud OPD infrastructure across hundreds of clinics.",
  },
  {
    number: "02",
    name: "Finance",
    tagline: "Modern Wealth & Market Tech",
    description: "Engineering secure algorithmic execution systems, capital management tools, and institutional-grade financial intelligence tailored for the new generation of investors.",
    icon: CreditCard,
    company: "Kepwe",
    metric: "Algorithmic Precision",
    highlight: "SEBI-compliant quantitative execution & venture enablement.",
  },
  {
    number: "03",
    name: "Commerce",
    tagline: "Scalable Commerce Platforms",
    description: "Developing modern commerce platforms, frictionless transactional architecture, and high-performance digital infrastructure for scalable distribution.",
    icon: ShoppingBag,
    company: "Commerce Infrastructure",
    metric: "Frictionless Commerce",
    highlight: "High-performance digital platforms & scalable transaction systems.",
  },
  {
    number: "04",
    name: "Technology",
    tagline: "Applied Artificial Intelligence",
    description: "Building scalable AI incubators, high-throughput cloud platforms, and purpose-driven venture software that accelerate enterprise productivity.",
    icon: Cpu,
    company: "Thinkatic",
    metric: "Autonomous Software",
    highlight: "Enterprise generative AI workflows & modern platform architecture.",
  },
  {
    number: "05",
    name: "Education",
    tagline: "Executive Leadership & Business",
    description: "Bridging the critical divide between theoretical academia and pragmatic leadership with future-ready curricula in technology, finance, and enterprise building.",
    icon: GraduationCap,
    company: "Healweal Business School",
    metric: "Future-Ready Skills",
    highlight: "Cohort-based mentorship trusted by 10,000+ emerging leaders.",
  },
];

// How We Build
const timelineSteps = [
  { num: "01", title: "Discover", desc: "Rigorous market research, competitive audits, and identifying systemic industry friction." },
  { num: "02", title: "Validate", desc: "Prototype testing, rapid customer validation, and financial model proof of concept." },
  { num: "03", title: "Build", desc: "Architecting clean modern codebases, intuitive UX, and establishing dedicated operations." },
  { num: "04", title: "Launch", desc: "Strategic public rollouts, direct-to-user acquisition, and brand launch initiatives." },
  { num: "05", title: "Optimize", desc: "Refining retention curves, product feedback loops, and unit economics." },
  { num: "06", title: "Scale", desc: "Geographic expansion, enterprise integration, and enduring institutional capitalization." },
];

// Tech & Innovation Cards
const techPillars = [
  {
    title: "Artificial Intelligence",
    desc: "Machine learning models and autonomous agent workflows designed to eliminate manual bottlenecks in enterprise operations.",
    icon: Bot,
  },
  {
    title: "FinTech Architecture",
    desc: "Low-latency financial execution pipelines, algorithmic advisory infrastructure, and secure real-time transaction processing.",
    icon: CreditCard,
  },
  {
    title: "HealthTech Platforms",
    desc: "Cloud-native OPD management systems, HIPAA/ABDM-compliant health record systems, and connected doctor-patient portals.",
    icon: Activity,
  },
  {
    title: "Cloud & Automation",
    desc: "Resilient microservices, serverless event-driven architecture, and zero-downtime distributed systems across our platform.",
    icon: Layers,
  },
  {
    title: "Data & Intelligence",
    desc: "Unified analytics pipelines providing operational clarity, predictive forecasting, and actionable business insights.",
    icon: Database,
  },
  {
    title: "Digital Travel & Commerce",
    desc: "High-conversion commerce backbones, travel planning orchestration, and real-time customer lifecycle engagement engines.",
    icon: ShoppingBag,
  },
];

// Philosophy sequential phrases
const philosophyPhrases = [
  "Better Ideas.",
  "Better Technology.",
  "Better Businesses.",
  "Better Opportunities.",
  "Better Futures."
];

// ══════════════════════════════════════════════════════
// HELPER: Smooth Number Counter
// ══════════════════════════════════════════════════════
const Counter = ({ target, duration = 1.4 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (shouldReduceMotion) {
      setCount(target);
      return;
    }
    let startTime: number | null = null;
    let animFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        animFrame = requestAnimationFrame(step);
      }
    };

    animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [inView, target, duration, shouldReduceMotion]);

  return <span ref={ref}>{count}</span>;
};

// ══════════════════════════════════════════════════════
// 1. HERO SECTION
// ══════════════════════════════════════════════════════
const HeroSection = ({
  mousePos,
  scrollToSection,
  multiplier
}: {
  mousePos: { x: number; y: number };
  hoveredNode: string | null;
  setHoveredNode: (id: string | null) => void;
  scrollToSection: (id: string) => void;
  multiplier: number;
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const textY = useTransform(smoothProgress, [0, 1], [0, -60 * multiplier]);
  const textOpacity = useTransform(smoothProgress, [0, 0.65], [1, 0]);
  const textScale = useTransform(smoothProgress, [0, 0.65], [1, 0.98]);

  const hubY = useTransform(smoothProgress, [0, 1], [0, -30 * multiplier]);
  const hubScale = useTransform(smoothProgress, [0, 0.6], [1, 0.97]);
  const indicatorOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);

  return (
    <section 
      ref={heroRef}
      className="relative w-full min-h-[90vh] lg:min-h-screen flex flex-col justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 bg-white text-black overflow-hidden" 
      data-testid="section-hero"
    >
      <motion.div 
        style={{ y: useTransform(smoothProgress, [0, 1], [0, 80 * multiplier]) }}
        className="absolute inset-0 hw-bg-grid opacity-40 pointer-events-none" 
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Hero Text */}
          <motion.div 
            style={{ y: textY, opacity: textOpacity, scale: textScale }}
            className="lg:col-span-7 flex flex-col items-start gap-8 max-w-2xl"
          >
            {/* Strategic Editorial Headline */}
            <div className="flex flex-col gap-1">
              <motion.span
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl lg:text-[76px] font-bold tracking-[-0.035em] text-black leading-[1.03] block"
                data-testid="heading-hero"
              >
                Building What Matters.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl lg:text-[76px] font-bold tracking-[-0.035em] text-black leading-[1.03] block"
              >
                Scaling What&apos;s Next.
              </motion.span>
            </div>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-[#52525B] leading-relaxed font-normal"
            >
              Healweal builds and scales businesses at the intersection of technology, entrepreneurship, and human needs. We discover opportunities, engineer solutions, and build enduring enterprises.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              <Link href="/companies">
                <span className="hw-btn-primary cursor-pointer group" data-testid="button-explore-companies">
                  <span>Explore Our Platform</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link href="/contact">
                <span className="hw-btn-secondary cursor-pointer" data-testid="button-partner-hero">
                  <span>Partner With Us</span>
                </span>
              </Link>
            </motion.div>

            {/* Verified Metrics Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="pt-4 flex flex-wrap items-center gap-8 border-t border-black/[0.08] w-full"
            >
              <div>
                <div className="text-2xl font-bold text-black tracking-tight">6</div>
                <div className="text-xs text-[#71717A] font-medium">Platform Initiatives</div>
              </div>
              <div className="w-px h-8 bg-black/[0.10]" />
              <div>
                <div className="text-2xl font-bold text-black tracking-tight">5</div>
                <div className="text-xs text-[#71717A] font-medium">Core Sectors</div>
              </div>
              <div className="w-px h-8 bg-black/[0.10]" />
              <div>
                <div className="text-2xl font-bold text-black tracking-tight">100%</div>
                <div className="text-xs text-[#71717A] font-medium">Proprietary Platforms</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Operating Hub */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <motion.div 
              style={{ y: hubY, scale: hubScale }}
              className="w-full flex items-center justify-center"
            >
              <HealwealOperatingHub />
            </motion.div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: indicatorOpacity }}
          className="pt-16 sm:pt-20 flex justify-center"
        >
          <button
            onClick={() => scrollToSection("section-philosophy")}
            className="inline-flex flex-col items-center gap-2 text-xs font-medium text-[#71717A] hover:text-black transition-colors cursor-pointer group"
          >
            <span>Scroll to explore</span>
            <div className="w-5 h-8 rounded-full border border-black/[0.20] flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-1.5 rounded-full bg-black"
              />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════
// 2. PHILOSOPHY SECTION
// ══════════════════════════════════════════════════════
const PhilosophySection = ({ multiplier }: { multiplier: number }) => {
  const philRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: philRef,
    offset: ["start end", "end start"],
  });

  const smoothPhil = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const bgGridY = useTransform(smoothPhil, [0, 1], [-30 * multiplier, 30 * multiplier]);
  const headingScale = useTransform(smoothPhil, [0.1, 0.5, 0.9], multiplier ? [0.97, 1.02, 0.99] : [1, 1, 1]);
  const headingY = useTransform(smoothPhil, [0, 0.5, 1], [30 * multiplier, 0, -20 * multiplier]);

  return (
    <section 
      ref={philRef}
      id="section-philosophy"
      className="relative w-full py-28 lg:py-36 bg-white text-black overflow-hidden border-t border-black/[0.06]" 
      data-testid="section-philosophy"
    >
      <motion.div 
        style={{ y: bgGridY }}
        className="absolute inset-0 hw-bg-grid opacity-40 pointer-events-none" 
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/[0.04] border border-black/[0.08] text-black text-xs font-semibold uppercase tracking-widest"
          >
            Our Philosophy
          </motion.div>

          <motion.h2
            style={{ scale: headingScale, y: headingY }}
            initial={{ opacity: 0, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl lg:text-[90px] font-bold tracking-tight leading-none text-black"
          >
            Build Better.
          </motion.h2>

          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xl sm:text-2xl lg:text-3xl font-semibold text-[#52525B] max-w-3xl">
            {philosophyPhrases.map((phrase) => (
              <span
                key={phrase}
                className="text-black font-semibold"
              >
                {phrase}
              </span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-black max-w-2xl leading-relaxed pt-4 font-normal"
          >
            We believe meaningful progress comes from building things better — with purpose, technology, discipline and relentless execution.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════
// 3. PLATFORM SECTION (Replaces CompaniesSection)
// ══════════════════════════════════════════════════════
const PlatformSection = ({ multiplier }: { multiplier: number }) => {
  const compRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: compRef,
    offset: ["start end", "end start"],
  });

  const smoothComp = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const headerY = useTransform(smoothComp, [0, 0.4], [25 * multiplier, -10 * multiplier]);

  return (
    <section 
      ref={compRef}
      className="w-full py-24 lg:py-32 bg-white border-t border-black/[0.06] overflow-hidden" 
      data-testid="section-companies"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div 
          style={{ y: headerY }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-bold text-black tracking-widest uppercase mb-3 block">
            Platform
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-black mb-4">
            Different Businesses. One Way of Thinking.
          </h2>
          <p className="text-lg text-[#52525B] leading-relaxed">
            Diverse industries. Specialized platforms. One shared commitment: Build Better.
          </p>
        </motion.div>

        {/* 6 Platform Cards in 3 Columns with Subtle Shadow/Lift Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platformItems.map((platform) => {
            const Icon = platform.icon;

            return (
              <div key={platform.id} className="flex">
                <div 
                  className="hw-card-lift p-8 sm:p-9 flex flex-col justify-between w-full group relative overflow-hidden bg-white border border-black/[0.08] shadow-xs cursor-pointer"
                >
                  <div>
                    {/* Header: Small Monochrome Icon + Tag */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="h-10 w-10 rounded-xl bg-[#F4F4F5] border border-black/[0.08] flex items-center justify-center flex-shrink-0 text-black">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="hw-tag-pill text-[11px] font-bold">
                        {platform.industry}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-black mb-1.5 tracking-tight">
                      {platform.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#71717A] mb-3">
                      {platform.headline}
                    </div>
                    <p className="text-sm text-[#52525B] leading-relaxed mb-6">
                      {platform.description}
                    </p>
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center justify-between pt-6 border-t border-black/[0.08] mt-auto">
                    <Link href={`/companies#${platform.id}`}>
                      <span className="text-xs font-bold text-black cursor-pointer inline-flex items-center gap-1 hover:underline">
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </Link>
                    {platform.website && (
                      <a
                        href={platform.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-black hover:underline inline-flex items-center gap-1"
                      >
                        <span>Visit Website</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════
// 4. STRATEGIC SECTORS (IndustriesSection)
// ══════════════════════════════════════════════════════
const IndustriesSection = ({
  activeIndustry,
  setActiveIndustry,
  multiplier
}: {
  activeIndustry: number;
  setActiveIndustry: (index: number) => void;
  multiplier: number;
}) => {
  const indRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: indRef,
    offset: ["start end", "end start"],
  });

  const smoothInd = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const leftY = useTransform(smoothInd, [0, 1], [20 * multiplier, -20 * multiplier]);
  const rightY = useTransform(smoothInd, [0, 1], [40 * multiplier, -30 * multiplier]);

  // Smooth scroll sync for sector storytelling
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.2 && latest <= 0.85) {
      const step = Math.min(Math.floor(((latest - 0.2) / 0.65) * 5), 4);
      setActiveIndustry(step);
    }
  });

  return (
    <section 
      ref={indRef}
      className="w-full py-24 lg:py-32 bg-white border-t border-black/[0.06] overflow-hidden" 
      data-testid="section-industries"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold text-black tracking-widest uppercase mb-3 block">
            Strategic Sectors
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-black">
            Building Where the Future Is Taking Shape.
          </h2>
        </div>

        {/* Split-screen Editorial Storytelling */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Sector Selector */}
          <motion.div 
            style={{ y: leftY }}
            className="lg:col-span-5 flex flex-col gap-2.5"
          >
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              const isActive = activeIndustry === i;

              return (
                <button
                  key={ind.number}
                  onClick={() => setActiveIndustry(i)}
                  className={`p-5 rounded-2xl text-left transition-all duration-300 flex items-center justify-between border cursor-pointer ${
                    isActive
                      ? "bg-black text-white border-black shadow-sm"
                      : "bg-white text-black border-black/[0.08] hover:bg-black/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-base font-bold font-mono ${isActive ? "text-white" : "text-[#71717A]"}`}>
                      {ind.number}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isActive ? "bg-white text-black" : "bg-black/[0.05] text-black"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-lg font-bold ${isActive ? "text-white" : "text-black"}`}>
                        {ind.name}
                      </span>
                    </div>
                  </div>
                  {isActive && (
                    <ArrowRight className="w-4 h-4 text-white" />
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* Right: Detail Display Card */}
          <motion.div 
            style={{ y: rightY }}
            className="lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={industries[activeIndustry].number}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="h-full p-8 sm:p-12 rounded-3xl bg-[#FAFAFA] border border-black/[0.08] flex flex-col justify-between relative overflow-hidden shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="hw-tag-pill text-xs font-bold bg-black text-white border-black">
                      {industries[activeIndustry].metric}
                    </span>
                    <span className="text-xs font-bold text-black bg-white px-3 py-1.5 rounded-full border border-black/[0.08]">
                      {industries[activeIndustry].company}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-bold text-black mb-3 tracking-tight">
                    {industries[activeIndustry].tagline}
                  </h3>

                  <p className="text-base sm:text-lg text-[#52525B] leading-relaxed mb-6 font-normal">
                    {industries[activeIndustry].description}
                  </p>
                </div>

                <div className="pt-6 border-t border-black/[0.08] flex items-center justify-between z-10">
                  <span className="text-xs text-black font-semibold">
                    {industries[activeIndustry].highlight}
                  </span>
                  <Link href="/companies">
                    <span className="text-xs font-bold text-black hover:underline inline-flex items-center gap-1 cursor-pointer">
                      <span>Explore Platform</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════
// 5. HOW WE BUILD (Systematic Execution)
// ══════════════════════════════════════════════════════
const HowWeBuildSection = ({ multiplier }: { multiplier: number }) => {
  const timeRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: timeRef,
    offset: ["start end", "end start"],
  });

  const smoothTime = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const progressLineWidth = useTransform(smoothTime, [0.15, 0.85], ["0%", "100%"]);

  return (
    <section 
      ref={timeRef}
      className="w-full py-28 lg:py-36 bg-white text-black border-t border-black/[0.06] overflow-hidden relative" 
      data-testid="section-how-we-build"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold text-black tracking-widest uppercase mb-3 block">
            Systematic Execution
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-black mb-4">
            From First Principle to Full Scale.
          </h2>
          <p className="text-lg text-[#52525B] leading-relaxed font-normal">
            A disciplined, repeatable model engineered to identify, de-risk, and scale transformative platforms.
          </p>
        </div>

        {/* Progressive Timeline Connection Bar */}
        <div className="hidden lg:block relative w-full h-1 bg-black/[0.06] rounded-full mb-10 overflow-hidden">
          <motion.div 
            style={{ width: progressLineWidth }}
            className="h-full bg-black rounded-full"
          />
        </div>

        {/* Timeline Grid with connecting journey progression */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {timelineSteps.map((step) => (
            <div
              key={step.num}
              className="h-full"
            >
              <div
                className="hw-card-lift h-full p-8 rounded-2xl bg-white border border-black/[0.08] shadow-xs flex flex-col justify-between min-h-[220px] cursor-default"
              >
                <div>
                  <div className="text-xs font-mono text-black font-semibold mb-3 flex items-center justify-between">
                    <span>STAGE {step.num}</span>
                    <span className="w-2 h-2 rounded-full bg-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-3">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-[#52525B] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════
// 6. TECHNOLOGY & INNOVATION
// ══════════════════════════════════════════════════════
const TechnologySection = ({ multiplier }: { multiplier: number }) => {
  const techRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: techRef,
    offset: ["start end", "end start"],
  });

  const smoothTech = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const headerY = useTransform(smoothTech, [0, 0.4], [25 * multiplier, -10 * multiplier]);

  return (
    <section 
      ref={techRef}
      className="w-full py-24 lg:py-32 bg-white border-t border-black/[0.06] overflow-hidden" 
      data-testid="section-technology"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div 
          style={{ y: headerY }}
          className="max-w-3xl mb-16"
        >
          <span className="text-xs font-bold text-black tracking-widest uppercase mb-3 block">
            Core Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-black mb-4">
            Technology Is How We Turn Ambition Into Reality.
          </h2>
          <p className="text-lg text-[#52525B] leading-relaxed">
            We leverage modern digital primitives, machine intelligence, and high-performance engineering to build enduring technological advantages.
          </p>
        </motion.div>

        {/* Sequential Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techPillars.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="h-full"
              >
                <div
                  className="hw-card-lift h-full p-8 rounded-2xl border border-black/[0.08] bg-white shadow-xs cursor-default"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F4F4F5] border border-black/[0.08] shadow-2xs flex items-center justify-center text-black mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#52525B] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════
// 7. IMPACT SECTION
// ══════════════════════════════════════════════════════
const ImpactSection = ({ multiplier }: { multiplier: number }) => {
  const impactRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: impactRef,
    offset: ["start end", "end start"],
  });

  const smoothImpact = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const headingScale = useTransform(smoothImpact, [0.1, 0.5], multiplier ? [0.97, 1] : [1, 1]);
  const headingY = useTransform(smoothImpact, [0, 0.6], [25 * multiplier, -10 * multiplier]);

  const impactPillars = [
    { title: "Access", desc: "Broadening availability of critical healthcare & wealth tools" },
    { title: "Opportunity", desc: "Enabling entrepreneurs and businesses to launch and grow" },
    { title: "Employment", desc: "Creating high-caliber technical & executive career pathways" },
    { title: "Innovation", desc: "Pioneering technological breakthroughs in fundamental fields" },
    { title: "Skills", desc: "Equipping next-gen leaders with modern industry expertise" },
    { title: "Experiences", desc: "Elevating human interaction with modern technology" },
  ];

  return (
    <section 
      ref={impactRef}
      className="w-full py-24 lg:py-32 bg-white border-t border-black/[0.06] overflow-hidden" 
      id="impact" 
      data-testid="section-impact"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div 
          style={{ scale: headingScale, y: headingY }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-bold text-black tracking-widest uppercase mb-3 block">
            Long-Term Value
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-black mb-4">
            Growth Creates Value. Purpose Gives It Meaning.
          </h2>
          <p className="text-lg text-[#52525B] leading-relaxed">
            We measure our enterprise success not solely by business performance, but by the tangible human improvements created across our platforms.
          </p>
        </motion.div>

        {/* 6 Impact Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {impactPillars.map((pillar, idx) => (
            <div 
              key={pillar.title} 
              className="h-full"
            >
              <div
                className="hw-card-lift h-full bg-white p-6 rounded-2xl border border-black/[0.08] shadow-xs flex flex-col justify-between min-h-[165px] cursor-default"
              >
                <span className="text-xs font-mono text-black font-bold">0{idx + 1}</span>
                <div>
                  <h3 className="font-bold text-lg text-black mb-1">{pillar.title}</h3>
                  <p className="text-xs text-[#52525B] leading-normal">{pillar.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════
// 8. HEALWEAL AT A GLANCE (Statistics)
// ══════════════════════════════════════════════════════
const GlanceSection = ({ multiplier }: { multiplier: number }) => {
  const metricsRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: metricsRef,
    offset: ["start end", "end start"],
  });

  const smoothMetrics = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const colY0 = useTransform(smoothMetrics, [0, 1], [15 * multiplier, -10 * multiplier]);
  const colY1 = useTransform(smoothMetrics, [0, 1], [28 * multiplier, -20 * multiplier]);
  const colY2 = useTransform(smoothMetrics, [0, 1], [12 * multiplier, -15 * multiplier]);
  const colY3 = useTransform(smoothMetrics, [0, 1], [30 * multiplier, -25 * multiplier]);

  return (
    <section 
      ref={metricsRef}
      className="w-full py-20 bg-white border-y border-black/[0.08] overflow-hidden" 
      data-testid="section-glance"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-black/[0.08]">
          <motion.div 
            style={{ y: colY0 }}
            className="pt-4 lg:pt-0 lg:px-6 first:px-0"
          >
            <div className="text-5xl sm:text-6xl font-extrabold text-black tracking-tight">
              <Counter target={6} />
            </div>
            <div className="text-sm font-semibold text-black mt-2">Operating Platforms</div>
            <div className="text-xs text-[#71717A] mt-1">DocGo, Hapdax, Kepwe, Thinkatic, Zelevos, HBS</div>
          </motion.div>

          <motion.div 
            style={{ y: colY1 }}
            className="pt-4 lg:pt-0 lg:px-6"
          >
            <div className="text-5xl sm:text-6xl font-extrabold text-black tracking-tight">
              <Counter target={5} />
            </div>
            <div className="text-sm font-semibold text-black mt-2">Primary Sectors</div>
            <div className="text-xs text-[#71717A] mt-1">Healthcare, Finance, Commerce, Technology, Education</div>
          </motion.div>

          <motion.div 
            style={{ y: colY2 }}
            className="pt-4 lg:pt-0 lg:px-6"
          >
            <div className="text-5xl sm:text-6xl font-extrabold text-black tracking-tight">
              <Counter target={1} />
            </div>
            <div className="text-sm font-semibold text-black mt-2">Shared Philosophy</div>
            <div className="text-xs text-[#71717A] mt-1">Build Better across every initiative</div>
          </motion.div>

          <motion.div 
            style={{ y: colY3 }}
            className="pt-4 lg:pt-0 lg:px-6"
          >
            <motion.div 
              whileHover={{ scale: 1.08 }}
              className="text-5xl sm:text-6xl font-extrabold text-black tracking-tight cursor-default inline-block"
            >
              ∞
            </motion.div>
            <div className="text-sm font-semibold text-black mt-2">Possibilities</div>
            <div className="text-xs text-[#71717A] mt-1">Continuously exploring new ventures</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════
// 9. CAREERS TEASER
// ══════════════════════════════════════════════════════
const CareersTeaserSection = ({ multiplier }: { multiplier: number }) => {
  const careersRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: careersRef,
    offset: ["start end", "end start"],
  });

  const smoothCareers = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const leftY = useTransform(smoothCareers, [0, 1], [25 * multiplier, -20 * multiplier]);
  const rightY = useTransform(smoothCareers, [0, 1], [40 * multiplier, -15 * multiplier]);

  return (
    <section 
      ref={careersRef}
      className="w-full py-24 lg:py-32 bg-white text-black border-b border-black/[0.06] relative overflow-hidden" 
      data-testid="section-careers-teaser"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div 
            style={{ y: leftY }}
            className="lg:col-span-8"
          >
            <span className="text-xs font-bold text-black tracking-widest uppercase mb-3 block">
              Join The Builders
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-black mb-4">
              Come Build What Doesn&apos;t Exist Yet.
            </h2>
            <p className="text-lg text-[#52525B] max-w-2xl leading-relaxed">
              Join visionary builders, engineers, and operators solving defining challenges across healthcare, finance, travel, and AI. Take ownership and build scalable ventures that matter.
            </p>
          </motion.div>

          <motion.div 
            style={{ y: rightY }}
            className="lg:col-span-4 flex flex-wrap lg:justify-end gap-4"
          >
            <Link href="/careers">
              <span className="hw-btn-primary cursor-pointer group">
                <span>Explore Careers</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="/about">
              <span className="hw-btn-secondary cursor-pointer">
                <span>Meet Our Teams</span>
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════
// 10. PARTNERSHIP
// ══════════════════════════════════════════════════════
const PartnershipSection = ({ multiplier }: { multiplier: number }) => {
  const partRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: partRef,
    offset: ["start end", "end start"],
  });

  const smoothPart = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const cardY0 = useTransform(smoothPart, [0, 1], [30 * multiplier, -20 * multiplier]);
  const cardY1 = useTransform(smoothPart, [0, 1], [50 * multiplier, -30 * multiplier]);
  const cardY2 = useTransform(smoothPart, [0, 1], [20 * multiplier, -15 * multiplier]);
  const cardYList = [cardY0, cardY1, cardY2];

  const partnershipBlocks = [
    {
      title: "Partner With Us",
      desc: "Strategic alliances, corporate platform initiatives, and high-impact co-development across our operating sectors.",
    },
    {
      title: "Work With Our Businesses",
      desc: "Direct enterprise access to Hapdax clinical software, Kepwe market technology, Zelevos travel platforms, and Thinkatic AI.",
    },
    {
      title: "Explore Opportunities",
      desc: "For ambitious founders and technical leaders seeking an institutional ecosystem to launch and scale their next venture.",
    },
  ];

  return (
    <section 
      ref={partRef}
      className="w-full py-24 lg:py-32 bg-white border-b border-black/[0.06] overflow-hidden" 
      data-testid="section-partnership"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-black tracking-widest uppercase mb-3 block">
            Collaboration
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-black mb-4">
            Great Things Start With the Right Conversation.
          </h2>
          <p className="text-lg text-[#52525B] leading-relaxed">
            We partner with forward-thinking enterprises, institutions, and founders to accelerate new business horizons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {partnershipBlocks.map((block, i) => (
            <motion.div 
              key={block.title} 
              style={{ y: cardYList[i] }}
              className="h-full"
            >
              <div
                className="hw-card-lift h-full p-8 rounded-2xl border border-black/[0.08] bg-white shadow-xs flex flex-col justify-between cursor-default group"
              >
                <div>
                  <h3 className="text-xl font-bold text-black mb-3">{block.title}</h3>
                  <p className="text-sm text-[#52525B] leading-relaxed mb-6">{block.desc}</p>
                </div>
                <Link href="/contact">
                  <span className="text-xs font-bold text-black inline-flex items-center gap-1 cursor-pointer hover:underline">
                    <span>Initiate Dialogue</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/contact">
            <span className="hw-btn-primary cursor-pointer px-8 py-3.5 text-base group">
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════
// 11. FUTURE CTA SECTION
// ══════════════════════════════════════════════════════
const FinalCtaSection = ({ multiplier }: { multiplier: number }) => {
  const ctaRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });

  const smoothCta = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const headingScale = useTransform(smoothCta, [0.15, 0.7], multiplier ? [0.97, 1.01] : [1, 1]);
  const headingY = useTransform(smoothCta, [0, 1], [30 * multiplier, -10 * multiplier]);

  return (
    <section 
      ref={ctaRef}
      className="w-full py-28 lg:py-36 bg-white text-black text-center relative overflow-hidden border-b border-black/[0.06]" 
      data-testid="section-final-cta"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] text-xs font-semibold text-black uppercase tracking-widest">
            The Future Is Built Today
          </div>

          <motion.h2 
            style={{ scale: headingScale, y: headingY }}
            initial={{ opacity: 0, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl lg:text-[76px] font-extrabold tracking-tight text-black leading-tight"
          >
            Let&apos;s Build What&apos;s Next.
          </motion.h2>

          <p className="text-lg sm:text-xl text-black max-w-xl font-normal leading-relaxed">
            Healweal is building businesses for a better future. Reach out to our leadership team and explore what we can create together.
          </p>

          <div className="pt-4">
            <Link href="/contact">
              <span className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-base font-semibold text-white bg-black hover:bg-neutral-800 transition-all duration-300 shadow-md cursor-pointer group">
                <span>Let&apos;s Talk</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════
// MAIN HOMEPAGE COMPONENT
// ══════════════════════════════════════════════════════
export const HomePage = () => {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  
  // Parallax configuration
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const multiplier = shouldReduceMotion ? 0 : isMobile ? 0.35 : 1;

  // Mouse parallax for Hero ecosystem
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="bg-white w-full flex flex-col min-h-screen text-black overflow-x-hidden selection:bg-black selection:text-white"
    >
      <Navigation />

      {/* 1. HERO SECTION */}
      <HeroSection 
        mousePos={mousePos}
        hoveredNode={hoveredNode}
        setHoveredNode={setHoveredNode}
        scrollToSection={scrollToSection}
        multiplier={multiplier}
      />

      {/* 2. PHILOSOPHY SECTION */}
      <PhilosophySection multiplier={multiplier} />

      {/* 3. PLATFORM SECTION */}
      <PlatformSection multiplier={multiplier} />

      {/* 4. STRATEGIC SECTORS */}
      <IndustriesSection 
        activeIndustry={activeIndustry}
        setActiveIndustry={setActiveIndustry}
        multiplier={multiplier}
      />

      {/* 5. HOW WE BUILD */}
      <HowWeBuildSection multiplier={multiplier} />

      {/* 6. TECHNOLOGY & INNOVATION */}
      <TechnologySection multiplier={multiplier} />

      {/* 7. IMPACT */}
      <ImpactSection multiplier={multiplier} />

      {/* 8. HEALWEAL AT A GLANCE */}
      <GlanceSection multiplier={multiplier} />

      {/* 9. CAREERS TEASER */}
      <CareersTeaserSection multiplier={multiplier} />

      {/* 10. PARTNERSHIP */}
      <PartnershipSection multiplier={multiplier} />

      {/* 11. FUTURE CTA */}
      <FinalCtaSection multiplier={multiplier} />

      <Footer />
    </div>
  );
};
