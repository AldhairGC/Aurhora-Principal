"use client";

import React from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const Hero = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation();
  const { ref: buttonRef, isVisible: buttonVisible } = useScrollAnimation();
  const { ref: subTextRef, isVisible: subTextVisible } = useScrollAnimation();

  return (
    <section className="relative bg-gray-900 pt-28 pb-24 md:pt-36 md:pb-32 lg:pt-40 lg:pb-40 overflow-hidden">
      {/* Formas decorativas de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-72 h-72 bg-gradient-to-br from-teal-500 to-blue-500 -top-20 -left-20 animate-pulse opacity-15 blur-3xl rounded-full"></div>
        <div
          className="absolute w-96 h-96 bg-gradient-to-br from-fuchsia-500 to-lime-500 -bottom-20 -right-10 animate-pulse opacity-15 blur-3xl rounded-full"
          style={{ animationDelay: "300ms" }}
        ></div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1
          ref={titleRef}
          className={`text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-200 mb-6 leading-tight tracking-tighter transition-all duration-700 ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          Impulsando la{" "}
          <span className="bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent">
            Innovación
          </span>
          .
          <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-teal-400 via-fuchsia-500 to-lime-400 bg-clip-text text-transparent">
            Resultados que Transforman.
          </span>
        </h1>

        <p
          ref={textRef}
          className={`text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 transition-all duration-700 delay-200 ${
            textVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          Aurhora Agency: Tu socio estratégico en transformación digital y
          optimización de procesos. Integramos visión, tecnología y ejecución
          experta para maximizar tu potencial.
        </p>

        <div
          ref={buttonRef}
          className={`transition-all duration-700 delay-300 ${
            buttonVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="#contacto"
            className="inline-block bg-gradient-to-r from-teal-400 to-fuchsia-500 text-white font-semibold py-3 px-10 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
          >
            Inicia tu Transformación
          </a>
        </div>

        <p
          ref={subTextRef}
          className={`mt-8 text-sm text-gray-500 transition-all duration-700 delay-500 ${
            subTextVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          +10 años impulsando la innovación | Seguros | Banca | Fintech
        </p>
      </div>
    </section>
  );
};

export default Hero;
