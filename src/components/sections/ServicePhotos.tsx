import Image from "next/image";
import { Section, SectionHead } from "@/components/sections/primitives";
import { photosOf } from "@/content/photos";

/** Galería de trabajo en sitio para una página de servicio. No se muestra si no hay fotos. */
export function ServicePhotos({ serviceId }: { serviceId: string }) {
  const photos = photosOf(serviceId);
  if (!photos.length) return null;
  const single = photos.length === 1;
  const cols = photos.length === 2 ? "sm:columns-2" : "sm:columns-2 lg:columns-3";
  return (
    <Section id="fotos-sitio" className="border-t border-line bg-sunken py-20 md:py-28">
      <SectionHead eyebrow="Ejemplos" title="Así se ven algunos de nuestros trabajos." intro="Ejemplos de instalaciones y mantenimientos que hemos realizado en sitio." />
      <ul className={single ? "mt-12 max-w-[760px]" : `mt-12 columns-1 gap-5 ${cols} [&>li]:mb-5`}>
        {photos.map((p, i) => (
          <li key={p.src} className="break-inside-avoid">
            <figure className="overflow-hidden rounded-[16px] border border-line bg-raised">
              <Image
                src={p.src}
                width={p.width}
                height={p.height}
                alt={p.alt}
                sizes={single ? "(min-width: 768px) 760px, 100vw" : photos.length === 2 ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                priority={i === 0}
                className="h-auto w-full"
              />
              <figcaption className="px-4 py-3 text-[13.5px] leading-snug text-mute">{p.alt}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
