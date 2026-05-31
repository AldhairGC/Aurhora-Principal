"use client";

/**
 * NotFoundView — página 404 rediseñada (sistema Aurora). Standalone.
 */

import React from "react";
import { Link } from "@/navigation";
import { ArrowLeft, Home } from "lucide-react";
import { GradientText } from "@/components/ui";
import { Reveal } from "@/lib/motion";

export function NotFoundView() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-6 text-center">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(50% 45% at 50% 0%, rgba(124,58,237,0.12), transparent 70%), radial-gradient(45% 40% at 80% 100%, rgba(6,182,212,0.10), transparent 70%)" }}
      />
      <Reveal>
        <div className="relative">
          <div className="font-semibold leading-none tracking-[-0.04em]" style={{ fontSize: "clamp(5rem, 18vw, 10rem)" }}>
            <GradientText>404</GradientText>
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-[-0.01em] text-ink md:text-3xl">Página no encontrada</h1>
          <p className="mx-auto mt-4 max-w-md text-secondaryText">
            La página que buscas no existe o fue movida. Volvamos a un lugar conocido.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/" className="group inline-flex items-center gap-2 rounded-xl bg-aurora px-6 py-3.5 font-medium text-white shadow-[0_10px_30px_-8px_rgba(79,70,229,0.5)] transition-all hover:brightness-110">
              <Home className="h-4 w-4" /> Volver al inicio
            </Link>
            <Link href="/servicios/godigital" className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-6 py-3.5 font-medium text-ink transition-colors hover:bg-zinc-50">
              Ver servicios <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>
        </div>
      </Reveal>
    </main>
  );
}

export default NotFoundView;
