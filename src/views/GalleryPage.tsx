"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Breadcrumb, CtaBand, Section, TextLink } from "@/components/sections/primitives";
import { track } from "@/lib/analytics";
import { PHOTO_COUNT, PHOTO_GROUPS, type Photo } from "@/content/photos";
import { serviceById } from "@/content/services";
import { unitById } from "@/content/site";
import { cn } from "@/lib/utils";

const ALL = "todas";
const FLAT = PHOTO_GROUPS.flatMap((g) => g.photos.map((p) => ({ ...p, group: g.id })));

/* ─────────── Visor ─────────── */

function Lightbox({ index, onClose, onMove }: { index: number | null; onClose: () => void; onMove: (i: number) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null;
  const p = open ? FLAT[index] : null;
  const go = useCallback((d: number) => index !== null && onMove((index + d + FLAT.length) % FLAT.length), [index, onMove]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const btn = "grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20";
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-label="Foto ampliada"
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-black p-0 text-white backdrop:bg-black"
    >
      {p && (
        <div className="flex h-full flex-col" onClick={(e) => e.target === e.currentTarget && onClose()}>
          <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
            <p className="eyebrow text-white/70">{index! + 1} / {FLAT.length}</p>
            <button type="button" onClick={onClose} className={btn} aria-label="Cerrar"><X className="h-5 w-5" aria-hidden="true" /></button>
          </div>
          <div className="relative min-h-0 flex-1 px-4 md:px-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <Image key={p.src} src={p.src} alt={p.alt} fill sizes="100vw" className="object-contain" />
            <button type="button" onClick={() => go(-1)} className={cn(btn, "absolute left-3 top-1/2 -translate-y-1/2 md:left-6")} aria-label="Foto anterior"><ChevronLeft className="h-5 w-5" aria-hidden="true" /></button>
            <button type="button" onClick={() => go(1)} className={cn(btn, "absolute right-3 top-1/2 -translate-y-1/2 md:right-6")} aria-label="Foto siguiente"><ChevronRight className="h-5 w-5" aria-hidden="true" /></button>
          </div>
          <p className="mx-auto max-w-[70ch] px-6 py-4 text-center text-[14.5px] leading-snug text-white/80">{p.alt}</p>
        </div>
      )}
    </dialog>
  );
}

/* ─────────── Página ─────────── */

function PhotoTile({ p, onOpen, eager }: { p: Photo; onOpen: () => void; eager?: boolean }) {
  return (
    <li className="mb-4 break-inside-avoid">
      <figure className="group overflow-hidden rounded-[16px] border border-line bg-raised">
        <button type="button" onClick={onOpen} className="block w-full cursor-zoom-in overflow-hidden" aria-label={`Ampliar: ${p.alt}`}>
          <Image
            src={p.src}
            width={p.width}
            height={p.height}
            alt={p.alt}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={eager}
            className="h-auto w-full transition duration-500 group-hover:scale-[1.02]"
          />
        </button>
        <figcaption className="px-4 py-3 text-[13.5px] leading-snug text-mute">{p.alt}</figcaption>
      </figure>
    </li>
  );
}

export function GalleryPage() {
  const [filter, setFilter] = useState(ALL);
  const [open, setOpen] = useState<number | null>(null);
  const groups = filter === ALL ? PHOTO_GROUPS : PHOTO_GROUPS.filter((g) => g.id === filter);
  const filters = [{ id: ALL, label: "Todas", count: PHOTO_COUNT }, ...PHOTO_GROUPS.map((g) => ({ id: g.id, label: g.label, count: g.photos.length }))];

  const openPhoto = (src: string) => {
    const i = FLAT.findIndex((p) => p.src === src);
    setOpen(i);
    track("select_content", { content_type: "gallery_photo", content_id: FLAT[i].group });
  };

  return (
    <>
      <Section className="pb-10 pt-14 md:pt-20">
        <Breadcrumb trail={[{ to: "grupo", label: "Inicio" }, { label: "Galería" }]} />
        <h1 className="display-lg mt-8 max-w-[18ch]">Nuestro trabajo, <span className="aurora-text">en fotos.</span></h1>
        <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-mute">Instalaciones y mantenimientos que hemos realizado en sitio para casas, negocios e industria. Fotos propias, ordenadas por tipo de servicio.</p>
        <div role="tablist" aria-label="Filtrar por tipo de servicio" className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => { setFilter(f.id); track("select_content", { content_type: "gallery_filter", content_id: f.id }); }}
              className={cn("inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[14px] transition", filter === f.id ? "border-ink bg-ink text-bg" : "border-line text-ink-soft hover:border-line-strong")}
            >
              {f.label}
              <span className={cn("font-mono text-[12px]", filter === f.id ? "text-bg/70" : "text-mute")}>{f.count}</span>
            </button>
          ))}
        </div>
      </Section>

      <div className="pb-8">
        {groups.map((g, gi) => {
          const u = unitById(g.unit);
          return (
            <Section key={g.id} id={g.id} data-unit={g.unit} className="border-t border-line py-14 md:py-20">
              <div className="grid gap-6 md:grid-cols-12 md:items-end">
                <div className="md:col-span-7">
                  <p className="eyebrow text-unit">{u.full}</p>
                  <h2 className="display-sm mt-3">{g.label}</h2>
                  <p className="mt-3 max-w-[56ch] text-[16px] leading-relaxed text-mute">{g.desc}</p>
                </div>
                <ul className="flex flex-wrap gap-x-6 gap-y-2 md:col-span-5 md:justify-end">
                  {g.services.map((id) => (
                    <li key={id}><TextLink to={id}>{serviceById(id)!.name}</TextLink></li>
                  ))}
                </ul>
              </div>
              <ul className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
                {g.photos.map((p, i) => (
                  <PhotoTile key={p.src} p={p} eager={gi === 0 && i < 3} onOpen={() => openPhoto(p.src)} />
                ))}
              </ul>
            </Section>
          );
        })}
      </div>

      <CtaBand
        title={<>¿Quieres un trabajo así? <span className="text-on-night-mute">Cuéntanos qué necesitas.</span></>}
        text="Al terminar te entregamos una bitácora digital con fotos del antes y el después de tu servicio."
        unit="orientacion"
        waText="Hola, Aurhora. Vi la galería y me gustaría cotizar un trabajo."
      />

      <Lightbox index={open} onClose={() => setOpen(null)} onMove={setOpen} />
    </>
  );
}
