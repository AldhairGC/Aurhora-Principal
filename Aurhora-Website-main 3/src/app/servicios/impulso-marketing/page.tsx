'use client'

import React, { useState, useEffect, useRef } from 'react';
import {
  Check, Zap, Users, Globe, Target, MessageSquare, TrendingUp, Lightbulb, BarChart3, Eye, Shield, Clock,
  Briefcase, Settings, Share2, HelpCircle, ChevronDown, X, Brain, Compass, ChevronRight, Gauge,
  Mail, Phone, Building, Send, CheckCircle as CheckCircleIcon, Award, SearchCheck, GitBranch,
  Rocket, Palette, Camera, Hash, PenTool, Megaphone, LineChart, Database, Sparkles, ArrowUpRight,
  DollarSign, UserCheck, Layers, Heart, Star, Activity
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useI18n } from '@/context/I18nContext';
import ClientLayout from '@/components/ClientLayout';

// Interfaces
interface ProblemSolved {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Approach {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ServiceCategory {
  icon: React.ReactNode; // This can be undefined, null, etc.
  title: string;
  description: string;
  services: string[];
  color: string;
}

interface ProcessStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

interface Result {
  icon: React.ReactNode;
  metric: string;
  description: string;
}

interface WhyUs {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface IndustryCase {
  icon: React.ReactNode;
  industry: string;
  description: string;
  results: string[];
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
  necesidad: string;
  source?: string;
}

export default function MarketingDigitalPage() {
  const { theme, currentTheme } = useTheme();
  const t = useI18n();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollYValue, setScrollYValue] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    necesidad: '',
    source: '',
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

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisibleSections(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => { if (section) observer.unobserve(section) });
  }, [isClient]);

  useEffect(() => {
    if (!isClient || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
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

    window.addEventListener('resize', handleResize);
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
        opacity: Math.random() * 0.25 + 0.05
      });
    }

    let animationFrameId: number;
    const animate = () => {
      if (!ctx || !canvasRef.current) return; // Check if canvas and context are still valid
      ctx.fillStyle = theme === 'dark' ? 'rgba(17, 24, 39, 0.025)' : 'rgba(243, 244, 246, 0.025)';
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        if (particle.x < 0 || particle.x > canvasRef.current!.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvasRef.current!.height) particle.vy *= -1;
        if (particle.z < 1 || particle.z > 1000) particle.vz *= -1;

        const scale = 1000 / (1000 + particle.z);
        const x2d = (particle.x - canvasRef.current!.width / 2) * scale + canvasRef.current!.width / 2;
        const y2d = (particle.y - canvasRef.current!.height / 2) * scale + canvasRef.current!.height / 2;
        const size = particle.size * scale;

        if (size > 0.1) {
          ctx.beginPath();
          ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size);
          gradient.addColorStop(0, theme === 'dark'
            ? `rgba(251, 191, 36, ${particle.opacity * scale * 0.7})` // Tailwind amber-400
            : `rgba(245, 158, 11, ${particle.opacity * scale * 0.7})`); // Tailwind amber-600
          gradient.addColorStop(1, 'transparent');
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
              const opacity = (1 - distance / connectionDistance) * 0.12 * scale;
              if (opacity > 0.01) {
                ctx.beginPath();
                ctx.moveTo(x2d, y2d);
                const scale2 = 1000 / (1000 + particle2.z);
                const x2d2 = (particle2.x - canvasRef.current!.width / 2) * scale2 + canvasRef.current!.width / 2;
                const y2d2 = (particle2.y - canvasRef.current!.height / 2) * scale2 + canvasRef.current!.height / 2;
                ctx.lineTo(x2d2, y2d2);
                ctx.strokeStyle = theme === 'dark'
                  ? `rgba(251, 191, 36, ${opacity})`
                  : `rgba(245, 158, 11, ${opacity})`;
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
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    }
  }, [theme, isClient]);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Data Definitions
  const problemsSolved: ProblemSolved[] = [
    {
      icon: <Eye className={`w-10 h-10 text-amber-500`} />,
      title: "Baja Visibilidad Online",
      description: "Tu negocio es excelente pero tus clientes potenciales no te encuentran en el mundo digital.",
    },
    {
      icon: <DollarSign className={`w-10 h-10 text-amber-500`} />,
      title: "ROI Poco Claro en Marketing",
      description: "Inviertes en marketing pero no sabes exactamente qué retorno estás obteniendo de cada acción.",
    },
    {
      icon: <Target className={`w-10 h-10 text-amber-500`} />,
      title: "Marketing sin Estrategia",
      description: "Publicaciones al azar, campañas sin cohesión y esfuerzos dispersos que no generan resultados.",
    },
    {
      icon: <Users className={`w-10 h-10 text-amber-500`} />,
      title: "Desconexión con tu Audiencia",
      description: "No conoces realmente a tu cliente ideal ni cómo comunicarte efectivamente con él.",
    },
    {
      icon: <LineChart className={`w-10 h-10 text-amber-500`} />,
      title: "Competencia más Visible",
      description: "Tus competidores aparecen primero en Google y tienen más engagement en redes sociales.",
    },
    {
      icon: <Activity className={`w-10 h-10 text-amber-500`} />,
      title: "Marketing-Ventas Desalineados",
      description: "Tu marketing genera tráfico pero no se convierte en clientes reales y ventas concretas.",
    }
  ];

  const strategicApproach: Approach[] = [
    {
      icon: <Brain className={`w-8 h-8 text-amber-500`} />,
      title: "Estrategia Basada en Datos",
      description: "Cada decisión respaldada por análisis profundo de tu industria, competencia y audiencia objetivo."
    },
    {
      icon: <Target className={`w-8 h-8 text-amber-500`} />,
      title: "100% Personalizado",
      description: "No usamos plantillas. Cada estrategia es única para tu negocio, industria y objetivos específicos."
    },
    {
      icon: <TrendingUp className={`w-8 h-8 text-amber-500`} />,
      title: "Orientado a Resultados",
      description: "KPIs claros, métricas definidas y optimización constante para maximizar tu retorno de inversión."
    },
    {
      icon: <Users className={`w-8 h-8 text-amber-500`} />,
      title: "Centrado en tu Cliente",
      description: "Entendemos profundamente a tu audiencia para crear mensajes que realmente conecten y conviertan."
    }
  ];

  const serviceCategories: ServiceCategory[] = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Estrategia Digital Integral",
      description: "Diseñamos el camino completo hacia tus objetivos de negocio",
      services: ["Auditoría digital", "Plan estratégico", "Customer journey", "Análisis competitivo"],
      color: "amber"
    },
    {
      icon: <Megaphone className="w-6 h-6" />,
      title: "Marketing y Publicidad",
      description: "Ejecutamos campañas que generan resultados medibles",
      services: ["Google Ads & SEO", "Social Media Ads", "Email Marketing", "Marketing Automation"],
      color: "green"
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Contenido y Marca",
      description: "Creamos contenido que posiciona tu marca como líder",
      services: ["Content Marketing", "Gestión de marca", "Diseño creativo", "Storytelling"],
      color: "blue"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics y Optimización",
      description: "Medimos, analizamos y optimizamos constantemente",
      services: ["Dashboards en tiempo real", "Reportes ejecutivos", "A/B Testing", "ROI Analysis"],
      color: "purple"
    }
  ];

  const strategicProcess: ProcessStep[] = [
    {
      icon: <SearchCheck className={`w-10 h-10`} />,
      title: "Diagnóstico 360°",
      description: "Análisis profundo de tu presencia digital, competencia y oportunidades de mercado.",
      color: 'amber'
    },
    {
      icon: <Lightbulb className={`w-10 h-10`} />,
      title: "Estrategia Personalizada",
      description: "Diseño de plan estratégico único basado en tus objetivos y recursos disponibles.",
      color: 'green'
    },
    {
      icon: <Rocket className={`w-10 h-10`} />,
      title: "Implementación Ágil",
      description: "Ejecución coordinada de campañas con ajustes continuos basados en resultados.",
      color: 'blue'
    },
    {
      icon: <BarChart3 className={`w-10 h-10`} />,
      title: "Medición y Optimización",
      description: "Análisis constante de métricas para maximizar ROI y escalar lo que funciona.",
      color: 'purple'
    }
  ];

  const results: Result[] = [
    {
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      metric: "+150%",
      description: "Incremento promedio en tráfico cualificado"
    },
    {
      icon: <DollarSign className="w-8 h-8 text-amber-500" />,
      metric: "3-5x",
      description: "ROI típico en campañas optimizadas"
    },
    {
      icon: <UserCheck className="w-8 h-8 text-blue-500" />,
      metric: "+200%",
      description: "Mejora en tasa de conversión"
    },
    {
      icon: <Activity className="w-8 h-8 text-purple-500" />,
      metric: "-40%",
      description: "Reducción en costo por adquisición"
    }
  ];

  const whyUs: WhyUs[] = [
    {
      icon: <Database className={`w-8 h-8 text-amber-500`} />,
      title: "Data-Driven Always",
      description: "Cada decisión respaldada por datos reales, no suposiciones o tendencias pasajeras."
    },
    {
      icon: <Heart className={`w-8 h-8 text-amber-500`} />,
      title: "Tu Éxito es Nuestro Éxito",
      description: "Trabajamos como extensión de tu equipo, comprometidos con tus resultados a largo plazo."
    },
    {
      icon: <Layers className={`w-8 h-8 text-amber-500`} />,
      title: "Estrategia Multicanal",
      description: "Integramos todos los canales digitales en una estrategia coherente y poderosa."
    },
    {
      icon: <Award className={`w-8 h-8 text-amber-500`} />,
      title: "Experiencia Comprobada",
      description: "Casos de éxito en múltiples industrias con resultados medibles y sostenibles."
    }
  ];

  const industryCases: IndustryCase[] = [
    {
      icon: <Briefcase className={`w-8 h-8 text-amber-500`} />,
      industry: "B2B / Servicios",
      description: "Generación de leads cualificados y nurturing automatizado",
      results: ["+180% leads cualificados", "65% reducción CAC", "Pipeline 3x mayor"]
    },
    {
      icon: <Globe className={`w-8 h-8 text-amber-500`} />,
      industry: "E-commerce",
      description: "Optimización de conversión y estrategias de retención",
      results: ["+220% en ventas online", "ROAS 5:1", "+45% lifetime value"]
    },
    {
      icon: <Users className={`w-8 h-8 text-amber-500`} />,
      industry: "Profesionales",
      description: "Posicionamiento de marca personal y generación de autoridad",
      results: ["Top 3 en su nicho", "+300% consultas", "Referente de industria"]
    },
    {
      icon: <Building className={`w-8 h-8 text-amber-500`} />,
      industry: "PyMEs",
      description: "Digitalización completa y competitividad online",
      results: ["Presencia digital sólida", "+150% visibilidad", "ROI desde mes 3"]
    }
  ];

  const faqItems: FAQItem[] = [
    {
      question: "¿Cómo se diferencia su enfoque de otras agencias de marketing?",
      answer: "Nos enfocamos en estrategia basada en datos reales de tu industria, no en tendencias genéricas. Cada plan es 100% personalizado y orientado a ROI medible. Además, trabajamos como partners estratégicos, no solo ejecutores."
    },
    {
      question: "¿Cuánto tiempo toma ver resultados reales?",
      answer: "Los primeros indicadores mejoran desde el mes 1. Resultados significativos en tráfico y engagement entre mes 2-3. ROI positivo típicamente entre mes 3-6, dependiendo de la industria y punto de partida."
    },
    {
      question: "¿Trabajan con empresas de todos los tamaños?",
      answer: "Sí, desde profesionales independientes hasta grandes corporativos. Lo importante no es el tamaño, sino el compromiso con crecer digitalmente. Adaptamos estrategias y presupuestos a cada realidad."
    },
    {
      question: "¿Qué incluye el servicio de analytics?",
      answer: "Dashboard personalizado con métricas clave, reportes ejecutivos mensuales, análisis de competencia, tracking de conversiones, y recomendaciones de optimización basadas en datos."
    },
    {
      question: "¿Puedo contratar servicios individuales o debe ser integral?",
      answer: "Ofrecemos flexibilidad total. Puedes contratar servicios específicos o una estrategia integral. Sin embargo, los mejores resultados se logran con un enfoque holístico y coordinado."
    }
  ];

  // Contact Form Logic
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.necesidad) {
      // Consider using a more user-friendly notification system instead of alert
      console.error('Por favor completa todos los campos requeridos');
      // alert('Por favor completa todos los campos requeridos');
      return;
    }
    console.log('Formulario de marketing digital enviado:', formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setShowContactForm(false);
      setFormSubmitted(false);
      setFormData({ nombre: '', email: '', telefono: '', empresa: '', necesidad: '', source: '' });
    }, 5000);
  };

  const openContactModal = (source: string) => {
    setFormData(prev => ({
      ...prev,
      nombre: '',
      email: '',
      telefono: '',
      empresa: '',
      necesidad: '',
      source: source,
    }));
    setFormSubmitted(false);
    setShowContactForm(true);
  };

  return (
    <ClientLayout openContactModal={openContactModal}>
      <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} font-['Inter',_sans-serif] transition-colors duration-300 relative overflow-x-hidden`}>
        {isClient && (
          <>
            {/* Animated Background Canvas */}
            <canvas
              ref={canvasRef}
              className="fixed inset-0 pointer-events-none z-0"
              style={{ opacity: 0.3 }}
            />

            {/* Dynamic Gradient Orbs - Amarillo y colores de marca */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
              <div
                className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-green-400 blur-3xl opacity-15 animate-pulse"
                style={{
                  left: `${mousePosition.x * 0.02 - 50}px`,
                  top: `${mousePosition.y * 0.02 - 50}px`,
                  transform: `translate(-50%, -50%) scale(${1 + scrollYValue * 0.0002})`
                }}
              />
              <div
                className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-gradient-to-tr from-blue-400 via-teal-400 to-amber-400 blur-3xl opacity-10 animate-pulse"
                style={{
                  right: `${(isClient && typeof window !== 'undefined' ? window.innerWidth : 0 - mousePosition.x) * 0.02 - 100}px`,
                  bottom: `${(isClient && typeof window !== 'undefined' ? window.innerHeight : 0 - mousePosition.y) * 0.02 - 100}px`,
                  animationDelay: '0.5s',
                  transform: `scale(${1 + scrollYValue * 0.00015})`
                }}
              />
            </div>
          </>
        )}

        {/* Hero Section */}
        <section id="hero" className="py-20 md:py-28 relative z-10 min-h-[calc(100vh-88px)] flex items-center">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column */}
              <div className={`text-center lg:text-left ${visibleSections['hero'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
                <div className={`inline-block px-4 py-1.5 mb-6 ${currentTheme.bgSecondary} border ${currentTheme.border} rounded-full shadow-sm`}>
                  <span className={`text-xs sm:text-sm font-semibold text-amber-600 tracking-wider`}>ESTRATEGIA DIGITAL INTELIGENTE</span>
                </div>

                <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight`}>
                  <span className={`block bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent`}>
                    Impulso y Marketing
                  </span>
                  <span className={`block ${currentTheme.text} mt-2`}>
                    Digital
                  </span>
                </h1>

                <p className={`text-base sm:text-lg ${currentTheme.textSecondary} mb-8 max-w-xl mx-auto lg:mx-0`}>
                  Estrategias basadas en datos que conectan tu marca con clientes reales.
                  Marketing personalizado por industria con ROI medible y resultados sostenibles.
                </p>

                <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start`}>
                  <button
                    onClick={() => openContactModal('hero_impulsar_negocio')}
                    className={`group px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white font-bold text-base sm:text-lg hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center relative overflow-hidden`}
                  >
                    <span className="relative z-10">Impulsar mi Negocio</span>
                    <Rocket className="inline-block ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </button>
                  <a
                    href="#estrategia"
                    className={`px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white font-bold text-base sm:text-lg hover:scale-105 transform transition-all duration-300 flex items-center justify-center`}
                  >
                    Ver Estrategia
                    <Target className="inline-block ml-2 w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Right Column: Visual */}
              <div className={`hidden lg:flex justify-center items-center relative ${visibleSections['hero'] ? 'animate-fadeInUp animation-delay-200' : 'opacity-0'}`}>
                <div className={`relative w-80 h-80 md:w-96 md:h-96 p-4 rounded-full bg-gradient-to-br from-amber-500/10 via-yellow-500/10 to-green-500/10 animate-float`}>
                  <Target className={`w-full h-full text-amber-500 opacity-70 transform group-hover:scale-110 transition-transform duration-500`} strokeWidth={1.5} />
                  <div className={`absolute inset-8 rounded-full border-4 border-amber-500 opacity-30 animate-pulse`}></div>
                  <div className={`absolute inset-16 rounded-full border-2 border-yellow-500 opacity-20 animate-pulse animation-delay-200`}></div>
                  <Rocket className={`absolute top-10 right-10 w-12 h-12 text-amber-500 opacity-60 -rotate-12 animate-float animation-delay-300`} strokeWidth={1.5} />
                  <LineChart className={`absolute bottom-10 left-10 w-16 h-16 text-green-500 opacity-60 rotate-12 animate-float animation-delay-500`} strokeWidth={1.5} />
                  <Megaphone className={`absolute top-1/2 left-5 w-10 h-10 text-blue-500 opacity-50 animate-float animation-delay-100`} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problems Solved Section */}
        <section id="problemas" className={`py-16 md:py-24 ${currentTheme.bgSecondary} relative z-10`}>
          <div className="container mx-auto px-6">
            <div className={`text-center mb-12 md:mb-16 ${visibleSections['problemas'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Desafíos que Resolvemos
              </h2>
              <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
                Transformamos obstáculos digitales en oportunidades de crecimiento
                con estrategias personalizadas y orientadas a resultados.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {problemsSolved.map((problem, index) => (
                <div
                  key={index}
                  className={`group p-6 sm:p-8 rounded-2xl ${currentTheme.card} shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-l-amber-500 ${visibleSections['problemas'] ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`mb-5 p-3 inline-block rounded-xl bg-gradient-to-br from-amber-500/10 to-yellow-500/10 group-hover:scale-110 transition-transform`}>{problem.icon}</div>
                  <h3 className={`text-xl sm:text-2xl font-semibold mb-3 ${currentTheme.text}`}>{problem.title}</h3>
                  <p className={`text-sm sm:text-base ${currentTheme.textSecondary}`}>{problem.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategic Approach Section */}
        <section id="estrategia" className={`py-16 md:py-24 ${currentTheme.bg} relative z-10`}>
          <div className="container mx-auto px-6">
            <div className={`text-center mb-12 md:mb-16 ${visibleSections['estrategia'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Nuestro Enfoque Estratégico
              </h2>
              <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
                Marketing que parte de la estrategia de negocio, no de tácticas aisladas.
                Cada acción alineada con tus objetivos empresariales.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {strategicApproach.map((approach, index) => (
                <div
                  key={index}
                  className={`group p-6 rounded-2xl ${currentTheme.card} shadow-lg hover:shadow-2xl text-center transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-t-amber-500 ${visibleSections['estrategia'] ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`mb-4 p-3 inline-block rounded-xl bg-gradient-to-br from-amber-500/10 to-yellow-500/10 group-hover:scale-110 transition-transform`}>{approach.icon}</div>
                  <h3 className={`text-lg sm:text-xl font-semibold mb-2 ${currentTheme.text}`}>{approach.title}</h3>
                  <p className={`text-sm ${currentTheme.textSecondary}`}>{approach.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className={`py-16 md:py-24 ${currentTheme.bgSecondary} relative z-10`}>
          <div className="container mx-auto px-6">
            <div className={`text-center mb-12 md:mb-16 ${visibleSections['servicios'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Servicios Digitales Integrados
              </h2>
              <p className={`text-lg ${currentTheme.textSecondary} max-w-3xl mx-auto`}>
                Soluciones completas adaptadas a tu industria y objetivos.
                Desde estrategia hasta ejecución y optimización continua.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {serviceCategories.map((category, index) => (
                <div
                  key={index}
                  className={`group p-6 rounded-2xl ${currentTheme.card} shadow-lg hover:shadow-2xl text-left transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-l-${category.color}-500 ${visibleSections['servicios'] ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`mb-4 flex items-center text-${category.color}-500`}>
                    <div className={`p-2.5 rounded-lg bg-${category.color}-500/10 mr-4 group-hover:scale-110 transition-transform`}>
                      {/* CORRECTED LINE: Added React.isValidElement check */}
                      {React.isValidElement(category.icon) ? React.cloneElement(category.icon as React.ReactElement<any>, { className: `w-6 h-6 text-${category.color}-500` }) : null}
                    </div>
                    <h4 className={`text-lg sm:text-xl font-semibold ${currentTheme.text}`}>{category.title}</h4>
                  </div>
                  <p className={`text-sm ${currentTheme.textSecondary} mb-4`}>{category.description}</p>
                  <div className="space-y-2">
                    {category.services.map((service, idx) => (
                      <div key={idx} className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className={`text-xs ${currentTheme.textSecondary}`}>{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategic Process Section */}
        <section id="proceso" className={`py-16 md:py-24 ${currentTheme.bg} relative z-10`}>
          <div className="container mx-auto px-6">
            <div className={`text-center mb-12 md:mb-16 ${visibleSections['proceso'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Proceso Estratégico
              </h2>
              <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
                Metodología probada que garantiza resultados medibles
                y crecimiento sostenible en el mundo digital.
              </p>
            </div>
            <div className="relative px-4">
              <div className={`hidden lg:block absolute top-12 left-[10%] right-[10%] h-1.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-green-500 rounded-full opacity-40`}></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 relative z-10">
                {strategicProcess.map((step, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center text-center group ${visibleSections['proceso'] ? 'animate-fadeInUp' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 text-white text-2xl font-bold flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transform transition-all duration-300`}>
                      {React.isValidElement(step.icon) ? React.cloneElement(step.icon as React.ReactElement<any>, { className: `w-10 h-10 text-white` }) : null}
                    </div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-2 ${currentTheme.text}`}>{step.title}</h3>
                    <p className={`text-sm ${currentTheme.textSecondary}`}>{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section id="resultados" className={`py-16 md:py-24 ${currentTheme.bgSecondary} relative z-10`}>
          <div className="container mx-auto px-6">
            <div className={`text-center mb-12 md:mb-16 ${visibleSections['resultados'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Resultados que Entregamos
              </h2>
              <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
                Métricas reales de clientes reales. Nuestro éxito se mide
                por el crecimiento tangible de tu negocio.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`group p-6 rounded-2xl ${currentTheme.card} shadow-lg hover:shadow-2xl text-center transition-all duration-300 transform hover:-translate-y-2 ${visibleSections['resultados'] ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`mb-4 p-3 inline-block rounded-xl bg-gradient-to-br from-amber-500/10 to-yellow-500/10 group-hover:scale-110 transition-transform`}>{result.icon}</div>
                  <h3 className={`text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent`}>{result.metric}</h3>
                  <p className={`text-sm ${currentTheme.textSecondary}`}>{result.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="diferenciadores" className={`py-16 md:py-24 ${currentTheme.bg} relative z-10`}>
          <div className="container mx-auto px-6">
            <div className={`text-center mb-12 md:mb-16 ${visibleSections['diferenciadores'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Por Qué Elegirnos
              </h2>
              <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
                Más que una agencia, somos tu partner estratégico en el mundo digital.
                Comprometidos con resultados reales y crecimiento sostenible.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {whyUs.map((reason, index) => (
                <div
                  key={index}
                  className={`group p-6 rounded-2xl ${currentTheme.card} shadow-lg hover:shadow-2xl text-center transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-t-amber-500 ${visibleSections['diferenciadores'] ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`mb-4 p-3 inline-block rounded-xl bg-gradient-to-br from-amber-500/10 to-yellow-500/10 group-hover:scale-110 transition-transform`}>{reason.icon}</div>
                  <h3 className={`text-lg sm:text-xl font-semibold mb-2 ${currentTheme.text}`}>{reason.title}</h3>
                  <p className={`text-sm ${currentTheme.textSecondary}`}>{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Cases Section */}
        <section id="industrias" className={`py-16 md:py-24 ${currentTheme.bgSecondary} relative z-10`}>
          <div className="container mx-auto px-6">
            <div className={`text-center mb-12 md:mb-16 ${visibleSections['industrias'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Casos por Industria
              </h2>
              <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
                Experiencia comprobada en múltiples sectores con estrategias
                adaptadas a los desafíos únicos de cada industria.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {industryCases.map((industryCase, index) => (
                <div
                  key={index}
                  className={`group p-6 sm:p-8 rounded-2xl ${currentTheme.card} shadow-lg hover:shadow-2xl text-center transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-l-amber-500 ${visibleSections['industrias'] ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`mb-5 p-4 inline-block rounded-xl bg-gradient-to-br from-amber-500/10 to-yellow-500/10 group-hover:scale-110 transition-transform`}>{industryCase.icon}</div>
                  <h3 className={`text-xl sm:text-2xl font-semibold mb-3 ${currentTheme.text}`}>{industryCase.industry}</h3>
                  <p className={`text-sm sm:text-base ${currentTheme.textSecondary} mb-4`}>{industryCase.description}</p>
                  <div className="space-y-2">
                    {industryCase.results.map((result, idx) => (
                      <div key={idx} className="flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className={`text-xs font-medium ${currentTheme.text}`}>{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className={`py-16 md:py-24 ${currentTheme.bg} relative z-10`}>
          <div className="container mx-auto px-6 max-w-3xl">
            <div className={`text-center mb-12 md:mb-16 ${visibleSections['faq'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Preguntas Frecuentes
              </h2>
              <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
                Resolvemos las dudas más comunes sobre marketing digital,
                estrategias y resultados esperados.
              </p>
            </div>
            <div className="space-y-5">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className={`${currentTheme.card} rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition-shadow duration-300 border-l-4 border-l-amber-500 ${visibleSections['faq'] ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className={`w-full p-6 text-left flex justify-between items-center ${currentTheme.text} ${currentTheme.hover} transition-colors group`}
                    aria-expanded={openFAQ === index}
                  >
                    <span className="font-semibold text-lg sm:text-xl">{item.question}</span>
                    <ChevronDown className={`w-6 h-6 transform transition-transform duration-300 ${openFAQ === index ? 'rotate-180' : ''} ${openFAQ === index ? 'text-amber-500' : 'text-gray-400 group-hover:text-gray-500'}`} />
                  </button>
                  {openFAQ === index && (
                    <div className={`p-6 pt-0 ${currentTheme.textSecondary} text-md leading-relaxed`}>
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section id="contacto" className={`py-20 md:py-28 relative overflow-hidden ${currentTheme.bgSecondary} z-10`}>
          <div className={`absolute inset-0 bg-gradient-to-br from-amber-500/5 via-yellow-500/5 to-green-500/5`}></div>
          <div className={`container mx-auto px-6 text-center relative z-10 ${visibleSections['contacto'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              ¿Listo para{" "}
              <span className={`bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent`}>
                Impulsar
              </span>{" "}
              tu Negocio?
            </h2>
            <p className={`text-lg sm:text-xl ${currentTheme.textSecondary} mb-10 max-w-2xl mx-auto`}>
              Estrategias personalizadas que conectan tu marca con clientes reales.
              Marketing basado en datos con resultados medibles.
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => openContactModal('cta_final_impulsar_negocio')}
                className={`group px-10 py-5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white text-xl font-bold hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center relative overflow-hidden`}
              >
                <span className="relative z-10">Impulsar mi Negocio</span>
                <Rocket className="inline-block ml-3 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </button>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-10 text-sm">
              <div className="flex items-center">
                <TrendingUp className={`w-5 h-5 text-amber-500 mr-2`} />
                <span className={currentTheme.textSecondary}>+150% tráfico cualificado</span>
              </div>
              <div className="flex items-center">
                <DollarSign className={`w-5 h-5 text-green-500 mr-2`} />
                <span className={currentTheme.textSecondary}>ROI 3-5x garantizado</span>
              </div>
              <div className="flex items-center">
                <Star className={`w-5 h-5 text-blue-500 mr-2`} />
                <span className={currentTheme.textSecondary}>100% personalizado</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeInUp"
            onClick={(e) => {
              // Only close if clicked on the backdrop
              if (e.target === e.currentTarget) {
                setShowContactForm(false);
                setFormSubmitted(false);
              }
            }}
          >
            <div className={`relative w-full max-w-lg ${currentTheme.card} rounded-2xl shadow-2xl p-6 sm:p-8 transform transition-all duration-300`}>
              <button
                onClick={() => {
                  setShowContactForm(false);
                  setFormSubmitted(false); // Reset submission state if modal is closed manually
                }}
                aria-label="Cerrar formulario"
                className={`absolute top-4 right-4 p-2 rounded-full ${currentTheme.hover} hover:scale-110 transition-all`}
              >
                <X className={`w-6 h-6 ${currentTheme.textSecondary}`} />
              </button>

              {formSubmitted ? (
                <div className="text-center py-10 sm:py-12">
                  <CheckCircleIcon className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-5 animate-bounce" />
                  <h3 className={`text-2xl sm:text-3xl font-bold mb-2 ${currentTheme.text}`}>¡Solicitud Enviada!</h3>
                  <p className={`${currentTheme.textSecondary} text-base sm:text-lg`}>
                    Gracias por tu interés. Un especialista se pondrá en contacto contigo pronto.
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
                      className={`px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-sm hover:scale-105 transition-all`}
                    >
                      Cerrar ahora
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className={`text-2xl sm:text-3xl font-bold mb-1 text-center ${currentTheme.text}`}>Impulsa tu Negocio Digital</h3>
                  <p className={`text-center ${currentTheme.textSecondary} mb-6 text-sm sm:text-base`}>
                    Compártenos tus desafíos y metas para una conversación personalizada.
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-5">
                    <div>
                      <label htmlFor="digitalmkt-nombre" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>
                        Nombre completo *
                      </label>
                      <input
                        type="text" id="digitalmkt-nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required
                        className={`w-full px-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-amber-500/70 transition-all`}
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div>
                      <label htmlFor="digitalmkt-email" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>
                        Email corporativo *
                      </label>
                      <div className="relative">
                        <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`} />
                        <input
                          type="email" id="digitalmkt-email" name="email" value={formData.email} onChange={handleInputChange} required
                          className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-amber-500/70 transition-all`}
                          placeholder="tu@empresa.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label htmlFor="digitalmkt-telefono" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>
                          Teléfono
                        </label>
                        <div className="relative">
                          <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`} />
                          <input
                            type="tel" id="digitalmkt-telefono" name="telefono" value={formData.telefono} onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-amber-500/70 transition-all`}
                            placeholder="+52 123 456 7890"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="digitalmkt-empresa" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>
                          Empresa *
                        </label>
                        <div className="relative">
                          <Building className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`} />
                          <input
                            type="text" id="digitalmkt-empresa" name="empresa" value={formData.empresa} onChange={handleInputChange} required
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-amber-500/70 transition-all`}
                            placeholder="Nombre de tu empresa"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="digitalmkt-necesidad" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>
                        Principal necesidad o desafío *
                      </label>
                      <textarea
                        id="digitalmkt-necesidad" name="necesidad" value={formData.necesidad} onChange={handleInputChange} rows={3} required
                        className={`w-full px-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-amber-500/70 transition-all resize-none`}
                        placeholder="Ej: Aumentar ventas online, generar más leads, mejorar visibilidad SEO..."
                      />
                    </div>
                    <input type="hidden" name="source" value={formData.source} />
                    <button
                      type="submit"
                      className={`w-full py-3 mt-2 rounded-lg bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white font-bold text-base sm:text-lg hover:scale-[1.02] transform transition-all duration-300 shadow-lg hover:shadow-xl group flex items-center justify-center`}
                    >
                      Solicitar Consultoría
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
            href="#" // Placeholder, onClick handles the action
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="Contactar por WhatsApp"
            onClick={(e) => {
              e.preventDefault();
              const whatsappUrl = "https://wa.me/525616026685?text=Hola%20Aurhora!%0A%0AVi%20su%20página%20de%20Impulso%20y%20Marketing%20Digital.%20Me%20gustaría%20saber%20más%20sobre%20cómo%20pueden%20ayudar%20a%20mi%20negocio%20a%20crecer.%0A%0AEstoy%20interesado%20en%3A%0A%0A-%20%5BEspecificar%20necesidad%20o%20servicio%20de%20interés%5D%0A-%20Aumentar%20visibilidad%0A-%20Generar%20más%20clientes%0A%0A¿Podemos%20agendar%20una%20llamada%3F";
              window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
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
                ¡Impulsa tu Marketing!
              </div>
            </div>
          </a>
        )}

        <style jsx global>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(3deg); }
          }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(25px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-float { animation: float 4s ease-in-out infinite; }
          .animate-fadeInUp { animation: fadeInUp 0.7s ease-out forwards; }
          .animation-delay-100 { animation-delay: 100ms; }
          .animation-delay-200 { animation-delay: 200ms; }
          .animation-delay-300 { animation-delay: 300ms; }
          .animation-delay-400 { animation-delay: 400ms; }
          .animation-delay-500 { animation-delay: 500ms; }

          body {
            scroll-behavior: smooth;
            font-family: 'Inter', sans-serif;
          }
          html {
            scroll-behavior: smooth;
          }
          .font-['Inter',_sans-serif] {
              font-family: 'Inter', sans-serif;
          }
        `}</style>
      </div>
    </ClientLayout>
  );
}
