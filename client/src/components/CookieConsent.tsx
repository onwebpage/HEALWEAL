import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Shield, Cookie, X, Check } from "lucide-react";

const CONSENT_STORAGE_KEY = "healweal_cookie_consent";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!stored) {
        // Show after a brief delay for smoother page load
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore localStorage errors (e.g. strict privacy mode)
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({
          essential: true,
          analytics: true,
          timestamp: new Date().toISOString(),
          choice: "all",
        })
      );
    } catch {}
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({
          essential: true,
          analytics: false,
          timestamp: new Date().toISOString(),
          choice: "essential",
        })
      );
    } catch {}
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.98 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 pointer-events-auto"
          role="region"
          aria-label="Cookie consent banner"
        >
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0B1220]/95 backdrop-blur-md border border-white/15 text-white shadow-2xl flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#214ECF] flex items-center justify-center text-white shadow-xs">
                  <Cookie className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight leading-none">
                    Privacy & Cookies Notice
                  </h4>
                  <span className="text-[10px] font-semibold text-[#00B388] tracking-wider uppercase mt-1 inline-block">
                    DPDP & Transparency First
                  </span>
                </div>
              </div>
              <button
                onClick={handleEssentialOnly}
                aria-label="Dismiss cookie notice"
                className="p-1 text-[#98A2B3] hover:text-white transition-colors rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#98A2B3] leading-relaxed">
              We use strictly necessary first-party cookies to ensure site security, maintain sessions, and preserve user preferences. We do not sell your data or deploy invasive third-party ad tracking.
            </p>

            <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/10">
              <Link href="/privacy-policy#cookies">
                <span className="text-[11px] text-[#22C1FF] hover:underline cursor-pointer">
                  Learn More
                </span>
              </Link>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleEssentialOnly}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-all cursor-pointer border border-white/10"
                >
                  Essential Only
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-3.5 py-1.5 rounded-lg bg-[#214ECF] hover:bg-[#1A3EB0] text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
