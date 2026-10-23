/*
  Capa de medición. Mismo contrato que src/lib/analytics/track.ts del sitio en producción:
  todo se empuja a window.dataLayer y Google Tag Manager decide qué etiqueta dispara.
  En el artifact no hay GTM (el visor bloquea scripts externos), así que los eventos solo
  se registran localmente y se pueden revisar en la "Ficha SEO y medición".

  Taxonomía (ver docs/SEO_ANALYTICS_V3.md):
  - page_view        { page_path, page_title, content_group }       vista virtual
  - generate_lead    { method, unit, service, priority, source }    conversión principal
  - whatsapp_click   { source, unit?, service? }                    conversión secundaria
  - phone_click / email_click { action: "copy" }
  - form_progress    { form, step }
  - select_content   { content_type, content_id }                   uso de herramientas
*/

export type EventName = "page_view" | "generate_lead" | "whatsapp_click" | "phone_click" | "email_click" | "form_progress" | "select_content";
export type EventParams = Record<string, string | number | boolean | undefined>;
export type LoggedEvent = { event: EventName; params: EventParams; at: number };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const log: LoggedEvent[] = [];
const listeners = new Set<() => void>();

export function track(event: EventName, params: EventParams = {}) {
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== ""));
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...clean });
  } catch {
    /* dataLayer unavailable */
  }
  log.unshift({ event, params: clean, at: Date.now() });
  if (log.length > 60) log.length = 60;
  listeners.forEach((l) => l());
}

export function getEventLog() {
  return log;
}

export function subscribeEvents(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
