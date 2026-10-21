import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { languageAlternates, PAGE_ROUTES, pageUrl } from "@/lib/seo/metadata";

// Fecha del último cambio de contenido. Actualizar al publicar cambios relevantes
// (no usar new Date(): cambiaría en cada build y Google dejaría de confiar en ella).
const CONTENT_UPDATED = new Date("2026-10-21");

export default function sitemap(): MetadataRoute.Sitemap {
  // Solo páginas públicas e indexables; /login queda fuera.
  return routing.locales.flatMap((locale) =>
    PAGE_ROUTES.map((route) => ({
      url: pageUrl(locale, route),
      lastModified: CONTENT_UPDATED,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : route.startsWith("/servicios") ? 0.8 : route === "/quienes-somos" ? 0.6 : 0.3,
      alternates: { languages: languageAlternates(route) },
    })),
  );
}
