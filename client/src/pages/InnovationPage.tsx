import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Bot, 
  Cpu, 
  Layers, 
  Database, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  CreditCard, 
  ShoppingBag, 
  GraduationCap, 
  LineChart 
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const innovationAreas = [
  {
    title: "Artificial Intelligence & Agent Systems",
    desc: "Developing autonomous task orchestration, specialized small language models, and deterministic verification layers that replace brittle manual processes.",
    icon: Bot,
    metric: "Autonomous Operations",
    technologies: ["LLM Orchestration", "Vector Embeddings", "Context Compression"],
  },
  {
    title: "Automation & Enterprise Workflows",
    desc: "Connecting disparate ERP, clinical, and banking systems into cohesive event-driven automated pipelines with millisecond event latency.",
    icon: Layers,
    metric: "Zero-Latency Routing",
    technologies: ["Event-Driven Pub/Sub", "Kafka", "Temporal Workflows"],
  },
  {
    title: "FinTech & Quantitative Infrastructure",
    desc: "Engineering low-latency market gateways, smart portfolio rebalancing algorithms, and multi-asset compliance monitoring engines.",
    icon: CreditCard,
    metric: "Institutional Precision",
    technologies: ["Real-Time Order Routing", "Quantitative Risk Models", "Algorithmic Execution"],
  },
  {
    title: "HealthTech & Clinical Interoperability",
    desc: "Unifying clinical documentation, OPD appointment management, and patient telemetry under secure, consent-driven standards (ABDM, HIPAA).",
    icon: Activity,
    metric: "Unified Health Records",
    technologies: ["FHIR Standards", "Encrypted Telemetry", "ABDM Protocol"],
  },
  {
    title: "Digital Commerce Architecture",
    desc: "Building headless, edge-rendered storefronts and real-time inventory synchronization systems capable of handling exponential traffic spikes.",
    icon: ShoppingBag,
    metric: "Sub-Second Checkout",
    technologies: ["Edge Caching", "Real-Time Stock Sync", "Modular Microservices"],
  },
  {
    title: "EdTech & Interactive Learning Labs",
    desc: "Re-imagining executive leadership education through hands-on business simulation sandboxes, cohort accountability, and adaptive progress tracking.",
    icon: GraduationCap,
    metric: "Pragmatic Skill Mastery",
    technologies: ["Cohort Analytics", "Venture Sandboxes", "Project Evaluation Engines"],
  },
  {
    title: "Data & Predictive Analytics",
    desc: "Centralizing business intelligence across our conglomerate portfolio to detect micro-market trends, optimize supply chains, and forecast capital needs.",
    icon: LineChart,
    metric: "Predictive Intelligence",
    technologies: ["Lakehouse Architecture", "Real-Time ETL", "Anomaly Detection"],
  },
];

export const InnovationPage = () => {
  return (
    <div className="bg-white w-full flex flex-col min-h-screen text-[#111827] overflow-x-hidden selection:bg-[#214ECF] selection:text-white">
      <Navigation />

      {/* Hero */}
      <section className="relative w-full pt-36 pb-20 lg:pt-44 lg:pb-28 bg-[#F5F7FA] border-b border-black/[0.06] overflow-hidden">
        <div className="absolute inset-0 hw-bg-grid opacity-60 pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] mb-6 shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#214ECF]" />
              <span className="text-xs font-semibold text-[#0B1220] tracking-wide uppercase">
                R&D & Future Technology
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-[72px] font-bold tracking-tight text-[#0B1220] leading-[1.05] mb-6"
              data-testid="heading-innovation-hero"
            >
              Building What Comes Next.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#667085] leading-relaxed font-normal"
            >
              At Healweal, innovation is not a marketing department—it is our primary operating engine. Explore our technology research areas and the technical building blocks shaping our companies.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Innovation Lab Visual Banner (Apple-style dark moment) */}
      <section className="w-full py-20 bg-[#0B1220] text-white relative overflow-hidden">
        <div className="absolute inset-0 hw-bg-grid-dark opacity-30 pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs font-mono font-bold text-[#22C1FF] tracking-widest uppercase mb-2 block">
                HEALWEAL INNOVATION LAB
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
                Where Applied Research Becomes Production Enterprise
              </h2>
              <p className="text-sm text-[#98A2B3] leading-relaxed">
                Our internal research arm prototypes frontier technologies in machine intelligence, quantitative finance, and healthcare systems, translating lab breakthroughs into operating businesses within weeks.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10 text-center flex-1 sm:w-36">
                <div className="text-2xl font-bold text-white">7+</div>
                <div className="text-[11px] text-[#98A2B3] mt-1">Active Core Domains</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10 text-center flex-1 sm:w-36">
                <div className="text-2xl font-bold text-[#22C1FF]">100%</div>
                <div className="text-[11px] text-[#98A2B3] mt-1">Proprietary IP</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas Grid */}
      <section className="w-full py-24 lg:py-32 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-bold text-[#214ECF] tracking-widest uppercase mb-3 block">
              Core Technologies
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1220] mb-4">
              Strategic Research & Development
            </h2>
            <p className="text-base text-[#667085]">
              Seven specialized technical pillars that power our current portfolio and future venture launches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {innovationAreas.map((area, i) => {
              const Icon = area.icon;

              return (
                <div
                  key={area.title}
                  className="hw-card-editorial p-8 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-10 h-10 rounded-xl bg-[#F5F7FA] border border-black/[0.08] flex items-center justify-center text-[#214ECF]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-[#0B1220] bg-[#F5F7FA] px-2.5 py-1 rounded-full border border-black/[0.06]">
                        {area.metric}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#0B1220] mb-3 tracking-tight">
                      {area.title}
                    </h3>
                    <p className="text-sm text-[#667085] leading-relaxed mb-6">
                      {area.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/[0.06]">
                    <div className="flex flex-wrap gap-1.5">
                      {area.technologies.map((t) => (
                        <span key={t} className="text-[11px] font-medium text-[#667085] bg-[#F5F7FA] px-2 py-0.5 rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing Callout */}
      <section className="w-full py-20 bg-[#F5F7FA] text-center border-t border-black/[0.06]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1220] mb-3">
            Interested in Technological Co-Development?
          </h2>
          <p className="text-[#667085] max-w-xl mx-auto mb-8 text-sm sm:text-base">
            We partner with enterprises to co-develop, test, and license proprietary software architectures.
          </p>
          <Link href="/contact">
            <span className="hw-btn-primary cursor-pointer">
              <span>Connect with R&D</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};
