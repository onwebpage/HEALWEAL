import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Eye, 
  Target, 
  Heart, 
  Rocket, 
  User, 
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  TrendingUp,
  Award
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import type { TeamMember } from "@shared/schema";

import harshadImg from "@assets/WhatsApp Image 2025-11-26 at 6.56.41 PM (1)_1764187230049.jpeg";
import deepakImg from "@assets/WhatsApp Image 2025-11-26 at 6.54.20 PM-removebg-preview (1)_1764187070120.jpg";
import manjunathImg from "@assets/1517368095452-removebg-preview (1)_1764187102331.jpg";
import nikitaImg from "@assets/WhatsApp Image 2025-11-22 at 9.02.44 PM (2)-removebg-preview (1)_1764187056040.jpg";
import komalImg from "@assets/WhatsApp Image 2025-11-22 at 9.02.44 PM (1)-removebg-preview (1)_1764187086444.jpg";
import rohanSImg from "@assets/1752909900110-removebg-preview (1)_1764187128689.jpg";
import shlokCTOImg from "@assets/WhatsApp Image 2025-11-26 at 6.57.59 PM-removebg-preview (1)_1764186990093.jpg";
import vivekSharmaImg from "@assets/Mr.-Vivek-Sharma-On1y-png (1)_1764187218752.webp";

const values = [
  { name: "Integrity", desc: "Upholding absolute moral conviction and transparency in all relationships." },
  { name: "Honesty", desc: "Truth in communication, business dealings, and self-assessment." },
  { name: "Transparency", desc: "Clear operational visibility, authentic metrics, and open accountability." },
  { name: "Respect", desc: "Honoring every customer, team member, and partner with dignity." },
  { name: "Responsibility", desc: "Complete ownership of our societal impact, products, and outcomes." },
  { name: "Courage", desc: "Taking calculated, ambitious leaps to build what traditional institutions won't." },
];

const timelineMilestones = [
  {
    year: "2021",
    date: "August 2021",
    name: "Hapdax",
    sector: "Healthcare Technology",
    desc: "Founded Hapdax to bridge systemic divides in clinical accessibility, developing connected OPD platforms and patient portals.",
  },
  {
    year: "2023",
    date: "August 2023",
    name: "Kepwe",
    sector: "Financial Technology",
    desc: "Launched Kepwe, institutionalizing algorithmic trading systems, personal financial intelligence, and capital enablement.",
  },
  {
    year: "2024",
    date: "Late 2024",
    name: "Group Expansion",
    sector: "Commerce & AI Incubator",
    desc: "Established Thinkatic as our internal AI research and enterprise engineering studio, alongside modern lifestyle brand Zelevos.",
  },
  {
    year: "2025",
    date: "August 2025",
    name: "HBS & HAt",
    sector: "Education & Media",
    desc: "Expanded into executive future-ready education with Healweal Business School and HAt thought-leadership platforms.",
  },
];

const leadershipTeam = [
  { name: "Harshad Chavandke", role: "Founder & Chief Executive Officer (CEO)", image: harshadImg },
  { name: "Deepak Patil", role: "Co-Founder & Chief Operating Officer (COO)", image: deepakImg },
  { name: "Manjunath K", role: "Chief Financial Officer (CFO)", image: manjunathImg },
  { name: "Nikita Chavandke", role: "Chief Investment Officer (CIO)", image: nikitaImg },
  { name: "Shlok Ranjan", role: "Chief Technology Officer (CTO)", image: shlokCTOImg },
  { name: "Komal Chavandke", role: "Chief People Officer (CPO)", image: komalImg },
  { name: "Rohan Samsuddin", role: "Chief Content Officer (CCO)", image: rohanSImg },
  { name: "Vivek Sharma", role: "Head of Operations", image: vivekSharmaImg },
];

const advisoryBoard = [
  { name: "Nandkumar Chavandke", role: "Advisory Board Member", image: null },
];

export const AboutPage = () => {
  const { data: teamMembers } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
    queryFn: async () => {
      const response = await fetch("/api/team");
      if (!response.ok) throw new Error("Failed to fetch team members");
      return response.json();
    },
  });

  const leadershipFromApi = teamMembers?.filter((m) => m.category === "leadership" || m.category === "management").sort((a, b) => a.displayOrder - b.displayOrder) || [];
  const displayTeam = leadershipFromApi.length > 0 ? leadershipFromApi : leadershipTeam;

  return (
    <div className="bg-white w-full flex flex-col min-h-screen text-[#111827] overflow-x-hidden selection:bg-[#214ECF] selection:text-white">
      <Navigation />

      {/* ── HERO ─────────────────────────────────────────── */}
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
                About Healweal
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-[72px] font-bold tracking-tight text-[#0B1220] leading-[1.05] mb-6"
              data-testid="heading-about-hero"
            >
              We Build Businesses That Matter.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#667085] leading-relaxed font-normal"
            >
              Healweal is an operating company and venture builder operating across healthcare, financial technology, commerce, artificial intelligence, and education. We believe enduring value is created by solving fundamental problems.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── COMPANY STORY & GENESIS ───────────────────────── */}
      <section className="w-full py-24 lg:py-32 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold text-[#214ECF] tracking-widest uppercase mb-3 block">
                The Genesis
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1220] leading-tight mb-6">
                Bridging Essential Human Needs Through Technology
              </h2>
              <p className="text-base text-[#667085] leading-relaxed mb-4">
                Healweal was founded with a foundational thesis: the most consequential companies of the next half-century will be those that integrate digital intelligence with tangible human welfare—specifically healthcare, economic prosperity, and knowledge.
              </p>
              <p className="text-base text-[#667085] leading-relaxed">
                Rather than acting merely as passive investors, Healweal functions as an active institutional operator. We build, test, hire, and scale our portfolio businesses with direct technical and strategic stewardship.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-8 rounded-2xl bg-[#F5F7FA] border border-black/[0.06] flex flex-col justify-between min-h-[220px]">
                <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.08] shadow-xs flex items-center justify-center text-[#214ECF] mb-4">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0B1220] mb-2">Our Vision</h3>
                  <p className="text-sm text-[#667085] leading-relaxed">
                    To build a globally benchmarked, highly diversified technological conglomerate that empowers human health, prosperity, and intellect.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-[#F5F7FA] border border-black/[0.06] flex flex-col justify-between min-h-[220px]">
                <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.08] shadow-xs flex items-center justify-center text-[#214ECF] mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0B1220] mb-2">Our Mission</h3>
                  <p className="text-sm text-[#667085] leading-relaxed">
                    To systematically discover fundamental frictions and engineer scalable operating companies that deliver measurable improvements to society.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ──────────────────────────────────── */}
      <section className="w-full py-24 lg:py-32 bg-[#F5F7FA]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#214ECF] tracking-widest uppercase mb-3 block">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1220] mb-4">
              The Values That Guide Our Building
            </h2>
            <p className="text-base text-[#667085]">
              Culture is not an afterthought at Healweal—it is the operating code of our entire enterprise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, idx) => (
              <div key={val.name} className="p-8 rounded-2xl bg-white border border-black/[0.06] shadow-xs hover:border-[#214ECF]/30 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-[#0B1220]">{val.name}</h3>
                  <span className="text-xs font-mono text-[#214ECF] font-bold">0{idx + 1}</span>
                </div>
                <p className="text-sm text-[#667085] leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE EVOLUTION TIMELINE ───────────────────────── */}
      <section className="w-full py-24 lg:py-32 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-bold text-[#214ECF] tracking-widest uppercase mb-3 block">
              Evolution
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1220] mb-4">
              Our Journey of Growth
            </h2>
            <p className="text-base text-[#667085]">
              From our first health-tech venture to a multi-disciplinary operating group.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelineMilestones.map((m) => (
              <div key={m.year} className="p-8 rounded-2xl bg-[#F5F7FA] border border-black/[0.07] flex flex-col justify-between min-h-[260px]">
                <div>
                  <span className="text-3xl font-extrabold text-[#214ECF] block mb-2">{m.year}</span>
                  <div className="text-xs font-bold text-[#0B1220] uppercase tracking-wider mb-1">{m.name}</div>
                  <div className="text-xs text-[#667085] font-semibold mb-4">{m.sector}</div>
                </div>
                <p className="text-sm text-[#667085] leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP & GOVERNANCE ──────────────────────── */}
      <section className="w-full py-24 lg:py-32 bg-[#F5F7FA]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-bold text-[#214ECF] tracking-widest uppercase mb-3 block">
              Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1220] mb-4">
              Guided by Visionaries, Driven by Discipline
            </h2>
            <p className="text-base text-[#667085]">
              Our leadership unites deep sector knowledge with engineering rigor and operational expertise.
            </p>
          </div>

          {/* Leadership Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {displayTeam.map((member, i) => {
              const imgUrl = "imageUrl" in member ? member.imageUrl : member.image;

              return (
                <div key={i} className="bg-white rounded-2xl border border-black/[0.07] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col">
                  <div className="w-full aspect-[4/5] bg-[#E4E7EC] overflow-hidden flex items-center justify-center relative">
                    {imgUrl ? (
                      <img src={imgUrl} alt={member.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      <User className="w-16 h-16 text-[#98A2B3]" />
                    )}
                  </div>
                  <div className="p-5 flex flex-col">
                    <h3 className="font-bold text-base text-[#0B1220] tracking-tight">{member.name}</h3>
                    <p className="text-xs font-semibold text-[#214ECF] mt-1">{member.role}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Advisory Board */}
          <div className="pt-12 border-t border-black/[0.08]">
            <span className="text-xs font-bold text-[#214ECF] tracking-widest uppercase mb-6 block">
              Advisory Board
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {advisoryBoard.map((advisor, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-black/[0.07] shadow-xs">
                  <h4 className="font-bold text-lg text-[#0B1220]">{advisor.name}</h4>
                  <p className="text-xs text-[#667085] font-semibold mt-1">{advisor.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING CALL TO ACTION ───────────────────────── */}
      <section className="w-full py-20 bg-[#0B1220] text-white text-center">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Explore Our Operating Companies</h2>
          <p className="text-[#98A2B3] max-w-xl mx-auto mb-8 text-base">
            See how our philosophy of building better translates into real platforms and market-leading enterprises.
          </p>
          <Link href="/companies">
            <span className="hw-btn-primary cursor-pointer">
              <span>View Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};
