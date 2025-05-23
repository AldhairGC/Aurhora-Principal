"use client";

import React from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const AboutUs = () => {
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation();
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation();

  return (
    <section
      id="nosotros"
      className="py-16 md:py-24 bg-gray-900 relative overflow-hidden"
    >
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-gradient-to-br from-blue-600 to-fuchsia-600 rounded-full opacity-10 transform -translate-y-1/2 blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            ref={leftRef}
            className={`transition-all duration-700 ${
              leftVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="inline-block bg-gradient-to-r from-teal-900 via-teal-800 to-blue-900 border border-teal-700/50 text-teal-400 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Nuestra Experiencia
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-6">
              Transformando Negocios, Sin Límites Sectoriales
            </h2>

            <p className="text-lg text-gray-400 mb-4">
              Nuestra{" "}
              <strong className="text-gray-200">
                metodología de gestión integral y enfoque en soluciones
              </strong>{" "}
              es inherentemente adaptable, permitiéndonos generar valor
              significativo en{" "}
              <strong className="text-gray-200">
                prácticamente cualquier industria
              </strong>
              . Complementamos nuestro núcleo experto con una{" "}
              <strong className="text-gray-200">
                amplia red de especialistas sectoriales
              </strong>{" "}
              para asegurar el conocimiento profundo requerido en cada proyecto.
            </p>

            <p className="text-lg text-gray-400 mb-6">
              Contamos con una trayectoria destacada y casos de éxito
              comprobables en <strong className="text-teal-400">Seguros</strong>
              , <strong className="text-blue-600">Banca</strong> y{" "}
              <strong className="text-fuchsia-500">Fintech</strong>. Colaboramos
              estrechamente tanto con{" "}
              <strong className="text-gray-200">
                Pymes, Startups y empresas en crecimiento
              </strong>{" "}
              como con{" "}
              <strong className="text-gray-200">grandes corporativos</strong>,
              adaptando nuestro enfoque para maximizar el potencial único de
              cada organización.
            </p>

            <div className="mt-8 pt-6 border-t border-gray-700">
              <h4 className="text-base font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Principios Clave:
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-100">
                  <svg
                    className="w-5 h-5 mr-3 text-lime-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Co-creación y Colaboración Genuina
                </li>
                <li className="flex items-center text-gray-100">
                  <svg
                    className="w-5 h-5 mr-3 text-lime-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Resultados Pragmáticos y Medibles
                </li>
                <li className="flex items-center text-gray-100">
                  <svg
                    className="w-5 h-5 mr-3 text-lime-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Enfoque Resolutivo y Orientado a Soluciones
                </li>
              </ul>
            </div>
          </div>

          <div
            ref={rightRef}
            className={`p-8 py-12 rounded-xl text-center flex flex-col justify-center items-center transition-all duration-700 ${
              rightVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h3 className="text-xl font-semibold text-gray-100 mb-4">
              Confianza y Resultados (Próximamente)
            </h3>
            <p className="text-gray-400 mb-8">
              Construimos relaciones estratégicas duraderas. Pronto
              compartiremos casos de éxito.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 opacity-80 hover:opacity-100 transition-opacity duration-300">
              <div className="h-12 flex items-center justify-center bg-white/90 rounded-md shadow-sm px-4 py-2">
                <span className="text-gray-500 text-xs font-medium">
                  CLIENT LOGO 1
                </span>
              </div>
              <div className="h-12 flex items-center justify-center bg-white/90 rounded-md shadow-sm px-4 py-2">
                <span className="text-gray-500 text-xs font-medium">
                  CLIENT LOGO 2
                </span>
              </div>
              <div className="h-12 flex items-center justify-center bg-white/90 rounded-md shadow-sm px-4 py-2">
                <span className="text-gray-500 text-xs font-medium">
                  CLIENT LOGO 3
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
