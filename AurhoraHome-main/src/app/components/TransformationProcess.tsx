"use client";

import React from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const TransformationProcess = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();

  const steps = [
    {
      number: 1,
      title: "Diagnóstico y Oportunidad",
      description:
        "Inmersión profunda para entender contexto, retos y oportunidades de innovación.",
      bgGradient: "from-teal-900 to-blue-900",
      borderColor: "border-teal-700/50",
      textColor: "text-teal-400",
    },
    {
      number: 2,
      title: "Estrategia y Co-Diseño",
      description:
        "Co-creación de la visión, roadmap estratégico y diseño de soluciones transformadoras.",
      bgGradient: "from-blue-900 to-fuchsia-900",
      borderColor: "border-blue-700/50",
      textColor: "text-blue-400",
    },
    {
      number: 3,
      title: "Plan de Acción y Habilitación",
      description:
        "Entrega del plan detallado, preparación de equipos y habilitación tecnológica.",
      bgGradient: "from-fuchsia-900 to-lime-900",
      borderColor: "border-fuchsia-700/50",
      textColor: "text-fuchsia-500",
    },
    {
      number: 4,
      title: "Implementación y Desarrollo",
      description:
        '<strong class="text-gray-100">Lideramos la ejecución</strong>, construimos las soluciones tecnológicas y <strong class="text-gray-100">gestionamos el cambio</strong> organizacional desde adentro.',
      bgGradient: "from-lime-900 to-yellow-900",
      borderColor: "border-lime-700/50",
      textColor: "text-lime-400",
    },
    {
      number: 5,
      title: "Mejora y Evolución Continua",
      description:
        'Medición de resultados, <strong class="text-gray-100">iteración ágil</strong>, optimización constante y soporte para la sostenibilidad del cambio.',
      bgGradient: "from-yellow-900 to-teal-900",
      borderColor: "border-yellow-700/50",
      textColor: "text-yellow-400",
    },
  ];

  return (
    <section id="enfoque" className="py-16 md:py-24 bg-gray-800">
      <div className="container mx-auto px-6">
        <div
          ref={sectionRef}
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
            sectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
            Nuestro Proceso de Transformación
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Una metodología colaborativa en 5 fases, desde la visión hasta la
            evolución continua.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="relative px-4">
            {/* Línea conectora - solo visible en desktop */}
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-1 bg-gray-700/50 rounded-full z-0"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-8 relative z-10 items-start">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center text-center transition-all duration-700 ${
                    sectionVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                >
                  <div
                    className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${step.bgGradient} border-2 ${step.borderColor} text-2xl font-bold ${step.textColor} flex items-center justify-center mb-4 shadow-lg z-10 relative`}
                  >
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-1 mt-2">
                    {step.title}
                  </h3>
                  <p
                    className="text-gray-400 text-sm"
                    dangerouslySetInnerHTML={{ __html: step.description }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformationProcess;
