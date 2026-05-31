/**
 * GradientText — aplica el gradiente firma aurora al texto.
 * Usar con restricción: 1-2 palabras clave por bloque.
 */
import React from "react";

export function GradientText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        backgroundImage: "var(--gradient-aurora)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </span>
  );
}

export default GradientText;
