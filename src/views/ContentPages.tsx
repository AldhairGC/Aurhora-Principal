"use client";

import { useState } from "react";
import { AlertTriangle, ArrowUpRight, Clock, Info } from "lucide-react";
import { AuroraCanvas } from "@/components/brand/AuroraCanvas";
import { HoursCard } from "@/components/interactive/Maintenance";
import { Breadcrumb, BtnLink, CtaBand, Eyebrow, FaqBlock, PlaceholderMedia, Section, SectionHead, TextLink } from "@/components/sections/primitives";
import { Link, scrollToId } from "@/lib/router";
import { track } from "@/lib/analytics";
import { ARTICLES, articleById } from "@/content/articles";
import { LEGAL_DOCS } from "@/content/legal";
import { serviceById } from "@/content/services";
import { SITE, UNITS, unitById } from "@/content/site";
import type { Article, Block, DocSection, LegalDoc, UnitId } from "@/content/types";
import { cn } from "@/lib/utils";

/* ─────────── Texto enriquecido ─────────── */

function RichBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-4 text-[16.5px] leading-[1.75] text-ink-soft">
      {blocks.map((b, i) => {
        if ("p" in b) return <p key={i}>{b.p}</p>;
        if ("h3" in b) return <h3 key={i} className="mt-3 font-display text-[19px] font-semibold tracking-tight text-ink">{b.h3}</h3>;
        if ("list" in b) {
          const Tag = b.ordered ? "ol" : "ul";
          return (
            <Tag key={i} className={cn("flex flex-col gap-2 pl-5", b.ordered ? "list-decimal" : "list-disc marker:text-unit")}>
              {b.list.map((x) => <li key={x} className="pl-1">{x}</li>)}
            </Tag>
          );
        }
        if ("kv" in b)
          return (
            <dl key={i} className="divide-y divide-line overflow-hidden rounded-[12px] border border-line bg-raised">
              {b.kv.map(([k, v]) => (
                <div key={k} className="grid gap-1 px-4 py-3 text-[15px] sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] sm:gap-4">
                  <dt className="font-medium text-ink">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          );
        const warn = b.tone === "warn";
        const Icon = warn ? AlertTriangle : Info;
        return (
          <aside key={i} className={cn("flex gap-3 rounded-[12px] border p-4 text-[15px]", warn ? "border-warn/40 bg-warn/5 text-ink" : "border-unit/30 bg-unit-soft text-ink")}>
            <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", warn ? "text-warn" : "text-unit")} aria-hidden="true" />
            <p>{b.callout}</p>
          </aside>
        );
      })}
    </div>
  );
}

function Toc({ sections, label = "En esta página" }: { sections: DocSection[]; label?: string }) {
  return (
    <nav aria-label={label} className="lg:sticky lg:top-24">
      <p className="eyebrow text-mute">{label}</p>
      <ol className="mt-4 flex flex-col border-l border-line">
        {sections.map((s) => (
          <li key={s.id}>
            <button type="button" onClick={() => scrollToId(s.id)} className="-ml-px border-l-2 border-transparent py-1.5 pl-4 text-left text-[14px] text-mute transition hover:border-unit hover:text-ink">
              {s.title}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ─────────── Nosotros ─────────── */

const BELIEFS = [
  { t: "Escuchar antes de proponer", d: "Cada proyecto empieza por entender cómo trabajas y qué necesitas." },
  { t: "Claridad antes de cobrar", d: "Alcance, costo y siguientes pasos por escrito antes de empezar." },
  { t: "Prometer lo que podemos cumplir", d: "Horarios reales, sin 24/7 ni llegadas garantizadas que no controlamos." },
  { t: "Respaldo después de entregar", d: "Garantías y seguimiento explicados antes de contratar." },
  { t: "IA donde resuelve algo", d: "Usamos IA y automatización cuando resuelven un problema concreto de tu operación." },
  { t: "Un mismo contacto", d: "Tres especialidades, un solo canal y nadie te hace repetir tu historia." },
];

export function NosotrosPage() {
  return (
    <>
      <section className="gutter relative isolate overflow-hidden bg-night text-on-night">
        <AuroraCanvas paused className="-z-10 opacity-60" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/80 to-transparent" />
        <div className="wrap pb-20 pt-16 md:pb-28 md:pt-24">
          <Breadcrumb night trail={[{ to: "grupo", label: "Inicio" }, { label: "Nosotros" }]} />
          <h1 className="display-xl mt-10 max-w-[16ch]">Somos <span className="aurora-text-night">Aurhora Agency.</span></h1>
          <p className="mt-8 max-w-[44ch] text-[21px] font-medium leading-snug md:text-[24px]">Una agencia que se hace cargo de lo complejo para que tú disfrutes el resultado.</p>
          <p className="mt-5 max-w-[56ch] text-[17px] leading-relaxed text-on-night-mute">Reunimos tecnología, ejecución técnica y servicio en tres especialidades: Digital, Integra y Facilities. Atendemos a personas, negocios y empresas con la misma forma de trabajar.</p>
        </div>
      </section>

      <Section className="py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Por qué Aurhora</Eyebrow>
            <h2 className="display-md mt-4">Detrás de una aurora hay un universo de complejidad.</h2>
          </div>
          <div className="flex flex-col gap-5 text-[17px] leading-relaxed text-mute lg:col-span-6 lg:col-start-7">
            <p>Una aurora boreal es partículas solares, campo magnético y atmósfera trabajando al mismo tiempo. Es difícil de explicar y muy fácil de admirar.</p>
            <p>Así queremos que se sienta trabajar con nosotros: nosotros nos ocupamos de lo que hay detrás, y tú te concentras en lo que el resultado hace posible: que tu negocio avance, que tu espacio esté conectado o que en tu casa todo funcione.</p>
            <TextLink to="grupo" section="origen">Conoce la historia completa</TextLink>
          </div>
        </div>
      </Section>

      <Section className="border-t border-line py-20 md:py-28">
        <SectionHead eyebrow="Cómo estamos organizados" title="Tres especialidades con un mismo respaldo." intro="Cada unidad tiene su equipo y su forma de operar, pero compartimos canal, estándares y compromisos." />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {UNITS.map((u) => (
            <Link key={u.id} to={u.id} data-unit={u.id} className="group flex flex-col rounded-[16px] border border-line bg-raised p-6 transition hover:border-unit/50">
              <span className="grid h-11 w-11 place-items-center rounded-[12px] bg-unit-soft text-unit"><u.icon className="h-5 w-5" aria-hidden="true" /></span>
              <h3 className="mt-6 font-display text-[24px] font-semibold tracking-tight">{u.full}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-mute">{u.desc}</p>
              <span className="eyebrow mt-auto pt-6 text-mute">{u.area}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-sunken py-20 md:py-28">
        <SectionHead eyebrow="Lo que creemos" title="Así trabajamos, en todas las unidades." />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-[16px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {BELIEFS.map((b) => (
            <li key={b.t} className="bg-raised p-6 md:p-7">
              <h3 className="text-[18px] font-semibold leading-snug">{b.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-mute">{b.d}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <Eyebrow>Experiencia</Eyebrow>
            <h2 className="display-md mt-4">Un equipo con recorrido en industrias exigentes.</h2>
            <p className="mt-5 max-w-[46ch] text-[16px] leading-relaxed text-mute">Nuestro equipo reúne más de 10 años de experiencia en tecnología y ejecución técnica, con proyectos en industrias donde los errores cuestan.</p>
            <p className="mt-3 text-[13px] text-mute">Ámbitos de experiencia del equipo; no se presentan como clientes.</p>
          </div>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[16px] border border-line bg-line lg:col-span-6 lg:col-start-7">
            {["Automotriz", "Banca", "Fintech", "Seguros"].map((s) => (
              <li key={s} className="bg-raised p-6 font-display text-[22px] font-semibold tracking-tight md:p-8 md:text-[28px]">{s}</li>
            ))}
          </ul>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          <PlaceholderMedia ratio="min-h-[180px]" label="Espacio para foto del equipo" note="Fotografía propia del equipo. Pendiente de producción." />
          <PlaceholderMedia ratio="min-h-[180px]" label="Espacio para perfiles" note="Nombre, rol y experiencia de las personas que lideran cada unidad, con su autorización." />
          <PlaceholderMedia ratio="min-h-[180px]" label="Espacio para caso real" note="Proyecto autorizado por el cliente, con alcance verificable." />
        </div>
      </Section>

      <Section className="border-t border-line py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow>Dónde estamos</Eyebrow>
            <h2 className="display-md mt-4">Ciudad de México, para todo el país.</h2>
            <p className="mt-5 max-w-[48ch] text-[16px] leading-relaxed text-mute">Los servicios físicos de Integra y Facilities se realizan en CDMX y zonas del Estado de México. Los proyectos de Aurhora Digital se trabajan en línea con clientes de todo México.</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {SITE.zones.map((z) => <li key={z} className="rounded-full border border-line px-3 py-1 text-[13px] text-ink-soft">{z}</li>)}
            </ul>
          </div>
          <div className="lg:col-span-5 lg:col-start-8"><HoursCard /></div>
        </div>
      </Section>

      <CtaBand title={<>¿Trabajamos juntos? <span className="text-on-night-mute">Empieza por contarnos qué necesitas.</span></>} text="Un mismo contacto para todo Aurhora. Te canalizamos con la especialidad adecuada." unit="orientacion" waText="Hola, Aurhora. Me gustaría recibir orientación." />
    </>
  );
}

/* ─────────── Recursos ─────────── */

const FILTERS: { id: "todos" | UnitId; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "digital", label: "Digital" },
  { id: "integra", label: "Integra" },
  { id: "facilities", label: "Facilities" },
];

function ArticleCard({ a, large }: { a: Article; large?: boolean }) {
  const u = unitById(a.unit);
  return (
    <Link to={a.id} data-unit={a.unit} className={cn("group flex flex-col rounded-[16px] border border-line bg-raised p-6 transition hover:-translate-y-0.5 hover:border-unit/50", large && "md:p-8")}>
      <div className="flex items-center justify-between gap-3">
        <span className="eyebrow text-unit">{u.full}</span>
        <span className="eyebrow inline-flex items-center gap-1.5 text-mute"><Clock className="h-3 w-3" aria-hidden="true" />{a.minutes} min</span>
      </div>
      <h3 className={cn("mt-5 font-display font-semibold leading-tight tracking-tight", large ? "text-[28px] md:text-[34px]" : "text-[21px]")}>{a.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-mute">{a.excerpt}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-medium text-unit">Leer <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></span>
    </Link>
  );
}

export function RecursosPage() {
  const [filter, setFilter] = useState<"todos" | UnitId>("todos");
  const list = filter === "todos" ? ARTICLES : ARTICLES.filter((a) => a.unit === filter);
  const [featured, ...rest] = list;

  return (
    <>
      <Section className="pb-12 pt-14 md:pt-20">
        <Breadcrumb trail={[{ to: "grupo", label: "Inicio" }, { label: "Recursos" }]} />
        <h1 className="display-lg mt-8 max-w-[18ch]">Guías para decidir <span className="aurora-text">con claridad.</span></h1>
        <p className="mt-6 max-w-[56ch] text-[17px] leading-relaxed text-mute">Respuestas prácticas sobre inteligencia artificial, tecnología para tus espacios y mantenimiento. Escritas por el equipo, sin tecnicismos innecesarios.</p>
        <div role="tablist" aria-label="Filtrar por especialidad" className="mt-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => { setFilter(f.id); track("select_content", { content_type: "resource_filter", content_id: f.id }); }}
              className={cn("rounded-full border px-4 py-2 text-[14px] transition", filter === f.id ? "border-ink bg-ink text-bg" : "border-line text-ink-soft hover:border-line-strong")}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Section>
      <Section className="pb-24">
        {featured && (
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7"><ArticleCard a={featured} large /></div>
            <div className="grid gap-4 lg:col-span-5">{rest.slice(0, 2).map((a) => <ArticleCard key={a.id} a={a} />)}</div>
          </div>
        )}
        {rest.length > 2 && (
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{rest.slice(2).map((a) => <ArticleCard key={a.id} a={a} />)}</div>
        )}
      </Section>
    </>
  );
}

/* ─────────── Artículo ─────────── */

export function ArticlePage({ article: a }: { article: Article }) {
  const u = unitById(a.unit);
  const svc = serviceById(a.service)!;
  return (
    <div data-unit={a.unit}>
      <Section className="pb-10 pt-12 md:pt-16">
        <Breadcrumb trail={[{ to: "grupo", label: "Inicio" }, { to: "recursos", label: "Recursos" }, { label: u.name }]} />
        <h1 className="display-lg mt-8 max-w-[22ch]">{a.title}</h1>
        <p className="mt-6 max-w-[60ch] text-[18px] leading-relaxed text-mute">{a.excerpt}</p>
        <p className="eyebrow mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-mute">
          <span className="text-unit">{u.full}</span>
          <span>{a.date}</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="h-3 w-3" aria-hidden="true" />{a.minutes} min de lectura</span>
          <span>Equipo Aurhora</span>
        </p>
      </Section>
      <Section className="border-t border-line pb-20 pt-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block"><Toc sections={a.sections} /></aside>
          <article className="min-w-0 lg:col-span-7 lg:col-start-5">
            <div className="flex flex-col gap-12">
              {a.sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-24">
                  <h2 className="display-sm mb-5">{s.title}</h2>
                  <RichBlocks blocks={s.blocks} />
                </section>
              ))}
            </div>
            {a.faq && (
              <div className="mt-14">
                <h2 className="display-sm mb-4">Preguntas frecuentes</h2>
                <FaqBlock items={a.faq} />
              </div>
            )}
            <div className="mt-14 flex flex-col gap-5 rounded-[16px] bg-unit-soft p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div>
                <p className="eyebrow text-unit">{u.full}</p>
                <p className="mt-2 font-display text-[22px] font-semibold tracking-tight">{svc.name}</p>
                <p className="mt-1 max-w-[46ch] text-[15px] text-ink-soft">{svc.tagline}</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <BtnLink to={svc.id} variant="unit">Conocer el servicio</BtnLink>
              </div>
            </div>
          </article>
        </div>
      </Section>
      <Section className="border-t border-line py-16">
        <Eyebrow>Sigue leyendo</Eyebrow>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {a.related.map((id) => articleById(id)).filter((x): x is Article => Boolean(x)).map((r) => <ArticleCard key={r.id} a={r} />)}
        </div>
      </Section>
      <CtaBand title={<>¿Prefieres que lo veamos <span className="text-unit-night">contigo?</span></>} text="Cuéntanos tu caso y te orientamos sin compromiso." unit={a.unit} service={svc.contactService} waText={`Hola, ${u.full}. Leí "${a.title}" y me gustaría orientación.`} />
    </div>
  );
}

/* ─────────── Legal ─────────── */

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <Section className="pb-10 pt-12 md:pt-16">
        <Breadcrumb trail={[{ to: "grupo", label: "Inicio" }, { label: doc.title }]} />
        <h1 className="display-lg mt-8">{doc.title}</h1>
        <p className="mt-6 max-w-[62ch] text-[17px] leading-relaxed text-mute">{doc.intro}</p>
        <p className="eyebrow mt-6 text-mute">Última actualización: {doc.updated}</p>
        <div className="mt-6 flex max-w-[70ch] gap-3 rounded-[12px] border border-warn/40 bg-warn/5 p-4 text-[14px]">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warn" aria-hidden="true" />
          <p>Borrador para revisión. Adaptado del texto vigente del sitio a las tres unidades de Aurhora; debe validarse con asesoría legal antes de publicarse.</p>
        </div>
      </Section>
      <Section className="border-t border-line pb-24 pt-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block"><Toc sections={doc.sections} label="Contenido" /></aside>
          <div className="flex min-w-0 flex-col gap-12 lg:col-span-7 lg:col-start-5">
            {doc.sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="mb-5 flex items-baseline gap-3 font-display text-[24px] font-semibold tracking-tight">
                  <span className="eyebrow tabular text-mute">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                <RichBlocks blocks={s.blocks} />
              </section>
            ))}
            <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-[14px]">
              {[["privacidad", "Aviso de privacidad"], ["terminos", "Términos y condiciones"], ["cookies", "Política de cookies"]]
                .filter(([id]) => id !== doc.id)
                .map(([id, label]) => <Link key={id} to={id} className="text-unit underline-offset-4 hover:underline">{label}</Link>)}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ─────────── Mapa del sitio ─────────── */

export function SitemapPage() {
  const groups: { title: string; links: [string, string][] }[] = [
    { title: "Aurhora Agency", links: [["grupo", "Inicio"], ["nosotros", "Nosotros"], ["recursos", "Recursos"], ["contacto", "Contacto"]] },
    ...UNITS.map((u) => ({
      title: u.full,
      links: [[u.id, `Todo ${u.full}`] as [string, string], ...u.services.map((id): [string, string] => [id, serviceById(id)!.name])],
    })),
    { title: "Guías", links: ARTICLES.map((a): [string, string] => [a.id, a.title]) },
    { title: "Legal", links: LEGAL_DOCS.map((d): [string, string] => [d.id, d.title]) },
  ];
  return (
    <>
      <Section className="pb-10 pt-14 md:pt-20">
        <Breadcrumb trail={[{ to: "grupo", label: "Inicio" }, { label: "Mapa del sitio" }]} />
        <h1 className="display-lg mt-8 max-w-[18ch]">Mapa del sitio</h1>
        <p className="mt-6 max-w-[56ch] text-[17px] leading-relaxed text-mute">Todas las páginas de Aurhora Agency en un solo lugar: las tres especialidades con sus servicios, las guías y los documentos legales.</p>
      </Section>
      <Section className="pb-24">
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <h2 className="eyebrow text-mute">{g.title}</h2>
              <ul className="mt-4 space-y-2.5 border-t border-line pt-4 text-[15px]">
                {g.links.map(([to, label]) => (
                  <li key={to}>
                    <Link to={to} className="text-ink-soft underline-offset-4 transition hover:text-ink hover:underline">{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Section>
    </>
  );
}
