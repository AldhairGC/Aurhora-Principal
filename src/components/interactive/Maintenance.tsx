"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, MapPin, Search } from "lucide-react";
import { BtnLink, WhatsAppBtn } from "@/components/sections/primitives";
import { Link } from "@/lib/router";
import { useOpenState } from "@/lib/hours";
import { serviceById } from "@/content/services";
import { SITE } from "@/content/site";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";


/* ─────────── Síntomas → servicio sugerido ─────────── */

type Symptom = { id: string; label: string; service: string; note: string; careful?: boolean };

const SYMPTOMS: Symptom[] = [
  { id: "no-enfria", label: "Mi aire no enfría", service: "aire-acondicionado", note: "Puede ser falta de mantenimiento, filtros saturados o una falla. Con fotos del equipo podemos orientar si conviene limpieza o diagnóstico." },
  { id: "gotea", label: "El minisplit gotea", service: "aire-acondicionado", note: "Suele relacionarse con el drenaje o la limpieza. Apágalo si el agua cae sobre muebles o contactos." },
  { id: "pastilla", label: "Se bota la pastilla", service: "electricidad", note: "Anota qué estaba encendido cuando ocurrió. Nos ayuda a ubicar el circuito.", careful: true },
  { id: "sin-luz", label: "Una zona se quedó sin luz", service: "electricidad", note: "Revisa si la pastilla de esa zona está abajo. Si vuelve a bajar, no la fuerces.", careful: true },
  { id: "contacto", label: "Un contacto se calienta", service: "electricidad", note: "Desconecta lo que esté conectado y no lo uses hasta que se revise.", careful: true },
  { id: "fuga", label: "Hay una fuga de agua", service: "plomeria", note: "Cierra la llave de paso del área o la general y retira lo que pueda mojarse. Un video de dónde sale el agua nos ayuda a preparar la visita.", careful: true },
  { id: "tinaco", label: "El agua no sube al tinaco", service: "plomeria", note: "Revisa si la bomba enciende y si la cisterna tiene agua. Comparte una foto de la bomba y del flotador del tinaco." },
  { id: "tapado", label: "Se tapó el fregadero o el WC", service: "plomeria", note: "Evita usar químicos fuertes: dañan la tubería y complican el destape. Dinos desde cuándo pasa y si afecta a más de una salida." },
  { id: "tv", label: "Quiero colgar una pantalla", service: "reparaciones", note: "Comparte la medida de la pantalla y una foto del muro para elegir el soporte y la fijación." },
  { id: "puerta", label: "Una puerta no cierra bien", service: "reparaciones", note: "Una foto de las bisagras y la chapa ayuda a saber qué ajuste necesita." },
  { id: "lista", label: "Tengo varios pendientes", service: "reparaciones", note: "Envía la lista completa con fotos. Confirmamos cuáles se pueden resolver en una sola visita." },
];

export function SymptomChecker({ className }: { className?: string }) {
  const [id, setId] = useState(SYMPTOMS[0].id);
  const sym = SYMPTOMS.find((s) => s.id === id)!;
  const svc = serviceById(sym.service)!;
  const wa = `Hola, Aurhora. ${sym.label}. Me gustaría solicitar atención de ${svc.name.toLowerCase()}.`;

  return (
    <div data-unit="facilities" className={cn("overflow-hidden rounded-[16px] border border-line bg-raised", className)}>
      <div className="border-b border-line bg-unit-soft px-5 py-4">
        <p className="eyebrow text-unit">Empecemos por aquí</p>
        <h2 className="mt-1 font-display text-[24px] font-semibold tracking-tight">¿Qué está pasando?</h2>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Elige lo que más se parece">
          {SYMPTOMS.map((s) => (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={s.id === id}
              onClick={() => { setId(s.id); track("select_content", { content_type: "symptom", content_id: s.id }); }}
              className={cn(
                "rounded-full border px-3.5 py-2 text-[13.5px] transition",
                s.id === id ? "border-unit bg-unit text-unit-on" : "border-line text-ink-soft hover:border-unit/50 hover:text-ink",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="mt-5 rounded-[16px] border border-line p-4" aria-live="polite">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-unit-soft text-unit">
                <svc.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="eyebrow text-mute">Servicio sugerido</p>
                <Link to={svc.id} className="font-display text-[18px] font-semibold tracking-tight hover:underline">{svc.name}</Link>
              </div>
            </div>
            <p className={cn("mt-3 text-[14px] leading-relaxed", sym.careful ? "text-ink" : "text-mute")}>
              {sym.careful && <strong className="mr-1 font-semibold text-warn">Por seguridad:</strong>}
              {sym.note}
            </p>
            <p className="eyebrow mt-4 text-mute">Para cotizar más rápido, comparte</p>
            <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {svc.share.map((x) => (
                <li key={x} className="flex items-start gap-2 text-[13.5px]">
                  <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-unit" aria-hidden="true" /> {x}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <WhatsAppBtn text={wa}>Enviar por WhatsApp</WhatsAppBtn>
              <BtnLink to="contacto" variant="outline" prefill={{ unit: "facilities", service: svc.contactService, origin: "diagnóstico rápido" }}>
                Preparar solicitud
              </BtnLink>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────── Cobertura ─────────── */

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

export function ZoneChecker({ className }: { className?: string }) {
  const [q, setQ] = useState("Naucalpan");
  const nq = norm(q);
  const match = useMemo(() => SITE.zones.find((z) => norm(z) === nq) ?? (nq.length >= 3 ? SITE.zones.find((z) => norm(z).includes(nq)) : undefined), [nq]);
  const suggestions = nq ? SITE.zones.filter((z) => norm(z).includes(nq) && norm(z) !== nq) : [];

  return (
    <div className={cn("rounded-[16px] border border-line bg-raised p-5", className)}>
      <label htmlFor="zone-q" className="eyebrow text-mute">¿Llegamos a tu zona?</label>
      <div className="relative mt-3">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mute" aria-hidden="true" />
        <input
          id="zone-q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onBlur={() => nq && track("select_content", { content_type: "zone_check", content_id: match ?? "fuera_de_lista" })}
          placeholder="Escribe tu colonia, alcaldía o municipio"
          autoComplete="off"
          className="h-12 w-full rounded-[12px] border border-line bg-bg pl-10 pr-3 text-[15px] outline-none transition focus:border-unit"
        />
      </div>
      {suggestions.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {suggestions.map((z) => (
            <button key={z} type="button" onClick={() => setQ(z)} className="rounded-full bg-sunken px-3 py-1 text-[13px] hover:bg-unit-soft">{z}</button>
          ))}
        </div>
      )}
      <div className="mt-4 min-h-[72px]" aria-live="polite">
        {!nq ? (
          <p className="text-[14px] text-mute">Atendemos CDMX y zonas del Estado de México.</p>
        ) : match ? (
          <div className="flex items-start gap-3 rounded-[12px] bg-unit-soft p-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-unit" aria-hidden="true" />
            <p className="text-[14px] leading-snug"><strong className="font-semibold">{match}</strong> está dentro de nuestras zonas frecuentes. Confirmamos traslado y disponibilidad al revisar tu solicitud.</p>
          </div>
        ) : (
          <div className="flex items-start gap-3 rounded-[12px] bg-sunken p-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mute" aria-hidden="true" />
            <p className="text-[14px] leading-snug">No está en la lista de zonas frecuentes, pero puede estar cubierta. Escríbenos y confirmamos traslado y disponibilidad.</p>
          </div>
        )}
      </div>
      <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Zonas frecuentes">
        {SITE.zones.map((z) => (
          <li key={z}>
            <button type="button" onClick={() => { setQ(z); track("select_content", { content_type: "zone_check", content_id: z }); }} className={cn("rounded-full border px-3 py-1 text-[12.5px] transition", match === z ? "border-unit text-unit" : "border-line text-mute hover:text-ink")}>{z}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────── Horario en vivo ─────────── */

export function HoursCard({ className, night }: { className?: string; night?: boolean }) {
  const s = useOpenState();
  // No row is highlighted until the live clock is known (keeps the prebuilt HTML stable).
  const day = s.clock === "--:--" ? "" : new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short" }).format(new Date());
  const todayRow = !day ? -1 : day === "Sun" ? 2 : day === "Sat" ? 1 : 0;
  return (
    <div className={cn("rounded-[16px] border p-5", night ? "border-night-line bg-night-raised text-on-night" : "border-line bg-raised", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={cn("eyebrow", night ? "text-on-night-mute" : "text-mute")}>Hora en Ciudad de México</p>
          <p className="mt-1 font-mono text-[40px] font-medium leading-none tracking-tight tabular">{s.clock}</p>
        </div>
        <span className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12.5px] font-medium", s.open ? "bg-ok/10 text-ok" : night ? "bg-night text-on-night-mute" : "bg-sunken text-mute")}>
          <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", s.open ? "animate-pulse2 bg-ok" : "bg-line-strong")} />
          {s.headline}
        </span>
      </div>
      <p className={cn("mt-3 text-[14px]", night ? "text-on-night-mute" : "text-mute")}>{s.detail}</p>
      <dl className={cn("mt-5 divide-y border-y", night ? "divide-night-line border-night-line" : "divide-line border-line")}>
        {SITE.hours.map((h, i) => (
          <div key={h.day} className={cn("flex items-center justify-between py-2.5 text-[14px]", i === todayRow && "font-semibold")}>
            <dt className="flex items-center gap-2">
              {h.day}
              {i === todayRow && <span className={cn("eyebrow rounded-full px-2 py-0.5 text-[9.5px]", night ? "bg-night text-on-night-mute" : "bg-sunken text-mute")}>Hoy</span>}
            </dt>
            <dd className="font-mono tabular">{h.time}</dd>
          </div>
        ))}
      </dl>
      <p className={cn("mt-3 text-[12.5px] leading-snug", night ? "text-on-night-mute" : "text-mute")}>Las urgencias fuera de horario se evalúan según disponibilidad. No ofrecemos atención 24/7.</p>
    </div>
  );
}
