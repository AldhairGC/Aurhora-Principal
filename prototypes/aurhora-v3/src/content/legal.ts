import type { LegalDoc } from "./types";

/*
  BORRADOR. Adaptado de los textos vigentes del sitio (actualizados el 29 de enero de 2026)
  para reflejar las tres unidades, el canal de WhatsApp y los respaldos acordados.
  La razón social se conserva tal como aparece hoy. Requiere revisión legal antes de publicar.
*/

const UPDATED = "21 de octubre de 2026 (borrador)";

export const LEGAL_DOCS: LegalDoc[] = [
  {
    id: "privacidad",
    title: "Aviso de privacidad",
    updated: UPDATED,
    intro: "Este aviso explica qué datos personales recabamos, para qué los usamos y cómo puedes ejercer tus derechos, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y su Reglamento.",
    sections: [
      {
        id: "responsable",
        title: "Identidad y domicilio del responsable",
        blocks: [
          { p: "Aurhora Agency, S.A. de C.V., que opera con el nombre comercial Aurhora Agency a través de sus unidades Aurhora Digital, Aurhora Integra y Aurhora Facilities (en adelante, \"Aurhora\"), con domicilio en Ciudad de México, México, es responsable del tratamiento de tus datos personales." },
          { kv: [["Correo para privacidad", "privacidad@aurhora.agency"], ["Teléfono", "+52 55 8299 1282"]] },
        ],
      },
      {
        id: "datos",
        title: "Datos personales que recabamos",
        blocks: [
          { h3: "Datos de identificación y contacto" },
          { list: ["Nombre", "Teléfono y número de WhatsApp", "Correo electrónico", "Empresa o negocio, cuando aplica"] },
          { h3: "Datos del servicio" },
          { list: ["Colonia, alcaldía o municipio, y la dirección del inmueble cuando se agenda una visita", "Descripción de lo que necesitas", "Fotografías del espacio o de los equipos que decidas compartir", "Preferencias de fecha y horario"] },
          { h3: "Datos de navegación" },
          { list: ["Dirección IP, tipo de navegador y dispositivo", "Páginas visitadas y origen de la visita, incluidos parámetros de campaña", "Cookies y tecnologías similares, según tus preferencias"] },
          { callout: "No recabamos datos personales sensibles. Te pedimos no incluirlos en tus mensajes ni en las fotografías que compartas." },
        ],
      },
      {
        id: "finalidades",
        title: "Finalidades del tratamiento",
        blocks: [
          { h3: "Finalidades primarias (necesarias)" },
          { list: ["Atender tus solicitudes de información y contacto", "Elaborar diagnósticos, cotizaciones y propuestas", "Coordinar visitas técnicas e instalaciones", "Prestar los servicios contratados y darles seguimiento", "Gestionar garantías y respaldos", "Facturación y cumplimiento de obligaciones legales y fiscales"] },
          { h3: "Finalidades secundarias (opcionales)" },
          { list: ["Enviarte información sobre servicios de Aurhora", "Encuestas de satisfacción", "Contenido de valor, como artículos y guías"] },
          { p: "Si no deseas que tus datos se usen para las finalidades secundarias, escríbenos a privacidad@aurhora.agency." },
        ],
      },
      {
        id: "transferencias",
        title: "Transferencias y encargados",
        blocks: [
          { p: "Para operar usamos proveedores que tratan datos por cuenta nuestra, dentro y fuera de México:" },
          { list: ["Mensajería, como WhatsApp", "Servicios en la nube, correo y gestión de clientes", "Herramientas de análisis web y publicidad, solo con tu consentimiento", "Autoridades competentes cuando la ley lo requiera"] },
          { p: "Procuramos que nuestros proveedores mantengan niveles adecuados de protección de datos personales." },
        ],
      },
      {
        id: "arco",
        title: "Derechos ARCO",
        blocks: [
          { p: "Puedes acceder a tus datos, rectificarlos, cancelarlos u oponerte a su uso (derechos ARCO), así como revocar tu consentimiento." },
          { h3: "Cómo ejercerlos" },
          { p: "Envía tu solicitud a privacidad@aurhora.agency con:" },
          { list: ["Nombre completo y datos de contacto", "Descripción clara de los datos y del derecho que deseas ejercer", "Copia de identificación oficial", "Cualquier documento que ayude a localizar tus datos"] },
          { kv: [["Respuesta", "20 días hábiles para comunicar la determinación"], ["Ejecución", "15 días hábiles adicionales para hacerla efectiva"]] },
        ],
      },
      {
        id: "cookies",
        title: "Cookies y tecnologías de rastreo",
        blocks: [
          { p: "Usamos cookies necesarias para el funcionamiento del sitio y, solo con tu consentimiento, cookies de analítica, marketing y funcionalidad. Consulta la Política de cookies para conocer el detalle y cambiar tus preferencias." },
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
          { p: "Podemos actualizar este aviso por cambios legales o de operación. La versión vigente estará siempre disponible en este sitio." },
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
    intro: "Estos términos regulan el uso de este sitio y la contratación de servicios de Aurhora. Cada servicio se rige además por la propuesta o el contrato específico que aceptes.",
    sections: [
      {
        id: "aceptacion",
        title: "Aceptación",
        blocks: [
          { p: "Al usar este sitio o contratar nuestros servicios aceptas estos términos y el Aviso de privacidad. Podemos actualizarlos; los cambios aplican desde su publicación." },
        ],
      },
      {
        id: "empresa",
        title: "Identificación",
        blocks: [
          { kv: [["Razón social", "Aurhora Agency, S.A. de C.V."], ["Nombre comercial", "Aurhora Agency"], ["Domicilio", "Ciudad de México, México"], ["Correo", "contacto@aurhora.agency"], ["Teléfono", "+52 55 8299 1282"]] },
        ],
      },
      {
        id: "servicios",
        title: "Servicios",
        blocks: [
          { list: ["Aurhora Digital: agentes de IA, automatización, software a la medida, consultoría, marketing digital y GoDigital Suite.", "Aurhora Integra: seguridad y accesos, redes y conectividad, domótica y automatización, audio y video.", "Aurhora Facilities: aire acondicionado, electricidad, instalaciones y reparaciones, mantenimiento programado y proyectos residenciales, comerciales e industriales."] },
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
        title: "Pagos y facturación",
        blocks: [
          { list: ["Los esquemas de pago se definen en cada propuesta.", "Las facturas se emiten conforme a las disposiciones fiscales mexicanas (CFDI).", "Los precios no incluyen IVA salvo que se indique lo contrario."] },
        ],
      },
      {
        id: "garantias",
        title: "Garantías y respaldo",
        blocks: [
          { kv: [["Aurhora Facilities", "15 o 30 días según el servicio, para revisión o ajuste del trabajo realizado"], ["Aurhora Integra", "Un año adicional de garantía en productos elegibles vendidos por Aurhora, según las condiciones de la propuesta"], ["Aurhora Digital", "Periodo de soporte definido en la propuesta de cada proyecto"]] },
          { p: "Las garantías no cubren daños por mal uso, modificaciones hechas por terceros, fallas de servicios externos ni causas ajenas al trabajo realizado. Las condiciones específicas se explican antes de contratar." },
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
        title: "Limitación de responsabilidad",
        blocks: [
          { p: "La responsabilidad de Aurhora se limita al monto pagado por el servicio que dio origen a la reclamación. No respondemos por daños indirectos ni por decisiones de negocio tomadas con base en nuestras recomendaciones." },
        ],
      },
      {
        id: "ley",
        title: "Legislación y jurisdicción",
        blocks: [
          { p: "Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Para cualquier controversia, las partes se someten a los tribunales competentes de la Ciudad de México, después de intentar una solución por negociación directa." },
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
    intro: "Las cookies son pequeños archivos que el sitio guarda en tu navegador. Aquí explicamos cuáles usamos y cómo decidir cuáles aceptas.",
    sections: [
      {
        id: "tipos",
        title: "Tipos de cookies",
        blocks: [
          { kv: [["Necesarias", "Permiten que el sitio funcione y recuerdan tus preferencias de privacidad. Siempre activas."], ["Analítica", "Nos ayudan a entender cómo se usa el sitio, por ejemplo con Google Analytics y Microsoft Clarity. Solo con tu consentimiento."], ["Marketing", "Miden campañas y muestran anuncios relevantes, por ejemplo de Google Ads o Meta. Solo con tu consentimiento."], ["Funcionales", "Recuerdan opciones como el tema claro u oscuro. Solo con tu consentimiento."]] },
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
          { p: "También puedes bloquear o borrar cookies desde la configuración de tu navegador. Algunas funciones del sitio podrían dejar de funcionar." },
        ],
      },
    ],
    seo: {
      title: "Política de cookies | Aurhora Agency",
      description: "Qué cookies usa el sitio de Aurhora, para qué sirven las necesarias, de analítica, marketing y funcionales, y cómo cambiar tus preferencias cuando quieras.",
      slug: "/politica-de-cookies",
      keywords: ["política de cookies Aurhora"],
    },
  },
];

export const legalById = (id: string) => LEGAL_DOCS.find((d) => d.id === id);
