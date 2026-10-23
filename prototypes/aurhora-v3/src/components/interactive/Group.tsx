import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { TextLink } from "@/components/sections/primitives";
import { FlowDemo } from "./FlowDemo";
import { SpacePlanner } from "./SpacePlanner";
import { UNITS } from "@/content/site";
import { serviceById } from "@/content/services";
import { useReducedMotion } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

import type { UnitId } from "@/content/types";

/* ─────────── Ticket de servicio (escena de Facilities) ─────────── */

export function TicketCard({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(reduced ? 3 : 1);
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setDone((d) => (d % 3) + 1), 1800);
    return () => window.clearInterval(id);
  }, [reduced]);
  const steps = [
    { t: "Revisión del equipo", d: "Minisplit 1 · recámara principal" },
    { t: "Trabajo acordado", d: "Limpieza profunda y ajuste de drenaje" },
    { t: "Seguimiento", d: "Respaldo de 30 días explicado" },
  ];
  return (
    <div data-unit="facilities" className={cn("rounded-[16px] border border-line bg-raised p-5", className)}>
      <div className="flex items-center justify-between">
        <span className="eyebrow text-mute">Orden de servicio · ejemplo</span>
        <span className="eyebrow rounded-full bg-unit-soft px-2.5 py-1 text-unit">Lomas Verdes</span>
      </div>
      <h4 className="mt-4 font-display text-[22px] font-semibold leading-tight tracking-tight">Aire acondicionado que no enfría</h4>
      <ol className="mt-5 flex flex-col gap-2">
        {steps.map((s, i) => {
          const ok = i < done;
          return (
            <li key={s.t} className={cn("flex items-start gap-3 rounded-[12px] border p-3 transition-colors duration-500", ok ? "border-unit/40 bg-unit-soft" : "border-line")}>
              <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors duration-500", ok ? "border-unit bg-unit text-unit-on" : "border-line-strong/60 text-mute")}>
                {ok ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <span className="text-[11px] tabular">{i + 1}</span>}
              </span>
              <span>
                <span className="block text-[14px] font-medium">{s.t}</span>
                <span className="block text-[13px] text-mute">{s.d}</span>
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-[12.5px] text-mute">Primero entendemos qué pasa y después cotizamos. Si hace falta diagnóstico, se descuenta cuando aceptas el trabajo.</p>
    </div>
  );
}

/* ─────────── Explorador de especialidades ─────────── */

export function UnitExplorer() {
  const [active, setActive] = useState<UnitId>("digital");
  const unit = UNITS.find((u) => u.id === active)!;
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5">
        <div role="tablist" aria-label="Especialidades" className="flex flex-col border-t border-line">
          {UNITS.map((u) => {
            const on = u.id === active;
            return (
              <button
                key={u.id}
                role="tab"
                aria-selected={on}
                data-unit={u.id}
                onClick={() => setActive(u.id)}
                className={cn("group flex items-center gap-4 border-b border-line py-4 text-left transition", on ? "text-ink" : "text-mute hover:text-ink")}
              >
                <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-[12px] transition", on ? "bg-unit text-unit-on" : "bg-sunken")}>
                  <u.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-display text-[26px] font-semibold tracking-tight md:text-[30px]">{u.name}</span>
                <ArrowRight className={cn("ml-auto h-5 w-5 transition", on ? "translate-x-0 text-unit" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100")} aria-hidden="true" />
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={unit.id} data-unit={unit.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="mt-8" role="tabpanel">
            <p className="eyebrow text-unit">{unit.full}</p>
            <h3 className="display-sm mt-3">{unit.lead}</h3>
            <p className="mt-3 max-w-[48ch] text-[16px] leading-relaxed text-mute">{unit.desc}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {unit.services.map((id) => (
                <li key={id} className="rounded-full border border-line px-3 py-1 text-[13px] text-ink-soft">{serviceById(id)!.name}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <TextLink to={unit.id}>Explorar {unit.name}</TextLink>
              <span className="eyebrow text-mute">{unit.area}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="relative min-w-0 lg:col-span-7">
        <div aria-hidden="true" className="hairline-grid absolute -inset-4 rounded-[24px] opacity-50 [mask-image:radial-gradient(closest-side,black,transparent)]" />
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.25 }} className="relative">
            {active === "digital" && <FlowDemo />}
            {active === "integra" && <div className="rounded-[24px] bg-night p-1.5"><SpacePlanner /></div>}
            {active === "facilities" && <div className="mx-auto max-w-md py-4"><TicketCard /></div>}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────── Recorrido: tu próximo local ─────────── */

const PHASES = [
  { unit: "facilities" as UnitId, step: "Preparas el espacio", title: "Todo listo para abrir.", text: "Electricidad, climatización e instalaciones para empezar con un espacio que funciona.", to: "facilities" },
  { unit: "integra" as UnitId, step: "Conectas y proteges", title: "Un local vigilado y conectado.", text: "Cámaras en accesos y caja, red para la terminal y WiFi para clientes.", to: "integra" },
  { unit: "digital" as UnitId, step: "Haces crecer la operación", title: "Pedidos que llegan ordenados.", text: "Presencia en línea, solicitudes en un solo lugar y avisos automáticos.", to: "digital" },
];

export function JourneyStepper() {
  const [phase, setPhase] = useState(0);
  const p = PHASES[phase];
  const on = (i: number) => phase >= i;

  return (
    <div className="overflow-hidden rounded-[24px] border border-line bg-raised">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div data-unit={p.unit} className="flex flex-col p-6 md:p-9">
          <span className="eyebrow w-fit rounded-full border border-line px-2.5 py-1 text-mute">Un ejemplo posible</span>
          <h3 className="display-sm mt-5">Imagina tu próximo local.</h3>
          <AnimatePresence mode="wait">
            <motion.div key={phase} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="mt-8" aria-live="polite">
              <p className="eyebrow text-unit">Aurhora {UNITS.find((u) => u.id === p.unit)!.name}</p>
              <h4 className="mt-2 font-display text-[22px] font-semibold tracking-tight">{p.title}</h4>
              <p className="mt-2 max-w-[42ch] text-[15px] leading-relaxed text-mute">{p.text}</p>
              <TextLink to={p.to} className="mt-5">Conoce {UNITS.find((u) => u.id === p.unit)!.name}</TextLink>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="relative min-h-[300px] border-t border-line bg-sunken lg:border-l lg:border-t-0">
          <div aria-hidden="true" className="hairline-grid absolute inset-0 opacity-70" />
          <Storefront on={on} />
        </div>
      </div>
      <ol className="grid border-t border-line md:grid-cols-3" aria-label="Etapas del ejemplo">
        {PHASES.map((x, i) => (
          <li key={x.step} data-unit={x.unit} className="border-line md:[&:not(:last-child)]:border-r [&:not(:last-child)]:border-b md:[&:not(:last-child)]:border-b-0">
            <button type="button" aria-pressed={phase === i} onClick={() => { setPhase(i); track("select_content", { content_type: "journey_phase", content_id: x.unit }); }} className={cn("flex w-full items-center gap-4 p-5 text-left transition", phase === i ? "bg-unit-soft" : "hover:bg-sunken")}>
              <span className={cn("eyebrow tabular", phase >= i ? "text-unit" : "text-mute")}>{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="block text-[15px] font-medium">{x.step}</span>
                <span className="block text-[13px] text-mute">{UNITS.find((u) => u.id === x.unit)!.full}</span>
              </span>
              <span aria-hidden="true" className={cn("ml-auto h-2 w-2 rounded-full", phase >= i ? "bg-unit" : "bg-line")} />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Storefront({ on }: { on: (i: number) => boolean }) {
  const layer = (i: number) => cn("transition-opacity duration-700", on(i) ? "opacity-100" : "opacity-0");
  return (
    <svg viewBox="0 0 480 340" className="relative h-full w-full max-w-full" role="img" aria-label="Ilustración de un local que suma mantenimiento, tecnología y operación digital">
      {/* building */}
      <g className="fill-raised stroke-line-strong" strokeWidth="1.4">
        <rect x="40" y="70" width="330" height="230" rx="4" />
        <rect x="64" y="140" width="180" height="140" rx="3" className="fill-bg" />
        <rect x="262" y="150" width="84" height="130" rx="3" className="fill-bg" />
        <rect x="120" y="88" width="170" height="32" rx="3" />
      </g>
      <text x="205" y="109" textAnchor="middle" className="fill-ink" fontSize="12" fontFamily="Geist Mono, monospace" letterSpacing="2">TU LOCAL</text>
      <line x1="20" y1="300" x2="460" y2="300" className="stroke-line-strong" strokeWidth="1.4" />
      <circle cx="330" cy="218" r="3" className="fill-line-strong" />

      {/* Facilities: clima, luz, contactos */}
      <g data-unit="facilities" className={layer(0)}>
        <rect x="296" y="78" width="62" height="24" rx="4" className="fill-unit-soft stroke-unit" strokeWidth="1.4" />
        <path d="M304 108c4 6 4 10 0 16M318 108c4 6 4 10 0 16M332 108c4 6 4 10 0 16M346 108c4 6 4 10 0 16" className="stroke-unit" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        {[104, 154, 204].map((x) => (
          <g key={x}>
            <line x1={x} y1="140" x2={x} y2="156" className="stroke-unit" strokeWidth="1.2" />
            <circle cx={x} cy="162" r="7" className="fill-unit/20 stroke-unit" strokeWidth="1.2" />
            <circle cx={x} cy="162" r="16" className="fill-unit/10" />
          </g>
        ))}
        <rect x="80" y="252" width="14" height="14" rx="2" className="fill-unit-soft stroke-unit" strokeWidth="1.2" />
      </g>

      {/* Integra: cámara, wifi, chapa */}
      <g data-unit="integra" className={layer(1)}>
        <path d="M48 78l22 -8 6 12 -22 8z" className="fill-unit-soft stroke-unit" strokeWidth="1.4" />
        <path d="M70 84 L150 140 L96 160 Z" className="fill-unit/10" />
        <g className="stroke-unit" fill="none" strokeWidth="1.6" strokeLinecap="round">
          <path d="M138 232a28 28 0 0 1 40 0" />
          <path d="M128 222a42 42 0 0 1 60 0" />
          <path d="M118 212a56 56 0 0 1 80 0" />
        </g>
        <circle cx="158" cy="244" r="3.5" className="fill-unit" />
        <rect x="324" y="206" width="14" height="22" rx="3" className="fill-unit-soft stroke-unit" strokeWidth="1.4" />
      </g>

      {/* Digital: teléfono con pedidos */}
      <g data-unit="digital" className={layer(2)}>
        <path d="M346 190 C 380 190, 380 150, 392 150" className="stroke-unit" strokeWidth="1.4" strokeDasharray="4 4" fill="none" />
        <rect x="388" y="110" width="76" height="140" rx="12" className="fill-raised stroke-unit" strokeWidth="1.6" />
        <rect x="398" y="128" width="56" height="20" rx="6" className="fill-unit-soft" />
        <rect x="398" y="154" width="44" height="20" rx="6" className="fill-unit/25" />
        <rect x="398" y="180" width="56" height="20" rx="6" className="fill-unit-soft" />
        <rect x="398" y="216" width="56" height="20" rx="8" className="fill-unit" />
        <text x="426" y="230" textAnchor="middle" fontSize="8.5" fontFamily="Geist, sans-serif" className="fill-unit-on">Pedido nuevo</text>
      </g>
    </svg>
  );
}
