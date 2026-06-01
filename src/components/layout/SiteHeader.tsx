"use client";

/**
 * SiteHeader — chrome global rediseñado (sistema Aurora, estética clara).
 * Preserva la funcionalidad del header legacy: nav, mega-menú de servicios,
 * selector de idioma, toggle de tema, login, mobile menu y CTA de contacto.
 */

import React, { useEffect, useRef, useState } from "react";
import { Link, usePathname, useRouter } from "@/navigation";
import { Menu, X, ChevronDown, Globe, Moon, Sun, ArrowRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslations, useLocale } from "next-intl";
import { MegaMenu } from "@/components/MegaMenu";

interface Service {
  id: number | string;
  title: string;
  link?: string;
  available: boolean;
}

interface SiteHeaderProps {
  services: Service[];
  openContactModal: (source: string) => void;
}

const languages = [
  { code: "es", name: "Español (MX)", flag: "🇲🇽" },
  { code: "en", name: "English (US)", flag: "🇺🇸" },
  { code: "pt", name: "Português (BR)", flag: "🇧🇷" },
];

export function SiteHeader({ services, openContactModal }: SiteHeaderProps) {
  const { theme, setTheme } = useTheme();
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setIsLangOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const changeLocale = (code: string) => {
    router.replace(pathname, { locale: code });
    setIsLangOpen(false);
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: t("header.inicio") },
    { href: "/quienes-somos", label: t("header.quienesSomos") },
    // Desactivado temporalmente: la página de Recursos aún no tiene contenido.
    // Reactivar descomentando cuando esté lista.
    // { href: "/recursos", label: t("header.recursos") },
  ];

  const linkBase =
    "text-sm font-medium px-3.5 py-2 rounded-lg transition-colors duration-200";
  const linkInactive = "text-secondaryText hover:text-ink hover:bg-zinc-100";
  const linkActive = "text-ink bg-zinc-100";
  const iconBtn =
    "p-2.5 rounded-xl border border-line bg-white text-ink hover:bg-zinc-50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-indigo/50";

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-aurora-indigo focus:text-white focus:rounded-lg"
      >
        {t("header.skipToContent")}
      </a>

      <nav
        role="navigation"
        aria-label={t("header.mainNavigation")}
        className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "bg-surface/95 border-line shadow-[0_1px_3px_rgba(0,0,0,0.05)] backdrop-blur-md"
            : "bg-surface/40 border-transparent backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex h-16 items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2.5">
              <svg width="26" height="26" viewBox="0 0 100 100" className="transition-transform duration-300 group-hover:scale-110">
                <defs>
                  <linearGradient id="auroraLogo" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="50%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
                <path d="M50 10 L10 90 L30 90 L45 40 L55 40 L70 90 L90 90 Z" fill="url(#auroraLogo)" />
              </svg>
              <span className="flex items-baseline">
                <span className="text-lg font-semibold tracking-tight text-ink">Aurhora</span>
                <span className="ml-1.5 text-sm text-secondaryText">Agency</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${linkBase} ${pathname === link.href ? linkActive : linkInactive}`}
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={() => setIsServicesOpen((v) => !v)}
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
                className={`${linkBase} flex items-center gap-1.5 ${
                  pathname.startsWith("/servicios") ? linkActive : linkInactive
                }`}
              >
                {t("header.servicios")}
                <ChevronDown className={`h-4 w-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* Acciones */}
            <div className="hidden items-center gap-2 md:flex">
              <div className="relative" ref={langRef}>
                <button onClick={() => setIsLangOpen((v) => !v)} aria-label={t("header.cambiarIdioma")} aria-expanded={isLangOpen} className={iconBtn}>
                  <Globe className="h-4 w-4" />
                </button>
                {isLangOpen && (
                  <div role="menu" className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-line bg-white py-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLocale(lang.code)}
                        role="menuitem"
                        aria-current={locale === lang.code}
                        className={`mx-1 flex w-[calc(100%-0.5rem)] items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                          locale === lang.code ? "bg-aurora-indigo/[0.08] font-medium text-aurora-indigo" : "text-ink hover:bg-zinc-100"
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="flex-1 text-left">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label={theme === "dark" ? t("header.switchToLight") : t("header.switchToDark")}
                className={iconBtn}
              >
                {theme === "dark" ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-aurora-indigo" />}
              </button>

              <Link
                href="/login"
                className="rounded-xl border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-zinc-50"
              >
                {t("header.login")}
              </Link>

              <button
                onClick={() => openContactModal("header_cta_agenda")}
                className="group inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-aurora px-4 py-2.5 text-sm font-medium text-white shadow-[0_8px_24px_-8px_rgba(79,70,229,0.5)] transition-all hover:brightness-110"
              >
                {t("header.contacto")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? t("header.closeMenu") : t("header.openMenu")}
              className={`${iconBtn} md:hidden`}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="-mx-6 border-t border-line bg-surface px-6 py-4 md:hidden">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`rounded-xl px-4 py-3 text-center font-medium transition-colors ${
                      pathname === link.href ? "bg-aurora-indigo/[0.08] text-aurora-indigo" : "text-ink hover:bg-zinc-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <button
                  onClick={() => setIsMobileServicesOpen((v) => !v)}
                  className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium text-ink hover:bg-zinc-100"
                >
                  {t("header.servicios")}
                  <ChevronDown className={`h-5 w-5 transition-transform ${isMobileServicesOpen ? "rotate-180" : ""}`} />
                </button>
                {isMobileServicesOpen && (
                  <div className="rounded-xl border border-line py-2">
                    {services
                      .filter((s) => s.available)
                      .map((s) => (
                        <Link
                          key={s.id || s.title}
                          href={(s.link as string) || "#"}
                          onClick={() => {
                            setIsMobileServicesOpen(false);
                            setIsMenuOpen(false);
                          }}
                          className="block px-4 py-3 text-center text-sm text-ink hover:bg-zinc-100"
                        >
                          {s.title}
                        </Link>
                      ))}
                  </div>
                )}

                <button
                  onClick={() => {
                    openContactModal("header_mobile_contacto");
                    setIsMenuOpen(false);
                  }}
                  className="rounded-xl px-4 py-3 text-center font-medium text-ink hover:bg-zinc-100"
                >
                  {t("header.contacto")}
                </button>

                <div className="my-2 border-t border-line" />

                <div className="flex justify-center gap-2 py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLocale(lang.code)}
                      className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                        locale === lang.code ? "bg-aurora-indigo/[0.08] text-aurora-indigo ring-1 ring-aurora-indigo/30" : "bg-zinc-100 text-ink"
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      {lang.code.toUpperCase()}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => openContactModal("header_mobile_cta_agenda")}
                  className="mt-1 rounded-xl bg-aurora px-5 py-3.5 text-center font-medium text-white"
                >
                  {t("cta.scheduleSession")}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <MegaMenu isOpen={isServicesOpen} onClose={() => setIsServicesOpen(false)} locale={locale} />
    </>
  );
}

export default SiteHeader;
