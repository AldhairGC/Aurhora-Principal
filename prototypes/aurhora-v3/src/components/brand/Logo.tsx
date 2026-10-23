import { lockup, lockupDark, mark, markWhite } from "./logos";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

type Props = { className?: string; onNight?: boolean };

/** Lockup oficial: el isotipo sustituye a la "A". No recomponer. */
export function Logo({ className, onNight }: Props) {
  const { dark } = useTheme();
  const src = onNight || dark ? lockupDark : lockup;
  return <img src={src} alt="Aurhora" width={153} height={40} className={cn("h-8 w-auto select-none", className)} draggable={false} />;
}

export function Mark({ className, white }: { className?: string; white?: boolean }) {
  return <img src={white ? markWhite : mark} alt="" aria-hidden="true" className={cn("h-6 w-6", className)} draggable={false} />;
}
