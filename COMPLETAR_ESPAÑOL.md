# 🔧 Guía para Completar las Traducciones en Español

## 📊 Estado Actual

El archivo `src/messages/es.json` tiene:
- ✅ **305 claves** (estructura completa)
- ⚠️ **Valores en inglés temporalmente**

Fuente de verdad: `src/context/I18nContext.tsx` (líneas 24-790)

---

## 🚀 Método Rápido: Copiar y Pegar por Secciones

### Paso 1: Abrir Archivos

1. Abrir: `src/messages/es.json`
2. Abrir: `src/context/I18nContext.tsx`
3. Buscar línea 24 (comienza `"es-MX": {`)

### Paso 2: Copiar Secciones Prioritarias

#### Sección 1: Header (Líneas 26-33)
```json
{
  "header.inicio": "Inicio",
  "header.quienesSomos": "Quiénes Somos",
  "header.recursos": "Recursos",
  "header.servicios": "Servicios",
  "header.contacto": "Contacto",
  "header.login": "Iniciar Sesión",
  "header.cambiarIdioma": "Cambiar idioma",
  "header.idioma": "Idioma"
}
```

#### Sección 2: Hero (Líneas 36-44)
```json
{
  "hero.title": "Impulsando la",
  "hero.innovation": "Innovación",
  "hero.subtitle": "Resultados que Transforman.",
  "hero.description": "Aurhora Agency: Tu socio estratégico en transformación digital y optimización de procesos. Integramos visión, tecnología y ejecución experta para maximizar tu potencial.",
  "hero.startTransformation": "Inicia tu Transformación",
  "hero.exploreServices": "Explorar Servicios",
  "hero.experience": "+10 años impulsando la innovación | Seguros | Banca | Fintech"
}
```

#### Sección 3: Servicios (Líneas 47-49)
```json
{
  "services.title": "Nuestras Capacidades Estratégicas",
  "services.description": "Desde la estrategia hasta la implementación y evolución, cubrimos el espectro de la transformación."
}
```

#### Sección 4: Footer (Líneas 170-177)
```json
{
  "footer.tagline": "Impulsando la Innovación, Resultados que Transforman.",
  "footer.legal": "Legal",
  "footer.privacy": "Aviso de Privacidad",
  "footer.terms": "Términos y Condiciones",
  "footer.follow": "Síguenos",
  "footer.copyright": "Aurhora Agency. Todos los derechos reservados.",
  "footer.designed": "Diseñado con",
  "footer.by": "por Aurhora Team"
}
```

### Paso 3: Verificar Cambios

```bash
npm run dev
```

Navegar a: `http://localhost:3000/es/`

---

## 📝 Secciones Restantes

Continuar copiando del `I18nContext.tsx` en este orden de prioridad:

1. ✅ **Header & Footer** (completar primero)
2. **Philosophy** (Líneas 52-63)
3. **CTA** (Líneas 66-72)
4. **Contact** (Líneas 75-87)
5. **About** (Líneas 90-106)
6. **Process** (Líneas 109-126)
7. **Forms** (Líneas 129-134)
8. **Services Cards** (Líneas 137-167)
9. **Login** (Líneas 180-195)
10. **GoDigital Suite** (Líneas 198-437) - La más extensa
11. **About Us Page** (Líneas 440-525)
12. **Software Dev** (Líneas 528-761)

---

## 🤖 Script Automatizado (Alternativa)

Si prefieres automatizar, puedo crear un script que:
1. Lee el I18nContext.tsx línea por línea
2. Extrae solo los valores de texto (sin estructura de código)
3. Mapea a las claves del es.json

**Ventaja**: Automático y rápido
**Desventaja**: Puede requerir ajustes manuales menores

---

## ⏱️ Tiempo Estimado

- **Método Manual**: 2-3 horas (todas las secciones)
- **Prioridades Básicas**: 30 minutos (Header, Footer, Hero, Services)
- **Script Automatizado**: 1 hora (desarrollo + verificación)

---

## 💡 Tip Pro

Puedes hacer una actualización gradual:
1. **Día 1**: Header, Footer, Hero (lo que ven primero los usuarios)
2. **Día 2**: Servicios principales y CTA
3. **Día 3**: GoDigital Suite completo
4. **Día 4**: Páginas secundarias

Mientras tanto, el sitio funciona perfectamente en inglés y portugués. 🚀
