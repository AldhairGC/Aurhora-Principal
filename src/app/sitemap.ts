import type { MetadataRoute } from "next";
import { SITE, UNITS } from "@/content/site";
import { SERVICES } from "@/content/services";
import { ARTICLES } from "@/content/articles";
import { LEGAL_DOCS } from "@/content/legal";
import { ALL_VIEWS, slugOf } from "@/lib/routes";

// Fecha del último cambio de contenido. Actualizar al publicar cambios relevantes
// (no usar new Date(): cambiaría en cada build y Google dejaría de confiar en ella).
const CONTENT_UPDATED = new Date("2026-10-23");

const UNIT_IDS = new Set<string>(UNITS.map((u) => u.id));
const SERVICE_IDS = new Set(SERVICES.map((s) => s.id));
const LEGAL_IDS = new Set(LEGAL_DOCS.map((d) => d.id));
const ARTICLE_DATES = new Map(ARTICLES.map((a) => [a.id, new Date(a.updated ?? a.published)]));

function priority(view: string) {
  if (view === "grupo") return 1;
  if (UNIT_IDS.has(view)) return 0.9;
  if (SERVICE_IDS.has(view)) return 0.8;
  if (ARTICLE_DATES.has(view)) return 0.6;
  if (LEGAL_IDS.has(view)) return 0.2;
  return 0.5;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return ALL_VIEWS.map((view) => {
    const slug = slugOf(view);
    return {
      url: SITE.url + (slug === "/" ? "" : slug),
      lastModified: ARTICLE_DATES.get(view) ?? CONTENT_UPDATED,
      changeFrequency: view === "grupo" || view === "recursos" ? "weekly" : "monthly",
      priority: priority(view),
    };
  });
}
