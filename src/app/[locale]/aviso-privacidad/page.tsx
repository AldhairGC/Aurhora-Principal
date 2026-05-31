"use client";

import React from "react";
import { Shield, Lock, Eye, UserCheck, Globe, FileText, Calendar } from "lucide-react";
import { LegalDocument, type LegalSection } from "@/components/legal/LegalDocument";

const lastUpdated = "29 de enero de 2026";

const sections: LegalSection[] = [
  {
    id: "responsable",
    icon: <UserCheck className="h-5 w-5" />,
    title: "1. Identidad y Domicilio del Responsable",
    content: `Aurhora Agency, S.A. de C.V. (en adelante "Aurhora Agency" o "Nosotros"), con domicilio en Ciudad de México, México, es responsable del tratamiento de sus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y su Reglamento.

Para cualquier consulta relacionada con este Aviso de Privacidad, puede contactarnos a través del correo electrónico: privacidad@aurhora.agency o al teléfono +52 55 8299 1282.`,
  },
  {
    id: "datos-recabados",
    icon: <FileText className="h-5 w-5" />,
    title: "2. Datos Personales que Recabamos",
    content: `Para las finalidades señaladas en el presente Aviso de Privacidad, podemos recabar las siguientes categorías de datos personales:

**Datos de identificación:**
• Nombre completo
• Correo electrónico
• Número telefónico
• Nombre de la empresa u organización

**Datos de contacto profesional:**
• Cargo o puesto
• Área o departamento
• Dirección comercial

**Datos de navegación:**
• Dirección IP
• Tipo de navegador y dispositivo
• Páginas visitadas y tiempo de permanencia
• Cookies y tecnologías similares

Le informamos que NO recabamos datos personales sensibles.`,
  },
  {
    id: "finalidades",
    icon: <Eye className="h-5 w-5" />,
    title: "3. Finalidades del Tratamiento",
    content: `Sus datos personales serán utilizados para las siguientes finalidades:

**Finalidades primarias (necesarias):**
• Responder a sus solicitudes de información y contacto
• Proporcionar los servicios de consultoría y desarrollo contratados
• Elaborar cotizaciones y propuestas comerciales
• Gestionar la relación contractual
• Facturación y cobranza
• Cumplir con obligaciones legales y fiscales

**Finalidades secundarias (opcionales):**
• Enviar comunicaciones promocionales sobre nuestros servicios
• Realizar encuestas de satisfacción
• Invitarle a eventos y webinars
• Compartir contenido de valor (newsletters, artículos, estudios)

Si no desea que sus datos personales sean tratados para las finalidades secundarias, puede manifestarlo enviando un correo a: privacidad@aurhora.agency`,
  },
  {
    id: "transferencias",
    icon: <Globe className="h-5 w-5" />,
    title: "4. Transferencias de Datos",
    content: `Sus datos personales pueden ser transferidos y tratados dentro y fuera del país, a las siguientes entidades:

**Transferencias nacionales e internacionales:**
• Proveedores de servicios en la nube (hosting, almacenamiento)
• Plataformas de email marketing y CRM
• Procesadores de pagos
• Herramientas de análisis web (Google Analytics, Microsoft Clarity)
• Autoridades competentes cuando sea requerido por ley

**Marco legal aplicable:**
• México: LFPDPPP y su Reglamento
• Unión Europea: Reglamento General de Protección de Datos (GDPR)
• Estados Unidos y Canadá: Leyes aplicables de protección de datos
• Latinoamérica: Legislación local de cada jurisdicción

Nos aseguramos de que nuestros proveedores y socios mantengan niveles adecuados de protección de datos personales conforme a las mejores prácticas internacionales.`,
  },
  {
    id: "derechos-arco",
    icon: <Lock className="h-5 w-5" />,
    title: "5. Derechos ARCO",
    content: `Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición). Estos derechos se conocen como derechos ARCO.

**Para ejercer sus derechos ARCO:**
Envíe su solicitud al correo: privacidad@aurhora.agency con los siguientes datos:
• Nombre completo y datos de contacto
• Descripción clara de los datos y el derecho que desea ejercer
• Copia de identificación oficial
• Cualquier documento que facilite la localización de sus datos

**Plazos de respuesta:**
• 20 días hábiles para comunicar la determinación adoptada
• 15 días hábiles adicionales para hacer efectiva la solicitud

**Usuarios de la Unión Europea (GDPR):**
Adicionalmente, tiene derecho a la portabilidad de sus datos, a la limitación del tratamiento, y a presentar una reclamación ante la autoridad de control competente.`,
  },
  {
    id: "cookies",
    icon: <Eye className="h-5 w-5" />,
    title: "6. Uso de Cookies y Tecnologías de Rastreo",
    content: `Nuestro sitio web utiliza cookies y tecnologías similares para mejorar su experiencia de navegación y analizar el uso del sitio.

**Tipos de cookies que utilizamos:**
• **Cookies necesarias:** Esenciales para el funcionamiento del sitio
• **Cookies analíticas:** Google Analytics, Microsoft Clarity para analizar el tráfico
• **Cookies de marketing:** Para mostrar anuncios relevantes (cuando aplique)
• **Cookies funcionales:** Recordar preferencias de idioma y tema

**Gestión de cookies:**
Puede configurar su navegador para rechazar todas las cookies o para indicar cuándo se envía una cookie. Sin embargo, algunas funciones del sitio pueden no funcionar correctamente sin cookies.

También puede gestionar sus preferencias de cookies a través del banner de consentimiento disponible en nuestro sitio web.`,
  },
  {
    id: "seguridad",
    icon: <Shield className="h-5 w-5" />,
    title: "7. Medidas de Seguridad",
    content: `Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger sus datos personales contra daño, pérdida, alteración, destrucción, uso, acceso o tratamiento no autorizado.

**Medidas implementadas:**
• Cifrado de datos en tránsito (SSL/TLS)
• Acceso restringido a datos personales
• Monitoreo y auditorías de seguridad
• Capacitación del personal en protección de datos
• Políticas de retención y eliminación de datos
• Protocolos de respuesta a incidentes de seguridad`,
  },
  {
    id: "menores",
    icon: <UserCheck className="h-5 w-5" />,
    title: "8. Datos de Menores de Edad",
    content: `Nuestros servicios están dirigidos a empresas y profesionales. No recabamos intencionalmente datos personales de menores de edad. Si usted es padre, madre o tutor y tiene conocimiento de que su hijo(a) nos ha proporcionado datos personales, por favor contáctenos para proceder a su eliminación.`,
  },
  {
    id: "cambios",
    icon: <Calendar className="h-5 w-5" />,
    title: "9. Cambios al Aviso de Privacidad",
    content: `Nos reservamos el derecho de efectuar modificaciones o actualizaciones al presente Aviso de Privacidad para reflejar cambios legislativos, políticos internos, nuevas prácticas de negocio, o por otras causas.

Las modificaciones estarán disponibles en nuestro sitio web: www.aurhora.agency/aviso-privacidad

Le recomendamos revisar periódicamente este Aviso de Privacidad para estar informado sobre cómo protegemos sus datos personales.`,
  },
  {
    id: "consentimiento",
    icon: <FileText className="h-5 w-5" />,
    title: "10. Consentimiento",
    content: `Al proporcionar sus datos personales a través de nuestros formularios de contacto, correo electrónico, teléfono o cualquier otro medio, usted consiente el tratamiento de sus datos personales en los términos descritos en este Aviso de Privacidad.

Si no está de acuerdo con los términos de este Aviso, le pedimos no proporcionar sus datos personales.

**Fecha de última actualización:** ${lastUpdated}`,
  },
];

export default function AvisoPrivacidadPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Aviso de Privacidad"
      subtitle="Tu privacidad es importante para nosotros. Este aviso describe cómo recopilamos, usamos y protegemos tus datos personales."
      lastUpdated={lastUpdated}
      noticeTitle="Aviso Importante"
      noticeText="Este Aviso de Privacidad describe el tratamiento de tus datos personales conforme a la LFPDPPP. Al usar nuestros servicios, aceptas las prácticas aquí descritas."
      sections={sections}
      contactTitle="¿Tienes preguntas sobre tu privacidad?"
      contactText="Estamos aquí para ayudarte. Contáctanos para cualquier consulta relacionada con tus datos personales."
      contactEmail="privacidad@aurhora.agency"
    />
  );
}
