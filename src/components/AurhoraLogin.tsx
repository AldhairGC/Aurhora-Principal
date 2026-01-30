'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, Shield, Zap, Globe, ArrowLeft } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useTranslations } from 'next-intl'; // Hook de traducción con next-intl
import ClientLayout from '@/components/ClientLayout';

const AurhoraLoginElegant = () => {
  const { theme, setTheme, currentTheme } = useTheme();
  const t = useTranslations(); // Hook de traducción con next-intl
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Colores del logotipo dinámicos según el tema (igual que en Header)
  const lineColorPurple = theme === 'dark' ? '#A855F7' : '#9333EA';
  const lineColorMagenta = theme === 'dark' ? '#E879F9' : '#D946EF';
  const lineColorCyan = theme === 'dark' ? '#06B6D4' : '#0EA5E9';

  // Mouse tracking
  useEffect(() => {
    if (!isClient) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isClient]);

  // Subtle particle animation
  useEffect(() => {
    if (!isClient || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: any[] = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1
      });
    }
    
    let animationFrameId: number;
    const animate = () => {
      ctx.fillStyle = theme === 'dark' ? 'rgba(17, 24, 39, 0.02)' : 'rgba(249, 250, 251, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = theme === 'dark' 
          ? `rgba(6, 182, 212, ${particle.opacity})`
          : `rgba(168, 85, 247, ${particle.opacity})`;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    }
  }, [theme, isClient]);

  const handleLogin = () => {
    if (email && password) {
      setIsLoading(true);
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    }
  };

  const openContactModal = (source: string) => {
    console.log(`Contact modal opened from: ${source}`);
    // Esta función será manejada por ClientLayout si es necesario
  };

  return (
    <ClientLayout openContactModal={openContactModal}>
      <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} relative overflow-hidden`}>
        {isClient && (
          <>
            {/* Subtle Particle Canvas */}
            <canvas 
              ref={canvasRef} 
              className="fixed inset-0 pointer-events-none z-0 opacity-50"
            />
            
            {/* Subtle Gradient Orbs */}
            <div className="fixed inset-0 pointer-events-none z-0">
              <div 
                className={`absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br ${currentTheme.gradient} blur-3xl opacity-10`}
                style={{
                  left: `${mousePosition.x * 0.05 - 200}px`,
                  top: `${mousePosition.y * 0.05 - 200}px`,
                }}
              />
            </div>
          </>
        )}

        {/* Main Content Grid */}
        <div className="min-h-screen flex items-center justify-center p-6 pt-24">
          <div className="w-full max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Side - Branding (50% of space) */}
              <div className="text-center lg:text-left space-y-8">
                {/* Logo - ACTUALIZADO con el nuevo diseño */}
                <div className="flex justify-center lg:justify-start">
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r ${currentTheme.gradient} blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                    <svg width="120" height="120" viewBox="0 0 100 100" className="relative transform group-hover:rotate-12 transition-transform duration-300">
                      <defs>
                        <linearGradient id="loginLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={lineColorMagenta} />
                          <stop offset="50%" stopColor={lineColorPurple} />
                          <stop offset="100%" stopColor={lineColorCyan} />
                        </linearGradient>
                      </defs>
                      <path d="M50 10 L10 90 L30 90 L45 40 L55 40 L70 90 L90 90 Z"
                            fill="url(#loginLogoGradient)" />
                    </svg>
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <h1 className="text-6xl font-bold mb-2">
                    <span className={`bg-gradient-to-r ${currentTheme.gradientText} bg-clip-text text-transparent`}>
                      AURHORA
                    </span>
                  </h1>
                  <p className={`text-2xl ${currentTheme.textSecondary}`}>Agency</p>
                </div>

                {/* Tagline - TRADUCIDO */}
                <p className={`text-xl ${currentTheme.textSecondary} max-w-md mx-auto lg:mx-0`}>
                  {t('login.tagline')}
                </p>

                {/* Feature Badges - TRADUCIDOS */}
                <div className="flex justify-center lg:justify-start space-x-6">
                  <div className="text-center">
                    <Shield className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
                    <p className={`text-sm ${currentTheme.textSecondary}`}>{t('login.secure')}</p>
                  </div>
                  <div className="text-center">
                    <Zap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <p className={`text-sm ${currentTheme.textSecondary}`}>{t('login.fast')}</p>
                  </div>
                  <div className="text-center">
                    <Globe className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                    <p className={`text-sm ${currentTheme.textSecondary}`}>{t('login.global')}</p>
                  </div>
                </div>
              </div>

              {/* Right Side - Compact Login Form (25% of space) */}
              <div className="flex justify-center lg:justify-end">
                <div className={`w-full max-w-sm p-8 rounded-2xl ${currentTheme.card} border ${currentTheme.border} shadow-xl`}>
                  
                  {/* Form Header - TRADUCIDO */}
                  <h2 className={`text-2xl font-bold mb-6 ${currentTheme.text}`}>
                    {t('login.title')}
                  </h2>

                  {/* Email Input - TRADUCIDO */}
                  <div className="mb-4">
                    <label className={`block text-sm font-medium mb-2 ${currentTheme.text}`}>
                      {t('login.email')}
                    </label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${currentTheme.textSecondary}`} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${currentTheme.inputBg} ${currentTheme.text} text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50`}
                        placeholder={t('login.emailPlaceholder')}
                      />
                    </div>
                  </div>

                  {/* Password Input - TRADUCIDO */}
                  <div className="mb-6">
                    <label className={`block text-sm font-medium mb-2 ${currentTheme.text}`}>
                      {t('login.password')}
                    </label>
                    <div className="relative">
                      <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${currentTheme.textSecondary}`} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full pl-10 pr-10 py-2.5 rounded-lg ${currentTheme.inputBg} ${currentTheme.text} text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                        placeholder={t('login.passwordPlaceholder')}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className={`w-4 h-4 ${currentTheme.textSecondary} hover:text-purple-500 transition-colors`} />
                        ) : (
                          <Eye className={`w-4 h-4 ${currentTheme.textSecondary} hover:text-purple-500 transition-colors`} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember & Forgot - TRADUCIDOS */}
                  <div className="flex justify-between items-center mb-6 text-sm">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-3.5 h-3.5 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                      />
                      <span className={currentTheme.textSecondary}>{t('login.rememberMe')}</span>
                    </label>
                    <a href="#" className="text-purple-500 hover:text-purple-400 transition-colors">
                      {t('login.forgotPassword')}
                    </a>
                  </div>

                  {/* Submit Button - TRADUCIDO */}
                  <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className={`w-full py-3 rounded-lg bg-gradient-to-r ${currentTheme.gradient} text-white font-semibold hover:scale-[1.02] transform transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group`}
                  >
                    <span className="relative z-10 flex items-center justify-center text-sm">
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          {t('login.loggingIn')}
                        </>
                      ) : (
                        <>
                          {t('login.access')}
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                  </button>

                  {/* Sign Up Link - TRADUCIDO */}
                  <p className={`text-center mt-6 text-sm ${currentTheme.textSecondary}`}>
                    {t('login.noAccount')}{' '}
                    <a href="#" className="text-purple-500 hover:text-purple-400 font-medium transition-colors">
                      {t('login.signUp')}
                    </a>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Subtle floating elements */}
        {isClient && (
          <>
            <div className="fixed bottom-10 left-10 animate-float opacity-20">
              <Sparkles className="w-6 h-6 text-cyan-500" />
            </div>
            <div className="fixed top-1/3 right-10 animate-float opacity-20" style={{animationDelay: '2s'}}>
              <Sparkles className="w-4 h-4 text-purple-500" />
            </div>
          </>
        )}

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        `}</style>
      </div>
    </ClientLayout>
  );
};

export default AurhoraLoginElegant;