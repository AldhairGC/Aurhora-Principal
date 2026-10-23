import type { ServiceExtras } from "./types";

/*
  Fuentes (consultadas el 23 de octubre de 2026): precios publicados por vigilmax.com.mx,
  videoproteccion.com.mx, moctezumacctv.com, itetec.com, cctvseguridad.com.mx, ezonmexico.com,
  ccurity.com.mx, go4.com.mx, drlaptop.com.mx, rogersmexico.mx, wifidirecto.mx,
  tecnoshades.com y grupocmm.com; guías de mercadoseguridad.mx, cronoshare.com.mx y
  habitissimo.com.mx. Precios autorizados por Aurhora el 23 de octubre de 2026: se publican
  como "Desde" con el límite inferior de cada rango.
*/

export const INTEGRA_EXTRAS: Record<string, ServiceExtras> = {
  "seguridad-accesos": {
    costIntro: "Cotizamos desde la mano de obra por cámara hasta sistemas completos con equipo. La diferencia entre un sistema de entrada y uno de gama media está sobre todo en la resolución de las cámaras y el tipo de grabador.",
    prices: [
      { concept: "Instalación por cámara (equipo aparte)", range: "Desde $250", unit: "por cámara" },
      { concept: "Sistema de 4 cámaras instalado, gama de entrada (1080p)", range: "Desde $5,500", unit: "por sistema" },
      { concept: "Sistema de 4 cámaras IP instalado, gama media (4 MP)", range: "Desde $8,500", unit: "por sistema" },
      { concept: "Alarma con sensores, instalada", range: "Desde $3,000", unit: "por sistema" },
      { concept: "Chapa inteligente instalada", range: "Desde $2,700", unit: "por puerta" },
      { concept: "Videoportero instalado", range: "Desde $5,000", unit: "por unidad" },
      { concept: "Cerco electrificado de 6 hilos instalado", range: "Desde $9,000", unit: "por 10 m; menos por metro en tramos largos" },
    ],
    factors: [
      "Número y resolución de las cámaras.",
      "Tipo de grabador y días de grabación que necesitas.",
      "Cableado visible o por dentro del muro.",
      "Distancia entre cámaras y grabador.",
      "Metros de perímetro para cercos electrificados.",
      "Altura de instalación y acceso a la fachada.",
    ],
    timing: [
      { label: "Sistema de 4 a 8 cámaras", value: "1 día" },
      { label: "16 cámaras o más, o varios pisos", value: "2 a 3 días" },
      { label: "Propuesta", value: "Después del levantamiento" },
      { label: "Entrega", value: "Con configuración en tu teléfono" },
    ],
    excludes: [
      "Canalización oculta, ranurado y resanes.",
      "Cable adicional a lo incluido en la propuesta.",
      "Servicio de internet.",
      "Monitoreo por una central de alarmas y almacenamiento en la nube (servicios de terceros con cuota mensual).",
      "Trabajo en altura que requiera equipo especial.",
      "IVA: todos los precios son más IVA.",
    ],
    faq: [
      ["¿Cuánto cuesta instalar 4 cámaras de seguridad en la CDMX?", "Un sistema de 4 cámaras instalado parte de $5,500 en gama de entrada y desde $8,500 en cámaras IP de 4 MP."],
      ["¿Cuánto tarda la instalación?", "Un sistema de 4 a 8 cámaras en casa o local normalmente se instala en un día. Proyectos con más cámaras o varios pisos toman de 2 a 3 días."],
    ],
  },

  redes: {
    costIntro: "El costo de una red depende de cuántos puntos necesitas y de cómo se lleva el cable. Se cobra por nodo de red y por punto de acceso WiFi instalado.",
    prices: [
      { concept: "Nodo de red Cat6 instalado", range: "Desde $800", unit: "por nodo" },
      { concept: "Paquete de 5 nodos con switch", range: "Desde $3,500", unit: "por paquete" },
      { concept: "Punto de acceso WiFi instalado", range: "Desde $1,300", unit: "por punto" },
      { concept: "WiFi profesional para casa (2 a 5 puntos)", range: "Desde $9,900", unit: "por sistema" },
      { concept: "Armado y organización de rack de pared", range: "Desde $1,650", unit: "por rack" },
    ],
    factors: [
      "Número de nodos y puntos de acceso.",
      "Metros de cable y tipo de canalización.",
      "Niveles y materiales de los muros.",
      "Si se requiere certificación de cada nodo.",
      "Equipos: switch, router y puntos de acceso.",
    ],
    timing: [
      { label: "Router o sistema mesh", value: "El mismo día" },
      { label: "WiFi profesional", value: "Equipo en 24 a 48 h hábiles; instalación en fecha acordada" },
      { label: "Cableado estructurado", value: "Según el número de nodos" },
    ],
    excludes: [
      "Servicio de internet o cambio de proveedor.",
      "Canalización oculta y resanes.",
      "Switches, routers y puntos de acceso, cuando el precio es solo mano de obra.",
      "Certificación de nodos, si no se pide.",
      "IVA: todos los precios son más IVA.",
    ],
    context: [
      "Antes de cotizar, revisa dónde está tu módem y en qué zonas falla la señal. Una foto de cada nivel y del lugar donde están los equipos nos ayuda a proponer la ubicación de los puntos de acceso.",
      "Si tu negocio usa terminal de pago, cámaras o telefonía, conviene separarlos de la red de invitados. Es una configuración sencilla que mejora la seguridad y evita que un cliente sature la conexión de tu caja.",
    ],
    faq: [
      ["¿Cuánto cuesta un nodo de red?", "Un nodo Cat6 instalado parte de $800; el precio final depende de si incluye certificación y canalización."],
      ["¿Cuánto cuesta mejorar el WiFi de una casa?", "Depende del tamaño y los niveles. Los sistemas profesionales instalados de 2 a 5 puntos parten de $9,900."],
    ],
  },

  domotica: {
    costIntro: "La domótica puede empezar con unos cuantos dispositivos o cubrir toda la casa. Por eso el presupuesto varía mucho: lo que más mueve el precio es cuántas áreas automatizas y si hay que instalar cableado.",
    prices: [
      { concept: "Domotizar un departamento", range: "Desde $15,000", unit: "por proyecto" },
      { concept: "Domotizar una casa, nivel básico", range: "Desde $42,000", unit: "por proyecto" },
      { concept: "Domotizar una casa, nivel completo", range: "Desde $100,000", unit: "por proyecto" },
      { concept: "Apagador inteligente instalado", range: "Desde $1,000", unit: "por pieza" },
      { concept: "Motorizar una persiana existente", range: "Desde $1,800", unit: "por unidad" },
      { concept: "Persiana eléctrica nueva instalada", range: "Desde $5,500", unit: "por unidad" },
      { concept: "Control WiFi para minisplit (equipo)", range: "Desde $450", unit: "por equipo" },
    ],
    factors: [
      "Número de áreas y dispositivos.",
      "Soluciones inalámbricas o cableadas.",
      "Marca y ecosistema elegidos.",
      "Motorización de persianas o cortinas.",
      "Integración con cámaras, accesos y audio.",
    ],
    timing: [
      { label: "Departamento sin obra", value: "1 o 2 visitas (aprox.)" },
      { label: "Persianas motorizadas", value: "Según disponibilidad de los motores" },
      { label: "Proyecto de casa completa", value: "Según el programa de la propuesta" },
    ],
    excludes: [
      "Instalación eléctrica nueva para motores o equipos.",
      "Obra, canalización y resanes.",
      "Suscripciones de aplicaciones o servicios en la nube.",
      "Asistentes de voz y equipos que ya tengas.",
      "IVA: todos los precios son más IVA.",
    ],
    context: [
      "Elige primero desde dónde quieres controlar tu casa: una aplicación, un asistente de voz o un panel. Esa decisión define qué marcas y dispositivos son compatibles y evita comprar equipos que no se hablan entre sí.",
      "Si estás por remodelar, aprovecha para dejar preparado el cableado y las cajas de los controles. Si tu espacio ya está terminado, las opciones inalámbricas permiten automatizar sin romper muros.",
    ],
    faq: [
      ["¿Cuánto cuesta domotizar un departamento?", "Desde $15,000 según las áreas y dispositivos."],
      ["¿Puedo empezar con poco?", "Sí. Puedes empezar con iluminación o clima en una sola área y sumar después, sin rehacer lo instalado."],
    ],
  },

  "audio-video": {
    costIntro: "En audio y video, el equipo suele ser la parte más grande del presupuesto. Publicamos el precio de instalación de pantallas; los proyectos de audio por zonas, cine en casa y salas de juntas se cotizan por proyecto.",
    prices: [
      { concept: "Instalación de pantalla en muro (soporte aparte)", range: "Desde $600", unit: "por pantalla" },
      { concept: "Cine en casa en una sala existente", range: "Desde $25,000", unit: "por proyecto, con equipo" },
      { concept: "Sala de juntas básica (pantalla, videollamada y audio)", range: "Desde $100,000", unit: "por sala" },
      { concept: "Audio por zonas", range: "Se cotiza por proyecto", unit: "según zonas y bocinas" },
    ],
    factors: [
      "Equipos elegidos: pantalla, bocinas, amplificador.",
      "Número de zonas de audio.",
      "Cableado oculto o visible.",
      "Tipo de muro: tablaroca o concreto.",
      "Acondicionamiento acústico, si se requiere.",
    ],
    timing: [
      { label: "Pantalla en muro", value: "Menos de 2 horas" },
      { label: "Pantalla con cableado oculto", value: "1.5 a 2 horas" },
      { label: "Cine en casa o sala de juntas", value: "Según el proyecto" },
    ],
    excludes: [
      "Pantallas, bocinas y equipos.",
      "Cableado empotrado y resanes.",
      "Suscripciones de contenido o videoconferencia.",
      "Acondicionamiento acústico.",
      "IVA: todos los precios son más IVA.",
    ],
    context: [
      "Antes de comprar equipo, dinos cómo quieres usar cada espacio: música de fondo, películas, videollamadas o presentaciones. Con eso recomendamos el número de bocinas, el tamaño de pantalla y si conviene ocultar el cableado.",
      "En muros de tablaroca la pantalla necesita refuerzo o anclajes especiales. Una foto del muro y el modelo de la pantalla nos permiten decirte qué soporte usar antes de la visita.",
    ],
    faq: [
      ["¿Puedo usar mis bocinas o mi pantalla actuales?", "En muchos casos sí. Revisamos el modelo y las conexiones en la visita y te decimos qué conviene conservar y qué complementar."],
      ["¿Cuánto cuesta una sala de juntas para videollamadas?", "Una sala básica con pantalla, cámara y audio parte de $100,000. Para equipos pequeños hay opciones más sencillas que cotizamos según el espacio."],
      ["¿Cuánto cuesta instalar una pantalla en la pared?", "Desde $600 por pantalla, sin el soporte."],
    ],
  },
};
