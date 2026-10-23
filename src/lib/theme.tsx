"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Mode = "system" | "light" | "dark";
type ThemeValue = { mode: Mode; dark: boolean; setMode: (m: Mode) => void };

const ThemeContext = createContext<ThemeValue>({ mode: "system", dark: false, setMode: () => {} });

function readStored(): Mode {
  try {
    const v = localStorage.getItem("aurhora-theme");
    return v === "light" || v === "dark" ? v : "system";
  } catch {
    return "system";
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Server render and first client render agree on "system"; the stored choice is read after
  // hydration (THEME_SCRIPT already set data-theme before paint, so there is no flash).
  const [mode, setModeState] = useState<Mode>("system");
  const [systemDark, setSystemDark] = useState(false);

  useEffect(() => {
    setModeState(readStored());
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    setSystemDark(mq?.matches ?? false);
    const on = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq?.addEventListener("change", on);
    return () => mq?.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "system") delete root.dataset.theme;
    else root.dataset.theme = mode;
  }, [mode]);

  const setMode = (m: Mode) => {
    setModeState(m);
    try {
      if (m === "system") localStorage.removeItem("aurhora-theme");
      else localStorage.setItem("aurhora-theme", m);
    } catch {
      /* storage unavailable: the choice lasts for this visit */
    }
  };

  const dark = mode === "dark" || (mode === "system" && systemDark);
  return <ThemeContext.Provider value={{ mode, dark, setMode }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);


export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setReduced(mq?.matches ?? false);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq?.addEventListener("change", on);
    return () => mq?.removeEventListener("change", on);
  }, []);
  return reduced;
}
