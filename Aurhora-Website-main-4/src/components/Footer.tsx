// src/components/Footer.tsx
"use client";

import React from "react";
import { Instagram, Linkedin, Facebook } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useI18n } from "@/context/I18nContext";

const Footer = () => {
  const { theme, currentTheme } = useTheme();
  const t = useI18n();

  if (!currentTheme) {
    return null;
  }

  return (
    <footer
      className={`py-12 border-t backdrop-blur-xl relative z-10 overflow-hidden`}
      style={{
        backgroundColor:
          theme === "dark"
            ? "rgba(17, 24, 39, 0.85)"
            : "rgba(255, 255, 255, 0.85)",
        borderTopColor:
          theme === "dark"
            ? "rgba(75, 85, 99, 0.3)"
            : "rgba(209, 213, 219, 0.5)",
      }}
    >
      {/* Gradiente sutil de fondo */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className={`absolute inset-0 bg-gradient-to-t ${
            theme === "dark"
              ? "from-gray-900/20 via-transparent to-transparent"
              : "from-gray-50/40 via-transparent to-transparent"
          }`}
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Columna 1: Logo y Empresa */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2 mb-3">
              <svg
                width="28"
                height="28"
                viewBox="0 0 100 100"
                className="relative"
              >
                <defs>
                  <linearGradient
                    id="aurhoraLogoGradientFooter"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor={theme === "dark" ? "#E879F9" : "#D946EF"}
                    />
                    <stop
                      offset="50%"
                      stopColor={theme === "dark" ? "#A855F7" : "#9333EA"}
                    />
                    <stop
                      offset="100%"
                      stopColor={theme === "dark" ? "#06B6D4" : "#0EA5E9"}
                    />
                  </linearGradient>
                </defs>
                <path
                  d="M50 10 L10 90 L30 90 L45 40 L55 40 L70 90 L90 90 Z"
                  fill="url(#aurhoraLogoGradientFooter)"
                />
              </svg>
              <span
                className={`text-2xl font-extrabold bg-gradient-to-r ${currentTheme.gradientText} bg-clip-text text-transparent`}
              >
                Aurhora
              </span>
            </div>
            <p
              className={`text-sm ${currentTheme.textSecondary} text-center md:text-left`}
            >
              {t("footer.tagline")}
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos / Legales */}
          <div className="flex flex-col items-center md:items-start">
            <h5
              className={`text-lg font-semibold ${currentTheme.text} mb-3 text-center md:text-left`}
            >
              {t("footer.legal")}
            </h5>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <a
                  href="/aviso-privacidad"
                  className={`text-sm ${currentTheme.textSecondary} hover:${currentTheme.highlight} transition duration-300`}
                >
                  {t("footer.privacy")}
                </a>
              </li>
              <li>
                <a
                  href="/terminos-condiciones"
                  className={`text-sm ${currentTheme.textSecondary} hover:${currentTheme.highlight} transition duration-300`}
                >
                  {t("footer.terms")}
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Redes Sociales y Contacto */}
          <div className="flex flex-col items-center md:items-start">
            <h5
              className={`text-lg font-semibold ${currentTheme.text} mb-3 text-center md:text-left`}
            >
              {t("footer.follow")}
            </h5>
            <div className="flex justify-center md:justify-start space-x-5 mb-4">
              <a
                href="https://linkedin.com/company/aurhora-agency"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`transition-all duration-300 transform hover:scale-110 ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-cyan-400"
                    : "text-gray-500 hover:text-purple-600"
                }`}
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com/aurhora.agency"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={`transition-all duration-300 transform hover:scale-110 ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-pink-400"
                    : "text-gray-500 hover:text-pink-600"
                }`}
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://facebook.com/aurhora.agency"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={`transition-all duration-300 transform hover:scale-110 ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-blue-400"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
            <p
              className={`text-sm ${currentTheme.textSecondary} text-center md:text-left`}
            >
              <a
                href="mailto:contacto@aurhora.it.com"
                className={`hover:${currentTheme.highlight} transition duration-300`}
              >
                contacto@aurhora.it.com
              </a>
            </p>
          </div>
        </div>

        <div
          className={`border-t ${currentTheme.border} pt-8 mt-8 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0`}
        >
          <p
            className={`text-xs ${currentTheme.textMuted} text-center md:text-left`}
          >
            © {new Date().getFullYear()} {t("footer.copyright")}
          </p>
          <p className={`text-xs ${currentTheme.textMuted}`}>
            {t("footer.designed")}{" "}
            <span
              className={`${theme === "dark" ? "text-pink-400" : "text-pink-600"}`}
            >
              ❤
            </span>{" "}
            {t("footer.by")}
          </p>
        </div>
      </div>

      {/* Línea decorativa inferior */}
      <div className="absolute bottom-0 left-0 w-full h-0.5">
        <div
          className="h-full"
          style={{
            width: "100%",
            backgroundImage: `linear-gradient(to right, ${
              theme === "dark" ? "#A855F7" : "#9333EA"
            } 0%, ${theme === "dark" ? "#E879F9" : "#D946EF"} 25%, ${
              theme === "dark" ? "#06B6D4" : "#0EA5E9"
            } 50%, ${theme === "dark" ? "#E879F9" : "#D946EF"} 75%, ${
              theme === "dark" ? "#A855F7" : "#9333EA"
            } 100%)`,
            backgroundSize: "300% 100%",
            opacity: 0.6,
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
