import type { Article } from "./types";
import { ARTICLES_MORE, type ArticleMore } from "./articles-more";
import { ARTICLES_COST } from "./articles-cost";

/*
  Artículos de Recursos. Cada uno apoya a una página de servicio (pilar) y responde
  una búsqueda real. Sin cifras ni casos inventados; las recomendaciones técnicas son
  generales y se aclara cuándo depende del equipo o del fabricante.
*/

const BASE: Article[] = [
  {
    id: "que-es-un-agente-de-ia",
    unit: "digital",
    title: "Qué es un agente de IA y qué puede hacer por tu empresa",
    excerpt: "Un agente de IA entiende una solicitud, decide qué pasos seguir y usa tus sistemas para completarla. Cómo funciona y dónde aporta valor en una empresa.",
    date: "21 de octubre de 2026",
    published: "2026-10-21",
    minutes: 6,
    service: "agentes-ia",
    related: ["agente-ia-vs-chatbot", "implementar-agente-de-ia"],
    sections: [
      {
        id: "definicion",
        title: "Una definición sin tecnicismos",
        blocks: [
          { p: "Un agente de inteligencia artificial es un sistema que recibe una solicitud, la entiende, decide qué pasos seguir y ejecuta acciones hasta completar una tarea. Para entender usa un modelo de lenguaje, como los que están detrás de los asistentes conversacionales más conocidos. Para actuar usa herramientas: consultar un inventario, crear un pedido, agendar una cita o registrar un cliente en tu CRM." },
          { p: "La diferencia importante es esa última parte. Un asistente que solo responde preguntas te ahorra tiempo de lectura. Un agente que además puede actuar en tus sistemas te ahorra trabajo." },
        ],
      },
      {
        id: "componentes",
        title: "De qué está hecho un agente",
        blocks: [
          { p: "Aunque cada caso es distinto, casi todos los agentes que funcionan bien en una empresa comparten los mismos componentes:" },
          {
            list: [
              "Un disparador: el evento que lo activa, como un mensaje de WhatsApp, un correo con una factura o una solicitud en tu sitio.",
              "Contexto y conocimiento: la información que necesita para responder bien, como tu catálogo, tus políticas o tus manuales.",
              "Razonamiento: la capacidad de interpretar el caso y decidir el siguiente paso.",
              "Herramientas: las acciones que tiene permitido ejecutar en tus sistemas.",
              "Límites: lo que nunca debe hacer por su cuenta, como ofrecer descuentos o aprobar pagos.",
              "Supervisión humana: el momento en que el caso pasa a una persona.",
              "Métricas: cómo sabes si está funcionando.",
            ],
          },
          { callout: "Si un proveedor no puede explicarte los límites y la supervisión de su agente, todavía no está listo para hablar con tus clientes." },
        ],
      },
      {
        id: "usos",
        title: "Dónde aporta más valor",
        blocks: [
          { p: "Los agentes rinden mejor en procesos que se repiten muchas veces, tienen cierta variación y hoy dependen de que alguien lea, interprete y capture información. Algunos ejemplos habituales:" },
          {
            list: [
              "Atención a clientes por WhatsApp o web, con respuestas basadas en tu información y paso a una persona cuando hace falta.",
              "Calificación de solicitudes de venta: hace las preguntas que faltan, prioriza y deja todo registrado.",
              "Procesamiento de documentos: lee facturas o pedidos, valida datos y los registra en tu sistema.",
              "Asistentes internos que responden con tus manuales y citan la fuente.",
            ],
          },
        ],
      },
      {
        id: "cuando-no",
        title: "Cuándo no conviene",
        blocks: [
          { p: "No todo proceso necesita un agente. Si los pasos son siempre iguales y no hay que interpretar nada, una automatización tradicional suele ser más barata y predecible. Y si una decisión tiene consecuencias legales, médicas o financieras importantes, el agente puede preparar la información, pero la decisión debe seguir en manos de una persona." },
        ],
      },
      {
        id: "primer-paso",
        title: "Cómo dar el primer paso",
        blocks: [
          { p: "Empieza por un proceso concreto: el que más tiempo consume a tu equipo o el que más molesta a tus clientes. Mide cómo funciona hoy, diseña un agente acotado para ese caso y pruébalo con ejemplos reales antes de ponerlo frente a clientes. Cuando funcione, amplía." },
        ],
      },
    ],
    faq: [
      ["¿Un agente de IA reemplaza a mi equipo?", "Su mejor uso es quitarle a tu equipo el trabajo repetitivo para que se concentre en lo que requiere criterio y relación con el cliente."],
      ["¿Necesito tener mis datos ordenados para empezar?", "Ayuda, pero no es requisito. Parte del trabajo inicial es identificar qué información necesita el agente y en qué estado está."],
    ],
    seo: {
      title: "Qué es un agente de IA y qué puede hacer por tu empresa",
      description: "Qué es un agente de IA, de qué está hecho, dónde aporta valor en una empresa, cuánto cuesta y cuándo no conviene. Guía práctica sin tecnicismos.",
      slug: "/recursos/que-es-un-agente-de-ia",
      keywords: ["qué es un agente de IA", "agentes de inteligencia artificial", "IA agéntica", "agentes de IA para empresas"],
    },
  },
  {
    id: "agente-ia-vs-chatbot",
    unit: "digital",
    title: "Agente de IA, chatbot o automatización: cómo elegir",
    excerpt: "Los tres atienden o resuelven tareas, pero funcionan de forma muy distinta. Una comparación práctica para elegir según tu proceso.",
    date: "21 de octubre de 2026",
    published: "2026-10-21",
    minutes: 5,
    service: "agentes-ia",
    related: ["que-es-un-agente-de-ia", "implementar-agente-de-ia"],
    sections: [
      {
        id: "chatbot",
        title: "El chatbot tradicional",
        blocks: [
          { p: "Funciona con un menú o con respuestas predefinidas: si el cliente escribe algo que coincide con una opción, responde; si no, se pierde o lo manda a una persona. Es útil para preguntas muy simples y repetidas, como horarios o ubicación." },
          { p: "Su límite aparece cuando el cliente escribe como habla una persona: con faltas, con varias preguntas a la vez o con un caso que nadie previó." },
        ],
      },
      {
        id: "automatizacion",
        title: "La automatización",
        blocks: [
          { p: "Ejecuta reglas fijas: cuando llega un formulario, crea un registro, envía un correo y avisa al responsable. Es rápida, barata y muy confiable cuando el proceso es predecible." },
          { p: "Su límite es la interpretación. Si hay que leer un mensaje libre, entender un documento o decidir entre varias opciones, la regla fija se queda corta." },
        ],
      },
      {
        id: "agente",
        title: "El agente de IA",
        blocks: [
          { p: "Entiende el caso, decide qué hacer y usa herramientas para hacerlo, dentro de los límites que se le definen. Es la opción adecuada cuando hay variación: mensajes distintos, documentos en distintos formatos o solicitudes que requieren hacer preguntas." },
          { p: "Necesita más diseño que las otras dos opciones: hay que definir qué puede hacer, qué no, cuándo pasa el caso a una persona y cómo se mide." },
        ],
      },
      {
        id: "elegir",
        title: "Cómo elegir",
        blocks: [
          {
            kv: [
              ["Preguntas muy simples y siempre iguales", "Chatbot o respuestas rápidas"],
              ["Pasos predecibles entre sistemas", "Automatización"],
              ["Mensajes o documentos con variación", "Agente de IA"],
              ["Un proceso completo con partes de cada tipo", "Combinación de automatización y agente"],
            ],
          },
          { callout: "En la práctica, muchas soluciones combinan las tres: una automatización mueve los datos y un agente se encarga solo de los pasos que requieren interpretar." },
        ],
      },
    ],
    faq: [
      ["¿Puedo convertir mi chatbot actual en un agente?", "A menudo se puede reutilizar el canal y parte del contenido, pero la lógica cambia: hay que definir herramientas, límites y supervisión."],
    ],
    seo: {
      title: "Agente de IA vs chatbot vs automatización: cómo elegir",
      description: "Agente de IA vs chatbot vs automatización: diferencias, costos y una tabla práctica para decidir cuál conviene a cada proceso de tu empresa.",
      slug: "/recursos/agente-de-ia-vs-chatbot",
      keywords: ["agente de IA vs chatbot", "diferencia entre chatbot y agente de IA", "automatización vs inteligencia artificial"],
    },
  },
  {
    id: "implementar-agente-de-ia",
    unit: "digital",
    title: "Cómo implementar un agente de IA en tu empresa, paso a paso",
    excerpt: "De elegir el primer caso de uso a ponerlo en marcha con supervisión. Las etapas que reducen el riesgo y aceleran resultados.",
    date: "21 de octubre de 2026",
    published: "2026-10-21",
    minutes: 7,
    service: "agentes-ia",
    related: ["que-es-un-agente-de-ia", "agente-ia-vs-chatbot"],
    sections: [
      {
        id: "caso",
        title: "1. Elige un caso de uso acotado",
        blocks: [
          { p: "El error más común es querer un agente que haga todo. Empieza por un proceso concreto, frecuente y medible. Dos preguntas ayudan a elegir: ¿qué tarea consume más horas de tu equipo? y ¿dónde esperan más tus clientes?" },
        ],
      },
      {
        id: "medir",
        title: "2. Mide cómo funciona hoy",
        blocks: [
          { p: "Antes de construir, registra el punto de partida: cuántas solicitudes llegan, cuánto tarda la primera respuesta, cuántos errores de captura hay. Sin esa línea base no podrás saber si el agente mejoró algo." },
        ],
      },
      {
        id: "disenar",
        title: "3. Diseña el agente completo",
        blocks: [
          { p: "El diseño define qué información consulta, qué herramientas puede usar, qué permisos tiene y en qué casos debe pasar el control a una persona. También define el tono y lo que nunca debe prometer." },
          { list: ["Fuentes de conocimiento autorizadas", "Acciones permitidas y sus permisos", "Límites explícitos", "Reglas de paso a una persona", "Registro de cada acción"] },
        ],
      },
      {
        id: "probar",
        title: "4. Prueba con casos reales antes de exponerlo",
        blocks: [
          { p: "Reúne ejemplos reales de tu operación, incluidos los difíciles, y evalúa las respuestas del agente contra lo que haría tu mejor persona. Corrige y vuelve a probar. Aquí aparecen la mayoría de los problemas, antes de que los vea un cliente." },
          { callout: "Una buena práctica es lanzar primero en modo asistido: el agente prepara la respuesta o la acción y una persona la aprueba.", tone: "info" },
        ],
      },
      {
        id: "lanzar",
        title: "5. Lanza con supervisión y mejora continua",
        blocks: [
          { p: "Pon el agente en marcha con monitoreo: revisa conversaciones, mide contra la línea base y ajusta. Cuando el primer caso funcione de forma estable, es momento de sumar el siguiente." },
        ],
      },
      {
        id: "gobierno",
        title: "6. No olvides el gobierno",
        blocks: [
          { p: "Define quién es responsable del agente, qué datos puede usar, dónde se procesan y cómo se atienden los errores. Elegir servicios empresariales que permitan excluir tu información del entrenamiento de modelos es parte de esta conversación." },
        ],
      },
    ],
    faq: [
      ["¿Cuánto tarda una primera versión?", "Depende del alcance y de las integraciones. Un caso acotado con pocas herramientas se puede validar mucho antes que un proceso completo con varios sistemas."],
      ["¿Qué necesito de mi lado?", "Una persona responsable del proceso, acceso a la información que el agente usará y tiempo para revisar los resultados de las pruebas."],
    ],
    seo: {
      title: "Cómo implementar un agente de IA en tu empresa, paso a paso",
      description: "Cómo implementar un agente de IA en tu empresa: caso de uso, medición, límites, pruebas con casos reales, lanzamiento con supervisión, tiempos y costos.",
      slug: "/recursos/como-implementar-un-agente-de-ia",
      keywords: ["cómo implementar un agente de IA", "implementación de agentes de IA", "IA en empresas", "piloto de inteligencia artificial"],
    },
  },
  {
    id: "domotica-sin-obra",
    unit: "integra",
    title: "Domótica sin obra: qué puedes automatizar en tu casa o departamento",
    excerpt: "No necesitas romper muros para tener una casa inteligente. Qué se puede automatizar con soluciones inalámbricas y qué conviene dejar para una remodelación.",
    date: "21 de octubre de 2026",
    published: "2026-10-21",
    minutes: 5,
    service: "domotica",
    related: ["mantenimiento-minisplit"],
    sections: [
      {
        id: "posible",
        title: "Lo que sí se puede hacer sin obra",
        blocks: [
          { p: "Muchas funciones de una casa inteligente se resuelven con equipos inalámbricos que se instalan en apagadores, contactos o directamente sobre los equipos existentes:" },
          {
            list: [
              "Iluminación: apagadores o focos inteligentes, escenas y horarios.",
              "Clima: control de minisplits desde el teléfono o por horario.",
              "Persianas y cortinas: motores que se adaptan a muchos sistemas existentes.",
              "Accesos: chapas inteligentes y videoporteros.",
              "Seguridad: cámaras y sensores de apertura con avisos al teléfono.",
            ],
          },
        ],
      },
      {
        id: "obra",
        title: "Lo que conviene dejar para una remodelación",
        blocks: [
          { p: "Si vas a remodelar, aprovecha para preparar cableado de red, canalizaciones para cámaras y audio, y cajas adecuadas para controles. Lo cableado suele ser más estable y deja el sistema listo para crecer." },
        ],
      },
      {
        id: "ecosistema",
        title: "Elige un ecosistema antes de comprar",
        blocks: [
          { p: "El error más común es comprar dispositivos de marcas distintas que no se hablan entre sí. Antes de elegir equipos, define desde dónde quieres controlarlo todo: una aplicación, un asistente de voz o un panel." },
          { callout: "Pregunta siempre qué funciones siguen operando si se cae el internet. Las mejores soluciones mantienen lo básico de forma local." },
        ],
      },
      {
        id: "empezar",
        title: "Por dónde empezar",
        blocks: [
          { p: "Empieza por un área y una necesidad clara, por ejemplo la iluminación de la sala o el clima de las recámaras. Si el sistema está bien elegido, podrás sumar áreas sin rehacer lo instalado." },
        ],
      },
    ],
    faq: [
      ["¿La domótica funciona en un departamento rentado?", "Muchas soluciones inalámbricas se pueden retirar al mudarte. Conviene revisar con el arrendador cualquier cambio en apagadores o chapas."],
    ],
    seo: {
      title: "Domótica sin obra: qué automatizar en casa o departamento",
      description: "Domótica sin obra: qué automatizar en tu casa o departamento sin romper muros (luces, clima, persianas y accesos), cuánto cuesta y por dónde empezar.",
      slug: "/recursos/domotica-sin-obra",
      keywords: ["domótica sin obra", "casa inteligente departamento", "domótica inalámbrica", "automatizar casa"],
    },
  },
  {
    id: "mantenimiento-minisplit",
    unit: "facilities",
    title: "¿Cada cuánto dar mantenimiento a un minisplit?",
    excerpt: "La frecuencia depende del uso y del ambiente. Qué puedes hacer tú, qué debe hacer un técnico y qué señales indican que ya toca.",
    date: "21 de octubre de 2026",
    published: "2026-10-21",
    minutes: 4,
    service: "aire-acondicionado",
    related: ["por-que-se-bota-la-pastilla", "poliza-mantenimiento-preventivo"],
    sections: [
      {
        id: "regla",
        title: "La regla general",
        blocks: [
          { p: "Como referencia, muchos fabricantes recomiendan revisar y limpiar los filtros con frecuencia durante la temporada de uso y programar un mantenimiento profesional al menos una vez al año. En negocios, equipos que trabajan muchas horas o ambientes con polvo o grasa, conviene hacerlo con mayor frecuencia." },
          { callout: "La recomendación exacta depende de tu equipo. Revisa el manual del fabricante o pregúntale al técnico durante la visita.", tone: "info" },
        ],
      },
      {
        id: "tu",
        title: "Lo que puedes hacer tú",
        blocks: [
          { list: ["Limpiar o enjuagar los filtros siguiendo el manual del equipo.", "Mantener despejada la unidad exterior.", "Revisar que el agua del drenaje salga por donde debe."] },
        ],
      },
      {
        id: "tecnico",
        title: "Lo que debe hacer un técnico",
        blocks: [
          { list: ["Limpieza de serpentines y bandeja de condensados.", "Revisión del drenaje.", "Revisión de conexiones eléctricas y funcionamiento general.", "Detección de fallas antes de que crezcan."] },
        ],
      },
      {
        id: "senales",
        title: "Señales de que ya toca",
        blocks: [
          { list: ["No enfría como antes.", "Gotea agua dentro del espacio.", "Huele a humedad al encenderlo.", "Hace ruidos o vibra más de lo normal.", "Lleva más de un año sin servicio."] },
        ],
      },
    ],
    faq: [
      ["¿El mantenimiento reduce el consumo de luz?", "Un equipo limpio trabaja con menos esfuerzo para lograr la misma temperatura, lo que suele ayudar a su eficiencia. El efecto depende del estado y del uso del equipo."],
    ],
    seo: {
      title: "¿Cada cuánto dar mantenimiento a un minisplit?",
      description: "Cada cuánto dar mantenimiento a un minisplit, qué puedes hacer tú, qué hace un técnico, cuánto cuesta en la CDMX y las señales de que ya lo necesita.",
      slug: "/recursos/cada-cuanto-dar-mantenimiento-a-un-minisplit",
      keywords: ["cada cuánto dar mantenimiento a un minisplit", "mantenimiento de minisplit", "limpieza de aire acondicionado"],
    },
  },
  {
    id: "por-que-se-bota-la-pastilla",
    unit: "facilities",
    title: "¿Por qué se bota la pastilla? Causas comunes y qué hacer",
    excerpt: "Una pastilla que se bota es una protección que está haciendo su trabajo. Las causas más frecuentes y qué hacer de forma segura.",
    date: "21 de octubre de 2026",
    published: "2026-10-21",
    minutes: 4,
    service: "electricidad",
    related: ["mantenimiento-minisplit", "poliza-mantenimiento-preventivo"],
    sections: [
      {
        id: "que-es",
        title: "Qué significa que se bote",
        blocks: [
          { p: "La pastilla, o interruptor termomagnético, corta la energía de un circuito cuando detecta un problema. Cuando se bota, te está avisando que algo en ese circuito no está bien." },
        ],
      },
      {
        id: "causas",
        title: "Causas más comunes",
        blocks: [
          {
            list: [
              "Sobrecarga: demasiados equipos conectados al mismo circuito, sobre todo los de alto consumo.",
              "Cortocircuito: contacto entre conductores, a veces por un cable dañado o un equipo con falla.",
              "Falla a tierra o humedad: agua o humedad en contactos o cajas.",
              "Un equipo dañado: cuando se bota siempre al conectar el mismo aparato.",
              "La propia pastilla: con el tiempo puede desgastarse.",
            ],
          },
        ],
      },
      {
        id: "que-hacer",
        title: "Qué hacer de forma segura",
        blocks: [
          { list: ["Desconecta los equipos de esa zona.", "Sube la pastilla una vez.", "Reconecta los equipos uno por uno para ver si alguno la hace botar."], ordered: true },
          { callout: "Si se bota de inmediato, si hay olor a quemado, chispas o un contacto caliente, no la sigas subiendo. Deja la zona sin energía y pide una revisión.", tone: "warn" },
        ],
      },
      {
        id: "revision",
        title: "Qué revisa un electricista",
        blocks: [
          { p: "Un diagnóstico revisa la carga del circuito, el estado de conductores y conexiones, la presencia de humedad y el estado de la pastilla. Con eso se define si basta con redistribuir equipos o si hace falta una reparación o un circuito nuevo." },
        ],
      },
    ],
    seo: {
      title: "¿Por qué se bota la pastilla? Causas y qué hacer",
      description: "Por qué se bota la pastilla en tu casa o negocio: sobrecarga, cortocircuito, humedad o un equipo dañado, qué hacer de forma segura y cuánto cuesta revisarlo.",
      slug: "/recursos/por-que-se-bota-la-pastilla",
      keywords: ["por qué se bota la pastilla", "se bota el breaker", "falla eléctrica en casa", "interruptor termomagnético se bota"],
    },
  },
  {
    id: "poliza-mantenimiento-preventivo",
    unit: "facilities",
    title: "Qué incluye una póliza de mantenimiento preventivo",
    excerpt: "Para negocios, oficinas y naves, una póliza ordena el mantenimiento y evita sorpresas. Qué debería incluir y cómo evaluarla.",
    date: "21 de octubre de 2026",
    published: "2026-10-21",
    minutes: 5,
    service: "mantenimiento-programado",
    related: ["mantenimiento-minisplit", "por-que-se-bota-la-pastilla"],
    sections: [
      {
        id: "que-es",
        title: "Qué es una póliza",
        blocks: [
          { p: "Es un acuerdo para dar mantenimiento programado a equipos e instalaciones durante un periodo, con visitas en fechas definidas. Su objetivo es reducir las fallas inesperadas y llevar un registro de cada equipo." },
        ],
      },
      {
        id: "incluir",
        title: "Qué debería incluir",
        blocks: [
          {
            list: [
              "Inventario inicial de equipos e instalaciones, con su estado.",
              "Frecuencia de visita por equipo, según su uso.",
              "Alcance de cada visita: qué se revisa y qué se limpia.",
              "Bitácora y reporte después de cada visita.",
              "Cómo se atienden los correctivos entre visitas y cómo se cotizan.",
              "Qué materiales y refacciones están incluidos y cuáles no.",
            ],
          },
        ],
      },
      {
        id: "evaluar",
        title: "Cómo evaluar una propuesta",
        blocks: [
          { p: "Compara el alcance además del precio. Una póliza barata que no documenta las visitas ni define cómo se atienden las fallas puede salir más cara. Pide ver un ejemplo de reporte de visita." },
        ],
      },
      {
        id: "para-quien",
        title: "Para quién tiene sentido",
        blocks: [
          { list: ["Cadenas y sucursales que necesitan un mismo estándar.", "Oficinas y edificios con climatización en áreas comunes.", "Naves y bodegas con equipos que trabajan muchas horas."] },
        ],
      },
    ],
    seo: {
      title: "Qué incluye una póliza de mantenimiento preventivo",
      description: "Qué incluye una póliza de mantenimiento preventivo para negocios, oficinas y naves: inventario, frecuencia, reportes, correctivos, costos y cómo evaluarla.",
      slug: "/recursos/que-incluye-una-poliza-de-mantenimiento",
      keywords: ["póliza de mantenimiento preventivo", "qué incluye una póliza de mantenimiento", "mantenimiento preventivo empresas"],
    },
  },
];

/** Inserts the extra sections (articles-more.ts) after their anchor section and appends extra FAQ. */
function withMore(a: Article): Article {
  const parts: ArticleMore[] = [ARTICLES_MORE[a.id], ARTICLES_COST[a.id]].filter(Boolean);
  if (!parts.length) return a;
  const more: ArticleMore = { sections: parts.flatMap((p) => p.sections), faq: parts.flatMap((p) => p.faq ?? []) };
  const sections = [...a.sections];
  for (const { after, ...section } of more.sections) {
    const i = after ? sections.findIndex((s) => s.id === after) : -1;
    if (i >= 0) sections.splice(i + 1, 0, section);
    else sections.push(section);
  }
  return { ...a, sections, faq: [...(a.faq ?? []), ...(more.faq ?? [])] };
}

export const ARTICLES: Article[] = BASE.map(withMore);

export const articleById = (id: string) => ARTICLES.find((a) => a.id === id);
export const articlesOf = (unit: string) => ARTICLES.filter((a) => a.unit === unit);
