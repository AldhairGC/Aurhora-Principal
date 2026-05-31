/**
 * Eyebrow — etiqueta superior en monoespaciada con punto aurora.
 * Señal técnica del sistema; precede a headlines de sección.
 */
import React from "react";

export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  /** "light" sobre fondo claro, "dark" sobre fondo oscuro */
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] ${
        tone === "dark" ? "text-zinc-400" : "text-secondaryText"
      } ${className}`}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-aurora" />
      {children}
    </div>
  );
}

export default Eyebrow;
