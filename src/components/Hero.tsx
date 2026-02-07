"use client";

import { useEffect, useRef } from "react";

const clients = ["Automobile en Direct", "Libé", "Monteurvideo.ca"];

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
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange/8 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-orange/5 rounded-full blur-[128px] animate-pulse-slow animate-delay-200" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto section-padding py-32 md:py-40">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-orange animate-pulse" />
            <span className="text-xs font-medium text-gris-300 uppercase tracking-wider">
              Short Form Content Expert
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.9] tracking-tight mb-8 animate-fade-in-up font-display">
            La dernière agence
            <br />
            <span className="gradient-text">dont vous aurez besoin</span>
          </h1>

          <p className="text-lg md:text-xl text-gris-400 leading-relaxed max-w-2xl mx-auto mb-12 animate-fade-in-up animate-delay-200">
            On aide les concessionnaires, courtiers, restaurateurs et
            entrepreneurs à devenir{" "}
            <span className="text-white font-semibold">#1 dans leur secteur</span>{" "}
            grâce au contenu vidéo court et à la publicité numérique.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-300">
            <a
              href="#contact"
              className="group px-8 py-4 text-base font-semibold rounded-2xl bg-orange text-white hover:bg-orange-light hover:shadow-2xl hover:shadow-orange/25 transition-all duration-500 hover:-translate-y-1 flex items-center gap-2"
            >
              Prendre rendez-vous
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <a
              href="#services"
              className="px-8 py-4 text-base font-semibold rounded-2xl glass-card text-gris-200 hover:text-white hover:bg-white/[0.06] transition-all duration-500"
            >
              Découvrir nos services
            </a>
          </div>

          {/* Founder spotlight */}
          <div className="mt-16 animate-fade-in-up animate-delay-400">
            <div className="inline-flex items-center gap-4 glass-card px-6 py-4 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-orange flex items-center justify-center text-white font-bold text-lg font-display">
                V
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">Viktor St-Jacques</p>
                <p className="text-xs text-gris-500">Fondateur &amp; Short Form Content Expert</p>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/10 mx-2" />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-bold text-orange">12K$ → 1M$</p>
                <p className="text-xs text-gris-500">en moins de 2 ans</p>
              </div>
            </div>
          </div>

          {/* Client logos */}
          <div className="mt-12 flex flex-col items-center animate-fade-in-up animate-delay-500">
            <p className="text-xs font-medium text-gris-600 uppercase tracking-widest mb-6">
              Ils nous font confiance
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {clients.map((client) => (
                <span key={client} className="text-sm font-semibold text-gris-500 hover:text-orange transition-colors duration-300">
                  {client}
                </span>
              ))}
              <span className="text-sm font-semibold text-gris-600">+ 300 autres</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in animate-delay-600">
        <span className="text-[10px] font-medium text-gris-600 uppercase tracking-widest">Défiler</span>
        <div className="w-5 h-8 rounded-full border border-gris-700 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-orange animate-bounce" />
        </div>
      </div>
    </section>
  );
}
