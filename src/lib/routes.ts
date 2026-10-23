import { PAGE_SEO, UNITS } from "@/content/site";
import { SERVICES } from "@/content/services";
import { ARTICLES } from "@/content/articles";
import { LEGAL_DOCS } from "@/content/legal";

/*
  Every page is a "view" id (grupo, facilities, aire-acondicionado…) with a real URL taken
  from its seo.slug. The components keep linking by view id; this table turns ids into
  paths and paths back into ids.
*/

const PAGES: [string, string][] = [
  ["grupo", PAGE_SEO.grupo.slug],
  ["nosotros", PAGE_SEO.nosotros.slug],
  ["recursos", PAGE_SEO.recursos.slug],
  ["contacto", PAGE_SEO.contacto.slug],
  ...UNITS.map((u): [string, string] => [u.id, u.seo.slug]),
  ...SERVICES.map((s): [string, string] => [s.id, s.seo.slug]),
  ...ARTICLES.map((a): [string, string] => [a.id, a.seo.slug]),
  ...LEGAL_DOCS.map((d): [string, string] => [d.id, d.seo.slug]),
];

const BY_VIEW = new Map(PAGES);
const BY_PATH = new Map(PAGES.map(([view, slug]) => [slug, view]));

/** Old view ids that were shared before a rename keep working. */
const ALIASES: Record<string, string> = { mantenimiento: "facilities" };

export const ALL_VIEWS = PAGES.map(([view]) => view);

export function slugOf(view: string): string {
  return BY_VIEW.get(ALIASES[view] ?? view) ?? "/";
}

/** View for a pathname, or undefined when the path is not a page of the site. */
export function viewOf(pathname: string): string | undefined {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return BY_PATH.get(clean || "/");
}
