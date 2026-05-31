"use client";

/**
 * MarketingDashboard — visualización animada de resultados de campañas digitales.
 * KPIs con conteo animado (ROAS, Conversiones, CTR, CAC) + gráfica de barras
 * animada. Panel oscuro auto-contenido (encaja en el sistema Aurora).
 * Figuras ilustrativas de un dashboard de campañas. Respeta prefers-reduced-motion.
 */

import React from "react";
import { useTranslations } from "next-intl";
import { useReducedMotion, motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { CountUp } from "@/lib/motion";

const bars = [38, 47, 41, 58, 64, 76, 71, 92];

export function MarketingDashboard() {
  const t = useTranslations("marketing");
  const reduce = useReducedMotion();

  const kpis = [
    { label: "ROAS", value: 4.2, decimals: 1, suffix: "x", trend: "+18%", up: true },
    { label: t("kpiConversions"), value: 1284, decimals: 0, suffix: "", trend: "+32%", up: true },
    { label: "CTR", value: 6.8, decimals: 1, suffix: "%", trend: "+12%", up: true },
    { label: "CAC", value: 38, decimals: 0, prefix: "−", suffix: "%", trend: "−38%", up: true },
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0F] shadow-[0_24px_60px_-20px_rgba(79,70,229,0.45)]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(55% 50% at 100% 0%, rgba(6,182,212,0.14), transparent 70%), radial-gradient(55% 50% at 0% 100%, rgba(124,58,237,0.14), transparent 70%)" }}
      />
      {/* Header */}
      <div className="relative flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="font-mono text-xs text-zinc-500">campañas · dashboard</span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {t("dashLive")}
        </span>
      </div>

      <div className="relative p-5">
        {/* KPI tiles */}
        <div className="grid grid-cols-2 gap-3">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
              <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">{k.label}</div>
              <div className="mt-1 text-2xl font-semibold text-white">
                <CountUp value={k.value} decimals={k.decimals} prefix={k.prefix} suffix={k.suffix} />
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
                {k.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {k.trend}
              </div>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="mt-5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-wider text-zinc-500">{t("chartTitle")}</div>
          <div className="flex h-28 items-end gap-1.5">
            {bars.map((pct, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t"
                style={{
                  background: i === bars.length - 1
                    ? "linear-gradient(180deg, #06B6D4, #7C3AED)"
                    : "linear-gradient(180deg, rgba(124,58,237,0.55), rgba(79,70,229,0.25))",
                }}
                initial={reduce ? { height: `${pct}%` } : { height: "0%" }}
                whileInView={{ height: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketingDashboard;
