"use client";

import { lockup, lockupDark, mark, markWhite, unitLockups } from "./logos";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import type { UnitId } from "@/content/types";

type Props = { className?: string; onNight?: boolean };

const UNIT_NAME: Record<UnitId, string> = { digital: "Digital", integra: "Integra", facilities: "Facilities" };
/** viewBox widths of the lockups (height 45.7) so the <img> reserves its space. */
const UNIT_WIDTH: Record<UnitId, number> = { digital: 249, integra: 254.5, facilities: 271.6 };

/** Lockup oficial "Aurhora Agency": el isotipo sustituye a la "A". No recomponer. */
export function Logo({ className, onNight }: Props) {
  const { dark } = useTheme();
  const src = onNight || dark ? lockupDark : lockup;
  return <img src={src} alt="Aurhora Agency" width={227} height={40} className={cn("h-8 w-auto select-none", className)} draggable={false} />;
}

/** Lockup de una unidad (Aurhora + Digital, Integra o Facilities), mismo patrón del sistema de diseño. */
export function UnitLockup({ unit, className, onNight }: Props & { unit: UnitId }) {
  const { dark } = useTheme();
  const src = onNight || dark ? unitLockups[unit].dark : unitLockups[unit].light;
  const width = Math.round((UNIT_WIDTH[unit] / 45.7) * 40);
  return <img src={src} alt={`Aurhora ${UNIT_NAME[unit]}`} width={width} height={40} className={cn("h-7 w-auto select-none", className)} draggable={false} />;
}

export function Mark({ className, white }: { className?: string; white?: boolean }) {
  return <img src={white ? markWhite : mark} alt="" aria-hidden="true" className={cn("h-6 w-6", className)} draggable={false} />;
}
