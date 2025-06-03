'use client'

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronRight as ChevronRightIcon, Brain, UsersRound, Lightbulb, Briefcase, Handshake,
  Mail, Phone, Building, Send, CheckCircle as CheckCircleIcon, Calendar, TrendingUp, Target, Award, 
  ShieldCheck, DollarSign, Terminal, Car, Hospital, Home, Activity, Shield, Users, Smartphone, 
  CreditCard, Landmark, X
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useI18n } from '@/context/I18nContext';
import ClientLayout from '@/components/ClientLayout';

interface ContactFormData {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  mensaje: string;
  source?: string;
}

// Componente para el gráfico de Fintech con anidación para animaciones
const FintechGraphicElement = ({ themeColors, currentHighlightColor }: { themeColors: any, currentHighlightColor: string }) => {
  const iconColor = currentHighlightColor;
  const lineColor = themeColors.textMuted;
  const mainIconScale = 2.6;
  const outerIconScale = 1.7;

  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" fill="none" stroke={themeColors.border} strokeWidth="0.7" opacity="0.25"/>
      <path d="M40 160 Q100 40 160 160 T40 160" fill="none" stroke={currentHighlightColor} strokeWidth="0.4" opacity="0.2" className="animate-svg-pulse-line"/>

      {/* Icono Central (Terminal) */}
      <g transform={`translate(${100 - (12 * mainIconScale)}, ${100 - (12 * mainIconScale)}) scale(${mainIconScale})`}>
        <g className="animate-svg-pulse">
          <Terminal color={iconColor} strokeWidth={1.0} />
        </g>
      </g>

      {/* Icons around */}
      <g transform={`translate(25, 25) scale(${outerIconScale})`}>
        <g className="animate-svg-float-delay1">
          <Landmark color={iconColor} strokeWidth={1.0} />
        </g>
      </g>
      <g transform={`translate(132, 25) scale(${outerIconScale})`}>
        <g className="animate-svg-float-delay2">
          <Smartphone color={iconColor} strokeWidth={1.0} />
        </g>
      </g>
      <g transform={`translate(25, 132) scale(${outerIconScale})`}>
        <g className="animate-svg-float-delay3">
          <CreditCard color={iconColor} strokeWidth={1.0} />
        </g>
      </g>
      <g transform={`translate(132, 132) scale(${outerIconScale})`}>
        <g className="animate-svg-float-delay1">
          <TrendingUp color={iconColor} strokeWidth={1.0} />
        </g>
      </g>
      <g transform={`translate(70, 60) scale(${outerIconScale * 0.8})`}>
        <g className="animate-svg-float-delay2">
          <DollarSign color={iconColor} strokeWidth={1.2} />
        </g>
      </g>

      <line x1="45" y1="45" x2="80" y2="80" stroke={lineColor} strokeWidth="0.3" opacity="0.3"/>
      <line x1="155" y1="45" x2="120" y2="80" stroke={lineColor} strokeWidth="0.3" opacity="0.3"/>
      <line x1="45" y1="155" x2="80" y2="120" stroke={lineColor} strokeWidth="0.3" opacity="0.3"/>
      <line x1="155" y1="155" x2="120" y2="120" stroke={lineColor} strokeWidth="0.3" opacity="0.3"/>
    </svg>
  );
};

// Componente para el gráfico de Seguros con anidación para animaciones
const InsuranceGraphicElement = ({ themeColors, currentHighlightColor }: { themeColors: any, currentHighlightColor: string }) => {
  const iconColor = currentHighlightColor;
  const centralIconScale = 2.8; 
  const surroundingIconScale = 1.8;

  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="insuranceGradient3" cx="50%" cy="50%" r="60%" fx="50%" fy="50%">
          <stop offset="0%" style={{stopColor: currentHighlightColor, stopOpacity:0.2}} />
          <stop offset="100%" style={{stopColor: currentHighlightColor, stopOpacity:0}} />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#insuranceGradient3)" className="animate-svg-pulse-bg-circle"/>
      <circle cx="100" cy="100" r="95" fill="none" stroke={themeColors.border} strokeWidth="0.7" opacity="0.3"/>
      
      {/* Shield (Central y más grande) */}
      <g transform={`translate(${100 - (12*centralIconScale)}, ${100 - (12*centralIconScale)}) scale(${centralIconScale})`}>
        <g className="animate-svg-pulse">
          <Shield color={iconColor} strokeWidth={1.0}/>
        </g>
      </g>

      {/* Icons around shield */}
      <g transform={`translate(30, 40) scale(${surroundingIconScale})`}>
        <g className="animate-svg-float-delay1">
          <Car color={iconColor} strokeWidth={1.0}/>
        </g>
      </g>
      <g transform={`translate(127, 40) scale(${surroundingIconScale})`}>
        <g className="animate-svg-float-delay2">
          <Home color={iconColor} strokeWidth={1.0}/>
        </g>
      </g>
      <g transform={`translate(30, 117) scale(${surroundingIconScale})`}>
        <g className="animate-svg-float-delay3">
          <Hospital color={iconColor} strokeWidth={1.0}/>
        </g>
      </g>
      <g transform={`translate(127, 117) scale(${surroundingIconScale})`}>
        <g className="animate-svg-float-delay1">
          <Activity color={iconColor} strokeWidth={1.0}/>
        </g>
      </g>
       <g transform={`translate(80, 15) scale(${surroundingIconScale * 0.8})`}>
        <g className="animate-svg-float-delay2">
          <Users color={iconColor} strokeWidth={1.2}/>
        </g>
      </g>
    </svg>
  );
};

const QuienesSomosPage = () => {
  const { theme, currentTheme } = useTheme();
  const t = useI18n();
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    nombre: '', email: '', telefono: '', empresa: '', mensaje: '', source: 'quienes_somos_page_contact',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => { setIsClient(true); }, []);

  useEffect(() => {
    if (!isClient) return;
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    const handleScroll = () => setScrollY(window.scrollY);
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
      (entries) => entries.forEach((entry) => setVisibleSections(prev => ({ ...prev, [entry.target.id]: entry.isIntersecting }))),
      { threshold: 0.1 }
    );
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => { if(section) observer.unobserve(section) });
  }, [isClient]);

  useEffect(() => {
    if (!isClient || !canvasRef.current) return;
    const canvas = canvasRef.current, ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;
    const particlesArray: any[] = [];
    const setupParticles = () => {
      canvas.width = window.innerWidth; canvas.height = window.innerHeight; particlesArray.length = 0;
      const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
      for (let i = 0; i < particleCount; i++) {
        particlesArray.push({x: Math.random()*canvas.width,y: Math.random()*canvas.height,z: Math.random()*1000,vx: (Math.random()-0.5)*0.15,vy: (Math.random()-0.5)*0.15,vz: (Math.random()-0.5)*0.7,size: Math.random()*1.1+0.2,opacity: Math.random()*0.25+0.05});
      }
    };
    setupParticles();
    const animate = () => {
      ctx.fillStyle = theme === 'dark' ? 'rgba(17,24,39,0.025)' : 'rgba(249,250,251,0.025)';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      particlesArray.forEach(p => {
        p.x+=p.vx; p.y+=p.vy; p.z+=p.vz;
        if(p.x<0||p.x>canvas.width)p.vx*=-1; if(p.y<0||p.y>canvas.height)p.vy*=-1; if(p.z<1||p.z>1000)p.vz*=-1;
        const scale=1000/(1000+p.z), x2d=(p.x-canvas.width/2)*scale+canvas.width/2, y2d=(p.y-canvas.height/2)*scale+canvas.height/2, size=Math.max(0,p.size*scale);
        if(size>0.1){
          ctx.beginPath(); ctx.arc(x2d,y2d,size,0,Math.PI*2);
          const grad=ctx.createRadialGradient(x2d,y2d,0,x2d,y2d,size);
          grad.addColorStop(0,theme==='dark'?`rgba(6,182,212,${Math.min(1,p.opacity*scale*0.7)})`:`rgba(168,85,247,${Math.min(1,p.opacity*scale*0.7)})`);
          grad.addColorStop(1,'transparent'); ctx.fillStyle=grad; ctx.fill();
        }
      });
      animationFrameId=requestAnimationFrame(animate);
    };
    animate(); window.addEventListener('resize',setupParticles);
    return () => {window.removeEventListener('resize',setupParticles); cancelAnimationFrame(animationFrameId);}
  }, [theme, isClient]);

  // ACTUALIZADAS: Team strengths usando traducciones
  const teamStrengths = [
    {icon: <Brain className="w-10 h-10" />, title: t('aboutUs.expertOrchestration'), description: t('aboutUs.expertOrchestrationDesc'), color: "cyan"},
    {icon: <UsersRound className="w-10 h-10" />, title: t('aboutUs.multidisciplinaryTeams'), description: t('aboutUs.multidisciplinaryTeamsDesc'), color: "purple"},
    {icon: <Lightbulb className="w-10 h-10" />, title: t('aboutUs.tropicalizationInnovation'), description: t('aboutUs.tropicalizationInnovationDesc'), color: "pink"},
  ];

  // ACTUALIZADAS: Listas de expertise usando traducciones
  const insuranceExpertise = [
    t('aboutUs.insurance.medicalExpenses'),
    t('aboutUs.insurance.auto'), 
    t('aboutUs.insurance.life'),
    t('aboutUs.insurance.property'),
    t('aboutUs.insurance.savings'),
    t('aboutUs.insurance.claims'),
    t('aboutUs.insurance.underwriting'),
    t('aboutUs.insurance.channels')
  ];
  
  const fintechExpertise = [
    t('aboutUs.fintech.mobileBanking'),
    t('aboutUs.fintech.paymentGateways'),
    t('aboutUs.fintech.cardProcessing'),
    t('aboutUs.fintech.neoBanks'),
    t('aboutUs.fintech.coreBanking'),
    t('aboutUs.fintech.digitalLoans'),
    t('aboutUs.fintech.openBanking'),
    t('aboutUs.fintech.kyc')
  ];
  
  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  
  // MODIFICADO: Timeout extendido a 5 segundos
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.mensaje) { 
      alert(t('contact.required')); 
      return; 
    }
    console.log('Formulario de "Quiénes Somos" enviado:', {...formData, source: 'quienes_somos_cta'});
    setFormSubmitted(true);
    setTimeout(() => { 
      setShowContactForm(false); 
      setFormSubmitted(false); 
      setFormData({ nombre: '', email: '', telefono: '', empresa: '', mensaje: '', source: 'quienes_somos_page_contact' }); 
    }, 5000); // CAMBIADO: de 3000 a 5000
  };
  
  const openContactModal = (source: string) => {
    setFormData(prev => ({ ...prev, nombre: '', email: '', telefono: '', empresa: '', mensaje: '', source: source }));
    setFormSubmitted(false); setShowContactForm(true);
  };

  return (
    <ClientLayout openContactModal={openContactModal}>
      <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} font-['Inter',_sans-serif] transition-all duration-500 relative overflow-x-hidden`}>
        {isClient && (
          <>
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.35 }} />
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
              <div 
                className={`absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br ${currentTheme.gradient} blur-3xl opacity-15 animate-pulse`}
                style={{ left: `${mousePosition.x * 0.02 - 50}px`, top: `${mousePosition.y * 0.02 - 50}px`, transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.0002})` }}
              />
              <div 
                className={`absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-gradient-to-tr ${currentTheme.gradient} blur-3xl opacity-10 animate-pulse`}
                style={{ right: `${(isClient ? window.innerWidth : 0 - mousePosition.x) * 0.02 - 100}px`, bottom: `${(isClient ? window.innerHeight : 0 - mousePosition.y) * 0.02 - 100}px`, animationDelay: '0.5s', transform: `scale(${1 + scrollY * 0.00015})`}}
              />
            </div>
          </>
        )}

        {/* Hero Section - TRADUCIDO */}
        <section id="hero-quienes-somos" className="relative pt-28 pb-20 md:pt-40 md:pb-28 flex items-center justify-center z-10 overflow-hidden">
          <div className="container mx-auto px-6 text-center relative">
            <span className={`inline-block px-5 py-2 mb-6 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 text-sm font-semibold rounded-full uppercase tracking-wider border ${currentTheme.border} shadow-sm ${visibleSections['hero-quienes-somos'] ? 'animate-fadeInUp' : 'opacity-0'}`}>{t('aboutUs.badge')}</span>
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight ${visibleSections['hero-quienes-somos']?'animate-fadeInUp animation-delay-100':'opacity-0'}`}>
              <span className={`block bg-gradient-to-r ${currentTheme.gradientText} bg-clip-text text-transparent`}>{t('aboutUs.heroTitle1')}</span>
              <span className={`block ${currentTheme.text} mt-2 md:mt-3`}>{t('aboutUs.heroTitle2')}</span>
            </h1>
            <p className={`text-lg md:text-xl ${currentTheme.textSecondary} max-w-3xl mx-auto mb-10 leading-relaxed ${visibleSections['hero-quienes-somos']?'animate-fadeInUp animation-delay-200':'opacity-0'}`}>
              {t('aboutUs.heroDescription')}
            </p>
            <div className={`mt-8 md:mt-10 ${visibleSections['hero-quienes-somos'] ? 'animate-fadeInUp animation-delay-300' : 'opacity-0'}`}>
              <button
                onClick={() => openContactModal('quienes_somos_hero_agenda')}
                className={`inline-block bg-gradient-to-r ${currentTheme.ctaButton} text-white font-semibold py-3.5 px-8 md:py-4 md:px-10 rounded-full text-base md:text-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group`}
              >
                <span className="flex items-center">
                  {t('aboutUs.scheduleStrategicSession')}
                  <Calendar className="ml-2.5 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Nuestra Esencia Section - TRADUCIDO */}
        <section id="nuestra-esencia" className={`py-16 md:py-24 ${currentTheme.bgSecondary} relative z-10`}>
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className={`${visibleSections['nuestra-esencia']?'animate-fadeInLeft':'opacity-0'}`}>
                <span className={`inline-block px-3 py-1 mb-3 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold rounded-full uppercase`}>{t('aboutUs.heartBadge')}</span>
                <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${currentTheme.text}`}>{t('aboutUs.essenceTitle1')} <span className={`bg-gradient-to-r ${currentTheme.gradientText} bg-clip-text text-transparent`}>{t('aboutUs.essenceTitle2')}</span></h2>
                <p className={`${currentTheme.textSecondary} text-lg mb-4 leading-relaxed`}>
                  {t('aboutUs.essenceDescription1')}
                </p>
                <p className={`${currentTheme.textSecondary} text-lg mb-6 leading-relaxed`}>
                  {t('aboutUs.essenceDescription2')}
                </p>
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full bg-gradient-to-br ${currentTheme.gradient}/20`}>
                    <Briefcase className={`w-8 h-8 ${currentTheme.highlight}`}/>
                  </div>
                  <div>
                    <h4 className={`text-xl font-semibold ${currentTheme.text}`}>{t('aboutUs.experienceYears')}</h4>
                    <p className={currentTheme.textMuted}>{t('aboutUs.experienceSubtitle')}</p>
                  </div>
                </div>
              </div>
              <div className={`relative mt-10 lg:mt-0 ${visibleSections['nuestra-esencia']?'animate-fadeInRight animation-delay-200':'opacity-0'}`}>
                <div className={`${currentTheme.card} p-8 rounded-xl shadow-2xl border ${currentTheme.border}`}>
                  <div className="aspect-[3/2] flex items-center justify-center">
                    <Briefcase className={`w-32 h-32 ${currentTheme.highlight} opacity-30`}/>
                  </div>
                  <p className={`mt-6 text-center ${currentTheme.textSecondary} italic`}>{t('aboutUs.essenceQuote')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* El Arte de la Orquestación Section - TRADUCIDO */}
        <section id="poder-orquestacion" className={`py-16 md:py-24 ${currentTheme.bg} relative z-10`}>
          <div className="container mx-auto px-6 text-center">
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${visibleSections['poder-orquestacion']?'animate-fadeInUp':'opacity-0'}`}>
              {t('aboutUs.orchestrationTitle')}
            </h2>
            <p className={`text-lg ${currentTheme.textSecondary} max-w-3xl mx-auto mb-12 ${visibleSections['poder-orquestacion']?'animate-fadeInUp animation-delay-100':'opacity-0'}`}>
              {t('aboutUs.orchestrationDescription')}
            </p>
            <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
              {teamStrengths.map((strength,index)=>(
                <div key={index} className={`p-8 rounded-xl ${currentTheme.card} border ${currentTheme.border} transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl ${visibleSections['poder-orquestacion']?'animate-fadeInUp':'opacity-0'}`} style={{animationDelay:`${(index+1)*150}ms`}}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-${strength.color}-500/20 to-transparent mb-6 border-2 border-${strength.color}-500/30 text-${strength.color}-500`}>
                    {strength.icon}
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${currentTheme.text}`}>{strength.title}</h3>
                  <p className={`${currentTheme.textSecondary} text-sm`}>{strength.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Especialistas en Seguros Section - TRADUCIDO */}
        <section id="especialistas-seguros" className={`py-16 md:py-24 ${currentTheme.bgSecondary} relative z-10`}>
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className={`order-2 lg:order-1 ${visibleSections['especialistas-seguros']?'animate-fadeInLeft':'opacity-0'}`}>
                <span className={`inline-block px-3 py-1 mb-3 bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-semibold rounded-full uppercase`}>{t('aboutUs.sectoralStrengthBadge')}</span>
                <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${currentTheme.text}`}>{t('aboutUs.insuranceTitle')}</h2>
                <p className={`${currentTheme.textSecondary} text-lg mb-4 leading-relaxed`}>
                  {t('aboutUs.insuranceDescription1')}
                </p>
                <p className={`${currentTheme.textSecondary} text-lg mb-6 leading-relaxed`}>
                  {t('aboutUs.insuranceDescription2')}
                </p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8">
                  {insuranceExpertise.map((item,index)=>(
                    <div key={index} className="flex items-center">
                      <ShieldCheck className="w-5 h-5 text-sky-500 mr-2 flex-shrink-0"/>
                      <span className={`${currentTheme.textSecondary} text-sm`}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`order-1 lg:order-2 relative flex items-center justify-center ${visibleSections['especialistas-seguros']?'animate-fadeInRight animation-delay-200':'opacity-0'}`}>
                <div className={`${currentTheme.card} p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl border ${currentTheme.border} w-full max-w-md aspect-square flex items-center justify-center overflow-hidden`}>
                  <InsuranceGraphicElement themeColors={currentTheme} currentHighlightColor="rgb(14 165 233)" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertos en Fintech Section - TRADUCIDO */}
        <section id="expertos-fintech" className={`py-16 md:py-24 ${currentTheme.bg} relative z-10`}>
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className={`relative flex items-center justify-center ${visibleSections['expertos-fintech']?'animate-fadeInLeft animation-delay-200':'opacity-0'}`}>
                <div className={`${currentTheme.card} p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl border ${currentTheme.border} w-full max-w-md aspect-square flex items-center justify-center overflow-hidden`}>
                  <FintechGraphicElement themeColors={currentTheme} currentHighlightColor="rgb(168 85 247)" />
                </div>
              </div>
              <div className={`${visibleSections['expertos-fintech']?'animate-fadeInRight':'opacity-0'}`}>
                <span className={`inline-block px-3 py-1 mb-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold rounded-full uppercase`}>{t('aboutUs.sectoralStrengthBadge')}</span>
                <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${currentTheme.text}`}>{t('aboutUs.fintechTitle')}</h2>
                <p className={`${currentTheme.textSecondary} text-lg mb-4 leading-relaxed`}>
                  {t('aboutUs.fintechDescription1')}
                </p>
                <p className={`${currentTheme.textSecondary} text-lg mb-6 leading-relaxed`}>
                  {t('aboutUs.fintechDescription2')}
                </p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8">
                  {fintechExpertise.map((item,index)=>(
                    <div key={index} className="flex items-center">
                      <DollarSign className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0"/>
                      <span className={`${currentTheme.textSecondary} text-sm`}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filosofía de Co-creación Section - TRADUCIDO */}
        <section id="filosofia-cocreacion" className={`py-16 md:py-24 ${currentTheme.bgSecondary} relative z-10`}>
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${currentTheme.gradient}/20 mb-8 ${visibleSections['filosofia-cocreacion']?'animate-fadeInUp':'opacity-0'}`}>
                <Handshake className={`w-10 h-10 ${currentTheme.highlight}`}/>
              </div>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${visibleSections['filosofia-cocreacion']?'animate-fadeInUp animation-delay-100':'opacity-0'}`}>
                {t('aboutUs.cocreationTitle')}
              </h2>
              <p className={`text-lg ${currentTheme.textSecondary} mb-6 leading-relaxed ${visibleSections['filosofia-cocreacion']?'animate-fadeInUp animation-delay-200':'opacity-0'}`}>
                {t('aboutUs.cocreationDescription1')}
              </p>
              <p className={`${currentTheme.textSecondary} leading-relaxed ${visibleSections['filosofia-cocreacion']?'animate-fadeInUp animation-delay-300':'opacity-0'}`}>
                {t('aboutUs.cocreationDescription2')}
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA Final Section - TRADUCIDO */}
        <section id="cta-quienes-somos" className={`py-20 md:py-28 ${currentTheme.bg} relative overflow-hidden z-10`}>
          <div className="absolute -top-40 -left-40 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-cyan-400/40 via-purple-500/40 to-pink-400/40 opacity-10 blur-3xl pointer-events-none animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-pink-400/40 via-purple-500/40 to-cyan-400/40 opacity-10 blur-3xl pointer-events-none animate-pulse" style={{animationDelay:'400ms'}}></div>
          <div className={`container mx-auto px-6 text-center relative z-10 ${visibleSections['cta-quienes-somos']?'animate-fadeInUp':'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
              {t('aboutUs.ctaTitle')}
            </h2>
            <p className={`text-xl md:text-2xl max-w-2xl mx-auto mb-10 ${currentTheme.textSecondary}`}>
              {t('aboutUs.ctaDescription')}
            </p>
            <button onClick={()=>openContactModal('cta_quienes_somos_agenda')} className={`inline-block bg-gradient-to-r ${currentTheme.ctaButton} text-white font-semibold py-4 px-10 rounded-full text-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group`}>
              <span className="flex items-center">
                {t('aboutUs.scheduleStrategicSessionCta')}
                <Calendar className="ml-2.5 w-5 h-5 group-hover:rotate-12 transition-transform duration-300"/>
              </span>
            </button>
          </div>
        </section>

        {/* Contact Form Modal - MODIFICADO: Sin animación que lo oculte y con click fuera */}
        {showContactForm && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeInUp"
            onClick={(e) => {
              // Solo cerrar si se hace click en el fondo, no en el contenido del modal
              if (e.target === e.currentTarget) {
                setShowContactForm(false);
                setFormSubmitted(false);
              }
            }}
          >
            <div className={`relative w-full max-w-lg ${currentTheme.card} rounded-2xl shadow-2xl p-6 sm:p-8 transform transition-all duration-300`}>
              <button onClick={()=>setShowContactForm(false)} aria-label={t('godigital.closeForm')} className={`absolute top-3 right-3 p-2 rounded-full ${currentTheme.hover} hover:scale-110 transition-all`}>
                <X className={`w-5 h-5 ${currentTheme.textSecondary}`}/>
              </button>
              {formSubmitted?(
                <div className="text-center py-10 sm:py-12">
                  <CheckCircleIcon className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-5 animate-bounce"/>
                  <h3 className={`text-2xl sm:text-3xl font-bold mb-2 ${currentTheme.text}`}>{t('contact.sent')}</h3>
                  <p className={`${currentTheme.textSecondary} text-base sm:text-lg`}>{t('contact.thanks')}</p>
                  <div className="mt-6">
                    <p className={`text-sm ${currentTheme.textSecondary} mb-3`}>
                      El modal se cerrará automáticamente en unos segundos...
                    </p>
                    <button
                      onClick={() => {
                        setShowContactForm(false);
                        setFormSubmitted(false);
                      }}
                      className={`px-4 py-2 rounded-lg bg-gradient-to-r ${currentTheme.ctaButton} text-white text-sm hover:scale-105 transition-all`}
                    >
                      Cerrar ahora
                    </button>
                  </div>
                </div>
              ):(
                <> 
                  <h3 className={`text-2xl sm:text-3xl font-bold mb-1 text-center ${currentTheme.text}`}>{t('contact.title')}</h3>
                  <p className={`text-center ${currentTheme.textSecondary} mb-6 text-sm sm:text-base`}>{t('contact.description')}</p>
                  <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-5">
                    <div>
                      <label htmlFor="qs-nombre" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>{t('contact.name')}*</label>
                      <input type="text" id="qs-nombre" name="nombre" value={formData.nombre} onChange={handleFormInputChange} required className={`w-full px-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all`} placeholder={t('form.namePlaceholder')}/>
                    </div>
                    <div>
                      <label htmlFor="qs-email" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>{t('contact.email')}*</label>
                      <div className="relative">
                        <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textMuted}`}/>
                        <input type="email" id="qs-email" name="email" value={formData.email} onChange={handleFormInputChange} required className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all`} placeholder={t('form.emailPlaceholder')}/>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label htmlFor="qs-telefono" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>{t('contact.phone')}</label>
                        <div className="relative">
                          <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textMuted}`}/>
                          <input type="tel" id="qs-telefono" name="telefono" value={formData.telefono} onChange={handleFormInputChange} className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all`} placeholder={t('form.phonePlaceholder')}/>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="qs-empresa" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>{t('contact.company')}</label>
                        <div className="relative">
                          <Building className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textMuted}`}/>
                          <input type="text" id="qs-empresa" name="empresa" value={formData.empresa} onChange={handleFormInputChange} className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all`} placeholder={t('form.companyPlaceholder')}/>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="qs-mensaje" className={`block text-sm font-medium mb-1.5 ${currentTheme.textSecondary}`}>{t('contact.message')}*</label>
                      <textarea id="qs-mensaje" name="mensaje" value={formData.mensaje} onChange={handleFormInputChange} rows={3} required className={`w-full px-4 py-2.5 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all resize-none`} placeholder={t('form.messagePlaceholder')}/>
                    </div>
                    <input type="hidden" name="source" value={formData.source}/> 
                    <button type="submit" className={`w-full py-3 mt-2 rounded-lg ${currentTheme.ctaButton} font-bold text-base sm:text-lg hover:scale-[1.02] transform transition-all duration-300 shadow-lg hover:shadow-xl group flex items-center justify-center`}>
                      {t('contact.send')}
                      <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}

        {/* WhatsApp Floating Button - AGREGADO */}
        {isClient && (
          <a
            href="#"
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="Contactar por WhatsApp"
            onClick={(e) => {
              e.preventDefault();
              const whatsappUrl = "https://wa.me/525616026685?text=Hola%20Aurhora!%0A%0AVisite%20su%20sitio%20web%20y%20me%20interesa%20conocer%20mas%20sobre%20sus%20servicios%20de%20transformacion%20digital.%0A%0APodrian%20contarme%20como%20pueden%20ayudar%20a%20mi%20empresa%20a%3A%0A%0A-%20Digitalizar%20procesos%0A-%20Aumentar%20la%20eficiencia%0A-%20Implementar%20tecnologia%20innovadora%0A%0AMe%20gustaria%20agendar%20una%20consultoria%20gratuita.%20Cuando%20podriamos%20conversar%3F";
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
                ¡Chatea con nosotros!
              </div>
            </div>
          </a>
        )}
      
        <style jsx global>{` 
          @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-25px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes fadeInRight { from { opacity: 0; transform: translateX(25px); } to { opacity: 1; transform: translateX(0); } }
          
          .animate-float { animation: float 3.5s ease-in-out infinite; }
          .animate-fadeInUp { animation: fadeInUp .6s ease-out forwards; }
          .animate-fadeInLeft { animation: fadeInLeft .7s ease-out forwards; }
          .animate-fadeInRight { animation: fadeInRight .7s ease-out forwards; }

          .animation-delay-100 { animation-delay:100ms; }
          .animation-delay-200 { animation-delay:200ms; }
          .animation-delay-300 { animation-delay:300ms; }

          @keyframes svgFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          @keyframes svgPulse {
            0%, 100% { transform: scale(1); opacity: 0.9; }
            50% { transform: scale(1.03); opacity: 1; } 
          }
          @keyframes svgPulseLine { 
            0%, 100% { stroke-dashoffset: 0; opacity: 0.2; }
            50% { stroke-dashoffset: 25; opacity: 0.35; } 
          }
           @keyframes svgPulseBgKeyframes { 
            0%, 100% { opacity: 0.7; transform: scale(1); } 
            50% { opacity: 1; transform: scale(1.02); }
          }

          .animate-svg-float { animation: svgFloat 5s ease-in-out infinite; }
          .animate-svg-float-delay1 { animation: svgFloat 5.2s ease-in-out infinite 0.3s; }
          .animate-svg-float-delay2 { animation: svgFloat 4.8s ease-in-out infinite 0.6s; }
          .animate-svg-float-delay3 { animation: svgFloat 5.5s ease-in-out infinite 0.9s; }
          .animate-svg-pulse { animation: svgPulse 3.5s ease-in-out infinite; }
          .animate-svg-pulse-line { animation: svgPulseLine 7s linear infinite; stroke-dasharray: 15 5; }
          .animate-svg-pulse-bg-circle { animation: svgPulseBgKeyframes 4.5s ease-in-out infinite; transform-origin: center center; }

          body, html { scroll-behavior: smooth; font-family: 'Inter', sans-serif; }
          .font-['Inter',_sans-serif] { font-family: 'Inter', sans-serif; }
        `}</style>
      </div>
    </ClientLayout>
  );
};

export default QuienesSomosPage;