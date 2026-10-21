import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/context/ThemeContext';
import {
  buildLocaleDefaults,
  generateOrganizationSchema,
  generateWebSiteSchema,
} from '@/lib/seo/metadata';
import CookieConsent from '@/components/CookieConsent';
import WhatsAppButton from '@/components/WhatsAppButton';
import AttributionCapture from '@/components/AttributionCapture';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Defaults compartidos; cada página define su propio title, description y canonical.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildLocaleDefaults(locale);
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
        {/* Structured Data: en el HTML del servidor para que Google lo lea sin ejecutar JS */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <AttributionCapture />
        {children}
        <WhatsAppButton />
        <CookieConsent />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
