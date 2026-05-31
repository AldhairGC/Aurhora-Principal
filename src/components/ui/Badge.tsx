/**
 * Badge — etiqueta compacta en monoespaciada con acento aurora.
 */
import React from "react";

export function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-aurora-indigo/20 bg-aurora-indigo/[0.08] px-3 py-1 font-mono text-xs uppercase tracking-[0.08em] text-aurora-indigo ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
