"use client";

import { useRef, useEffect, useState } from "react";

const services = [
  {
    icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>),
    title: "Création de contenu clé en main",
    description: "On s'occupe de TOUT. Brainstorming, tournage 4K, montage, corrections, publications. Vous n'avez qu'à être devant la caméra — on gère le reste.",
    features: ["Brainstorming créatif", "Tournage 4K", "Montage professionnel", "Coaching caméra", "Calendrier & publications"],
  },
  {
    icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" /></svg>),
    title: "Publicité numérique",
    description: "Campagnes publicitaires stratégiques sur Facebook, Instagram et TikTok. Création de visuels percutants et vidéos publicitaires qui convertissent.",
    features: ["Facebook & Instagram Ads", "TikTok Ads", "Création de visuels", "Vidéos publicitaires", "Optimisation continue"],
  },
  {
    icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>),
    title: "CRM & Automatisations",
    description: "Gestion complète de votre CRM et mise en place d'automatisations pour convertir vos prospects en clients fidèles, sans effort de votre part.",
    features: ["Gestion CRM", "Automatisations intelligentes", "Suivi de prospects", "Nurturing clients"],
  },
  {
    icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>),
    title: "Audit & Stratégie",
    description: "Audit complet de vos campagnes actuelles et élaboration d'une stratégie de croissance sur mesure pour dominer votre marché.",
    features: ["Audit des campagnes existantes", "Analyse concurrentielle", "Stratégie personnalisée", "Plan d'action détaillé"],
  },
];

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.2 });
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className={`glass-card-hover p-8 group transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${index * 100}ms` }}>
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 bg-orange/10 text-orange group-hover:bg-orange/20 group-hover:shadow-lg group-hover:shadow-orange/10">
        {service.icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 font-display">{service.title}</h3>
      <p className="text-sm text-gris-400 leading-relaxed mb-6">{service.description}</p>
      <ul className="space-y-2">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-gris-300">
            <svg className="w-4 h-4 flex-shrink-0 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-noir via-gris-950 to-noir" />
      <div className="relative max-w-7xl mx-auto section-padding">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-semibold text-orange uppercase tracking-widest mb-4 block">Nos Services</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 font-display">
            Tout ce qu&apos;il faut pour <span className="gradient-text">dominer</span> votre marché
          </h2>
          <p className="text-gris-400 leading-relaxed">De la création de contenu clé en main à la gestion publicitaire, on s&apos;occupe de tout pour propulser votre entreprise.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (<ServiceCard key={service.title} service={service} index={i} />))}
        </div>
      </div>
    </section>
  );
}
