import type { ReactNode } from "react";
import { ArrowUpRight, ArrowRight, ChevronDown } from "lucide-react";
import { Link, type Prefill } from "@/lib/router";
import { whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { Item } from "@/content/types";

export function Section({ id, className, inner, children, ...rest }: { id?: string; className?: string; inner?: string; children: ReactNode } & React.HTMLAttributes<HTMLElement>) {
  return (
    <section id={id} className={cn("gutter scroll-mt-24", className)} {...rest}>
      <div className={cn("wrap", inner)}>{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className, dot = true }: { children: ReactNode; className?: string; dot?: boolean }) {
  return (
    <p className={cn("eyebrow flex items-center gap-2 text-mute", className)}>
      {dot && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-unit" />}
      {children}
    </p>
  );
}

export function SectionHead({ eyebrow, title, intro, aside, className, night }: { eyebrow: string; title: ReactNode; intro?: ReactNode; aside?: ReactNode; className?: string; night?: boolean }) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-12 md:items-end", className)}>
      <div className="md:col-span-7">
        <Eyebrow className={night ? "text-on-night-mute" : undefined}>{eyebrow}</Eyebrow>
        <h2 className={cn("display-md mt-4", night && "text-on-night")}>{title}</h2>
      </div>
      {(intro || aside) && (
        <div className={cn("md:col-span-5 md:pb-1", night ? "text-on-night-mute" : "text-mute")}>
          {intro && <p className="max-w-[46ch] text-[17px] leading-relaxed">{intro}</p>}
          {aside}
        </div>
      )}
    </div>
  );
}

type BtnVariant = "ink" | "unit" | "outline" | "night" | "ghost";
const BTN: Record<BtnVariant, string> = {
  ink: "bg-ink text-bg hover:bg-ink-soft",
  unit: "bg-unit text-unit-on hover:brightness-110",
  outline: "border border-line-strong/50 text-ink hover:border-ink hover:bg-raised",
  night: "bg-on-night text-night hover:bg-white",
  ghost: "text-ink underline-offset-4 hover:underline px-0",
};
const btnBase = "group inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[12px] px-5 text-[15px] font-medium transition-[background,filter,border-color,transform] duration-200 active:translate-y-px";

export function BtnLink({ to, prefill, section, variant = "ink", children, className }: { to: string; prefill?: Prefill; section?: string; variant?: BtnVariant; children: ReactNode; className?: string }) {
  return (
    <Link to={to} prefill={prefill} section={section} className={cn(btnBase, BTN[variant], className)}>
      {children}
      <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

export function WhatsAppBtn({ text, variant = "unit", children, className, source = "cta" }: { text?: string; variant?: BtnVariant; children: ReactNode; className?: string; source?: string }) {
  return (
    <a href={whatsappUrl(text)} onClick={() => track("whatsapp_click", { source })} target="_blank" rel="noopener noreferrer" className={cn(btnBase, BTN[variant], className)}>
      {children}
      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}

export function TextLink({ to, prefill, section, children, className }: { to: string; prefill?: Prefill; section?: string; children: ReactNode; className?: string }) {
  return (
    <Link to={to} prefill={prefill} section={section} className={cn("group inline-flex items-center gap-1.5 text-[15px] font-medium text-unit", className)}>
      <span className="underline decoration-current/30 underline-offset-4 transition group-hover:decoration-current">{children}</span>
      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export function FaqBlock({ items, className }: { items: [string, string][]; className?: string }) {
  return (
    // Native <details>: answers stay in the server HTML even while collapsed (indexable).
    <div className={cn("border-t border-line", className)}>
      {items.map(([q, a]) => (
        <details key={q} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-display text-[17px] font-medium tracking-tight [&::-webkit-details-marker]:hidden">
            {q}
            <ChevronDown className="h-4 w-4 shrink-0 text-mute transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="max-w-[62ch] pb-6 text-[15px] leading-relaxed text-mute">{a}</p>
        </details>
      ))}
    </div>
  );
}

/** A real sequence, so it is numbered. */
export function ProcessSteps({ steps, night }: { steps: Item[]; night?: boolean }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-[16px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" style={night ? { borderColor: "rgb(var(--night-line))", background: "rgb(var(--night-line))" } : undefined}>
      {steps.map((s, i) => (
        <li key={s.title} className={cn("relative flex flex-col gap-3 p-6 lg:min-h-[220px]", night ? "bg-night-raised text-on-night" : "bg-raised")}>
          <div className="flex items-center gap-3">
            <span className="eyebrow tabular text-unit">{String(i + 1).padStart(2, "0")}</span>
            <span aria-hidden="true" className={cn("h-px flex-1", night ? "bg-night-line" : "bg-line")} />
          </div>
          <h3 className="mt-6 text-[19px] font-semibold leading-snug">{s.title}</h3>
          <p className={cn("text-[15px] leading-relaxed", night ? "text-on-night-mute" : "text-mute")}>{s.desc}</p>
        </li>
      ))}
    </ol>
  );
}

export function CtaBand({ title, text, unit, service, waText }: { title: ReactNode; text: string; unit?: Prefill["unit"]; service?: string; waText?: string }) {
  return (
    <Section className="py-20 md:py-28">
      <div className="relative overflow-hidden rounded-[24px] bg-night px-6 py-12 text-on-night md:px-14 md:py-16">
        <div aria-hidden="true" className="night-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(120%_90%_at_90%_10%,black,transparent_70%)]" />
        <div aria-hidden="true" className="absolute -right-24 -top-28 h-80 w-[36rem] rotate-[-12deg] rounded-full bg-[radial-gradient(closest-side,rgb(var(--unit-night)/0.45),transparent)] blur-2xl" />
        <div className="relative grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow className="text-on-night-mute">El siguiente paso</Eyebrow>
            <h2 className="display-md mt-4">{title}</h2>
          </div>
          <div className="flex flex-col gap-5 md:col-span-5">
            <p className="max-w-[44ch] text-[16px] leading-relaxed text-on-night-mute">{text}</p>
            <div className="flex flex-wrap gap-3">
              <BtnLink to="contacto" prefill={{ unit, service }} variant="night">Cuéntanos qué necesitas</BtnLink>
              <WhatsAppBtn text={waText} source={`banda_cta_${unit ?? "grupo"}`} variant="ghost" className="px-2 text-on-night">WhatsApp directo</WhatsAppBtn>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={cn("relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]", className)}>
      <ul className="flex w-max animate-marquee gap-10 whitespace-nowrap py-1 motion-reduce:animate-none hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <li key={i} aria-hidden={i >= items.length} className="flex items-center gap-10 font-display text-[22px] tracking-tight md:text-[28px]">
            {t}
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet to-cyan opacity-70" />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Marked space for approved photos or cases. Never filled with invented material. */
export function PlaceholderMedia({ label, note, className, ratio = "aspect-[4/3]" }: { label: string; note: string; className?: string; ratio?: string }) {
  return (
    <figure className={cn("relative flex max-w-full flex-col justify-between overflow-hidden rounded-[16px] border border-dashed border-line-strong/60 bg-sunken p-5", ratio, className)}>
      <div aria-hidden="true" className="hairline-grid absolute inset-0 opacity-60" />
      <span className="eyebrow relative text-mute">{label}</span>
      <figcaption className="relative max-w-[32ch] text-[13px] leading-snug text-mute">{note}</figcaption>
    </figure>
  );
}

export function Breadcrumb({ trail, night }: { trail: { to?: string; label: string }[]; night?: boolean }) {
  return (
    <nav aria-label="Ruta" className={cn("eyebrow flex flex-wrap items-center gap-2", night ? "text-on-night-mute" : "text-mute")}>
      {trail.map((t, i) => (
        <span key={t.label} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden="true">/</span>}
          {t.to ? (
            <Link to={t.to} className={night ? "hover:text-on-night" : "hover:text-ink"}>{t.label}</Link>
          ) : (
            <span className={night ? "text-on-night" : "text-ink"}>{t.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
