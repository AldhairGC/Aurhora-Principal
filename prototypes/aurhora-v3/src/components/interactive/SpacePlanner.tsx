import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AirVent, Cctv, Lightbulb, Lock, Phone, Router, ShieldCheck, Speaker, Tv, Wifi, type LucideIcon } from "lucide-react";
import { Link } from "@/lib/router";
import { serviceById } from "@/content/services";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";


type Device = { icon: LucideIcon; label: string; service: string };
type Zone = { id: string; label: string; note: string; devices: Device[] };
type Segment = "residencia" | "negocio";

const RECTS: Record<string, { x: number; y: number; w: number; h: number }> = {
  a: { x: 16, y: 16, w: 150, h: 118 },
  b: { x: 176, y: 16, w: 208, h: 154 },
  c: { x: 16, y: 144, w: 150, h: 140 },
  d: { x: 176, y: 180, w: 208, h: 104 },
};

const ZONES: Record<Segment, Record<string, Zone>> = {
  residencia: {
    a: { id: "a", label: "Acceso y cochera", note: "Quién llega y cuándo, aunque no estés.", devices: [
      { icon: Cctv, label: "Cámara exterior con consulta remota", service: "seguridad-accesos" },
      { icon: Lock, label: "Chapa inteligente o videoportero", service: "seguridad-accesos" },
      { icon: ShieldCheck, label: "Cerco electrificado en perímetro", service: "seguridad-accesos" },
    ] },
    b: { id: "b", label: "Sala y comedor", note: "Ambiente que cambia con un toque.", devices: [
      { icon: Speaker, label: "Audio por zonas", service: "audio-video" },
      { icon: Tv, label: "Pantalla con cableado oculto", service: "audio-video" },
      { icon: Lightbulb, label: "Escenas de iluminación y clima", service: "domotica" },
    ] },
    c: { id: "c", label: "Recámaras y estudio", note: "Señal estable para trabajar y descansar.", devices: [
      { icon: Wifi, label: "Punto de acceso WiFi", service: "redes" },
      { icon: Router, label: "Red cableada para el estudio", service: "redes" },
      { icon: AirVent, label: "Minisplit con mantenimiento", service: "aire-acondicionado" },
    ] },
    d: { id: "d", label: "Jardín y terraza", note: "Vigilancia, audio y luz para el exterior.", devices: [
      { icon: Cctv, label: "Cámara con visión nocturna", service: "seguridad-accesos" },
      { icon: Speaker, label: "Audio exterior", service: "audio-video" },
      { icon: Lightbulb, label: "Iluminación programada", service: "domotica" },
    ] },
  },
  negocio: {
    a: { id: "a", label: "Entrada y fachada", note: "Accesos supervisados en horario y fuera de él.", devices: [
      { icon: Cctv, label: "Cámaras en accesos", service: "seguridad-accesos" },
      { icon: Lock, label: "Control de acceso para personal", service: "seguridad-accesos" },
      { icon: ShieldCheck, label: "Alarma con aviso al teléfono", service: "seguridad-accesos" },
    ] },
    b: { id: "b", label: "Área de clientes", note: "Conexión y ambiente para tus clientes.", devices: [
      { icon: Wifi, label: "WiFi para clientes en red separada", service: "redes" },
      { icon: Speaker, label: "Audio ambiental", service: "audio-video" },
      { icon: Tv, label: "Pantallas de menú o promociones", service: "audio-video" },
    ] },
    c: { id: "c", label: "Caja y mostrador", note: "Lo que no puede fallar durante el día.", devices: [
      { icon: Cctv, label: "Cámara sobre caja", service: "seguridad-accesos" },
      { icon: Router, label: "Red dedicada para la terminal", service: "redes" },
      { icon: Phone, label: "Telefonía y extensiones", service: "redes" },
    ] },
    d: { id: "d", label: "Bodega y oficina", note: "Inventario y operación protegidos.", devices: [
      { icon: ShieldCheck, label: "Sensores de apertura", service: "seguridad-accesos" },
      { icon: Router, label: "Red cableada para equipos", service: "redes" },
      { icon: AirVent, label: "Clima y luces con horario automático", service: "domotica" },
    ] },
  },
};

export function SpacePlanner({ className, defaultSegment = "residencia" }: { className?: string; defaultSegment?: Segment }) {
  const [segment, setSegment] = useState<Segment>(defaultSegment);
  const [zoneId, setZoneId] = useState("a");
  const zones = ZONES[segment];
  const zone = zones[zoneId];

  return (
    <div data-unit="integra" className={cn("grid gap-5 rounded-[24px] border border-night-line bg-night-raised p-4 text-on-night md:p-6 lg:grid-cols-[1.15fr_1fr]", className)}>
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div role="group" aria-label="Tipo de espacio" className="inline-flex rounded-full border border-night-line p-1">
            {(["residencia", "negocio"] as Segment[]).map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={segment === s}
                onClick={() => setSegment(s)}
                className={cn("rounded-full px-4 py-1.5 text-[13px] font-medium capitalize transition", segment === s ? "bg-on-night text-night" : "text-on-night-mute hover:text-on-night")}
              >
                {s}
              </button>
            ))}
          </div>
          <span className="eyebrow text-on-night-mute">Esquema ilustrativo · toca un área</span>
        </div>

        <svg viewBox="0 0 400 300" className="h-auto w-full max-w-full" role="group" aria-label={`Plano ilustrativo de ${segment}`}>
          <defs>
            <pattern id="plan-grid" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M16 0H0V16" fill="none" className="stroke-night-line" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="400" height="300" rx="14" fill="url(#plan-grid)" />
          {Object.entries(RECTS).map(([id, r]) => {
            const active = id === zoneId;
            return (
              <g key={id} className="cursor-pointer" onClick={() => { setZoneId(id); track("select_content", { content_type: "space_zone", content_id: `${segment}_${zones[id].label}` }); }} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setZoneId(id); } }} tabIndex={0} role="button" aria-pressed={active} aria-label={zones[id].label}>
                <rect
                  x={r.x}
                  y={r.y}
                  width={r.w}
                  height={r.h}
                  rx="6"
                  strokeWidth={active ? 1.6 : 1}
                  className={cn("transition-all duration-300", active ? "fill-unit-night/15 stroke-unit-night" : "fill-night/60 stroke-on-night-mute/50")}
                />
                <text x={r.x + 10} y={r.y + 20} className={active ? "fill-on-night" : "fill-on-night-mute"} fontSize="10.5" fontFamily="Geist Mono, monospace" letterSpacing="0.6">
                  {zones[id].label.toUpperCase()}
                </text>
                {zones[id].devices.map((_d, i) => {
                  const cx = r.x + 26 + i * ((r.w - 52) / 2);
                  const cy = r.y + r.h - 30;
                  return (
                    <g key={i}>
                      {active && <circle cx={cx} cy={cy} r="15" className="fill-unit-night/20 motion-safe:animate-pulse2" />}
                      <circle cx={cx} cy={cy} r="7" className={cn("stroke-unit-night", active ? "fill-unit-night" : "fill-night-raised")} strokeWidth="1.2" />
                    </g>
                  );
                })}
              </g>
            );
          })}
          {/* door gaps */}
          <rect x="166" y="60" width="10" height="26" className="fill-night-raised" />
          <rect x="60" y="134" width="30" height="10" className="fill-night-raised" />
        </svg>
      </div>

      <div className="flex min-w-0 flex-col rounded-[16px] border border-night-line bg-night p-5" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div key={segment + zoneId} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }} className="flex h-full flex-col">
            <p className="eyebrow text-unit-night">{segment === "residencia" ? "Tu casa" : "Tu negocio"} · {zone.label}</p>
            <h3 className="mt-3 font-display text-[22px] font-semibold leading-tight tracking-tight">{zone.note}</h3>
            <ul className="mt-5 flex flex-col gap-2">
              {zone.devices.map((d) => {
                const s = serviceById(d.service)!;
                return (
                  <li key={d.label}>
                    <Link to={d.service} className="group flex items-center gap-3 rounded-[12px] border border-night-line px-3 py-3 transition hover:border-unit-night/60 hover:bg-night-raised">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[8px] bg-unit-night/15 text-unit-night">
                        <d.icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[14px] font-medium leading-snug">{d.label}</span>
                        <span className="block text-[12px] text-on-night-mute">{s.unit === "facilities" ? "Aurhora Facilities" : s.name}</span>
                      </span>
                      <span aria-hidden="true" className="ml-auto text-on-night-mute transition group-hover:translate-x-0.5 group-hover:text-on-night">→</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mt-auto pt-5 text-[12px] leading-snug text-on-night-mute">Cada propuesta se define después del levantamiento. Este esquema muestra combinaciones posibles.</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
