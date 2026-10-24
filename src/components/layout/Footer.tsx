"use client";

import { useRef, useState } from "react";
import { Copy, Check, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/brand/Logo";
import { Link } from "@/lib/router";
import { SITE, UNITS } from "@/content/site";
import { copyText, whatsappUrl } from "@/lib/whatsapp";
import { OpenDot } from "./Header";
import { track } from "@/lib/analytics";
import { openCookieSettings } from "@/lib/analytics/consent";

export function CopyValue({ value, label, night }: { value: string; label: string; night?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);
  return (
    <span className="inline-flex items-center gap-2">
      <span ref={ref} className="select-all tabular">{value}</span>
      <button
        type="button"
        aria-label={`Copiar ${label}`}
        onClick={async () => {
          const ok = await copyText(value, ref.current);
          track(label === "Correo" ? "email_click" : "phone_click", { action: "copy" });
          setDone(true);
          toast(ok ? `${label} copiado` : `Seleccionamos el ${label.toLowerCase()} para que lo copies`);
          setTimeout(() => setDone(false), 1600);
        }}
        className={night ? "grid h-7 w-7 place-items-center rounded-full text-on-night-mute hover:bg-night-raised hover:text-on-night" : "grid h-7 w-7 place-items-center rounded-full text-mute hover:bg-sunken hover:text-ink"}
      >
        {done ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
      </button>
    </span>
  );
}

export function Footer() {
  return (
    <footer className="gutter bg-night pb-10 pt-16 text-on-night">
      <div className="wrap">
        <div className="grid gap-12 border-b border-night-line pb-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <Logo onNight className="h-9" />
            <p className="mt-5 max-w-[30ch] text-[18px] font-medium leading-snug text-on-night">
              Tú disfruta el resultado. Nosotros nos encargamos de lo complejo.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow text-on-night-mute">Especialidades</p>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {UNITS.map((u) => (
                <li key={u.id}>
                  <Link to={u.id} className="text-on-night-mute transition hover:text-on-night">{u.full}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow text-on-night-mute">Agencia</p>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {[["nosotros", "Nosotros"], ["recursos", "Recursos"], ["galeria", "Galería"], ["mapa-del-sitio", "Mapa del sitio"], ["contacto", "Solicitar atención"]].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-on-night-mute transition hover:text-on-night">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow text-on-night-mute">Conversemos</p>
            <ul className="mt-4 space-y-2.5 text-[15px] text-on-night-mute">
              <li>
                <a href={whatsappUrl()} onClick={() => track("whatsapp_click", { source: "footer" })} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-on-night hover:underline">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
                </a>
              </li>
              <li><CopyValue value={SITE.phoneDisplay} label="Teléfono" night /></li>
              <li><CopyValue value={SITE.email} label="Correo" night /></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow text-on-night-mute">Atención</p>
            <dl className="mt-4 space-y-2 text-[14px]">
              {SITE.hours.map((h) => (
                <div key={h.day}>
                  <dt className="text-on-night-mute">{h.day}</dt>
                  <dd className="tabular text-on-night">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-[13px] text-on-night-mute md:flex-row md:items-center md:justify-between">
          <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© 2026 Aurhora · México</span>
            {[["privacidad", "Aviso de privacidad"], ["terminos", "Términos"], ["cookies", "Cookies"]].map(([to, label]) => (
              <Link key={to} to={to} className="transition hover:text-on-night">{label}</Link>
            ))}
            <button type="button" onClick={openCookieSettings} className="transition hover:text-on-night">Preferencias de cookies</button>
          </span>
          <OpenDot night />
          <span className="eyebrow">aurhora.agency</span>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl("Hola, Aurhora. Me gustaría recibir orientación.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      onClick={() => track("whatsapp_click", { source: "boton_flotante" })}
      className="fixed z-40 grid h-14 w-14 place-items-center rounded-full bg-[#1f9d55] text-white shadow-[0_12px_32px_-8px_rgba(9,9,11,0.45)] transition hover:scale-105"
      style={{
        right: "calc(20px + env(safe-area-inset-right, 0px))",
        bottom: "calc(20px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
