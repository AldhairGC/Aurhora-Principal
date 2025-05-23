"use client";

import React from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const Philosophy = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();

  const philosophyItems = [
    {
      title: "Gestión Integral",
      description:
        "Conectamos y gestionamos el talento y las herramientas precisas (internas/externas) para cada desafío, asegurando una ejecución sinérgica y eficiente.",
      icon: (
        <svg
          className="w-8 h-8 text-teal-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10h6c2 1 2.343 2.657 2.343 2.657m0 0l2.343 2.343m-2.343-2.343a8 8 0 01-6.657-6.657m0 0l-2.343-2.343m2.343 2.343a8 8 0 016.657 6.657m0 0l2.343 2.343"
          />
        </svg>
      ),
      gradientFrom: "from-teal-900",
      gradientVia: "via-teal-800",
      gradientTo: "to-blue-900",
      borderColor: "border-teal-700/50",
    },
    {
      title: "Co-creación Inteligente",
      description:
        "Trabajamos contigo. Fusionamos tu conocimiento del negocio con nuestra experiencia en metodologías de innovación y transformación.",
      icon: (
        <svg
          className="w-8 h-8 text-fuchsia-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      gradientFrom: "from-fuchsia-900",
      gradientVia: "via-teal-800",
      gradientTo: "to-lime-900",
      borderColor: "border-fuchsia-700/50",
    },
    {
      title: "Orientación a Soluciones",
      description:
        "Nos enfocamos en encontrar las vías más efectivas y pragmáticas para alcanzar tus metas, superando desafíos con un enfoque resolutivo.",
      icon: (
        <svg
          className="w-8 h-8 text-lime-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.975-2.888a1 1 0 00-1.176 0l-3.975 2.888c-.784.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.049 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ),
      gradientFrom: "from-lime-900",
      gradientVia: "via-lime-800",
      gradientTo: "to-teal-900",
      borderColor: "border-lime-700/50",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-800 relative overflow-hidden">
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-gradient-to-br from-teal-600 to-blue-600 rounded-full opacity-10 transform -translate-y-1/2 blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={sectionRef}
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
            sectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
            Nuestra Filosofía: Integración Estratégica para la Innovación
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            No solo resolvemos problemas, co-creamos futuro. Integramos
            estrategia, talento y tecnología para impulsar una transformación
            digital real y resultados medibles.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-start">
          {philosophyItems.map((item, index) => (
            <div
              key={index}
              className={`p-6 text-center transition-all duration-700 ${
                sectionVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 p-3 rounded-full bg-gradient-to-br ${item.gradientFrom} ${item.gradientVia} ${item.gradientTo} mb-5 shadow-sm border ${item.borderColor} transform hover:scale-110 transition-transform duration-300`}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-400 text-base">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
