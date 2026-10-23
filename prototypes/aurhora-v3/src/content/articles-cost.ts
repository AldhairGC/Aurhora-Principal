import type { ArticleMore } from "./articles-more";

/*
  Secciones de costo, tiempo y profundidad práctica de las guías. Los montos son precios
  autorizados "Desde" (límite inferior de los rangos de mercado de octubre de 2026). Sus fuentes
  están documentadas en extras-digital.ts, extras-integra.ts y extras-facilities.ts.
*/
const REF = "Precios desde, en pesos mexicanos, más IVA. El precio final se confirma en la cotización, después de revisar tu caso.";

export const ARTICLES_COST: Record<string, ArticleMore> = {
  "que-es-un-agente-de-ia": {
    sections: [
      {
        id: "cuanto-cuesta",
        after: "riesgos",
        title: "Cuánto cuesta y cuánto tarda",
        blocks: [
          { p: "Un agente tiene dos costos: la implementación, que se paga una vez, y la operación mensual. Estos son los precios de partida:" },
          {
            kv: [
              ["Implementación de un agente acotado", "Desde $8,000"],
              ["Agente conectado a CRM o ERP", "Desde $25,000"],
              ["Operación y mejoras", "Desde $2,500 al mes"],
              ["Uso de WhatsApp y del modelo de IA", "Desde $300 al mes, según volumen"],
            ],
          },
          { p: "La diferencia entre un extremo y otro está en las integraciones, el volumen de conversaciones y el nivel de supervisión. Un plan empaquetado puede bastar para responder preguntas frecuentes; un proceso que toca tus sistemas necesita un proyecto a la medida. En tiempo, un agente acotado suele estar listo en 1 a 3 semanas, y uno con integraciones a CRM, en 3 a 8." },
          { callout: REF, tone: "info" },
        ],
      },
    ],
    faq: [
      ["¿Cuánto cuesta un agente de IA para una empresa?", "En México, la implementación de un agente acotado parte de $8,000 y la operación desde $2,500 al mes, más el uso de WhatsApp y del modelo."],
    ],
  },

  "agente-ia-vs-chatbot": {
    sections: [
      {
        id: "cuando-basta",
        after: "senales",
        title: "Cuándo un chatbot simple es suficiente",
        blocks: [
          { p: "No todos los negocios necesitan un agente. Un chatbot de menú o unas respuestas rápidas bien escritas resuelven bien estos casos:" },
          { list: ["Las preguntas son pocas y casi siempre las mismas: horarios, ubicación, requisitos.", "El volumen de mensajes es bajo y tu equipo alcanza a atender lo demás.", "No hace falta consultar ni modificar ningún sistema.", "Lo que buscas es filtrar mensajes, no resolver casos completos."] },
        ],
      },
      {
        id: "cuanto-cuesta",
        after: "mantenimiento",
        title: "Cuánto cuesta cada opción",
        blocks: [
          {
            kv: [
              ["Chatbot o plataforma que configuras tú", "Desde $500 al mes"],
              ["Automatización de un flujo simple", "Desde $3,500, pago único"],
              ["Agente de IA acotado", "Desde $8,000 de implementación y desde $2,500 al mes de operación"],
            ],
          },
          { p: "Al comparar, suma el tiempo de tu equipo. Una opción barata que deja la mitad de los casos sin resolver puede costar más horas de trabajo que una solución más completa." },
          { callout: REF, tone: "info" },
        ],
      },
      {
        id: "preguntas-proveedor",
        title: "Preguntas para hacerle a un proveedor",
        blocks: [
          {
            list: [
              "¿Qué hace el agente cuando no sabe la respuesta?",
              "¿Qué sistemas puede modificar y con qué permisos?",
              "¿Dónde se procesan mis datos y se usan para entrenar modelos?",
              "¿Cómo vamos a medir si funciona?",
              "¿Qué incluye la mensualidad y qué se paga aparte?",
              "¿Qué pasa con la configuración y los datos si cambio de proveedor?",
            ],
          },
          { p: "Un buen proveedor responde estas preguntas con ejemplos concretos y las deja por escrito en la propuesta." },
        ],
      },
    ],
    faq: [
      ["¿Cuánto cuesta un chatbot comparado con un agente?", "Una plataforma de chatbot que configuras tú cuesta desde $500 al mes. Un agente acotado requiere una implementación desde $8,000 más su operación mensual."],
    ],
  },

  "implementar-agente-de-ia": {
    sections: [
      {
        id: "plan-ejemplo",
        after: "errores",
        title: "Ejemplo de plan para una empresa mediana",
        blocks: [
          { p: "Un plan ilustrativo para un agente de atención por WhatsApp conectado al CRM. Las semanas cambian según el alcance y la disponibilidad de tu equipo." },
          {
            kv: [
              ["Semana 1", "Elegir el caso, medir la línea base y reunir la información del negocio."],
              ["Semanas 2 y 3", "Diseño del agente, integraciones y primer prototipo."],
              ["Semana 4", "Pruebas con casos reales y ajustes con el responsable del proceso."],
              ["Semana 5", "Lanzamiento asistido: el agente prepara respuestas y una persona las aprueba."],
              ["Después", "Operación con monitoreo, revisión mensual de métricas y nuevas mejoras."],
            ],
          },
        ],
      },
      {
        id: "cuanto-tarda",
        after: "plan-ejemplo",
        title: "Cuánto tarda",
        blocks: [
          {
            kv: [
              ["Agente acotado", "1 a 3 semanas"],
              ["Agente con CRM", "3 a 8 semanas"],
              ["Agente con ERP o varios procesos", "2 a 4 meses"],
            ],
          },
          { p: "La etapa que más varía es la de pruebas: depende de cuántos casos reales haya que revisar y de qué tan rápido el equipo valida los resultados." },
        ],
      },
      {
        id: "cuanto-cuesta",
        after: "cuanto-tarda",
        title: "Cuánto cuesta y cómo presupuestarlo",
        blocks: [
          { p: "Para presupuestar un agente considera cuatro partidas:" },
          {
            kv: [
              ["Implementación", "Desde $8,000 un agente acotado; desde $25,000 con CRM o ERP"],
              ["Operación mensual", "Desde $2,500 al mes"],
              ["Uso variable", "Desde $300 al mes en WhatsApp y modelo de IA, según volumen"],
              ["Tiempo interno", "Horas del responsable del proceso para pruebas y revisiones"],
            ],
          },
          { callout: REF, tone: "info" },
        ],
      },
      {
        id: "checklist",
        after: "cuanto-cuesta",
        title: "Lista para antes de lanzar",
        blocks: [
          { list: ["Casos de prueba revisados y aprobados por el responsable.", "Límites del agente documentados.", "Paso a una persona probado de punta a punta.", "Registro de acciones activo.", "Responsable del agente definido.", "Mensaje claro al cliente sobre el horario de atención humana.", "Línea base medida para comparar resultados."] },
        ],
      },
      {
        id: "propuesta",
        after: "checklist",
        title: "Qué debe decir la propuesta",
        blocks: [
          { p: "Antes de aprobar el proyecto, revisa que la propuesta deje por escrito lo siguiente. Si algo falta, pídelo: es más fácil aclararlo al inicio que a mitad de la implementación." },
          { list: ["El caso que resuelve el agente y los que quedan fuera.", "Los sistemas que va a consultar o modificar.", "Las etapas, con fechas y entregables.", "Cómo se mide el resultado y contra qué línea base.", "Qué incluye la mensualidad y qué se cobra por uso.", "Quién es dueño de la configuración, los datos y los textos."] },
        ],
      },
    ],
    faq: [
      ["¿Cuánto cuesta implementar un agente de IA con CRM?", "Un agente conectado a CRM o ERP parte de $25,000 de implementación y tarda de 3 a 8 semanas."],
    ],
  },

  "domotica-sin-obra": {
    sections: [
      {
        id: "cuanto-cuesta",
        after: "tiempos",
        title: "Cuánto cuesta",
        blocks: [
          {
            kv: [
              ["Domotizar un departamento", "Desde $15,000"],
              ["Domotizar una casa, nivel básico", "Desde $42,000"],
              ["Apagador inteligente instalado", "Desde $1,000 por pieza"],
              ["Motorizar una persiana existente", "Desde $1,800 por unidad"],
              ["Control WiFi para minisplit", "Desde $450 por equipo (solo equipo)"],
            ],
          },
          { p: "El precio final depende de cuántas áreas automatices, de la marca y de si hace falta instalación eléctrica para motores. Empezar por un área permite conocer el sistema antes de invertir en toda la casa." },
          { callout: REF, tone: "info" },
        ],
      },
      {
        id: "energia",
        after: "cuanto-cuesta",
        title: "Ahorro de energía: qué esperar",
        blocks: [
          { p: "La domótica ayuda a evitar consumo innecesario, por ejemplo luces o clima encendidos en habitaciones vacías, o equipos en espera durante la noche. El ahorro real depende de tus hábitos y de cuánto consumen tus equipos, así que no conviene contratarla esperando que se pague sola en poco tiempo. Su valor principal está en la comodidad y el control." },
        ],
      },
      {
        id: "errores",
        after: "energia",
        title: "Errores comunes",
        blocks: [
          { list: ["Comprar dispositivos de marcas que no se hablan entre sí.", "Instalar sin revisar antes la cobertura del WiFi.", "Depender de una sola aplicación que nadie más en casa sabe usar.", "Automatizar todo de golpe en lugar de empezar por un área.", "No cambiar las contraseñas que traen los equipos de fábrica."] },
        ],
      },
      {
        id: "privacidad",
        after: "errores",
        title: "Seguridad y privacidad",
        blocks: [
          { p: "Los dispositivos conectados también son una puerta de entrada a tu red. Usa contraseñas propias, mantén las aplicaciones actualizadas y, si puedes, separa los dispositivos en una red distinta a la de tus computadoras. En cámaras y chapas, revisa quién tiene acceso a la cuenta y elimina a quien ya no lo necesite." },
        ],
      },
      {
        id: "etapas",
        after: "empezar",
        title: "Cómo crecer por etapas",
        blocks: [
          { p: "Una forma ordenada de avanzar es por etapas. Primero iluminación y clima, que son lo que más se usa. Después persianas y cortinas. Luego seguridad: cámaras, chapa y sensores. Al final, audio y escenas que combinan todo. Cada etapa se cotiza por separado y se prueba unas semanas antes de seguir." },
          { p: "Después de unas semanas sabrás qué quieres sumar: persianas, cámaras, chapa o audio. Como todo queda en la misma aplicación, cada etapa se suma a lo que ya funciona en lugar de empezar de cero." },
        ],
      },
    ],
    faq: [
      ["¿Cuánto cuesta domotizar un departamento sin obra?", "En la CDMX, desde $15,000 según las áreas y dispositivos. Un apagador inteligente instalado parte de $1,000."],
    ],
  },

  "mantenimiento-minisplit": {
    sections: [
      {
        id: "limpieza-vs-mantenimiento",
        after: "regla",
        title: "Limpieza contra mantenimiento",
        blocks: [
          { p: "Muchas veces se usan como sinónimos, pero no son lo mismo. La limpieza de filtros la puedes hacer tú y se repite con frecuencia. El mantenimiento preventivo lo hace un técnico: incluye la limpieza profunda del serpentín y del drenaje, la revisión de conexiones y una prueba de funcionamiento. Lo recomendable es hacer las dos cosas: filtros con frecuencia y mantenimiento profesional al menos una vez al año." },
        ],
      },
      {
        id: "cuanto-cuesta",
        after: "problema-mayor",
        title: "Cuánto cuesta y cuánto tarda",
        blocks: [
          {
            kv: [
              ["Visita técnica o diagnóstico", "Desde $350, normalmente descontable"],
              ["Mantenimiento en casa (1 a 2 toneladas)", "Desde $800 por equipo"],
              ["Mantenimiento en negocio u oficina", "Desde $2,500 por equipo"],
              ["Recarga de gas, después de reparar la fuga", "Desde $900"],
            ],
          },
          { p: "Un mantenimiento toma alrededor de una hora a hora y media por equipo. Si tienes varios, conviene atenderlos en la misma visita: ahorras traslados y el precio por equipo suele ser menor." },
          { callout: REF, tone: "info" },
        ],
      },
      {
        id: "preparar",
        after: "cuanto-cuesta",
        title: "Cómo prepararte para la visita",
        blocks: [
          { list: ["Despeja el espacio debajo de la unidad interior.", "Confirma que hay acceso seguro a la unidad exterior.", "Ten a la mano la marca y el modelo, o una foto de la etiqueta.", "Anota qué está pasando y desde cuándo.", "Si es un negocio, elige un horario en que el equipo pueda apagarse."] },
        ],
      },
      {
        id: "temporada",
        after: "preparar",
        title: "El mejor momento",
        blocks: [
          { p: "En la Ciudad de México conviene programar el mantenimiento antes de los meses más calurosos, en primavera. Es cuando los equipos trabajan más y cuando más se nota un equipo sucio. En negocios con uso todo el año, lo mejor es seguir el calendario de una póliza." },
        ],
      },
      {
        id: "reemplazar",
        after: "temporada",
        title: "Cuándo conviene reemplazar el equipo",
        blocks: [
          { p: "El mantenimiento alarga la vida del minisplit, pero hay casos en que reparar deja de tener sentido. Vale la pena comparar el costo de la reparación con el de un equipo nuevo cuando:" },
          { list: ["La reparación cuesta una parte grande del precio de un equipo nuevo.", "El equipo usa refrigerante R-22, que ya casi no se fabrica y cuya recarga es cada vez más cara.", "Las fugas regresan aunque ya se repararon.", "El compresor falla o hace ruidos fuertes al arrancar.", "El equipo no es inverter y el recibo de luz subió mucho."] },
          { p: "En la visita te decimos qué opción conviene y te damos los dos presupuestos para que compares." },
        ],
      },
    ],
    faq: [
      ["¿Cuánto cuesta el mantenimiento de un minisplit en la CDMX?", "Desde $800 por equipo en casa y desde $2,500 en negocios. Toma alrededor de una hora a hora y media por equipo."],
    ],
  },

  "por-que-se-bota-la-pastilla": {
    sections: [
      {
        id: "casas-antiguas",
        after: "tipos",
        title: "Casas e instalaciones antiguas",
        blocks: [
          { p: "En construcciones de hace varias décadas es común encontrar fusibles en lugar de pastillas, circuitos que alimentan demasiados contactos y falta de conexión a tierra. Esas instalaciones se diseñaron para menos aparatos de los que hoy usamos, así que se sobrecargan con facilidad." },
          { p: "Si vives en una casa antigua y la pastilla se bota seguido, vale la pena una revisión general del tablero y los circuitos antes de cambiar piezas sueltas." },
        ],
      },
      {
        id: "cuanto-cuesta",
        after: "cambiar",
        title: "Cuánto cuesta revisarlo",
        blocks: [
          {
            kv: [
              ["Visita o diagnóstico", "Desde $400, normalmente descontable"],
              ["Cambio de pastilla", "Desde $350 por pieza"],
              ["Circuito nuevo", "Desde $900 por circuito"],
              ["Cambio de centro de carga", "Desde $1,500"],
            ],
          },
          { p: "El diagnóstico suele resolverse en la misma visita. Si hace falta un circuito nuevo o cambiar el tablero, se cotiza aparte con el material incluido." },
          { callout: REF, tone: "info" },
        ],
      },
      {
        id: "informacion",
        after: "cuanto-cuesta",
        title: "Qué información tener lista",
        blocks: [
          { list: ["Qué zona o qué contactos se quedan sin energía.", "Qué aparatos estaban encendidos cuando se botó.", "Si pasa a una hora o con un aparato en particular.", "Una foto del tablero o centro de carga.", "Si hubo lluvia, humedad o trabajos recientes en la casa."] },
        ],
      },
      {
        id: "prevenir",
        after: "informacion",
        title: "Cómo prevenirlo",
        blocks: [
          { list: ["Reparte los aparatos de alto consumo entre distintos circuitos.", "Evita las extensiones y multicontactos en cadena.", "Desconecta los aparatos que se calientan o huelen raro.", "Pide una revisión antes de instalar minisplits, hornos o calentadores eléctricos.", "Revisa el tablero cada cierto tiempo, sobre todo en negocios."] },
        ],
      },
      {
        id: "urgente",
        after: "prevenir",
        title: "Cuándo pedir ayuda de inmediato",
        blocks: [
          { p: "Algunas señales indican un riesgo y no conviene esperar a que se repita. Si notas alguna, corta la energía desde el tablero principal, no vuelvas a subir la pastilla y pide una revisión:" },
          { list: ["Olor a quemado o a plástico caliente.", "Chispas o humo en un contacto, apagador o en el tablero.", "Contactos o cables calientes al tacto.", "Marcas negras alrededor de un contacto.", "La pastilla se bota en cuanto la subes, aunque no haya nada conectado."] },
        ],
      },
      {
        id: "consumo",
        after: "sobrecarga",
        title: "Cuánto consumen los aparatos más comunes",
        blocks: [
          { p: "Estos valores son aproximados y cambian según el modelo; revisa la etiqueta de cada aparato. Sirven para entender por qué dos o tres de ellos encendidos en el mismo circuito pueden botar la pastilla." },
          {
            kv: [
              ["Horno de microondas", "1,000 a 1,500 W"],
              ["Plancha", "1,000 a 1,800 W"],
              ["Secadora de pelo", "1,200 a 2,000 W"],
              ["Hervidor o cafetera", "1,000 a 1,500 W"],
              ["Minisplit de 1 tonelada", "900 a 1,300 W"],
            ],
          },
        ],
      },
    ],
    faq: [
      ["¿Cuánto cobra un electricista por revisar por qué se bota la pastilla?", "En la CDMX, la visita o diagnóstico parte de $400 y normalmente se descuenta si aceptas el trabajo. Cambiar una pastilla cuesta desde $350."],
    ],
  },

  "poliza-mantenimiento-preventivo": {
    sections: [
      {
        id: "por-espacio",
        after: "para-quien",
        title: "Qué incluir según el tipo de espacio",
        blocks: [
          {
            kv: [
              ["Oficinas", "Climatización, iluminación, tablero eléctrico y revisión de áreas comunes."],
              ["Restaurantes", "Climatización con mayor frecuencia, extracción, instalaciones eléctricas de cocina."],
              ["Sucursales y franquicias", "El mismo plan en todas las ubicaciones, con reporte por sucursal."],
              ["Naves y bodegas", "Iluminación, tableros, techumbres y equipos que trabajan muchas horas."],
            ],
          },
        ],
      },
      {
        id: "cuanto-cuesta",
        after: "por-espacio",
        title: "Cuánto cuesta una póliza",
        blocks: [
          { p: "El precio de una póliza depende del inventario. Estos precios de partida sirven para dimensionar el presupuesto:" },
          {
            kv: [
              ["Póliza para negocio con 5 a 10 minisplits", "Desde $3,500 al mes"],
              ["Plan anual por minisplit", "Desde $1,900 por equipo al año"],
              ["Mantenimiento preventivo de tablero", "Desde $1,500 por tablero"],
              ["Hora de técnico especializado", "Desde $550 por hora"],
            ],
          },
          { callout: REF, tone: "info" },
        ],
      },
      {
        id: "arranque",
        after: "cuanto-cuesta",
        title: "Cuánto tarda arrancar",
        blocks: [
          { p: "El primer paso es el levantamiento, que suele tomar una o dos visitas según el número de equipos. Con el inventario se arma la propuesta y, al aprobarla, se programa la primera visita. En comercios se visita cada tres meses, en restaurantes cada dos, en industria cada uno o dos y en casas cada seis." },
        ],
      },
      {
        id: "reporte",
        after: "arranque",
        title: "Ejemplo de reporte de visita",
        blocks: [
          {
            kv: [
              ["Equipo", "Identificador, ubicación, marca y modelo."],
              ["Trabajo realizado", "Qué se revisó y qué se limpió."],
              ["Estado", "Bueno, requiere atención o urgente."],
              ["Fotos", "Antes y después de cada equipo."],
              ["Recomendaciones", "Correctivos sugeridos con prioridad y costo estimado."],
            ],
          },
          { p: "Con los reportes de un año puedes ver qué equipos fallan más, planear su reemplazo con tiempo y justificar el presupuesto de mantenimiento ante la dirección o los dueños del negocio." },
        ],
      },
      {
        id: "indicadores",
        after: "reporte",
        title: "Cómo saber si la póliza funciona",
        blocks: [
          { list: ["Menos fallas inesperadas que el año anterior.", "Visitas cumplidas en las fechas acordadas.", "Correctivos detectados antes de que detengan la operación.", "Reportes completos y a tiempo."] },
        ],
      },
      {
        id: "poliza-o-evento",
        after: "indicadores",
        title: "Póliza o servicio por evento",
        blocks: [
          {
            kv: [
              ["Póliza", "Pago fijo, visitas programadas, historial por equipo y atención prioritaria. Conviene cuando tienes varios equipos o tu operación no puede detenerse."],
              ["Por evento", "Pagas cada visita cuando la necesitas. Conviene si tienes pocos equipos y puedes esperar a que haya agenda."],
            ],
          },
          { p: "Una forma práctica de decidir es sumar lo que gastaste el último año en reparaciones y visitas sueltas, y compararlo con el costo anual de la póliza. Si además hubo días en que el negocio tuvo que cerrar o trabajar sin clima, ese costo también cuenta." },
        ],
      },
      {
        id: "antes-de-firmar",
        after: "evaluar",
        title: "Qué revisar antes de firmar",
        blocks: [
          { list: ["Lista de equipos incluidos y frecuencia de visita de cada uno.", "Tiempo de respuesta para fallas entre visitas.", "Si las refacciones y el gas se cobran aparte.", "Cómo se aprueban los correctivos y con qué tarifa.", "Formato y plazo de entrega de los reportes.", "Duración del contrato y condiciones para cancelarlo."] },
          { p: "Estos puntos evitan malentendidos y permiten comparar propuestas de distintos proveedores en igualdad de condiciones." },
        ],
      },
    ],
    faq: [
      ["¿Cuánto cuesta una póliza de mantenimiento preventivo?", "Depende del inventario y la frecuencia. En la CDMX, una póliza para un negocio con 5 a 10 minisplits parte de $3,500 al mes, y el plan anual por minisplit, desde $1,900 por equipo."],
    ],
  },
};
