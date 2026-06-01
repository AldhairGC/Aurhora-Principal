"use client";

/**
 * WhatsAppButton — botón flotante de contacto vía WhatsApp.
 *
 * Canal de cierre #1 para PyMEs en México (ver docs/MARKETING_STRATEGY.md §2.4).
 * Solo se renderiza si hay un número configurado en
 * NEXT_PUBLIC_WHATSAPP_NUMBER. Registra el evento `whatsapp_click` para medir
 * conversiones y alimentar el retargeting.
 */

import React from "react";
import { buildWhatsAppUrl } from "@/config/site.config";
import { trackEvent } from "@/lib/analytics/track";

const DEFAULT_MESSAGE =
  "Hola Aurhora 👋, me interesa conocer más sobre sus servicios.";

export function WhatsAppButton() {
  const href = buildWhatsAppUrl(DEFAULT_MESSAGE);

  // Sin número configurado → no mostramos un botón roto.
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      onClick={() =>
        trackEvent("whatsapp_click", {
          source: typeof window !== "undefined" ? window.location.pathname : "unknown",
        })
      }
      className="group fixed bottom-5 right-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-6px_rgba(37,211,102,0.6)] transition-transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 md:h-16 md:w-16"
    >
      {/* Logo de WhatsApp (marca registrada de Meta) */}
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7 md:h-8 md:w-8"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.148-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
      </svg>
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-ink px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 md:block">
        ¿Hablamos?
      </span>
    </a>
  );
}

export default WhatsAppButton;
