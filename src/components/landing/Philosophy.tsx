"use client";

/**
 * Philosophy — los 3 pilares, en sección oscura de acento (ritmo claro/oscuro).
 * Copy real desde i18n (namespace "philosophy").
 */

import React from "react";
import { useTranslations } from "next-intl";
import { Target, Users, Award } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/lib/motion";

const items = [
  { key: "item1", Icon: Target },
  { key: "item2", Icon: Users },
  { key: "item3", Icon: Award },
] as const;

export function Philosophy() {
  const t = useTranslations("philosophy");

  return (
    <Section tone="dark" className="py-24 md:py-32">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow tone="dark" className="mb-6">Filosofía</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-4xl font-semibold tracking-[-0.02em] md:text-5xl">{t("title")}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg leading-relaxed text-zinc-400">{t("description")}</p>
        </Reveal>
      </div>

      <Stagger className="mt-14 grid gap-5 md:grid-cols-3" stagger={0.1}>
        {items.map(({ key, Icon }) => (
          <StaggerItem key={key} className="h-full">
            <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.06] text-aurora-cyan">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em]">{t(`${key}.title`)}</h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-zinc-400">{t(`${key}.description`)}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

export default Philosophy;
