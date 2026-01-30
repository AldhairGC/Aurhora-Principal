"use client";

import React, { useState, useEffect } from "react";
import {
  Brain,
  UsersRound,
  Lightbulb,
  Handshake,
  Shield,
  Smartphone,
  CreditCard,
  TrendingUp,
  ShieldCheck,
  Activity,
  Home,
  Hospital,
  Car,
  Terminal,
  Layers,
  Cpu,
  Globe,
  Zap,
  Target
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslations } from "next-intl";
import ClientLayout from "@/components/ClientLayout";
import { useContactForm } from "@/hooks/useContactForm";
import { OrganicDivider } from "@/components/SectionDivider";
import { ContactCTA } from "@/components/ContactCTA";
import { motion } from "framer-motion";
import { StickyCTABar } from "@/components/StickyCTABar";

// Importamos componentes reutilizables si es necesario o definimos aquí para consistencia
// Vamos a usar el mismo estilo de ContactModal que en AurhoraLanding pero inline si no está exportado

interface ContactFormData {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  mensaje: string;
  source?: string;
}

const QuienesSomosPage = () => {
  const { theme, currentTheme } = useTheme();
  const t = useTranslations();
  const [isClient, setIsClient] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Contact Form State
  const [showContactForm, setShowContactForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    mensaje: "",
    source: "quienes_somos_page",
  });
  const { submitForm, error } = useContactForm();

  useEffect(() => {
    setIsClient(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      alert(t("contact.required"));
      return;
    }
    const success = await submitForm({ ...formData, source: "quienes_somos_cta" });
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
            source: "quienes_somos_page",
        });
      }, 5000);
    } else {
      alert(error || t("contact.error"));
    }
  };

  const openContactModal = (source: string) => {
    setFormData((prev) => ({ ...prev, source }));
    setFormSubmitted(false);
    setShowContactForm(true);
  };

  // Datos para secciones
  const teamStrengths = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: t("aboutUs.expertOrchestration"),
      description: t("aboutUs.expertOrchestrationDesc"),
      color: "cyan",
      gradientClass: "from-cyan-500/20",
      textClass: "text-cyan-500",
    },
    {
      icon: <UsersRound className="w-8 h-8" />,
      title: t("aboutUs.multidisciplinaryTeams"),
      description: t("aboutUs.multidisciplinaryTeamsDesc"),
      color: "purple",
      gradientClass: "from-purple-500/20",
      textClass: "text-purple-500",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: t("aboutUs.tropicalizationInnovation"),
      description: t("aboutUs.tropicalizationInnovationDesc"),
      color: "pink",
      gradientClass: "from-pink-500/20",
      textClass: "text-pink-500",
    },
  ];

  const insuranceExpertise = [
    t("aboutUs.insurance.medicalExpenses"),
    t("aboutUs.insurance.auto"),
    t("aboutUs.insurance.life"),
    t("aboutUs.insurance.property"),
    t("aboutUs.insurance.savings"),
    t("aboutUs.insurance.claims"),
    t("aboutUs.insurance.underwriting"),
    t("aboutUs.insurance.channels"),
  ];

  const fintechExpertise = [
    t("aboutUs.fintech.mobileBanking"),
    t("aboutUs.fintech.paymentGateways"),
    t("aboutUs.fintech.cardProcessing"),
    t("aboutUs.fintech.neoBanks"),
    t("aboutUs.fintech.coreBanking"),
    t("aboutUs.fintech.digitalLoans"),
    t("aboutUs.fintech.openBanking"),
    t("aboutUs.fintech.kyc"),
  ];

  // Configuración de colores dinámica
  const gradientColors = {
      bg: theme === "dark" ? "bg-gray-900" : "bg-gray-50",
      bgSecondary: theme === "dark" ? "bg-gray-800" : "bg-white",
      gradient: "from-cyan-500 via-purple-500 to-pink-500",
      gradientText: theme === "dark" 
        ? "from-cyan-400 via-purple-400 to-pink-400" 
        : "from-cyan-600 via-purple-600 to-pink-600",
      inputBg: theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-300",
      cardBg: theme === "dark" ? "bg-gray-800/60" : "bg-white/60",
      cardBorder: theme === "dark" ? "border-gray-700/50" : "border-gray-200/50",
  };

  return (
    <ClientLayout openContactModal={openContactModal}>
      <div className={`font-sans transition-all duration-500 relative overflow-x-hidden ${gradientColors.bg} ${currentTheme.text}`}>
        
        {/* Background Elements */}
        {isClient && (
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
              <div
                className={`absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br ${gradientColors.gradient} blur-3xl opacity-10 animate-pulse`}
                style={{
                  left: `${mousePosition.x * 0.02}px`,
                  top: `${mousePosition.y * 0.02}px`,
                  transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.0002})`,
                }}
              />
              <div
                className={`absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr ${gradientColors.gradient} blur-3xl opacity-10 animate-pulse`}
                style={{
                  right: "0",
                  bottom: "0",
                  animationDelay: "1s",
                }}
              />
            </div>
        )}

        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center pt-32 pb-20 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-full text-xs font-medium text-purple-700 dark:text-purple-300 mb-6"
              >
                <Layers className="w-3.5 h-3.5" />
                Hub de Transformación Digital
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mb-6"
              >
                <span 
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                    lineHeight: '1.1',
                    letterSpacing: '-0.025em',
                    fontWeight: '600'
                  }}
                  className="block text-gray-900 dark:text-white"
                >
                  {t("aboutUs.heroTitle1")}{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {t("aboutUs.heroTitle2")}
                  </span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)' }}
                className="text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
              >
                {t("aboutUs.heroDescription")}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                 <button
                    onClick={() => openContactModal("quienes_somos_hero")}
                    className={`inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300`}
                  >
                    {t("aboutUs.scheduleStrategicSession")}
                    <Handshake className="ml-2 w-5 h-5" />
                  </button>
              </motion.div>
            </div>
          </div>
          <OrganicDivider position="bottom" className="text-white dark:text-gray-900" />
        </section>

        {/* Essence & Philosophy Section */}
        <section className="py-24 bg-white dark:bg-gray-900 relative z-10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400">
                                <Zap className="w-5 h-5" />
                            </span>
                            <span className="text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                                {t("aboutUs.heartBadge")}
                            </span>
                        </div>
                        <h2 
                            className="text-gray-900 dark:text-white mb-6"
                            style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: '600', lineHeight: '1.2' }}
                        >
                            {t("aboutUs.essenceTitle1")}{" "}
                            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                                {t("aboutUs.essenceTitle2")}
                            </span>
                        </h2>
                        <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            <p>{t("aboutUs.essenceDescription1")}</p>
                            <p>{t("aboutUs.essenceDescription2")}</p>
                        </div>
                        
                        <div className="mt-10 flex items-center gap-6">
                            <div className="pl-4 border-l-4 border-purple-500">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {t("aboutUs.experienceYears")}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {t("aboutUs.experienceSubtitle")}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className={`aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 relative shadow-2xl border ${gradientColors.cardBorder}`}>
                            {/* Decorative Grid */}
                            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-20">
                                {[...Array(36)].map((_, i) => (
                                    <div key={i} className="border-[0.5px] border-gray-400/30" />
                                ))}
                            </div>
                            
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                <Target className="w-20 h-20 text-purple-500 mb-6 opacity-80" />
                                <blockquote className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 italic max-w-md">
                                    {t("aboutUs.essenceQuote")}
                                </blockquote>
                                <div className="mt-6 flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-100" />
                                    <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse delay-200" />
                                </div>
                            </div>
                        </div>
                        {/* Decorative floating elements */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-2xl opacity-30" />
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-2xl opacity-30" />
                    </motion.div>
                </div>
            </div>
            <OrganicDivider position="bottom" className="text-gray-50 dark:text-gray-800" />
        </section>

        {/* The Hub / Orchestration Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-800 relative z-10">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="text-purple-600 dark:text-purple-400 font-semibold tracking-wider text-sm uppercase mb-3 block">
                        Hub de Transformación
                    </span>
                    <h2 
                        className="text-gray-900 dark:text-white mb-6"
                        style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: '700' }}
                    >
                        {t("aboutUs.orchestrationTitle")}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        {t("aboutUs.orchestrationDescription")}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {teamStrengths.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`
                                group p-8 rounded-2xl relative overflow-hidden
                                ${gradientColors.cardBg} backdrop-blur-sm
                                border ${gradientColors.cardBorder}
                                hover:shadow-xl transition-all duration-300
                            `}
                        >
                            <div className={`
                                w-14 h-14 rounded-xl mb-6 flex items-center justify-center
                                bg-gradient-to-br ${item.gradientClass} to-transparent
                                group-hover:scale-110 transition-transform duration-300
                            `}>
                                <div className={item.textClass}>
                                    {item.icon}
                                </div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {item.description}
                            </p>
                            
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent group-hover:via-purple-500 transition-all duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
            <OrganicDivider position="bottom" className="text-white dark:text-gray-900" />
        </section>

        {/* Insurance Sector Expertise */}
        <section className="py-24 bg-white dark:bg-gray-900 relative z-10 overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent dark:from-blue-900/10 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="order-2 lg:order-1"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold uppercase mb-4">
                            <Shield className="w-3 h-3" />
                            {t("aboutUs.sectoralStrengthBadge")}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            {t("aboutUs.insuranceTitle")}
                        </h2>
                        <div className="space-y-4 text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            <p>{t("aboutUs.insuranceDescription1")}</p>
                            <p>{t("aboutUs.insuranceDescription2")}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {insuranceExpertise.map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                                        <ShieldCheck className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="order-1 lg:order-2 flex justify-center"
                    >
                        <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 p-1 shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500">
                            <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-[22px] m-0.5 flex items-center justify-center overflow-hidden">
                                {/* Abstract Visual Representation for Insurance */}
                                <div className="relative w-full h-full p-8 flex flex-col items-center justify-center">
                                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-4 p-8 opacity-10">
                                         {[...Array(9)].map((_, i) => <div key={i} className="bg-current rounded-lg" />)}
                                    </div>
                                    <Shield className="w-32 h-32 text-blue-500 mb-6 drop-shadow-lg" strokeWidth={1} />
                                    <div className="flex gap-4">
                                        <Car className="w-8 h-8 text-cyan-500 opacity-60" />
                                        <Home className="w-8 h-8 text-cyan-500 opacity-60" />
                                        <Activity className="w-8 h-8 text-cyan-500 opacity-60" />
                                        <Hospital className="w-8 h-8 text-cyan-500 opacity-60" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>

        {/* Fintech Sector Expertise */}
        <section className="py-24 bg-gray-50 dark:bg-gray-800 relative z-10 overflow-hidden">
            {/* Background Decoration */}
             <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-purple-50/50 to-transparent dark:from-purple-900/10 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center"
                    >
                         <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 p-1 shadow-2xl -rotate-3 hover:rotate-0 transition-all duration-500">
                            <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-[22px] m-0.5 flex items-center justify-center overflow-hidden">
                                 {/* Abstract Visual Representation for Fintech */}
                                 <div className="relative w-full h-full p-8 flex flex-col items-center justify-center">
                                    <div className="absolute inset-0 border-2 border-dashed border-purple-200 dark:border-purple-800 rounded-full m-12 animate-spin-slow" style={{ animationDuration: '20s' }} />
                                    <Terminal className="w-32 h-32 text-purple-500 mb-6 drop-shadow-lg" strokeWidth={1} />
                                    <div className="flex gap-6 justify-center w-full">
                                        <div className="bg-white dark:bg-gray-700 p-2 rounded-lg shadow-sm">
                                            <CreditCard className="w-6 h-6 text-pink-500" />
                                        </div>
                                        <div className="bg-white dark:bg-gray-700 p-2 rounded-lg shadow-sm">
                                            <Smartphone className="w-6 h-6 text-purple-500" />
                                        </div>
                                        <div className="bg-white dark:bg-gray-700 p-2 rounded-lg shadow-sm">
                                            <Globe className="w-6 h-6 text-blue-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-bold uppercase mb-4">
                            <Cpu className="w-3 h-3" />
                            {t("aboutUs.sectoralStrengthBadge")}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            {t("aboutUs.fintechTitle")}
                        </h2>
                        <div className="space-y-4 text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            <p>{t("aboutUs.fintechDescription1")}</p>
                            <p>{t("aboutUs.fintechDescription2")}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {fintechExpertise.map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
                                        <TrendingUp className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
            <OrganicDivider position="bottom" className="text-white dark:text-gray-900" />
        </section>

        {/* Co-creation Section */}
        <section className="py-24 bg-white dark:bg-gray-900 relative z-10">
             <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 mb-8 text-pink-500">
                        <Handshake className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                        {t("aboutUs.cocreationTitle")}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-12">
                        {t("aboutUs.cocreationDescription1")} <br className="hidden md:block" /> {t("aboutUs.cocreationDescription2")}
                    </p>
                    
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => openContactModal("quienes_somos_cocreation")}
                            className="px-8 py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            {t("aboutUs.scheduleStrategicSessionCta")}
                        </button>
                    </div>
                </motion.div>
             </div>
        </section>

        {/* CTA Final */}
        <ContactCTA onScheduleClick={() => openContactModal("cta_final_quienes_somos")} />

        {/* Sticky CTA Bar */}
        <StickyCTABar onContactClick={() => openContactModal("sticky_bar_quienes_somos")} />

        {/* WhatsApp Button */}
        {isClient && (
          <a
            href="https://wa.me/5215582991282?text=Hola%20Aurhora!%20Me%20interesa%20conocer%20m%C3%A1s%20sobre%20su%20enfoque%20de%20transformaci%C3%B3n."
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="Contactar por WhatsApp"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
              <div className="relative bg-green-500 hover:bg-green-600 rounded-full p-4 shadow-2xl transform transition-all duration-300 hover:scale-110">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
              </div>
            </div>
          </a>
        )}

        {/* Contact Modal Inline (reutilizando lógica del landing por simplicidad) */}
        {showContactForm && (
           <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowContactForm(false);
              }
            }}
          >
             <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`relative w-full max-w-lg ${currentTheme.card} rounded-2xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto`}
            >
                <button
                    onClick={() => setShowContactForm(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {formSubmitted ? (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="w-10 h-10 text-green-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t("contact.sent")}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{t("contact.thanks")}</p>
                    </div>
                ) : (
                    <>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">{t("contact.title")}</h3>
                        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">{t("contact.description")}</p>
                        
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("contact.name")}</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleFormInputChange}
                                    required
                                    className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:ring-2 focus:ring-purple-500 outline-none transition-all`}
                                    placeholder={t("form.namePlaceholder")}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("contact.email")}</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleFormInputChange}
                                    required
                                    className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:ring-2 focus:ring-purple-500 outline-none transition-all`}
                                    placeholder={t("form.emailPlaceholder")}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("contact.phone")}</label>
                                    <input
                                        type="tel"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleFormInputChange}
                                        className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:ring-2 focus:ring-purple-500 outline-none transition-all`}
                                        placeholder={t("form.phonePlaceholder")}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("contact.company")}</label>
                                    <input
                                        type="text"
                                        name="empresa"
                                        value={formData.empresa}
                                        onChange={handleFormInputChange}
                                        className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:ring-2 focus:ring-purple-500 outline-none transition-all`}
                                        placeholder={t("form.companyPlaceholder")}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("contact.message")}</label>
                                <textarea
                                    name="mensaje"
                                    value={formData.mensaje}
                                    onChange={handleFormInputChange}
                                    required
                                    rows={4}
                                    className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none`}
                                    placeholder={t("form.messagePlaceholder")}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-4 rounded-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                            >
                                {t("contact.send")}
                            </button>
                        </form>
                    </>
                )}
             </motion.div>
           </div>
        )}

      </div>
    </ClientLayout>
  );
};

export default QuienesSomosPage;
