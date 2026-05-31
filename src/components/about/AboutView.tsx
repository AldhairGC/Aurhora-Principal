"use client";

/**
 * AboutView — página "Quiénes Somos" rediseñada con el sistema Aurora.
 * Reutiliza el contenido trilingüe (namespace "aboutUs"), con +10 años alineado
 * al home y Seguros/Banca/Fintech como diferenciador. Reemplaza el monolito legacy.
 */

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Brain, UsersRound, Lightbulb, Shield, Cpu, Handshake, Quote } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { ContactModal } from "@/components/contact/ContactModal";
import { Section, Eyebrow, GradientText, Button } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, CountUp, MagneticButton } from "@/lib/motion";

const services = [
  { id: "godigital", title: "GoDigital Suite", link: "/servicios/godigital", available: true },
  { id: "transformacion-digital", title: "Transformación Digital", link: "/servicios/transformacion-digital", available: true },
  { id: "desarrollo-software", title: "Desarrollo de Software", link: "/servicios/desarrollo-software", available: true },
  { id: "optimizacion-procesos", title: "Optimización de Procesos", link: "/servicios/optimizacion-procesos", available: true },
  { id: "impulso-marketing", title: "Impulso y Marketing", link: "/servicios/impulso-marketing", available: true },
  { id: "cultura-agil", title: "Cultura Ágil", link: "/servicios/cultura-agil", available: true },
];

const darkGlow =
  "radial-gradient(60% 60% at 100% 0%, rgba(6,182,212,0.22), transparent 70%), radial-gradient(60% 60% at 0% 100%, rgba(124,58,237,0.25), transparent 70%)";

const strengths = [
  { Icon: Brain, t: "expertOrchestration", d: "expertOrchestrationDesc" },
  { Icon: UsersRound, t: "multidisciplinaryTeams", d: "multidisciplinaryTeamsDesc" },
  { Icon: Lightbulb, t: "tropicalizationInnovation", d: "tropicalizationInnovationDesc" },
] as const;

const insuranceKeys = ["medicalExpenses", "auto", "life", "property", "savings", "claims", "underwriting", "channels"] as const;
const fintechKeys = ["mobileBanking", "paymentGateways", "cardProcessing", "neoBanks", "coreBanking", "digitalLoans", "openBanking", "kyc"] as const;

export function AboutView() {
  const t = useTranslations("aboutUs");
  const [modal, setModal] = useState<{ open: boolean; source: string }>({ open: false, source: "" });
  const open = (source: string) => setModal({ open: true, source });
  const close = () => setModal((m) => ({ ...m, open: false }));

  return (
    <div id="main-content" className="min-h-screen bg-surface">
      <SiteHeader services={services} openContactModal={open} />

      {/* ───────────── HERO ───────────── */}
      <Section glow className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow className="mb-6">{t("badge")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-semibold" style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
              {t("heroTitle1")} <GradientText>{t("heroTitle2")}</GradientText>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-lg leading-relaxed text-secondaryText">{t("heroDescription")}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9">
              <MagneticButton>
                <Button variant="primary" size="lg" icon="arrow" onClick={() => open("quienes_somos_hero")}>
                  {t("scheduleStrategicSession")}
                </Button>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ───────────── ESENCIA ───────────── */}
      <Section className="py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow className="mb-6">{t("heartBadge")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
                {t("essenceTitle1")} <GradientText>{t("essenceTitle2")}</GradientText>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-lg leading-relaxed text-secondaryText">{t("essenceDescription1")}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 leading-relaxed text-secondaryText">{t("essenceDescription2")}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 border-l-2 border-aurora-indigo pl-5">
                <div className="font-mono text-3xl font-semibold">
                  <GradientText>
                    <CountUp value={10} prefix="+" />
                  </GradientText>
                </div>
                <div className="mt-1 text-sm text-secondaryText">{t("experienceSubtitle")}</div>
              </div>
            </Reveal>
          </div>

          <Reveal direction="left">
            <div className="relative overflow-hidden rounded-3xl bg-aurora-bg p-10 text-white md:p-12">
              <div className="pointer-events-none absolute inset-0" style={{ background: darkGlow }} />
              <div className="relative">
                <Quote className="h-10 w-10 text-aurora-cyan" />
                <blockquote className="mt-6 text-xl font-medium italic leading-relaxed text-zinc-100 md:text-2xl">
                  {t("essenceQuote")}
                </blockquote>
                <div className="mt-8 flex gap-2">
                  <span className="h-2 w-2 rounded-full bg-aurora-violet" />
                  <span className="h-2 w-2 rounded-full bg-aurora-indigo" />
                  <span className="h-2 w-2 rounded-full bg-aurora-cyan" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ───────────── ORQUESTACIÓN / FORTALEZAS (oscuro) ───────────── */}
      <Section tone="dark" className="py-20 md:py-28">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow tone="dark" className="mb-6">{t("orchestrationBadge")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{t("orchestrationTitle")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg leading-relaxed text-zinc-400">{t("orchestrationDescription")}</p>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-5 md:grid-cols-3" stagger={0.1}>
          {strengths.map(({ Icon, t: tKey, d }) => (
            <StaggerItem key={tKey} className="h-full">
              <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.06] text-aurora-cyan">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em]">{t(tKey)}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-zinc-400">{t(d)}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ───────────── SECTORES (diferenciador) ───────────── */}
      <Section className="py-20 md:py-28">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow className="mb-6">{t("sectoralStrengthBadge")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{t("sectorsHeading")}</h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Seguros */}
          <Reveal>
            <div className="h-full rounded-2xl border border-line bg-white p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-aurora-indigo/[0.08] text-aurora-indigo">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em] text-ink">{t("insuranceTitle")}</h3>
              <p className="mt-3 leading-relaxed text-secondaryText">{t("insuranceDescription1")}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {insuranceKeys.map((k) => (
                  <span key={k} className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-secondaryText">
                    {t(`insurance.${k}`)}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Fintech / Banca */}
          <Reveal delay={0.08}>
            <div className="h-full rounded-2xl border border-line bg-white p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-aurora-cyan/[0.1] text-aurora-cyan">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em] text-ink">{t("fintechTitle")}</h3>
              <p className="mt-3 leading-relaxed text-secondaryText">{t("fintechDescription1")}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {fintechKeys.map((k) => (
                  <span key={k} className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-secondaryText">
                    {t(`fintech.${k}`)}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ───────────── CO-CREACIÓN ───────────── */}
      <Section className="py-20 md:py-28">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-aurora-indigo/[0.08] text-aurora-indigo">
              <Handshake className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{t("cocreationTitle")}</h2>
            <p className="mx-auto mt-6 text-lg leading-relaxed text-secondaryText">
              {t("cocreationDescription1")} {t("cocreationDescription2")}
            </p>
          </div>
        </Reveal>
      </Section>

      <FinalCTA onContactClick={open} />
      <SiteFooter />

      <ContactModal open={modal.open} onClose={close} source={modal.source} />
    </div>
  );
}

export default AboutView;
