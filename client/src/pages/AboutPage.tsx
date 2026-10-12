import { motion } from "framer-motion";
import { 
  Eye, 
  Target, 
  User, 
  ArrowRight,
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
import shlokTechLeadImg from "@assets/1755068044771 (1)_1764187200997.jpg";
import rohanMImg from "@assets/1741298883781-removebg-preview (1)_1764187185205.jpg";
import sodanImg from "@assets/WhatsApp-Image-2025-09-20-at-9.25.31-PM-1-225x300-removebg-preview (1)_1764187162584.jpg";
import vivekKumarImg from "@assets/WhatsApp Image 2025-11-22 at 9.02.43 PM-removebg-preview (1)_1764187012140.jpg";
import hamdIlahiImg from "../../../Cards Img/my_photo.jpg";

const teamImageUrls: Record<string, string> = {
  "/attached_assets/WhatsApp Image 2025-11-26 at 6.56.41 PM (1)_1764187230049.jpeg": harshadImg,
  "/attached_assets/WhatsApp Image 2025-11-26 at 6.54.20 PM-removebg-preview (1)_1764187070120.jpg": deepakImg,
  "/attached_assets/1517368095452-removebg-preview (1)_1764187102331.jpg": manjunathImg,
  "/attached_assets/WhatsApp Image 2025-11-22 at 9.02.44 PM (2)-removebg-preview (1)_1764187056040.jpg": nikitaImg,
  "/attached_assets/WhatsApp Image 2025-11-26 at 6.57.59 PM-removebg-preview (1)_1764186990093.jpg": shlokCTOImg,
  "/attached_assets/WhatsApp Image 2025-11-22 at 9.02.44 PM (1)-removebg-preview (1)_1764187086444.jpg": komalImg,
  "/attached_assets/1752909900110-removebg-preview (1)_1764187128689.jpg": rohanSImg,
  "/attached_assets/Mr.-Vivek-Sharma-On1y-png (1)_1764187218752.webp": vivekSharmaImg,
  "/attached_assets/1755068044771 (1)_1764187200997.jpg": shlokTechLeadImg,
  "/attached_assets/1741298883781-removebg-preview (1)_1764187185205.jpg": rohanMImg,
  "/attached_assets/WhatsApp-Image-2025-09-20-at-9.25.31-PM-1-225x300-removebg-preview (1)_1764187162584.jpg": sodanImg,
  "/attached_assets/WhatsApp Image 2025-11-22 at 9.02.43 PM-removebg-preview (1)_1764187012140.jpg": vivekKumarImg,
};

// Exact Values per requirements
const values = [
  { number: "01", name: "Build Better", desc: "We constantly look for a better way." },
  { number: "02", name: "People First", desc: "We build around real human needs." },
  { number: "03", name: "Simplicity", desc: "We make the complex feel simple." },
  { number: "04", name: "Purposeful Innovation", desc: "We use technology and ideas to create meaningful progress." },
  { number: "05", name: "Quality", desc: "We create things worth trusting." },
  { number: "06", name: "Long-Term Thinking", desc: "We build for lasting value, not short-term attention." },
  { number: "07", name: "Integrity", desc: "We do what is right, even when it is difficult." },
];

// Exact Our Journey Milestones per requirements
const timelineMilestones = [
  {
    year: "2021",
    title: "The Beginning",
    desc: "We started our journey with DocGo, entering the healthcare space with the ambition to build technology-driven solutions that could make everyday experiences better.",
  },
  {
    year: "2022",
    title: "DocGo Sold",
    desc: "In 2022, DocGo was successfully sold. The experience taught us an important lesson: great businesses are built by solving real problems, creating value, and continuously improving.",
  },
  {
    year: "2021",
    title: "Hapdax",
    desc: "Our healthcare journey continued with Hapdax, focused on building innovative healthcare solutions and creating better access and experiences through technology.",
  },
  {
    year: "2023",
    title: "Kepwe",
    desc: "We expanded into Finance with Kepwe, with a vision to simplify financial products, services, and technology for individuals and businesses.",
  },
  {
    year: "2024",
    title: "Thinkatic",
    desc: "With Thinkatic, we entered deeper into Technology and AI, helping businesses build technology solutions while developing our own technology ecosystem.",
  },
  {
    year: "2025",
    title: "Zelevos",
    desc: "We expanded into Travel with Zelevos, creating simpler ways for people to plan journeys, book travel, discover food, and explore new places.",
  },
  {
    year: "2026",
    title: "HBS",
    desc: "Our journey expanded into Education with HBS, with a focus on helping students become more capable, confident, and future-ready through technology and better learning systems.",
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

const hamdIlahi = {
  name: "Hamd Ilahi",
  role: "Chief Technology Officer (CTO)",
  image: hamdIlahiImg,
  description: "Leads technology strategy, software architecture, product engineering, and digital innovation, building scalable, secure, and high-performance technology solutions aligned with HealWeal's vision.",
};

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
  const displayTeam = [...(leadershipFromApi.length > 0 ? leadershipFromApi : leadershipTeam), hamdIlahi];

  return (
    <div className="bg-white w-full flex flex-col min-h-screen text-black overflow-x-hidden selection:bg-black selection:text-white">
      <Navigation />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative w-full pt-36 pb-20 lg:pt-44 lg:pb-28 bg-white border-b border-black/[0.06] overflow-hidden">
        <div className="absolute inset-0 hw-bg-grid opacity-40 pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/[0.08] mb-6 shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-black" />
              <span className="text-xs font-semibold text-black tracking-wide uppercase">
                About Healweal
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-[72px] font-bold tracking-tight text-black leading-[1.05] mb-6"
              data-testid="heading-about-hero"
            >
              We Build Businesses That Matter.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#52525B] leading-relaxed font-normal"
            >
              Healweal builds and operates enduring platforms across healthcare, financial technology, travel, artificial intelligence, and education. We believe lasting value is created by solving fundamental problems.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── VISION & MISSION ──────────────────────────────── */}
      <section className="w-full py-24 lg:py-32 bg-white border-b border-black/[0.06]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold text-black tracking-widest uppercase mb-3 block">
                Purpose & Direction
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black leading-tight mb-6">
                Bridging Essential Human Needs Through Technology
              </h2>
              <p className="text-base text-[#52525B] leading-relaxed mb-4">
                Healweal was founded with a foundational thesis: the most consequential companies of the next half-century will be those that integrate digital intelligence with tangible human welfare—specifically healthcare, economic prosperity, and knowledge.
              </p>
              <p className="text-base text-[#52525B] leading-relaxed">
                Rather than acting merely as passive investors, Healweal functions as an active institutional operator. We build, test, hire, and scale our platforms with direct technical and strategic stewardship.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="hw-card-lift p-8 rounded-2xl bg-white border border-black/[0.08] shadow-xs flex flex-col justify-between min-h-[220px] cursor-default">
                <div className="w-10 h-10 rounded-xl bg-[#F4F4F5] border border-black/[0.08] shadow-xs flex items-center justify-center text-black mb-4">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Vision</h3>
                  <p className="text-sm text-[#52525B] leading-relaxed">
                    To build a better world by making essential parts of life simpler, smarter, and more accessible.
                  </p>
                </div>
              </div>

              <div className="hw-card-lift p-8 rounded-2xl bg-white border border-black/[0.08] shadow-xs flex flex-col justify-between min-h-[220px] cursor-default">
                <div className="w-10 h-10 rounded-xl bg-[#F4F4F5] border border-black/[0.08] shadow-xs flex items-center justify-center text-black mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Mission</h3>
                  <p className="text-sm text-[#52525B] leading-relaxed">
                    We build businesses that solve meaningful problems, create better experiences, and improve the way people live, learn, work, and grow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ──────────────────────────────────── */}
      <section className="w-full py-24 lg:py-32 bg-white border-b border-black/[0.06]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-black tracking-widest uppercase mb-3 block">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-4">
              The Values That Guide Our Building
            </h2>
            <p className="text-base text-[#52525B]">
              Culture is not an afterthought at Healweal—it is the operating code of our entire enterprise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {values.map((val) => (
              <div 
                key={val.name} 
                className="hw-card-lift p-8 rounded-2xl bg-white border border-black/[0.08] shadow-xs flex flex-col justify-between cursor-default"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-black font-bold">{val.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">{val.name}</h3>
                  <p className="text-sm text-[#52525B] leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE EVOLUTION TIMELINE (Our Journey) ──────────── */}
      <section className="w-full py-24 lg:py-32 bg-white border-b border-black/[0.06]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-bold text-black tracking-widest uppercase mb-3 block">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-4">
              Building Forward Since 2021
            </h2>
            <p className="text-base text-[#52525B]">
              From our first health-tech venture to a multi-disciplinary operating ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {timelineMilestones.map((m, idx) => (
              <div 
                key={`${m.year}-${m.title}-${idx}`} 
                className="hw-card-lift p-8 rounded-2xl bg-white border border-black/[0.08] shadow-xs flex flex-col justify-between min-h-[260px] cursor-default"
              >
                <div>
                  <span className="text-3xl font-extrabold text-black block mb-1">{m.year}</span>
                  <div className="text-xs font-bold text-[#71717A] uppercase tracking-wider mb-4">{m.title}</div>
                </div>
                <p className="text-sm text-[#52525B] leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP & GOVERNANCE ──────────────────────── */}
      <section className="w-full py-24 lg:py-32 bg-white border-b border-black/[0.06]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-bold text-black tracking-widest uppercase mb-3 block">
              Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-4">
              Guided by Visionaries, Driven by Discipline
            </h2>
            <p className="text-base text-[#52525B]">
              Our leadership unites deep sector knowledge with engineering rigor and operational expertise.
            </p>
          </div>

          {/* Leadership Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {displayTeam.map((member, i) => {
              const imgUrl = "imageUrl" in member
                ? member.imageUrl ? teamImageUrls[member.imageUrl] ?? member.imageUrl : null
                : member.image;

              return (
                <div key={i} title={"description" in member && typeof member.description === "string" ? member.description : undefined} className="bg-white rounded-2xl border border-black/[0.08] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col">
                  <div className="w-full aspect-[4/5] bg-[#F4F4F5] overflow-hidden flex items-center justify-center relative">
                    {imgUrl ? (
                      <img src={imgUrl} alt={member.name} className="w-full h-full object-contain object-center" />
                    ) : (
                      <User className="w-16 h-16 text-[#A1A1AA]" />
                    )}
                  </div>
                  <div className="p-5 flex flex-col">
                    <h3 className="font-bold text-base text-black tracking-tight">{member.name}</h3>
                    <p className="text-xs font-semibold text-[#71717A] mt-1">{member.role}</p>
                    {"description" in member && typeof member.description === "string" && (
                      <p className="sr-only">{member.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Advisory Board */}
          <div className="pt-12 border-t border-black/[0.08]">
            <span className="text-xs font-bold text-black tracking-widest uppercase mb-6 block">
              Advisory Board
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {advisoryBoard.map((advisor, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-black/[0.08] shadow-xs">
                  <h4 className="font-bold text-lg text-black">{advisor.name}</h4>
                  <p className="text-xs text-[#71717A] font-semibold mt-1">{advisor.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING CALL TO ACTION ───────────────────────── */}
      <section className="w-full py-24 bg-white text-black text-center border-b border-black/[0.06]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-black">Explore Our Platform</h2>
          <p className="text-[#52525B] max-w-xl mx-auto mb-8 text-base">
            See how our philosophy of building better translates into real platforms and market-leading enterprises.
          </p>
          <Link href="/companies">
            <span className="hw-btn-primary cursor-pointer">
              <span>View Platform</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};
