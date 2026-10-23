import type { DocSection } from "./types";

/*
  Secciones adicionales de las guías de Recursos. Se insertan después de la sección
  indicada en `after` (o al final si no se indica). Las secciones de costo usan rangos
  como precios "Desde" autorizados.
*/
export type ArticleMore = { sections: (DocSection & { after?: string })[]; faq?: [string, string][] };

export const ARTICLES_MORE: Record<string, ArticleMore> = {
  "que-es-un-agente-de-ia": {
    sections: [
      {
        id: "ejemplo",
        after: "usos",
        title: "Un ejemplo paso a paso",
        blocks: [
          { p: "Imagina una tienda que recibe pedidos por WhatsApp. Un cliente escribe a las 9 de la noche: \"¿Tienen el modelo azul en talla mediana? Lo quiero recoger mañana en Satélite\". Así lo resuelve un agente bien diseñado:" },
          {
            ordered: true,
            list: [
              "Identifica que es una consulta de inventario con intención de compra y una sucursal específica.",
              "Consulta el inventario de esa sucursal con la herramienta que tiene permitida.",
              "Responde con la disponibilidad real y ofrece apartar el producto.",
              "Si el cliente acepta, crea el apartado en el sistema y le confirma el horario de recolección.",
              "Si el cliente pide un descuento o tiene una queja, no improvisa: deja el caso listo para que una persona lo atienda en horario de trabajo.",
            ],
          },
          { p: "Lo importante del ejemplo es que el agente trabaja con información real del negocio y que cada acción tiene un límite claro. Sin esas dos cosas, lo que tienes es un generador de texto convincente, no un agente." },
        ],
      },
      {
        id: "requisitos",
        after: "cuando-no",
        title: "Qué necesita tu empresa para tener un agente",
        blocks: [
          {
            list: [
              "Un proceso concreto y una persona responsable de él.",
              "Las fuentes de información que el agente puede usar: catálogo, políticas, manuales, historial.",
              "Acceso técnico a los sistemas donde actuará, con permisos acotados.",
              "Reglas escritas: qué puede hacer solo, qué debe consultar y qué nunca debe hacer.",
              "Una forma de medir si funciona, definida antes de empezar.",
            ],
          },
          { p: "No necesitas un equipo de tecnología propio. Sí necesitas a alguien del negocio que conozca bien el proceso y que revise los resultados de las primeras semanas." },
        ],
      },
      {
        id: "riesgos",
        after: "requisitos",
        title: "Riesgos y cómo se controlan",
        blocks: [
          {
            kv: [
              ["Respuestas incorrectas", "Limitar al agente a fuentes autorizadas y probarlo con casos reales antes de lanzarlo."],
              ["Acciones indebidas", "Dar permisos mínimos y exigir aprobación humana en pagos, descuentos y excepciones."],
              ["Privacidad de los datos", "Usar servicios empresariales que permitan excluir tu información del entrenamiento y definir dónde se procesa."],
              ["Pérdida de control", "Registrar cada acción del agente y revisar sus conversaciones con regularidad."],
            ],
          },
        ],
      },
    ],
    faq: [
      ["¿Un agente de IA puede responder fuera de horario?", "Sí. El agente puede atender a cualquier hora; los casos que pasa a una persona se resuelven en el horario de tu equipo, y conviene decírselo al cliente."],
      ["¿Necesito cambiar mis sistemas para tener un agente?", "Normalmente no. El agente se conecta a las herramientas que ya usas, siempre que permitan integración."],
    ],
  },

  "agente-ia-vs-chatbot": {
    sections: [
      {
        id: "mismo-caso",
        after: "agente",
        title: "El mismo mensaje, tres respuestas",
        blocks: [
          { p: "Un cliente escribe: \"Hola, el pedido que hice el martes no ha llegado y necesito cambiar la dirección de entrega\"." },
          {
            kv: [
              ["Chatbot de menú", "Responde con opciones fijas (\"1. Rastrear pedido, 2. Hablar con un asesor\"). El cliente tiene que adaptarse al menú."],
              ["Automatización", "Si el mensaje trae un número de pedido en el formato esperado, consulta el estado y lo envía. Si no, se detiene."],
              ["Agente de IA", "Entiende las dos peticiones, busca el pedido con los datos del cliente, informa el estado y, si las reglas lo permiten, actualiza la dirección. Si no, deja el caso preparado para una persona."],
            ],
          },
        ],
      },
      {
        id: "senales",
        after: "elegir",
        title: "Señales de que tu chatbot ya se quedó corto",
        blocks: [
          {
            list: [
              "Muchas conversaciones terminan en \"hablar con un asesor\".",
              "Los clientes escriben mensajes largos que el menú no entiende.",
              "Tu equipo repite a mano tareas que el chatbot solo anota.",
              "Mantener los flujos del chatbot ya cuesta más tiempo que atender los casos.",
            ],
          },
        ],
      },
      {
        id: "mantenimiento",
        after: "senales",
        title: "Qué implica mantener cada opción",
        blocks: [
          { p: "Un chatbot de menú requiere actualizar sus flujos cada vez que cambia el negocio. Una automatización requiere revisar sus integraciones cuando cambia alguno de los sistemas conectados. Un agente requiere mantener al día su información y revisar periódicamente sus conversaciones para ajustar instrucciones y límites." },
          { p: "En costos, los chatbots y las automatizaciones suelen pagarse como suscripción de una plataforma. Un agente suma el costo de diseño e implementación y un costo mensual que incluye el uso del modelo de IA, que crece con el volumen de conversaciones." },
        ],
      },
    ],
    faq: [
      ["¿Un agente de IA es más caro que un chatbot?", "Normalmente sí al inicio, porque requiere diseño, integraciones y pruebas. A cambio resuelve casos completos que un chatbot solo canaliza."],
      ["¿Puedo empezar con una automatización y después sumar un agente?", "Sí. Es una ruta común: primero se ordenan los datos y los flujos, y después se agrega un agente en los pasos que requieren interpretar mensajes o documentos."],
    ],
  },

  "implementar-agente-de-ia": {
    sections: [
      {
        id: "equipo",
        after: "medir-resultado",
        title: "Quién debe participar",
        blocks: [
          {
            kv: [
              ["Responsable del proceso", "Conoce los casos reales, define las reglas y aprueba el resultado."],
              ["Persona de sistemas o proveedor", "Da acceso a las herramientas y cuida permisos e integraciones."],
              ["Equipo que usará el agente", "Prueba, reporta errores y propone mejoras durante el piloto."],
              ["Implementador", "Diseña, construye, evalúa y acompaña la puesta en marcha."],
            ],
          },
        ],
      },
      {
        id: "medir-resultado",
        after: "gobierno",
        title: "Cómo saber si funcionó",
        blocks: [
          { p: "Compara contra la línea base que mediste al inicio. Las métricas dependen del caso, pero suelen incluir:" },
          { list: ["Tiempo de primera respuesta.", "Casos resueltos sin intervención humana.", "Errores de captura o devoluciones.", "Horas del equipo dedicadas al proceso.", "Satisfacción del cliente en las conversaciones atendidas."] },
          { callout: "Define estas métricas antes de construir. Si las defines después, cualquier resultado parecerá un éxito." },
        ],
      },
      {
        id: "errores",
        after: "equipo",
        title: "Errores comunes",
        blocks: [
          {
            list: [
              "Lanzar sin probar con casos reales difíciles.",
              "Darle al agente más permisos de los que necesita.",
              "No definir cuándo pasa el caso a una persona.",
              "Dejar el agente sin un responsable que revise sus conversaciones.",
              "Elegir la tecnología antes de entender el proceso.",
            ],
          },
        ],
      },
    ],
    faq: [
      ["¿Puedo implementar un agente sin un área de sistemas?", "Sí. Basta con que alguien pueda dar los accesos necesarios y con un responsable del proceso que revise los resultados."],
    ],
  },

  "domotica-sin-obra": {
    sections: [
      {
        id: "por-espacio",
        after: "posible",
        title: "Ideas por espacio",
        blocks: [
          {
            kv: [
              ["Entrada", "Chapa inteligente, videoportero y una luz que se enciende al abrir la puerta."],
              ["Sala", "Escenas de iluminación (\"película\", \"visitas\") y control de la pantalla y el audio."],
              ["Recámaras", "Control del minisplit por horario y persianas que se abren a una hora fija."],
              ["Cocina y estudio", "Luces con sensor de presencia y contactos inteligentes para apagar equipos a distancia."],
              ["Exterior", "Cámara con aviso al teléfono e iluminación programada al anochecer."],
            ],
          },
        ],
      },
      {
        id: "confiable",
        after: "ecosistema",
        title: "¿Qué tan confiable es lo inalámbrico?",
        blocks: [
          { p: "Los dispositivos inalámbricos usan distintas tecnologías para comunicarse. Algunos se conectan directamente al WiFi; otros usan redes propias de bajo consumo, como Zigbee o Thread, a través de un concentrador. El estándar Matter busca que dispositivos de distintas marcas funcionen entre sí." },
          { p: "La confiabilidad depende sobre todo de dos cosas: que tu red WiFi cubra bien toda la casa y que los dispositivos elegidos sean compatibles con el mismo sistema de control. Por eso conviene revisar la red antes de instalar." },
        ],
      },
      {
        id: "tiempos",
        after: "confiable",
        title: "Cuánto tarda la instalación",
        blocks: [
          { p: "Una instalación sin obra en un departamento suele resolverse en una o dos visitas: la primera para revisar la red y los puntos de instalación, y la segunda para instalar y configurar. Un proyecto con varias áreas o motorización de persianas puede requerir más tiempo, según la cantidad de equipos y la disponibilidad de material." },
        ],
      },
    ],
    faq: [
      ["¿Puedo controlar todo con mi voz?", "Sí, si los dispositivos son compatibles con el asistente que uses. Conviene elegirlo antes de comprar equipos."],
      ["¿Qué pasa si cambio de teléfono o de compañía de internet?", "Los dispositivos siguen funcionando; solo hay que volver a conectarlos a la red nueva o iniciar sesión en la aplicación desde el teléfono nuevo."],
    ],
  },

  "mantenimiento-minisplit": {
    sections: [
      {
        id: "paso-a-paso",
        after: "tecnico",
        title: "Qué incluye un mantenimiento profesional, paso a paso",
        blocks: [
          {
            ordered: true,
            list: [
              "Revisión de funcionamiento antes de empezar: temperatura de salida, ruidos y fugas visibles.",
              "Desmontaje y lavado de filtros.",
              "Limpieza del serpentín de la unidad interior, normalmente con producto y bolsa recolectora para no mojar la pared.",
              "Limpieza de la bandeja y la manguera de drenaje.",
              "Limpieza de la unidad exterior cuando el acceso es seguro.",
              "Revisión de conexiones eléctricas y prueba final de funcionamiento.",
            ],
          },
          { callout: "La recarga de gas no es parte del mantenimiento. Si el equipo necesita gas, normalmente hay una fuga que primero se debe localizar y reparar.", tone: "info" },
        ],
      },
      {
        id: "negocios",
        after: "senales",
        title: "En negocios y oficinas",
        blocks: [
          { p: "Un equipo que trabaja todo el día en un local, con puertas que se abren constantemente o cerca de una cocina, se ensucia más rápido. Por eso en negocios conviene programar el mantenimiento con mayor frecuencia y hacerlo fuera del horario de atención." },
          { p: "Si tienes varios equipos o sucursales, una póliza de mantenimiento ayuda a llevar el registro de cada uno y a planear las visitas." },
        ],
      },
      {
        id: "problema-mayor",
        after: "negocios",
        title: "Cuándo el problema no es la limpieza",
        blocks: [
          { list: ["El equipo enciende pero solo sopla aire a temperatura ambiente.", "Se forma hielo en la tubería o en el serpentín.", "La unidad exterior no arranca o hace ruidos metálicos.", "Se bota la pastilla al encender el equipo."] },
          { p: "En estos casos conviene pedir un diagnóstico antes que una limpieza, para no pagar un servicio que no resuelve la falla." },
        ],
      },
    ],
    faq: [
      ["¿Puedo limpiar el minisplit yo mismo?", "Puedes lavar los filtros siguiendo el manual. La limpieza del serpentín, el drenaje y la unidad exterior conviene dejarla a un técnico."],
      ["¿El mantenimiento incluye gas?", "No. Un equipo sin fugas no debería necesitar recarga; si hace falta, primero se busca y repara la fuga."],
    ],
  },

  "por-que-se-bota-la-pastilla": {
    sections: [
      {
        id: "sobrecarga",
        after: "causas",
        title: "Cómo saber si es sobrecarga",
        blocks: [
          { p: "Cada circuito tiene una capacidad. En una casa en México la tensión es de alrededor de 127 volts; un circuito protegido con una pastilla de 15 amperes soporta cerca de 1,900 watts (127 × 15)." },
          { p: "Si en ese mismo circuito conectas al mismo tiempo un horno de microondas y una plancha, la suma puede rebasar esa capacidad y la pastilla se bota para proteger los cables. La potencia de cada aparato viene en su etiqueta." },
          { callout: "Que una pastilla se bote por sobrecarga no se arregla poniendo una pastilla más grande. El cable del circuito está diseñado para cierta corriente; aumentar la pastilla sin cambiar el cable es un riesgo de incendio.", tone: "warn" },
        ],
      },
      {
        id: "tipos",
        after: "sobrecarga",
        title: "Pastilla, fusible e interruptor diferencial",
        blocks: [
          {
            kv: [
              ["Pastilla (termomagnético)", "Corta el circuito por sobrecarga o cortocircuito. Se vuelve a subir."],
              ["Fusible", "Hace lo mismo, pero se funde y hay que reemplazarlo. Es común en instalaciones antiguas."],
              ["Interruptor diferencial", "Detecta fugas de corriente a tierra y protege a las personas. Es recomendable en baños, cocinas y exteriores."],
            ],
          },
        ],
      },
      {
        id: "cambiar",
        after: "revision",
        title: "Cuándo conviene cambiar la pastilla o el tablero",
        blocks: [
          { list: ["La pastilla se siente caliente o tiene marcas de quemado.", "Se bota sin carga conectada.", "El tablero tiene fusibles antiguos o no tiene espacio para nuevos circuitos.", "Vas a instalar equipos de alto consumo, como minisplits o un horno eléctrico."] },
        ],
      },
    ],
    faq: [
      ["¿Es peligroso subir la pastilla muchas veces?", "Si se bota de inmediato, sí: indica un cortocircuito o una falla a tierra. Déjala abajo y pide una revisión."],
      ["¿Puedo poner una pastilla de más amperes para que ya no se bote?", "No. La pastilla protege al cable; si la cambias por una mayor sin cambiar el cableado, el cable puede sobrecalentarse."],
    ],
  },

  "poliza-mantenimiento-preventivo": {
    sections: [
      {
        id: "calendario",
        after: "incluir",
        title: "Ejemplo de calendario anual",
        blocks: [
          { p: "Un ejemplo ilustrativo para una oficina con climatización, iluminación y un tablero principal. Las frecuencias reales se definen con el inventario y el uso de cada equipo." },
          {
            kv: [
              ["Minisplits", "Limpieza y revisión periódica, con mayor frecuencia antes de la temporada de calor."],
              ["Tablero eléctrico", "Revisión de conexiones y temperatura de pastillas una o dos veces al año."],
              ["Iluminación", "Revisión de luminarias y reemplazo programado de las que fallan."],
              ["Instalaciones generales", "Recorrido para detectar fugas, puertas y herrajes dañados."],
            ],
          },
        ],
      },
      {
        id: "documentos",
        after: "evaluar",
        title: "Qué documentos pedir",
        blocks: [
          { list: ["Inventario inicial con el estado de cada equipo.", "Calendario de visitas por equipo.", "Reporte de cada visita con fotos y observaciones.", "Lista de correctivos detectados con su prioridad y costo.", "Condiciones de respuesta para fallas entre visitas."] },
        ],
      },
      {
        id: "preventivo-correctivo",
        after: "documentos",
        title: "Preventivo contra correctivo",
        blocks: [
          { p: "El mantenimiento correctivo se paga cuando algo ya falló, muchas veces con urgencia y con la operación detenida. El preventivo se planea y su costo es predecible. El objetivo de una póliza no es eliminar todas las fallas, sino reducir las inesperadas y detectar a tiempo lo que conviene reparar." },
        ],
      },
    ],
    faq: [
      ["¿La póliza incluye refacciones?", "Depende del contrato. Lo común es que incluya mano de obra y materiales de limpieza, y que las refacciones se coticen aparte con tu aprobación."],
      ["¿Puedo cancelar una póliza?", "Las condiciones de cancelación se definen en el contrato. Conviene revisarlas antes de firmar."],
    ],
  },
};
