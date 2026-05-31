"use client";

/**
 * Reveal — entrada suave en scroll (fade + desplazamiento), respetando
 * prefers-reduced-motion. Base de las animaciones de sección del rediseño.
 */
import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ease } from "@/lib/design-system/aurora";
import { defaultViewport } from "./variants";

type RevealProps = {
  children: React.ReactNode;
  /** Dirección del desplazamiento de entrada */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Distancia del desplazamiento en px */
  distance?: number;
  /** Retraso en segundos */
  delay?: number;
  duration?: number;
  className?: string;
  as?: keyof typeof motion;
};

const offset = (direction: RevealProps["direction"], d: number) => {
  switch (direction) {
    case "up":
      return { y: d };
    case "down":
      return { y: -d };
    case "left":
      return { x: d };
    case "right":
      return { x: -d };
    default:
      return {};
  }
};

export function Reveal({
  children,
  direction = "up",
  distance = 24,
  delay = 0,
  duration = 0.6,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  const variants: Variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3, delay } } }
    : {
        hidden: { opacity: 0, ...offset(direction, distance) },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration, delay, ease: ease.out },
        },
      };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
    >
      {children}
    </MotionTag>
  );
}

export default Reveal;
