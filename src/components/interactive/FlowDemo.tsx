"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, MessageCircle, Pause, Play, UserRound } from "lucide-react";
import { useReducedMotion } from "@/lib/theme";
import { cn } from "@/lib/utils";

/* Ejemplo ilustrativo: una solicitud por WhatsApp se convierte en una tarea con responsable. */
const STAGES = ["Recibir", "Organizar", "Asignar", "Dar seguimiento"];

export function FlowDemo({ className, compact }: { className?: string; compact?: boolean }) {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(reduced ? 3 : 0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(() => setStage((s) => (s + 1) % 4), 2200);
    return () => window.clearInterval(id);
  }, [reduced, paused]);

  return (
    <div data-unit="digital" className={cn("relative overflow-hidden rounded-[16px] border border-line bg-raised", className)}>
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
        </div>
        <span className="eyebrow text-mute">Flujo de atención · ejemplo</span>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="grid h-7 w-7 place-items-center rounded-full text-mute hover:bg-sunken hover:text-ink"
          aria-label={paused ? "Reanudar animación" : "Pausar animación"}
          hidden={reduced}
        >
          {paused ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
        </button>
      </div>

      <ol className="grid grid-cols-4 gap-1 px-4 pt-4" aria-label="Etapas del flujo">
        {STAGES.map((s, i) => (
          <li key={s}>
            <button type="button" onClick={() => { setStage(i); setPaused(true); }} className="w-full text-left" aria-pressed={stage === i}>
              <span className={cn("block h-1 rounded-full transition-colors duration-500", i <= stage ? "bg-unit" : "bg-line")} />
              <span className={cn("eyebrow mt-2 block truncate text-[10px]", i === stage ? "text-unit" : "text-mute")}>{s}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className={cn("grid gap-4 p-4", compact ? "min-h-[300px]" : "min-h-[340px] md:grid-cols-[1fr_1.1fr] md:p-5")}>
        {/* Incoming message */}
        <div className="flex flex-col gap-3">
          <div className="rounded-[12px] border border-line bg-sunken p-4">
            <div className="flex items-center gap-2 text-[13px]">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#1f9d55] text-white"><MessageCircle className="h-3.5 w-3.5" aria-hidden="true" /></span>
              <strong className="font-medium">Cliente nuevo</strong>
              <span className="ml-auto text-mute">10:42</span>
            </div>
            <p className="mt-3 text-[14px] leading-relaxed">Hola, quiero pedir 3 cajas para recoger mañana en la sucursal de Satélite.</p>
          </div>
          <AnimatePresence>
            {stage >= 1 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-wrap gap-2">
                {["Pedido · 3 cajas", "Recoger · mañana", "Sucursal · Satélite"].map((c, i) => (
                  <motion.span key={c} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.12 }} className="rounded-full border border-unit/30 bg-unit-soft px-3 py-1 text-[12px] font-medium text-unit">
                    {c}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Resulting task */}
        <div className="relative rounded-[12px] border border-line p-4">
          <p className="eyebrow text-mute">Tarea generada</p>
          <h4 className="mt-2 font-display text-[18px] font-semibold tracking-tight">Preparar pedido para recolección</h4>
          <dl className="mt-4 space-y-3 text-[13px]">
            <Row label="Origen" value="WhatsApp" show={stage >= 1} />
            <Row label="Prioridad" value="Mañana, antes de las 12:00" show={stage >= 1} />
            <Row
              label="Responsable"
              show={stage >= 2}
              value={
                <span className="inline-flex items-center gap-1.5">
                  <UserRound className="h-3.5 w-3.5 text-unit" aria-hidden="true" /> Equipo de sucursal
                </span>
              }
            />
            <Row label="Aviso al cliente" value="Confirmación enviada" show={stage >= 3} />
          </dl>
          <AnimatePresence>
            {stage >= 3 && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 flex items-center gap-3 rounded-[12px] bg-unit px-4 py-3 text-unit-on">
                <Check className="h-4 w-4" aria-hidden="true" />
                <span className="text-[14px] font-medium">Listo para tu equipo, sin capturarlo dos veces.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, show }: { label: string; value: React.ReactNode; show: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-dashed border-line pb-2.5">
      <dt className="text-mute">{label}</dt>
      <dd className={cn("text-right font-medium transition-all duration-500", show ? "opacity-100" : "opacity-25 blur-[3px]")}>{value}</dd>
    </div>
  );
}
