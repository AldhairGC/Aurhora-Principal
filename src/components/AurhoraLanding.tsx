// AurhoraLanding.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Users,
  Rocket,
  Globe,
  ArrowRight,
  Mail,
  Phone,
  Building,
  Send,
  CheckCircle,
  TrendingUp,
  Target,
  Award,
  X as IconX,
  Sparkles,
  Zap,
} from "lucide-react";
import ClientLayout from "./ClientLayout";
import { useTheme } from "@/context/ThemeContext";
import { useTranslations } from "next-intl";
import { useContactForm } from "@/hooks/useContactForm";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import {
  isMobileDevice,
  getOptimalParticleCount,
  shouldDrawConnections,
  getAnimationFrameRate,
} from "@/lib/utils/device";
import { StrategicCTA } from "./StrategicCTA";
import { SocialProofSection } from "./SocialProofSection";
import { StickyCTABar } from "./StickyCTABar";
import { OrganicDivider } from "./SectionDivider";
import { ContactCTA } from "./ContactCTA";

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
  const { theme, currentTheme } = useTheme();
  const t = useTranslations(); // Hook de traducción con next-intl

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [particlesEnabled] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const modalRef = useFocusTrap(showContactForm);

  const [formData, setFormData] = useState<LandingFormData>({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    mensaje: "",
    selectedPlan: "",
    source: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  const { submitForm, error } = useContactForm();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isClient]);


  useEffect(() => {
    if (!isClient || !particlesEnabled || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particlesArray: Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      opacity: number;
    }> = [];
    const isMobile = isMobileDevice();
    const drawConnections = shouldDrawConnections();
    const targetFPS = getAnimationFrameRate();
    const frameDelay = 1000 / targetFPS;
    let lastFrameTime = 0;

    const setupParticles = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesArray.length = 0;
      const particleCount = getOptimalParticleCount(60, window.innerWidth);

      for (let i = 0; i < particleCount; i++) {
        particlesArray.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.2),
          vy: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.2),
          vz: (Math.random() - 0.5) * (isMobile ? 0.6 : 0.8),
          size: Math.random() * (isMobile ? 1 : 1.2) + 0.3,
          opacity: Math.random() * 0.3 + 0.05,
        });
      }
    };

    setupParticles();

    const animate = (currentTime: number) => {
      // Frame rate limiting for mobile performance
      if (currentTime - lastFrameTime < frameDelay) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime;

      ctx.fillStyle =
        theme === "dark"
          ? "rgba(17, 24, 39, 0.03)"
          : "rgba(249, 250, 251, 0.03)";
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
        const y2d =
          (particle.y - canvas.height / 2) * scale + canvas.height / 2;
        const size = Math.max(0, particle.size * scale);

        if (size > 0.1) {
          ctx.beginPath();
          ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
          
          // Simplified rendering for mobile
          if (isMobile) {
            ctx.fillStyle =
              theme === "dark"
                ? `rgba(6, 182, 212, ${Math.min(1, particle.opacity * scale * 0.6)})`
                : `rgba(168, 85, 247, ${Math.min(1, particle.opacity * scale * 0.6)})`;
          } else {
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
                ? `rgba(6, 182, 212, ${Math.min(1, particle.opacity * scale * 0.8)})`
                : `rgba(168, 85, 247, ${Math.min(1, particle.opacity * scale * 0.8)})`
            );
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
          }
          ctx.fill();
        }

        // Only draw connections on desktop for performance
        if (drawConnections) {
          for (let j = i + 1; j < particlesArray.length; j++) {
            const particle2 = particlesArray[j];
            const dx = particle.x - particle2.x;
            const dy = particle.y - particle2.y;
            const dz = particle.z - particle2.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            const connectionDistance = 120;

            if (distance < connectionDistance) {
              const opacity = Math.max(
                0,
                (1 - distance / connectionDistance) * 0.2 * scale
              );
              if (opacity > 0.01) {
                ctx.beginPath();
                ctx.moveTo(x2d, y2d);
                const scale2 = 1000 / (1000 + particle2.z);
                const x2d2 =
                  (particle2.x - canvas.width / 2) * scale2 + canvas.width / 2;
                const y2d2 =
                  (particle2.y - canvas.height / 2) * scale2 + canvas.height / 2;
                ctx.lineTo(x2d2, y2d2);
                ctx.strokeStyle =
                  theme === "dark"
                    ? `rgba(6, 182, 212, ${opacity})`
                    : `rgba(168, 85, 247, ${opacity})`;
                ctx.lineWidth = 0.3;
                ctx.stroke();
              }
            }
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      setupParticles();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, particlesEnabled, isClient]);

  // Services array adaptado para usar traducciones
  const services = [
    {
      id: 6,
      title: t("services.godigital.title"),
      description: t("services.godigital.description"),
      link: "/servicios/godigital",
      linkText: t("services.godigital.linkText"),
      icon: <Globe className="w-8 h-8" />,
      bgColor: theme === "dark" ? "bg-cyan-900/50" : "bg-cyan-100",
      borderColor: theme === "dark" ? "border-cyan-700/30" : "border-cyan-300",
      iconColor: "text-cyan-500",
      available: true,
    },
    {
      id: 2,
      title: t("services.transformation.title"),
      description: t("services.transformation.description"),
      link: "/servicios/transformacion-digital",
      linkText: t("services.transformation.linkText"),
      icon: <Rocket className="w-8 h-8" />,
      bgColor: theme === "dark" ? "bg-blue-900/50" : "bg-blue-100",
      borderColor: theme === "dark" ? "border-blue-700/30" : "border-blue-300",
      iconColor: "text-blue-500",
      available: true,
    },
    {
      id: 3,
      title: t("services.development.title"),
      description: t("services.development.description"),
      link: "/servicios/desarrollo-software",
      linkText: t("services.development.linkText"),
      icon: <Code className="w-8 h-8" />,
      bgColor: theme === "dark" ? "bg-purple-900/50" : "bg-purple-100",
      borderColor:
        theme === "dark" ? "border-purple-700/30" : "border-purple-300",
      iconColor: "text-purple-500",
      available: true,
    },
    {
      id: 1,
      title: t("services.optimization.title"),
      description: t("services.optimization.description"),
      link: "/servicios/optimizacion-procesos",
      linkText: t("services.optimization.linkText"),
      icon: <CheckCircle className="w-8 h-8" />,
      bgColor: theme === "dark" ? "bg-emerald-900/50" : "bg-emerald-100",
      borderColor:
        theme === "dark" ? "border-emerald-700/30" : "border-emerald-300",
      iconColor: "text-emerald-500",
      available: true,
    },
    {
      id: 4,
      title: t("services.marketing.title"),
      description: t("services.marketing.description"),
      link: "/servicios/impulso-marketing",
      linkText: t("services.marketing.linkText"),
      icon: <TrendingUp className="w-8 h-8" />,
      bgColor: theme === "dark" ? "bg-pink-900/50" : "bg-pink-100",
      borderColor: theme === "dark" ? "border-pink-700/30" : "border-pink-300",
      iconColor: "text-pink-500",
      available: true,
    },
    {
      id: 5,
      title: t("services.agile.title"),
      description: t("services.agile.description"),
      link: "/servicios/cultura-agil",
      linkText: t("services.agile.linkText"),
      icon: <Users className="w-8 h-8" />,
      bgColor: theme === "dark" ? "bg-amber-900/50" : "bg-amber-100",
      borderColor:
        theme === "dark" ? "border-amber-700/30" : "border-amber-300",
      iconColor: "text-amber-500",
      available: true,
    },
  ];

  const philosophyItems = [
    {
      title: t("philosophy.item1.title"),
      description: t("philosophy.item1.description"),
      icon: <Target className="w-8 h-8" />,
      color: "cyan",
      gradientClass: "from-cyan-500/20",
      textClass: "text-cyan-500",
    },
    {
      title: t("philosophy.item2.title"),
      description: t("philosophy.item2.description"),
      icon: <Users className="w-8 h-8" />,
      color: "purple",
      gradientClass: "from-purple-500/20",
      textClass: "text-purple-500",
    },
    {
      title: t("philosophy.item3.title"),
      description: t("philosophy.item3.description"),
      icon: <Award className="w-8 h-8" />,
      color: "pink",
      gradientClass: "from-pink-500/20",
      textClass: "text-pink-500",
    },
  ];

  const transformationSteps = [
    {
      number: 1,
      title: t("process.step1.title"),
      description: t("process.step1.description"),
      color: "cyan",
    },
    {
      number: 2,
      title: t("process.step2.title"),
      description: t("process.step2.description"),
      color: "blue",
    },
    {
      number: 3,
      title: t("process.step3.title"),
      description: t("process.step3.description"),
      color: "purple",
    },
    {
      number: 4,
      title: t("process.step4.title"),
      description: t("process.step4.description"),
      color: "pink",
    },
    {
      number: 5,
      title: t("process.step5.title"),
      description: t("process.step5.description"),
      color: "amber",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLandingFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      alert(t("contact.required"));
      return;
    }
    const success = await submitForm({
      ...formData,
      source: "landing_general",
    });
    if (success) {
      setFormSubmitted(true);
      setTimeout(() => {
        setShowContactForm(false);
        setFormSubmitted(false);
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          empresa: "",
          mensaje: "",
          selectedPlan: "",
          source: "",
        });
      }, 5000);
    } else {
      alert(error || t("contact.error"));
    }
  };

  const openContactModal = (source: string, planName?: string) => {
    setFormData((prev) => ({
      ...prev,
      nombre: "",
      email: "",
      telefono: "",
      empresa: "",
      mensaje: "",
      selectedPlan: planName || "",
      source: source,
    }));
    setFormSubmitted(false);
    setShowContactForm(true);
  };

  // Definir colores de gradiente dinámicos basados en el tema actual
  const gradientColors = {
    bg: theme === "dark" ? "bg-gray-900" : "bg-gray-50",
    bgSecondary: theme === "dark" ? "bg-gray-800" : "bg-white",
    gradient: "from-cyan-500 via-purple-500 to-pink-500",
    gradientText:
      theme === "dark"
        ? "from-cyan-400 via-purple-400 to-pink-400"
        : "from-cyan-600 via-purple-600 to-pink-600",
    ctaButton:
      theme === "dark"
        ? "bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-gray-900 font-semibold"
        : "bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white",
    inputBg:
      theme === "dark"
        ? "bg-gray-700 border-gray-600"
        : "bg-gray-50 border-gray-300",
    hover: theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100",
  };

  return (
    <ClientLayout services={services} openContactModal={openContactModal}>
      <div
        id="main-content"
        className={`font-sans transition-all duration-500 relative overflow-x-hidden ${gradientColors.bg} ${currentTheme.text}`}
      >
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
                  transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.0003})`,
                }}
              />
              <div
                className={`absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-gradient-to-tr ${gradientColors.gradient} blur-3xl opacity-15 animate-pulse`}
                style={{
                  right: `${(window.innerWidth - mousePosition.x) * 0.03 - 100}px`,
                  bottom: `${(window.innerHeight - mousePosition.y) * 0.03 - 100}px`,
                  animationDelay: "0.5s",
                  transform: `scale(${1 + scrollY * 0.0002})`,
                }}
              />
            </div>
          </>
        )}

        {/* Hero Section - Stripe-inspired Redesign */}
        <section
          id="hero"
          className="relative min-h-[90vh] md:min-h-screen pt-24 md:pt-36 pb-16 md:pb-24 flex items-center hero-section"
        >
          {/* Background con gradiente sutil */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -z-20" />
          
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              
              {/* Badge (estilo Stripe) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 mb-6"
              >
                {t("hero.experience")}
              </motion.div>

              {/* Headline con tipografía refinada y balanceada */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mb-4 md:mb-6"
              >
                <span 
                  style={{
                    fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                    lineHeight: '1.1',
                    letterSpacing: '-0.025em',
                    fontWeight: '600'
                  }}
                  className="block text-gray-900 dark:text-white"
                >
                  {t("hero.title")}{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {t("hero.innovation")}
                  </span>
                </span>
                <span 
                  style={{
                    fontSize: 'clamp(1.25rem, 3.5vw, 2.25rem)',
                    lineHeight: '1.3',
                    letterSpacing: '-0.015em',
                    fontWeight: '500'
                  }}
                  className="block mt-3 md:mt-4 text-gray-600 dark:text-gray-400"
                >
                  {t("hero.subtitle")}
                </span>
              </motion.h1>

              {/* Descripción */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{
                  fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)',
                  lineHeight: '1.6'
                }}
                className="text-gray-600 dark:text-gray-400 mb-8 md:mb-10 max-w-2xl mx-auto px-2"
              >
                {t("hero.description")}
              </motion.p>

              {/* CTAs principales */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-12 md:mb-16 px-4 sm:px-0"
              >
                <StrategicCTA 
                  variant="primary" 
                  size="lg" 
                  text={t("hero.startTransformation")}
                  icon={<ArrowRight className="w-5 h-5" />}
                  onClick={() => openContactModal("hero_inicia_transformacion")}
                  fullWidth
                  className="sm:w-auto"
                />
                <StrategicCTA 
                  variant="secondary" 
                  size="lg" 
                  text={t("hero.exploreServices")}
                  href="#servicios"
                  fullWidth
                  className="sm:w-auto"
                />
              </motion.div>

            </div>
          </div>

          {/* Elementos decorativos - con z-index negativo */}
          {isClient && (
            <div className="absolute inset-0 pointer-events-none -z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="absolute top-[15%] left-[8%]"
              >
                <Zap className="w-12 h-12 text-purple-500/40" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="absolute top-[25%] right-[10%]"
              >
                <Rocket className="w-16 h-16 text-blue-500/40" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 1, delay: 1.1 }}
                className="absolute bottom-[20%] left-[15%]"
              >
                <Code className="w-10 h-10 text-cyan-500/40" />
              </motion.div>
            </div>
          )}
          
          {/* Organic Divider */}
          <OrganicDivider position="bottom" className="text-white dark:text-gray-900" height="h-16 md:h-24" />
        </section>

        {/* Services Section - Stripe-inspired Redesign */}
        <section id="servicios" className="py-24 relative z-10 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 
                style={{
                  fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                  lineHeight: '1.2',
                  letterSpacing: '-0.02em',
                  fontWeight: '600'
                }}
                className="mb-3 text-gray-900 dark:text-white"
              >
                {t("services.title")}
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t("services.description")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {services.map((service, index) => {
                const isAvailable = service.available;
                
                return (
                  <motion.div
                    key={service.id || index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={isAvailable ? {
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
                      y: -4
                    } : {}}
                    className={`group relative p-5 md:p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 active:scale-[0.98] touch-manipulation ${
                      isAvailable ? "cursor-pointer hover:border-purple-300/50 dark:hover:border-purple-600/50" : "cursor-default opacity-60"
                    }`}
                    style={{
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}
                    onClick={() => {
                      if (isAvailable && service.link) {
                        window.location.href = service.link;
                      } else if (isAvailable) {
                        openContactModal(`servicio_card_no_link: ${service.title}`);
                      }
                    }}
                  >
                    <div className="relative z-10">
                      {/* Ícono con color */}
                      <div className={`w-12 md:w-14 h-12 md:h-14 ${service.bgColor} rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-all duration-300 border ${service.borderColor}`}>
                        <div className={service.iconColor}>
                          {service.icon}
                        </div>
                      </div>

                      {/* Contenido homogéneo */}
                      <h4 className="text-base md:text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                        {service.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 md:mb-4 leading-relaxed md:min-h-[60px]">
                        {service.description}
                      </p>

                      {/* CTA inline uniforme */}
                      {isAvailable ? (
                        <div className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-white group-hover:gap-2.5 transition-all duration-200">
                          {service.linkText || t("header.contacto")}
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      ) : (
                        <span className="text-xs font-medium text-gray-400">
                          {t("common.comingSoon")}
                        </span>
                      )}
                    </div>
                    
                    {/* Elemento decorativo sutil en hover */}
                    {isAvailable && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
          <OrganicDivider position="bottom" className="text-gray-50 dark:text-gray-900" />
        </section>

        {/* Philosophy Section - Rediseñada */}
        <section
          id="philosophy"
          className="relative py-24 md:py-32 overflow-hidden bg-gray-50 dark:bg-gray-900 z-10"
        >
          {/* Background decorativo sutil */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200/20 dark:bg-purple-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-200/20 dark:bg-blue-600/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-6 md:px-8 relative z-10">
            {/* Header con diseño moderno */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mb-20"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-full text-xs font-medium text-purple-700 dark:text-purple-300 mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                {t("philosophy.title")}
              </div>
              <h2 
                className="text-gray-900 dark:text-white mb-6"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  lineHeight: '1.1',
                  fontWeight: '600',
                  letterSpacing: '-0.02em'
                }}
              >
                {t("philosophy.description")}
              </h2>
            </motion.div>

            {/* Grid horizontal de 3 columnas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {philosophyItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="
                    group relative p-8 rounded-2xl
                    bg-white/60 dark:bg-gray-800/60
                    backdrop-blur-sm
                    border border-gray-200/50 dark:border-gray-700/50
                    hover:border-purple-300/50 dark:hover:border-purple-600/50
                    transition-all duration-300
                  "
                  style={{
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                  }}
                  whileHover={{
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
                    y: -4
                  }}
                >
                  {/* Icono con diseño sofisticado */}
                  <div className="flex items-start gap-4 mb-6">
                    <div 
                      className={`
                        flex-shrink-0 w-14 h-14 rounded-xl
                        bg-gradient-to-br ${item.gradientClass} to-transparent
                        flex items-center justify-center
                        group-hover:scale-110 transition-transform duration-300
                        border border-gray-200/50 dark:border-gray-700/50
                      `}
                    >
                      <div className={item.textClass}>
                        {React.cloneElement(item.icon, { className: `w-7 h-7` })}
                      </div>
                    </div>
                    
                    {/* Título alineado con el icono */}
                    <h4 
                      className="text-xl font-semibold text-gray-900 dark:text-white pt-2"
                      style={{
                        letterSpacing: '-0.01em'
                      }}
                    >
                      {item.title}
                    </h4>
                  </div>

                  {/* Descripción con mejor tipografía */}
                  <p 
                    className="text-gray-600 dark:text-gray-400 leading-relaxed"
                    style={{
                      fontSize: 'clamp(0.9375rem, 1vw, 1rem)',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {item.description}
                  </p>

                  {/* Elemento decorativo sutil en hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
          <OrganicDivider position="bottom" className="text-white dark:text-gray-900" />
        </section>

        {/* Transformation Process Section - Rediseñada con animaciones */}
        <section
          id="enfoque"
          className="relative py-24 md:py-32 overflow-hidden bg-white dark:bg-gray-900 z-10"
        >
          {/* Background decorativo */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-200/20 dark:bg-cyan-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 dark:bg-purple-600/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-6 md:px-8 relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <h2 
                className="text-gray-900 dark:text-white mb-4"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  lineHeight: '1.2',
                  fontWeight: '600',
                  letterSpacing: '-0.02em'
                }}
              >
                <span className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {t("process.title")}
                </span>
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t("process.description")}
              </p>
            </motion.div>

            {/* Línea de conexión animada */}
            <div className="relative px-4">
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full origin-left"
                style={{ 
                  boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)'
                }}
              />
              
              {/* Steps Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-8 relative z-10">
                {transformationSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.15,
                      ease: [0.25, 0.1, 0.25, 1.0]
                    }}
                    className="flex flex-col items-center text-center group"
                  >
                    {/* Número circular con animaciones */}
                    <motion.div
                      whileHover={{ 
                        scale: 1.15,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.3 }
                      }}
                      className="relative mb-6"
                    >
                      {/* Anillo exterior pulsante */}
                      <motion.div
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.2, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.2
                        }}
                        className={`absolute inset-0 w-20 h-20 rounded-full ${
                          step.color === "cyan"
                            ? "bg-cyan-500/30"
                            : step.color === "blue"
                              ? "bg-blue-500/30"
                              : step.color === "purple"
                                ? "bg-purple-500/30"
                                : step.color === "pink"
                                  ? "bg-pink-500/30"
                                  : "bg-amber-500/30"
                        }`}
                      />
                      
                      {/* Número principal */}
                      <div
                        className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${
                          step.color === "cyan"
                            ? "from-cyan-500 to-cyan-600"
                            : step.color === "blue"
                              ? "from-blue-500 to-blue-600"
                              : step.color === "purple"
                                ? "from-purple-500 to-purple-600"
                                : step.color === "pink"
                                  ? "from-pink-500 to-pink-600"
                                  : "from-amber-500 to-amber-600"
                        } text-white text-3xl font-bold flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300`}
                        style={{
                          boxShadow: `0 10px 30px ${
                            step.color === "cyan"
                              ? "rgba(6, 182, 212, 0.3)"
                              : step.color === "blue"
                                ? "rgba(59, 130, 246, 0.3)"
                                : step.color === "purple"
                                  ? "rgba(168, 85, 247, 0.3)"
                                  : step.color === "pink"
                                    ? "rgba(236, 72, 153, 0.3)"
                                    : "rgba(245, 158, 11, 0.3)"
                          }`
                        }}
                      >
                        <motion.span
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ 
                            delay: index * 0.15 + 0.3,
                            type: "spring",
                            stiffness: 200,
                            damping: 10
                          }}
                        >
                          {step.number}
                        </motion.span>
                      </div>
                    </motion.div>

                    {/* Contenido */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.4 }}
                    >
                      <h4 
                        className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300"
                        style={{ letterSpacing: '-0.01em' }}
                      >
                        {step.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <OrganicDivider position="bottom" className="text-gray-50 dark:text-gray-900" />
        </section>

        {/* About Section - Rediseñada */}
        <section
          id="nosotros"
          className="relative py-24 md:py-32 overflow-hidden bg-gray-50 dark:bg-gray-900 z-10"
        >
          {/* Background decorativo */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-20 -right-20 w-96 h-96 bg-purple-200/30 dark:bg-purple-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 -left-20 w-96 h-96 bg-blue-200/30 dark:bg-blue-600/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-6 md:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Contenido de texto */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Badge */}
                <div className="inline-flex items-center px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-full text-xs font-medium text-purple-700 dark:text-purple-300">
                  {t("about.experience")}
                </div>

                {/* Título */}
                <h2 
                  className="text-gray-900 dark:text-white"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    lineHeight: '1.2',
                    fontWeight: '600',
                    letterSpacing: '-0.02em'
                  }}
                >
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {t("about.title1")}
                  </span>
                  {" "}
                  {t("about.title2")}
                </h2>

                {/* Descripciones */}
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed"
                     style={{ fontSize: 'clamp(0.9375rem, 1vw, 1rem)' }}>
                    {t("about.description1")}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed"
                     style={{ fontSize: 'clamp(0.9375rem, 1vw, 1rem)' }}>
                    {t("about.description2")}
                  </p>
                </div>

                {/* Principios */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                  <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                    {t("about.principlesTitle")}
                  </h4>
                  <ul className="space-y-3">
                    {[
                      t("about.principle1"),
                      t("about.principle2"),
                      t("about.principle3"),
                    ].map((principle, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center text-gray-900 dark:text-white"
                      >
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                          <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                        </div>
                        {principle}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Card de estadísticas */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative p-10 md:p-12 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                     style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
                  
                  {/* Elemento decorativo de fondo */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-2xl" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl" />
                  </div>

                  <div className="relative z-10 space-y-10">
                    {/* Años de experiencia - destacado */}
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-center pb-8 border-b border-gray-200 dark:border-gray-700"
                    >
                      <div className="text-7xl font-bold mb-3">
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                          10+
                        </span>
                      </div>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {t("about.yearsExperience")}
                      </p>
                    </motion.div>

                    {/* Grid de métricas */}
                    <div className="grid grid-cols-2 gap-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="text-center"
                      >
                        <div className="text-5xl font-bold mb-2">
                          <span className="text-cyan-500">500+</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          {t("about.projects")}
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        className="text-center"
                      >
                        <div className="text-5xl font-bold mb-2">
                          <span className="text-purple-500">50+</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          {t("about.clients")}
                        </p>
                      </motion.div>
                    </div>

                    {/* Confianza y resultados */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="pt-8 border-t border-gray-200 dark:border-gray-700"
                    >
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 text-center">
                        {t("about.trustResults")}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
                        {t("about.trustDescription")}
                      </p>
                      
                      {/* Logos de clientes */}
                      <div className="flex flex-wrap justify-center items-center gap-3">
                        {["TechCorp", "InnovateLab", "DigitalFlow"].map((company, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.6 + (i * 0.1) }}
                            whileHover={{ scale: 1.05 }}
                            className="h-10 px-5 flex items-center justify-center bg-gray-100 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-200"
                          >
                            <span className="text-gray-600 dark:text-gray-400 text-xs font-bold tracking-wider">
                              {company}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          <OrganicDivider position="bottom" className="text-white dark:text-gray-900" />
        </section>

        {/* Contact CTA Section - Componente Reutilizable */}
        <ContactCTA onScheduleClick={() => openContactModal("cta_final_agenda_sesion")} />

        {/* Social Proof Section */}
        <SocialProofSection />

        {/* Contact Modal - TRADUCIDO */}
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl"
            onClick={(e) => {
              // Solo cerrar si se hace click en el fondo, no en el contenido del modal
              if (e.target === e.currentTarget) {
                setShowContactForm(false);
                setFormSubmitted(false);
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              ref={modalRef}
              className={`relative w-full max-w-lg ${currentTheme.card} rounded-3xl shadow-2xl overflow-hidden`}
            >
              {/* Gradient Background Decoration */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600"></div>
              
              <div className="p-6 sm:p-8">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowContactForm(false)}
                aria-label={t("godigital.closeForm")}
                type="button"
                className={`absolute top-4 right-4 p-2.5 rounded-full ${gradientColors.hover} transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 z-10`}
              >
                <IconX className={`w-5 h-5 ${currentTheme.textSecondary}`} aria-hidden="true" />
              </motion.button>

              {formSubmitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`text-3xl font-bold mb-3 ${currentTheme.text}`}
                  >
                    {t("contact.sent")}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className={`${currentTheme.textSecondary} text-lg mb-4`}
                  >
                    {t("contact.thanks")}
                  </motion.p>
                  {formData.selectedPlan && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className={`inline-block px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 ${currentTheme.text} text-sm font-medium mb-6`}
                    >
                      {t("contact.planOfInterest", { plan: formData.selectedPlan })}
                    </motion.div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8"
                  >
                    <p className={`text-sm ${currentTheme.textSecondary} mb-4`}>
                      {t("contact.modalAutoClose")}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setShowContactForm(false);
                        setFormSubmitted(false);
                      }}
                      className={`px-6 py-3 rounded-xl ${gradientColors.ctaButton} font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      {t("contact.closeNow")}
                    </motion.button>
                  </motion.div>
                </motion.div>
              ) : (
                <>
                  <motion.h3
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    id="contact-modal-title"
                    className={`text-3xl font-bold mb-2 text-center bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent`}
                  >
                    {t("contact.title")}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`text-center ${currentTheme.textSecondary} mb-8 text-base`}
                  >
                    {formData.selectedPlan
                      ? t("contact.interestedInPlan", { plan: formData.selectedPlan })
                      : t("contact.description")}
                  </motion.p>

                  <form
                    onSubmit={handleLandingFormSubmit}
                    className="space-y-5"
                  >
                    {/* Nombre */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label
                        htmlFor="landing-nombre"
                        className={`block text-sm font-semibold mb-2 ${currentTheme.text}`}
                      >
                        {t("contact.name")} <span className="text-purple-500">*</span>
                      </label>
                      <div className="relative group">
                        <input
                          type="text"
                          id="landing-nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          required
                          aria-required="true"
                          className={`w-full px-4 py-3 rounded-xl ${gradientColors.inputBg} border-2 ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 placeholder:text-gray-400`}
                          placeholder={t("form.namePlaceholder")}
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </motion.div>
                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label
                        htmlFor="landing-email"
                        className={`block text-sm font-semibold mb-2 ${currentTheme.text}`}
                      >
                        {t("contact.email")} <span className="text-purple-500">*</span>
                      </label>
                      <div className="relative group">
                        <Mail
                          className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary} group-focus-within:text-purple-500 transition-colors duration-300`}
                          aria-hidden="true"
                        />
                        <input
                          type="email"
                          id="landing-email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          aria-required="true"
                          className={`w-full pl-12 pr-4 py-3 rounded-xl ${gradientColors.inputBg} border-2 ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 placeholder:text-gray-400`}
                          placeholder={t("form.emailPlaceholder")}
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </motion.div>
                    {/* Teléfono y Empresa */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label
                          htmlFor="landing-telefono"
                          className={`block text-sm font-semibold mb-2 ${currentTheme.text}`}
                        >
                          {t("contact.phone")}
                        </label>
                        <div className="relative group">
                          <Phone
                            className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary} group-focus-within:text-purple-500 transition-colors duration-300`}
                            aria-hidden="true"
                          />
                          <input
                            type="tel"
                            id="landing-telefono"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleInputChange}
                            className={`w-full pl-12 pr-4 py-3 rounded-xl ${gradientColors.inputBg} border-2 ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 placeholder:text-gray-400`}
                            placeholder={t("form.phonePlaceholder")}
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <label
                          htmlFor="landing-empresa"
                          className={`block text-sm font-semibold mb-2 ${currentTheme.text}`}
                        >
                          {t("contact.company")}
                        </label>
                        <div className="relative group">
                          <Building
                            className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary} group-focus-within:text-purple-500 transition-colors duration-300`}
                            aria-hidden="true"
                          />
                          <input
                            type="text"
                            id="landing-empresa"
                            name="empresa"
                            value={formData.empresa}
                            onChange={handleInputChange}
                            className={`w-full pl-12 pr-4 py-3 rounded-xl ${gradientColors.inputBg} border-2 ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 placeholder:text-gray-400`}
                            placeholder={t("form.companyPlaceholder")}
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                      </motion.div>
                    </div>
                    {/* Mensaje */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label
                        htmlFor="landing-mensaje"
                        className={`block text-sm font-semibold mb-2 ${currentTheme.text}`}
                      >
                        {t("contact.message")} <span className="text-purple-500">*</span>
                      </label>
                      <div className="relative group">
                        <textarea
                          id="landing-mensaje"
                          name="mensaje"
                          value={formData.mensaje}
                          onChange={handleInputChange}
                          rows={4}
                          required
                          aria-required="true"
                          className={`w-full px-4 py-3 rounded-xl ${gradientColors.inputBg} border-2 ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 resize-none placeholder:text-gray-400`}
                          placeholder={t("form.messagePlaceholder")}
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </motion.div>
                    {formData.selectedPlan && (
                      <input
                        type="hidden"
                        name="selectedPlan"
                        value={formData.selectedPlan}
                      />
                    )}
                    <input
                      type="hidden"
                      name="source"
                      value={formData.source || "landing_general"}
                    />
                    {/* Botón de envío */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className={`w-full py-4 mt-3 rounded-xl ${gradientColors.ctaButton} text-lg font-semibold shadow-lg hover:shadow-2xl group flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition-all duration-300 relative overflow-hidden`}
                    >
                      <span className="relative z-10 flex items-center">
                        {t("contact.send")}
                        <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </form>
                </>
              )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Sticky CTA Bar */}
        <StickyCTABar onContactClick={() => openContactModal("sticky_cta_bar")} />

        {/* WhatsApp Floating Button - UBICACIÓN CORRECTA */}
        {isClient && (
          <a
            href="#"
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="Contactar por WhatsApp"
            onClick={(e) => {
              e.preventDefault();
              const whatsappUrl =
                "https://wa.me/5215582991282?text=Hola%20Aurhora!%0A%0AVisite%20su%20sitio%20web%20y%20me%20interesa%20conocer%20mas%20sobre%20sus%20servicios%20de%20transformacion%20digital.%0A%0APodrian%20contarme%20como%20pueden%20ayudar%20a%20mi%20empresa%20a%3A%0A%0A-%20Digitalizar%20procesos%0A-%20Aumentar%20la%20eficiencia%0A-%20Implementar%20tecnologia%20innovadora%0A%0AMe%20gustaria%20agendar%20una%20consultoria%20gratuita.%20Cuando%20podriamos%20conversar%3F";
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
                {t("common.chatWithUs")}
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
          .animation-delay-600 {
            animation-delay: 600ms;
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

          @keyframes fadeInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .animate-fadeInLeft {
            animation: fadeInLeft 0.8s ease-out forwards;
          }
          .animate-fadeInRight {
            animation: fadeInRight 0.8s ease-out forwards;
          }
        `}</style>
      </div>
    </ClientLayout>
  );
};

export default AurhoraLanding;
