"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "work", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Scroll indicator (pill background / shadow)
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Intersection Observer — fires reliably regardless of Lenis smooth scroll
    const observers: IntersectionObserver[] = [];

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          } else {
            // Clear active if this section leaves AND it was the active one
            setActiveSection((prev) => (prev === id ? "" : prev));
          }
        },
        {
          // Section must scroll past the top 40% of the viewport before activating.
          // The large negative bottom margin means it deactivates before it fully leaves.
          rootMargin: "-40% 0px -55% 0px",
          threshold: 0,
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 md:pt-4 transition-all duration-300 pointer-events-none">
        <nav
          className={`pointer-events-auto w-full max-w-4xl flex items-center justify-between px-5 sm:px-6 py-2.5 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-background/90 dark:bg-[#1C1E20]/90 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.15)]"
              : "bg-background/60 dark:bg-[#1C1E20]/50 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-sm"
          }`}
          aria-label="Main Navigation"
        >
          {/* Brand Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A7C39] rounded-full pr-2"
          >
            <span className="font-[family-name:var(--font-display)] text-lg md:text-xl font-bold text-[#4A7C39] dark:text-[#78B05F] tracking-wide group-hover:scale-105 transition-transform flex items-center gap-1.5">
              <span>✦</span> Azalea
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-1 list-none bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/5 dark:border-white/5 font-sans">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 block ${
                      isActive
                        ? "bg-[#4A7C39] text-white shadow-[0_0_14px_rgba(74,124,57,0.4)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 flex items-center justify-center text-sm md:text-base hover:bg-black/10 dark:hover:bg-white/20 transition-all hover:rotate-12 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A7C39]"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 gap-1.5 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-4 h-0.5 bg-foreground transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block w-4 h-0.5 bg-foreground transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-4 h-0.5 bg-foreground transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-background/95 dark:bg-[#1C1E20]/95 backdrop-blur-2xl flex flex-col p-8 md:hidden animate-in fade-in slide-in-from-top-4 duration-200 font-sans">
          <div className="mb-4">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Navigation</span>
          </div>
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between py-3 px-4 rounded-xl text-lg font-medium transition-all ${
                    isActive
                      ? "bg-[#4A7C39]/15 text-[#4A7C39] dark:text-[#78B05F] font-bold border border-[#4A7C39]/30"
                      : "text-foreground hover:text-[#4A7C39] hover:bg-white/5"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs uppercase font-sans tracking-wider px-2 py-0.5 rounded-full bg-[#4A7C39] text-white">Active</span>}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
