/**
 * site.config.ts — datos de contacto y canales de Aurhora.
 *
 * El número de WhatsApp se toma de la variable de entorno
 * `NEXT_PUBLIC_WHATSAPP_NUMBER` (formato internacional sin "+", espacios ni
 * guiones, p. ej. 52155XXXXXXXX). Si no está configurada, el botón flotante de
 * WhatsApp no se renderiza. Ver docs/MARKETING_STRATEGY.md §2.4.
 */

export const siteConfig = {
  email: "contacto@aurhora.agency",
  domain: "https://aurhora.agency",
  /** Número en formato internacional, solo dígitos (ej. "5215512345678"). */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  social: {
    linkedin: "https://linkedin.com/company/aurhora-agency",
    instagram: "https://instagram.com/aurhora.agency",
    facebook: "https://facebook.com/aurhora.agency",
  },
} as const;

/**
 * Construye el enlace wa.me con un mensaje pre-llenado.
 * Devuelve null si no hay número configurado.
 */
export function buildWhatsAppUrl(message?: string): string | null {
  const num = siteConfig.whatsappNumber.replace(/\D/g, "");
  if (!num) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${num}${text}`;
}
