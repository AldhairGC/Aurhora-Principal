/**
 * Atribución de leads para Brevo (lado servidor).
 * Recibe lo que envía el formulario (`getAttribution()` en el navegador), lo limpia
 * y lo convierte en texto para el deal/correo y en atributos de contacto.
 */
import { ATTRIBUTION_KEYS, type Attribution } from "@/lib/analytics/attribution";

export interface LeadAttribution {
  last?: Attribution;
  first?: Attribution;
  page?: string;
}

const TOUCH_KEYS = [...ATTRIBUTION_KEYS, "landing_page", "referrer", "captured_at"] as const;

const clean = (v: unknown, max = 200) =>
  typeof v === "string" && v.trim() ? v.trim().slice(0, max) : undefined;

function sanitizeTouch(value: unknown): Attribution | undefined {
  if (!value || typeof value !== "object") return undefined;
  const src = value as Record<string, unknown>;
  const out: Attribution = {};
  for (const key of TOUCH_KEYS) {
    const v = clean(src[key]);
    if (v) out[key] = v;
  }
  return Object.keys(out).length ? out : undefined;
}

/** Acepta solo las llaves conocidas y textos cortos; ignora todo lo demás. */
export function sanitizeAttribution(value: unknown): LeadAttribution {
  if (!value || typeof value !== "object") return {};
  const src = value as Record<string, unknown>;
  const last = sanitizeTouch(src.last);
  const first = sanitizeTouch(src.first);
  const page = clean(src.page);
  return { ...(last ? { last } : {}), ...(first ? { first } : {}), ...(page ? { page } : {}) };
}

const clickId = (t?: Attribution) => t?.gclid || t?.gbraid || t?.wbraid;

/** Pares etiqueta/valor legibles para el correo al equipo y la descripción del deal. */
export function attributionRows(a: LeadAttribution, plan?: string): [string, string][] {
  const t = a.last;
  const rows: [string, string | undefined][] = [
    ["Plan", plan],
    ["Página del formulario", a.page],
    ["utm_source", t?.utm_source],
    ["utm_medium", t?.utm_medium],
    ["utm_campaign", t?.utm_campaign],
    ["utm_content", t?.utm_content],
    ["utm_term", t?.utm_term],
    ["Google Ads (gclid)", clickId(t)],
    ["Meta (fbclid)", t?.fbclid],
    ["Página de entrada", t?.landing_page],
    ["Referrer", t?.referrer],
    ["Primer contacto: fuente", a.first ? [a.first.utm_source, a.first.utm_medium].filter(Boolean).join(" / ") || a.first.referrer : undefined],
    ["Primer contacto: campaña", a.first?.utm_campaign],
  ];
  return rows.filter((r): r is [string, string] => Boolean(r[1]));
}

/**
 * Atributos de contacto de Brevo. Créalos en Brevo → Contactos → Configuración →
 * Atributos de contacto (tipo texto) con estos nombres exactos.
 */
export function attributionToBrevoAttributes(a: LeadAttribution, plan?: string): Record<string, string> {
  const t = a.last;
  const attrs: Record<string, string | undefined> = {
    UTM_SOURCE: t?.utm_source,
    UTM_MEDIUM: t?.utm_medium,
    UTM_CAMPAIGN: t?.utm_campaign,
    UTM_CONTENT: t?.utm_content,
    UTM_TERM: t?.utm_term,
    GCLID: clickId(t),
    FBCLID: t?.fbclid,
    LANDING_PAGE: t?.landing_page,
    REFERRER: t?.referrer,
    PAGINA_FORMULARIO: a.page,
    UTM_SOURCE_FIRST: a.first?.utm_source,
    UTM_CAMPAIGN_FIRST: a.first?.utm_campaign,
    PLAN: plan,
  };
  return Object.fromEntries(Object.entries(attrs).filter((e): e is [string, string] => Boolean(e[1])));
}
