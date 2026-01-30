// Sticky CTA Bar - Stripe-inspired
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, X } from 'lucide-react';
import { StrategicCTA } from './StrategicCTA';

interface StickyCTABarProps {
  onContactClick: () => void;
}

export function StickyCTABar({ onContactClick }: StickyCTABarProps) {
  const t = useTranslations('stickyCTA');
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Verificar si ya fue dismissed en esta sesión
    const dismissed = sessionStorage.getItem('stickyCTADismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    const handleScroll = () => {
      // Mostrar después de scroll de 800px
      const shouldShow = window.scrollY > 800;
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('stickyCTADismissed', 'true');
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-2xl safe-area-bottom"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <div className="container mx-auto px-4 md:px-8 py-3 md:py-4">
            <div className="flex items-center justify-between gap-3 md:gap-4">
              
              {/* Texto - oculto en móviles muy pequeños */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white text-sm md:text-base truncate">
                  {t('title')}
                </p>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 hidden sm:block truncate">
                  {t('subtitle')}
                </p>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <StrategicCTA 
                  variant="primary" 
                  size="sm"
                  text={t('cta')}
                  icon={<ArrowRight className="w-4 h-4" />}
                  onClick={onContactClick}
                  className="text-xs md:text-sm px-3 md:px-4 py-2.5 md:py-3"
                />
                
                {/* Botón dismiss - más grande para touch */}
                <button
                  onClick={handleDismiss}
                  aria-label={t('close')}
                  className="p-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

            </div>
          </div>

          {/* Progress indicator - más delgado en móvil */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 5, ease: 'linear' }}
            className="h-0.5 md:h-1 bg-gradient-to-r from-purple-600 to-blue-600 origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default StickyCTABar;
