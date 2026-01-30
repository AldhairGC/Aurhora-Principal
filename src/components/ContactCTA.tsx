"use client";

import React from "react";
import { Mail, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/context/ThemeContext";

interface ContactCTAProps {
  onScheduleClick: () => void;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ onScheduleClick }) => {
  const t = useTranslations();
  const { theme } = useTheme();

  return (
    <section
      id="contacto-cta"
      className="relative py-12 md:py-24 bg-white dark:bg-gray-900 overflow-hidden z-10"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div 
            className="relative rounded-2xl md:rounded-3xl overflow-hidden p-6 md:p-10 lg:p-16 text-center border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md shadow-xl md:shadow-2xl"
            style={{
              boxShadow: '0 20px 40px -10px rgba(124, 58, 237, 0.1)'
            }}
          >
            
            {/* Decoración de fondo sutil */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
            <div className="absolute -top-24 -right-24 w-48 md:w-64 h-48 md:h-64 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 md:w-64 h-48 md:h-64 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl" />

            {/* Contenido */}
            <div className="relative z-10 space-y-5 md:space-y-8">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
                {t("cta.title")}{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  {t("cta.impulse")}
                </span>{" "}
                {t("cta.vision")}
              </h3>
              
              <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                {t("cta.description")}
              </p>

              <div className="flex flex-col gap-3 md:gap-4 justify-center items-center pt-2 md:pt-4">
                <button
                  onClick={onScheduleClick}
                  className={`group relative w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 rounded-xl md:rounded-full font-bold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98] touch-manipulation overflow-hidden ${
                    theme === 'dark' 
                      ? 'bg-white text-gray-900' 
                      : 'bg-gray-900 text-white'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {t("cta.scheduleSession")}
                    <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                </button>
                
                <a
                  href="mailto:contacto@aurhora.it.com"
                  className="w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 rounded-xl md:rounded-full font-semibold text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] touch-manipulation"
                >
                  <Mail className="w-5 h-5" />
                  {t("cta.contact")}
                </a>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 md:mt-8">
                ¿Prefieres chatear?{" "}
                <a
                  href="https://wa.me/5215582991282"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 dark:text-purple-400 underline hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                >
                  Escríbenos por WhatsApp
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
