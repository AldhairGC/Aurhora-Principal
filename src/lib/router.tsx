"use client";

import { createContext, useCallback, useContext, useMemo, useState, type AnchorHTMLAttributes, type ReactNode } from "react";
import NextLink from "next/link";
import { usePathname, useRouter as useNextRouter } from "next/navigation";
import type { UnitId } from "@/content/types";
import { slugOf, viewOf } from "@/lib/routes";

/*
  Same API the prototype used (view ids, go(), <Link to>), backed by real Next.js routes.
  The prefill for the contact wizard lives in this provider, which sits in the root layout
  and therefore survives client-side navigation.
*/

export type Prefill = { unit?: UnitId | "orientacion"; service?: string; origin?: string };

type RouterValue = {
  view: string;
  go: (view: string, opts?: { prefill?: Prefill; section?: string }) => void;
  prefill: Prefill;
  setPrefill: (p: Prefill) => void;
};

const RouterContext = createContext<RouterValue | null>(null);

const hrefOf = (view: string, section?: string) => slugOf(view) + (section ? `#${section}` : "");

export function RouterProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const next = useNextRouter();
  const view = viewOf(pathname) ?? "not-found";
  const [prefill, setPrefill] = useState<Prefill>({});

  const go = useCallback<RouterValue["go"]>((to, opts) => {
    setPrefill(opts?.prefill ?? {});
    next.push(hrefOf(to, opts?.section));
  }, [next]);

  const value = useMemo(() => ({ view, go, prefill, setPrefill }), [view, go, prefill]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter outside RouterProvider");
  return ctx;
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { to: string; prefill?: Prefill; section?: string };

/** Link by view id; renders a real anchor with the page URL. */
export function Link({ to, prefill, section, onClick, children, ...rest }: LinkProps) {
  const { view, setPrefill } = useRouter();
  return (
    <NextLink
      href={hrefOf(to, section)}
      aria-current={view === to ? "page" : undefined}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) setPrefill(prefill ?? {});
      }}
      {...rest}
    >
      {children}
    </NextLink>
  );
}

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ block: "start" });
}
