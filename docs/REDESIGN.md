# Aurhora — Plan Maestro de Rediseño

> Documento vivo. Última actualización: 2026-05-30.
> Objetivo: convertir el sitio de "plantilla de agencia genérica" a una experiencia
> que **transmita expertise tecnológica** y **venda**, lista para sostener campañas.

---

## 1. Dirección aprobada

| Decisión | Elección | Implicación |
|---|---|---|
| **Estética** | Elegante con color controlado (Stripe / Framer) | Base limpia, **un** gradiente firma de 2 tonos, profundidad sutil, cálido pero pulcro. Accesible para PyMEs. |
| **Flujo** | Mockup vivo en código + screenshots | El MCP de Figma en este entorno solo expone `upload_assets` (no autora diseño). Se aprueba la dirección con un "style tile" + Hero reales en el stack, vía screenshots. Lo aprobado **es** el sitio real. |
| **Alcance** | Rediseño + re-arquitectura | Una sola fuente de verdad de diseño, romper monolitos, motion library propia. |

**No-negociables del nuevo look** (lo que mata el "genérico"):
- ❌ Fuera el gradiente arcoíris `cyan → purple → pink`.
- ✅ **Un** gradiente firma de 2 tonos (violeta → azul/cyan), reservado para momentos clave (hero, CTAs).
- ✅ Neutros como base (escala `zinc`), no grises lavados.
- ✅ Monoespaciada como acento (eyebrows, labels, métricas) — señal de producto técnico.
- ✅ Motion con intención (spring, scroll-linked, stagger), no fades decorativos.
- ✅ Restricción y precisión: espacios generosos, bordes de 1px, jerarquía clara.

---

## 2. Auditoría del estado actual

### 2.1 Arquitectura (deuda crítica)
- `AurhoraLanding.tsx` → **1,676 líneas**. `GoDigitalSuitePage.tsx` → **1,636 líneas**. Monolitos imposibles de iterar con calidad.
- Secciones (Hero, Servicios, Filosofía, Proceso, About, CTA, Modal) viven todas en un solo archivo, con lógica de canvas, estado de formulario y markup mezclados.
- **Acción:** descomponer en componentes de sección bajo `components/landing/` y `components/godigital/`, cada uno con su propio archivo y responsabilidad única.

### 2.2 Sistema de diseño (la causa raíz del "genérico")
- **Tres sistemas en conflicto, ninguno aplicado:**
  - `src/lib/design-system/tokens.ts` (marca cyan/purple/pink)
  - `src/lib/design-system/stripe-tokens.ts` (otro set púrpura/cyan)
  - Clases Tailwind hardcodeadas en cada componente (la realidad efectiva)
- No hay fuente única de verdad → todo se ve "casi pero no".
- **Seis colores de acento** simultáneos (cyan, purple, pink, emerald, blue, amber) + gradientes multicolor = señal de plantilla.
- **Acción:** un solo `design-system` cableado a `tailwind.config` vía CSS variables. Borrar los duplicados.

### 2.3 Animación / fondo
- **Dos sistemas de canvas corriendo a la vez** en el home:
  - Partículas 3D en `AurhoraLanding.tsx` (rAF loop)
  - `AuroraWaves.tsx` (rAF loop, 6 ondas + rayos + 60 partículas)
- Costo de rendimiento doble y el look "aurora rainbow" es justo lo genérico.
- Framer Motion presente pero subutilizado (solo `fadeInUp`).
- **Acción:** un solo fondo con criterio (mesh de un tono / grid sutil) o ninguno; motion library reutilizable con variantes de craft.

### 2.4 Contenido / credibilidad
- ✅ Ya removido: marquee de clientes ficticios + bloque de stats falsas (500+ proyectos, 50+ clientes) + clientes inventados en About.
- ⚠️ Propuesta de valor del hero aún genérica ("Tu socio estratégico en transformación digital") — sin diferenciador.
- ⚠️ Testimonial genérico (Ana Rodríguez) sigue en `SocialProofSection` (componente desconectado, conservado).
- **Pendiente de negocio:** sin clientes reales todavía → el rediseño debe vender por **claridad de oferta, proceso y expertise**, no por prueba social inflada.

### 2.5 Funcional (bugs a corregir durante el rebuild)
- ✅ `api/contact/route.ts`: corregido el `fs.readFile` (plantillas ahora son funciones JS serverless-safe) **y migrado de Resend → Brevo** (REST API vía fetch). El SDK de Resend ignoraba errores → 200 falsos; ahora se revisa el error y se devuelve 502 con detalle. **Pendiente del usuario:** configurar `BREVO_API_KEY` (+ opcional `BREVO_SENDER_EMAIL`/`BREVO_ADMIN_EMAIL`) en `.env.local` y en Vercel, y autenticar el dominio remitente en Brevo. Dep `resend` quedó sin uso (retirar en limpieza).
- 🐞 ESLint y TypeScript **desactivados en build** (commits `64cf723`, `cd58799`). Rehabilitar y corregir de raíz.
- ⚠️ Dominio de correo `aurhora.it.com` (subdominio de `it.com`) — afecta confianza y deliverability. Evaluar dominio propio.
- ⚠️ `lodash` completo importado — revisar y reemplazar por utilidades nativas/puntuales.

### 2.6 Lo que SÍ está bien (conservar)
- Stack moderno y correcto: Next 15, React 19, next-intl (ES/EN/PT), Framer Motion, Tailwind 3.4, Zod + react-hook-form, Resend.
- SEO base: `sitemap.ts`, `robots.ts`, `metadata.ts`.
- i18n bien estructurado con 3 idiomas.
- `CookieConsent` con categorías ya definidas (listo para conectar analytics en la fase de marketing).
- Optimizaciones móviles existentes (frame limiting, conteo de partículas adaptativo).

---

## 3. Sistema de diseño objetivo (especificación)

> ✅ **Dirección v1 "Aurora controlada" APROBADA** (2026-05-30). Mockup vivo en `src/app/[locale]/mockup/page.tsx` (ruta `/es/mockup`).
> Aprobado: tono general, gradiente aurora violeta→indigo→cyan tal cual, y proporción claro-dominante con secciones oscuras de acento.

### Tokens fijados (valores exactos del mockup aprobado)
```
Neutros:   ink #09090B · ink-soft #27272A · secondary #52525B · line #E4E4E7 · surface #FAFAFA · white #FFFFFF
Aurora:    violet #7C3AED · indigo #4F46E5 · blue #2563EB · cyan #06B6D4
Firma:     linear-gradient(110deg, #7C3AED 0%, #4F46E5 45%, #06B6D4 100%)   ← solo en momentos clave
Dark bg:   #0A0A0F  (+ glows radiales violeta/cyan/blue a baja opacidad)
Fuentes:   Geist Sans (display/body) · Geist Mono (eyebrows, labels, métricas, badges)
```

### Color
- **Neutros (base):** escala `zinc` (#FAFAFA → #18181B). Texto tinta profunda, no negro puro.
- **Acento primario:** familia violeta (un solo tono dominante para sólidos/links).
- **Gradiente firma (2 tonos):** violeta → azul/cyan. **Solo** en hero, CTAs clave y 1-2 acentos. Nunca arcoíris.
- **Soporte dual-theme** (claro/oscuro) rediseñando ambos, no solo invirtiendo.

### Tipografía
- **Sans:** Geist / Inter (mantener) para UI y cuerpo.
- **Mono:** Geist Mono / JetBrains Mono como **acento** — eyebrows, labels, métricas, badges. Señal técnica.
- Escala tipográfica con `clamp()` consolidada (ya existe base, unificar a una sola).

### Espacio, forma, profundidad
- Espaciado de sección generoso (adoptar el de `stripe-tokens`: ~8rem / 6rem móvil).
- Radios consistentes (`lg`/`xl`/`2xl`).
- Sombras sutiles por capas (ya definidas en `stripe-tokens`).
- Bordes de 1px de bajo contraste como recurso estructural.

### Motion (librería propia `lib/motion/`)
- Variantes reutilizables: `Reveal`, `Stagger`, `FadeUp`, `Scale`.
- Componentes: `MagneticButton`, `CountUp`, `ScrollProgress`, `TiltCard`.
- Principios: spring physics, scroll-linked, `viewport once`, respeto a `prefers-reduced-motion`.

---

## 4. Re-arquitectura

```
src/
  lib/
    design-system/
      aurora.ts           # ✅ FUENTE ÚNICA del rediseño (tokens aprobados + ease + fonts)
      tokens.ts           # ⚠️ legacy — aún cableado a tailwind por el sitio viejo; retirar al final
    motion/               # ✅ variantes + Reveal/Stagger/MagneticButton/CountUp + index
  components/
    ui/                   # ✅ Button, Badge, Eyebrow, Section, Card, GradientText + index
    landing/              # Hero, Services, Philosophy, Process, About, FinalCTA (Fase 3)
    godigital/            # secciones de la GoDigital Suite (Fase 4)
    layout/               # Header, Footer, MegaMenu, chrome global (Fase 2)
```

**Nota de transición:** el nuevo sistema (`aurora.ts` + CSS vars + utilidades Tailwind `ink/surface/line/aurora-*/bg-aurora`) **convive** con el legacy para que el sitio actual siga funcionando durante el rebuild. `stripe-tokens.ts` ya se eliminó (no usado). El `safelist` de colores arcoíris y `tokens.ts` legacy se retiran cuando caigan los monolitos.

- `tailwind.config` consume los tokens vía CSS variables (cambio de tema sin duplicar clases).
- Cada sección = un componente testeable y reutilizable.
- Modal de contacto y formulario extraídos a su propio módulo.

---

## 5. Plan por fases

| Fase | Entregable | Estado |
|---|---|---|
| **0. Fundaciones** | Tokens únicos + tailwind cableado + fuentes + `lib/motion/` base. Sin cambio visual aún. | ✅ |
| **1. Dirección en Figma** | Hero + 1 sección clave maquetados en el estilo aprobado. **Tú apruebas.** | ⬜ |
| **2. Design system + chrome** | Primitivas `ui/`, Header y Footer rediseñados, Hero implementado. Preview en `/es/v2`. | ✅ |
| **3. Landing** | Secciones del home reconstruidas + swap a vivo: `/es` = `HomeView` (chrome + secciones + `ContactModal` real). `/v2` eliminado. | ✅ |
| **4. Páginas internas** | Páginas de servicio + GoDigital Suite con el nuevo sistema. | ⬜ |
| **5. Pulido** | Performance (Core Web Vitals), accesibilidad, responsive, fix de bugs funcionales (§2.5). | ⬜ |
| **6. Marketing (track aparte, después)** | GTM + GA4 + Meta Pixel conectados a CookieConsent, UTMs, eventos de conversión, Calendly/WhatsApp. | ⬜ |

> Acordado: **primero gráfico y funcional (Fases 0–5), luego marketing (Fase 6).**

**Estado del swap (2026-05-30):** el home vivo `/es` ya es el rediseño (`components/landing/HomeView.tsx`). El monolito `AurhoraLanding.tsx` queda **sin uso por el home** pero NO se borra aún: las páginas internas (servicios, quiénes-somos) siguen usando `ClientLayout` + Header/Footer legacy. Se retiran al migrar las internas (Fase 4).

**⚠️ Prioridad elevada:** ahora que el `ContactModal` es el camino de conversión vivo, el bug de `fs.readFile` en `api/contact/route.ts` (falla en serverless) debe corregirse antes/al inicio de Fase 5. Ver [[aurhora-functional-bugs]].

---

## 6. Herramientas y skills de Claude Code

**No hace falta instalar nada nuevo.** Lo de mayor impacto ya está disponible:

- **MCP de Figma** (ya conectado) → flujo "Figma primero". Skills disponibles: `/figma-use`, `/figma-generate-design`, `/figma-generate-library`.
- **Preview / screenshots** (`Claude_Preview`) → puedo ver el render real e iterar visualmente, cerrando el ciclo de feedback de diseño.
- **Capacidad nativa** → Next.js + Framer Motion + Tailwind de alto nivel no requiere plugins.

**Instalaciones que SÍ podrían sumar (librerías npm, no plugins de Claude):**
- `Geist Mono` / `JetBrains Mono` (fuente mono de acento).
- Posible set de primitivas accesibles (a evaluar; mantener el stack lean).

---

## 7. Definición de "terminado" por fase
- **Visual:** fiel al Figma aprobado, dual-theme, responsive (móvil → desktop).
- **Código:** componentes < 300 líneas, tokens centralizados, sin clases de color hardcodeadas.
- **Calidad:** ESLint + TypeScript en verde en build (rehabilitados).
- **Performance:** sin doble rAF loop; Core Web Vitals en verde.
- **A11y:** foco visible, `prefers-reduced-motion`, contraste AA.
