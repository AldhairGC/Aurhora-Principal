'use client'

import React, { useState, useEffect, useRef } from 'react';
import {
  Check, Zap, Users, Globe, Calendar, FileText, CreditCard, Bell, Camera, Star, ArrowRight, Shield, Clock, Smartphone, Briefcase,
  Target, MessageSquare, TrendingUp, Lightbulb, Settings, BarChart3, LifeBuoy, Share2, Eye, HelpCircle, MessageCircle, ThumbsUp, Rocket, Palette,
  Mail, Phone, Building, Send, CheckCircle as CheckCircleIcon, ChevronDown,
  Code, Layers, X, Brain, Compass, MapPin, Users2, ChevronRight, Gauge, Workflow, Presentation, BookOpen
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useI18n } from '@/context/I18nContext';
import ClientLayout from '@/components/ClientLayout';

// Interfaces for the data types
interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ProblemSolved {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TargetAudienceItem {
  icon: React.ReactNode;
  name: string;
  description: string;
}

interface ProcessStep {
  icon: React.ReactNode; // This can be undefined, null, etc.
  title: string;
  description: string;
  color: string;
}

interface ServiceCapability {
  icon: React.ReactNode; // This can be undefined, null, etc.
  title: string;
  description: string;
  examples: string[];
}

interface Testimonial {
  quote: string;
  name: string;
  company: string;
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
  mensaje: string;
  source?: string;
}

export default function StrategyInnovationPage() {
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
    mensaje: '',
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
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 25));
    const connectionDistance = 120;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        vz: (Math.random() - 0.5) * 0.7,
        size: Math.random() * 1.0 + 0.3,
        opacity: Math.random() * 0.25 + 0.05
      });
    }

    let animationFrameId: number;
    const animate = () => {
      if (!ctx || !canvasRef.current) return; // Check if canvas and context are still valid
      ctx.fillStyle = theme === 'dark' ? 'rgba(17, 24, 39, 0.025)' : 'rgba(243, 244, 246, 0.025)';
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
        const y2d = (particle.y - canvas.height / 2) * scale + canvas.height / 2;
        const size = particle.size * scale;

        if (size > 0.1) {
          ctx.beginPath();
          ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size);
          gradient.addColorStop(0, theme === 'dark'
            ? `rgba(6, 182, 212, ${particle.opacity * scale * 0.6})`
            : `rgba(168, 85, 247, ${particle.opacity * scale * 0.6})`);
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
                const x2d2 = (particle2.x - canvas.width / 2) * scale2 + canvas.width / 2;
                const y2d2 = (particle2.y - canvas.height / 2) * scale2 + canvas.height / 2;
                ctx.lineTo(x2d2, y2d2);
                ctx.strokeStyle = theme === 'dark'
                  ? `rgba(6, 182, 212, ${opacity})`
                  : `rgba(168, 85, 247, ${opacity})`;
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

  // --- Data Definitions ---
  const strategicBenefits: Benefit[] = [
    {
      icon: <Brain className={`w-8 h-8 ${currentTheme.highlight}`} />,
      title: "Visión Estratégica Clara",
      description: "Desarrollamos una hoja de ruta digital alineada con tus objetivos de negocio, identificando oportunidades de crecimiento y optimización que generen valor real."
    },
    {
      icon: <TrendingUp className={`w-8 h-8 ${currentTheme.highlight}`} />,
      title: "Ventaja Competitiva Sostenible",
      description: "Te posicionamos a la vanguardia de tu industria mediante estrategias de innovación que te diferencias de la competencia y fortalecen tu liderazgo en el mercado."
    },
    {
      icon: <Zap className={`w-8 h-8 ${currentTheme.highlight}`} />,
      title: "Transformación Acelerada",
      description: "Optimizamos tus procesos y capacidades organizacionales para implementar cambios de manera ágil, reduciendo tiempos de adopción y maximizando el retorno de inversión."
    },
    {
      icon: <Users2 className={`w-8 h-8 ${currentTheme.highlight}`} />,
      title: "Cultura de Innovación",
      description: "Fomentamos una mentalidad digital en toda tu organización, capacitando a tus equipos y creando estructuras que permitan la innovación continua y el cambio sostenible."
    },
    {
      icon: <Shield className={`w-8 h-8 ${currentTheme.highlight}`} />,
      title: "Gestión de Riesgos",
      description: "Minimizamos los riesgos asociados a la transformación digital mediante metodologías probadas y un enfoque de implementación gradual y controlada."
    },
    {
      icon: <BarChart3 className={`w-8 h-8 ${currentTheme.highlight}`} />,
      title: "ROI Medible y Escalable",
      description: "Establecemos métricas claras y sistemas de seguimiento que demuestran el impacto de cada iniciativa, asegurando resultados tangibles y escalables en el tiempo."
    }
  ];

  const problemsSolved: ProblemSolved[] = [
    {
      icon: <Compass className={`w-10 h-10 ${currentTheme.highlight}`} />,
      title: "Falta de Dirección Digital",
      description: "Empresas sin una estrategia digital clara o con iniciativas desconectadas que no generan el impacto esperado en el negocio.",
    },
    {
      icon: <Users className={`w-10 h-10 ${currentTheme.highlight}`} />,
      title: "Resistencia al Cambio",
      description: "Organizaciones que enfrentan barreras culturales y dificultades para adoptar nuevas tecnologías y procesos de trabajo.",
    },
    {
      icon: <Settings className={`w-10 h-10 ${currentTheme.highlight}`} />,
      title: "Desalineación Tecnológica",
      description: "Inversiones en tecnología que no están alineadas con los objetivos de negocio o que no entregan el valor esperado.",
    },
    {
      icon: <Clock className={`w-10 h-10 ${currentTheme.highlight}`} />,
      title: "Procesos Obsoletos",
      description: "Operaciones ineficientes que limitan la productividad y la capacidad de respuesta ante las demandas del mercado.",
    },
    {
      icon: <Target className={`w-10 h-10 ${currentTheme.highlight}`} />,
      title: "Pérdida de Competitividad",
      description: "Empresas que se quedan atrás frente a competidores más ágiles y digitalmente maduros en su sector.",
    },
    {
      icon: <Briefcase className={`w-10 h-10 ${currentTheme.highlight}`} />,
      title: "Capacidades Limitadas",
      description: "Falta de conocimiento interno y herramientas para liderar procesos de transformación digital efectivos.",
    }
  ];

  const targetAudience: TargetAudienceItem[] = [
    {
      icon: <Building className={`w-8 h-8 ${currentTheme.highlight}`} />,
      name: "Empresas Tradicionales",
      description: "Organizaciones establecidas que buscan digitalizarse y modernizar sus operaciones para mantenerse competitivas en el mercado actual."
    },
    {
      icon: <Rocket className={`w-8 h-8 ${currentTheme.highlight}`} />,
      name: "Startups en Crecimiento",
      description: "Empresas emergentes que necesitan escalar sus operaciones y estructurar procesos sólidos para un crecimiento sostenible."
    },
    {
      icon: <Users2 className={`w-8 h-8 ${currentTheme.highlight}`} />,
      name: "Líderes de Transformación",
      description: "Ejecutivos y directores que buscan impulsar el cambio organizacional y necesitan una estrategia clara para la transformación digital."
    }
  ];

  const consultingProcess: ProcessStep[] = [
    {
      icon: <Eye className={`w-10 h-10`} />,
      title: "Diagnóstico Integral",
      description: "Evaluamos tu madurez digital actual, analizamos procesos existentes e identificamos oportunidades de mejora y crecimiento.",
      color: 'cyan'
    },
    {
      icon: <MapPin className={`w-10 h-10`} />,
      title: "Diseño Estratégico",
      description: "Desarrollamos una hoja de ruta personalizada con objetivos claros, métricas de éxito y un plan de implementación detallado.",
      color: 'blue'
    },
    {
      icon: <Users className={`w-10 h-10`} />,
      title: "Gestión del Cambio",
      description: "Preparamos a tu organización para la transformación, gestionando la adopción cultural y capacitando a los equipos clave.",
      color: 'purple'
    },
    {
      icon: <Rocket className={`w-10 h-10`} />,
      title: "Implementación Guiada",
      description: "Acompañamos la ejecución de iniciativas prioritarias, asegurando el cumplimiento de objetivos y la entrega de valor.",
      color: 'pink'
    },
    {
      icon: <BarChart3 className={`w-10 h-10`} />,
      title: "Optimización Continua",
      description: "Monitoreamos resultados, ajustamos estrategias y establecemos procesos de mejora continua para el crecimiento sostenible.",
      color: 'amber'
    }
  ];

  const serviceCapabilities: ServiceCapability[] = [
    {
      icon: <Brain className="w-7 h-7" />,
      title: "Estrategia Digital",
      description: "Definición de visión, objetivos y roadmap de transformación",
      examples: ["Análisis de madurez digital", "Roadmap tecnológico", "Business case y ROI"]
    },
    {
      icon: <Workflow className="w-7 h-7" />,
      title: "Optimización de Procesos",
      description: "Rediseño y automatización de operaciones críticas",
      examples: ["Mapeo de procesos", "Identificación de automatizaciones", "Diseño de workflows"]
    },
    {
      icon: <Users2 className="w-7 h-7" />,
      title: "Transformación Cultural",
      description: "Gestión del cambio y desarrollo de capacidades",
      examples: ["Change management", "Capacitación digital", "Cultura de innovación"]
    },
    {
      icon: <Presentation className="w-7 h-7" />,
      title: "Modelos de Negocio",
      description: "Innovación en propuestas de valor y revenue streams",
      examples: ["Design thinking", "Nuevos canales digitales", "Ecosistemas de partners"]
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Governance Digital",
      description: "Estructuras de gobierno y gestión de riesgos",
      examples: ["Políticas digitales", "Gestión de datos", "Ciberseguridad estratégica"]
    },
    {
      icon: <BarChart3 className="w-7 h-7" />,
      title: "Métricas y Analytics",
      description: "Sistemas de medición y inteligencia de negocio",
      examples: ["KPIs de transformación", "Dashboards ejecutivos", "Data-driven decisions"]
    }
  ];

  const testimonials: Testimonial[] = [
    {
      quote: "La consultoría de Aurhora transformó completamente nuestra visión digital. En 6 meses logramos optimizar procesos que llevaban años sin evolucionar.",
      name: "María González",
      company: "Directora de Operaciones - RetailPlus",
      avatar: `https://placehold.co/100x100/${theme === 'light' ? 'E0E7FF' : '374151'}/${theme === 'light' ? '4338CA' : 'A5B4FC'}?text=MG&font=Inter`
    },
    {
      quote: "Su metodología nos ayudó a crear una cultura de innovación real. Nuestros equipos ahora proponen y ejecutan mejoras constantemente.",
      name: "Roberto Martínez",
      company: "CEO - TechnoServices",
      avatar: `https://placehold.co/100x100/${theme === 'light' ? 'D1FAE5' : '374151'}/${theme === 'light' ? '059669' : '6EE7B7'}?text=RM&font=Inter`
    },
    {
      quote: "El ROI de la transformación superó nuestras expectativas. La estrategia que desarrollaron fue clave para nuestro crecimiento del 40%.",
      name: "Ana Patricia López",
      company: "VP de Estrategia - GrowthCorp",
      avatar: `https://placehold.co/100x100/${theme === 'light' ? 'FCE7F3' : '374151'}/${theme === 'light' ? 'DB2777' : 'F9A8D4'}?text=AL&font=Inter`
    }
  ];

  const faqItems: FAQItem[] = [
    {
      question: "¿Cuánto tiempo toma un proyecto de consultoría en transformación digital?",
      answer: "La duración varía según el alcance y complejidad. Un diagnóstico inicial toma 4-6 semanas, mientras que una estrategia integral puede requerir 3-6 meses. Los proyectos de transformación completa generalmente se ejecutan en fases de 6-18 meses."
    },
    {
      question: "¿Cómo miden el éxito de la transformación digital?",
      answer: "Establecemos KPIs específicos desde el inicio, incluyendo métricas de eficiencia operativa, satisfacción del cliente, reducción de costos, tiempo de respuesta y ROI. Proporcionamos dashboards en tiempo real para monitorear el progreso."
    },
    {
      question: "¿Qué involucra la gestión del cambio organizacional?",
      answer: "Incluye evaluación de la cultura actual, diseño de estrategias de comunicación, programas de capacitación, identificación de champions internos y acompañamiento durante la adopción de nuevos procesos y tecnologías."
    },
    {
      question: "¿Trabajan con empresas de cualquier tamaño e industria?",
      answer: "Sí, adaptamos nuestra metodología a empresas desde startups hasta corporaciones. Tenemos experiencia en múltiples sectores: retail, manufactura, servicios financieros, salud, educación y más."
    },
    {
      question: "¿Qué diferencia su consultoría de otras firmas?",
      answer: "Nuestro enfoque combina estrategia de negocio, tecnología y gestión del cambio. No solo diseñamos estrategias, sino que acompañamos la implementación. Además, nos enfocamos en resultados medibles y transferencia de conocimiento a tus equipos."
    }
  ];

  // Contact Form Logic
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      // Consider using a more user-friendly notification system instead of alert
      console.error('Por favor completa todos los campos requeridos');
      // alert('Por favor completa todos los campos requeridos');
      return;
    }
    console.log('Formulario de consultoría estratégica enviado:', formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setShowContactForm(false);
      setFormSubmitted(false);
      setFormData({ nombre: '', email: '', telefono: '', empresa: '', mensaje: '', source: '' });
    }, 5000);
  };

  const openContactModal = (source: string) => {
    setFormData(prev => ({
      ...prev,
      nombre: '',
      email: '',
      telefono: '',
      empresa: '',
      mensaje: '',
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

            {/* Dynamic Gradient Orbs */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
              <div
                className={`absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br ${currentTheme.gradient} blur-3xl opacity-15 animate-pulse`}
                style={{
                  left: `${mousePosition.x * 0.02 - 50}px`,
                  top: `${mousePosition.y * 0.02 - 50}px`,
                  transform: `translate(-50%, -50%) scale(${1 + scrollYValue * 0.0002})`
                }}
              />
              <div
                className={`absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-gradient-to-tr ${currentTheme.gradient} blur-3xl opacity-10 animate-pulse`}
                style={{
                  right: `${(isClient ? window.innerWidth : 0 - mousePosition.x) * 0.02 - 100}px`,
                  bottom: `${(isClient ? window.innerHeight : 0 - mousePosition.y) * 0.02 - 100}px`,
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
              {/* Left Column: Text Content */}
              <div className={`text-center lg:text-left ${visibleSections['hero'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
                <div className={`inline-block px-4 py-1.5 mb-6 ${currentTheme.bgSecondary} border ${currentTheme.border} rounded-full shadow-sm`}>
                  <span className={`text-xs sm:text-sm font-semibold ${currentTheme.textSecondary} tracking-wider`}>CONSULTORÍA ESTRATÉGICA</span>
                </div>

                <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight`}>
                  <span className={`block bg-gradient-to-r ${currentTheme.gradientText} bg-clip-text text-transparent`}>
                    Estrategia de Innovación
                  </span>
                  <span className={`block ${currentTheme.text} mt-2`}>
                    y Transformación Digital
                  </span>
                </h1>

                <p className={`text-base sm:text-lg ${currentTheme.textSecondary} mb-8 max-w-xl mx-auto lg:mx-0`}>
                  Diseñamos e implementamos estrategias de transformación digital personalizadas que
                  impulsan el crecimiento, optimizan operaciones y fortalecen la competitividad de tu organización.
                </p>

                <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start`}>
                  <button
                    onClick={() => openContactModal('hero_agenda_sesion')}
                    className={`group px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl ${currentTheme.ctaButton} font-bold text-base sm:text-lg hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center relative overflow-hidden`}
                  >
                    <span className="relative z-10">Agendar Sesión Estratégica</span>
                    <Calendar className="inline-block ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </button>
                  <a
                    href="#metodologia"
                    className={`px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white font-bold text-base sm:text-lg hover:scale-105 transform transition-all duration-300 flex items-center justify-center`}
                  >
                    Conocer Metodología
                    <ArrowRight className="inline-block ml-2 w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Right Column: Visual Element */}
              <div className={`hidden lg:flex justify-center items-center relative ${visibleSections['hero'] ? 'animate-fadeInUp animation-delay-200' : 'opacity-0'}`}>
                <div className={`relative w-80 h-80 md:w-96 md:h-96 p-4 rounded-full bg-gradient-to-br ${currentTheme.gradient}/10 animate-float`}>
                  <Brain className={`w-full h-full ${currentTheme.highlight} opacity-70 transform group-hover:scale-110 transition-transform duration-500`} strokeWidth={1.5} />
                  <div className={`absolute inset-8 rounded-full border-4 ${currentTheme.highlight} opacity-30 animate-pulse`}></div>
                  <div className={`absolute inset-16 rounded-full border-2 ${currentTheme.highlight} opacity-20 animate-pulse animation-delay-200`}></div>
                  <Compass className={`absolute top-10 right-10 w-12 h-12 text-pink-500 opacity-60 -rotate-12 animate-float animation-delay-300`} strokeWidth={1.5} />
                  <Target className={`absolute bottom-10 left-10 w-16 h-16 text-cyan-500 opacity-60 rotate-12 animate-float animation-delay-500`} strokeWidth={1.5} />
                  <TrendingUp className={`absolute top-1/2 left-5 w-10 h-10 text-purple-500 opacity-50 animate-float animation-delay-100`} strokeWidth={1.5} />
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
                Identificamos y solucionamos los obstáculos más comunes que enfrentan las organizaciones
                en su proceso de transformación digital.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {problemsSolved.map((problem, index) => (
                <div
                  key={index}
                  className={`group p-6 sm:p-8 rounded-2xl ${currentTheme.card} shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-l-cyan-500 ${visibleSections['problemas'] ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`mb-5 p-3 inline-block rounded-xl bg-gradient-to-br ${currentTheme.gradient}/10 group-hover:scale-110 transition-transform`}>{problem.icon}</div>
                  <h3 className={`text-xl sm:text-2xl font-semibold mb-3 ${currentTheme.text}`}>{problem.title}</h3>
                  <p className={`text-sm sm:text-base ${currentTheme.textSecondary}`}>{problem.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategic Benefits Section */}
        <section id="beneficios" className={`py-16 md:py-24 ${currentTheme.bg} relative z-10`}>
          <div className="container mx-auto px-6">
            <div className={`text-center mb-12 md:mb-16 ${visibleSections['beneficios'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Beneficios Estratégicos
              </h2>
              <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
                Nuestro enfoque de consultoría genera valor tangible y sostenible para tu organización
                a través de metodologías probadas y resultados medibles.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {strategicBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`group p-6 sm:p-8 rounded-2xl ${currentTheme.card} shadow-lg hover:shadow-2xl text-left transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-l-purple-500 ${visibleSections['beneficios'] ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`mb-5 p-3 inline-block rounded-xl bg-gradient-to-br ${currentTheme.gradient}/10 group-hover:scale-110 transition-transform`}>{benefit.icon}</div>
                  <h3 className={`text-xl sm:text-2xl font-semibold mb-3 ${currentTheme.text}`}>{benefit.title}</h3>
                  <p className={`text-sm sm:text-base ${currentTheme.textSecondary}`}>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section id="metodologia" className={`py-16 md:py-24 ${currentTheme.bgSecondary} relative z-10`}>
          <div className="container mx-auto px-6">
            <div className={`text-center mb-12 md:mb-16 ${visibleSections['metodologia'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Nuestra Metodología
              </h2>
              <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
                Proceso estructurado de 5 fases que garantiza una transformación exitosa,
                desde el diagnóstico inicial hasta la optimización continua.
              </p>
            </div>
            <div className="relative px-4">
              <div className={`hidden lg:block absolute top-12 left-[10%] right-[10%] h-1.5 bg-gradient-to-r ${currentTheme.gradient} rounded-full opacity-40`}></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-8 relative z-10">
                {consultingProcess.map((step, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center text-center group ${visibleSections['metodologia'] ? 'animate-fadeInUp' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 text-white text-2xl font-bold flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transform transition-all duration-300`}>
                      {/* CORRECTED LINE: Added React.isValidElement check */}
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

        {/* Service Capabilities Section */}
        <section id="capacidades" className={`py-16 md:py-24 ${currentTheme.bg} relative z-10`}>
          <div className="container mx-auto px-6">
            <div className={`text-center mb-12 md:mb-16 ${visibleSections['capacidades'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Nuestras Capacidades
              </h2>
              <p className={`text-lg ${currentTheme.textSecondary} max-w-3xl mx-auto`}>
                Ofrecemos un espectro completo de servicios de consultoría que abarcan desde
                la estrategia digital hasta la implementación y optimización continua.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {serviceCapabilities.map((capability, index) => (
                <div
                  key={index}
                  className={`group p-6 rounded-2xl ${currentTheme.card} shadow-lg hover:shadow-2xl text-left transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-l-amber-500 ${visibleSections['capacidades'] ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`mb-4 flex items-center text-amber-500`}>
                    <div className={`p-2.5 rounded-lg bg-amber-500/10 mr-4 group-hover:scale-110 transition-transform`}>
                      {/* CORRECTED LINE: Added React.isValidElement check */}
                      {React.isValidElement(capability.icon) ? React.cloneElement(capability.icon as React.ReactElement<any>, { className: `w-6 h-6 text-amber-500` }) : null}
                    </div>
                    <h4 className={`text-lg sm:text-xl font-semibold ${currentTheme.text}`}>{capability.title}</h4>
                  </div>
                  <p className={`text-sm ${currentTheme.textSecondary} mb-4`}>{capability.description}</p>
                  <div className="space-y-1">
                    {capability.examples.map((example, idx) => (
                      <div key={idx} className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className={`text-xs ${currentTheme.textSecondary}`}>{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Target Audience Section */}
        <section id="publico" className={`py-16 md:py-24 ${currentTheme.bgSecondary} relative z-10`}>
          <div className="container mx-auto px-6">
            <div className={`text-center mb-12 md:mb-16 ${visibleSections['publico'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                ¿Para Quién es Este Servicio?
              </h2>
              <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
                Trabajamos con organizaciones de diferentes tamaños y sectores que buscan
                acelerar su transformación digital de manera estratégica y sostenible.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {targetAudience.map((item, index) => (
                <div
                  key={index}
                  className={`group p-6 sm:p-8 rounded-2xl ${currentTheme.card} shadow-lg hover:shadow-2xl text-center transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-l-pink-500 ${visibleSections['publico'] ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`mb-5 p-4 inline-block rounded-xl bg-gradient-to-br ${currentTheme.gradient}/10 group-hover:scale-110 transition-transform`}>{item.icon}</div>
                  <h3 className={`text-xl sm:text-2xl font-semibold mb-3 ${currentTheme.text}`}>{item.name}</h3>
                  <p className={`text-sm sm:text-base ${currentTheme.textSecondary}`}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonios" className={`py-16 md:py-24 ${currentTheme.bg} relative z-10`}>
          <div className="container mx-auto px-6">
            <div className={`text-center mb-12 md:mb-16 ${visibleSections['testimonios'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Casos de Éxito
              </h2>
              <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
                Conoce cómo hemos ayudado a organizaciones a lograr sus objetivos de transformación
                digital y generar resultados medibles.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`p-8 rounded-2xl ${currentTheme.card} shadow-lg hover:shadow-2xl flex flex-col text-left transition-shadow duration-300 border-l-4 border-l-green-500 ${visibleSections['testimonios'] ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4 flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className={`text-lg font-semibold ${currentTheme.text}`}>{testimonial.name}</h4>
                      <p className={`text-sm ${currentTheme.highlight}`}>{testimonial.company}</p>
                    </div>
                  </div>
                  <p className={`italic ${currentTheme.textSecondary} text-md leading-relaxed`}>"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className={`py-16 md:py-24 ${currentTheme.bgSecondary} relative z-10`}>
          <div className="container mx-auto px-6 max-w-3xl">
            <div className={`text-center mb-12 md:mb-16 ${visibleSections['faq'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Preguntas Frecuentes
              </h2>
              <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
                Resolvemos las dudas más comunes sobre nuestro servicio de consultoría
                en estrategia de innovación y transformación digital.
              </p>
            </div>
            <div className="space-y-5">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className={`${currentTheme.card} rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition-shadow duration-300 border-l-4 border-l-indigo-500 ${visibleSections['faq'] ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className={`w-full p-6 text-left flex justify-between items-center ${currentTheme.text} ${currentTheme.hover} transition-colors group`}
                    aria-expanded={openFAQ === index}
                  >
                    <span className="font-semibold text-lg sm:text-xl">{item.question}</span>
                    <ChevronDownIcon open={openFAQ === index} />
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
        <section id="contacto" className={`py-20 md:py-28 relative overflow-hidden ${currentTheme.bg} z-10`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.gradient}/5 via-transparent to-transparent`}></div>
          <div className={`container mx-auto px-6 text-center relative z-10 ${visibleSections['contacto'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              ¿Listo para Transformar{" "}
              <span className={`bg-gradient-to-r ${currentTheme.gradientText} bg-clip-text text-transparent`}>
                tu Organización?
              </span>
            </h2>
            <p className={`text-lg sm:text-xl ${currentTheme.textSecondary} mb-10 max-w-2xl mx-auto`}>
              Agenda una sesión estratégica gratuita y descubre cómo podemos acelerar
              tu transformación digital con un enfoque personalizado.
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => openContactModal('cta_final_sesion_estrategica')}
                className={`group px-10 py-5 rounded-xl ${currentTheme.ctaButton} text-xl font-bold hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center relative overflow-hidden`}
              >
                <span className="relative z-10">Agendar Sesión Estratégica</span>
                <Calendar className="inline-block ml-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </button>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-10 text-sm">
              <div className="flex items-center">
                <Clock className={`w-5 h-5 ${currentTheme.highlight} mr-2`} />
                <span className={currentTheme.textSecondary}>Consulta sin compromiso</span>
              </div>
              <div className="flex items-center">
                <Shield className={`w-5 h-5 ${currentTheme.highlight} mr-2`} />
                <span className={currentTheme.textSecondary}>Metodología probada</span>
              </div>
              <div className="flex items-center">
                <Star className={`w-5 h-5 ${currentTheme.highlight} mr-2`} />
                <span className={currentTheme.textSecondary}>Resultados medibles</span>
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
            <div className={`relative w-full max-w-lg ${currentTheme.card} rounded-2xl shadow-2xl p-6 sm:p-8 transform transition-all duration-300`}>
              <button
                onClick={() => {
                  setShowContactForm(false);
                  setFormSubmitted(false); // Reset on manual close
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
                    Gracias por tu interés. Un especialista se contactará contigo en las próximas 24 horas.
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
                      className={`px-4 py-2 rounded-lg ${currentTheme.ctaButton} text-sm hover:scale-105 transition-all`}
                    >
                      Cerrar ahora
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className={`text-2xl sm:text-3xl font-bold mb-1 text-center ${currentTheme.text}`}>Agendar Sesión Estratégica</h3>
                  <p className={`text-center ${currentTheme.textSecondary} mb-6 text-sm sm:text-base`}>
                    Compártenos información sobre tu empresa y desafíos para personalizar nuestra conversación.
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-5">
                    <div>
                      <label htmlFor="strategy-nombre" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>
                        Nombre completo *
                      </label>
                      <input
                        type="text" id="strategy-nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required
                        className={`w-full px-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all`}
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div>
                      <label htmlFor="strategy-email" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>
                        Email corporativo *
                      </label>
                      <div className="relative">
                        <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`} />
                        <input
                          type="email" id="strategy-email" name="email" value={formData.email} onChange={handleInputChange} required
                          className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all`}
                          placeholder="tu@empresa.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label htmlFor="strategy-telefono" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>
                          Teléfono
                        </label>
                        <div className="relative">
                          <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`} />
                          <input
                            type="tel" id="strategy-telefono" name="telefono" value={formData.telefono} onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all`}
                            placeholder="+52 123 456 7890"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="strategy-empresa" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>
                          Empresa *
                        </label>
                        <div className="relative">
                          <Building className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`} />
                          <input
                            type="text" id="strategy-empresa" name="empresa" value={formData.empresa} onChange={handleInputChange} required
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all`}
                            placeholder="Nombre de tu empresa"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="strategy-mensaje" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>
                        Describe tu principal desafío *
                      </label>
                      <textarea
                        id="strategy-mensaje" name="mensaje" value={formData.mensaje} onChange={handleInputChange} rows={3} required
                        className={`w-full px-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all resize-none`}
                        placeholder="Ej: Necesitamos modernizar nuestros procesos, mejorar la experiencia del cliente, optimizar costos operativos..."
                      />
                    </div>
                    <input type="hidden" name="source" value={formData.source} />
                    <button
                      type="submit"
                      className={`w-full py-3 mt-2 rounded-lg ${currentTheme.ctaButton} font-bold text-base sm:text-lg hover:scale-[1.02] transform transition-all duration-300 shadow-lg hover:shadow-xl group flex items-center justify-center`}
                    >
                      Solicitar Sesión Estratégica
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
              const whatsappUrl = "https://wa.me/525616026685?text=Hola%20Aurhora!%0A%0AVisite%20su%20sitio%20web%20y%20me%20interesa%20conocer%20mas%20sobre%20su%20servicio%20de%20Estrategia%20de%20Innovacion%20y%20Transformacion%20Digital.%0A%0AMe%20gustaria%20agendar%20una%20sesion%20estrategica%20para%20discutir%3A%0A%0A-%20Los%20desafios%20digitales%20de%20mi%20empresa%0A-%20Oportunidades%20de%20optimizacion%20de%20procesos%0A-%20Estrategia%20de%20transformacion%20digital%0A-%20Roadmap%20de%20implementacion%0A%0ACuando%20podriamos%20agendar%20una%20reunion%3F";
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
                ¡Consultoría estratégica!
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

// ChevronDownIcon component for FAQ
const ChevronDownIcon: React.FC<{ open: boolean }> = ({ open }) => (
  <ChevronDown
    className={`w-6 h-6 transform transition-transform duration-300 ease-in-out ${open ? 'rotate-180' : ''} ${open ? 'text-purple-500' : 'text-gray-400 group-hover:text-gray-500'}`}
  />
);
