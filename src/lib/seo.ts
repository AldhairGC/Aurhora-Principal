import { PAGE_SEO, SITE, UNITS, unitById } from "@/content/site";
import { serviceById } from "@/content/services";
import { articleById } from "@/content/articles";
import { legalById } from "@/content/legal";
import { extrasOf, faqOf } from "@/content/extras";
import type { Seo } from "@/content/types";

/*
  Metadatos y datos estructurados por vista: generateMetadata() usa seoFor() y la página
  renderiza jsonLdFor() en un <script type="application/ld+json"> desde el servidor.
*/

export function seoFor(view: string): Seo {
  const s = serviceById(view);
  if (s) return s.seo;
  const u = UNITS.find((x) => x.id === view);
  if (u) return u.seo;
  const a = articleById(view);
  if (a) return a.seo;
  const d = legalById(view);
  if (d) return d.seo;
  return PAGE_SEO[view] ?? PAGE_SEO.grupo;
}

const abs = (slug: string) => SITE.url + (slug === "/" ? "" : slug);

const OPENING_HOURS = [
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "20:00" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "16:00" },
];

const AREA_LOCAL = [
  { "@type": "City", name: "Ciudad de México" },
  { "@type": "State", name: "Estado de México" },
  ...SITE.zones.map((z) => ({ "@type": "Place", name: z })),
];

const ORG_ID = `${SITE.url}/#organization`;
const unitId = (id: string) => `${SITE.url}/${id}#business`;

function organization() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: "Aurhora",
    url: SITE.url,
    logo: { "@type": "ImageObject", url: `${SITE.url}/logo.svg`, width: 100, height: 100 },
    email: SITE.email,
    telephone: SITE.phoneE164,
    contactPoint: [{ "@type": "ContactPoint", contactType: "customer service", telephone: SITE.phoneE164, email: SITE.email, areaServed: "MX", availableLanguage: ["es"] }],
    subOrganization: UNITS.map((u) => ({ "@id": unitId(u.id) })),
  };
}

function unitBusiness(id: string) {
  const u = unitById(id);
  const local = id !== "digital";
  return {
    "@type": local ? "HomeAndConstructionBusiness" : "ProfessionalService",
    "@id": unitId(id),
    name: u.full,
    description: u.seo.description,
    url: abs(u.seo.slug),
    telephone: SITE.phoneE164,
    email: SITE.email,
    parentOrganization: { "@id": ORG_ID },
    areaServed: local ? AREA_LOCAL : { "@type": "Country", name: "México" },
    openingHoursSpecification: OPENING_HOURS,
    address: { "@type": "PostalAddress", addressLocality: "Ciudad de México", addressCountry: "MX" },
  };
}

/** Authorized "Desde $X" prices as Offers (MXN, IVA included). Rows without an amount are skipped. */
function priceOffers(serviceId: string) {
  return (extrasOf(serviceId)?.prices ?? []).flatMap((p) => {
    const m = p.range.match(/\$([\d,]+)/);
    if (!m) return [];
    const minPrice = Number(m[1].replace(/,/g, ""));
    return [{
      "@type": "Offer",
      name: p.concept,
      ...(p.unit ? { description: p.unit } : {}),
      priceCurrency: "MXN",
      priceSpecification: { "@type": "PriceSpecification", minPrice, priceCurrency: "MXN", valueAddedTaxIncluded: true },
    }];
  });
}

function breadcrumbs(items: { name: string; slug: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.slug) })),
  };
}

export function jsonLdFor(view: string): Record<string, unknown> {
  const graph: unknown[] = [];
  const s = serviceById(view);
  if (s) {
    const u = unitById(s.unit);
    graph.push(
      {
        "@type": "Service",
        name: s.name,
        description: s.seo.description,
        url: abs(s.seo.slug),
        serviceType: s.name,
        provider: { "@id": unitId(s.unit) },
        areaServed: s.unit === "digital" ? { "@type": "Country", name: "México" } : AREA_LOCAL,
        offers: priceOffers(s.id),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: s.name,
          itemListElement: s.includes.map((i) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: i.title, description: i.desc } })),
        },
      },
      unitBusiness(s.unit),
      { "@type": "FAQPage", mainEntity: faqOf(s).map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
      breadcrumbs([{ name: "Aurhora Agency", slug: "/" }, { name: u.full, slug: u.seo.slug }, { name: s.name, slug: s.seo.slug }]),
    );
  } else if (UNITS.some((u) => u.id === view)) {
    const u = unitById(view);
    graph.push(unitBusiness(view), breadcrumbs([{ name: "Aurhora Agency", slug: "/" }, { name: u.full, slug: u.seo.slug }]));
  } else if (articleById(view)) {
    const a = articleById(view)!;
    graph.push(
      {
        "@type": "Article",
        headline: a.title,
        description: a.seo.description,
        url: abs(a.seo.slug),
        mainEntityOfPage: abs(a.seo.slug),
        datePublished: a.published,
        dateModified: a.updated ?? a.published,
        image: `${SITE.url}/opengraph-image`,
        inLanguage: "es-MX",
        author: { "@type": "Organization", "@id": ORG_ID, name: SITE.name, url: SITE.url },
        publisher: { "@id": ORG_ID },
        about: { "@type": "Service", name: serviceById(a.service)!.name, provider: { "@id": unitId(a.unit) } },
      },
      ...(a.faq ? [{ "@type": "FAQPage", mainEntity: a.faq.map(([q, ans]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: ans } })) }] : []),
      breadcrumbs([{ name: "Aurhora Agency", slug: "/" }, { name: "Recursos", slug: "/recursos" }, { name: a.title, slug: a.seo.slug }]),
    );
  } else if (legalById(view)) {
    const d = legalById(view)!;
    graph.push({ "@type": "WebPage", name: d.title, url: abs(d.seo.slug), inLanguage: "es-MX", publisher: { "@id": ORG_ID } });
  } else if (view === "recursos") {
    graph.push({ "@type": "CollectionPage", name: PAGE_SEO.recursos.title, url: abs("/recursos"), publisher: { "@id": ORG_ID } }, breadcrumbs([{ name: "Aurhora Agency", slug: "/" }, { name: "Recursos", slug: "/recursos" }]));
  } else if (view === "nosotros") {
    graph.push({ "@type": "AboutPage", name: PAGE_SEO.nosotros.title, url: abs("/nosotros"), about: { "@id": ORG_ID } }, organization());
  } else if (view === "mapa-del-sitio") {
    graph.push({ "@type": "WebPage", name: PAGE_SEO["mapa-del-sitio"].title, url: abs("/mapa-del-sitio"), inLanguage: "es-MX", publisher: { "@id": ORG_ID } }, breadcrumbs([{ name: "Aurhora Agency", slug: "/" }, { name: "Mapa del sitio", slug: "/mapa-del-sitio" }]));
  } else if (view === "contacto") {
    graph.push({ "@type": "ContactPage", name: PAGE_SEO.contacto.title, url: abs("/contacto"), about: { "@id": ORG_ID } });
  } else {
    graph.push(organization(), { "@type": "WebSite", "@id": `${SITE.url}/#website`, name: SITE.name, url: SITE.url, inLanguage: "es-MX", publisher: { "@id": ORG_ID } });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

