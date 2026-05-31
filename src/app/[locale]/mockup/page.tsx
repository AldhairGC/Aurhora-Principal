"use client";

/**
 * DESIGN DIRECTION v1 — "Aurora controlada" (APROBADA 2026-05-30)
 * Mockup / style tile. Ahora construido sobre las primitivas del sistema
 * (components/ui) y la motion library (lib/motion) — valida la Fase 0.
 * Ruta: /es/mockup · Se elimina tras el rebuild.
 */

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button, Badge, Eyebrow, Section, Card, GradientText } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, CountUp, MagneticButton } from "@/lib/motion";
import { aurora } from "@/lib/design-system/aurora";

const mono = "var(--font-geist-mono), ui-monospace, monospace";

export default function MockupPage() {
  return (
    <main className="bg-surface text-ink font-sans">
      <div
        className="w-full bg-ink py-2 text-center font-mono text-[0.7rem] uppercase tracking-[0.1em] text-zinc-400"
      >
        Aurhora · Dirección de diseño v1 — “Aurora controlada” · Construido sobre el sistema
      </div>

      {/* ───────────── HERO (base clara) ───────────── */}
      <Section glow className="pt-24 pb-28 md:pt-32 md:pb-36">
        {/* retícula sutil */}
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
            <Eyebrow className="mb-6">Transformación digital · Seguros · Banca · Fintech</Eyebrow>
          </Reveal>

          <Reveal delay={0.05}>
            <h1
              className="font-semibold"
              style={{ fontSize: "clamp(2.75rem, 6.5vw, 5.25rem)", lineHeight: 1.04, letterSpacing: "-0.03em", maxWidth: "16ch" }}
            >
              Ingeniería y estrategia para <GradientText>transformar</GradientText> tu negocio.
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 text-secondaryText" style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)", lineHeight: 1.6, maxWidth: "54ch" }}>
              Diseñamos, construimos y escalamos productos digitales con un equipo que ha liderado
              la vanguardia tecnológica por más de 10 años. Visión, ejecución y resultados medibles.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton>
                <Button variant="primary" size="lg" icon="arrow">
                  Agenda una sesión estratégica
                </Button>
              </MagneticButton>
              <Button variant="secondary" size="lg" icon="arrow-up">
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

      {/* ───────────── SECCIÓN OSCURA ───────────── */}
      <Section tone="dark" className="py-28">
        <Reveal>
          <Eyebrow tone="dark" className="mb-6">Cómo trabajamos</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-semibold" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: "20ch" }}>
            Un solo socio, de la estrategia al <GradientText>código en producción</GradientText>.
          </h2>
        </Reveal>

        <Stagger className="mt-16 grid gap-5 md:grid-cols-3" stagger={0.1}>
          {[
            { n: "01", t: "Diagnóstico y estrategia", d: "Entendemos tu negocio a fondo y co-diseñamos la hoja de ruta tecnológica." },
            { n: "02", t: "Diseño y desarrollo", d: "Construimos producto a medida con ingeniería sólida y diseño de primer nivel." },
            { n: "03", t: "Escala y evolución", d: "Medimos, iteramos y optimizamos para crecimiento sostenido." },
          ].map((c) => (
            <StaggerItem key={c.n}>
              <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7">
                <div className="font-mono text-xs tracking-[0.1em]" style={{ color: aurora.accent.cyan }}>{c.n}</div>
                <div className="mt-4 text-xl font-semibold tracking-[-0.01em]">{c.t}</div>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-zinc-400">{c.d}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ───────────── STYLE TILE ───────────── */}
      <Section className="py-24">
        <Eyebrow className="mb-6">Sistema visual</Eyebrow>
        <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">Style tile</h2>

        {/* Color */}
        <h3 className="mt-12 font-mono text-xs uppercase tracking-[0.15em] text-secondaryText">Color</h3>
        <div className="mt-4 grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))" }}>
          {[
            { name: "ink", hex: aurora.neutral.ink },
            { name: "ink-soft", hex: aurora.neutral.inkSoft },
            { name: "secondary", hex: aurora.neutral.secondary },
            { name: "line", hex: aurora.neutral.line },
            { name: "surface", hex: aurora.neutral.surface },
            { name: "violet", hex: aurora.accent.violet },
            { name: "indigo", hex: aurora.accent.indigo },
            { name: "blue", hex: aurora.accent.blue },
            { name: "cyan", hex: aurora.accent.cyan },
          ].map((c) => (
            <div key={c.name}>
              <div className="h-16 w-full rounded-lg border border-line" style={{ background: c.hex }} />
              <div className="mt-1.5 font-mono text-[0.7rem]">{c.name}</div>
              <div className="font-mono text-[0.65rem] text-secondaryText">{c.hex}</div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="h-20 w-full rounded-xl bg-aurora" />
          <div className="mt-2 font-mono text-[0.7rem] text-secondaryText">
            gradiente firma · violeta → indigo → cyan (usar solo en momentos clave)
          </div>
        </div>

        {/* Tipografía */}
        <h3 className="mt-14 font-mono text-xs uppercase tracking-[0.15em] text-secondaryText">Tipografía</h3>
        <div className="mt-5 space-y-3 border-t border-line pt-6">
          <div className="text-5xl font-semibold tracking-[-0.03em]">Display · Geist Sans</div>
          <div className="text-3xl font-semibold tracking-[-0.02em]">Headline · semibold</div>
          <div className="max-w-[60ch] text-lg leading-relaxed text-secondaryText">
            Body · regular. El cuerpo de texto busca legibilidad y aire: medidas cortas, interlineado
            generoso y contraste alto sobre fondo claro.
          </div>
          <div className="font-mono text-sm tracking-[0.05em] text-ink-soft">
            MONO · GEIST MONO — eyebrows · labels · métricas · badges
          </div>
        </div>

        {/* Componentes */}
        <h3 className="mt-14 font-mono text-xs uppercase tracking-[0.15em] text-secondaryText">Componentes</h3>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Button variant="primary" size="md" icon="arrow">Primario</Button>
          <Button variant="secondary" size="md">Secundario</Button>
          <Button variant="ghost" size="md" icon="arrow-up">Ghost</Button>
          <Badge><Sparkles className="h-3 w-3" /> Badge</Badge>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Card>
            <div className="font-mono text-xs tracking-[0.1em] text-aurora-indigo">SERVICIO</div>
            <div className="mt-3 text-[1.35rem] font-semibold tracking-[-0.01em]">Desarrollo de software a medida</div>
            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-secondaryText">
              Productos digitales que escalan con tu negocio, con ingeniería de primer nivel.
            </p>
            <div className="mt-5 inline-flex items-center gap-1.5 font-medium text-aurora-indigo">
              Explorar <ArrowRight className="h-4 w-4" />
            </div>
          </Card>
          <Card tone="dark">
            <div className="font-mono text-xs tracking-[0.1em]" style={{ color: aurora.accent.cyan }}>CARD OSCURA</div>
            <div className="mt-3 text-[1.35rem] font-semibold">Acento aurora sobre fondo profundo</div>
            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-zinc-400">
              Las secciones oscuras dejan respirar el gradiente firma y elevan la sensación técnica.
            </p>
          </Card>
        </div>
      </Section>

      <div className="h-16 bg-surface" />
    </main>
  );
}
