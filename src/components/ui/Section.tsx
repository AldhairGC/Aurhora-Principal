/**
 * Section — envoltura de sección con tono claro u oscuro.
 * El tono oscuro añade el fondo profundo aurora con glows boreales.
 */
import React from "react";

type SectionProps = {
  children: React.ReactNode;
  tone?: "light" | "dark";
  /** Añade el glow aurora (radiales). Por defecto: solo en tono oscuro. */
  glow?: boolean;
  /** Ancho del contenedor interno */
  container?: boolean;
  className?: string;
  id?: string;
};

export function Section({
  children,
  tone = "light",
  glow,
  container = true,
  className = "",
  id,
}: SectionProps) {
  const showGlow = glow ?? tone === "dark";
  const isDark = tone === "dark";

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${
        isDark ? "bg-aurora-bg text-surface" : "bg-surface text-ink"
      } ${className}`}
    >
      {showGlow && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: isDark
              ? "var(--gradient-aurora-dark-glow, radial-gradient(50% 50% at 12% 8%, rgba(124,58,237,0.28), transparent 65%), radial-gradient(45% 50% at 85% 18%, rgba(6,182,212,0.22), transparent 65%), radial-gradient(40% 40% at 60% 100%, rgba(37,99,235,0.18), transparent 70%))"
              : "radial-gradient(60% 50% at 15% 0%, rgba(124,58,237,0.10), transparent 70%), radial-gradient(50% 45% at 90% 10%, rgba(6,182,212,0.10), transparent 70%)",
          }}
        />
      )}
      <div className={container ? "relative mx-auto max-w-6xl px-6" : "relative"}>
        {children}
      </div>
    </section>
  );
}

export default Section;
