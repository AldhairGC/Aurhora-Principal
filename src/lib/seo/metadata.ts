import { Metadata } from "next";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  locale?: string;
  siteName?: string;
}

export const defaultSEO: Record<string, SEOConfig> = {
  es: {
    title: "Aurhora Agency | Transformación Digital e Innovación",
    description:
      "Somos tu socio estratégico en transformación digital y optimización de procesos. Integramos visión, tecnología y ejecución experta para maximizar tu potencial.",
    keywords: [
      "transformación digital",
      "consultoría tecnológica",
      "desarrollo de software",
      "optimización de procesos",
      "innovación empresarial",
      "fintech",
      "insurtech",
      "agencia digital México",
    ],
    image: "/og-image-es.png",
    siteName: "Aurhora Agency",
    type: "website",
    locale: "es_MX",
  },
  en: {
    title: "Aurhora Agency | Digital Transformation & Innovation",
    description:
      "Your strategic partner in digital transformation and process optimization. We integrate vision, technology, and expert execution to maximize your potential.",
    keywords: [
      "digital transformation",
      "technology consulting",
      "software development",
      "process optimization",
      "business innovation",
      "fintech",
      "insurtech",
      "digital agency",
    ],
    image: "/og-image-en.png",
    siteName: "Aurhora Agency",
    type: "website",
    locale: "en_US",
  },
  pt: {
    title: "Aurhora Agency | Transformação Digital e Inovação",
    description:
      "Seu parceiro estratégico em transformação digital e otimização de processos. Integramos visão, tecnologia e execução especializada para maximizar seu potencial.",
    keywords: [
      "transformação digital",
      "consultoria tecnológica",
      "desenvolvimento de software",
      "otimização de processos",
      "inovação empresarial",
      "fintech",
      "insurtech",
      "agência digital",
    ],
    image: "/og-image-pt.png",
    siteName: "Aurhora Agency",
    type: "website",
    locale: "pt_BR",
  },
};

export function generateMetadata(config: SEOConfig, baseUrl: string = "https://aurhora.agency"): Metadata {
  const {
    title,
    description,
    keywords,
    image,
    url,
    type = "website",
    locale = "es_MX",
    siteName = "Aurhora Agency",
  } = config;

  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImageUrl = image ? `${baseUrl}${image}` : `${baseUrl}/og-default.png`;

  return {
    title,
    description,
    keywords: keywords?.join(", "),
    authors: [{ name: "Aurhora Agency" }],
    creator: "Aurhora Agency",
    publisher: "Aurhora Agency",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: fullUrl,
      languages: {
        "es-MX": `${baseUrl}/es`,
        "en-US": `${baseUrl}/en`,
        "pt-BR": `${baseUrl}/pt`,
      },
    },
    openGraph: {
      type: type as any,
      locale,
      url: fullUrl,
      title,
      description,
      siteName,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImageUrl],
      creator: "@aurhora_agency",
      site: "@aurhora_agency",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code", // TODO: Replace with actual verification code
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
  };
}

// Structured Data (JSON-LD) schemas
export function generateOrganizationSchema(locale: string = "es") {
  const baseUrl = "https://aurhora.agency";
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Aurhora Agency",
    alternateName: "Aurhora",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: defaultSEO[locale].description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "MX",
      addressLocality: "Ciudad de México",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      email: "contacto@aurhora.agency",
    },
    sameAs: [
      "https://linkedin.com/company/aurhora-agency",
      "https://instagram.com/aurhora.agency",
      "https://facebook.com/aurhora.agency",
    ],
  };
}

export function generateWebSiteSchema(locale: string = "es") {
  const baseUrl = "https://aurhora.agency";
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Aurhora Agency",
    url: baseUrl,
    description: defaultSEO[locale].description,
    inLanguage: locale === "es" ? "es-MX" : locale === "en" ? "en-US" : "pt-BR",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateServiceSchema(
  serviceName: string,
  description: string,
  locale: string = "es"
) {
  const baseUrl = "https://aurhora.agency";
  
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceName,
    provider: {
      "@type": "Organization",
      name: "Aurhora Agency",
      url: baseUrl,
    },
    description,
    areaServed: {
      "@type": "Country",
      name: "Mexico",
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  const baseUrl = "https://aurhora.agency";
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}
