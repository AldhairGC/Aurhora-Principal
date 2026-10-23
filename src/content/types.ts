import type { LucideIcon } from "lucide-react";

export type UnitId = "digital" | "integra" | "facilities";

export type Item = { title: string; desc: string };

/** Metadatos pensados para el sitio en producción (URL real, title, description, palabras clave). */
export type Seo = {
  title: string;
  description: string;
  slug: string;
  keywords: string[];
};

export type Service = {
  seo: Seo;
  stack?: string[];
  id: string;
  unit: UnitId;
  name: string;
  /** H1 de la página: servicio + ubicación, con la palabra clave principal. */
  h1: string;
  tagline: string;
  icon: LucideIcon;
  heroLead: string;
  heroAccent: string;
  heroDesc: string;
  includes: Item[];
  forWho: Item[];
  signals: string[];
  process: Item[];
  share: string[];
  expect: { label: string; value: string }[];
  backing: Item;
  faq: [string, string][];
  related: string[];
  contactService: string;
};

/** Bloques de texto enriquecido para artículos y documentos legales. */
export type Block =
  | { p: string }
  | { list: string[]; ordered?: boolean }
  | { kv: [string, string][] }
  | { h3: string }
  | { callout: string; tone?: "info" | "warn" };

export type DocSection = { id: string; title: string; blocks: Block[] };

export type Article = {
  id: string;
  unit: UnitId;
  title: string;
  excerpt: string;
  date: string;
  /** Fecha ISO para datos estructurados (datePublished). */
  published: string;
  updated?: string;
  minutes: number;
  sections: DocSection[];
  faq?: [string, string][];
  service: string;
  related: string[];
  seo: Seo;
};

export type LegalDoc = {
  id: string;
  title: string;
  updated: string;
  intro: string;
  sections: DocSection[];
  seo: Seo;
};

export type Unit = {
  id: UnitId;
  seo: Seo;
  name: string;
  full: string;
  short: string;
  lead: string;
  desc: string;
  area: string;
  icon: LucideIcon;
  services: string[];
};

/** Una solución concreta dentro de un servicio (una pestaña de la anatomía). */
export type AnatomyItem = {
  id: string;
  /** Nombre corto para la pestaña. */
  label: string;
  icon: LucideIcon;
  /** Qué es, en una o dos frases. */
  what: string;
  /** Cómo funciona, en concreto. */
  how: string;
  /** Equipos, componentes o tecnologías que intervienen. */
  parts: string[];
  /** Cuándo conviene. */
  idealFor: string;
  /** Límites, lo que no incluye o lo que hay que revisar antes. */
  consider: string;
};

/** Sección explicativa de un servicio: qué soluciones abarca y cómo funciona cada una. */
export type Anatomy = {
  eyebrow: string;
  title: string;
  intro: string;
  items: AnatomyItem[];
  /** Tecnologías, equipos o estándares agrupados por capa. Sustituye a `stack`. */
  layers?: { title: string; items: string[] }[];
  layersTitle?: string;
  /** Forma de trabajo específica del servicio (metodología, ciclo de entrega). */
  method?: { title: string; intro: string; steps: Item[] };
};

/** Precio "Desde": límite inferior autorizado por Aurhora. */
export type PriceRow = { concept: string; range: string; unit?: string };

/** Contenido ampliado de una página de servicio: costo, tiempos y alcance. */
export type ServiceExtras = {
  /** Párrafo de contexto antes de la tabla de precios. */
  costIntro: string;
  prices: PriceRow[];
  /** De qué depende el precio. */
  factors: string[];
  timing: { label: string; value: string }[];
  /** Lo que normalmente no está incluido o se cotiza aparte. */
  excludes: string[];
  /** Recomendaciones antes de contratar (párrafos). */
  context?: string[];
  /** Preguntas adicionales sobre costo, tiempo y alcance. */
  faq: [string, string][];
};
