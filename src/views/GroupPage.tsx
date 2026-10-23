"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { AuroraCanvas } from "@/components/brand/AuroraCanvas";
import { CtaBand, Eyebrow, FaqBlock, Marquee, PlaceholderMedia, Section, SectionHead, TextLink } from "@/components/sections/primitives";
import { JourneyStepper, UnitExplorer } from "@/components/interactive/Group";
import { NeedFinder } from "@/components/interactive/Finders";
import { HoursCard } from "@/components/interactive/Maintenance";
import { OpenDot } from "@/components/layout/Header";
import { Link, scrollToId } from "@/lib/router";
import { useReducedMotion } from "@/lib/theme";
import { UNITS } from "@/content/site";
import { cn } from "@/lib/utils";

const CAPABILITIES = ["Agentes de IA", "IA agéntica", "Automatización de procesos", "Software a la medida", "Domótica", "Mantenimiento industrial", "Cámaras y accesos", "Redes y WiFi", "Audio y video", "Aire acondicionado", "Electricidad", "Plomería", "Instalaciones y reparaciones", "Marketing digital", "GoDigital Suite"];

const COMMITMENTS = [
  { title: "Cotización antes de trabajar", desc: "Sabes qué se hará y cuánto costará antes de aceptar." },
  { title: "Diagnóstico descontable", desc: "Si hace falta, te informamos su costo primero y se descuenta del trabajo aceptado." },
  { title: "Horario real", desc: "Lunes a viernes de 8:00 a 20:00 y sábados de 8:00 a 16:00. Fuera de ese horario, las urgencias se evalúan según disponibilidad." },
  { title: "Respaldo por escrito", desc: "90 días en Aurhora Facilities; +1 año adicional en productos elegibles de Integra." },
];

const GROUP_FAQ: [string, string][] = [
  ["¿Por qué tres especialidades en una sola agencia?", "Porque las necesidades de un hogar o un negocio cambian. Puedes empezar con un mantenimiento y después necesitar cámaras o una herramienta digital, sin volver a explicar quién eres."],
  ["¿Tengo que saber con qué unidad hablar?", "No. Escríbenos por el mismo WhatsApp y te canalizamos con la especialidad adecuada."],
  ["¿Dónde atienden?", "Los servicios físicos se realizan en CDMX y zonas del Estado de México. Los proyectos digitales se atienden en todo México."],
  ["¿Publican precios?", "Sí. Cada servicio muestra sus precios desde, con IVA incluido. El precio final depende del alcance, por eso cotizamos antes de ejecutar y te informamos cualquier costo de diagnóstico."],
];

const SECTORS = ["Automotriz", "Banca", "Fintech", "Seguros"];

/* Vimeo in "do not track" mode: no tracking cookies, so it needs no consent. */
const VIDEO_URL = "https://player.vimeo.com/video/1238894364?badge=0&autopause=0&player_id=0&app_id=58479&dnt=1";

export function GroupPage() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(reduced);

  return (
    <>
      {/* ───── Hero: el cielo ───── */}
      <section className="gutter relative isolate overflow-hidden bg-night text-on-night">
        <AuroraCanvas paused={paused} className="-z-10 opacity-80 [filter:blur(0.8px)_saturate(1.1)]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_18%_62%,rgb(var(--night)/0.82),transparent_75%)]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-night/40 md:hidden" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-night to-transparent" />
        <div className="wrap grid gap-10 pb-10 pt-16 md:pt-24 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="eyebrow flex items-center gap-2 text-on-night-mute">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-mint" /> Aurhora Agency · tres especialidades · México
            </motion.p>
            <h1 className="display-xl mt-6">
              <motion.span initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }} className="block">Tú disfruta</motion.span>
              <motion.span initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="block">el <span className="aurora-text-night">resultado.</span></motion.span>
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.35 }} className="mt-8 max-w-[34ch] text-[21px] font-medium leading-snug text-on-night md:text-[25px]">
              Nosotros nos encargamos de lo complejo.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.45 }} className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-on-night-mute">
              Reunimos tecnología, instalación y mantenimiento para que tu negocio y tus espacios funcionen sin que tengas que coordinar a varios proveedores.
            </motion.p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => scrollToId("encuentra")} className="group inline-flex min-h-[48px] items-center gap-2 rounded-[12px] bg-on-night px-5 text-[15px] font-medium text-night transition hover:bg-white">
                Encuentra tu solución <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => scrollToId("origen")} className="inline-flex min-h-[48px] items-center gap-2 rounded-[12px] border border-night-line px-5 text-[15px] text-on-night transition hover:bg-night-raised">
                La idea detrás de Aurhora
              </button>
            </div>
          </div>
        </div>

        {/* three threads: one per unit */}
        <div className="wrap relative pb-6">
          <div className="flex items-center justify-between gap-4 pb-4">
            <OpenDot night />
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="eyebrow inline-flex shrink-0 whitespace-nowrap items-center gap-2 rounded-full border border-night-line px-3 py-1.5 text-on-night-mute hover:text-on-night"
              aria-pressed={paused}
            >
              {paused ? <Play className="h-3 w-3" aria-hidden="true" /> : <Pause className="h-3 w-3" aria-hidden="true" />}
              {paused ? "Reanudar aurora" : "Pausar aurora"}
            </button>
          </div>
          <nav aria-label="Especialidades" className="grid gap-px overflow-hidden rounded-[16px] border border-night-line bg-night-line md:grid-cols-3">
            {UNITS.map((u) => (
              <Link key={u.id} to={u.id} data-unit={u.id} className="group relative flex items-center gap-4 bg-night/80 p-5 backdrop-blur transition hover:bg-night-raised">
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-[0.25] bg-unit-night transition-transform duration-500 group-hover:scale-x-100" />
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-unit-night/15 text-unit-night">
                  <u.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[17px] font-semibold tracking-tight">{u.full}</span>
                  <span className="block truncate text-[13.5px] text-on-night-mute">{u.short}</span>
                </span>
                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-on-night-mute transition group-hover:text-on-night" aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t border-night-line py-5 text-on-night-mute">
          <Marquee items={CAPABILITIES} />
        </div>
      </section>

      {/* ───── Video ───── */}
      <Section className="py-20 md:py-28">
        <SectionHead
          eyebrow="Conócenos"
          title={<>Hagamos que funcione.</>}
          intro="Quiénes somos, qué resolvemos y cómo trabajamos, en menos de dos minutos."
        />
        <div className="relative mt-12 aspect-video overflow-hidden rounded-[24px] border border-line bg-night">
          <iframe
            src={VIDEO_URL}
            title="Aurhora — Hagamos que funcione"
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </Section>

      {/* ───── Encuentra tu solución ───── */}
      <Section id="encuentra" className="py-20 md:py-28">
        <SectionHead
          eyebrow="Empieza por lo que necesitas"
          title={<>Dinos dónde y qué.<br /><span className="text-mute">Te decimos quién te atiende.</span></>}
          intro="No necesitas conocer nuestras unidades. Elige tu espacio y lo que quieres resolver; te mostramos el servicio y preparamos tu solicitud."
        />
        <NeedFinder className="mt-12" />
      </Section>

      {/* ───── Especialidades ───── */}
      <Section className="border-t border-line py-20 md:py-28">
        <SectionHead
          eyebrow="Nuestras especialidades"
          title={<>Tres especialidades, <span className="aurora-text">una forma de trabajar.</span></>}
          intro="Explora qué resuelve cada una antes de escribirnos. Si no sabes cuál necesitas, te orientamos por WhatsApp."
        />
        <div className="mt-14"><UnitExplorer /></div>
      </Section>

      {/* ───── El origen ───── */}
      <section id="origen" className="gutter scroll-mt-16 bg-night py-24 text-on-night md:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:sticky lg:top-28 lg:col-span-6 lg:self-start">
            <Eyebrow className="text-on-night-mute">El origen de Aurhora</Eyebrow>
            <h2 className="display-lg mt-6">Lo extraordinario no tiene que ser <span className="aurora-text-night">complicado para ti.</span></h2>
          </div>
          <div className="flex flex-col gap-12 lg:col-span-5 lg:col-start-8">
            {[
              ["Detrás", "Una aurora boreal es partículas solares, campo magnético y atmósfera trabajando al mismo tiempo. Es un fenómeno difícil de explicar."],
              ["Delante", "Y sin embargo, quien la mira solo necesita levantar la vista."],
              ["Entre ambos", "Así trabajamos: nos ocupamos de lo que hay detrás para que tú te concentres en lo que el resultado hace posible."],
            ].map(([k, t]) => (
              <div key={k} className="border-l border-night-line pl-6">
                <p className="eyebrow text-unit-night">{k}</p>
                <p className="mt-3 text-[20px] font-medium leading-snug md:text-[23px]">{t}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="wrap mt-20">
          <div className="relative overflow-hidden rounded-[24px] border border-night-line">
            <div className="relative aspect-[16/9] max-w-full md:aspect-[21/9]">
              <AuroraCanvas paused={true} className="opacity-70" />
              <div aria-hidden="true" className="night-grid absolute inset-0 opacity-30" />
              <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-8">
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-on-night-mute">Nuestra historia</span>
                  <span className="eyebrow rounded-full border border-night-line bg-night/60 px-3 py-1 text-on-night-mute">Próximamente</span>
                </div>
                <div>
                  <p className="eyebrow text-on-night-mute">Película de presentación</p>
                  <p className="mt-2 max-w-[22ch] font-display text-[26px] font-semibold leading-tight tracking-tight md:text-[40px]">Qué hacemos y por qué lo hacemos así.</p>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-3 text-[13px] text-on-night-mute">Película de presentación en preparación. Se reproducirá solo cuando la elijas, con controles y subtítulos.</p>
        </div>
      </section>

      {/* ───── Recorrido ───── */}
      <Section className="py-20 md:py-28">
        <SectionHead
          eyebrow="Un ejemplo"
          title={<>Tu siguiente paso ya tiene <span className="aurora-text">con quién.</span></>}
          intro="Puedes empezar por algo pequeño. Cuando tus necesidades cambien, tendrás otras especialidades cerca, sin volver a explicar desde cero quién eres."
        />
        <div className="mt-12"><JourneyStepper /></div>
      </Section>

      {/* ───── Cómo trabajamos ───── */}
      <Section className="border-t border-line py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Un mismo contacto</Eyebrow>
            <h2 className="display-md mt-4">Escuchamos, aclaramos el camino y respondemos.</h2>
            <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-mute">Tres especialidades con la misma forma de trabajar. Un solo WhatsApp te conecta con el equipo correcto, y el seguimiento queda con quien hizo el trabajo.</p>
            <ol className="mt-10 flex flex-col gap-6">
              {[
                ["Escuchar", "Primero tu realidad: qué necesitas, cómo trabajas y qué debe mejorar."],
                ["Dar claridad", "Alcance, cotización y siguientes pasos antes de comenzar."],
                ["Responder", "Seguimiento y respaldo según el servicio o producto contratado."],
              ].map(([t, d], i) => (
                <li key={t} className="grid grid-cols-[auto_1fr] gap-4">
                  <span className="eyebrow tabular pt-1.5 text-mute">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-[19px] font-semibold">{t}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-mute">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="min-w-0 lg:col-span-6 lg:col-start-7">
            <OneContactDiagram />
          </div>
        </div>
      </Section>

      {/* ───── Compromisos + experiencia ───── */}
      <section className="gutter bg-sunken py-20 md:py-28">
        <div className="wrap">
          <SectionHead
            eyebrow="Compromisos"
            title="Lo que sabes antes de contratar."
            intro="Estas reglas aplican igual en Digital, Integra y Facilities."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COMMITMENTS.map((c) => (
              <div key={c.title} className="flex flex-col rounded-[16px] border border-line bg-raised p-6">
                <h3 className="text-[18px] font-semibold leading-snug">{c.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-mute">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <Eyebrow>Experiencia del equipo</Eyebrow>
              <h2 className="display-md mt-4">Recorrido en industrias exigentes.</h2>
              <p className="mt-5 max-w-[46ch] text-[16px] leading-relaxed text-mute">Nuestro equipo reúne experiencia en tecnología y ejecución técnica, con recorrido en industrias exigentes. Escuchamos primero y construimos a partir de tu realidad.</p>
              <p className="mt-4 text-[13px] text-mute">Ámbitos de experiencia de nuestro equipo; no se presentan como clientes.</p>
              <TextLink to="nosotros" className="mt-6">Conoce más sobre nosotros</TextLink>
            </div>
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[16px] border border-line bg-line lg:col-span-6 lg:col-start-7">
              {SECTORS.map((s) => (
                <li key={s} className="bg-raised p-6 font-display text-[22px] font-semibold tracking-tight md:p-8 md:text-[28px]">{s}</li>
              ))}
            </ul>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            <PlaceholderMedia ratio="min-h-[150px]" label="Espacio para caso real" note="Reservado para un proyecto autorizado por el cliente, con fotos propias y alcance verificable." />
            <PlaceholderMedia ratio="min-h-[150px]" label="Espacio para foto del equipo" note="Fotografía propia del equipo en sitio. Pendiente de producción." />
            <PlaceholderMedia ratio="min-h-[150px]" label="Espacio para testimonio" note="Solo con autorización escrita y nombre real." />
          </div>
        </div>
      </section>

      {/* ───── Horario + FAQ ───── */}
      <Section className="py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Antes de escribirnos</Eyebrow>
            <h2 className="display-md mt-4">Lo que conviene saber.</h2>
            <HoursCard className="mt-10" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <FaqBlock items={GROUP_FAQ} />
          </div>
        </div>
      </Section>

      <CtaBand
        title={<>Cuéntanos lo que imaginas.<br /><span className="text-on-night-mute">O lo que hoy no funciona.</span></>}
        text="Un mismo contacto para todo Aurhora. Te canalizamos con la especialidad adecuada."
        unit="orientacion"
        waText="Hola, Aurhora. Me gustaría recibir orientación."
      />
    </>
  );
}

function OneContactDiagram() {
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-line bg-raised p-5 md:p-8">
      <div aria-hidden="true" className="hairline-grid absolute inset-0 opacity-60" />
      <div className="relative flex flex-col items-stretch gap-0">
        <div className="mx-auto w-full max-w-xs rounded-[12px] border border-line bg-bg p-4 text-center">
          <p className="eyebrow text-mute">Tú</p>
          <p className="mt-1 font-display text-[18px] font-semibold tracking-tight">Un mensaje por WhatsApp</p>
        </div>
        <div aria-hidden="true" className="mx-auto h-10 w-px bg-line-strong/60" />
        <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[12px] bg-night p-4 text-center text-on-night">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_0%,rgb(var(--violet)/0.4),transparent_70%)]" />
          <p className="eyebrow relative text-on-night-mute">Aurhora Agency</p>
          <p className="relative mt-1 font-display text-[18px] font-semibold tracking-tight">Un equipo te orienta</p>
        </div>
        <svg aria-hidden="true" viewBox="0 0 300 48" className="h-12 w-full max-w-full" preserveAspectRatio="none">
          <path d="M150 0 V18 M150 18 H50 V48 M150 18 V48 M150 18 H250 V48" className="stroke-line-strong/60" fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="grid grid-cols-3 gap-2">
          {UNITS.map((u) => (
            <Link key={u.id} to={u.id} data-unit={u.id} className={cn("flex flex-col items-center gap-2 rounded-[12px] border border-line bg-unit-soft p-3 text-center transition hover:border-unit")}>
              <u.icon className="h-5 w-5 text-unit" aria-hidden="true" />
              <span className="text-[13px] font-semibold leading-tight">{u.name}</span>
            </Link>
          ))}
        </div>
        <p className="mt-5 text-center text-[13px] text-mute">El seguimiento queda con la especialidad que hizo el trabajo.</p>
      </div>
    </div>
  );
}

