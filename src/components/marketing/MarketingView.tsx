"use client";

/**
 * MarketingView — página "Impulso y Marketing Digital" rediseñada (sistema Aurora),
 * con fuerte énfasis en resultados: MarketingDashboard animado en el Hero +
 * sección de Resultados con métricas grandes. Contenido i18n (namespace "marketing").
 */

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Database, Target, TrendingUp, Users, Rocket, Megaphone, PenTool, BarChart3, ChevronDown,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { ContactModal } from "@/components/contact/ContactModal";
import { MarketingDashboard } from "@/components/marketing/MarketingDashboard";
import { Section, Eyebrow, GradientText, Button } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "@/lib/motion";

const services = [
  { id: "godigital", title: "GoDigital Suite", link: "/servicios/godigital", available: true },
  { id: "transformacion-digital", title: "Transformación Digital", link: "/servicios/transformacion-digital", available: true },
  { id: "desarrollo-software", title: "Desarrollo de Software", link: "/servicios/desarrollo-software", available: true },
  { id: "impulso-marketing", title: "Impulso y Marketing", link: "/servicios/impulso-marketing", available: true },
];

const metrics = [
  { v: "metric1Value", l: "metric1Label" },
  { v: "metric2Value", l: "metric2Label" },
  { v: "metric3Value", l: "metric3Label" },
  { v: "metric4Value", l: "metric4Label" },
] as const;
const benefits = [
  { Icon: Database, t: "benefit1Title", d: "benefit1Desc" },
  { Icon: Target, t: "benefit2Title", d: "benefit2Desc" },
  { Icon: TrendingUp, t: "benefit3Title", d: "benefit3Desc" },
  { Icon: Users, t: "benefit4Title", d: "benefit4Desc" },
] as const;
const categories = [
  { Icon: Rocket, t: "cat1Title", tags: ["cat1Tag1", "cat1Tag2", "cat1Tag3", "cat1Tag4"] },
  { Icon: Megaphone, t: "cat2Title", tags: ["cat2Tag1", "cat2Tag2", "cat2Tag3", "cat2Tag4"] },
  { Icon: PenTool, t: "cat3Title", tags: ["cat3Tag1", "cat3Tag2", "cat3Tag3", "cat3Tag4"] },
  { Icon: BarChart3, t: "cat4Title", tags: ["cat4Tag1", "cat4Tag2", "cat4Tag3", "cat4Tag4"] },
] as const;
const processSteps = ["process1", "process2", "process3", "process4"] as const;
const faqs = ["faq1", "faq2", "faq3", "faq4"] as const;

export function MarketingView() {
  const t = useTranslations("marketing");
  const [modal, setModal] = useState<{ open: boolean; source: string }>({ open: false, source: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const open = (source: string) => setModal({ open: true, source });
  const close = () => setModal((m) => ({ ...m, open: false }));

  return (
    <div id="main-content" className="min-h-screen bg-surface">
      <SiteHeader services={services} openContactModal={open} />

      {/* ───────────── HERO ───────────── */}
      <Section glow className="pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
          <div>
            <Reveal><Eyebrow className="mb-6">{t("eyebrow")}</Eyebrow></Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-semibold" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
                {t("titleLead")} <GradientText>{t("titleHighlight")}</GradientText>{t("titleTail")}
              </h1>
            </Reveal>
            <Reveal delay={0.12}><p className="mt-6 text-lg leading-relaxed text-secondaryText">{t("subtitle")}</p></Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <MagneticButton>
                  <Button variant="primary" size="lg" icon="arrow" onClick={() => open("impulso_marketing_hero")}>{t("ctaPrimary")}</Button>
                </MagneticButton>
                <Button variant="secondary" size="lg" icon="arrow-up" href="#servicios">{t("ctaSecondary")}</Button>
              </div>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.1}>
            <MarketingDashboard />
          </Reveal>
        </div>
      </Section>

      {/* ───────────── RESULTADOS (oscuro, énfasis) ───────────── */}
      <Section tone="dark" className="py-20 md:py-28">
        <div className="max-w-3xl">
          <Reveal><Eyebrow tone="dark" className="mb-6">{t("resultsEyebrow")}</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{t("resultsTitle")}</h2></Reveal>
          <Reveal delay={0.1}><p className="mt-5 text-lg leading-relaxed text-zinc-400">{t("resultsDescription")}</p></Reveal>
        </div>
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {metrics.map((m) => (
            <StaggerItem key={m.v} className="h-full">
              <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7">
                <div className="text-5xl font-semibold tracking-[-0.02em]"><GradientText>{t(m.v)}</GradientText></div>
                <div className="mt-3 text-sm text-zinc-400">{t(m.l)}</div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ───────────── ENFOQUE ───────────── */}
      <Section className="py-20 md:py-28">
        <div className="max-w-3xl">
          <Reveal><Eyebrow className="mb-6">{t("approachEyebrow")}</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{t("approachTitle")}</h2></Reveal>
          <Reveal delay={0.1}><p className="mt-5 text-lg leading-relaxed text-secondaryText">{t("approachDescription")}</p></Reveal>
        </div>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {benefits.map(({ Icon, t: tk, d }) => (
            <StaggerItem key={tk} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-white p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-aurora-indigo/[0.08] text-aurora-indigo"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em] text-ink">{t(tk)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondaryText">{t(d)}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ───────────── SERVICIOS (oscuro) ───────────── */}
      <Section id="servicios" tone="dark" className="py-20 md:py-28">
        <div className="max-w-3xl">
          <Reveal><Eyebrow tone="dark" className="mb-6">{t("servicesEyebrow")}</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{t("servicesTitle")}</h2></Reveal>
        </div>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2" stagger={0.08}>
          {categories.map(({ Icon, t: tk, tags }) => (
            <StaggerItem key={tk} className="h-full">
              <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] text-aurora-cyan"><Icon className="h-5 w-5" /></div>
                  <h3 className="text-xl font-semibold tracking-[-0.01em]">{t(tk)}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1 text-xs font-medium text-zinc-300">{t(tag)}</span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ───────────── PROCESO ───────────── */}
      <Section className="py-20 md:py-28">
        <div className="max-w-3xl">
          <Reveal><Eyebrow className="mb-6">{t("processEyebrow")}</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{t("processTitle")}</h2></Reveal>
        </div>
        <Stagger className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {processSteps.map((s, i) => (
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

export default MarketingView;
