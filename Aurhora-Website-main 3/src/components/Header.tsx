// components/Header.tsx
'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Menu, X, ChevronDown, Globe } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext'; // CORREGIDO: usar contexto en lugar de props
import { useI18n, useCurrentLocale, useChangeLocale } from '@/context/I18nContext';

interface HeaderProps {
  // ELIMINADO: props de theme ya que ahora vienen del contexto
  services: Array<{ id: number | string; title: string; link?: string; available: boolean; }>;
  openContactModal: (source: string) => void;
}

const Header: React.FC<HeaderProps> = ({ services, openContactModal }) => {
  // CORREGIDO: usar contexto de tema
  const { theme, setTheme, currentTheme } = useTheme();
  
  const t = useI18n();
  const locale = useCurrentLocale();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesDropdownOpen, setIsMobileServicesDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const langButtonRef = useRef<HTMLButtonElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const scrollThreshold = 50;
  const changeLocale = useChangeLocale();

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
    document.addEventListener('mousedown', handleClickOutsideServices);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideServices);
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
    document.addEventListener('mousedown', handleClickOutsideLang);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideLang);
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, scrollThreshold]);

  const navLinks = [
    { href: "/", label: t('header.inicio') },
    { href: "/quienes-somos", label: t('header.quienesSomos') },
    { href: "/recursos", label: t('header.recursos') },
  ];

  const languages = [
    { code: 'es-MX', name: 'Español (MX)', flag: '🇲🇽' },
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
    { code: 'pt-BR', name: 'Português (BR)', flag: '🇧🇷', disabled: false },
  ];

  const handleLanguageChange = (langCode: string) => {
    if (languages.find(lang => lang.code === langCode && lang.disabled)) {
      return;
    }
    changeLocale(langCode as 'es-MX' | 'en-US' | 'pt-BR');
    setIsLangDropdownOpen(false);
    if (isMenuOpen) setIsMenuOpen(false); 
  };

  const lineColorPurple = theme === 'dark' ? '#A855F7' : '#9333EA';
  const lineColorMagenta = theme === 'dark' ? '#E879F9' : '#D946EF';
  const lineColorCyan = theme === 'dark' ? '#06B6D4' : '#0EA5E9';

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 ${currentTheme.card} border-b ${currentTheme.border} shadow-xl backdrop-blur-xl 
                 transition-transform duration-300 ease-in-out 
                 ${headerVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className={`absolute -inset-2 bg-gradient-to-r ${currentTheme.gradient} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-full`} />
              <svg width="44" height="44" viewBox="0 0 100 100" className="relative transform group-hover:rotate-12 transition-transform duration-300">
                <defs>
                  <linearGradient id="aurhoraLogoGradientHeader" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={lineColorMagenta} />
                    <stop offset="50%" stopColor={lineColorPurple} />
                    <stop offset="100%" stopColor={lineColorCyan} />
                  </linearGradient>
                </defs>
                <path d="M50 10 L10 90 L30 90 L45 40 L55 40 L70 90 L90 90 Z"
                      fill="url(#aurhoraLogoGradientHeader)" />
              </svg>
            </div>
            <div className="flex items-baseline">
              <h1 className={`text-2xl font-bold bg-gradient-to-r ${currentTheme.gradientText} bg-clip-text text-transparent`}>
                Aurhora
              </h1>
              <span className={`text-2xl font-bold ${currentTheme.text} ml-2`}>
                Agency
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            {navLinks.map(link => (
              <a 
                key={link.href}
                href={link.href} 
                className={`${currentTheme.text} ${pathname === link.href ? currentTheme.highlight : `hover:${currentTheme.highlight}`} transition-colors duration-300 font-medium px-2 lg:px-3 py-2`}
              >
                {link.label}
              </a>
            ))}
            
            <div className="relative">
              <button
                ref={servicesButtonRef}
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                className={`flex items-center ${currentTheme.text} ${pathname.startsWith('/servicios') ? currentTheme.highlight : `hover:${currentTheme.highlight}`} transition-colors duration-300 font-medium focus:outline-none px-2 lg:px-3 py-2`}
              >
                {t('header.servicios')}
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isServicesDropdownOpen && (
                <div
                  ref={servicesDropdownRef}
                  className={`absolute top-full mt-3 w-64 ${currentTheme.card} border ${currentTheme.border} rounded-lg shadow-xl py-2 z-50 transition-all duration-300 ease-out transform ${isServicesDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                  style={{ left: '50%', transform: 'translateX(-50%)' }}
                >
                  {services.filter(service => service.available).map((service) => (
                    <a
                      key={service.id || service.title}
                      href={service.link || '#'}
                      onClick={() => setIsServicesDropdownOpen(false)}
                      className={`block px-4 py-2.5 text-sm ${currentTheme.text} transition-colors duration-200 ${
                        theme === 'dark' 
                          ? 'hover:text-cyan-300 hover:bg-gray-700' 
                          : 'hover:text-purple-700 hover:bg-gray-100'
                      }`}
                    >
                      {service.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => openContactModal('header_desktop_contacto')}
              className={`${currentTheme.text} hover:${currentTheme.highlight} transition-colors duration-300 font-medium px-2 lg:px-3 py-2 cursor-pointer`}
            >
              {t('header.contacto')}
            </button>
            
            <div className="relative">
              <button
                ref={langButtonRef}
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                aria-label={t('header.cambiarIdioma')}
                className={`p-2 rounded-xl ${currentTheme.card} border ${currentTheme.border} hover:scale-110 transition-all duration-300 shadow-sm ${currentTheme.text}`}
              >
                <Globe className="w-5 h-5" />
              </button>
              {isLangDropdownOpen && (
                <div
                  ref={langDropdownRef}
                  className={`absolute top-full right-0 mt-3 w-48 ${currentTheme.card} border ${currentTheme.border} rounded-lg shadow-xl py-1 z-50 transition-all duration-300 ease-out transform ${isLangDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      disabled={lang.disabled}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center ${currentTheme.text} 
                                 ${lang.disabled 
                                   ? 'opacity-50 cursor-not-allowed' 
                                   : (theme === 'dark' ? 'hover:text-cyan-300 hover:bg-gray-700' : 'hover:text-purple-700 hover:bg-gray-100')
                                 } 
                                 transition-colors duration-200`}
                    >
                      <span className="mr-2 text-lg">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className={`p-2 rounded-xl ${currentTheme.card} border ${currentTheme.border} hover:scale-110 transition-all duration-300 shadow-sm`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-purple-600" />}
            </button>
            
            <a
              href="/login"
              className={`px-5 py-2 rounded-xl bg-gradient-to-r ${currentTheme.gradient} text-sm font-semibold hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-lg relative overflow-hidden group ${theme === 'dark' ? 'text-gray-900' : 'text-white'}`}
            >
              <span className="relative z-10">{t('header.login')}</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-xl border ${currentTheme.border} hover:scale-110 transition-all duration-300 shadow-sm ${currentTheme.text}`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menú Móvil */}
      {isMenuOpen && (
        <div className={`md:hidden ${currentTheme.bgSecondary} border-t ${currentTheme.border} absolute w-full shadow-xl z-30`}> 
          <div className="px-6 py-4 space-y-1">
            {navLinks.map(link => (
               <a 
                key={`mobile-${link.href}`}
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2.5 ${currentTheme.text} ${pathname === link.href ? currentTheme.highlight : `hover:${currentTheme.highlight}`} transition-colors duration-300 font-medium`}
              >
                {link.label}
              </a>
            ))}
            
            <div>
              <button 
                onClick={() => setIsMobileServicesDropdownOpen(!isMobileServicesDropdownOpen)}
                className={`w-full flex justify-between items-center py-2.5 ${currentTheme.text} ${pathname.startsWith('/servicios') ? currentTheme.highlight : `hover:${currentTheme.highlight}`} transition-colors duration-300 font-medium text-left`}
              >
                {t('header.servicios')}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileServicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMobileServicesDropdownOpen && (
                <div className="pl-4 mt-1 mb-2 border-l-2 border-gray-500/50">
                  {services.filter(service => service.available).map((service) => (
                    <a
                      key={`mobile-service-${service.id || service.title}`}
                      href={service.link || '#'}
                      onClick={() => setIsMenuOpen(false)} 
                      className={`block py-2 text-sm ${currentTheme.textSecondary} transition-colors duration-200 ${
                        theme === 'dark' 
                          ? 'hover:text-cyan-300 hover:bg-gray-700' 
                          : 'hover:text-purple-700 hover:bg-gray-100'
                      }`}
                    >
                      {service.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => { openContactModal('menu_mobile_contacto'); setIsMenuOpen(false); }}
              className={`block w-full text-left py-2.5 ${currentTheme.text} hover:${currentTheme.highlight} transition-colors duration-300 font-medium cursor-pointer`}
            >
              {t('header.contacto')}
            </button>
            
            <div className="pt-2">
              <p className={`px-3 py-2 text-xs uppercase ${currentTheme.textSecondary}`}>{t('header.idioma')}</p>
              {languages.map((lang) => (
                <button
                  key={`mobile-lang-${lang.code}`}
                  onClick={() => handleLanguageChange(lang.code)}
                  disabled={lang.disabled}
                  className={`w-full text-left px-3 py-2.5 text-sm flex items-center rounded-md ${currentTheme.text} 
                              ${lang.disabled 
                                ? 'opacity-50 cursor-not-allowed' 
                                : (theme === 'dark' ? 'hover:text-cyan-300 hover:bg-gray-700' : 'hover:text-purple-700 hover:bg-gray-100')
                              } 
                              transition-colors duration-200`}
                >
                  <span className="mr-3 text-lg">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>

            <a
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className={`block w-full text-center mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r ${currentTheme.gradient} text-sm font-semibold hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-lg relative overflow-hidden group ${theme === 'dark' ? 'text-gray-900' : 'text-white'}`}
            >
              {t('header.login')}
            </a>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 w-full h-0.5">
        <div
          className="h-full animate-flow-line"
          style={{
            width: '100%',
            backgroundImage: `linear-gradient(to right, ${lineColorPurple} 0%, ${lineColorMagenta} 25%, ${lineColorCyan} 50%, ${lineColorMagenta} 75%, ${lineColorPurple} 100%)`,
            backgroundSize: '300% 100%',
          }}
        />
      </div>
    </nav>
  );
};

export default Header;