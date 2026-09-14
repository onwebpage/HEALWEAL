import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Activity, 
  CreditCard, 
  ShoppingBag, 
  Cpu, 
  GraduationCap, 
  ExternalLink, 
  X, 
  Layers, 
  ShieldCheck, 
  Radio, 
  Sparkles 
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

import { companyBrandAssets } from "@/lib/companyBrandAssets";

export const portfolioCompanies = [
  {
    id: "hapdax",
    name: "Hapdax",
    industry: "Healthcare Technology",
    headline: "Making Healthcare More Connected.",
    tagline: "Health. Reimagined.",
    category: "Healthcare",
    logo: companyBrandAssets.hapdax.logo,
    icon: companyBrandAssets.hapdax.icon,
    logoClass: companyBrandAssets.hapdax.logoClass,
    website: "https://hapdax.in/",
    problem: "Fragmented clinical systems, disconnected patient health records, and burdensome administrative tasks distract healthcare providers from patient care.",
    approach: "Developing an end-to-end cloud platform that unifies clinic OPD operations, diagnostic histories, and doctor-patient interaction into one intuitive environment.",
    products: [
      { name: "Docgo", desc: "Comprehensive OPD and private clinic workflow management software." },
      { name: "Prosmer", desc: "Platform for holistic human consciousness and cognitive well-being." },
      { name: "Proteinsary", desc: "Functional health nutrition brand for a healthier population." },
    ],
    technology: "HIPAA/ABDM-compliant cloud architecture, microservices, encrypted health records pipeline.",
    whyItMatters: "Enables clinical professionals to treat patients with higher precision while drastically reducing administrative overhead.",
  },
  {
    id: "kepwe",
    name: "Kepwe",
    industry: "Financial Technology",
    headline: "Building Better Financial Experiences.",
    tagline: "Money. Made simpler.",
    category: "FinTech",
    logo: companyBrandAssets.kepwe.logo,
    icon: companyBrandAssets.kepwe.icon,
    logoClass: companyBrandAssets.kepwe.logoClass,
    website: "https://kepwe.in/",
    problem: "Retail and mid-market investors often lack institutional-grade market data, quantitative algorithms, and transparent risk management.",
    approach: "Democratizing market technology by delivering algorithmic trading systems, personal financial intelligence, and startup capital tools in one connected ecosystem.",
    products: [
      { name: "Robosor", desc: "Algorithmic execution and research built by SEBI-registered advisors." },
      { name: "Sachna", desc: "Growth enablement and venture capital platform for startups." },
      { name: "Floorfox", desc: "High-performance digital trading terminal with real-time analytics." },
    ],
    technology: "Low-latency order execution pipelines, event-driven quantitative engine, bank-grade encryption.",
    whyItMatters: "Levels the playing field for ambitious investors by providing institutional financial capabilities.",
  },
  {
    id: "zelevos",
    name: "Zelevos",
    industry: "Commerce",
    headline: "Helping Businesses Build, Launch & Scale.",
    tagline: "Everyday. Made better.",
    category: "Commerce",
    logo: companyBrandAssets.zelevos.logo,
    icon: companyBrandAssets.zelevos.icon,
    logoClass: companyBrandAssets.zelevos.logoClass,
    website: "https://zelevos.com/",
    problem: "Modern lifestyle and consumer product formulations frequently suffer from compromised quality control and fragmented distribution channels.",
    approach: "Building vertically integrated consumer products engineered for everyday performance, certified purity, and frictionless commerce.",
    products: [
      { name: "Consumer Wellness", desc: "Ergonomically designed daily lifestyle formulations." },
      { name: "Commerce Distribution", desc: "Omni-channel supply chain and direct fulfillment network." },
    ],
    technology: "Distributed e-commerce microservices, real-time inventory management, automated fulfillment.",
    whyItMatters: "Delivers uncompromising product quality and wellness to everyday consumers at transparent value.",
  },
  {
    id: "thinkatic",
    name: "Thinkatic",
    industry: "AI & Technology",
    headline: "Technology That Moves Business Forward.",
    tagline: "Technology. With purpose.",
    category: "Technology",
    logo: companyBrandAssets.thinkatic.logo,
    icon: companyBrandAssets.thinkatic.icon,
    logoClass: companyBrandAssets.thinkatic.logoClass,
    website: "https://thinkatic.com/",
    problem: "Companies struggle to bridge the gap between theoretical machine learning models and high-reliability, production-grade business software.",
    approach: "An applied artificial intelligence lab and digital venture studio engineering purposeful software that accelerates enterprise operational throughput.",
    products: [
      { name: "Thinkatic Studio", desc: "Full-stack UI/UX design, brand strategy, and modern digital platform engineering." },
      { name: "Thinkatic Labs", desc: "Generative AI research, intelligent agent pipelines, and enterprise automation." },
      { name: "Venture Craft", desc: "Rapid technological scaling and software architecture for next-gen businesses." },
    ],
    technology: "Advanced LLM orchestration, vector databases, serverless cloud pipelines, real-time event brokers.",
    whyItMatters: "Transforms legacy workflows into autonomous, highly scalable competitive advantages for businesses.",
  },
  {
    id: "hbs",
    name: "Healweal Business School (HBS)",
    industry: "Education",
    headline: "Building Skills for the Future.",
    tagline: "Learning. Without limits.",
    category: "Education",
    logo: companyBrandAssets.hbs.logo,
    icon: companyBrandAssets.hbs.icon,
    logoClass: companyBrandAssets.hbs.logoClass,
    website: "https://healwealbusinessschool.in/",
    problem: "Conventional business education remains overly theoretical, leaving graduates unprepared for modern technology, venture creation, and executive leadership.",
    approach: "A future-ready leadership ecosystem providing pragmatic mentorship, cohort learning, and real venture exposure led by active conglomerate executives.",
    products: [
      { name: "Future-Ready Skills", desc: "Practical executive programs in technology, venture finance, and leadership." },
      { name: "Mentorship Network", desc: "1-on-1 career transformation and advisory by active industry operators." },
      { name: "Institutional Programs", desc: "Ecosystem trusted by over 10,000 learners and 500+ schools and colleges." },
    ],
    technology: "Interactive digital cohort LMS, collaborative project sandboxes, outcome-driven learning analytics.",
    whyItMatters: "Prepares emerging founders and operators to build and lead world-class enterprises in the modern economy.",
  },
  {
    id: "hat",
    name: "HAt",
    industry: "Media & Talks",
    headline: "Stories That Shape Modern Leadership.",
    tagline: "Internal & External Talks Series",
    category: "Media",
    logo: null,
    icon: null,
    logoClass: "",
    website: "https://hattalks.in/",
    problem: "Meaningful corporate and entrepreneurial insights are often trapped in silos rather than shared broadly with emerging builders.",
    approach: "A curated talks and podcast platform empowering leaders and innovators to distribute high-impact perspectives across digital audiences.",
    products: [
      { name: "HAt Connect", desc: "Curated expert speaker talks for modern organizations." },
      { name: "HAt Stories", desc: "Spotlights on visionary entrepreneurs and operators." },
      { name: "HAt Podcast", desc: "In-depth audio & video conversations on leadership and innovation." },
    ],
    technology: "Omnichannel digital media distribution, high-fidelity audio/video production pipelines.",
    whyItMatters: "Fosters intellectual dialogue and inspires the next generation of business builders.",
  },
  {
    id: "nandvora",
    name: "Nandvora",
    industry: "Lifestyle Formulations",
    headline: "Excellence in Modern Lifestyle Solutions.",
    tagline: "Precision & Natural Formulations",
    category: "Commerce",
    logo: null,
    icon: null,
    logoClass: "",
    website: "https://nandvora.com/",
    problem: "Healthcare consumers often face synthetic, unverified lifestyle products with questionable formulation standards.",
    approach: "Formulating premium lifestyle and wellness solutions crafted with scientific rigor, certified herbs, and quality testing.",
    products: [
      { name: "Nandvora Nutra", desc: "Herbal & daily nutritional health supplements." },
      { name: "Nandvora Living", desc: "Ergonomic lifestyle & wellness products." },
      { name: "PureCraft Lab", desc: "Certified natural formulation & quality testing standards." },
    ],
    technology: "Precision natural extraction, certified laboratory quality validation.",
    whyItMatters: "Gives discerning consumers uncompromising transparency and efficacy in personal wellness.",
  },
];

const categories = ["All", "Healthcare", "FinTech", "Commerce", "Technology", "Education", "Media"];

const PortfolioBrand = ({ company }: { company: typeof portfolioCompanies[number] }) => (
  <div className="flex items-center gap-2.5 min-w-0">
    {company.icon && (
      <div className="h-10 w-10 rounded-xl bg-white border border-black/[0.06] p-1.5 flex items-center justify-center overflow-hidden flex-shrink-0">
        <img
          src={company.icon}
          alt={`${company.name} mark`}
          className="h-full w-full object-contain mix-blend-multiply"
        />
      </div>
    )}
    <div className="h-14 w-28 bg-[#F5F7FA] rounded-xl border border-black/[0.06] flex items-center justify-center overflow-hidden">
      {company.logo ? (
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className={`${company.logoClass} object-contain mix-blend-multiply`}
        />
      ) : (
        <span className="px-3 text-center text-xs font-extrabold tracking-[0.08em] text-[#0B1220] uppercase leading-tight">
          {company.name}
        </span>
      )}
    </div>
  </div>
);

export const CompaniesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState<typeof portfolioCompanies[0] | null>(null);

  const filtered = selectedCategory === "All"
    ? portfolioCompanies
    : portfolioCompanies.filter((c) => c.category === selectedCategory);

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
                Portfolio Directory
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-[72px] font-bold tracking-tight text-[#0B1220] leading-[1.05] mb-6"
              data-testid="heading-companies-hero"
            >
              Meet Our Businesses.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#667085] leading-relaxed font-normal"
            >
              Healweal builds and scales independent, tech-enabled operating companies. Each addresses fundamental market needs with disciplined execution and modern technological infrastructure.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Portfolio Filter & Grid */}
      <section className="w-full py-20 lg:py-28 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  selectedCategory === cat
                    ? "bg-[#0B1220] text-white shadow-sm"
                    : "bg-[#F5F7FA] text-[#667085] hover:text-[#0B1220] border border-black/[0.06]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((company, index) => (
              <motion.div
                key={company.id}
                id={company.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="hw-card-editorial p-8 flex flex-col justify-between group cursor-pointer"
                onClick={() => setSelectedCompany(company)}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-8">
                    <PortfolioBrand company={company} />
                    <span className="hw-tag-pill text-[11px] font-bold">
                      {company.industry}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#0B1220] mb-2 tracking-tight group-hover:text-[#214ECF] transition-colors">
                    {company.name}
                  </h3>
                  <div className="text-sm font-semibold text-[#0B1220] mb-3">
                    {company.headline}
                  </div>
                  <p className="text-sm text-[#667085] leading-relaxed mb-6">
                    {company.approach}
                  </p>

                  {/* Products snippet */}
                  <div className="flex flex-col gap-2 pt-4 border-t border-black/[0.06] mb-6">
                    <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">
                      Key Offerings:
                    </span>
                    {company.products.slice(0, 2).map((p) => (
                      <div key={p.name} className="flex items-start gap-2 text-xs text-[#0B1220]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#214ECF] flex-shrink-0 mt-0.5" />
                        <span><strong className="font-semibold">{p.name}</strong> – {p.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-black/[0.06]">
                  <span className="text-xs font-bold text-[#214ECF] group-hover:underline inline-flex items-center gap-1">
                    <span>View Case Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs font-semibold text-[#667085] hover:text-[#0B1220] inline-flex items-center gap-1"
                  >
                    <span>Website</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal / Drawer for Individual Company */}
      <AnimatePresence>
        {selectedCompany && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedCompany(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl border border-black/[0.08]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-6 border-b border-black/[0.06]">
                <div className="flex items-center gap-4">
                  <PortfolioBrand company={selectedCompany} />
                  <div>
                    <h3 className="text-2xl font-bold text-[#0B1220]">{selectedCompany.name}</h3>
                    <span className="text-xs font-semibold text-[#214ECF] uppercase tracking-wider">{selectedCompany.industry}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="p-2 rounded-full hover:bg-black/[0.05] text-[#667085] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="py-6 flex flex-col gap-6">
                <div>
                  <h4 className="text-sm font-bold text-[#667085] uppercase tracking-wider mb-2">The Problem</h4>
                  <p className="text-sm sm:text-base text-[#0B1220] leading-relaxed">{selectedCompany.problem}</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#667085] uppercase tracking-wider mb-2">Our Approach</h4>
                  <p className="text-sm sm:text-base text-[#0B1220] leading-relaxed">{selectedCompany.approach}</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#667085] uppercase tracking-wider mb-2">Products & Platforms</h4>
                  <div className="flex flex-col gap-2.5">
                    {selectedCompany.products.map((p) => (
                      <div key={p.name} className="p-3.5 rounded-xl bg-[#F5F7FA] border border-black/[0.05]">
                        <div className="font-bold text-sm text-[#0B1220]">{p.name}</div>
                        <div className="text-xs text-[#667085] mt-0.5 leading-relaxed">{p.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#667085] uppercase tracking-wider mb-2">Technology & Architecture</h4>
                  <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">{selectedCompany.technology}</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#667085] uppercase tracking-wider mb-2">Why It Matters</h4>
                  <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">{selectedCompany.whyItMatters}</p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-6 border-t border-black/[0.06] flex items-center justify-between">
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="text-xs font-bold text-[#667085] hover:text-[#0B1220]"
                >
                  Close
                </button>
                <a
                  href={selectedCompany.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hw-btn-primary text-xs py-2 px-5"
                >
                  <span>Visit {selectedCompany.name} Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};
