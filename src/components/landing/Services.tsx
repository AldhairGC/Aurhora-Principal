"use client";

/**
 * Services — las 6 capacidades estratégicas en cards del sistema Aurora.
 * Copy real desde i18n (namespace "services").
 */

import React from "react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { Globe, Rocket, Code, TrendingUp, ArrowRight } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/lib/motion";

const items = [
  { key: "godigital", href: "/servicios/godigital", Icon: Globe },
  { key: "transformation", href: "/servicios/transformacion-digital", Icon: Rocket },
  { key: "development", href: "/servicios/desarrollo-software", Icon: Code },
  { key: "marketing", href: "/servicios/impulso-marketing", Icon: TrendingUp },
] as const;

export function Services() {
  const t = useTranslations("services");

  return (
    <Section id="servicios" className="py-24 md:py-32">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow className="mb-6">{t("eyebrow")}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-4xl font-semibold tracking-[-0.02em] md:text-5xl">{t("title")}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg leading-relaxed text-secondaryText">{t("description")}</p>
        </Reveal>
      </div>

      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
        {items.map(({ key, href, Icon }) => (
          <StaggerItem key={key} className="h-full">
            <Link
              href={href}
              className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-aurora-indigo/30 hover:shadow-[0_20px_40px_-16px_rgba(79,70,229,0.18)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-aurora-indigo/[0.08] text-aurora-indigo transition-colors duration-300 group-hover:bg-aurora-indigo group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em] text-ink">{t(`${key}.title`)}</h3>
              <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-secondaryText">
                {t(`${key}.description`)}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-aurora-indigo">
                {t(`${key}.linkText`)}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

export default Services;
