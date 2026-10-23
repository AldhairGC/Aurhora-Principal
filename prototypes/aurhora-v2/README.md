# Aurhora v2 — prototipo navegable

Primera propuesta local, 21 de octubre de 2026. Abre `index.html` en un navegador o sirve esta carpeta por HTTP. Las páginas están prerenderizadas y funcionan sin compilación en el navegador.

## Recorrido

- `index.html`: grupo, filosofía, experiencia y acceso a las tres unidades.
- `digital.html`: software, IA, consultoría, marketing y GoDigital.
- `integra.html`: seguridad, conectividad, audio/video y garantía de productos elegibles.
- `mantenimiento.html`: selección rápida, servicios, proceso, cobertura, horarios y preguntas frecuentes.
- `aire-acondicionado.html`, `electricidad.html`, `reparaciones.html`: páginas para servicios y campañas.
- `contacto.html`: preparación de solicitud y apertura de WhatsApp. La fecha es una preferencia, no una reserva.

## Editar

`build.mjs` contiene el contenido y las plantillas; genera las ocho páginas HTML. Edita ese archivo para cambios de contenido y ejecuta:

```powershell
node prototypes/aurhora-v2/build.mjs
```

`styles.css` contiene la composición responsive. `app.js` añade menú móvil, segmentación de Integra y preparación de solicitudes. `config.js` contiene el número de WhatsApp confirmado: 525582991282.

Desde la raíz del repositorio:

```powershell
python -m http.server 3100 --bind 127.0.0.1 --directory prototypes/aurhora-v2
```

Visita http://127.0.0.1:3100/. También puedes abrir directamente `index.html`; si el portapapeles no está disponible, se selecciona el texto de la solicitud para copiarlo manualmente.

## Sistema de diseño

La carpeta `design-system/` conserva una selección del ZIP proporcionado: tokens, tres fuentes WOFF2 y variantes del logotipo. Se mantienen Sora para titulares, Geist para texto y Geist Mono para etiquetas. Los logotipos SVG originales no se alteran ni se recompone la A.

Los nombres históricos Agency, Essentials y Marketing de los documentos del ZIP son referencia, no la arquitectura vigente del prototipo. Se aplica lo acordado en la conversación: Grupo Aurhora, Digital, Integra y Mantenimiento. Los acentos por unidad son una propuesta para revisión.

Los diagramas del grupo y de Integra son ilustraciones SVG. El proceso de Digital está rotulado como ejemplo. No se incorporaron fotografías de trabajos, testimonios, logotipos de clientes ni cifras de resultados sin materiales aprobados.

## Comportamiento y límites

- Todo el contenido, las fuentes y los activos se sirven localmente. No hay rastreadores ni peticiones externas al cargar.
- El formulario no envía a la API del sitio existente. Prepara un mensaje que el visitante revisa y envía en WhatsApp.
- El contexto de unidad y servicio se transfiere por URL. Se conservan UTM reconocidos durante la sesión y se incluyen en el mensaje visible. No se guardan campos del formulario en almacenamiento.
- El número está confirmado por el usuario. Las pruebas interceptan `window.open`; no se contacta a clientes ni se envían mensajes.
- Las páginas están marcadas `noindex,nofollow`: son un prototipo local, no una publicación de producción.
- El agente, CRM, carga de fotografías, disponibilidad real y reservas no forman parte de esta entrega.

## Verificación

`verify.cjs` requiere Playwright y Chrome instalados. Con el servidor local activo:

```powershell
node prototypes/aurhora-v2/verify.cjs <ruta-al-paquete-playwright>
```

Verifica las ocho páginas a 320, 390, 768 y 1440 px, títulos principales, idioma, landmarks, imágenes, IDs, enlaces y fragmentos; menú móvil y Escape; segmentación de Integra; traspaso del servicio y campaña; mensaje y destino de WhatsApp; preferencias de fecha; contenido y navegación sin JavaScript. Capturas y reporte quedan en `review/` (ignorado por Git).

No equivale a certificación completa de accesibilidad, pruebas en dispositivos físicos ni validación de producción. Se revisaron visualmente las cuatro páginas principales en escritorio y mantenimiento/contacto en móvil.

## Antes de producción

1. Validar composición, textos y nombres con el usuario.
2. Incorporar fotos propias seleccionadas y autorizadas.
3. Definir catálogo, benchmark, precios, alcance de garantías y cobertura exacta.
4. Adaptar el código aprobado a las rutas y componentes de Next.js.
5. Preparar documentos de privacidad, URLs finales, canonical, Open Graph y sitemap por ruta/idioma.
6. Implementar captura duradera de leads, validación del servidor y controles contra abuso si se incorpora backend.
7. Configurar medición condicionada al consentimiento y distinguir solicitudes de citas confirmadas.
8. Diseñar el agente y la agenda como siguiente etapa operativa.

## Group · segunda iteración editorial (21 de octubre de 2026)

Referencia revisada: https://stripe.com/mx (contenido y captura de navegador). La lectura que tomamos de Stripe es la combinación de relato por capas, demostraciones de producto, exploración de soluciones y evidencia. Su escala y cifras no se trasladan a Aurhora. Las animaciones exactas de Stripe no se han reproducido ni perfilado.

### Diagnóstico de la primera versión

- La gráfica del hero comunicaba tres colores, pero no el papel de las especialidades. Faltaba una representación del trabajo detrás del resultado.
- Las unidades eran principalmente una lista de enlaces. Faltaba contenido explorable que permitiera comprenderlas antes de abandonar Group.
- La historia de la aurora tenía buen argumento, pero poca presencia visual y no tenía un lugar claro para una película de marca.
- No se mostraba cómo un mismo cliente podía utilizar las unidades en distintos momentos.
- La experiencia tenía una declaración general. Sigue pendiente incorporar evidencia real: fotografías propias, casos autorizados y alcance de la participación del equipo. No se inventaron proyectos, cifras, clientes ni certificaciones.

### Construido

`group.mjs` contiene la nueva narrativa y se importa desde `build.mjs`. `group.css` y `group.js` se cargan solo en Group. Regenerar con `node prototypes/aurhora-v2/build.mjs`.

Hero con escena SVG de conexiones, tarjetas con movimiento, pausa visible, suspensión fuera de pantalla y respeto por movimiento reducido. Explorador manual de tres especialidades, sin rotación automática; los tres artículos permanecen visibles sin JavaScript. Sección editorial para el video, recorrido ilustrativo de un local, industrias y método de trabajo. El resto de las unidades conserva su versión anterior.

### Decisión sobre los dos tipos de movimiento

1. **Hero:** gráfica nativa animada. Explica la conexión entre las unidades, responde al tamaño de pantalla y tiene pausa. Evita depender de un archivo de video para comunicar el mensaje principal.
2. **Película introductoria:** después de las especialidades, junto a la filosofía. Reproducción voluntaria con controles y subtítulos. Una duración propuesta de 60–75 segundos permite contar la historia sin convertir la portada en un reproductor.
3. **Video ambiental opcional:** solo si aporta una dirección artística claramente superior. Sería abstracto, silencioso, sin texto incrustado, con una imagen fija equivalente y control de pausa. No hace falta producirlo para usar esta versión; evitar varios movimientos automáticos que compitan.

### Brief propuesto para el video de HeyGen

Formato horizontal 16:9. Voz cercana, español de México. Ritmo sereno y preciso; evitar stock empresarial genérico y avatares permanentes frente a cámara. Combinar movimiento de marca, escenas de operación y material real disponible. No presentar recreaciones generadas como trabajos ya ejecutados.

- **0–10 s / La premisa:** “Hay cosas complejas de explicar y fáciles de disfrutar. Como una aurora. Como un negocio que avanza. Como un espacio donde todo funciona.” Imágenes abstractas y resultado cotidiano.
- **10–25 s / Digital:** “En Aurhora Digital conectamos software, automatización e inteligencia artificial con lo que tu negocio necesita resolver.” Representar una solicitud que llega y se organiza; no mostrar métricas inventadas.
- **25–40 s / Integra:** “En Aurhora Integra conectamos y protegemos tus espacios con seguridad, redes y tecnología pensada para tu día a día.” Mostrar cámaras, conectividad y control; utilizar material propio cuando esté disponible.
- **40–53 s / Mantenimiento:** “Y en Aurhora Mantenimiento cuidamos lo esencial: climatización, electricidad e instalaciones para tu hogar o negocio.” Mostrar ejecución cuidada y resultado; evitar prometer atención inmediata universal.
- **53–65 s / La relación:** “Tres especialidades. Una misma forma de trabajar: escuchar, hacer claro el camino y responder. Tú disfruta el resultado. Nosotros nos encargamos de lo complejo.” Cierre con marca y contacto.

Guion propuesto, pendiente de ajuste y producción. No se generó ni consumió un video de HeyGen en esta iteración.

### Integración del video final

La portada dice “Próximamente” y no simula un botón de reproducción. Cuando exista el archivo, agregar a `AURHORA_CONFIG` en `config.js` una propiedad `groupVideo` con `{ src: 'media/aurhora-intro.mp4', poster: 'media/aurhora-intro.webp', captions: 'media/aurhora-intro.es.vtt' }`. Copiar los archivos reales a `media/`. El reproductor usa controles nativos, carga de video bajo demanda y no reproduce automáticamente. Si el archivo falla, vuelve a mostrar la portada. Preparar subtítulos revisados y una transcripción final antes de publicar.
