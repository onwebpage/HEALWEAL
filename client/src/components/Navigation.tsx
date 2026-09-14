import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

const navigationItems = [
  { label: "About", path: "/about" },
  { label: "Companies", path: "/companies" },
  { label: "What We Do", path: "/what-we-do" },
  { label: "Innovation", path: "/innovation" },
  { label: "Careers", path: "/careers" },
  { label: "Insights", path: "/insights" },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md border-b border-black/[0.06] shadow-sm py-3.5"
            : "bg-white/60 backdrop-blur-sm border-b border-black/[0.03] py-5"
        }`}
        data-testid="header-navigation"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Brand Logo & Wordmark */}
          <Link href="/" data-testid="link-home" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2.5"
            >
              <span
                aria-hidden="true"
                className="h-8 w-8 rounded-md bg-[#214ECF] text-white shadow-xs inline-flex items-center justify-center text-sm font-extrabold tracking-[-0.08em]"
              >
                H
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-[#0B1220] leading-none">
                  HEALWEAL
                </span>
                <span className="text-[10px] font-semibold text-[#667085] tracking-widest uppercase mt-0.5">
                  Venture Group
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navigationItems.map((item) => {
              const isActive =
                location === item.path ||
                (item.path === "/companies" && location === "/brands") ||
                (item.path === "/insights" && (location === "/media" || location.startsWith("/media/blog")));

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  data-testid={`link-nav-${item.label.toLowerCase().replace(/ /g, "-")}`}
                >
                  <span
                    className={`relative px-3.5 py-2 text-[14.5px] font-medium tracking-tight rounded-full transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "text-[#0B1220] font-semibold"
                        : "text-[#667085] hover:text-[#0B1220] hover:bg-black/[0.03]"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="navIndicator"
                        className="absolute bottom-0.5 left-3.5 right-3.5 h-[2px] bg-[#214ECF] rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact" data-testid="button-partner-with-us">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#0B1220] hover:bg-[#214ECF] transition-all duration-300 shadow-sm cursor-pointer group">
                <span>Partner With Us</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#0B1220] hover:bg-black/[0.04] rounded-full transition-colors"
            aria-label="Toggle navigation"
            data-testid="button-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Full-screen / Expansive Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white border-l border-black/[0.06] p-6 flex flex-col justify-between shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-black/[0.06]">
                  <div className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="h-7 w-7 rounded bg-[#214ECF] text-white inline-flex items-center justify-center text-xs font-extrabold tracking-[-0.08em]"
                    >
                      H
                    </span>
                    <span className="font-bold text-lg text-[#0B1220]">HEALWEAL</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-[#667085] hover:text-[#0B1220] rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col gap-1.5 py-6">
                  {navigationItems.map((item, index) => {
                    const isActive = location === item.path;
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid={`link-mobile-${item.label.toLowerCase().replace(/ /g, "-")}`}
                      >
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between transition-colors ${
                            isActive
                              ? "bg-[#F5F7FA] text-[#214ECF]"
                              : "text-[#0B1220] hover:bg-[#F5F7FA]"
                          }`}
                        >
                          <span>{item.label}</span>
                          <ArrowRight className="w-4 h-4 opacity-50" />
                        </motion.div>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-black/[0.06] flex flex-col gap-3">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <div className="w-full py-3.5 px-6 rounded-full bg-[#214ECF] text-white text-center font-semibold flex items-center justify-center gap-2 shadow-sm">
                    <span>Partner With Us</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
                <p className="text-center text-xs text-[#667085] mt-2">
                  Building Businesses That Build a Better Future.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
