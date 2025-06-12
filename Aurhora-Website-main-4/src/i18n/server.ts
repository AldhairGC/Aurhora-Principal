// src/i18n/server.ts
import { createI18nServer } from 'next-international/server';

export const {
  getI18n,
  getScopedI18n,
  getCurrentLocale,
} = createI18nServer({
  'es-MX': () => import('@/locales/es-MX'),
  'en-US': () => import('@/locales/en-US'),
  'pt-BR': () => import('@/locales/pt-BR'),
});