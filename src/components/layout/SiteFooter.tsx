"use client";

/**
 * SiteFooter — footer global rediseñado (sistema Aurora).
 * Variante oscura de acento al pie del sitio claro: deja respirar la marca
 * y el gradiente firma, con mono en labels.
 */

import React from "react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { Linkedin, Instagram, Facebook, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/company/aurhora-agency", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/aurhora.agency", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com/aurhora.agency", label: "Facebook" },
];

export function SiteFooter() {
  const t = useTranslations();

  const serviceLinks = [
    { label: t("services.godigital.title"), href: "/servicios/godigital" },
    { label: t("services.transformation.title"), href: "/servicios/transformacion-digital" },
    { label: t("services.development.title"), href: "/servicios/desarrollo-software" },
    { label: t("services.marketing.title"), href: "/servicios/impulso-marketing" },
  ];

  const companyLinks = [
    { label: t("header.quienesSomos"), href: "/quienes-somos" },
    { label: t("header.servicios"), href: "/#servicios" },
    { label: t("footer.privacy"), href: "/aviso-privacidad" },
    { label: t("footer.terms"), href: "/terminos-condiciones" },
  ];

  const labelCls = "font-mono text-xs uppercase tracking-[0.15em] text-zinc-500 mb-5";
  const linkCls = "text-sm text-zinc-400 hover:text-white transition-colors";

  return (
    <footer className="relative overflow-hidden bg-aurora-bg text-zinc-300">
      {/* glow boreal sutil */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 60% at 0% 0%, rgba(124,58,237,0.18), transparent 60%), radial-gradient(40% 60% at 100% 0%, rgba(6,182,212,0.14), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-12">
          {/* Marca */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <svg width="24" height="24" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="auroraFooterLogo" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="50%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
                <path d="M50 10 L10 90 L30 90 L45 40 L55 40 L70 90 L90 90 Z" fill="url(#auroraFooterLogo)" />
              </svg>
              <span className="text-lg font-semibold text-white">Aurhora</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-zinc-400">
              {t("footer.description")}
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:border-aurora-cyan/40 hover:text-white"
                >
                  <s.icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <div>
            <div className={labelCls}>{t("header.servicios")}</div>
            <ul className="space-y-3">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <div className={labelCls}>{t("footer.company")}</div>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="col-span-2 md:col-span-1">
            <div className={labelCls}>{t("footer.contact")}</div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4.5 w-4.5 flex-shrink-0 text-aurora-cyan" />
                <a href="mailto:contacto@aurhora.agency" className={`${linkCls} break-all`}>contacto@aurhora.agency</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4.5 w-4.5 flex-shrink-0 text-aurora-cyan" />
                <a href="tel:+525582991282" className={linkCls}>+52 55 8299 1282</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4.5 w-4.5 flex-shrink-0 text-aurora-cyan" />
                <span className="text-sm text-zinc-400">{t("footer.city")}</span>
              </li>
            </ul>
            <Link
              href="/#contacto"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-aurora-cyan transition-all hover:gap-3"
            >
              {t("footer.scheduleConsultation")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-center md:flex-row md:text-left">
          <p className="font-mono text-xs text-zinc-500">
            © {new Date().getFullYear()} Aurhora Agency. {t("footer.copyright").replace("Aurhora Agency. ", "")}
          </p>
          <p className="font-mono text-xs text-zinc-600">
            {t("footer.madeWith")} <span className="text-aurora-violet">◆</span> {t("footer.byTeam")}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
