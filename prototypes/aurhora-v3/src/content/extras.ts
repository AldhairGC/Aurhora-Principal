import type { Service, ServiceExtras } from "./types";
import { FACILITIES_EXTRAS } from "./extras-facilities";
import { INTEGRA_EXTRAS } from "./extras-integra";
import { DIGITAL_EXTRAS } from "./extras-digital";

/*
  Precios "Desde" autorizados por Aurhora el 23 de octubre de 2026: el límite inferior de los
  rangos de mercado de CDMX y Estado de México. Ver docs/GUIA_DE_MARCA.md (sección Voz).
*/
export const PRICE_NOTE =
  "Precios desde, en pesos mexicanos, más IVA. El precio final se confirma en la cotización, después de revisar tu caso.";

export const EXTRAS: Record<string, ServiceExtras> = {
  ...FACILITIES_EXTRAS,
  ...INTEGRA_EXTRAS,
  ...DIGITAL_EXTRAS,
};

export const extrasOf = (id: string) => EXTRAS[id];

/** FAQ completa del servicio (base + costo, tiempo y alcance). */
export const faqOf = (s: Service): [string, string][] => [...s.faq, ...(EXTRAS[s.id]?.faq ?? [])];
