"use client";

import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/Header";
import { Footer, WhatsAppFab } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { RouterProvider, useRouter } from "@/lib/router";
import { ThemeProvider, useTheme } from "@/lib/theme";
import { serviceById } from "@/content/services";
import { articleById } from "@/content/articles";
import { legalById } from "@/content/legal";
import { seoFor } from "@/lib/seo";
import { track } from "@/lib/analytics";

/** Header, footer, banners and providers shared by every page (lives in the root layout). */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <RouterProvider>
        <Chrome>{children}</Chrome>
      </RouterProvider>
    </ThemeProvider>
  );
}

function Chrome({ children }: { children: ReactNode }) {
  const { dark } = useTheme();
  const { view } = useRouter();

  // Page views for client-side navigation; GTM decides which tags fire.
  useEffect(() => {
    if (view === "not-found") return;
    const seo = seoFor(view);
    const group = serviceById(view)?.unit ?? (articleById(view) ? "recursos" : legalById(view) ? "legal" : view);
    track("page_view", { page_path: seo.slug, page_title: seo.title, content_group: group });
  }, [view]);

  return (
    <>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-[8px] focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">Saltar al contenido</a>
      <Header />
      <main id="contenido" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      {view !== "contacto" && <WhatsAppFab />}
      <CookieBanner />
      <Toaster theme={dark ? "dark" : "light"} position="bottom-center" />
    </>
  );
}
