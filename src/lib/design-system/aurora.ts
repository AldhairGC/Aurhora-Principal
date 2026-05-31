/**
 * Aurora Design System — FUENTE ÚNICA DE VERDAD del rediseño.
 * Dirección v1 "Aurora controlada", aprobada 2026-05-30. Ver docs/REDESIGN.md.
 *
 * Base clara + secciones oscuras. Gradiente firma violeta → indigo → cyan
 * (alusión a auroras boreales), reservado para momentos clave.
 *
 * Estos valores se exponen también como CSS variables en globals.css
 * (`--color-*`, `--gradient-aurora`) y como utilidades Tailwind (ink, surface,
 * line, aurora-violet, bg-aurora, …) en tailwind.config.ts.
 */

export const aurora = {
  /** Neutros (escala zinc) — base del sistema */
  neutral: {
    ink: "#09090B", // texto principal / tinta
    inkSoft: "#27272A", // texto fuerte secundario
    secondary: "#52525B", // texto secundario
    line: "#E4E4E7", // bordes / divisores
    surface: "#FAFAFA", // fondo claro base
    white: "#FFFFFF",
  },

  /** Acento aurora — usar con restricción */
  accent: {
    violet: "#7C3AED",
    indigo: "#4F46E5",
    blue: "#2563EB",
    cyan: "#06B6D4",
  },

  /** Fondo de secciones oscuras */
  darkBg: "#0A0A0F",

  /** Gradiente firma — SOLO en momentos clave (hero, CTAs, 1-2 acentos) */
  gradient: {
    signature: "linear-gradient(110deg, #7C3AED 0%, #4F46E5 45%, #06B6D4 100%)",
    /** Glows radiales para fondos oscuros (auroras boreales) */
    darkGlow:
      "radial-gradient(50% 50% at 12% 8%, rgba(124,58,237,0.28), transparent 65%), radial-gradient(45% 50% at 85% 18%, rgba(6,182,212,0.22), transparent 65%), radial-gradient(40% 40% at 60% 100%, rgba(37,99,235,0.18), transparent 70%)",
    /** Glow tenue para fondos claros (amanecer boreal) */
    lightGlow:
      "radial-gradient(60% 50% at 15% 0%, rgba(124,58,237,0.10), transparent 70%), radial-gradient(50% 45% at 90% 10%, rgba(6,182,212,0.10), transparent 70%)",
  },
} as const;

/** Curvas de easing del sistema (compartidas con la motion library) */
export const ease = {
  /** easeOutExpo-ish — entradas suaves y elegantes */
  out: [0.22, 1, 0.36, 1] as const,
  /** estándar material */
  inOut: [0.4, 0, 0.2, 1] as const,
};

/** Familia tipográfica (las fuentes se cargan en app/layout.tsx) */
export const fontFamily = {
  sans: "var(--font-geist-sans), Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "var(--font-geist-mono), ui-monospace, 'SF Mono', Menlo, monospace",
};

export default aurora;
