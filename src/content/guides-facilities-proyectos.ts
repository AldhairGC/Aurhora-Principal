import type { Article } from "./types";

/* Guías de Recursos (facilities-proyectos). */
const REF = "Precios desde, en pesos mexicanos, con IVA incluido. El precio final se confirma en la cotización, después de revisar tu caso.";

export const GUIDES_FACILITIES_PROYECTOS: Article[] = [
  {
    id: "remodelar-un-bano",
    unit: "facilities",
    title: "Cómo remodelar un baño: el orden de la obra, las pruebas y los costos",
    excerpt: "Qué decidir antes de empezar, en qué orden se hace la obra, qué pruebas pedir antes de cerrar muros y pisos, y cuánto cuesta remodelar un baño en la CDMX.",
    date: "23 de octubre de 2026",
    published: "2026-10-23",
    minutes: 6,
    service: "proyectos-residenciales",
    related: ["detectar-fuga-de-agua-oculta", "cuando-cambiar-instalacion-electrica", "lavar-tinaco-y-cisterna"],
    sections: [
      {
        id: "antes",
        title: "Qué decidir antes de empezar",
        blocks: [
          { p: "La mayoría de los cambios caros en un baño ocurren cuando la obra ya empezó: una mezcladora que no coincide con la válvula empotrada, un WC con otra medida de salida o un recubrimiento que llega tarde. Antes de demoler, conviene tener resueltos estos puntos:" },
          {
            list: [
              "Alcance: si cambias solo muebles y recubrimientos o también tuberías, drenaje e instalación eléctrica. Si el baño tiene fugas, humedad o tuberías galvanizadas viejas, lo recomendable es renovarlas ahora que el muro está abierto.",
              "Distribución: mantener el WC, el lavabo y la regadera donde están es más sencillo. Moverlos implica cambiar el drenaje y, a veces, abrir la losa.",
              "Muebles y accesorios: elige WC, lavabo, mezcladoras y regadera antes de empezar. Sus medidas definen dónde quedan las salidas de agua y drenaje.",
              "Regadera: con cancel o cortina, con nicho o sin él, a nivel de piso o con escalón. Cada opción cambia la pendiente y la impermeabilización.",
              "Ventilación: si el baño no tiene ventana o la que tiene es pequeña, un extractor evita la humedad y el moho.",
              "Agua caliente: dónde está el calentador y si alcanza para la regadera nueva.",
              "Presupuesto: deja un margen para lo que aparezca al demoler, como tubería dañada o un firme en mal estado.",
            ],
          },
          { callout: "Abrir o cambiar losas, quitar muros o mover el baño de lugar requiere la evaluación de un especialista en estructura. Los permisos de construcción, cuando apliquen, los revisa el propietario o un especialista. En condominio, revisa también el reglamento y los horarios permitidos para obra.", tone: "warn" },
        ],
      },
      {
        id: "orden",
        title: "El orden de la obra",
        blocks: [
          { p: "Un baño se remodela de adentro hacia afuera: primero lo que queda oculto en muros y pisos, después lo que se ve. Seguir este orden evita romper un azulejo nuevo para corregir una tubería." },
          {
            ordered: true,
            list: [
              "Demolición y retiro de muebles, recubrimientos y, si hace falta, tuberías viejas.",
              "Instalación hidráulica y sanitaria: tuberías de agua fría y caliente, salidas para cada mueble y drenaje con la pendiente correcta.",
              "Instalación eléctrica: contactos, apagadores, salida para luminarias y extractor.",
              "Pruebas de presión, de drenaje y de cada circuito, con los muros todavía abiertos.",
              "Cierre de ranuras, firme y preparación de superficies.",
              "Impermeabilización de la zona de regadera, con su prueba.",
              "Recubrimientos en muros y piso.",
              "Muebles, mezcladoras, accesorios, luminarias, extractor y cancel.",
              "Recorrido de entrega y revisión de cada salida de agua.",
            ],
          },
          { h3: "Lo que debe cuidarse en las instalaciones" },
          { p: "En la parte hidráulica, cada mueble necesita su salida a la altura que pide el fabricante y el drenaje debe tener pendiente hacia la bajada para que el agua no se estanque. Si vas a poner una mezcladora empotrada, la válvula se instala en esta etapa y no después." },
          { p: "En la parte eléctrica, los contactos deben quedar lejos de la regadera y con protección contra falla a tierra, y las luminarias dentro de la zona húmeda deben ser aptas para humedad. El extractor necesita su salida eléctrica y una ruta de salida del aire hacia el exterior." },
        ],
      },
      {
        id: "pruebas",
        title: "Las pruebas antes de cerrar",
        blocks: [
          { p: "Lo que queda dentro del muro o bajo el piso ya no se ve. Por eso las pruebas se hacen antes de colocar recubrimientos, y conviene que estés presente o que te compartan los resultados." },
          {
            list: [
              "Prueba de presión: se cierran las salidas, se presuriza la tubería con un manómetro y se deja varias horas. Si la aguja baja, hay una fuga.",
              "Prueba de drenaje: se deja correr agua por cada salida para confirmar que fluye sin regresar ni encharcarse.",
              "Prueba de inundación de la regadera: con la impermeabilización seca, se tapa la coladera, se llena con unos centímetros de agua y se deja al menos 24 horas. Después se revisa que el nivel no baje y que no haya humedad abajo ni en los muros vecinos.",
              "Prueba eléctrica: se revisa cada circuito y se confirma que la protección contra falla a tierra corta cuando debe.",
            ],
          },
          { callout: "Pide fotos de las tuberías y del drenaje antes de cerrar. Si en unos años necesitas perforar un muro o buscar una fuga, sabrás por dónde pasan.", tone: "info" },
        ],
      },
      {
        id: "vivir-la-obra",
        title: "Cómo vivir la obra",
        blocks: [
          { p: "Si es el único baño de la casa, organiza desde antes dónde se van a bañar durante las semanas de obra. Si hay otro, avisa a todos que ese será el baño de uso diario." },
          {
            list: [
              "Pregunta qué días habrá cortes de agua o de energía y a qué horas.",
              "La demolición es la etapa más ruidosa y con más polvo. Cubre con plástico las puertas y los muebles cercanos.",
              "Define dónde se guarda el material y por dónde entra y sale el escombro.",
              "Confirma que los muebles y recubrimientos que compraste lleguen antes de la etapa en que se instalan.",
              "Respeta los tiempos de secado del impermeabilizante y del adhesivo. Usar la regadera antes de tiempo puede dañar el trabajo.",
            ],
          },
        ],
      },
      {
        id: "cuanto-cuesta",
        title: "Cuánto cuesta y cuánto tarda",
        blocks: [
          { p: "Cotizamos la remodelación de baño como proyecto, después de ver el espacio. Estos son nuestros precios de partida:" },
          {
            kv: [
              ["Remodelación de baño", "Desde $11,050 por proyecto"],
              ["Instalación de WC (mano de obra)", "Desde $1,200 por pieza"],
              ["Instalación de lavabo (mano de obra)", "Desde $1,400 por pieza"],
              ["Cambio de llave o mezcladora (mano de obra)", "Desde $700 por pieza"],
              ["Instalación de calentador (mano de obra y conexiones)", "Desde $2,000 por equipo"],
              ["Punto eléctrico en obra (mano de obra)", "Desde $550 por punto"],
            ],
          },
          { p: "El total depende de si renuevas tuberías y drenaje, de los metros de recubrimiento, de si cambias la distribución y de los muebles y acabados que elijas. Muebles, accesorios y recubrimientos se cotizan aparte o los eliges tú." },
          { p: "Si solo cambias un mueble, la instalación toma de dos a tres horas por pieza. Una remodelación completa se mide en semanas, porque incluye pruebas y tiempos de secado que no conviene acortar. La propuesta incluye un programa de trabajo con las fechas de cada etapa." },
          { callout: REF, tone: "info" },
        ],
      },
      {
        id: "errores",
        title: "Errores que salen caros",
        blocks: [
          {
            list: [
              "Colocar azulejo nuevo sobre tuberías viejas que ya tenían fugas.",
              "Impermeabilizar solo el piso de la regadera y dejar sin protección la parte baja de los muros.",
              "Cerrar muros sin probar presión ni drenaje.",
              "Comprar los muebles cuando las salidas ya están hechas.",
              "Olvidar el extractor en un baño sin ventana.",
            ],
          },
        ],
      },
      {
        id: "siguiente-paso",
        title: "El siguiente paso",
        blocks: [
          { p: "Mándanos fotos del baño, medidas aproximadas y lo que quieres cambiar. Con eso agendamos un levantamiento en sitio y te entregamos una propuesta por etapas con alcance, materiales y programa de trabajo. Un responsable de proyecto coordina las especialidades y te reporta avances." },
          { p: "Atendemos en CDMX y área metropolitana, y el trabajo tiene garantía de 90 días sobre el trabajo realizado." },
        ],
      },
    ],
    faq: [
      ["¿Cuánto cuesta remodelar un baño en la CDMX?", "Con nosotros, la remodelación de baño parte de $11,050 por proyecto, con IVA incluido. El precio final depende del alcance, de si se renuevan tuberías y de los acabados que elijas."],
      ["¿Cuánto tarda la remodelación de un baño?", "Cambiar un mueble toma unas horas. Una remodelación completa toma semanas, porque se hacen pruebas antes de cerrar y se respetan los tiempos de secado. La fecha de cada etapa queda en el programa de trabajo."],
      ["¿Puedo poner azulejo nuevo sobre el anterior?", "En algunos casos sí, si el recubrimiento existente está firme y no hay humedad. Si hay fugas, tuberías viejas o azulejos huecos, lo recomendable es retirarlo y revisar lo que hay detrás."],
      ["¿Puedo cambiar el WC de lugar?", "Sí, pero implica mover el drenaje con su pendiente y, a veces, abrir la losa. Si hay que tocar la estructura, se evalúa con un especialista antes de decidir."],
    ],
    seo: {
      title: "Remodelar un baño: orden de la obra y costos en CDMX",
      description: "Remodelar un baño paso a paso: qué decidir antes, el orden de la obra, las pruebas antes de cerrar muros y pisos, cuánto cuesta y cuánto tarda en la CDMX.",
      slug: "/recursos/remodelar-un-bano-pasos-y-costos",
      keywords: ["remodelar un baño", "remodelación de baño CDMX", "cuánto cuesta remodelar un baño", "orden para remodelar un baño", "impermeabilizar regadera"],
    },
  },
  {
    id: "mantenimiento-nave-industrial",
    unit: "facilities",
    title: "Mantenimiento de una nave industrial: checklist de instalaciones",
    excerpt: "Qué revisar en tableros, iluminación, clima, bombeo y cubierta de una nave o bodega, cómo combinar preventivo y correctivo, y qué documentación debes recibir.",
    date: "23 de octubre de 2026",
    published: "2026-10-23",
    minutes: 6,
    service: "proyectos-industriales",
    related: ["poliza-mantenimiento-preventivo", "por-que-se-bota-la-pastilla", "cuando-cambiar-instalacion-electrica"],
    sections: [
      {
        id: "preventivo-correctivo",
        title: "Preventivo y correctivo",
        blocks: [
          { p: "En una nave o bodega, las instalaciones trabajan muchas horas y casi nadie las ve hasta que fallan. El mantenimiento preventivo revisa y limpia en fechas fijas para encontrar el desgaste antes de que detenga la operación. El correctivo repara lo que ya falló." },
          {
            kv: [
              ["Preventivo", "Visitas programadas con una lista de revisión por instalación. Se planea, se presupuesta y se hace en horarios acordados."],
              ["Correctivo", "Atiende una falla puntual: una pastilla que se bota, una bomba que no arranca, una luminaria apagada."],
              ["Correctivo mayor", "Cambio de tableros, bombas, tuberías o equipos cuando el desgaste ya no se resuelve con mantenimiento."],
            ],
          },
          { p: "Siempre habrá correctivos. La meta es que sean pocos y que no te tomen por sorpresa. Para eso el punto de partida es un inventario: qué equipos hay, dónde están, en qué estado y cuándo recibieron servicio por última vez." },
        ],
      },
      {
        id: "checklist",
        title: "Checklist de instalaciones",
        blocks: [
          { p: "Usa esta lista para revisar tu nave o para comparar lo que incluye la propuesta de un proveedor." },
          { h3: "Eléctrica en baja tensión y tableros" },
          {
            list: [
              "Inspección visual de tableros: limpieza, tapas completas, sin cables expuestos ni señales de calentamiento.",
              "Medición de voltaje, corriente y balance de fases con la carga de operación.",
              "Termografía para ubicar conexiones calientes.",
              "Reapriete de conexiones con el circuito desenergizado, en el horario acordado.",
              "Circuitos rotulados y diagrama del tablero actualizado.",
              "Contactos industriales y clavijas sin daños, y canalizaciones bien sujetas.",
            ],
          },
          { h3: "Iluminación de alto montaje" },
          {
            list: [
              "Recorrido con la lista de luminarias: cuáles fallan, parpadean o dan menos luz.",
              "Revisión de drivers, sujeción y cableado de cada luminaria.",
              "Medición con luxómetro en pasillos, racks, andenes y áreas de trabajo.",
              "Fotoceldas y timers del alumbrado exterior y del estacionamiento.",
              "Iluminación de emergencia encendiendo al cortar la energía.",
            ],
          },
          { h3: "Clima y extracción" },
          {
            list: [
              "Limpieza de filtros y serpentines de minisplits, cassettes y equipos piso-techo.",
              "Drenaje de condensado libre y sin goteo dentro del área de trabajo.",
              "Temperatura de salida y consumo eléctrico de cada equipo.",
              "Extractores: ruido, vibración, aspas, rejillas y sujeción.",
            ],
          },
          { h3: "Hidrosanitarias y bombeo" },
          {
            list: [
              "Arranque, presión y ruido de las bombas, y revisión de flotadores y válvulas.",
              "Fugas en sanitarios, mingitorios, llaves y tuberías visibles.",
              "Lavado y desinfección de cisternas y tinacos con la frecuencia acordada.",
              "Drenajes y registros sin azolve.",
            ],
          },
          { h3: "Cubierta" },
          {
            list: [
              "Tornillería, traslapes y sellos de la lámina.",
              "Canalones y bajadas pluviales limpios antes de la temporada de lluvias.",
              "Láminas traslúcidas y domos sin grietas.",
              "Manchas de humedad o goteras vistas desde el interior.",
            ],
          },
          { callout: "Trabajamos en baja tensión. Media tensión, subestaciones y redes contra incendio no las ejecutamos: se coordinan con un especialista. Si la cubierta muestra daños en la estructura, se evalúa con un especialista en estructura antes de intervenir.", tone: "warn" },
        ],
      },
      {
        id: "frecuencia",
        title: "Con qué frecuencia revisar",
        blocks: [
          { p: "La frecuencia depende de las horas de uso, del polvo y de lo crítico que sea cada equipo. Estos son puntos de partida que se ajustan con el historial:" },
          {
            kv: [
              ["Climatización", "Cada tres meses, o antes en áreas con mucho polvo o uso continuo."],
              ["Tableros", "Al menos una vez al año, con medición y termografía."],
              ["Iluminación", "En cada visita de mantenimiento, con un recorrido completo."],
              ["Bombas", "En cada visita, revisando arranque, presión y ruido."],
              ["Cubierta y bajadas pluviales", "Antes y después de la temporada de lluvias."],
            ],
          },
          { p: "Si quieres un solo calendario para todas las instalaciones, una póliza de mantenimiento programado agrupa las visitas y deja una bitácora por equipo." },
        ],
      },
      {
        id: "fuera-de-horario",
        title: "Trabajos fuera de horario",
        blocks: [
          { p: "Muchos trabajos de mantenimiento requieren cortar la energía o el agua de una zona, o trabajar en altura sobre áreas de paso. En una nave que no puede parar, esos trabajos se hacen en noches, fines de semana o paros programados." },
          {
            list: [
              "Identifica con tu responsable de operación qué áreas y horarios son críticos.",
              "Divide el trabajo en etapas cortas que se cierren dentro de cada ventana de tiempo.",
              "Avisa con anticipación los cortes de energía o agua a las áreas afectadas.",
              "Comparte tus reglas de seguridad: EPP, permisos de trabajo, inducción y seguros.",
              "Define cómo se entrega el área al final de cada turno: limpia, operando y con reporte de avance.",
            ],
          },
          { p: "Los trabajos fuera de horario se cotizan aparte, y la renta de elevador o andamio para alturas también." },
        ],
      },
      {
        id: "documentacion",
        title: "La documentación que debes recibir",
        blocks: [
          { p: "Un mantenimiento sin registro es difícil de evaluar y de justificar ante tu corporativo o tu aseguradora. Al terminar cada visita o proyecto deberías recibir:" },
          {
            list: [
              "Inventario de equipos con ubicación, estado y fotos.",
              "Bitácora con lo que se revisó, las mediciones y los hallazgos.",
              "Fotos de antes y después.",
              "Diagramas de tablero actualizados cuando se cambian circuitos.",
              "Lista de pendientes ordenada por prioridad, con lo urgente separado de lo que puede esperar.",
            ],
          },
          { p: "Si tu plaza, corporativo o aseguradora pide un formato específico, compártelo desde el inicio para que se incluya en la propuesta." },
        ],
      },
      {
        id: "cuanto-cuesta",
        title: "Cuánto cuesta y cuánto tarda",
        blocks: [
          { p: "El precio depende del área, la altura de trabajo, el número de equipos y los horarios en que se puede intervenir. Estos son nuestros precios de partida:" },
          {
            kv: [
              ["Mantenimiento básico de nave o local", "Desde $2,900 por servicio"],
              ["Mantenimiento preventivo de tablero", "Desde $1,750 por tablero"],
              ["Mantenimiento de climatización comercial", "Desde $3,250 por equipo"],
              ["Iluminación LED de nave (proyecto completo)", "Desde $150 por m²"],
              ["Luminaria LED tipo campana, suministro e instalación", "Desde $6,750 por luminaria"],
            ],
          },
          { p: "El levantamiento se hace en una visita con tu responsable de operación. Un cambio de iluminación LED en una nave mediana toma de 3 a 7 días hábiles, y los demás trabajos se ejecutan por etapas según el programa acordado." },
          { callout: REF, tone: "info" },
        ],
      },
      {
        id: "siguiente-paso",
        title: "El siguiente paso",
        blocks: [
          { p: "Para preparar el levantamiento, reúne los planos o un croquis con medidas, la altura de trabajo, la lista de equipos que conozcas y los horarios en que se puede trabajar sin afectar la operación. Con eso recorremos la nave contigo y te entregamos una propuesta con alcance, horarios y documentación de entrega." },
          { p: "Atendemos naves, bodegas y locales en CDMX y área metropolitana, y el trabajo tiene garantía de 90 días sobre el trabajo realizado." },
        ],
      },
    ],
    faq: [
      ["¿Cuánto cuesta el mantenimiento de una nave industrial?", "Con nosotros, el mantenimiento básico de una nave o local parte de $2,900 por servicio y el preventivo de tablero desde $1,750 por tablero, con IVA incluido. El total depende del inventario y de los horarios."],
      ["¿Cada cuánto se da mantenimiento a una nave industrial?", "Depende de cada instalación. El clima suele revisarse cada tres meses, los tableros al menos una vez al año y la cubierta antes y después de las lluvias. El historial de cada equipo ayuda a ajustar las fechas."],
      ["¿Pueden trabajar sin detener la operación?", "Sí. Planeamos el trabajo por zonas y en ventanas de tiempo fuera de las horas críticas, como noches o fines de semana. Los trabajos fuera de horario se cotizan aparte."],
      ["¿Dan mantenimiento a subestaciones y media tensión?", "No las ejecutamos. Trabajamos en baja tensión y coordinamos con un especialista lo que corresponde a media tensión y subestaciones."],
    ],
    seo: {
      title: "Mantenimiento de nave industrial: checklist y costos",
      description: "Mantenimiento de nave industrial: checklist de tableros, iluminación LED, clima, bombeo y cubierta, preventivo vs correctivo y cuánto cuesta en la CDMX.",
      slug: "/recursos/mantenimiento-de-nave-industrial-checklist",
      keywords: ["mantenimiento de nave industrial", "checklist de mantenimiento industrial", "mantenimiento de bodegas CDMX", "mantenimiento preventivo industrial", "mantenimiento de tableros eléctricos"],
    },
  },
];
