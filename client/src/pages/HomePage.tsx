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

// Core 5 Companies from Blueprint
const companies = [
  {
    id: "hapdax",
    name: "Hapdax",
    industry: "Healthcare Technology",
    headline: "Making Healthcare More Connected.",
    description: "Developing intelligent health platforms, OPD clinic management systems, and clinical infrastructure that empower physicians and patients.",
    logo: companyBrandAssets.hapdax.logo,
    brandIcon: companyBrandAssets.hapdax.icon,
    logoClass: companyBrandAssets.hapdax.logoClass,
    website: "https://hapdax.in/",
    icon: Activity,
    accent: "#0284C7",
    tag: "Healthcare",
  },
  {
    id: "kepwe",
    name: "Kepwe",
    industry: "Financial Technology",
    headline: "Building Better Financial Experiences.",
    description: "Next-generation financial intelligence, algorithmic market technologies, and modern tools to empower individual and institutional wealth creation.",
    logo: companyBrandAssets.kepwe.logo,
    brandIcon: companyBrandAssets.kepwe.icon,
    logoClass: companyBrandAssets.kepwe.logoClass,
    website: "https://kepwe.in/",
    icon: CreditCard,
    accent: "#214ECF",
    tag: "FinTech",
  },
  {
    id: "zelevos",
    name: "Zelevos",
    industry: "Commerce",
    headline: "Helping Businesses Build, Launch & Scale.",
    description: "Modern lifestyle and consumer product ecosystems engineered for quality, customer wellness, and scalable modern distribution.",
    logo: companyBrandAssets.zelevos.logo,
    brandIcon: companyBrandAssets.zelevos.icon,
    logoClass: companyBrandAssets.zelevos.logoClass,
    website: "https://zelevos.com/",
    icon: ShoppingBag,
    accent: "#D97706",
    tag: "Commerce",
  },
  {
    id: "thinkatic",
    name: "Thinkatic",
    industry: "AI & Technology",
    headline: "Technology That Moves Business Forward.",
    description: "Applied artificial intelligence, enterprise digital design, and intelligent software engineering that transform legacy operational workflows.",
    logo: companyBrandAssets.thinkatic.logo,
    brandIcon: companyBrandAssets.thinkatic.icon,
    logoClass: companyBrandAssets.thinkatic.logoClass,
    website: "https://thinkatic.com/",
    icon: Cpu,
    accent: "#7C3AED",
    tag: "AI & Cloud",
  },
  {
    id: "hbs",
    name: "HBS",
    industry: "Education",
    headline: "Building Skills for the Future.",
    description: "Healweal Business School provides executive mentorship, high-impact business curriculums, and future-ready leadership programs.",
    logo: companyBrandAssets.hbs.logo,
    brandIcon: companyBrandAssets.hbs.icon,
    logoClass: companyBrandAssets.hbs.logoClass,
    website: "https://healwealbusinessschool.in/",
    icon: GraduationCap,
    accent: "#059669",
    tag: "EdTech",
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
    tagline: "Scalable Consumer Brands",
    description: "Architecting modern consumer and lifestyle formulations that combine verified material quality, sustainable sourcing, and omni-channel distribution.",
    icon: ShoppingBag,
    company: "Zelevos",
    metric: "Modern Lifestyle",
    highlight: "End-to-end supply chain integration and direct fulfillment.",
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

// Building Process (About Section)
const processSteps = [
  {
    step: "01",
    title: "Identify",
    headline: "Deep friction discovery",
    description: "We study essential global sectors to uncover fundamental inefficiencies, underserved user needs, and overlooked market opportunities.",
  },
  {
    step: "02",
    title: "Build",
    headline: "Engineering the foundation",
    description: "We assemble world-class product teams, modern software architectures, and capital to engineer proprietary solutions from ground zero.",
  },
  {
    step: "03",
    title: "Launch",
    headline: "Precision market entry",
    description: "We deploy scalable platforms with surgical go-to-market execution, targeted positioning, and immediate value delivery for early adopters.",
  },
  {
    step: "04",
    title: "Scale",
    headline: "Compounding enterprise value",
    description: "We optimize unit economics, expand distribution, institutionalize governance, and build sustainable market-leading operating companies.",
  },
];

// How We Build (Dark Timeline)
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
    desc: "Resilient microservices, serverless event-driven architecture, and zero-downtime distributed systems across our companies.",
    icon: Layers,
  },
  {
    title: "Data & Intelligence",
    desc: "Unified analytics pipelines providing operational clarity, predictive forecasting, and actionable business insights.",
    icon: Database,
  },
  {
    title: "Digital Commerce",
    desc: "High-conversion commerce backbones, inventory orchestration, and real-time customer lifecycle engagement engines.",
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
// HELPER: Smooth Number Counter without Bounce
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
      // Apple ease out cubic curve
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
// 1. HERO SECTION (Parallax, Depth & Gentle Exit)
// ══════════════════════════════════════════════════════
const HeroSection = ({
  mousePos,
  hoveredNode,
  setHoveredNode,
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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  // Hero text translates upward, subtly shrinks and gently fades
  const textY = useTransform(smoothProgress, [0, 1], [0, -55 * multiplier]);
  const textOpacity = useTransform(smoothProgress, [0, 0.75, 1], multiplier ? [1, 0.85, 0.15] : [1, 1, 1]);
  const textScale = useTransform(smoothProgress, [0, 1], multiplier ? [1, 0.97] : [1, 1]);

  // Ambient blob drifts opposite to create deep spatial parallax
  const blobY = useTransform(smoothProgress, [0, 1], [0, 90 * multiplier]);
  const gridY = useTransform(smoothProgress, [0, 1], [0, 30 * multiplier]);

  // Ecosystem Hub and node offsets
  const hubY = useTransform(smoothProgress, [0, 1], [0, -25 * multiplier]);
  const hubScale = useTransform(smoothProgress, [0, 1], multiplier ? [1, 0.96] : [1, 1]);

  // Node-specific parallax movements
  const nodeY0 = useTransform(smoothProgress, [0, 1], [0, -45 * multiplier]);
  const nodeX0 = useTransform(smoothProgress, [0, 1], [0, 10 * multiplier]);

  const nodeY1 = useTransform(smoothProgress, [0, 1], [0, -18 * multiplier]);
  const nodeX1 = useTransform(smoothProgress, [0, 1], [0, -8 * multiplier]);

  const nodeY2 = useTransform(smoothProgress, [0, 1], [0, -50 * multiplier]);

  const nodeY3 = useTransform(smoothProgress, [0, 1], [0, -22 * multiplier]);
  const nodeX3 = useTransform(smoothProgress, [0, 1], [0, 12 * multiplier]);

  const nodeY4 = useTransform(smoothProgress, [0, 1], [0, -40 * multiplier]);
  const nodeX4 = useTransform(smoothProgress, [0, 1], [0, -10 * multiplier]);

  const nodeTransforms = [
    { x: nodeX0, y: nodeY0 },
    { x: nodeX1, y: nodeY1 },
    { x: undefined, y: nodeY2 },
    { x: nodeX3, y: nodeY3 },
    { x: nodeX4, y: nodeY4 },
  ];

  // Scroll indicator gently fades out as user begins scrolling
  const indicatorOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  return (
    <section 
      ref={heroRef}
      className="relative w-full min-h-[94vh] pt-32 pb-24 lg:pt-44 lg:pb-36 flex flex-col justify-center overflow-hidden bg-white"
    >
      {/* Subtle geometric background grid with parallax */}
      <motion.div 
        style={{ y: gridY }}
        className="absolute inset-0 hw-bg-grid opacity-60 pointer-events-none" 
      />
      
      {/* Soft atmospheric gradient blob with opposing parallax */}
      <motion.div 
        style={{ y: blobY }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] pointer-events-none"
      >
        <motion.div
          animate={{ x: mousePos.x * -0.5, y: mousePos.y * -0.5 }}
          transition={{ type: "spring", damping: 50, stiffness: 200 }}
          className="absolute inset-0 rounded-full bg-gradient-to-b from-[#214ECF]/6 to-transparent blur-3xl"
        />
      </motion.div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Hero Text with scroll-scrubbed translate & scale */}
          <motion.div 
            style={{ y: textY, opacity: textOpacity, scale: textScale }}
            className="lg:col-span-7 flex flex-col items-start gap-8 max-w-2xl"
          >
            {/* Eyebrow Pill */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#F5F7FA] border border-black/[0.07] shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#214ECF] animate-pulse" />
              <span className="text-xs font-semibold text-[#0B1220] tracking-wide uppercase">
                Venture Builder &amp; Operating Group
              </span>
            </motion.div>

            {/* Strategic Editorial Headline */}
            <div className="flex flex-col gap-1">
              <motion.span
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl lg:text-[76px] font-bold tracking-[-0.035em] text-[#0B1220] leading-[1.03] block"
                data-testid="heading-hero"
              >
                Building What Matters.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl lg:text-[76px] font-bold tracking-[-0.035em] text-[#214ECF] leading-[1.03] block"
              >
                Scaling What&apos;s Next.
              </motion.span>
            </div>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-[#667085] leading-relaxed font-normal"
            >
              Healweal builds and scales businesses at the intersection of technology, entrepreneurship, and human needs. We discover opportunities, engineer solutions, and build enduring enterprises.
            </motion.p>

            {/* CTAs with micro-interactions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              <Link href="/companies">
                <span className="hw-btn-primary cursor-pointer group" data-testid="button-explore-companies">
                  <span>Explore Our Companies</span>
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
              className="pt-4 flex flex-wrap items-center gap-8 border-t border-black/[0.06] w-full"
            >
              <div>
                <div className="text-2xl font-bold text-[#0B1220] tracking-tight">5</div>
                <div className="text-xs text-[#667085] font-medium">Operating Companies</div>
              </div>
              <div className="w-px h-8 bg-black/[0.08]" />
              <div>
                <div className="text-2xl font-bold text-[#0B1220] tracking-tight">5</div>
                <div className="text-xs text-[#667085] font-medium">Core Sectors</div>
              </div>
              <div className="w-px h-8 bg-black/[0.08]" />
              <div>
                <div className="text-2xl font-bold text-[#214ECF] tracking-tight">100%</div>
                <div className="text-xs text-[#667085] font-medium">Proprietary Platforms</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Connected Ecosystem Hub with Scroll Depth */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <motion.div 
              style={{ y: hubY, scale: hubScale }}
              className="w-full flex items-center justify-center"
            >
              <HealwealOperatingHub />
            </motion.div>
          </div>

        </div>

        {/* Premium Scroll Indicator */}
        <motion.div 
          style={{ opacity: indicatorOpacity }}
          className="pt-16 sm:pt-20 flex justify-center"
        >
          <button
            onClick={() => scrollToSection("section-philosophy")}
            className="inline-flex flex-col items-center gap-2 text-xs font-medium text-[#667085] hover:text-[#0B1220] transition-colors cursor-pointer group"
          >
            <span>Scroll to explore</span>
            <div className="w-5 h-8 rounded-full border border-black/[0.15] flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-1.5 rounded-full bg-[#214ECF]"
              />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════
// 2. PHILOSOPHY SECTION (Keynote Parallax & Sequential Scrub)
// ══════════════════════════════════════════════════════
const PhilosophySection = ({ multiplier }: { multiplier: number }) => {
  const philRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: philRef,
    offset: ["start end", "end start"],
  });

  const smoothPhil = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const bgGridY = useTransform(smoothPhil, [0, 1], [-40 * multiplier, 40 * multiplier]);
  const headingScale = useTransform(smoothPhil, [0.1, 0.5, 0.9], multiplier ? [0.95, 1.02, 0.98] : [1, 1, 1]);
  const headingY = useTransform(smoothPhil, [0, 0.5, 1], [35 * multiplier, 0, -25 * multiplier]);

  // Sequential phrase transforms based on scroll progress
  const phraseY0 = useTransform(smoothPhil, [0.18, 0.45], [20 * multiplier, 0]);
  const phraseY1 = useTransform(smoothPhil, [0.24, 0.50], [25 * multiplier, 0]);
  const phraseY2 = useTransform(smoothPhil, [0.30, 0.55], [30 * multiplier, 0]);
  const phraseY3 = useTransform(smoothPhil, [0.36, 0.60], [35 * multiplier, 0]);
  const phraseY4 = useTransform(smoothPhil, [0.42, 0.65], [40 * multiplier, 0]);

  const phraseYList = [phraseY0, phraseY1, phraseY2, phraseY3, phraseY4];

  return (
    <section 
      ref={philRef}
      id="section-philosophy"
      className="relative w-full py-28 lg:py-36 bg-[#0B1220] text-white overflow-hidden" 
      data-testid="section-philosophy"
    >
      <motion.div 
        style={{ y: bgGridY }}
        className="absolute inset-0 hw-bg-grid-dark opacity-30 pointer-events-none" 
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[#22C1FF] text-xs font-semibold uppercase tracking-widest"
          >
            Our Philosophy
          </motion.div>

          {/* Huge Headline: "Build Better." with scroll-scrubbed scale & y */}
          <motion.h2
            style={{ scale: headingScale, y: headingY }}
            initial={{ opacity: 0, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl lg:text-[90px] font-bold tracking-tight leading-none text-white"
          >
            Build Better.
          </motion.h2>

          {/* Sequential phrase reveal with subtle staggered scroll translate */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-xl sm:text-2xl lg:text-3xl font-semibold text-[#98A2B3] max-w-3xl">
            {philosophyPhrases.map((phrase, i) => (
              <motion.span
                key={phrase}
                style={{ y: phraseYList[i] }}
                initial={{ opacity: 0, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={i === 2 ? "text-white underline decoration-[#214ECF] decoration-2 underline-offset-8" : "hover:text-white transition-colors"}
              >
                {phrase}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg sm:text-xl text-[#98A2B3] max-w-2xl leading-relaxed pt-4 font-normal"
          >
            We believe meaningful progress comes from building things better — with purpose, technology, discipline and relentless execution.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════
// 3. ABOUT / VENTURE CREATION MODEL (Scroll Scrub & Floating Cards)
// ══════════════════════════════════════════════════════
const AboutSection = ({
  activeStep,
  setActiveStep,
  multiplier
}: {
  activeStep: number;
  setActiveStep: (step: number) => void;
  multiplier: number;
}) => {
  const aboutRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });

  const smoothAbout = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const headerY = useTransform(smoothAbout, [0, 0.4], [25 * multiplier, 0]);

  // Connecting progress bar that draws across the 4 cards
  const progressLineWidth = useTransform(smoothAbout, [0.2, 0.75], ["0%", "100%"]);

  // Floating vertical parallax for the 4 cards
  const cardY0 = useTransform(smoothAbout, [0, 1], [30 * multiplier, -20 * multiplier]);
  const cardY1 = useTransform(smoothAbout, [0, 1], [45 * multiplier, -35 * multiplier]);
  const cardY2 = useTransform(smoothAbout, [0, 1], [25 * multiplier, -15 * multiplier]);
  const cardY3 = useTransform(smoothAbout, [0, 1], [40 * multiplier, -30 * multiplier]);
  const cardYList = [cardY0, cardY1, cardY2, cardY3];

  // Auto-activate steps progressively based on scroll position while preserving clicks
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.35) {
      setActiveStep(0);
    } else if (latest < 0.50) {
      setActiveStep(1);
    } else if (latest < 0.65) {
      setActiveStep(2);
    } else {
      setActiveStep(3);
    }
  });

  return (
    <section 
      ref={aboutRef}
      className="w-full py-24 lg:py-32 bg-white relative overflow-hidden" 
      data-testid="section-about"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Editorial Section Header with scroll lift */}
        <motion.div 
          style={{ y: headerY }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16"
        >
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-[#214ECF] tracking-widest uppercase mb-3 block">
              Venture Creation Model
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B1220]">
              Where Ideas Become Enduring Businesses.
            </h2>
          </div>
          <Link href="/about">
            <span className="text-sm font-semibold text-[#0B1220] hover:text-[#214ECF] inline-flex items-center gap-2 group cursor-pointer pb-1">
              <span>More About Healweal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>

        {/* Connecting Progress Line */}
        <div className="hidden lg:block relative w-full h-1 bg-black/[0.05] rounded-full mb-8 overflow-hidden">
          <motion.div 
            style={{ width: progressLineWidth }}
            className="h-full bg-[#214ECF] rounded-full"
          />
        </div>

        {/* Interactive 4-step Process Cards with Floating Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((item, index) => {
            const isActive = activeStep === index;

            return (
              <motion.div
                key={item.step}
                style={{ y: cardYList[index] }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between min-h-[290px] cursor-pointer relative overflow-hidden ${
                  isActive
                    ? "bg-[#F5F7FA] border-[#214ECF] shadow-md"
                    : "bg-white border-black/[0.07] hover:border-black/[0.14]"
                }`}
                onClick={() => setActiveStep(index)}
              >
                {/* Top active indicator line */}
                {isActive && (
                  <motion.div 
                    layoutId="activeStepLine"
                    className="absolute top-0 left-0 right-0 h-1 bg-[#214ECF]" 
                  />
                )}

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-2xl font-extrabold tracking-tight transition-colors ${
                      isActive ? "text-[#214ECF]" : "text-[#0B1220]/25"
                    }`}>
                      {item.step}
                    </span>
                    <span className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      isActive ? "bg-[#214ECF]" : "bg-black/10"
                    }`} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B1220] mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#214ECF] mb-3 uppercase tracking-wider">
                    {item.headline}
                  </div>
                </div>
                <p className="text-sm text-[#667085] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════
// 4. OUR COMPANIES SECTION (Floating Cards Parallax & Rotation)
// ══════════════════════════════════════════════════════
const CompaniesSection = ({ multiplier }: { multiplier: number }) => {
  const compRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: compRef,
    offset: ["start end", "end start"],
  });

  const smoothComp = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const headerY = useTransform(smoothComp, [0, 0.4], [25 * multiplier, -10 * multiplier]);

  // Floating parallax for 2+3 cards layout with slight rotation on top row
  const cardY0 = useTransform(smoothComp, [0, 1], [35 * multiplier, -25 * multiplier]);
  const cardRot0 = useTransform(smoothComp, [0, 1], [-0.6 * multiplier, 0.4 * multiplier]);

  const cardY1 = useTransform(smoothComp, [0, 1], [50 * multiplier, -35 * multiplier]);
  const cardRot1 = useTransform(smoothComp, [0, 1], [0.6 * multiplier, -0.4 * multiplier]);

  const cardY2 = useTransform(smoothComp, [0, 1], [40 * multiplier, -20 * multiplier]);
  const cardY3 = useTransform(smoothComp, [0, 1], [20 * multiplier, -35 * multiplier]);
  const cardY4 = useTransform(smoothComp, [0, 1], [45 * multiplier, -15 * multiplier]);

  const cardProps = [
    { y: cardY0, rotate: cardRot0 },
    { y: cardY1, rotate: cardRot1 },
    { y: cardY2, rotate: undefined },
    { y: cardY3, rotate: undefined },
    { y: cardY4, rotate: undefined },
  ];

  return (
    <section 
      ref={compRef}
      className="w-full py-24 lg:py-32 bg-[#F5F7FA] overflow-hidden" 
      data-testid="section-companies"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header with parallax lift */}
        <motion.div 
          style={{ y: headerY }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-bold text-[#214ECF] tracking-widest uppercase mb-3 block">
            Portfolio Operating Group
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B1220] mb-4">
            Different Businesses. One Way of Thinking.
          </h2>
          <p className="text-lg text-[#667085] leading-relaxed">
            Diverse industries. Specialized platforms. One shared commitment: Build Better.
          </p>
        </motion.div>

        {/* 2 + 3 Editorial Grid with Floating Parallax & 4-8px Lift on Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {companies.map((company, index) => {
            const spanClass = index < 2 ? "lg:col-span-3" : "lg:col-span-2";
            const currentProp = cardProps[index];

            return (
              <motion.div
                key={company.id}
                style={{ 
                  y: currentProp.y, 
                  rotate: currentProp.rotate ? currentProp.rotate : 0 
                }}
                className={`${spanClass} flex`}
              >
                <motion.div 
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="hw-card-editorial p-8 sm:p-10 flex flex-col justify-between w-full group relative overflow-hidden bg-white shadow-xs hover:shadow-xl transition-shadow"
                >
                  {/* Top Accent line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#214ECF] opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    {/* Logo and Tag */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-2.5">
                        <div className="h-10 w-10 rounded-xl bg-white border border-black/[0.06] p-1.5 flex items-center justify-center overflow-hidden flex-shrink-0">
                          <img
                            src={company.brandIcon}
                            alt={`${company.name} mark`}
                            className="h-full w-full object-contain mix-blend-multiply"
                          />
                        </div>
                        <div className="h-14 w-28 bg-[#F5F7FA] rounded-xl border border-black/[0.06] flex items-center justify-center overflow-hidden">
                        <img
                          src={company.logo}
                          alt={`${company.name} logo`}
                          className={`${company.logoClass} object-contain mix-blend-multiply transition-transform duration-300`}
                        />
                        </div>
                      </div>
                      <span className="hw-tag-pill text-[11px] font-bold">
                        {company.industry}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-[#0B1220] mb-2 tracking-tight group-hover:text-[#214ECF] transition-colors">
                      {company.name}
                    </h3>
                    <div className="text-sm font-semibold text-[#0B1220] mb-3">
                      {company.headline}
                    </div>
                    <p className="text-sm text-[#667085] leading-relaxed mb-6">
                      {company.description}
                    </p>
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center justify-between pt-6 border-t border-black/[0.06] mt-auto">
                    <Link href={`/companies#${company.id}`}>
                      <span className="text-xs font-bold text-[#0B1220] hover:text-[#214ECF] cursor-pointer inline-flex items-center gap-1 group/btn">
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </span>
                    </Link>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#214ECF] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Visit Website</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════
// 5. INDUSTRIES SECTION (Split-Screen Storytelling & Watermark Parallax)
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
  const watermarkY = useTransform(smoothInd, [0, 1], [35 * multiplier, -45 * multiplier]);

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
      className="w-full py-24 lg:py-32 bg-white overflow-hidden" 
      data-testid="section-industries"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold text-[#214ECF] tracking-widest uppercase mb-3 block">
            Strategic Sectors
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B1220]">
            Building Where the Future Is Taking Shape.
          </h2>
        </div>

        {/* Split-screen Editorial Storytelling with independent layer movements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Interactive Sector Selector with scroll parallax */}
          <motion.div 
            style={{ y: leftY }}
            className="lg:col-span-5 flex flex-col gap-2"
          >
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              const isActive = activeIndustry === i;

              return (
                <button
                  key={ind.number}
                  onClick={() => setActiveIndustry(i)}
                  className={`p-5 rounded-2xl text-left transition-all duration-300 flex items-center justify-between border ${
                    isActive
                      ? "bg-[#F5F7FA] border-[#214ECF]/30 shadow-xs"
                      : "bg-white border-transparent hover:bg-black/[0.02]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-base font-bold font-mono ${isActive ? "text-[#214ECF]" : "text-[#98A2B3]"}`}>
                      {ind.number}
                    </span>
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isActive ? "bg-[#214ECF] text-white" : "bg-[#F5F7FA] text-[#667085]"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-lg font-bold ${isActive ? "text-[#0B1220]" : "text-[#667085]"}`}>
                        {ind.name}
                      </span>
                    </div>
                  </div>
                  {isActive && (
                    <ArrowRight className="w-4 h-4 text-[#214ECF]" />
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* Right: Immersive Detail Display Card with deeper parallax */}
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
                className="h-full p-8 sm:p-12 rounded-3xl bg-[#F5F7FA] border border-black/[0.08] flex flex-col justify-between relative overflow-hidden shadow-xs"
              >
                {/* Oversized watermark number with independent parallax */}
                <motion.div 
                  style={{ y: watermarkY }}
                  className="absolute right-4 bottom-2 text-[120px] font-extrabold text-black/[0.03] select-none pointer-events-none leading-none"
                >
                  {industries[activeIndustry].number}
                </motion.div>

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="hw-tag-pill text-xs font-bold text-[#214ECF]">
                      {industries[activeIndustry].metric}
                    </span>
                    <span className="text-xs font-bold text-[#0B1220] bg-white px-3 py-1.5 rounded-full border border-black/[0.06]">
                      {industries[activeIndustry].company}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-bold text-[#0B1220] mb-3 tracking-tight">
                    {industries[activeIndustry].tagline}
                  </h3>

                  <p className="text-base sm:text-lg text-[#667085] leading-relaxed mb-6 font-normal">
                    {industries[activeIndustry].description}
                  </p>
                </div>

                <div className="pt-6 border-t border-black/[0.08] flex items-center justify-between z-10">
                  <span className="text-xs text-[#0B1220] font-semibold">
                    {industries[activeIndustry].highlight}
                  </span>
                  <Link href="/companies">
                    <span className="text-xs font-bold text-[#214ECF] hover:underline inline-flex items-center gap-1 cursor-pointer">
                      <span>Explore Portfolio</span>
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
// 6. HOW WE BUILD (Timeline Progress Line & Staggered Cards)
// ══════════════════════════════════════════════════════
const HowWeBuildSection = ({ multiplier }: { multiplier: number }) => {
  const timeRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: timeRef,
    offset: ["start end", "end start"],
  });

  const smoothTime = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const progressLineWidth = useTransform(smoothTime, [0.15, 0.85], ["0%", "100%"]);

  // Staggered floating cards
  const cardY0 = useTransform(smoothTime, [0, 1], [25 * multiplier, -15 * multiplier]);
  const cardY1 = useTransform(smoothTime, [0, 1], [45 * multiplier, -30 * multiplier]);
  const cardY2 = useTransform(smoothTime, [0, 1], [20 * multiplier, -20 * multiplier]);
  const cardY3 = useTransform(smoothTime, [0, 1], [40 * multiplier, -35 * multiplier]);
  const cardY4 = useTransform(smoothTime, [0, 1], [25 * multiplier, -15 * multiplier]);
  const cardY5 = useTransform(smoothTime, [0, 1], [50 * multiplier, -40 * multiplier]);
  const cardYList = [cardY0, cardY1, cardY2, cardY3, cardY4, cardY5];

  return (
    <section 
      ref={timeRef}
      className="w-full py-28 lg:py-36 bg-[#0B1220] text-white overflow-hidden relative" 
      data-testid="section-how-we-build"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold text-[#22C1FF] tracking-widest uppercase mb-3 block">
            Systematic Execution
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            From First Principle to Full Scale.
          </h2>
          <p className="text-lg text-[#98A2B3] leading-relaxed font-normal">
            A disciplined, repeatable venture creation model engineered to identify, de-risk, and scale transformative platforms.
          </p>
        </div>

        {/* Progressive Timeline Connection Bar */}
        <div className="hidden lg:block relative w-full h-1 bg-white/10 rounded-full mb-10 overflow-hidden">
          <motion.div 
            style={{ width: progressLineWidth }}
            className="h-full bg-gradient-to-r from-[#214ECF] to-[#22C1FF] rounded-full"
          />
        </div>

        {/* Timeline Grid with connecting journey progression */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {timelineSteps.map((step, idx) => (
            <motion.div
              key={step.num}
              style={{ y: cardYList[idx] }}
              className="h-full"
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="h-full p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#214ECF] hover:bg-white/[0.06] transition-all flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="text-xs font-mono text-[#22C1FF] font-semibold mb-3 flex items-center justify-between">
                    <span>STAGE {step.num}</span>
                    <span className="w-2 h-2 rounded-full bg-[#214ECF]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-[#98A2B3] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════
// 7. TECHNOLOGY & INNOVATION (Column-Based Parallax & Floating Icons)
// ══════════════════════════════════════════════════════
const TechnologySection = ({ multiplier }: { multiplier: number }) => {
  const techRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: techRef,
    offset: ["start end", "end start"],
  });

  const smoothTech = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const headerY = useTransform(smoothTech, [0, 0.4], [25 * multiplier, -10 * multiplier]);

  // 3-Column floating parallax
  const colY0 = useTransform(smoothTech, [0, 1], [30 * multiplier, -25 * multiplier]);
  const colY1 = useTransform(smoothTech, [0, 1], [50 * multiplier, -15 * multiplier]);
  const colY2 = useTransform(smoothTech, [0, 1], [20 * multiplier, -35 * multiplier]);
  const colTransforms = [colY0, colY1, colY2, colY0, colY1, colY2];

  // Internal Icon floating parallax
  const iconY = useTransform(smoothTech, [0, 1], [8 * multiplier, -8 * multiplier]);

  return (
    <section 
      ref={techRef}
      className="w-full py-24 lg:py-32 bg-white overflow-hidden" 
      data-testid="section-technology"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div 
          style={{ y: headerY }}
          className="max-w-3xl mb-16"
        >
          <span className="text-xs font-bold text-[#214ECF] tracking-widest uppercase mb-3 block">
            Core Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B1220] mb-4">
            Technology Is How We Turn Ambition Into Reality.
          </h2>
          <p className="text-lg text-[#667085] leading-relaxed">
            We leverage modern digital primitives, machine intelligence, and high-performance engineering to build enduring technological advantages.
          </p>
        </motion.div>

        {/* Sequential Cards Grid with Multi-Plane Depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techPillars.map((item, index) => {
            const Icon = item.icon;
            const currentY = colTransforms[index];

            return (
              <motion.div
                key={item.title}
                style={{ y: currentY }}
                className="h-full"
              >
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full p-8 rounded-2xl border border-black/[0.07] bg-[#F5F7FA]/40 hover:bg-white hover:border-[#214ECF]/30 hover:shadow-md transition-all duration-300 group"
                >
                  <motion.div 
                    style={{ y: iconY }}
                    className="w-10 h-10 rounded-xl bg-white border border-black/[0.08] shadow-xs flex items-center justify-center text-[#214ECF] mb-6 group-hover:scale-105 transition-transform"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-[#0B1220] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#667085] leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════
// 8. IMPACT SECTION (Large Typography Reveal & Floating Pillars)
// ══════════════════════════════════════════════════════
const ImpactSection = ({ multiplier }: { multiplier: number }) => {
  const impactRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: impactRef,
    offset: ["start end", "end start"],
  });

  const smoothImpact = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const headingScale = useTransform(smoothImpact, [0.1, 0.5], multiplier ? [0.96, 1] : [1, 1]);
  const headingY = useTransform(smoothImpact, [0, 0.6], [25 * multiplier, -10 * multiplier]);

  // Alternating card parallax
  const oddY = useTransform(smoothImpact, [0, 1], [25 * multiplier, -15 * multiplier]);
  const evenY = useTransform(smoothImpact, [0, 1], [45 * multiplier, -30 * multiplier]);

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
      className="w-full py-24 lg:py-32 bg-[#F5F7FA] overflow-hidden" 
      id="impact" 
      data-testid="section-impact"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div 
          style={{ scale: headingScale, y: headingY }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-bold text-[#214ECF] tracking-widest uppercase mb-3 block">
            Long-Term Value
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B1220] mb-4">
            Growth Creates Value. Purpose Gives It Meaning.
          </h2>
          <p className="text-lg text-[#667085] leading-relaxed">
            We measure our enterprise success not solely by business performance, but by the tangible human improvements created across our platforms.
          </p>
        </motion.div>

        {/* 6 Impact Pillars with alternating floating vertical stagger */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {impactPillars.map((pillar, idx) => (
            <motion.div 
              key={pillar.title} 
              style={{ y: idx % 2 === 0 ? oddY : evenY }}
              className="h-full"
            >
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-white p-6 rounded-2xl border border-black/[0.06] shadow-xs flex flex-col justify-between min-h-[165px] transition-all"
              >
                <span className="text-xs font-mono text-[#214ECF] font-bold">0{idx + 1}</span>
                <div>
                  <h3 className="font-bold text-lg text-[#0B1220] mb-1">{pillar.title}</h3>
                  <p className="text-xs text-[#667085] leading-normal">{pillar.desc}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════
// 9. HEALWEAL AT A GLANCE (Animated Count-Up & Parallax)
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
      className="w-full py-20 bg-white border-y border-black/[0.06] overflow-hidden" 
      data-testid="section-glance"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-black/[0.06]">
          <motion.div 
            style={{ y: colY0 }}
            className="pt-4 lg:pt-0 lg:px-6 first:px-0"
          >
            <div className="text-5xl sm:text-6xl font-extrabold text-[#0B1220] tracking-tight">
              <Counter target={5} />
            </div>
            <div className="text-sm font-semibold text-[#0B1220] mt-2">Operating Businesses</div>
            <div className="text-xs text-[#667085] mt-1">Hapdax, Kepwe, Zelevos, Thinkatic, HBS</div>
          </motion.div>

          <motion.div 
            style={{ y: colY1 }}
            className="pt-4 lg:pt-0 lg:px-6"
          >
            <div className="text-5xl sm:text-6xl font-extrabold text-[#0B1220] tracking-tight">
              <Counter target={5} />
            </div>
            <div className="text-sm font-semibold text-[#0B1220] mt-2">Primary Industries</div>
            <div className="text-xs text-[#667085] mt-1">Healthcare, FinTech, Commerce, Tech, Education</div>
          </motion.div>

          <motion.div 
            style={{ y: colY2 }}
            className="pt-4 lg:pt-0 lg:px-6"
          >
            <div className="text-5xl sm:text-6xl font-extrabold text-[#214ECF] tracking-tight">
              <Counter target={1} />
            </div>
            <div className="text-sm font-semibold text-[#0B1220] mt-2">Shared Philosophy</div>
            <div className="text-xs text-[#667085] mt-1">Build Better across every initiative</div>
          </motion.div>

          <motion.div 
            style={{ y: colY3 }}
            className="pt-4 lg:pt-0 lg:px-6"
          >
            <motion.div 
              whileHover={{ scale: 1.08 }}
              className="text-5xl sm:text-6xl font-extrabold text-[#0B1220] tracking-tight cursor-default inline-block"
            >
              ∞
            </motion.div>
            <div className="text-sm font-semibold text-[#0B1220] mt-2">Possibilities</div>
            <div className="text-xs text-[#667085] mt-1">Continuously exploring new ventures</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════
// 10. CAREERS TEASER (Dark Background Parallax)
// ══════════════════════════════════════════════════════
const CareersTeaserSection = ({ multiplier }: { multiplier: number }) => {
  const careersRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: careersRef,
    offset: ["start end", "end start"],
  });

  const smoothCareers = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const bgGlowY = useTransform(smoothCareers, [0, 1], [-30 * multiplier, 40 * multiplier]);
  const leftY = useTransform(smoothCareers, [0, 1], [25 * multiplier, -20 * multiplier]);
  const rightY = useTransform(smoothCareers, [0, 1], [40 * multiplier, -15 * multiplier]);

  return (
    <section 
      ref={careersRef}
      className="w-full py-24 lg:py-32 bg-[#0B1220] text-white relative overflow-hidden" 
      data-testid="section-careers-teaser"
    >
      <motion.div 
        style={{ y: bgGlowY }}
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-[#214ECF]/10 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div 
            style={{ y: leftY }}
            className="lg:col-span-8"
          >
            <span className="text-xs font-bold text-[#22C1FF] tracking-widest uppercase mb-3 block">
              Join The Builders
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Come Build What Doesn&apos;t Exist Yet.
            </h2>
            <p className="text-lg text-[#98A2B3] max-w-2xl leading-relaxed">
              Join visionary builders, engineers, and operators solving defining challenges across healthcare, finance, commerce, and AI. Take ownership and build scalable ventures that matter.
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
              <span className="px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors cursor-pointer text-sm">
                Meet Our Teams
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════
// 11. PARTNERSHIP (Floating Action Cards)
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
      desc: "Strategic alliances, corporate venture initiatives, and high-impact co-development across our operating sectors.",
    },
    {
      title: "Work With Our Businesses",
      desc: "Direct enterprise access to Hapdax clinical software, Kepwe market technology, Zelevos products, and Thinkatic AI.",
    },
    {
      title: "Explore Opportunities",
      desc: "For ambitious founders and technical leaders seeking an institutional venture builder to launch their next company.",
    },
  ];

  return (
    <section 
      ref={partRef}
      className="w-full py-24 lg:py-32 bg-white overflow-hidden" 
      data-testid="section-partnership"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#214ECF] tracking-widest uppercase mb-3 block">
            Collaboration
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B1220] mb-4">
            Great Things Start With the Right Conversation.
          </h2>
          <p className="text-lg text-[#667085] leading-relaxed">
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
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="h-full p-8 rounded-2xl border border-black/[0.08] bg-[#F5F7FA]/50 hover:bg-white hover:border-[#214ECF] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-[#0B1220] mb-3">{block.title}</h3>
                  <p className="text-sm text-[#667085] leading-relaxed mb-6">{block.desc}</p>
                </div>
                <Link href="/contact">
                  <span className="text-xs font-bold text-[#214ECF] inline-flex items-center gap-1 cursor-pointer group">
                    <span>Initiate Dialogue</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </motion.div>
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
// 12. FINAL CINEMATIC CTA (Scale-Up Headline & Atmosphere Drift)
// ══════════════════════════════════════════════════════
const FinalCtaSection = ({ multiplier }: { multiplier: number }) => {
  const ctaRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });

  const smoothCta = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const bgAtmosphereY = useTransform(smoothCta, [0, 1], [-40 * multiplier, 30 * multiplier]);
  const bgScale = useTransform(smoothCta, [0, 1], multiplier ? [0.92, 1.08] : [1, 1]);
  const headingScale = useTransform(smoothCta, [0.15, 0.7], multiplier ? [0.95, 1.02] : [1, 1]);
  const headingY = useTransform(smoothCta, [0, 1], [35 * multiplier, -15 * multiplier]);

  return (
    <section 
      ref={ctaRef}
      className="w-full py-28 lg:py-36 bg-[#0B1220] text-white text-center relative overflow-hidden" 
      data-testid="section-final-cta"
    >
      <motion.div 
        style={{ y: bgAtmosphereY, scale: bgScale }}
        className="absolute inset-0 hw-bg-grid-dark opacity-20 pointer-events-none" 
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#22C1FF] uppercase tracking-widest">
            The Future Is Built Today
          </div>

          <motion.h2 
            style={{ scale: headingScale, y: headingY }}
            initial={{ opacity: 0, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl lg:text-[76px] font-extrabold tracking-tight text-white leading-tight"
          >
            Let&apos;s Build What&apos;s Next.
          </motion.h2>

          <p className="text-lg sm:text-xl text-[#98A2B3] max-w-xl font-normal leading-relaxed">
            Healweal is building businesses for a better future. Reach out to our leadership team and explore what we can create together.
          </p>

          <div className="pt-4">
            <Link href="/contact">
              <span className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-base font-semibold text-[#0B1220] bg-white hover:bg-[#22C1FF] hover:text-[#0B1220] transition-all duration-300 shadow-xl cursor-pointer group">
                <span>Let&apos;s Talk</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
  const [activeStep, setActiveStep] = useState(0);
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  
  // Parallax configuration: mobile detection & reduced motion support
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
      className="bg-white w-full flex flex-col min-h-screen text-[#111827] overflow-x-hidden selection:bg-[#214ECF] selection:text-white"
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

      {/* 3. ABOUT SECTION */}
      <AboutSection 
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        multiplier={multiplier}
      />

      {/* 4. OUR COMPANIES */}
      <CompaniesSection multiplier={multiplier} />

      {/* 5. INDUSTRIES */}
      <IndustriesSection 
        activeIndustry={activeIndustry}
        setActiveIndustry={setActiveIndustry}
        multiplier={multiplier}
      />

      {/* 6. HOW WE BUILD */}
      <HowWeBuildSection multiplier={multiplier} />

      {/* 7. TECHNOLOGY & INNOVATION */}
      <TechnologySection multiplier={multiplier} />

      {/* 8. IMPACT */}
      <ImpactSection multiplier={multiplier} />

      {/* 9. HEALWEAL AT A GLANCE */}
      <GlanceSection multiplier={multiplier} />

      {/* 10. CAREERS TEASER */}
      <CareersTeaserSection multiplier={multiplier} />

      {/* 11. PARTNERSHIP */}
      <PartnershipSection multiplier={multiplier} />

      {/* 12. FINAL CINEMATIC CTA */}
      <FinalCtaSection multiplier={multiplier} />

      <Footer />
    </div>
  );
};
