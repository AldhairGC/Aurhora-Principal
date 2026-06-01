"use client";

/**
 * GoDigitalView — página "GoDigital Suite" rediseñada (sistema Aurora).
 * Reutiliza el contenido i18n existente (namespace "godigital"). Conserva los
 * planes de precios con selección que abre el modal con el plan elegido.
 * Enfocada: Hero, Beneficios, Proceso, Planes, Add-ons, Para quién, FAQ, CTA.
 */

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ShieldCheck, Gauge, Rocket, Layers, Coins, LifeBuoy, Check, Users, Building, Globe, ChevronDown,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { ContactModal } from "@/components/contact/ContactModal";
import { Section, Eyebrow, GradientText, Button, Badge } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "@/lib/motion";
import { trackEvent } from "@/lib/analytics/track";

const services = [
  { id: "godigital", title: "GoDigital Suite", link: "/servicios/godigital", available: true },
  { id: "transformacion-digital", title: "Transformación Digital", link: "/servicios/transformacion-digital", available: true },
  { id: "desarrollo-software", title: "Desarrollo de Software", link: "/servicios/desarrollo-software", available: true },
  { id: "impulso-marketing", title: "Impulso y Marketing", link: "/servicios/impulso-marketing", available: true },
];

const heroChips = ["fastImplementation", "continuousSupport", "expertAdvice"] as const;

const benefits = [
  { Icon: ShieldCheck, k: "strengthening" },
  { Icon: Gauge, k: "efficiency" },
  { Icon: Rocket, k: "agile" },
  { Icon: Layers, k: "scalable" },
  { Icon: Coins, k: "costEffective" },
  { Icon: LifeBuoy, k: "support" },
] as const;

const processSteps = ["onboarding", "content", "technical", "review", "delivery"] as const;

const plans = [
  { id: "basic", popular: false, features: ["websiteInfo", "responsiveDesign", "contact", "social", "sslIncluded", "seoInitial", "hostingBasic", "pagesUpTo5"] },
  { id: "professional", popular: true, features: ["allBasic", "schedulingSystem", "availabilityConfig", "calendarSync", "emailConfirmations", "pagesUpTo10", "prioritySupport"] },
  { id: "360", popular: false, features: ["allProfessional", "miniCrm", "adminPanel", "contactDataFields", "interactionHistory", "documentManagement", "unlimitedPages", "monthlyConsulting"] },
] as const;

const addons = ["onlinePayments", "billing", "advancedReminders", "blog", "galleries", "multiLanguage"] as const;
const audiences = [
  { Icon: Users, k: "freelancers" },
  { Icon: Building, k: "smes" },
  { Icon: Globe, k: "variousSectors" },
] as const;
const faqs = ["item1", "item2", "item3", "item4", "item5"] as const;

export function GoDigitalView() {
  const t = useTranslations("godigital");
  const [modal, setModal] = useState<{ open: boolean; source: string; plan?: string }>({ open: false, source: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const open = (source: string, plan?: string) => {
    if (plan) trackEvent("plan_selected", { plan, source });
    setModal({ open: true, source, plan });
  };
  const close = () => setModal((m) => ({ ...m, open: false }));

  return (
    <div id="main-content" className="min-h-screen bg-surface">
      <SiteHeader services={services} openContactModal={(s) => open(s)} />

      {/* ───────────── HERO ───────────── */}
      <Section glow className="pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal><div className="flex justify-center"><Eyebrow className="mb-6">{t("ourStarSuite")}</Eyebrow></div></Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-semibold" style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
              <GradientText>{t("title")}</GradientText>
            </h1>
          </Reveal>
          <Reveal delay={0.1}><p className="mx-auto mt-5 text-xl font-medium text-ink">{t("subtitle")}</p></Reveal>
          <Reveal delay={0.14}><p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-secondaryText">{t("description")}</p></Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <MagneticButton>
                <Button variant="primary" size="lg" icon="arrow" onClick={() => open("godigital_hero_demo")}>{t("scheduleFreeDemo")}</Button>
              </MagneticButton>
              <Button variant="secondary" size="lg" icon="arrow-up" href="#planes">{t("discoverPlans")}</Button>
            </div>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {heroChips.map((c) => (
                <span key={c} className="inline-flex items-center gap-2 text-sm text-secondaryText">
                  <Check className="h-4 w-4 text-aurora-indigo" /> {t(c)}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ───────────── BENEFICIOS (oscuro) ───────────── */}
      <Section tone="dark" className="py-20 md:py-28">
        <div className="max-w-3xl">
          <Reveal><Eyebrow tone="dark" className="mb-6">{t("ourStarSuite")}</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{t("strategicBenefitsTitle")}</h2></Reveal>
          <Reveal delay={0.1}><p className="mt-5 text-lg leading-relaxed text-zinc-400">{t("strategicBenefitsSubtitle")}</p></Reveal>
        </div>
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {benefits.map(({ Icon, k }) => (
            <StaggerItem key={k} className="h-full">
              <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] text-aurora-cyan"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em]">{t(`benefits.${k}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{t(`benefits.${k}.description`)}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ───────────── PROCESO ───────────── */}
      <Section className="py-20 md:py-28">
        <div className="max-w-3xl">
          <Reveal><Eyebrow className="mb-6">{t("processTitle")}</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{t("processTitle")}</h2></Reveal>
          <Reveal delay={0.1}><p className="mt-5 text-lg leading-relaxed text-secondaryText">{t("processSubtitle")}</p></Reveal>
        </div>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5" stagger={0.08}>
          {processSteps.map((s) => (
            <StaggerItem key={s} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-white p-6">
                <h3 className="text-base font-semibold tracking-[-0.01em] text-ink">{t(`processSteps.${s}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondaryText">{t(`processSteps.${s}.description`)}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ───────────── PLANES ───────────── */}
      <Section id="planes" className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal><div className="flex justify-center"><Eyebrow className="mb-6">{t("plansTitle")}</Eyebrow></div></Reveal>
          <Reveal delay={0.05}><h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{t("plansTitle")}</h2></Reveal>
          <Reveal delay={0.1}><p className="mx-auto mt-5 text-lg leading-relaxed text-secondaryText">{t("plansSubtitle")}</p></Reveal>
        </div>
        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <Reveal key={plan.id}>
              <div
                className={`flex h-full flex-col rounded-3xl p-8 ${
                  plan.popular
                    ? "relative bg-aurora-bg text-white shadow-[0_24px_60px_-20px_rgba(79,70,229,0.5)]"
                    : "border border-line bg-white"
                }`}
              >
                {plan.popular && (
                  <div className="pointer-events-none absolute inset-0 rounded-3xl" style={{ background: "radial-gradient(60% 50% at 50% 0%, rgba(124,58,237,0.22), transparent 70%)" }} />
                )}
                <div className="relative flex flex-1 flex-col">
                  {plan.popular && (
                    <div className="mb-4"><Badge>{t("popular")}</Badge></div>
                  )}
                  <h3 className={`text-2xl font-semibold tracking-[-0.01em] ${plan.popular ? "text-white" : "text-ink"}`}>{t(`plans.${plan.id}.title`)}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${plan.popular ? "text-zinc-300" : "text-secondaryText"}`}>{t(`plans.${plan.id}.description`)}</p>

                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className={`mt-0.5 h-4 w-4 flex-shrink-0 ${plan.popular ? "text-aurora-cyan" : "text-aurora-indigo"}`} />
                        <span className={`text-sm ${plan.popular ? "text-zinc-200" : "text-ink"}`}>{t(`plans.${plan.id}.feature.${f}`)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    {plan.popular ? (
                      <button
                        onClick={() => open("godigital_plan", t(`plans.${plan.id}.title`))}
                        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-aurora px-6 py-3.5 font-medium text-white transition-all hover:brightness-110"
                      >
                        {t("chooseThisPlan")}
                      </button>
                    ) : (
                      <Button variant="secondary" size="lg" className="w-full" onClick={() => open("godigital_plan", t(`plans.${plan.id}.title`))}>
                        {t("chooseThisPlan")}
                      </Button>
                    )}
                    <p className={`mt-3 text-center text-xs ${plan.popular ? "text-zinc-400" : "text-secondaryText"}`}>{t("taxesNotIncluded")}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ───────────── ADD-ONS (oscuro) ───────────── */}
      <Section tone="dark" className="py-20 md:py-28">
        <div className="max-w-3xl">
          <Reveal><Eyebrow tone="dark" className="mb-6">{t("addonsTitle")}</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{t("addonsTitle")}</h2></Reveal>
          <Reveal delay={0.1}><p className="mt-5 text-lg leading-relaxed text-zinc-400">{t("addonsSubtitle")}</p></Reveal>
        </div>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {addons.map((a) => (
            <StaggerItem key={a} className="h-full">
              <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold tracking-[-0.01em]">{t(`addonsList.${a}.name`)}</h3>
                  <span className="flex-shrink-0 font-mono text-sm text-aurora-cyan">{t(`addonsList.${a}.price`)}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{t(`addonsList.${a}.description`)}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ───────────── PARA QUIÉN ───────────── */}
      <Section className="py-20 md:py-28">
        <div className="max-w-3xl">
          <Reveal><Eyebrow className="mb-6">{t("targetTitle")}</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{t("targetTitle")}</h2></Reveal>
          <Reveal delay={0.1}><p className="mt-5 text-lg leading-relaxed text-secondaryText">{t("targetSubtitle")}</p></Reveal>
        </div>
        <Stagger className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.1}>
          {audiences.map(({ Icon, k }) => (
            <StaggerItem key={k} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-white p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-aurora-indigo/[0.08] text-aurora-indigo"><Icon className="h-6 w-6" /></div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em] text-ink">{t(`target.${k}.name`)}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-secondaryText">{t(`target.${k}.description`)}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ───────────── FAQ ───────────── */}
      <Section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal><Eyebrow className="mb-6">{t("faqTitle")}</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{t("faqTitle")}</h2></Reveal>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={f}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left" aria-expanded={isOpen}>
                    <span className="text-lg font-medium text-ink">{t(`faqList.${f}.q`)}</span>
                    <ChevronDown className={`h-5 w-5 flex-shrink-0 text-secondaryText transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden"><p className="leading-relaxed text-secondaryText">{t(`faqList.${f}.a`)}</p></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <FinalCTA onContactClick={(s) => open(s)} />
      <SiteFooter />

      <ContactModal open={modal.open} onClose={close} source={modal.source} selectedPlan={modal.plan} />
    </div>
  );
}

export default GoDigitalView;
