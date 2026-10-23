import type { ServiceExtras } from "./types";

/*
  Fuentes (consultadas el 23 de octubre de 2026): precios publicados por be-genius.com,
  yastdigital.com, simplixy.com.mx, kosmo.com.mx, wizard-ai.mx, percivalmonge.com,
  varelainsights.com, duotach.com, go.magokoro.mx, sintergica.ai, wasdstudio.com,
  nebu-lab.com, rigolco.com, ecosistemadigital.com.mx, traficodm.com, communitymanager.mx,
  vantaweb.mx y citae.mx; rangos de mercado de uniamos.com, fueradelacaja.com.mx,
  itechdev.com.mx y 100x.mx. Precios autorizados por Aurhora el 23 de octubre de 2026: se publican
  como "Desde" con el límite inferior de cada rango.
*/


export const DIGITAL_EXTRAS: Record<string, ServiceExtras> = {
  "agentes-ia": {
    costIntro: "Un agente de IA tiene dos costos: la implementación, que se paga una vez, y la operación mensual, que incluye el uso de WhatsApp y del modelo de IA. Manejamos desde planes empaquetados hasta agentes a la medida conectados a los sistemas de tu empresa.",
    prices: [
      { concept: "Plan empaquetado de agente para WhatsApp", range: "Desde $1,900", unit: "al mes" },
      { concept: "Implementación de un agente acotado", range: "Desde $9,300", unit: "pago único" },
      { concept: "Agente conectado a CRM o ERP", range: "Desde $29,000", unit: "pago único" },
      { concept: "Proyecto avanzado (varios procesos o canales)", range: "Desde $116,000", unit: "pago único" },
      { concept: "Operación, monitoreo y mejoras", range: "Desde $2,900", unit: "al mes" },
      { concept: "Uso de WhatsApp (Meta) y del modelo de IA", range: "Desde $350", unit: "al mes, según volumen" },
    ],
    factors: [
      "Canales: WhatsApp, web, correo o varios.",
      "Integraciones con CRM, ERP o sistemas propios.",
      "Volumen de conversaciones al mes.",
      "Acciones que ejecuta y aprobaciones humanas necesarias.",
      "Cantidad y orden de la información que debe consultar.",
      "Nivel de monitoreo y reportes.",
    ],
    timing: [
      { label: "Agente acotado", value: "1 a 3 semanas" },
      { label: "Agente con CRM", value: "3 a 8 semanas" },
      { label: "Agente con ERP o varios procesos", value: "2 a 4 meses" },
      { label: "Primera conversación", value: "Sin costo" },
    ],
    excludes: [
      "Cuota de Meta por conversaciones de WhatsApp.",
      "Consumo del modelo de IA, cuando lo pagas directo al proveedor.",
      "Licencias de tu CRM, ERP u otros sistemas.",
      "Cambios mayores de alcance después del lanzamiento.",
    ],
    faq: [
      ["¿Cuánto cuesta un agente de IA para WhatsApp en México?", "Con nosotros, la implementación de un agente acotado parte de $9,300 y su operación desde $2,900 al mes, más el uso de WhatsApp y del modelo de IA. Un agente conectado a CRM o ERP parte de $29,000."],
      ["¿Cuánto tarda en estar listo?", "Un agente acotado suele tardar de 1 a 3 semanas. Con integraciones a CRM, de 3 a 8 semanas; con ERP o varios procesos, de 2 a 4 meses."],
      ["¿Qué costos mensuales tiene?", "La operación y mejora del agente, el uso de WhatsApp que cobra Meta y el consumo del modelo de IA. Te los detallamos por separado en la propuesta."],
    ],
  },

  "automatizacion-procesos": {
    costIntro: "Las automatizaciones se cotizan por flujo o por proceso. Construimos desde flujos simples hasta procesos completos que conectan CRM, facturación y WhatsApp. Al precio de construcción se suma la plataforma donde corren, que normalmente paga el cliente.",
    prices: [
      { concept: "Flujo simple", range: "Desde $4,100", unit: "por flujo" },
      { concept: "Proceso de negocio (cobranza, sincronizar CRM)", range: "Desde $5,800", unit: "por proceso" },
      { concept: "Paquete de 5 a 10 procesos", range: "Desde $29,000", unit: "pago único" },
      { concept: "Suite completa (CRM, facturación y WhatsApp)", range: "Desde $232,000", unit: "pago único" },
      { concept: "Mantenimiento", range: "Desde $2,900", unit: "al mes" },
      { concept: "Plataforma de automatización", range: "Desde $250", unit: "al mes, según volumen" },
    ],
    factors: [
      "Número de pasos y sistemas conectados.",
      "Excepciones que el flujo debe manejar.",
      "Calidad y formato de los datos de origen.",
      "Uso de IA para leer documentos o mensajes.",
      "Volumen de ejecuciones al mes.",
    ],
    timing: [
      { label: "Flujo simple", value: "5 días hábiles a 2 semanas" },
      { label: "Varios procesos", value: "4 a 12 semanas" },
      { label: "Suite completa", value: "2 a 4 meses" },
    ],
    excludes: [
      "Licencias de la plataforma (n8n, Make, Zapier) y servidor.",
      "Licencias de tus sistemas.",
      "Consumo de IA por uso.",
    ],
    context: [
      "Antes de automatizar, describe el proceso como se hace hoy, paso a paso, y señala dónde se pierde más tiempo. Automatizar un proceso desordenado solo hace más rápido el desorden.",
      "Empieza por un flujo que se repita mucho y tenga reglas claras. Cuando funcione y puedas medir el ahorro, es más fácil decidir qué automatizar después.",
    ],
    faq: [
      ["¿Cuánto cuesta automatizar un proceso?", "Con nosotros, un flujo simple parte de $4,100 y un proceso de negocio completo desde $5,800."],
      ["¿Cuánto tarda?", "Un flujo simple puede estar listo en una o dos semanas. Varios procesos coordinados toman de 4 a 12 semanas."],
    ],
  },

  software: {
    costIntro: "El costo del software a la medida depende sobre todo del alcance de la primera versión. El precio cambia mucho según el alcance; lo recomendable es empezar con una primera versión acotada y crecer por etapas.",
    prices: [
      { concept: "Primera versión o MVP", range: "Desde $116,000", unit: "por proyecto" },
      { concept: "Sistema o plataforma completa", range: "Desde $232,000", unit: "por proyecto" },
      { concept: "Proyecto empresarial", range: "Desde $696,000", unit: "por proyecto" },
      { concept: "Hora de desarrollo (empresa)", range: "Desde $700", unit: "por hora" },
      { concept: "Hora de líder técnico", range: "Desde $1,650", unit: "por hora" },
    ],
    factors: [
      "Número de pantallas, roles de usuario y reglas de negocio.",
      "Integraciones con otros sistemas.",
      "Requisitos de seguridad y auditoría.",
      "Aplicación web, móvil o ambas.",
      "Soporte y evolución después del lanzamiento.",
    ],
    timing: [
      { label: "Primera versión o MVP", value: "8 a 14 semanas" },
      { label: "Plataforma completa", value: "3 a 5 meses" },
      { label: "Proyecto empresarial", value: "5 a 8 meses" },
    ],
    excludes: [
      "Hosting y servicios en la nube.",
      "Licencias de software de terceros.",
      "Soporte después del periodo acordado.",
      "Funciones nuevas fuera del alcance.",
    ],
    context: [
      "Antes de pedir una cotización, escribe qué problema quieres resolver, quién usará el sistema y qué tendría que poder hacer en su primera versión. No necesitas un documento técnico; una lista clara es suficiente para empezar.",
      "Pregunta siempre por la propiedad del código, el hosting y el soporte después del lanzamiento. Son los puntos que más diferencias generan entre propuestas que parecen similares.",
    ],
    faq: [
      ["¿Cuánto cuesta un software a la medida en México?", "Con nosotros, una primera versión parte de $116,000 y una plataforma completa desde $232,000."],
      ["¿Cuánto tarda una primera versión?", "Normalmente entre 8 y 14 semanas, según el alcance."],
    ],
  },

  consultoria: {
    costIntro: "La consultoría en IA se cobra por diagnóstico, por hoja de ruta o por hora. La primera conversación no tiene costo; los diagnósticos formales y la capacitación se cotizan por proyecto.",
    prices: [
      { concept: "Diagnóstico de IA formal (2 a 3 semanas)", range: "Desde $17,400", unit: "pago único" },
      { concept: "Hoja de ruta con primer caso de uso", range: "Desde $104,400", unit: "por proyecto" },
      { concept: "Hora de consultor de IA", range: "Desde $1,300", unit: "por hora" },
      { concept: "Taller ejecutivo (3 a 4 horas)", range: "Desde $17,400", unit: "por taller" },
      { concept: "Capacitación de equipo (1 a 2 días)", range: "Desde $40,600", unit: "por programa" },
    ],
    factors: [
      "Número de áreas y procesos a revisar.",
      "Profundidad del diagnóstico.",
      "Si incluye un primer caso de uso implementado.",
      "Número de personas en la capacitación.",
      "Sesiones presenciales o en línea.",
    ],
    timing: [
      { label: "Diagnóstico", value: "2 a 3 semanas" },
      { label: "Taller", value: "Medio día a un día" },
      { label: "Programa de capacitación", value: "Hasta 4 semanas" },
    ],
    excludes: [
      "Implementación de los casos de uso, que se cotiza aparte.",
      "Licencias de herramientas de IA.",
      "Viáticos fuera de la CDMX.",
    ],
    context: [
      "Llega a la primera conversación con dos o tres procesos que te gustaría mejorar y cualquier herramienta de IA que tu equipo ya esté usando, aunque sea de forma informal.",
      "Una buena hoja de ruta prioriza pocos casos de uso con valor claro, define cómo medirlos y propone un orden realista. Desconfía de un diagnóstico que recomiende implementar todo al mismo tiempo.",
    ],
    faq: [
      ["¿Cuánto cuesta un diagnóstico de IA?", "Nuestro diagnóstico formal de 2 a 3 semanas parte de $17,400. La primera conversación con nosotros no tiene costo."],
      ["¿Cuánto cuesta capacitar a mi equipo en IA?", "Nuestro taller ejecutivo parte de $17,400 y la capacitación de 1 a 2 días, desde $40,600."],
    ],
  },

  marketing: {
    costIntro: "En marketing digital hay que separar dos cosas: lo que cobramos por nuestro trabajo y la inversión en anuncios, que pagas directo a Google o Meta. Los precios de esta tabla son solo de nuestro trabajo.",
    prices: [
      { concept: "SEO para negocio local", range: "Desde $5,800", unit: "al mes" },
      { concept: "SEO B2B nacional", range: "Desde $11,600", unit: "al mes" },
      { concept: "Auditoría técnica de SEO", range: "Desde $5,250", unit: "pago único" },
      { concept: "Gestión de Google Ads o Meta Ads (sin pauta)", range: "Desde $5,800", unit: "al mes, o 15 a 20% de la inversión" },
      { concept: "Manejo de redes sociales", range: "Desde $5,700", unit: "al mes" },
      { concept: "Agencia integral", range: "Desde $9,300", unit: "al mes" },
    ],
    factors: [
      "Canales que se trabajan.",
      "Competencia en tus palabras clave.",
      "Inversión mensual en anuncios.",
      "Producción de contenido y diseño.",
      "Profundidad de la medición y reportes.",
    ],
    timing: [
      { label: "Resultados de SEO local", value: "2 a 4 meses" },
      { label: "SEO en términos competidos", value: "4 a 12 meses" },
      { label: "Configuración de medición", value: "Antes de lanzar campañas" },
    ],
    excludes: [
      "Inversión en anuncios que pagas a Google o Meta.",
      "Producción de fotografía y video.",
      "Herramientas de pago (SEO, diseño, programación de publicaciones).",
    ],
    context: [
      "Antes de invertir en campañas, revisa que puedas medir cuántas solicitudes llegan y de dónde. Sin medición no hay forma de saber qué canal funciona ni cuánto cuesta conseguir un cliente.",
      "Define un presupuesto mensual que puedas sostener al menos tres meses. Los primeros resultados sirven para ajustar; cambiar de estrategia cada semana no deja aprender nada.",
    ],
    faq: [
      ["¿Cuánto cuesta el SEO para un negocio local?", "Nuestro servicio de SEO parte de $5,800 al mes. Los primeros resultados suelen verse entre el segundo y el cuarto mes."],
      ["¿El precio incluye lo que se paga a Google o Meta?", "No. La inversión en anuncios se paga directo a cada plataforma y se acuerda contigo aparte."],
    ],
  },

  godigital: {
    costIntro: "Un sitio para un negocio pequeño puede ser un pago único o una suscripción. A eso se suman el hosting y el dominio, y las herramientas mensuales de agenda o seguimiento si las necesitas.",
    prices: [
      { concept: "Sitio web de hasta 5 páginas", range: "Desde $7,550", unit: "pago único" },
      { concept: "Landing page", range: "Desde $5,250", unit: "pago único" },
      { concept: "Sitio por suscripción", range: "Desde $5,800 + $850", unit: "instalación + al mes" },
      { concept: "Hosting y dominio", range: "Desde $3,500", unit: "al año" },
      { concept: "Agenda en línea (software)", range: "Desde $500", unit: "al mes" },
      { concept: "CRM o bandeja de WhatsApp (software)", range: "Desde $600", unit: "al mes" },
    ],
    factors: [
      "Número de páginas y secciones.",
      "Quién escribe los textos y produce las fotos.",
      "Formularios, agenda y conexión con WhatsApp.",
      "Herramientas mensuales que elijas.",
      "Acompañamiento después del lanzamiento.",
    ],
    timing: [
      { label: "Sitio de hasta 5 páginas", value: "1 a 3 semanas" },
      { label: "Agenda y contacto", value: "Se configuran junto con el sitio" },
      { label: "Acompañamiento inicial", value: "Primeras semanas después de lanzar" },
    ],
    excludes: [
      "Fotografía y video profesional.",
      "Textos extensos o traducciones.",
      "Licencias mensuales de software de terceros.",
      "Inversión en anuncios.",
    ],
    context: [
      "Reúne antes de empezar tu logotipo, fotos de tu negocio, la lista de servicios y las preguntas que más te hacen tus clientes. Con ese material el sitio puede estar listo mucho más rápido.",
      "Piensa también qué debe pasar cuando alguien te escribe: quién responde, en cuánto tiempo y dónde queda registrada la solicitud. Ordenar eso es tan importante como el diseño del sitio.",
    ],
    faq: [
      ["¿Cuánto cuesta una página web para un negocio pequeño?", "Con nosotros, un sitio de hasta 5 páginas parte de $7,550 en pago único, más hosting y dominio desde $3,500 al año."],
      ["¿Cuánto tarda en estar listo?", "Un sitio de hasta 5 páginas suele estar listo en 1 a 3 semanas, según qué tan pronto tengamos textos y fotos."],
    ],
  },
};
