# Translations Directory

Este directorio contiene los archivos de traducción en formato JSON para la internacionalización de la aplicación.

## Archivos

- `es-MX.json` - Español (México) - idioma por defecto
- `en-US.json` - English (United States)
- `pt-BR.json` - Português (Brasil)

## Nota de Migración

Las traducciones originales estaban en `src/context/I18nContext.tsx`. 
Para completar la migración, exporta las traducciones del archivo original ejecutando:

```bash
# Instrucciones para export manual si es necesario
```

## Estructura

Cada archivo JSON debe contener un objeto plano con claves en formato dot notation:

```json
{
  "header.inicio": "Inicio",
  "header.servicios": "Servicios"
}
```
