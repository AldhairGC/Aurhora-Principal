"use client";

/**
 * Stagger — contenedor que escalona la entrada de sus hijos (<StaggerItem>).
 * Respeta prefers-reduced-motion.
 */
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/design-system/aurora";
import { defaultViewport, staggerContainer } from "./variants";

type StaggerProps = {
  children: React.ReactNode;
  stagger?: number;
  delayChildren?: number;
  className?: string;
};

export function Stagger({ children, stagger = 0.08, delayChildren = 0, className }: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: React.ReactNode;
  distance?: number;
  className?: string;
};

export function StaggerItem({ children, distance = 24, className }: StaggerItemProps) {
  const reduce = useReducedMotion();
  const variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: distance },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out } },
      };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

export default Stagger;
