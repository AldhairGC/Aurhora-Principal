"use client";

/**
 * SoftwareView — página "Desarrollo de Software" rediseñada (sistema Aurora).
 * Conserva el CodeEditor animado en el Hero. Contenido i18n (namespace
 * "softwareDev"). Enfocada: Hero, Enfoque, Stack, Proceso, Proyectos, FAQ, CTA.
 */

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Bot, Zap, Users, Layers, Monitor, Server, Cloud, Database, Smartphone,
  Globe, Share2, ChevronDown,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { ContactModal } from "@/components/contact/ContactModal";
import { CodeEditor } from "@/components/software/CodeEditor";
import { Section, Eyebrow, GradientText, Button } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "@/lib/motion";

const services = [
  { id: "godigital", title: "GoDigital Suite", link: "/servicios/godigital", available: true },
  { id: "transformacion-digital", title: "Transformación Digital", link: "/servicios/transformacion-digital", available: true },
  { id: "desarrollo-software", title: "Desarrollo de Software", link: "/servicios/desarrollo-software", available: true },
  { id: "impulso-marketing", title: "Impulso y Marketing", link: "/servicios/impulso-marketing", available: true },
];

const benefits = [
  { Icon: Bot, t: "benefit1Title", d: "benefit1Desc" },
  { Icon: Zap, t: "benefit2Title", d: "benefit2Desc" },
  { Icon: Users, t: "benefit3Title", d: "benefit3Desc" },
  { Icon: Layers, t: "benefit4Title", d: "benefit4Desc" },
] as const;

const stack = [
  { Icon: Monitor, t: "stackFrontend", techs: ["React", "Next.js", "Vue", "React Native", "Flutter"] },
  { Icon: Server, t: "stackBackend", techs: ["Node.js", "Python", "Java", ".NET", "Go"] },
  { Icon: Cloud, t: "stackCloud", techs: ["AWS", "Azure", "GCP", "Docker", "Kubernetes"] },
  { Icon: Database, t: "stackData", techs: ["PostgreSQL", "MongoDB", "Redis", "DynamoDB", "Elasticsearch"] },
  { Icon: Bot, t: "stackAI", techs: ["OpenAI", "Anthropic", "Google AI", "TensorFlow", "Custom ML"] },
  { Icon: Smartphone, t: "stackMobile", techs: ["iOS", "Android", "React Native", "Flutter", "PWA"] },
] as const;

const processSteps = ["process1", "process2", "process3", "process4", "process5"] as const;

const projects = [
  { Icon: Globe, t: "project1Title", d: "project1Desc" },
  { Icon: Smartphone, t: "project2Title", d: "project2Desc" },
  { Icon: Bot, t: "project3Title", d: "project3Desc" },
  { Icon: Share2, t: "project4Title", d: "project4Desc" },
] as const;

const faqs = ["faq1", "faq2", "faq3", "faq4"] as const;

export function SoftwareView() {
  const t = useTranslations("softwareDev");
  const [modal, setModal] = useState<{ open: boolean; source: string }>({ open: false, source: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const open = (source: string) => setModal({ open: true, source });
  const close = () => setModal((m) => ({ ...m, open: false }));

  return (
    <div id="main-content" className="min-h-screen bg-surface">
      <SiteHeader services={services} openContactModal={open} />

      {/* ───────────── HERO ───────────── */}
      <Section glow className="pt-32 pb-20 md:pt-36 md:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
          <div>
            <Reveal>
              <Eyebrow className="mb-6">{t("eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-semibold" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
                {t("titleLead")} <GradientText>{t("titleHighlight")}</GradientText> {t("titleTail")}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 text-lg leading-relaxed text-secondaryText">{t("subtitle")}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <MagneticButton>
                  <Button variant="primary" size="lg" icon="arrow" onClick={() => open("desarrollo_software_hero")}>
                    {t("ctaPrimary")}
                  </Button>
                </MagneticButton>
                <Button variant="secondary" size="lg" icon="arrow-up" href="#stack">{t("ctaSecondary")}</Button>
              </div>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.1}>
            <CodeEditor />
          </Reveal>
        </div>
      </Section>

      {/* ───────────── ENFOQUE (oscuro) ───────────── */}
      <Section tone="dark" className="py-20 md:py-28">
        <div className="max-w-3xl">
          <Reveal><Eyebrow tone="dark" className="mb-6">{t("approachEyebrow")}</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{t("approachTitle")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg leading-relaxed text-zinc-400">{t("approachDescription")}</p>
          </Reveal>
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

      {/* ───────────── STACK ───────────── */}
      <Section id="stack" className="py-20 md:py-28">
        <div className="max-w-3xl">
          <Reveal><Eyebrow className="mb-6">{t("stackEyebrow")}</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{t("stackTitle")}</h2></Reveal>
          <Reveal delay={0.1}><p className="mt-5 text-lg leading-relaxed text-secondaryText">{t("stackDescription")}</p></Reveal>
        </div>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {stack.map(({ Icon, t: tk, techs }) => (
            <StaggerItem key={tk} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-white p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-aurora-indigo/[0.08] text-aurora-indigo"><Icon className="h-5 w-5" /></div>
                  <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">{t(tk)}</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {techs.map((tech) => (
                    <span key={tech} className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-secondaryText">{tech}</span>
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
          <Reveal delay={0.1}><p className="mt-5 text-lg leading-relaxed text-secondaryText">{t("processDescription")}</p></Reveal>
        </div>
        <Stagger className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5" stagger={0.08}>
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

      {/* ───────────── PROYECTOS (oscuro) ───────────── */}
      <Section tone="dark" className="py-20 md:py-28">
        <div className="max-w-3xl">
          <Reveal><Eyebrow tone="dark" className="mb-6">{t("projectsEyebrow")}</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{t("projectsTitle")}</h2></Reveal>
          <Reveal delay={0.1}><p className="mt-5 text-lg leading-relaxed text-zinc-400">{t("projectsDescription")}</p></Reveal>
        </div>
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {projects.map(({ Icon, t: tk, d }) => (
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
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg font-medium text-ink">{t(`${f}Q`)}</span>
                    <ChevronDown className={`h-5 w-5 flex-shrink-0 text-secondaryText transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="leading-relaxed text-secondaryText">{t(`${f}A`)}</p>
                    </div>
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

export default SoftwareView;
