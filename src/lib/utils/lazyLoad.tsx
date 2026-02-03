import dynamic from 'next/dynamic';
import { ComponentType, ReactElement } from 'react';

/**
 * Utilidades para carga diferida de componentes pesados
 */

// Opciones por defecto para dynamic imports
const defaultOptions = {
  ssr: false,
  loading: () => null,
};

/**
 * Wrapper para dynamic import con configuración optimizada
 */
export function lazyComponent<P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  options: {
    ssr?: boolean;
    loading?: () => ReactElement | null;
  } = {}
) {
  return dynamic(importFn, { ...defaultOptions, ...options });
}

/**
 * Precargar un componente sin renderizarlo
 * Útil para precargar en hover o en idle
 */
export function preloadComponent(
  importFn: () => Promise<{ default: ComponentType<unknown> }>
) {
  if (typeof window !== 'undefined') {
    // Usar requestIdleCallback si está disponible
    if ('requestIdleCallback' in window) {
      (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => {
        importFn();
      });
    } else {
      // Fallback a setTimeout
      setTimeout(() => {
        importFn();
      }, 200);
    }
  }
}

/**
 * Hook para detectar si el componente está en viewport
 * y hacer lazy loading basado en visibilidad
 */
export function createVisibilityLoader<P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>
) {
  return dynamic(importFn, {
    ssr: false,
    loading: () => (
      <div className="min-h-[200px] animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />
    ),
  });
}
