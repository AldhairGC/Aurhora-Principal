import type { LegalDoc } from "./types";

/*
  Textos con visto bueno de asesoría legal (23 de octubre de 2026), después de la revisión
  de cumplimiento (nueva LFPDPPP, autoridad, encargados, finalidades secundarias, cookies y
  cláusulas de consumo).

  Pendientes resueltos el 23 de octubre de 2026: domicilio, área responsable (legal@),
  proveedores (Zoho, Gmail y Vercel), plazos ARCO, precios con IVA incluido, garantía de
  90 días en Facilities y banner de cookies.
*/

const UPDATED = "23 de octubre de 2026";
const DOMICILIO = "Park Plaza II, Calle 3, Zedec Santa Fe, Álvaro Obregón, C.P. 01376, Ciudad de México, México";
const RAZON_SOCIAL = "Aurhora Agency, S.A. de C.V.";
const LEGAL_EMAIL = "legal@aurhora.agency";

export const LEGAL_DOCS: LegalDoc[] = [
  {
    id: "privacidad",
    title: "Aviso de privacidad",
    updated: UPDATED,
    intro: "Este aviso explica qué datos personales recabamos, para qué los usamos y cómo puedes ejercer tus derechos, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares publicada en el Diario Oficial de la Federación el 20 de marzo de 2025 y la normativa que de ella deriva.",
    sections: [
      {
        id: "responsable",
        title: "Identidad y domicilio del responsable",
        blocks: [
          { p: `${RAZON_SOCIAL}, que opera con el nombre comercial Aurhora Agency a través de sus unidades Aurhora Digital, Aurhora Integra y Aurhora Facilities (en adelante, "Aurhora"), con domicilio en ${DOMICILIO}, es responsable del tratamiento de tus datos personales.` },
          { kv: [["Responsable de datos personales", "Área legal de Aurhora"], ["Correo para privacidad", LEGAL_EMAIL], ["Teléfono", "+52 55 8299 1282"]] },
        ],
      },
      {
        id: "datos",
        title: "Datos personales que recabamos",
        blocks: [
          { p: "Recabamos datos cuando nos escribes por el sitio, WhatsApp, correo o teléfono, cuando visitamos tu espacio y cuando navegas en el sitio." },
          { h3: "Datos de identificación y contacto" },
          { list: ["Nombre", "Teléfono y número de WhatsApp", "Correo electrónico", "Empresa o negocio, cuando aplica"] },
          { h3: "Datos del servicio" },
          { list: ["Colonia, alcaldía o municipio, y la dirección del inmueble cuando se agenda una visita", "Descripción de lo que necesitas", "Fotografías del espacio o de los equipos que decidas compartir", "Preferencias de fecha y horario", "Datos fiscales, cuando solicitas factura"] },
          { h3: "Datos de navegación" },
          { list: ["Dirección IP, tipo de navegador y dispositivo", "Páginas visitadas y origen de la visita, incluidos parámetros de campaña", "Cookies y tecnologías similares, según tus preferencias"] },
          { callout: "No recabamos datos personales sensibles. Te pedimos no incluirlos en tus mensajes ni en las fotografías que compartas, y evitar que aparezcan personas en las fotos." },
        ],
      },
      {
        id: "finalidades",
        title: "Finalidades del tratamiento",
        blocks: [
          { h3: "Finalidades necesarias para el servicio" },
          { list: ["Atender tus solicitudes de información y contacto", "Elaborar diagnósticos, cotizaciones y propuestas", "Coordinar visitas técnicas e instalaciones", "Prestar los servicios contratados y darles seguimiento", "Gestionar garantías y respaldos", "Facturación y cumplimiento de obligaciones legales y fiscales"] },
          { h3: "Finalidades voluntarias" },
          { list: ["Enviarte información sobre servicios de Aurhora", "Encuestas de satisfacción", "Contenido de valor, como artículos y guías"] },
          { p: `Puedes negarte a las finalidades voluntarias en cualquier momento, incluso desde tu primer mensaje: escribe \"No deseo publicidad\" por WhatsApp o envía un correo a ${LEGAL_EMAIL}. Negarte no afecta la cotización ni el servicio que solicitaste.` },
        ],
      },
      {
        id: "encargados",
        title: "Proveedores que tratan datos por nuestra cuenta",
        blocks: [
          { p: "Para operar usamos proveedores que tratan datos solo por cuenta e instrucciones de Aurhora (encargados). Algunos procesan la información fuera de México. Estas comunicaciones no requieren tu consentimiento, y exigimos por contrato o mediante sus términos de servicio que protejan tus datos." },
          { kv: [
            ["Meta Platforms (WhatsApp)", "Mensajería con clientes"],
            ["Google (Analytics, Tag Manager y Ads)", "Medición del sitio y campañas, solo con tu consentimiento"],
            ["Microsoft (Clarity)", "Análisis de uso del sitio, solo con tu consentimiento"],
            ["Meta Platforms (Ads)", "Medición de campañas, solo con tu consentimiento"],
            ["Zoho (CRM)", "Seguimiento de solicitudes, cotizaciones y clientes"],
            ["Google (Gmail)", "Correo electrónico"],
            ["Vercel", "Hospedaje y operación del sitio web"],
          ] },
          { h3: "Transferencias" },
          { p: "No vendemos ni compartimos tus datos con terceros para sus propios fines. Solo los entregamos a autoridades competentes cuando una ley o una orden lo requiere, caso en el que no se necesita tu consentimiento. Si en el futuro hiciera falta otra transferencia, te pediremos tu consentimiento antes." },
        ],
      },
      {
        id: "arco",
        title: "Derechos ARCO y revocación del consentimiento",
        blocks: [
          { p: "Puedes acceder a tus datos, rectificarlos, cancelarlos u oponerte a su uso (derechos ARCO), así como revocar tu consentimiento o limitar el uso de tus datos." },
          { h3: "Cómo ejercerlos" },
          { p: `Envía tu solicitud a ${LEGAL_EMAIL} con:` },
          { list: ["Nombre completo y un medio para responderte", "Descripción clara de los datos y del derecho que deseas ejercer", "Copia de identificación oficial, o el documento que acredite la representación si actúas en nombre de otra persona", "Cualquier documento que ayude a localizar tus datos"] },
          { kv: [["Respuesta", "20 días hábiles para comunicar la determinación"], ["Ejecución", "15 días hábiles adicionales para hacerla efectiva"], ["Medio de respuesta", "El correo o medio que indiques en tu solicitud"]] },
          { p: "Si consideras que no atendimos tu solicitud o que hubo un tratamiento indebido de tus datos, puedes acudir a la Secretaría Anticorrupción y Buen Gobierno, autoridad en materia de protección de datos personales en posesión de particulares." },
        ],
      },
      {
        id: "automatizado",
        title: "Atención automatizada",
        blocks: [
          { p: "Si en algún canal te responde primero un asistente automatizado o un agente de IA, te lo indicaremos al inicio de la conversación. Siempre podrás pedir que te atienda una persona, y las decisiones sobre cotizaciones y servicios las revisa nuestro equipo." },
        ],
      },
      {
        id: "cookies",
        title: "Cookies y tecnologías de rastreo",
        blocks: [
          { p: "Usamos cookies y almacenamiento local necesarios para el funcionamiento del sitio y, solo con tu consentimiento, cookies de analítica y marketing que registran páginas visitadas, origen de la visita, dispositivo y navegador. Consulta la Política de cookies para conocer el detalle, cómo desactivarlas y cómo cambiar tus preferencias." },
        ],
      },
      {
        id: "conservacion",
        title: "Conservación de los datos",
        blocks: [
          { p: "Conservamos tus datos mientras sean necesarios para las finalidades de este aviso. Los datos de solicitudes que no se convierten en servicio se eliminan o anonimizan cuando dejan de ser útiles para darles seguimiento. Los relacionados con servicios y facturas se conservan durante los plazos que exigen las leyes fiscales y mercantiles." },
        ],
      },
      {
        id: "seguridad",
        title: "Medidas de seguridad",
        blocks: [
          { list: ["Cifrado de datos en tránsito", "Acceso restringido a datos personales", "Políticas de retención y eliminación", "Protocolos de respuesta a incidentes"] },
        ],
      },
      {
        id: "menores",
        title: "Menores de edad",
        blocks: [
          { p: "Nuestros servicios están dirigidos a personas mayores de edad, negocios y profesionales. No recabamos intencionalmente datos de menores." },
        ],
      },
      {
        id: "cambios",
        title: "Cambios a este aviso",
        blocks: [
          { p: "Podemos actualizar este aviso por cambios legales o de operación. Publicaremos la versión vigente en esta página con su fecha de actualización. Si el cambio implica una finalidad nueva que requiera tu consentimiento, te lo pediremos por el medio de contacto que nos diste." },
        ],
      },
    ],
    seo: {
      title: "Aviso de privacidad | Aurhora Agency",
      description: "Cómo Aurhora recaba, usa y protege tus datos personales conforme a la LFPDPPP, y cómo ejercer tus derechos de acceso, rectificación, cancelación y oposición.",
      slug: "/aviso-de-privacidad",
      keywords: ["aviso de privacidad Aurhora"],
    },
  },
  {
    id: "terminos",
    title: "Términos y condiciones",
    updated: UPDATED,
    intro: "Estos términos regulan el uso de este sitio y la contratación de servicios de Aurhora. Cada servicio se rige además por la propuesta o el contrato específico que aceptes. Nada en estos términos limita los derechos que la Ley Federal de Protección al Consumidor te reconoce como consumidor.",
    sections: [
      {
        id: "aceptacion",
        title: "Aceptación y cambios",
        blocks: [
          { p: "Al usar este sitio o contratar nuestros servicios aceptas estos términos y el Aviso de privacidad. Podemos actualizarlos; la versión nueva aplica desde su publicación a nuevas solicitudes y contrataciones. Los servicios ya cotizados o contratados se rigen por la versión vigente cuando los aceptaste." },
        ],
      },
      {
        id: "empresa",
        title: "Identificación",
        blocks: [
          { kv: [["Razón social", RAZON_SOCIAL], ["Nombre comercial", "Aurhora Agency"], ["Domicilio", DOMICILIO], ["Correo", "contacto@aurhora.agency"], ["Teléfono", "+52 55 8299 1282"]] },
        ],
      },
      {
        id: "servicios",
        title: "Servicios",
        blocks: [
          { list: ["Aurhora Digital: agentes de IA, automatización, software a la medida, consultoría, marketing digital y GoDigital Suite.", "Aurhora Integra: seguridad y accesos, redes y conectividad, domótica y automatización, audio y video.", "Aurhora Facilities: aire acondicionado, electricidad, reparaciones del hogar, mantenimiento programado y proyectos residenciales, comerciales e industriales."] },
          { p: "El alcance, los entregables, los tiempos y el costo de cada servicio se definen en la cotización, propuesta o contrato correspondiente." },
        ],
      },
      {
        id: "solicitudes",
        title: "Solicitudes, citas y cotizaciones",
        blocks: [
          { list: ["Las solicitudes enviadas desde el sitio o por WhatsApp no constituyen una reserva. La cita queda confirmada cuando el equipo te lo indica.", "Cuando un servicio requiere diagnóstico, te informamos su costo antes de la visita. Se descuenta del trabajo si aceptas la cotización.", "Los servicios físicos se prestan en Ciudad de México y zonas del Estado de México, sujetos a confirmación de traslado y disponibilidad.", "Atendemos de lunes a viernes de 8:00 a 20:00 y sábados de 8:00 a 16:00, hora de Ciudad de México. Las urgencias se evalúan según disponibilidad."] },
        ],
      },
      {
        id: "pagos",
        title: "Precios, pagos y facturación",
        blocks: [
          { list: ["Los precios publicados en el sitio son precios \"desde\": el precio final depende del alcance y se confirma en la cotización antes de iniciar el trabajo.", "Los esquemas de pago se definen en cada propuesta.", "Las facturas se emiten conforme a las disposiciones fiscales mexicanas (CFDI).", "Los precios publicados incluyen IVA. Si una cotización se expresa sin IVA, lo indicará de forma expresa."] },
        ],
      },
      {
        id: "garantias",
        title: "Garantías y respaldo",
        blocks: [
          { kv: [["Aurhora Facilities", "90 días a partir de la prestación del servicio, para revisión o ajuste del trabajo realizado"], ["Aurhora Integra", "Un año de garantía adicional a la del fabricante en productos elegibles vendidos e instalados por Aurhora. Cubre defectos de fábrica del equipo y defectos de instalación; incluye diagnóstico, mano de obra y, cuando proceda, reparación o reemplazo. Los productos elegibles se indican en la propuesta."], ["Aurhora Digital", "Periodo de soporte definido en la propuesta de cada proyecto"]] },
          { p: "Las garantías no cubren daños por mal uso, modificaciones hechas por terceros, fallas de servicios externos ni causas ajenas al trabajo realizado. Las condiciones específicas se explican antes de contratar. Para hacer válida una garantía, escríbenos por WhatsApp o a contacto@aurhora.agency con tu número de cotización o factura." },
        ],
      },
      {
        id: "propiedad",
        title: "Propiedad intelectual",
        blocks: [
          { p: "Las metodologías y herramientas previas de Aurhora siguen siendo de Aurhora. Los derechos sobre los entregables desarrollados para ti se transfieren según lo acordado en la propuesta o el contrato, una vez cubierto el pago." },
        ],
      },
      {
        id: "confidencialidad",
        title: "Confidencialidad",
        blocks: [
          { p: "Ambas partes mantendrán confidencial la información técnica y de negocio compartida durante la relación, salvo la que sea pública o deba entregarse a una autoridad." },
        ],
      },
      {
        id: "responsabilidad",
        title: "Responsabilidad",
        blocks: [
          { p: "Respondemos por los trabajos que realizamos conforme a la cotización aceptada y a la ley aplicable. Si eres consumidor, conservas todos los derechos que te otorga la Ley Federal de Protección al Consumidor, incluidas la reparación, la reposición del trabajo o la devolución de lo pagado cuando proceda." },
          { p: "En servicios contratados por empresas para su operación, la responsabilidad de Aurhora se limita al monto pagado por el servicio que dio origen a la reclamación, y no incluye daños indirectos ni decisiones de negocio tomadas con base en nuestras recomendaciones, salvo lo que acuerde la propuesta o el contrato." },
        ],
      },
      {
        id: "ley",
        title: "Legislación, quejas y jurisdicción",
        blocks: [
          { p: "Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Si tienes una queja, escríbenos primero para buscar una solución directa." },
          { p: "Si eres consumidor, también puedes acudir a la Procuraduría Federal del Consumidor (PROFECO) para presentar una queja o solicitar conciliación." },
          { p: "Para las controversias que no se resuelvan por estas vías, las partes se someten a los tribunales competentes de la Ciudad de México, sin perjuicio de los derechos que la ley otorga a los consumidores." },
        ],
      },
    ],
    seo: {
      title: "Términos y condiciones | Aurhora Agency",
      description: "Términos de uso del sitio y de contratación de servicios de Aurhora Digital, Integra y Facilities: solicitudes, citas, pagos, garantías y jurisdicción.",
      slug: "/terminos-y-condiciones",
      keywords: ["términos y condiciones Aurhora"],
    },
  },
  {
    id: "cookies",
    title: "Política de cookies",
    updated: UPDATED,
    intro: "Las cookies son pequeños archivos que el sitio guarda en tu navegador; el almacenamiento local funciona de forma parecida. Aquí explicamos cuáles usamos, para qué y cómo decidir cuáles aceptas.",
    sections: [
      {
        id: "tipos",
        title: "Tipos de cookies",
        blocks: [
          { kv: [["Necesarias", "Permiten que el sitio funcione y recuerdan tus preferencias de privacidad y de tema claro u oscuro. Siempre activas."], ["Analítica", "Nos ayudan a entender cómo se usa el sitio, con Google Analytics y Microsoft Clarity. Solo con tu consentimiento."], ["Marketing", "Miden campañas y muestran anuncios relevantes, con Google Ads y Meta. Solo con tu consentimiento."]] },
        ],
      },
      {
        id: "detalle",
        title: "Cookies que usamos",
        blocks: [
          { kv: [
            ["aurhora_cookie_consent y aurhora_cookie_preferences", "Aurhora · necesarias · guardan tu elección de cookies · almacenamiento local, hasta que la borres"],
            ["aurhora-theme", "Aurhora · necesaria · recuerda el tema claro u oscuro · almacenamiento local, hasta que la borres"],
            ["_ga, _ga_*", "Google Analytics · analítica · distinguen visitas y sesiones · hasta 2 años"],
            ["_clck, _clsk", "Microsoft Clarity · analítica · agrupan las páginas de una visita · hasta 1 año y 1 día"],
            ["_gcl_au", "Google Ads · marketing · miden conversiones de anuncios · 90 días"],
            ["_fbp", "Meta · marketing · miden campañas en Facebook e Instagram · 90 días"],
            ["Video de Vimeo", "Vimeo · reproduce el video del inicio · se carga en modo \"no rastrear\", sin cookies de seguimiento"],
          ] },
          { callout: "La duración la define cada proveedor y puede cambiar. Revisaremos esta tabla cuando agreguemos o quitemos herramientas.", tone: "info" },
        ],
      },
      {
        id: "consentimiento",
        title: "Cómo funciona el consentimiento",
        blocks: [
          { p: "Al entrar por primera vez eliges qué categorías aceptas. Mientras no aceptes analítica o marketing, esas herramientas no guardan cookies en tu navegador. Puedes cambiar tu elección cuando quieras desde el enlace \"Preferencias de cookies\" al pie de cada página." },
        ],
      },
      {
        id: "navegador",
        title: "Desde tu navegador",
        blocks: [
          { p: "También puedes bloquear o borrar cookies desde la configuración de tu navegador. Si bloqueas las necesarias, el sitio te volverá a preguntar tus preferencias en cada visita." },
        ],
      },
    ],
    seo: {
      title: "Política de cookies | Aurhora Agency",
      description: "Qué cookies usa el sitio de Aurhora, para qué sirven las necesarias, de analítica y de marketing, cuánto duran y cómo cambiar tus preferencias cuando quieras.",
      slug: "/politica-de-cookies",
      keywords: ["política de cookies Aurhora"],
    },
  },
];

export const legalById = (id: string) => LEGAL_DOCS.find((d) => d.id === id);
