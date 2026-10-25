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
    title: "Travel & Reservation Architecture",
    desc: "Building real-time booking orchestration, dynamic itinerary synthesis, and distributed availability engines.",
    icon: ShoppingBag,
    metric: "Instant Itinerary Sync",
    technologies: ["Real-Time Inventory", "Concierge APIs", "Distributed Cache"],
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
    desc: "Centralizing business intelligence across our platform portfolio to detect micro-market trends, optimize supply chains, and forecast capital needs.",
    icon: LineChart,
    metric: "Predictive Intelligence",
    technologies: ["Lakehouse Architecture", "Real-Time ETL", "Anomaly Detection"],
  },
];

export const InnovationPage = () => {
  return (
    <div className="bg-white w-full flex flex-col min-h-screen text-black overflow-x-hidden">
      <Navigation />

      {/* Hero */}
      <section className="relative w-full pt-36 pb-20 lg:pt-44 lg:pb-28 bg-white border-b border-black/[0.08] overflow-hidden">
        <div className="absolute inset-0 hw-bg-grid opacity-50 pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F4F5] border border-black/[0.08] mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-black" />
              <span className="text-xs font-bold text-black tracking-wider uppercase">
                R&D & Future Technology
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-[68px] font-bold tracking-tight text-black leading-[1.08] mb-6"
              data-testid="heading-innovation-hero"
            >
              Building What Comes Next.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#52525B] leading-relaxed font-normal"
            >
              At Healweal, innovation is our core operating engine. Explore our technology research areas and the technical building blocks shaping our platform.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Innovation Lab Spotlight (White Card Section) */}
      <section className="w-full py-20 bg-white border-b border-black/[0.08] relative overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-black/[0.08] shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs font-mono font-bold text-black tracking-widest uppercase mb-2 block">
                HEALWEAL INNOVATION LAB
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-black">
                Where Applied Research Becomes Production Enterprise
              </h2>
              <p className="text-sm text-[#52525B] leading-relaxed">
                Our internal research arm prototypes frontier technologies in machine intelligence, quantitative finance, and healthcare systems, translating lab breakthroughs into operating systems within weeks.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="p-5 rounded-2xl bg-[#F4F4F5] border border-black/[0.08] text-center flex-1 sm:w-36">
                <div className="text-3xl font-bold text-black">7+</div>
                <div className="text-[11px] font-medium text-[#71717A] mt-1">Core Domains</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#F4F4F5] border border-black/[0.08] text-center flex-1 sm:w-36">
                <div className="text-3xl font-bold text-black">100%</div>
                <div className="text-[11px] font-medium text-[#71717A] mt-1">Proprietary IP</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas Grid */}
      <section className="w-full py-24 lg:py-32 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-bold text-black tracking-widest uppercase mb-3 block">
              Core Technologies
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-4">
              Strategic Research & Development
            </h2>
            <p className="text-base text-[#52525B]">
              Seven specialized technical pillars that power our current platform entities and future deployments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {innovationAreas.map((area) => {
              const Icon = area.icon;

              return (
                <div
                  key={area.title}
                  className="hw-card-lift p-8 flex flex-col justify-between bg-white border border-black/[0.08] shadow-xs cursor-default"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-10 h-10 rounded-xl bg-[#F4F4F5] border border-black/[0.08] flex items-center justify-center text-black">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-black bg-[#F4F4F5] px-2.5 py-1 rounded-full border border-black/[0.06]">
                        {area.metric}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-black mb-3 tracking-tight">
                      {area.title}
                    </h3>
                    <p className="text-sm text-[#52525B] leading-relaxed mb-6">
                      {area.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/[0.08]">
                    <div className="flex flex-wrap gap-1.5">
                      {area.technologies.map((t) => (
                        <span key={t} className="text-[11px] font-medium text-[#52525B] bg-[#F4F4F5] px-2 py-0.5 rounded-md">
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
      <section className="w-full py-20 bg-white text-center border-t border-black/[0.08]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3">
            Interested in Technological Co-Development?
          </h2>
          <p className="text-[#52525B] max-w-xl mx-auto mb-8 text-sm sm:text-base">
            We partner with enterprises to co-develop, test, and deploy proprietary software architectures.
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
