# SEO, analítica y tag management para Aurhora v3

Fecha: 21 de octubre de 2026. Alcance: el sitio en producción (`src/`, Next.js 15) y el prototipo `prototypes/aurhora-v3`.

## Resumen

El sitio actual tiene GTM, GA4, sitemap, robots, metadatos base y un esquema Organization, pero todavía no está listo para posicionarse ni para medir campañas. Hay cuatro problemas que bloquean:

1. **Todas las páginas declaran la misma URL canónica, la raíz.** Para Google, las páginas de servicio son duplicados de la portada.
2. **La analítica se carga sin consentimiento y GA4 está instalado dos veces** (gtag directo y GTM). Si el contenedor de GTM también tiene la etiqueta de GA4, las cifras se duplican y hay riesgo legal.
3. **No se capturan UTM ni gclid, y no llegan a Brevo.** No hay forma de saber qué campaña generó qué cliente.
4. **No existen imágenes Open Graph ni el logo del schema.** Los enlaces compartidos se ven vacíos.

La v3 ya incluye lo que se necesita para corregirlo al migrar a Next.js:
- URL, title, description y palabras clave por página
- JSON-LD por tipo de página
- una taxonomía de eventos para `dataLayer`
- el panel **Ficha SEO y medición** en el pie del prototipo, para revisar todo esto página por página

## 1. Hallazgos del sitio actual

| # | Hallazgo | Evidencia | Prioridad |
|---|---|---|---|
| 1 | Canonical y `og:url` apuntan a `https://aurhora.agency` en todas las páginas; hreflang siempre va a las portadas por idioma | `src/app/[locale]/layout.tsx:20-28`, `src/lib/seo/metadata.ts:86,99-103` | Crítica |
| 2 | GTM, GA4 directo (`G-SQKR312YQR`) y Clarity se cargan sin consentimiento; no hay Consent Mode v2 | `src/app/layout.tsx:44-91` | Crítica |
| 3 | El banner de cookies es cosmético: "Rechazar" no detiene nada y su cargador usa IDs de ejemplo | `src/components/CookieConsent.tsx:69-109` | Crítica |
| 4 | GA4 cargado dos veces (gtag directo + GTM) | `src/app/layout.tsx:69-80` | Alta |
| 5 | No se capturan UTM, gclid ni fbclid, y no se pasan a Brevo; el plan elegido tampoco llega | `useContactForm.ts:40-46`, `api/contact/route.ts:118-131` | Alta |
| 6 | Las imágenes OG `/og-image-*.png` y `/logo.png` no existen | `metadata.ts:29,48,67,158`; `public/` | Alta |
| 7 | Las páginas de servicio, Quiénes somos y las legales no tienen metadatos propios | `src/app/[locale]/**/page.tsx` | Alta |
| 8 | `<html>` sin `lang` | `src/app/layout.tsx:36` | Media |
| 9 | Verificación de Google con texto de ejemplo | `metadata.ts:141` | Media |
| 10 | `/login` está en el sitemap y es indexable | `sitemap.ts:7-15` | Media |
| 11 | `robots.ts` bloquea `/_next/` para bots que no son Google | `robots.ts:8-12` | Media |
| 12 | JSON-LD inyectado con `next/script` (en cliente, no en el HTML del servidor); `SearchAction` apunta a `/search`, que no existe | `[locale]/layout.tsx:55-68`, `metadata.ts:178-197` | Media |
| 13 | Faltan los schemas LocalBusiness, Service, FAQPage y BreadcrumbList (los dos últimos están definidos pero no se usan) | `metadata.ts:199-236` | Media |
| 14 | `phone_click`, `email_click` y `view_pricing` están definidos pero nunca se disparan; `demo_scheduled` depende de una regex que casi ningún CTA cumple | `track.ts`, `useContactForm.ts:62` | Media |
| 15 | `removeConsole` borra también `console.error`: los fallos de Brevo pasan inadvertidos en producción | `next.config.ts` | Media |
| 16 | Los títulos todavía dicen "Aurhora Agency" y no hay plantilla de título | `metadata.ts:16,35,54`, `app/layout.tsx:17` | Baja |
| 17 | El enlace del pie `/#contacto` no lleva a ningún lado | `SiteFooter.tsx:128` | Baja |

## 2. Arquitectura SEO para producción

### URLs

Recomendación: lanzar la v3 solo en español de México y sin prefijo de idioma (`localePrefix: "as-needed"`). Hoy en/pt reciben páginas con contenido en español mezclado; conviene sacarlas del índice (`noindex`) hasta tener traducciones reales.

| Página | URL | Palabra clave principal |
|---|---|---|
| Grupo | `/` | Grupo Aurhora |
| Digital | `/digital` | agentes de IA México |
| Agentes de IA | `/digital/agentes-de-ia` | agentes de IA |
| Automatización | `/digital/automatizacion-de-procesos` | automatización de procesos |
| Software | `/digital/software-a-la-medida` | desarrollo de software a la medida |
| Consultoría e IA | `/digital/consultoria-ia` | consultoría en inteligencia artificial |
| Marketing | `/digital/marketing-digital` | agencia de marketing digital |
| GoDigital | `/digital/godigital` | página web para negocio |
| Integra | `/integra` | instalación de cámaras CDMX |
| Seguridad | `/integra/seguridad-y-accesos` | instalación de cámaras de seguridad CDMX |
| Redes | `/integra/redes-y-conectividad` | cableado estructurado CDMX |
| Domótica | `/integra/domotica` | domótica CDMX |
| Audio y video | `/integra/audio-y-video` | audio por zonas |
| Mantenimiento | `/mantenimiento` | mantenimiento CDMX |
| Aire acondicionado | `/mantenimiento/aire-acondicionado` | mantenimiento de aire acondicionado CDMX |
| Electricidad | `/mantenimiento/electricidad` | electricista CDMX |
| Reparaciones | `/mantenimiento/instalaciones-y-reparaciones` | handyman CDMX |
| Mantenimiento programado | `/mantenimiento/mantenimiento-programado` | póliza de mantenimiento preventivo |
| Proyectos residenciales | `/mantenimiento/proyectos-residenciales` | remodelación de casa CDMX |
| Comercial e industrial | `/mantenimiento/proyectos-comerciales-e-industriales` | mantenimiento industrial CDMX |
| Contacto | `/contacto` | — |

Todas las palabras clave salen de `prototypes/aurhora-v3/src/content/services.ts` y `site.ts`. Son una propuesta: validar volumen y competencia en Google Keyword Planner y, tras el lanzamiento, en Search Console.

**Redirecciones 301 desde el sitio actual:**

| Origen | Destino |
|---|---|
| `/es` | `/` |
| `/es/servicios/godigital` | `/digital/godigital` |
| `/es/servicios/desarrollo-software` | `/digital/software-a-la-medida` |
| `/es/servicios/transformacion-digital` | `/digital/consultoria-ia` |
| `/es/servicios/impulso-marketing` | `/digital/marketing-digital` |
| `/es/quienes-somos` | `/#origen`, o una página nueva de Grupo |

Las rutas en/pt equivalentes van al mismo destino. Hay que conservar las redirecciones 308 que ya existen para `optimizacion-procesos` y `cultura-agil`.

### Metadatos por página (Next.js)

- `generateMetadata()` en cada `page.tsx`, alimentado del mismo objeto `seo` del contenido. Lleva title, description, canonical absoluto con `metadataBase` y `openGraph.url` igual al canonical.
- Plantilla de título en el layout raíz: `title: { template: "%s", default: "Grupo Aurhora" }`. Los títulos de la v3 ya traen la marca.
- `alternates.languages` con `x-default` solo cuando existan traducciones reales.
- `opengraph-image.tsx` por segmento (`/digital`, `/integra`, `/mantenimiento`), generado con el título de la página y el acento de la unidad. Así no hace falta mantener PNG a mano.
- `export const viewport` en lugar de `metadata.viewport`.
- `<html lang="es-MX">`.
- `robots: { index: false }` en `/login`, la página 404 y las páginas de gracias.

### Datos estructurados

Deben renderizarse en el HTML del servidor con un `<script type="application/ld+json">` normal, no con `next/script`. El generador ya está escrito en `prototypes/aurhora-v3/src/lib/seo.ts` (`jsonLdFor`) y se puede mover casi tal cual.

| Página | Schemas |
|---|---|
| Grupo | `Organization` (con teléfono, correo y `subOrganization`) + `WebSite`, sin SearchAction |
| Integra y Mantenimiento | `HomeAndConstructionBusiness` con `areaServed` (CDMX, Edomex y zonas), `openingHoursSpecification` y teléfono |
| Digital | `ProfessionalService` con `areaServed: México` |
| Servicios | `Service` + `OfferCatalog` (lo que incluye) + `FAQPage` + `BreadcrumbList` |
| Contacto | `ContactPage` |

Validar cada plantilla con la Prueba de resultados enriquecidos de Google antes de publicar.

### Sitemap y robots

- **Sitemap:** solo URLs canónicas e indexables. Sin `/login`. Con `lastModified` real (fecha del contenido, no la del build).
- **Robots:** permitir `/_next/` (bloquear solo `/api/`). Quitar `/admin/`, que no existe.
- **Search Console:** verificar el dominio por DNS, enviar el sitemap y revisar la cobertura a las 2 semanas.

### Google Business Profile

Es el canal con más potencial para Mantenimiento e Integra. Configurarlo así:
- Perfil de **negocio de área de servicio**: sin dirección pública, con las zonas de cobertura.
- Categorías: servicio de aire acondicionado, electricista, instalación de sistemas de seguridad y empresa de domótica.
- Horario real.
- Fotos propias.
- Enlaces con UTM: `utm_source=google&utm_medium=organic&utm_campaign=gbp`.

### Contenido para posicionar

Un **pilar por tema**: la página de servicio, que ya existe en la v3. Alrededor de cada pilar van **artículos de apoyo** que enlazan al pilar. Cada artículo responde una pregunta real, sin páginas de relleno por colonia.

| Tema | Pilar | Artículos sugeridos |
|---|---|---|
| IA agéntica | `/digital/agentes-de-ia` | Qué es un agente de IA · Agente de IA vs chatbot vs automatización · Cómo implementar un agente de IA en tu empresa · Agente de IA para WhatsApp Business · Casos de uso de IA agéntica en México · Gobierno y riesgos de la IA en empresas |
| Automatización | `/digital/automatizacion-de-procesos` | Qué procesos automatizar primero · n8n vs Make · Extracción de facturas con IA |
| Domótica | `/integra/domotica` | Domótica en un departamento sin obra · Qué preparar en obra para una casa inteligente |
| Mantenimiento comercial e industrial | `/mantenimiento/proyectos-comerciales-e-industriales` | Qué incluye una póliza de mantenimiento · Iluminación LED en naves: qué considerar |
| Hogar | `/mantenimiento/aire-acondicionado` | Cada cuánto dar mantenimiento a un minisplit · Por qué se bota la pastilla |

Ritmo sugerido: 2 artículos al mes, empezando por IA agéntica (es el tema donde la competencia en español todavía es menor) y por mantenimiento local.

## 3. Medición y tag management

### Principios

- **Un solo contenedor:** todo pasa por GTM `GTM-TMP9R7B6`. Quitar el gtag directo de `layout.tsx` y configurar GA4 (hoy `G-NRPDQSXEZJ`) solo dentro de GTM.
- **Consentimiento primero:**
  - Consent Mode v2 con `gtag('consent','default', { ad_storage, analytics_storage, ad_user_data, ad_personalization: 'denied' })`, antes de cargar GTM.
  - El banner llama `gtag('consent','update', …)` según lo que elija la persona.
  - Clarity y los píxeles solo se disparan con consentimiento, desde GTM.
- **El sitio solo empuja eventos a `dataLayer`.** Las etiquetas de GA4, Google Ads, Meta y LinkedIn se configuran en GTM.

### Taxonomía de eventos

Ya implementada en `prototypes/aurhora-v3/src/lib/analytics.ts`, con el mismo contrato de `trackEvent` del sitio actual.

| Evento | Parámetros | Uso en GA4 / Ads |
|---|---|---|
| `page_view` | `page_path`, `page_title`, `content_group` | Vista virtual. En Next.js la cubre GA4 con historial de navegación |
| `generate_lead` | `method` (whatsapp/formulario), `unit`, `service`, `priority`, `source` | **Evento clave** y conversión principal de Google Ads |
| `whatsapp_click` | `source`, `unit`, `service` | Evento clave secundario |
| `phone_click` / `email_click` | `action` | Micro-conversión |
| `form_progress` | `form`, `step`, `unit` | Embudo del formulario |
| `select_content` | `content_type`, `content_id` | Uso de herramientas: buscador, síntomas, zona, agente, plano |

Mapeo con el plan de `MARKETING_STRATEGY.md`: `contact_submit` se mantiene para el formulario que envía a Brevo, y además dispara `generate_lead` con `method: "formulario"`. `demo_scheduled` debe dispararse por un parámetro explícito del CTA, no por una regex.

### Atribución hasta el CRM

1. **Capturar** `utm_*`, `gclid`, `gbraid`, `wbraid`, `fbclid`, la página de entrada y el referrer en la primera visita. Guardarlos en una cookie propia de 90 días, solo con consentimiento. El prototipo ya los lee de la URL (`lib/whatsapp.ts`).
2. **Enviarlos** con el formulario a `/api/contact` y guardarlos como atributos del contacto y del deal en Brevo. Lo mismo para `selectedPlan`.
3. **WhatsApp:** el clic no es una conversación. Para medir oportunidades reales:
   - incluir en el mensaje un código corto de referencia (campaña o página)
   - etiquetar la conversación en WhatsApp Business
   - registrar el deal en Brevo
4. **Conversiones offline:**
   - importar a Google Ads los deals ganados de Brevo, con el gclid o con Enhanced Conversions for Leads
   - para Meta, usar la API de Conversiones desde el servidor
5. Página `/gracias` (sin indexar) después del envío del formulario, como respaldo de medición.

### Rendimiento

- Revisar que el contenido no quede en `opacity: 0` en el HTML del servidor. Las animaciones deben partir de un estado visible.
- Core Web Vitals en Search Console y Vercel Speed Insights. Meta: LCP < 2.5 s y CLS < 0.1 en móvil.
- Imágenes con `next/image` cuando existan las fotos propias.

## 4. Plan de trabajo

**Semana 1: corregir lo que bloquea**
- [x] Consent Mode v2 + banner funcional; quitar el gtag directo; Clarity detrás del consentimiento (`src/lib/analytics/consent.ts`, `app/layout.tsx`, `CookieConsent.tsx`; enlace "Preferencias de cookies" en el footer)
- [x] Canonical, OG y hreflang (con x-default) por página; `lang` en `<html>`; verificación de Search Console por variable `NEXT_PUBLIC_GSC_VERIFICATION` (`src/lib/seo/metadata.ts`, `generateMetadata` en cada página)
- [x] Sitemap sin `/login` y con fecha de contenido; robots sin bloquear `/_next/`; `/login` con noindex
- [x] Captura de UTM, gclid/gbraid/wbraid, fbclid, página de entrada y referrer → API → Brevo (atributos del contacto, descripción del deal y correo al equipo) (`src/lib/analytics/attribution.ts`, `src/lib/brevo/attribution.ts`)
- [x] **GTM:** el contenedor `GTM-TMP9R7B6` carga GA4 con la constante `const - GA4 ID de medición` = `G-NRPDQSXEZJ` (versión 5, 26/10/2026). El flujo anterior `G-SQKR312YQR` se eliminó en GA4 el 25/10/2026 y ya no recibe datos; no volver a usarlo. Ya no se carga gtag directo
- [ ] **Pendiente en Brevo:** crear los atributos de contacto listados en `.env.example`
- [ ] **Pendiente en Vercel:** `NEXT_PUBLIC_GSC_VERIFICATION` con el código real de Search Console

**Semanas 2 y 3: migrar la v3**
- [ ] Rutas de la tabla de URLs con `generateMetadata()` y JSON-LD en servidor
- [ ] Redirecciones 301 desde las rutas actuales
- [ ] `opengraph-image.tsx` por unidad
- [ ] Eventos de la taxonomía; GA4 con eventos clave; conversiones de Google Ads; Meta Pixel desde GTM

**Semana 4 en adelante: crecer**
- [ ] Google Business Profile
- [ ] 2 artículos al mes por tema
- [ ] Tablero en Looker Studio (GA4 + Search Console + Brevo)
- [ ] Importación de conversiones offline

## 5. Pendientes de negocio

Hay que confirmarlos antes de publicar:

- **Capacidades industriales:** alcance eléctrico (baja o media tensión), permisos, seguros y certificaciones del equipo. La página comercial e industrial no afirma certificaciones; dice que el alcance se confirma en el levantamiento.
- **Agentes de IA:** confirmar qué modelos, herramientas y plataformas se ofrecen, y si hay casos propios que se puedan publicar.
- **Domótica:** marcas y ecosistemas con los que se trabaja.
- **Contenido visual:** fotos propias por unidad, para las imágenes OG y Google Business Profile.
