"use client";

import { BtnLink, Eyebrow, Section, TextLink } from "@/components/sections/primitives";

export function NotFoundView() {
  return (
    <Section className="py-24 md:py-32">
      <Eyebrow>Error 404</Eyebrow>
      <h1 className="display-lg mt-4 max-w-[18ch]">Esta página no existe o cambió de lugar.</h1>
      <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-mute">
        Rehicimos el sitio y algunas direcciones cambiaron. Desde el inicio encuentras las tres especialidades, o escríbenos y te orientamos.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <BtnLink to="grupo">Ir al inicio</BtnLink>
        <TextLink to="contacto">Contactar</TextLink>
      </div>
    </Section>
  );
}
