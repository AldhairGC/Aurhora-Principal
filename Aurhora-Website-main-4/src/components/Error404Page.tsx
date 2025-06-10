'use client'

import React, { useState, useEffect, useRef } from 'react';
import {
  Home, Search, Mail, Phone, Building, Send, CheckCircle as CheckCircleIcon,
  AlertTriangle, ArrowLeft, Compass, Map, HelpCircle, X, Rocket
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useI18n } from '@/context/I18nContext';
import ClientLayout from '@/components/ClientLayout';

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  mensaje: string;
  source: string;
}

export default function Error404Page() {
  const { theme, currentTheme } = useTheme();
  const t = useI18n();
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    mensaje: '',
    source: 'error_404_page',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
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

    let animationFrameId: number;
    const particlesArray: any[] = [];

    const setupParticles = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesArray.length = 0;
      const particleCount = Math.min(40, Math.floor(window.innerWidth / 30));
      
      for (let i = 0; i < particleCount; i++) {
        particlesArray.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          vz: (Math.random() - 0.5) * 0.7,
          size: Math.random() * 1.1 + 0.2,
          opacity: Math.random() * 0.25 + 0.05
        });
      }
    };

    setupParticles();

    const animate = () => {
      ctx.fillStyle = theme === 'dark' ? 'rgba(17, 24, 39, 0.025)' : 'rgba(249, 250, 251, 0.025)';
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
            ? `rgba(6, 182, 212, ${Math.min(1, particle.opacity * scale * 0.7)})` 
            : `rgba(168, 85, 247, ${Math.min(1, particle.opacity * scale * 0.7)})`);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.fill();
        }
        
        for (let j = i + 1; j < particlesArray.length; j++) {
          const particle2 = particlesArray[j];
          const dx = particle.x - particle2.x;
          const dy = particle.y - particle2.y;
          const dz = particle.z - particle2.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
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
  }, [theme, isClient]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.mensaje) {
        alert('Por favor completa todos los campos requeridos');
        return;
    }
    console.log('Formulario 404 enviado:', formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setShowContactForm(false);
      setFormSubmitted(false);
      setFormData({ nombre: '', email: '', telefono: '', empresa: '', mensaje: '', source: 'error_404_page' });
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
      <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} font-['Inter',_sans-serif] transition-all duration-500 relative overflow-x-hidden`}>
        {isClient && (
          <>
            <canvas 
              ref={canvasRef} 
              className="fixed inset-0 pointer-events-none z-0"
              style={{ opacity: 0.4 }} 
            />
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
              <div 
                className={`absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br ${currentTheme.gradient} blur-3xl opacity-20 animate-pulse`}
                style={{
                  left: `${mousePosition.x * 0.03 - 50}px`, 
                  top: `${mousePosition.y * 0.03 - 50}px`,
                  transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.0003})` 
                }}
              />
              <div 
                className={`absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-gradient-to-tr ${currentTheme.gradient} blur-3xl opacity-15 animate-pulse`}
                style={{
                  right: `${(isClient ? window.innerWidth : 0 - mousePosition.x) * 0.03 - 100}px`, 
                  bottom: `${(isClient ? window.innerHeight : 0 - mousePosition.y) * 0.03 - 100}px`, 
                  animationDelay: '0.5s',
                  transform: `scale(${1 + scrollY * 0.0002})`
                }}
              />
            </div>
          </>
        )}

        {/* 404 Main Section - CORREGIDO COMPLETAMENTE */}
        <section id="error-404" className="relative min-h-screen flex flex-col items-center justify-center z-10 px-4 pt-24 pb-12">
          <div className="w-full max-w-4xl mx-auto flex flex-col justify-center items-center text-center space-y-8">
            
            {/* 404 Illustration - Totalmente rediseñado */}
            <div className={`relative ${visibleSections['error-404'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
              {/* Large 404 Text - Centrado y sin sobreposición */}
              <div className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold bg-gradient-to-r ${currentTheme.gradientText} bg-clip-text text-transparent opacity-25 select-none leading-none mb-4`}>
                404
              </div>
              
              {/* Central Icon - Separado del texto */}
              <div className="flex justify-center">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${currentTheme.gradient}/10 flex items-center justify-center`}>
                  <HelpCircle className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ${currentTheme.highlight} opacity-70`} />
                </div>
              </div>
              
              {/* Floating Icons - Posicionados alrededor sin sobreposición */}
              <div className="absolute -top-4 left-8 animate-float opacity-40">
                <Search className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500" />
              </div>
              <div className="absolute -top-2 right-8 animate-float opacity-40" style={{animationDelay: '1s'}}>
                <Compass className="w-6 h-6 sm:w-7 sm:h-7 text-purple-500" />
              </div>
              <div className="absolute -bottom-8 left-12 animate-float opacity-40" style={{animationDelay: '2s'}}>
                <Map className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
              </div>
              <div className="absolute -bottom-6 right-12 animate-float opacity-40" style={{animationDelay: '0.5s'}}>
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
              </div>
            </div>

            {/* Error Message - Espaciado fijo */}
            <div className={`space-y-4 ${visibleSections['error-404'] ? 'animate-fadeInUp animation-delay-200' : 'opacity-0'}`}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                ¡Oops!{" "}
                <span className={`bg-gradient-to-r ${currentTheme.gradientText} bg-clip-text text-transparent`}>
                  Página no encontrada
                </span>
              </h1>
              <p className={`text-base sm:text-lg md:text-xl ${currentTheme.textSecondary} max-w-2xl mx-auto leading-relaxed`}>
                La página que buscas no existe, pero podemos ayudarte a encontrar lo que necesitas.
              </p>
            </div>

            {/* Action Buttons - Espaciado consistente */}
            <div className={`flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto ${visibleSections['error-404'] ? 'animate-fadeInUp animation-delay-400' : 'opacity-0'}`}>
              <a
                href="/"
                className={`group px-6 py-3 sm:px-8 sm:py-4 rounded-full ${currentTheme.ctaButton} text-base sm:text-lg hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center relative overflow-hidden flex-1`}
              >
                <span className="relative z-10 flex items-center">
                  <Home className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Ir al Inicio
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </a>
              
              <button
                onClick={() => window.history.back()}
                className={`px-6 py-3 sm:px-8 sm:py-4 rounded-full border-2 ${currentTheme.border} ${currentTheme.text} font-bold text-base sm:text-lg hover:scale-105 transform transition-all duration-300 ${currentTheme.hover} flex items-center justify-center flex-1`}
              >
                <ArrowLeft className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Regresar
              </button>
            </div>

            {/* Help Section - Espaciado final */}
            <div className={`${currentTheme.card} rounded-2xl p-6 md:p-8 w-full max-w-2xl shadow-lg border-l-4 border-l-cyan-500 ${visibleSections['error-404'] ? 'animate-fadeInUp animation-delay-600' : 'opacity-0'}`}>
              <h3 className={`text-xl sm:text-2xl font-bold mb-4 ${currentTheme.text}`}>
                ¿Necesitas ayuda?
              </h3>
              <p className={`${currentTheme.textSecondary} mb-6 text-sm sm:text-base`}>
                Si llegaste aquí siguiendo un enlace de nuestro sitio, por favor contáctanos 
                para que podamos corregir el error.
              </p>
              
              <div className="flex justify-center">
                <button
                  onClick={() => openContactModal('error_404_contacto')}
                  className={`px-4 py-3 sm:px-6 rounded-lg border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white font-semibold transition-all duration-300 flex items-center justify-center text-sm sm:text-base`}
                >
                  <Mail className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Contactar Soporte
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeInUp"
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
                className={`absolute top-3 right-3 p-2 rounded-full ${currentTheme.hover} hover:scale-110 transition-all`}
              >
                <X className={`w-5 h-5 ${currentTheme.textSecondary}`} />
              </button>

              {formSubmitted ? (
                <div className="text-center py-10 sm:py-12">
                  <CheckCircleIcon className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-5 animate-bounce" />
                  <h3 className={`text-2xl sm:text-3xl font-bold mb-2 ${currentTheme.text}`}>¡Mensaje enviado!</h3>
                  <p className={`${currentTheme.textSecondary} text-base sm:text-lg`}>
                    Gracias por contactarnos. Te responderemos pronto.
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
                  <h3 className={`text-2xl sm:text-3xl font-bold mb-1 text-center ${currentTheme.text}`}>
                    Reportar problema
                  </h3>
                  <p className={`text-center ${currentTheme.textSecondary} mb-6 text-sm sm:text-base`}>
                    Cuéntanos qué estabas buscando para ayudarte mejor
                  </p>
                  
                  <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-5">
                    <div>
                      <label htmlFor="error-nombre" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>
                        Nombre *
                      </label>
                      <input
                        type="text" id="error-nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required
                        className={`w-full px-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all`}
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div>
                      <label htmlFor="error-email" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`} />
                        <input
                          type="email" id="error-email" name="email" value={formData.email} onChange={handleInputChange} required
                          className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all`}
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label htmlFor="error-telefono" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>
                          Teléfono
                        </label>
                        <div className="relative">
                          <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`} />
                          <input
                            type="tel" id="error-telefono" name="telefono" value={formData.telefono} onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all`}
                            placeholder="+52 123 456 7890"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="error-empresa" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>
                          Empresa
                        </label>
                        <div className="relative">
                          <Building className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`} />
                          <input
                            type="text" id="error-empresa" name="empresa" value={formData.empresa} onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all`}
                            placeholder="Tu empresa"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="error-mensaje" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>
                        ¿Qué estabas buscando? *
                      </label>
                      <textarea
                        id="error-mensaje" name="mensaje" value={formData.mensaje} onChange={handleInputChange} rows={3} required
                        className={`w-full px-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all resize-none`}
                        placeholder="Describe qué página o información estabas buscando..."
                      />
                    </div>
                    <input type="hidden" name="source" value={formData.source} />
                    <button
                      type="submit"
                      className={`w-full py-3 mt-2 rounded-lg ${currentTheme.ctaButton} text-base sm:text-lg hover:scale-[1.02] transform transition-all duration-300 shadow-lg hover:shadow-xl group flex items-center justify-center`}
                    >
                      Enviar reporte
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
              const whatsappUrl = "https://wa.me/525616026685?text=Hola%20Aurhora!%0A%0ALlegue%20a%20una%20pagina%20de%20error%20404%20en%20su%20sitio%20web.%20Podrian%20ayudarme%20a%20encontrar%20lo%20que%20estoy%20buscando%3F%0A%0AEstaba%20intentando%20acceder%20a%3A%20%5BDescribe%20que%20buscabas%5D";
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
                ¡Ayuda inmediata!
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
          .animation-delay-200 { animation-delay: 200ms; }
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

          /* Breakpoint personalizado para xs */
          @media (min-width: 375px) {
            .xs\:text-5xl {
              font-size: 3rem;
              line-height: 1;
            }
            .xs\:text-3xl {
              font-size: 1.875rem;
              line-height: 2.25rem;
            }
          }
        `}</style>
      </div>
    </ClientLayout>
  );
}