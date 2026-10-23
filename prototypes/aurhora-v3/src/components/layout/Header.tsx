import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, Monitor } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo, UnitLockup } from "@/components/brand/Logo";
import { Link, useRouter } from "@/lib/router";
import { useTheme } from "@/lib/theme";
import { useOpenState } from "@/lib/hours";
import { UNITS } from "@/content/site";
import { serviceById } from "@/content/services";
import { articleById } from "@/content/articles";
import { cn } from "@/lib/utils";

const NIGHT_HERO = new Set(["grupo", "integra", "nosotros"]);

export function ThemeToggle({ className, night }: { className?: string; night?: boolean }) {
  const { mode, setMode } = useTheme();
  const next = mode === "system" ? "light" : mode === "light" ? "dark" : "system";
  const Icon = mode === "light" ? Sun : mode === "dark" ? Moon : Monitor;
  const label = mode === "light" ? "Tema claro" : mode === "dark" ? "Tema oscuro" : "Tema del sistema";
  return (
    <button
      type="button"
      onClick={() => setMode(next)}
      aria-label={`${label}. Cambiar tema`}
      title={label}
      className={cn("grid h-10 w-10 place-items-center rounded-full border transition", night ? "border-night-line text-on-night hover:bg-night-raised" : "border-line text-ink hover:bg-sunken", className)}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}

export function OpenDot({ night, className }: { night?: boolean; className?: string }) {
  const s = useOpenState();
  return (
    <span className={cn("eyebrow inline-flex items-center gap-2", night ? "text-on-night-mute" : "text-mute", className)} title={s.detail}>
      <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", s.open ? "animate-pulse2 bg-mint" : "bg-line-strong")} />
      <span className="tabular">{s.open ? "Atendiendo" : "Fuera de horario"} · CDMX {s.clock}</span>
    </span>
  );
}

export function Header() {
  const { view } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const night = NIGHT_HERO.has(view) && !scrolled;
  const activeUnit = UNITS.find((u) => u.id === view || serviceById(view)?.unit === u.id)?.id;

  return (
    <header
      className={cn(
        "gutter sticky z-50 border-b transition-colors duration-300",
        night ? "border-transparent bg-night text-on-night" : "border-line bg-bg/85 text-ink backdrop-blur-xl",
      )}
      style={{ top: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="wrap flex h-16 items-center gap-6">
        <Link to="grupo" aria-label="Aurhora Agency, inicio" className="flex shrink-0 items-center gap-3">
          {/* Lockup del sistema de diseño: Agency en el sitio; la unidad en sus páginas (nunca dos descriptores). */}
          {activeUnit ? <UnitLockup unit={activeUnit} onNight={night} className="h-7" /> : <Logo onNight={night} className="h-7" />}
        </Link>

        <nav aria-label="Principal" className="ml-auto hidden items-center gap-1 lg:flex">
          <Link to="grupo" className={navCls(view === "grupo", night)}>La agencia</Link>
          {UNITS.map((u) => (
            <div key={u.id} className="group relative" data-unit={u.id}>
              <Link to={u.id} className={navCls(activeUnit === u.id, night)}>
                {u.name}
              </Link>
              <div className="invisible absolute left-1/2 top-full z-50 w-[420px] -translate-x-1/2 pt-3 opacity-0 transition duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="overflow-hidden rounded-[16px] border border-line bg-raised text-ink shadow-[0_24px_60px_-20px_rgba(9,9,11,0.35)]">
                  <div className="flex items-start justify-between gap-4 border-b border-line bg-unit-soft px-5 py-4">
                    <div>
                      <p className="eyebrow text-unit">{u.full}</p>
                      <p className="mt-1 font-display text-[17px] font-semibold tracking-tight">{u.lead}</p>
                    </div>
                    <u.icon className="mt-1 h-5 w-5 shrink-0 text-unit" aria-hidden="true" />
                  </div>
                  <ul className="p-2">
                    {u.services.map((id) => {
                      const s = serviceById(id)!;
                      return (
                        <li key={id}>
                          <Link to={id} className="flex items-start gap-3 rounded-[8px] px-3 py-2.5 transition hover:bg-sunken">
                            <s.icon className="mt-0.5 h-4 w-4 shrink-0 text-unit" aria-hidden="true" />
                            <span>
                              <span className="block text-[14px] font-medium">{s.name}</span>
                              <span className="block text-[13px] leading-snug text-mute">{s.tagline}</span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="border-t border-line px-5 py-3">
                    <Link to={u.id} className="text-[13px] font-medium text-unit hover:underline">Ver todo {u.full} →</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Link to="recursos" className={navCls(view === "recursos" || Boolean(articleById(view)), night)}>Recursos</Link>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <ThemeToggle night={night} className="hidden sm:grid" />
          <Link
            to="contacto"
            className={cn(
              "hidden min-h-[40px] items-center gap-1.5 rounded-full px-4 text-[14px] font-medium transition sm:inline-flex",
              night ? "bg-on-night text-night hover:bg-white" : "bg-ink text-bg hover:bg-ink-soft",
            )}
          >
            Hablemos <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className={cn("grid h-10 w-10 place-items-center rounded-full border lg:hidden", night ? "border-night-line" : "border-line")}
                aria-label="Abrir menú"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm overflow-y-auto border-line bg-bg p-0 text-ink">
              <SheetTitle className="sr-only">Menú</SheetTitle>
              <div className="flex h-16 items-center border-b border-line px-5">
                <Logo className="h-7" />
              </div>
              <nav aria-label="Menú móvil" className="flex flex-col gap-1 p-3" onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setOpen(false); }}>
                <Link to="grupo" className="rounded-[8px] px-3 py-3 font-display text-[20px] font-semibold tracking-tight hover:bg-sunken">La agencia</Link>
                {UNITS.map((u) => (
                  <div key={u.id} data-unit={u.id} className="rounded-[12px] border border-line p-2">
                    <Link to={u.id} className="flex items-center justify-between rounded-[8px] px-2 py-2 font-display text-[20px] font-semibold tracking-tight">
                      {u.name}
                      <u.icon className="h-5 w-5 text-unit" aria-hidden="true" />
                    </Link>
                    <div className="grid grid-cols-1 gap-0.5 pb-1">
                      {u.services.map((id) => (
                        <Link key={id} to={id} className="rounded-[8px] px-2 py-2 text-[15px] text-mute hover:bg-sunken hover:text-ink">
                          {serviceById(id)!.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-1">
                  <Link to="nosotros" className="rounded-[8px] px-3 py-3 font-display text-[17px] font-semibold tracking-tight hover:bg-sunken">Nosotros</Link>
                  <Link to="recursos" className="rounded-[8px] px-3 py-3 font-display text-[17px] font-semibold tracking-tight hover:bg-sunken">Recursos</Link>
                </div>
                <Link to="contacto" className="mt-2 flex min-h-[48px] items-center justify-center gap-2 rounded-[12px] bg-ink font-medium text-bg">
                  Hablemos <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <div className="mt-3 flex items-center justify-between px-2">
                  <OpenDot />
                  <ThemeToggle />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function navCls(active: boolean, night: boolean) {
  return cn(
    "relative inline-flex h-10 items-center rounded-full px-3.5 text-[14px] transition",
    night ? "text-on-night-mute hover:text-on-night" : "text-mute hover:text-ink",
    active && (night ? "text-on-night" : "text-ink"),
    active && "after:absolute after:inset-x-3.5 after:-bottom-[13px] after:h-[2px] after:rounded-full after:bg-unit",
  );
}
