# Aurhora Agency — sitio web

Sitio de [aurhora.agency](https://www.aurhora.agency): Aurhora Agency y sus tres unidades, Aurhora Digital, Aurhora Integra y Aurhora Facilities. Solo en español (México).

## Stack

- Next.js 15 (App Router) y React 19; todas las páginas se generan de forma estática.
- Tailwind CSS 3 con los tokens de marca en `src/app/globals.css`.
- Componentes basados en Radix (shadcn/ui), framer-motion y lucide-react.

## Desarrollo

```bash
npm install
npm run dev
```

`npm run build` genera el sitio y verifica tipos y lint.

## Estructura

| Carpeta | Contenido |
|---|---|
| `src/content/` | Todo el texto del sitio: unidades, servicios, precios (`extras-*.ts`), guías (`articles*.ts`) y textos legales. |
| `src/views/` | Vistas de cada tipo de página (inicio, unidades, servicio, guía, legales, mapa del sitio). |
| `src/components/` | Componentes de marca, secciones, interactivos y el encabezado y pie. |
| `src/app/[[...slug]]/` | Ruta única: genera cada página a partir de su `seo.slug`, con metadatos y JSON-LD. |
| `src/lib/routes.ts` | Tabla de vistas y URLs. Una página nueva necesita su `seo.slug` en `src/content/`. |
| `src/lib/analytics/` | Eventos para Google Tag Manager y Consent Mode v2. |

## Contenido y precios

- Los precios se publican como "Desde $X" con IVA incluido. La regla está en `prototypes/aurhora-v2/DECISIONES.md` (rama del prototipo) y en `docs/GUIA_DE_MARCA.md`.
- Las solicitudes de contacto se arman en el sitio y continúan por WhatsApp. La integración con el CRM (Zoho) queda para una fase posterior.

## Medición

- Consent Mode v2 se declara en `<head>` antes de GTM (`GTM-TMP9R7B6`); todo empieza en "denied".
- GA4, Google Ads y Meta se configuran dentro del contenedor de GTM. Microsoft Clarity se carga desde el sitio solo con consentimiento de analítica.
- Eventos en `dataLayer`: `page_view`, `generate_lead`, `whatsapp_click`, `phone_click`, `email_click`, `form_progress`, `select_content` y `consent_update`.

## Variables de entorno

Ver `.env.example`. Solo `NEXT_PUBLIC_GSC_VERIFICATION` (opcional) para la verificación de Search Console.

## SEO

- `sitemap.xml` y `robots.txt` se generan desde el contenido.
- Las URLs del sitio anterior (`/es`, `/en`, `/pt` y sus servicios) redirigen de forma permanente a las nuevas (`next.config.ts`).
- El dominio canónico es `https://www.aurhora.agency`.
