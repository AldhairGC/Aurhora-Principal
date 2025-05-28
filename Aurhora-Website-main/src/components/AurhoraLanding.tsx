// AurhoraLanding.tsx
'use client'

import React, { useState, useEffect, useRef } from 'react';
import { 
    ChevronRight, Code, Users, Rocket, Globe, ArrowRight, Mail, Phone, Building, Send, CheckCircle, Calendar, TrendingUp, Target, Award, X as IconX 
} from 'lucide-react';
import ClientLayout from './ClientLayout';
import { useTheme } from '@/context/ThemeContext'; // AGREGADO: Usar el contexto global

// Interfaz para el FormData
interface LandingFormData {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  mensaje: string;
  selectedPlan?: string;
  source?: string;
}

const AurhoraLanding = () => {
  // CAMBIADO: Usar el contexto global en lugar de estado local
  const { theme, currentTheme } = useTheme();
  
  // ELIMINADO: const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  
  const [formData, setFormData] = useState<LandingFormData>({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    mensaje: '',
    selectedPlan: '', 
    source: '',      
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // ELIMINADO: useEffect para tema local - ahora lo maneja el contexto global

  useEffect(() => {
    if (!isClient) return; 

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isClient]); 

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
    if (!isClient || !particlesEnabled || !canvasRef.current) return; 
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particlesArray: any[] = []; 

    const setupParticles = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particlesArray.length = 0; 
        const particleCount = Math.min(60, Math.floor(window.innerWidth / 25)); 
        
        for (let i = 0; i < particleCount; i++) {
          particlesArray.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * 1000, 
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            vz: (Math.random() - 0.5) * 0.8, 
            size: Math.random() * 1.2 + 0.3,
            opacity: Math.random() * 0.3 + 0.05
          });
        }
    };

    setupParticles(); 

    const animate = () => {
      ctx.fillStyle = theme === 'dark' ? 'rgba(17, 24, 39, 0.03)' : 'rgba(249, 250, 251, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particlesArray.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        if (particle.z < 1 || particle.z > 1000) particle.vz *= -1; 
        
        const scale = 1000 / (1000 + particle.z); 
        const x2d = (particle.x - canvas.width / 2) * scale + canvas.width / 2;
        const y2d = (particle.y - canvas.height / 2) * scale + canvas.height / 2;
        const size = Math.max(0, particle.size * scale); 
        
        if (size > 0.1) {
            ctx.beginPath();
            ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
            const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size);
            gradient.addColorStop(0, theme === 'dark' 
              ? `rgba(6, 182, 212, ${Math.min(1, particle.opacity * scale * 0.8)})` 
              : `rgba(168, 85, 247, ${Math.min(1, particle.opacity * scale * 0.8)})`);
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fill();
        }
        
        for (let j = i + 1; j < particlesArray.length; j++) {
            const particle2 = particlesArray[j];
            const dx = particle.x - particle2.x;
            const dy = particle.y - particle2.y;
            const dz = particle.z - particle2.z; 
            const distance = Math.sqrt(dx * dx + dy * dy + dz*dz);
            const connectionDistance = 120; 

            if (distance < connectionDistance) {
              const opacity = Math.max(0, (1 - distance / connectionDistance) * 0.2 * scale); 
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
                ctx.lineWidth = 0.3; 
                ctx.stroke();
              }
            }
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      setupParticles(); 
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
    }
  }, [theme, particlesEnabled, isClient]); 

  // ELIMINADO: colores locales - ahora usa currentTheme del contexto global

  // Services array adaptado para usar currentTheme del contexto
  const services = [
    {
      id: 6,
      title: "GoDigital Suite",
      description: 'Ecosistema digital integral <strong class="text-cyan-400">"llave en mano"</strong> con presencia online profesional y gestión de clientes. <strong class="text-cyan-400">Implementación en 1-2 semanas</strong>.',
      link: "/servicios/godigital", 
      linkText: "Conocer GoDigital",
      icon: <Globe className="w-8 h-8" />,
      bgColor: theme === 'dark' ? "bg-cyan-900/50" : "bg-cyan-100",
      borderColor: theme === 'dark' ? "border-cyan-700/30" : "border-cyan-300",
      iconColor: "text-cyan-500",
      available: true,
    },
    {
      id: 2,
      title: "Estrategia de Innovación y Transformación Digital",
      description: "Co-creamos tu roadmap tecnológico y digital, identificando oportunidades de innovación para acelerar resultados.",
      link: "/servicios/transformacion-digital",
      linkText: "Impulsar Innovación",
      icon: <Rocket className="w-8 h-8" />,
      bgColor: theme === 'dark' ? "bg-blue-900/50" : "bg-blue-100",
      borderColor: theme === 'dark' ? "border-blue-700/30" : "border-blue-300",
      iconColor: "text-blue-500",
      available: true,
    },
    {
      id: 3,
      title: "Desarrollo de Software y Productos Digitales",
      description: 'Diseñamos, <strong class="text-purple-400">construimos y desplegamos</strong> software a medida y productos digitales innovadores que potencian tu estrategia.',
      link: "/servicios/desarrollo-software",
      linkText: "Explorar Desarrollo",
      icon: <Code className="w-8 h-8" />,
      bgColor: theme === 'dark' ? "bg-purple-900/50" : "bg-purple-100",
      borderColor: theme === 'dark' ? "border-purple-700/30" : "border-purple-300",
      iconColor: "text-purple-500",
      available: true,
    },
    {
      id: 1,
      title: "Optimización de Procesos y Calidad",
      description: "Diseñamos e implementamos SGC (ej. ISO), optimizando tu operación para la excelencia y certificaciones.",
      link: "/servicios/optimizacion-procesos",
      linkText: "Descubrir Optimización",
      icon: <CheckCircle className="w-8 h-8" />,
      bgColor: theme === 'dark' ? "bg-emerald-900/50" : "bg-emerald-100",
      borderColor: theme === 'dark' ? "border-emerald-700/30" : "border-emerald-300",
      iconColor: "text-emerald-500",
      available: true,
    },
    {
      id: 4,
      title: "Impulso y Marketing Digital",
      description: 'Definimos y <strong class="text-pink-400">gestionamos</strong> estrategias de marketing digital para lanzar y posicionar tus productos y servicios.',
      link: "/servicios/impulso-marketing",
      linkText: "Ver Estrategias",
      icon: <TrendingUp className="w-8 h-8" />,
      bgColor: theme === 'dark' ? "bg-pink-900/50" : "bg-pink-100",
      borderColor: theme === 'dark' ? "border-pink-700/30" : "border-pink-300",
      iconColor: "text-pink-500",
      available: true,
    },
    {
      id: 5,
      title: "Cultura Ágil y Transformación Organizacional",
      description: '<strong class="text-amber-400">Trabajamos desde adentro con tus equipos</strong> para implementar metodologías ágiles, gestionar el cambio y fomentar una cultura de innovación sostenible.',
      link: "/servicios/cultura-agil",
      linkText: "Transformar Equipos",
      icon: <Users className="w-8 h-8" />,
      bgColor: theme === 'dark' ? "bg-amber-900/50" : "bg-amber-100",
      borderColor: theme === 'dark' ? "border-amber-700/30" : "border-amber-300",
      iconColor: "text-amber-500",
      available: true,
    },
  ];

  const philosophyItems = [
  {
    title: "Gestión Integral",
    description: "Conectamos y gestionamos el talento y las herramientas precisas (internas/externas) para cada desafío, asegurando una ejecución sinérgica y eficiente.",
    icon: <Target className="w-8 h-8" />,
    color: "cyan",
    gradientClass: "from-cyan-500/20",
    textClass: "text-cyan-500"
  },
  {
    title: "Co-creación Inteligente",
    description: "Trabajamos contigo. Fusionamos tu conocimiento del negocio con nuestra experiencia en metodologías de innovación y transformación.",
    icon: <Users className="w-8 h-8" />,
    color: "purple",
    gradientClass: "from-purple-500/20",
    textClass: "text-purple-500"
  },
  {
    title: "Orientación a Soluciones",
    description: "Nos enfocamos en encontrar las vías más efectivas y pragmáticas para alcanzar tus metas, superando desafíos con un enfoque resolutivo.",
    icon: <Award className="w-8 h-8" />,
    color: "pink",
    gradientClass: "from-pink-500/20",
    textClass: "text-pink-500"
  },
];

  const transformationSteps = [
    {
      number: 1,
      title: "Diagnóstico y Oportunidad",
      description: "Inmersión profunda para entender contexto, retos y oportunidades de innovación.",
      color: "cyan",
    },
    {
      number: 2,
      title: "Estrategia y Co-Diseño",
      description: "Co-creación de la visión, roadmap estratégico y diseño de soluciones transformadoras.",
      color: "blue",
    },
    {
      number: 3,
      title: "Plan de Acción y Habilitación",
      description: "Entrega del plan detallado, preparación de equipos y habilitación tecnológica.",
      color: "purple",
    },
    {
      number: 4,
      title: "Implementación y Desarrollo",
      description: '<strong class="text-gray-100">Lideramos la ejecución</strong>, construimos las soluciones tecnológicas y <strong class="text-gray-100">gestionamos el cambio</strong> organizacional desde adentro.',
      color: "pink",
    },
    {
      number: 5,
      title: "Mejora y Evolución Continua",
      description: 'Medición de resultados, <strong class="text-gray-100">iteración ágil</strong>, optimización constante y soporte para la sostenibilidad del cambio.',
      color: "amber",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLandingFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.mensaje) {
        alert("Por favor, completa los campos obligatorios: Nombre, Email y Mensaje."); 
        return;
    }
    console.log('Formulario de Landing Page enviado:', formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setShowContactForm(false);
      setFormSubmitted(false);
      setFormData({ nombre: '', email: '', telefono: '', empresa: '', mensaje: '', selectedPlan: '', source: '' });
    }, 3000);
  };

  const openContactModal = (source: string, planName?: string) => {
    setFormData(prev => ({
        ...prev,
        nombre: '', 
        email: '',
        telefono: '',
        empresa: '',
        mensaje: '',
        selectedPlan: planName || '', 
        source: source, 
    }));
    setFormSubmitted(false); 
    setShowContactForm(true);
  };

  // Definir colores de gradiente dinámicos basados en el tema actual
  const gradientColors = {
    bg: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
    bgSecondary: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
    gradient: 'from-cyan-500 via-purple-500 to-pink-500',
    gradientText: theme === 'dark' ? 'from-cyan-400 via-purple-400 to-pink-400' : 'from-cyan-600 via-purple-600 to-pink-600',
    ctaButton: theme === 'dark' 
      ? 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-gray-900 font-semibold'
      : 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white',
    inputBg: theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300',
    hover: theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
  };

  return (
    <ClientLayout
        services={services}
        openContactModal={openContactModal}
    >
        {/* CAMBIADO: Usar currentTheme del contexto en lugar de currentTheme local */}
        <div className={`font-['Inter',_sans-serif] transition-all duration-500 relative overflow-x-hidden ${gradientColors.bg} ${currentTheme.text}`}>
            {isClient && (
                <>
                <canvas 
                    ref={canvasRef} 
                    className="fixed inset-0 pointer-events-none z-0"
                    style={{ opacity: 0.4 }} 
                />
                <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                    <div 
                    className={`absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br ${gradientColors.gradient} blur-3xl opacity-20 animate-pulse`}
                    style={{
                        left: `${mousePosition.x * 0.03 - 50}px`, 
                        top: `${mousePosition.y * 0.03 - 50}px`,
                        transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.0003})` 
                    }}
                    />
                    <div 
                    className={`absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-gradient-to-tr ${gradientColors.gradient} blur-3xl opacity-15 animate-pulse`}
                    style={{
                        right: `${(window.innerWidth - mousePosition.x) * 0.03 - 100}px`, 
                        bottom: `${(window.innerHeight - mousePosition.y) * 0.03 - 100}px`, 
                        animationDelay: '0.5s',
                        transform: `scale(${1 + scrollY * 0.0002})`
                    }}
                    />
                </div>
                </>
            )}

            {/* Hero Section */}
            <section id="hero" className="relative min-h-[calc(100vh-88px)] flex items-center justify-center py-20 z-10"> 
                <div className="container mx-auto px-6 text-center">
                <h2 className={`text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight relative ${visibleSections['hero'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
                    <span className={`inline-block`}>
                    Impulsando la&nbsp;
                    </span>
                    <span className={`inline-block bg-gradient-to-r ${gradientColors.gradientText} bg-clip-text text-transparent animate-pulse`}>
                    Innovación
                    </span>
                    <span className="block text-3xl md:text-5xl lg:text-6xl mt-4">
                    <span className={`bg-gradient-to-r ${gradientColors.gradient} bg-clip-text text-transparent`}>
                        Resultados que Transforman.
                    </span>
                    </span>
                </h2>
                
                <p className={`text-xl md:text-2xl ${currentTheme.textSecondary} max-w-3xl mx-auto mb-12 leading-relaxed ${visibleSections['hero'] ? 'animate-fadeInUp animation-delay-200' : 'opacity-0'}`}>
                    Aurhora Agency: Tu socio estratégico en transformación digital y
                    optimización de procesos. Integramos visión, tecnología y ejecución
                    experta para maximizar tu potencial.
                </p>

                <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${visibleSections['hero'] ? 'animate-fadeInUp animation-delay-400' : 'opacity-0'}`}>
                    <button
                    onClick={() => openContactModal('hero_inicia_transformacion')}
                    className={`group px-8 py-4 rounded-full ${gradientColors.ctaButton} text-lg hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden`}
                    >
                    <span className="relative z-10 flex items-center">
                        Inicia tu Transformación
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    </button>
                    
                    <a
                    href="#servicios"
                    className={`px-8 py-4 rounded-full border-2 ${currentTheme.border} ${currentTheme.text} font-bold text-lg hover:scale-105 transform transition-all duration-300 ${gradientColors.hover}`}
                    >
                    Explorar Servicios
                    </a>
                </div>

                <p className={`mt-8 text-sm ${currentTheme.textSecondary} ${visibleSections['hero'] ? 'animate-fadeInUp animation-delay-600' : 'opacity-0'}`}>
                    +10 años impulsando la innovación | Seguros | Banca | Fintech
                </p>

                {isClient && ( 
                    <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-10 animate-float opacity-50 md:opacity-100">
                        <Code className="w-10 h-10 md:w-12 md:h-12 text-cyan-500/70" />
                    </div>
                    <div className="absolute top-40 right-10 md:right-20 animate-float opacity-50 md:opacity-100" style={{animationDelay: '1s'}}>
                        <Globe className="w-12 h-12 md:w-16 md:h-16 text-purple-500/70" />
                    </div>
                    <div className="absolute bottom-20 left-1/4 animate-float opacity-50 md:opacity-100" style={{animationDelay: '2s'}}>
                        <Rocket className="w-8 h-8 md:w-10 md:h-10 text-pink-500/70" />
                    </div>
                    </div>
                )}
                </div>
            </section>

            {/* Services Section */}
            <section id="servicios" className="py-20 relative z-10">
                <div className="container mx-auto px-6">
                <div className={`text-center mb-16 ${visibleSections['servicios'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
                    <h3 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className={`bg-gradient-to-r ${gradientColors.gradientText} bg-clip-text text-transparent`}>
                        Nuestras Capacidades Estratégicas
                    </span>
                    </h3>
                    <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
                    Desde la estrategia hasta la implementación y evolución, cubrimos el
                    espectro de la transformación.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service, index) => (
                    <div 
                        key={service.id || index}
                        className={`group relative p-8 rounded-2xl ${service.bgColor} border-2 ${service.borderColor} hover:shadow-xl hover:scale-105 transform transition-all duration-300 ${
                        visibleSections['servicios'] ? 'animate-fadeInUp' : 'opacity-0'
                        } ${service.available ? 'cursor-pointer' : 'cursor-default'}`} 
                        style={{
                        animationDelay: `${index * 100}ms`,
                        }}
                        onMouseEnter={() => setActiveService(index)}
                        onMouseLeave={() => setActiveService(null)}
                        onClick={() => {
                            if (service.available && service.link) {
                                window.location.href = service.link;
                            } else if (service.available) {
                                openContactModal(`servicio_card_no_link: ${service.title}`);
                            }
                        }}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl pointer-events-none`} />
                        
                        <div className={`mb-5 ${service.iconColor} ${
                        index % 2 === 0 ? 'group-hover:animate-bounce' : 'group-hover:animate-pulse' 
                        }`}>
                        {service.icon}
                        </div>
                        
                        <h4 className={`text-xl font-bold mb-3 ${currentTheme.text}`}>
                        {service.title}
                        </h4>
                        
                        <p className={`${currentTheme.textSecondary} text-sm mb-5 min-h-[60px]`} 
                        dangerouslySetInnerHTML={{ __html: service.description }} />
                        
                        {service.available ? (
                        <span 
                            className={`font-semibold ${service.iconColor} group inline-flex items-center text-sm hover:underline`}
                        >
                            {service.linkText || "Más Información"} 
                            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                        ) : (
                        <span className={`text-sm font-semibold ${currentTheme.textSecondary}`}>
                            Próximamente...
                        </span>
                        )}
                        
                        {activeService === index && (
                        <div className={`absolute -inset-1 bg-gradient-to-r ${gradientColors.gradient} opacity-20 blur-lg rounded-2xl pointer-events-none transition-opacity duration-300`} />
                        )}
                    </div>
                    ))}
                </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section id="philosophy" className={`py-20 ${gradientColors.bgSecondary} relative overflow-hidden z-10`}>
                <div className="absolute top-1/2 -left-48 w-96 h-96 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full opacity-5 dark:opacity-10 transform -translate-y-1/2 blur-3xl pointer-events-none"></div>
                <div className="container mx-auto px-6 relative z-10">
                <div className={`text-center mb-16 ${visibleSections['philosophy'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
                    <h3 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className={`bg-gradient-to-r ${gradientColors.gradientText} bg-clip-text text-transparent`}>
                        Nuestra Filosofía
                    </span>
                    </h3>
                    <p className={`text-lg ${currentTheme.textSecondary} max-w-3xl mx-auto`}>
                    No solo resolvemos problemas, co-creamos futuro. Integramos
                    estrategia, talento y tecnología para impulsar una transformación
                    digital real y resultados medibles.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    {philosophyItems.map((item, index) => (
                    <div
                        key={index}
                        className={`text-center p-8 rounded-2xl ${currentTheme.card} transform hover:scale-105 transition-all duration-300 border ${currentTheme.border} ${
                        visibleSections['philosophy'] ? 'animate-fadeInUp' : 'opacity-0'
                        }`}
                        style={{ animationDelay: `${index * 150}ms` }}
                    >
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${item.gradientClass} to-transparent mb-6 group-hover:scale-110 transition-transform duration-300 border-2 border-${item.color}-500/20`}>
                        <div className={item.textClass}>
                            {React.cloneElement(item.icon, { className: `w-8 h-8`})}
                        </div>
                        </div>
                        <h4 className={`text-xl font-semibold mb-3 ${currentTheme.text}`}>
                        {item.title}
                        </h4>
                        <p className={`${currentTheme.textSecondary}`}>
                        {item.description}
                        </p>
                    </div>
                    ))}
                </div>
                </div>
            </section>

            {/* Enfoque Section */}
            <section id="enfoque" className={`py-20 ${gradientColors.bg} relative z-10`}>
                <div className="container mx-auto px-6">
                <div className={`text-center mb-16 ${visibleSections['enfoque'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
                    <h3 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className={`bg-gradient-to-r ${gradientColors.gradientText} bg-clip-text text-transparent`}>
                        Nuestro Proceso de Transformación
                    </span>
                    </h3>
                    <p className={`text-lg ${currentTheme.textSecondary} max-w-3xl mx-auto`}>
                    Una metodología colaborativa en 5 fases, desde la visión hasta la
                    evolución continua.
                    </p>
                </div>
                <div className="relative px-4">
                    <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-1.5 bg-gradient-to-r from-cyan-500/70 via-purple-500/70 to-pink-500/70 rounded-full opacity-30"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-8 relative z-10">
                    {transformationSteps.map((step, index) => (
                        <div
                        key={index}
                        className={`flex flex-col items-center text-center group ${
                            visibleSections['enfoque'] ? 'animate-fadeInUp' : 'opacity-0'
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                        >
                        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${
                            step.color === 'cyan' ? 'from-cyan-500 to-cyan-600' :
                            step.color === 'blue' ? 'from-blue-500 to-blue-600' :
                            step.color === 'purple' ? 'from-purple-500 to-purple-600' :
                            step.color === 'pink' ? 'from-pink-500 to-pink-600' :
                            'from-amber-500 to-amber-600'
                            } text-white text-3xl font-bold flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transform transition-all duration-300`}
                        >
                            {step.number}
                        </div>
                        <h4 className={`text-lg font-semibold mb-2 ${currentTheme.text}`}>
                            {step.title}
                        </h4>
                        <p className={`text-sm ${currentTheme.textSecondary}`}
                            dangerouslySetInnerHTML={{ __html: step.description }} />
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            </section>

            {/* Nosotros Section */}
            <section id="nosotros" className={`py-20 ${gradientColors.bgSecondary} relative overflow-hidden z-10`}>
                <div className="absolute top-1/2 -right-48 w-96 h-96 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full opacity-5 dark:opacity-10 transform -translate-y-1/2 blur-3xl pointer-events-none"></div>
                <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div 
                    className={`space-y-6 ${visibleSections['nosotros'] ? 'animate-fadeInLeft' : 'opacity-0'}`}
                    >
                    <span className={`inline-block px-4 py-1.5 bg-gradient-to-r ${gradientColors.gradient}/10 border border-purple-500/30 text-purple-500 text-xs font-semibold rounded-full uppercase tracking-wider`}>
                        Nuestra Experiencia
                    </span>
                    <h3 className="text-4xl md:text-5xl font-bold">
                        <span className={`bg-gradient-to-r ${gradientColors.gradientText} bg-clip-text text-transparent`}>
                        Transformando Negocios
                        </span>
                        <br />
                        <span className={currentTheme.text}>Sin Límites Sectoriales</span>
                    </h3>
                    <p className={`text-lg ${currentTheme.textSecondary} leading-relaxed`}>
                        Nuestra{" "}
                        <strong className={currentTheme.text}>
                        metodología de gestión integral y enfoque en soluciones
                        </strong>{" "}
                        es inherentemente adaptable, permitiéndonos generar valor
                        significativo en{" "}
                        <strong className={currentTheme.text}>
                        prácticamente cualquier industria
                        </strong>
                        . Complementamos nuestro núcleo experto con una{" "}
                        <strong className={currentTheme.text}>
                        amplia red de especialistas sectoriales
                        </strong>{" "}
                        para asegurar el conocimiento profundo requerido en cada proyecto.
                    </p>
                    <p className={`text-lg ${currentTheme.textSecondary} leading-relaxed`}>
                        Contamos con una trayectoria destacada y casos de éxito
                        comprobables en <strong className="text-cyan-500">Seguros</strong>
                        , <strong className="text-blue-500">Banca</strong> y{" "}
                        <strong className="text-purple-500">Fintech</strong>. Colaboramos
                        estrechamente tanto con{" "}
                        <strong className={currentTheme.text}>
                        Pymes, Startups y empresas en crecimiento
                        </strong>{" "}
                        como con{" "}
                        <strong className={currentTheme.text}>grandes corporativos</strong>,
                        adaptando nuestro enfoque para maximizar el potencial único de
                        cada organización.
                    </p>
                    <div className={`pt-6 border-t ${currentTheme.border}`}>
                        <h4 className={`text-base font-semibold ${currentTheme.textSecondary} uppercase tracking-wider mb-4`}>
                        Principios Clave:
                        </h4>
                        <ul className="space-y-3">
                        {['Co-creación y Colaboración Genuina', 'Resultados Pragmáticos y Medibles', 'Enfoque Resolutivo y Orientado a Soluciones'].map((principle, index) => (
                            <li key={index} className={`flex items-center ${currentTheme.text} ${visibleSections['nosotros'] ? 'animate-fadeInLeft' : 'opacity-0'}`}
                                style={{ animationDelay: `${(index + 3) * 100}ms` }}>
                            <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" /> 
                            {principle}
                            </li>
                        ))}
                        </ul>
                    </div>
                    </div>
                    <div 
                    className={`relative ${visibleSections['nosotros'] ? 'animate-fadeInRight' : 'opacity-0'}`}
                    >
                    <div className={`relative p-10 md:p-12 rounded-3xl ${currentTheme.card} border ${currentTheme.border} shadow-2xl transform hover:rotate-1 transition-transform duration-500`}>
                        <div className="absolute inset-0 opacity-5 dark:opacity-10">
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors.gradient} rounded-3xl animate-pulse`} />
                        </div>
                        <div className="relative z-10 text-center space-y-8">
                        <div>
                            <div className="text-5xl font-bold mb-2">
                            <span className={`bg-gradient-to-r ${gradientColors.gradientText} bg-clip-text text-transparent`}>
                                10+
                            </span>
                            </div>
                            <p className={`text-lg ${currentTheme.text}`}>Años de Experiencia</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                            <div className="text-4xl font-bold mb-1">
                                <span className="text-cyan-500">500+</span>
                            </div>
                            <p className={`text-sm ${currentTheme.textSecondary}`}>Proyectos</p>
                            </div>
                            <div>
                            <div className="text-4xl font-bold mb-1">
                                <span className="text-purple-500">50+</span>
                            </div>
                            <p className={`text-sm ${currentTheme.textSecondary}`}>Clientes</p>
                            </div>
                        </div>
                        <div>
                            <h4 className={`text-xl font-semibold ${currentTheme.text} mb-4`}>
                            Confianza y Resultados
                            </h4>
                            <p className={`${currentTheme.textSecondary} mb-6 text-sm`}>
                            Construimos relaciones estratégicas duraderas. Pronto
                            compartiremos casos de éxito.
                            </p>
                            <div className="flex flex-wrap justify-center items-center gap-4 opacity-40">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className={`h-10 px-5 flex items-center justify-center ${currentTheme.bgSecondary} rounded-lg border ${currentTheme.border}`}>
                                <span className={`${currentTheme.textSecondary} text-xs font-medium`}>
                                    CLIENTE {i}
                                </span>
                                </div>
                            ))}
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>

            {/* Contact CTA Section */}
            <section id="contacto-cta" className={`py-20 ${gradientColors.bg} relative overflow-hidden z-10`}> 
                <div className="absolute -top-60 -left-60 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-cyan-400/50 via-purple-500/50 to-pink-400/50 opacity-10 blur-3xl pointer-events-none animate-pulse"></div>
                <div className="absolute -bottom-60 -right-60 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-cyan-400/50 via-purple-500/50 to-pink-400/50 opacity-10 blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '500ms' }}></div>
                <div className={`container mx-auto px-6 text-center relative z-10 ${visibleSections['contacto-cta'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
                    ¿Listo para{" "}
                    <span className={`bg-gradient-to-r ${gradientColors.gradientText} bg-clip-text text-transparent`}>
                    Impulsar
                    </span>{" "}
                    tu Visión?
                </h3>
                <p className={`text-xl md:text-2xl max-w-2xl mx-auto mb-10 ${currentTheme.textSecondary}`}>
                    Conversemos sobre tus desafíos y exploremos cómo Aurhora Agency puede
                    ser el socio estratégico que acelere tus resultados.
                </p>
                <button
                    onClick={() => openContactModal('cta_final_agenda_sesion')}
                    className={`inline-block ${gradientColors.ctaButton} py-4 px-12 rounded-full text-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group`}
                >
                    <span className="flex items-center">
                    Agenda tu Sesión Estratégica
                    <Calendar className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    </span>
                </button>
                <p className={`mt-8 text-sm ${currentTheme.textSecondary}`}>
                    O contáctanos directamente:{" "}
                    <a
                    href="mailto:contacto@aurhora.it.com" 
                    className={`underline ${currentTheme.highlight} transition duration-300`}
                    >
                    contacto@aurhora.it.com
                    </a>
                </p>
                </div>
            </section>

            {/* Contact Modal */}
            {showContactForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeInUp">
                <div className={`relative w-full max-w-lg ${currentTheme.card} rounded-2xl shadow-2xl p-6 sm:p-8 transform transition-all duration-300 ${formSubmitted ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
                    <button
                    onClick={() => setShowContactForm(false)}
                    aria-label="Cerrar formulario"
                    className={`absolute top-3 right-3 p-2 rounded-full ${gradientColors.hover} hover:scale-110 transition-all`}
                    >
                    <IconX className={`w-5 h-5 ${currentTheme.textSecondary}`} />
                    </button>

                    {formSubmitted ? (
                    <div className="text-center py-10 sm:py-12">
                        <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-5 animate-bounce" />
                        <h3 className={`text-2xl sm:text-3xl font-bold mb-2 ${currentTheme.text}`}>¡Mensaje Enviado!</h3>
                        <p className={`${currentTheme.textSecondary} text-base sm:text-lg`}>
                        Gracias por tu interés. Nos pondremos en contacto contigo a la brevedad.
                        </p>
                        {formData.selectedPlan && (
                            <p className={`${currentTheme.textSecondary} text-sm mt-3`}>Plan de interés: {formData.selectedPlan}</p>
                        )}
                    </div>
                    ) : (
                    <>
                        <h3 className={`text-2xl sm:text-3xl font-bold mb-1 text-center ${currentTheme.text}`}>Contáctanos</h3>
                        <p className={`text-center ${currentTheme.textSecondary} mb-6 text-sm sm:text-base`}>
                        {formData.selectedPlan 
                            ? `Estás interesado en el Plan: ${formData.selectedPlan}. ¡Excelente elección!`
                            : "Completa el formulario para agendar tu sesión."}
                        {formData.source && <span className="block text-xs mt-1">({formData.source})</span>}
                        </p>
                        
                        <form onSubmit={handleLandingFormSubmit} className="space-y-4 sm:space-y-5">
                        <div>
                            <label htmlFor="landing-nombre" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>Nombre Completo*</label>
                            <input
                            type="text" id="landing-nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required
                            className={`w-full px-4 py-2.5 rounded-lg ${gradientColors.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all`}
                            placeholder="Tu nombre completo"
                            />
                        </div>
                        <div>
                            <label htmlFor="landing-email" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>Correo Electrónico*</label>
                            <div className="relative">
                            <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`} />
                            <input
                                type="email" id="landing-email" name="email" value={formData.email} onChange={handleInputChange} required
                                className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${gradientColors.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all`}
                                placeholder="tu@ejemplo.com"
                            />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            <div>
                                <label htmlFor="landing-telefono" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>Teléfono</label>
                                <div className="relative">
                                <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`} />
                                <input
                                    type="tel" id="landing-telefono" name="telefono" value={formData.telefono} onChange={handleInputChange}
                                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${gradientColors.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all`}
                                    placeholder="Opcional"
                                />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="landing-empresa" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>Empresa</label>
                                <div className="relative">
                                <Building className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`} />
                                <input
                                    type="text" id="landing-empresa" name="empresa" value={formData.empresa} onChange={handleInputChange}
                                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${gradientColors.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all`}
                                    placeholder="Nombre de tu empresa (Opcional)"
                                />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="landing-mensaje" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>Mensaje*</label>
                            <textarea
                            id="landing-mensaje" name="mensaje" value={formData.mensaje} onChange={handleInputChange} rows={3} required
                            className={`w-full px-4 py-2.5 rounded-lg ${gradientColors.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all resize-none`}
                            placeholder="Cuéntanos sobre tu proyecto o cómo podemos ayudarte..."
                            />
                        </div>
                        {formData.selectedPlan && ( 
                            <input type="hidden" name="selectedPlan" value={formData.selectedPlan} />
                        )}
                        <input type="hidden" name="source" value={formData.source || 'landing_general'} /> 
                        <button
                            type="submit"
                            className={`w-full py-3 mt-2 rounded-lg ${gradientColors.ctaButton} text-base sm:text-lg hover:scale-[1.02] transform transition-all duration-300 shadow-lg hover:shadow-xl group flex items-center justify-center`}
                        >
                            Enviar Solicitud
                            <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        </form>
                    </>
                    )}
                </div>
                </div>
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
                .animation-delay-600 { animation-delay: 600ms; } 

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
                
                @keyframes fadeInLeft {
                from { opacity: 0; transform: translateX(-30px); }
                to { opacity: 1; transform: translateX(0); }
                }
                @keyframes fadeInRight {
                from { opacity: 0; transform: translateX(30px); }
                to { opacity: 1; transform: translateX(0); }
                }
                .animate-fadeInLeft { animation: fadeInLeft 0.8s ease-out forwards; }
                .animate-fadeInRight { animation: fadeInRight 0.8s ease-out forwards; }
            `}</style>
        </div>
    </ClientLayout>
  );
};

export default AurhoraLanding;