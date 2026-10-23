import type { ServiceExtras } from "./types";

/*
  Fuentes (consultadas el 23 de octubre de 2026): precios publicados por aireyclimas.mx,
  homepro.com.mx, simpleclima.com, jpserviciosconstrucctivos.com, tulbox.pro, lg.com/mx y
  renovaingenieria.com; rangos de plataformas cronoshare.com.mx, drhandy.app,
  habitissimo.com.mx y leadduo.io; plomería: homepro.com.mx, cronoshare.com.mx,
  habitissimo.com.mx, lavado-de-cisternas.com y lavadotinacosycisternas.com; costo directo de mexico.generadordeprecios.info (CYPE).
  Muchos se publican sin IVA. Precios autorizados por Aurhora el 23 de octubre de 2026: se publican
  como "Desde" con el límite inferior de cada rango.
*/

export const FACILITIES_EXTRAS: Record<string, ServiceExtras> = {
  "aire-acondicionado": {
    costIntro: "Los precios para minisplits van desde unos cientos de pesos por una visita de diagnóstico hasta varios miles por una instalación. Te sirven para planear; el precio final depende de tu equipo, del acceso y de lo que encontremos en la revisión.",
    prices: [
      { concept: "Visita técnica o diagnóstico", range: "Desde $450", unit: "por visita, descontable" },
      { concept: "Mantenimiento preventivo en casa (1 a 2 toneladas)", range: "Desde $950", unit: "por equipo" },
      { concept: "Mantenimiento en negocio u oficina (minisplit o cassette)", range: "Desde $2,900", unit: "por equipo" },
      { concept: "Instalación básica de minisplit (mano de obra)", range: "Desde $2,250", unit: "por equipo" },
      { concept: "Metro adicional de tubería", range: "Desde $450", unit: "por metro" },
      { concept: "Recarga de gas, después de reparar la fuga", range: "Desde $1,050", unit: "según kilos" },
      { concept: "Localización y reparación de fuga con carga", range: "Desde $2,900", unit: "por evento" },
    ],
    factors: [
      "Capacidad y tipo de equipo (minisplit, cassette, piso-techo).",
      "Altura y acceso a la unidad exterior.",
      "Tiempo sin mantenimiento y estado del serpentín.",
      "Número de equipos atendidos en la misma visita.",
      "En instalaciones: metros de tubería, base o soporte y línea eléctrica.",
      "Horario: los servicios fuera de horario suelen costar más.",
    ],
    timing: [
      { label: "Mantenimiento o limpieza", value: "1 a 1.5 horas por equipo" },
      { label: "Instalación de minisplit", value: "3 a 8 horas" },
      { label: "Diagnóstico", value: "En la misma visita" },
      { label: "Confirmación de cita", value: "Por WhatsApp, en horario de atención" },
    ],
    excludes: [
      "Gas refrigerante y reparación de fugas.",
      "Refacciones: capacitores, tarjetas electrónicas, compresor.",
      "Tubería adicional, perforación de losa, bases y canaleta.",
      "Línea eléctrica dedicada para equipos nuevos.",
      "Trabajo en altura que requiera andamio o elevador.",
    ],
    faq: [
      ["¿Cuánto cuesta el mantenimiento de un minisplit en la CDMX?", "Desde $950 por equipo en casa y desde $2,900 en negocios. Te damos el precio exacto después de ver tu equipo."],
      ["¿Cuánto tarda la limpieza de un minisplit?", "Normalmente entre una hora y hora y media por equipo, según el acceso y qué tan sucio esté."],
      ["¿El diagnóstico tiene costo?", "Sí, y te lo informamos antes de la visita. Parte de $450; si aceptas la cotización, se descuenta del trabajo."],
    ],
  },

  electricidad: {
    costIntro: `Los trabajos eléctricos se cobran por visita, por pieza o por circuito. La mayoría son de mano de obra: el material se cotiza aparte, y la diferencia entre un contacto básico y uno de marca premium puede ser grande.`,
    prices: [
      { concept: "Visita o diagnóstico", range: "Desde $500", unit: "por visita, descontable" },
      { concept: "Cambio de contacto o apagador", range: "Desde $300", unit: "por pieza" },
      { concept: "Instalación de luminaria (altura estándar)", range: "Desde $450", unit: "por pieza" },
      { concept: "Cambio de pastilla", range: "Desde $450", unit: "por pieza" },
      { concept: "Circuito nuevo", range: "Desde $1,050", unit: "por circuito" },
      { concept: "Salida de 220 V para minisplit (sin material)", range: "Desde $1,400", unit: "por salida" },
      { concept: "Cambio de centro de carga", range: "Desde $1,750", unit: "por servicio" },
    ],
    factors: [
      "Tipo de trabajo y cantidad de puntos.",
      "Material elegido: básico o de marca.",
      "Estado de la instalación existente.",
      "Canalización visible o por dentro del muro (ranurar y resanar).",
      "Altura de techos y acceso.",
      "Urgencia y horario de atención.",
    ],
    timing: [
      { label: "Contacto, apagador o luminaria", value: "30 minutos a 1.5 horas por pieza (aprox.)" },
      { label: "Diagnóstico de una falla", value: "En la misma visita" },
      { label: "Circuito nuevo", value: "Medio día a un día (aprox.)" },
      { label: "Cambio de centro de carga", value: "Medio día (aprox.)" },
    ],
    excludes: [
      "Material eléctrico: contactos de marca, luminarias, cable y centro de carga.",
      "Resanes y pintura después de ranurar muros.",
      "Trámites ante CFE, como aumento de carga.",
      "Trabajo en altura con andamio.",
    ],
    faq: [
      ["¿Cuánto cobra un electricista por venir a casa en la CDMX?", "La visita o diagnóstico parte de $500 y suele descontarse si aceptas el trabajo."],
      ["¿El material está incluido en el precio?", "Normalmente no. Te decimos qué material se necesita y lo incluimos en la cotización, o puedes comprarlo tú si lo prefieres."],
    ],
  },

  plomeria: {
    costIntro: "La mayoría de los trabajos de plomería se cobran por visita o por trabajo terminado. Los precios son de mano de obra: los muebles, accesorios y equipos se cotizan aparte o puedes comprarlos tú.",
    prices: [
      { concept: "Visita o diagnóstico", range: "Desde $500", unit: "por visita, descontable" },
      { concept: "Hora de servicio", range: "Desde $300", unit: "por hora" },
      { concept: "Reparación de fuga visible", range: "Desde $600", unit: "por fuga" },
      { concept: "Cambio de llave o mezcladora (mano de obra)", range: "Desde $700", unit: "por pieza" },
      { concept: "Destape de fregadero, lavabo o WC", range: "Desde $850", unit: "por servicio" },
      { concept: "Destape de drenaje con equipo", range: "Desde $950", unit: "por servicio" },
      { concept: "Instalación de WC (mano de obra)", range: "Desde $1,200", unit: "por pieza" },
      { concept: "Instalación de lavabo o fregadero (mano de obra)", range: "Desde $1,400", unit: "por pieza" },
      { concept: "Lavado y desinfección de tinaco (hasta 1,100 L)", range: "Desde $350", unit: "por tinaco" },
      { concept: "Lavado y desinfección de cisterna (hasta 10,000 L)", range: "Desde $1,750", unit: "por cisterna" },
      { concept: "Instalación de tinaco de 450 a 1,100 L (mano de obra)", range: "Desde $1,200", unit: "por tinaco" },
      { concept: "Bomba de agua, suministro e instalación", range: "Desde $2,350", unit: "por equipo" },
      { concept: "Instalación de calentador (mano de obra y conexiones)", range: "Desde $3,500", unit: "por equipo" },
    ],
    factors: [
      "Si la fuga está a la vista o dentro de un muro o piso.",
      "Acceso al tinaco o la cisterna: azotea, altura o espacio reducido.",
      "Capacidad del tinaco o la cisterna.",
      "Tipo de tubería: cobre, CPVC, PPR o galvanizada.",
      "Muebles y accesorios que elijas.",
      "Si hace falta romper y resanar.",
    ],
    timing: [
      { label: "Fuga visible o cambio de llave", value: "1 a 2 horas" },
      { label: "Destape", value: "1 a 2 horas; más si el drenaje requiere equipo" },
      { label: "WC, lavabo o fregadero", value: "2 a 3 horas por pieza" },
      { label: "Lavado de tinaco", value: "1 a 2 horas por tinaco" },
      { label: "Lavado de cisterna", value: "Medio día (aprox.)" },
      { label: "Tinaco con bomba", value: "1 día (aprox.)" },
    ],
    excludes: [
      "Muebles, accesorios y equipos: WC, mezcladoras, tinacos, bombas y calentadores.",
      "Ranurado, demolición y resanes.",
      "Conexión a la línea de gas.",
      "Desazolve de drenaje municipal o con camión de presión.",
      "Material adicional a lo cotizado.",
    ],
    context: [
      "Antes de la visita, ubica la llave de paso general y la del área con el problema. Si hay una fuga, cerrarla evita daños mientras llegamos. Si no sabes dónde está, te ayudamos a encontrarla por videollamada o en la visita.",
      "Si el recibo de agua subió sin explicación, haz una prueba sencilla: cierra todas las llaves y revisa si el medidor sigue avanzando. Si avanza, hay una fuga oculta y conviene revisarla antes de que dañe muros o pisos.",
    ],
    faq: [
      ["¿Cuánto cobra un plomero en la CDMX?", "La visita o diagnóstico parte de $500 con IVA y se descuenta si aceptas el trabajo. Una fuga visible se repara desde $600 y un destape de fregadero o WC desde $850."],
      ["¿Cuánto cuesta lavar un tinaco o una cisterna?", "El lavado y desinfección de un tinaco de hasta 1,100 litros parte de $350 y el de una cisterna de hasta 10,000 litros desde $1,750, con IVA incluido."],
    ],
  },

  reparaciones: {
    costIntro: "Los trabajos de reparación del hogar se cobran por trabajo o por tiempo. Se cobra una visita mínima, por eso conviene juntar varios pendientes en una sola visita.",
    prices: [
      { concept: "Visita mínima (2 horas)", range: "Desde $700", unit: "por visita" },
      { concept: "Hora de servicio", range: "Desde $350", unit: "por hora" },
      { concept: "Media jornada (4 horas)", range: "Desde $950", unit: "por jornada" },
      { concept: "Jornada completa", range: "Desde $1,750", unit: "por jornada" },
      { concept: "Instalar soporte de TV en muro (soporte aparte)", range: "Desde $600", unit: "por pantalla" },
      { concept: "Repisas o cuadros", range: "Desde $300", unit: "por trabajo" },
    ],
    factors: [
      "Cantidad de trabajos en la misma visita.",
      "Tipo de muro: tablaroca, concreto o ladrillo.",
      "Peso de lo que se va a colgar.",
      "Materiales y herrajes necesarios.",
      "Altura y facilidad de acceso.",
    ],
    timing: [
      { label: "Soporte de TV", value: "1 a 2 horas (aprox.)" },
      { label: "Repisas o cuadros", value: "Menos de una hora por pieza (aprox.)" },
      { label: "Lista de pendientes", value: "Media jornada o jornada completa" },
      { label: "Visita mínima", value: "2 horas" },
    ],
    excludes: [
      "Soportes, repisas, herrajes y materiales.",
      "Pintura y resanes mayores.",
      "Plomería, tablaroca o impermeabilización (se cotizan aparte).",
      "Traslado de muebles pesados.",
    ],
    context: [
      "Haz una lista con todo lo que quieres resolver y toma una foto de cada punto. Con eso podemos estimar el tiempo total, llevar las herramientas correctas y decirte si conviene media jornada o una jornada completa.",
      "Si ya compraste soportes, repisas o accesorios, compártenos el modelo o una foto de la caja. Así revisamos que sean adecuados para tu muro y para el peso que van a cargar.",
    ],
    faq: [
      ["¿Cuánto cuesta instalar un soporte de TV?", "Desde $600 por pantalla, sin contar el soporte."],
      ["¿Cobran por hora o por trabajo?", "Depende de la lista. Con varios pendientes, conviene una cotización por media jornada o jornada completa."],
    ],
  },

  "mantenimiento-programado": {
    costIntro: "El precio de una póliza depende del inventario de equipos y de la frecuencia de visitas. Estos precios de partida te ayudan a dimensionar el presupuesto antes del levantamiento.",
    prices: [
      { concept: "Póliza para negocio con 5 a 10 minisplits", range: "Desde $4,100", unit: "al mes" },
      { concept: "Plan anual por minisplit (mantenimiento + diagnóstico)", range: "Desde $2,250", unit: "por equipo al año" },
      { concept: "Mantenimiento preventivo de tablero eléctrico", range: "Desde $1,750", unit: "por tablero" },
      { concept: "Mantenimiento eléctrico de oficina o local", range: "Desde $1,750", unit: "por servicio" },
      { concept: "Hora de técnico especializado", range: "Desde $650", unit: "por hora" },
    ],
    factors: [
      "Número y tipo de equipos.",
      "Frecuencia de visitas.",
      "Número de sucursales y distancia entre ellas.",
      "Tiempo de respuesta acordado para fallas.",
      "Si la póliza incluye correctivos y refacciones.",
    ],
    timing: [
      { label: "Levantamiento e inventario", value: "1 a 2 visitas (aprox.)" },
      { label: "Inicio de la póliza", value: "Después de aprobar la propuesta" },
      { label: "Frecuencia típica en comercios", value: "Cada 3 meses" },
      { label: "Frecuencia típica en casas", value: "Cada 6 meses" },
    ],
    excludes: [
      "Refacciones y equipos nuevos.",
      "Correctivos mayores, que se cotizan con tu aprobación.",
      "Gas refrigerante.",
      "Visitas fuera del horario acordado.",
    ],
    context: [
      "Antes de pedir una póliza, reúne lo que sepas de tus equipos: cuántos son, dónde están, de qué marca y cuándo recibieron servicio por última vez. Si no tienes ese registro, el inventario inicial sirve justamente para armarlo.",
      "Pregunta siempre cómo se atienden las fallas entre visitas y qué pasa con las refacciones. Una póliza barata que no aclara esos dos puntos puede salir más cara cuando algo falla.",
    ],
    faq: [
      ["¿Qué pasa si un equipo falla entre visitas?", "Lo reportas por WhatsApp y coordinamos la atención según el tiempo de respuesta acordado en la póliza. Como ya conocemos el equipo y su historial, el diagnóstico suele ser más rápido. El correctivo se cotiza antes de ejecutarlo."],
      ["¿Cuánto cuesta una póliza de mantenimiento?", "Depende del inventario. Para un negocio con 5 a 10 minisplits, la póliza parte de $4,100 al mes."],
      ["¿Cada cuánto son las visitas?", "En comercios suele ser cada tres meses; en restaurantes e industria, con mayor frecuencia; en casas, cada seis meses. Se ajusta con el uso real."],
    ],
  },

  "proyectos-residenciales": {
    costIntro: "Los proyectos residenciales se cotizan por etapas después del levantamiento. Estos precios de partida ayudan a dimensionar el presupuesto; el total cambia mucho porque cada casa es distinta.",
    prices: [
      { concept: "Instalación eléctrica nueva", range: "Desde $250", unit: "por m²" },
      { concept: "Punto eléctrico en obra (mano de obra)", range: "Desde $550", unit: "por punto" },
      { concept: "Remodelación eléctrica completa", range: "Desde $17,400", unit: "por inmueble" },
      { concept: "Remodelación de baño", range: "Desde $11,050", unit: "por proyecto" },
      { concept: "Remodelación de cocina", range: "Desde $11,300", unit: "por proyecto" },
      { concept: "Preparación para minisplit (salida 220 V)", range: "Desde $1,400", unit: "por salida" },
    ],
    factors: [
      "Metros cuadrados y número de puntos eléctricos.",
      "Estado de la instalación existente.",
      "Acabados elegidos.",
      "Si la casa está habitada durante la obra.",
      "Coordinación con seguridad, red y domótica.",
    ],
    timing: [
      { label: "Levantamiento", value: "Una visita" },
      { label: "Propuesta", value: "Por escrito, después del levantamiento" },
      { label: "Ejecución", value: "Según el programa de trabajo de la propuesta" },
    ],
    excludes: [
      "Obra civil mayor y cambios estructurales.",
      "Muebles, acabados y equipos que elijas por tu cuenta.",
      "Permisos de construcción, cuando apliquen.",
      "Limpieza fina al terminar.",
    ],
    context: [
      "Antes de remodelar, define qué quieres lograr en cada espacio y en qué orden. Las instalaciones eléctricas y el cableado para red, cámaras o domótica se hacen antes de los acabados; dejarlos para después suele implicar romper y resanar.",
      "Si vas a vivir en la casa durante la obra, avísanos desde el levantamiento. Programamos las etapas para que puedas seguir usando las áreas principales y te decimos qué días habrá cortes de energía.",
    ],
    faq: [
      ["¿Puedo hacer la remodelación por etapas?", "Sí. Es común empezar por la instalación eléctrica y el cableado, que van antes de los acabados, y dejar para una segunda etapa la climatización o la domótica. La propuesta indica qué conviene hacer primero."],
      ["¿Cuánto cuesta cambiar la instalación eléctrica de una casa?", "Una instalación nueva parte de $250 por m² y una remodelación eléctrica completa desde $17,400."],
    ],
  },

  "proyectos-industriales": {
    costIntro: "En proyectos comerciales e industriales el precio depende del área, la altura y los horarios en que se puede trabajar. Estos precios de partida sirven para estimar el orden de magnitud antes del levantamiento.",
    prices: [
      { concept: "Iluminación LED de nave (proyecto completo)", range: "Desde $150", unit: "por m²" },
      { concept: "Luminaria LED tipo campana, suministro e instalación", range: "Desde $6,750", unit: "por luminaria, costo directo" },
      { concept: "Mantenimiento básico de nave o local", range: "Desde $2,900", unit: "por servicio" },
      { concept: "Mantenimiento de climatización comercial", range: "Desde $3,250", unit: "por equipo" },
      { concept: "Mantenimiento preventivo de tablero", range: "Desde $1,750", unit: "por tablero" },
    ],
    factors: [
      "Superficie y altura de trabajo.",
      "Necesidad de andamio o elevador.",
      "Horarios en que se puede trabajar sin detener la operación.",
      "Requisitos de la plaza, el corporativo o la aseguradora.",
      "Documentación y reportes de entrega.",
    ],
    timing: [
      { label: "Levantamiento", value: "Una visita con tu responsable de operación" },
      { label: "Iluminación LED de nave mediana", value: "3 a 7 días hábiles" },
      { label: "Ejecución", value: "Por etapas, según el programa acordado" },
    ],
    excludes: [
      "Renta de elevador o andamio.",
      "Luminarias y equipos, si se compran por separado.",
      "Permisos y estudios específicos.",
      "Trabajos fuera de horario, que se cotizan aparte.",
    ],
    context: [
      "Para cotizar un proyecto comercial o industrial nos ayuda tener planos o un croquis con medidas, la altura de trabajo y los horarios en que se puede intervenir sin afectar la operación.",
      "Si tu plaza, corporativo o aseguradora pide requisitos específicos, como bitácoras, seguros o documentación de entrega, compártelos desde el inicio. Los incluimos en la propuesta para que no se conviertan en un costo sorpresa al final.",
    ],
    faq: [
      ["¿Cuánto cuesta cambiar la iluminación de una nave a LED?", "Los proyectos completos parten de $150 por m², incluyendo luminarias e instalación."],
    ],
  },
};
