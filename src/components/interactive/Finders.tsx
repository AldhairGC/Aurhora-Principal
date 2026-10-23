"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Check, Factory, Globe, HardHat, Home, Store } from "lucide-react";
import { BtnLink, TextLink } from "@/components/sections/primitives";
import { serviceById } from "@/content/services";
import { unitById } from "@/content/site";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";


/* ─────────── Agencia: ¿qué necesitas resolver? ─────────── */

type Place = "casa" | "local" | "oficina" | "nave" | "obra" | "digital";
const PLACES: { id: Place; label: string; icon: typeof Home }[] = [
  { id: "casa", label: "Mi casa", icon: Home },
  { id: "local", label: "Mi local", icon: Store },
  { id: "oficina", label: "Mi oficina", icon: Building2 },
  { id: "nave", label: "Mi nave o bodega", icon: Factory },
  { id: "obra", label: "Una obra o remodelación", icon: HardHat },
  { id: "digital", label: "Mi negocio en digital", icon: Globe },
];

const NEEDS: Record<Place, { label: string; service: string }[]> = {
  casa: [
    { label: "El aire no enfría o gotea", service: "aire-acondicionado" },
    { label: "Una falla eléctrica", service: "electricidad" },
    { label: "Colgar, ajustar o reparar", service: "reparaciones" },
    { label: "Ver quién entra a mi casa", service: "seguridad-accesos" },
    { label: "Luces, clima y persianas automáticas", service: "domotica" },
    { label: "El WiFi no llega a todos lados", service: "redes" },
  ],
  local: [
    { label: "Dejar el local listo para abrir", service: "proyectos-industriales" },
    { label: "Clima para clientes y equipo", service: "aire-acondicionado" },
    { label: "Cámaras en caja y accesos", service: "seguridad-accesos" },
    { label: "Red para terminal y WiFi de clientes", service: "redes" },
    { label: "Que me encuentren en línea", service: "godigital" },
    { label: "Responder WhatsApp con un agente de IA", service: "agentes-ia" },
  ],
  oficina: [
    { label: "Mantenimiento programado de equipos", service: "mantenimiento-programado" },
    { label: "Red estable y telefonía", service: "redes" },
    { label: "Luces y clima con horario automático", service: "domotica" },
    { label: "Sala de juntas lista para videollamadas", service: "audio-video" },
    { label: "Agentes de IA para el equipo", service: "agentes-ia" },
    { label: "Procesos que se repiten cada día", service: "automatizacion-procesos" },
  ],
  nave: [
    { label: "Instalaciones eléctricas o iluminación LED", service: "proyectos-industriales" },
    { label: "Póliza de mantenimiento preventivo", service: "mantenimiento-programado" },
    { label: "Cámaras y control de acceso", service: "seguridad-accesos" },
    { label: "Red y WiFi en áreas amplias", service: "redes" },
    { label: "Automatizar captura de pedidos y documentos", service: "automatizacion-procesos" },
  ],
  obra: [
    { label: "Remodelar o ampliar mi casa", service: "proyectos-residenciales" },
    { label: "Adecuar un local, oficina o nave", service: "proyectos-industriales" },
    { label: "Dejar la casa preparada para domótica", service: "domotica" },
    { label: "Cableado de red y cámaras desde obra", service: "redes" },
    { label: "Instalación eléctrica completa", service: "electricidad" },
  ],
  digital: [
    { label: "Un agente de IA que atienda y ejecute tareas", service: "agentes-ia" },
    { label: "Automatizar procesos repetitivos", service: "automatizacion-procesos" },
    { label: "Un sistema hecho para mi operación", service: "software" },
    { label: "Saber dónde conviene usar IA", service: "consultoria" },
    { label: "Conseguir más clientes", service: "marketing" },
    { label: "Empezar con sitio, contacto y agenda", service: "godigital" },
  ],
};

export function NeedFinder({ className }: { className?: string }) {
  const [place, setPlace] = useState<Place>("digital");
  const [needIdx, setNeedIdx] = useState(0);
  const needs = NEEDS[place];
  const need = needs[Math.min(needIdx, needs.length - 1)];
  const svc = serviceById(need.service)!;
  const unit = unitById(svc.unit);

  return (
    <div className={cn("grid overflow-hidden rounded-[24px] border border-line bg-raised lg:grid-cols-[1fr_1fr_0.95fr]", className)}>
      <fieldset className="border-b border-line p-5 lg:border-b-0 lg:border-r md:p-6">
        <legend className="eyebrow float-left mb-4 w-full text-mute">1 · ¿Dónde?</legend>
        <div className="clear-both grid grid-cols-2 gap-2">
          {PLACES.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={p.id === place}
              onClick={() => { setPlace(p.id); setNeedIdx(0); }}
              className={cn(
                "flex min-h-[88px] flex-col items-start justify-between rounded-[12px] border p-3 text-left text-[14px] font-medium transition",
                p.id === place ? "border-ink bg-ink text-bg" : "border-line hover:border-line-strong",
              )}
            >
              <p.icon className="h-5 w-5" aria-hidden="true" />
              {p.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="border-b border-line p-5 lg:border-b-0 lg:border-r md:p-6">
        <legend className="eyebrow float-left mb-4 w-full text-mute">2 · ¿Qué quieres resolver?</legend>
        <ul className="clear-both flex flex-col gap-1">
          {needs.map((n, i) => {
            const on = n === need;
            return (
              <li key={n.label}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => { setNeedIdx(i); track("select_content", { content_type: "need_finder", content_id: n.service, place }); }}
                  data-unit={serviceById(n.service)!.unit}
                  className={cn("flex w-full items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-[14.5px] transition", on ? "bg-unit-soft text-ink" : "text-ink-soft hover:bg-sunken")}
                >
                  <span className={cn("grid h-5 w-5 shrink-0 place-items-center rounded-full border", on ? "border-unit bg-unit text-unit-on" : "border-line-strong/60")}>
                    {on && <Check className="h-3 w-3" aria-hidden="true" />}
                  </span>
                  {n.label}
                </button>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div data-unit={svc.unit} className="relative flex flex-col bg-unit-soft p-5 md:p-6" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div key={svc.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }} className="flex h-full flex-col">
            <p className="eyebrow text-unit">Te atiende {unit.full}</p>
            <div className="mt-5 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-[12px] bg-unit text-unit-on"><svc.icon className="h-5 w-5" aria-hidden="true" /></span>
              <h3 className="font-display text-[24px] font-semibold leading-tight tracking-tight">{svc.name}</h3>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{svc.heroDesc}</p>
            <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
              <BtnLink to="contacto" variant="unit" prefill={{ unit: svc.unit, service: svc.contactService, origin: "buscador de la agencia" }}>Solicitar</BtnLink>
              <TextLink to={svc.id}>Ver el servicio</TextLink>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────── Digital: arma tu punto de partida ─────────── */

const PAINS: { id: string; label: string; weights: Record<string, number> }[] = [
  { id: "preguntas", label: "Respondemos las mismas preguntas todo el día", weights: { "agentes-ia": 3, godigital: 1 } },
  { id: "solicitudes", label: "Las solicitudes se pierden entre chats y correos", weights: { "agentes-ia": 2, "automatizacion-procesos": 2, godigital: 1 } },
  { id: "documentos", label: "Capturamos facturas, pedidos o documentos a mano", weights: { "agentes-ia": 2, "automatizacion-procesos": 3 } },
  { id: "captura", label: "La misma información se captura varias veces", weights: { software: 3, "automatizacion-procesos": 2 } },
  { id: "excel", label: "La operación vive en hojas de cálculo", weights: { software: 3, consultoria: 1 } },
  { id: "reportes", label: "Los reportes se arman a mano", weights: { "automatizacion-procesos": 3, software: 1 } },
  { id: "ia", label: "Queremos usar IA pero no sabemos dónde", weights: { consultoria: 3, "agentes-ia": 1 } },
  { id: "visibilidad", label: "Pocos clientes nos encuentran en línea", weights: { marketing: 3, godigital: 2 } },
];

export function StarterBuilder({ className }: { className?: string }) {
  const [picked, setPicked] = useState<string[]>(["preguntas", "documentos"]);
  const ranking = useMemo(() => {
    const score: Record<string, number> = {};
    for (const p of PAINS) if (picked.includes(p.id)) for (const [k, v] of Object.entries(p.weights)) score[k] = (score[k] ?? 0) + v;
    return Object.entries(score).sort((a, b) => b[1] - a[1]).slice(0, 3);
  }, [picked]);
  const max = ranking[0]?.[1] ?? 1;
  const toggle = (id: string) => {
    track("select_content", { content_type: "starter_pain", content_id: id });
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };

  return (
    <div data-unit="digital" className={cn("grid gap-0 overflow-hidden rounded-[24px] border border-line bg-raised md:grid-cols-2", className)}>
      <fieldset className="border-b border-line p-5 md:border-b-0 md:border-r md:p-7">
        <legend className="eyebrow float-left mb-4 w-full text-mute">Marca lo que hoy te pasa</legend>
        <div className="clear-both flex flex-col gap-2">
          {PAINS.map((p) => {
            const on = picked.includes(p.id);
            return (
              <label key={p.id} className={cn("flex cursor-pointer items-start gap-3 rounded-[12px] border px-3.5 py-3 text-[14.5px] transition", on ? "border-unit/50 bg-unit-soft" : "border-line hover:border-line-strong")}>
                <input type="checkbox" checked={on} onChange={() => toggle(p.id)} className="mt-1 h-4 w-4 accent-[rgb(var(--digital))]" />
                {p.label}
              </label>
            );
          })}
        </div>
      </fieldset>
      <div className="flex flex-col p-5 md:p-7" aria-live="polite">
        <p className="eyebrow text-mute">Un punto de partida posible</p>
        {ranking.length === 0 ? (
          <p className="mt-6 text-[15px] text-mute">Marca al menos una situación para ver por dónde conviene empezar.</p>
        ) : (
          <ol className="mt-5 flex flex-col gap-3">
            {ranking.map(([id, sc], i) => {
              const s = serviceById(id)!;
              return (
                <motion.li layout key={id} className={cn("rounded-[12px] border p-4", i === 0 ? "border-unit bg-unit-soft" : "border-line")}>
                  <div className="flex items-center gap-3">
                    <s.icon className="h-5 w-5 shrink-0 text-unit" aria-hidden="true" />
                    <span className="font-display text-[17px] font-semibold tracking-tight">{s.name}</span>
                    <span className="eyebrow ml-auto text-mute">{i === 0 ? "Empieza aquí" : "Después"}</span>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line" aria-hidden="true">
                    <motion.div className="h-full rounded-full bg-unit" initial={false} animate={{ width: `${(sc / max) * 100}%` }} transition={{ type: "spring", stiffness: 140, damping: 20 }} />
                  </div>
                  {i === 0 && <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{s.tagline}</p>}
                </motion.li>
              );
            })}
          </ol>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
          <BtnLink
            to="contacto"
            variant="unit"
            prefill={{ unit: "digital", service: ranking[0] ? serviceById(ranking[0][0])!.contactService : "Otro proyecto", origin: "punto de partida digital" }}
          >
            Conversarlo con el equipo
          </BtnLink>
          <span className="text-[12.5px] text-mute">Orientación inicial; la propuesta se define contigo.</span>
        </div>
      </div>
    </div>
  );
}
