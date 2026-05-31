"use client";

/**
 * LoginView — pantalla de inicio de sesión rediseñada (sistema Aurora).
 * Standalone (sin el chrome legacy). Contenido i18n (namespace "login").
 */

import React, { useState } from "react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import { Reveal } from "@/lib/motion";

const inputCls =
  "w-full rounded-xl border border-line bg-surface py-3 pl-11 pr-4 text-ink placeholder:text-zinc-400 outline-none transition-colors focus:border-aurora-indigo focus:ring-2 focus:ring-aurora-indigo/20";

export function LoginView() {
  const t = useTranslations("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const chips = [
    { Icon: ShieldCheck, label: t("secure") },
    { Icon: Zap, label: t("fast") },
    { Icon: Globe, label: t("global") },
  ];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-6 py-16">
      {/* glow boreal */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(50% 45% at 20% 10%, rgba(124,58,237,0.10), transparent 70%), radial-gradient(45% 40% at 85% 90%, rgba(6,182,212,0.10), transparent 70%)" }}
      />

      <Reveal>
        <div className="relative w-full max-w-md">
          <Link href="/" className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-secondaryText transition-colors hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> Volver al inicio
          </Link>

          <div className="rounded-3xl border border-line bg-white p-8 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.12)] md:p-10">
            {/* Marca */}
            <div className="flex items-center gap-2.5">
              <svg width="26" height="26" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="loginLogo" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="50%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
                <path d="M50 10 L10 90 L30 90 L45 40 L55 40 L70 90 L90 90 Z" fill="url(#loginLogo)" />
              </svg>
              <span className="text-lg font-semibold tracking-tight text-ink">Aurhora</span>
            </div>

            <h1 className="mt-7 text-2xl font-semibold tracking-[-0.01em] text-ink">{t("title")}</h1>
            <p className="mt-2 text-sm text-secondaryText">{t("tagline")}</p>

            <form onSubmit={onSubmit} className="mt-7 space-y-4">
              <div>
                <label htmlFor="login-email" className="mb-1.5 block text-sm font-medium text-ink">{t("email")}</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                  <input id="login-email" type="email" required className={inputCls} placeholder={t("emailPlaceholder")} />
                </div>
              </div>
              <div>
                <label htmlFor="login-password" className="mb-1.5 block text-sm font-medium text-ink">{t("password")}</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                  <input id="login-password" type={showPassword ? "text" : "password"} required className={inputCls} placeholder={t("passwordPlaceholder")} />
                  <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? "Ocultar" : "Mostrar"} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-ink">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-secondaryText">
                  <input type="checkbox" className="h-4 w-4 rounded border-line text-aurora-indigo focus:ring-aurora-indigo" />
                  {t("rememberMe")}
                </label>
                <a href="#" className="font-medium text-aurora-indigo hover:underline">{t("forgotPassword")}</a>
              </div>

              <button type="submit" disabled={loading} className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-aurora px-6 py-3.5 font-medium text-white shadow-[0_10px_30px_-8px_rgba(79,70,229,0.5)] transition-all hover:brightness-110 disabled:opacity-60">
                {loading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                ) : (
                  <>{t("access")} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-secondaryText">
              {t("noAccount")} <a href="#" className="font-medium text-aurora-indigo hover:underline">{t("signUp")}</a>
            </p>
          </div>

          <div className="mt-6 flex justify-center gap-x-6 gap-y-2">
            {chips.map(({ Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs text-secondaryText">
                <Icon className="h-3.5 w-3.5 text-aurora-indigo" /> {label}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </main>
  );
}

export default LoginView;
