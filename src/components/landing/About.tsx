"use client";

/**
 * About — experiencia y principios en dos columnas + card destacada "+10 años".
 * Sin métricas falsas (removidas previamente). Copy real desde i18n ("about").
 */

import React from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Section, Eyebrow, GradientText, Button } from "@/components/ui";
import { Reveal, CountUp, MagneticButton } from "@/lib/motion";

type AboutProps = {
  onContactClick?: (source: string) => void;
};

export function About({ onContactClick }: AboutProps) {
  const t = useTranslations("about");
  const tCta = useTranslations("cta");
  const principles = [t("principle1"), t("principle2"), t("principle3")];

  return (
    <Section className="py-24 md:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Texto */}
        <div>
          <Reveal>
            <Eyebrow className="mb-6">{t("experience")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
              {t("title1")} <GradientText>{t("title2")}</GradientText>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg leading-relaxed text-secondaryText">{t("description1")}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 leading-relaxed text-secondaryText">{t("description2")}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-7 space-y-3">
              {principles.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-aurora-indigo/[0.1] text-aurora-indigo">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-ink">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Card destacada */}
        <Reveal direction="left">
          <div className="relative overflow-hidden rounded-3xl bg-aurora-bg p-10 text-white">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 60% at 100% 0%, rgba(6,182,212,0.22), transparent 70%), radial-gradient(60% 60% at 0% 100%, rgba(124,58,237,0.25), transparent 70%)",
              }}
            />
            <div className="relative">
              <div className="text-7xl font-semibold tracking-[-0.02em]">
                <GradientText>
                  <CountUp value={10} suffix="+" />
                </GradientText>
              </div>
              <p className="mt-3 text-lg text-zinc-300">{t("yearsExperience")}</p>
              <p className="mt-8 border-t border-white/10 pt-6 leading-relaxed text-zinc-400">
                {t("trustDescription")}
              </p>
              <div className="mt-8">
                <MagneticButton>
                  <Button
                    variant="primary"
                    size="md"
                    icon="arrow"
                    onClick={() => onContactClick?.("about_agenda_sesion")}
                  >
                    {tCta("scheduleSession")}
                  </Button>
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export default About;
