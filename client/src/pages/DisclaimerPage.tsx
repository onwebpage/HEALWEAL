import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  AlertTriangle, 
  Clock, 
  Building2, 
  ChevronRight, 
  Scale, 
  HeartPulse, 
  TrendingUp, 
  Cpu, 
  ExternalLink,
  Printer,
  FileText,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { LEGAL_CONFIG } from "@/lib/legalConfig";

const disclaimerSections = [
  { id: "general-information", title: "1. General Information" },
  { id: "no-offer", title: "2. No Offer or Solicitation" },
  { id: "forward-looking", title: "3. Forward-Looking Statements" },
  { id: "financial-investment", title: "4. Financial and Investment Disclaimer" },
  { id: "healthcare", title: "5. Healthcare Disclaimer" },
  { id: "technology-ai", title: "6. Technology and AI Disclaimer" },
  { id: "third-party", title: "7. Third-Party Information" },
  { id: "no-guarantee", title: "8. No Guarantee of Results" },
  { id: "errors-changes", title: "9. Errors and Changes" },
  { id: "acceptance", title: "10. Acceptance" },
];

export const DisclaimerPage = () => {
  const [activeSection, setActiveSection] = useState("general-information");

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
        setActiveSection(id);
      }
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of disclaimerSections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Navigation />

      {/* Hero Header */}
      <section className="pt-36 pb-16 bg-white border-b border-black/[0.08] relative overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-medium text-[#52525B] mb-6">
            <Link href="/">
              <span className="hover:text-black transition-colors cursor-pointer">Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-black">Legal</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-black font-semibold">Disclaimer</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F4F5] border border-black/[0.08] text-xs font-semibold text-black mb-4">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Legal Disclosures & Corporate Notices</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-black mb-4">
                Website Disclaimer
              </h1>
              <p className="text-base sm:text-lg text-[#52525B] max-w-2xl leading-relaxed">
                Important legal notices, health & financial disclaimers, forward-looking statements, and limitations regarding website content.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F4F4F5] hover:bg-black hover:text-white text-black text-xs font-semibold transition-all border border-black/[0.08] cursor-pointer"
                title="Print Disclaimer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Document</span>
              </button>
            </div>
          </div>

          {/* Meta Bar */}
          <div className="mt-8 pt-6 border-t border-black/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="flex items-center gap-2 text-[#52525B]">
              <Clock className="w-4 h-4 text-black" />
              <span>Effective Date: <strong className="text-black">{LEGAL_CONFIG.effectiveDate}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-[#52525B]">
              <Building2 className="w-4 h-4 text-black" />
              <span>Entity: <strong className="text-black">{LEGAL_CONFIG.companyName}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-[#52525B]">
              <Scale className="w-4 h-4 text-black" />
              <span>Jurisdiction: <strong className="text-black">{LEGAL_CONFIG.jurisdiction.displayText}</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 py-16 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Table of Contents (Sticky on Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 bg-[#FAFAFA] border border-black/[0.08] rounded-2xl p-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#71717A] mb-4">
              <FileText className="w-4 h-4 text-black" />
              <span>Disclaimer Sections</span>
            </div>
            <nav className="flex flex-col gap-1 max-h-[70vh] overflow-y-auto pr-2">
              {disclaimerSections.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setActiveSection(sec.id)}
                    className={`text-xs py-2 px-3 rounded-lg transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-black text-white font-semibold shadow-xs"
                        : "text-[#52525B] hover:text-black hover:bg-black/[0.04]"
                    }`}
                  >
                    <span>{sec.title}</span>
                    {isActive && <ChevronRight className="w-3 h-3" />}
                  </a>
                );
              })}
            </nav>

            <div className="mt-6 pt-6 border-t border-black/[0.08] text-xs text-[#52525B]">
              <p className="font-semibold text-black mb-1">Related Legal Notices</p>
              <div className="flex flex-col gap-2 mt-2">
                <Link href="/privacy-policy">
                  <span className="text-black hover:underline cursor-pointer flex items-center gap-1">
                    <span>Privacy Policy</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </Link>
                <Link href="/terms-of-use">
                  <span className="text-black hover:underline cursor-pointer flex items-center gap-1">
                    <span>Terms of Use</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
            </div>
          </aside>

          {/* Legal Text Body */}
          <article className="lg:col-span-8 flex flex-col gap-12 leading-relaxed text-[#52525B]">
            
            {/* 1. General Information */}
            <section id="general-information" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 pb-2 border-b border-black/[0.08]">
                1. General Information
              </h2>
              <p className="text-sm sm:text-base">
                The information on the Healweal website is provided for general informational and corporate purposes. While Healweal aims to provide useful and reliable information, no representation or warranty is made that every statement is complete, accurate, current or suitable for every user or purpose.
              </p>
            </section>

            {/* 2. No Offer or Solicitation */}
            <section id="no-offer" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 pb-2 border-b border-black/[0.08]">
                2. No Offer or Solicitation
              </h2>
              <p className="text-sm sm:text-base">
                Website content, presentations, projections, announcements and descriptions of products or businesses do not automatically constitute an offer, invitation, solicitation, recommendation or commitment to enter into a transaction. Any binding product, investment, employment, partnership, lending, financial or other arrangement is governed by its applicable documentation.
              </p>
            </section>

            {/* 3. Forward-Looking Statements */}
            <section id="forward-looking" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 pb-2 border-b border-black/[0.08]">
                3. Forward-Looking Statements
              </h2>
              <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-black/[0.08]">
                <p className="text-sm sm:text-base">
                  Certain content may contain forward-looking statements, including statements concerning growth, plans, targets, expected performance, product development, market opportunities or future initiatives. Such statements involve risks and uncertainties, and actual results may differ materially. Users should not treat projections or targets as guarantees of future performance.
                </p>
              </div>
            </section>

            {/* 4. Financial and Investment Disclaimer */}
            <section id="financial-investment" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 pb-2 border-b border-black/[0.08] flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-black" />
                <span>4. Financial and Investment Disclaimer</span>
              </h2>
              <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-black/[0.08]">
                <p className="text-sm sm:text-base mb-3 text-black">
                  Nothing on the general Healweal website should be interpreted as investment advice, a recommendation to buy or sell securities, a guarantee of returns, or a promise of financial performance.
                </p>
                <p className="text-sm text-[#52525B]">
                  Where a Healweal group company provides regulated financial services, those services may be subject to separate terms, disclosures, risk statements and applicable regulatory requirements.
                </p>
              </div>
            </section>

            {/* 5. Healthcare Disclaimer */}
            <section id="healthcare" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 pb-2 border-b border-black/[0.08] flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-black" />
                <span>5. Healthcare Disclaimer</span>
              </h2>
              <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-black/[0.08] text-black">
                <p className="text-sm sm:text-base mb-3 font-medium">
                  Where health-related information appears on any Healweal property, it is for general informational purposes and is not a substitute for diagnosis, treatment or advice from a qualified healthcare professional.
                </p>
                <p className="text-xs sm:text-sm text-[#52525B]">
                  In an emergency, immediately contact appropriate local emergency medical services or a qualified physician.
                </p>
              </div>
            </section>

            {/* 6. Technology and AI Disclaimer */}
            <section id="technology-ai" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 pb-2 border-b border-black/[0.08] flex items-center gap-2">
                <Cpu className="w-5 h-5 text-black" />
                <span>6. Technology and AI Disclaimer</span>
              </h2>
              <p className="text-sm sm:text-base">
                Technology, software and AI-related content may describe capabilities, examples or expected use cases rather than guaranteed outcomes. AI-generated or automated outputs can contain errors and should be independently reviewed before being used for consequential decisions.
              </p>
            </section>

            {/* 7. Third-Party Information */}
            <section id="third-party" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 pb-2 border-b border-black/[0.08]">
                7. Third-Party Information
              </h2>
              <p className="text-sm sm:text-base">
                Healweal may reference information, statistics, links, tools, brands or services provided by third parties. Such references are not necessarily endorsements, and Healweal does not guarantee their accuracy, availability or suitability.
              </p>
            </section>

            {/* 8. No Guarantee of Results */}
            <section id="no-guarantee" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 pb-2 border-b border-black/[0.08]">
                8. No Guarantee of Results
              </h2>
              <p className="text-sm sm:text-base">
                Descriptions of business opportunities, products, services, case studies, performance examples, testimonials or outcomes should not be understood as guarantees that another person or organization will achieve the same result.
              </p>
            </section>

            {/* 9. Errors and Changes */}
            <section id="errors-changes" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 pb-2 border-b border-black/[0.08]">
                9. Errors and Changes
              </h2>
              <p className="text-sm sm:text-base">
                Healweal may correct errors, modify content, discontinue pages or change products, services and plans at any time without prior notice.
              </p>
            </section>

            {/* 10. Acceptance */}
            <section id="acceptance" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 pb-2 border-b border-black/[0.08]">
                10. Acceptance
              </h2>
              <div className="p-7 rounded-3xl bg-[#FAFAFA] border border-black/[0.08] text-black flex items-start gap-4 shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-black mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-base font-bold text-black mb-2">
                    Acknowledgment & Understanding
                  </h3>
                  <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                    By using the website, you acknowledge that you have read and understood this Disclaimer and agree to use the information at your own discretion and subject to applicable law.
                  </p>
                </div>
              </div>
            </section>

          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};
