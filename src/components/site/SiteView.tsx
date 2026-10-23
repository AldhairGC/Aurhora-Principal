"use client";

import { GroupPage } from "@/views/GroupPage";
import { DigitalPage, IntegraPage, FacilitiesPage } from "@/views/UnitPages";
import { ContactPage, ServicePage } from "@/views/ServicePage";
import { ArticlePage, LegalPage, NosotrosPage, RecursosPage, SitemapPage } from "@/views/ContentPages";
import { serviceById } from "@/content/services";
import { articleById } from "@/content/articles";
import { legalById } from "@/content/legal";

/** Renders the page for a view id. Content objects hold icon components, so the server
    passes only the id and the lookup happens here, on the client side of the boundary. */
export function SiteView({ view }: { view: string }) {
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
    case "mapa-del-sitio": return <SitemapPage />;
    default: return <GroupPage />;
  }
}
