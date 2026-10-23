import { useEffect, useState } from "react";

export const TIME_ZONE = "America/Mexico_City";

/** Horario acordado: lun–vie 8–20, sáb 8–16, domingo sin operación ordinaria. */
const SCHEDULE: Record<number, [number, number] | null> = {
  0: null,
  1: [8, 20],
  2: [8, 20],
  3: [8, 20],
  4: [8, 20],
  5: [8, 20],
  6: [8, 16],
};

const DAY_NAMES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

export type OpenState = {
  open: boolean;
  clock: string;
  headline: string;
  detail: string;
};

function cdmxParts(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, hour: Number(get("hour")), minute: Number(get("minute")) };
}

export function openState(now = new Date()): OpenState {
  const { day, hour, minute } = cdmxParts(now);
  const clock = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  const today = SCHEDULE[day];
  const mins = hour * 60 + minute;

  if (today && mins >= today[0] * 60 && mins < today[1] * 60) {
    return {
      open: true,
      clock,
      headline: "Atendiendo ahora",
      detail: `Hoy hasta las ${today[1]}:00 · hora de CDMX`,
    };
  }

  // Find the next opening
  for (let i = 0; i < 8; i++) {
    const d = (day + i) % 7;
    const slot = SCHEDULE[d];
    if (!slot) continue;
    if (i === 0 && mins >= slot[0] * 60) continue;
    const when = i === 0 ? "hoy" : i === 1 ? "mañana" : `el ${DAY_NAMES[d]}`;
    return {
      open: false,
      clock,
      headline: "Fuera de horario",
      detail: `Respondemos ${when} desde las ${slot[0]}:00 · hora de CDMX`,
    };
  }
  return { open: false, clock, headline: "Fuera de horario", detail: "Hora de CDMX" };
}

export function useOpenState() {
  const [state, setState] = useState(() => openState());
  useEffect(() => {
    const id = window.setInterval(() => setState(openState()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return state;
}

export function todayISO() {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const g = (t: string) => parts.find((p) => p.type === t)?.value;
  return `${g("year")}-${g("month")}-${g("day")}`;
}
