"use client";

/**
 * MagneticButton — el contenido se desplaza sutilmente hacia el cursor en hover.
 * Efecto "craft" para CTAs clave. Se desactiva con prefers-reduced-motion y en
 * dispositivos táctiles (sin hover fino).
 */
import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type MagneticButtonProps = {
  children: React.ReactNode;
  /** Intensidad del imán (0-1) */
  strength?: number;
  className?: string;
};

export function MagneticButton({ children, strength = 0.25, className }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    setPos({ x, y });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 250, damping: 18, mass: 0.4 }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}

export default MagneticButton;
