// src/context/ThemeContext.tsx
"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

// 1. Definición del tipo para los objetos de tema
export type AppTheme = {
  card: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  highlight: string;
  gradient: string;
  gradientText: string;
  bgSecondary: string;
  bg: string;
  hover: string;
  inputBg: string;
  ctaButton: string;
  // Añade cualquier otra propiedad que necesites para tu tema
};

// 2. Definiciones de los temas usando clases estándar de Tailwind
const lightTheme: AppTheme = {
  card: "bg-white",
  text: "text-gray-800",
  textSecondary: "text-gray-600",
  textMuted: "text-gray-500",
  border: "border-gray-300",
  highlight: "text-purple-600",
  gradient: "from-cyan-500 via-purple-500 to-pink-500",
  gradientText: "from-cyan-600 via-purple-600 to-pink-600",
  bgSecondary: "bg-gray-50",
  bg: "bg-gray-50",
  hover: "hover:bg-gray-100",
  inputBg: "bg-gray-50 border-gray-300",
  ctaButton:
    "bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white",
};

const darkTheme: AppTheme = {
  card: "bg-gray-800",
  text: "text-gray-100",
  textSecondary: "text-gray-400",
  textMuted: "text-gray-500",
  border: "border-gray-700",
  highlight: "text-cyan-400",
  gradient: "from-cyan-400 via-purple-500 to-pink-500",
  gradientText: "from-cyan-400 via-purple-400 to-pink-400",
  bgSecondary: "bg-gray-900",
  bg: "bg-gray-900",
  hover: "hover:bg-gray-700",
  inputBg: "bg-gray-700 border-gray-600",
  ctaButton:
    "bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-gray-900 font-semibold",
};

// 3. Definición del tipo para el valor del Contexto
interface ThemeContextType {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  currentTheme: AppTheme;
  isThemeReady: boolean;
}

// 4. Creación del Contexto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 5. Creación del Proveedor del Tema (ThemeProvider)
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<"light" | "dark">("dark");
  const [isThemeReady, setIsThemeReady] = useState(false);

  useEffect(() => {
    // Inicializar el tema desde localStorage o preferencia del sistema
    const storedTheme = localStorage.getItem("aurhora-website-theme") as
      | "light"
      | "dark"
      | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    // Si no hay tema guardado y no hay preferencia del sistema, usar dark
    const initialTheme =
      storedTheme ||
      (prefersDark !== undefined ? (prefersDark ? "dark" : "light") : "dark");

    setThemeState(initialTheme);

    // Aplicar la clase dark al documento
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Marcar que el tema está listo
    setIsThemeReady(true);
  }, []);

  const setTheme = (newTheme: "light" | "dark") => {
    localStorage.setItem("aurhora-website-theme", newTheme);
    setThemeState(newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, currentTheme, isThemeReady }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// 6. Hook personalizado para usar el contexto fácilmente
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
