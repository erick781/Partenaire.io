"use client";

import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 300, suffix: "+", label: "Clients accompagnés" },
  { value: 50, suffix: "M+", label: "Vues générées" },
  { value: 10, suffix: "x", label: "ROI moyen" },
  { value: 98, suffix: "%", label: "Taux de satisfaction" },
];

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <span>{count}{suffix}</span>;
}

export default function Results() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } }, { threshold: 0.3 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="resultats" ref={sectionRef} className="relative py-32">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-orange/5 via-transparent to-orange/3" />
      </div>

      <div className="relative max-w-7xl mx-auto section-padding">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-semibold text-orange uppercase tracking-widest mb-4 block">Résultats</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 font-display">
            Des chiffres qui <span className="gradient-text">parlent</span>
          </h2>
          <p className="text-gris-400 leading-relaxed">De 12 000$ à 1 000 000$ de revenus en moins de 2 ans. On applique la même recette pour nos clients.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`glass-card p-8 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 150}ms` }}>
              <div className="text-4xl md:text-5xl font-black text-orange mb-3 font-display">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <p className="text-sm text-gris-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Viktor highlight */}
        <div className="mt-16 glass-card p-10 md:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange/5 rounded-full blur-[100px]" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-orange flex items-center justify-center text-white text-2xl font-bold font-display">V</div>
                <div>
                  <h3 className="text-xl font-bold text-white font-display">Viktor St-Jacques</h3>
                  <p className="text-sm text-gris-500">Fondateur, Partenaire.io</p>
                </div>
              </div>
              <p className="text-gris-300 leading-relaxed text-lg italic">
                &ldquo;On est passé de 12 000$ par année à 1 000 000$ en moins de 2 ans. Maintenant, on aide nos clients à vivre la même transformation.&rdquo;
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <a href="#contact" className="group px-8 py-4 text-base font-semibold rounded-2xl bg-orange text-white hover:bg-orange-light hover:shadow-2xl hover:shadow-orange/25 transition-all duration-500 hover:-translate-y-1 flex items-center gap-2">
                Commencer maintenant
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
