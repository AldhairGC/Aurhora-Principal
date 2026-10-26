import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/content/site";
import { CONSENT_DEFAULT_SCRIPT } from "@/lib/analytics/consent";
import { THEME_SCRIPT } from "@/lib/theme-script";
import "./globals.css";

const GTM_ID = "GTM-TMP9R7B6";

// Fragmento estándar de GTM, escrito en el <head> del HTML: Search Console lo busca ahí para verificar el sitio.
const GTM_SCRIPT = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  formatDetection: { telephone: false },
  // Verificación de Search Console (propiedad https://www.aurhora.agency/), un token por propietario:
  // aldhair.gc@gmail.com y aldhair@aurhora.it.com. Son públicos; quitar uno quita la verificación de esa cuenta.
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? ["MtLzXsDmp4OnpUTaxWSMwI1reGYmuO8X8-1sXaKtQFU", "Na0C9RJvFOLLAr4MGBHfnjGJIQe1ccQgy5ZGaKYJOSU"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX" suppressHydrationWarning className={`${sora.variable} ${geist.variable} ${geistMono.variable}`}>
      <head>
        {/* Theme before paint (data-theme is the only attribute the script changes). */}
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {/* Consent Mode v2: debe ejecutarse antes de GTM (todo "denied" hasta que la persona elija) */}
        <script id="consent-default" dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }} />
        {/* Google Tag Manager — GA4, Ads y píxeles se configuran dentro del contenedor */}
        <script id="google-tag-manager" dangerouslySetInnerHTML={{ __html: GTM_SCRIPT }} />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
