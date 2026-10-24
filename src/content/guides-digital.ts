import type { Article } from "./types";

/* Guías de Recursos (digital). Una por servicio; sin cifras ni casos inventados.
   Los precios se copian de extras-digital.ts como "Desde". */
export const GUIDES_DIGITAL: Article[] = [
  {
    id: "que-procesos-automatizar",
    unit: "digital",
    title: "Qué procesos automatizar primero en tu empresa y con qué herramienta",
    excerpt: "Cómo reconocer los procesos que conviene automatizar, cuál elegir primero, qué herramienta usar en cada caso y cómo medir si valió la pena.",
    date: "23 de octubre de 2026",
    published: "2026-10-23",
    minutes: 5,
    service: "automatizacion-procesos",
    related: ["agente-ia-vs-chatbot", "software-a-la-medida-o-comercial", "hoja-de-ruta-de-ia"],
    sections: [
      {
        id: "senales",
        title: "Qué hace que un proceso convenga automatizar",
        blocks: [
          { p: "Automatizar es lograr que una tarea que hoy hace una persona paso a paso se ejecute sola, con las mismas reglas cada vez. No todas las tareas lo merecen. Las que dan mejor resultado comparten varias de estas características:" },
          {
            list: [
              "Se repiten mucho: varias veces al día o a la semana.",
              "Siguen reglas claras: si pasa A, se hace B.",
              "Los datos ya están en formato digital: correos, formularios, hojas de cálculo, PDF o un sistema.",
              "Un error de captura cuesta tiempo o dinero: una factura mal registrada, un cliente sin respuesta, un pedido duplicado.",
              "El proceso es estable: no cambia cada mes.",
            ],
          },
          { p: "Si te reconoces copiando y pegando información entre sistemas, perdiendo solicitudes entre chats o armando el mismo reporte cada lunes, ya tienes candidatos." },
        ],
      },
      {
        id: "elegir",
        title: "Cómo elegir el primero",
        blocks: [
          { p: "Haz una lista corta de tareas candidatas y califica cada una con estas preguntas. La que tenga mejores respuestas suele ser el mejor primer proyecto:" },
          {
            ordered: true,
            list: [
              "¿Cuántas veces ocurre al mes y cuánto tarda cada vez? Multiplica y tendrás las horas que hoy consume.",
              "¿Las reglas se pueden escribir en una hoja? Si cada caso depende del criterio de alguien, todavía no está listo o necesita IA.",
              "¿Qué sistemas intervienen y tienen forma de conectarse (API, integración nativa, exportación de archivos)?",
              "¿Qué pasa si la automatización falla un día? Empieza por procesos donde un error se detecta y se corrige rápido.",
              "¿Quién es el dueño del proceso y puede validar que el resultado es correcto?",
            ],
          },
          { callout: "Antes de automatizar, describe el proceso como se hace hoy, paso a paso. Automatizar un proceso desordenado solo hace más rápido el desorden.", tone: "warn" },
        ],
      },
      {
        id: "ejemplos",
        title: "Ejemplos por área",
        blocks: [
          { h3: "Administración y finanzas" },
          { list: ["Leer facturas y XML de proveedores, validar RFC y montos contra la orden de compra y registrarlos.", "Enviar recordatorios de cobranza según la fecha de vencimiento.", "Conciliar pagos recibidos con facturas emitidas."] },
          { h3: "Ventas y atención" },
          { list: ["Registrar en el CRM cada solicitud que llega por formulario, correo o WhatsApp, sin capturarla a mano.", "Asignar la solicitud al vendedor de la zona y avisarle.", "Enviar seguimiento automático si una cotización lleva días sin respuesta."] },
          { h3: "Operación" },
          { list: ["Generar órdenes de trabajo o contratos desde una plantilla.", "Avisar cuando el inventario baja de un mínimo.", "Descargar reportes de portales de proveedores o bancos que no tienen API."] },
          { h3: "Dirección" },
          { list: ["Tableros de ventas, cobranza u operación que se actualizan solos, sin esperar a que alguien los arme."] },
        ],
      },
      {
        id: "herramientas",
        title: "Qué herramienta usar en cada caso",
        blocks: [
          { p: "La herramienta se elige después de entender la tarea y los sistemas que ya tienes. Estas son las opciones más comunes:" },
          {
            kv: [
              ["Flujos entre aplicaciones (n8n, Make, Zapier, Power Automate)", "Para conectar herramientas que tienen API: formularios, CRM, hojas de cálculo, correo, WhatsApp. Es la opción más común para empezar."],
              ["Google Workspace o Microsoft 365", "Para equipos que viven en el correo y las hojas de cálculo: generar documentos, ordenar correos, mover archivos, con Apps Script o Power Automate."],
              ["RPA (Power Automate Desktop, UiPath)", "Para sistemas antiguos o portales sin API, donde la única vía es usar la pantalla como lo haría una persona."],
              ["Documentos con IA", "Para leer facturas, pedidos o formatos en PDF o imagen, validar los datos y mandar a revisión lo que no cuadra."],
              ["Integración a la medida", "Para volúmenes altos, lógica compleja o datos sensibles, cuando una plataforma de flujos se queda corta."],
            ],
          },
          { p: "Si la tarea requiere interpretar mensajes o casos distintos, una automatización con reglas fijas no alcanza y conviene un agente de IA. Muchas veces se combinan: el agente interpreta y la automatización ejecuta los pasos predecibles." },
        ],
      },
      {
        id: "medir",
        title: "Cómo medir si funcionó",
        blocks: [
          { p: "Mide el proceso antes de tocarlo. Sin una línea base no hay forma de saber si la automatización ahorró algo. Anota durante un par de semanas:" },
          {
            list: [
              "Cuántas veces ocurre la tarea y cuánto tarda cada vez.",
              "Cuántos errores o retrabajos hay.",
              "Cuánto tiempo pasa entre que llega una solicitud y alguien la atiende.",
            ],
          },
          { p: "Después de activar la automatización, compara esos mismos datos y revisa el registro de ejecuciones: cuántas corrieron bien, cuántas fallaron y por qué. Una automatización sin alertas puede fallar en silencio durante días." },
        ],
      },
      {
        id: "cuanto-cuesta",
        title: "Cuánto cuesta y cuánto tarda",
        blocks: [
          {
            kv: [
              ["Flujo simple", "Desde $4,100 por flujo"],
              ["Proceso de negocio (cobranza, sincronizar CRM)", "Desde $5,800 por proceso"],
              ["Paquete de 5 a 10 procesos", "Desde $29,000, pago único"],
              ["Suite completa (CRM, facturación y WhatsApp)", "Desde $232,000, pago único"],
              ["Mantenimiento", "Desde $2,900 al mes"],
              ["Plataforma de automatización (licencia del proveedor)", "Desde $250 al mes, según volumen"],
            ],
          },
          { p: "Con nosotros, un flujo simple suele estar listo en 5 días hábiles a 2 semanas. Varios procesos coordinados toman de 4 a 12 semanas, y una suite completa, de 2 a 4 meses. El precio depende del número de pasos y sistemas, de las excepciones que haya que manejar, de la calidad de los datos de origen y de si se usa IA para leer documentos. Las licencias de la plataforma y de tus sistemas, y el consumo de IA, se pagan aparte." },
          { callout: "Precios desde, en pesos mexicanos, con IVA incluido. El precio final se confirma en la cotización, después de revisar tu caso.", tone: "info" },
        ],
      },
      {
        id: "empezar",
        title: "Por dónde empezar",
        blocks: [
          { p: "Elige un flujo que se repita mucho y tenga reglas claras, mide cómo funciona hoy y automatízalo con monitoreo. Cuando puedas comparar el antes y el después, es mucho más fácil decidir qué sigue." },
          { p: "En nuestro servicio de automatización de procesos empezamos con un levantamiento de la tarea, diseñamos el flujo con sus excepciones, lo probamos con casos reales y lo activamos con alertas. Para la primera conversación basta con que nos cuentes qué tarea consume más tiempo, con qué frecuencia ocurre y qué herramientas intervienen." },
        ],
      },
    ],
    faq: [
      ["¿Qué es mejor, n8n, Make o Zapier?", "Depende de tus sistemas, del volumen y de quién va a mantener los flujos. Zapier y Make son fáciles de usar y cobran por uso; n8n se puede instalar en tu propio servidor y conviene con volúmenes altos o datos sensibles. Lo recomendable es elegir después de definir el proceso."],
      ["¿Necesito cambiar mis sistemas para automatizar?", "Normalmente no. Se conectan las herramientas que ya usas. Si alguna no tiene API, se revisa otra vía, como archivos programados o RPA."],
      ["¿Cuánto cuesta automatizar un proceso?", "Con nosotros, un flujo simple parte de $4,100 y un proceso de negocio completo desde $5,800, más la plataforma donde corre."],
      ["¿Qué pasa si la automatización falla?", "Una buena automatización registra cada ejecución y avisa cuando algo no coincide. Los casos que no puede resolver pasan a una persona."],
    ],
    seo: {
      title: "Qué procesos automatizar en tu empresa y con qué herramienta",
      description: "Qué procesos automatizar primero en tu empresa: cómo elegir, ejemplos por área, herramientas como n8n, Make o RPA, cómo medir el ahorro y cuánto cuesta.",
      slug: "/recursos/que-procesos-automatizar-en-tu-empresa",
      keywords: ["qué procesos automatizar", "automatización de procesos", "automatizar procesos en una empresa", "n8n Make Zapier", "RPA"],
    },
  },

  {
    id: "software-a-la-medida-o-comercial",
    unit: "digital",
    title: "Software a la medida o software comercial: cómo decidir",
    excerpt: "Cuándo te conviene contratar un software comercial (SaaS) y cuándo desarrollar uno a la medida, cómo comparar el costo total y qué preguntar sobre la propiedad del código.",
    date: "23 de octubre de 2026",
    published: "2026-10-23",
    minutes: 5,
    service: "software",
    related: ["que-procesos-automatizar", "hoja-de-ruta-de-ia"],
    sections: [
      {
        id: "diferencia",
        title: "La diferencia en pocas palabras",
        blocks: [
          { p: "Un software comercial, casi siempre en modalidad SaaS, es una herramienta hecha para muchas empresas a la vez: pagas una suscripción por usuario o por plan y la usas tal como viene, con las opciones de configuración que el proveedor permita. Un software a la medida se construye para tu proceso: tú decides qué hace, cómo se ve y con qué sistemas se conecta." },
          { p: "Ninguna opción es mejor por sí misma. La pregunta útil es qué tan parecido es tu proceso al de la mayoría de las empresas y cuánto te cuesta adaptarte a la herramienta." },
        ],
      },
      {
        id: "cuando-comercial",
        title: "Cuándo conviene un software comercial",
        blocks: [
          {
            list: [
              "El proceso es estándar: contabilidad, nómina, facturación electrónica, correo, videollamadas o un CRM básico.",
              "Necesitas empezar ya y no puedes esperar semanas.",
              "Hay opciones con buen soporte en español que cubren casi todo lo que necesitas.",
              "Tu equipo puede adaptarse a la forma de trabajar de la herramienta sin perder eficiencia.",
            ],
          },
          { callout: "Antes de descartar un SaaS, pide una prueba con casos reales de tu operación en lugar de decidir por la demo del vendedor.", tone: "info" },
        ],
      },
      {
        id: "cuando-medida",
        title: "Cuándo conviene uno a la medida",
        blocks: [
          {
            list: [
              "Tu negocio creció sobre hojas de cálculo y el archivo ya no alcanza, o solo una persona lo entiende.",
              "Tu proceso es parte de lo que te distingue y un software genérico te obliga a cambiarlo.",
              "Pagas varias herramientas que no se hablan entre sí y la misma información se captura varias veces.",
              "Quieres que tus clientes consulten pedidos, facturas o reportes en un portal propio.",
              "Las licencias por usuario de un SaaS crecen más rápido que tu equipo.",
            ],
          },
          { p: "Hay un camino intermedio que muchas veces es el más sensato: usar software comercial para lo estándar y desarrollar a la medida solo la parte que no encaja, conectada a lo que ya tienes." },
        ],
      },
      {
        id: "costo-total",
        title: "Costo total y propiedad",
        blocks: [
          { p: "Comparar solo el precio inicial engaña. Haz la cuenta a tres o cinco años y considera todo lo que pagas o dejas de controlar:" },
          {
            kv: [
              ["Pago inicial", "SaaS: bajo o nulo. A la medida: el desarrollo de la primera versión."],
              ["Pago recurrente", "SaaS: suscripción que suele crecer con usuarios o módulos. A la medida: hosting, soporte y mejoras."],
              ["Ajustes a tu proceso", "SaaS: solo los que el proveedor permita. A la medida: los que decidas, con costo de desarrollo."],
              ["Propiedad", "SaaS: rentas el uso; tus datos viven en la plataforma del proveedor. A la medida: el código y los datos pueden ser tuyos si así se acuerda."],
              ["Dependencia", "SaaS: si el proveedor sube precios o cambia el producto, te adaptas. A la medida: dependes de quien lo mantiene, por eso importa la documentación."],
            ],
          },
          { p: "En un desarrollo a la medida, pregunta siempre por tres cosas antes de firmar: quién es dueño del código, dónde se aloja y a nombre de quién está la cuenta, y qué soporte hay después del lanzamiento. Son los puntos que más diferencias generan entre propuestas que parecen iguales." },
        ],
      },
      {
        id: "iteraciones",
        title: "Cómo es un desarrollo por iteraciones",
        blocks: [
          { p: "Un buen desarrollo a la medida no se entrega de golpe al final. Se construye por versiones que ya puedes usar:" },
          {
            ordered: true,
            list: [
              "Descubrimiento: se entiende el proceso, los usuarios y las reglas, y se define el alcance de la primera versión con prototipos de pantallas.",
              "Iteraciones con demo: se construye en ciclos cortos y al final de cada uno ves y pruebas lo avanzado para ajustar prioridades.",
              "Pruebas: cada función se prueba de forma automatizada y con tu equipo en un ambiente de pruebas antes de llegar a producción.",
              "Despliegue y soporte: se publica la versión, se capacita a los usuarios y las mejoras siguientes se planean como nuevas versiones.",
            ],
          },
          { p: "La primera versión, o MVP, cubre el flujo principal y deja fuera a propósito lo que puede esperar. Así empiezas a usar el sistema antes y decides con datos qué construir después." },
        ],
      },
      {
        id: "cuanto-cuesta",
        title: "Cuánto cuesta y cuánto tarda",
        blocks: [
          {
            kv: [
              ["Primera versión o MVP", "Desde $116,000 por proyecto"],
              ["Sistema o plataforma completa", "Desde $232,000 por proyecto"],
              ["Proyecto empresarial", "Desde $696,000 por proyecto"],
              ["Hora de desarrollo", "Desde $700 por hora"],
              ["Hora de líder técnico", "Desde $1,650 por hora"],
            ],
          },
          { p: "Con nosotros, una primera versión suele tardar de 8 a 14 semanas; una plataforma completa, de 3 a 5 meses, y un proyecto empresarial, de 5 a 8 meses. El precio depende del número de pantallas, roles y reglas de negocio, de las integraciones, de los requisitos de seguridad y de si la aplicación es web, móvil o ambas. El hosting, las licencias de terceros y las funciones fuera del alcance se cotizan aparte." },
          { callout: "Precios desde, en pesos mexicanos, con IVA incluido. El precio final se confirma en la cotización, después de revisar tu caso.", tone: "info" },
        ],
      },
      {
        id: "decidir",
        title: "Cómo decidir en tu caso",
        blocks: [
          { p: "Escribe en una hoja qué problema quieres resolver, quién usará el sistema y qué tendría que poder hacer en su primera versión. Luego busca si existe un SaaS que lo cubra sin obligarte a cambiar lo que te distingue. Si lo hay, pruébalo. Si no, o si la suma de licencias e integraciones ya no tiene sentido, es momento de considerar un desarrollo." },
          { p: "En nuestro servicio de software a la medida partimos de esa lista, aunque no sea un documento técnico, y definimos contigo el alcance de una primera versión con entregas por etapas. Las condiciones de propiedad y entrega quedan por escrito en la propuesta." },
        ],
      },
    ],
    faq: [
      ["¿Es más barato un software a la medida que un SaaS?", "Al inicio casi nunca. A varios años puede serlo si las licencias por usuario crecen mucho o si pagas varias herramientas que no resuelven tu proceso. Hay que hacer la cuenta en tu caso."],
      ["¿El código de un software a la medida es mío?", "Depende de lo que se acuerde. Pide que la propiedad del código, las cuentas de hosting y la entrega de documentación queden por escrito en la propuesta."],
      ["¿Cuánto cuesta un software a la medida?", "Con nosotros, una primera versión parte de $116,000 y una plataforma completa desde $232,000. El precio final depende del alcance."],
      ["¿Puedo conectar un software a la medida con mi ERP o sistema de facturación?", "Normalmente sí, si el sistema tiene API o permite intercambiar archivos. Depende de lo que permita cada proveedor."],
    ],
    seo: {
      title: "Software a la medida o software comercial: cómo decidir",
      description: "Software a la medida o software comercial (SaaS): cuándo conviene cada uno, cómo comparar el costo total, quién es dueño del código y cuánto cuesta un MVP.",
      slug: "/recursos/software-a-la-medida-o-software-comercial",
      keywords: ["software a la medida o comercial", "software a la medida", "SaaS o desarrollo propio", "costo de software a la medida", "desarrollo de software México"],
    },
  },

  {
    id: "hoja-de-ruta-de-ia",
    unit: "digital",
    title: "Cómo hacer una hoja de ruta de IA para tu empresa",
    excerpt: "Los pasos para pasar de ideas sueltas a un plan de IA que puedas ejecutar: diagnóstico, priorización por valor y factibilidad, políticas de uso y capacitación.",
    date: "23 de octubre de 2026",
    published: "2026-10-23",
    minutes: 5,
    service: "consultoria",
    related: ["que-es-un-agente-de-ia", "que-procesos-automatizar", "implementar-agente-de-ia"],
    sections: [
      {
        id: "que-es",
        title: "Qué es una hoja de ruta de IA",
        blocks: [
          { p: "Una hoja de ruta de IA es una lista priorizada de casos de uso de inteligencia artificial para tu negocio, con un orden, un responsable y una forma de medir cada uno. Sirve para decidir qué va primero, cuánto esfuerzo implica y qué reglas debe seguir tu equipo mientras tanto." },
          { p: "Es útil si tienes varias ideas y no sabes cuál empezar, si tu equipo ya usa herramientas de IA sin reglas claras o si necesitas presentar un plan a socios o a la dirección. Una hoja de ruta completa suele incluir:" },
          {
            list: [
              "Un diagnóstico de cómo trabaja hoy tu negocio.",
              "Casos de uso evaluados y ordenados.",
              "Indicadores para medir cada caso.",
              "Una política de uso de IA.",
              "Un plan de capacitación y adopción.",
            ],
          },
        ],
      },
      {
        id: "diagnostico",
        title: "Paso 1: diagnóstico",
        blocks: [
          { p: "Antes de hablar de herramientas, entiende cómo fluye el trabajo. Entrevista a las personas que hacen cada tarea, revisa sus archivos y sistemas, y anota dónde se pierde tiempo: capturas dobles, búsquedas de información, respuestas repetidas, reportes que se arman a mano." },
          { p: "Haz también un inventario de las herramientas de IA que tu equipo ya usa, aunque sea de forma informal. Es común descubrir que varias personas usan asistentes gratuitos con información de clientes, y eso cambia las prioridades." },
          { callout: "El diagnóstico identifica oportunidades. No te comprometas con una herramienta antes de terminarlo.", tone: "info" },
        ],
      },
      {
        id: "priorizar",
        title: "Paso 2: priorizar por valor y factibilidad",
        blocks: [
          { p: "Con la lista de oportunidades, califica cada caso de uso con criterios simples:" },
          {
            kv: [
              ["Valor", "Cuánto tiempo ahorra, cuántos errores evita o qué mejora para tus clientes."],
              ["Factibilidad técnica", "Si existen herramientas maduras para resolverlo y si se conecta con tus sistemas."],
              ["Calidad de los datos", "Si la información que necesita está disponible, ordenada y actualizada."],
              ["Riesgo", "Qué pasa si la IA se equivoca y qué tan sensibles son los datos que usa."],
            ],
          },
          { p: "Para que la calificación sea comparable, describe cada caso en una línea con el mismo formato: qué tarea resuelve, quién la hace hoy, con qué datos y cómo sabrías que funcionó. Algunos casos que suelen aparecer en el diagnóstico:" },
          {
            list: [
              "Responder preguntas frecuentes de clientes con la información de tu catálogo y tus políticas.",
              "Leer facturas o pedidos y registrarlos en tu sistema.",
              "Resumir reuniones, contratos o reportes largos.",
              "Asistente interno que responde con tus manuales y procedimientos.",
              "Clasificar correos o solicitudes y mandarlos al área correcta.",
            ],
          },
          { p: "Ordena los casos en una matriz de valor contra factibilidad. Los de alto valor y alta factibilidad van primero. Los de alto valor y baja factibilidad suelen requerir antes ordenar datos o procesos. Los de bajo valor pueden esperar aunque sean fáciles." },
          { callout: "Desconfía de un plan que recomiende implementar todo al mismo tiempo. Una buena hoja de ruta empieza con un caso acotado y medible.", tone: "warn" },
        ],
      },
      {
        id: "politicas",
        title: "Paso 3: políticas de uso",
        blocks: [
          { p: "Mientras implementas, tu equipo ya está usando IA. Una política breve evita riesgos sin frenar el trabajo:" },
          {
            list: [
              "Clasifica tu información por sensibilidad: pública, interna, confidencial y datos personales.",
              "Define qué herramientas están aprobadas y qué tipo de información puede entrar en cada una.",
              "Establece cuándo una persona debe revisar lo que produce la IA antes de usarlo o enviarlo.",
              "Crea un proceso sencillo para aprobar herramientas nuevas.",
            ],
          },
          { p: "La política debe tomar en cuenta tus obligaciones de privacidad, pero no sustituye una revisión legal. Si necesitas validación jurídica, pídela a tu abogado." },
        ],
      },
      {
        id: "capacitacion",
        title: "Paso 4: capacitación y adopción",
        blocks: [
          { p: "Muchas empresas pagan licencias de IA que casi nadie usa. La capacitación que funciona es práctica: parte de tareas reales de cada área (redactar, resumir, analizar datos, preparar presentaciones) y las resuelve en la sesión con las herramientas aprobadas." },
          { p: "Cada participante debería salir con instrucciones probadas para sus propias tareas y una guía alineada con la política de uso. Nombra a un responsable interno que dé seguimiento: sin esa figura, la adopción se diluye en pocas semanas." },
        ],
      },
      {
        id: "cuanto-cuesta",
        title: "Cuánto cuesta y cuánto tarda",
        blocks: [
          {
            kv: [
              ["Diagnóstico de IA formal (2 a 3 semanas)", "Desde $17,400, pago único"],
              ["Hoja de ruta con primer caso de uso", "Desde $104,400 por proyecto"],
              ["Hora de consultor de IA", "Desde $1,300 por hora"],
              ["Taller ejecutivo (3 a 4 horas)", "Desde $17,400 por taller"],
              ["Capacitación de equipo (1 a 2 días)", "Desde $40,600 por programa"],
            ],
          },
          { p: "Nuestro diagnóstico toma de 2 a 3 semanas, un taller de medio día a un día y un programa de capacitación hasta 4 semanas. El precio depende del número de áreas y procesos, de la profundidad del diagnóstico, de si incluye un primer caso de uso y del número de personas a capacitar. La primera conversación no tiene costo. La implementación de los casos de uso, las licencias de herramientas y los viáticos fuera de la CDMX se cotizan aparte." },
          { callout: "Precios desde, en pesos mexicanos, con IVA incluido. El precio final se confirma en la cotización, después de revisar tu caso.", tone: "info" },
        ],
      },
      {
        id: "empezar",
        title: "Cómo empezar",
        blocks: [
          { p: "Elige dos o tres procesos que te gustaría mejorar y haz una lista de las herramientas de IA que tu equipo ya usa. Con eso puedes empezar el diagnóstico, por tu cuenta o con apoyo." },
          { p: "En nuestro servicio de consultoría en IA cada etapa termina con un entregable revisado contigo: diagnóstico, hoja de ruta, política de uso y capacitación. La hoja de ruta es tuya y puedes ejecutarla con nosotros o con quien prefieras." },
        ],
      },
    ],
    faq: [
      ["¿Qué es una hoja de ruta de IA?", "Un plan que ordena los casos de uso de IA de tu empresa por valor y factibilidad, con responsables, indicadores y etapas."],
      ["¿Cuánto cuesta un diagnóstico de IA?", "Nuestro diagnóstico formal de 2 a 3 semanas parte de $17,400. La primera conversación con nosotros no tiene costo."],
      ["¿Necesito una política de uso de IA si somos una empresa pequeña?", "Conviene, aunque sea breve. Si tu equipo usa asistentes de IA con información de clientes, necesitas reglas claras sobre qué datos pueden entrar y quién revisa los resultados."],
      ["¿Tengo que implementar la hoja de ruta con quien la hizo?", "No debería ser obligatorio. Con nosotros, la hoja de ruta es tuya y puedes ejecutarla con el proveedor que elijas."],
      ["¿Cada cuánto se actualiza una hoja de ruta de IA?", "Conviene revisarla al terminar cada etapa, con los resultados del caso que se implementó. Las herramientas cambian rápido, así que una revisión periódica evita seguir un plan que ya no corresponde a tu situación."],
    ],
    seo: {
      title: "Cómo hacer una hoja de ruta de IA para tu empresa",
      description: "Hoja de ruta de IA para empresas: cómo hacer el diagnóstico, priorizar casos por valor y factibilidad, definir políticas de uso y capacitar a tu equipo.",
      slug: "/recursos/hoja-de-ruta-de-ia-para-empresas",
      keywords: ["hoja de ruta de IA", "estrategia de IA para empresas", "casos de uso de IA", "política de uso de IA", "consultoría en inteligencia artificial"],
    },
  },

  {
    id: "seo-local-perfil-de-negocio",
    unit: "digital",
    title: "SEO local: cómo aparecer en Google Maps y en búsquedas \"cerca de mí\"",
    excerpt: "Qué toma en cuenta Google para mostrar negocios cercanos y qué puedes hacer en tu Perfil de Negocio, tus reseñas y tu sitio para aparecer cuando te buscan en tu zona.",
    date: "23 de octubre de 2026",
    published: "2026-10-23",
    minutes: 5,
    service: "marketing",
    related: ["pagina-web-para-negocio", "hoja-de-ruta-de-ia"],
    sections: [
      {
        id: "como-decide",
        title: "Cómo decide Google qué negocios mostrar",
        blocks: [
          { p: "Cuando alguien busca \"dentista cerca de mí\" o \"cerrajero en Coyoacán\", Google muestra un mapa con unos cuantos negocios. Según la propia documentación de Google, los resultados locales dependen de tres factores:" },
          {
            kv: [
              ["Relevancia", "Qué tan bien coincide tu perfil con lo que la persona busca."],
              ["Distancia", "Qué tan cerca estás de la ubicación de la búsqueda o de la persona."],
              ["Prominencia", "Qué tan conocido es tu negocio: reseñas, menciones en otros sitios y la calidad de tu sitio web."],
            ],
          },
          { p: "No puedes cambiar dónde está tu negocio, pero sí puedes trabajar la relevancia y la prominencia. Nadie puede garantizarte una posición en el mapa; lo que sí se puede es hacer bien lo que depende de ti." },
        ],
      },
      {
        id: "perfil",
        title: "Configura bien tu Perfil de Negocio",
        blocks: [
          { p: "Tu Perfil de Negocio en Google (antes Google My Business) es la ficha que aparece en Maps y en la búsqueda. Créalo o reclámalo, verifícalo y complétalo:" },
          {
            list: [
              "Nombre real del negocio, tal como aparece en tu local y tus documentos.",
              "Categoría principal precisa y categorías secundarias que de verdad apliquen.",
              "Dirección, o zona de servicio si atiendes a domicilio y no recibes clientes en un local.",
              "Horarios actualizados, incluidos días festivos.",
              "Teléfono, enlace a tu sitio, a WhatsApp y a tu agenda si la tienes.",
              "Lista de servicios o productos con una descripción breve.",
              "Fotos reales del local, del equipo y de trabajos terminados.",
            ],
          },
          { callout: "No agregues palabras clave ni nombres de colonias al nombre del negocio. Va contra las reglas de Google y puede provocar la suspensión del perfil.", tone: "warn" },
          { p: "La verificación la hace Google y a veces pide pasos del dueño, como un video del local. Publica novedades de vez en cuando y responde las preguntas que te hagan en el perfil." },
        ],
      },
      {
        id: "resenas",
        title: "Reseñas: cómo pedirlas y responderlas",
        blocks: [
          { p: "Las reseñas influyen en la prominencia y, sobre todo, en la decisión de quien te está comparando con otros negocios. Lo que funciona es sencillo y constante:" },
          {
            list: [
              "Pide reseña a tus clientes reales justo después de un buen servicio, con el enlace directo que da el perfil.",
              "Pídela a todos tus clientes, también a los que no sabes si quedaron contentos.",
              "Responde todas las reseñas, también las negativas, con calma y una solución concreta.",
              "No compres reseñas, no las escribas tú y no ofrezcas descuentos a cambio: va contra las políticas de Google.",
            ],
          },
        ],
      },
      {
        id: "sitio",
        title: "Tu sitio también cuenta",
        blocks: [
          { p: "El perfil y el sitio se refuerzan entre sí. Revisa que tu sitio tenga:" },
          {
            list: [
              "El mismo nombre, dirección y teléfono que el perfil, escritos igual en todas partes, incluidos directorios y redes.",
              "Una página por cada servicio importante y, si atiendes varias zonas, páginas con información útil para cada una.",
              "Datos estructurados de negocio local para que Google entienda quién eres y dónde estás.",
              "Buena experiencia en celular y carga rápida: buena parte de las búsquedas locales se hacen desde el teléfono.",
              "Botones visibles de llamada y WhatsApp.",
            ],
          },
        ],
      },
      {
        id: "medir",
        title: "Cómo medir si está funcionando",
        blocks: [
          { p: "Sin medición no sabes si el esfuerzo vale la pena. Revisa cada mes:" },
          {
            list: [
              "En el Perfil de Negocio: llamadas, solicitudes de indicaciones, clics al sitio y búsquedas en las que apareces.",
              "En Search Console: las búsquedas con las que llegan a tu sitio y en qué posición promedio apareces.",
              "En GA4: visitas que vienen del perfil (agrega parámetros UTM al enlace del sitio) y conversiones como formularios enviados o clics a WhatsApp.",
            ],
          },
          { p: "Lo que más importa es cuántas solicitudes llegan y cuántas se convierten en clientes. Para eso, tu equipo debe registrar de dónde llegó cada contacto. Una pregunta sencilla al cerrar la llamada (\"¿cómo nos encontraste?\") y una columna en tu hoja o CRM bastan para empezar." },
          { p: "Ten en cuenta que los resultados locales cambian según desde dónde se busca. Que tú veas tu negocio arriba en tu oficina no significa que un cliente a unas colonias de distancia lo vea igual; por eso conviene revisar las métricas del perfil además de hacer búsquedas propias." },
        ],
      },
      {
        id: "cuanto-cuesta",
        title: "Cuánto cuesta y cuánto tarda",
        blocks: [
          {
            kv: [
              ["SEO para negocio local", "Desde $5,800 al mes"],
              ["Auditoría técnica de SEO", "Desde $5,250, pago único"],
            ],
          },
          { p: "Con nosotros, los primeros resultados de SEO local suelen verse entre el segundo y el cuarto mes; en términos muy competidos el plazo es mayor. El precio depende de los canales que se trabajan, de la competencia en tus búsquedas, de la producción de contenido y de la profundidad de los reportes. La fotografía, el video y las herramientas de pago se cotizan aparte." },
          { callout: "Precios desde, en pesos mexicanos, con IVA incluido. El precio final se confirma en la cotización, después de revisar tu caso.", tone: "info" },
        ],
      },
      {
        id: "siguiente-paso",
        title: "Tu siguiente paso",
        blocks: [
          { p: "Busca tu negocio en Google Maps desde el celular, como lo haría un cliente, y revisa si tu ficha está completa, si las fotos te representan y si tus reseñas tienen respuesta. Corrige primero lo que esté mal o desactualizado." },
          { p: "En nuestro servicio de marketing digital trabajamos el SEO local de forma continua: completamos y mantenemos tu Perfil de Negocio, cuidamos que tus datos coincidan en todas partes, creamos páginas por zona, te ayudamos a pedir y responder reseñas de clientes reales, y medimos cada mes cuántas solicitudes llegan." },
        ],
      },
    ],
    faq: [
      ["¿Cuánto tarda en aparecer mi negocio en Google Maps?", "El perfil aparece una vez verificado. Subir de posición en búsquedas de tu zona suele tomar de 2 a 4 meses de trabajo constante, y más en términos competidos."],
      ["¿Puedo aparecer en Maps si no tengo local?", "Sí. Si atiendes a domicilio, configura una zona de servicio y oculta tu dirección. Google lo permite para negocios que van con el cliente."],
      ["¿Cuánto cuesta el SEO local?", "Nuestro servicio de SEO para negocio local parte de $5,800 al mes."],
      ["¿Puedo pedir reseñas a cambio de un descuento?", "No. Las políticas de Google prohíben ofrecer incentivos a cambio de reseñas. Pídelas a tus clientes reales sin condiciones."],
      ["¿El Perfil de Negocio de Google tiene costo?", "No. Crear y mantener el perfil es gratuito. Lo que tiene costo es el tiempo para completarlo, publicar, pedir reseñas y medir, o el servicio de quien lo haga por ti."],
    ],
    seo: {
      title: "SEO local: cómo aparecer en Google Maps y \"cerca de mí\"",
      description: "SEO local para tu negocio: cómo aparecer en Google Maps y en búsquedas cerca de mí con tu Perfil de Negocio, reseñas, tu sitio web y medición. Cuánto cuesta.",
      slug: "/recursos/seo-local-como-aparecer-en-google-maps",
      keywords: ["SEO local", "cómo aparecer en Google Maps", "Perfil de Negocio de Google", "aparecer cerca de mí", "reseñas en Google"],
    },
  },

  {
    id: "pagina-web-para-negocio",
    unit: "digital",
    title: "Qué debe tener la página web de un negocio pequeño",
    excerpt: "Las secciones, botones y herramientas que necesita el sitio de un negocio pequeño para que lo encuentren, lo contacten y no pierda solicitudes, y cuánto cuesta.",
    date: "23 de octubre de 2026",
    published: "2026-10-23",
    minutes: 5,
    service: "godigital",
    related: ["seo-local-perfil-de-negocio", "agente-ia-vs-chatbot"],
    sections: [
      {
        id: "secciones",
        title: "Las secciones básicas",
        blocks: [
          { p: "Un negocio pequeño no necesita un sitio enorme. Necesita que quien llega entienda en segundos qué haces, dónde y cómo contactarte. Con cinco páginas o menos suele bastar:" },
          {
            kv: [
              ["Inicio", "Qué haces, para quién y en qué zona, con un botón de contacto visible sin tener que bajar."],
              ["Servicios", "Cada servicio con una explicación clara y, si puedes, una página propia para los principales."],
              ["Nosotros", "Quién está detrás, tu experiencia y fotos reales del equipo o del local."],
              ["Preguntas frecuentes", "Las dudas que más te hacen: horarios, formas de pago, zona de servicio, tiempos."],
              ["Contacto", "Teléfono, WhatsApp, formulario, dirección con mapa y horarios."],
            ],
          },
          { p: "Si tienes opiniones reales de clientes o fotos de trabajos terminados, inclúyelas. Ayudan más que cualquier texto de presentación." },
        ],
      },
      {
        id: "contacto",
        title: "WhatsApp, formularios y agenda",
        blocks: [
          { p: "El sitio sirve de poco si los mensajes se pierden. Piensa en el contacto como un proceso completo:" },
          {
            list: [
              "Botón de WhatsApp con un mensaje inicial según la página desde la que escribe el cliente.",
              "Formularios cortos, solo con los datos que necesitas para cotizar o agendar.",
              "Cada solicitud llega por correo o WhatsApp a quien atiende y queda registrada para darle seguimiento.",
              "Si varias personas atienden el mismo número, una bandeja compartida evita que un mensaje se quede sin respuesta.",
            ],
          },
          { p: "Si trabajas con citas, una agenda en línea permite que tus clientes elijan fecha y hora disponibles, reciban confirmación y un recordatorio, y reprogramen sin llamarte. Conéctala con tu calendario de Google o Outlook para evitar empalmes." },
          { callout: "Decide antes de lanzar quién responde, en cuánto tiempo y dónde queda registrada cada solicitud. Ordenar eso es tan importante como el diseño.", tone: "info" },
        ],
      },
      {
        id: "velocidad",
        title: "Velocidad, celular y Google",
        blocks: [
          { p: "Buena parte de tus visitas llegará desde el teléfono. Revisa tu sitio en un celular antes que en la computadora:" },
          {
            list: [
              "Que cargue rápido: imágenes comprimidas y en formatos modernos, sin videos pesados en la portada.",
              "Textos legibles y botones fáciles de tocar con el pulgar.",
              "Certificado de seguridad (el candado en el navegador).",
              "Un título y una descripción por página que digan qué haces y dónde.",
              "Enlace a tu Perfil de Negocio en Google, con los mismos datos que el sitio.",
            ],
          },
          { p: "PageSpeed Insights, una herramienta gratuita de Google, te dice qué tan rápido carga tu sitio y qué lo frena. Elige también una plataforma que puedas editar tú, como WordPress o Webflow, para cambiar horarios o precios sin depender de nadie." },
        ],
      },
      {
        id: "dominio",
        title: "Dominio y correo propios",
        blocks: [
          { p: "Un dominio propio (tunegocio.com.mx) y correos con ese nombre dan una imagen más formal que una cuenta gratuita. Cuida estos puntos:" },
          {
            list: [
              "Registra el dominio a nombre de tu negocio, no del proveedor. Así no lo pierdes si cambias de proveedor.",
              "Configura el correo en Google Workspace o Microsoft 365, con los registros SPF, DKIM y DMARC para reducir el riesgo de que tus correos lleguen a spam.",
              "Pide todos los accesos: dominio, hosting, sitio y correo.",
              "Anota cuándo se renueva el dominio; si vence, tu sitio y tu correo dejan de funcionar.",
            ],
          },
        ],
      },
      {
        id: "privacidad",
        title: "Aviso de privacidad y cookies",
        blocks: [
          { p: "Si tu sitio recibe nombres, teléfonos o correos por un formulario, estás tratando datos personales. La ley mexicana de protección de datos personales en posesión de particulares te pide informar a esas personas qué datos recabas y para qué, con un aviso de privacidad visible en el sitio." },
          { p: "Si usas herramientas de analítica o de anuncios, agrega un banner de cookies que permita aceptar o rechazar las que no son necesarias. Una plantilla genérica copiada de otro sitio casi nunca describe lo que tú haces; lo recomendable es que tu abogado revise el texto final." },
        ],
      },
      {
        id: "cuanto-cuesta",
        title: "Cuánto cuesta y cuánto tarda",
        blocks: [
          {
            kv: [
              ["Sitio web de hasta 5 páginas", "Desde $7,550, pago único"],
              ["Landing page", "Desde $5,250, pago único"],
              ["Sitio por suscripción", "Desde $5,800 + $850 (instalación + al mes)"],
              ["Hosting y dominio", "Desde $3,500 al año"],
              ["Agenda en línea (licencia del proveedor)", "Desde $500 al mes"],
              ["CRM o bandeja de WhatsApp (licencia del proveedor)", "Desde $600 al mes"],
            ],
          },
          { p: "Con nosotros, un sitio de hasta 5 páginas suele estar listo en 1 a 3 semanas, según qué tan pronto tengamos tus textos, fotos y logotipo. La agenda y el contacto se configuran junto con el sitio. La fotografía profesional, los textos extensos, las licencias de software de terceros y la inversión en anuncios se cotizan aparte." },
          { callout: "Precios desde, en pesos mexicanos, con IVA incluido. El precio final se confirma en la cotización, después de revisar tu caso.", tone: "info" },
        ],
      },
      {
        id: "empezar",
        title: "Cómo empezar",
        blocks: [
          { p: "Reúne tu logotipo, fotos de tu negocio, la lista de servicios y las preguntas que más te hacen tus clientes. Con ese material el sitio avanza mucho más rápido, lo hagas con quien lo hagas." },
          { p: "GoDigital Suite junta las piezas de esta guía: sitio, WhatsApp y formularios, seguimiento de solicitudes, agenda, Perfil de Negocio, dominio y correo. Eliges los módulos según tu operación y te acompañamos las primeras semanas después de lanzar para que lo uses con confianza." },
        ],
      },
    ],
    faq: [
      ["¿Cuánto cuesta una página web para un negocio pequeño?", "Con nosotros, un sitio de hasta 5 páginas parte de $7,550 en pago único, más hosting y dominio desde $3,500 al año."],
      ["¿Es mejor una página web o solo redes sociales?", "Las redes ayudan a mostrar actividad, pero no controlas cómo se muestran ni a quién. Un sitio propio te da un lugar fijo con tu información, formularios y agenda, y ayuda a que Google te encuentre."],
      ["¿Necesito aviso de privacidad si solo tengo un formulario de contacto?", "Sí. Si recabas nombre, teléfono o correo, estás tratando datos personales y debes informar para qué los usas. Pide a tu abogado que revise el texto."],
      ["¿Puedo actualizar el sitio yo mismo?", "Sí, si se construye en una plataforma editable como WordPress o Webflow y te capacitan para hacerlo."],
      ["¿Qué conviene más, pago único o suscripción?", "Con pago único pagas el sitio una vez y cubres aparte el hosting, el dominio y los cambios futuros. Con suscripción pagas una instalación menor y una cuota mensual. Depende de cuánto quieras invertir al inicio y de qué tan seguido harás cambios."],
    ],
    seo: {
      title: "Qué debe tener la página web de un negocio pequeño",
      description: "Qué debe tener la página web de un negocio pequeño: secciones, WhatsApp, formularios, agenda, velocidad, dominio y aviso de privacidad, y cuánto cuesta.",
      slug: "/recursos/que-debe-tener-la-pagina-web-de-un-negocio",
      keywords: ["qué debe tener una página web", "página web para negocio", "página web para negocio pequeño", "página web con WhatsApp", "cuánto cuesta una página web"],
    },
  },
];
