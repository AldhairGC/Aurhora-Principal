// src/components/ClientLayout.tsx
'use client';

import React from 'react';
import { useTheme } from "@/context/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Service {
  id: number | string;
  title: string;
  link?: string;
  available: boolean;
  description?: string;
}

interface ClientLayoutProps {
  children: React.ReactNode;
  services?: Service[];
  openContactModal?: (source: string) => void;
}

// Servicios por defecto si no se pasan desde el componente padre
const defaultServices: Service[] = [
  {
    id: 'godigital',
    title: "GoDigital Suite",
    link: "/servicios/godigital",
    available: true,
    description: 'Ecosistema digital integral llave en mano'
  },
  {
    id: 'transformacion-digital',
    title: "Estrategia de Innovación y Transformación Digital",
    link: "/servicios/transformacion-digital",
    available: true,
    description: "Co-creamos tu roadmap tecnológico"
  },
  {
    id: 'desarrollo-software',
    title: "Desarrollo de Software y Productos Digitales",
    link: "/servicios/desarrollo-software",
    available: true,
    description: 'Diseñamos, construimos y desplegamos software a medida'
  },
  {
    id: 'optimizacion-procesos',
    title: "Optimización de Procesos y Calidad",
    link: "/servicios/optimizacion-procesos",
    available: true,
    description: "Diseñamos e implementamos SGC"
  },
  {
    id: 'impulso-marketing',
    title: "Impulso y Marketing Digital",
    link: "/servicios/impulso-marketing",
    available: true,
    description: 'Definimos y gestionamos estrategias de marketing digital'
  },
  {
    id: 'cultura-agil',
    title: "Cultura Ágil y Transformación Organizacional",
    link: "/servicios/cultura-agil",
    available: true,
    description: 'Trabajamos desde adentro con tus equipos'
  },
];

export default function ClientLayout({ 
  children, 
  services = defaultServices,
  openContactModal 
}: ClientLayoutProps) {
  const { isThemeReady } = useTheme();

  // Función por defecto para openContactModal si no se proporciona
  const handleOpenContactModal = openContactModal || ((source: string) => {
    console.log(`Abriendo modal de contacto desde: ${source}`);
  });

  // Renderizar un estado de carga mientras el tema se inicializa
  if (!isThemeReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse">
          <svg width="60" height="60" viewBox="0 0 100 100" className="animate-spin">
            <defs>
              <linearGradient id="loadingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E879F9" />
                <stop offset="50%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="url(#loadingGradient)" 
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="70 200"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header
        services={services}
        openContactModal={handleOpenContactModal}
      />
      
      {children}
      
      <Footer />
    </>
  );
}