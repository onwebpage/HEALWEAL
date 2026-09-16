import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Layers, 
  Cpu, 
  TrendingUp, 
  Sparkles, 
  ShieldCheck, 
  Activity
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const pillars = [
  {
    num: "01",
    title: "Operating Architecture",
    tagline: "From Unmet Need to Operational Entity",
    description: "We architect platforms from ground zero. Identifying critical structural needs across healthcare, finance, travel, and enterprise technology, our core team engineers initial products, validates operational traction, and installs disciplined leadership.",
    related: ["Hapdax", "Kepwe", "Zelevos", "Thinkatic"],
    icon: Layers,
  },
  {
    num: "02",
    title: "Product Development",
    tagline: "Apple-Level Design & Ergonomics",
    description: "World-class digital experiences require uncompromising craft. We design human-centered interfaces, intuitive clinical and financial workflows, and accessible web/mobile ecosystems that turn complex backend algorithms into effortless user interactions.",
    related: ["Kepwe", "Thinkatic", "Hapdax"],
    icon: Sparkles,
  },
  {
    num: "03",
    title: "Technology & Engineering",
    tagline: "Mission-Critical Resilient Architectures",
    description: "Our engineering organization builds cloud-native platforms engineered for 99.99% availability, strict regulatory compliance (HIPAA, ABDM, SEBI/RBI standards), and high-throughput real-time processing using modern distributed systems.",
    related: ["Thinkatic", "Hapdax", "Kepwe"],
    icon: Cpu,
  },
  {
    num: "04",
    title: "Brand Building & Narrative",
    tagline: "Trust, Authenticity & Market Authority",
    description: "A great product without a resonant story fails to scale. We establish category-defining brand identities, transparent customer communication, and institutional trust that compounds with every interaction.",
    related: ["Zelevos", "HBS"],
    icon: ShieldCheck,
  },
  {
    num: "05",
    title: "Operations & Governance",
    tagline: "Institutional Discipline at Scale",
    description: "Sustainable growth requires rigorous compliance, financial controls, and operational playbooks. We install enterprise management systems, legal frameworks, and recruitment pipelines that allow our businesses to execute with surgical discipline.",
    related: ["All Platform Entities"],
    icon: Activity,
  },
  {
    num: "06",
    title: "Growth & Scale",
    tagline: "Compounding Market Expansion",
    description: "Once product-market fit is established, we deploy capital, enterprise distribution channels, and strategic corporate partnerships to achieve durable market leadership and long-term capitalization.",
    related: ["Kepwe", "Hapdax", "Zelevos"],
    icon: TrendingUp,
  },
];

export const WhatWeDoPage = () => {
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
                Operating Capabilities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-[68px] font-bold tracking-tight text-black leading-[1.08] mb-6"
              data-testid="heading-what-we-do"
            >
              We Build. We Operate. We Scale.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#52525B] leading-relaxed font-normal"
            >
              Healweal provides full-stack operating capabilities. From inception and technological research to enterprise distribution and institutional scaling, explore our end-to-end building approach.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 6 Capabilities Sections */}
      <section className="w-full py-24 lg:py-32 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:gap-16">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <div
                  key={pillar.num}
                  className="hw-card-lift p-8 sm:p-12 rounded-3xl border border-black/[0.08] bg-white hover:-translate-y-1 hover:shadow-xl hover:border-black/20 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                >
                  <div className="lg:col-span-1 text-4xl sm:text-5xl font-extrabold text-black">
                    {pillar.num}
                  </div>

                  <div className="lg:col-span-7 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
                        {pillar.title}
                      </h2>
                    </div>
                    <div className="text-sm font-semibold text-black">
                      {pillar.tagline}
                    </div>
                    <p className="text-base text-[#52525B] leading-relaxed mt-2">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-black/[0.08] shadow-xs flex flex-col gap-3">
                    <span className="text-xs font-bold text-[#71717A] uppercase tracking-wider">
                      Related Platform Entities:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {pillar.related.map((company) => (
                        <span key={company} className="px-3 py-1 bg-[#F4F4F5] text-black text-xs font-semibold rounded-full border border-black/[0.08]">
                          {company}
                        </span>
                      ))}
                    </div>
                    <Link href="/companies">
                      <span className="text-xs font-bold text-black inline-flex items-center gap-1 mt-2 hover:underline cursor-pointer">
                        <span>Explore Platform</span>
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
      <section className="w-full py-24 bg-white border-t border-black/[0.08] text-center">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight text-black">
            Have an Opportunity to Build?
          </h2>
          <p className="text-[#52525B] max-w-xl mx-auto mb-8 text-base">
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
