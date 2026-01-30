"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { ReactNode } from "react";

interface LazyMotionWrapperProps {
  children: ReactNode;
}

/**
 * Wrapper para cargar framer-motion de forma optimizada
 * Usa domAnimation (más ligero que domMax)
 */
export function LazyMotionWrapper({ children }: LazyMotionWrapperProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

// Re-exportar m como motion optimizado
export { m as motion };
