"use client";

/**
 * TransformView — página "Transformación Digital" rediseñada (sistema Aurora),
 * con énfasis en IA e innovación. Contenido i18n (namespace "digitalTransform").
 * Enfocada: Hero, Enfoque, Metodología, Capacidades, Público, FAQ, CTA.
 */

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Sparkles, Rocket, Zap, BarChart3, BrainCircuit, Workflow, Users, Lightbulb,
  Shield, Building, Users2, ChevronDown,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { ContactModal } from "@/components/contact/ContactModal";
import { AgentFlow } from "@/components/transform/AgentFlow";
import { Section, Eyebrow, GradientText, Button } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "@/lib/motion";

const services = [
  { id: "godigital", title: "GoDigital Suite", link: "/servicios/godigital", available: true },
  { id: "transformacion-digital", title: "Transformación Digital", link: "/servicios/transformacion-digital", available: true },
  { id: "desarrollo-software", title: "Desarrollo de Software", link: "/servicios/desarrollo-software", available: true },
  { id: "optimizacion-procesos", title: "Optimización de Procesos", link: "/servicios/optimizacion-procesos", available: true },
  { id: "impulso-marketing", title: "Impulso y Marketing", link: "/servicios/impulso-marketing", available: true },
  { id: "cultura-agil", title: "Cultura Ágil", link: "/servicios/cultura-agil", available: true },
];

const benefits = [
  { Icon: Sparkles, t: "benefit1Title", d: "benefit1Desc" },
  { Icon: Rocket, t: "benefit2Title", d: "benefit2Desc" },
  { Icon: Zap, t: "benefit3Title", d: "benefit3Desc" },
  { Icon: BarChart3, t: "benefit4Title", d: "benefit4Desc" },
] as const;
const methodSteps = ["method1", "method2", "method3", "method4", "method5"] as const;
const capabilities = [
  { Icon: BrainCircuit, t: "capability1Title", d: "capability1Desc" },
  { Icon: Workflow, t: "capability2Title", d: "capability2Desc" },
  { Icon: Users, t: "capability3Title", d: "capability3Desc" },
  { Icon: Lightbulb, t: "capability4Title", d: "capability4Desc" },
  { Icon: Shield, t: "capability5Title", d: "capability5Desc" },
  { Icon: BarChart3, t: "capability6Title", d: "capability6Desc" },
] as const;
const audience = [
  { Icon: Building, t: "audience1Title", d: "audience1Desc" },
  { Icon: Rocket, t: "audience2Title", d: "audience2Desc" },
  { Icon: Users2, t: "audience3Title", d: "audience3Desc" },
] as const;
const faqs = ["faq1", "faq2", "faq3", "faq4"] as const;

export function TransformView() {
  const t = useTranslations("digitalTransform");
  const [modal, setModal] = useState<{ open: boolean; source: string }>({ open: false, source: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const open = (source: string) => setModal({ open: true, source });
  const close = () => setModal((m) => ({ ...m, open: false }));

  return (
    <div id="main-content" className="min-h-screen bg-surface">
      <SiteHeader services={services} openContactModal={open} />

      {/* ───────────── HERO ───────────── */}
      <Section glow className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal><Eyebrow className="mb-6">{t("eyebrow")}</Eyebrow></Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-semibold" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
                {t("titleLead")} <GradientText>{t("titleHighlight")}</GradientText> {t("titleTail")}
              </h1>
            </Reveal>
            <Reveal delay={0.12}><p className="mt-6 text-lg leading-relaxed text-secondaryText">{t("subtitle")}</p></Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <MagneticButton>
                  <Button variant="primary" size="lg" icon="arrow" onClick={() => open("transformacion_digital_hero")}>{t("ctaPrimary")}</Button>
                </MagneticButton>
                <Button variant="secondary" size="lg" icon="arrow-up" href="#metodologia">{t("ctaSecondary")}</Button>
              </div>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.1}>
            <AgentFlow />
          </Reveal>
        </div>
      </Section>

      {/* ───────────── ENFOQUE (oscuro) ───────────── */}
      <Section tone="dark" className="py-20 md:py-28">
        <div className="max-w-3xl">
          <Reveal><Eyebrow tone="dark" className="mb-6">{t("approachEyebrow")}</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{t("approachTitle")}</h2></Reveal>
          <Reveal delay={0.1}><p className="mt-5 text-lg leading-relaxed text-zinc-400">{t("approachDescription")}</p></Reveal>
        </div>
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {benefits.map(({ Icon, t: tk, d }) => (
            <StaggerItem key={tk} className="h-full">
              <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] text-aurora-cyan"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em]">{t(tk)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{t(d)}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ───────────── METODOLOGÍA ───────────── */}
      <Section id="metodologia" className="py-20 md:py-28">
        <div className="max-w-3xl">
          <Reveal><Eyebrow className="mb-6">{t("methodologyEyebrow")}</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{t("methodologyTitle")}</h2></Reveal>
          <Reveal delay={0.1}><p className="mt-5 text-lg leading-relaxed text-secondaryText">{t("methodologyDescription")}</p></Reveal>
        </div>
        <Stagger className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5" stagger={0.08}>
          {methodSteps.map((s, i) => (
            <StaggerItem key={s}>
              <div className="border-t border-line pt-5">
                <div className="font-mono text-2xl font-medium"><GradientText>{String(i + 1).padStart(2, "0")}</GradientText></div>
                <h3 className="mt-3 text-lg font-semibold tracking-[-0.01em] text-ink">{t(`${s}Title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondaryText">{t(`${s}Desc`)}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ───────────── CAPACIDADES (oscuro) ───────────── */}
      <Section tone="dark" className="py-20 md:py-28">
        <div className="max-w-3xl">
          <Reveal><Eyebrow tone="dark" className="mb-6">{t("capabilitiesEyebrow")}</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{t("capabilitiesTitle")}</h2></Reveal>
          <Reveal delay={0.1}><p className="mt-5 text-lg leading-relaxed text-zinc-400">{t("capabilitiesDescription")}</p></Reveal>
        </div>
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {capabilities.map(({ Icon, t: tk, d }) => (
            <StaggerItem key={tk} className="h-full">
              <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] text-aurora-cyan"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em]">{t(tk)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{t(d)}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ───────────── PÚBLICO ───────────── */}
      <Section className="py-20 md:py-28">
        <div className="max-w-3xl">
          <Reveal><Eyebrow className="mb-6">{t("audienceEyebrow")}</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{t("audienceTitle")}</h2></Reveal>
        </div>
        <Stagger className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.1}>
          {audience.map(({ Icon, t: tk, d }) => (
            <StaggerItem key={tk} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-white p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-aurora-indigo/[0.08] text-aurora-indigo"><Icon className="h-6 w-6" /></div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em] text-ink">{t(tk)}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-secondaryText">{t(d)}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ───────────── FAQ ───────────── */}
      <Section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal><Eyebrow className="mb-6">{t("faqEyebrow")}</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{t("faqTitle")}</h2></Reveal>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={f}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left" aria-expanded={isOpen}>
                    <span className="text-lg font-medium text-ink">{t(`${f}Q`)}</span>
                    <ChevronDown className={`h-5 w-5 flex-shrink-0 text-secondaryText transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden"><p className="leading-relaxed text-secondaryText">{t(`${f}A`)}</p></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <FinalCTA onContactClick={open} />
      <SiteFooter />

      <ContactModal open={modal.open} onClose={close} source={modal.source} />
    </div>
  );
}

export default TransformView;
