// components/Header.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link } from "@/navigation";
import { Moon, Sun, Menu, X, ChevronDown, Globe } from "lucide-react";
import { usePathname } from "@/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/navigation";
import { MegaMenu } from "./MegaMenu";

interface HeaderProps {
  services: Array<{
    id: number | string;
    title: string;
    link?: string;
    available: boolean;
  }>;
  openContactModal: (source: string) => void;
}

const Header = ({ services, openContactModal }: HeaderProps) => {
  const { theme, setTheme, currentTheme } = useTheme();

  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesDropdownOpen, setIsMobileServicesDropdownOpen] =
    useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [_focusedServiceIndex, setFocusedServiceIndex] = useState(-1);
  const [focusedLangIndex, setFocusedLangIndex] = useState(-1);

  const langDropdownRef = useRef<HTMLDivElement>(null);
  const langButtonRef = useRef<HTMLButtonElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const scrollThreshold = 50;
  
  const changeLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  useEffect(() => {
    const handleClickOutsideServices = (event: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target as Node) &&
        servicesButtonRef.current &&
        !servicesButtonRef.current.contains(event.target as Node)
      ) {
        setIsServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideServices);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideServices);
    };
  }, []);

  useEffect(() => {
    const handleClickOutsideLang = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node) &&
        langButtonRef.current &&
        !langButtonRef.current.contains(event.target as Node)
      ) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideLang);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideLang);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < scrollThreshold) {
        setHeaderVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    setLastScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, scrollThreshold]);

  // Keyboard navigation for services dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isServicesDropdownOpen) return;

      const availableServices = services.filter((s) => s.available);
      
      switch (e.key) {
        case "Escape":
          setIsServicesDropdownOpen(false);
          servicesButtonRef.current?.focus();
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedServiceIndex((prev) =>
            prev < availableServices.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedServiceIndex((prev) =>
            prev > 0 ? prev - 1 : availableServices.length - 1
          );
          break;
        case "Home":
          e.preventDefault();
          setFocusedServiceIndex(0);
          break;
        case "End":
          e.preventDefault();
          setFocusedServiceIndex(availableServices.length - 1);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isServicesDropdownOpen, services]);

  // Keyboard navigation for language dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLangDropdownOpen) return;

      switch (e.key) {
        case "Escape":
          setIsLangDropdownOpen(false);
          langButtonRef.current?.focus();
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedLangIndex((prev) =>
            prev < languages.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedLangIndex((prev) =>
            prev > 0 ? prev - 1 : languages.length - 1
          );
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLangDropdownOpen]);

  // Reset focus index when dropdowns close
  useEffect(() => {
    if (!isServicesDropdownOpen) setFocusedServiceIndex(-1);
  }, [isServicesDropdownOpen]);

  useEffect(() => {
    if (!isLangDropdownOpen) setFocusedLangIndex(-1);
  }, [isLangDropdownOpen]);

  const navLinks = [
    { href: "/", label: t("header.inicio") },
    { href: "/quienes-somos", label: t("header.quienesSomos") },
    { href: "/recursos", label: t("header.recursos") },
  ];

  const languages = [
    { code: "es", name: "Español (MX)", flag: "🇲🇽" },
    { code: "en", name: "English (US)", flag: "🇺🇸" },
    { code: "pt", name: "Português (BR)", flag: "🇧🇷", disabled: false },
  ];

  const handleLanguageChange = (langCode: string) => {
    if (languages.find((lang) => lang.code === langCode && lang.disabled)) {
      return;
    }
    changeLocale(langCode);
    setIsLangDropdownOpen(false);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const lineColorPurple = theme === "dark" ? "#A855F7" : "#9333EA";
  const lineColorMagenta = theme === "dark" ? "#E879F9" : "#D946EF";
  const lineColorCyan = theme === "dark" ? "#06B6D4" : "#0EA5E9";

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        {t("header.skipToContent")}
      </a>
      
      <nav
        role="navigation"
        aria-label={t("header.mainNavigation")}
        className={`fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/60 dark:border-gray-800/60 backdrop-blur-md 
                   transition-all duration-300 ease-in-out 
                   ${headerVisible ? "translate-y-0" : "-translate-y-full"}`}
        style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
      >
        <div className="container mx-auto px-8 py-3">
        <div className="flex justify-between items-center gap-8">
          <Link
            href="/"
            className="flex items-center space-x-2.5 group cursor-pointer"
          >
            <div className="relative">
              <svg
                width="28"
                height="28"
                viewBox="0 0 100 100"
                className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              >
                <defs>
                  <linearGradient
                    id="aurhoraLogoGradientHeader"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor={lineColorMagenta} />
                    <stop offset="50%" stopColor={lineColorPurple} />
                    <stop offset="100%" stopColor={lineColorCyan} />
                  </linearGradient>
                </defs>
                <path
                  d="M50 10 L10 90 L30 90 L45 40 L55 40 L70 90 L90 90 Z"
                  fill="url(#aurhoraLogoGradientHeader)"
                />
              </svg>
            </div>
            <div className="flex items-baseline">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">
                Aurhora
              </h1>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1.5">
                Agency
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                  pathname === link.href 
                    ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800/80" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/40"
                }`}
              >
                {link.label}
              </a>
            ))}

            <div className="relative">
              <button
                ref={servicesButtonRef}
                onClick={() =>
                  setIsServicesDropdownOpen(!isServicesDropdownOpen)
                }
                aria-expanded={isServicesDropdownOpen}
                aria-controls="mega-menu"
                aria-haspopup="true"
                aria-label={t("header.serviciosMenu")}
                className={`flex items-center text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none ${
                  pathname.startsWith("/servicios")
                    ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800/80"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/40"
                }`}
              >
                {t("header.servicios")}
                <ChevronDown
                  className={`w-4 h-4 ml-1.5 transition-transform duration-300 ${isServicesDropdownOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </div>

            <button
              onClick={() => openContactModal("header_desktop_contacto")}
              className="text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/40 cursor-pointer"
            >
              {t("header.contacto")}
            </button>

            <div className="relative">
              <button
                ref={langButtonRef}
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                aria-label={t("header.cambiarIdioma")}
                aria-expanded={isLangDropdownOpen}
                aria-controls="language-dropdown-menu"
                aria-haspopup="true"
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 hover:bg-gray-200 dark:hover:bg-gray-700/80 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2"
                style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
              >
                <Globe className="w-4.5 h-4.5 text-gray-700 dark:text-gray-300" aria-hidden="true" />
              </button>
              {isLangDropdownOpen && (
                <div
                  ref={langDropdownRef}
                  id="language-dropdown-menu"
                  role="menu"
                  aria-label={t("header.idioma")}
                  className="absolute top-full right-0 mt-2 w-52 bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700/60 rounded-xl py-2 z-50 backdrop-blur-md"
                  style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                >
                  {languages.map((lang, index) => {
                    const isFocused = focusedLangIndex === index;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        onMouseEnter={() => setFocusedLangIndex(index)}
                        disabled={lang.disabled}
                        role="menuitem"
                        tabIndex={isFocused ? 0 : -1}
                        ref={(el) => {
                          if (isFocused && el) el.focus();
                        }}
                        aria-label={`${t("header.cambiarIdioma")} ${lang.name}`}
                        aria-current={locale === lang.code ? "true" : "false"}
                        className={`w-full text-left px-4 py-2.5 text-sm flex items-center rounded-lg mx-1
                                   ${
                                     lang.disabled
                                       ? "opacity-50 cursor-not-allowed text-gray-400 dark:text-gray-600"
                                       : locale === lang.code
                                         ? "text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 font-medium"
                                         : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                                   } 
                                   focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-inset
                                   transition-all duration-150`}
                      >
                        <span className="mr-3 text-lg" aria-hidden="true">{lang.flag}</span>
                        <span className="flex-1">{lang.name}</span>
                        {locale === lang.code && (
                          <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={theme === "dark" ? t("header.switchToLight") : t("header.switchToDark")}
              aria-pressed={theme === "dark"}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 hover:bg-gray-200 dark:hover:bg-gray-700/80 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2"
              style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
            >
              {theme === "dark" ? (
                <Sun className="w-4.5 h-4.5 text-yellow-500 dark:text-yellow-400" aria-hidden="true" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-purple-600 dark:text-purple-400" aria-hidden="true" />
              )}
            </button>

            <Link
              href="/login"
              className="relative px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 text-sm font-semibold text-white hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group"
              style={{ boxShadow: '0 2px 4px rgba(168, 85, 247, 0.15)' }}
            >
              <span className="relative z-10">{t("header.login")}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? t("header.closeMenu") : t("header.openMenu")}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 hover:bg-gray-200 dark:hover:bg-gray-700/80 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2"
              style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu - Optimizado para touch */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            role="menu"
            aria-label={t("header.mobileMenu")}
            className={`absolute top-full left-0 right-0 ${currentTheme.card} border-b ${currentTheme.border} shadow-xl py-4 px-4 md:hidden max-h-[calc(100vh-80px)] overflow-y-auto`}
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`${currentTheme.text} ${pathname === link.href ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" : ""} text-center font-medium py-3.5 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 active:scale-[0.98]`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              <div className="relative">
                <button
                  onClick={() =>
                    setIsMobileServicesDropdownOpen(
                      !isMobileServicesDropdownOpen
                    )
                  }
                  className={`w-full flex items-center justify-center ${currentTheme.text} ${pathname.startsWith("/servicios") ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" : ""} font-medium py-3.5 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 active:scale-[0.98]`}
                >
                  {t("header.servicios")}
                  <ChevronDown
                    className={`w-5 h-5 ml-2 transition-transform duration-200 ${isMobileServicesDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isMobileServicesDropdownOpen && (
                  <div
                    className={`mt-2 py-2 ${currentTheme.card} border ${currentTheme.border} rounded-xl shadow-lg`}
                  >
                    {services
                      .filter((service) => service.available)
                      .map((service) => (
                        <a
                          key={service.id || service.title}
                          href={service.link || "#"}
                          onClick={() => {
                            setIsMobileServicesDropdownOpen(false);
                            setIsMenuOpen(false);
                          }}
                          className={`block text-center py-3 px-4 text-sm ${currentTheme.text} transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700`}
                        >
                          {service.title}
                        </a>
                      ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  openContactModal("header_mobile_contacto");
                  setIsMenuOpen(false);
                }}
                className={`${currentTheme.text} text-center font-medium py-3.5 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 active:scale-[0.98]`}
              >
                {t("header.contacto")}
              </button>

              {/* Separator */}
              <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

              {/* Language selector for mobile */}
              <div className="py-2">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 text-center mb-2 uppercase tracking-wider">
                  {t("header.idioma")}
                </p>
                <div className="flex justify-center gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      disabled={lang.disabled}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                        ${locale === lang.code 
                          ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 ring-2 ring-purple-500/30" 
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }
                        ${lang.disabled ? "opacity-50 cursor-not-allowed" : "active:scale-[0.98]"}
                      `}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme toggle for mobile */}
              <div className="flex justify-center py-2">
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                  className="flex items-center gap-3 px-5 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700/60 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 active:scale-[0.98]"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Modo Claro</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Modo Oscuro</span>
                    </>
                  )}
                </button>
              </div>

              {/* Login button */}
              <Link
                href="/login"
                className="relative text-center px-5 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 text-base font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-200 overflow-hidden active:scale-[0.98]"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10">{t("header.login")}</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
    
    {/* Mega Menu */}
    <MegaMenu 
      isOpen={isServicesDropdownOpen} 
      onClose={() => setIsServicesDropdownOpen(false)}
      locale={locale}
    />
    </>
  );
};

export default Header;
