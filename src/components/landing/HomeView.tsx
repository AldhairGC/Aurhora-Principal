"use client";

/**
 * HomeView — home del sitio (rediseño Aurora). Compone chrome + secciones +
 * modal de contacto real. Reemplaza al monolito AurhoraLanding como home vivo.
 */

import React, { useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/landing/Hero";
import { AISection } from "@/components/landing/AISection";
import { Services } from "@/components/landing/Services";
import { Philosophy } from "@/components/landing/Philosophy";
import { Process } from "@/components/landing/Process";
import { About } from "@/components/landing/About";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { ContactModal } from "@/components/contact/ContactModal";

const services = [
  { id: "godigital", title: "GoDigital Suite", link: "/servicios/godigital", available: true },
  { id: "transformacion-digital", title: "Transformación Digital", link: "/servicios/transformacion-digital", available: true },
  { id: "desarrollo-software", title: "Desarrollo de Software", link: "/servicios/desarrollo-software", available: true },
  { id: "impulso-marketing", title: "Impulso y Marketing", link: "/servicios/impulso-marketing", available: true },
];

export function HomeView() {
  const [modal, setModal] = useState<{ open: boolean; source: string }>({
    open: false,
    source: "",
  });

  const openContactModal = (source: string) => setModal({ open: true, source });
  const closeContactModal = () => setModal((m) => ({ ...m, open: false }));

  return (
    <div id="main-content" className="min-h-screen bg-surface">
      <SiteHeader services={services} openContactModal={openContactModal} />
      <Hero onContactClick={openContactModal} />
      <AISection />
      <Services />
      <Philosophy />
      <Process />
      <About onContactClick={openContactModal} />
      <FinalCTA onContactClick={openContactModal} />
      <SiteFooter />

      <ContactModal open={modal.open} onClose={closeContactModal} source={modal.source} />
    </div>
  );
}

export default HomeView;
