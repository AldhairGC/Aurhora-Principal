"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslations } from "next-intl";
import ClientLayout from "@/components/ClientLayout";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, UserCheck, Globe, Mail, FileText, Calendar } from "lucide-react";

const AvisoPrivacidadPage = () => {
  const { theme } = useTheme();
  const t = useTranslations();

  const gradientColors = {
    bg: theme === "dark" ? "bg-gray-900" : "bg-gray-50",
    bgSecondary: theme === "dark" ? "bg-gray-800" : "bg-white",
  };

  const lastUpdated = "29 de enero de 2026";

  const sections = [
    {
      id: "responsable",
      icon: <UserCheck className="w-5 h-5" />,
      title: "1. Identidad y Domicilio del Responsable",
      content: `Aurhora Agency, S.A. de C.V. (en adelante "Aurhora Agency" o "Nosotros"), con domicilio en Ciudad de México, México, es responsable del tratamiento de sus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y su Reglamento.

Para cualquier consulta relacionada con este Aviso de Privacidad, puede contactarnos a través del correo electrónico: privacidad@aurhora.com o al teléfono +52 55 8299 1282.`
    },
    {
      id: "datos-recabados",
      icon: <FileText className="w-5 h-5" />,
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

Le informamos que NO recabamos datos personales sensibles.`
    },
    {
      id: "finalidades",
      icon: <Eye className="w-5 h-5" />,
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

Si no desea que sus datos personales sean tratados para las finalidades secundarias, puede manifestarlo enviando un correo a: privacidad@aurhora.com`
    },
    {
      id: "transferencias",
      icon: <Globe className="w-5 h-5" />,
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

Nos aseguramos de que nuestros proveedores y socios mantengan niveles adecuados de protección de datos personales conforme a las mejores prácticas internacionales.`
    },
    {
      id: "derechos-arco",
      icon: <Lock className="w-5 h-5" />,
      title: "5. Derechos ARCO",
      content: `Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición). Estos derechos se conocen como derechos ARCO.

**Para ejercer sus derechos ARCO:**
Envíe su solicitud al correo: privacidad@aurhora.com con los siguientes datos:
• Nombre completo y datos de contacto
• Descripción clara de los datos y el derecho que desea ejercer
• Copia de identificación oficial
• Cualquier documento que facilite la localización de sus datos

**Plazos de respuesta:**
• 20 días hábiles para comunicar la determinación adoptada
• 15 días hábiles adicionales para hacer efectiva la solicitud

**Usuarios de la Unión Europea (GDPR):**
Adicionalmente, tiene derecho a la portabilidad de sus datos, a la limitación del tratamiento, y a presentar una reclamación ante la autoridad de control competente.`
    },
    {
      id: "cookies",
      icon: <Eye className="w-5 h-5" />,
      title: "6. Uso de Cookies y Tecnologías de Rastreo",
      content: `Nuestro sitio web utiliza cookies y tecnologías similares para mejorar su experiencia de navegación y analizar el uso del sitio.

**Tipos de cookies que utilizamos:**
• **Cookies necesarias:** Esenciales para el funcionamiento del sitio
• **Cookies analíticas:** Google Analytics, Microsoft Clarity para analizar el tráfico
• **Cookies de marketing:** Para mostrar anuncios relevantes (cuando aplique)
• **Cookies funcionales:** Recordar preferencias de idioma y tema

**Gestión de cookies:**
Puede configurar su navegador para rechazar todas las cookies o para indicar cuándo se envía una cookie. Sin embargo, algunas funciones del sitio pueden no funcionar correctamente sin cookies.

También puede gestionar sus preferencias de cookies a través del banner de consentimiento disponible en nuestro sitio web.`
    },
    {
      id: "seguridad",
      icon: <Shield className="w-5 h-5" />,
      title: "7. Medidas de Seguridad",
      content: `Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger sus datos personales contra daño, pérdida, alteración, destrucción, uso, acceso o tratamiento no autorizado.

**Medidas implementadas:**
• Cifrado de datos en tránsito (SSL/TLS)
• Acceso restringido a datos personales
• Monitoreo y auditorías de seguridad
• Capacitación del personal en protección de datos
• Políticas de retención y eliminación de datos
• Protocolos de respuesta a incidentes de seguridad`
    },
    {
      id: "menores",
      icon: <UserCheck className="w-5 h-5" />,
      title: "8. Datos de Menores de Edad",
      content: `Nuestros servicios están dirigidos a empresas y profesionales. No recabamos intencionalmente datos personales de menores de edad. Si usted es padre, madre o tutor y tiene conocimiento de que su hijo(a) nos ha proporcionado datos personales, por favor contáctenos para proceder a su eliminación.`
    },
    {
      id: "cambios",
      icon: <Calendar className="w-5 h-5" />,
      title: "9. Cambios al Aviso de Privacidad",
      content: `Nos reservamos el derecho de efectuar modificaciones o actualizaciones al presente Aviso de Privacidad para reflejar cambios legislativos, políticos internos, nuevas prácticas de negocio, o por otras causas.

Las modificaciones estarán disponibles en nuestro sitio web: www.aurhora.com/aviso-privacidad

Le recomendamos revisar periódicamente este Aviso de Privacidad para estar informado sobre cómo protegemos sus datos personales.`
    },
    {
      id: "consentimiento",
      icon: <FileText className="w-5 h-5" />,
      title: "10. Consentimiento",
      content: `Al proporcionar sus datos personales a través de nuestros formularios de contacto, correo electrónico, teléfono o cualquier otro medio, usted consiente el tratamiento de sus datos personales en los términos descritos en este Aviso de Privacidad.

Si no está de acuerdo con los términos de este Aviso, le pedimos no proporcionar sus datos personales.

**Fecha de última actualización:** ${lastUpdated}`
    }
  ];

  return (
    <ClientLayout>
      <div className={`font-sans min-h-screen ${gradientColors.bg}`}>
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-6">
                <Shield className="w-8 h-8" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Aviso de Privacidad
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Tu privacidad es importante para nosotros. Este aviso describe cómo recopilamos, usamos y protegemos tus datos personales.
              </p>
              
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Última actualización: {lastUpdated}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              
              {/* Table of Contents */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`${gradientColors.bgSecondary} rounded-2xl p-6 md:p-8 mb-12 border border-gray-200 dark:border-gray-700`}
              >
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Contenido
                </h2>
                <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {sections.map((section, index) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-1"
                    >
                      <span className="w-5 h-5 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-800 text-xs font-medium">
                        {index + 1}
                      </span>
                      {section.title.replace(/^\d+\.\s*/, '')}
                    </a>
                  ))}
                </nav>
              </motion.div>

              {/* Sections */}
              <div className="space-y-12">
                {sections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="scroll-mt-32"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                        {section.icon}
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white pt-1">
                        {section.title}
                      </h2>
                    </div>
                    
                    <div className="pl-14">
                      <div 
                        className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed"
                        dangerouslySetInnerHTML={{ 
                          __html: section.content
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 dark:text-white">$1</strong>')
                            .replace(/\n\n/g, '</p><p class="mt-4">')
                            .replace(/\n•/g, '<br/>•')
                            .replace(/^/, '<p>')
                            .replace(/$/, '</p>')
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Contact Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`mt-16 ${gradientColors.bgSecondary} rounded-2xl p-8 border border-gray-200 dark:border-gray-700 text-center`}
              >
                <Mail className="w-10 h-10 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  ¿Tienes preguntas sobre tu privacidad?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Estamos aquí para ayudarte. Contáctanos para cualquier consulta relacionada con tus datos personales.
                </p>
                <a
                  href="mailto:privacidad@aurhora.com"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                  privacidad@aurhora.com
                </a>
              </motion.div>

            </div>
          </div>
        </section>
      </div>
    </ClientLayout>
  );
};

export default AvisoPrivacidadPage;
