"use client";

/**
 * AISection — diferenciador "IA en nuestro ADN" (agencia nativa de IA).
 * Sección oscura reutilizable en el home y en Quiénes Somos.
 * Contenido i18n bajo el namespace "ai".
 */

import React from "react";
import { useTranslations } from "next-intl";
import { BrainCircuit, Zap, Rocket, Coins } from "lucide-react";
import { Section, Eyebrow, GradientText } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/lib/motion";

const points = [
  { Icon: BrainCircuit, t: "point1Title", d: "point1Desc" },
  { Icon: Zap, t: "point2Title", d: "point2Desc" },
  { Icon: Rocket, t: "point3Title", d: "point3Desc" },
  { Icon: Coins, t: "point4Title", d: "point4Desc" },
] as const;

export function AISection() {
  const t = useTranslations("ai");

  return (
    <Section tone="dark" className="py-20 md:py-28">
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow tone="dark" className="mb-6">{t("eyebrow")}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-semibold" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            {t("titleLead")} <GradientText>{t("titleHighlight")}</GradientText> {t("titleTail")}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg leading-relaxed text-zinc-400">{t("description")}</p>
        </Reveal>
      </div>

      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
        {points.map(({ Icon, t: tKey, d }) => (
          <StaggerItem key={tKey} className="h-full">
            <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] text-aurora-cyan">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em]">{t(tKey)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{t(d)}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

export default AISection;
