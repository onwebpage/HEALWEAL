import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ShieldCheck, 
  Clock, 
  Building2, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Lock, 
  AlertCircle,
  FileText,
  Printer,
  Scale
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { LEGAL_CONFIG } from "@/lib/legalConfig";

const sections = [
  { id: "scope", title: "1. Scope" },
  { id: "information-we-collect", title: "2. Information We May Collect" },
  { id: "how-we-collect", title: "3. How We Collect Information" },
  { id: "purposes-of-processing", title: "4. Purposes of Processing" },
  { id: "cookies", title: "5. Cookies and Similar Technologies" },
  { id: "analytics-third-parties", title: "6. Analytics and Third-Party Services" },
  { id: "disclosure", title: "7. Disclosure of Information" },
  { id: "international-transfers", title: "8. International Transfers" },
  { id: "retention", title: "9. Data Retention" },
  { id: "security", title: "10. Data Security" },
  { id: "rights-and-choices", title: "11. Your Rights and Choices" },
  { id: "children", title: "12. Children" },
  { id: "changes", title: "13. Changes to this Policy" },
  { id: "contact", title: "14. Contact & Grievance Redressal" },
];

export const PrivacyPolicyPage = () => {
  const [activeSection, setActiveSection] = useState("scope");

  useEffect(() => {
    // If there is an anchor hash in URL, scroll to it
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
      for (const section of sections) {
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
            <span className="text-white">Privacy Policy</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-[#22C1FF] mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Data Governance & DPDP Compliance</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
                Website Privacy Policy
              </h1>
              <p className="text-base sm:text-lg text-[#98A2B3] max-w-2xl leading-relaxed">
                {LEGAL_CONFIG.companyName} is committed to responsible handling, security, and stewardship of personal information across our digital touchpoints.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/10 cursor-pointer"
                title="Print this Policy"
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
              <span>Entity: <strong className="text-white">{LEGAL_CONFIG.companyName}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-[#98A2B3]">
              <Scale className="w-4 h-4 text-[#22C1FF]" />
              <span>Jurisdiction: <strong className="text-white">{LEGAL_CONFIG.jurisdiction.displayText}</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area with Sticky Sidebar */}
      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 py-16 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Table of Contents (Sticky on Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 bg-[#F5F7FA] border border-black/[0.06] rounded-2xl p-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#667085] mb-4">
              <FileText className="w-4 h-4 text-[#214ECF]" />
              <span>Contents</span>
            </div>
            <nav className="flex flex-col gap-1 max-h-[70vh] overflow-y-auto pr-2">
              {sections.map((sec) => {
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
              <p className="font-semibold text-[#0B1220] mb-1">Have a Privacy Question?</p>
              <p className="mb-3">Reach out directly to our Grievance Desk.</p>
              <a
                href={`mailto:${LEGAL_CONFIG.privacyEmail.value}`}
                className="inline-flex items-center gap-1.5 text-[#214ECF] font-semibold hover:underline"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{LEGAL_CONFIG.privacyEmail.value}</span>
              </a>
            </div>
          </aside>

          {/* Legal Text Body */}
          <article className="lg:col-span-8 flex flex-col gap-12 leading-relaxed text-[#344054]">
            
            {/* Preamble Card */}
            <div className="p-8 rounded-2xl bg-[#FAFCFF] border border-[#214ECF]/15 text-sm leading-relaxed">
              <p className="text-base text-[#101828] font-medium mb-3">
                {LEGAL_CONFIG.companyName} (“{LEGAL_CONFIG.shortName}”, “Company”, “we”, “us” or “our”) respects your privacy and is committed to handling personal information responsibly.
              </p>
              <p>
                This Privacy Policy explains how information may be collected, used, disclosed, stored and protected when you visit or interact with the Healweal website, related digital properties, forms, communications and services that link to this Policy.
              </p>
            </div>

            {/* Section 1: Scope */}
            <section id="scope" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                1. Scope
              </h2>
              <p className="text-sm sm:text-base mb-4">
                This Policy applies to information collected through <strong>{LEGAL_CONFIG.domain}</strong> and related websites, landing pages, forms, career pages, contact channels, newsletters and other online interactions operated by Healweal.
              </p>
              <p className="text-sm sm:text-base">
                Individual subsidiaries, products or services may maintain separate privacy notices where their data practices differ. If a subsidiary-specific notice conflicts with this Policy for that service, the more specific notice will govern.
              </p>
            </section>

            {/* Section 2: Information We May Collect */}
            <section id="information-we-collect" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                2. Information We May Collect
              </h2>
              <p className="text-sm sm:text-base mb-4">
                We may collect the following categories of information depending on your interactions with us:
              </p>
              <ul className="space-y-3 text-sm sm:text-base list-none pl-0">
                <li className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F5F7FA] border border-black/[0.04]">
                  <span className="h-2 w-2 rounded-full bg-[#214ECF] mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-[#101828]">Identity and Contact Information:</strong> Such as name, email address, telephone number, company, job title and communication details.
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F5F7FA] border border-black/[0.04]">
                  <span className="h-2 w-2 rounded-full bg-[#214ECF] mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-[#101828]">Business and Professional Information:</strong> Voluntarily provided through enquiries, partnership requests, applications, vendor discussions or career applications.
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F5F7FA] border border-black/[0.04]">
                  <span className="h-2 w-2 rounded-full bg-[#214ECF] mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-[#101828]">Account or Service Information:</strong> Where a Healweal service requires registration or authentication.
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F5F7FA] border border-black/[0.04]">
                  <span className="h-2 w-2 rounded-full bg-[#214ECF] mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-[#101828]">Technical Information:</strong> Such as IP address, browser type, operating system, device information, referring pages, pages visited, approximate location derived from IP, timestamps and diagnostic information.
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F5F7FA] border border-black/[0.04]">
                  <span className="h-2 w-2 rounded-full bg-[#214ECF] mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-[#101828]">Usage Information:</strong> Such as clicks, navigation patterns, preferences and interactions with our website.
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F5F7FA] border border-black/[0.04]">
                  <span className="h-2 w-2 rounded-full bg-[#214ECF] mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-[#101828]">Communications You Send to Us:</strong> Including enquiries, feedback, support requests and attachments.
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F5F7FA] border border-black/[0.04]">
                  <span className="h-2 w-2 rounded-full bg-[#214ECF] mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-[#101828]">Information from Third Parties:</strong> Obtained from publicly available sources, business partners or service providers where permitted by applicable law.
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 3: How We Collect Information */}
            <section id="how-we-collect" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                3. How We Collect Information
              </h2>
              <p className="text-sm sm:text-base">
                We may collect information directly from you, automatically through website technologies, or from third parties where legally permitted. You may choose not to provide optional information; however, certain information may be necessary to respond to an enquiry, provide a requested service, process an application or comply with law.
              </p>
            </section>

            {/* Section 4: Purposes of Processing */}
            <section id="purposes-of-processing" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                4. Purposes of Processing
              </h2>
              <p className="text-sm sm:text-base mb-4">
                We process collected personal information for specified, legitimate business and compliance objectives:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {[
                  "To operate, maintain, secure and improve our websites and services.",
                  "To respond to enquiries, requests, applications and communications.",
                  "To evaluate partnerships, vendors, business opportunities and recruitment applications.",
                  "To provide requested information, products or services and administer accounts where applicable.",
                  "To personalize content and understand website performance and user behaviour.",
                  "To detect, prevent and investigate fraud, abuse, security incidents and unlawful activity.",
                  "To comply with legal, regulatory, tax, accounting and governmental requirements.",
                  "To establish, exercise or defend legal rights and manage disputes.",
                  "To send service-related communications and, where legally permitted, promotional communications subject to applicable preferences and consent requirements."
                ].map((purpose, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#F5F7FA] border border-black/[0.05] flex items-start gap-2.5">
                    <span className="text-xs font-bold text-[#214ECF] mt-0.5">0{i+1}</span>
                    <span className="text-[#344054]">{purpose}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5: Cookies and Similar Technologies */}
            <section id="cookies" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                5. Cookies and Similar Technologies
              </h2>
              <div className="p-6 rounded-2xl bg-[#FAFCFF] border border-[#214ECF]/15 space-y-3 text-sm sm:text-base">
                <p>
                  We may use cookies, pixels, tags, local storage and similar technologies to remember preferences, maintain functionality, understand traffic and measure performance. Some technologies may be provided by analytics, hosting, security or marketing providers.
                </p>
                <p>
                  You can control cookies through your browser settings and, where provided, our consent controls. Disabling certain cookies may affect website functionality.
                </p>
                <div className="pt-2 text-xs text-[#667085]">
                  <strong className="text-[#0B1220]">Summary of Website Cookies:</strong> Currently, our primary domain uses strictly necessary first-party cookies for secure administrator authentication and UI session states. No invasive third-party ad tracking pixels are deployed.
                </div>
              </div>
            </section>

            {/* Section 6: Analytics and Third-Party Services */}
            <section id="analytics-third-parties" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                6. Analytics and Third-Party Services
              </h2>
              <p className="text-sm sm:text-base">
                We may use third-party infrastructure, analytics, communications, recruitment, payment, security, hosting or other service providers. These providers may process information on our behalf and are expected to use it only for authorized purposes and subject to appropriate contractual or legal safeguards. Third-party websites and services are governed by their own policies.
              </p>
            </section>

            {/* Section 7: Disclosure of Information */}
            <section id="disclosure" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                7. Disclosure of Information
              </h2>
              <p className="text-sm sm:text-base mb-3">
                <strong>We do not sell personal information as a standalone commercial asset.</strong>
              </p>
              <p className="text-sm sm:text-base">
                We may disclose information to affiliates and subsidiaries, professional advisers, technology and hosting providers, payment or communication providers, auditors, insurers, investors or transaction counterparties, regulators, law-enforcement authorities, courts, and other parties where necessary for legitimate business, legal or security purposes. In a merger, acquisition, restructuring, financing or sale of assets, information may be transferred as part of the transaction subject to applicable law.
              </p>
            </section>

            {/* Section 8: International Transfers */}
            <section id="international-transfers" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                8. International Transfers
              </h2>
              <p className="text-sm sm:text-base">
                Some service providers or recipients may process information outside India. Where personal information is transferred across borders, Healweal will take measures required by applicable law and contractual arrangements.
              </p>
            </section>

            {/* Section 9: Data Retention */}
            <section id="retention" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                9. Data Retention
              </h2>
              <p className="text-sm sm:text-base">
                We retain information only for as long as reasonably necessary for the purposes described in this Policy, including legal, regulatory, accounting, security, dispute-resolution and legitimate business requirements. Retention periods vary by category and purpose.
              </p>
            </section>

            {/* Section 10: Data Security */}
            <section id="security" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                10. Data Security
              </h2>
              <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-black/[0.06] flex items-start gap-4">
                <Lock className="w-5 h-5 text-[#214ECF] mt-1 flex-shrink-0" />
                <p className="text-sm sm:text-base text-[#344054]">
                  We use reasonable technical, administrative and organizational safeguards designed to protect information against unauthorized access, loss, misuse, alteration or disclosure. No internet transmission or storage system can be guaranteed to be completely secure.
                </p>
              </div>
            </section>

            {/* Section 11: Your Rights and Choices */}
            <section id="rights-and-choices" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                11. Your Rights and Choices
              </h2>
              <p className="text-sm sm:text-base">
                Subject to applicable law, you may have rights to request access to, correction or updating of, or deletion of personal information; withdraw consent where processing is based on consent; object to or restrict certain processing; or exercise other rights available under applicable data-protection law. Requests may be submitted using the contact details published on our website. We may need to verify a request before acting on it.
              </p>
            </section>

            {/* Section 12: Children */}
            <section id="children" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                12. Children
              </h2>
              <p className="text-sm sm:text-base">
                Our website is not intentionally directed at children where such collection would be restricted by law. We do not knowingly seek to collect personal information from children in violation of applicable requirements.
              </p>
            </section>

            {/* Section 13: Changes to this Policy */}
            <section id="changes" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                13. Changes to this Policy
              </h2>
              <p className="text-sm sm:text-base">
                We may update this Policy from time to time. The revised version will be posted on the website with an updated effective date. Material changes may be communicated through appropriate channels where required.
              </p>
            </section>

            {/* Section 14: Contact */}
            <section id="contact" className="scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mb-4 pb-2 border-b border-black/[0.06]">
                14. Contact & Grievance Redressal
              </h2>
              <p className="text-sm sm:text-base mb-6">
                For privacy-related questions, data rights requests, or grievance redressal, please contact our designated office:
              </p>

              <div className="p-8 rounded-3xl bg-[#F5F7FA] border border-black/[0.08] shadow-sm flex flex-col gap-5">
                <div>
                  <span className="text-xs font-bold text-[#214ECF] uppercase tracking-wider block mb-1">
                    Designated Contact
                  </span>
                  <h3 className="text-lg font-bold text-[#0B1220] flex items-center gap-2">
                    <span>{LEGAL_CONFIG.privacyOfficer.name}</span>
                    {LEGAL_CONFIG.privacyOfficer.isPendingConfirmation && (
                      <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                        Pending Nomination
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-[#667085] mt-0.5">
                    {LEGAL_CONFIG.companyName}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4 border-t border-black/[0.06]">
                  <div>
                    <span className="text-[#667085] block mb-1">Registered Office</span>
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
                    <span className="text-[#667085] block mb-1">Privacy / Grievance Inquiries</span>
                    <p className="font-semibold text-[#214ECF]">
                      <a href={`mailto:${LEGAL_CONFIG.privacyEmail.value}`} className="hover:underline">
                        {LEGAL_CONFIG.privacyEmail.value}
                      </a>
                    </p>
                    <p className="text-[#667085] mt-1 text-[11px]">
                      {LEGAL_CONFIG.privacyEmail.description}
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
