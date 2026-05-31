"use client";

/**
 * FinalCTA — cierre del home como panel oscuro contenido sobre fondo claro.
 * El panel deja respirar el gradiente aurora y se separa del footer oscuro
 * (evita el "oscuro sobre oscuro"). Copy real desde i18n (namespace "cta").
 */

import React from "react";
import { useTranslations } from "next-intl";
import { GradientText, Button } from "@/components/ui";
import { Reveal, MagneticButton } from "@/lib/motion";

type FinalCTAProps = {
  onContactClick?: (source: string) => void;
};

export function FinalCTA({ onContactClick }: FinalCTAProps) {
  const t = useTranslations("cta");

  return (
    <section className="bg-surface px-6 py-20 md:py-28">
      <Reveal>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-aurora-bg px-6 py-20 text-center text-white md:px-12 md:py-28">
          {/* glow boreal */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(50% 60% at 15% 10%, rgba(124,58,237,0.30), transparent 65%), radial-gradient(45% 60% at 85% 20%, rgba(6,182,212,0.24), transparent 65%), radial-gradient(50% 50% at 50% 110%, rgba(37,99,235,0.20), transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="text-4xl font-semibold tracking-[-0.02em] md:text-6xl">
              {t("title")} <GradientText>{t("impulse")}</GradientText> {t("vision")}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
              {t("description")}
            </p>
            <div className="mt-10 flex justify-center">
              <MagneticButton>
                <Button
                  variant="primary"
                  size="lg"
                  icon="arrow"
                  onClick={() => onContactClick?.("cta_final_agenda_sesion")}
                >
                  {t("scheduleSession")}
                </Button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default FinalCTA;
