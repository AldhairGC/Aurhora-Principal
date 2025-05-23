"use client";

import React from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const CTA = () => {
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  return (
    <section
      id="contacto"
      className="py-20 md:py-28 bg-gray-900 text-white overflow-hidden relative"
    >
      {/* Gradientes de fondo animados */}
      <div className="absolute -top-60 -left-60 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-teal-400 via-fuchsia-500 to-lime-400 opacity-15 blur-3xl pointer-events-none animate-pulse"></div>
      <div
        className="absolute -bottom-60 -right-60 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-teal-400 via-fuchsia-500 to-lime-400 opacity-15 blur-3xl pointer-events-none animate-pulse"
        style={{ animationDelay: "500ms" }}
      ></div>

      <div
        ref={ctaRef}
        className={`container mx-auto px-6 text-center relative z-10 transition-all duration-700 ${
          ctaVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
          ¿Listo para{" "}
          <span className="bg-gradient-to-r from-teal-400 via-fuchsia-500 to-lime-400 bg-clip-text text-transparent">
            Impulsar
          </span>{" "}
          tu Visión?
        </h2>

        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-300">
          Conversemos sobre tus desafíos y exploremos cómo Aurhora Agency puede
          ser el socio estratégico que acelere tus resultados.
        </p>

        <a
          href="#"
          className="inline-block bg-teal-400 text-gray-900 font-semibold py-4 px-12 rounded-full text-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-teal-300"
        >
          Agenda tu Sesión Estratégica
        </a>

        <p className="mt-8 text-sm text-gray-400">
          O contáctanos directamente:{" "}
          <a
            href="mailto:contacto@aurhora.agency"
            className="underline hover:text-white transition duration-300"
          >
            contacto@aurhora.agency
          </a>
        </p>
      </div>
    </section>
  );
};

export default CTA;
