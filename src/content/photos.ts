import type { UnitId } from "./types";

/*
  Galería de trabajos reales, agrupada por tipo de servicio. Cada foto aparece una sola vez.
  Los archivos viven en /public/fotos y ya traen el marco y la franja de marca.
*/
export type Photo = { src: string; width: number; height: number; alt: string };

export type PhotoGroup = {
  id: string;
  label: string;
  unit: UnitId;
  desc: string;
  /** Servicios relacionados (id de servicio) para enlazar desde la galería. */
  services: string[];
  photos: Photo[];
};

const P = (file: string, width: number, height: number, alt: string): Photo => ({ src: `/fotos/aurhora-${file}.webp`, width, height, alt });

export const PHOTO_GROUPS: PhotoGroup[] = [
  {
    id: "aire-acondicionado",
    label: "Aire acondicionado",
    unit: "facilities",
    desc: "Instalación de minisplits en muro y azotea, y mantenimiento con desarmado de la unidad interior.",
    services: ["aire-acondicionado", "mantenimiento-programado"],
    photos: [
      P("instalacion-minisplit-evaporadora", 1280, 796, "Técnico instalando la unidad interior de un minisplit"),
      P("mantenimiento-minisplit-turbina", 1613, 2169, "Turbina de un minisplit con acumulación de polvo, antes de su limpieza"),
      P("instalacion-minisplit-condensadora-azotea", 720, 1356, "Técnico preparando la instalación de la unidad exterior de un minisplit en azotea"),
      P("instalacion-minisplit-condensadora-muro", 720, 1356, "Técnicos instalando la unidad exterior de un minisplit en un muro"),
    ],
  },
  {
    id: "electricidad",
    label: "Electricidad y tableros",
    unit: "facilities",
    desc: "Tableros de distribución, plantas eléctricas e instalaciones sobre plafón en casas, oficinas e industria.",
    services: ["electricidad", "reparaciones", "proyectos-industriales"],
    photos: [
      P("tableros-de-distribucion-ordenados", 2000, 1540, "Dos tableros de distribución eléctrica con cableado ordenado y etiquetado"),
      P("tablero-de-distribucion-principal", 1613, 2169, "Tablero de distribución principal con interruptor general y cableado peinado"),
      P("cuarto-planta-electrica-generador", 2000, 1658, "Cuarto de planta eléctrica con generador, tablero de transferencia y charolas portacables"),
      P("tableros-electricos-en-intervencion", 1500, 2158, "Tableros eléctricos abiertos durante una intervención, con canalización flexible nueva"),
      P("tecnico-conexion-tablero-electrico", 1500, 2158, "Técnico con equipo de protección conectando un cable en un tablero eléctrico"),
      P("instalacion-electrica-en-plafon", 1500, 2158, "Instalador en escalera trabajando la instalación eléctrica sobre el plafón"),
    ],
  },
  {
    id: "videovigilancia",
    label: "Videovigilancia",
    unit: "integra",
    desc: "Sistemas de cámaras para residencias, con monitoreo de accesos, calle y áreas exteriores.",
    services: ["seguridad-accesos"],
    photos: [
      P("cctv-monitoreo-acceso-residencial", 2000, 1658, "Monitor con la vista en vivo de las cámaras de acceso de una residencia"),
      P("cctv-monitoreo-multicamara", 2000, 1658, "Pantalla con mosaico de dieciséis cámaras de videovigilancia de una residencia"),
      P("cctv-monitoreo-calle", 2000, 1656, "Monitor con cinco cámaras de videovigilancia que cubren la calle y los accesos de una propiedad"),
    ],
  },
  {
    id: "audio-video",
    label: "Audio, video y espacios",
    unit: "integra",
    desc: "Cine en casa, proyección y audio empotrado, integrados al diseño de cada espacio.",
    services: ["audio-video", "domotica", "proyectos-residenciales"],
    photos: [
      P("cine-en-casa-con-pantalla", 2000, 1658, "Sala de cine en casa con pantalla de proyección, bocinas de piso y control desde una tableta"),
      P("sala-con-proyector-y-jardin", 2000, 1658, "Sala y comedor con proyector instalado en el techo, bocinas empotradas y vista al jardín"),
      P("proyecto-residencial-sala", 1500, 2158, "Sala residencial terminada con mueble de madera a medida y mobiliario"),
    ],
  },
  {
    id: "redes",
    label: "Redes y canalización",
    unit: "integra",
    desc: "Tubería conduit, registros, gabinetes rack y cableado sobre plafón.",
    services: ["redes", "proyectos-residenciales"],
    photos: [
      P("canalizacion-conduit-y-registros", 1500, 2158, "Canalización con tubería conduit, cajas de registro y gabinetes en techo"),
      P("trabajos-en-sitio-rack-y-plafon", 1126, 2118, "Dos técnicos en escaleras trabajando en el plafón junto a un gabinete rack"),
    ],
  },
];

export const PHOTO_COUNT = PHOTO_GROUPS.reduce((n, g) => n + g.photos.length, 0);
