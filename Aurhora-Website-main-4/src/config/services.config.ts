// src/config/services.config.ts
import { Globe, Rocket, Code, CheckCircle, TrendingUp, Users } from 'lucide-react';

export interface Service {
  id: string | number;
  title: string;
  link: string;
  available: boolean;
  description: string;
  icon?: any; // Para los iconos de Lucide
  bgColor?: string;
  borderColor?: string;
  iconColor?: string;
  linkText?: string;
  features?: string[];
  price?: string;
}

export const services: Service[] = [
  {
    id: 6,
    title: "GoDigital Suite",
    description: 'Ecosistema digital integral <strong class="text-cyan-400">"llave en mano"</strong> con presencia online profesional y gestión de clientes. <strong class="text-cyan-400">Implementación en 1-2 semanas</strong>.',
    link: "/servicios/godigital",
    linkText: "Conocer GoDigital",
    icon: Globe,
    bgColor: "bg-cyan-900/50",
    borderColor: "border-cyan-700/30",
    iconColor: "text-cyan-500",
    available: true,
    features: [
      'Sitio web profesional optimizado',
      'Sistema de gestión de clientes (CRM)',
      'Herramientas de marketing digital',
      'Análisis y reportes en tiempo real',
      'Soporte y mantenimiento incluido',
      'Capacitación para tu equipo'
    ],
    price: 'Desde $25,000 MXN'
  },
  {
    id: 2,
    title: "Estrategia de Innovación y Transformación Digital",
    description: "Co-creamos tu roadmap tecnológico y digital, identificando oportunidades de innovación para acelerar resultados.",
    link: "/servicios/transformacion-digital",
    linkText: "Impulsar Innovación",
    icon: Rocket,
    bgColor: "bg-blue-900/50",
    borderColor: "border-blue-700/30",
    iconColor: "text-blue-500",
    available: true,
    features: [
      'Diagnóstico de madurez digital',
      'Diseño de roadmap estratégico',
      'Identificación de quick wins',
      'Plan de implementación por fases',
      'Gestión del cambio organizacional',
      'Medición de impacto y ROI'
    ],
    price: 'Consultoría desde $50,000 MXN'
  },
  {
    id: 3,
    title: "Desarrollo de Software y Productos Digitales",
    description: 'Diseñamos, <strong class="text-purple-400">construimos y desplegamos</strong> software a medida y productos digitales innovadores que potencian tu estrategia.',
    link: "/servicios/desarrollo-software",
    linkText: "Explorar Desarrollo",
    icon: Code,
    bgColor: "bg-purple-900/50",
    borderColor: "border-purple-700/30",
    iconColor: "text-purple-500",
    available: true,
    features: [
      'Desarrollo de aplicaciones web',
      'Plataformas SaaS personalizadas',
      'APIs y microservicios',
      'Integración de sistemas',
      'DevOps y CI/CD',
      'Mantenimiento y soporte'
    ],
    price: 'Proyectos desde $80,000 MXN'
  },
  {
    id: 1,
    title: "Optimización de Procesos y Calidad",
    description: "Diseñamos e implementamos SGC (ej. ISO), optimizando tu operación para la excelencia y certificaciones.",
    link: "/servicios/optimizacion-procesos",
    linkText: "Descubrir Optimización",
    icon: CheckCircle,
    bgColor: "bg-emerald-900/50",
    borderColor: "border-emerald-700/30",
    iconColor: "text-emerald-500",
    available: true,
    features: [
      'Mapeo y rediseño de procesos',
      'Implementación de SGC ISO',
      'Automatización de workflows',
      'Gestión documental',
      'Auditorías internas',
      'Preparación para certificaciones'
    ],
    price: 'Desde $60,000 MXN'
  },
  {
    id: 4,
    title: "Impulso y Marketing Digital",
    description: 'Definimos y <strong class="text-pink-400">gestionamos</strong> estrategias de marketing digital para lanzar y posicionar tus productos y servicios.',
    link: "/servicios/impulso-marketing",
    linkText: "Ver Estrategias",
    icon: TrendingUp,
    bgColor: "bg-pink-900/50",
    borderColor: "border-pink-700/30",
    iconColor: "text-pink-500",
    available: true,
    features: [
      'Estrategia de marca digital',
      'Gestión de redes sociales',
      'Campañas de publicidad digital',
      'SEO y SEM',
      'Email marketing y automatización',
      'Análisis y optimización continua'
    ],
    price: 'Planes desde $15,000 MXN/mes'
  },
  {
    id: 5,
    title: "Cultura Ágil y Transformación Organizacional",
    description: '<strong class="text-amber-400">Trabajamos desde adentro con tus equipos</strong> para implementar metodologías ágiles, gestionar el cambio y fomentar una cultura de innovación sostenible.',
    link: "/servicios/cultura-agil",
    linkText: "Transformar Equipos",
    icon: Users,
    bgColor: "bg-amber-900/50",
    borderColor: "border-amber-700/30",
    iconColor: "text-amber-500",
    available: true,
    features: [
      'Implementación de Scrum/Kanban',
      'Coaching de equipos ágiles',
      'Gestión del cambio cultural',
      'Formación y capacitación',
      'Métricas de agilidad',
      'Transformación organizacional'
    ],
    price: 'Programas desde $40,000 MXN'
  }
];

// Función helper para obtener solo servicios disponibles
export const getAvailableServices = () => {
  return services.filter(service => service.available);
};

// Función helper para obtener un servicio por ID
export const getServiceById = (id: string | number) => {
  return services.find(service => service.id === id);
};

// Función para obtener servicios con colores dinámicos según el tema
export const getServicesWithTheme = (theme: 'light' | 'dark') => {
  return services.map(service => ({
    ...service,
    bgColor: theme === 'dark' ? service.bgColor : service.bgColor?.replace('900/50', '100'),
    borderColor: theme === 'dark' ? service.borderColor : service.borderColor?.replace('700/30', '300'),
  }));
};