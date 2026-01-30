"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Check,
  Zap,
  Users,
  Globe,
  Calendar,
  FileText,
  CreditCard,
  Bell,
  Camera,
  Star,
  ArrowRight,
  Shield,
  Clock,
  Briefcase,
  MessageSquare,
  TrendingUp,
  Lightbulb,
  Settings,
  LifeBuoy,
  Share2,
  Eye,
  MessageCircle,
  ThumbsUp,
  Rocket,
  Palette,
  Mail,
  Phone,
  Building,
  Send,
  CheckCircle,
  ChevronDown,
  Layers,
  X,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useI18n } from "@/context/I18nContext";
import ClientLayout from "@/components/ClientLayout";
import { useContactForm } from "@/hooks/useContactForm";

// Interfaces for the data types
interface Plan {
  id: string;
  name: string;
  description: string;
  priceStartingFrom: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  popular?: boolean;
}

interface AddOn {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  priceStartingFrom: string;
  description: string;
  color?: string;
}

interface Benefit {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface ProblemSolved {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface TargetAudienceItem {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  description: string;
}

interface ProcessStep {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
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
  selectedPlan?: string;
  source?: string;
}

export default function GoDigitalSuitePage() {
  const { theme, currentTheme } = useTheme();
  const t = useI18n();
  const [selectedPlanId, setSelectedPlanId] = useState<string>("profesional");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [visibleSections, setVisibleSections] = useState<
    Record<string, boolean>
  >({});
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollYValue, setScrollYValue] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const [showContactForm, setShowContactForm] = useState(false);
  const { submitForm, isSubmitting, error } = useContactForm();
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    mensaje: "",
    selectedPlan: "",
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
    const particleCount = Math.min(60, Math.floor(window.innerWidth / 20));
    const connectionDistance = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        vz: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.3 + 0.05,
      });
    }

    let animationFrameId: number;
    const animate = () => {
      ctx.fillStyle =
        theme === "dark"
          ? "rgba(17, 24, 39, 0.02)"
          : "rgba(243, 244, 246, 0.02)";
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
              ? `rgba(6, 182, 212, ${particle.opacity * scale * 0.7})`
              : `rgba(168, 85, 247, ${particle.opacity * scale * 0.7})`
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
                (1 - distance / connectionDistance) * 0.15 * scale;
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
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, isClient]);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // --- Data Definitions - USANDO TRADUCCIONES ---
  const strategicBenefits: Benefit[] = [
    {
      icon: Rocket,
      title: t("godigital.benefits.strengthening.title"),
      description: t("godigital.benefits.strengthening.description"),
    },
    {
      icon: TrendingUp,
      title: t("godigital.benefits.efficiency.title"),
      description: t("godigital.benefits.efficiency.description"),
    },
    {
      icon: Zap,
      title: t("godigital.benefits.agile.title"),
      description: t("godigital.benefits.agile.description"),
    },
    {
      icon: Share2,
      title: t("godigital.benefits.scalable.title"),
      description: t("godigital.benefits.scalable.description"),
    },
    {
      icon: ThumbsUp,
      title: t("godigital.benefits.costEffective.title"),
      description: t("godigital.benefits.costEffective.description"),
    },
    {
      icon: LifeBuoy,
      title: t("godigital.benefits.support.title"),
      description: t("godigital.benefits.support.description"),
    },
  ];

  const problemsSolved: ProblemSolved[] = [
    {
      icon: Eye,
      title: t("godigital.problems.digitalPresence.title"),
      description: t("godigital.problems.digitalPresence.description"),
    },
    {
      icon: MessageSquare,
      title: t("godigital.problems.valueComm.title"),
      description: t("godigital.problems.valueComm.description"),
    },
    {
      icon: Settings,
      title: t("godigital.problems.interaction.title"),
      description: t("godigital.problems.interaction.description"),
    },
    {
      icon: Clock,
      title: t("godigital.problems.processes.title"),
      description: t("godigital.problems.processes.description"),
    },
    {
      icon: Lightbulb,
      title: t("godigital.problems.complexity.title"),
      description: t("godigital.problems.complexity.description"),
    },
    {
      icon: Briefcase,
      title: t("godigital.problems.scaling.title"),
      description: t("godigital.problems.scaling.description"),
    },
  ];

  const targetAudience: TargetAudienceItem[] = [
    {
      icon: Users,
      name: t("godigital.target.freelancers.name"),
      description: t("godigital.target.freelancers.description"),
    },
    {
      icon: Briefcase,
      name: t("godigital.target.smes.name"),
      description: t("godigital.target.smes.description"),
    },
    {
      icon: Globe,
      name: t("godigital.target.variousSectors.name"),
      description: t("godigital.target.variousSectors.description"),
    },
  ];

  const implementationProcess: ProcessStep[] = [
    {
      icon: MessageCircle,
      title: t("godigital.processSteps.onboarding.title"),
      description: t("godigital.processSteps.onboarding.description"),
      color: "cyan",
    },
    {
      icon: Palette,
      title: t("godigital.processSteps.content.title"),
      description: t("godigital.processSteps.content.description"),
      color: "blue",
    },
    {
      icon: Settings,
      title: t("godigital.processSteps.technical.title"),
      description: t("godigital.processSteps.technical.description"),
      color: "purple",
    },
    {
      icon: Check,
      title: t("godigital.processSteps.review.title"),
      description: t("godigital.processSteps.review.description"),
      color: "pink",
    },
    {
      icon: Rocket,
      title: t("godigital.processSteps.delivery.title"),
      description: t("godigital.processSteps.delivery.description"),
      color: "amber",
    },
  ];

  const plans: Plan[] = [
    {
      id: "basico",
      name: t("godigital.plans.basic.title"),
      description: t("godigital.plans.basic.description"),
      priceStartingFrom: `${t("godigital.fromPrice")} $299/mes`,
      features: [
        t("godigital.plans.basic.feature.websiteInfo"),
        t("godigital.plans.basic.feature.responsiveDesign"),
        t("godigital.plans.basic.feature.contact"),
        t("godigital.plans.basic.feature.social"),
        t("godigital.plans.basic.feature.sslIncluded"),
        t("godigital.plans.basic.feature.seoInitial"),
        t("godigital.plans.basic.feature.hostingBasic"),
        t("godigital.plans.basic.feature.pagesUpTo5"),
      ],
      icon: Globe,
      color: "cyan",
    },
    {
      id: "profesional",
      name: t("godigital.plans.professional.title"),
      description: t("godigital.plans.professional.description"),
      priceStartingFrom: `${t("godigital.fromPrice")} $499/mes`,
      popular: true,
      features: [
        t("godigital.plans.professional.feature.allBasic"),
        t("godigital.plans.professional.feature.schedulingSystem"),
        t("godigital.plans.professional.feature.availabilityConfig"),
        t("godigital.plans.professional.feature.calendarSync"),
        t("godigital.plans.professional.feature.emailConfirmations"),
        t("godigital.plans.professional.feature.pagesUpTo10"),
        t("godigital.plans.professional.feature.prioritySupport"),
      ],
      icon: Calendar,
      color: "purple",
    },
    {
      id: "360",
      name: t("godigital.plans.360.title"),
      description: t("godigital.plans.360.description"),
      priceStartingFrom: `${t("godigital.fromPrice")} $799/mes`,
      features: [
        t("godigital.plans.360.feature.allProfessional"),
        t("godigital.plans.360.feature.miniCrm"),
        t("godigital.plans.360.feature.adminPanel"),
        t("godigital.plans.360.feature.contactDataFields"),
        t("godigital.plans.360.feature.interactionHistory"),
        t("godigital.plans.360.feature.documentManagement"),
        t("godigital.plans.360.feature.unlimitedPages"),
        t("godigital.plans.360.feature.monthlyConsulting"),
      ],
      icon: Users,
      color: "pink",
    },
  ];

  const addOns: AddOn[] = [
    {
      name: t("godigital.addonsList.onlinePayments.name"),
      icon: CreditCard,
      priceStartingFrom: t("godigital.addonsList.onlinePayments.price"),
      description: t("godigital.addonsList.onlinePayments.description"),
      color: "green",
    },
    {
      name: t("godigital.addonsList.billing.name"),
      icon: FileText,
      priceStartingFrom: t("godigital.addonsList.billing.price"),
      description: t("godigital.addonsList.billing.description"),
      color: "blue",
    },
    {
      name: t("godigital.addonsList.advancedReminders.name"),
      icon: Bell,
      priceStartingFrom: t("godigital.addonsList.advancedReminders.price"),
      description: t("godigital.addonsList.advancedReminders.description"),
      color: "yellow",
    },
    {
      name: t("godigital.addonsList.blog.name"),
      icon: FileText,
      priceStartingFrom: t("godigital.addonsList.blog.price"),
      description: t("godigital.addonsList.blog.description"),
      color: "indigo",
    },
    {
      name: t("godigital.addonsList.galleries.name"),
      icon: Camera,
      priceStartingFrom: t("godigital.addonsList.galleries.price"),
      description: t("godigital.addonsList.galleries.description"),
      color: "red",
    },
    {
      name: t("godigital.addonsList.multiLanguage.name"),
      icon: Globe,
      priceStartingFrom: t("godigital.addonsList.multiLanguage.price"),
      description: t("godigital.addonsList.multiLanguage.description"),
      color: "teal",
    },
  ];

  const testimonials: Testimonial[] = [
    {
      quote: t("godigital.testimonialsList.anaPerez.quote"),
      name: t("godigital.testimonialsList.anaPerez.name"),
      company: t("godigital.testimonialsList.anaPerez.company"),
      avatar: `https://placehold.co/100x100/${
        theme === "light" ? "E0E7FF" : "374151"
      }/${theme === "light" ? "4338CA" : "A5B4FC"}?text=AP&font=Inter`,
    },
    {
      quote: t("godigital.testimonialsList.carlosLopez.quote"),
      name: t("godigital.testimonialsList.carlosLopez.name"),
      company: t("godigital.testimonialsList.carlosLopez.company"),
      avatar: `https://placehold.co/100x100/${
        theme === "light" ? "D1FAE5" : "374151"
      }/${theme === "light" ? "059669" : "6EE7B7"}?text=CL&font=Inter`,
    },
    {
      quote: t("godigital.testimonialsList.sofiaMartinez.quote"),
      name: t("godigital.testimonialsList.sofiaMartinez.name"),
      company: t("godigital.testimonialsList.sofiaMartinez.company"),
      avatar: `https://placehold.co/100x100/${
        theme === "light" ? "FCE7F3" : "374151"
      }/${theme === "light" ? "DB2777" : "F9A8D4"}?text=SM&font=Inter`,
    },
  ];

  const faqItems: FAQItem[] = [
    {
      question: t("godigital.faqList.item1.q"),
      answer: t("godigital.faqList.item1.a"),
    },
    {
      question: t("godigital.faqList.item2.q"),
      answer: t("godigital.faqList.item2.a"),
    },
    {
      question: t("godigital.faqList.item3.q"),
      answer: t("godigital.faqList.item3.a"),
    },
    {
      question: t("godigital.faqList.item4.q"),
      answer: t("godigital.faqList.item4.a"),
    },
    {
      question: t("godigital.faqList.item5.q"),
      answer: t("godigital.faqList.item5.a"),
    },
  ];

  // --- Contact Form Logic ---
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }
    const success = await submitForm({
      ...formData,
      source: "godigital_suite",
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
      alert(error || "Error al enviar el formulario");
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
                className={`absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br ${currentTheme.gradient} blur-3xl opacity-20 animate-pulse`}
                style={{
                  left: `${mousePosition.x * 0.02 - 50}px`,
                  top: `${mousePosition.y * 0.02 - 50}px`,
                  transform: `translate(-50%, -50%) scale(${
                    1 + scrollYValue * 0.0002
                  })`,
                }}
              />
              <div
                className={`absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-gradient-to-tr ${currentTheme.gradient} blur-3xl opacity-15 animate-pulse`}
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
                    {t("godigital.ourStarSuite")}
                  </span>
                </div>

                <h1
                  className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight`}
                >
                  <span
                    className={`block bg-gradient-to-r ${currentTheme.gradientText} bg-clip-text text-transparent`}
                  >
                    {t("godigital.title")}
                  </span>
                </h1>
                <h2
                  className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-6 ${currentTheme.textSecondary}`}
                >
                  {t("godigital.subtitle")}
                </h2>

                <p
                  className={`text-base sm:text-lg ${currentTheme.textSecondary} mb-8 max-w-xl mx-auto lg:mx-0`}
                >
                  {t("godigital.description")}
                </p>

                <div
                  className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start`}
                >
                  <a
                    href="#planes"
                    className={`group px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl ${currentTheme.ctaButton} font-bold text-base sm:text-lg hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center relative overflow-hidden`}
                  >
                    <span className="relative z-10">
                      {t("godigital.discoverPlans")}
                    </span>
                    <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </a>
                  <button
                    onClick={() => openContactModal("hero_demo")}
                    className={`px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white font-bold text-base sm:text-lg hover:scale-105 transform transition-all duration-300 flex items-center justify-center`}
                  >
                    {t("godigital.scheduleFreeDemo")}
                    <Calendar className="inline-block ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Element */}
              <div
                className={`hidden lg:flex justify-center items-center relative ${
                  visibleSections["hero"]
                    ? "animate-fadeInUp animation-delay-200"
                    : "opacity-0"
                }`}
              >
                <div
                  className={`relative w-80 h-80 md:w-96 md:h-96 p-4 rounded-full bg-gradient-to-br ${currentTheme.gradient}/10 animate-float`}
                >
                  <Layers
                    className={`w-full h-full ${currentTheme.highlight} opacity-70 transform group-hover:scale-110 transition-transform duration-500`}
                    strokeWidth={1.5}
                  />
                  <div
                    className={`absolute inset-8 rounded-full border-4 ${currentTheme.highlight} opacity-30 animate-pulse`}
                  ></div>
                  <div
                    className={`absolute inset-16 rounded-full border-2 ${currentTheme.highlight} opacity-20 animate-pulse animation-delay-200`}
                  ></div>
                  <Zap
                    className={`absolute top-10 right-10 w-12 h-12 text-pink-500 opacity-60 -rotate-12 animate-float animation-delay-300`}
                    strokeWidth={1.5}
                  />
                  <Globe
                    className={`absolute bottom-10 left-10 w-16 h-16 text-cyan-500 opacity-60 rotate-12 animate-float animation-delay-500`}
                    strokeWidth={1.5}
                  />
                  <Settings
                    className={`absolute top-1/2 left-5 w-10 h-10 text-purple-500 opacity-50 animate-float animation-delay-100`}
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
                {t("godigital.challengesTitle")}
              </h2>
              <p
                className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}
              >
                {t("godigital.challengesSubtitle")}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {problemsSolved.map((problem, index) => (
                <div
                  key={index}
                  className={`group p-6 sm:p-8 rounded-2xl ${
                    currentTheme.card
                  } shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-l-cyan-500 ${
                    visibleSections["problemas"]
                      ? "animate-fadeInUp"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`mb-5 p-3 inline-block rounded-xl bg-gradient-to-br ${currentTheme.gradient}/10 group-hover:scale-110 transition-transform`}
                  >
                    <problem.icon
                      className={`w-10 h-10 ${currentTheme.highlight}`}
                    />
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

        {/* Strategic Benefits Section */}
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
                {t("godigital.strategicBenefitsTitle")}
              </h2>
              <p
                className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}
              >
                {t("godigital.strategicBenefitsSubtitle")}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {strategicBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`group p-6 sm:p-8 rounded-2xl ${
                    currentTheme.card
                  } shadow-lg hover:shadow-2xl text-left transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-l-purple-500 ${
                    visibleSections["beneficios"]
                      ? "animate-fadeInUp"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`mb-5 p-3 inline-block rounded-xl bg-gradient-to-br ${currentTheme.gradient}/10 group-hover:scale-110 transition-transform`}
                  >
                    <benefit.icon
                      className={`w-8 h-8 ${currentTheme.highlight}`}
                    />
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

        {/* Implementation Process Section */}
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
                {t("godigital.processTitle")}
              </h2>
              <p
                className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}
              >
                {t("godigital.processSubtitle")}
              </p>
            </div>
            <div className="relative px-4">
              <div
                className={`hidden lg:block absolute top-12 left-[10%] right-[10%] h-1.5 bg-gradient-to-r ${currentTheme.gradient} rounded-full opacity-40`}
              ></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-8 relative z-10">
                {implementationProcess.map((step, index) => (
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
                      className={`w-20 h-20 rounded-full bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 text-white text-2xl font-bold flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transform transition-all duration-300`}
                    >
                      <step.icon className="w-10 h-10 text-white" />
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

        {/* Plans Section */}
        <section
          id="planes"
          className={`py-16 md:py-24 ${currentTheme.bg} relative z-10`}
        >
          <div className="container mx-auto px-6">
            <div
              className={`text-center mb-12 md:mb-16 ${
                visibleSections["planes"] ? "animate-fadeInUp" : "opacity-0"
              }`}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t("godigital.plansTitle")}
              </h2>
              <p
                className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}
              >
                {t("godigital.plansSubtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <div
                  key={plan.id}
                  className={`relative p-8 rounded-2xl ${
                    currentTheme.card
                  } shadow-lg transition-all duration-300 cursor-pointer flex flex-col ${
                    plan.popular
                      ? "border-4 border-purple-500 shadow-2xl scale-105 bg-gradient-to-br from-purple-50 dark:from-purple-900/20 to-transparent animate-pulse-border"
                      : `border-2 ${currentTheme.border} hover:border-${plan.color}-500/50 hover:shadow-xl`
                  } ${
                    selectedPlanId === plan.id
                      ? `border-${plan.color}-500 shadow-2xl`
                      : ""
                  } ${
                    visibleSections["planes"] ? "animate-fadeInUp" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce whitespace-nowrap">
                        ⭐ {t("godigital.popular")}
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6 pt-2">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${plan.color}-500/10 mb-5 border-2 border-${plan.color}-500/30`}
                    >
                      <plan.icon className={`w-8 h-8 text-${plan.color}-500`} />
                    </div>
                    <h3
                      className={`text-2xl sm:text-3xl font-bold mb-2 ${currentTheme.text}`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`text-sm ${currentTheme.textSecondary} mb-4 min-h-[40px]`}
                    >
                      {plan.description}
                    </p>
                    <div
                      className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${currentTheme.gradientText} bg-clip-text text-transparent`}
                    >
                      {plan.priceStartingFrom}
                    </div>
                    <p className={`text-xs ${currentTheme.textMuted} mt-1`}>
                      {t("godigital.taxesNotIncluded")}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start ${currentTheme.textSecondary}`}
                      >
                        <Check
                          className={`w-5 h-5 text-green-500 mr-2.5 flex-shrink-0 mt-0.5`}
                        />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      setSelectedPlanId(plan.id);
                      openContactModal(
                        `plan_seleccionado: ${plan.name}`,
                        plan.name
                      );
                    }}
                    className={`w-full mt-auto py-3.5 rounded-lg font-semibold transition-all duration-300 text-base group relative overflow-hidden ${
                      selectedPlanId === plan.id
                        ? `${currentTheme.ctaButton}`
                        : `border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900`
                    }`}
                  >
                    <span className="relative z-10">
                      {selectedPlanId === plan.id
                        ? t("godigital.continueWithPlan")
                        : t("godigital.chooseThisPlan")}
                    </span>
                    {selectedPlanId !== plan.id && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${currentTheme.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                      />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons Section */}
        <section
          id="addons"
          className={`py-16 md:py-24 ${currentTheme.bgSecondary} relative z-10`}
        >
          <div className="container mx-auto px-6">
            <div
              className={`text-center mb-12 md:mb-16 ${
                visibleSections["addons"] ? "animate-fadeInUp" : "opacity-0"
              }`}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t("godigital.addonsTitle")}
              </h2>
              <p
                className={`text-lg ${currentTheme.textSecondary} max-w-3xl mx-auto`}
              >
                {t("godigital.addonsSubtitle")}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {addOns.map((addon, index) => (
                <div
                  key={index}
                  className={`group p-6 rounded-2xl ${
                    currentTheme.card
                  } shadow-lg hover:shadow-2xl text-left transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-l-amber-500 ${
                    visibleSections["addons"] ? "animate-fadeInUp" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`mb-4 flex items-center text-${
                      addon.color || "amber"
                    }-500`}
                  >
                    <div
                      className={`p-2.5 rounded-lg bg-${
                        addon.color || "amber"
                      }-500/10 mr-4 group-hover:scale-110 transition-transform`}
                    >
                      <addon.icon
                        className={`w-7 h-7 text-${addon.color || "amber"}-500`}
                      />
                    </div>
                    <h4
                      className={`text-lg sm:text-xl font-semibold ${currentTheme.text}`}
                    >
                      {addon.name}
                    </h4>
                  </div>
                  <p
                    className={`text-sm ${currentTheme.textSecondary} mb-3 min-h-[40px]`}
                  >
                    {addon.description}
                  </p>
                  <p
                    className={`font-bold text-sm bg-gradient-to-r ${currentTheme.gradientText} bg-clip-text text-transparent`}
                  >
                    {addon.priceStartingFrom}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Target Audience Section */}
        <section
          id="publico"
          className={`py-16 md:py-24 ${currentTheme.bg} relative z-10`}
        >
          <div className="container mx-auto px-6">
            <div
              className={`text-center mb-12 md:mb-16 ${
                visibleSections["publico"] ? "animate-fadeInUp" : "opacity-0"
              }`}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t("godigital.targetTitle")}
              </h2>
              <p
                className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}
              >
                {t("godigital.targetSubtitle")}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {targetAudience.map((item, index) => (
                <div
                  key={index}
                  className={`group p-6 sm:p-8 rounded-2xl ${
                    currentTheme.card
                  } shadow-lg hover:shadow-2xl text-center transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-l-pink-500 ${
                    visibleSections["publico"]
                      ? "animate-fadeInUp"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`mb-5 p-4 inline-block rounded-xl bg-gradient-to-br ${currentTheme.gradient}/10 group-hover:scale-110 transition-transform`}
                  >
                    <item.icon
                      className={`w-8 h-8 ${currentTheme.highlight}`}
                    />
                  </div>
                  <h3
                    className={`text-xl sm:text-2xl font-semibold mb-3 ${currentTheme.text}`}
                  >
                    {item.name}
                  </h3>
                  <p
                    className={`text-sm sm:text-base ${currentTheme.textSecondary}`}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonios"
          className={`py-16 md:py-24 ${currentTheme.bgSecondary} relative z-10`}
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
                {t("godigital.testimonialsTitle")}
              </h2>
              <p
                className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}
              >
                {t("godigital.testimonialsSubtitle")}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`p-8 rounded-2xl ${
                    currentTheme.card
                  } shadow-lg hover:shadow-2xl flex flex-col text-left transition-shadow duration-300 border-l-4 border-l-green-500 ${
                    visibleSections["testimonios"]
                      ? "animate-fadeInUp"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4 flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4
                        className={`text-lg font-semibold ${currentTheme.text}`}
                      >
                        {testimonial.name}
                      </h4>
                      <p className={`text-sm ${currentTheme.highlight}`}>
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`italic ${currentTheme.textSecondary} text-md leading-relaxed`}
                  >
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className={`py-16 md:py-24 ${currentTheme.bg} relative z-10`}
        >
          <div className="container mx-auto px-6 max-w-3xl">
            <div
              className={`text-center mb-12 md:mb-16 ${
                visibleSections["faq"] ? "animate-fadeInUp" : "opacity-0"
              }`}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t("godigital.faqTitle")}
              </h2>
              <p
                className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}
              >
                {t("godigital.faqSubtitle")}
              </p>
            </div>
            <div className="space-y-5">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    currentTheme.card
                  } rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition-shadow duration-300 border-l-4 border-l-indigo-500 ${
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
          className={`py-20 md:py-28 relative overflow-hidden ${currentTheme.bgSecondary} z-10`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${currentTheme.gradient}/5 via-transparent to-transparent`}
          ></div>
          <div
            className={`container mx-auto px-6 text-center relative z-10 ${
              visibleSections["contacto"] ? "animate-fadeInUp" : "opacity-0"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              {t("godigital.ctaTitle")}
            </h2>
            <p
              className={`text-lg sm:text-xl ${currentTheme.textSecondary} mb-10 max-w-2xl mx-auto`}
            >
              {t("godigital.ctaSubtitle")}
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => openContactModal("cta_final_comenzar")}
                className={`group px-10 py-5 rounded-xl ${currentTheme.ctaButton} text-xl font-bold hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center relative overflow-hidden`}
              >
                <span className="relative z-10">{t("godigital.startNow")}</span>
                <Rocket className="inline-block ml-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </button>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-10 text-sm">
              <div className="flex items-center">
                <Clock className={`w-5 h-5 ${currentTheme.highlight} mr-2`} />
                <span className={currentTheme.textSecondary}>
                  {t("godigital.fastImplementation")}
                </span>
              </div>
              <div className="flex items-center">
                <Shield className={`w-5 h-5 ${currentTheme.highlight} mr-2`} />
                <span className={currentTheme.textSecondary}>
                  {t("godigital.continuousSupport")}
                </span>
              </div>
              <div className="flex items-center">
                <Star className={`w-5 h-5 ${currentTheme.highlight} mr-2`} />
                <span className={currentTheme.textSecondary}>
                  {t("godigital.expertAdvice")}
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
                aria-label={t("godigital.closeForm")}
                className={`absolute top-4 right-4 p-2 rounded-full ${currentTheme.hover} hover:scale-110 transition-all`}
              >
                <X className={`w-6 h-6 ${currentTheme.textSecondary}`} />
              </button>

              {formSubmitted ? (
                <div className="text-center py-10 sm:py-12">
                  <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-5 animate-bounce" />
                  <h3
                    className={`text-2xl sm:text-3xl font-bold mb-2 ${currentTheme.text}`}
                  >
                    {t("contact.sent")}
                  </h3>
                  <p
                    className={`${currentTheme.textSecondary} text-base sm:text-lg`}
                  >
                    {t("contact.thanks")}
                  </p>
                  {formData.selectedPlan && (
                    <p className={`${currentTheme.textMuted} text-sm mt-3`}>
                      Plan de interés: {formData.selectedPlan}
                    </p>
                  )}
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
                  <h3
                    className={`text-2xl sm:text-3xl font-bold mb-1 text-center ${currentTheme.text}`}
                  >
                    {t("contact.title")}
                  </h3>
                  <p
                    className={`text-center ${currentTheme.textSecondary} mb-6 text-sm sm:text-base`}
                  >
                    {formData.selectedPlan
                      ? `Estás interesado en el Plan: ${formData.selectedPlan}. ¡Excelente elección!`
                      : t("contact.description")}
                  </p>

                  <form
                    onSubmit={handleFormSubmit}
                    className="space-y-4 sm:space-y-5"
                  >
                    <div>
                      <label
                        htmlFor="nombre"
                        className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}
                      >
                        {t("contact.name")}*
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all`}
                        placeholder={t("form.namePlaceholder")}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}
                      >
                        {t("contact.email")}*
                      </label>
                      <div className="relative">
                        <Mail
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textMuted}`}
                        />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all`}
                          placeholder={t("form.emailPlaceholder")}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label
                          htmlFor="telefono"
                          className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}
                        >
                          {t("contact.phone")}
                        </label>
                        <div className="relative">
                          <Phone
                            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textMuted}`}
                          />
                          <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all`}
                            placeholder={t("form.phonePlaceholder")}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="empresa"
                          className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}
                        >
                          {t("contact.company")}
                        </label>
                        <div className="relative">
                          <Building
                            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textMuted}`}
                          />
                          <input
                            type="text"
                            id="empresa"
                            name="empresa"
                            value={formData.empresa}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all`}
                            placeholder={t("form.companyPlaceholder")}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="mensaje"
                        className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}
                      >
                        {t("contact.message")}*
                      </label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleInputChange}
                        rows={3}
                        required
                        className={`w-full px-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all resize-none`}
                        placeholder={t("form.messagePlaceholder")}
                      />
                    </div>
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
                      value={formData.source}
                    />
                    <button
                      type="submit"
                      className={`w-full py-3 mt-2 rounded-lg ${currentTheme.ctaButton} font-bold text-base sm:text-lg hover:scale-[1.02] transform transition-all duration-300 shadow-lg hover:shadow-xl group flex items-center justify-center`}
                    >
                      {t("contact.send")}
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
                "https://wa.me/525616026685?text=Hola%20Aurhora!%0A%0AVisite%20su%20sitio%20web%20y%20me%20interesa%20conocer%20mas%20sobre%20sus%20servicios%20de%20transformacion%20digital.%0A%0APodrian%20contarme%20como%20pueden%20ayudar%20a%20mi%20empresa%20a%3A%0A%0A-%20Digitalizar%20procesos%0A-%20Aumentar%20la%20eficiencia%0A-%20Implementar%20tecnologia%20innovadora%0A%0AMe%20gustaria%20agendar%20una%20consultoria%20gratuita.%20Cuando%20podriamos%20conversar%3F";
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
                ¡Chatea con nosotros!
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

          @keyframes pulse-border {
            0%,
            100% {
              border-color: rgb(168 85 247);
            }
            50% {
              border-color: rgb(236 72 153);
            }
          }

          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.7s ease-out forwards;
          }
          .animate-pulse-border {
            animation: pulse-border 2s ease-in-out infinite;
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
          }
          .font-['Inter',_sans-serif] {
            font-family: "Inter", sans-serif;
          }
        `}</style>
      </div>
    </ClientLayout>
  );
}

// ChevronDownIcon component for FAQ
const ChevronDownIcon: React.FC<{ open: boolean }> = ({ open }) => (
  <ChevronDown
    className={`w-6 h-6 transform transition-transform duration-300 ease-in-out ${
      open ? "rotate-180" : ""
    } ${open ? "text-purple-500" : "text-gray-400 group-hover:text-gray-500"}`}
  />
);
