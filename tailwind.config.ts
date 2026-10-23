import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const tok = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: { center: true },
    extend: {
      fontFamily: {
        display: ["var(--font-sora)", "var(--font-geist)", "system-ui", "sans-serif"],
        sans: ["var(--font-geist)", "system-ui", "-apple-system", "\"Segoe UI\"", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        bg: tok("bg"),
        raised: tok("raised"),
        sunken: tok("sunken"),
        line: tok("line"),
        "line-strong": tok("line-strong"),
        ink: tok("ink"),
        "ink-soft": tok("ink-soft"),
        mute: tok("mute"),
        night: tok("night"),
        "night-raised": tok("night-raised"),
        "night-line": tok("night-line"),
        "on-night": tok("on-night"),
        "on-night-mute": tok("on-night-mute"),
        violet: tok("violet"),
        indigo: tok("indigo"),
        cyan: tok("cyan"),
        mint: tok("mint"),
        unit: tok("unit"),
        "unit-soft": tok("unit-soft"),
        "unit-on": tok("unit-on"),
        "unit-night": tok("unit-night"),
        ok: tok("ok"),
        warn: tok("warn"),
        danger: tok("danger"),
        // shadcn/ui aliases mapped onto the Aurhora tokens
        border: tok("line"),
        input: tok("line"),
        ring: tok("focus"),
        background: tok("bg"),
        foreground: tok("ink"),
        primary: { DEFAULT: tok("ink"), foreground: tok("bg") },
        secondary: { DEFAULT: tok("sunken"), foreground: tok("ink") },
        destructive: { DEFAULT: tok("danger"), foreground: tok("bg") },
        muted: { DEFAULT: tok("sunken"), foreground: tok("mute") },
        accent: { DEFAULT: tok("sunken"), foreground: tok("ink") },
        popover: { DEFAULT: tok("raised"), foreground: tok("ink") },
        card: { DEFAULT: tok("raised"), foreground: tok("ink") },
      },
      borderRadius: {
        lg: "16px",
        md: "12px",
        sm: "8px",
      },
      maxWidth: { site: "1240px" },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        pulse2: { "0%,100%": { opacity: "1" }, "50%": { opacity: ".35" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 38s linear infinite",
        pulse2: "pulse2 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
