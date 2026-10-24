"use client";

import { ContactWizard } from "@/components/interactive/ContactWizard";
import { ArrowUpRight, CircleCheck, ShieldCheck } from "lucide-react";
import { Breadcrumb, BtnLink, CtaBand, Eyebrow, FaqBlock, ProcessSteps, Section, SectionHead, TextLink, WhatsAppBtn } from "@/components/sections/primitives";
import { Link } from "@/lib/router";
import { AgentBlueprint, AgentComparison } from "@/components/interactive/Agents";
import { serviceById } from "@/content/services";
import { unitById } from "@/content/site";
import { ARTICLES } from "@/content/articles";
import { extrasOf, faqOf } from "@/content/extras";
import { ServiceCost } from "@/components/sections/ServiceCost";
import { ServiceAnatomy } from "@/components/sections/ServiceAnatomy";
import { anatomyOf } from "@/content/anatomy";
import { DigitalLogbook } from "@/components/sections/DigitalLogbook";
import type { Service } from "@/content/types";

export function ServicePage({ service: s }: { service: Service }) {
  const unit = unitById(s.unit);
  const anatomy = anatomyOf(s.id);
  const wa =`Hola, ${unit.full}. Me interesa ${s.name.toLowerCase()}.`;

  return (
    <div data-unit={s.unit}>
      {/* Hero */}
      <section className="gutter relative overflow-hidden border-b border-line bg-unit-soft">
        <div aria-hidden="true" className="hairline-grid absolute inset-0 opacity-50 [mask-image:linear-gradient(90deg,transparent,black_60%)]" />
        <div className="wrap relative grid gap-10 pb-14 pt-10 md:pb-20 md:pt-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Breadcrumb trail={[{ to: "grupo", label: "Inicio" }, { to: s.unit, label: unit.name }, { label: s.name }]} />
            <p className="eyebrow mt-10 flex items-center gap-2 text-unit">
              <s.icon className="h-4 w-4" aria-hidden="true" /> {unit.full}
            </p>
            <h1 className="mt-4 max-w-[34ch] text-[20px] font-semibold leading-snug md:text-[24px]">{s.h1}</h1>
            <p className="display-lg mt-5 font-display">{s.heroLead} <span className="text-unit">{s.heroAccent}</span></p>
            <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-ink-soft">{s.heroDesc}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <BtnLink to="contacto" variant="unit" prefill={{ unit: s.unit, service: s.contactService, origin: s.name }}>Solicitar este servicio</BtnLink>
              <WhatsAppBtn text={wa} variant="outline">WhatsApp</WhatsAppBtn>
            </div>
          </div>
          <aside className="rounded-[16px] border border-line bg-raised p-6 lg:col-span-5">
            <p className="eyebrow text-mute">Qué esperar</p>
            <dl className="mt-4 divide-y divide-line">
              {s.expect.map((e) => (
                <div key={e.label} className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-4 py-3 text-[14px]">
                  <dt className="text-mute">{e.label}</dt>
                  <dd className="font-medium">{e.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* Includes */}
      <Section className="py-20 md:py-28">
        <SectionHead eyebrow="Así podemos ayudarte" title="Qué incluye." intro="El alcance exacto se define contigo antes de empezar. Estas son las formas más comunes en que trabajamos." />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-[16px] border border-line bg-line sm:grid-cols-2">
          {s.includes.map((i) => (
            <li key={i.title} className="flex gap-4 bg-raised p-6 md:p-7">
              <CircleCheck className="mt-1 h-5 w-5 shrink-0 text-unit" aria-hidden="true" />
              <div>
                <h3 className="text-[19px] font-semibold leading-snug">{i.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-mute">{i.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {s.id === "agentes-ia" ? (
        <section className="gutter bg-night py-20 text-on-night md:py-28">
          <div className="wrap">
            <SectionHead night eyebrow="Anatomía de un agente" title="Así diseñamos cada agente." intro="Cada agente tiene un disparador, conocimiento, herramientas, límites y un momento claro para pasar el caso a una persona." />
            <div className="mt-12"><AgentBlueprint /></div>
            <div className="mt-14"><AgentComparison night /></div>
          </div>
        </section>
      ) : anatomy && <ServiceAnatomy a={anatomy} serviceId={s.id} />}

      {extrasOf(s.id) && <ServiceCost x={extrasOf(s.id)!} name={s.name} />}

      {s.stack && !anatomy?.layers && (
        <Section className="border-b border-line py-14">
          <div className="grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-4">
              <Eyebrow>Tecnología</Eyebrow>
              <p className="mt-3 font-display text-[22px] font-semibold tracking-tight">Herramientas que elegimos según tu caso.</p>
            </div>
            <ul className="flex flex-wrap gap-2 md:col-span-8">
              {s.stack.map((t) => <li key={t} className="rounded-full border border-line bg-raised px-3.5 py-1.5 text-[14px]">{t}</li>)}
            </ul>
          </div>
        </Section>
      )}

      {/* Signals + for who */}
      <Section className="border-t border-line bg-sunken py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Señales de que lo necesitas</Eyebrow>
            <h2 className="display-md mt-4">¿Te suena alguna?</h2>
            <ul className="mt-8 flex flex-col gap-2">
              {s.signals.map((x) => (
                <li key={x} className="flex items-center gap-3 rounded-[12px] border border-line bg-raised px-4 py-3 text-[15px]">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-unit" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow>Para quién</Eyebrow>
            <div className="mt-8 flex flex-col">
              {s.forWho.map((f) => (
                <div key={f.title} className="grid gap-2 border-t border-line py-6 md:grid-cols-[0.9fr_1.1fr] md:gap-6">
                  <h3 className="font-display text-[22px] font-semibold tracking-tight">{f.title}</h3>
                  <p className="text-[15px] leading-relaxed text-mute">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section className="py-20 md:py-28">
        <SectionHead eyebrow="Cómo funciona" title="Paso a paso." intro="Sabes qué se hará, cuánto costará y cuándo, antes de que empecemos." />
        <div className="mt-12"><ProcessSteps steps={s.process} /></div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[16px] border border-line bg-raised p-7">
            <p className="eyebrow text-mute">Para orientarte desde el primer mensaje, comparte</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {s.share.map((x) => (
                <li key={x} className="flex items-start gap-2.5 text-[14.5px]"><CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-unit" aria-hidden="true" />{x}</li>
              ))}
            </ul>
          </div>
          <div className="flex gap-5 rounded-[16px] bg-night p-7 text-on-night">
            <ShieldCheck className="h-8 w-8 shrink-0 text-unit-night" aria-hidden="true" />
            <div>
              <p className="eyebrow text-on-night-mute">Respaldo</p>
              <h3 className="mt-2 font-display text-[22px] font-semibold tracking-tight">{s.backing.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-on-night-mute">{s.backing.desc}</p>
            </div>
          </div>
        </div>
      </Section>

      <DigitalLogbook unit={s.unit} />

      {/* FAQ */}
      <Section className="border-t border-line py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Preguntas frecuentes</Eyebrow>
            <h2 className="display-md mt-4">Antes de empezar.</h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7"><FaqBlock items={faqOf(s)} /></div>
        </div>
      </Section>

      {/* Guides from Recursos for this service (or its unit) */}
      {(() => {
        const guides = ARTICLES.filter((a) => a.service === s.id);
        const list = (guides.length ? guides : ARTICLES.filter((a) => a.unit === s.unit)).slice(0, 3);
        if (!list.length) return null;
        return (
          <Section className="pb-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow>Guías relacionadas</Eyebrow>
                <h2 className="display-sm mt-3">Antes de decidir, lee esto.</h2>
              </div>
              <TextLink to="recursos">Todos los recursos</TextLink>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {list.map((a) => (
                <Link key={a.id} to={a.id} className="group flex flex-col rounded-[16px] border border-line bg-raised p-5 transition hover:border-unit/50">
                  <span className="eyebrow text-mute">{a.minutes} min de lectura</span>
                  <span className="mt-3 font-display text-[18px] font-semibold leading-snug tracking-tight">{a.title}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[14px] font-medium text-unit">Leer <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
                </Link>
              ))}
            </div>
          </Section>
        );
      })()}

      {/* Related across units */}
      <Section className="pb-8">
        <Eyebrow>También puede interesarte</Eyebrow>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {s.related.map((id) => {
            const r = serviceById(id)!;
            const ru = unitById(r.unit);
            return (
              <Link key={id} to={id} data-unit={r.unit} className="group flex items-center gap-4 rounded-[16px] border border-line bg-raised p-5 transition hover:border-unit/50">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-unit-soft text-unit"><r.icon className="h-5 w-5" aria-hidden="true" /></span>
                <span className="min-w-0">
                  <span className="eyebrow block text-unit">{ru.full}</span>
                  <span className="block truncate text-[16px] font-medium">{r.name}</span>
                </span>
                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-mute transition group-hover:text-unit" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
        <div className="mt-8"><TextLink to={s.unit}>Ver todo {unit.full}</TextLink></div>
      </Section>

      <CtaBand title={<>Cuéntanos qué <span className="text-unit-night">necesitas resolver.</span></>} text="Comparte tu zona, el servicio y cuándo te gustaría recibir atención. Continuamos por WhatsApp." unit={s.unit} service={s.contactService} waText={wa} />
    </div>
  );
}

export function ContactPage() {
  return (
    <>
      <Section className="pb-10 pt-14 md:pt-20">
        <Eyebrow>Un solo equipo para orientarte</Eyebrow>
        <h1 className="display-lg mt-6 max-w-[16ch]">Todo empieza con <span className="aurora-text">una conversación.</span></h1>
        <p className="mt-6 max-w-[54ch] text-[17px] leading-relaxed text-mute">Cuéntanos qué necesitas. Preparamos tu mensaje para que continúes por WhatsApp con la especialidad adecuada. Tú decides cuándo enviarlo.</p>
      </Section>
      <Section className="pb-24">
        <ContactWizard />
      </Section>
    </>
  );
}

export function NotFound() {
  return (
    <Section className="py-32">
      <Eyebrow>Página no encontrada</Eyebrow>
      <h1 className="display-lg mt-6">Esta página no existe.</h1>
      <div className="mt-8"><BtnLink to="grupo">Volver al inicio</BtnLink></div>
    </Section>
  );
}
