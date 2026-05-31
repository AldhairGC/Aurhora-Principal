/**
 * Card — tarjeta del sistema, en variante clara u oscura.
 * La variante oscura incluye un glow aurora sutil en las esquinas.
 */
import React from "react";

export function Card({
  children,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  if (tone === "dark") {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl bg-aurora-bg p-7 text-surface ${className}`}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 100% 0%, rgba(6,182,212,0.25), transparent 70%), radial-gradient(60% 60% at 0% 100%, rgba(124,58,237,0.25), transparent 70%)",
          }}
        />
        <div className="relative">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-line bg-white p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
