import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

const navigationItems = [
  { label: "About", path: "/about" },
  { label: "Platform", path: "/companies" },
  { label: "What We Do", path: "/what-we-do" },
  { label: "Innovation", path: "/innovation" },
  { label: "Careers", path: "/careers" },
  { label: "Insights", path: "/insights" },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [location] = useLocation();

  const activeItem = navigationItems.find(
    (item) =>
      location === item.path ||
      (item.path === "/companies" && location === "/brands") ||
      (item.path === "/insights" && (location === "/media" || location.startsWith("/media/blog")))
  );

  const highlightedPath = hoveredItem !== null ? hoveredItem : activeItem?.path;

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
            ? "bg-white/95 backdrop-blur-md border-b border-black/[0.08] shadow-xs py-3.5"
            : "bg-white/80 backdrop-blur-sm border-b border-black/[0.04] py-5"
        }`}
        data-testid="header-navigation"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Brand Logo & Wordmark */}
          <Link href="/" data-testid="link-home" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="flex items-center"
            >
              <img
                src="/healweal-logo-full.png"
                alt="Healweal"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            onMouseLeave={() => setHoveredItem(null)}
            className="hidden lg:flex items-center gap-1 xl:gap-2"
          >
            {navigationItems.map((item) => {
              const isHighlighted = highlightedPath === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  data-testid={`link-nav-${item.label.toLowerCase().replace(/ /g, "-")}`}
                  onMouseEnter={() => setHoveredItem(item.path)}
                >
                  <span
                    className={`relative px-4 py-2 text-[14.5px] font-medium tracking-tight rounded-full transition-colors duration-200 cursor-pointer inline-flex items-center justify-center select-none ${
                      isHighlighted
                        ? "text-white font-semibold"
                        : "text-black hover:text-black"
                    }`}
                  >
                    {isHighlighted && (
                      <motion.span
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-black rounded-full shadow-xs"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact" data-testid="button-partner-with-us">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-black border border-black hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-xs cursor-pointer group">
                <span>Partner With Us</span>
                <ArrowRight className="w-3.5 h-3.5 text-black group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-black hover:bg-black/[0.04] rounded-full transition-colors"
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
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white border-l border-black/[0.08] p-6 flex flex-col justify-between shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-black/[0.08]">
                  <img
                    src="/healweal-logo-full.png"
                    alt="Healweal"
                    className="h-7 w-auto object-contain"
                  />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-[#71717A] hover:text-black rounded-full"
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
                              ? "bg-black/[0.06] text-black"
                              : "text-black hover:bg-black/[0.03]"
                          }`}
                        >
                          <span>{item.label}</span>
                          <ArrowRight className="w-4 h-4 opacity-40" />
                        </motion.div>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-black/[0.08] flex flex-col gap-3">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <div className="w-full py-3.5 px-6 rounded-full bg-white text-black border border-black text-center font-semibold flex items-center justify-center gap-2 shadow-xs hover:bg-black hover:text-white transition-all cursor-pointer">
                    <span>Partner With Us</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
                <p className="text-center text-xs text-[#71717A] mt-2">
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
