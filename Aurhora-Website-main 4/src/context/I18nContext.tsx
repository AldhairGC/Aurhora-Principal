// src/context/I18nContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Locale = "es-MX" | "en-US" | "pt-BR";

type TranslationKey = keyof (typeof translations)["es-MX"];
interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey | string) => string;
}
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Traducciones expandidas
const translations = {
  "es-MX": {
    // Header
    "header.inicio": "Inicio",
    "header.quienesSomos": "Quiénes Somos",
    "header.recursos": "Recursos",
    "header.servicios": "Servicios",
    "header.contacto": "Contacto",
    "header.login": "Iniciar Sesión",
    "header.cambiarIdioma": "Cambiar idioma",
    "header.idioma": "Idioma",

    // Hero Section
    "hero.title": "Impulsando la",
    "hero.innovation": "Innovación",
    "hero.subtitle": "Resultados que Transforman.",
    "hero.description":
      "Aurhora Agency: Tu socio estratégico en transformación digital y optimización de procesos. Integramos visión, tecnología y ejecución experta para maximizar tu potencial.",
    "hero.startTransformation": "Inicia tu Transformación",
    "hero.exploreServices": "Explorar Servicios",
    "hero.experience":
      "+10 años impulsando la innovación | Seguros | Banca | Fintech",

    // Services Section
    "services.title": "Nuestras Capacidades Estratégicas",
    "services.description":
      "Desde la estrategia hasta la implementación y evolución, cubrimos el espectro de la transformación.",

    // Philosophy Section
    "philosophy.title": "Nuestra Filosofía",
    "philosophy.description":
      "No solo resolvemos problemas, co-creamos futuro. Integramos estrategia, talento y tecnología para impulsar una transformación digital real y resultados medibles.",
    "philosophy.item1.title": "Gestión Integral",
    "philosophy.item1.description":
      "Conectamos y gestionamos el talento y las herramientas precisas (internas/externas) para cada desafío, asegurando una ejecución sinérgica y eficiente.",
    "philosophy.item2.title": "Co-creación Inteligente",
    "philosophy.item2.description":
      "Trabajamos contigo. Fusionamos tu conocimiento del negocio con nuestra experiencia en metodologías de innovación y transformación.",
    "philosophy.item3.title": "Orientación a Soluciones",
    "philosophy.item3.description":
      "Nos enfocamos en encontrar las vías más efectivas y pragmáticas para alcanzar tus metas, superando desafíos con un enfoque resolutivo.",

    // CTA Section
    "cta.title": "¿Listo para",
    "cta.impulse": "Impulsar",
    "cta.vision": "tu Visión?",
    "cta.description":
      "Conversemos sobre tus desafíos y exploremos cómo Aurhora Agency puede ser el socio estratégico que acelere tus resultados.",
    "cta.scheduleSession": "Agenda tu Sesión Estratégica",
    "cta.contact": "O contáctanos directamente:",

    // Contact Modal
    "contact.title": "Contáctanos",
    "contact.description": "Completa el formulario para agendar tu sesión.",
    "contact.name": "Nombre Completo",
    "contact.email": "Correo Electrónico",
    "contact.phone": "Teléfono",
    "contact.company": "Empresa",
    "contact.message": "Mensaje",
    "contact.send": "Enviar Solicitud",
    "contact.sent": "¡Mensaje Enviado!",
    "contact.thanks":
      "Gracias por tu interés. Nos pondremos en contacto contigo a la brevedad.",
    "contact.required":
      "Por favor, completa los campos obligatorios: Nombre, Email y Mensaje.",

    // About Section (Nosotros)
    "about.experience": "Nuestra Experiencia",
    "about.title1": "Transformando Negocios",
    "about.title2": "Sin Límites Sectoriales",
    "about.description1":
      "Nuestra metodología de gestión integral y enfoque en soluciones es inherentemente adaptable, permitiéndonos generar valor significativo en prácticamente cualquier industria. Complementamos nuestro núcleo experto con una amplia red de especialistas sectoriales para asegurar el conocimiento profundo requerido en cada proyecto.",
    "about.description2":
      "Contamos con una trayectoria destacada y casos de éxito comprobables en Seguros, Banca y Fintech. Colaboramos estrechamente tanto con Pymes, Startups y empresas en crecimiento como con grandes corporativos, adaptando nuestro enfoque para maximizar el potencial único de cada organización.",
    "about.principlesTitle": "Principios Clave:",
    "about.principle1": "Co-creación y Colaboración Genuina",
    "about.principle2": "Resultados Pragmáticos y Medibles",
    "about.principle3": "Enfoque Resolutivo y Orientado a Soluciones",
    "about.yearsExperience": "Años de Experiencia",
    "about.projects": "Proyectos",
    "about.clients": "Clientes",
    "about.trustResults": "Confianza y Resultados",
    "about.trustDescription":
      "Construimos relaciones estratégicas duraderas. Pronto compartiremos casos de éxito.",

    // Transformation Process
    "process.title": "Nuestro Proceso de Transformación",
    "process.description":
      "Una metodología colaborativa en 5 fases, desde la visión hasta la evolución continua.",
    "process.step1.title": "Diagnóstico y Oportunidad",
    "process.step1.description":
      "Inmersión profunda para entender contexto, retos y oportunidades de innovación.",
    "process.step2.title": "Estrategia y Co-Diseño",
    "process.step2.description":
      "Co-creación de la visión, roadmap estratégico y diseño de soluciones transformadoras.",
    "process.step3.title": "Plan de Acción y Habilitación",
    "process.step3.description":
      "Entrega del plan detallado, preparación de equipos y habilitación tecnológica.",
    "process.step4.title": "Implementación y Desarrollo",
    "process.step4.description":
      "Lideramos la ejecución, construimos las soluciones tecnológicas y gestionamos el cambio organizacional desde adentro.",
    "process.step5.title": "Mejora y Evolución Continua",
    "process.step5.description":
      "Medición de resultados, iteración ágil, optimización constante y soporte para la sostenibilidad del cambio.",

    // Form placeholders
    "form.namePlaceholder": "Tu nombre completo",
    "form.emailPlaceholder": "tu@ejemplo.com",
    "form.phonePlaceholder": "Opcional",
    "form.companyPlaceholder": "Nombre de tu empresa (Opcional)",
    "form.messagePlaceholder":
      "Cuéntanos sobre tu proyecto o cómo podemos ayudarte...",

    // Services Cards
    "services.godigital.title": "GoDigital Suite",
    "services.godigital.description":
      'Ecosistema digital integral "llave en mano" con presencia online profesional y gestión de clientes. Implementación en 1-2 semanas.',
    "services.godigital.linkText": "Conocer GoDigital",

    "services.transformation.title":
      "Estrategia de Innovación y Transformación Digital",
    "services.transformation.description":
      "Co-creamos tu roadmap tecnológico y digital, identificando oportunidades de innovación para acelerar resultados.",
    "services.transformation.linkText": "Impulsar Innovación",

    "services.development.title":
      "Desarrollo de Software y Productos Digitales",
    "services.development.description":
      "Diseñamos, construimos y desplegamos software a medida y productos digitales innovadores que potencian tu estrategia.",
    "services.development.linkText": "Explorar Desarrollo",

    "services.optimization.title": "Optimización de Procesos y Calidad",
    "services.optimization.description":
      "Diseñamos e implementamos SGC (ej. ISO), optimizando tu operación para la excelencia y certificaciones.",
    "services.optimization.linkText": "Descubrir Optimización",

    "services.marketing.title": "Impulso y Marketing Digital",
    "services.marketing.description":
      "Definimos y gestionamos estrategias de marketing digital para lanzar y posicionar tus productos y servicios.",
    "services.marketing.linkText": "Ver Estrategias",

    "services.agile.title": "Cultura Ágil y Transformación Organizacional",
    "services.agile.description":
      "Trabajamos desde adentro con tus equipos para implementar metodologías ágiles, gestionar el cambio y fomentar una cultura de innovación sostenible.",
    "services.agile.linkText": "Transformar Equipos",

    // Footer
    "footer.tagline": "Impulsando la Innovación, Resultados que Transforman.",
    "footer.legal": "Legal",
    "footer.privacy": "Aviso de Privacidad",
    "footer.terms": "Términos y Condiciones",
    "footer.follow": "Síguenos",
    "footer.copyright": "Aurhora Agency. Todos los derechos reservados.",
    "footer.designed": "Diseñado con",
    "footer.by": "por Aurhora Team",

    // Login Page
    "login.title": "Iniciar Sesión",
    "login.email": "Email",
    "login.password": "Contraseña",
    "login.emailPlaceholder": "tu@email.com",
    "login.passwordPlaceholder": "••••••••",
    "login.rememberMe": "Recordarme",
    "login.forgotPassword": "¿Olvidaste tu contraseña?",
    "login.access": "Acceder",
    "login.loggingIn": "Iniciando...",
    "login.noAccount": "¿No tienes cuenta?",
    "login.signUp": "Regístrate",
    "login.tagline":
      "Transformación digital inteligente para empresas que lideran el futuro",
    "login.secure": "Seguro",
    "login.fast": "Rápido",
    "login.global": "Global",

    // GoDigital Suite Page
    "godigital.ourStarSuite": "NUESTRA SUITE ESTRELLA",
    "godigital.title": "Aurhora GoDigital Suite",
    "godigital.subtitle": "Tu Negocio para la Era Digital, Simple y Completo.",
    "godigital.description":
      'El ecosistema digital integral "llave en mano" que transforma tu presencia online y optimiza la gestión de tu negocio. Enfocado en la transformación digital continua.',
    "godigital.discoverPlans": "Descubrir Planes",
    "godigital.scheduleFreeDemo": "Agendar Demo Gratuita",
    "godigital.challengesTitle":
      "¿Tu negocio enfrenta estos desafíos digitales?",
    "godigital.challengesSubtitle":
      "GoDigital Suite está diseñado para convertir estos obstáculos en oportunidades de crecimiento y eficiencia.",
    "godigital.strategicBenefitsTitle":
      "Beneficios Estratégicos: Más que Tecnología, Resultados Concretos",
    "godigital.strategicBenefitsSubtitle":
      "Descubre cómo GoDigital Suite impulsa tu negocio hacia el éxito en el entorno digital.",
    "godigital.processTitle":
      "Nuestro Proceso: Tu Transformación Digital Paso a Paso",
    "godigital.processSubtitle":
      "Te acompañamos en cada etapa para asegurar una implementación exitosa y adaptada a tus necesidades.",
    "godigital.plansTitle": "Planes Diseñados para tu Crecimiento Digital",
    "godigital.plansSubtitle":
      "Elige el plan que mejor se adapte a tu negocio. Todos incluyen implementación, acompañamiento experto y la promesa de transformación.",
    "godigital.addonsTitle": "Potencia tu Suite con Add-ons Estratégicos",
    "godigital.addonsSubtitle":
      "Nuestros Add-ons son soluciones modulares diseñadas para habilitar diversas necesidades operativas de tu negocio, compatibles desde el Paquete Básico.",
    "godigital.targetTitle": "¿Para Quién es GoDigital Suite?",
    "godigital.targetSubtitle":
      "Si buscas transformar digitalmente tu negocio, consolidar tu presencia online y optimizar tus operaciones, esta suite es para ti.",
    "godigital.testimonialsTitle": "Lo que Dicen Nuestros Clientes Satisfechos",
    "godigital.testimonialsSubtitle":
      "Historias reales de transformación y crecimiento con GoDigital Suite.",
    "godigital.faqTitle": "Preguntas Frecuentes",
    "godigital.faqSubtitle":
      "Resolvemos tus dudas para que tomes la mejor decisión para tu negocio.",
    "godigital.ctaTitle": "¿Listo para transformar tu negocio?",
    "godigital.ctaSubtitle":
      "Da el primer paso hacia una presencia digital impactante y operaciones optimizadas. Nuestro equipo de expertos está listo para ayudarte.",
    "godigital.startNow": "Comenzar Ahora",
    "godigital.scheduleFreeConsultation": "Agendar Consultoría Gratuita",
    "godigital.fastImplementation": "Implementación Express: 1-2 semanas",
    "godigital.continuousSupport": "Garantía y Soporte Continuo",
    "godigital.expertAdvice": "Asesoramiento Experto Personalizado",
    "godigital.popular": "MÁS POPULAR",
    "godigital.chooseThisPlan": "Elegir este Plan",
    "godigital.continueWithPlan": "Continuar con este Plan",
    "godigital.fromPrice": "Desde",
    "godigital.taxesNotIncluded": "Impuestos no incluidos. Consulta detalles.",
    "godigital.closeForm": "Cerrar formulario",

    // GoDigital Strategic Benefits
    "godigital.benefits.strengthening.title":
      "Fortalecimiento de Imagen y Credibilidad",
    "godigital.benefits.strengthening.description":
      "Sitios web modernos, responsive y seguros (SSL) con SEO básico para mayor visibilidad y confianza.",
    "godigital.benefits.efficiency.title":
      "Optimización de Eficiencia Operativa",
    "godigital.benefits.efficiency.description":
      "Desde un canal de contacto profesional hasta gestión avanzada de citas y un mini-CRM para seguimiento superior.",
    "godigital.benefits.agile.title":
      "Implementación Ágil y Asesoramiento Integral",
    "godigital.benefits.agile.description":
      "Tiempos optimizados (1-2 semanas post-aprobación) con gestión técnica y configuración por Aurhora Agency.",
    "godigital.benefits.scalable.title":
      "Solución Tecnológica Escalable y Modular",
    "godigital.benefits.scalable.description":
      "Tres paquetes base y una amplia gama de add-ons para personalizar y expandir según la evolución de tu negocio.",
    "godigital.benefits.costEffective.title":
      "Relación Costo-Beneficio Superior",
    "godigital.benefits.costEffective.description":
      "Oferta de alto valor que combina tecnología robusta con consultoría experta a un precio competitivo.",
    "godigital.benefits.support.title":
      "Reducción de Carga de Trabajo y Soporte Continuo",
    "godigital.benefits.support.description":
      "Nos encargamos de la configuración y el ensamblaje, con alojamiento, mantenimiento y soporte incluidos.",

    // GoDigital Problems Solved
    "godigital.problems.digitalPresence.title":
      "Presencia Digital Limitada o Inexistente",
    "godigital.problems.digitalPresence.description":
      "Supera la falta de una plataforma web profesional o perfiles sociales robustos que impactan tu credibilidad y alcance.",
    "godigital.problems.valueComm.title": "Comunicación de Valor Ineficaz",
    "godigital.problems.valueComm.description":
      "Facilitamos la presentación clara y profesional de tu oferta, incluyendo la validación mediante testimonios y casos de éxito.",
    "godigital.problems.interaction.title":
      "Gestión de Interacciones Descentralizada",
    "godigital.problems.interaction.description":
      "Automatiza y centraliza la gestión de citas y consultas, eliminando procesos manuales ineficientes y mejorando el seguimiento.",
    "godigital.problems.processes.title":
      "Procesos Operativos Manuales y Lentos",
    "godigital.problems.processes.description":
      "Digitaliza procesos operativos clave para mejorar tu capacidad de respuesta y la eficiencia general de tu negocio.",
    "godigital.problems.complexity.title": "Complejidad Tecnológica Abrumadora",
    "godigital.problems.complexity.description":
      "Reducimos las barreras de complejidad, costo y tiempo asociadas a la implementación de soluciones digitales. Una alternativa a la autogestión.",
    "godigital.problems.scaling.title": "Dificultad para Escalar tu Negocio",
    "godigital.problems.scaling.description":
      "Te proporcionamos las herramientas digitales necesarias para el crecimiento sostenido y la mejora continua de tus servicios.",

    // GoDigital Target Audience
    "godigital.target.freelancers.name":
      "Profesionales Independientes y Emprendedores",
    "godigital.target.freelancers.description":
      "Consultores, coaches, terapeutas, diseñadores, y más, que buscan consolidar su marca personal y optimizar la captación y gestión de clientes.",
    "godigital.target.smes.name": "Pequeñas y Medianas Empresas (PyMEs)",
    "godigital.target.smes.description":
      "Negocios en crecimiento o en proceso de digitalización que necesitan una presencia online robusta y herramientas para gestionar interacciones y clientes de forma eficiente.",
    "godigital.target.variousSectors.name": "Diversos Sectores",
    "godigital.target.variousSectors.description":
      "Adaptable a servicios profesionales (consultoría, legal), salud, educación, oficios técnicos, estética, y pequeño comercio con necesidades de agendamiento.",

    // GoDigital Implementation Process Steps
    "godigital.processSteps.onboarding.title": "1. Onboarding y Kick-off",
    "godigital.processSteps.onboarding.description":
      "Sesión inicial para entender tus necesidades, alinear expectativas y definir los próximos pasos. Recopilamos la información esencial de forma estructurada.",
    "godigital.processSteps.content.title":
      "2. Estructuración de Contenido y Branding",
    "godigital.processSteps.content.description":
      "Te asesoramos para organizar tu contenido y aplicar tu marca (o te orientamos en branding básico). Presentamos una propuesta para tu revisión.",
    "godigital.processSteps.technical.title": "3. Implementación Técnica",
    "godigital.processSteps.technical.description":
      "Ensamblamos tu ecosistema digital (sitio web, agendamiento, CRM según plan) aplicando la plantilla, tu branding y contenido. Realizamos pruebas internas exhaustivas.",
    "godigital.processSteps.review.title": "4. Revisión y Aprobación",
    "godigital.processSteps.review.description":
      "Te presentamos el sitio en un entorno de revisión. Tienes un periodo para feedback consolidado y realizamos ajustes menores incluidos.",
    "godigital.processSteps.delivery.title": "5. Entrega Final y Capacitación",
    "godigital.processSteps.delivery.description":
      "¡Lanzamos tu sitio! Te entregamos accesos y te capacitamos (según paquete) para que gestiones tu nueva plataforma. Incluye soporte post-lanzamiento.",

    // GoDigital Plans
    "godigital.plans.basic.title": "Básico",
    "godigital.plans.basic.description":
      "Presencia digital profesional e informativa. Ideal para iniciar.",
    "godigital.plans.basic.feature.websiteInfo":
      "Sitio Web Informativo (Landing Page o Multi-sección Simple)",
    "godigital.plans.basic.feature.responsiveDesign":
      "Diseño moderno y responsive",
    "godigital.plans.basic.feature.contact": "Formulario de Contacto",
    "godigital.plans.basic.feature.social": "Integración de Redes Sociales",
    "godigital.plans.basic.feature.sslIncluded": "Certificado SSL incluido",
    "godigital.plans.basic.feature.seoInitial": "SEO básico inicial",
    "godigital.plans.basic.feature.hostingBasic":
      "Alojamiento y Mantenimiento básico",
    "godigital.plans.basic.feature.pagesUpTo5": "Hasta 5 páginas estándar",

    "godigital.plans.professional.title": "Profesional",
    "godigital.plans.professional.description":
      "Optimiza la gestión de citas e interacciones. Eleva tu eficiencia.",
    "godigital.plans.professional.feature.allBasic":
      "Todo lo del Paquete Básico",
    "godigital.plans.professional.feature.schedulingSystem":
      "Sistema de Agendamiento de Citas Integrado (tipo Calendly)",
    "godigital.plans.professional.feature.availabilityConfig":
      "Configuración de disponibilidad y servicios",
    "godigital.plans.professional.feature.calendarSync":
      "Sincronización con calendarios personales",
    "godigital.plans.professional.feature.emailConfirmations":
      "Confirmaciones automáticas por email",
    "godigital.plans.professional.feature.pagesUpTo10": "Hasta 10 páginas",
    "godigital.plans.professional.feature.prioritySupport":
      "Soporte prioritario",

    "godigital.plans.360.title": "360",
    "godigital.plans.360.description":
      "Solución integral con herramientas de gestión de clientes.",
    "godigital.plans.360.feature.allProfessional":
      "Todo lo del Paquete Profesional",
    "godigital.plans.360.feature.miniCrm":
      "Mini-CRM (Gestión de Relación con Clientes Básico)",
    "godigital.plans.360.feature.adminPanel": "Panel de Administración Web",
    "godigital.plans.360.feature.contactDataFields":
      "Registro de datos de contacto y campos personalizables",
    "godigital.plans.360.feature.interactionHistory":
      "Historial de Interacciones y Notas por Cliente",
    "godigital.plans.360.feature.documentManagement":
      "Gestión de Documentos por Cliente",
    "godigital.plans.360.feature.unlimitedPages": "Páginas ilimitadas",
    "godigital.plans.360.feature.monthlyConsulting":
      "Consultoría mensual incluida",

    // GoDigital Add-ons
    "godigital.addonsList.onlinePayments.name": "Pagos Online para Citas",
    "godigital.addonsList.onlinePayments.price": "+$99/mes",
    "godigital.addonsList.onlinePayments.description":
      "Permite a tus clientes pagar al momento de agendar.",
    "godigital.addonsList.billing.name": "Módulo de Facturación Simplificada",
    "godigital.addonsList.billing.price": "+$149/mes",
    "godigital.addonsList.billing.description":
      "Genera facturas básicas desde tu plataforma.",
    "godigital.addonsList.advancedReminders.name":
      "Recordatorios Avanzados (SMS/WhatsApp)",
    "godigital.addonsList.advancedReminders.price": "+$79/mes",
    "godigital.addonsList.advancedReminders.description":
      "Reduce no-shows con recordatorios automáticos.",
    "godigital.addonsList.blog.name": "Blog Sencillo Integrado",
    "godigital.addonsList.blog.price": "+$59/mes",
    "godigital.addonsList.blog.description":
      "Comparte contenido de valor y mejora tu SEO.",
    "godigital.addonsList.galleries.name": "Galerías de Imágenes Avanzadas",
    "godigital.addonsList.galleries.price": "+$49/mes",
    "godigital.addonsList.galleries.description":
      "Muestra tu trabajo con portafolios visuales.",
    "godigital.addonsList.multiLanguage.name": "Soporte para Múltiples Idiomas",
    "godigital.addonsList.multiLanguage.price": "+$129/mes",
    "godigital.addonsList.multiLanguage.description":
      "Expande tu alcance a audiencias internacionales.",

    // GoDigital Testimonials
    "godigital.testimonialsList.anaPerez.quote":
      "GoDigital Suite transformó nuestra forma de interactuar con los clientes. El proceso fue rápido y el equipo de Aurhora, excepcional.",
    "godigital.testimonialsList.anaPerez.name": "Ana Pérez",
    "godigital.testimonialsList.anaPerez.company": "Consultoría Creativa",
    "godigital.testimonialsList.carlosLopez.quote":
      "Desde que implementamos la solución de agendamiento, hemos ahorrado horas de trabajo administrativo. ¡Totalmente recomendado!",
    "godigital.testimonialsList.carlosLopez.name": "Carlos López",
    "godigital.testimonialsList.carlosLopez.company":
      "Salud y Bienestar Integral",
    "godigital.testimonialsList.sofiaMartinez.quote":
      "El Mini-CRM es justo lo que necesitábamos para organizar la información de nuestros clientes. Un antes y un después.",
    "godigital.testimonialsList.sofiaMartinez.name": "Sofía Martínez",
    "godigital.testimonialsList.sofiaMartinez.company": "Estudio de Diseño SM",

    // GoDigital FAQ
    "godigital.faqList.item1.q":
      "¿Qué tan rápido puedo tener mi sitio web y sistema funcionando?",
    "godigital.faqList.item1.a":
      "Nuestro proceso de implementación está optimizado para ser ágil. Generalmente, después de recibir toda tu información y la aprobación del contenido y estructura, podemos tener tu Paquete Básico listo en aproximadamente 1 semana, y los Paquetes Profesional o 360 en 1-2 semanas, dependiendo de la complejidad y los add-ons seleccionados.",
    "godigital.faqList.item2.q": "¿Necesito tener conocimientos técnicos?",
    "godigital.faqList.item2.a":
      "¡Para nada! GoDigital Suite es una solución 'llave en mano'. Nosotros nos encargamos de toda la configuración técnica, el diseño (basado en plantillas profesionales que personalizamos con tu marca) y la puesta en marcha. Te entregamos tu ecosistema digital listo para usar y te ofrecemos capacitación básica para que puedas gestionarlo.",
    "godigital.faqList.item3.q":
      "¿Qué pasa si mi negocio crece y necesito más funcionalidades?",
    "godigital.faqList.item3.a":
      "GoDigital Suite está diseñado para escalar contigo. Puedes empezar con un paquete y luego actualizarlo, o añadir funcionalidades específicas a través de nuestro catálogo de Add-ons en cualquier momento. Nuestro objetivo es que la tecnología se adapte a tus necesidades cambiantes.",
    "godigital.faqList.item4.q":
      "¿El precio 'Desde X' qué incluye exactamente?",
    "godigital.faqList.item4.a":
      "El precio 'Desde X' es un punto de partida y puede variar significativamente según el esquema de pago que elijas al contratar. Ofrecemos flexibilidad con opciones como pagos únicos por implementación, mensualidades (que pueden ser menores si se combinan con un pago inicial), o planes anuales con beneficios adicionales. Esta estructura nos permite adaptar la inversión a tus necesidades específicas y al valor que la Suite te aportará. Un ejecutivo de Aurhora Agency te acompañará personalmente para detallar todas las opciones, entender tus requerimientos y ayudarte a configurar el plan y esquema de pago que mejor se ajuste a tu negocio durante una consultoría personalizada.",
    "godigital.faqList.item5.q": "¿Qué tipo de soporte ofrecen?",
    "godigital.faqList.item5.a":
      "Todos los planes incluyen soporte técnico básico y un periodo de garantía post-lanzamiento para corregir cualquier error técnico atribuible a Aurhora. Para necesidades de soporte más continuas o prioritarias, ofrecemos pólizas de soporte técnico adicionales y consultoría.",

    // About Us Page
    "aboutUs.badge": "Conócenos",
    "aboutUs.heroTitle1": "Orquestando la Transformación",
    "aboutUs.heroTitle2": "con Experiencia y Co-creación",
    "aboutUs.heroDescription":
      "En Aurhora Agency, combinamos la agilidad de una empresa joven con la profunda experiencia de un equipo de profesionales que ha liderado la vanguardia tecnológica en múltiples industrias por más de 15 años. Somos sus socios estratégicos en la gestión e integración de soluciones que impulsan el verdadero cambio.",
    "aboutUs.scheduleStrategicSession": "Agendar Sesión Estratégica",

    // Nuestra Esencia
    "aboutUs.heartBadge": "El Corazón de Aurhora",
    "aboutUs.essenceTitle1": "Jóvenes de Espíritu,",
    "aboutUs.essenceTitle2": "Gigantes en Experiencia",
    "aboutUs.essenceDescription1":
      "Aurhora Agency nace de la convicción de que la verdadera transformación digital requiere más que solo tecnología; necesita visión, gestión experta y una profunda comprensión del negocio. Aunque somos una agencia de reciente creación, nuestro equipo directivo y consultores principales acumulan más de 15 años de experiencia liderando proyectos complejos y exitosos en grandes corporativos y startups innovadoras.",
    "aboutUs.essenceDescription2":
      "Esta dualidad nos permite ofrecer la frescura y adaptabilidad de una nueva era, respaldada por el conocimiento y la solidez de quienes han navegado y moldeado la evolución tecnológica en sectores clave.",
    "aboutUs.experienceYears": "+15 Años de Experiencia",
    "aboutUs.experienceSubtitle":
      "Liderando la transformación en la industria.",
    "aboutUs.essenceQuote":
      '"Fusionamos la agilidad innovadora con la sabiduría de la experiencia."',

    // Orquestación
    "aboutUs.orchestrationTitle": "El Arte de la Orquestación Estratégica",
    "aboutUs.orchestrationDescription":
      'Nuestra capacidad única reside en conocer a fondo tanto los grandes corporativos como los emprendimientos desde su raíz. Esta perspectiva nos permite consolidar equipos multidisciplinarios de expertos que no solo entienden diversos sectores, sino que saben cómo "tropicalizar" funcionalidades, migrando lo mejor de cada mundo para crear soluciones innovadoras y a la medida para nuestros clientes.',
    "aboutUs.expertOrchestration": "Orquestación Experta",
    "aboutUs.expertOrchestrationDesc":
      "Somos maestros en la gestión e integración de soluciones complejas, conectando talento y tecnología para resultados sinérgicos y eficientes.",
    "aboutUs.multidisciplinaryTeams": "Equipos Multidisciplinarios",
    "aboutUs.multidisciplinaryTeamsDesc":
      "Nuestra fortaleza radica en la diversidad de nuestros expertos, provenientes de múltiples sectores, lo que nos permite una visión 360° de cada desafío.",
    "aboutUs.tropicalizationInnovation": 'Innovación por "Tropicalización"',
    "aboutUs.tropicalizationInnovationDesc":
      "Adaptamos y migramos funcionalidades exitosas de un sector a otro, tomando lo mejor de cada mundo para proponer soluciones frescas y disruptivas.",

    // Seguros
    "aboutUs.sectoralStrengthBadge": "Nuestra Fortaleza Sectorial",
    "aboutUs.insuranceTitle":
      "Expertos en el Ecosistema de Seguros (InsurTech)",
    "aboutUs.insuranceDescription1":
      "Conocemos a profundidad la industria aseguradora mexicana y latinoamericana. Hemos colaborado con las principales aseguradoras del país, desarrollando e integrando soluciones tecnológicas a lo largo de toda su cadena de valor.",
    "aboutUs.insuranceDescription2":
      "Nuestra experiencia abarca una amplia gama de productos y líneas de negocio, permitiéndonos ofrecer perspectivas innovadoras y soluciones pragmáticas que responden a los desafíos específicos del sector.",

    // Fintech
    "aboutUs.fintechTitle": "Impulsores de la Innovación en Fintech",
    "aboutUs.fintechDescription1":
      "El sector financiero está en constante evolución, y en Aurhora Agency estamos a la vanguardia. Hemos trabajado con bancos tradicionales, startups disruptivas y neoBancos, creando desde robustas bancas móviles hasta la integración ágil de agregadores de pago.",
    "aboutUs.fintechDescription2":
      "Entendemos los desafíos de seguridad, regulatorios y de experiencia de usuario que definen al sector Fintech, y aportamos soluciones que combinan innovación tecnológica con un profundo conocimiento del negocio financiero.",

    // Co-creación
    "aboutUs.cocreationTitle": "Co-creación: El Pilar de Soluciones Genuinas",
    "aboutUs.cocreationDescription1":
      "Creemos firmemente que las soluciones más impactantes nacen de la colaboración estrecha. Nuestro enfoque de co-creación significa que trabajamos mano a mano contigo, fusionando tu conocimiento profundo del negocio con nuestra experiencia en gestión, integración y tecnología.",
    "aboutUs.cocreationDescription2":
      "Este proceso colaborativo nos permite ir más allá de las soluciones genéricas, diseñando e implementando estrategias y herramientas verdaderamente personalizadas que atienden al 100% las necesidades y objetivos únicos de tu organización, asegurando un impacto real y medible.",

    // CTA Final
    "aboutUs.ctaTitle":
      "¿Listo para que nuestra experiencia impulse tu visión?",
    "aboutUs.ctaDescription":
      "Permítenos ser los arquitectos de tu próxima gran transformación. Conversemos sobre tus desafíos y exploremos juntos cómo Aurhora Agency puede ser el socio estratégico que necesitas.",
    "aboutUs.scheduleStrategicSessionCta": "Agendar una Sesión Estratégica",

    // Insurance Expertise List
    "aboutUs.insurance.medicalExpenses":
      "Gastos Médicos Mayores (Indiv. y Colect.)",
    "aboutUs.insurance.auto": "Autos (Particulares, Flotillas, Serv. Público)",
    "aboutUs.insurance.life": "Vida (Tradicional, Inversión, Educativos)",
    "aboutUs.insurance.property": "Daños (Hogar, Empresariales, RC)",
    "aboutUs.insurance.savings": "Productos de Ahorro y Retiro",
    "aboutUs.insurance.claims": "Gestión Integral de Siniestros",
    "aboutUs.insurance.underwriting": "Suscripción y Emisión Digital",
    "aboutUs.insurance.channels": "Canales Digitales y Venta Directa",

    // Fintech Expertise List
    "aboutUs.fintech.mobileBanking": "Desarrollo de Bancas Móviles",
    "aboutUs.fintech.paymentGateways": "Pasarelas y Agregadores de Pago",
    "aboutUs.fintech.cardProcessing":
      "Procesamiento de Tarjetas (Crédito/Débito)",
    "aboutUs.fintech.neoBanks": "Soluciones para NeoBancos",
    "aboutUs.fintech.coreBanking": "Sistemas Core Bancario y Auxiliares",
    "aboutUs.fintech.digitalLoans": "Préstamos Digitales (Originación/Gestión)",
    "aboutUs.fintech.openBanking": "APIs Financieras y Open Banking",
    "aboutUs.fintech.kyc": "KYC y Onboarding Digital Ágil",

    // Hero Section
    "softwareDev.hero.tag": "FÁBRICA DE DESARROLLO",
    "softwareDev.hero.title.main": "Desarrollo de Software",
    "softwareDev.hero.title.sub": "Impulsado por IA",
    "softwareDev.hero.description":
      "Creamos soluciones disruptivas que rompen el status quo usando las mejores tecnologías, IA nativa y metodologías centradas en el usuario para acelerar tu time-to-market.",
    "softwareDev.hero.cta.startProject": "Iniciar Proyecto",
    "softwareDev.hero.cta.techStack": "Conocer Stack Tech",

    "softwareDev.problems.sectionTitle": "Problemas que Resolvemos",
    "softwareDev.problems.sectionSubtitle":
      "Identificamos y eliminamos los obstáculos más comunes en el desarrollo de software que frenan la innovación y el crecimiento de las empresas.",
    "softwareDev.problems.slowDev.title": "Desarrollo Lento y Costoso",
    "softwareDev.problems.slowDev.description":
      "Proyectos que se extienden meses sin resultados, consumiendo presupuesto sin generar valor tangible para el negocio.",
    "softwareDev.problems.outdatedTech.title": "Tecnologías Obsoletas",
    "softwareDev.problems.outdatedTech.description":
      "Sistemas construidos con tecnologías desactualizadas que limitan el crecimiento y generan costos de mantenimiento elevados.",
    "softwareDev.problems.poorUX.title": "Experiencias Deficientes",
    "softwareDev.problems.poorUX.description":
      "Aplicaciones con interfaces confusas, flujos complejos y baja adopción por parte de usuarios finales.",
    "softwareDev.problems.noAI.title": "Falta de Integración con IA",
    "softwareDev.problems.noAI.description":
      "Soluciones que no aprovechan el potencial de la inteligencia artificial para automatizar procesos y mejorar decisiones.",
    "softwareDev.problems.noProductExpertise.title":
      "Equipos Sin Expertise en Producto",
    "softwareDev.problems.noProductExpertise.description":
      "Desarrollos técnicos sin visión estratégica que resultan en funcionalidades que no agregan valor al negocio.",
    "softwareDev.problems.noScalability.title": "Soluciones que No Escalan",
    "softwareDev.problems.noScalability.description":
      "Aplicaciones que fallan al crecer, generando cuellos de botella y limitando el potencial de expansión del negocio.",

    "softwareDev.benefits.sectionTitle": "Nuestro Enfoque Disruptivo",
    "softwareDev.benefits.sectionSubtitle":
      "Combinamos metodologías ágiles, tecnologías de vanguardia e IA nativa para crear soluciones que generan ventajas competitivas sostenibles.",
    "softwareDev.benefits.speed.title": "Speed to Market Acelerado",
    "softwareDev.benefits.speed.description":
      "Metodologías ágiles y gestión robusta que reducen hasta 40% los tiempos de desarrollo sin comprometer la calidad.",
    "softwareDev.benefits.ai.title": "IA Integrada Nativamente",
    "softwareDev.benefits.ai.description":
      "Incorporamos inteligencia artificial desde el diseño inicial, usando múltiples motores de IA para crear soluciones verdaderamente inteligentes.",
    "softwareDev.benefits.userCentric.title": "Diseño Centrado en Usuario",
    "softwareDev.benefits.userCentric.description":
      "Aplicamos Design Thinking, Design Sprint y Jobs to be Done para crear experiencias que realmente resuelven problemas reales.",
    "softwareDev.benefits.tech.title": "Tecnologías de Vanguardia",
    "softwareDev.benefits.tech.description":
      "Seleccionamos el stack tecnológico más funcional para cada proyecto, priorizando performance, escalabilidad y mantenibilidad.",
    "softwareDev.benefits.productManagement.title":
      "Gestión Robusta de Producto",
    "softwareDev.benefits.productManagement.description":
      "Equipo experto en producto que acompaña cada decisión estratégica, asegurando que cada feature agregue valor real al negocio.",
    "softwareDev.benefits.innovation.title": "Innovación Constante",
    "softwareDev.benefits.innovation.description":
      "Desafiamos el status quo en cada proyecto, buscando oportunidades para disrumpir y crear ventajas competitivas sostenibles.",

    // Tech Stack Section
    "softwareDev.techStack.sectionTitle": "Stack Tecnológico",
    "softwareDev.techStack.sectionSubtitle":
      "Seleccionamos las tecnologías más funcionales para cada proyecto, priorizando performance, escalabilidad y mantenibilidad a largo plazo.",
    "softwareDev.techStack.frontend.category": "Frontend",
    "softwareDev.techStack.backend.category": "Backend",
    "softwareDev.techStack.cloud.category": "Cloud & DevOps",
    "softwareDev.techStack.databases.category": "Databases",
    "softwareDev.techStack.ai.category": "IA & Machine Learning",
    "softwareDev.techStack.mobile.category": "Mobile",

    // Project Types Section
    "softwareDev.projectTypes.sectionTitle": "Tipos de Proyectos",
    "softwareDev.projectTypes.sectionSubtitle":
      "Desarrollamos una amplia gama de soluciones digitales, desde MVPs hasta sistemas enterprise complejos, siempre con IA integrada nativamente.",
    "softwareDev.projectTypes.webApps.title": "Web Apps Avanzadas",
    "softwareDev.projectTypes.webApps.description":
      "Plataformas SaaS, portales empresariales y aplicaciones web complejas",
    "softwareDev.projectTypes.webApps.example1": "Plataformas SaaS",
    "softwareDev.projectTypes.webApps.example2": "Portales de gestión",
    "softwareDev.projectTypes.webApps.example3": "Dashboards inteligentes",
    "softwareDev.projectTypes.mobileApps.title": "Apps Móviles Nativas",
    "softwareDev.projectTypes.mobileApps.description":
      "softwareDev.Aplicaciones iOS y Android de alto rendimiento con experiencias fluidas",
    "softwareDev.projectTypes.mobileApps.example1": "Apps nativas",
    "softwareDev.projectTypes.mobileApps.example2": "Apps híbridas",
    "softwareDev.projectTypes.mobileApps.example3": "Progressive Web Apps",
    "softwareDev.projectTypes.enterpriseSystems.title":
      "Sistemas Empresariales",
    "softwareDev.projectTypes.enterpriseSystems.description":
      "softwareDev.ERP, CRM y sistemas de gestión que optimizan operaciones complejas",
    "softwareDev.projectTypes.enterpriseSystems.example1": "Sistemas ERP",
    "softwareDev.projectTypes.enterpriseSystems.example2": "CRM avanzados",
    "softwareDev.projectTypes.enterpriseSystems.example3":
      "Workflows automatizados",
    "softwareDev.projectTypes.aiSolutions.title": "Soluciones con IA",
    "softwareDev.projectTypes.aiSolutions.description":
      "softwareDev.Chatbots inteligentes, ML personalizado y automatización cognitiva",
    "softwareDev.projectTypes.aiSolutions.example1": "Chatbots avanzados",
    "softwareDev.projectTypes.aiSolutions.example2": "ML personalizado",
    "softwareDev.projectTypes.aiSolutions.example3":
      "Automatización inteligente",
    "softwareDev.projectTypes.apis.title": "APIs & Microservicios",
    "softwareDev.projectTypes.apis.description":
      "softwareDev.Arquitecturas escalables para integraciones y ecosistemas digitales",
    "softwareDev.projectTypes.apis.example1": "APIs RESTful",
    "softwareDev.projectTypes.apis.example2": "Microservicios",
    "softwareDev.projectTypes.apis.example3": "Integraciones complejas",
    "softwareDev.projectTypes.ecommerce.title": "E-commerce & MarketPlaces",
    "softwareDev.projectTypes.ecommerce.description":
      "softwareDev.Plataformas de venta online con funcionalidades avanzadas",
    "softwareDev.projectTypes.ecommerce.example1": "Tiendas online",
    "softwareDev.projectTypes.ecommerce.example2": "Marketplaces",
    "softwareDev.projectTypes.ecommerce.example3": "Plataformas B2B",

    // Design Methodologies Section
    "softwareDev.methodologies.sectionTitle": "Metodologías de Diseño",
    "softwareDev.methodologies.sectionSubtitle":
      "Aplicamos las metodologías más efectivas según cada proyecto, siempre priorizando la experiencia del usuario y resultados medibles.",
    "softwareDev.methodologies.designThinking.title": "Design Thinking",
    "softwareDev.methodologies.designThinking.description":
      "Proceso centrado en el usuario para identificar y resolver problemas reales",
    "softwareDev.methodologies.designSprint.title": "Design Sprint",
    "softwareDev.methodologies.designSprint.description":
      "Metodología de 5 días para prototipar y validar ideas rápidamente",
    "softwareDev.methodologies.jobsToBeDone.title": "Jobs to be Done",
    "softwareDev.methodologies.jobsToBeDone.description":
      "Framework para entender las motivaciones reales de los usuarios",
    "softwareDev.methodologies.userResearch.title": "User Research & Testing",
    "softwareDev.methodologies.userResearch.description":
      "Investigación continua y testing para optimizar experiencias",
    "softwareDev.methodologies.prototyping.title": "Prototipado Rápido",
    "softwareDev.methodologies.prototyping.description":
      "Creación de prototipos funcionales para validar conceptos",
    "softwareDev.methodologies.iteration.title": "Iteración Continua",
    "softwareDev.methodologies.iteration.description":
      "Mejora constante basada en feedback y métricas reales",

    // Development Process Section
    "softwareDev.process.sectionTitle": "Proceso de Desarrollo",
    "softwareDev.process.sectionSubtitle":
      "Metodología estructurada de 5 fases que garantiza entregas de valor desde las primeras semanas, con gestión robusta y comunicación transparente.",
    "softwareDev.process.discovery.title": "Discovery & Strategy",
    "softwareDev.process.discovery.description":
      "Investigación profunda, definición de objetivos y arquitectura de la solución.",
    "softwareDev.process.design.title": "Design & Prototyping",
    "softwareDev.process.design.description":
      "Diseño de experiencia, interfaces y prototipos funcionales validados con usuarios.",
    "softwareDev.process.development.title": "Development & IA Integration",
    "softwareDev.process.development.description":
      "Desarrollo ágil con integración nativa de IA y mejores prácticas de coding.",
    "softwareDev.process.testing.title": "Testing & Optimization",
    "softwareDev.process.testing.description":
      "Testing exhaustivo, optimización de performance y preparación para producción.",
    "softwareDev.process.launch.title": "Launch & Continuous Evolution",
    "softwareDev.process.launch.description":
      "Lanzamiento supervisado y evolución continua basada en métricas y feedback.",

    "softwareDev.collaboration.sectionTitle": "Modelos de Colaboración",
    "softwareDev.collaboration.sectionSubtitle":
      "Ofrecemos flexibilidad total para adaptarnos a tus necesidades específicas, desde proyectos completos hasta refuerzo especializado.",
    "softwareDev.collaboration.turnkey.title": "Proyectos Llave en Mano",
    "softwareDev.collaboration.turnkey.description":
      "Solución completa desde la conceptualización hasta el lanzamiento",
    "softwareDev.collaboration.turnkey.feature1": "Equipo completo",
    "softwareDev.collaboration.turnkey.feature2": "Gestión end-to-end",
    "softwareDev.collaboration.turnkey.feature3": "Garantía de resultados",
    "softwareDev.collaboration.turnkey.feature4":
      "Transferencia de conocimiento",
    "softwareDev.collaboration.implants.title": "Implants Especializados",
    "softwareDev.collaboration.implants.description":
      "Refuerzo estratégico para tu equipo interno con expertise específico",
    "softwareDev.collaboration.implants.feature1": "Especialistas senior",
    "softwareDev.collaboration.implants.feature2": "Integración con tu equipo",
    "softwareDev.collaboration.implants.feature3": "Conocimiento específico",
    "softwareDev.collaboration.implants.feature4": "Flexibilidad total",

    "softwareDev.audience.sectionTitle": "¿Para Quién Desarrollamos?",
    "softwareDev.audience.sectionSubtitle":
      "Trabajamos con organizaciones de todos los tamaños que buscan acelerar su crecimiento a través de soluciones tecnológicas innovadoras.",
    "softwareDev.audience.startups.name": "Startups",
    "softwareDev.audience.startups.description":
      "MVP y escalabilidad rápida para validar ideas de negocio y conseguir inversión o crecimiento acelerado.",
    "softwareDev.audience.digitizingCompanies.name":
      "Empresas en Digitalización",
    "softwareDev.audience.digitizingCompanies.description":
      "Modernización de procesos, creación de canales digitales y optimización de operaciones existentes.",
    "softwareDev.audience.corporations.name": "Corporaciones",
    "softwareDev.audience.corporations.description":
      "Proyectos enterprise complejos, integraciones avanzadas y soluciones de gran escala con IA.",

    "softwareDev.testimonials.sectionTitle": "Casos de Éxito",
    "softwareDev.testimonials.sectionSubtitle":
      "Descubre cómo hemos ayudado a empresas a acelerar su crecimiento y crear ventajas competitivas a través de soluciones tecnológicas disruptivas.",
    "softwareDev.testimonials.testimonial1.quote":
      "En 3 meses lanzamos nuestro MVP con IA integrada. Su metodología nos permitió validar rápidamente y conseguir inversión serie A.",
    "softwareDev.testimonials.testimonial1.name": "Carlos Mendoza",
    "softwareDev.testimonials.testimonial1.company": "CEO - TechStartup",
    "softwareDev.testimonials.testimonial2.quote":
      "Transformaron completamente nuestra operación digital. El sistema que desarrollaron procesa 10x más transacciones que el anterior.",
    "softwareDev.testimonials.testimonial2.name": "Ana Rodríguez",
    "softwareDev.testimonials.testimonial2.company": "CTO - E-commerce Plus",
    "softwareDev.testimonials.testimonial3.quote":
      "Su enfoque disruptivo nos ayudó a crear una ventaja competitiva real. Nuestros clientes ahora tienen una experiencia única en el mercado.",
    "softwareDev.testimonials.testimonial3.name": "Roberto Silva",
    "softwareDev.testimonials.testimonial3.company": "VP Producto - InnovaCorp",

    "softwareDev.faq.sectionTitle": "Preguntas Frecuentes",
    "softwareDev.faq.sectionSubtitle":
      "Resolvemos las dudas más comunes sobre nuestro proceso de desarrollo y metodologías de trabajo.",
    "softwareDev.faq.item1.question":
      "¿Cuánto tiempo toma desarrollar una aplicación completa?",
    "softwareDev.faq.item1.answer":
      "Depende del alcance, pero nuestro enfoque acelerado permite entregar MVPs en 6-12 semanas y aplicaciones complejas en 3-6 meses. Usamos metodologías ágiles para entregar valor desde las primeras semanas.",
    "softwareDev.faq.item2.question":
      "¿Cómo integran la IA en los proyectos de desarrollo?",
    "softwareDev.faq.item2.answer":
      "Integramos IA nativamente desde el diseño inicial, no como add-on. Trabajamos con múltiples motores (OpenAI, Google AI, Azure AI) y desarrollamos ML personalizado según las necesidades específicas del proyecto.",
    "softwareDev.faq.item3.question":
      "¿Qué tecnologías usan para el desarrollo?",
    "softwareDev.faq.item3.answer":
      "Seleccionamos el stack más funcional para cada proyecto. Trabajamos con React, Vue, Angular en frontend; Node.js, Python, Java en backend; y clouds como AWS, Azure, GCP. Priorizamos performance y escalabilidad.",
    "softwareDev.faq.item4.question":
      "¿Cuál es la diferencia con otras fábricas de desarrollo?",
    "softwareDev.faq.item4.answer":
      "Nuestro enfoque disruptivo combina speed to market, IA nativa, diseño centrado en usuario y gestión robusta de producto. No solo desarrollamos, sino que creamos ventajas competitivas sostenibles.",
    "softwareDev.faq.item5.question": "¿Ofrecen soporte post-lanzamiento?",
    "softwareDev.faq.item5.answer":
      "Sí, incluimos soporte durante el lanzamiento y ofrecemos planes de evolución continua. Monitoreamos métricas, optimizamos performance y agregamos features basadas en feedback real de usuarios.",

    "softwareDev.finalCta.title.main": "¿Listo para",
    "softwareDev.finalCta.title.highlighted": "Acelerar",
    "softwareDev.finalCta.title.end": "tu Desarrollo?",
    "softwareDev.finalCta.subtitle":
      "Construye tu visión con velocidad, excelencia y tecnologías de vanguardia. Comencemos a crear tu ventaja competitiva.",
    "softwareDev.finalCta.button": "Acelerar mi Desarrollo",
    "softwareDev.finalCta.feature1": "Speed to Market",
    "softwareDev.finalCta.feature2": "IA Nativa",
    "softwareDev.finalCta.feature3": "Gestión Robusta",

    "softwareDev.form.title": "Iniciar Proyecto de Desarrollo",
    "softwareDev.form.subtitle":
      "Cuéntanos sobre tu proyecto para crear una propuesta personalizada con tecnologías de vanguardia.",
    "softwareDev.form.nameLabel": "Nombre completo",
    "softwareDev.form.namePlaceholder": "Tu nombre completo",
    "softwareDev.form.emailLabel": "Email",
    "softwareDev.form.emailPlaceholder": "tu@empresa.com",
    "softwareDev.form.phoneLabel": "Teléfono",
    "softwareDev.form.phonePlaceholder": "+52 123 456 7890",
    "softwareDev.form.companyLabel": "Empresa",
    "softwareDev.form.companyPlaceholder": "Nombre de tu empresa",
    "softwareDev.form.projectLabel": "Describe tu proyecto",
    "softwareDev.form.projectPlaceholder":
      "Ej: App móvil con IA para gestión de inventarios, integración con sistemas ERP, dashboard analytics...",
    "softwareDev.form.submitButton": "Iniciar Desarrollo",
    "softwareDev.form.successTitle": "¡Proyecto Recibido!",
    "softwareDev.form.successMessage":
      "Nuestro equipo técnico revisará tu proyecto y te contactará en las próximas 24 horas.",
    "softwareDev.form.successClosingMessage":
      "El modal se cerrará automáticamente en unos segundos...",
    "softwareDev.form.successCloseButton": "Cerrar ahora",
    "softwareDev.form.closeAriaLabel": "Cerrar formulario",

    "softwareDev.whatsapp.ariaLabel": "Contactar por WhatsApp",
    "softwareDev.whatsapp.url":
      "https://wa.me/525616026685?text=Hola%20Aurhora!%0A%0AVisite%20su%20sitio%20web%20y%20me%20interesa%20conocer%20mas%20sobre%20su%20fabrica%20de%20desarrollo%20de%20software.%0A%0ATengo%20un%20proyecto%20en%20mente%20y%20me%20gustaria%20discutir%3A%0A%0A-%20Desarrollo%20con%20IA%20integrada%0A-%20Tecnologias%20de%20vanguardia%0A-%20Speed%20to%20market%0A-%20Metodologias%20agiles%0A%0ACuando%20podriamos%20agendar%20una%20reunion%20para%20discutir%20mi%20proyecto%3F",
    "softwareDev.whatsapp.tooltip": "¡Desarrollo con IA!",
  },
  "en-US": {
    // Header
    "header.inicio": "Home",
    "header.quienesSomos": "About Us",
    "header.recursos": "Resources",
    "header.servicios": "Services",
    "header.contacto": "Contact",
    "header.login": "Login",
    "header.cambiarIdioma": "Change language",
    "header.idioma": "Language",

    // Hero Section
    "hero.title": "Driving",
    "hero.innovation": "Innovation",
    "hero.subtitle": "Results that Transform.",
    "hero.description":
      "Aurhora Agency: Your strategic partner in digital transformation and process optimization. We integrate vision, technology, and expert execution to maximize your potential.",
    "hero.startTransformation": "Start your Transformation",
    "hero.exploreServices": "Explore Services",
    "hero.experience":
      "+10 years driving innovation | Insurance | Banking | Fintech",

    // Services Section
    "services.title": "Our Strategic Capabilities",
    "services.description":
      "From strategy to implementation and evolution, we cover the full spectrum of transformation.",

    // Philosophy Section
    "philosophy.title": "Our Philosophy",
    "philosophy.description":
      "We don't just solve problems, we co-create the future. We integrate strategy, talent, and technology to drive real digital transformation and measurable results.",
    "philosophy.item1.title": "Integral Management",
    "philosophy.item1.description":
      "We connect and manage the precise talent and tools (internal/external) for each challenge, ensuring synergistic and efficient execution.",
    "philosophy.item2.title": "Intelligent Co-creation",
    "philosophy.item2.description":
      "We work with you. We merge your business knowledge with our experience in innovation and transformation methodologies.",
    "philosophy.item3.title": "Solution-Oriented",
    "philosophy.item3.description":
      "We focus on finding the most effective and pragmatic ways to achieve your goals, overcoming challenges with a solution-oriented approach.",

    // CTA Section
    "cta.title": "Ready to",
    "cta.impulse": "Drive",
    "cta.vision": "your Vision?",
    "cta.description":
      "Let's talk about your challenges and explore how Aurhora Agency can be the strategic partner that accelerates your results.",
    "cta.scheduleSession": "Schedule your Strategic Session",
    "cta.contact": "Or contact us directly:",

    // Contact Modal
    "contact.title": "Contact Us",
    "contact.description": "Fill out the form to schedule your session.",
    "contact.name": "Full Name",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.company": "Company",
    "contact.message": "Message",
    "contact.send": "Send Request",
    "contact.sent": "Message Sent!",
    "contact.thanks":
      "Thank you for your interest. We will contact you shortly.",
    "contact.required":
      "Please fill in the required fields: Name, Email, and Message.",

    // About Section
    "about.experience": "Our Experience",
    "about.title1": "Transforming Businesses",
    "about.title2": "Without Sector Limits",
    "about.description1":
      "Our comprehensive management methodology and solution-focused approach is inherently adaptable, allowing us to generate significant value in virtually any industry. We complement our expert core with an extensive network of sector specialists to ensure the deep knowledge required for each project.",
    "about.description2":
      "We have an outstanding track record and proven success cases in Insurance, Banking, and Fintech. We work closely with both SMEs, startups, and growing companies as well as large corporations, adapting our approach to maximize the unique potential of each organization.",
    "about.principlesTitle": "Key Principles:",
    "about.principle1": "Genuine Co-creation and Collaboration",
    "about.principle2": "Pragmatic and Measurable Results",
    "about.principle3": "Solution-Oriented and Resolution-Focused Approach",
    "about.yearsExperience": "Years of Experience",
    "about.projects": "Projects",
    "about.clients": "Clients",
    "about.trustResults": "Trust and Results",
    "about.trustDescription":
      "We build lasting strategic relationships. We will soon share success stories.",

    // Transformation Process
    "process.title": "Our Transformation Process",
    "process.description":
      "A collaborative 5-phase methodology, from vision to continuous evolution.",
    "process.step1.title": "Diagnosis and Opportunity",
    "process.step1.description":
      "Deep immersion to understand context, challenges, and innovation opportunities.",
    "process.step2.title": "Strategy and Co-Design",
    "process.step2.description":
      "Co-creation of vision, strategic roadmap, and design of transformative solutions.",
    "process.step3.title": "Action Plan and Enablement",
    "process.step3.description":
      "Delivery of detailed plan, team preparation, and technological enablement.",
    "process.step4.title": "Implementation and Development",
    "process.step4.description":
      "We lead execution, build technological solutions, and manage organizational change from within.",
    "process.step5.title": "Continuous Improvement and Evolution",
    "process.step5.description":
      "Results measurement, agile iteration, constant optimization, and support for change sustainability.",

    // Form placeholders
    "form.namePlaceholder": "Your full name",
    "form.emailPlaceholder": "you@example.com",
    "form.phonePlaceholder": "Optional",
    "form.companyPlaceholder": "Your company name (Optional)",
    "form.messagePlaceholder":
      "Tell us about your project or how we can help you...",

    // Services Cards
    "services.godigital.title": "GoDigital Suite",
    "services.godigital.description":
      'Comprehensive "turnkey" digital ecosystem with professional online presence and client management. Implementation in 1-2 weeks.',
    "services.godigital.linkText": "Learn about GoDigital",

    "services.transformation.title":
      "Innovation and Digital Transformation Strategy",
    "services.transformation.description":
      "We co-create your technological and digital roadmap, identifying innovation opportunities to accelerate results.",
    "services.transformation.linkText": "Drive Innovation",

    "services.development.title": "Software and Digital Product Development",
    "services.development.description":
      "We design, build, and deploy custom software and innovative digital products that enhance your strategy.",
    "services.development.linkText": "Explore Development",

    "services.optimization.title": "Process Optimization and Quality",
    "services.optimization.description":
      "We design and implement QMS (e.g., ISO), optimizing your operation for excellence and certifications.",
    "services.optimization.linkText": "Discover Optimization",

    "services.marketing.title": "Digital Marketing and Growth",
    "services.marketing.description":
      "We define and manage digital marketing strategies to launch and position your products and services.",
    "services.marketing.linkText": "View Strategies",

    "services.agile.title": "Agile Culture and Organizational Transformation",
    "services.agile.description":
      "We work from within with your teams to implement agile methodologies, manage change, and foster a sustainable innovation culture.",
    "services.agile.linkText": "Transform Teams",

    // Footer
    "footer.tagline": "Driving Innovation, Results that Transform.",
    "footer.legal": "Legal",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms and Conditions",
    "footer.follow": "Follow Us",
    "footer.copyright": "Aurhora Agency. All rights reserved.",
    "footer.designed": "Designed with",
    "footer.by": "by Aurhora Team",

    // Login Page
    "login.title": "Sign In",
    "login.email": "Email",
    "login.password": "Password",
    "login.emailPlaceholder": "you@email.com",
    "login.passwordPlaceholder": "••••••••",
    "login.rememberMe": "Remember me",
    "login.forgotPassword": "Forgot your password?",
    "login.access": "Access",
    "login.loggingIn": "Signing in...",
    "login.noAccount": "Don't have an account?",
    "login.signUp": "Sign up",
    "login.tagline":
      "Intelligent digital transformation for companies leading the future",
    "login.secure": "Secure",
    "login.fast": "Fast",
    "login.global": "Global",

    // GoDigital Suite Page
    "godigital.ourStarSuite": "OUR STAR SUITE",
    "godigital.title": "Aurhora GoDigital Suite",
    "godigital.subtitle":
      "Your Business for the Digital Era, Simple and Complete.",
    "godigital.description":
      'The comprehensive "turnkey" digital ecosystem that transforms your online presence and optimizes your business management. Focused on continuous digital transformation.',
    "godigital.discoverPlans": "Discover Plans",
    "godigital.scheduleFreeDemo": "Schedule Free Demo",
    "godigital.challengesTitle":
      "Does your business face these digital challenges?",
    "godigital.challengesSubtitle":
      "GoDigital Suite is designed to turn these obstacles into growth and efficiency opportunities.",
    "godigital.strategicBenefitsTitle":
      "Strategic Benefits: More than Technology, Concrete Results",
    "godigital.strategicBenefitsSubtitle":
      "Discover how GoDigital Suite drives your business toward success in the digital environment.",
    "godigital.processTitle":
      "Our Process: Your Digital Transformation Step by Step",
    "godigital.processSubtitle":
      "We accompany you at every stage to ensure successful implementation adapted to your needs.",
    "godigital.plansTitle": "Plans Designed for your Digital Growth",
    "godigital.plansSubtitle":
      "Choose the plan that best fits your business. All include implementation, expert guidance, and the promise of transformation.",
    "godigital.addonsTitle": "Power your Suite with Strategic Add-ons",
    "godigital.addonsSubtitle":
      "Our Add-ons are modular solutions designed to enable various operational needs of your business, compatible from the Basic Package.",
    "godigital.targetTitle": "Who is GoDigital Suite for?",
    "godigital.targetSubtitle":
      "If you seek to digitally transform your business, consolidate your online presence, and optimize your operations, this suite is for you.",
    "godigital.testimonialsTitle": "What Our Satisfied Customers Say",
    "godigital.testimonialsSubtitle":
      "Real stories of transformation and growth with GoDigital Suite.",
    "godigital.faqTitle": "Frequently Asked Questions",
    "godigital.faqSubtitle":
      "We resolve your doubts so you can make the best decision for your business.",
    "godigital.ctaTitle": "Ready to transform your business?",
    "godigital.ctaSubtitle":
      "Take the first step toward an impactful digital presence and optimized operations. Our team of experts is ready to help you.",
    "godigital.startNow": "Start Now",
    "godigital.scheduleFreeConsultation": "Schedule Free Consultation",
    "godigital.fastImplementation": "Express Implementation: 1-2 weeks",
    "godigital.continuousSupport": "Warranty and Continuous Support",
    "godigital.expertAdvice": "Personalized Expert Advice",
    "godigital.popular": "MOST POPULAR",
    "godigital.chooseThisPlan": "Choose this Plan",
    "godigital.continueWithPlan": "Continue with this Plan",
    "godigital.fromPrice": "From",
    "godigital.taxesNotIncluded": "Taxes not included. Check details.",
    "godigital.closeForm": "Close form",

    // GoDigital Strategic Benefits
    "godigital.benefits.strengthening.title":
      "Image and Credibility Strengthening",
    "godigital.benefits.strengthening.description":
      "Modern, responsive and secure websites (SSL) with basic SEO for greater visibility and trust.",
    "godigital.benefits.efficiency.title":
      "Operational Efficiency Optimization",
    "godigital.benefits.efficiency.description":
      "From a professional contact channel to advanced appointment management and a mini-CRM for superior tracking.",
    "godigital.benefits.agile.title":
      "Agile Implementation and Comprehensive Consulting",
    "godigital.benefits.agile.description":
      "Optimized timeframes (1-2 weeks post-approval) with technical management and configuration by Aurhora Agency.",
    "godigital.benefits.scalable.title":
      "Scalable and Modular Technology Solution",
    "godigital.benefits.scalable.description":
      "Three base packages and a wide range of add-ons to customize and expand according to your business evolution.",
    "godigital.benefits.costEffective.title": "Superior Cost-Benefit Ratio",
    "godigital.benefits.costEffective.description":
      "High-value offer that combines robust technology with expert consulting at a competitive price.",
    "godigital.benefits.support.title":
      "Workload Reduction and Continuous Support",
    "godigital.benefits.support.description":
      "We handle configuration and assembly, with hosting, maintenance and support included.",

    // GoDigital Problems Solved
    "godigital.problems.digitalPresence.title":
      "Limited or Non-existent Digital Presence",
    "godigital.problems.digitalPresence.description":
      "Overcome the lack of a professional web platform or robust social profiles that impact your credibility and reach.",
    "godigital.problems.valueComm.title": "Ineffective Value Communication",
    "godigital.problems.valueComm.description":
      "We facilitate clear and professional presentation of your offer, including validation through testimonials and success stories.",
    "godigital.problems.interaction.title":
      "Decentralized Interaction Management",
    "godigital.problems.interaction.description":
      "Automate and centralize appointment and consultation management, eliminating inefficient manual processes and improving follow-up.",
    "godigital.problems.processes.title": "Manual and Slow Operating Processes",
    "godigital.problems.processes.description":
      "Digitize key operating processes to improve your response capacity and overall business efficiency.",
    "godigital.problems.complexity.title":
      "Overwhelming Technological Complexity",
    "godigital.problems.complexity.description":
      "We reduce the barriers of complexity, cost and time associated with implementing digital solutions. An alternative to self-management.",
    "godigital.problems.scaling.title": "Difficulty Scaling your Business",
    "godigital.problems.scaling.description":
      "We provide you with the digital tools necessary for sustained growth and continuous improvement of your services.",

    // GoDigital Target Audience
    "godigital.target.freelancers.name":
      "Independent Professionals and Entrepreneurs",
    "godigital.target.freelancers.description":
      "Consultants, coaches, therapists, designers, and more, who seek to consolidate their personal brand and optimize client acquisition and management.",
    "godigital.target.smes.name": "Small and Medium Enterprises (SMEs)",
    "godigital.target.smes.description":
      "Growing businesses or those in the process of digitization that need a robust online presence and tools to manage interactions and clients efficiently.",
    "godigital.target.variousSectors.name": "Various Sectors",
    "godigital.target.variousSectors.description":
      "Adaptable to professional services (consulting, legal), health, education, technical trades, aesthetics, and small commerce with scheduling needs.",

    // GoDigital Implementation Process Steps
    "godigital.processSteps.onboarding.title": "1. Onboarding and Kick-off",
    "godigital.processSteps.onboarding.description":
      "Initial session to understand your needs, align expectations and define next steps. We collect essential information in a structured way.",
    "godigital.processSteps.content.title":
      "2. Content Structuring and Branding",
    "godigital.processSteps.content.description":
      "We advise you to organize your content and apply your brand (or guide you in basic branding). We present a proposal for your review.",
    "godigital.processSteps.technical.title": "3. Technical Implementation",
    "godigital.processSteps.technical.description":
      "We assemble your digital ecosystem (website, scheduling, CRM according to plan) applying the template, your branding and content. We perform exhaustive internal testing.",
    "godigital.processSteps.review.title": "4. Review and Approval",
    "godigital.processSteps.review.description":
      "We present the site in a review environment. You have a period for consolidated feedback and we make included minor adjustments.",
    "godigital.processSteps.delivery.title": "5. Final Delivery and Training",
    "godigital.processSteps.delivery.description":
      "We launch your site! We deliver access and train you (according to package) to manage your new platform. Includes post-launch support.",

    // GoDigital Plans
    "godigital.plans.basic.title": "Basic",
    "godigital.plans.basic.description":
      "Professional and informative digital presence. Ideal to start.",
    "godigital.plans.basic.feature.websiteInfo":
      "Informative Website (Landing Page or Simple Multi-section)",
    "godigital.plans.basic.feature.responsiveDesign":
      "Modern and responsive design",
    "godigital.plans.basic.feature.contact": "Contact Form",
    "godigital.plans.basic.feature.social": "Social Media Integration",
    "godigital.plans.basic.feature.sslIncluded": "SSL Certificate included",
    "godigital.plans.basic.feature.seoInitial": "Initial basic SEO",
    "godigital.plans.basic.feature.hostingBasic":
      "Basic hosting and maintenance",
    "godigital.plans.basic.feature.pagesUpTo5": "Up to 5 standard pages",

    "godigital.plans.professional.title": "Professional",
    "godigital.plans.professional.description":
      "Optimize appointment and interaction management. Elevate your efficiency.",
    "godigital.plans.professional.feature.allBasic":
      "Everything from the Basic Package",
    "godigital.plans.professional.feature.schedulingSystem":
      "Integrated Appointment Scheduling System (Calendly-type)",
    "godigital.plans.professional.feature.availabilityConfig":
      "Availability and services configuration",
    "godigital.plans.professional.feature.calendarSync":
      "Personal calendar synchronization",
    "godigital.plans.professional.feature.emailConfirmations":
      "Automatic email confirmations",
    "godigital.plans.professional.feature.pagesUpTo10": "Up to 10 pages",
    "godigital.plans.professional.feature.prioritySupport": "Priority support",

    "godigital.plans.360.title": "360",
    "godigital.plans.360.description":
      "Comprehensive solution with client management tools.",
    "godigital.plans.360.feature.allProfessional":
      "Everything from the Professional Package",
    "godigital.plans.360.feature.miniCrm":
      "Mini-CRM (Basic Customer Relationship Management)",
    "godigital.plans.360.feature.adminPanel": "Web Administration Panel",
    "godigital.plans.360.feature.contactDataFields":
      "Contact data registration and customizable fields",
    "godigital.plans.360.feature.interactionHistory":
      "Interaction History and Notes per Client",
    "godigital.plans.360.feature.documentManagement":
      "Document Management per Client",
    "godigital.plans.360.feature.unlimitedPages": "Unlimited pages",
    "godigital.plans.360.feature.monthlyConsulting":
      "Monthly consulting included",

    // GoDigital Add-ons
    "godigital.addonsList.onlinePayments.name":
      "Online Payments for Appointments",
    "godigital.addonsList.onlinePayments.price": "+$99/month",
    "godigital.addonsList.onlinePayments.description":
      "Allows your clients to pay when scheduling.",
    "godigital.addonsList.billing.name": "Simplified Billing Module",
    "godigital.addonsList.billing.price": "+$149/month",
    "godigital.addonsList.billing.description":
      "Generate basic invoices from your platform.",
    "godigital.addonsList.advancedReminders.name":
      "Advanced Reminders (SMS/WhatsApp)",
    "godigital.addonsList.advancedReminders.price": "+$79/month",
    "godigital.addonsList.advancedReminders.description":
      "Reduce no-shows with automatic reminders.",
    "godigital.addonsList.blog.name": "Simple Integrated Blog",
    "godigital.addonsList.blog.price": "+$59/month",
    "godigital.addonsList.blog.description":
      "Share valuable content and improve your SEO.",
    "godigital.addonsList.galleries.name": "Advanced Image Galleries",
    "godigital.addonsList.galleries.price": "+$49/month",
    "godigital.addonsList.galleries.description":
      "Show your work with visual portfolios.",
    "godigital.addonsList.multiLanguage.name": "Multi-language Support",
    "godigital.addonsList.multiLanguage.price": "+$129/month",
    "godigital.addonsList.multiLanguage.description":
      "Expand your reach to international audiences.",

    // GoDigital Testimonials
    "godigital.testimonialsList.anaPerez.quote":
      "GoDigital Suite transformed our way of interacting with clients. The process was fast and the Aurhora team, exceptional.",
    "godigital.testimonialsList.anaPerez.name": "Ana Pérez",
    "godigital.testimonialsList.anaPerez.company": "Creative Consulting",
    "godigital.testimonialsList.carlosLopez.quote":
      "Since we implemented the scheduling solution, we have saved hours of administrative work. Totally recommended!",
    "godigital.testimonialsList.carlosLopez.name": "Carlos López",
    "godigital.testimonialsList.carlosLopez.company":
      "Health and Integral Wellness",
    "godigital.testimonialsList.sofiaMartinez.quote":
      "The Mini-CRM is just what we needed to organize our client information. A before and after.",
    "godigital.testimonialsList.sofiaMartinez.name": "Sofía Martínez",
    "godigital.testimonialsList.sofiaMartinez.company": "SM Design Studio",

    // GoDigital FAQ
    "godigital.faqList.item1.q":
      "How quickly can I have my website and system running?",
    "godigital.faqList.item1.a":
      "Our implementation process is optimized to be agile. Generally, after receiving all your information and approval of content and structure, we can have your Basic Package ready in approximately 1 week, and the Professional or 360 Packages in 1-2 weeks, depending on complexity and selected add-ons.",
    "godigital.faqList.item2.q": "Do I need technical knowledge?",
    "godigital.faqList.item2.a":
      "Not at all! GoDigital Suite is a 'turnkey' solution. We handle all technical configuration, design (based on professional templates we customize with your brand) and launch. We deliver your digital ecosystem ready to use and offer basic training so you can manage it.",
    "godigital.faqList.item3.q":
      "What if my business grows and I need more features?",
    "godigital.faqList.item3.a":
      "GoDigital Suite is designed to scale with you. You can start with one package and then upgrade it, or add specific features through our Add-ons catalog at any time. Our goal is for technology to adapt to your changing needs.",
    "godigital.faqList.item4.q":
      "What exactly does the 'From X' price include?",
    "godigital.faqList.item4.a":
      "The 'From X' price is a starting point and can vary significantly depending on the payment scheme you choose when contracting. We offer flexibility with options such as one-time implementation payments, monthly payments (which can be lower if combined with an initial payment), or annual plans with additional benefits. This structure allows us to adapt the investment to your specific needs and the value that the Suite will bring you. An Aurhora Agency executive will personally accompany you to detail all options, understand your requirements and help you configure the plan and payment scheme that best fits your business during a personalized consultation.",
    "godigital.faqList.item5.q": "What type of support do you offer?",
    "godigital.faqList.item5.a":
      "All plans include basic technical support and a post-launch warranty period to correct any technical errors attributable to Aurhora. For more continuous or priority support needs, we offer additional technical support policies and consulting.",

    // About Us Page
    "aboutUs.badge": "Meet Us",
    "aboutUs.heroTitle1": "Orchestrating Transformation",
    "aboutUs.heroTitle2": "with Experience and Co-creation",
    "aboutUs.heroDescription":
      "At Aurhora Agency, we combine the agility of a young company with the deep experience of a team of professionals who have led the technological vanguard in multiple industries for more than 15 years. We are your strategic partners in managing and integrating solutions that drive real change.",
    "aboutUs.scheduleStrategicSession": "Schedule Strategic Session",

    // Our Essence
    "aboutUs.heartBadge": "The Heart of Aurhora",
    "aboutUs.essenceTitle1": "Young in Spirit,",
    "aboutUs.essenceTitle2": "Giants in Experience",
    "aboutUs.essenceDescription1":
      "Aurhora Agency was born from the conviction that true digital transformation requires more than just technology; it needs vision, expert management and a deep understanding of business. Although we are a recently created agency, our management team and principal consultants accumulate more than 15 years of experience leading complex and successful projects in large corporations and innovative startups.",
    "aboutUs.essenceDescription2":
      "This duality allows us to offer the freshness and adaptability of a new era, backed by the knowledge and solidity of those who have navigated and shaped technological evolution in key sectors.",
    "aboutUs.experienceYears": "+15 Years of Experience",
    "aboutUs.experienceSubtitle": "Leading transformation in the industry.",
    "aboutUs.essenceQuote":
      '"We merge innovative agility with the wisdom of experience."',

    // Orchestration
    "aboutUs.orchestrationTitle": "The Art of Strategic Orchestration",
    "aboutUs.orchestrationDescription":
      'Our unique capability lies in knowing both large corporations and startups from their roots. This perspective allows us to consolidate multidisciplinary teams of experts who not only understand diverse sectors, but know how to "tropicalize" functionalities, migrating the best from each world to create innovative and tailored solutions for our clients.',
    "aboutUs.expertOrchestration": "Expert Orchestration",
    "aboutUs.expertOrchestrationDesc":
      "We are masters in managing and integrating complex solutions, connecting talent and technology for synergistic and efficient results.",
    "aboutUs.multidisciplinaryTeams": "Multidisciplinary Teams",
    "aboutUs.multidisciplinaryTeamsDesc":
      "Our strength lies in the diversity of our experts, coming from multiple sectors, which allows us a 360° vision of each challenge.",
    "aboutUs.tropicalizationInnovation": 'Innovation through "Tropicalization"',
    "aboutUs.tropicalizationInnovationDesc":
      "We adapt and migrate successful functionalities from one sector to another, taking the best from each world to propose fresh and disruptive solutions.",

    // Insurance
    "aboutUs.sectoralStrengthBadge": "Our Sectoral Strength",
    "aboutUs.insuranceTitle": "Experts in the Insurance Ecosystem (InsurTech)",
    "aboutUs.insuranceDescription1":
      "We have deep knowledge of the Mexican and Latin American insurance industry. We have collaborated with the country's main insurers, developing and integrating technological solutions throughout their value chain.",
    "aboutUs.insuranceDescription2":
      "Our experience spans a wide range of products and business lines, allowing us to offer innovative perspectives and pragmatic solutions that respond to the specific challenges of the sector.",

    // Fintech
    "aboutUs.fintechTitle": "Drivers of Innovation in Fintech",
    "aboutUs.fintechDescription1":
      "The financial sector is constantly evolving, and at Aurhora Agency we are at the forefront. We have worked with traditional banks, disruptive startups and neoBanks, creating from robust mobile banks to agile integration of payment aggregators.",
    "aboutUs.fintechDescription2":
      "We understand the security, regulatory and user experience challenges that define the Fintech sector, and we provide solutions that combine technological innovation with deep knowledge of the financial business.",

    // Co-creation
    "aboutUs.cocreationTitle": "Co-creation: The Pillar of Genuine Solutions",
    "aboutUs.cocreationDescription1":
      "We firmly believe that the most impactful solutions are born from close collaboration. Our co-creation approach means we work hand in hand with you, merging your deep business knowledge with our experience in management, integration and technology.",
    "aboutUs.cocreationDescription2":
      "This collaborative process allows us to go beyond generic solutions, designing and implementing truly personalized strategies and tools that 100% address the unique needs and objectives of your organization, ensuring real and measurable impact.",

    // Final CTA
    "aboutUs.ctaTitle": "Ready for our experience to drive your vision?",
    "aboutUs.ctaDescription":
      "Let us be the architects of your next great transformation. Let's talk about your challenges and explore together how Aurhora Agency can be the strategic partner you need.",
    "aboutUs.scheduleStrategicSessionCta": "Schedule a Strategic Session",

    // Insurance Expertise List
    "aboutUs.insurance.medicalExpenses":
      "Major Medical Expenses (Individual & Group)",
    "aboutUs.insurance.auto": "Auto (Personal, Fleet, Public Service)",
    "aboutUs.insurance.life": "Life (Traditional, Investment, Educational)",
    "aboutUs.insurance.property": "Property (Home, Commercial, Liability)",
    "aboutUs.insurance.savings": "Savings and Retirement Products",
    "aboutUs.insurance.claims": "Comprehensive Claims Management",
    "aboutUs.insurance.underwriting": "Digital Underwriting and Issuance",
    "aboutUs.insurance.channels": "Digital Channels and Direct Sales",

    // Fintech Expertise List
    "aboutUs.fintech.mobileBanking": "Mobile Banking Development",
    "aboutUs.fintech.paymentGateways": "Payment Gateways and Aggregators",
    "aboutUs.fintech.cardProcessing": "Card Processing (Credit/Debit)",
    "aboutUs.fintech.neoBanks": "NeoBank Solutions",
    "aboutUs.fintech.coreBanking": "Core Banking and Auxiliary Systems",
    "aboutUs.fintech.digitalLoans": "Digital Loans (Origination/Management)",
    "aboutUs.fintech.openBanking": "Financial APIs and Open Banking",
    "aboutUs.fintech.kyc": "KYC and Agile Digital Onboarding",
  },
  "pt-BR": {
    // Header
    "header.inicio": "Início",
    "header.quienesSomos": "Quem Somos",
    "header.recursos": "Recursos",
    "header.servicios": "Serviços",
    "header.contacto": "Contato",
    "header.login": "Entrar",
    "header.cambiarIdioma": "Mudar idioma",
    "header.idioma": "Idioma",

    // Hero Section
    "hero.title": "Impulsionando a",
    "hero.innovation": "Inovação",
    "hero.subtitle": "Resultados que Transformam.",
    "hero.description":
      "Aurhora Agency: Seu parceiro estratégico em transformação digital e otimização de processos. Integramos visão, tecnologia e execução especializada para maximizar seu potencial.",
    "hero.startTransformation": "Inicie sua Transformação",
    "hero.exploreServices": "Explorar Serviços",
    "hero.experience":
      "+10 anos impulsionando inovação | Seguros | Bancos | Fintech",

    // Services Section
    "services.title": "Nossas Capacidades Estratégicas",
    "services.description":
      "Da estratégia à implementação e evolução, cobrimos todo o espectro da transformação.",

    // Philosophy Section
    "philosophy.title": "Nossa Filosofia",
    "philosophy.description":
      "Não apenas resolvemos problemas, co-criamos o futuro. Integramos estratégia, talento e tecnologia para impulsionar uma transformação digital real e resultados mensuráveis.",
    "philosophy.item1.title": "Gestão Integral",
    "philosophy.item1.description":
      "Conectamos e gerenciamos o talento e as ferramentas precisas (internas/externas) para cada desafio, garantindo execução sinérgica e eficiente.",
    "philosophy.item2.title": "Co-criação Inteligente",
    "philosophy.item2.description":
      "Trabalhamos com você. Fundimos seu conhecimento do negócio com nossa experiência em metodologias de inovação e transformação.",
    "philosophy.item3.title": "Orientação a Soluções",
    "philosophy.item3.description":
      "Focamos em encontrar as formas mais eficazes e pragmáticas para alcançar suas metas, superando desafios com uma abordagem orientada a soluções.",

    // CTA Section
    "cta.title": "Pronto para",
    "cta.impulse": "Impulsionar",
    "cta.vision": "sua Visão?",
    "cta.description":
      "Vamos conversar sobre seus desafios e explorar como a Aurhora Agency pode ser o parceiro estratégico que acelera seus resultados.",
    "cta.scheduleSession": "Agende sua Sessão Estratégica",
    "cta.contact": "Ou entre em contato diretamente:",

    // Contact Modal
    "contact.title": "Entre em Contato",
    "contact.description": "Preencha o formulário para agendar sua sessão.",
    "contact.name": "Nome Completo",
    "contact.email": "Email",
    "contact.phone": "Telefone",
    "contact.company": "Empresa",
    "contact.message": "Mensagem",
    "contact.send": "Enviar Solicitação",
    "contact.sent": "Mensagem Enviada!",
    "contact.thanks":
      "Obrigado pelo seu interesse. Entraremos em contato em breve.",
    "contact.required":
      "Por favor, preencha os campos obrigatórios: Nome, Email e Mensagem.",

    // About Section
    "about.experience": "Nossa Experiência",
    "about.title1": "Transformando Negócios",
    "about.title2": "Sem Limites Setoriais",
    "about.description1":
      "Nossa metodologia de gestão integral e foco em soluções é inerentemente adaptável, permitindo gerar valor significativo em praticamente qualquer indústria. Complementamos nosso núcleo especializado com uma ampla rede de especialistas setoriais para garantir o conhecimento profundo necessário em cada projeto.",
    "about.description2":
      "Temos uma trajetória destacada e casos de sucesso comprováveis em Seguros, Bancos e Fintech. Colaboramos estreitamente tanto com PMEs, startups e empresas em crescimento quanto com grandes corporações, adaptando nossa abordagem para maximizar o potencial único de cada organização.",
    "about.principlesTitle": "Princípios Chave:",
    "about.principle1": "Co-criação e Colaboração Genuína",
    "about.principle2": "Resultados Pragmáticos e Mensuráveis",
    "about.principle3": "Abordagem Resolutiva e Orientada a Soluções",
    "about.yearsExperience": "Anos de Experiência",
    "about.projects": "Projetos",
    "about.clients": "Clientes",
    "about.trustResults": "Confiança e Resultados",
    "about.trustDescription":
      "Construímos relações estratégicas duradouras. Em breve compartilharemos casos de sucesso.",

    // Transformation Process
    "process.title": "Nosso Processo de Transformação",
    "process.description":
      "Uma metodologia colaborativa em 5 fases, da visão à evolução contínua.",
    "process.step1.title": "Diagnóstico e Oportunidade",
    "process.step1.description":
      "Imersão profunda para entender contexto, desafios e oportunidades de inovação.",
    "process.step2.title": "Estratégia e Co-Design",
    "process.step2.description":
      "Co-criação da visão, roadmap estratégico e design de soluções transformadoras.",
    "process.step3.title": "Plano de Ação e Habilitação",
    "process.step3.description":
      "Entrega do plano detalhado, preparação de equipes e habilitação tecnológica.",
    "process.step4.title": "Implementação e Desenvolvimento",
    "process.step4.description":
      "Lideramos a execução, construímos as soluções tecnológicas e gerenciamos a mudança organizacional de dentro para fora.",
    "process.step5.title": "Melhoria e Evolução Contínua",
    "process.step5.description":
      "Medição de resultados, iteração ágil, otimização constante e suporte para a sustentabilidade da mudança.",

    // Form placeholders
    "form.namePlaceholder": "Seu nome completo",
    "form.emailPlaceholder": "voce@exemplo.com",
    "form.phonePlaceholder": "Opcional",
    "form.companyPlaceholder": "Nome da sua empresa (Opcional)",
    "form.messagePlaceholder":
      "Conte-nos sobre seu projeto ou como podemos ajudá-lo...",

    // Services Cards
    "services.godigital.title": "GoDigital Suite",
    "services.godigital.description":
      'Ecossistema digital integral "chave na mão" com presença online profissional e gestão de clientes. Implementação em 1-2 semanas.',
    "services.godigital.linkText": "Conhecer GoDigital",

    "services.transformation.title":
      "Estratégia de Inovação e Transformação Digital",
    "services.transformation.description":
      "Co-criamos seu roadmap tecnológico e digital, identificando oportunidades de inovação para acelerar resultados.",
    "services.transformation.linkText": "Impulsionar Inovação",

    "services.development.title":
      "Desenvolvimento de Software e Produtos Digitais",
    "services.development.description":
      "Projetamos, construímos e implantamos software personalizado e produtos digitais inovadores que potencializam sua estratégia.",
    "services.development.linkText": "Explorar Desenvolvimento",

    "services.optimization.title": "Otimização de Processos e Qualidade",
    "services.optimization.description":
      "Projetamos e implementamos SGQ (ex. ISO), otimizando sua operação para excelência e certificações.",
    "services.optimization.linkText": "Descobrir Otimização",

    "services.marketing.title": "Marketing Digital e Crescimento",
    "services.marketing.description":
      "Definimos e gerenciamos estratégias de marketing digital para lançar e posicionar seus produtos e serviços.",
    "services.marketing.linkText": "Ver Estratégias",

    "services.agile.title": "Cultura Ágil e Transformação Organizacional",
    "services.agile.description":
      "Trabalhamos de dentro para fora com suas equipes para implementar metodologias ágeis, gerenciar mudanças e fomentar uma cultura de inovação sustentável.",
    "services.agile.linkText": "Transformar Equipes",

    // Footer
    "footer.tagline": "Impulsionando a Inovação, Resultados que Transformam.",
    "footer.legal": "Legal",
    "footer.privacy": "Política de Privacidade",
    "footer.terms": "Termos e Condições",
    "footer.follow": "Siga-nos",
    "footer.copyright": "Aurhora Agency. Todos os direitos reservados.",
    "footer.designed": "Projetado com",
    "footer.by": "pela Equipe Aurhora",

    // Login Page
    "login.title": "Entrar",
    "login.email": "Email",
    "login.password": "Senha",
    "login.emailPlaceholder": "voce@email.com",
    "login.passwordPlaceholder": "••••••••",
    "login.rememberMe": "Lembrar de mim",
    "login.forgotPassword": "Esqueceu sua senha?",
    "login.access": "Acessar",
    "login.loggingIn": "Entrando...",
    "login.noAccount": "Não tem uma conta?",
    "login.signUp": "Cadastre-se",
    "login.tagline":
      "Transformação digital inteligente para empresas que lideram o futuro",
    "login.secure": "Seguro",
    "login.fast": "Rápido",
    "login.global": "Global",

    // GoDigital Suite Page
    "godigital.ourStarSuite": "NOSSA SUITE ESTRELA",
    "godigital.title": "Aurhora GoDigital Suite",
    "godigital.subtitle": "Seu Negócio para a Era Digital, Simples e Completo.",
    "godigital.description":
      'O ecossistema digital integral "chave na mão" que transforma sua presença online e otimiza a gestão do seu negócio. Focado na transformação digital contínua.',
    "godigital.discoverPlans": "Descobrir Planos",
    "godigital.scheduleFreeDemo": "Agendar Demo Gratuita",
    "godigital.challengesTitle":
      "Seu negócio enfrenta esses desafios digitais?",
    "godigital.challengesSubtitle":
      "GoDigital Suite foi projetada para transformar esses obstáculos em oportunidades de crescimento e eficiência.",
    "godigital.strategicBenefitsTitle":
      "Benefícios Estratégicos: Mais que Tecnologia, Resultados Concretos",
    "godigital.strategicBenefitsSubtitle":
      "Descubra como a GoDigital Suite impulsiona seu negócio rumo ao sucesso no ambiente digital.",
    "godigital.processTitle":
      "Nosso Processo: Sua Transformação Digital Passo a Passo",
    "godigital.processSubtitle":
      "Acompanhamos você em cada etapa para garantir uma implementação bem-sucedida e adaptada às suas necessidades.",
    "godigital.plansTitle": "Planos Projetados para seu Crescimento Digital",
    "godigital.plansSubtitle":
      "Escolha o plano que melhor se adapta ao seu negócio. Todos incluem implementação, acompanhamento especializado e a promessa de transformação.",
    "godigital.addonsTitle": "Potencialize sua Suite com Add-ons Estratégicos",
    "godigital.addonsSubtitle":
      "Nossos Add-ons são soluções modulares projetadas para habilitar várias necessidades operacionais do seu negócio, compatíveis desde o Pacote Básico.",
    "godigital.targetTitle": "Para Quem é a GoDigital Suite?",
    "godigital.targetSubtitle":
      "Se você busca transformar digitalmente seu negócio, consolidar sua presença online e otimizar suas operações, esta suite é para você.",
    "godigital.testimonialsTitle": "O que Dizem Nossos Clientes Satisfeitos",
    "godigital.testimonialsSubtitle":
      "Histórias reais de transformação e crescimento com a GoDigital Suite.",
    "godigital.faqTitle": "Perguntas Frequentes",
    "godigital.faqSubtitle":
      "Resolvemos suas dúvidas para que você tome a melhor decisão para seu negócio.",
    "godigital.ctaTitle": "Pronto para transformar seu negócio?",
    "godigital.ctaSubtitle":
      "Dê o primeiro passo rumo a uma presença digital impactante e operações otimizadas. Nossa equipe de especialistas está pronta para ajudá-lo.",
    "godigital.startNow": "Começar Agora",
    "godigital.scheduleFreeConsultation": "Agendar Consultoria Gratuita",
    "godigital.fastImplementation": "Implementação Express: 1-2 semanas",
    "godigital.continuousSupport": "Garantia e Suporte Contínuo",
    "godigital.expertAdvice": "Assessoria Especializada Personalizada",
    "godigital.popular": "MAIS POPULAR",
    "godigital.chooseThisPlan": "Escolher este Plano",
    "godigital.continueWithPlan": "Continuar com este Plano",
    "godigital.fromPrice": "A partir de",
    "godigital.taxesNotIncluded": "Impostos não incluídos. Consulte detalhes.",
    "godigital.closeForm": "Fechar formulário",

    // GoDigital Strategic Benefits
    "godigital.benefits.strengthening.title":
      "Fortalecimento de Imagem e Credibilidade",
    "godigital.benefits.strengthening.description":
      "Sites modernos, responsivos e seguros (SSL) com SEO básico para maior visibilidade e confiança.",
    "godigital.benefits.efficiency.title":
      "Otimização de Eficiência Operacional",
    "godigital.benefits.efficiency.description":
      "Desde um canal de contato profissional até gestão avançada de consultas e um mini-CRM para acompanhamento superior.",
    "godigital.benefits.agile.title":
      "Implementação Ágil e Consultoria Integral",
    "godigital.benefits.agile.description":
      "Prazos otimizados (1-2 semanas pós-aprovação) com gestão técnica e configuração pela Aurhora Agency.",
    "godigital.benefits.scalable.title":
      "Solução Tecnológica Escalável e Modular",
    "godigital.benefits.scalable.description":
      "Três pacotes base e uma ampla gama de add-ons para personalizar e expandir conforme a evolução do seu negócio.",
    "godigital.benefits.costEffective.title":
      "Relação Custo-Benefício Superior",
    "godigital.benefits.costEffective.description":
      "Oferta de alto valor que combina tecnologia robusta com consultoria especializada a um preço competitivo.",
    "godigital.benefits.support.title":
      "Redução de Carga de Trabalho e Suporte Contínuo",
    "godigital.benefits.support.description":
      "Cuidamos da configuração e montagem, com hospedagem, manutenção e suporte incluídos.",

    // GoDigital Problems Solved
    "godigital.problems.digitalPresence.title":
      "Presença Digital Limitada ou Inexistente",
    "godigital.problems.digitalPresence.description":
      "Supere a falta de uma plataforma web profissional ou perfis sociais robustos que impactam sua credibilidade e alcance.",
    "godigital.problems.valueComm.title": "Comunicação de Valor Ineficaz",
    "godigital.problems.valueComm.description":
      "Facilitamos a apresentação clara e profissional de sua oferta, incluindo validação através de depoimentos e casos de sucesso.",
    "godigital.problems.interaction.title":
      "Gestão de Interações Descentralizada",
    "godigital.problems.interaction.description":
      "Automatize e centralize a gestão de consultas e agendamentos, eliminando processos manuais ineficientes e melhorando o acompanhamento.",
    "godigital.problems.processes.title":
      "Processos Operacionais Manuais e Lentos",
    "godigital.problems.processes.description":
      "Digitalize processos operacionais-chave para melhorar sua capacidade de resposta e eficiência geral do negócio.",
    "godigital.problems.complexity.title":
      "Complexidade Tecnológica Avassaladora",
    "godigital.problems.complexity.description":
      "Reduzimos as barreiras de complexidade, custo e tempo associadas à implementação de soluções digitais. Uma alternativa à autogestão.",
    "godigital.problems.scaling.title": "Dificuldade para Escalar seu Negócio",
    "godigital.problems.scaling.description":
      "Fornecemos as ferramentas digitais necessárias para crescimento sustentado e melhoria contínua de seus serviços.",

    // GoDigital Target Audience
    "godigital.target.freelancers.name":
      "Profissionais Independentes e Empreendedores",
    "godigital.target.freelancers.description":
      "Consultores, coaches, terapeutas, designers, e mais, que buscam consolidar sua marca pessoal e otimizar a captação e gestão de clientes.",
    "godigital.target.smes.name": "Pequenas e Médias Empresas (PMEs)",
    "godigital.target.smes.description":
      "Negócios em crescimento ou em processo de digitalização que precisam de uma presença online robusta e ferramentas para gerenciar interações e clientes de forma eficiente.",
    "godigital.target.variousSectors.name": "Diversos Setores",
    "godigital.target.variousSectors.description":
      "Adaptável a serviços profissionais (consultoria, jurídicos), saúde, educação, ofícios técnicos, estética, e pequeno comércio com necessidades de agendamento.",

    // GoDigital Implementation Process Steps
    "godigital.processSteps.onboarding.title": "1. Onboarding e Kick-off",
    "godigital.processSteps.onboarding.description":
      "Sessão inicial para entender suas necessidades, alinhar expectativas e definir próximos passos. Coletamos informações essenciais de forma estruturada.",
    "godigital.processSteps.content.title":
      "2. Estruturação de Conteúdo e Branding",
    "godigital.processSteps.content.description":
      "Orientamos você a organizar seu conteúdo e aplicar sua marca (ou guiamos em branding básico). Apresentamos uma proposta para sua revisão.",
    "godigital.processSteps.technical.title": "3. Implementação Técnica",
    "godigital.processSteps.technical.description":
      "Montamos seu ecossistema digital (site, agendamento, CRM conforme plano) aplicando o modelo, sua marca e conteúdo. Realizamos testes internos exaustivos.",
    "godigital.processSteps.review.title": "4. Revisão e Aprovação",
    "godigital.processSteps.review.description":
      "Apresentamos o site em ambiente de revisão. Você tem um período para feedback consolidado e realizamos ajustes menores incluídos.",
    "godigital.processSteps.delivery.title": "5. Entrega Final e Treinamento",
    "godigital.processSteps.delivery.description":
      "Lançamos seu site! Entregamos acessos e treinamos você (conforme pacote) para gerenciar sua nova plataforma. Inclui suporte pós-lançamento.",

    // GoDigital Plans
    "godigital.plans.basic.title": "Básico",
    "godigital.plans.basic.description":
      "Presença digital profissional e informativa. Ideal para começar.",
    "godigital.plans.basic.feature.websiteInfo":
      "Site Informativo (Landing Page ou Multi-seção Simples)",
    "godigital.plans.basic.feature.responsiveDesign":
      "Design moderno e responsivo",
    "godigital.plans.basic.feature.contact": "Formulário de Contato",
    "godigital.plans.basic.feature.social": "Integração de Redes Sociais",
    "godigital.plans.basic.feature.sslIncluded": "Certificado SSL incluído",
    "godigital.plans.basic.feature.seoInitial": "SEO básico inicial",
    "godigital.plans.basic.feature.hostingBasic":
      "Hospedagem e Manutenção básica",
    "godigital.plans.basic.feature.pagesUpTo5": "Até 5 páginas padrão",

    "godigital.plans.professional.title": "Profissional",
    "godigital.plans.professional.description":
      "Otimize a gestão de consultas e interações. Eleve sua eficiência.",
    "godigital.plans.professional.feature.allBasic": "Tudo do Pacote Básico",
    "godigital.plans.professional.feature.schedulingSystem":
      "Sistema de Agendamento de Consultas Integrado (tipo Calendly)",
    "godigital.plans.professional.feature.availabilityConfig":
      "Configuração de disponibilidade e serviços",
    "godigital.plans.professional.feature.calendarSync":
      "Sincronização com calendários pessoais",
    "godigital.plans.professional.feature.emailConfirmations":
      "Confirmações automáticas por email",
    "godigital.plans.professional.feature.pagesUpTo10": "Até 10 páginas",
    "godigital.plans.professional.feature.prioritySupport":
      "Suporte prioritário",

    "godigital.plans.360.title": "360",
    "godigital.plans.360.description":
      "Solução integral com ferramentas de gestão de clientes.",
    "godigital.plans.360.feature.allProfessional":
      "Tudo do Pacote Profissional",
    "godigital.plans.360.feature.miniCrm":
      "Mini-CRM (Gestão de Relacionamento com Clientes Básico)",
    "godigital.plans.360.feature.adminPanel": "Painel de Administração Web",
    "godigital.plans.360.feature.contactDataFields":
      "Registro de dados de contato e campos personalizáveis",
    "godigital.plans.360.feature.interactionHistory":
      "Histórico de Interações e Notas por Cliente",
    "godigital.plans.360.feature.documentManagement":
      "Gestão de Documentos por Cliente",
    "godigital.plans.360.feature.unlimitedPages": "Páginas ilimitadas",
    "godigital.plans.360.feature.monthlyConsulting":
      "Consultoria mensal incluída",

    // GoDigital Add-ons
    "godigital.addonsList.onlinePayments.name":
      "Pagamentos Online para Consultas",
    "godigital.addonsList.onlinePayments.price": "+R$99/mês",
    "godigital.addonsList.onlinePayments.description":
      "Permite que seus clientes paguem ao agendar.",
    "godigital.addonsList.billing.name": "Módulo de Faturamento Simplificado",
    "godigital.addonsList.billing.price": "+R$149/mês",
    "godigital.addonsList.billing.description":
      "Gere faturas básicas de sua plataforma.",
    "godigital.addonsList.advancedReminders.name":
      "Lembretes Avançados (SMS/WhatsApp)",
    "godigital.addonsList.advancedReminders.price": "+R$79/mês",
    "godigital.addonsList.advancedReminders.description":
      "Reduza no-shows com lembretes automáticos.",
    "godigital.addonsList.blog.name": "Blog Simples Integrado",
    "godigital.addonsList.blog.price": "+R$59/mês",
    "godigital.addonsList.blog.description":
      "Compartilhe conteúdo de valor e melhore seu SEO.",
    "godigital.addonsList.galleries.name": "Galerias de Imagens Avançadas",
    "godigital.addonsList.galleries.price": "+R$49/mês",
    "godigital.addonsList.galleries.description":
      "Mostre seu trabalho com portfólios visuais.",
    "godigital.addonsList.multiLanguage.name": "Suporte para Múltiplos Idiomas",
    "godigital.addonsList.multiLanguage.price": "+R$129/mês",
    "godigital.addonsList.multiLanguage.description":
      "Expanda seu alcance para audiências internacionais.",

    // GoDigital Testimonials
    "godigital.testimonialsList.anaPerez.quote":
      "GoDigital Suite transformou nossa forma de interagir com clientes. O processo foi rápido e a equipe da Aurhora, excepcional.",
    "godigital.testimonialsList.anaPerez.name": "Ana Pérez",
    "godigital.testimonialsList.anaPerez.company": "Consultoria Criativa",
    "godigital.testimonialsList.carlosLopez.quote":
      "Desde que implementamos a solução de agendamento, economizamos horas de trabalho administrativo. Totalmente recomendado!",
    "godigital.testimonialsList.carlosLopez.name": "Carlos López",
    "godigital.testimonialsList.carlosLopez.company":
      "Saúde e Bem-estar Integral",
    "godigital.testimonialsList.sofiaMartinez.quote":
      "O Mini-CRM é exatamente o que precisávamos para organizar as informações dos nossos clientes. Um antes e depois.",
    "godigital.testimonialsList.sofiaMartinez.name": "Sofía Martínez",
    "godigital.testimonialsList.sofiaMartinez.company": "Estúdio de Design SM",

    // GoDigital FAQ
    "godigital.faqList.item1.q":
      "Quão rápido posso ter meu site e sistema funcionando?",
    "godigital.faqList.item1.a":
      "Nosso processo de implementação é otimizado para ser ágil. Geralmente, após receber todas as suas informações e aprovação do conteúdo e estrutura, podemos ter seu Pacote Básico pronto em aproximadamente 1 semana, e os Pacotes Profissional ou 360 em 1-2 semanas, dependendo da complexidade e add-ons selecionados.",
    "godigital.faqList.item2.q": "Preciso ter conhecimentos técnicos?",
    "godigital.faqList.item2.a":
      "De forma alguma! GoDigital Suite é uma solução 'chave na mão'. Cuidamos de toda a configuração técnica, design (baseado em modelos profissionais que personalizamos com sua marca) e lançamento. Entregamos seu ecossistema digital pronto para usar e oferecemos treinamento básico para que você possa gerenciá-lo.",
    "godigital.faqList.item3.q":
      "E se meu negócio crescer e eu precisar de mais funcionalidades?",
    "godigital.faqList.item3.a":
      "GoDigital Suite foi projetada para escalar com você. Você pode começar com um pacote e depois atualizá-lo, ou adicionar funcionalidades específicas através do nosso catálogo de Add-ons a qualquer momento. Nosso objetivo é que a tecnologia se adapte às suas necessidades em mudança.",
    "godigital.faqList.item4.q":
      "O que o preço 'A partir de X' inclui exatamente?",
    "godigital.faqList.item4.a":
      "O preço 'A partir de X' é um ponto de partida e pode variar significativamente dependendo do esquema de pagamento que você escolher ao contratar. Oferecemos flexibilidade com opções como pagamentos únicos por implementação, mensalidades (que podem ser menores se combinadas com um pagamento inicial), ou planos anuais com benefícios adicionais. Esta estrutura nos permite adaptar o investimento às suas necessidades específicas e ao valor que a Suite trará para você. Um executivo da Aurhora Agency o acompanhará pessoalmente para detalhar todas as opções, entender seus requisitos e ajudá-lo a configurar o plano e esquema de pagamento que melhor se adequa ao seu negócio durante uma consulta personalizada.",
    "godigital.faqList.item5.q": "Que tipo de suporte vocês oferecem?",
    "godigital.faqList.item5.a":
      "Todos os planos incluem suporte técnico básico e um período de garantia pós-lançamento para corrigir qualquer erro técnico atribuível à Aurhora. Para necessidades de suporte mais contínuas ou prioritárias, oferecemos políticas de suporte técnico adicionais e consultoria.",

    // About Us Page
    "aboutUs.badge": "Conheça-nos",
    "aboutUs.heroTitle1": "Orquestrando a Transformação",
    "aboutUs.heroTitle2": "com Experiência e Co-criação",
    "aboutUs.heroDescription":
      "Na Aurhora Agency, combinamos a agilidade de uma empresa jovem com a profunda experiência de uma equipe de profissionais que liderou a vanguarda tecnológica em múltiplas indústrias por mais de 15 anos. Somos seus parceiros estratégicos na gestão e integração de soluções que impulsionam a verdadeira mudança.",
    "aboutUs.scheduleStrategicSession": "Agendar Sessão Estratégica",

    // Nossa Essência
    "aboutUs.heartBadge": "O Coração da Aurhora",
    "aboutUs.essenceTitle1": "Jovens de Espírito,",
    "aboutUs.essenceTitle2": "Gigantes em Experiência",
    "aboutUs.essenceDescription1":
      "A Aurhora Agency nasce da convicção de que a verdadeira transformação digital requer mais que apenas tecnologia; precisa de visão, gestão especializada e uma compreensão profunda do negócio. Embora sejamos uma agência de criação recente, nossa equipe diretiva e consultores principais acumulam mais de 15 anos de experiência liderando projetos complexos e bem-sucedidos em grandes corporações e startups inovadoras.",
    "aboutUs.essenceDescription2":
      "Essa dualidade nos permite oferecer o frescor e adaptabilidade de uma nova era, respaldada pelo conhecimento e solidez daqueles que navegaram e moldaram a evolução tecnológica em setores-chave.",
    "aboutUs.experienceYears": "+15 Anos de Experiência",
    "aboutUs.experienceSubtitle": "Liderando a transformação na indústria.",
    "aboutUs.essenceQuote":
      '"Fundimos a agilidade inovadora com a sabedoria da experiência."',

    // Orquestração
    "aboutUs.orchestrationTitle": "A Arte da Orquestração Estratégica",
    "aboutUs.orchestrationDescription":
      'Nossa capacidade única reside em conhecer a fundo tanto as grandes corporações quanto os empreendimentos desde sua raiz. Essa perspectiva nos permite consolidar equipes multidisciplinares de especialistas que não apenas entendem diversos setores, mas sabem como "tropicalizar" funcionalidades, migrando o melhor de cada mundo para criar soluções inovadoras e sob medida para nossos clientes.',
    "aboutUs.expertOrchestration": "Orquestração Especializada",
    "aboutUs.expertOrchestrationDesc":
      "Somos mestres na gestão e integração de soluções complexas, conectando talento e tecnologia para resultados sinérgicos e eficientes.",
    "aboutUs.multidisciplinaryTeams": "Equipes Multidisciplinares",
    "aboutUs.multidisciplinaryTeamsDesc":
      "Nossa força reside na diversidade de nossos especialistas, provenientes de múltiplos setores, o que nos permite uma visão 360° de cada desafio.",
    "aboutUs.tropicalizationInnovation": 'Inovação por "Tropicalização"',
    "aboutUs.tropicalizationInnovationDesc":
      "Adaptamos e migramos funcionalidades bem-sucedidas de um setor para outro, tomando o melhor de cada mundo para propor soluções frescas e disruptivas.",

    // Seguros
    "aboutUs.sectoralStrengthBadge": "Nossa Força Setorial",
    "aboutUs.insuranceTitle":
      "Especialistas no Ecossistema de Seguros (InsurTech)",
    "aboutUs.insuranceDescription1":
      "Conhecemos profundamente a indústria seguradora mexicana e latino-americana. Colaboramos com as principais seguradoras do país, desenvolvendo e integrando soluções tecnológicas ao longo de toda sua cadeia de valor.",
    "aboutUs.insuranceDescription2":
      "Nossa experiência abrange uma ampla gama de produtos e linhas de negócio, permitindo-nos oferecer perspectivas inovadoras e soluções pragmáticas que respondem aos desafios específicos do setor.",

    // Fintech
    "aboutUs.fintechTitle": "Impulsionadores da Inovação em Fintech",
    "aboutUs.fintechDescription1":
      "O setor financeiro está em constante evolução, e na Aurhora Agency estamos na vanguarda. Trabalhamos com bancos tradicionais, startups disruptivas e neoBancos, criando desde robustos bancos móveis até a integração ágil de agregadores de pagamento.",
    "aboutUs.fintechDescription2":
      "Entendemos os desafios de segurança, regulatórios e de experiência do usuário que definem o setor Fintech, e oferecemos soluções que combinam inovação tecnológica com conhecimento profundo do negócio financeiro.",

    // Co-criação
    "aboutUs.cocreationTitle": "Co-criação: O Pilar de Soluções Genuínas",
    "aboutUs.cocreationDescription1":
      "Acreditamos firmemente que as soluções mais impactantes nascem da colaboração estreita. Nossa abordagem de co-criação significa que trabalhamos lado a lado com você, fundindo seu conhecimento profundo do negócio com nossa experiência em gestão, integração e tecnologia.",
    "aboutUs.cocreationDescription2":
      "Este processo colaborativo nos permite ir além das soluções genéricas, projetando e implementando estratégias e ferramentas verdadeiramente personalizadas que atendem 100% às necessidades e objetivos únicos de sua organização, garantindo um impacto real e mensurável.",

    // CTA Final
    "aboutUs.ctaTitle":
      "Pronto para que nossa experiência impulsione sua visão?",
    "aboutUs.ctaDescription":
      "Permita-nos ser os arquitetos de sua próxima grande transformação. Vamos conversar sobre seus desafios e explorar juntos como a Aurhora Agency pode ser o parceiro estratégico que você precisa.",
    "aboutUs.scheduleStrategicSessionCta": "Agendar uma Sessão Estratégica",

    // Insurance Expertise List
    "aboutUs.insurance.medicalExpenses":
      "Gastos Médicos Maiores (Individual e Coletivo)",
    "aboutUs.insurance.auto": "Auto (Particulares, Frotas, Serviço Público)",
    "aboutUs.insurance.life": "Vida (Tradicional, Investimento, Educacionais)",
    "aboutUs.insurance.property": "Danos (Residencial, Empresariais, RC)",
    "aboutUs.insurance.savings": "Produtos de Poupança e Aposentadoria",
    "aboutUs.insurance.claims": "Gestão Integral de Sinistros",
    "aboutUs.insurance.underwriting": "Subscrição e Emissão Digital",
    "aboutUs.insurance.channels": "Canais Digitais e Venda Direta",

    // Fintech Expertise List
    "aboutUs.fintech.mobileBanking": "Desenvolvimento de Bancos Móveis",
    "aboutUs.fintech.paymentGateways": "Gateways e Agregadores de Pagamento",
    "aboutUs.fintech.cardProcessing":
      "Processamento de Cartões (Crédito/Débito)",
    "aboutUs.fintech.neoBanks": "Soluções para NeoBancos",
    "aboutUs.fintech.coreBanking": "Sistemas Core Bancário e Auxiliares",
    "aboutUs.fintech.digitalLoans": "Empréstimos Digitais (Originação/Gestão)",
    "aboutUs.fintech.openBanking": "APIs Financeiras e Open Banking",
    "aboutUs.fintech.kyc": "KYC e Onboarding Digital Ágil",
  },
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es-MX");
  const [isClient, setIsClient] = useState(false);

  // CORREGIDO: Manejar hidratación correctamente
  useEffect(() => {
    setIsClient(true);

    // Solo ejecutar en el cliente después de la hidratación
    const storedLocale = localStorage.getItem(
      "aurhora-locale"
    ) as Locale | null;

    if (storedLocale && translations[storedLocale]) {
      setLocale(storedLocale);
    } else if (typeof navigator !== "undefined") {
      // Detectar idioma del navegador solo en el cliente
      const browserLocale = navigator.language;

      let initialLocale: Locale = "es-MX"; // Por defecto español México

      if (browserLocale.startsWith("en")) {
        initialLocale = "en-US";
      } else if (browserLocale.startsWith("pt")) {
        initialLocale = "pt-BR";
      }

      setLocale(initialLocale);
    }
  }, []);

  // CORREGIDO: Agregar persistencia al cambio de idioma
  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    if (isClient) {
      localStorage.setItem("aurhora-locale", newLocale);
    }
  };

  const t = (key: string): string => {
    const dict = translations[locale];

    // Acceso directo a las claves usando notación de corchetes
    const translation = dict[key as keyof typeof dict];

    if (typeof translation === "string") {
      return translation;
    }

    console.warn(
      `Translation key not found or is not a string: ${key} for locale ${locale}`
    );
    return key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context.t;
}

export function useChangeLocale() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useChangeLocale must be used within an I18nProvider");
  }
  return context.setLocale;
}

export function useCurrentLocale() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useCurrentLocale must be used within an I18nProvider");
  }
  return context.locale;
}
