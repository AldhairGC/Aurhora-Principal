"use client";

import React from "react";
import {
  FileText, Scale, Briefcase, Shield, AlertTriangle, Globe, Gavel, Mail, Users, CreditCard, RefreshCw, Ban,
} from "lucide-react";
import { LegalDocument, type LegalSection } from "@/components/legal/LegalDocument";

const lastUpdated = "29 de enero de 2026";

const sections: LegalSection[] = [
  {
    id: "aceptacion",
    icon: <FileText className="h-5 w-5" />,
    title: "1. Aceptación de los Términos",
    content: `Al acceder y utilizar el sitio web de Aurhora Agency (www.aurhora.agency) y/o contratar nuestros servicios, usted acepta estar sujeto a estos Términos y Condiciones, nuestra Política de Privacidad y cualquier otra política o directriz que se publique en nuestro sitio.

Si no está de acuerdo con alguna parte de estos términos, le solicitamos que no utilice nuestros servicios ni acceda a nuestro sitio web.

Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en este sitio. El uso continuado de nuestros servicios después de dichos cambios constituirá su aceptación de los nuevos términos.`,
  },
  {
    id: "identidad",
    icon: <Briefcase className="h-5 w-5" />,
    title: "2. Identificación de la Empresa",
    content: `**Razón Social:** Aurhora Agency, S.A. de C.V.
**Nombre Comercial:** Aurhora Agency
**Domicilio:** Ciudad de México, México
**Correo Electrónico:** contacto@aurhora.agency
**Teléfono:** +52 55 8299 1282

Aurhora Agency es una empresa mexicana constituida conforme a las leyes de los Estados Unidos Mexicanos, especializada en servicios de consultoría de transformación digital, desarrollo de software, optimización de procesos y marketing digital.`,
  },
  {
    id: "servicios",
    icon: <Globe className="h-5 w-5" />,
    title: "3. Descripción de Servicios",
    content: `Aurhora Agency ofrece los siguientes servicios profesionales:

**Servicios de Consultoría:**
• Estrategia de Innovación y Transformación Digital
• Optimización de Procesos y Sistemas de Gestión de Calidad
• Cultura Ágil y Transformación Organizacional
• Consultoría especializada en Seguros (InsurTech) y Fintech

**Servicios de Desarrollo:**
• Desarrollo de Software y Productos Digitales
• GoDigital Suite (solución llave en mano para presencia digital)
• Integraciones y APIs
• Mantenimiento y soporte de aplicaciones

**Servicios de Marketing:**
• Impulso y Marketing Digital
• Posicionamiento SEO
• Gestión de campañas digitales

Los servicios específicos, alcance, entregables, tiempos y costos se detallarán en propuestas comerciales y/o contratos de servicios individuales que se celebren con cada cliente.`,
  },
  {
    id: "contratacion",
    icon: <Users className="h-5 w-5" />,
    title: "4. Proceso de Contratación",
    content: `**4.1 Propuesta Comercial:**
Previo a la contratación de servicios, Aurhora Agency elaborará una propuesta comercial que detallará el alcance, entregables, cronograma, inversión y condiciones específicas del proyecto.

**4.2 Aceptación:**
La contratación se perfecciona mediante:
• Firma de contrato de servicios profesionales
• Aceptación por escrito de la propuesta comercial (incluyendo correo electrónico)
• Pago del anticipo o primera factura según corresponda

**4.3 Requisitos del Cliente:**
El cliente se compromete a:
• Proporcionar información veraz y completa
• Designar un representante autorizado para la toma de decisiones
• Cumplir con los tiempos de revisión y aprobación acordados
• Realizar los pagos en los términos pactados`,
  },
  {
    id: "pagos",
    icon: <CreditCard className="h-5 w-5" />,
    title: "5. Condiciones de Pago",
    content: `**5.1 Esquemas de Pago:**
Los esquemas de pago se definen en cada propuesta comercial y pueden incluir:
• Pago único al inicio o al término del proyecto
• Pagos parciales según hitos del proyecto
• Mensualidades para servicios recurrentes
• Planes anuales con beneficios

**5.2 Facturación:**
• Todas las facturas se emiten conforme a las disposiciones fiscales mexicanas (CFDI)
• Los precios indicados no incluyen IVA salvo que se especifique lo contrario
• Para clientes internacionales, la facturación se realizará según la normativa aplicable

**5.3 Condiciones de Pago:**
• El pago debe realizarse dentro de los 15 días naturales siguientes a la emisión de la factura, salvo acuerdo diferente por escrito
• Métodos de pago aceptados: transferencia bancaria, tarjeta de crédito/débito
• Los pagos en moneda extranjera se convertirán al tipo de cambio vigente

**5.4 Mora:**
El retraso en el pago generará:
• Intereses moratorios del 2% mensual sobre el saldo vencido
• Suspensión de servicios después de 30 días de mora
• Posible terminación del contrato después de 60 días de mora`,
  },
  {
    id: "propiedad-intelectual",
    icon: <Shield className="h-5 w-5" />,
    title: "6. Propiedad Intelectual",
    content: `**6.1 Propiedad de Aurhora Agency:**
• Todas las metodologías, frameworks, herramientas y conocimientos previos de Aurhora Agency permanecen como propiedad exclusiva de Aurhora Agency
• El código fuente, diseños y materiales desarrollados son propiedad de Aurhora Agency hasta que se realice el pago total de los servicios

**6.2 Transferencia al Cliente:**
Una vez realizado el pago total acordado:
• El cliente adquiere los derechos de uso y explotación de los entregables específicos del proyecto
• El código fuente desarrollado específicamente para el cliente será transferido según lo acordado en el contrato
• Los diseños y materiales gráficos serán propiedad del cliente

**6.3 Contenido del Cliente:**
• El cliente garantiza que tiene los derechos necesarios sobre el contenido que proporciona
• El cliente es responsable de obtener las licencias necesarias para imágenes, textos, marcas y otros materiales
• Aurhora Agency no será responsable por infracciones de propiedad intelectual derivadas del contenido proporcionado por el cliente

**6.4 Portfolio y Referencias:**
Aurhora Agency se reserva el derecho de mencionar al cliente y el proyecto como referencia comercial, salvo acuerdo de confidencialidad en contrario.`,
  },
  {
    id: "confidencialidad",
    icon: <Shield className="h-5 w-5" />,
    title: "7. Confidencialidad",
    content: `Ambas partes se comprometen a mantener estricta confidencialidad sobre:
• Información técnica y de negocio compartida durante el proyecto
• Datos de clientes, usuarios o terceros
• Estrategias, procesos y metodologías propietarias
• Términos comerciales y financieros específicos

**Excepciones:**
La obligación de confidencialidad no aplica a información que:
• Sea de dominio público
• Haya sido conocida previamente por la parte receptora
• Sea requerida por autoridades competentes
• Sea divulgada con consentimiento previo por escrito

La obligación de confidencialidad permanecerá vigente por un período de 3 años después de la terminación de la relación comercial.`,
  },
  {
    id: "garantias",
    icon: <RefreshCw className="h-5 w-5" />,
    title: "8. Garantías y Soporte",
    content: `**8.1 Garantía de Servicios:**
• Los servicios se prestan con profesionalismo y de acuerdo con las mejores prácticas de la industria
• Los entregables cumplirán con las especificaciones acordadas en la propuesta comercial
• Se ofrece un período de garantía de 30 días posteriores a la entrega para corrección de errores atribuibles a Aurhora Agency

**8.2 Exclusiones de Garantía:**
La garantía no cubre:
• Errores causados por modificaciones realizadas por el cliente o terceros
• Problemas derivados del uso indebido o negligencia
• Incompatibilidades con software o hardware no especificado en el alcance
• Fallas en servicios de terceros (hosting, APIs externas, etc.)

**8.3 Soporte Post-entrega:**
• El soporte técnico básico está incluido durante el período de garantía
• Servicios de soporte extendido, mantenimiento y actualizaciones pueden contratarse por separado
• Los tiempos de respuesta de soporte se especifican en los acuerdos de nivel de servicio (SLA) cuando aplique`,
  },
  {
    id: "limitacion-responsabilidad",
    icon: <AlertTriangle className="h-5 w-5" />,
    title: "9. Limitación de Responsabilidad",
    content: `**9.1 Alcance de la Responsabilidad:**
La responsabilidad total de Aurhora Agency por cualquier reclamación derivada de los servicios prestados estará limitada al monto total pagado por el cliente por dichos servicios en los 12 meses anteriores a la reclamación.

**9.2 Exclusiones:**
Aurhora Agency no será responsable por:
• Daños indirectos, incidentales, especiales o consecuentes
• Pérdida de beneficios, ingresos, datos o oportunidades de negocio
• Daños causados por fuerza mayor o caso fortuito
• Acciones u omisiones de terceros
• Decisiones de negocio tomadas con base en nuestras recomendaciones

**9.3 Exención:**
El cliente libera a Aurhora Agency de cualquier responsabilidad por:
• Contenido proporcionado por el cliente
• Uso de los entregables contrario a la ley o estos términos
• Infracciones de propiedad intelectual sobre materiales del cliente`,
  },
  {
    id: "terminacion",
    icon: <Ban className="h-5 w-5" />,
    title: "10. Terminación de Servicios",
    content: `**10.1 Terminación por el Cliente:**
El cliente puede terminar los servicios en cualquier momento con previo aviso por escrito de 15 días naturales. En caso de terminación:
• El cliente deberá pagar por todos los servicios prestados hasta la fecha de terminación
• Los anticipos no son reembolsables salvo que se acuerde por escrito
• Los entregables parciales serán entregados en su estado actual

**10.2 Terminación por Aurhora Agency:**
Aurhora Agency puede terminar los servicios en los siguientes casos:
• Incumplimiento de pago por más de 30 días
• Violación de estos términos por parte del cliente
• Comportamiento abusivo o ilegal
• Fuerza mayor que impida la prestación de servicios

**10.3 Efectos de la Terminación:**
• Cesación de obligaciones futuras de ambas partes
• Liquidación de pagos pendientes
• Devolución o destrucción de información confidencial
• Persistencia de las obligaciones de confidencialidad y propiedad intelectual`,
  },
  {
    id: "legislacion",
    icon: <Gavel className="h-5 w-5" />,
    title: "11. Legislación Aplicable y Jurisdicción",
    content: `**11.1 Ley Aplicable:**
Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes de los Estados Unidos Mexicanos.

**11.2 Jurisdicción:**
Para cualquier controversia derivada de estos términos o de los servicios prestados, las partes se someten expresamente a la jurisdicción de los tribunales competentes de la Ciudad de México, renunciando a cualquier otro fuero que pudiera corresponderles por razón de su domicilio presente o futuro.

**11.3 Clientes Internacionales:**
Para servicios prestados a clientes en:
• **Estados Unidos y Canadá:** Se aplicará la legislación mexicana, con posibilidad de arbitraje internacional según acuerdo específico
• **Unión Europea:** Se reconocen los derechos adicionales conferidos por la legislación europea de protección al consumidor y datos personales (GDPR)
• **Latinoamérica:** Se aplicará la legislación mexicana, considerando tratados internacionales aplicables

**11.4 Resolución Alternativa de Controversias:**
Antes de acudir a instancias judiciales, las partes acuerdan intentar resolver cualquier controversia mediante:
1. Negociación directa entre representantes autorizados
2. Mediación ante una institución reconocida
3. Arbitraje comercial (opcional, previo acuerdo por escrito)`,
  },
  {
    id: "disposiciones-generales",
    icon: <Scale className="h-5 w-5" />,
    title: "12. Disposiciones Generales",
    content: `**12.1 Totalidad del Acuerdo:**
Estos Términos y Condiciones, junto con las propuestas comerciales y contratos específicos, constituyen el acuerdo completo entre las partes.

**12.2 Divisibilidad:**
Si alguna disposición de estos términos es declarada inválida o inaplicable, las demás disposiciones continuarán en pleno vigor y efecto.

**12.3 Renuncia:**
La falta de ejercicio o retraso en el ejercicio de cualquier derecho por parte de Aurhora Agency no constituirá una renuncia al mismo.

**12.4 Cesión:**
El cliente no podrá ceder sus derechos u obligaciones bajo estos términos sin el consentimiento previo por escrito de Aurhora Agency.

**12.5 Notificaciones:**
Todas las notificaciones deberán realizarse por escrito a las direcciones de correo electrónico proporcionadas por las partes.

**12.6 Idioma:**
En caso de discrepancia entre versiones de estos términos en diferentes idiomas, prevalecerá la versión en español.`,
  },
  {
    id: "contacto",
    icon: <Mail className="h-5 w-5" />,
    title: "13. Contacto",
    content: `Para cualquier consulta relacionada con estos Términos y Condiciones, puede contactarnos a través de:

**Correo Electrónico:** legal@aurhora.agency
**Correo Alternativo:** contacto@aurhora.agency
**Teléfono:** +52 55 8299 1282
**Domicilio:** Ciudad de México, México

Nuestro horario de atención es de lunes a viernes, de 9:00 a 18:00 horas (hora del centro de México).

**Fecha de última actualización:** ${lastUpdated}`,
  },
];

export default function TerminosCondicionesPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Términos y Condiciones"
      subtitle="Estos términos regulan el uso de nuestros servicios y la relación comercial entre Aurhora Agency y nuestros clientes."
      lastUpdated={lastUpdated}
      noticeTitle="Aviso Importante"
      noticeText="Por favor, lea estos términos cuidadosamente antes de contratar nuestros servicios. Al utilizar nuestros servicios, usted acepta estar sujeto a estos términos y condiciones."
      sections={sections}
      contactTitle="¿Tienes preguntas sobre estos términos?"
      contactText="Nuestro equipo legal está disponible para aclarar cualquier duda."
      contactEmail="legal@aurhora.agency"
    />
  );
}
