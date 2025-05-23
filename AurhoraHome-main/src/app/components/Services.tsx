"use client";

import React, { useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const Services = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      title: "Optimización de Procesos y Calidad",
      description:
        "Diseñamos e implementamos SGC (ej. ISO), optimizando tu operación para la excelencia y certificaciones.",
      link: "/servicios/optimizacion-procesos",
      linkText: "Descubrir Optimización",
      icon: (
        <svg
          className="w-full h-full text-emerald-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      bgColor: "bg-emerald-900/50",
      borderColor: "border-emerald-700/30",
      available: true,
    },
    {
      title: "Estrategia de Innovación y Transformación Digital",
      description:
        "Co-creamos tu roadmap tecnológico y digital, identificando oportunidades de innovación para acelerar resultados.",
      link: "/servicios/transformacion-digital",
      linkText: "Impulsar Innovación",
      icon: (
        <svg
          className="w-full h-full text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      bgColor: "bg-blue-900/50",
      borderColor: "border-blue-700/30",
      available: true,
    },
    {
      title: "Desarrollo de Software y Productos Digitales",
      description:
        'Diseñamos, <strong class="text-indigo-300">construimos y desplegamos</strong> software a medida y productos digitales innovadores que potencian tu estrategia.',
      icon: (
        <svg
          className="w-full h-full text-indigo-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      bgColor: "bg-indigo-900/50",
      borderColor: "border-indigo-700/30",
      available: false,
    },
    {
      title: "Impulso y Marketing Digital",
      description:
        'Definimos y <strong class="text-pink-300">gestionamos</strong> estrategias de marketing digital para lanzar y posicionar tus productos y servicios.',
      icon: (
        <svg
          className="w-full h-full text-pink-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.146-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3.418"
          />
        </svg>
      ),
      bgColor: "bg-pink-900/50",
      borderColor: "border-pink-700/30",
      available: false,
    },
    {
      title: "Cultura Ágil y Transformación Organizacional",
      description:
        '<strong class="text-fuchsia-300">Trabajamos desde adentro con tus equipos</strong> para implementar metodologías ágiles, gestionar el cambio y fomentar una cultura de innovación sostenible.',
      icon: (
        <svg
          className="w-full h-full text-fuchsia-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      bgColor: "bg-fuchsia-900/50",
      borderColor: "border-fuchsia-700/30",
      available: false,
    },
  ];

  return (
    <section
      id="servicios"
      className="py-16 md:py-24 bg-gray-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(#374151_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>
      <div className="absolute w-72 h-72 bg-gradient-to-br from-fuchsia-600 to-lime-600 -bottom-32 -left-32 blur-3xl opacity-10 pointer-events-none"></div>

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
            Nuestras Capacidades Estratégicas
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Desde la estrategia hasta la implementación y evolución, cubrimos el
            espectro de la transformación.
          </p>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scroll-smooth pb-8 px-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-8 rounded-xl bg-gray-800 border border-gray-700 hover:border-teal-400 hover:bg-gray-700 transform hover:-translate-y-2 transition-all duration-300 flex-shrink-0 w-[90%] sm:w-[45%] md:w-[30%] lg:w-[31%] xl:w-[24%] ${
                sectionVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-5">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 p-3 rounded-lg ${service.bgColor} border ${service.borderColor}`}
                >
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-3">
                {service.title}
              </h3>
              <p
                className="text-gray-400 mb-5 text-sm"
                dangerouslySetInnerHTML={{ __html: service.description }}
              />
              {service.available ? (
                <a
                  href={service.link}
                  className="font-semibold text-teal-400 hover:text-teal-300 group text-sm inline-flex items-center"
                >
                  {service.linkText}
                  <span className="inline-block ml-1 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              ) : (
                <span className="text-gray-500 font-semibold text-sm cursor-not-allowed">
                  Próximamente...
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
