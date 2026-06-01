/**
 * track.ts — capa de medición de Aurhora.
 *
 * Empuja eventos al `dataLayer` de Google Tag Manager (cargado en
 * `app/layout.tsx`). Desde GTM se reenvían a GA4, Meta Pixel, Google Ads, etc.
 * sin tocar más código. Es seguro en SSR: si no hay `window`, no hace nada.
 *
 * Convención de nombres de evento: snake_case. Ver docs/MARKETING_STRATEGY.md §2.1.
 */

export type AnalyticsEvent =
  | "contact_submit"
  | "demo_scheduled"
  | "plan_selected"
  | "whatsapp_click"
  | "view_pricing"
  | "phone_click"
  | "email_click";

export type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Empuja un evento al dataLayer. No-op fuera del navegador.
 */
export function trackEvent(event: AnalyticsEvent, params: EventParams = {}): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    // Limpia valores undefined para no ensuciar el dataLayer
    ...Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined)),
  });
}
