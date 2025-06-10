// src/app/layout.tsx
'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from '@/context/ThemeContext';
import { I18nProvider } from '@/context/I18nContext'; // CORREGIDO: usar el contexto personalizado

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <title>Aurhora Agency</title>
        <meta name="description" content="Impulsando la Innovación con Resultados que Transforman." />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SQKR312YQR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SQKR312YQR');
          `}
        </Script>

        <I18nProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
