"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#resultats", label: "Résultats" },
  { href: "#processus", label: "Processus" },
  { href: "#temoignages", label: "Témoignages" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-noir/80 backdrop-blur-2xl border-b border-white/[0.06] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto section-padding flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-orange flex items-center justify-center font-bold text-white text-lg font-display transition-transform duration-300 group-hover:scale-110">
            P
          </div>
          <span className="text-xl font-bold tracking-tight font-display">
            Partenaire<span className="text-orange">.io</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-gris-400 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/[0.05]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-orange text-white hover:bg-orange-light hover:shadow-lg hover:shadow-orange/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            Prendre rendez-vous
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center"
          aria-label="Menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      <div className={`md:hidden transition-all duration-500 overflow-hidden ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="section-padding py-4 flex flex-col gap-1 bg-noir/95 backdrop-blur-2xl border-t border-white/[0.06]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 text-sm font-medium text-gris-400 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/[0.05]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 px-6 py-3 text-sm font-semibold rounded-xl bg-orange text-white text-center"
          >
            Prendre rendez-vous
          </a>
        </nav>
      </div>
    </header>
  );
}
