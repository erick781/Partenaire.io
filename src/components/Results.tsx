"use client";

import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 300, suffix: "+", label: "Clients accompagnés" },
  { value: 50, suffix: "M+", label: "Vues générées" },
  { value: 10, suffix: "x", label: "Retour sur investissement moyen" },
  { value: 98, suffix: "%", label: "Taux de satisfaction" },
];

function AnimatedCounter({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Results() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="resultats" ref={sectionRef} className="relative py-32">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-accent-500/5" />
      </div>

      <div className="relative max-w-7xl mx-auto section-padding">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest mb-4 block">
            Résultats
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Des chiffres qui{" "}
            <span className="gradient-text">parlent</span>
          </h2>
          <p className="text-dark-400 leading-relaxed">
            Nos résultats témoignent de notre engagement envers la croissance de
            nos clients.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`glass-card p-8 text-center transition-all duration-700 ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="text-4xl md:text-5xl font-black gradient-text mb-3">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  inView={inView}
                />
              </div>
              <p className="text-sm text-dark-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Highlight card */}
        <div className="mt-16 glass-card p-10 md:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-[100px]" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                Prêt à exploser{" "}
                <span className="gradient-text">votre croissance?</span>
              </h3>
              <p className="text-dark-400 leading-relaxed">
                Rejoignez les 300+ entreprises qui ont fait confiance à notre
                expertise pour transformer leur présence en ligne et multiplier
                leurs revenus.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <a
                href="#contact"
                className="group px-8 py-4 text-base font-semibold rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-2xl hover:shadow-primary-500/25 transition-all duration-500 hover:-translate-y-1 flex items-center gap-2"
              >
                Commencer maintenant
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
