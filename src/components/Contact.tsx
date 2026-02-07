"use client";

import { useRef, useEffect, useState } from "react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative py-32">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-900/50 to-dark-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/8 rounded-full blur-[128px]" />
      </div>

      <div className="relative max-w-7xl mx-auto section-padding">
        <div
          className={`glass-card p-10 md:p-16 relative overflow-hidden transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/5 rounded-full blur-[80px]" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/5 rounded-full blur-[80px]" />

          <div className="relative grid md:grid-cols-2 gap-12 items-center">
            {/* Left side */}
            <div>
              <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest mb-4 block">
                Passez à l&apos;action
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                Prêt à devenir{" "}
                <span className="gradient-text">#1 dans votre secteur?</span>
              </h2>
              <p className="text-dark-400 leading-relaxed mb-8">
                Réservez un appel découverte gratuit avec notre équipe. On va
                analyser votre situation actuelle et vous montrer exactement
                comment on peut vous aider à atteindre vos objectifs de
                croissance.
              </p>

              <div className="space-y-4">
                {[
                  "Appel de 30 minutes, sans engagement",
                  "Analyse gratuite de votre présence en ligne",
                  "Plan d'action personnalisé",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3.5 h-3.5 text-primary-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-dark-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side — Contact form */}
            <div className="glass-card p-8">
              <form
                className="space-y-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-dark-300 mb-2"
                  >
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 rounded-xl bg-dark-900/50 border border-white/[0.06] text-white placeholder:text-dark-600 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-dark-300 mb-2"
                  >
                    Courriel
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="vous@entreprise.com"
                    className="w-full px-4 py-3 rounded-xl bg-dark-900/50 border border-white/[0.06] text-white placeholder:text-dark-600 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="business"
                    className="block text-sm font-medium text-dark-300 mb-2"
                  >
                    Type d&apos;entreprise
                  </label>
                  <select
                    id="business"
                    className="w-full px-4 py-3 rounded-xl bg-dark-900/50 border border-white/[0.06] text-dark-400 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all appearance-none"
                  >
                    <option value="">Sélectionnez votre secteur</option>
                    <option value="concessionnaire">Concessionnaire automobile</option>
                    <option value="courtier">Courtier immobilier</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="entrepreneur">Entrepreneur / Expert</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-dark-300 mb-2"
                  >
                    Message (optionnel)
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Parlez-nous de votre projet..."
                    className="w-full px-4 py-3 rounded-xl bg-dark-900/50 border border-white/[0.06] text-white placeholder:text-dark-600 text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 text-base font-semibold rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-2xl hover:shadow-primary-500/25 transition-all duration-500 hover:-translate-y-0.5"
                >
                  Réserver mon appel découverte
                </button>
                <p className="text-xs text-dark-600 text-center">
                  En soumettant ce formulaire, vous acceptez notre politique de
                  confidentialité.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
