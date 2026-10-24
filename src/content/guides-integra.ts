import type { Article } from "./types";

/* Guías de Recursos (integra).
   Precios copiados de extras-integra.ts ("Desde", con IVA). Equipos descritos por tipo y estándar, sin marcas. */
const REF = "Precios desde, en pesos mexicanos, con IVA incluido. El precio final se confirma en la cotización, después de revisar tu caso.";

export const GUIDES_INTEGRA: Article[] = [
  /* ───────────── Seguridad y accesos ───────────── */
  {
    id: "cuantas-camaras-necesito",
    unit: "integra",
    title: "¿Cuántas cámaras de seguridad necesito y cuáles elegir?",
    excerpt: "Cómo saber cuántas cámaras necesita tu casa o negocio, qué diferencia hay entre cámaras IP y analógicas, cuántos días de grabación conviene tener y cuánto cuesta instalarlas.",
    date: "23 de octubre de 2026",
    published: "2026-10-23",
    minutes: 6,
    service: "seguridad-accesos",
    related: ["wifi-no-llega", "domotica-sin-obra"],
    sections: [
      {
        id: "puntos",
        title: "Empieza por los puntos, no por el número",
        blocks: [
          { p: "Antes de pensar en cuántas cámaras comprar, define qué necesitas ver. Cada cámara debe tener un trabajo claro: identificar a quien entra, ver la cochera, vigilar la caja o cubrir un pasillo. Si no puedes decir para qué sirve una cámara, probablemente sobra; si hay un acceso que nadie ve, falta una." },
          { p: "Recorre tu espacio y anota estos puntos:" },
          {
            list: [
              "Cada puerta y portón por donde puede entrar una persona o un auto.",
              "Ventanas a nivel de calle o que dan a azoteas y bardas vecinas.",
              "Cochera, patio y pasillos laterales.",
              "Caja, mostrador, almacén o cualquier área con dinero o mercancía.",
              "Zonas sin luz por la noche.",
            ],
          },
          { p: "Como guía general, estos son los puntos que suelen cubrirse según el tipo de espacio. Tómalo como punto de partida: el número real sale del recorrido." },
          {
            kv: [
              ["Departamento", "Puerta principal y, si hay, balcón o ventana accesible."],
              ["Casa", "Fachada y acceso, cochera, patio trasero y pasillos laterales; dentro, la entrada principal."],
              ["Local o comercio", "Entrada, caja, área de clientes y bodega o puerta trasera."],
              ["Oficina", "Acceso, recepción, pasillos principales y sitio de servidores o archivo."],
              ["Nave o bodega", "Perímetro, accesos de personal, andenes, patio de maniobras y almacén."],
            ],
          },
        ],
      },
      {
        id: "ip-o-analogicas",
        title: "Cámaras IP o analógicas HD, NVR o DVR",
        blocks: [
          { p: "Hay dos familias de sistemas, y la elección define el cable, el grabador y qué tanto puede crecer el sistema." },
          {
            kv: [
              ["Cámaras IP con NVR", "Cada cámara se conecta por cable de red Cat6, que lleva video y energía al mismo tiempo (PoE). Ofrecen más resolución, mejor analítica y es más fácil sumar cámaras. Conviene que sean compatibles con el estándar ONVIF para no quedar atado a un solo fabricante."],
              ["Cámaras analógicas HD con DVR", "Usan cable coaxial y una fuente de energía aparte. Son más económicas y permiten aprovechar el cableado coaxial de un sistema anterior. Tienen menos opciones de resolución y de analítica."],
            ],
          },
          { p: "Si vas a cablear desde cero, una instalación IP suele ser la opción más flexible. Si ya tienes coaxial en buen estado y quieres renovar sin meter cable nuevo, un sistema analógico HD puede salir mejor. Un tramo de cable de red no debe pasar de 90 metros entre la cámara y el grabador o el switch." },
          { callout: "Las cámaras WiFi que se compran sueltas sirven para un punto aislado, pero dependen de la señal y de la nube del fabricante. Para varias cámaras que deben grabar siempre, lo más estable es el cable.", tone: "info" },
        ],
      },
      {
        id: "imagen-y-grabacion",
        title: "Resolución, visión nocturna y días de grabación",
        blocks: [
          { h3: "Resolución" },
          { p: "Una cámara de 1080p (2 MP) es suficiente para ver qué pasa en una cochera o un pasillo. Las de 4 MP dan más detalle para acercar la imagen en una grabación. Para reconocer una cara o una placa importa más la ubicación que los megapixeles: una cámara a la altura correcta y cerca del acceso identifica mejor que una de más resolución puesta lejos." },
          { h3: "Visión nocturna" },
          { p: "La mayoría de las cámaras usan luz infrarroja y graban en blanco y negro de noche. Hay modelos que graban a color con poca luz o con su propia luz blanca, útiles en accesos y patios. Evita colocar una cámara detrás de un vidrio: el infrarrojo rebota y la imagen nocturna sale blanca." },
          { h3: "Días de grabación" },
          { p: "El grabador guarda el video en un disco duro de videovigilancia. Los días que alcanza dependen del número de cámaras, la resolución y si graba de forma continua o solo cuando detecta movimiento. Piensa cuánto tardarías en darte cuenta de un problema: si revisas una vez por semana, necesitas al menos dos semanas de grabación. Lo definimos contigo en el diseño y elegimos el disco en consecuencia." },
        ],
      },
      {
        id: "celular",
        title: "Consulta desde el celular",
        blocks: [
          { p: "Todos los sistemas que instalamos se consultan desde una app: ves en vivo, revisas grabaciones y recibes avisos cuando el grabador detecta una persona o un vehículo. Para que funcione bien toma en cuenta lo siguiente:" },
          {
            list: [
              "Tu internet necesita buena velocidad de subida, no solo de bajada.",
              "El grabador va en un lugar discreto y, de preferencia, con un UPS para que siga grabando si se va la luz.",
              "Cada persona tiene su propio usuario con permisos: quién ve en vivo, quién revisa grabaciones.",
              "Cambia las contraseñas de fábrica del grabador y de la app.",
              "El almacenamiento en la nube es un servicio de terceros con cuota mensual; el disco local es suficiente en la mayoría de los casos.",
            ],
          },
        ],
      },
      {
        id: "complementos",
        title: "Lo que una cámara no hace sola",
        blocks: [
          { p: "Una cámara registra lo que pasa, pero no impide que alguien entre ni te avisa con certeza de una intrusión. Por eso conviene pensar en el sistema completo:" },
          {
            list: [
              "Alarma con sensores: detecta la apertura de puertas y ventanas o el movimiento, activa la sirena y te avisa al teléfono. El monitoreo por una central de alarmas es opcional y se contrata con un tercero.",
              "Cerco electrificado: protege bardas y perímetros largos y da aviso si alguien lo toca o lo corta.",
              "Control de acceso: tarjetas, huella o rostro para que cada persona entre solo a las áreas y horarios autorizados, con registro de cada evento.",
              "Chapa inteligente o videoportero: abres con código o desde el teléfono y ves quién toca antes de abrir.",
              "Fotoceldas en el portón: si tienes motor en la cochera, detienen el cierre cuando hay una persona o un auto en el paso.",
            ],
          },
        ],
      },
      {
        id: "cuanto-cuesta",
        title: "Cuánto cuesta y cuánto tarda",
        blocks: [
          { p: "Con nosotros, lo que más mueve el precio es la resolución de las cámaras, el tipo de grabador y cómo va el cable. Estos son nuestros precios de partida:" },
          {
            kv: [
              ["Instalación por cámara (equipo aparte)", "Desde $300 por cámara"],
              ["Sistema de 4 cámaras instalado, gama de entrada (1080p)", "Desde $6,400 por sistema"],
              ["Sistema de 4 cámaras IP instalado, gama media (4 MP)", "Desde $9,900 por sistema"],
              ["Alarma con sensores, instalada", "Desde $3,500 por sistema"],
              ["Videoportero instalado", "Desde $5,800 por unidad"],
            ],
          },
          { p: "Un sistema de 4 a 8 cámaras en casa o local normalmente se instala en un día. Con 16 cámaras o más, o en varios pisos, toma de 2 a 3 días. Entregamos con la app configurada en tu teléfono. La canalización oculta, el cable adicional al de la propuesta y el servicio de internet se cotizan aparte." },
          { callout: REF, tone: "info" },
        ],
      },
      {
        id: "siguiente-paso",
        title: "El siguiente paso",
        blocks: [
          { p: "Mándanos fotos de la fachada y los accesos, dinos qué áreas quieres cubrir y si ya tienes equipo instalado. Con eso agendamos un levantamiento, recorremos los puntos débiles contigo y te entregamos una propuesta con el número de cámaras, el tipo de sistema y los días de grabación. Trabajamos en CDMX y área metropolitana." },
          { p: "Además de la garantía del fabricante, te damos +1 año en productos elegibles que vendemos e instalamos: defectos de fábrica e instalación." },
        ],
      },
    ],
    faq: [
      ["¿Cuántas cámaras necesita una casa?", "Depende de los accesos. Una casa con fachada, cochera y patio suele empezar con 4 cámaras y crecer a 8 si tiene pasillos laterales o varios niveles. El número exacto sale del recorrido."],
      ["¿Qué es mejor, cámaras IP o analógicas?", "Las IP dan más resolución y crecen con más facilidad; las analógicas HD son más económicas y aprovechan cable coaxial existente. Si cableas desde cero, conviene IP."],
      ["¿Las cámaras siguen grabando si se va el internet?", "Sí. El grabador guarda en su disco aunque no haya internet; lo que pierdes es la consulta remota mientras dura la falla. Si se va la luz, un UPS lo mantiene encendido."],
      ["¿Cuánto cuesta instalar 4 cámaras de seguridad?", "Con nosotros, un sistema de 4 cámaras instalado parte de $6,400 en gama de entrada (1080p) y desde $9,900 con cámaras IP de 4 MP."],
    ],
    seo: {
      title: "Cuántas cámaras de seguridad necesito y cuáles elegir",
      description: "Cuántas cámaras de seguridad necesito: puntos a cubrir, IP o analógicas, días de grabación, consulta desde el celular y cuánto cuesta instalarlas en CDMX.",
      slug: "/recursos/cuantas-camaras-de-seguridad-necesito",
      keywords: ["cuántas cámaras de seguridad necesito", "cámaras IP o analógicas", "instalación de cámaras CDMX", "NVR o DVR", "cámaras de seguridad para casa"],
    },
  },

  /* ───────────── Redes y conectividad ───────────── */
  {
    id: "wifi-no-llega",
    unit: "integra",
    title: "¿Por qué el WiFi no llega a toda la casa y cómo resolverlo?",
    excerpt: "Las causas más comunes de las zonas sin señal en casas y oficinas, cuándo sirve un repetidor, un sistema mesh o puntos de acceso cableados, y cuánto cuesta resolverlo.",
    date: "23 de octubre de 2026",
    published: "2026-10-23",
    minutes: 6,
    service: "redes",
    related: ["cuantas-camaras-necesito", "sala-de-juntas-videollamadas", "domotica-sin-obra"],
    sections: [
      {
        id: "causas",
        title: "Por qué hay zonas sin señal",
        blocks: [
          { p: "El WiFi es una señal de radio que se debilita con la distancia y con cada obstáculo que atraviesa. En casi todas las casas y oficinas el problema viene de una combinación de estas causas:" },
          {
            list: [
              "Muros de concreto, tabique y losas: cada muro y cada piso le quitan fuerza a la señal. En casas de varios niveles, la planta alta o la baja suele quedarse sin cobertura.",
              "Ubicación del módem: el proveedor lo instala donde entra el cable, muchas veces en una esquina, junto a la ventana o dentro de un mueble.",
              "Espejos, cancelería, refrigeradores y tinacos de agua, que reflejan o absorben la señal.",
              "Interferencia de las redes vecinas, sobre todo en edificios.",
              "Muchos equipos conectados al mismo tiempo a un módem básico.",
              "Equipos antiguos, tanto el módem como los celulares y computadoras.",
            ],
          },
          { p: "Las dos bandas se comportan distinto: la de 2.4 GHz llega más lejos pero es más lenta y tiene más interferencia; la de 5 GHz es más rápida pero atraviesa peor los muros. Por eso es común tener señal en un cuarto lejano y aun así navegar lento." },
        ],
      },
      {
        id: "diagnostico",
        title: "¿Es el WiFi o es tu internet?",
        blocks: [
          { p: "Antes de comprar equipo, haz esta prueba sencilla: mide la velocidad con tu celular junto al módem y luego en el cuarto donde falla." },
          {
            kv: [
              ["Lento junto al módem", "El problema está en el servicio de internet o en el módem. Revisa tu plan con tu proveedor."],
              ["Rápido junto al módem y lento lejos", "El problema es de cobertura. Ahí es donde una mejor distribución del WiFi lo resuelve."],
              ["Lento en todos lados a ciertas horas", "Puede ser saturación: demasiados equipos o un plan insuficiente para tu uso."],
            ],
          },
          { callout: "El WiFi reparte la conexión que tienes. Si tu internet es lento, ningún equipo en casa lo hará más rápido.", tone: "warn" },
        ],
      },
      {
        id: "opciones",
        title: "Repetidor, mesh o puntos de acceso cableados",
        blocks: [
          { p: "Hay tres formas de llevar la señal más lejos. Esto es lo que hace cada una:" },
          {
            kv: [
              ["Repetidor", "Toma la señal del módem y la vuelve a emitir. Es barato y se conecta en un contacto, pero reduce la velocidad, a veces crea una red con otro nombre y depende de recibir buena señal. Sirve para un cuarto puntual."],
              ["Sistema mesh", "Varios equipos que se enlazan entre sí por radio y forman una sola red. Se instala sin cable y cubre bien departamentos y casas medianas. Cada salto inalámbrico pierde velocidad, y los muros gruesos limitan el alcance entre nodos."],
              ["Puntos de acceso cableados", "Cada punto recibe datos y energía por un cable de red (PoE) y todos comparten el mismo nombre de red. Tu equipo pasa al punto más cercano sin cortes. Es la opción más estable para casas de varios niveles, oficinas y negocios."],
            ],
          },
          { p: "Muchos sistemas mesh aceptan conectar sus nodos por cable. Si tu casa ya tiene nodos de red en algunos cuartos, aprovecharlos mejora mucho el resultado. Al elegir equipo, busca que sea WiFi 6 o WiFi 7, que manejan mejor muchos dispositivos a la vez." },
        ],
      },
      {
        id: "cableado",
        title: "Cuándo conviene meter cable Cat6",
        blocks: [
          { p: "El cable sigue siendo la forma más confiable de llevar internet a un punto. Conviene cablear cuando:" },
          {
            list: [
              "Tienes equipos fijos que no se mueven: computadoras de escritorio, televisiones, consolas, impresoras o la terminal de cobro.",
              "Vas a instalar cámaras IP o puntos de acceso, que reciben energía por el mismo cable.",
              "Las videollamadas se cortan en una estación de trabajo fija.",
              "Estás remodelando y puedes dejar la canalización lista.",
            ],
          },
          { p: "Cada nodo es un cable Cat6 que va de una toma en el muro a un rack, donde se conecta al switch. Como regla técnica, un tramo no debe pasar de 90 metros. En espacios terminados revisamos rutas por plafón, ductos o canaleta para que la instalación quede ordenada." },
        ],
      },
      {
        id: "redes-y-respaldo",
        title: "Redes separadas y respaldo de internet",
        blocks: [
          { p: "Mejorar la cobertura es buen momento para ordenar la red. Con un router y un switch administrables puedes tener redes distintas en el mismo cableado:" },
          {
            list: [
              "Red de invitados, aislada de tus equipos y con límite de velocidad.",
              "Red para cámaras y dispositivos inteligentes, separada de tus computadoras.",
              "Red de operación para la terminal de pago, la caja o la telefonía.",
            ],
          },
          { p: "Si tu negocio no puede quedarse sin internet, un router con dos entradas pasa solo a una segunda conexión (otro proveedor o un módem celular) cuando falla la principal. Un UPS mantiene encendidos el módem, el router y el switch durante un corte de luz. La segunda conexión se contrata aparte con su propio proveedor." },
        ],
      },
      {
        id: "cuanto-cuesta",
        title: "Cuánto cuesta y cuánto tarda",
        blocks: [
          { p: "Con nosotros, el costo depende de cuántos puntos de acceso y nodos necesitas y de cómo se lleva el cable. Estos son nuestros precios de partida:" },
          {
            kv: [
              ["Punto de acceso WiFi instalado", "Desde $1,550 por punto"],
              ["WiFi profesional para casa (2 a 5 puntos)", "Desde $11,500 por sistema"],
              ["Nodo de red Cat6 instalado", "Desde $950 por nodo"],
              ["Paquete de 5 nodos con switch", "Desde $4,100 por paquete"],
              ["Armado y organización de rack de pared", "Desde $1,950 por rack"],
            ],
          },
          { p: "Un router o sistema mesh queda instalado el mismo día. En un WiFi profesional, el equipo llega en 24 a 48 horas hábiles y la instalación se hace en la fecha que acordamos. El cableado estructurado depende del número de nodos. No incluye el servicio de internet, la canalización oculta ni los resanes." },
          { callout: REF, tone: "info" },
        ],
      },
      {
        id: "siguiente-paso",
        title: "El siguiente paso",
        blocks: [
          { p: "Envíanos un plano o fotos de cada nivel, dinos dónde está tu módem, en qué zonas falla la señal y qué equipos se conectan. En la visita medimos tu internet y la señal por área, y te proponemos dónde va cada punto de acceso. Al terminar medimos de nuevo y te entregamos el plano de nodos y los accesos a los equipos. Trabajamos en CDMX y área metropolitana con la conexión que ya tienes, sin cambiar tu proveedor." },
        ],
      },
    ],
    faq: [
      ["¿Un repetidor resuelve el WiFi de toda la casa?", "Sirve para un cuarto puntual. Para una casa de varios niveles, un sistema mesh o puntos de acceso cableados dan una sola red estable y sin cortes al moverte."],
      ["¿Qué es mejor, mesh o puntos de acceso cableados?", "El mesh se instala sin cable y funciona bien en departamentos y casas medianas. Los puntos cableados son más estables y rápidos en casas grandes, oficinas y negocios."],
      ["¿Necesito cambiar de proveedor de internet?", "No siempre. Primero mide la velocidad junto al módem: si ahí es buena, el problema es de cobertura y se resuelve dentro de tu espacio."],
      ["¿Cuánto cuesta mejorar el WiFi de una casa?", "Con nosotros, un punto de acceso instalado parte de $1,550 y un sistema de 2 a 5 puntos para casa desde $11,500."],
    ],
    seo: {
      title: "Por qué el WiFi no llega a toda la casa y cómo resolverlo",
      description: "Por qué el WiFi no llega a toda la casa u oficina: muros, distancia y módem, repetidor vs mesh vs puntos de acceso, cableado Cat6 y cuánto cuesta en CDMX.",
      slug: "/recursos/por-que-el-wifi-no-llega-a-toda-la-casa",
      keywords: ["WiFi no llega a toda la casa", "mesh o repetidor", "puntos de acceso WiFi", "mejorar señal WiFi CDMX", "cableado Cat6"],
    },
  },

  /* ───────────── Audio, video y control ───────────── */
  {
    id: "sala-de-juntas-videollamadas",
    unit: "integra",
    title: "Cómo equipar una sala de juntas para videollamadas",
    excerpt: "Qué pantalla, cámara, micrófonos y bocinas necesita una sala de juntas según su tamaño, cómo resolver la conexión, la acústica y el control, y cuánto cuesta.",
    date: "23 de octubre de 2026",
    published: "2026-10-23",
    minutes: 5,
    service: "audio-video",
    related: ["wifi-no-llega", "domotica-sin-obra"],
    sections: [
      {
        id: "tamano",
        title: "Empieza por el tamaño de la sala",
        blocks: [
          { p: "El equipo correcto depende de cuántas personas se sientan, qué tan larga es la mesa y para qué se usa la sala: juntas internas, presentaciones a clientes, capacitaciones o consultas a distancia. Como guía general:" },
          {
            kv: [
              ["Sala pequeña (2 a 4 personas)", "Una pantalla, una barra de video USB con cámara, micrófonos y bocina integrados, y una conexión a la laptop con un solo cable."],
              ["Sala mediana (5 a 8 personas)", "Pantalla más grande, barra de video con encuadre automático y un micrófono extra en la mesa para quienes se sientan lejos."],
              ["Sala grande (más de 8 personas)", "Una o dos pantallas, cámara con movimiento y zoom, micrófonos de techo o varios de mesa, bocinas en el plafón y un panel de control."],
            ],
          },
          { p: "Antes de elegir equipo, define también qué plataforma de videollamadas usa tu equipo. Algunos equipos de sala solo funcionan con ciertas plataformas, y esa decisión cambia lo que conviene comprar." },
        ],
      },
      {
        id: "pantalla",
        title: "La pantalla",
        blocks: [
          { p: "La pantalla tiene que verse bien desde el lugar más lejano de la mesa. Una prueba práctica: si la persona del fondo no puede leer una hoja de cálculo compartida sin acercarse, la pantalla es pequeña o está lejos. En salas largas, dos pantallas permiten ver a la vez a los participantes remotos y el contenido." },
          {
            list: [
              "Colócala al frente de la mesa, a una altura cómoda para verla sentado.",
              "Evita que quede frente a una ventana: los reflejos lavan la imagen.",
              "En tablaroca se necesita refuerzo o anclajes especiales para el soporte.",
              "Deja un contacto y la salida de cables detrás de la pantalla.",
            ],
          },
        ],
      },
      {
        id: "camara-y-audio",
        title: "Cámara, micrófonos y bocinas",
        blocks: [
          { p: "La cámara va arriba o abajo de la pantalla, para que quienes hablan miren hacia los participantes remotos. Las barras de video con encuadre automático siguen a quien habla o ajustan la toma según cuántas personas hay. En salas grandes se usa una cámara con movimiento y zoom." },
          { p: "El audio importa más que la imagen. Una llamada con imagen regular se puede seguir; una en la que no se entiende lo que dicen, no. Por eso:" },
          {
            list: [
              "Los micrófonos deben quedar cerca de todos los lugares de la mesa. Los de la laptop o los de una barra pequeña no alcanzan en una mesa larga.",
              "La cancelación de eco evita que los participantes remotos se escuchen a sí mismos.",
              "Las bocinas deben llenar la sala sin que haya que subir el volumen al máximo. En salas grandes, bocinas de plafón reparten mejor el sonido.",
            ],
          },
        ],
      },
      {
        id: "conexion",
        title: "Conexión: laptop o equipo de sala",
        blocks: [
          { p: "Hay dos formas de operar la sala:" },
          {
            kv: [
              ["Con la laptop de quien convoca", "La cámara, los micrófonos y las bocinas se conectan con un solo cable USB-C o HDMI. Cualquiera llega, conecta y usa su plataforma. Es sencillo y flexible, pero depende de que cada quien traiga su equipo y su adaptador."],
              ["Con equipo de sala", "Una computadora o equipo dedicado se queda en la sala y arranca la junta con un botón, compatible con tu plataforma. Ahorra minutos al inicio de cada junta, pero se ata a esa plataforma."],
            ],
          },
          { p: "La red también cuenta. Conecta la sala por cable de red en lugar de WiFi y revisa la velocidad de subida de tu internet, porque es la que envía tu video. Si la oficina comparte la conexión con mucho tráfico, se puede dar prioridad a las videollamadas en la red. Las licencias de la plataforma se pagan aparte." },
        ],
      },
      {
        id: "acustica-y-control",
        title: "Acústica y control",
        blocks: [
          { p: "Una sala con muros de vidrio, piso duro y techo alto genera eco, y ningún micrófono lo resuelve del todo. Cortinas, alfombra, paneles acústicos en muros o plafón y muebles tapizados reducen la reverberación. Revisa también el ruido de afuera: el aire acondicionado, la calle o la sala de al lado." },
          { p: "El último detalle es el control. Si para empezar una junta hay que buscar tres controles remotos y cambiar entradas, la gente pierde tiempo. Un panel o un botón que encienda la pantalla, seleccione la entrada correcta y ajuste el volumen deja la sala lista en segundos." },
          { callout: "El acondicionamiento acústico no está incluido en la instalación del equipo. Si la sala tiene mucho eco, lo revisamos en la visita y te decimos qué conviene.", tone: "info" },
        ],
      },
      {
        id: "cuanto-cuesta",
        title: "Cuánto cuesta y cuánto tarda",
        blocks: [
          { p: "En una sala de juntas, el equipo es la parte más grande del presupuesto. Estos son nuestros precios de partida:" },
          {
            kv: [
              ["Sala de juntas básica (pantalla, videollamada y audio)", "Desde $116,000 por sala"],
              ["Instalación de pantalla en muro (soporte aparte)", "Desde $700 por pantalla"],
            ],
          },
          { p: "Para equipos pequeños hay opciones más sencillas que cotizamos según el espacio. El tiempo de instalación depende del proyecto: del número de equipos, de si el cableado va oculto y del tipo de muro. No incluye cableado empotrado y resanes, acondicionamiento acústico ni suscripciones de videoconferencia." },
          { callout: REF, tone: "info" },
        ],
      },
      {
        id: "siguiente-paso",
        title: "El siguiente paso",
        blocks: [
          { p: "Envíanos fotos de la sala, cuántas personas la usan, qué plataforma de videollamadas usas y qué equipo ya tienes. En la visita revisamos el espacio, el ruido y la red, y te proponemos dónde va la pantalla, la cámara y los micrófonos. Al terminar probamos una videollamada completa y te mostramos cómo usar todo. Trabajamos en CDMX y área metropolitana." },
          { p: "Además de la garantía del fabricante, te damos +1 año en productos elegibles que vendemos e instalamos: defectos de fábrica e instalación." },
        ],
      },
    ],
    faq: [
      ["¿Qué necesita una sala de juntas para videollamadas?", "Una pantalla, una cámara, micrófonos que cubran toda la mesa, bocinas y una conexión sencilla a la laptop o a un equipo de sala. En salas con eco, también acondicionamiento acústico."],
      ["¿Puedo usar la pantalla que ya tengo?", "En muchos casos sí. Revisamos el modelo y las conexiones en la visita y te decimos qué conviene conservar y qué complementar."],
      ["¿Una barra de video es suficiente?", "En salas pequeñas y medianas suele bastar. En mesas largas hace falta sumar micrófonos de mesa o de techo para que se escuche bien a todos."],
      ["¿Cuánto cuesta equipar una sala de juntas?", "Nuestra sala básica con pantalla, cámara y audio parte de $116,000. Para equipos pequeños hay opciones más sencillas que cotizamos según el espacio."],
    ],
    seo: {
      title: "Cómo equipar una sala de juntas para videollamadas",
      description: "Cómo equipar una sala de juntas para videollamadas: pantalla, cámara, micrófonos, bocinas, conexión y acústica según el tamaño de la sala, y cuánto cuesta.",
      slug: "/recursos/como-equipar-una-sala-de-juntas-para-videollamadas",
      keywords: ["cómo equipar una sala de juntas", "sala de juntas para videollamadas", "equipo de videoconferencia para sala", "sala de juntas CDMX", "barra de video para sala de juntas"],
    },
  },
];
