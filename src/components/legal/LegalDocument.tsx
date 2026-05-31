"use client";

/**
 * LegalDocument — layout reutilizable para páginas legales (Términos, Aviso de
 * Privacidad) con el sistema Aurora. Incluye chrome nuevo (SiteHeader/SiteFooter)
 * + modal de contacto. El contenido de las secciones se pasa como prop.
 */

import React, { useState } from "react";
import { Calendar, AlertTriangle, Mail } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ContactModal } from "@/components/contact/ContactModal";
import { Section, Eyebrow } from "@/components/ui";
import { Reveal } from "@/lib/motion";

const services = [
  { id: "godigital", title: "GoDigital Suite", link: "/servicios/godigital", available: true },
  { id: "transformacion-digital", title: "Transformación Digital", link: "/servicios/transformacion-digital", available: true },
  { id: "desarrollo-software", title: "Desarrollo de Software", link: "/servicios/desarrollo-software", available: true },
  { id: "impulso-marketing", title: "Impulso y Marketing", link: "/servicios/impulso-marketing", available: true },
];

export interface LegalSection {
  id: string;
  icon: React.ReactNode;
  title: string;
  content: string;
}

interface LegalDocumentProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  noticeTitle: string;
  noticeText: string;
  sections: LegalSection[];
  contactTitle: string;
  contactText: string;
  contactEmail: string;
}

function renderContent(content: string): string {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#09090B;font-weight:600">$1</strong>')
    .replace(/\n\n/g, '</p><p style="margin-top:1rem">')
    .replace(/\n•/g, "<br/>•")
    .replace(/\n(\d+\.)/g, "<br/>$1")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>");
}

export function LegalDocument({
  eyebrow, title, subtitle, lastUpdated, noticeTitle, noticeText, sections, contactTitle, contactText, contactEmail,
}: LegalDocumentProps) {
  const [modal, setModal] = useState<{ open: boolean; source: string }>({ open: false, source: "" });
  const open = (source: string) => setModal({ open: true, source });
  const close = () => setModal((m) => ({ ...m, open: false }));

  return (
    <div id="main-content" className="min-h-screen bg-surface">
      <SiteHeader services={services} openContactModal={open} />

      {/* Hero */}
      <Section glow className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="mx-auto max-w-3xl">
          <Reveal><Eyebrow className="mb-6">{eyebrow}</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-semibold text-ink" style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>{title}</h1>
          </Reveal>
          <Reveal delay={0.1}><p className="mt-5 text-lg leading-relaxed text-secondaryText">{subtitle}</p></Reveal>
          <Reveal delay={0.14}>
            <div className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-secondaryText">
              <Calendar className="h-4 w-4" /> Última actualización: {lastUpdated}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Contenido */}
      <Section className="pb-24">
        <div className="mx-auto max-w-3xl">
          {/* Aviso */}
          <div className="mb-12 rounded-2xl border border-aurora-indigo/20 bg-aurora-indigo/[0.05] p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-aurora-indigo" />
              <div>
                <h3 className="font-semibold text-ink">{noticeTitle}</h3>
                <p className="mt-1 text-sm leading-relaxed text-secondaryText">{noticeText}</p>
              </div>
            </div>
          </div>

          {/* Índice */}
          <div className="mb-12 rounded-2xl border border-line bg-white p-6 md:p-8">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-secondaryText">Contenido</h2>
            <nav className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {sections.map((s, i) => (
                <a key={s.id} href={`#${s.id}`} className="flex items-center gap-2.5 rounded-lg py-1.5 text-sm text-secondaryText transition-colors hover:text-aurora-indigo">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-surface font-mono text-[11px] text-aurora-indigo">{i + 1}</span>
                  {s.title.replace(/^\d+\.\s*/, "")}
                </a>
              ))}
            </nav>
          </div>

          {/* Secciones */}
          <div className="space-y-12">
            {sections.map((s) => (
              <Reveal key={s.id}>
                <div id={s.id} className="scroll-mt-28">
                  <div className="mb-4 flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-aurora-indigo/[0.08] text-aurora-indigo">{s.icon}</div>
                    <h2 className="pt-1.5 text-xl font-semibold tracking-[-0.01em] text-ink md:text-2xl">{s.title}</h2>
                  </div>
                  <div
                    className="pl-14 leading-relaxed text-secondaryText [&_a]:text-aurora-indigo"
                    dangerouslySetInnerHTML={{ __html: renderContent(s.content) }}
                  />
                </div>
              </Reveal>
            ))}
          </div>

          {/* Contacto */}
          <div className="mt-16 rounded-2xl border border-line bg-white p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-aurora-indigo/[0.08] text-aurora-indigo"><Mail className="h-6 w-6" /></div>
            <h3 className="text-xl font-semibold tracking-[-0.01em] text-ink">{contactTitle}</h3>
            <p className="mx-auto mt-2 max-w-md text-secondaryText">{contactText}</p>
            <a href={`mailto:${contactEmail}`} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-aurora px-6 py-3 font-medium text-white transition-all hover:brightness-110">
              <Mail className="h-4 w-4" /> {contactEmail}
            </a>
          </div>
        </div>
      </Section>

      <SiteFooter />
      <ContactModal open={modal.open} onClose={close} source={modal.source} />
    </div>
  );
}

export default LegalDocument;
