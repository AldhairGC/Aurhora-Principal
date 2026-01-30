/**
 * Utilidades de rendimiento para el sitio web
 */

/**
 * Debounce function para limitar la frecuencia de llamadas
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

/**
 * Throttle function para limitar llamadas a una por intervalo
 */
export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Ejecutar callback cuando el navegador está idle
 */
export function onIdle(callback: () => void, timeout = 2000): void {
  if (typeof window === "undefined") return;

  if ("requestIdleCallback" in window) {
    (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void })
      .requestIdleCallback(callback, { timeout });
  } else {
    setTimeout(callback, 100);
  }
}

/**
 * Precargar una imagen
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Precargar múltiples imágenes
 */
export function preloadImages(srcs: string[]): Promise<void[]> {
  return Promise.all(srcs.map(preloadImage));
}

/**
 * Detectar si el usuario tiene conexión lenta
 */
export function isSlowConnection(): boolean {
  if (typeof navigator === "undefined") return false;

  const connection = (navigator as Navigator & { 
    connection?: { 
      effectiveType?: string;
      saveData?: boolean;
    } 
  }).connection;

  if (!connection) return false;

  // 2g o slow-2g son considerados lentos
  if (connection.effectiveType === "2g" || connection.effectiveType === "slow-2g") {
    return true;
  }

  // Si el usuario tiene activado el ahorro de datos
  if (connection.saveData) {
    return true;
  }

  return false;
}

/**
 * Detectar si el usuario prefiere movimiento reducido
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Intersection Observer wrapper para lazy loading
 */
export function createLazyObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }

  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, {
    rootMargin: "50px",
    threshold: 0.1,
    ...options,
  });
}

/**
 * Medir el tiempo de carga de un componente (desarrollo)
 */
export function measureComponentLoad(componentName: string): () => void {
  if (process.env.NODE_ENV !== "development") {
    return () => {};
  }

  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    console.log(`[Performance] ${componentName} loaded in ${(endTime - startTime).toFixed(2)}ms`);
  };
}

/**
 * Defer non-critical scripts
 */
export function deferScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    onIdle(() => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = reject;
      document.body.appendChild(script);
    });
  });
}
