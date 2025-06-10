"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Check,
  Zap,
  Users,
  Globe,
  Shield,
  Clock,
  MessageSquare,
  TrendingUp,
  Lightbulb,
  Settings,
  BarChart3,
  Eye,
  Mail,
  Phone,
  Building,
  Send,
  CheckCircle as CheckCircleIcon,
  ChevronDown,
  X,
  Workflow,
  Cpu,
  Smartphone as Mobile,
  Bot,
  Cog,
  Factory,
  Award,
  ClipboardCheck,
  SearchCheck,
  GitBranch,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useI18n } from "@/context/I18nContext";
import ClientLayout from "@/components/ClientLayout";

// Interfaces for the data types
interface Benefit {
  icon: React.ReactElement;
  title: string;
  description: string;
}

interface ProblemSolved {
  icon: React.ReactElement;
  title: string;
  description: string;
}

interface MethodologyTech {
  category: string;
  icon: React.ReactElement;
  items: string[];
  color: string;
}

interface OptimizationArea {
  icon: React.ReactElement;
  title: string;
  description: string;
  examples: string[];
}

interface IndustryCase {
  icon: React.ReactElement;
  industry: string;
  description: string;
  results: string[];
}

interface ProcessStep {
  icon: React.ReactElement;
  title: string;
  description: string;
  color: string;
}

interface Certification {
  icon: React.ReactElement;
  name: string;
  description: string;
  benefits: string[];
}

interface Testimonial {
  quote: string;
  name: string;
  company: string;
  industry: string;
  result: string;
  avatar: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  proceso: string;
  source?: string;
}

export default function ProcessOptimizationPage() {
  const { theme, currentTheme } = useTheme();
  const t = useI18n();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [visibleSections, setVisibleSections] = useState<
    Record<string, boolean>
  >({});
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollYValue, setScrollYValue] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    proceso: "",
    source: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setScrollYValue(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisibleSections((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () =>
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
  }, [isClient]);

  useEffect(() => {
    if (!isClient || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvasRef.current) return;
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];
    const particleCount = Math.min(35, Math.floor(window.innerWidth / 35));
    const connectionDistance = 110;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        vz: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 0.9 + 0.3,
        opacity: Math.random() * 0.25 + 0.05,
      });
    }

    let animationFrameId: number;
    const animate = () => {
      ctx.fillStyle =
        theme === "dark"
          ? "rgba(17, 24, 39, 0.025)"
          : "rgba(243, 244, 246, 0.025)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        if (particle.z < 1 || particle.z > 1000) particle.vz *= -1;

        const scale = 1000 / (1000 + particle.z);
        const x2d = (particle.x - canvas.width / 2) * scale + canvas.width / 2;
        const y2d =
          (particle.y - canvas.height / 2) * scale + canvas.height / 2;
        const size = particle.size * scale;

        if (size > 0.1) {
          ctx.beginPath();
          ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            x2d,
            y2d,
            0,
            x2d,
            y2d,
            size
          );
          gradient.addColorStop(
            0,
            theme === "dark"
              ? `rgba(34, 197, 94, ${particle.opacity * scale * 0.7})`
              : `rgba(59, 130, 246, ${particle.opacity * scale * 0.7})`
          );
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        particles.forEach((particle2, j) => {
          if (i < j) {
            const dx = particle.x - particle2.x;
            const dy = particle.y - particle2.y;
            const dz = particle.z - particle2.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance < connectionDistance) {
              const opacity =
                (1 - distance / connectionDistance) * 0.12 * scale;
              if (opacity > 0.01) {
                ctx.beginPath();
                ctx.moveTo(x2d, y2d);
                const scale2 = 1000 / (1000 + particle2.z);
                const x2d2 =
                  (particle2.x - canvas.width / 2) * scale2 + canvas.width / 2;
                const y2d2 =
                  (particle2.y - canvas.height / 2) * scale2 +
                  canvas.height / 2;
                ctx.lineTo(x2d2, y2d2);
                ctx.strokeStyle =
                  theme === "dark"
                    ? `rgba(34, 197, 94, ${opacity})`
                    : `rgba(59, 130, 246, ${opacity})`;
                ctx.lineWidth = 0.2;
                ctx.stroke();
              }
            }
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, isClient]);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // --- Data Definitions ---
  const differentiatingBenefits: Benefit[] = [
    {
      icon: <Settings className={`w-8 h-8 ${currentTheme.highlight}`} />,
      title: "Optimización Digital Inteligente",
      description:
        "Integramos tecnología BPM, BI y automatización que realmente transforma procesos, no solo los digitaliza superficialmente.",
    },
    {
      icon: <Users className={`w-8 h-8 ${currentTheme.highlight}`} />,
      title: "Alta Adopción del Personal",
      description:
        "Metodología probada que logra 90%+ de aceptación interna. Capacitamos para que tu equipo entienda y abrace el cambio.",
    },
    {
      icon: <GitBranch className={`w-8 h-8 ${currentTheme.highlight}`} />,
      title: "Flexibilidad Metodológica",
      description:
        "Adaptamos Lean, Six Sigma, Kaizen o Design Thinking según tu contexto. No imponemos metodologías rígidas.",
    },
    {
      icon: <Cpu className={`w-8 h-8 ${currentTheme.highlight}`} />,
      title: "Integración Tecnológica Avanzada",
      description:
        "Implementamos dashboards, workflows automatizados, RPA y analytics que proporcionan visibilidad y control total.",
    },
    {
      icon: <BarChart3 className={`w-8 h-8 ${currentTheme.highlight}`} />,
      title: "Resultados Medibles y Sostenibles",
      description:
        "Garantizamos mejoras del 25-40% en eficiencia con ROI claro y sistema de seguimiento para mantener las ganancias.",
    },
    {
      icon: <Award className={`w-8 h-8 ${currentTheme.highlight}`} />,
      title: "Preparación Eficiente para Certificación",
      description:
        "Te preparamos para ISO 9001 e ISO 27001 en 60% menos tiempo con documentación digital y auditorías internas automatizadas.",
    },
  ];

  const problemsSolved: ProblemSolved[] = [
    {
      icon: <Clock className={`w-10 h-10 ${currentTheme.highlight}`} />,
      title: "Procesos Ineficientes y Manuales",
      description:
        "Operaciones lentas que dependen de trabajo manual repetitivo, generando cuellos de botella y errores constantes.",
    },
    {
      icon: <Users className={`w-10 h-10 ${currentTheme.highlight}`} />,
      title: "Baja Adopción de Mejoras",
      description:
        "Cambios implementados que el personal no adopta o abandona después de pocas semanas, perdiendo toda la inversión.",
    },
    {
      icon: <Eye className={`w-10 h-10 ${currentTheme.highlight}`} />,
      title: "Falta de Visibilidad en Métricas",
      description:
        "Sin dashboards o indicadores claros para tomar decisiones basadas en datos reales de calidad y eficiencia.",
    },
    {
      icon: <MessageSquare className={`w-10 h-10 ${currentTheme.highlight}`} />,
      title: "Resistencia al Cambio Organizacional",
      description:
        "Equipos que rechazan nuevos procesos por falta de comprensión sobre los beneficios y relevancia del sistema.",
    },
    {
      icon: <Settings className={`w-10 h-10 ${currentTheme.highlight}`} />,
      title: "Sistemas de Calidad Desactualizados",
      description:
        "Procesos de control de calidad basados en papel, hojas de Excel y metodologías obsoletas que no escalan.",
    },
    {
      icon: <SearchCheck className={`w-10 h-10 ${currentTheme.highlight}`} />,
      title: "Preparación Deficiente para Certificaciones",
      description:
        "Meses de preparación caótica para auditorías, documentación incompleta y equipos no capacitados adecuadamente.",
    },
  ];

  const methodologiesTech: MethodologyTech[] = [
    {
      category: "Metodologías de Mejora",
      icon: <Lightbulb className="w-6 h-6" />,
      items: [
        "Lean Six Sigma Digital",
        "Kaizen Tecnológico",
        "Design Thinking",
        "Mejora Continua Ágil",
        "PDCA Automatizado",
      ],
      color: "green",
    },
    {
      category: "Tecnologías BPM",
      icon: <Workflow className="w-6 h-6" />,
      items: [
        "Process Mining",
        "Workflow Automation",
        "Business Rules Engine",
        "Process Analytics",
        "Digital Forms",
      ],
      color: "blue",
    },
    {
      category: "Analytics e Inteligencia",
      icon: <BarChart3 className="w-6 h-6" />,
      items: [
        "Power BI",
        "Tableau",
        "KPI Dashboards",
        "Predictive Analytics",
        "Real-time Monitoring",
      ],
      color: "purple",
    },
    {
      category: "Automatización",
      icon: <Bot className="w-6 h-6" />,
      items: [
        "RPA (Robotic Process)",
        "Smart Notifications",
        "Automated Reporting",
        "Alert Systems",
        "AI Quality Control",
      ],
      color: "cyan",
    },
  ];

  const optimizationAreas: OptimizationArea[] = [
    {
      icon: <Factory className="w-7 h-7" />,
      title: "Procesos Operativos",
      description:
        "Optimización de producción, logística y atención al cliente",
      examples: [
        "Lean Manufacturing",
        "Supply Chain Optimization",
        "Customer Service Excellence",
        "Quality Control Automation",
      ],
    },
    {
      icon: <ClipboardCheck className="w-7 h-7" />,
      title: "Gestión de Calidad",
      description: "Sistemas de control, auditorías y KPIs automatizados",
      examples: [
        "Automated Quality Control",
        "Digital Audits",
        "Real-time KPIs",
        "Compliance Tracking",
      ],
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Automatización Inteligente",
      description: "Workflows, reportes y alertas que funcionan solos",
      examples: [
        "Smart Workflows",
        "Automated Reports",
        "Intelligent Alerts",
        "Process Orchestration",
      ],
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: "Analytics y Métricas",
      description: "Dashboards ejecutivos e indicadores en tiempo real",
      examples: [
        "Executive Dashboards",
        "Predictive Analytics",
        "Performance Metrics",
        "Business Intelligence",
      ],
    },
  ];

  const optimizationProcess: ProcessStep[] = [
    {
      icon: <SearchCheck className={`w-10 h-10`} />,
      title: "Diagnóstico y Mapeo",
      description:
        "Análisis profundo de procesos actuales, identificación de cuellos de botella y oportunidades de mejora.",
      color: "green",
    },
    {
      icon: <Lightbulb className={`w-10 h-10`} />,
      title: "Diseño de Solución Digital",
      description:
        "Creación de procesos optimizados con tecnología integrada y metodologías adaptadas.",
      color: "blue",
    },
    {
      icon: <Users className={`w-10 h-10`} />,
      title: "Capacitación y Gestión del Cambio",
      description:
        "Formación intensiva del personal para garantizar comprensión y adopción total del nuevo sistema.",
      color: "purple",
    },
    {
      icon: <Cog className={`w-10 h-10`} />,
      title: "Implementación Tecnológica",
      description:
        "Despliegue de herramientas BPM, dashboards, automatizaciones y sistemas de monitoreo.",
      color: "cyan",
    },
    {
      icon: <Award className={`w-10 h-10`} />,
      title: "Preparación para Certificación",
      description:
        "Documentación digital completa y preparación de equipos para auditorías ISO exitosas.",
      color: "amber",
    },
  ];

  const industryCases: IndustryCase[] = [
    {
      icon: <Factory className={`w-8 h-8 ${currentTheme.highlight}`} />,
      industry: "Manufactura",
      description:
        "Control de calidad digital y lean manufacturing automatizado",
      results: [
        "50% reducción defectos",
        "30% mejora eficiencia",
        "Preparación ISO 9001 exitosa",
      ],
    },
    {
      icon: <Users className={`w-8 h-8 ${currentTheme.highlight}`} />,
      industry: "Servicios",
      description: "Optimización de experiencia cliente y eficiencia operativa",
      results: [
        "40 puntos mejora NPS",
        "35% reducción tiempo respuesta",
        "90% adopción interna",
      ],
    },
    {
      icon: <Globe className={`w-8 h-8 ${currentTheme.highlight}`} />,
      industry: "Retail",
      description: "Supply chain inteligente y customer experience optimizado",
      results: [
        "25% reducción inventario",
        "45% mejora fulfillment",
        "Real-time visibility",
      ],
    },
    {
      icon: <Shield className={`w-8 h-8 ${currentTheme.highlight}`} />,
      industry: "Tecnología",
      description: "Procesos de desarrollo ágil y seguridad de información",
      results: [
        "ISO 27001 certificado",
        "60% mejora time-to-market",
        "Zero security incidents",
      ],
    },
  ];

  const certifications: Certification[] = [
    {
      icon: <Award className="w-8 h-8" />,
      name: "ISO 9001:2015",
      description:
        "Sistema de Gestión de Calidad enfocado en satisfacción del cliente y mejora continua",
      benefits: [
        "Mejora imagen corporativa",
        "Acceso a nuevos mercados",
        "Optimización de procesos",
        "Reducción de costos operativos",
      ],
    },
    {
      icon: <Shield className="w-8 h-8" />,
      name: "ISO 27001:2013",
      description:
        "Sistema de Gestión de Seguridad de la Información para proteger activos digitales",
      benefits: [
        "Protección de información",
        "Cumplimiento normativo",
        "Confianza de clientes",
        "Gestión de riesgos cibernéticos",
      ],
    },
  ];

  const testimonials: Testimonial[] = [
    {
      quote:
        "En 4 meses optimizamos toda nuestra línea de producción. Lo increíble es que nuestro equipo adoptó los cambios naturalmente.",
      name: "Roberto Hernández",
      company: "TechManufactura SA",
      industry: "Manufactura",
      result: "50% reducción defectos",
      avatar: `https://placehold.co/100x100/${
        theme === "light" ? "E0E7FF" : "374151"
      }/${theme === "light" ? "4338CA" : "A5B4FC"}?text=RH&font=Inter`,
    },
    {
      quote:
        "Certificamos ISO 9001 en tiempo récord y nuestros clientes notaron inmediatamente la mejora en el servicio.",
      name: "María González",
      company: "ServiciosPlus",
      industry: "Servicios",
      result: "40 puntos mejora NPS",
      avatar: `https://placehold.co/100x100/${
        theme === "light" ? "D1FAE5" : "374151"
      }/${theme === "light" ? "059669" : "6EE7B7"}?text=MG&font=Inter`,
    },
    {
      quote:
        "La implementación de ISO 27001 fortaleció nuestra seguridad digital y nos abrió las puertas a clientes enterprise.",
      name: "Carlos Mendoza",
      company: "TechSecure Inc",
      industry: "Tecnología",
      result: "Zero incidentes seguridad",
      avatar: `https://placehold.co/100x100/${
        theme === "light" ? "FCE7F3" : "374151"
      }/${theme === "light" ? "DB2777" : "F9A8D4"}?text=CM&font=Inter`,
    },
  ];

  const faqItems: FAQItem[] = [
    {
      question:
        "¿Cuál es la diferencia con las consultorías tradicionales de calidad?",
      answer:
        "Nosotros integramos tecnología digital (BPM, BI, automatización) desde el inicio y nos enfocamos en alta adopción del personal. Las consultorías tradicionales suelen quedarse en documentación en papel y procesos manuales.",
    },
    {
      question:
        "¿Cuánto tiempo toma optimizar procesos y prepararse para certificación?",
      answer:
        "Típicamente 3-6 meses para optimización completa y preparación para certificación ISO. Nuestro enfoque digital acelera el proceso en 60% vs métodos tradicionales.",
    },
    {
      question: "¿Qué tecnologías integran en los procesos de calidad?",
      answer:
        "Utilizamos herramientas BPM, dashboards de BI (Power BI, Tableau), automatización RPA, sistemas de workflow y analytics predictivos. Todo adaptado a las necesidades específicas del proyecto.",
    },
    {
      question: "¿Cómo garantizan que el personal adopte los nuevos procesos?",
      answer:
        "Tenemos una metodología probada de gestión del cambio que incluye capacitación intensiva, comunicación de beneficios, gamificación y seguimiento personalizado. Logramos 90%+ de adopción.",
    },
    {
      question: "¿Trabajan solo con ISO 9001 e ISO 27001?",
      answer:
        "Actualmente nos especializamos en ISO 9001 (Calidad) e ISO 27001 (Seguridad de Información). Estas dos normas cubren la mayoría de necesidades de optimización de procesos y preparación para certificación.",
    },
  ];

  // Contact Form Logic
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.proceso) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }
    console.log("Formulario de optimización de procesos enviado:", formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setShowContactForm(false);
      setFormSubmitted(false);
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        empresa: "",
        proceso: "",
        source: "",
      });
    }, 5000);
  };

  const openContactModal = (source: string) => {
    setFormData((prev) => ({
      ...prev,
      nombre: "",
      email: "",
      telefono: "",
      empresa: "",
      proceso: "",
      source: source,
    }));
    setFormSubmitted(false);
    setShowContactForm(true);
  };

  return (
    <ClientLayout openContactModal={openContactModal}>
      <div
        className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} font-['Inter',_sans-serif] transition-colors duration-300 relative overflow-x-hidden`}
      >
        {isClient && (
          <>
            {/* Animated Background Canvas */}
            <canvas
              ref={canvasRef}
              className="fixed inset-0 pointer-events-none z-0"
              style={{ opacity: 0.3 }}
            />

            {/* Dynamic Gradient Orbs */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
              <div
                className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br from-green-500 via-blue-500 to-teal-500 blur-3xl opacity-15 animate-pulse"
                style={{
                  left: `${mousePosition.x * 0.02 - 50}px`,
                  top: `${mousePosition.y * 0.02 - 50}px`,
                  transform: `translate(-50%, -50%) scale(${
                    1 + scrollYValue * 0.0002
                  })`,
                }}
              />
              <div
                className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-gradient-to-tr from-blue-500 via-teal-500 to-green-500 blur-3xl opacity-10 animate-pulse"
                style={{
                  right: `${
                    (isClient ? window.innerWidth : 0 - mousePosition.x) *
                      0.02 -
                    100
                  }px`,
                  bottom: `${
                    (isClient ? window.innerHeight : 0 - mousePosition.y) *
                      0.02 -
                    100
                  }px`,
                  animationDelay: "0.5s",
                  transform: `scale(${1 + scrollYValue * 0.00015})`,
                }}
              />
            </div>
          </>
        )}

        {/* Hero Section */}
        <section
          id="hero"
          className="py-20 md:py-28 relative z-10 min-h-[calc(100vh-88px)] flex items-center"
        >
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column: Text Content */}
              <div
                className={`text-center lg:text-left ${
                  visibleSections["hero"] ? "animate-fadeInUp" : "opacity-0"
                }`}
              >
                <div
                  className={`inline-block px-4 py-1.5 mb-6 ${currentTheme.bgSecondary} border ${currentTheme.border} rounded-full shadow-sm`}
                >
                  <span
                    className={`text-xs sm:text-sm font-semibold ${currentTheme.textSecondary} tracking-wider`}
                  >
                    OPTIMIZACIÓN INTELIGENTE
                  </span>
                </div>

                <h1
                  className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight`}
                >
                  <span
                    className={`block bg-gradient-to-r from-green-600 via-blue-500 to-teal-600 bg-clip-text text-transparent`}
                  >
                    Optimización de Procesos
                  </span>
                  <span className={`block ${currentTheme.text} mt-2`}>
                    y Calidad
                  </span>
                </h1>

                <p
                  className={`text-base sm:text-lg ${currentTheme.textSecondary} mb-8 max-w-xl mx-auto lg:mx-0`}
                >
                  Transformamos procesos con tecnología inteligente y
                  metodologías que garantizan alta adopción del personal.
                  Preparamos tu empresa para certificaciones ISO 9001 e ISO
                  27001.
                </p>

                <div
                  className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start`}
                >
                  <button
                    onClick={() => openContactModal("hero_optimizar_procesos")}
                    className={`group px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-gradient-to-r from-green-600 via-blue-500 to-teal-600 text-white font-bold text-base sm:text-lg hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center relative overflow-hidden`}
                  >
                    <span className="relative z-10">Optimizar Procesos</span>
                    <TrendingUp className="inline-block ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </button>
                  <a
                    href="#metodologias"
                    className={`px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold text-base sm:text-lg hover:scale-105 transform transition-all duration-300 flex items-center justify-center`}
                  >
                    Conocer Metodología
                    <Lightbulb className="inline-block ml-2 w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Right Column: Process Flow Visualization */}
              <div
                className={`hidden lg:flex justify-center items-center relative ${
                  visibleSections["hero"]
                    ? "animate-fadeInUp animation-delay-200"
                    : "opacity-0"
                }`}
              >
                <div
                  className={`relative w-80 h-80 md:w-96 md:h-96 p-4 rounded-full bg-gradient-to-br from-green-500/10 via-blue-500/10 to-teal-500/10 animate-float`}
                >
                  <Settings
                    className={`w-full h-full ${currentTheme.highlight} opacity-70 transform group-hover:scale-110 transition-transform duration-500`}
                    strokeWidth={1.5}
                  />
                  <div
                    className={`absolute inset-8 rounded-full border-4 ${currentTheme.highlight} opacity-30 animate-pulse`}
                  ></div>
                  <div
                    className={`absolute inset-16 rounded-full border-2 ${currentTheme.highlight} opacity-20 animate-pulse animation-delay-200`}
                  ></div>
                  <TrendingUp
                    className={`absolute top-10 right-10 w-12 h-12 text-green-500 opacity-60 -rotate-12 animate-float animation-delay-300`}
                    strokeWidth={1.5}
                  />
                  <Users
                    className={`absolute bottom-10 left-10 w-16 h-16 text-blue-500 opacity-60 rotate-12 animate-float animation-delay-500`}
                    strokeWidth={1.5}
                  />
                  <BarChart3
                    className={`absolute top-1/2 left-5 w-10 h-10 text-teal-500 opacity-50 animate-float animation-delay-100`}
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problems Solved Section */}
        <section
          id="problemas"
          className={`py-16 md:py-24 ${currentTheme.bgSecondary} relative z-10`}
        >
          <div className="container mx-auto px-6">
            <div
              className={`text-center mb-12 md:mb-16 ${
                visibleSections["problemas"] ? "animate-fadeInUp" : "opacity-0"
              }`}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Problemas que Resolvemos
              </h2>
              <p
                className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}
              >
                Identificamos y eliminamos los obstáculos más comunes que
                impiden que las organizaciones logren procesos eficientes y
                certificaciones exitosas.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {problemsSolved.map((problem, index) => (
                <div
                  key={index}
                  className={`group p-6 sm:p-8 rounded-2xl ${
                    currentTheme.card
                  } shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-l-green-500 ${
                    visibleSections["problemas"]
                      ? "animate-fadeInUp"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`mb-5 p-3 inline-block rounded-xl bg-gradient-to-br from-green-500/10 to-blue-500/10 group-hover:scale-110 transition-transform`}
                  >
                    {problem.icon}
                  </div>
                  <h3
                    className={`text-xl sm:text-2xl font-semibold mb-3 ${currentTheme.text}`}
                  >
                    {problem.title}
                  </h3>
                  <p
                    className={`text-sm sm:text-base ${currentTheme.textSecondary}`}
                  >
                    {problem.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Differentiating Benefits Section */}
        <section
          id="beneficios"
          className={`py-16 md:py-24 ${currentTheme.bg} relative z-10`}
        >
          <div className="container mx-auto px-6">
            <div
              className={`text-center mb-12 md:mb-16 ${
                visibleSections["beneficios"] ? "animate-fadeInUp" : "opacity-0"
              }`}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Nuestro Enfoque Diferenciador
              </h2>
              <p
                className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}
              >
                Combinamos tecnología inteligente con metodologías de alta
                adopción humana para crear procesos que realmente funcionan y
                perduran en el tiempo.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {differentiatingBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`group p-6 sm:p-8 rounded-2xl ${
                    currentTheme.card
                  } shadow-lg hover:shadow-2xl text-left transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-l-blue-500 ${
                    visibleSections["beneficios"]
                      ? "animate-fadeInUp"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`mb-5 p-3 inline-block rounded-xl bg-gradient-to-br from-blue-500/10 to-teal-500/10 group-hover:scale-110 transition-transform`}
                  >
                    {benefit.icon}
                  </div>
                  <h3
                    className={`text-xl sm:text-2xl font-semibold mb-3 ${currentTheme.text}`}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className={`text-sm sm:text-base ${currentTheme.textSecondary}`}
                  >
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodologies and Technologies Section */}
        <section
          id="metodologias"
          className={`py-16 md:py-24 ${currentTheme.bgSecondary} relative z-10`}
        >
          <div className="container mx-auto px-6">
            <div
              className={`text-center mb-12 md:mb-16 ${
                visibleSections["metodologias"]
                  ? "animate-fadeInUp"
                  : "opacity-0"
              }`}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Metodologías y Tecnologías
              </h2>
              <p
                className={`text-lg ${currentTheme.textSecondary} max-w-3xl mx-auto`}
              >
                Seleccionamos las mejores metodologías y tecnologías según cada
                proyecto, adaptando nuestro enfoque para maximizar resultados y
                adopción.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {methodologiesTech.map((category, index) => (
                <div
                  key={index}
                  className={`group p-6 rounded-2xl ${
                    currentTheme.card
                  } shadow-lg hover:shadow-2xl text-left transition-all duration-300 transform hover:-translate-y-1 ${
                    visibleSections["metodologias"]
                      ? "animate-fadeInUp"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`mb-4 flex items-center`}>
                    <div
                      className={`p-2.5 rounded-lg mr-4 group-hover:scale-110 transition-transform ${
                        category.color === "green"
                          ? "bg-green-500/10"
                          : category.color === "blue"
                          ? "bg-blue-500/10"
                          : category.color === "purple"
                          ? "bg-purple-500/10"
                          : "bg-cyan-500/10"
                      }`}
                    >
                      <div
                        className={
                          category.color === "green"
                            ? "text-green-500"
                            : category.color === "blue"
                            ? "text-blue-500"
                            : category.color === "purple"
                            ? "text-purple-500"
                            : "text-cyan-500"
                        }
                      >
                        {category.icon}
                      </div>
                    </div>
                    <h4
                      className={`text-lg sm:text-xl font-semibold ${currentTheme.text}`}
                    >
                      {category.category}
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {category.items.map((item, idx) => (
                      <div key={idx} className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span
                          className={`text-xs ${currentTheme.textSecondary}`}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Optimization Areas Section */}
        <section
          id="areas"
          className={`py-16 md:py-24 ${currentTheme.bg} relative z-10`}
        >
          <div className="container mx-auto px-6">
            <div
              className={`text-center mb-12 md:mb-16 ${
                visibleSections["areas"] ? "animate-fadeInUp" : "opacity-0"
              }`}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Áreas de Optimización
              </h2>
              <p
                className={`text-lg ${currentTheme.textSecondary} max-w-3xl mx-auto`}
              >
                Optimizamos procesos críticos en toda la organización, desde
                operaciones hasta sistemas de gestión de calidad y seguridad de
                información.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {optimizationAreas.map((area, index) => (
                <div
                  key={index}
                  className={`group p-6 rounded-2xl ${
                    currentTheme.card
                  } shadow-lg hover:shadow-2xl text-left transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-l-teal-500 ${
                    visibleSections["areas"] ? "animate-fadeInUp" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`mb-4 flex items-center text-teal-500`}>
                    <div
                      className={`p-2.5 rounded-lg bg-teal-500/10 mr-4 group-hover:scale-110 transition-transform`}
                    >
                      <div className="text-teal-500">{area.icon}</div>
                    </div>
                    <h4
                      className={`text-lg sm:text-xl font-semibold ${currentTheme.text}`}
                    >
                      {area.title}
                    </h4>
                  </div>
                  <p className={`text-sm ${currentTheme.textSecondary} mb-4`}>
                    {area.description}
                  </p>
                  <div className="space-y-1">
                    {area.examples.map((example, idx) => (
                      <div key={idx} className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span
                          className={`text-xs ${currentTheme.textSecondary}`}
                        >
                          {example}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Optimization Process Section */}
        <section
          id="proceso"
          className={`py-16 md:py-24 ${currentTheme.bgSecondary} relative z-10`}
        >
          <div className="container mx-auto px-6">
            <div
              className={`text-center mb-12 md:mb-16 ${
                visibleSections["proceso"] ? "animate-fadeInUp" : "opacity-0"
              }`}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Proceso de Optimización
              </h2>
              <p
                className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}
              >
                Metodología estructurada de 5 fases que garantiza optimización
                efectiva y preparación exitosa para certificaciones ISO.
              </p>
            </div>
            <div className="relative px-4">
              <div
                className={`hidden lg:block absolute top-12 left-[10%] right-[10%] h-1.5 bg-gradient-to-r from-green-500 via-blue-500 to-teal-500 rounded-full opacity-40`}
              ></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-8 relative z-10">
                {optimizationProcess.map((step, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center text-center group ${
                      visibleSections["proceso"]
                        ? "animate-fadeInUp"
                        : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div
                      className={`w-20 h-20 rounded-full text-white text-2xl font-bold flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transform transition-all duration-300 ${
                        step.color === "green"
                          ? "bg-gradient-to-br from-green-500 to-green-600"
                          : step.color === "blue"
                          ? "bg-gradient-to-br from-blue-500 to-blue-600"
                          : step.color === "purple"
                          ? "bg-gradient-to-br from-purple-500 to-purple-600"
                          : step.color === "cyan"
                          ? "bg-gradient-to-br from-cyan-500 to-cyan-600"
                          : "bg-gradient-to-br from-amber-500 to-amber-600"
                      }`}
                    >
                      <div className="text-white">{step.icon}</div>
                    </div>
                    <h3
                      className={`text-lg sm:text-xl font-semibold mb-2 ${currentTheme.text}`}
                    >
                      {step.title}
                    </h3>
                    <p className={`text-sm ${currentTheme.textSecondary}`}>
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Industry Cases Section */}
        <section
          id="industrias"
          className={`py-16 md:py-24 ${currentTheme.bg} relative z-10`}
        >
          <div className="container mx-auto px-6">
            <div
              className={`text-center mb-12 md:mb-16 ${
                visibleSections["industrias"] ? "animate-fadeInUp" : "opacity-0"
              }`}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Casos por Industria
              </h2>
              <p
                className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}
              >
                Resultados comprobados en diferentes sectores con optimizaciones
                específicas para cada tipo de negocio y sus desafíos únicos.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {industryCases.map((industryCase, index) => (
                <div
                  key={index}
                  className={`group p-6 sm:p-8 rounded-2xl ${
                    currentTheme.card
                  } shadow-lg hover:shadow-2xl text-center transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-l-purple-500 ${
                    visibleSections["industrias"]
                      ? "animate-fadeInUp"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`mb-5 p-4 inline-block rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 group-hover:scale-110 transition-transform`}
                  >
                    {industryCase.icon}
                  </div>
                  <h3
                    className={`text-xl sm:text-2xl font-semibold mb-3 ${currentTheme.text}`}
                  >
                    {industryCase.industry}
                  </h3>
                  <p
                    className={`text-sm sm:text-base ${currentTheme.textSecondary} mb-4`}
                  >
                    {industryCase.description}
                  </p>
                  <div className="space-y-2">
                    {industryCase.results.map((result, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span
                          className={`text-xs font-medium ${currentTheme.text}`}
                        >
                          {result}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section
          id="certificaciones"
          className={`py-16 md:py-24 ${currentTheme.bgSecondary} relative z-10`}
        >
          <div className="container mx-auto px-6">
            <div
              className={`text-center mb-12 md:mb-16 ${
                visibleSections["certificaciones"]
                  ? "animate-fadeInUp"
                  : "opacity-0"
              }`}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Preparación para Certificaciones ISO
              </h2>
              <p
                className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}
              >
                Te preparamos de manera eficiente para obtener certificaciones
                ISO 9001 e ISO 27001 con procesos digitales y equipos
                completamente capacitados.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className={`group p-8 rounded-2xl ${
                    currentTheme.card
                  } shadow-lg hover:shadow-2xl text-center transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-l-amber-500 ${
                    visibleSections["certificaciones"]
                      ? "animate-fadeInUp"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div
                    className={`mb-6 p-4 inline-block rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 group-hover:scale-110 transition-transform`}
                  >
                    {cert.icon}
                  </div>
                  <h3
                    className={`text-2xl sm:text-3xl font-semibold mb-4 ${currentTheme.text}`}
                  >
                    {cert.name}
                  </h3>
                  <p className={`text-base ${currentTheme.textSecondary} mb-6`}>
                    {cert.description}
                  </p>
                  <div className="space-y-3">
                    {cert.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-center"
                      >
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className={`text-sm ${currentTheme.text}`}>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonios"
          className={`py-16 md:py-24 ${currentTheme.bg} relative z-10`}
        >
          <div className="container mx-auto px-6">
            <div
              className={`text-center mb-12 md:mb-16 ${
                visibleSections["testimonios"]
                  ? "animate-fadeInUp"
                  : "opacity-0"
              }`}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Casos de Éxito
              </h2>
              <p
                className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}
              >
                Descubre cómo hemos ayudado a empresas a optimizar procesos,
                obtener certificaciones y lograr resultados medibles
                sostenibles.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`p-8 rounded-2xl ${
                    currentTheme.card
                  } shadow-lg hover:shadow-2xl flex flex-col text-left transition-shadow duration-300 border-l-4 border-l-indigo-500 ${
                    visibleSections["testimonios"]
                      ? "animate-fadeInUp"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4 flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4
                        className={`text-lg font-semibold ${currentTheme.text}`}
                      >
                        {testimonial.name}
                      </h4>
                      <p className={`text-sm text-green-500`}>
                        {testimonial.company} - {testimonial.industry}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`italic ${currentTheme.textSecondary} text-md leading-relaxed mb-4`}
                  >
                    "{testimonial.quote}"
                  </p>
                  <div
                    className={`mt-auto px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20`}
                  >
                    <span className={`text-sm font-bold text-green-600`}>
                      Resultado: {testimonial.result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className={`py-16 md:py-24 ${currentTheme.bgSecondary} relative z-10`}
        >
          <div className="container mx-auto px-6 max-w-3xl">
            <div
              className={`text-center mb-12 md:mb-16 ${
                visibleSections["faq"] ? "animate-fadeInUp" : "opacity-0"
              }`}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Preguntas Frecuentes
              </h2>
              <p
                className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}
              >
                Resolvemos las dudas más comunes sobre optimización de procesos,
                metodologías y preparación para certificaciones ISO.
              </p>
            </div>
            <div className="space-y-5">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    currentTheme.card
                  } rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition-shadow duration-300 border-l-4 border-l-emerald-500 ${
                    visibleSections["faq"] ? "animate-fadeInUp" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className={`w-full p-6 text-left flex justify-between items-center ${currentTheme.text} ${currentTheme.hover} transition-colors group`}
                    aria-expanded={openFAQ === index}
                  >
                    <span className="font-semibold text-lg sm:text-xl">
                      {item.question}
                    </span>
                    <ChevronDownIcon open={openFAQ === index} />
                  </button>
                  {openFAQ === index && (
                    <div
                      className={`p-6 pt-0 ${currentTheme.textSecondary} text-md leading-relaxed`}
                    >
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section
          id="contacto"
          className={`py-20 md:py-28 relative overflow-hidden ${currentTheme.bg} z-10`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-teal-500/5`}
          ></div>
          <div
            className={`container mx-auto px-6 text-center relative z-10 ${
              visibleSections["contacto"] ? "animate-fadeInUp" : "opacity-0"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              ¿Listo para{" "}
              <span
                className={`bg-gradient-to-r from-green-600 via-blue-500 to-teal-600 bg-clip-text text-transparent`}
              >
                Optimizar
              </span>{" "}
              tus Procesos?
            </h2>
            <p
              className={`text-lg sm:text-xl ${currentTheme.textSecondary} mb-10 max-w-2xl mx-auto`}
            >
              Transforma con tecnología que tu equipo realmente adopta. Mejora
              eficiencia y prepárate para certificaciones ISO exitosas.
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => openContactModal("cta_final_optimizar_procesos")}
                className={`group px-10 py-5 rounded-xl bg-gradient-to-r from-green-600 via-blue-500 to-teal-600 text-white text-xl font-bold hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center relative overflow-hidden`}
              >
                <span className="relative z-10">Optimizar mis Procesos</span>
                <Settings className="inline-block ml-3 w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </button>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-10 text-sm">
              <div className="flex items-center">
                <TrendingUp className={`w-5 h-5 text-green-500 mr-2`} />
                <span className={currentTheme.textSecondary}>
                  25-40% mejora eficiencia
                </span>
              </div>
              <div className="flex items-center">
                <Users className={`w-5 h-5 text-blue-500 mr-2`} />
                <span className={currentTheme.textSecondary}>
                  90%+ adopción interna
                </span>
              </div>
              <div className="flex items-center">
                <Award className={`w-5 h-5 text-teal-500 mr-2`} />
                <span className={currentTheme.textSecondary}>
                  Preparación ISO exitosa
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeInUp"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowContactForm(false);
                setFormSubmitted(false);
              }
            }}
          >
            <div
              className={`relative w-full max-w-lg ${currentTheme.card} rounded-2xl shadow-2xl p-6 sm:p-8 transform transition-all duration-300`}
            >
              <button
                onClick={() => setShowContactForm(false)}
                aria-label="Cerrar formulario"
                className={`absolute top-4 right-4 p-2 rounded-full ${currentTheme.hover} hover:scale-110 transition-all`}
              >
                <X className={`w-6 h-6 ${currentTheme.textSecondary}`} />
              </button>

              {formSubmitted ? (
                <div className="text-center py-10 sm:py-12">
                  <CheckCircleIcon className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-5 animate-bounce" />
                  <h3
                    className={`text-2xl sm:text-3xl font-bold mb-2 ${currentTheme.text}`}
                  >
                    ¡Solicitud Recibida!
                  </h3>
                  <p
                    className={`${currentTheme.textSecondary} text-base sm:text-lg`}
                  >
                    Nuestro equipo de optimización analizará tu proceso y te
                    contactará en las próximas 24 horas.
                  </p>
                  <div className="mt-6">
                    <p className={`text-sm ${currentTheme.textSecondary} mb-3`}>
                      El modal se cerrará automáticamente en unos segundos...
                    </p>
                    <button
                      onClick={() => {
                        setShowContactForm(false);
                        setFormSubmitted(false);
                      }}
                      className={`px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-blue-500 text-white text-sm hover:scale-105 transition-all`}
                    >
                      Cerrar ahora
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3
                    className={`text-2xl sm:text-3xl font-bold mb-1 text-center ${currentTheme.text}`}
                  >
                    Optimizar Procesos
                  </h3>
                  <p
                    className={`text-center ${currentTheme.textSecondary} mb-6 text-sm sm:text-base`}
                  >
                    Cuéntanos sobre el proceso que quieres optimizar para crear
                    una propuesta personalizada.
                  </p>

                  <form
                    onSubmit={handleFormSubmit}
                    className="space-y-4 sm:space-y-5"
                  >
                    <div>
                      <label
                        htmlFor="opt-nombre"
                        className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}
                      >
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        id="opt-nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-green-500/70 transition-all`}
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="opt-email"
                        className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}
                      >
                        Email *
                      </label>
                      <div className="relative">
                        <Mail
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`}
                        />
                        <input
                          type="email"
                          id="opt-email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-green-500/70 transition-all`}
                          placeholder="tu@empresa.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label
                          htmlFor="opt-telefono"
                          className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}
                        >
                          Teléfono
                        </label>
                        <div className="relative">
                          <Phone
                            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`}
                          />
                          <input
                            type="tel"
                            id="opt-telefono"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-green-500/70 transition-all`}
                            placeholder="+52 123 456 7890"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="opt-empresa"
                          className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}
                        >
                          Empresa
                        </label>
                        <div className="relative">
                          <Building
                            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`}
                          />
                          <input
                            type="text"
                            id="opt-empresa"
                            name="empresa"
                            value={formData.empresa}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-green-500/70 transition-all`}
                            placeholder="Nombre de tu empresa"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="opt-proceso"
                        className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}
                      >
                        Describe el proceso a optimizar *
                      </label>
                      <textarea
                        id="opt-proceso"
                        name="proceso"
                        value={formData.proceso}
                        onChange={handleInputChange}
                        rows={3}
                        required
                        className={`w-full px-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-green-500/70 transition-all resize-none`}
                        placeholder="Ej: Proceso de atención al cliente con muchos pasos manuales, control de calidad en manufactura, preparación para ISO 9001..."
                      />
                    </div>
                    <input
                      type="hidden"
                      name="source"
                      value={formData.source}
                    />
                    <button
                      type="submit"
                      className={`w-full py-3 mt-2 rounded-lg bg-gradient-to-r from-green-600 via-blue-500 to-teal-600 text-white font-bold text-base sm:text-lg hover:scale-[1.02] transform transition-all duration-300 shadow-lg hover:shadow-xl group flex items-center justify-center`}
                    >
                      Iniciar Optimización
                      <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}

        {/* WhatsApp Floating Button */}
        {isClient && (
          <a
            href="#"
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="Contactar por WhatsApp"
            onClick={(e) => {
              e.preventDefault();
              const whatsappUrl =
                "https://wa.me/525616026685?text=Hola%20Aurhora!%0A%0AVisite%20su%20sitio%20web%20y%20me%20interesa%20conocer%20mas%20sobre%20su%20servicio%20de%20Optimizacion%20de%20Procesos%20y%20Calidad.%0A%0ATengo%20interes%20en%20optimizar%20procesos%20en%20mi%20empresa%20y%20me%20gustaria%20conocer%3A%0A%0A-%20Metodologias%20de%20optimizacion%20digital%0A-%20Preparacion%20para%20certificaciones%20ISO%0A-%20Tecnologias%20de%20automatizacion%0A-%20Gestion%20del%20cambio%20y%20adopcion%0A%0ACuando%20podriamos%20agendar%20una%20reunion%3F";
              window.open(whatsappUrl, "_blank");
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
              <div className="relative bg-green-500 hover:bg-green-600 rounded-full p-4 shadow-2xl transform transition-all duration-300 hover:scale-110 group-hover:shadow-green-500/50">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
              </div>
              <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                ¡Optimiza tus procesos!
              </div>
            </div>
          </a>
        )}

        <style jsx global>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-15px) rotate(3deg);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(25px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.7s ease-out forwards;
          }
          .animation-delay-100 {
            animation-delay: 100ms;
          }
          .animation-delay-200 {
            animation-delay: 200ms;
          }
          .animation-delay-300 {
            animation-delay: 300ms;
          }
          .animation-delay-400 {
            animation-delay: 400ms;
          }
          .animation-delay-500 {
            animation-delay: 500ms;
          }

          body {
            scroll-behavior: smooth;
            font-family: "Inter", sans-serif;
          }
          html {
            scroll-behavior: smooth;
          }
          .font-['Inter',_sans-serif] {
            font-family: "Inter", sans-serif;
          }
        `}</style>
      </div>
    </ClientLayout>
  );
}

const ChevronDownIcon: React.FC<{ open: boolean }> = ({ open }) => (
  <ChevronDown
    className={`w-6 h-6 transform transition-transform duration-300 ease-in-out ${
      open ? "rotate-180" : ""
    } ${open ? "text-green-500" : "text-gray-400 group-hover:text-gray-500"}`}
  />
);
