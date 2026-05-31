/**
 * Utility functions for device detection and performance optimization
 */

export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768
  );
}

export function isLowPerformanceDevice(): boolean {
  if (typeof window === "undefined") return false;
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  
  if (prefersReducedMotion) return true;
  
  // Check navigator.hardwareConcurrency (number of CPU cores)
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    return true;
  }
  
  // Check device memory (if available)
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (deviceMemory && deviceMemory < 4) {
    return true;
  }
  
  return false;
}

export function getOptimalParticleCount(
  baseCount: number = 60,
  windowWidth: number = window.innerWidth
): number {
  const isMobile = isMobileDevice();
  const isLowPerf = isLowPerformanceDevice();
  
  let count = Math.min(baseCount, Math.floor(windowWidth / 25));
  
  if (isMobile) {
    count = Math.floor(count * 0.4); // 40% on mobile
  }
  
  if (isLowPerf) {
    count = Math.floor(count * 0.5); // 50% on low-performance devices
  }
  
  return Math.max(10, count); // Minimum 10 particles
}

export function shouldDrawConnections(): boolean {
  return !isMobileDevice() && !isLowPerformanceDevice();
}

export function getAnimationFrameRate(): number {
  const isMobile = isMobileDevice();
  const isLowPerf = isLowPerformanceDevice();
  
  if (isLowPerf) return 30; // 30 FPS for low performance
  if (isMobile) return 45; // 45 FPS for mobile
  return 60; // 60 FPS for desktop
}
