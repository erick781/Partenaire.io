"use client";

import { useRef, useEffect, useState } from "react";

const testimonials = [
  {
    quote:
      "Depuis qu'on travaille avec Partenaire.io, notre business a explosé dans des façons que je n'aurai jamais pu m'imaginer. Leur expertise en contenu est inégalée.",
    name: "Marc-Antoine L.",
    role: "Concessionnaire automobile",
    stars: 5,
  },
  {
    quote:
      "L'équipe par excellence dans le contenu sur les médias sociaux. Ils comprennent notre marché et livrent des résultats concrets chaque mois.",
    name: "Sophie B.",
    role: "Courtière immobilière",
    stars: 5,
  },
  {
    quote:
      "J'investirais dans ce service pour n'importe quelle entreprise qui cherche plus de visibilité. Le ROI est phénoménal et l'équipe est incroyablement professionnelle.",
    name: "Jean-Philippe R.",
    role: "Restaurateur",
    stars: 5,
  },
  {
    quote:
      "Partenaire.io a complètement transformé notre approche marketing. En 3 mois, on a triplé notre nombre de leads qualifiés. Résultats au-delà de nos attentes.",
    name: "Alexandre D.",
    role: "Entrepreneur",
    stars: 5,
  },
  {
    quote:
      "Le meilleur investissement qu'on a fait pour notre entreprise. L'équipe est réactive, créative et les résultats sont au rendez-vous. Je recommande à 100%.",
    name: "Isabelle M.",
    role: "Propriétaire de salon",
    stars: 5,
  },
  {
    quote:
      "On cherchait quelqu'un pour gérer nos réseaux sociaux et nos pubs. Partenaire.io a dépassé toutes nos attentes. Leur approche stratégique fait toute la différence.",
    name: "David K.",
    role: "Expert en finances",
    stars: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`glass-card-hover p-8 flex flex-col transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <StarRating count={testimonial.stars} />
      <blockquote className="mt-5 flex-1">
        <p className="text-dark-200 text-sm leading-relaxed italic">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </blockquote>
      <div className="mt-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold">
          {testimonial.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">
            {testimonial.name}
          </p>
          <p className="text-xs text-dark-500">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="temoignages" className="relative py-32">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent-500/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[128px]" />
      </div>

      <div className="relative max-w-7xl mx-auto section-padding">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest mb-4 block">
            Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Ce que nos clients{" "}
            <span className="gradient-text">disent de nous</span>
          </h2>
          <p className="text-dark-400 leading-relaxed">
            Ne nous croyez pas sur parole — écoutez ceux qui ont vécu la
            transformation.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
