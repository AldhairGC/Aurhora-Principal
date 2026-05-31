"use client";

/**
 * AgentFlow — diagrama animado de un agente de IA (estilo n8n / flujo de nodos).
 * Solicitud → Agente IA → Respuesta, con el agente orquestando herramientas.
 * Conexiones con flujo animado + "paquetes" de datos viajando por las líneas.
 * Auto-contenido y oscuro (encaja en el sistema Aurora). Respeta
 * prefers-reduced-motion (oculta los paquetes en movimiento).
 */

import React from "react";
import { useTranslations } from "next-intl";
import { useReducedMotion } from "framer-motion";

const edges = [
  { id: "af-e1", d: "M106,110 L158,110" },
  { id: "af-e2", d: "M282,110 L334,110" },
  { id: "af-e3", d: "M200,144 C175,182 130,196 108,216" },
  { id: "af-e4", d: "M220,144 L220,216" },
  { id: "af-e5", d: "M240,144 C265,182 310,196 332,216" },
];

export function AgentFlow() {
  const t = useTranslations("digitalTransform");
  const reduce = useReducedMotion();

  const Node = ({
    x, y, w, h, label, accent = false,
  }: { x: number; y: number; w: number; h: number; label: string; accent?: boolean }) => (
    <g>
      <rect
        x={x} y={y} width={w} height={h} rx={accent ? 14 : 10}
        fill={accent ? "rgba(124,58,237,0.10)" : "rgba(255,255,255,0.04)"}
        stroke={accent ? "url(#afGrad)" : "rgba(255,255,255,0.14)"}
        strokeWidth={accent ? 1.5 : 1}
      />
      <text
        x={x + w / 2} y={y + h / 2 + (accent ? 5 : 4)}
        textAnchor="middle"
        fontSize={accent ? 13 : 10.5}
        fontWeight={accent ? 600 : 500}
        fill={accent ? "#FFFFFF" : "#D4D4D8"}
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        {label}
      </text>
    </g>
  );

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0F] shadow-[0_24px_60px_-20px_rgba(79,70,229,0.45)]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 50% at 50% 0%, rgba(124,58,237,0.16), transparent 70%), radial-gradient(50% 50% at 100% 100%, rgba(6,182,212,0.14), transparent 70%)" }}
      />
      {/* Header tipo herramienta */}
      <div className="relative flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-amber-500/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
        <span className="ml-3 font-mono text-xs text-zinc-500">agente-ia.flow</span>
      </div>

      {/* Diagrama */}
      <div className="relative p-4">
        <svg viewBox="0 0 440 300" className="w-full" style={{ maxHeight: 320 }} role="img" aria-label="Diagrama de agente de IA">
          <defs>
            <linearGradient id="afGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="50%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>

          {/* Aristas base */}
          {edges.map((e) => (
            <path key={e.id} id={e.id} d={e.d} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} />
          ))}
          {/* Aristas con flujo animado */}
          {edges.map((e) => (
            <path key={`${e.id}-f`} d={e.d} fill="none" stroke="url(#afGrad)" strokeWidth={1.5} strokeDasharray="5 9" className="af-flow" />
          ))}

          {/* Glow del agente (pulsa) */}
          <rect x={150} y={68} width={140} height={84} rx={18} fill="#7C3AED" opacity={0.2} className="af-glow" style={{ filter: "blur(14px)" }} />

          {/* Nodos */}
          <Node x={14} y={88} w={92} h={44} label={t("flowInput")} />
          <Node x={158} y={76} w={124} h={68} label={t("flowAgent")} accent />
          <Node x={334} y={88} w={92} h={44} label={t("flowOutput")} />
          <Node x={62} y={216} w={92} h={40} label={t("flowTool1")} />
          <Node x={166} y={216} w={108} h={40} label={t("flowTool2")} />
          <Node x={286} y={216} w={92} h={40} label={t("flowTool3")} />

          {/* Paquetes de datos viajando */}
          {!reduce &&
            edges.map((e, i) => (
              <circle key={`${e.id}-dot`} r={3.2} fill="#22D3EE">
                <animateMotion dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite">
                  <mpath href={`#${e.id}`} />
                </animateMotion>
              </circle>
            ))}
        </svg>
      </div>

      <style>{`
        @keyframes afFlow { to { stroke-dashoffset: -28; } }
        .af-flow { animation: afFlow 1.1s linear infinite; }
        @keyframes afGlow { 0%,100% { opacity:.16 } 50% { opacity:.4 } }
        .af-glow { animation: afGlow 2.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .af-flow, .af-glow { animation: none; } }
      `}</style>
    </div>
  );
}

export default AgentFlow;
