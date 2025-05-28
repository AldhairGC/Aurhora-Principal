// src/i18n/index.ts
export const locales = ['es-MX', 'en-US', 'pt-BR'] as const;
export const defaultLocale = 'es-MX';

export type Locale = typeof locales[number];

export const localeNames: Record<Locale, string> = {
  'es-MX': 'Español (MX)',
  'en-US': 'English (US)', 
  'pt-BR': 'Português (BR)',
};