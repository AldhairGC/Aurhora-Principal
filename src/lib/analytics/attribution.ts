/**
 * attribution.ts — captura el origen de cada visita (UTM, IDs de clic, página de
 * entrada) para enviarlo con el formulario de contacto y guardarlo en Brevo.
 *
 * - Último toque de la sesión: sessionStorage (dura lo que la visita).
 * - Primer toque: localStorage por 90 días, SOLO si hay consentimiento de marketing.
 * Ver docs/SEO_ANALYTICS_V3.md §3 "Atribución hasta el CRM".
 */
import { COOKIE_PREFERENCES_KEY } from "./consent";

export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
] as const;

export type Attribution = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>> & {
  landing_page?: string;
  referrer?: string;
  captured_at?: string;
};

const SESSION_KEY = "aurhora_attribution";
const FIRST_TOUCH_KEY = "aurhora_attribution_first";
const FIRST_TOUCH_TTL_MS = 90 * 24 * 60 * 60 * 1000;

const clip = (v: string) => v.slice(0, 200);

function hasMarketingConsent(): boolean {
  try {
    const prefs = JSON.parse(localStorage.getItem(COOKIE_PREFERENCES_KEY) || "null");
    return Boolean(prefs?.marketing);
  } catch {
    return false;
  }
}

function read(storage: Storage, key: string): Attribution | null {
  try {
    const raw = storage.getItem(key);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

/** Llamar una vez por carga de página. Solo guarda algo si la visita trae datos de campaña o un referrer externo. */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const found: Attribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const v = params.get(key);
    if (v) found[key] = clip(v);
  }

  let externalReferrer = "";
  try {
    if (document.referrer && new URL(document.referrer).hostname !== window.location.hostname) {
      externalReferrer = clip(document.referrer);
    }
  } catch {
    /* referrer malformado */
  }

  const hasCampaign = Object.keys(found).length > 0;
  if (!hasCampaign && !externalReferrer) return;

  const touch: Attribution = {
    ...found,
    landing_page: clip(window.location.pathname),
    referrer: externalReferrer || undefined,
    captured_at: new Date().toISOString(),
  };

  try {
    // Una visita nueva con campaña reemplaza el último toque; un simple referrer no pisa una campaña.
    const current = read(sessionStorage, SESSION_KEY);
    if (hasCampaign || !current) sessionStorage.setItem(SESSION_KEY, JSON.stringify(touch));

    if (hasMarketingConsent()) {
      const first = read(localStorage, FIRST_TOUCH_KEY);
      const expired = !first?.captured_at || Date.now() - Date.parse(first.captured_at) > FIRST_TOUCH_TTL_MS;
      if (expired) localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(touch));
    }
  } catch {
    /* almacenamiento bloqueado: la visita sigue sin atribución */
  }
}

/** Datos para enviar con el formulario: último toque de la sesión y, si existe, el primer toque. */
export function getAttribution(): { last?: Attribution; first?: Attribution; page?: string } {
  if (typeof window === "undefined") return {};
  let last: Attribution | null = null;
  let first: Attribution | null = null;
  try {
    last = read(sessionStorage, SESSION_KEY);
    first = hasMarketingConsent() ? read(localStorage, FIRST_TOUCH_KEY) : null;
  } catch {
    /* almacenamiento bloqueado */
  }
  return {
    ...(last ? { last } : {}),
    ...(first ? { first } : {}),
    page: clip(window.location.pathname),
  };
}
