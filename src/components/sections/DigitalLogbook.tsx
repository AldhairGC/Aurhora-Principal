import { MessageCircle } from "lucide-react";
import { Section, SectionHead } from "@/components/sections/primitives";
import { LOGBOOK } from "@/content/logbook";
import type { UnitId } from "@/content/types";

/** Bitácora digital que entregamos al terminar: fotos, detalle, notas técnicas y hallazgos. */
export function DigitalLogbook({ unit, className }: { unit: UnitId; className?: string }) {
  const l = LOGBOOK[unit];
  return (
    <Section className={className ?? "border-t border-line bg-sunken py-20 md:py-28"}>
      <SectionHead eyebrow={l.eyebrow} title={l.title} intro={l.intro} />
      <ul className="mt-12 grid gap-px overflow-hidden rounded-[16px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {l.items.map((i) => (
          <li key={i.title} className="flex gap-4 bg-raised p-6">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-unit-soft text-unit">
              <i.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-[17px] font-semibold leading-snug">{i.title}</h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-mute">{i.desc}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 flex items-start gap-2.5 text-[14.5px] text-mute">
        <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-unit" aria-hidden="true" />
        {l.note}
      </p>
    </Section>
  );
}
