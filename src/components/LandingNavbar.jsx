import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/studyhub-logo.jpg";
import { useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Community", href: "/community" },
];

const LandingNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState("#top");
  const location = useLocation();
  const navigate = useNavigate();

  // Smooth scroll to section
  const scrollToHash = (hash) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(hash);
  };

  // Handle navigation whether on "/" or not
  const handleNav = (href) => {
  if (href.startsWith("/")) {
    navigate(href);
    setActive(href);
  } else {
    // For hash links (sections)
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => scrollToHash(href), 60);
    } else {
      scrollToHash(href);
    }
    setActive(href);
  }
};

  // Track active section while scrolling
  useEffect(() => {
    const ids = ["top", "features", "community"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis?.target?.id) setActive(`#${vis.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-30 w-full bg-[#0a0f1c]/90 backdrop-blur border-b border-slate-900 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNav("#top");
          }}
          className="flex items-center gap-2"
        >
          <img src={logo} alt="StudyHub Logo" className="h-8 w-8 rounded-full shadow" />
          <span className="font-extrabold text-xl text-indigo-400 tracking-tight">StudyHub</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link, idx) => (
            <motion.button
              key={link.name}
              type="button"
              onClick={() => handleNav(link.href)}
              className={`relative px-2 py-1 font-medium transition ${
                active === link.href ? "text-cyan-400" : "text-slate-100 hover:text-cyan-400"
              }`}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              aria-current={active === link.href ? "page" : undefined}
            >
              {link.name}
              {hovered === idx && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 right-0 -bottom-1 h-1 rounded bg-gradient-to-r from-indigo-400 via-cyan-400 to-amber-400"
                  initial={{ opacity: 0, scaleX: 0.5 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  exit={{ opacity: 0, scaleX: 0.5 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="/login"
            className="px-4 py-2 rounded-lg bg-indigo-500 text-slate-100 font-semibold shadow hover:bg-cyan-400 hover:text-slate-900 transition"
          >
            Sign In
          </a>
          <a
            href="/register"
            className="px-4 py-2 rounded-lg border border-cyan-400 text-cyan-400 font-semibold shadow hover:bg-cyan-400 hover:text-slate-900 transition"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-indigo-500/10 transition"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="w-6 h-6 text-indigo-400" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-64 h-full bg-[#0a0f1c] shadow-lg z-50 flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-900">
              <span className="font-extrabold text-lg text-indigo-400">StudyHub</span>
              <button
                className="p-2 rounded hover:bg-indigo-500/10"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <X className="w-6 h-6 text-indigo-400" />
              </button>
            </div>
            <nav className="flex flex-col gap-2 px-4 py-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  type="button"
                  className="py-2 px-2 rounded text-slate-100 font-medium text-left hover:bg-indigo-500/10 hover:text-cyan-400 transition"
                  onClick={() => {
                    setMobileOpen(false);
                    handleNav(link.href);
                  }}
                >
                  {link.name}
                </button>
              ))}
              <a
                href="/login"
                className="mt-4 px-4 py-2 rounded-lg bg-indigo-500 text-slate-100 font-semibold shadow hover:bg-cyan-400 hover:text-slate-900 transition"
                onClick={() => setMobileOpen(false)}
              >
                Sign In
              </a>
              <a
                href="/register"
                className="mt-2 px-4 py-2 rounded-lg border border-cyan-400 text-cyan-400 font-semibold shadow hover:bg-cyan-400 hover:text-slate-900 transition"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default LandingNavbar;