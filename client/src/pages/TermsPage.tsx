import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  FileCheck2, 
  Clock, 
  Building2, 
  Mail, 
  ChevronRight, 
  Scale, 
  AlertCircle,
  FileText,
  Printer,
  ShieldCheck,
  Globe2
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { LEGAL_CONFIG } from "@/lib/legalConfig";

const termsSections = [
  { id: "about", title: "1. About the Website" },
  { id: "acceptable-use", title: "2. Eligibility and Acceptable Use" },
  { id: "intellectual-property", title: "3. Intellectual Property" },
  { id: "trademarks", title: "4. Trademarks and Subsidiaries" },
  { id: "submissions", title: "5. User Submissions" },
  { id: "third-party-links", title: "6. Third-Party Links" },
  { id: "accuracy-availability", title: "7. Accuracy and Availability" },
  { id: "no-advice", title: "8. No Professional Advice" },
  { id: "disclaimers", title: "9. Disclaimers" },
  { id: "liability", title: "10. Limitation of Liability" },
  { id: "indemnity", title: "11. Indemnity" },
  { id: "suspension", title: "12. Suspension or Termination" },
  { id: "governing-law", title: "13. Governing Law and Jurisdiction" },
  { id: "changes", title: "14. Changes" },
  { id: "contact", title: "15. Contact" },
];

export const TermsPage = () => {
  const [activeSection, setActiveSection] = useState("about");

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
      for (const section of termsSections) {
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
    <div className="min-h-screen bg-white text-[#111827] flex flex-col">
      <Navigation />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-[#0B1220] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(33,78,207,0.18),transparent_50%)]" />
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-medium text-[#98A2B3] mb-6">
            <Link href="/">
              <span className="hover:text-white transition-colors cursor-pointer">Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-[#22C1FF]">Legal</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-white">Terms of Use</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-[#22C1FF] mb-4">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Binding Agreement & Website Conditions</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
                Terms of Use
              </h1>
              <p className="text-base sm:text-lg text-[#98A2B3] max-w-2xl leading-relaxed">
                Rules, rights, and responsibilities governing access to the {LEGAL_CONFIG.companyName} corporate website and digital properties.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/10 cursor-pointer"
                title="Print Terms"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Document</span>
              </button>
            </div>
          </div>

          {/* Meta Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="flex items-center gap-2 text-[#98A2B3]">
              <Clock className="w-4 h-4 text-[#00B388]" />
              <span>Effective Date: <strong className="text-white">{LEGAL_CONFIG.effectiveDate}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-[#98A2B3]">
              <Building2 className="w-4 h-4 text-[#214ECF]" />
              <span>Operating Entity: <strong className="text-white">{LEGAL_CONFIG.companyName}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-[#98A2B3]">
              <Scale className="w-4 h-4 text-[#22C1FF]" />
              <span>Governing Jurisdiction: <strong className="text-white">{LEGAL_CONFIG.jurisdiction.displayText}</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 py-16 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Table of Contents (Sticky on Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 bg-[#F5F7FA] border border-black/[0.06] rounded-2xl p-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#667085] mb-4">
              <FileText className="w-4 h-4 text-[#214ECF]" />
              <span>Terms Navigation</span>
            </div>
            <nav className="flex flex-col gap-1 max-h-[70vh] overflow-y-auto pr-2">
              {termsSections.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setActiveSection(sec.id)}
                    className={`text-xs py-2 px-3 rounded-lg transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-[#214ECF] text-white font-semibold shadow-xs"
                        : "text-[#475467] hover:text-[#0B1220] hover:bg-black/[0.04]"
                    }`}
                  >
                    <span>{sec.title}</span>
                    {isActive && <ChevronRight className="w-3 h-3" />}
                  </a>
                );
              })}
            </nav>

            <div className="mt-6 pt-6 border-t border-black/[0.08] text-xs text-[#667085]">
              <p className="font-semibold text-[#0B1220] mb-1">Corporate & Legal Affairs</p>
              <p className="mb-3">Formal legal correspondence and notices.</p>
              <a
                href={`mailto:${LEGAL_CONFIG.legalEmail.value}`}
                className="inline-flex items-center gap-1.5 text-[#214ECF] font-semibold hover:underline"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{LEGAL_CONFIG.legalEmail.value}</span>
              </a>
            </div>
          </aside>

          {/* Legal Text Body */}
          <article className="lg:col-span-8 flex flex-col gap-12 leading-relaxed text-[#344054]">
            
            {/* Preamble Card */}
            <div className="p-8 rounded-2xl bg-[#FAFCFF] border border-[#214ECF]/15 text-sm leading-relaxed">
              <p className="text-base text-[#101828] font-medium mb-3">
                These Terms of Use (“Terms”) govern access to and use of the Healweal website and related online content.
              </p>
              <p>
                By accessing the website, you agree to these Terms. If you do not agree, please do not use the website.
              </p>
            </div>

            {/* 1. About the Website */}
            <section id="about" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                1. About the Website
              </h2>
              <p className="text-sm sm:text-base">
                Healweal operates as a corporate platform presenting information about its businesses, subsidiaries, products, initiatives, opportunities and services. Website content may be informational and may not constitute an offer, solicitation, professional advice, recommendation or contractual commitment unless expressly stated.
              </p>
            </section>

            {/* 2. Eligibility and Acceptable Use */}
            <section id="acceptable-use" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                2. Eligibility and Acceptable Use
              </h2>
              <p className="text-sm sm:text-base">
                You must use the website lawfully and responsibly. You must not attempt to gain unauthorized access, interfere with security or operation, introduce malicious code, scrape or harvest information unlawfully, impersonate another person, infringe intellectual-property rights, or use the website for fraudulent, abusive or prohibited activities.
              </p>
            </section>

            {/* 3. Intellectual Property */}
            <section id="intellectual-property" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                3. Intellectual Property
              </h2>
              <p className="text-sm sm:text-base">
                Unless otherwise indicated, website text, graphics, logos, designs, trademarks, photographs, videos, software and other materials are owned by or licensed to Healweal and protected by applicable intellectual-property laws. You may view and use content for personal or legitimate business reference, but may not reproduce, modify, distribute, republish, sell, create derivative works from or commercially exploit it without prior written permission.
              </p>
            </section>

            {/* 4. Trademarks and Subsidiaries */}
            <section id="trademarks" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                4. Trademarks and Subsidiaries
              </h2>
              <p className="text-sm sm:text-base">
                Healweal and associated names, logos and marks may be trademarks or service marks of Healweal or relevant entities. References to subsidiaries, partners or third parties do not necessarily imply endorsement, ownership or agency.
              </p>
            </section>

            {/* 5. User Submissions */}
            <section id="submissions" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                5. User Submissions
              </h2>
              <p className="text-sm sm:text-base">
                If you submit information, ideas, feedback, documents, applications or other material, you represent that you have the right to provide it and that it does not unlawfully infringe another party’s rights. You grant Healweal permission to use submitted material as reasonably necessary to respond to your request, operate relevant processes and improve services, subject to the Privacy Policy and applicable law.
              </p>
            </section>

            {/* 6. Third-Party Links */}
            <section id="third-party-links" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                6. Third-Party Links
              </h2>
              <p className="text-sm sm:text-base">
                The website may contain links to third-party websites or services. Such links are provided for convenience and do not mean Healweal endorses or controls those third parties. We are not responsible for third-party content, availability, security, privacy practices or transactions.
              </p>
            </section>

            {/* 7. Accuracy and Availability */}
            <section id="accuracy-availability" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                7. Accuracy and Availability
              </h2>
              <p className="text-sm sm:text-base">
                We seek to keep website information accurate and current but do not warrant that all content is complete, error-free, current or continuously available. Information may change without notice.
              </p>
            </section>

            {/* 8. No Professional Advice */}
            <section id="no-advice" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                8. No Professional Advice
              </h2>
              <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-black/[0.06]">
                <p className="text-sm sm:text-base">
                  Unless expressly identified as such under a separate agreement, website content is general information and should not be relied upon as legal, financial, investment, tax, medical, technical or other professional advice. You should obtain advice from an appropriately qualified professional before making decisions based on information published on the website.
                </p>
              </div>
            </section>

            {/* 9. Disclaimers */}
            <section id="disclaimers" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                9. Disclaimers
              </h2>
              <p className="text-sm sm:text-base">
                To the maximum extent permitted by applicable law, the website and its content are provided on an “as is” and “as available” basis, without warranties not expressly stated in writing. Healweal does not guarantee uninterrupted availability, absence of errors, security, fitness for a particular purpose, accuracy of third-party content, or that the website will be free from harmful components.
              </p>
            </section>

            {/* 10. Limitation of Liability */}
            <section id="liability" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                10. Limitation of Liability
              </h2>
              <p className="text-sm sm:text-base">
                To the maximum extent permitted by applicable law, Healweal and its directors, officers, employees, affiliates and service providers will not be liable for indirect, incidental, special, consequential, exemplary or punitive losses, or loss of profits, revenue, data, goodwill or business opportunity, arising from use of or inability to use the website. Nothing in these Terms excludes liability that cannot lawfully be excluded or limited.
              </p>
            </section>

            {/* 11. Indemnity */}
            <section id="indemnity" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                11. Indemnity
              </h2>
              <p className="text-sm sm:text-base">
                To the extent permitted by law, you agree to indemnify and hold harmless Healweal and its affiliates, officers, employees and agents from claims, losses, liabilities, costs and expenses arising from your unlawful use of the website, violation of these Terms, or infringement of another party’s rights.
              </p>
            </section>

            {/* 12. Suspension or Termination */}
            <section id="suspension" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                12. Suspension or Termination
              </h2>
              <p className="text-sm sm:text-base">
                Healweal may restrict, suspend or terminate access to the website or particular features where reasonably necessary for security, maintenance, legal compliance, misuse prevention or other legitimate purposes.
              </p>
            </section>

            {/* 13. Governing Law and Jurisdiction */}
            <section id="governing-law" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                13. Governing Law and Jurisdiction
              </h2>
              <div className="p-6 rounded-2xl bg-[#FAFCFF] border border-[#214ECF]/15">
                <p className="text-sm sm:text-base text-[#101828]">
                  These Terms shall be governed by the laws of India. Subject to applicable mandatory law, courts having jurisdiction at <strong>[{LEGAL_CONFIG.jurisdiction.displayText}]</strong> shall have jurisdiction over disputes arising from these Terms or website use.
                </p>
              </div>
            </section>

            {/* 14. Changes */}
            <section id="changes" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                14. Changes
              </h2>
              <p className="text-sm sm:text-base">
                Healweal may amend these Terms from time to time. Continued use after publication of revised Terms constitutes acceptance to the extent permitted by law.
              </p>
            </section>

            {/* 15. Contact */}
            <section id="contact" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                15. Contact
              </h2>
              <p className="text-sm sm:text-base mb-6">
                Questions regarding these Terms of Use may be sent to our legal and corporate affairs desk:
              </p>

              <div className="p-8 rounded-3xl bg-[#F5F7FA] border border-black/[0.08] shadow-sm flex flex-col gap-5">
                <div>
                  <span className="text-xs font-bold text-[#214ECF] uppercase tracking-wider block mb-1">
                    Official Inquiries
                  </span>
                  <h3 className="text-lg font-bold text-[#0B1220]">
                    {LEGAL_CONFIG.companyName} — Legal Affairs
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4 border-t border-black/[0.06]">
                  <div>
                    <span className="text-[#667085] block mb-1">Registered Address</span>
                    <p className="font-medium text-[#101828] leading-relaxed">
                      {LEGAL_CONFIG.registeredOffice.displayAddress}
                    </p>
                    {LEGAL_CONFIG.registeredOffice.isPendingConfirmation && (
                      <span className="text-[10px] text-[#667085] bg-black/[0.04] px-2 py-0.5 rounded-md border border-black/[0.06] mt-2 inline-block font-medium">
                        Subject to Statutory Filing Confirmation
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-[#667085] block mb-1">Electronic Correspondence</span>
                    <p className="font-semibold text-[#214ECF]">
                      <a href={`mailto:${LEGAL_CONFIG.legalEmail.value}`} className="hover:underline">
                        {LEGAL_CONFIG.legalEmail.value}
                      </a>
                    </p>
                    <p className="text-[#667085] mt-1 text-[11px]">
                      {LEGAL_CONFIG.legalEmail.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-black/[0.06] text-[11px] text-[#667085]">
                  <span className="font-medium">Corporate Entity: </span>
                  <span>{LEGAL_CONFIG.companyName} &bull; Corporate Identification Number (CIN) available upon formal statutory inquiry.</span>
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
