# Guía de Migración: Traducciones a Archivos JSON

## Estado Actual

Las traducciones están hardcoded en `src/context/I18nContext.tsx` (1879 líneas), lo cual dificulta el mantenimiento y actualización.

## Objetivo

Separar las traducciones en archivos JSON independientes para mejor mantenibilidad y escalabilidad.

## Pasos de Migración

### 1. Extraer Traducciones

Ejecuta el siguiente script Node.js para extraer las traducciones del contexto actual:

```javascript
// extract-translations-manual.js
const fs = require('fs');
const path = require('path');

// Leer el archivo actual
const content = fs.readFileSync('./src/context/I18nContext.tsx', 'utf8');

// Encontrar inicio del objeto translations
const startMarker = 'const translations = {';
const endMarker = '};';

const start = content.indexOf(startMarker);
const end = content.indexOf(endMarker, start) + 2;

if (start === -1 || end === -1) {
  console.error('No se encontraron las traducciones');
  process.exit(1);
}

// Extraer el objeto completo
const translationsCode = content.substring(start, end);

// Nota: Este código necesita procesamiento manual para convertir
// el objeto TypeScript a JSON válido
console.log('Extraído:', translationsCode.substring(0, 200) + '...');

// Guardar en archivo temporal para procesamiento manual
fs.writeFileSync('./translations-raw.txt', translationsCode);
console.log('✓ Guardado en translations-raw.txt');
console.log('\nPróximos pasos:');
console.log('1. Revisar translations-raw.txt');
console.log('2. Separar manualmente cada locale');
console.log('3. Convertir a JSON válido');
console.log('4. Guardar en src/locales/[locale].json');
```

### 2. Convertir a JSON

Por cada locale (es-MX, en-US, pt-BR):

1. Copiar el contenido del locale desde el archivo raw
2. Reemplazar comillas simples por dobles
3. Asegurar que las claves estén entre comillas dobles
4. Remover comentarios
5. Guardar como `src/locales/[locale].json`

Ejemplo de estructura:

```json
{
  "header.inicio": "Inicio",
  "header.quienesSomos": "Quiénes Somos",
  "header.servicios": "Servicios"
}
```

### 3. Actualizar el Contexto

Opción A - Usar la versión nueva (recomendado):

```bash
# Hacer backup del actual
mv src/context/I18nContext.tsx src/context/I18nContext.backup.tsx

# Usar la nueva versión
mv src/context/I18nContext.v2.tsx src/context/I18nContext.tsx
```

Opción B - Modificar el actual:

1. Abrir `src/context/I18nContext.tsx`
2. Agregar imports:
```typescript
import esTranslations from "@/locales/es-MX.json";
import enTranslations from "@/locales/en-US.json";
import ptTranslations from "@/locales/pt-BR.json";
```
3. Reemplazar el objeto `translations` hardcoded con:
```typescript
const translations: Record<Locale, Record<string, string>> = {
  "es-MX": esTranslations,
  "en-US": enTranslations,
  "pt-BR": ptTranslations,
};
```

### 4. Actualizar tsconfig.json

Asegurar que se pueden importar archivos JSON:

```json
{
  "compilerOptions": {
    "resolveJsonModule": true  // Ya está configurado ✓
  }
}
```

### 5. Probar

```bash
npm run dev
```

Verificar que:
- El sitio carga correctamente
- El cambio de idioma funciona
- No hay errores en consola
- No faltan traducciones

## Beneficios de la Migración

✅ **Mantenibilidad**: Más fácil editar traducciones
✅ **Escalabilidad**: Simple agregar nuevos idiomas
✅ **Colaboración**: Traductores pueden trabajar en JSONs sin tocar código
✅ **Performance**: Carga lazy de idiomas no usados (opcional)
✅ **Tooling**: Uso de herramientas de traducción y validación

## Consideraciones

- ⚠️ **Migración manual**: Dadas las 1879 líneas, se recomienda hacerlo por fases
- ⚠️ **Testing**: Probar exhaustivamente cada componente después de migrar
- ⚠️ **Backup**: Mantener respaldo del archivo original hasta validar completamente

## Alternativa: Migración por Fases

Si prefieres una migración gradual:

1. **Fase 1**: Migrar solo Header y Footer
2. **Fase 2**: Migrar Hero y Services
3. **Fase 3**: Migrar páginas específicas
4. **Fase 4**: Completar todo el resto

Para esto, puedes mantener ambos sistemas funcionando temporalmente usando un wrapper que busque primero en JSON y fallback al hardcoded.

## Soporte

Si encuentras problemas durante la migración, revisa:
- Logs de consola del navegador
- Build output de Next.js
- Que todos los archivos JSON sean válidos (usa jsonlint.com)
