/**
 * NUEVA VERSIÓN DEL I18N CONTEXT CON TRADUCCIONES SEPARADAS
 * 
 * Este archivo demuestra cómo implementar el sistema de internacionalización
 * con traducciones separadas en archivos JSON.
 * 
 * PARA IMPLEMENTAR:
 * 1. Extraer todas las traducciones del I18nContext.tsx actual a archivos JSON
 * 2. Colocar los archivos en src/locales/[locale].json
 * 3. Renombrar este archivo a I18nContext.tsx (y hacer backup del anterior)
 * 4. Actualizar imports en los componentes si es necesario
 */

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Importar traducciones desde archivos JSON
// NOTA: Cuando migres, descomenta estas líneas:
// import esTranslations from "@/locales/es-MX.json";
// import enTranslations from "@/locales/en-US.json";
// import ptTranslations from "@/locales/pt-BR.json";

type Locale = "es-MX" | "en-US" | "pt-BR";

// Placeholder - reemplazar con imports reales
const translations: Record<Locale, Record<string, string>> = {
  "es-MX": {},
  "en-US": {},
  "pt-BR": {},
};

// Cuando migres, usa esto:
// const translations: Record<Locale, Record<string, string>> = {
//   "es-MX": esTranslations,
//   "en-US": enTranslations,
//   "pt-BR": ptTranslations,
// };

type TranslationKey = string;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey | string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>("es-MX");

  useEffect(() => {
    // Cargar el locale desde localStorage
    const savedLocale = localStorage.getItem("aurhora-locale") as Locale | null;
    if (savedLocale && ["es-MX", "en-US", "pt-BR"].includes(savedLocale)) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    localStorage.setItem("aurhora-locale", newLocale);
    setLocaleState(newLocale);
  };

  const t = (key: TranslationKey | string): string => {
    const translation = translations[locale]?.[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key} in locale: ${locale}`);
      return key;
    }
    return translation;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

// Hooks personalizados
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context.t;
};

export const useCurrentLocale = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useCurrentLocale must be used within an I18nProvider");
  }
  return context.locale;
};

export const useChangeLocale = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useChangeLocale must be used within an I18nProvider");
  }
  return context.setLocale;
};
