import { createContext, useCallback, useContext, useEffect, useMemo, useState, type AnchorHTMLAttributes, type ReactNode } from "react";
import type { UnitId } from "@/content/types";

/*
  Single-file artifact: every page is a view selected by a bare hash token (#digital,
  #aire-acondicionado…). Tokens must stay plain letters/digits/dashes so the artifact
  viewer forwards them.
*/

export type Prefill = { unit?: UnitId | "orientacion"; service?: string; origin?: string };

type RouterValue = {
  view: string;
  go: (view: string, opts?: { prefill?: Prefill; section?: string }) => void;
  prefill: Prefill;
};

const RouterContext = createContext<RouterValue | null>(null);

/** Old tokens that were shared before a rename keep working. */
const ALIASES: Record<string, string> = { mantenimiento: "facilities" };

function readHash(): string {
  try {
    const raw = window.location.hash.replace(/^#/, "").toLowerCase();
    if (ALIASES[raw]) return ALIASES[raw];
    return /^[a-z0-9-]+$/.test(raw) ? raw : "";
  } catch {
    return "";
  }
}

export function RouterProvider({ children, known }: { children: ReactNode; known: Set<string> }) {
  const initial = readHash();
  const [view, setView] = useState(known.has(initial) ? initial : "grupo");
  const [prefill, setPrefill] = useState<Prefill>({});

  const go = useCallback<RouterValue["go"]>((next, opts) => {
    const target = known.has(next) ? next : "grupo";
    setPrefill(opts?.prefill ?? {});
    setView(target);
    try {
      history.replaceState(null, "", target === "grupo" ? " " : `#${target}`);
    } catch {
      /* the viewer may refuse URL changes; navigation still works in-page */
    }
    requestAnimationFrame(() => {
      if (opts?.section) {
        document.getElementById(opts.section)?.scrollIntoView({ block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      }
    });
  }, [known]);

  useEffect(() => {
    const onHash = () => {
      const h = readHash();
      if (h && known.has(h)) {
        setView(h);
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [known]);

  const value = useMemo(() => ({ view, go, prefill }), [view, go, prefill]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter outside RouterProvider");
  return ctx;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; prefill?: Prefill; section?: string };

/** In-page navigation that still renders a real anchor (keyboard, middle-click, a11y). */
export function Link({ to, prefill, section, onClick, children, ...rest }: LinkProps) {
  const { go, view } = useRouter();
  return (
    <a
      href={`#${to}`}
      aria-current={view === to ? "page" : undefined}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        go(to, { prefill, section });
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ block: "start" });
}
