# Aurhora v3: prototipo React

Esta versión toma el contenido y las decisiones de `../aurhora-v2/` (copy, `DECISIONES.md`, tokens y logotipos) y los rehace como una app React con Tailwind y shadcn/ui. El resultado se empaqueta en un solo `bundle.html` para publicarlo como artifact.

## Comandos

```powershell
pnpm install
pnpm dev       # http://localhost:5173
pnpm bundle    # parcel build + scripts/inline.mjs → bundle.html
```

Si `pnpm install` bloquea los build scripts de parcel/swc, el bundle funciona igual. Para quitar el aviso, ejecuta `pnpm approve-builds`.

## Estructura

- `src/content/`: todo el texto. `site.ts` tiene unidades, horario, zonas, el catálogo de contacto y el SEO de Grupo y Contacto. `services.ts` tiene los 16 servicios con lo que incluye, señales, proceso, FAQ, servicios relacionados y su ficha SEO (URL de producción, title, description y palabras clave).
- `src/content/articles.ts`: las 7 guías de Recursos, cada una ligada a un servicio. `src/content/legal.ts`: aviso de privacidad, términos y política de cookies (borrador, pendiente de revisión legal).
- `src/lib/seo.ts`: title, description y JSON-LD por vista. `src/lib/analytics.ts`: eventos a `dataLayer`. Ambos se pueden revisar en el panel "Ficha SEO y medición" del pie de página. El plan completo para producción está en `docs/SEO_ANALYTICS_V3.md`.
- `src/pages/`: Grupo, las tres unidades, la plantilla de servicio y Contacto.
- `src/components/interactive/`:
  - buscador "¿qué necesitas?"
  - diagnóstico por síntomas
  - verificador de zona
  - horario en vivo (CDMX)
  - plano de Integra
  - punto de partida de Digital
  - recorrido de un local
  - formulario de contacto en 3 pasos que arma el mensaje de WhatsApp
- `src/lib/router.tsx`: cada vista es un token de hash simple (`#digital`, `#aire-acondicionado`…). No se usan rutas tipo `#/x`, porque el visor de artifacts no las transmite.

## Límites

- No muestra precios, cifras, clientes ni testimonios inventados. Los espacios para casos, fotos y testimonios están marcados como tales.
- El formulario no envía nada: abre WhatsApp con el mensaje y permite copiarlo.
- Las fuentes Sora, Geist y Geist Mono se cargan desde Google Fonts.

## Para producción (SEO)

- **Dominio canónico:** `https://www.aurhora.agency` (`SITE.url`). En Vercel, la redirección del dominio sin www debe ser permanente (308), no 307.
- **Archivos que el schema ya referencia:** `public/logo.png` (512 × 512) y una imagen `opengraph-image` por artículo en `/recursos/<slug>/opengraph-image` (convención de Next.js).
- **Contenido indexable:** las preguntas frecuentes usan `<details>` y las pestañas se montan siempre, así que todo su texto está en el HTML del servidor.
