"use client";

/**
 * Process — los 5 pasos de transformación, con numeración mono en gradiente.
 * Copy real desde i18n (namespace "process").
 */

import React from "react";
import { useTranslations } from "next-intl";
import { Section, Eyebrow, GradientText } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/lib/motion";

const steps = ["step1", "step2", "step3", "step4", "step5"] as const;

export function Process() {
  const t = useTranslations("process");

  return (
    <Section className="py-24 md:py-32">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow className="mb-6">Proceso</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-4xl font-semibold tracking-[-0.02em] md:text-5xl">{t("title")}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg leading-relaxed text-secondaryText">{t("description")}</p>
        </Reveal>
      </div>

      <Stagger className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5" stagger={0.08}>
        {steps.map((s, i) => (
          <StaggerItem key={s}>
            <div className="border-t border-line pt-5">
              <div className="font-mono text-2xl font-medium">
                <GradientText>{String(i + 1).padStart(2, "0")}</GradientText>
              </div>
              <h3 className="mt-3 text-lg font-semibold tracking-[-0.01em] text-ink">{t(`${s}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-secondaryText">{t(`${s}.description`)}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

export default Process;
