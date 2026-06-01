import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/context/ThemeContext';
import {
  generateMetadata as genMeta,
  defaultSEO,
  generateOrganizationSchema,
  generateWebSiteSchema,
} from '@/lib/seo/metadata';
import Script from 'next/script';
import CookieConsent from '@/components/CookieConsent';
import WhatsAppButton from '@/components/WhatsAppButton';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const seoConfig = defaultSEO[locale] || defaultSEO.es;
  return genMeta(seoConfig);
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await params en Next.js 15
  const { locale } = await params;
  
  // Validar que el locale sea válido
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Cargar los mensajes para este locale
  const messages = await getMessages();

  const organizationSchema = generateOrganizationSchema(locale);
  const webSiteSchema = generateWebSiteSchema(locale);

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        {/* Structured Data for SEO */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />
        {children}
        <WhatsAppButton />
        <CookieConsent />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
