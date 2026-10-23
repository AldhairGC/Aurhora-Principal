import { SITE } from "@/content/site";

export type RequestData = {
  unit: string;
  service: string;
  space?: string;
  zone?: string;
  detail?: string;
  priority: string;
  date?: string;
  slot?: string;
  name?: string;
  origin?: string;
};

const CAMPAIGN_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

/** UTM context kept in memory for this visit only (the artifact gives no reliable storage). */
export const campaign: Record<string, string> = (() => {
  const out: Record<string, string> = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const k of CAMPAIGN_KEYS) {
      const v = params.get(k);
      if (v) out[k] = v.slice(0, 120);
    }
  } catch {
    /* no query string available */
  }
  return out;
})();

export function buildMessage(d: RequestData) {
  const lines = ["Hola, Aurhora. Me gustaría solicitar atención.", ""];
  if (d.name?.trim()) lines.push("Nombre: " + d.name.trim());
  lines.push("Unidad: " + d.unit, "Servicio: " + d.service);
  if (d.space) lines.push("Espacio: " + d.space);
  if (d.zone?.trim()) lines.push("Zona: " + d.zone.trim());
  if (d.detail?.trim()) lines.push("Necesidad: " + d.detail.trim());
  lines.push("Preferencia: " + d.priority);
  if (d.priority === "Tengo una fecha en mente") {
    if (d.date) lines.push("Día solicitado: " + d.date);
    if (d.slot) lines.push("Horario solicitado: " + d.slot);
    lines.push("(Pendiente de confirmar disponibilidad y cita.)");
  }
  if (d.origin) lines.push("", "Página de origen: " + d.origin);
  const attribution = Object.entries(campaign).map(([k, v]) => `${k}: ${v}`);
  if (attribution.length) lines.push("Referencia de campaña: " + attribution.join(" / "));
  return lines.join("\n");
}

export function whatsappUrl(text?: string) {
  return `https://wa.me/${SITE.whatsappNumber}${text ? "?text=" + encodeURIComponent(text) : ""}`;
}

/** Copy inside a click handler; falls back to selecting the given element's text. */
export async function copyText(text: string, fallbackEl?: HTMLElement | null) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    if (fallbackEl) {
      const range = document.createRange();
      range.selectNodeContents(fallbackEl);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
    return false;
  }
}
