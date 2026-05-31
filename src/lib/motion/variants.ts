/**
 * Variantes de animación reutilizables (Framer Motion).
 * Parte de la motion library del rediseño — ver docs/REDESIGN.md.
 */
import type { Variants } from "framer-motion";
import { ease } from "@/lib/design-system/aurora";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: ease.out } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: ease.out } },
};

/** Contenedor que escalona la entrada de sus hijos */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Viewport por defecto para reveals en scroll */
export const defaultViewport = { once: true, amount: 0.2 } as const;
