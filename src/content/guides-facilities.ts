import type { Article } from "./types";

const REF = "Precios desde, en pesos mexicanos, con IVA incluido. El precio final se confirma en la cotización, después de revisar tu caso.";

/* Guías de Recursos (facilities). */
export const GUIDES_FACILITIES: Article[] = [
  {
    id: "cuando-cambiar-instalacion-electrica",
    unit: "facilities",
    title: "Cuándo cambiar la instalación eléctrica de tu casa: señales y qué incluye",
    excerpt: "Las señales de que tu instalación eléctrica ya no da para más, qué incluye una renovación completa y cuánto cuesta con nosotros.",
    date: "23 de octubre de 2026",
    published: "2026-10-23",
    minutes: 6,
    service: "electricidad",
    related: ["por-que-se-bota-la-pastilla", "remodelar-un-bano", "poliza-mantenimiento-preventivo"],
    sections: [
      {
        id: "senales",
        title: "Señales de que tu instalación ya no da para más",
        blocks: [
          { p: "Una instalación eléctrica no tiene fecha de caducidad fija. Lo que importa es su estado y si alcanza para lo que hoy conectas. Muchas casas se cablearon para un refrigerador, una televisión y algunos focos; ahora tienen microondas, minisplits, computadoras y cargadores encendidos todo el día. Estas son las señales más claras de que conviene revisarla a fondo:" },
          {
            list: [
              "Cable forrado de tela o con forro que se cuartea y se desmorona al tocarlo. Es típico de construcciones de hace varias décadas.",
              "Pastillas que se botan seguido, aunque repartas los aparatos entre varios contactos.",
              "Contactos o apagadores calientes, flojos o con marcas negras alrededor.",
              "Contactos de dos patas, sin el orificio redondo de tierra, o adaptadores en casi todos los aparatos.",
              "Fusibles en lugar de pastillas, o un centro de carga sin espacio para más circuitos.",
              "Focos que bajan de intensidad o parpadean cuando arranca un aparato grande.",
              "Extensiones y multicontactos permanentes porque no hay contactos donde los necesitas.",
              "Olor a quemado o a plástico caliente cerca de un contacto o del tablero.",
            ],
          },
          { p: "Una sola señal no siempre significa cambiar todo. Un contacto quemado puede ser un problema local. Cuando aparecen varias a la vez, sobre todo cable viejo y falta de tierra física, el problema suele ser de toda la instalación." },
          { callout: "Si hay olor a quemado, chispas, humo o un contacto que se calienta, desconecta lo que esté conectado y baja la pastilla de esa zona si puedes hacerlo con seguridad. No esperes a la renovación para atenderlo.", tone: "warn" },
        ],
      },
      {
        id: "por-que-importa",
        title: "Por qué no conviene seguir parchando",
        blocks: [
          { p: "El cable viejo pierde aislamiento con el calor y los años. Cuando el forro se agrieta, dos conductores pueden tocarse y provocar un corto, o la corriente puede escapar hacia una caja metálica o un muro húmedo. Sin tierra física, esa corriente no tiene un camino seguro y puede pasar por una persona." },
          { p: "Cambiar piezas sueltas en una instalación así resuelve el síntoma, pero la causa sigue ahí. Además, cada parche agrega empalmes, que son puntos donde se acumula calor. Si ya cambiaste varias pastillas y contactos en poco tiempo, es momento de ver la instalación completa." },
          { p: "También importa lo que vas a conectar. Un minisplit, un horno eléctrico, un calentador eléctrico o un cargador para auto necesitan su propio circuito. Conectarlos a una instalación saturada es la forma más común de terminar con pastillas que se botan y cables que se calientan." },
        ],
      },
      {
        id: "que-incluye",
        title: "Qué incluye una renovación eléctrica",
        blocks: [
          { p: "Una renovación completa reemplaza la parte de la instalación que ya cumplió su vida útil y la ordena por circuitos. Tomamos como referencia la NOM-001-SEDE vigente, la norma mexicana de instalaciones eléctricas. En general incluye:" },
          {
            list: [
              "Levantamiento: revisión del tablero, los circuitos, la tubería y los aparatos que usas o piensas instalar.",
              "Cálculo de carga para definir cuántos circuitos necesitas, el calibre de cada cable y la pastilla que lo protege.",
              "Centro de carga nuevo, con una pastilla por circuito y un directorio que indica qué controla cada una.",
              "Circuitos separados para iluminación, contactos generales, cocina, baños y equipos de alto consumo.",
              "Cable nuevo. Si la tubería existente está en buen estado se aprovecha; si no, se coloca canalización nueva por dentro del muro o visible.",
              "Tierra física con varilla y conductor hasta el centro de carga, y contactos polarizados.",
              "Protección diferencial en baños, cocina y exteriores.",
              "Contactos, apagadores y salidas de luz nuevos, y prueba de cada circuito con los aparatos conectados.",
            ],
            ordered: true,
          },
          { h3: "Centro de carga, diferencial y tierra física" },
          {
            kv: [
              ["Centro de carga", "La caja donde llegan los cables desde el medidor y se reparten en circuitos. Cada pastilla protege el cable de su circuito contra sobrecargas y cortos."],
              ["Interruptor diferencial", "Detecta cuando la corriente se fuga a tierra, por ejemplo a través de una persona mojada, y corta la energía en una fracción de segundo. Se usa en baños, cocina y exteriores, como pastilla o como contacto GFCI."],
              ["Tierra física", "Una varilla enterrada y un conductor que dan a la corriente de falla un camino seguro. Protege a las personas y a los equipos, y permite que las protecciones funcionen bien."],
            ],
          },
        ],
      },
      {
        id: "total-o-por-etapas",
        title: "Cambio total o por etapas",
        blocks: [
          { p: "No siempre hace falta hacerlo todo de una vez. Si el cable está en buen estado pero el tablero es viejo y no hay tierra física, puedes empezar por el centro de carga, la tierra y los diferenciales, y dejar el recableado para después. Si el cable está dañado, conviene cambiarlo completo, porque el riesgo está repartido en toda la casa." },
          { p: "Un orden práctico cuando vas por etapas:" },
          { list: ["Centro de carga, tierra física y protección diferencial.", "Circuitos de cocina, baños y equipos de alto consumo.", "Recableado del resto de la casa.", "Contactos e iluminación adicionales donde haga falta."], ordered: true },
          { p: "Si vas a remodelar un baño o la cocina, aprovecha para cambiar la instalación de esa zona antes de los acabados. Hacerlo después implica romper azulejo o muros ya terminados." },
        ],
      },
      {
        id: "cuanto-cuesta",
        title: "Cuánto cuesta y cuánto tarda",
        blocks: [
          { p: "El costo depende del tamaño de la casa, del número de circuitos y de si se aprovecha la tubería existente. Estos son nuestros precios de partida:" },
          {
            kv: [
              ["Visita o diagnóstico", "Desde $500, se descuenta si aceptas el trabajo"],
              ["Cambio de centro de carga", "Desde $1,750"],
              ["Circuito nuevo", "Desde $1,050 por circuito"],
              ["Salida de 220 V para minisplit (sin material)", "Desde $1,400 por salida"],
              ["Instalación eléctrica nueva", "Desde $250 por m²"],
              ["Remodelación eléctrica completa", "Desde $17,400 por inmueble"],
            ],
          },
          { p: "Cambiar el centro de carga toma alrededor de medio día, y un circuito nuevo, de medio día a un día. Una remodelación completa se programa por etapas en la propuesta, sobre todo si vives en la casa durante el trabajo: te avisamos qué días habrá cortes de energía. Ranurar muros, resanar y pintar se cotizan aparte." },
          { callout: REF, tone: "info" },
        ],
      },
      {
        id: "siguiente-paso",
        title: "Cómo empezar",
        blocks: [
          { p: "El primer paso es un diagnóstico. Para prepararlo, envíanos por WhatsApp:" },
          { list: ["Una foto del centro de carga con la tapa puesta y otra de un contacto que te preocupe.", "La antigüedad aproximada de la casa y si ya se cambió algo de la instalación.", "Los aparatos de alto consumo que tienes o piensas instalar.", "Si la renovación coincide con obra en baño o cocina."] },
          { p: "Con eso te decimos si basta con reparar puntos concretos o si conviene una renovación, y te entregamos la cotización antes de empezar. Si hace falta un aumento de carga ante CFE, el trámite lo hace el titular del servicio; nosotros dejamos la instalación lista para ese trámite. El trabajo tiene garantía de 90 días sobre el trabajo realizado. Atendemos en CDMX y área metropolitana." },
        ],
      },
    ],
    faq: [
      ["¿Cada cuánto se cambia la instalación eléctrica de una casa?", "No hay un plazo fijo. Se cambia cuando el cable está deteriorado, no hay tierra física o la instalación ya no alcanza para lo que conectas. En casas con varias décadas sin renovación conviene una revisión general."],
      ["¿Cuánto cuesta cambiar la instalación eléctrica de una casa?", "Con nosotros, una instalación nueva parte de $250 por m² y una remodelación eléctrica completa desde $17,400. El precio final se define después del levantamiento."],
      ["¿Se puede cambiar el cableado sin romper las paredes?", "Muchas veces sí: si la tubería existente está en buen estado, se retira el cable viejo y se pasa el nuevo por la misma tubería. Si la tubería está tapada o dañada, hay que ranurar o colocar canalización visible."],
      ["¿Es obligatorio tener tierra física en casa?", "La NOM-001-SEDE vigente la contempla como parte de una instalación segura, y muchos equipos la necesitan para que sus protecciones funcionen. Si tus contactos no tienen tierra, conviene agregarla."],
    ],
    seo: {
      title: "Cuándo cambiar la instalación eléctrica de tu casa",
      description: "Cuándo cambiar la instalación eléctrica de tu casa: cable de tela, pastillas que se botan, contactos calientes o sin tierra física, qué incluye y su costo.",
      slug: "/recursos/cuando-cambiar-la-instalacion-electrica-de-tu-casa",
      keywords: ["cuándo cambiar la instalación eléctrica", "cambiar instalación eléctrica casa CDMX", "renovación eléctrica", "tierra física en casa", "cambio de centro de carga"],
    },
  },
  {
    id: "detectar-fuga-de-agua-oculta",
    unit: "facilities",
    title: "Cómo detectar una fuga de agua oculta en tu casa",
    excerpt: "Pruebas sencillas para saber si tienes una fuga que no se ve, cómo se localiza sin romper de más y cómo se repara.",
    date: "23 de octubre de 2026",
    published: "2026-10-23",
    minutes: 6,
    service: "plomeria",
    related: ["lavar-tinaco-y-cisterna", "remodelar-un-bano", "poliza-mantenimiento-preventivo"],
    sections: [
      {
        id: "senales",
        title: "Señales de una fuga que no ves",
        blocks: [
          { p: "Una fuga oculta está dentro de un muro, bajo el piso o en una conexión que no revisas seguido. Gotea poco a poco durante semanas, así que la notas por sus efectos antes que por el agua. Estas son las señales más comunes:" },
          {
            list: [
              "El recibo de agua subió y en casa nadie cambió sus hábitos.",
              "La bomba arranca sola aunque nadie esté usando agua, o la cisterna se vacía más rápido que antes.",
              "Manchas de humedad, pintura que se infla o se desprende, o salitre blanco en la parte baja de los muros.",
              "Azulejos que se despegan o juntas que se oscurecen sin razón aparente.",
              "Una zona del piso tibia: puede ser una fuga en la tubería de agua caliente.",
              "Olor a humedad o moho en un clóset, detrás de un mueble o bajo el fregadero.",
              "Sonido de agua corriendo con todas las llaves cerradas.",
              "Menos presión en las regaderas y llaves que antes.",
            ],
          },
          { h3: "Humedad, salitre y sarro: qué te dicen" },
          { p: "No toda mancha es una fuga de tubería. Si aparece o crece después de llover y está cerca del techo o de una ventana, probablemente es una filtración de lluvia. Si está en la parte baja del muro y avanza aunque no llueva, puede ser humedad que sube del suelo o una tubería que gotea. El sarro también da pistas: una línea de sarro en la taza del WC bajo el nivel del agua o costras blancas en una conexión indican que ahí escurre agua de forma constante." },
          { callout: "Si la humedad llega a un contacto, un apagador o una lámpara, o si escurre agua desde el techo cerca de una luminaria, baja la pastilla de esa zona antes de tocar nada.", tone: "warn" },
        ],
      },
      {
        id: "prueba-del-medidor",
        title: "La prueba del medidor, paso a paso",
        blocks: [
          { p: "Es la forma más sencilla de confirmar si hay una fuga. Hazla cuando nadie vaya a usar agua durante una hora:" },
          {
            list: [
              "Cierra todas las llaves de la casa y verifica que ningún WC esté llenándose.",
              "Apaga la lavadora, el lavavajillas y cualquier equipo que use agua.",
              "Toma una foto de la lectura del medidor y fíjate en el indicador de flujo, la pequeña rueda o estrella que gira cuando pasa agua.",
              "Espera una hora sin usar agua.",
              "Toma otra foto y compara. Si la lectura avanzó o el indicador se mueve, hay una fuga.",
            ],
            ordered: true,
          },
          { h3: "Si tu casa tiene cisterna y tinaco" },
          { p: "En muchas casas de la CDMX y el área metropolitana el agua entra primero a la cisterna, la bomba la sube al tinaco y de ahí baja a la casa. En ese caso, el medidor solo registra lo que entra a la cisterna. Haz la prueba con la cisterna llena: si el medidor avanza, la fuga está entre el medidor y la cisterna, en la cisterna misma o en un flotador que no cierra." },
          { p: "Para revisar el resto de la casa, apaga la bomba cuando el tinaco esté lleno, marca el nivel del agua con un plumón y no uses agua durante unas horas. Si el nivel baja, hay una fuga entre el tinaco y las llaves de la casa." },
        ],
      },
      {
        id: "wc",
        title: "El WC: la fuga más común que no se ve",
        blocks: [
          { p: "Un WC que deja escapar agua hacia la taza puede gastar mucha agua sin hacer ruido. Para revisarlo:" },
          { list: ["Quita la tapa del tanque y pon unas gotas de colorante vegetal en el agua.", "Espera unos 15 minutos sin jalar la palanca.", "Si el color aparece en la taza, el sapo o la válvula de descarga no sellan.", "Si el agua del tanque llega al tubo de rebosadero, el flotador o la válvula de llenado están mal ajustados."], ordered: true },
          { p: "Escucha también si el tanque se rellena solo cada cierto tiempo. Casi siempre se resuelve ajustando o cambiando el herraje, sin romper nada." },
        ],
      },
      {
        id: "localizar",
        title: "Cómo se localiza una fuga oculta",
        blocks: [
          { p: "Cuando la prueba del medidor confirma la fuga, el siguiente paso es saber dónde está antes de abrir. Así trabajamos:" },
          {
            list: [
              "Confirmamos la fuga con el medidor y las llaves cerradas, y revisamos WC, flotadores y conexiones a la vista.",
              "Cerramos por secciones con las llaves de paso de cocina, baños, calentador o jardín para ver en qué zona se detiene el consumo.",
              "Hacemos una prueba de presión con manómetro: aislamos un tramo, lo presurizamos y revisamos si la presión baja.",
              "Separamos agua fría y agua caliente, porque cada una tiene su propia red.",
              "Revisamos manchas, salitre y temperatura de muros y pisos para acotar el punto.",
            ],
            ordered: true,
          },
          { p: "Con eso se abre solo donde hace falta, en lugar de romper un muro completo para buscar. A veces la fuga está lejos de la mancha, porque el agua corre por dentro del muro antes de salir. Si la casa no tiene llaves de paso por zona, a veces conviene instalarlas en la misma visita: facilitan este trabajo y cualquier reparación futura." },
        ],
      },
      {
        id: "reparar",
        title: "Cómo se repara y qué puedes hacer mientras",
        blocks: [
          { p: "Según lo que se encuentre, se repara la conexión que falla o se cambia el tramo dañado por cobre, CPVC o PPR, cada uno con su método de unión. En tubería galvanizada vieja suele convenir cambiar el tramo completo, porque el resto está igual de corroído. Antes de cerrar el muro se repite la prueba de presión para confirmar que no hay más fugas." },
          { p: "Mientras llega la revisión:" },
          { list: ["Cierra la llave de paso del área o la general si la fuga es evidente.", "Seca y ventila la zona para frenar el moho.", "Toma fotos de las manchas y anota las lecturas del medidor.", "No pintes ni resanes encima: la mancha regresa y se pierde la pista de dónde viene el agua."] },
        ],
      },
      {
        id: "cuanto-cuesta",
        title: "Cuánto cuesta y cuánto tarda",
        blocks: [
          { p: "Una fuga oculta se cotiza después de localizarla, porque el costo depende de dónde está y de cuánto hay que abrir. Estos son nuestros precios de partida:" },
          {
            kv: [
              ["Visita o diagnóstico", "Desde $500, se descuenta si aceptas el trabajo"],
              ["Hora de servicio", "Desde $300 por hora"],
              ["Reparación de fuga visible", "Desde $600 por fuga"],
            ],
          },
          { p: "Una fuga visible o un herraje de WC se resuelven en una a dos horas. Una fuga dentro de un muro o piso puede tomar más tiempo, entre localizarla, abrir, reparar y probar. Ranurar, demoler y resanar se cotizan aparte, igual que el material adicional a lo cotizado." },
          { callout: REF, tone: "info" },
        ],
      },
      {
        id: "siguiente-paso",
        title: "Qué enviarnos para empezar",
        blocks: [
          { p: "Mándanos por WhatsApp las fotos de las manchas, las dos lecturas del medidor si hiciste la prueba, y dinos si el agua llega directo de la red o de cisterna y tinaco. Si sabes el tipo de tubería o la antigüedad de la casa, también ayuda." },
          { p: "Con esa información te decimos si conviene una visita de diagnóstico y qué esperar de ella. El trabajo tiene garantía de 90 días sobre el trabajo realizado, y atendemos en CDMX y área metropolitana." },
        ],
      },
    ],
    faq: [
      ["¿Cómo sé si tengo una fuga de agua en casa?", "Cierra todas las llaves, toma una foto del medidor y espera una hora sin usar agua. Si la lectura avanzó o el indicador de flujo se mueve, hay una fuga."],
      ["¿Una fuga oculta puede subir mucho el recibo?", "Sí. Aunque gotee poco, corre las 24 horas, así que el consumo se acumula durante todo el periodo de facturación."],
      ["¿Hay que romper la pared para reparar una fuga oculta?", "Casi siempre hay que abrir en el punto de la fuga, pero si primero se localiza por secciones y con prueba de presión, se abre solo lo necesario. El resane se cotiza aparte."],
      ["¿La humedad en la pared siempre es una fuga?", "No. También puede ser filtración de lluvia, humedad que sube del suelo o condensación. La prueba del medidor ayuda a descartar o confirmar una fuga de tubería."],
    ],
    seo: {
      title: "Cómo detectar una fuga de agua oculta en tu casa",
      description: "Cómo detectar una fuga de agua oculta: prueba del medidor, humedad en muros, WC que corre, sarro, cómo se localiza sin romper de más y cómo se repara en CDMX.",
      slug: "/recursos/como-detectar-una-fuga-de-agua-oculta",
      keywords: ["cómo detectar una fuga de agua oculta", "fuga de agua en la pared", "prueba del medidor de agua", "detección de fugas CDMX", "plomero para fugas CDMX"],
    },
  },
  {
    id: "instalar-soporte-de-tv",
    unit: "facilities",
    title: "Cómo instalar un soporte de TV en la pared: concreto, tabique o tablaroca",
    excerpt: "Qué soporte elegir, qué taquete usar según tu muro, a qué altura colgar la pantalla y cómo ocultar los cables.",
    date: "23 de octubre de 2026",
    published: "2026-10-23",
    minutes: 6,
    service: "reparaciones",
    related: ["cuando-cambiar-instalacion-electrica", "por-que-se-bota-la-pastilla"],
    sections: [
      {
        id: "antes",
        title: "Antes de empezar: pantalla, muro y soporte",
        blocks: [
          { p: "Un soporte bien instalado depende de tres datos: el peso de la pantalla, el patrón de orificios de su parte trasera y el tipo de muro. Revisa los tres antes de comprar nada." },
          {
            list: [
              "Peso: viene en el manual o en la ficha técnica. Busca el peso sin base.",
              "Patrón VESA: la distancia entre los cuatro orificios traseros, por ejemplo 200 × 200 o 400 × 400 mm. El soporte debe aceptar ese patrón.",
              "Capacidad del soporte: elige uno que soporte más peso que tu pantalla, con margen, sobre todo si es articulado.",
            ],
          },
          { h3: "Cómo saber de qué es tu muro" },
          {
            kv: [
              ["Concreto", "Suena sólido, cuesta trabajo perforar y el polvo sale gris."],
              ["Tabique o block", "El polvo sale rojizo o gris claro. Puede ser macizo o tener huecos por dentro; si la broca de pronto entra fácil, encontraste un hueco."],
              ["Tablaroca", "Suena hueco al tocarlo, cede un poco con presión y el polvo sale blanco. Por dentro tiene perfiles metálicos cada cierto tramo."],
            ],
          },
        ],
      },
      {
        id: "tipos-de-soporte",
        title: "Tipos de soporte",
        blocks: [
          {
            kv: [
              ["Fijo", "Deja la pantalla pegada al muro. Es el más sencillo y estable, ideal si ves la TV siempre de frente."],
              ["Inclinable", "Permite inclinar la pantalla hacia abajo. Útil si queda más alta, como en una recámara."],
              ["Articulado", "Tiene un brazo que se separa del muro y gira. Sirve para ver desde distintos puntos o en esquinas, pero ejerce mucha más fuerza sobre la fijación."],
            ],
          },
          { p: "Mientras más se separa la pantalla del muro, más palanca hace sobre los taquetes. Por eso un articulado con una pantalla grande necesita un muro firme y una fijación más robusta que un soporte fijo." },
        ],
      },
      {
        id: "altura",
        title: "A qué altura poner la TV",
        blocks: [
          { p: "La referencia más práctica es que el centro de la pantalla quede a la altura de tus ojos cuando estás sentado. En una sala con sillones de altura normal, eso suele quedar alrededor de 1.0 a 1.2 metros del piso al centro de la pantalla. Siéntate donde verás la TV y pide a alguien que marque en el muro la altura de tus ojos." },
          { p: "Si la pantalla va sobre un mueble alto o en una recámara, quedará más arriba; en ese caso un soporte inclinable ayuda a que no tengas que levantar la cabeza. Considera también dónde están los contactos y por dónde llegarán los cables antes de definir la posición." },
        ],
      },
      {
        id: "fijacion",
        title: "Qué taquete usar según el muro",
        blocks: [
          {
            kv: [
              ["Concreto", "Taquetes de expansión con pijas o tornillos del largo adecuado, perforando con rotomartillo y broca para concreto."],
              ["Tabique macizo", "Taquetes de expansión. Perfora sin percusión al inicio para no estrellar la pieza."],
              ["Tabique hueco o block", "Taquetes largos para muro hueco, que agarran en las paredes internas de la pieza. Evita quedar justo en una junta de mortero débil."],
              ["Tablaroca", "Atornilla a los perfiles metálicos, ubicándolos con un detector, y complementa con anclas para tablaroca que se abren por detrás de la placa. Una pantalla pesada con brazo articulado puede requerir reforzar el muro."],
            ],
          },
          { p: "Los taquetes que vienen en la caja del soporte no siempre son los adecuados para tu muro. Revisa que el taquete, la pija y la broca coincidan en medida." },
          { callout: "Antes de perforar, revisa que no pase tubería o cable por ese punto. Evita perforar en línea vertical arriba o abajo de contactos y apagadores, y en muros que tienen del otro lado un lavabo, una regadera o un calentador. Un detector de metales y voltaje reduce el riesgo, y nunca cuelgues un brazo articulado pesado solo de taquetes de plástico en tablaroca.", tone: "warn" },
        ],
      },
      {
        id: "paso-a-paso",
        title: "Instalación paso a paso",
        blocks: [
          {
            list: [
              "Atornilla los brazos o la placa del soporte a la pantalla con los tornillos que correspondan a su patrón VESA, sin forzarlos.",
              "Marca en el muro la altura definida y presenta la placa de pared con un nivel.",
              "Marca los puntos de perforación, verifica que no haya instalaciones y perfora con la broca correcta.",
              "Limpia el polvo del barreno, coloca los taquetes o anclas y fija la placa de pared.",
              "Vuelve a revisar el nivel y que la placa no se mueva al jalarla con fuerza.",
              "Cuelga la pantalla entre dos personas y coloca los seguros o tornillos de bloqueo del soporte.",
              "Ajusta inclinación o giro y ordena los cables.",
            ],
            ordered: true,
          },
          { h3: "Cómo ocultar los cables" },
          { p: "En concreto o tabique, lo más limpio sin obra es una canaleta pintada del color del muro. En tablaroca puedes pasar los cables de señal y HDMI por dentro del muro, con una placa de salida detrás de la pantalla y otra a la altura del mueble. El cable de corriente de la TV o una extensión no deben ir por dentro del muro: si quieres que no se vea, lo correcto es instalar un contacto detrás de la pantalla, conectado a la instalación eléctrica. Ocultar cables en concreto implica ranurar y resanar, y se cotiza aparte." },
        ],
      },
      {
        id: "cuanto-cuesta",
        title: "Cuánto cuesta y cuánto tarda",
        blocks: [
          {
            kv: [
              ["Instalar soporte de TV en muro (soporte aparte)", "Desde $600 por pantalla"],
              ["Repisas o cuadros", "Desde $300 por trabajo"],
              ["Media jornada (4 horas)", "Desde $950"],
            ],
          },
          { p: "Instalar un soporte toma de una a dos horas, según el muro y el tipo de soporte. Si en la misma visita quieres colgar repisas, cuadros o resolver otros pendientes, conviene cotizar por media jornada. El soporte, los herrajes especiales y un contacto nuevo detrás de la pantalla no están incluidos; el contacto se cotiza con nuestro servicio de electricidad." },
          { callout: REF, tone: "info" },
        ],
      },
      {
        id: "cuando-pedir-ayuda",
        title: "Cuándo conviene pedir ayuda",
        blocks: [
          { p: "Un soporte fijo con una pantalla mediana en un muro de concreto es un buen proyecto para hacer tú mismo si tienes rotomartillo y nivel. Conviene que lo instalemos nosotros si:" },
          { list: ["La pantalla es grande o pesada, o el soporte es articulado.", "El muro es de tablaroca y no encuentras los perfiles, o es de tabique hueco.", "Quieres ocultar cables o agregar un contacto detrás de la pantalla.", "La pantalla irá sobre un mueble alto, en una esquina o en una sala de juntas.", "No sabes si por ese muro pasan tuberías o cables."] },
          { p: "Mándanos por WhatsApp una foto del muro, el modelo de la pantalla y del soporte, y dónde la quieres. Revisamos que el soporte sea adecuado para tu muro y para el peso, y te confirmamos la cotización. El trabajo tiene garantía de 90 días sobre el trabajo realizado, en CDMX y área metropolitana." },
        ],
      },
    ],
    faq: [
      ["¿Se puede colgar una TV en tablaroca?", "Sí, si fijas el soporte a los perfiles metálicos y lo complementas con anclas para tablaroca. Para pantallas pesadas o soportes articulados puede hacer falta reforzar el muro."],
      ["¿A qué altura se coloca una TV en la pared?", "Como referencia, con el centro de la pantalla a la altura de tus ojos sentado, que en una sala suele quedar alrededor de 1.0 a 1.2 metros del piso."],
      ["¿Cuánto cuesta instalar un soporte de TV?", "Con nosotros, la instalación parte de $600 por pantalla, sin contar el soporte."],
      ["¿Qué taquete uso para colgar una TV en concreto?", "Taquetes de expansión con pijas del largo adecuado, perforando con rotomartillo y broca para concreto de la misma medida que el taquete."],
    ],
    seo: {
      title: "Cómo instalar un soporte de TV en la pared, paso a paso",
      description: "Cómo instalar un soporte de TV en la pared de concreto, tabique o tablaroca: tipos de soporte, taquetes, altura, cables ocultos y cuándo pedir ayuda en CDMX.",
      slug: "/recursos/como-instalar-un-soporte-de-tv-en-la-pared",
      keywords: ["cómo instalar un soporte de TV en la pared", "instalar soporte de TV CDMX", "soporte de TV en tablaroca", "taquetes para TV", "altura de la TV en la pared"],
    },
  },
];
