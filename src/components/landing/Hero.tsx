"use client";

/**
 * Hero — sección principal del home (rediseño Aurora).
 * Base clara con glow boreal + retícula sutil. Reemplaza el hero "Impulsando
 * la Innovación" y retira el doble canvas. Copy placeholder (se afina luego).
 */

import React from "react";
import { Section, Eyebrow, Button, GradientText } from "@/components/ui";
import { Reveal, CountUp, MagneticButton } from "@/lib/motion";

const mono = "var(--font-geist-mono), ui-monospace, monospace";

type HeroProps = {
  onContactClick?: (source: string) => void;
};

export function Hero({ onContactClick }: HeroProps) {
  return (
    <Section glow id="hero" className="pt-32 pb-24 md:pt-40 md:pb-32">
      {/* retícula sutil que se desvanece hacia abajo */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(#E4E4E7 1px, transparent 1px), linear-gradient(90deg, #E4E4E7 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(80% 60% at 50% 0%, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(80% 60% at 50% 0%, black, transparent 80%)",
        }}
      />

      <div className="relative">
        <Reveal>
          <Eyebrow className="mb-6">
            Transformación digital · Seguros · Banca · Fintech
          </Eyebrow>
        </Reveal>

        <Reveal delay={0.05}>
          <h1
            className="font-semibold"
            style={{
              fontSize: "clamp(2.75rem, 6.5vw, 5.25rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              maxWidth: "16ch",
            }}
          >
            Ingeniería y estrategia para <GradientText>transformar</GradientText> tu negocio.
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p
            className="mt-7 text-secondaryText"
            style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)", lineHeight: 1.6, maxWidth: "54ch" }}
          >
            Diseñamos, construimos y escalamos productos digitales con un equipo que ha liderado
            la vanguardia tecnológica por más de 10 años. Visión, ejecución y resultados medibles.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton>
              <Button
                variant="primary"
                size="lg"
                icon="arrow"
                onClick={() => onContactClick?.("hero_agenda_sesion")}
              >
                Agenda una sesión estratégica
              </Button>
            </MagneticButton>
            <Button variant="secondary" size="lg" icon="arrow-up" href="#servicios">
              Ver servicios
            </Button>
          </div>
        </Reveal>

        {/* métricas con count-up */}
        <div className="mt-16 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-8">
          {[
            { node: <CountUp value={10} prefix="+" />, v: "años de experiencia" },
            { node: <CountUp value={3} />, v: "sectores: seguros · banca · fintech" },
            { node: <>1–2 sem</>, v: "implementación express" },
          ].map((m, i) => (
            <div key={i}>
              <div style={{ fontFamily: mono, fontSize: "1.75rem", fontWeight: 500, letterSpacing: "-0.02em" }}>
                {m.node}
              </div>
              <div className="mt-1 text-sm text-secondaryText">{m.v}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Hero;
