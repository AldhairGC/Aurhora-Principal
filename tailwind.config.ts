// tailwind.config.ts
import type { Config } from "tailwindcss";
import {
  colors,
  typography,
  spacing,
  sizes,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
  zIndex,
} from "./src/lib/design-system/tokens";

export default {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Colores para gradientes
    'from-cyan-500',
    'from-cyan-500/20',
    'from-cyan-600',
    'from-purple-500',
    'from-purple-500/20',
    'from-purple-600',
    'from-pink-500',
    'from-pink-500/20',
    'from-pink-600',
    'from-amber-500',
    'from-amber-500/20',
    'from-amber-600',
    'from-blue-500',
    'from-blue-500/20',
    'from-blue-600',
    'from-emerald-500',
    'from-emerald-500/20',
    'from-lime-500',
    'from-lime-500/20',
    'to-cyan-600',
    'to-purple-600',
    'to-pink-600',
    'to-amber-600',
    'to-blue-600',
    'to-transparent',
    // Colores de texto
    'text-cyan-500',
    'text-purple-500',
    'text-pink-500',
    'text-amber-500',
    'text-blue-500',
    'text-emerald-500',
    'text-lime-400',
    'text-cyan-400',
    // Colores de fondo
    'bg-emerald-900/50',
    'bg-emerald-100',
    'bg-blue-900/50',
    'bg-blue-100',
    'bg-purple-900/50',
    'bg-purple-100',
    'bg-pink-900/50',
    'bg-pink-100',
    'bg-amber-900/50',
    'bg-amber-100',
    'bg-cyan-500/20',
    'from-cyan-500/10',
    'to-purple-500/10',
    // Bordes
    'border-emerald-700/30',
    'border-emerald-300',
    'border-blue-700/30',
    'border-blue-300',
    'border-purple-700/30',
    'border-purple-300',
    'border-pink-700/30',
    'border-pink-300',
    'border-amber-700/30',
    'border-amber-300',
    'border-cyan-500/30',
  ],
  theme: {
    extend: {
      colors: {
        ...colors.brand,
        ...colors.secondary,
        neutral: colors.neutral,
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: typography.fontFamily.sans.split(", "),
        mono: typography.fontFamily.mono.split(", "),
      },
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      lineHeight: typography.lineHeight,
      letterSpacing: typography.letterSpacing,
      spacing: spacing,
      borderRadius: borderRadius,
      boxShadow: shadows,
      transitionDuration: transitions.duration,
      transitionTimingFunction: transitions.timing,
      screens: breakpoints,
      zIndex: zIndex,
      maxWidth: sizes.container,
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'fadeInUp': 'fadeInUp 0.8s ease-out forwards',
        'fadeInLeft': 'fadeInLeft 0.8s ease-out forwards',
        'fadeInRight': 'fadeInRight 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' }
        },
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        fadeInLeft: {
          'from': {
            opacity: '0',
            transform: 'translateX(-30px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        fadeInRight: {
          'from': {
            opacity: '0',
            transform: 'translateX(30px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
