import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // Lista de locales soportados
  locales: ['es', 'en', 'pt'],
  
  // Locale por defecto
  defaultLocale: 'es',
  
  // Configuración del prefijo de locale en URLs
  // 'always' = siempre muestra el prefijo (/es/, /en/, /pt/)
  // 'as-needed' = no muestra prefijo para default locale
  localePrefix: 'always'
});

// Exportar utilidades de navegación tipadas
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
