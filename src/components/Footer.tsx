// src/components/Footer.tsx - Modern Professional Footer
"use client";

import React from "react";
import { Instagram, Linkedin, Facebook, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

const Footer = () => {
  const { theme } = useTheme();
  const t = useTranslations();

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com/company/aurhora-agency", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/aurhora.agency", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/aurhora.agency", label: "Facebook" },
  ];

  const serviceLinks = [
    { label: t("services.godigital.title"), href: "/servicios/godigital" },
    { label: t("services.transformation.title"), href: "/servicios/transformacion-digital" },
    { label: t("services.development.title"), href: "/servicios/desarrollo-software" },
    { label: t("services.marketing.title"), href: "/servicios/impulso-marketing" },
  ];

  const companyLinks = [
    { label: t("header.quienesSomos"), href: "/quienes-somos" },
    { label: t("header.servicios"), href: "/#servicios" },
    { label: t("header.contacto"), href: "/#contacto" },
  ];

  return (
    <footer
      className="relative pt-12 md:pt-20 pb-8 md:pb-10 border-t border-gray-200 dark:border-gray-800"
      style={{ backgroundColor: theme === 'dark' ? '#111827' : '#F9FAFB' }}
    >
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
          
          {/* Brand Column - full width on mobile */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4 md:mb-6">
              <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                Aurhora
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-6 leading-relaxed text-sm">
              {t("footer.description")}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-11 h-11 md:w-10 md:h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 active:scale-95"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div className="col-span-1">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 md:mb-6 text-sm md:text-base">
              {t("header.servicios")}
            </h4>
            <ul className="space-y-2.5 md:space-y-3">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-xs md:text-sm flex items-center gap-2 group transition-colors py-0.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-purple-500 transition-colors hidden md:block" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="col-span-1">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 md:mb-6 text-sm md:text-base">
              {t("footer.company")}
            </h4>
            <ul className="space-y-2.5 md:space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-xs md:text-sm transition-colors py-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/aviso-privacidad"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-xs md:text-sm transition-colors py-0.5 inline-block"
                >
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link 
                  href="/terminos-condiciones"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-xs md:text-sm transition-colors py-0.5 inline-block"
                >
                  {t("footer.terms")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column - full width on mobile */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 md:mb-6 text-sm md:text-base">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <a href="mailto:contacto@aurhora.agency" className="text-gray-600 dark:text-gray-400 text-xs md:text-sm hover:text-purple-600 transition-colors break-all">
                  contacto@aurhora.agency
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <a href="tel:+525582991282" className="text-gray-600 dark:text-gray-400 text-xs md:text-sm hover:text-purple-600 transition-colors">
                  +52 55 8299 1282
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">
                  {t("footer.city")}
                </span>
              </li>
            </ul>
            
            {/* CTA Small */}
            <div className="mt-6 md:mt-8">
              <Link 
                href="/#contacto"
                className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:gap-3 transition-all py-2 active:scale-95"
              >
                {t("footer.scheduleConsultation")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 md:pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-center md:text-left">
          <p className="text-xs text-gray-500 dark:text-gray-500 order-2 md:order-1">
            © {new Date().getFullYear()} Aurhora Agency. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 order-1 md:order-2">
            <span className="text-xs text-gray-400 dark:text-gray-600 flex items-center gap-1">
              {t("footer.madeWith")} <span className="text-red-500">❤</span> {t("footer.byTeam")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
