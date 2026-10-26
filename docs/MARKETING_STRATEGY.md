# Aurhora Agency — Estrategia de Marketing y Adquisición (Plan Maestro)

> **Versión 1.0 — Mayo 2026**
> Documento operativo del sistema de marketing de Aurhora. Diseñado para un escenario **organic-first**, **fundador ejecutando solo**, **presupuesto de pauta ≤ $2,000 MXN/mes**, y **foco PyMEs México (producto ancla: GoDigital Suite)**.

---

## 0. Resumen ejecutivo (TL;DR)

El sitio ya está renovado y funcional, pero **no está "armado" para adquirir clientes**: mide visitas pero no conversiones, no tiene píxeles de publicidad, no hay CRM conectado, ni WhatsApp (el canal donde cierran las PyMEs en México), y las redes están dispersas en cuentas personales.

La estrategia se construye en 3 capas:

1. **Cimientos (Semanas 1–2):** convertir el sitio en una máquina medible — eventos de conversión, píxeles, CRM gratuito (Brevo, que ya usas), WhatsApp, Google Business Profile, consolidación de cuentas.
2. **Motor orgánico (Semanas 3–8):** sistema de contenido de bajo esfuerzo para 1 fundador — batching semanal, 5 pilares, distribución en LinkedIn + Instagram/Facebook + Google Business, con repurposing.
3. **Aceleración + optimización (Semanas 9–12+):** pauta quirúrgica con $2k MXN (retargeting + alta intención), nurturing automatizado, y un tablero semanal que tú monitoreas en 15 min.

**Producto ancla del trimestre:** GoDigital Suite (ticket desde $25k MXN, implementación 1–2 semanas, ciclo corto). Es la oferta perfecta para generar tracción, casos de éxito y flujo rápido con PyMEs.

**North Star del trimestre:** _Demos agendadas calificadas / mes_ (proxy directo de pipeline).

---

## 1. Punto de partida: auditoría del estado actual

### 1.1 Lo que YA tienes (activos a aprovechar)
| Activo | Estado | Nota |
|---|---|---|
| Sitio Next.js 15, multiidioma (es-MX, en-US, pt-BR) | ✅ Vivo | Base sólida y rápida |
| Google Analytics 4 | ✅ Cableado (`G-NRPDQSXEZJ`) | Solo mide pageviews, **falta eventos** |
| Google Tag Manager | ✅ Cableado (`GTM-TMP9R7B6`) | Contenedor listo para píxeles |
| Microsoft Clarity | ✅ Cableado (`rxjrrdz9v5`) | Mapas de calor / grabaciones |
| Formulario de contacto | ✅ Funcional vía Brevo | Captura `source` por CTA — atribución lista |
| Brevo (email transaccional) | ✅ En uso | **Incluye CRM + automatización gratis** |
| GoDigital Suite (3 planes) | ✅ Publicado | Producto ancla, mini-CRM en plan 360 |
| Handles sociales definidos | ⚠️ Nombrados | `@aurhora.agency` (IG/FB), `linkedin.com/company/aurhora-agency` |

### 1.2 Brechas críticas (lo que bloquea las campañas)
- ⛔ **No hay eventos de conversión.** GA4 solo ve visitas; no sabes cuántos llenan el formulario, agendan demo o eligen plan.
- ⛔ **No hay píxeles de publicidad.** Sin Meta Pixel / LinkedIn Insight Tag / Google Ads tag no puedes hacer retargeting ni medir ROAS.
- ⛔ **No hay WhatsApp.** Para PyMEs MX es EL canal de cierre. Hoy no existe en el sitio.
- ⛔ **No hay CRM conectado.** Los leads llegan por email y se pierden; no hay pipeline ni seguimiento.
- ⛔ **Redes dispersas / sin consolidar.** Cuentas personales y de marca mezcladas, sin gestión central.
- ⛔ **No hay Google Business Profile.** Pierdes búsquedas locales y reseñas (prueba social clave para PyMEs).
- ⚠️ **Analytics se dispara sin consentimiento.** Los scripts cargan en `layout.tsx` ignorando el `CookieConsent`; conviene alinearlo con tu Aviso de Privacidad.
- ✅ **Dominio oficial confirmado: `aurhora.agency`** (mayo 2026). Se eliminaron las referencias al antiguo `aurhora.it.com` en código y docs activos. README y stack de email actualizados a Brevo.

---

## 2. Fundamentos del marketing (Capa 1 — Semanas 1–2)

> Objetivo: que cada peso y cada clic sea **medible y atribuible** antes de gastar en pauta o producir contenido.

### 2.1 Modelo de medición — eventos de conversión
Definir y disparar estos eventos vía `dataLayer` → GTM → GA4 (y píxeles). Mapeo recomendado:

| Evento | Cuándo se dispara | Valor / parámetro |
|---|---|---|
| `contact_submit` | Envío exitoso del formulario | `source` (ya capturado), `service` |
| `demo_scheduled` | CTA "Agendar demo gratis" enviado | `source`, `plan` |
| `plan_selected` | Click en un plan de GoDigital | `plan` (basic/professional/360) |
| `whatsapp_click` | Click en botón de WhatsApp | `source` (página) |
| `phone_click` / `email_click` | Click en tel/mail | — |
| `scroll_75` | Scroll 75% en páginas de servicio | engagement |
| `view_pricing` | Vista de sección de planes | intención |

**Conversiones primarias en GA4:** `demo_scheduled`, `contact_submit`, `whatsapp_click`.
**Conversiones secundarias (micro):** `plan_selected`, `view_pricing`.

> _Implementación técnica disponible en el repo (ver §10 "Backlog técnico")._

### 2.2 Píxeles y etiquetas (todo vía GTM, sin tocar código extra)
- **Meta Pixel** (Facebook/Instagram Ads) → eventos estándar `Lead`, `Contact`, `ViewContent`.
- **LinkedIn Insight Tag** → para audiencias B2B (útil cuando actives el track Estratégico).
- **Google Ads Tag + conversion linker** → para search/retargeting de alta intención.
- **Google Search Console** → verificar dominio, subir sitemap (ya generas `sitemap.ts`).

### 2.3 Convención de UTMs (disciplina de atribución)
Formato estándar para TODO enlace saliente:
```
?utm_source={canal}&utm_medium={tipo}&utm_campaign={campaña}&utm_content={pieza}
```
Ejemplos:
- LinkedIn orgánico: `utm_source=linkedin&utm_medium=organic&utm_campaign=godigital_lanzamiento&utm_content=carrusel_3pasos`
- Bio de Instagram: `utm_source=instagram&utm_medium=bio&utm_campaign=evergreen`
- Meta Ads retargeting: `utm_source=meta&utm_medium=cpc&utm_campaign=retargeting_godigital`

> Mantén una **hoja de UTMs** (Google Sheets) como fuente de verdad. Usa siempre minúsculas y guion bajo.

### 2.4 WhatsApp Business (canal de cierre #1 para PyMEs MX)
- Crear **WhatsApp Business** con número de marca.
- Botón flotante en el sitio (`wa.me/52XXXXXXXXXX` con mensaje pre-llenado por página).
- **Mensaje de bienvenida** + **respuestas rápidas** (catálogo de servicios, precios GoDigital, "agendar demo").
- **Mensaje de ausencia** fuera de horario.
- Integrar el click como evento `whatsapp_click` para medir.

### 2.5 Google Business Profile (GBP)
- Crear/reclamar perfil de Aurhora Agency.
- Categoría: "Agencia de marketing" / "Servicio de diseño de sitios web" / "Consultor de negocios".
- Completar: descripción, servicios, fotos, horario, enlace al sitio con UTM, WhatsApp.
- **Pedir reseñas** a clientes actuales (prueba social = el activo más barato y potente para PyMEs).

---

## 3. Consolidación de identidad digital (Capa 1 — Semana 1)

> Objetivo: una sola marca coherente, dejando de "regar" presencia en cuentas personales.

### 3.1 Inventario y limpieza
1. **Listar todas las cuentas existentes** (personales y de marca): IG, FB, LinkedIn, TikTok, YouTube, X, etc.
2. Decidir por cada una: **migrar / mantener / archivar**.
3. Mover seguidores relevantes de cuentas personales a la página de marca (publicación de anuncio + invitaciones).

### 3.2 Estandarización de marca
- **Handle único:** `@aurhora.agency` en todas las plataformas (reservar aunque no se usen aún).
- **Kit de marca:** logo, paleta (la del sitio), tipografías (Geist), tono de voz, plantillas Canva.
- **Bios consistentes** con misma propuesta de valor + 1 CTA + enlace.
- **Enlace en bio:** página dedicada en tu propio sitio (`/links` o el home con UTMs) en lugar de Linktree — mantienes el tráfico en tu dominio y lo mides.

### 3.3 Conexión estructurada de canales (centros de control)
- **Meta Business Suite:** conecta IG + FB en un solo inbox y planificador. Activa Instagram como cuenta de empresa.
- **LinkedIn:** Página de empresa + tú como "empleado/fundador" (tu perfil personal es tu mejor canal B2B).
- **Planificador unificado:** programar desde Meta Business Suite (gratis) + LinkedIn nativo. (Buffer free como opción si quieres todo en uno.)

---

## 4. Arquitectura de canales (qué hace cada uno)

> Con foco PyME MX y un solo ejecutor, **menos canales bien hechos > muchos a medias.** Prioridad:

| Canal | Rol en el funnel | Prioridad | Cadencia realista (solo founder) |
|---|---|---|---|
| **Instagram + Facebook** | Awareness + confianza (dueños PyME viven aquí) | 🥇 Alta | 3 posts/sem + 3–5 stories/sem |
| **LinkedIn (perfil personal)** | Autoridad B2B + prospección directa | 🥇 Alta | 3 posts/sem + 5 DMs/día |
| **Google Business Profile** | Intención local + reseñas | 🥈 Media | 1 post/sem + responder reseñas |
| **WhatsApp** | Conversión / cierre | 🥇 Alta | Reactivo + plantillas |
| **Email (Brevo)** | Nurturing + reactivación | 🥈 Media | 1 newsletter quincenal + secuencias auto |
| **Sitio / Blog (SEO)** | Captura evergreen + autoridad | 🥉 Media-baja | 2 artículos/mes |
| **YouTube/TikTok (Reels)** | Alcance orgánico | 🥉 Opcional | Repurpose de Reels |

---

## 5. Estrategia de contenido (Capa 2 — el motor)

### 5.1 Los 5 pilares de contenido
1. **Educar (transformación digital sin tecnicismos):** "qué es", "por dónde empezar", mitos.
2. **Mostrar resultados (prueba):** casos, antes/después, métricas, testimonios.
3. **Detrás de cámaras / cultura:** humaniza la marca, proceso de trabajo, equipo.
4. **Oferta / producto (GoDigital):** beneficios, planes, "para quién es", FAQ, demos.
5. **Autoridad / tendencias:** IA aplicada a PyMEs, herramientas, opinión del fundador.

**Mezcla recomendada (regla 4-1-1 adaptada):** por cada 6 piezas → 4 de valor (pilares 1, 3, 5), 1 de prueba (pilar 2), 1 de oferta directa (pilar 4).

### 5.2 Sistema de producción de bajo esfuerzo (clave para 1 persona)
**Batching semanal (medio día/semana):**
1. **Lunes (90 min):** elegir 1 tema ancla de la semana (1 idea grande).
2. Crear **1 pieza pilar** (carrusel o video corto) + **derivados**:
   - 1 carrusel IG/LinkedIn → 1 Reel → 3 stories → 1 post de texto LinkedIn → 1 corte para email.
3. **Programar todo** en Meta Business Suite + LinkedIn.
4. El resto de la semana: solo **responder/interactuar** (no producir).

> Principio: **1 idea → 6 piezas → 5 canales.** Producir una vez, distribuir muchas veces.

### 5.3 Calendario tipo (semana estándar)
| Día | Instagram/FB | LinkedIn | GBP / Email |
|---|---|---|---|
| Lun | Carrusel (pilar valor) | Post texto (autoridad) | — |
| Mar | Stories (detrás de cámaras) | Comentar en 5 perfiles ICP | Post GBP |
| Mié | Reel (educar) | Carrusel (mismo de IG) | — |
| Jue | Stories (encuesta/CTA) | DMs a 5 prospectos | — |
| Vie | Post prueba/caso | Post personal (storytelling) | Newsletter (quincenal) |

### 5.4 Aprovecha tus skills de Claude ya instaladas (plugin Aurhora)
Tienes un plugin a la medida que reduce drásticamente el esfuerzo:
- **`/content-strategy`** → brief mensual de contenido priorizado (qué publicar, qué servicio empujar).
- **`/canva-creator`** → ejecuta el brief: calendario + diseños Canva + copys + cola en HubSpot.
- **`/lead-triage`** → ranking diario de prospectos desde Gmail con talking points.
- **`/run-campaign`** → campaña end-to-end (análisis → brief → assets → envío).
- **`/monday-brief`** → resumen semanal de una página.

> **Flujo recomendado:** `/content-strategy` (mensual) → `/canva-creator` (semanal) → `/lead-triage` (diario) → `/monday-brief` (lunes).

---

## 6. CRM y automatización (Capa 1+2)

### 6.1 Hub central: Brevo (ya lo usas — máximo aprovechamiento, costo $0)
En lugar de sumar HubSpot, **centraliza en Brevo** (ya envía tus emails transaccionales):
- **CRM gratuito:** contactos, pipeline de deals, tareas.
- **Automatización de marketing:** flujos por comportamiento.
- **Email marketing:** newsletter + secuencias.
- **Formularios + landing pages** (si necesitas captar lead magnets).

> _Alternativa si creces:_ HubSpot Free CRM (más robusto para B2B/track Estratégico más adelante).

### 6.2 Conectar el formulario del sitio → CRM
Hoy el formulario solo manda email. Conectarlo a Brevo CRM para que **cada lead se vuelva un contacto + deal automáticamente**, con el `source` como etiqueta de atribución. (Vía API de Brevo Contacts en el mismo endpoint, o Make/Zapfree.)

### 6.3 Pipeline de ventas (GoDigital — ciclo corto)
```
Nuevo lead → Contactado → Demo agendada → Propuesta enviada → Negociación → Ganado / Perdido
```
Cada etapa con: tarea automática + recordatorio + plantilla de mensaje.

### 6.4 Respuestas automáticas por canal
- **Sitio (ya existe):** email de confirmación al usuario + aviso al equipo. ✅
- **WhatsApp Business:** bienvenida + respuestas rápidas + ausencia.
- **Instagram/Facebook (Meta):** respuestas automáticas a DMs y comentarios con palabras clave (ej. "PRECIO" → envía info de GoDigital).
- **Email (Brevo):** secuencia de bienvenida (3 correos) para nuevos leads que no agendan demo.

### 6.5 Secuencia de nurturing (leads que no cierran de inmediato)
| Día | Canal | Contenido |
|---|---|---|
| 0 | Email | Confirmación + qué esperar (ya existe) |
| 1 | Email | Caso de éxito GoDigital + invitación a demo |
| 3 | WhatsApp | Mensaje personal del fundador (manual o plantilla) |
| 5 | Email | FAQ + manejo de objeciones (precio/tiempo) |
| 10 | Email | Última llamada + incentivo (auditoría gratis) |

---

## 7. Publicidad pagada con $2,000 MXN/mes (pauta quirúrgica)

> $2k MXN/mes (~$110 USD) es muy poco para prospección fría. **La regla: gastar solo donde la intención ya es alta.** No prospección masiva todavía.

### 7.1 Asignación recomendada
| Uso | % | Monto | Por qué |
|---|---|---|---|
| **Meta retargeting** (visitantes del sitio + engagers IG/FB) | 60% | ~$1,200 | Audiencia tibia, CPC bajo, alta conversión |
| **Boost de mejor post orgánico del mes** | 25% | ~$500 | Amplifica lo que ya funciona, baja prueba social |
| **Google Search (alta intención, exacta)** | 15% | ~$300 | 2–3 keywords tipo "página web para mi negocio", "agencia transformación digital pyme" |

### 7.2 Reglas de oro con presupuesto chico
- **No** lanzar campañas frías de awareness pagadas (te quemas el presupuesto).
- Necesitas el **Meta Pixel funcionando + audiencia de ≥ visitantes** antes de retargeting (de ahí la prioridad de Capa 1).
- 1 campaña a la vez, 2 semanas mínimo antes de juzgar, optimizar por `Lead`/`demo_scheduled`.
- Cuando un canal demuestre ROI positivo y estable → ahí escalas presupuesto.

---

## 8. Embudo y customer journey (GoDigital / PyME MX)

```
   AWARENESS         CONSIDERACIÓN        CONVERSIÓN          RETENCIÓN/EXPANSIÓN
   ─────────         ─────────────        ──────────          ───────────────────
 IG/FB Reels   →   Visita sitio     →   Demo agendada   →   Cliente GoDigital
 LinkedIn          Página GoDigital      WhatsApp             ↓ upsell
 GBP/Reseñas       Carruseles/casos      Propuesta            Marketing Digital,
 Boca a boca       Email nurture         Cierre               Desarrollo, etc.
                                                              + Reseña + Referido
```

**Palancas por etapa:**
- Awareness → volumen de contenido + reseñas GBP.
- Consideración → claridad de oferta + prueba social + retargeting.
- Conversión → WhatsApp + demo + nurturing + manejo de objeciones.
- Retención → entregar resultados → reseña + caso de éxito → **upsell** a servicios de mayor ticket (puente natural hacia el track Estratégico).

---

## 9. Medición, KPIs y tablero de monitoreo

### 9.1 North Star + KPIs por etapa
- **North Star:** Demos calificadas agendadas / mes.
- **Awareness:** alcance, seguidores netos, visitas al sitio, impresiones GBP.
- **Consideración:** sesiones en páginas de servicio, `view_pricing`, `plan_selected`, tasa de scroll.
- **Conversión:** `contact_submit`, `demo_scheduled`, `whatsapp_click`, tasa de conversión visita→lead.
- **Pipeline:** leads → demos → propuestas → cierres, valor del pipeline, ciclo de venta.
- **Eficiencia:** CAC por canal, ROAS (cuando haya pauta), costo por lead.

### 9.2 Tablero (Looker Studio — gratis, 15 min/semana)
Conectar: **GA4 + Google Search Console + Brevo (export) + Meta Insights**. Una vista con:
- Tendencia de leads y demos (semana a semana).
- Conversión por `source` (qué canal trae clientes reales, no solo clics).
- Top contenidos por engagement.
- Embudo: visita → lead → demo → cierre.

### 9.3 Rutina de monitoreo (disciplina del fundador)
- **Diario (10 min):** revisar inbox social + WhatsApp + `/lead-triage`.
- **Lunes (20 min):** `/monday-brief` + revisar tablero + planear contenido de la semana.
- **Mensual (60 min):** `/content-strategy` + revisar KPIs + decidir dónde mover presupuesto.

---

## 10. Backlog técnico del sitio (lo que puedo implementar en el repo)

> Estas tareas habilitan toda la medición y captación. Ordenadas por impacto.

| # | Tarea | Archivo(s) | Impacto |
|---|---|---|---|
| 1 | ✅ Push de `dataLayer` en envío de formulario (`contact_submit` + `source`) | `lib/analytics/track.ts`, `useContactForm.ts` | 🔴 Hecho |
| 2 | ✅ Eventos `demo_scheduled`, `plan_selected` (`view_pricing` pendiente) | `GoDigitalView.tsx` | 🔴 Hecho (parcial) |
| 3 | ✅ Botón flotante de WhatsApp + evento `whatsapp_click` | `WhatsAppButton.tsx`, `config/site.config.ts`, `[locale]/layout.tsx` | 🔴 Hecho |
| 4 | ✅ Conectar formulario → Brevo CRM (upsert de contacto + atributo `ORIGEN`) | `api/contact/route.ts` | 🔴 Hecho |
| 5 | Cargar GA/GTM/Clarity **respetando** `CookieConsent` (Consent Mode v2) | `layout.tsx`, `CookieConsent.tsx` | 🟠 Alto (compliance) |
| 6 | Verificar/ajustar metadatos SEO + Open Graph por página | `lib/seo/metadata.ts` | 🟠 Alto |
| 7 | Página `/gracias` post-conversión (para tracking limpio de Ads) | nueva ruta | 🟡 Medio |
| 8 | ✅ Actualizar README/docs (Brevo, dominio `aurhora.agency`, sin Resend) | `README.md`, `.env.example`, `INICIO_RAPIDO.md` | 🟡 Hecho |
| 9 | Schema.org (Organization + LocalBusiness) para GBP/SEO | `layout.tsx` | 🟡 Medio |

> Meta Pixel, LinkedIn Insight Tag y Google Ads tag se agregan **dentro de GTM** (no requieren tocar código una vez que el contenedor está activo).

---

## 10.bis Checklist de configuración para dejar todo "en producción"

> El código ya quedó listo en el repo. Esta es la configuración (mayormente fuera del código) que falta para que el sistema mida y capte de verdad.

### A. Deploy y variables de entorno (Vercel)
- [ ] En Vercel → Settings → Environment Variables, agregar:
  - [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER=525582991282`
  - [ ] `BREVO_API_KEY=<key real>`
  - [ ] `BREVO_SENDER_EMAIL=contacto@aurhora.agency`
  - [ ] `BREVO_ADMIN_EMAIL=<buzón donde recibir leads>`
  - [ ] `BREVO_CONTACT_LIST_ID=<id de lista>` (opcional)
- [ ] Commit + push del código nuevo → redeploy automático.
- [ ] Confirmar que el botón de WhatsApp aparece en producción.

### B. Email y CRM (Brevo)
- [ ] Crear el buzón `contacto@aurhora.agency` (hoy no existe).
- [ ] Verificar el dominio en Brevo con **SPF + DKIM + DMARC** (deliverability).
- [ ] Crear los **atributos de contacto** (texto) que usa el formulario: `EMPRESA`, `TELEFONO`, `ORIGEN`, `MENSAJE`.
- [ ] Crear una **lista** de "Leads del sitio" y poner su ID en `BREVO_CONTACT_LIST_ID`.
- [ ] Definir el **pipeline** de deals (Nuevo → Contactado → Demo → Propuesta → Cierre).

### C. Medición (GTM + GA4)
- [ ] En GTM (`GTM-TMP9R7B6`): crear *triggers* Custom Event para `contact_submit`, `demo_scheduled`, `plan_selected`, `whatsapp_click`.
- [ ] Crear tags GA4 Event para cada uno (enviar `source`, `plan`).
- [ ] Publicar el contenedor.
- [ ] En GA4 (`G-NRPDQSXEZJ`) → marcar como **conversión**: `demo_scheduled`, `contact_submit`, `whatsapp_click`.

### D. Píxeles y SEO
- [ ] Crear **Meta Pixel** y agregarlo vía GTM; mapear `Lead`.
- [ ] Verificar **Google Search Console** para `aurhora.agency` y subir `sitemap.xml`.
- [ ] (Opcional) LinkedIn Insight Tag para cuando se active el track Estratégico.

### E. Canales
- [ ] **WhatsApp Business**: mensaje de bienvenida + respuestas rápidas + ausencia.
- [ ] **Google Business Profile**: crear/reclamar + primeras reseñas.
- [ ] Consolidar `@aurhora.agency` en IG/FB/LinkedIn; conectar IG+FB en Meta Business Suite.

---

## 11. Hoja de ruta 30 / 60 / 90 días

### 🟢 Días 1–30 — Cimientos y arranque orgánico
- [x] Confirmar dominio en producción → **`aurhora.agency`** (oficial). Referencias viejas eliminadas.
- [ ] Implementar eventos de conversión (backlog #1, #2, #3).
- [ ] Conectar formulario → Brevo CRM (#4) + definir pipeline.
- [ ] Crear WhatsApp Business + plantillas + botón en sitio.
- [ ] Verificar Search Console + subir sitemap.
- [ ] Crear/reclamar Google Business Profile + pedir 5 primeras reseñas.
- [ ] Inventariar y consolidar redes; estandarizar `@aurhora.agency`.
- [ ] Conectar IG+FB en Meta Business Suite; activar respuestas automáticas.
- [ ] Configurar Meta Pixel + LinkedIn Insight Tag vía GTM.
- [ ] Producir kit de marca + 10 plantillas Canva.
- [ ] Lanzar contenido orgánico (batching semanal) — primeras 4 semanas.

### 🟡 Días 31–60 — Motor a régimen + nurturing
- [ ] Cadencia orgánica estable (IG/FB 3x, LinkedIn 3x, GBP 1x).
- [ ] Activar secuencia de nurturing en Brevo (3–5 correos).
- [ ] Prospección LinkedIn (5 DMs/día) con `/lead-triage`.
- [ ] Publicar 2 casos de éxito / testimonios (apenas haya clientes).
- [ ] Lanzar primera campaña de **retargeting Meta** ($1,200/mes).
- [ ] Montar tablero Looker Studio + rutina semanal.
- [ ] Primeros 2 artículos de blog SEO.

### 🔵 Días 61–90 — Optimización y escala selectiva
- [ ] Analizar conversión por `source`; cortar lo que no funciona.
- [ ] Escalar el canal con mejor ROI (más contenido o más presupuesto).
- [ ] Probar Google Search de alta intención.
- [ ] Sistematizar pedido de reseñas post-entrega.
- [ ] Definir oferta de upsell (GoDigital → Marketing/Desarrollo).
- [ ] Evaluar abrir el track **Estratégico** (B2B/InsurTech/Fintech) con LinkedIn como eje.
- [ ] Revisión trimestral con `/quarterly-review`.

---

## 12. Stack de herramientas (casi todo gratis)

| Función | Herramienta | Costo |
|---|---|---|
| Analytics web | GA4 + GTM + Clarity | Gratis ✅ (ya instalado) |
| SEO | Google Search Console | Gratis |
| CRM + Email + Automatización | **Brevo** | Gratis (hasta límite) ✅ ya en uso |
| Gestión social IG/FB | Meta Business Suite | Gratis |
| Diseño | Canva (Free/Pro) | Gratis / ~$140 MXN/mes |
| Tablero | Looker Studio | Gratis |
| Mensajería/cierre | WhatsApp Business | Gratis |
| Ficha local | Google Business Profile | Gratis |
| Pauta | Meta Ads + Google Ads | $2,000 MXN/mes |
| Asistencia/ejecución | Plugin Aurhora (Claude) | ✅ ya instalado |

**Gasto recurrente mínimo:** ~$2,000 MXN pauta + opcional Canva Pro. Todo lo demás: $0.

---

## 13. Riesgos y notas
- **Dominio:** resolver discrepancia `aurhora.agency` / `aurhora.it.com` antes de invertir en SEO/Ads (un cambio de dominio después es costoso en posicionamiento). _Recomendación: usar `aurhora.agency` (más profesional y ya en uso para correo)._
- **Consentimiento:** ajustar carga de analytics al `CookieConsent` para cumplir el Aviso de Privacidad.
- **Presupuesto chico:** la disciplina de medición es lo que evita desperdiciar los $2k; sin píxeles + eventos, la pauta es a ciegas.
- **Fundador solo:** el éxito depende del **batching** y de delegar ejecución repetitiva a las skills de Claude. No intentar producir diario a mano.

---

_Documento vivo. Próxima revisión sugerida: fin del Día 30._
