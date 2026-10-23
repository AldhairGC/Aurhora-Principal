/**
 * consent.ts — Google Consent Mode v2 para Aurhora.
 *
 * 1. `CONSENT_DEFAULT_SCRIPT` se inyecta en <head> ANTES de GTM: declara todo
 *    como "denied" y, si la persona ya eligió antes, aplica su elección guardada.
 * 2. El banner (CookieBanner) llama `saveConsent()` cuando la persona decide.
 * 3. GA4, Google Ads, Meta, etc. se configuran SOLO en GTM y respetan este estado.
 *    Clarity no lee Consent Mode, así que se carga aquí únicamente con consentimiento
 *    de analítica.
 *
 * Categorías de la Política de cookies: necesarias (siempre), analítica y marketing.
 */

export type CookiePreferences = { analytics: boolean; marketing: boolean };

export const COOKIE_CONSENT_KEY = "aurhora_cookie_consent";
export const COOKIE_PREFERENCES_KEY = "aurhora_cookie_preferences";
/** Evento de ventana para reabrir el panel de preferencias (enlace del pie). */
export const OPEN_COOKIE_SETTINGS_EVENT = "aurhora:open-cookie-settings";

const CLARITY_ID = "rxjrrdz9v5";

type ConsentValue = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

const g = (on: boolean): ConsentValue => (on ? "granted" : "denied");

export function toConsentState(p: CookiePreferences): Record<string, ConsentValue> {
  return {
    analytics_storage: g(p.analytics),
    ad_storage: g(p.marketing),
    ad_user_data: g(p.marketing),
    ad_personalization: g(p.marketing),
  };
}

/** Inline script para <head>. Debe ejecutarse antes del snippet de GTM. */
export const CONSENT_DEFAULT_SCRIPT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  analytics_storage: 'denied', functionality_storage: 'denied',
  personalization_storage: 'denied', security_storage: 'granted',
  wait_for_update: 500
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);
try {
  var p = JSON.parse(localStorage.getItem('${COOKIE_PREFERENCES_KEY}') || 'null');
  if (p && localStorage.getItem('${COOKIE_CONSENT_KEY}')) {
    var c = function (on) { return on ? 'granted' : 'denied'; };
    gtag('consent', 'update', {
      analytics_storage: c(p.analytics), ad_storage: c(p.marketing),
      ad_user_data: c(p.marketing), ad_personalization: c(p.marketing)
    });
  }
} catch (e) {}
`;

function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  // GTM only reads consent commands pushed as an `arguments` object, not as an array.
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments as unknown as Record<string, unknown>);
}

function loadClarity() {
  if (typeof window === "undefined" || window.clarity) return;
  const fn = ((...args: unknown[]) => {
    (fn.q = fn.q || []).push(args);
  }) as ((...args: unknown[]) => void) & { q?: unknown[] };
  window.clarity = fn;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(script);
}

/** Saved choice, or null when the visitor has not decided (or storage is blocked). */
export function readPreferences(): CookiePreferences | null {
  try {
    if (!localStorage.getItem(COOKIE_CONSENT_KEY)) return null;
    const p = JSON.parse(localStorage.getItem(COOKIE_PREFERENCES_KEY) || "null");
    return p ? { analytics: !!p.analytics, marketing: !!p.marketing } : null;
  } catch {
    return null;
  }
}

/** Loads what Consent Mode does not cover for a choice already made (on page load). */
export function applySavedConsent() {
  if (readPreferences()?.analytics) loadClarity();
}

/** Store the choice, update Consent Mode, tell GTM and load Clarity if allowed. */
export function saveConsent(p: CookiePreferences) {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(p));
  } catch {
    /* storage blocked: the choice applies to this visit only */
  }
  (window.gtag ?? gtag)("consent", "update", toConsentState(p));
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "consent_update", consent_analytics: p.analytics, consent_marketing: p.marketing });
  if (p.analytics) loadClarity();
}

export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
