> **Nota (21 de octubre de 2026):** la arquitectura de unidades (Agency, Essentials, Marketing), la regla del botón con degradado y la voz descritas aquí fueron actualizadas. La guía vigente es [docs/GUIA_DE_MARCA.md](../../../docs/GUIA_DE_MARCA.md). Tokens, fuentes y logotipos de esta carpeta siguen vigentes.

Aurhora es la marca principal de un grupo de unidades de negocio de transformación digital nativas de IA: Aurhora Agency, Aurhora Essentials, Aurhora Marketing y las que vengan. Este sistema describe la marca con el **modo claro como tema principal** (`light`) y el modo oscuro (`dark`) para proyectos y secciones puntuales. Parte del sitio actual de Agency (aurhora.agency) y propone un rebranding: ver *Propuesta de rebranding*.

## Fundamentos de contenido

- Voz profesional, ambiciosa y orientada a resultados; habla de tú al lector ("tu negocio", "tu visión") y de nosotros como agencia.
- Titulares afirmativos y cortos: "Ingeniería y estrategia para transformar tu negocio." Una palabra clave del titular puede llevar degradado.
- Lenguaje de innovación con anclaje práctico: "co-creamos futuro", "resultados medibles", "implementación express de 1–2 semanas".
- Capitalización de frase; sin emojis; términos de IA en español salvo "IA" y nombres propios (GoDigital Suite).
- El nombre es "Aurhora" (con h), siempre primero. Las unidades se escriben después, en capitalización de frase: "Aurhora Agency", "Aurhora Essentials", "Aurhora Marketing". Nunca "Aurora" sin h.

## Fundamentos visuales

- **Color.** Claro: fondo `surface`, tarjetas `surface-raised`, texto `ink`, secundario `text-muted`, divisores `line`. Oscuro: mismos nombres, valores del tema `dark` (fondo #0A0A0F). Los colores de aurora (`aurora-violet`, `aurora-indigo`, `aurora-blue`, `aurora-cyan`, y la propuesta `aurora-mint`) son relleno y gráficos; para texto usa `accent-text` o `cyan-text`.
- **Degradado.** Aurora = violeta → índigo (45%) → cian a 110°. Se usa en el isotipo, en una palabra de titular y en el botón primario (este termina en `action-to`, no en cian, por contraste).
- **Tipografía.** Sora para el logotipo y los titulares (`display-xl`, `display-lg`, `display-md`, peso 600, tracking negativo): geométrica y ancha, con aire de innovación sin perder seriedad. Geist para cuerpo y UI (`body`, `body-sm`, `heading`) y Geist Mono para cifras y eyebrows. Nunca titulares en Geist ni cuerpo en Sora.
- **Espaciado.** Escala de 4px (`space-1` … `space-24`); respiro de sección `space-24` en escritorio.
- **Bordes y radios.** Botones `radius-md` (12px), tarjetas `radius-lg` (16px), píldoras `radius-pill`. Borde de 1px `line`; los controles usan `line-strong`.
- **Sombras.** Solo `shadow-brand` (tinte índigo) en el botón primario; las tarjetas no llevan sombra.
- **Foco.** Anillo sólido de 2px `focus-ring`, offset 2px.
- **Ritmo de página.** Las secciones alternan `surface` y `surface-inverse` (oscuro) dentro de un sitio claro; envuelve la sección oscura en `data-theme="dark"`.
- **Movimiento.** Escalado sutil del logo al hover (110%) y elevación de 1px en botones; sin animaciones largas.

## Iconografía

No se auditó una librería de iconos en el sitio. Hasta decidirlo, usa trazo lineal de 1.5px en `ink` o `accent-text`, y nunca emojis. El isotipo es el único icono de marca.

## Marca

Arquitectura: **Aurhora** (principal) + descriptor de unidad (secundario). El isotipo es una A de dos piernas cruzada por una cinta de aurora (menta → cian) y es el mismo para todas las unidades; cambia solo el descriptor. Variantes: base, orbe (avatares e iconos de app) y luna (decorativa). Ver `assets/Logos/README.md` para los archivos y `components/Logo/README.md` para las reglas. Conceptos descartados en `assets/Exploracion/`.

## Ofimática

Las plantillas de documentos (hoja membretada, cotización, tarjeta de presentación y firma de correo) viven en los componentes del grupo "Ofimática"; las fuentes TTF, los logos PNG, los estilos de Word y el tema de color de Office están en `assets/Ofimatica/README.md`. Reglas: documentos solo en tema claro, tamaño Carta, texto en `ink`, un solo lockup de unidad por documento, y cifras en Geist Mono.

## Regla de marca

La A del isotipo es la A de "Aurhora": junto al isotipo el nombre se lee "urhora" (lockup). Nunca pongas el isotipo al lado de la palabra completa; usa siempre un archivo `aurhora-lockup*`. Detalle en `components/Logo/README.md`.

## Componentes

`Logo`, `Button`, `Card`, `Eyebrow` y `Stat`, los patrones que el sitio actual repite, más `Letterhead`, `Quote`, `BusinessCard` y `EmailSignature` para ofimática. Cada uno tiene README y preview.
