"use client";

import { useState } from "react";
import { Boxes, Cog, Info, ShieldAlert, Target, type LucideIcon } from "lucide-react";
import { SectionHead } from "@/components/sections/primitives";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { Anatomy } from "@/content/types";

/** Anatomía de un servicio: cada solución con qué es, cómo funciona, componentes, cuándo conviene y límites.
 *  Todos los paneles se renderizan (solo uno visible) para que el contenido completo quede en el HTML. */
export function ServiceAnatomy({ a, serviceId }: { a: Anatomy; serviceId: string }) {
  const [id, setId] = useState(a.items[0].id);

  return (
    <section className="gutter bg-night py-20 text-on-night md:py-28">
      <div className="wrap">
        <SectionHead night eyebrow={a.eyebrow} title={a.title} intro={a.intro} />

        <div className="mt-12 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div role="tablist" aria-label={a.eyebrow} className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
            {a.items.map((x) => {
              const on = x.id === id;
              return (
                <button
                  key={x.id}
                  id={`tab-${x.id}`}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls={`panel-${x.id}`}
                  onClick={() => { setId(x.id); track("select_content", { content_type: "service_anatomy", content_id: `${serviceId}_${x.id}` }); }}
                  className={cn("flex shrink-0 items-center gap-3 rounded-[12px] border p-3 text-left transition lg:p-4", on ? "border-unit-night/60 bg-night-raised text-on-night" : "border-night-line text-on-night-mute hover:bg-night-raised/60 hover:text-on-night")}
                >
                  <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-[10px] lg:h-10 lg:w-10 lg:rounded-[12px]", on ? "bg-unit-night text-night" : "bg-night-raised text-unit-night")}>
                    <x.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <span className="whitespace-nowrap font-display text-[15px] font-semibold tracking-tight lg:whitespace-normal lg:text-[17px]">{x.label}</span>
                </button>
              );
            })}
          </div>

          {a.items.map((x) => {
            const rows: { icon: LucideIcon; label: string; body: React.ReactNode; tone?: "warn" | "human" }[] = [
              { icon: Info, label: "Qué es", body: x.what },
              { icon: Cog, label: "Cómo funciona", body: x.how },
              {
                icon: Boxes,
                label: "Componentes y tecnología",
                body: (
                  <span className="mt-1 flex flex-wrap gap-1.5">
                    {x.parts.map((p) => (
                      <span key={p} className="rounded-full border border-unit-night/40 bg-unit-night/10 px-2.5 py-0.5 text-[12.5px] text-on-night">{p}</span>
                    ))}
                  </span>
                ),
              },
              { icon: Target, label: "Conviene cuando", body: x.idealFor, tone: "human" },
              { icon: ShieldAlert, label: "Qué considerar", body: x.consider, tone: "warn" },
            ];
            return (
              <div key={x.id} id={`panel-${x.id}`} role="tabpanel" aria-labelledby={`tab-${x.id}`} hidden={x.id !== id} className="min-w-0 rounded-[16px] border border-night-line bg-night-raised p-5 md:p-6">
                <h3 className="font-display text-[20px] font-semibold tracking-tight">{x.label}</h3>
                <ol className="relative mt-3 flex flex-col">
                  <span aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-unit-night/70 via-night-line to-warn/50" />
                  {rows.map((r) => (
                    <li key={r.label} className="relative grid grid-cols-[40px_1fr] gap-3 py-2.5">
                      <span className={cn("relative z-10 grid h-10 w-10 place-items-center rounded-full border", r.tone === "warn" ? "border-warn/50 bg-night text-warn" : r.tone === "human" ? "border-mint/50 bg-night text-mint" : "border-unit-night/50 bg-night text-unit-night")}>
                        <r.icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <p className="eyebrow text-on-night-mute">{r.label}</p>
                        <div className="mt-1 text-[14.5px] leading-relaxed text-on-night">{r.body}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>

        {a.layers && (
          <div className="mt-16">
            <h3 className="font-display text-[22px] font-semibold tracking-tight">{a.layersTitle ?? "Tecnología que elegimos según tu caso."}</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {a.layers.map((l) => (
                <div key={l.title} className="rounded-[16px] border border-night-line bg-night-raised p-5">
                  <p className="eyebrow text-unit-night">{l.title}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {l.items.map((t) => <li key={t} className="rounded-full border border-night-line px-2.5 py-1 text-[13px] text-on-night">{t}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {a.method && (
          <div className="mt-16">
            <div className="grid gap-4 md:grid-cols-12 md:items-end">
              <h3 className="font-display text-[22px] font-semibold tracking-tight md:col-span-6">{a.method.title}</h3>
              <p className="text-[15px] leading-relaxed text-on-night-mute md:col-span-6">{a.method.intro}</p>
            </div>
            <ol className="mt-6 grid gap-px overflow-hidden rounded-[16px] border border-night-line bg-night-line sm:grid-cols-2 lg:grid-cols-4">
              {a.method.steps.map((st, i) => (
                <li key={st.title} className="bg-night-raised p-5">
                  <span className="font-mono text-[12px] text-unit-night">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-2 font-display text-[17px] font-semibold tracking-tight">{st.title}</p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-on-night-mute">{st.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
