import { Camera, ClipboardList, FileCode2, FolderOpen, GitBranch, KeyRound, Route, ScanSearch, Tag, BookOpen, type LucideIcon } from "lucide-react";
import type { UnitId } from "./types";

/* Bitácora digital: el reporte técnico que entregamos al terminar cada servicio.
   Se comparte por WhatsApp y queda resguardada en el sistema de Aurhora. No prometer un portal de clientes. */
export type Logbook = {
  eyebrow: string;
  title: string;
  intro: string;
  items: { icon: LucideIcon; title: string; desc: string }[];
  note: string;
};

const KEEP = { icon: FolderOpen, title: "Siempre a la mano", desc: "Te la compartimos por WhatsApp al terminar y queda resguardada en nuestro sistema para tu siguiente servicio o una revisión de garantía." };

export const LOGBOOK: Record<UnitId, Logbook> = {
  facilities: {
    eyebrow: "Bitácora digital",
    title: "Todo tu servicio, documentado.",
    intro: "Al terminar te entregamos un reporte técnico digital con fotos del antes y el después, lo que se hizo y lo que encontramos. Así siempre sabes qué tiene tu casa o tu negocio y dónde.",
    items: [
      { icon: Camera, title: "Fotos del antes y el después", desc: "De cada área y equipo que intervenimos, para que veas qué cambió." },
      { icon: ClipboardList, title: "Detalle de lo que se hizo", desc: "Trabajos realizados, materiales y refacciones usados, y mediciones tomadas." },
      { icon: Route, title: "Notas técnicas", desc: "Por dónde pasan tuberías y circuitos, y dónde quedan llaves de paso, registros y equipos instalados." },
      { icon: Tag, title: "Ficha de cada equipo", desc: "Modelo, capacidad y número de serie cuando están disponibles, con su ubicación." },
      { icon: ScanSearch, title: "Hallazgos y recomendaciones", desc: "Lo que encontramos durante el trabajo, qué conviene atender y cuándo." },
      KEEP,
    ],
    note: "Si después necesitas otro trabajo, quien llegue ya sabe qué hay instalado y por dónde pasa.",
  },
  integra: {
    eyebrow: "Bitácora digital",
    title: "Tu instalación, documentada.",
    intro: "Al terminar te entregamos un reporte técnico digital con fotos, la ubicación de cada equipo y por dónde quedó el cableado. Así puedes consultarlo cuando quieras crecer el sistema o darle mantenimiento.",
    items: [
      { icon: Camera, title: "Fotos del antes y el después", desc: "De cada punto instalado, del rack o gabinete y de las canalizaciones." },
      { icon: ClipboardList, title: "Detalle de lo que se hizo", desc: "Equipos instalados, materiales usados y pruebas de funcionamiento." },
      { icon: Route, title: "Rutas de cableado", desc: "Por dónde pasa cada cable y dónde quedan cámaras, sensores, nodos y puntos de acceso." },
      { icon: Tag, title: "Ficha de cada equipo", desc: "Modelo, número de serie y configuración principal. Las contraseñas se entregan por separado." },
      { icon: ScanSearch, title: "Hallazgos y recomendaciones", desc: "Lo que encontramos en tu red o tu instalación eléctrica y qué conviene atender." },
      KEEP,
    ],
    note: "La misma bitácora sirve para la garantía y para que Aurhora Facilities dé mantenimiento sin empezar de cero.",
  },
  digital: {
    eyebrow: "Documentación digital",
    title: "Tu proyecto, documentado.",
    intro: "Al entregar te dejamos por escrito qué se construyó, cómo está configurado y cómo se usa. Así tu equipo, o quien trabaje después en el proyecto, no depende de la memoria de nadie.",
    items: [
      { icon: FileCode2, title: "Qué se construyó", desc: "Alcance entregado, flujos, pantallas, integraciones y decisiones técnicas." },
      { icon: GitBranch, title: "Cómo fluye la información", desc: "Diagramas de qué sistema envía qué dato y cuándo." },
      { icon: KeyRound, title: "Configuración y accesos", desc: "Servicios, cuentas y permisos que usa el proyecto. Las credenciales se comparten por un canal seguro." },
      { icon: BookOpen, title: "Guía de uso", desc: "Instrucciones para tu equipo y qué hacer si algo falla." },
      { icon: ScanSearch, title: "Pendientes y recomendaciones", desc: "Lo que quedó fuera del alcance y lo que conviene hacer después." },
      { icon: FolderOpen, title: "Siempre a la mano", desc: "Te la compartimos al cerrar cada etapa y queda resguardada en nuestro sistema." },
    ],
    note: "La documentación se actualiza en cada entrega, no solo al final.",
  },
};

export const LOGBOOK_FAQ: Record<UnitId, [string, string]> = {
  facilities: ["¿Me entregan evidencia del trabajo?", "Sí. Al terminar te enviamos por WhatsApp una bitácora digital con fotos del antes y el después, el detalle de lo que se hizo, notas técnicas (por dónde pasan tuberías o circuitos y dónde quedan los equipos) y lo que encontramos. También queda resguardada en nuestro sistema, así que te la podemos volver a compartir cuando la necesites."],
  integra: ["¿Me entregan documentación de la instalación?", "Sí. Al terminar te enviamos por WhatsApp una bitácora digital con fotos, la ubicación de cada equipo, por dónde pasa el cableado, la ficha de cada equipo y lo que encontramos. Las contraseñas se entregan por separado. También queda resguardada en nuestro sistema para la garantía o el mantenimiento."],
  digital: ["¿Qué documentación recibo al terminar?", "Te entregamos en digital qué se construyó, cómo fluye la información entre tus sistemas, la configuración y una guía de uso para tu equipo. Las credenciales se comparten por un canal seguro y la documentación queda resguardada en nuestro sistema."],
};
