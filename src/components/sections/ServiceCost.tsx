"use client";

import { CircleAlert, Clock, MinusCircle } from "lucide-react";
import { Eyebrow, Section } from "@/components/sections/primitives";
import { PRICE_NOTE } from "@/content/extras";
import type { ServiceExtras } from "@/content/types";

/** "Cuánto cuesta, cuánto tarda y qué no incluye" for a service page. */
export function ServiceCost({ x, name }: { x: ServiceExtras; name: string }) {
  return (
    <Section className="border-t border-line py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7">
          <Eyebrow>Precios · {name}</Eyebrow>
          <h2 className="display-md mt-4">¿Cuánto cuesta?</h2>
          <p className="mt-5 max-w-[60ch] text-[16px] leading-relaxed text-mute">{x.costIntro}</p>

          {/* Below sm, each row stacks (concept over range) instead of scrolling sideways. */}
          <div className="mt-8 overflow-hidden rounded-[16px] border border-line bg-raised">
            <table className="w-full text-left text-[14.5px]">
              <caption className="sr-only">Precios desde para {name}</caption>
              <thead className="hidden sm:table-header-group">
                <tr className="border-b border-line text-mute">
                  <th scope="col" className="p-4 font-medium">Concepto</th>
                  <th scope="col" className="p-4 font-medium">Precio (IVA incluido)</th>
                </tr>
              </thead>
              <tbody>
                {x.prices.map((r) => (
                  <tr key={r.concept} className="block border-b border-line last:border-0 sm:table-row">
                    <th scope="row" className="block px-4 pb-1 pt-4 font-normal sm:table-cell sm:p-4">{r.concept}</th>
                    <td className="block px-4 pb-4 sm:table-cell sm:p-4">
                      <span className="font-mono font-medium tabular">{r.range}</span>
                      {r.unit && <span className="ml-1.5 text-[13px] text-mute">{r.unit}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 flex items-start gap-2 text-[13px] leading-snug text-mute">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-warn" aria-hidden="true" />
            {PRICE_NOTE}
          </p>

          <h3 className="mt-10 text-[19px] font-semibold">De qué depende el precio</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {x.factors.map((f) => (
              <li key={f} className="flex items-start gap-2 text-[15px] text-ink-soft">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-unit" />
                {f}
              </li>
            ))}
          </ul>

          {x.context && (
            <>
              <h3 className="mt-10 text-[19px] font-semibold">Antes de contratar</h3>
              <div className="mt-3 flex max-w-[64ch] flex-col gap-3 text-[15.5px] leading-relaxed text-ink-soft">
                {x.context.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
              </div>
            </>
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-6 lg:col-span-5">
          <div className="rounded-[16px] border border-line bg-raised p-6">
            <h2 className="flex items-center gap-2 font-display text-[20px] font-semibold tracking-tight">
              <Clock className="h-5 w-5 text-unit" aria-hidden="true" /> Cuánto tarda
            </h2>
            <dl className="mt-4 divide-y divide-line">
              {x.timing.map((t) => (
                <div key={t.label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 py-3 text-[14px]">
                  <dt className="text-mute">{t.label}</dt>
                  <dd className="font-medium">{t.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-[16px] border border-line bg-raised p-6">
            <h2 className="flex items-center gap-2 font-display text-[20px] font-semibold tracking-tight">
              <MinusCircle className="h-5 w-5 text-unit" aria-hidden="true" /> Qué no incluye
            </h2>
            <p className="mt-2 text-[14px] text-mute">Se cotiza aparte o depende de tu caso.</p>
            <ul className="mt-4 flex flex-col gap-2">
              {x.excludes.map((e) => (
                <li key={e} className="flex items-start gap-2 text-[14.5px] text-ink-soft">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-line-strong" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
