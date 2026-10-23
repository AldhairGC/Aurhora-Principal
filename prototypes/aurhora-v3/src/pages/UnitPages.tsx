import { ArrowUpRight, Check, Minus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BtnLink, CtaBand, Eyebrow, FaqBlock, PlaceholderMedia, ProcessSteps, Section, SectionHead, TextLink } from "@/components/sections/primitives";
import { FlowDemo } from "@/components/interactive/FlowDemo";
import { StarterBuilder } from "@/components/interactive/Finders";
import { SpacePlanner } from "@/components/interactive/SpacePlanner";
import { HoursCard, SymptomChecker, ZoneChecker } from "@/components/interactive/Maintenance";
import { AgentBlueprint, AgentComparison } from "@/components/interactive/Agents";
import { AGENT_PROCESS } from "@/content/services";
import { Link, scrollToId } from "@/lib/router";
import { servicesOf, serviceById } from "@/content/services";
import { cn } from "@/lib/utils";
import type { UnitId } from "@/content/types";

function SubNav({ name, links }: { name: string; links: [string, string][] }) {
  return (
    <div className="gutter border-b border-line bg-bg">
      <div className="wrap flex h-12 items-center gap-6 overflow-x-auto text-[13px] [scrollbar-width:none]">
        <span className="flex shrink-0 items-center gap-2 font-medium">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-unit" /> {name}
        </span>
        <nav aria-label={`Secciones de ${name}`} className="ml-auto flex shrink-0 gap-5 text-mute">
          {links.map(([id, l]) => (
            <button key={id} type="button" onClick={() => scrollToId(id)} className="hover:text-ink">{l}</button>
          ))}
        </nav>
      </div>
    </div>
  );
}

function ServiceGrid({ unit, ids, cols = "lg:grid-cols-3" }: { unit: UnitId; ids?: string[]; cols?: string }) {
  const list = ids ? ids.map((id) => serviceById(id)!) : servicesOf(unit);
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", cols)}>
      {list.map((s) => (
        <Link key={s.id} to={s.id} className="group flex min-h-[240px] flex-col rounded-[16px] border border-line bg-raised p-6 transition hover:-translate-y-0.5 hover:border-unit/50">
          <div className="flex items-start justify-between">
            <span className="grid h-11 w-11 place-items-center rounded-[12px] bg-unit-soft text-unit"><s.icon className="h-5 w-5" aria-hidden="true" /></span>
            <ArrowUpRight className="h-5 w-5 text-mute transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-unit" aria-hidden="true" />
          </div>
          <h3 className="mt-8 font-display text-[22px] font-semibold tracking-tight">{s.name}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-mute">{s.tagline}</p>
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
            {s.includes.slice(0, 3).map((i) => (
              <li key={i.title} className="rounded-full bg-sunken px-2.5 py-1 text-[12px] text-ink-soft">{i.title}</li>
            ))}
          </ul>
        </Link>
      ))}
    </div>
  );
}

/* ═══════════════════════ DIGITAL ═══════════════════════ */

const STAGES = [
  { title: "Estás empezando", desc: "Necesitas que te encuentren y una forma ordenada de atender.", start: "godigital" },
  { title: "Ya operas y se te acumula", desc: "Tienes clientes y procesos, pero mucho trabajo manual.", start: "agentes-ia" },
  { title: "Quieres escalar", desc: "Necesitas sistemas propios y una ruta clara de inversión.", start: "software" },
];

const GODIGITAL_TABS = [
  { id: "sitio", label: "Sitio y presencia", title: "De que te encuentren a que te elijan.", points: ["Sitio claro y rápido, fácil de actualizar", "Perfil de negocio en buscadores y mapas", "Botón de WhatsApp y llamadas medidos"] },
  { id: "contacto", label: "Contacto y seguimiento", title: "Todas las solicitudes en un solo lugar.", points: ["Formularios y WhatsApp en un solo lugar", "Etapas: nueva, en conversación, cliente", "Recordatorios para dar seguimiento"] },
  { id: "agenda", label: "Agenda", title: "Citas sin ir y venir de mensajes.", points: ["Disponibilidad visible para tus clientes", "Confirmaciones y recordatorios automáticos", "Según el alcance que definamos contigo"] },
];

const DIGITAL_FAQ: [string, string][] = [
  ["¿Necesito llegar con una idea definida?", "No. Basta con saber qué quieres mejorar. La primera conversación sirve para entender tu caso y proponerte por dónde empezar."],
  ["¿Atienden fuera de CDMX?", "Sí. Los proyectos digitales se trabajan en línea con clientes de todo México."],
  ["¿Cómo se cotiza un proyecto?", "Después de entender tu caso te entregamos una propuesta por etapas, con alcance y entregables claros."],
  ["¿Puedo empezar con algo pequeño?", "Sí, y lo recomendamos. Una primera etapa acotada permite validar y crecer con menos riesgo."],
  ["¿Implementan agentes de IA para empresas?", "Sí. Diseñamos, construimos y ponemos en marcha agentes de IA y flujos agénticos para atención, ventas y operación, conectados a tus sistemas y con supervisión humana."],
  ["¿Qué necesito para empezar con IA?", "Un proceso concreto que quieras mejorar y acceso a la información que usa. En la primera conversación identificamos el caso de uso con más valor."],
];

export function DigitalPage() {
  return (
    <div data-unit="digital">
      <SubNav name="Aurhora Digital" links={[["d-soluciones", "Soluciones"], ["d-agentes", "Agentes de IA"], ["d-partida", "Por dónde empezar"], ["d-godigital", "GoDigital"], ["d-metodo", "Método"]]} />
      <Section className="pb-16 pt-14 md:pb-24 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Eyebrow>Aurhora Digital</Eyebrow>
            <h1 className="mt-4 max-w-[34ch] text-[20px] font-semibold leading-snug md:text-[24px]">Agentes de IA, automatización y software para empresas en México</h1>
            <p className="display-lg mt-5 font-display">Tu siguiente paso no tiene que ser <span className="text-unit">complicado.</span></p>
            <p className="mt-6 max-w-[50ch] text-[17px] leading-relaxed text-mute">Agentes de inteligencia artificial, automatización y software para que tu negocio funcione mejor. Entendemos tu operación y construimos a partir de lo que necesitas.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BtnLink to="contacto" variant="unit" prefill={{ unit: "digital" }}>Hablemos de tu proyecto</BtnLink>
              <TextLink to="digital" section="d-agentes">Conoce nuestros agentes de IA</TextLink>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-line pt-6 text-[13px]">
              {[["Para quienes", "atienden"], ["Para quienes", "venden"], ["Para quienes", "coordinan equipos"]].map(([a, b]) => (
                <div key={b}><dt className="text-mute">{a}</dt><dd className="font-display text-[16px] font-semibold tracking-tight">{b}</dd></div>
              ))}
            </dl>
          </div>
          <div className="min-w-0 lg:col-span-6">
            <FlowDemo />
            <p className="mt-3 text-[12.5px] text-mute">Ejemplo ilustrativo de una automatización de atención.</p>
          </div>
        </div>
      </Section>

      <Section id="d-soluciones" className="border-t border-line py-20 md:py-28">
        <SectionHead eyebrow="Soluciones" title="Empezamos por tu negocio." intro="No necesitas llegar con una solución definida. Basta con saber qué quieres mejorar." />
        <div className="mt-12"><ServiceGrid unit="digital" cols="lg:grid-cols-3" /></div>
      </Section>

      <section id="d-agentes" className="gutter scroll-mt-24 bg-night py-20 text-on-night md:py-28">
        <div className="wrap">
          <SectionHead
            night
            eyebrow="IA agéntica · implementación"
            title={<>Agentes de IA que <span className="text-unit-night">trabajan con tu equipo.</span></>}
            intro="Diseñamos e implementamos agentes de inteligencia artificial y flujos agénticos que atienden, preparan información y ejecutan tareas en tus sistemas. Con límites claros, registro de cada acción y una persona a cargo de lo importante."
          />
          <div className="mt-12"><AgentBlueprint /></div>

          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow className="text-on-night-mute">Comparativa</Eyebrow>
              <h3 className="display-sm mt-4">Chatbot, automatización o agente: cuándo usar cada uno.</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-on-night-mute">Muchas veces la mejor solución combina los tres. Te ayudamos a elegir con base en tu proceso.</p>
            </div>
            <div className="min-w-0 lg:col-span-8"><AgentComparison night /></div>
          </div>

          <div className="mt-16">
            <Eyebrow className="text-on-night-mute">Cómo implementamos un agente</Eyebrow>
            <div className="mt-6"><ProcessSteps night steps={AGENT_PROCESS} /></div>
          </div>

          <div className="mt-12 flex flex-col gap-6 rounded-[16px] border border-night-line p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow text-on-night-mute">Tecnología con la que trabajamos</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {serviceById("agentes-ia")!.stack!.map((t) => (
                  <li key={t} className="rounded-full border border-night-line px-3 py-1 text-[13px] text-on-night">{t}</li>
                ))}
              </ul>
            </div>
            <BtnLink to="agentes-ia" variant="night" className="shrink-0">Ver agentes de IA</BtnLink>
          </div>
        </div>
      </section>

      <Section id="d-partida" className="bg-unit-soft py-20 md:py-28">
        <SectionHead eyebrow="Arma tu punto de partida" title="¿Qué te está costando más tiempo?" intro="Marca lo que hoy te pasa. Te mostramos una combinación posible para empezar; después la ajustamos contigo." />
        <StarterBuilder className="mt-12" />
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {STAGES.map((s) => {
            const svc = serviceById(s.start)!;
            return (
              <div key={s.title} className="flex flex-col rounded-[16px] border border-line bg-raised p-6">
                <h3 className="font-display text-[20px] font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-mute">{s.desc}</p>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 mt-6">
                  <span className="text-[13px] text-mute">Suele empezar con</span>
                  <TextLink to={svc.id} className="text-[14px]">{svc.name}</TextLink>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section id="d-godigital" className="py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>GoDigital Suite</Eyebrow>
            <h2 className="display-md mt-4">Tu negocio merece un buen comienzo <span className="text-unit">digital.</span></h2>
            <p className="mt-5 max-w-[44ch] text-[16px] leading-relaxed text-mute">Para profesionales y pequeños negocios que necesitan presencia en línea y herramientas para organizar su atención. Definimos contigo los módulos que necesita tu operación.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnLink to="contacto" variant="unit" prefill={{ unit: "digital", service: "GoDigital Suite" }}>Quiero conocer GoDigital</BtnLink>
              <TextLink to="godigital">Ver detalle</TextLink>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <Tabs defaultValue="sitio" className="rounded-[16px] border border-line bg-raised p-2">
              <TabsList className="grid h-auto w-full grid-cols-3 gap-1 rounded-[16px] bg-sunken p-1">
                {GODIGITAL_TABS.map((t) => (
                  <TabsTrigger key={t.id} value={t.id} className="rounded-[12px] px-2 py-2.5 text-[13px] data-[state=active]:bg-raised data-[state=active]:text-unit">{t.label}</TabsTrigger>
                ))}
              </TabsList>
              {GODIGITAL_TABS.map((t, ti) => (
                <TabsContent key={t.id} value={t.id} forceMount className="m-0 p-5 data-[state=inactive]:hidden md:p-7">
                  <div className="grid gap-6 md:grid-cols-2 md:items-center">
                    <div>
                      <p className="eyebrow text-unit">Módulo {ti + 1} de 3</p>
                      <h3 className="mt-3 font-display text-[24px] font-semibold leading-tight tracking-tight">{t.title}</h3>
                      <ul className="mt-5 flex flex-col gap-2.5">
                        {t.points.map((p) => (
                          <li key={p} className="flex items-start gap-2.5 text-[14.5px]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-unit" aria-hidden="true" />{p}</li>
                        ))}
                      </ul>
                    </div>
                    <GoDigitalMock kind={t.id} />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </Section>

      <Section id="d-metodo" className="border-t border-line py-20 md:py-28">
        <SectionHead eyebrow="De la idea a la operación" title="Así avanza un proyecto." intro="Cada etapa termina con un entregable que puedes revisar, así sabes qué se está haciendo y qué sigue." />
        <div className="mt-12"><ProcessSteps steps={serviceById("software")!.process} /></div>
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Preguntas frecuentes</Eyebrow>
            <h2 className="display-sm mt-4">Antes de la primera llamada.</h2>
            <PlaceholderMedia className="mt-8" ratio="aspect-[16/10]" label="Espacio para caso real" note="Reservado para un proyecto digital autorizado, con alcance y resultados verificables." />
          </div>
          <div className="lg:col-span-6 lg:col-start-7"><FaqBlock items={DIGITAL_FAQ} /></div>
        </div>
      </Section>

      <CtaBand title={<>¿Qué te gustaría hacer <span className="text-unit-night">más sencillo?</span></>} text="Cuéntanos cómo funciona tu negocio y dónde encuentras fricción. Empezamos por ahí." unit="digital" waText="Hola, Aurhora Digital. Me gustaría platicar sobre un proyecto." />
    </div>
  );
}

function GoDigitalMock({ kind }: { kind: string }) {
  if (kind === "sitio")
    return (
      <div aria-hidden="true" className="overflow-hidden rounded-[12px] border border-line bg-bg">
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2"><span className="h-2 w-2 rounded-full bg-line" /><span className="h-2 w-2 rounded-full bg-line" /><span className="ml-2 h-3 flex-1 rounded-full bg-sunken" /></div>
        <div className="p-4">
          <div className="h-3 w-1/3 rounded-full bg-unit/30" />
          <div className="mt-3 h-6 w-4/5 rounded-[8px] bg-ink/80" />
          <div className="mt-2 h-6 w-3/5 rounded-[8px] bg-ink/80" />
          <div className="mt-4 h-2.5 w-full rounded-full bg-sunken" /><div className="mt-1.5 h-2.5 w-5/6 rounded-full bg-sunken" />
          <div className="mt-4 flex gap-2"><div className="h-8 w-28 rounded-[8px] bg-unit" /><div className="h-8 w-24 rounded-[8px] border border-line" /></div>
        </div>
      </div>
    );
  if (kind === "contacto")
    return (
      <div aria-hidden="true" className="grid grid-cols-3 gap-2 rounded-[12px] border border-line bg-bg p-3 text-[11px]">
        {[["Nuevas", 3], ["En conversación", 2], ["Clientes", 2]].map(([c, n]) => (
          <div key={c as string} className="rounded-[8px] bg-sunken p-2">
            <p className="eyebrow text-[9px] text-mute">{c}</p>
            {Array.from({ length: n as number }, (_, i) => <div key={i} className="mt-2 rounded-[8px] border border-line bg-raised p-1.5"><div className="h-1.5 w-3/4 rounded-full bg-ink/60" /><div className="mt-1 h-1.5 w-1/2 rounded-full bg-unit/40" /></div>)}
          </div>
        ))}
      </div>
    );
  return (
    <div aria-hidden="true" className="rounded-[12px] border border-line bg-bg p-3">
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-mute">
        {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => <span key={i}>{d}</span>)}
        {Array.from({ length: 21 }, (_, i) => (
          <span key={i} className={cn("grid aspect-square place-items-center rounded-[8px] text-[10px]", i % 7 === 6 ? "text-line-strong" : i === 9 ? "bg-unit text-unit-on" : [3, 11, 16].includes(i) ? "bg-unit-soft text-unit" : "bg-sunken")}>{i + 1}</span>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-[8px] bg-unit-soft px-3 py-2 text-[11px]"><span className="font-medium text-unit">Cita confirmada · 10:30</span><Check className="h-3.5 w-3.5 text-unit" /></div>
    </div>
  );
}

/* ═══════════════════════ INTEGRA ═══════════════════════ */

const COMPARE: { row: string; casa: string | boolean; negocio: string | boolean }[] = [
  { row: "Cámaras con consulta desde el teléfono", casa: true, negocio: true },
  { row: "Control de acceso", casa: "Chapa inteligente o videoportero", negocio: "Por persona y horario" },
  { row: "Alarmas y sensores", casa: true, negocio: true },
  { row: "WiFi en todo el espacio", casa: true, negocio: "Red separada para clientes" },
  { row: "Red dedicada para terminal y caja", casa: false, negocio: true },
  { row: "Audio por zonas", casa: "Sala y terraza", negocio: "Ambiente para clientes" },
  { row: "Domótica: luces, clima y persianas", casa: "Escenas, horarios y control por voz", negocio: "Apertura y cierre automáticos" },
  { row: "Telefonía y extensiones", casa: false, negocio: true },
];

const INTEGRA_FAQ: [string, string][] = [
  ["¿Hacen la visita antes de cotizar?", "Sí. El levantamiento puede ser en sitio o, para instalaciones sencillas, con fotos y planos que nos compartas."],
  ["¿Puedo controlar todo desde una sola aplicación?", "Buscamos equipos compatibles entre sí y te indicamos en la propuesta qué se controla desde dónde."],
  ["¿Qué cubre la garantía adicional?", "Aplica a productos seleccionados que vendemos. En tu propuesta te indicamos los equipos cubiertos y sus condiciones."],
  ["¿Quién da mantenimiento después?", "Lo coordinamos con Aurhora Facilities para que tengas un solo contacto."],
];

export function IntegraPage() {
  return (
    <div data-unit="integra">
      <section className="gutter relative overflow-hidden bg-night pb-16 pt-14 text-on-night md:pb-24 md:pt-20">
        <div aria-hidden="true" className="night-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(90%_80%_at_70%_30%,black,transparent)]" />
        <div className="wrap relative grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5 lg:pt-6">
            <Eyebrow className="text-on-night-mute">Aurhora Integra</Eyebrow>
            <h1 className="mt-4 max-w-[34ch] text-[20px] font-semibold leading-snug md:text-[24px]">Cámaras de seguridad, redes y domótica en CDMX</h1>
            <p className="display-lg mt-5 font-display">Un espacio más conectado. <span className="text-unit-night">Más tuyo.</span></p>
            <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-on-night-mute">Cámaras, redes, accesos y tecnología que trabajan en conjunto. Diseñamos la solución, instalamos y te enseñamos a usarla.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BtnLink to="contacto" variant="night" prefill={{ unit: "integra" }}>Cuéntanos tu proyecto</BtnLink>
              <button type="button" onClick={() => scrollToId("i-soluciones")} className="text-[15px] font-medium text-on-night underline decoration-on-night/30 underline-offset-4 hover:decoration-on-night">Ver soluciones</button>
            </div>
            <ul className="mt-12 flex flex-col gap-3 border-t border-night-line pt-6 text-[14px] text-on-night-mute">
              {["Residencias y negocios en CDMX y zonas del Estado de México", "Propuesta por escrito antes de instalar", "+1 año de garantía adicional en productos elegibles"].map((t) => (
                <li key={t} className="flex items-start gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-unit-night" aria-hidden="true" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <SpacePlanner />
          </div>
        </div>
      </section>

      <Section id="i-soluciones" className="py-20 md:py-28">
        <SectionHead eyebrow="Una solución bien integrada" title="Lo que tu espacio necesita." intro="Desde una instalación puntual hasta varias especialidades coordinadas. Definimos el sistema de acuerdo con tu espacio y tu uso." />
        <div className="mt-12"><ServiceGrid unit="integra" cols="lg:grid-cols-4" /></div>
      </Section>

      <Section className="bg-unit-soft py-20 md:py-28">
        <SectionHead eyebrow="Comparativa" title="Residencia o negocio." intro="Las mismas especialidades, pensadas para cómo usas tu espacio. Esta tabla muestra combinaciones habituales; tu propuesta se define después del levantamiento." />
        <div className="mt-12 overflow-x-auto rounded-[16px] border border-line bg-raised">
          <table className="w-full min-w-[560px] text-left text-[14.5px]">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="p-4 font-medium text-mute md:p-5">Solución</th>
                <th scope="col" className="p-4 font-display text-[17px] font-semibold tracking-tight md:p-5">Residencia</th>
                <th scope="col" className="p-4 font-display text-[17px] font-semibold tracking-tight md:p-5">Negocio</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((r) => (
                <tr key={r.row} className="border-b border-line last:border-0">
                  <th scope="row" className="p-4 font-normal md:p-5">{r.row}</th>
                  {[r.casa, r.negocio].map((c, i) => (
                    <td key={i} className="p-4 md:p-5">
                      {c === true ? <Check className="h-4 w-4 text-unit" aria-label="Incluido" /> : c === false ? <Minus className="h-4 w-4 text-line-strong" aria-label="No aplica habitualmente" /> : <span className="text-ink-soft">{c}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section className="py-20 md:py-28">
        <SectionHead eyebrow="Cómo trabajamos" title="Del levantamiento a la entrega." intro="Sabes qué se instalará, dónde y con qué garantía antes de empezar." />
        <div className="mt-12"><ProcessSteps steps={serviceById("redes")!.process} /></div>
      </Section>

      <Section className="pb-20 md:pb-28">
        <div className="grid overflow-hidden rounded-[24px] border border-line bg-raised lg:grid-cols-12">
          <div className="p-7 md:p-10 lg:col-span-7">
            <Eyebrow>Garantía</Eyebrow>
            <h2 className="display-md mt-4">Respaldo después de instalar.</h2>
            <p className="mt-5 max-w-[50ch] text-[16px] leading-relaxed text-mute">En productos seleccionados que vendemos, ofrecemos un año adicional de garantía. Te indicamos los equipos cubiertos y las condiciones en tu propuesta.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3 rounded-[12px] bg-sunken p-4 text-[14px]">
              <span className="text-mute">¿Tu instalación necesita adecuaciones eléctricas o mantenimiento?</span>
              <TextLink to="facilities">Lo coordinamos con Aurhora Facilities</TextLink>
            </div>
          </div>
          <div className="relative flex flex-col justify-center overflow-hidden bg-night p-8 text-on-night lg:col-span-5">
            <div aria-hidden="true" className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgb(var(--unit-night)/0.35),transparent)]" />
            <p className="relative font-display text-[120px] font-semibold leading-none tracking-[-0.06em] text-unit-night md:text-[160px]">+1</p>
            <p className="relative mt-2 text-[16px] text-on-night-mute">año de garantía adicional en productos elegibles</p>
            <p className="eyebrow relative mt-6 text-on-night-mute">Condiciones por precisar en cada propuesta</p>
          </div>
        </div>
        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Preguntas frecuentes</Eyebrow>
            <h2 className="display-sm mt-4">Antes de instalar.</h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7"><FaqBlock items={INTEGRA_FAQ} /></div>
        </div>
      </Section>

      <CtaBand title={<>Hagamos que tu espacio <span className="text-unit-night">trabaje mejor para ti.</span></>} text="Atendemos residencias y negocios en CDMX y zonas del Estado de México. Cuéntanos qué quieres instalar o mejorar." unit="integra" waText="Hola, Aurhora Integra. Me gustaría cotizar una instalación." />
    </div>
  );
}

/* ═══════════════════════ MANTENIMIENTO ═══════════════════════ */

const MANT_FAQ: [string, string][] = [
  ["¿Pueden atenderme hoy?", "Cuéntanos qué necesitas y dónde estás. El equipo revisa la urgencia, los traslados y la disponibilidad antes de confirmar un horario."],
  ["¿Cuánto cuesta el servicio?", "Depende del equipo, el problema, los materiales y el alcance. Te informamos el costo del diagnóstico si hace falta y presentamos la cotización antes de ejecutar."],
  ["¿Qué garantía tiene el trabajo?", "Según el servicio, ofrecemos un periodo de 15 o 30 días. Antes de contratar te indicamos las condiciones para solicitar revisión o ajuste."],
  ["¿Atienden también negocios y oficinas?", "Sí. Atendemos viviendas, locales y oficinas. Para trabajos de mayor alcance primero evaluamos las necesidades y condiciones del espacio."],
  ["¿Trabajan en domingo?", "No hay operación ordinaria en domingo. Las urgencias se evalúan según disponibilidad."],
  ["¿Atienden naves, bodegas y proyectos industriales?", "Sí. Realizamos instalaciones, iluminación, climatización y mantenimiento programado para naves y bodegas. El alcance técnico se confirma en el levantamiento."],
  ["¿Ofrecen pólizas de mantenimiento?", "Sí. Armamos un plan por equipo e instalación con visitas programadas y bitácora de cada visita."],
];

export function FacilitiesPage() {
  return (
    <div data-unit="facilities">
      <SubNav name="Aurhora Facilities" links={[["m-servicios", "Servicios"], ["m-proyectos", "Proyectos y empresas"], ["m-proceso", "Cómo funciona"], ["m-cobertura", "Cobertura"], ["m-preguntas", "Preguntas"]]} />
      <Section className="pb-14 pt-12 md:pb-20 md:pt-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6 lg:pt-8">
            <Eyebrow>Aurhora Facilities</Eyebrow>
            <h1 className="mt-4 max-w-[34ch] text-[20px] font-semibold leading-snug md:text-[24px]">Mantenimiento e instalaciones para casas, comercios e industria en CDMX</h1>
            <p className="display-lg mt-5 font-display">Que todo funcione. Y tú sigas <span className="text-unit">con tu día.</span></p>
            <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-mute">Aire acondicionado, electricidad, instalaciones y proyectos para casas, negocios, naves y bodegas. Antes de empezar te decimos qué se hará y cuánto costará, y después damos seguimiento.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BtnLink to="contacto" variant="unit" prefill={{ unit: "facilities" }}>Solicitar un servicio</BtnLink>
              <TextLink to="facilities" section="m-cobertura">¿Llegamos a tu zona?</TextLink>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-6"><SymptomChecker /></div>
        </div>
      </Section>

      <div className="gutter bg-night text-on-night">
        <ul className="wrap grid gap-px py-1 text-[14px] md:grid-cols-3">
          {["Cotización antes de trabajar", "Diagnóstico descontable del trabajo aceptado", "Respaldo de 15 o 30 días según servicio"].map((t) => (
            <li key={t} className="flex items-center gap-3 py-4"><Check className="h-4 w-4 shrink-0 text-unit-night" aria-hidden="true" />{t}</li>
          ))}
        </ul>
      </div>

      <Section id="m-servicios" className="py-20 md:py-28">
        <SectionHead eyebrow="Lo que podemos resolver" title="Un equipo para tus pendientes." intro="Desde el mantenimiento preventivo hasta esa reparación que no puede esperar. Cada trabajo empieza por entender qué está pasando." />
        <div className="mt-12"><ServiceGrid unit="facilities" ids={["aire-acondicionado", "electricidad", "reparaciones"]} /></div>
        <div className="mt-6 flex flex-wrap items-center gap-2 text-[14px] text-mute">
          También evaluamos:
          {["Pintura", "Plomería", "Tablaroca", "Impermeabilización"].map((x) => (
            <Link key={x} to="contacto" prefill={{ unit: "facilities", service: x }} className="rounded-full border border-line px-3 py-1 text-ink-soft transition hover:border-unit hover:text-unit">{x}</Link>
          ))}
        </div>
      </Section>

      <Section id="m-proyectos" className="border-t border-line py-20 md:py-28">
        <SectionHead
          eyebrow="Proyectos y empresas"
          title={<>Del pendiente de casa <span className="text-unit">al proyecto industrial.</span></>}
          intro="Cuando el trabajo es más grande que una visita, lo planeamos como proyecto: levantamiento, propuesta por etapas, un responsable y entrega documentada."
        />
        <div className="mt-12 flex flex-col border-t border-line">
          {["proyectos-residenciales", "proyectos-industriales", "mantenimiento-programado"].map((id) => {
            const s = serviceById(id)!;
            return (
              <Link key={id} to={id} className="group grid gap-5 border-b border-line py-8 transition hover:bg-unit-soft/40 md:grid-cols-12 md:items-start md:px-4">
                <div className="flex items-center gap-4 md:col-span-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[12px] bg-unit-soft text-unit"><s.icon className="h-6 w-6" aria-hidden="true" /></span>
                  <h3 className="font-display text-[24px] font-semibold leading-tight tracking-tight">{s.name}</h3>
                </div>
                <p className="text-[15px] leading-relaxed text-mute md:col-span-4">{s.heroDesc}</p>
                <div className="md:col-span-4">
                  <ul className="flex flex-wrap gap-1.5">
                    {s.forWho.map((f) => <li key={f.title} className="rounded-full border border-line px-2.5 py-1 text-[12.5px] text-ink-soft">{f.title}</li>)}
                  </ul>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-unit">Ver alcance <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></span>
                </div>
              </Link>
            );
          })}
        </div>
        <div data-unit="integra" className="mt-8 flex flex-col gap-4 rounded-[16px] bg-unit-soft p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow text-unit">Con Aurhora Integra</p>
            <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed">¿Tu proyecto incluye domótica, automatización de luces y clima, cámaras o red? Lo coordinamos en un solo proyecto con Aurhora Integra.</p>
          </div>
          <TextLink to="domotica" className="shrink-0">Domótica y automatización</TextLink>
        </div>
      </Section>

      <Section className="bg-unit-soft py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { k: "Preventivo", t: "Antes de que falle.", d: "Revisión y limpieza programadas para que tus equipos e instalaciones duren más y fallen menos.", items: ["Limpieza de minisplits", "Revisión del tablero eléctrico", "Pólizas para negocios y naves"] },
            { k: "Correctivo", t: "Cuando algo ya no funciona.", d: "Identificamos la causa, cotizamos la reparación y la ejecutamos con tu aprobación.", items: ["Equipos que no enfrían o gotean", "Pastillas que se botan", "Reparaciones y reposiciones"] },
          ].map((b) => (
            <div key={b.k} className="flex flex-col rounded-[16px] border border-line bg-raised p-7">
              <p className="eyebrow text-unit">{b.k}</p>
              <h3 className="display-sm mt-3">{b.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-mute">{b.d}</p>
              <ul className="mt-6 flex flex-col gap-2 border-t border-line pt-5">
                {b.items.map((i) => <li key={i} className="flex items-center gap-2.5 text-[14.5px]"><Check className="h-4 w-4 text-unit" aria-hidden="true" />{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="m-proceso" className="py-20 md:py-28">
        <SectionHead eyebrow="Cómo funciona" title="De tu mensaje al trabajo terminado." intro="Un proceso sencillo para saber qué se hará, cuánto costará y cuándo podremos atenderte." />
        <div className="mt-12"><ProcessSteps steps={serviceById("electricidad")!.process} /></div>
        <p className="mt-4 text-[13px] text-mute">Cuando se requiere diagnóstico, confirmamos su costo previamente. Se descuenta del trabajo si aceptas la cotización.</p>

        <div className="mt-20 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Para cotizar más rápido</Eyebrow>
            <h2 className="display-sm mt-4">Qué fotos enviarnos.</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-mute">Con buenas fotos podemos orientarte desde el primer mensaje y llegar con lo necesario.</p>
          </div>
          <div className="min-w-0 lg:col-span-8">
            <Tabs defaultValue="aire-acondicionado">
              <TabsList className="h-auto flex-wrap justify-start gap-1 rounded-[12px] bg-sunken p-1">
                {servicesOf("facilities").map((s) => (
                  <TabsTrigger key={s.id} value={s.id} className="rounded-[8px] px-3 py-2 text-[13.5px] data-[state=active]:bg-raised data-[state=active]:text-unit">{s.name}</TabsTrigger>
                ))}
              </TabsList>
              {servicesOf("facilities").map((s) => (
                <TabsContent key={s.id} value={s.id} forceMount className="mt-4 data-[state=inactive]:hidden">
                  <ol className="grid gap-3 sm:grid-cols-2">
                    {s.share.map((x, i) => (
                      <li key={x} className="flex items-start gap-3 rounded-[12px] border border-line bg-raised p-4">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] bg-unit-soft font-mono text-[12px] text-unit">{i + 1}</span>
                        <span className="pt-1 text-[14.5px]">{x}</span>
                      </li>
                    ))}
                  </ol>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </Section>

      <Section id="m-cobertura" className="border-t border-line bg-sunken py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Cobertura</Eyebrow>
            <h2 className="display-md mt-4">Ciudad de México y <span className="text-unit">Estado de México.</span></h2>
            <p className="mt-5 max-w-[44ch] text-[16px] leading-relaxed text-mute">Atendemos en Ciudad de México y zonas del Estado de México. Confirmamos cobertura y traslado antes de la visita.</p>
          </div>
          <div className="grid min-w-0 gap-4 md:grid-cols-2 lg:col-span-7">
            <ZoneChecker />
            <HoursCard />
          </div>
        </div>
      </Section>

      <Section id="m-preguntas" className="py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Antes de escribirnos</Eyebrow>
            <h2 className="display-md mt-4">Lo que conviene saber.</h2>
            <PlaceholderMedia className="mt-8" ratio="aspect-[16/10]" label="Espacio para foto propia" note="Fotografía de un trabajo real del equipo, pendiente de selección y autorización." />
          </div>
          <div className="lg:col-span-6 lg:col-start-7"><FaqBlock items={MANT_FAQ} /></div>
        </div>
      </Section>

      <CtaBand title={<>Ese pendiente puede <span className="text-unit-night">dejar de ser pendiente.</span></>} text="Dinos qué necesitas y en qué zona estás. Revisamos tu caso y te explicamos el siguiente paso." unit="facilities" waText="Hola, Aurhora Facilities. Me gustaría solicitar un servicio." />
    </div>
  );
}
