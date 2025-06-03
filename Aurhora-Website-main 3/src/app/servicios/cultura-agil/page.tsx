'use client'

import React, { useState, useEffect, useRef } from 'react';
import {
  Check, Zap, Users, Globe, Calendar, FileText, CreditCard, Bell, Camera, Star, ArrowRight, Shield, Clock, Smartphone, Briefcase,
  Target, MessageSquare, TrendingUp, Lightbulb, Settings, BarChart3, LifeBuoy, Share2, Eye, HelpCircle, MessageCircle, ThumbsUp, Rocket, Palette,
  Mail, Phone, Building, Send, CheckCircle as CheckCircleIcon, ChevronDown,
  Code, Layers, X, Brain, Compass, MapPin, Users2, ChevronRight, Gauge, Workflow, Presentation, BookOpen,
  Cpu, Database, Cloud, Smartphone as Mobile, Monitor, Bot, Sparkles, ChevronUp, Activity, Heart, Compass as DirectionIcon,
  Repeat, TreePine, Lightbulb as Innovation, Award, Puzzle, ArrowUpRight, Timer, PieChart, Smile, Trending,
  Gamepad2, Megaphone, UserCheck, RefreshCw, Gem, Leaf, Sprout, Recycle
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useI18n } from '@/context/I18nContext';
import ClientLayout from '@/components/ClientLayout';

// Interfaces for the data types - ACTUALIZADAS
interface Problem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Approach {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TransformationArea {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
}

interface DeliveryMethod {
  icon: React.ReactNode;
  title: string;
  description: string;
  duration: string;
}

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  metric: string;
}

interface Technology {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  tools: string[];
}

interface TargetAudience {
  icon: React.ReactNode;
  title: string;
  description: string;
  needs: string[];
}

interface WhyAurhora {
  icon: React.ReactNode;
  title: string;
  description: string;
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
  desafio: string;
  objetivos: string;
  source?: string; 
}

// Animated Icons Component
const FloatingIcons: React.FC = () => {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const icons = [
    { Icon: Users, delay: '0s', x: '10%', y: '20%' },
    { Icon: Zap, delay: '0.5s', x: '80%', y: '30%' },
    { Icon: Leaf, delay: '1s', x: '15%', y: '70%' },
    { Icon: RefreshCw, delay: '1.5s', x: '85%', y: '80%' },
    { Icon: Heart, delay: '2s', x: '50%', y: '15%' },
    { Icon: Sprout, delay: '2.5s', x: '70%', y: '60%' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, delay, x, y }, index) => (
        <Icon
          key={index}
          className={`absolute w-8 h-8 text-lime-400 opacity-30 animate-float`}
          style={{
            left: x,
            top: y,
            animationDelay: delay,
          }}
        />
      ))}
    </div>
  );
};

export default function CulturaAgilPage() {
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
    desafio: '',
    objetivos: '',
    source: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Missing Crown icon - using alternative
  const Crown: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l4 6 3-6 3 6 4-6v16H5V3z"/>
    </svg>
  );

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

    return () => sections.forEach((section) => { if(section) observer.unobserve(section) });
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
    const particleCount = Math.min(40, Math.floor(window.innerWidth / 30));
    const connectionDistance = 100; 
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.1, 
        vy: (Math.random() - 0.5) * 0.1, 
        vz: (Math.random() - 0.5) * 0.5, 
        size: Math.random() * 0.8 + 0.2, 
        opacity: Math.random() * 0.2 + 0.05 
      });
    }
    
    let animationFrameId: number;
    const animate = () => {
      ctx.fillStyle = theme === 'dark' ? 'rgba(17, 24, 39, 0.02)' : 'rgba(243, 244, 246, 0.02)';
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
            ? `rgba(163, 230, 53, ${particle.opacity * scale * 0.8})` 
            : `rgba(34, 197, 94, ${particle.opacity * scale * 0.8})`);
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
              const opacity = (1 - distance / connectionDistance) * 0.1 * scale; 
              if (opacity > 0.01) { 
                ctx.beginPath();
                ctx.moveTo(x2d, y2d);
                const scale2 = 1000 / (1000 + particle2.z);
                const x2d2 = (particle2.x - canvas.width / 2) * scale2 + canvas.width / 2;
                const y2d2 = (particle2.y - canvas.height / 2) * scale2 + canvas.height / 2;
                ctx.lineTo(x2d2, y2d2);
                ctx.strokeStyle = theme === 'dark' 
                    ? `rgba(163, 230, 53, ${opacity})`
                    : `rgba(34, 197, 94, ${opacity})`;
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
  const problems: Problem[] = [
    {
      icon: <Timer className="w-10 h-10 text-lime-400" />,
      title: "Organizaciones Lentas para Adaptarse",
      description: "Procesos rígidos y burocráticos que impiden respuestas rápidas a cambios del mercado o necesidades de clientes.",
    },
    {
      icon: <Puzzle className="w-10 h-10 text-lime-400" />,
      title: "Silos Departamentales",
      description: "Equipos aislados que no colaboran efectivamente, generando duplicación de esfuerzos y pérdida de sinergias.",
    },
    {
      icon: <Shield className="w-10 h-10 text-lime-400" />,
      title: "Resistencia al Cambio",
      description: "Cultura tradicional que frena la innovación y adopción de nuevas metodologías o tecnologías.",
    },
    {
      icon: <Innovation className="w-10 h-10 text-lime-400" />,
      title: "Falta de Innovación",
      description: "Ausencia de espacios y procesos para experimentar, fallar rápido y aprender de forma continua.",
    },
    {
      icon: <Activity className="w-10 h-10 text-lime-400" />,
      title: "Baja Productividad y Engagement",
      description: "Equipos desmotivados con procesos ineficientes que no agregan valor real al negocio.",
    },
    {
      icon: <Clock className="w-10 h-10 text-lime-400" />,
      title: "Proyectos que Exceden Plazos",
      description: "Gestión tradicional que genera retrasos constantes, sobrecostos y baja calidad en las entregas.",
    }
  ];

  const approaches: Approach[] = [
    {
      icon: <Heart className="w-8 h-8 text-lime-400" />,
      title: "Foco en Personas y Cultura",
      description: "Transformación que inicia desde las personas, sus mindsets y comportamientos para generar cambios sostenibles."
    },
    {
      icon: <Zap className="w-8 h-8 text-lime-400" />,
      title: "Metodologías Ágiles + Tecnología",
      description: "Combinamos frameworks ágiles probados con herramientas tecnológicas que potencian la colaboración."
    },
    {
      icon: <Globe className="w-8 h-8 text-lime-400" />,
      title: "Adaptado al Contexto Latino",
      description: "Enfoque cultural que respeta nuestras particularidades organizacionales y relacionales."
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-lime-400" />,
      title: "Integración con Transformación Digital",
      description: "Alineamos la evolución cultural con la modernización tecnológica para resultados integrales."
    }
  ];

  const transformationAreas: TransformationArea[] = [
    {
      Icon: Sprout,
      title: "Cultura Organizacional Ágil",
      description: "Construimos mentalidades y comportamientos que faciliten la adaptabilidad",
      features: ["Mindset de crecimiento", "Cultura de experimentación", "Psychological safety", "Valores ágiles"]
    },
    {
      Icon: Workflow,
      title: "Metodologías y Prácticas",
      description: "Implementamos frameworks que optimizan el flujo de valor",
      features: ["Scrum & Kanban", "Design Thinking", "Lean Startup", "DevOps practices"]
    },
    {
      Icon: DirectionIcon,
      title: "Liderazgo Ágil y Coaching",
      description: "Desarrollamos líderes que faciliten y empoderen equipos",
      features: ["Servant leadership", "Coaching skills", "Facilitación", "Gestión del cambio"]
    },
    {
      Icon: Users2,
      title: "Equipos de Alto Desempeño",
      description: "Formamos equipos autónomos, multifuncionales y orientados a resultados",
      features: ["Self-organizing teams", "Cross-functional skills", "Continuous improvement", "Customer focus"]
    }
  ];

  const deliveryMethods: DeliveryMethod[] = [
    {
      icon: <Presentation className="w-8 h-8" />,
      title: "Workshops y Talleres",
      description: "Sesiones intensivas de aprendizaje experiencial y co-creación",
      duration: "1-3 días"
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Programas por Fases",
      description: "Transformación gradual y sostenible con hitos y métricas claras",
      duration: "3-12 meses"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Certificaciones Internas",
      description: "Capacitación formal que asegura conocimientos y competencias",
      duration: "2-6 semanas"
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Coaching Continuo",
      description: "Acompañamiento personalizado para líderes y equipos",
      duration: "Ongoing"
    }
  ];

  const benefits: Benefit[] = [
    {
      icon: <RefreshCw className="w-8 h-8 text-lime-400" />,
      title: "Mayor Adaptabilidad",
      description: "Respuesta 3x más rápida a cambios del mercado y oportunidades emergentes",
      metric: "300% más ágil"
    },
    {
      icon: <Gem className="w-8 h-8 text-lime-400" />,
      title: "Innovación Disruptiva",
      description: "Incremento significativo en ideas implementadas y productos innovadores",
      metric: "5x más innovación"
    },
    {
      icon: <Smile className="w-8 h-8 text-lime-400" />,
      title: "Mejor Clima Laboral",
      description: "Aumento en satisfacción, engagement y retención de talento clave",
      metric: "85%+ satisfacción"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-lime-400" />,
      title: "Eficiencias Operativas",
      description: "Reducción de waste, optimización de procesos y mayor productividad",
      metric: "40% más eficiente"
    },
    {
      icon: <Target className="w-8 h-8 text-lime-400" />,
      title: "Equipos de Alto Desempeño",
      description: "Teams autónomos que entregan valor de forma consistente y predecible",
      metric: "90%+ on-time delivery"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-lime-400" />,
      title: "Mejores Indicadores de Personal",
      description: "Reducción de turnover, absentismo y mejora en evaluaciones de desempeño",
      metric: "50% menos turnover"
    }
  ];

  const technologies: Technology[] = [
    {
      Icon: Users,
      title: "Plataformas Colaborativas",
      description: "Herramientas que facilitan la comunicación y trabajo en equipo",
      tools: ["Slack", "Microsoft Teams", "Miro", "Confluence"]
    },
    {
      Icon: Monitor,
      title: "Dashboards de Seguimiento",
      description: "Visualización en tiempo real de métricas y KPIs ágiles",
      tools: ["Jira", "Azure DevOps", "Monday", "Notion"]
    },
    {
      Icon: BarChart3,
      title: "Analytics Ágiles",
      description: "Análisis de datos para toma de decisiones basada en evidencia",
      tools: ["Power BI", "Tableau", "Google Analytics", "Mixpanel"]
    },
    {
      Icon: Zap,
      title: "Herramientas CI/CD",
      description: "Automatización para entregas rápidas y de calidad",
      tools: ["GitHub Actions", "Jenkins", "Docker", "Kubernetes"]
    }
  ];

  const targetAudience: TargetAudience[] = [
    {
      icon: <Rocket className="w-8 h-8 text-lime-400" />,
      title: "PyMEs Modernizándose",
      description: "Empresas en crecimiento que buscan agilidad para competir",
      needs: ["Procesos eficientes", "Cultura colaborativa", "Adaptabilidad", "Retención de talento"]
    },
    {
      icon: <Building className="w-8 h-8 text-lime-400" />,
      title: "Corporativos Innovando",
      description: "Grandes organizaciones transformando su cultura tradicional",
      needs: ["Breaking silos", "Innovation culture", "Digital mindset", "Change management"]
    },
    {
      icon: <Users2 className="w-8 h-8 text-lime-400" />,
      title: "Equipos Específicos",
      description: "Departamentos que quieren ser más ágiles y efectivos",
      needs: ["Team building", "Cross-functional skills", "Self-organization", "Continuous improvement"]
    },
    {
      icon: <Crown className="w-8 h-8 text-lime-400" />,
      title: "Líderes y C-Suite",
      description: "Ejecutivos comprometidos con la transformación organizacional",
      needs: ["Agile leadership", "Change vision", "Culture design", "Results measurement"]
    }
  ];

  const whyAurhora: WhyAurhora[] = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Enfoque Humano Estructurado",
      description: "Combinamos la sensibilidad humana con metodologías probadas y métricas claras"
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Experiencia Ejecutiva",
      description: "Consultores con background C-level que entienden los desafíos del negocio"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "ADN Tecnológico",
      description: "Integramos naturally la evolución cultural con la transformación digital"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Resultados Medibles",
      description: "Enfoque data-driven con KPIs claros y ROI demostrable en cada intervención"
    }
  ];

  const faqItems: FAQItem[] = [
    {
      question: "¿Qué es exactamente la cultura ágil y por qué es importante?",
      answer: "La cultura ágil es un conjunto de valores, principios y comportamientos que permiten a las organizaciones adaptarse rápidamente a los cambios, colaborar efectivamente y entregar valor de forma continua. Es importante porque en el mundo actual, las empresas que no pueden evolucionar rápidamente quedan obsoletas."
    },
    {
      question: "¿La transformación ágil es solo para equipos de tecnología?",
      answer: "No, definitivamente no. Aunque nació en tecnología, la agilidad se aplica exitosamente a marketing, ventas, RRHH, finanzas, operaciones y cualquier área que necesite adaptabilidad, colaboración y enfoque en resultados. Trabajamos con toda la organización."
    },
    {
      question: "¿Cómo se mide el éxito de una transformación ágil?",
      answer: "Utilizamos métricas tanto cuantitativas (time-to-market, productividad, quality metrics, employee satisfaction) como cualitativas (cultura, colaboración, innovación). Establecemos KPIs baseline y monitoreamos el progreso con dashboards en tiempo real."
    },
    {
      question: "¿Cuánto tiempo toma ver resultados tangibles?",
      answer: "Los primeros cambios visibles aparecen en 4-6 semanas (mayor colaboración, comunicación). Resultados medibles en 3-4 meses (eficiencias, satisfaction). La transformación cultural profunda toma 12-18 meses, pero con beneficios incrementales desde el inicio."
    },
    {
      question: "¿Cuál es el rol del liderazgo en esta transformación?",
      answer: "El liderazgo es crítico - deben ser los primeros en adoptar el mindset ágil, modelar los comportamientos deseados y crear las condiciones para que los equipos prosperen. Ofrecemos coaching específico para líderes y C-suite."
    }
  ];

  // Contact Form Logic
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.desafio) {
        alert('Por favor completa todos los campos requeridos');
        return;
    }
    console.log('Formulario de cultura ágil enviado:', formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setShowContactForm(false);
      setFormSubmitted(false);
      setFormData({ nombre: '', email: '', telefono: '', empresa: '', desafio: '', objetivos: '', source: '' });
    }, 5000);
  };

  const openContactModal = (source: string) => {
    setFormData(prev => ({
        ...prev,
        nombre: '', 
        email: '',
        telefono: '',
        empresa: '',
        desafio: '',
        objetivos: '',
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
              style={{ opacity: 0.4 }} 
            />
            
            {/* Dynamic Gradient Orbs */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
              <div 
                className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br from-lime-400 via-green-500 to-emerald-500 blur-3xl opacity-15 animate-pulse"
                style={{
                  left: `${mousePosition.x * 0.02 - 50}px`, 
                  top: `${mousePosition.y * 0.02 - 50}px`,
                  transform: `translate(-50%, -50%) scale(${1 + scrollYValue * 0.0002})`
                }}
              />
              <div 
                className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-gradient-to-tr from-green-500 via-lime-400 to-teal-500 blur-3xl opacity-10 animate-pulse"
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
                  <span className={`text-xs sm:text-sm font-semibold ${currentTheme.textSecondary} tracking-wider`}>TRANSFORMACIÓN ORGANIZACIONAL</span>
                </div>
                
                <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight`}>
                  <span className={`block bg-gradient-to-r from-lime-400 via-green-500 to-emerald-500 bg-clip-text text-transparent`}>
                    Cultura Ágil
                  </span>
                  <span className={`block ${currentTheme.text} mt-2`}>
                    y Evolución Organizacional
                  </span>
                </h1>
                
                <p className={`text-base sm:text-lg ${currentTheme.textSecondary} mb-8 max-w-xl mx-auto lg:mx-0`}>
                  Transformamos organizaciones desde las personas hacia arriba, creando culturas ágiles, 
                  adaptables e innovadoras que prosperan en la incertidumbre y generan resultados sostenibles.
                </p>
                
                <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start`}>
                  <button 
                    onClick={() => openContactModal('hero_diagnostico_madurez')} 
                    className={`group px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-gradient-to-r from-lime-400 via-green-500 to-emerald-500 text-white font-bold text-base sm:text-lg hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center relative overflow-hidden`}
                  >
                    <span className="relative z-10">Diagnóstico de Madurez Ágil</span>
                    <BarChart3 className="inline-block ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </button>
                  <a 
                    href="#enfoque" 
                    className={`px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl border-2 border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-white font-bold text-base sm:text-lg hover:scale-105 transform transition-all duration-300 flex items-center justify-center`}
                  >
                    Conoce Nuestro Enfoque
                    <DirectionIcon className="inline-block ml-2 w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Right Column: Animated Icons */}
              <div className={`hidden lg:flex justify-center items-center relative ${visibleSections['hero'] ? 'animate-fadeInUp animation-delay-200' : 'opacity-0'}`}>
                <div className="relative w-96 h-96">
                  <FloatingIcons />
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-lime-400/10 via-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-lime-400/20`}>
                    <div className="absolute inset-8 rounded-full bg-gradient-to-br from-lime-400/5 to-green-500/5 flex items-center justify-center">
                      <div className={`p-8 rounded-full bg-gradient-to-br from-lime-400 to-green-500 text-white shadow-2xl`}>
                        <Sprout className="w-24 h-24" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problems Section */}
        <section id="problemas" className={`py-16 md:py-24 ${currentTheme.bgSecondary} relative z-10`}>
          <div className="container mx-auto px-6">
            <div className={`text-center mb-12 md:mb-16 ${visibleSections['problemas'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Problemas que Resolvemos
              </h2>
              <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
                Identificamos y eliminamos los obstáculos organizacionales más comunes que frenan 
                la agilidad, innovación y crecimiento sostenible de las empresas.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {problems.map((problem, index) => (
                <div 
                  key={index} 
                  className={`group p-6 sm:p-8 rounded-2xl ${currentTheme.card} shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-l-lime-400 ${visibleSections['problemas'] ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`mb-5 p-3 inline-block rounded-xl bg-gradient-to-br from-lime-400/10 to-green-500/10 group-hover:scale-110 transition-transform`}>{problem.icon}</div>
                  <h3 className={`text-xl sm:text-2xl font-semibold mb-3 ${currentTheme.text}`}>{problem.title}</h3>
                  <p className={`text-sm sm:text-base ${currentTheme.textSecondary}`}>{problem.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section id="enfoque" className={`py-16 md:py-24 ${currentTheme.bg} relative z-10`}>
          <div className="container mx-auto px-6">
            <div className={`text-center mb-12 md:mb-16 ${visibleSections['enfoque'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Nuestro Enfoque Diferenciador
              </h2>
              <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
                Combinamos metodologías ágiles probadas con un profundo entendimiento del contexto 
                cultural latino y tecnologías que potencian la transformación.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {approaches.map((approach, index) => (
                <div 
                  key={index} 
                  className={`group p-6 sm:p-8 rounded-2xl ${currentTheme.card} shadow-lg hover:shadow-2xl text-center transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-l-green-500 ${visibleSections['enfoque'] ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`mb-5 p-3 inline-block rounded-xl bg-gradient-to-br from-green-500/10 to-lime-400/10 group-hover:scale-110 transition-transform`}>{approach.icon}</div>
                  <h3 className={`text-xl sm:text-2xl font-semibold mb-3 ${currentTheme.text}`}>{approach.title}</h3>
                  <p className={`text-sm sm:text-base ${currentTheme.textSecondary}`}>{approach.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Transformation Areas Section */}
        <section id="areas" className={`py-16 md:py-24 ${currentTheme.bgSecondary} relative z-10`}>
          <div className="container mx-auto px-6">
            <div className={`text-center mb-12 md:mb-16 ${visibleSections['areas'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Áreas de Transformación
              </h2>
              <p className={`text-lg ${currentTheme.textSecondary} max-w-3xl mx-auto`}>
                Trabajamos de forma integral en las dimensiones clave que determinan el éxito 
                de una transformación ágil sostenible y orientada a resultados.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {transformationAreas.map((area, index) => (
                <div 
                  key={index} 
                  className={`group p-6 rounded-2xl ${currentTheme.card} shadow-lg hover:shadow-2xl text-left transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-l-emerald-500 ${visibleSections['areas'] ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`mb-4 flex items-center text-emerald-500`}>
                    <div className={`p-2.5 rounded-lg bg-emerald-500/10 mr-4 group-hover:scale-110 transition-transform`}>
                       <area.Icon className="w-6 h-6 text-emerald-500" />
                    </div>
                    <h4 className={`text-lg sm:text-xl font-semibold ${currentTheme.text}`}>{area.title}</h4>
                  </div>
                  <p className={`text-sm ${currentTheme.textSecondary} mb-4`}>{area.description}</p>
                  <div className="space-y-1">
                    {area.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <Check className="w-4 h-4 text-lime-400 mr-2 flex-shrink-0" />
                        <span className={`text-xs ${currentTheme.textSecondary}`}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Methods Section */}
        <section id="metodos" className={`py-16 md:py-24 ${currentTheme.bg} relative z-10`}>
          <div className="container mx-auto px-6">
            <div className={`text-center mb-12 md:mb-16 ${visibleSections['metodos'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Métodos de Entrega
              </h2>
              <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
                Ofrecemos múltiples modalidades de intervención para adaptarnos a las necesidades, 
                presupuesto y cultura específica de cada organización.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {deliveryMethods.map((method, index) => (
                <div 
                  key={index} 
                  className={`group p-6 sm:p-8 rounded-2xl ${currentTheme.card} shadow-lg hover:shadow-2xl text-center transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-l-teal-500 ${visibleSections['metodos'] ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  >
                  <div className={`mb-5 p-4 inline-block rounded-xl bg-gradient-to-br from-teal-500/10 to-green-500/10 group-hover:scale-110 transition-transform`}>{method.icon}</div>
                  <h3 className={`text-xl sm:text-2xl font-semibold mb-3 ${currentTheme.text}`}>{method.title}</h3>
                  <p className={`text-sm sm:text-base ${currentTheme.textSecondary} mb-3`}>{method.description}</p>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium bg-teal-500/10 text-teal-600 border border-teal-500/20 inline-block`}>
                    {method.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="beneficios" className={`py-16 md:py-24 ${currentTheme.bgSecondary} relative z-10`}>
          <div className="container mx-auto px-6">
            <div className={`text-center mb-12 md:mb-16 ${visibleSections['beneficios'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Beneficios Tangibles
              </h2>
              <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
                Resultados medibles y sostenibles que impactan directamente en la competitividad, 
                rentabilidad y capacidad de adaptación de tu organización.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className={`group p-6 sm:p-8 rounded-2xl ${currentTheme.card} shadow-lg hover:shadow-2xl text-left transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-l-purple-500 ${visibleSections['beneficios'] ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`mb-5 p-3 inline-block rounded-xl bg-gradient-to-br from-purple-500/10 to-lime-400/10 group-hover:scale-110 transition-transform`}>{benefit.icon}</div>
                  <h3 className={`text-xl sm:text-2xl font-semibold mb-3 ${currentTheme.text}`}>{benefit.title}</h3>
                  <p className={`text-sm sm:text-base ${currentTheme.textSecondary} mb-3`}>{benefit.description}</p>
                  <div className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-lime-400 to-green-500 text-white inline-block`}>
                    {benefit.metric}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section id="tecnologia" className={`py-16 md:py-24 ${currentTheme.bg} relative z-10`}>
          <div className="container mx-auto px-6">
            <div className={`text-center mb-12 md:mb-16 ${visibleSections['tecnologia'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Tecnología Habilitadora
              </h2>
              <p className={`text-lg ${currentTheme.textSecondary} max-w-3xl mx-auto`}>
                Complementamos la transformación cultural con herramientas tecnológicas que 
                facilitan la colaboración, visibilidad y toma de decisiones basada en datos.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {technologies.map((tech, index) => (
                <div 
                  key={index} 
                  className={`group p-6 rounded-2xl ${currentTheme.card} shadow-lg hover:shadow-2xl text-left transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-l-blue-500 ${visibleSections['tecnologia'] ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`mb-4 flex items-center text-blue-500`}>
                    <div className={`p-2.5 rounded-lg bg-blue-500/10 mr-4 group-hover:scale-110 transition-transform`}>
                       <tech.Icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <h4 className={`text-lg sm:text-xl font-semibold ${currentTheme.text}`}>{tech.title}</h4>
                  </div>
                  <p className={`text-sm ${currentTheme.textSecondary} mb-4`}>{tech.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {tech.tools.map((tool, idx) => (
                      <span 
                        key={idx} 
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 border border-blue-500/20`}
                      >
                        {tool}
                      </span>
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
                ¿Quién Se Beneficia Más?
              </h2>
              <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
                Trabajamos con organizaciones de todos los tamaños que buscan evolucionar 
                su cultura para ser más ágiles, innovadoras y centradas en resultados.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {targetAudience.map((item, index) => (
                <div 
                  key={index} 
                  className={`group p-6 sm:p-8 rounded-2xl ${currentTheme.card} shadow-lg hover:shadow-2xl text-center transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-l-yellow-500 ${visibleSections['publico'] ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  >
                  <div className={`mb-5 p-4 inline-block rounded-xl bg-gradient-to-br from-yellow-500/10 to-lime-400/10 group-hover:scale-110 transition-transform`}>{item.icon}</div>
                  <h3 className={`text-xl sm:text-2xl font-semibold mb-3 ${currentTheme.text}`}>{item.title}</h3>
                  <p className={`text-sm sm:text-base ${currentTheme.textSecondary} mb-4`}>{item.description}</p>
                  <div className="space-y-1">
                    {item.needs.map((need, idx) => (
                      <div key={idx} className="flex items-center justify-center">
                        <Check className="w-4 h-4 text-lime-400 mr-2 flex-shrink-0" />
                        <span className={`text-xs ${currentTheme.textSecondary}`}>{need}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Aurhora Section */}
        <section id="porque" className={`py-16 md:py-24 ${currentTheme.bg} relative z-10`}>
          <div className="container mx-auto px-6">
            <div className={`text-center mb-12 md:mb-16 ${visibleSections['porque'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                ¿Por Qué Elegirnos?
              </h2>
              <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
                Combinamos experiencia empresarial senior con metodologías probadas y 
                un enfoque único que integra cultura, tecnología y resultados medibles.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {whyAurhora.map((item, index) => (
                <div 
                  key={index} 
                  className={`group p-6 sm:p-8 rounded-2xl ${currentTheme.card} shadow-lg hover:shadow-2xl text-center transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-l-pink-500 ${visibleSections['porque'] ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                  >
                  <div className={`mb-6 p-4 inline-block rounded-xl bg-gradient-to-br from-pink-500/10 to-lime-400/10 group-hover:scale-110 transition-transform`}>{item.icon}</div>
                  <h3 className={`text-2xl sm:text-2xl font-semibold mb-4 ${currentTheme.text}`}>{item.title}</h3>
                  <p className={`text-base ${currentTheme.textSecondary}`}>{item.description}</p>
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
                Resolvemos las dudas más comunes sobre transformación ágil, cultura organizacional 
                y nuestro enfoque de implementación.
              </p>
            </div>
            <div className="space-y-5">
              {faqItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`${currentTheme.card} rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition-shadow duration-300 border-l-4 border-l-lime-400 ${visibleSections['faq'] ? 'animate-fadeInUp' : 'opacity-0'}`}
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
          <div className={`absolute inset-0 bg-gradient-to-br from-lime-400/5 via-green-500/5 to-emerald-500/5`}></div>
          <div className={`container mx-auto px-6 text-center relative z-10 ${visibleSections['contacto'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              ¿Listo para{" "}
              <span className={`bg-gradient-to-r from-lime-400 via-green-500 to-emerald-500 bg-clip-text text-transparent`}>
                Transformar
              </span>{" "}
              tu Cultura?
            </h2>
            <p className={`text-lg sm:text-xl ${currentTheme.textSecondary} mb-10 max-w-2xl mx-auto`}>
              Evoluciona hacia una organización ágil, adaptable e innovadora que prospere 
              en la incertidumbre y genere resultados excepcionales.
            </p>
            
            <div className="flex justify-center">
               <button 
                 onClick={() => openContactModal('cta_final_sesion_estrategica')} 
                 className={`group px-10 py-5 rounded-xl bg-gradient-to-r from-lime-400 via-green-500 to-emerald-500 text-white text-xl font-bold hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center relative overflow-hidden`}
               >
                  <span className="relative z-10">Agendar Sesión Estratégica Ágil</span>
                  <Calendar className="inline-block ml-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </button>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-10 text-sm">
              <div className="flex items-center">
                <Heart className={`w-5 h-5 text-lime-400 mr-2`} />
                <span className={currentTheme.textSecondary}>Enfoque Humano</span>
              </div>
              <div className="flex items-center">
                <Sprout className={`w-5 h-5 text-green-500 mr-2`} />
                <span className={currentTheme.textSecondary}>Cultura Ágil</span>
              </div>
              <div className="flex items-center">
                <Star className={`w-5 h-5 text-emerald-500 mr-2`} />
                <span className={currentTheme.textSecondary}>Resultados Medibles</span>
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
                onClick={() => setShowContactForm(false)}
                aria-label="Cerrar formulario"
                className={`absolute top-4 right-4 p-2 rounded-full ${currentTheme.hover} hover:scale-110 transition-all`}
              >
                <X className={`w-6 h-6 ${currentTheme.textSecondary}`} />
              </button>

              {formSubmitted ? (
                <div className="text-center py-10 sm:py-12">
                  <CheckCircleIcon className="w-16 h-16 sm:w-20 sm:h-20 text-lime-400 mx-auto mb-5 animate-bounce" />
                  <h3 className={`text-2xl sm:text-3xl font-bold mb-2 ${currentTheme.text}`}>¡Solicitud Recibida!</h3>
                  <p className={`${currentTheme.textSecondary} text-base sm:text-lg`}>
                    Nuestro equipo de transformación organizacional te contactará en las próximas 24 horas 
                    para agendar tu sesión estratégica.
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
                      className={`px-4 py-2 rounded-lg bg-gradient-to-r from-lime-400 to-green-500 text-white text-sm hover:scale-105 transition-all`}
                    >
                      Cerrar ahora
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className={`text-2xl sm:text-3xl font-bold mb-1 text-center ${currentTheme.text}`}>Transformación Ágil</h3>
                  <p className={`text-center ${currentTheme.textSecondary} mb-6 text-sm sm:text-base`}>
                    Cuéntanos sobre tu organización para diseñar una propuesta de transformación cultural personalizada.
                  </p>
                  
                  <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-5">
                    <div>
                      <label htmlFor="agil-nombre" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>
                        Nombre completo *
                      </label>
                      <input
                        type="text" id="agil-nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required
                        className={`w-full px-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-lime-400/70 transition-all`}
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div>
                      <label htmlFor="agil-email" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`} />
                        <input
                          type="email" id="agil-email" name="email" value={formData.email} onChange={handleInputChange} required
                          className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-lime-400/70 transition-all`}
                          placeholder="tu@empresa.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label htmlFor="agil-telefono" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>
                          Teléfono
                        </label>
                        <div className="relative">
                          <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`} />
                          <input
                            type="tel" id="agil-telefono" name="telefono" value={formData.telefono} onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-lime-400/70 transition-all`}
                            placeholder="+52 123 456 7890"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="agil-empresa" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>
                          Empresa
                        </label>
                        <div className="relative">
                          <Building className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`} />
                          <input
                            type="text" id="agil-empresa" name="empresa" value={formData.empresa} onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-lime-400/70 transition-all`}
                            placeholder="Nombre de tu empresa"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="agil-desafio" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>
                        Desafío actual de tu organización *
                      </label>
                      <textarea
                        id="agil-desafio" name="desafio" value={formData.desafio} onChange={handleInputChange} rows={3} required
                        className={`w-full px-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-lime-400/70 transition-all resize-none`}
                        placeholder="Ej: Equipos trabajan en silos, lentitud para adaptarse a cambios, baja innovación, resistencia cultural..."
                      />
                    </div>
                    <div>
                      <label htmlFor="agil-objetivos" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>
                        Objetivos de transformación
                      </label>
                      <textarea
                        id="agil-objetivos" name="objetivos" value={formData.objetivos} onChange={handleInputChange} rows={3}
                        className={`w-full px-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-lime-400/70 transition-all resize-none`}
                        placeholder="Ej: Mayor agilidad, cultura de innovación, equipos autónomos, mejor clima laboral, time-to-market..."
                      />
                    </div>
                    <input type="hidden" name="source" value={formData.source} />
                    <button
                      type="submit"
                      className={`w-full py-3 mt-2 rounded-lg bg-gradient-to-r from-lime-400 via-green-500 to-emerald-500 text-white font-bold text-base sm:text-lg hover:scale-[1.02] transform transition-all duration-300 shadow-lg hover:shadow-xl group flex items-center justify-center`}
                    >
                      Solicitar Diagnóstico Ágil
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
              const whatsappUrl = "https://wa.me/525616026685?text=Hola%20Aurhora!%0A%0AVisite%20su%20sitio%20web%20y%20me%20interesa%20conocer%20mas%20sobre%20su%20servicio%20de%20Cultura%20Agil%20y%20Transformacion%20Organizacional.%0A%0AMi%20organizacion%20necesita%3A%0A%0A-%20Mayor%20agilidad%20y%20adaptabilidad%0A-%20Cultura%20de%20innovacion%0A-%20Equipos%20de%20alto%20desempeno%0A-%20Metodologias%20agiles%0A-%20Transformacion%20cultural%0A%0ACuando%20podriamos%20agendar%20una%20sesion%20para%20evaluar%20nuestra%20madurez%20agil%3F";
              window.open(whatsappUrl, '_blank');
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
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
              <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                ¡Cultura Ágil!
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
    className={`w-6 h-6 transform transition-transform duration-300 ease-in-out ${open ? 'rotate-180' : ''} ${open ? 'text-lime-400' : 'text-gray-400 group-hover:text-gray-500'}`}
  />
);
