import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Layers, 
  Cpu, 
  TrendingUp, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  CreditCard, 
  ShoppingBag,
  ExternalLink 
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const pillars = [
  {
    num: "01",
    title: "Venture Building",
    tagline: "From Unmet Need to Operational Entity",
    description: "We don't simply fund ideas; we architect companies from ground zero. Identifying critical white spaces across healthcare, finance, and enterprise technology, our core team builds initial MVPs, validates customer traction, and seeds core leadership.",
    related: ["Hapdax", "Kepwe", "Zelevos"],
    icon: Layers,
  },
  {
    num: "02",
    title: "Product Development",
    tagline: "Apple-Level Design & Ergonomics",
    description: "World-class digital experiences require uncompromising craft. We design human-centered interfaces, intuitive clinical and financial workflows, and accessible web/mobile ecosystems that turn complex backend algorithms into effortless user interactions.",
    related: ["Kepwe", "Thinkatic"],
    icon: Sparkles,
  },
  {
    num: "03",
    title: "Technology & Engineering",
    tagline: "Mission-Critical Resilient Architectures",
    description: "Our engineering organization builds cloud-native platforms engineered for 99.99% availability, strict regulatory compliance (HIPAA, ABDM, SEBI/RBI standards), and high-throughput real-time processing using modern TypeScript, Go, and distributed cloud microservices.",
    related: ["Thinkatic", "Hapdax", "Kepwe"],
    icon: Cpu,
  },
  {
    num: "04",
    title: "Brand Building & Narrative",
    tagline: "Trust, Authenticity & Market Authority",
    description: "A great product without a resonant story fails to scale. We establish category-defining brand identities, transparent customer communication, and institutional trust that compounds with every customer interaction.",
    related: ["Zelevos", "HBS", "HAt"],
    icon: ShieldCheck,
  },
  {
    num: "05",
    title: "Operations & Governance",
    tagline: "Institutional Discipline at Startup Speed",
    description: "Rapid scaling requires rigorous compliance, financial controls, and operational playbooks. We install enterprise management systems, legal frameworks, and recruitment pipelines that allow our businesses to execute with surgical discipline.",
    related: ["All Portfolio Companies"],
    icon: Activity,
  },
  {
    num: "06",
    title: "Growth & Scale",
    tagline: "Compounding Market Expansion",
    description: "Once product-market fit is mathematically established, we deploy capital, enterprise distribution channels, and strategic corporate partnerships to achieve durable market leadership and long-term enterprise capitalization.",
    related: ["Kepwe", "Hapdax"],
    icon: TrendingUp,
  },
];

export const WhatWeDoPage = () => {
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
                Operating Model
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-[72px] font-bold tracking-tight text-[#0B1220] leading-[1.05] mb-6"
              data-testid="heading-what-we-do"
            >
              We Build. We Operate. We Scale.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#667085] leading-relaxed font-normal"
            >
              Healweal provides full-stack venture building capabilities. From inception and technological research to enterprise distribution and institutional scaling, explore our end-to-end building model.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 6 Capabilities Sections */}
      <section className="w-full py-24 lg:py-32 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:gap-16">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;

              return (
                <div
                  key={pillar.num}
                  className="p-8 sm:p-12 rounded-3xl border border-black/[0.07] bg-[#F5F7FA]/50 hover:bg-white hover:border-[#214ECF]/30 hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                >
                  <div className="lg:col-span-1 text-4xl sm:text-5xl font-extrabold text-[#214ECF]">
                    {pillar.num}
                  </div>

                  <div className="lg:col-span-7 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#214ECF]/10 text-[#214ECF] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1220] tracking-tight">
                        {pillar.title}
                      </h2>
                    </div>
                    <div className="text-sm font-semibold text-[#0B1220]">
                      {pillar.tagline}
                    </div>
                    <p className="text-base text-[#667085] leading-relaxed mt-2">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-black/[0.06] shadow-xs flex flex-col gap-3">
                    <span className="text-xs font-bold text-[#667085] uppercase tracking-wider">
                      Related Businesses:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {pillar.related.map((company) => (
                        <span key={company} className="px-3 py-1 bg-[#F5F7FA] text-[#0B1220] text-xs font-semibold rounded-full border border-black/[0.06]">
                          {company}
                        </span>
                      ))}
                    </div>
                    <Link href="/companies">
                      <span className="text-xs font-bold text-[#214ECF] inline-flex items-center gap-1 mt-2 hover:underline cursor-pointer">
                        <span>Explore Businesses</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="w-full py-20 bg-[#0B1220] text-white text-center">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Have an Opportunity to Build?</h2>
          <p className="text-[#98A2B3] max-w-xl mx-auto mb-8 text-base">
            We actively collaborate with industry leaders and technical founders to build the next generation of category leaders.
          </p>
          <Link href="/contact">
            <span className="hw-btn-primary cursor-pointer">
              <span>Initiate a Conversation</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};
