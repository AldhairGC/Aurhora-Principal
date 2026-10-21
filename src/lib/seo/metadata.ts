import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const BASE_URL = "https://aurhora.agency";
const SITE_NAME = "Aurhora Agency";

type Locale = (typeof routing.locales)[number];

const HREFLANG: Record<Locale, string> = { es: "es-MX", en: "en-US", pt: "pt-BR" };
const OG_LOCALE: Record<Locale, string> = { es: "es_MX", en: "en_US", pt: "pt_BR" };

/** Rutas públicas del sitio (sin prefijo de idioma). También alimentan el sitemap. */
export const PAGE_ROUTES = [
  "",
  "/quienes-somos",
  "/servicios/godigital",
  "/servicios/transformacion-digital",
  "/servicios/desarrollo-software",
  "/servicios/impulso-marketing",
  "/aviso-privacidad",
  "/terminos-condiciones",
] as const;

export type PageRoute = (typeof PAGE_ROUTES)[number] | "/login";

interface PageSEO {
  title: string;
  description: string;
  keywords?: string[];
}

/*
  Title: 50–65 caracteres con la marca. Description: 120–160 caracteres.
  Mantener alineado con docs/SEO_ANALYTICS_V3.md.
*/
const PAGE_SEO: Record<PageRoute, Record<Locale, PageSEO>> = {
  "": {
    es: {
      title: "Aurhora Agency | Transformación digital, IA y software",
      description: "Socio estratégico en transformación digital: inteligencia artificial, desarrollo de software, automatización y marketing para empresas en México.",
      keywords: ["transformación digital", "inteligencia artificial para empresas", "desarrollo de software", "automatización de procesos", "agencia digital México"],
    },
    en: {
      title: "Aurhora Agency | Digital transformation, AI and software",
      description: "Strategic partner for digital transformation: artificial intelligence, software development, automation and marketing for companies in Mexico.",
      keywords: ["digital transformation", "AI for business", "software development", "process automation", "digital agency Mexico"],
    },
    pt: {
      title: "Aurhora Agency | Transformação digital, IA e software",
      description: "Parceiro estratégico em transformação digital: inteligência artificial, desenvolvimento de software, automação e marketing para empresas.",
      keywords: ["transformação digital", "inteligência artificial para empresas", "desenvolvimento de software", "automação de processos"],
    },
  },
  "/quienes-somos": {
    es: {
      title: "Quiénes somos | Aurhora Agency",
      description: "Conoce a Aurhora Agency: un equipo con más de 10 años liderando tecnología en seguros, fintech y otras industrias, enfocado en soluciones que generan cambio real.",
    },
    en: {
      title: "About us | Aurhora Agency",
      description: "Meet Aurhora Agency: a team with over 10 years leading technology in insurance, fintech and other industries, focused on solutions that drive real change.",
    },
    pt: {
      title: "Quem somos | Aurhora Agency",
      description: "Conheça a Aurhora Agency: uma equipe com mais de 10 anos liderando tecnologia em seguros, fintech e outros setores, focada em soluções que geram mudança.",
    },
  },
  "/servicios/godigital": {
    es: {
      title: "GoDigital Suite: sitio web, CRM y agenda | Aurhora Agency",
      description: "Ecosistema digital llave en mano para tu negocio: sitio web, gestión de clientes, agendamiento y acompañamiento para crecer en línea de forma simple.",
      keywords: ["godigital suite", "página web para negocio", "crm para pymes", "agenda en línea", "presencia digital"],
    },
    en: {
      title: "GoDigital Suite: website, CRM and booking | Aurhora Agency",
      description: "A turnkey digital ecosystem for your business: website, customer management, online booking and guidance to grow online in a simple way.",
      keywords: ["godigital suite", "small business website", "crm for smb", "online booking"],
    },
    pt: {
      title: "GoDigital Suite: site, CRM e agenda | Aurhora Agency",
      description: "Ecossistema digital completo para o seu negócio: site, gestão de clientes, agendamento online e acompanhamento para crescer na internet de forma simples.",
      keywords: ["godigital suite", "site para empresa", "crm para pequenas empresas", "agenda online"],
    },
  },
  "/servicios/transformacion-digital": {
    es: {
      title: "Transformación digital e inteligencia artificial | Aurhora",
      description: "Diseñamos e implementamos tu hoja de ruta digital con IA: identificamos oportunidades, automatizamos procesos y aceleramos la adopción en tu empresa.",
      keywords: ["transformación digital", "consultoría en inteligencia artificial", "agentes de IA", "automatización de procesos", "estrategia de innovación"],
    },
    en: {
      title: "Digital transformation and artificial intelligence | Aurhora",
      description: "We design and implement your AI-driven digital roadmap: we find opportunities, automate processes and accelerate adoption across your company.",
      keywords: ["digital transformation", "AI consulting", "AI agents", "process automation"],
    },
    pt: {
      title: "Transformação digital e inteligência artificial | Aurhora",
      description: "Desenhamos e implementamos seu roteiro digital com IA: identificamos oportunidades, automatizamos processos e aceleramos a adoção na sua empresa.",
      keywords: ["transformação digital", "consultoria em inteligência artificial", "agentes de IA", "automação de processos"],
    },
  },
  "/servicios/desarrollo-software": {
    es: {
      title: "Desarrollo de software a la medida con IA | Aurhora Agency",
      description: "Aplicaciones web, plataformas y productos digitales con inteligencia artificial integrada desde el diseño, centrados en el usuario y listos para escalar.",
      keywords: ["desarrollo de software a la medida", "desarrollo de aplicaciones web", "software con inteligencia artificial", "productos digitales"],
    },
    en: {
      title: "Custom software development with AI | Aurhora Agency",
      description: "Web applications, platforms and digital products with artificial intelligence built in from the design phase, user-centered and ready to scale.",
      keywords: ["custom software development", "web application development", "AI-powered software"],
    },
    pt: {
      title: "Desenvolvimento de software sob medida com IA | Aurhora",
      description: "Aplicações web, plataformas e produtos digitais com inteligência artificial integrada desde o design, centrados no usuário e prontos para escalar.",
      keywords: ["desenvolvimento de software sob medida", "aplicações web", "software com inteligência artificial"],
    },
  },
  "/servicios/impulso-marketing": {
    es: {
      title: "Marketing digital basado en datos | Aurhora Agency",
      description: "Estrategia basada en datos, campañas multicanal y optimización con IA. Cada peso invertido se mide y cada campaña se orienta a tu retorno.",
      keywords: ["marketing digital", "agencia de marketing digital", "campañas de Google Ads", "marketing con inteligencia artificial"],
    },
    en: {
      title: "Data-driven digital marketing | Aurhora Agency",
      description: "Data-driven strategy, multichannel campaigns and AI optimization. Every dollar invested is measured and every campaign is focused on your return.",
      keywords: ["digital marketing", "digital marketing agency", "Google Ads campaigns"],
    },
    pt: {
      title: "Marketing digital orientado por dados | Aurhora Agency",
      description: "Estratégia orientada por dados, campanhas multicanal e otimização com IA. Cada real investido é medido e cada campanha busca o seu retorno.",
      keywords: ["marketing digital", "agência de marketing digital", "campanhas Google Ads"],
    },
  },
  "/aviso-privacidad": {
    es: { title: "Aviso de privacidad | Aurhora Agency", description: "Conoce cómo Aurhora Agency recaba, usa y protege tus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares." },
    en: { title: "Privacy notice | Aurhora Agency", description: "Learn how Aurhora Agency collects, uses and protects your personal data in accordance with Mexico's Federal Law on the Protection of Personal Data." },
    pt: { title: "Aviso de privacidade | Aurhora Agency", description: "Saiba como a Aurhora Agency coleta, usa e protege seus dados pessoais de acordo com a Lei Federal mexicana de Proteção de Dados Pessoais." },
  },
  "/terminos-condiciones": {
    es: { title: "Términos y condiciones | Aurhora Agency", description: "Términos y condiciones de uso del sitio y de los servicios de Aurhora Agency: alcance, responsabilidades, propiedad intelectual y legislación aplicable." },
    en: { title: "Terms and conditions | Aurhora Agency", description: "Terms and conditions for the use of the Aurhora Agency website and services: scope, responsibilities, intellectual property and applicable law." },
    pt: { title: "Termos e condições | Aurhora Agency", description: "Termos e condições de uso do site e dos serviços da Aurhora Agency: escopo, responsabilidades, propriedade intelectual e legislação aplicável." },
  },
  "/login": {
    es: { title: "Iniciar sesión | Aurhora Agency", description: "Acceso para clientes de Aurhora Agency." },
    en: { title: "Sign in | Aurhora Agency", description: "Client access for Aurhora Agency." },
    pt: { title: "Entrar | Aurhora Agency", description: "Acesso para clientes da Aurhora Agency." },
  },
};

const asLocale = (locale: string): Locale =>
  (routing.locales as readonly string[]).includes(locale) ? (locale as Locale) : routing.defaultLocale;

export const pageUrl = (locale: string, route: string) => `${BASE_URL}/${asLocale(locale)}${route}`;

/** hreflang de una ruta en todos los idiomas, con x-default al español. */
export function languageAlternates(route: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[HREFLANG[l]] = pageUrl(l, route);
  languages["x-default"] = pageUrl(routing.defaultLocale, route);
  return languages;
}

/** Metadatos completos de una página: canonical propio, hreflang, Open Graph y robots. */
export function buildPageMetadata(
  locale: string,
  route: PageRoute,
  options: { noindex?: boolean } = {},
): Metadata {
  const l = asLocale(locale);
  const seo = PAGE_SEO[route][l];
  const url = pageUrl(l, route);

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: url, languages: languageAlternates(route) },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[l],
      url,
      title: seo.title,
      description: seo.description,
      siteName: SITE_NAME,
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
    robots: options.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  };
}

/** Metadatos compartidos por todas las páginas de un idioma (las páginas los sobrescriben). */
export function buildLocaleDefaults(locale: string): Metadata {
  const l = asLocale(locale);
  const home = PAGE_SEO[""][l];
  return {
    metadataBase: new URL(BASE_URL),
    title: home.title,
    description: home.description,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    // Verificación de Search Console: definir NEXT_PUBLIC_GSC_VERIFICATION en Vercel.
    ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
      ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
      : {}),
  };
}

export const htmlLang = (locale: string) => HREFLANG[asLocale(locale)];

// Structured Data (JSON-LD) schemas
export function generateOrganizationSchema(locale: string = "es") {
  const l = asLocale(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: "Aurhora",
    url: BASE_URL,
    logo: `${BASE_URL}/apple-icon`,
    description: PAGE_SEO[""][l].description,
    email: "contacto@aurhora.agency",
    telephone: "+525582991282",
    address: {
      "@type": "PostalAddress",
      addressCountry: "MX",
      addressLocality: "Ciudad de México",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "contacto@aurhora.agency",
      telephone: "+525582991282",
      areaServed: "MX",
      availableLanguage: ["es", "en", "pt"],
    },
    sameAs: [
      "https://linkedin.com/company/aurhora-agency",
      "https://instagram.com/aurhora.agency",
      "https://facebook.com/aurhora.agency",
    ],
  };
}

export function generateWebSiteSchema(locale: string = "es") {
  const l = asLocale(locale);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: SITE_NAME,
    url: BASE_URL,
    description: PAGE_SEO[""][l].description,
    inLanguage: HREFLANG[l],
    publisher: { "@id": `${BASE_URL}/#organization` },
  };
}

export function generateServiceSchema(
  serviceName: string,
  description: string,
  _locale: string = "es"
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceName,
    provider: { "@id": `${BASE_URL}/#organization` },
    description,
    areaServed: {
      "@type": "Country",
      name: "Mexico",
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}
