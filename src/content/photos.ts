/*
  Fotos de trabajo por servicio (id de servicio → fotos). La primera es la principal.
  Los archivos viven en /public/fotos y ya traen el marco y la franja de marca.
*/
export type Photo = { src: string; width: number; height: number; alt: string };

const P = (file: string, width: number, height: number, alt: string): Photo => ({ src: `/fotos/aurhora-${file}.webp`, width, height, alt });

const tablerosOrdenados = P("tableros-de-distribucion-ordenados", 2000, 1540, "Dos tableros de distribución eléctrica con cableado ordenado y etiquetado");
const tableroPrincipal = P("tablero-de-distribucion-principal", 1613, 2169, "Tablero de distribución principal con interruptor general y cableado peinado");
const tablerosIntervencion = P("tableros-electricos-en-intervencion", 1500, 2158, "Tableros eléctricos abiertos durante una intervención, con canalización flexible nueva");
const cuartoPlanta = P("cuarto-planta-electrica-generador", 2000, 1658, "Cuarto de planta eléctrica con generador, tablero de transferencia y charolas portacables");
const tecnicoTablero = P("tecnico-conexion-tablero-electrico", 1500, 2158, "Técnico con equipo de protección conectando un cable en un tablero eléctrico");
const plafon = P("instalacion-electrica-en-plafon", 1500, 2158, "Instalador en escalera trabajando la instalación eléctrica sobre el plafón");
const conduit = P("canalizacion-conduit-y-registros", 1500, 2158, "Canalización con tubería conduit, cajas de registro y gabinetes en techo");
const turbina = P("mantenimiento-minisplit-turbina", 1613, 2169, "Turbina de un minisplit con acumulación de polvo, antes de su limpieza");
const evaporadora = P("instalacion-minisplit-evaporadora", 1280, 796, "Técnico instalando la unidad interior de un minisplit");
const condAzotea = P("instalacion-minisplit-condensadora-azotea", 720, 1356, "Técnico preparando la instalación de la unidad exterior de un minisplit en azotea");
const condMuro = P("instalacion-minisplit-condensadora-muro", 720, 1356, "Técnicos instalando la unidad exterior de un minisplit en un muro");
const cctvAcceso = P("cctv-monitoreo-acceso-residencial", 2000, 1658, "Monitor con la vista en vivo de las cámaras de acceso de una residencia");
const cctvMosaico = P("cctv-monitoreo-multicamara", 2000, 1658, "Pantalla con mosaico de dieciséis cámaras de videovigilancia de una residencia");
const cctvCalle = P("cctv-monitoreo-calle", 2000, 1656, "Monitor con cinco cámaras de videovigilancia que cubren la calle y los accesos de una propiedad");
const cineEnCasa = P("cine-en-casa-con-pantalla", 2000, 1658, "Sala de cine en casa con pantalla de proyección, bocinas de piso y control desde una tableta");
const salaProyector = P("sala-con-proyector-y-jardin", 2000, 1658, "Sala y comedor con proyector instalado en el techo, bocinas empotradas y vista al jardín");
const sala = P("proyecto-residencial-sala", 1500, 2158, "Sala residencial terminada con mueble de madera a medida y mobiliario");
const rackPlafon = P("trabajos-en-sitio-rack-y-plafon", 1126, 2118, "Dos técnicos en escaleras trabajando en el plafón junto a un gabinete rack");

export const PHOTOS: Record<string, Photo[]> = {
  electricidad: [tablerosOrdenados, tableroPrincipal, tablerosIntervencion, cuartoPlanta, conduit],
  "aire-acondicionado": [evaporadora, turbina, condAzotea, condMuro],
  reparaciones: [tablerosIntervencion, tecnicoTablero, plafon],
  "mantenimiento-programado": [turbina, tablerosOrdenados],
  "proyectos-industriales": [cuartoPlanta],
  "proyectos-residenciales": [sala, salaProyector, rackPlafon, plafon],
  "seguridad-accesos": [cctvAcceso, cctvMosaico, cctvCalle],
  "audio-video": [cineEnCasa, salaProyector],
  domotica: [cineEnCasa, salaProyector],
  redes: [conduit, rackPlafon],
};

export const photosOf = (serviceId: string): Photo[] => PHOTOS[serviceId] ?? [];
