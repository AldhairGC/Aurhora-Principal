/*
  Google Consent Mode v2. Port of src/lib/analytics/consent.ts (feat/seo-medicion-semana1),
  reduced to the categories in the cookie policy: necessary, analytics and marketing.
  In production the default must run in <head> before GTM; here it runs on import, before
  the first render. Clarity is not loaded in the prototype.
*/

export type CookiePreferences = { analytics: boolean; marketing: boolean };

export const COOKIE_CONSENT_KEY = "aurhora_cookie_consent";
export const COOKIE_PREFERENCES_KEY = "aurhora_cookie_preferences";
/** Window event that reopens the settings panel (footer link). */
export const OPEN_COOKIE_SETTINGS_EVENT = "aurhora:open-cookie-settings";

type ConsentValue = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  // GTM only reads consent commands pushed as an `arguments` object, not as an array.
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments as unknown as Record<string, unknown>);
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

/** Everything denied by default; a saved choice is re-applied right away. */
export function initConsent() {
  gtag("consent", "default", {
    ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
    analytics_storage: "denied", functionality_storage: "denied",
    personalization_storage: "denied", security_storage: "granted",
    wait_for_update: 500,
  });
  gtag("set", "ads_data_redaction", true);
  gtag("set", "url_passthrough", true);
  const saved = readPreferences();
  if (saved) gtag("consent", "update", toConsentState(saved));
}

/** Store the choice, update Consent Mode and tell GTM. */
export function saveConsent(p: CookiePreferences) {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(p));
  } catch {
    /* storage blocked: the choice applies to this visit only */
  }
  gtag("consent", "update", toConsentState(p));
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "consent_update", consent_analytics: p.analytics, consent_marketing: p.marketing });
}

export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
