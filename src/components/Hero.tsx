"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { width, height } = heroRef.current.getBoundingClientRect();
      const x = (clientX / width - 0.5) * 20;
      const y = (clientY / height - 0.5) * 20;
      heroRef.current.style.setProperty("--mouse-x", `${x}px`);
      heroRef.current.style.setProperty("--mouse-y", `${y}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-500/8 rounded-full blur-[128px] animate-pulse-slow animate-delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary-600/5 rounded-full blur-[100px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto section-padding py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-dark-300 uppercase tracking-wider">
              Anciennement Trompette Media
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-8 animate-fade-in-up">
            Votre partenaire
            <br />
            <span className="gradient-text">de croissance</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-dark-300 leading-relaxed max-w-2xl mx-auto mb-12 animate-fade-in-up animate-delay-200">
            Nous aidons les entrepreneurs, concessionnaires, courtiers et
            restaurateurs à devenir{" "}
            <span className="text-white font-semibold">#1 dans leur secteur</span>{" "}
            grâce au contenu stratégique et à la publicité numérique.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-300">
            <a
              href="#contact"
              className="group px-8 py-4 text-base font-semibold rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-2xl hover:shadow-primary-500/25 transition-all duration-500 hover:-translate-y-1 flex items-center gap-2"
            >
              Réserver un appel découverte
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
            <a
              href="#services"
              className="px-8 py-4 text-base font-semibold rounded-2xl glass-card text-dark-200 hover:text-white hover:bg-white/[0.06] transition-all duration-500"
            >
              Découvrir nos services
            </a>
          </div>

          {/* Trust bar */}
          <div className="mt-20 flex flex-col items-center animate-fade-in-up animate-delay-400">
            <p className="text-xs font-medium text-dark-500 uppercase tracking-widest mb-6">
              Ils nous font confiance
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
              {[
                "Concessionnaires",
                "Courtiers",
                "Restaurants",
                "Entrepreneurs",
                "Experts",
              ].map((label) => (
                <span
                  key={label}
                  className="text-sm font-medium text-dark-500 hover:text-dark-300 transition-colors"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in animate-delay-600">
        <span className="text-[10px] font-medium text-dark-500 uppercase tracking-widest">
          Défiler
        </span>
        <div className="w-5 h-8 rounded-full border border-dark-600 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-dark-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
