# Lanzamiento del sitio v3

Lista para publicar `feat/sitio-v3-nextjs` en www.aurhora.agency. Cada paso indica cómo comprobarlo.

## 1. Vista previa en Vercel

1. Abrir el PR: https://github.com/AldhairGC/Aurhora-Principal/pull/new/feat/sitio-v3-nextjs (base `main`).
2. Esperar el comentario o el check de Vercel con la URL de la vista previa.
3. Recorrer en la vista previa: inicio, las tres unidades, dos servicios, una guía, contacto, mapa del sitio y una URL vieja (`/es/servicios/godigital` debe llevar a `/digital/godigital`).
4. En Vercel → Settings → Environment Variables, borrar las variables `BREVO_*` (el sitio ya no las usa). Opcional: `NEXT_PUBLIC_GSC_VERIFICATION` si se verifica Search Console por meta etiqueta.

## 2. Dominio

1. Vercel → Settings → Domains: `www.aurhora.agency` como dominio principal.
2. `aurhora.agency` (sin www) con redirección 308 a `www.aurhora.agency`.
3. Comprobar: `curl -I https://aurhora.agency` responde 308 con `location: https://www.aurhora.agency/`.

## 3. Google Tag Manager (contenedor GTM-TMP9R7B6)

El sitio ya hace esto por su cuenta:
- Declara Consent Mode v2 en `<head>` antes de GTM, todo en `denied`, y aplica la elección guardada.
- Envía `consent_update` cuando la persona decide en el banner.
- Envía al `dataLayer` los eventos `page_view` (también al navegar sin recargar), `generate_lead`, `whatsapp_click`, `phone_click`, `email_click`, `form_progress` y `select_content`.
- Carga Microsoft Clarity solo con consentimiento de analítica (no configurarlo en GTM).

En el contenedor, revisar paso a paso:

| # | Qué revisar | Cómo comprobarlo |
|---|---|---|
| 1 | Configuración de consentimiento activada (Admin → Configuración del contenedor → "Habilitar la vista general del consentimiento"). | Aparece el escudo de consentimiento en la lista de etiquetas. |
| 2 | Etiqueta de Google (GA4) con consentimiento requerido `analytics_storage`. | Vista previa de GTM: con "Rechazar opcionales", la etiqueta aparece como bloqueada por consentimiento. |
| 3 | Página vista de GA4: desactivar "Enviar evento de página vista" automático y crear una etiqueta de evento GA4 `page_view` con el activador "Evento personalizado = page_view", usando `page_path` y `page_title` de la capa de datos. | En DebugView de GA4, una sola página vista por página, también al navegar entre páginas. |
| 4 | Etiquetas de evento GA4 para `generate_lead` y `whatsapp_click` (con `unit` y `service` como parámetros). Marcarlas como eventos clave en GA4. | Vista previa: completar el formulario de contacto hasta "Continuar en WhatsApp". |
| 5 | Google Ads (conversión) y píxel de Meta con consentimiento requerido `ad_storage` / `ad_user_data`. | Vista previa: con "Rechazar opcionales" no se disparan; con "Aceptar todas", sí. |
| 6 | No duplicar Clarity ni el banner de cookies dentro de GTM. | La lista de etiquetas no incluye Clarity ni otro banner. |
| 7 | Publicar una versión del contenedor con nombre "Sitio v3". | Versiones → la versión publicada. |

## 4. Publicación

1. Unir el PR a `main` (Vercel publica en producción).
2. Repetir en producción la revisión del paso 1.3 y de GTM en modo vista previa.

## 5. Search Console

1. Propiedad de dominio `aurhora.agency` (verificación por DNS) o de prefijo `https://www.aurhora.agency/`.
2. Sitemaps → enviar `https://www.aurhora.agency/sitemap.xml`.
3. Inspección de URL: inicio, `/facilities/plomeria` y `/digital/agentes-de-ia` → "Solicitar indexación".
4. Revisar Páginas → "Página con redirección" y "No encontrada (404)" durante las dos primeras semanas.

## 6. Prueba en teléfono real

- El botón "Continuar en WhatsApp" abre WhatsApp con el mensaje armado y el número +52 55 8299 1282.
- El banner de cookies aparece en la primera visita y "Preferencias de cookies" lo vuelve a abrir.
- El video del inicio se reproduce.
- El menú, los formularios y las tablas de precios se leen bien sin desplazamiento horizontal.
