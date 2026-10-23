import { Code2, Boxes, Wrench } from "lucide-react";
import type { Seo, Unit } from "./types";

export const SITE = {
  name: "Aurhora Agency",
  url: "https://www.aurhora.agency",
  whatsappNumber: "525582991282",
  phoneDisplay: "+52 55 8299 1282",
  phoneE164: "+525582991282",
  email: "contacto@aurhora.agency",
  hours: [
    { day: "Lunes a viernes", time: "8:00 a 20:00" },
    { day: "Sábado", time: "8:00 a 16:00" },
    { day: "Domingo", time: "Sin operación ordinaria" },
  ],
  zones: ["Satélite", "Naucalpan", "Lomas Verdes", "Tlalnepantla", "Chapultepec", "Centro", "Santa Fe", "Lomas de Bezares"],
};

export const UNITS: Unit[] = [
  {
    id: "digital",
    name: "Digital",
    full: "Aurhora Digital",
    short: "Agentes de IA, software y automatización.",
    lead: "Haz espacio para lo que sigue.",
    desc: "Agentes de inteligencia artificial, automatización, software y estrategia digital que simplifican tu operación y le quitan a tu equipo el trabajo repetitivo.",
    area: "Proyectos en todo México",
    icon: Code2,
    services: ["agentes-ia", "automatizacion-procesos", "software", "consultoria", "marketing", "godigital"],
    seo: {
      title: "Aurhora Digital | Agentes de IA, automatización y software",
      description: "Implementamos agentes de inteligencia artificial, automatización de procesos, software a la medida y marketing digital para empresas en México.",
      slug: "/digital",
      keywords: ["agentes de IA México", "automatización con inteligencia artificial", "desarrollo de software a la medida", "transformación digital", "IA para empresas"],
    },
  },
  {
    id: "integra",
    name: "Integra",
    full: "Aurhora Integra",
    short: "Seguridad, redes y domótica.",
    lead: "Cada espacio, mejor conectado.",
    desc: "Diseñamos e instalamos seguridad, redes y domótica que funcionan como un solo sistema en tu casa o negocio.",
    area: "CDMX y zonas del Estado de México",
    icon: Boxes,
    services: ["seguridad-accesos", "redes", "domotica", "audio-video"],
    seo: {
      title: "Aurhora Integra | Cámaras, redes y domótica en CDMX",
      description: "Instalación de cámaras de seguridad, control de acceso, WiFi, cableado estructurado, domótica y audio para residencias y negocios en CDMX y Estado de México.",
      slug: "/integra",
      keywords: ["instalación de cámaras CDMX", "domótica CDMX", "cableado estructurado", "control de acceso", "casa inteligente"],
    },
  },
  {
    id: "facilities",
    name: "Facilities",
    full: "Aurhora Facilities",
    short: "Hogar, comercio e industria.",
    lead: "Que todo funcione. Y tu día siga.",
    desc: "Aire acondicionado, electricidad, instalaciones y proyectos para casas, locales, oficinas, naves y bodegas. El mismo equipo se encarga desde la revisión hasta el seguimiento.",
    area: "CDMX y zonas del Estado de México",
    icon: Wrench,
    services: ["aire-acondicionado", "electricidad", "reparaciones", "mantenimiento-programado", "proyectos-residenciales", "proyectos-industriales"],
    seo: {
      title: "Aurhora Facilities | Mantenimiento e instalaciones en CDMX",
      description: "Aire acondicionado, electricidad, instalaciones, pólizas de mantenimiento y proyectos para casas, negocios, naves y bodegas en CDMX y Estado de México.",
      slug: "/facilities",
      keywords: ["mantenimiento CDMX", "mantenimiento industrial", "póliza de mantenimiento", "electricista CDMX", "mantenimiento de aire acondicionado"],
    },
  },
];

export const unitById = (id: string) => UNITS.find((u) => u.id === id)!;

/** SEO de vistas que no son unidad ni servicio. */
export const PAGE_SEO: Record<string, Seo> = {
  grupo: {
    title: "Aurhora Agency | Agentes de IA, tecnología y mantenimiento",
    description: "Tres especialidades, un respaldo: agentes de IA y software, seguridad y domótica, y mantenimiento residencial, comercial e industrial en México.",
    slug: "/",
    keywords: ["Aurhora Agency", "Aurhora", "agentes de IA", "domótica", "mantenimiento CDMX"],
  },
  nosotros: {
    title: "Nosotros | Aurhora Agency",
    description: "Conoce a Aurhora: tres especialidades en tecnología, espacios y mantenimiento con un mismo respaldo, un equipo con experiencia y una forma clara de trabajar.",
    slug: "/nosotros",
    keywords: ["Aurhora Agency", "quiénes somos Aurhora", "Aurhora"],
  },
  recursos: {
    title: "Guías de IA, domótica y mantenimiento | Aurhora Agency",
    description: "Guías prácticas sobre agentes de inteligencia artificial, automatización, domótica y mantenimiento para casas y negocios, escritas por el equipo de Aurhora.",
    slug: "/recursos",
    keywords: ["guías de inteligencia artificial", "agentes de IA", "domótica", "mantenimiento de minisplit"],
  },
  contacto: {
    title: "Contacto | Aurhora Agency",
    description: "Cuéntanos qué necesitas y continúa por WhatsApp con la especialidad adecuada. Lunes a viernes de 8:00 a 20:00 y sábados de 8:00 a 16:00.",
    slug: "/contacto",
    keywords: ["contacto Aurhora", "cotización", "WhatsApp Aurhora"],
  },
};

/** Opciones del formulario de contacto, por unidad. */
export const CATALOG: Record<string, string[]> = {
  orientacion: ["Necesito orientación"],
  facilities: ["Aire acondicionado", "Electricidad", "Instalaciones y reparaciones", "Mantenimiento programado", "Proyecto residencial", "Proyecto comercial o industrial", "Pintura", "Plomería", "Tablaroca", "Impermeabilización", "Otro servicio"],
  integra: ["Seguridad y accesos", "Redes y conectividad", "Domótica y automatización", "Audio, video y control", "Solución para residencia", "Solución para negocio", "Otro proyecto"],
  digital: ["Agentes de IA", "Automatización de procesos", "Desarrollo de software", "Consultoría", "Marketing digital", "GoDigital Suite", "Otro proyecto"],
};

export const UNIT_LABEL: Record<string, string> = {
  orientacion: "Ayúdenme a elegir",
  facilities: "Facilities",
  integra: "Integra",
  digital: "Digital",
};
