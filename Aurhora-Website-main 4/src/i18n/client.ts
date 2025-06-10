// src/i18n/client.ts
'use client';

import { createI18nClient } from 'next-international/client';

export const { useI18n, useScopedI18n, I18nProviderClient, useCurrentLocale, useChangeLocale } = createI18nClient({
  'es-MX': () => import('@/locales/es-MX'),
  'en-US': () => import('@/locales/en-US'),
  'pt-BR': () => import('@/locales/pt-BR'),
});