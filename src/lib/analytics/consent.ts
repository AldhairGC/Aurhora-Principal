/**
 * consent.ts — Google Consent Mode v2 para Aurhora.
 *
 * 1. `CONSENT_DEFAULT_SCRIPT` se inyecta en <head> ANTES de GTM: declara todo
 *    como "denied" y, si la persona ya eligió antes, aplica su elección guardada.
 * 2. El banner (CookieConsent) llama `applyConsent()` cuando la persona decide.
 * 3. GA4, Google Ads, Meta, etc. se configuran SOLO en GTM y respetan este estado.
 *    Clarity no lee Consent Mode, así que se carga aquí únicamente con consentimiento
 *    de analítica.
 */

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export const COOKIE_CONSENT_KEY = "aurhora_cookie_consent";
export const COOKIE_PREFERENCES_KEY = "aurhora_cookie_preferences";
/** Evento de ventana para reabrir el panel de preferencias (p. ej. desde el footer). */
export const OPEN_COOKIE_SETTINGS_EVENT = "aurhora:open-cookie-settings";

const CLARITY_ID = "rxjrrdz9v5";

type ConsentValue = "granted" | "denied";

export function toConsentState(prefs: CookiePreferences): Record<string, ConsentValue> {
  const v = (on: boolean): ConsentValue => (on ? "granted" : "denied");
  return {
    analytics_storage: v(prefs.analytics),
    ad_storage: v(prefs.marketing),
    ad_user_data: v(prefs.marketing),
    ad_personalization: v(prefs.marketing),
    functionality_storage: v(prefs.functional),
    personalization_storage: v(prefs.functional),
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
    var g = function (on) { return on ? 'granted' : 'denied'; };
    gtag('consent', 'update', {
      analytics_storage: g(p.analytics), ad_storage: g(p.marketing),
      ad_user_data: g(p.marketing), ad_personalization: g(p.marketing),
      functionality_storage: g(p.functional), personalization_storage: g(p.functional)
    });
  }
} catch (e) {}
`;

function loadClarity() {
  if (typeof window === "undefined" || window.clarity) return;
  const c = window as Window & { clarity?: ((...args: unknown[]) => void) & { q?: unknown[] } };
  const fn = ((...args: unknown[]) => {
    (fn.q = fn.q || []).push(args);
  }) as ((...args: unknown[]) => void) & { q?: unknown[] };
  c.clarity = fn;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(script);
}

/** Actualiza Consent Mode, avisa a GTM y carga lo que dependa del consentimiento. */
export function applyConsent(prefs: CookiePreferences) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // GTM only reads consent commands pushed as an `arguments` object, not as an array.
  const gtag =
    window.gtag ??
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  gtag("consent", "update", toConsentState(prefs));
  window.dataLayer.push({
    event: "consent_update",
    consent_analytics: prefs.analytics,
    consent_marketing: prefs.marketing,
    consent_functional: prefs.functional,
  });
  if (prefs.analytics) loadClarity();
}
