import { useEffect } from "react";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/Header";
import { Footer, WhatsAppFab } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { GroupPage } from "@/pages/GroupPage";
import { DigitalPage, IntegraPage, FacilitiesPage } from "@/pages/UnitPages";
import { ContactPage, ServicePage } from "@/pages/ServicePage";
import { RouterProvider, useRouter } from "@/lib/router";
import { ThemeProvider, useTheme } from "@/lib/theme";
import { ArticlePage, LegalPage, NosotrosPage, RecursosPage } from "@/pages/ContentPages";
import { SERVICES, serviceById } from "@/content/services";
import { ARTICLES, articleById } from "@/content/articles";
import { LEGAL_DOCS, legalById } from "@/content/legal";
import { applySeo } from "@/lib/seo";
import { track } from "@/lib/analytics";

const VIEWS = new Set([
  "grupo", "digital", "integra", "facilities", "contacto", "nosotros", "recursos",
  ...SERVICES.map((s) => s.id),
  ...ARTICLES.map((a) => a.id),
  ...LEGAL_DOCS.map((d) => d.id),
]);

function View() {
  const { view } = useRouter();
  useEffect(() => {
    const seo = applySeo(view);
    const group = serviceById(view)?.unit ?? (articleById(view) ? "recursos" : legalById(view) ? "legal" : view);
    track("page_view", { page_path: seo.slug, page_title: seo.title, content_group: group });
  }, [view]);

  const s = serviceById(view);
  if (s) return <ServicePage key={s.id} service={s} />;
  const a = articleById(view);
  if (a) return <ArticlePage key={a.id} article={a} />;
  const d = legalById(view);
  if (d) return <LegalPage key={d.id} doc={d} />;
  switch (view) {
    case "digital": return <DigitalPage />;
    case "integra": return <IntegraPage />;
    case "facilities": return <FacilitiesPage />;
    case "contacto": return <ContactPage />;
    case "nosotros": return <NosotrosPage />;
    case "recursos": return <RecursosPage />;
    default: return <GroupPage />;
  }
}

function Shell() {
  const { dark } = useTheme();
  const { view } = useRouter();
  return (
    <>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-[8px] focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">Saltar al contenido</a>
      <Header />
      <main id="contenido" key={view} tabIndex={-1} className="outline-none">
        <View />
      </main>
      <Footer />
      {view !== "contacto" && <WhatsAppFab />}
      <CookieBanner />
      <Toaster theme={dark ? "dark" : "light"} position="bottom-center" />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider known={VIEWS}>
        <Shell />
      </RouterProvider>
    </ThemeProvider>
  );
}
