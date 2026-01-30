// Mega Menu Component - Stripe-inspired
"use client";

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { 
  Zap, 
  Rocket, 
  Code, 
  TrendingUp, 
  Target, 
  Cog,
  Building,
  CreditCard,
  ShoppingCart,
  Users,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { fadeWithBlurVariants, fadeInUpVariants, staggerContainer } from '@/lib/animations/stripe-motions';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

export function MegaMenu({ isOpen, onClose, locale }: MegaMenuProps) {
  const t = useTranslations();

  const services = [
    {
      category: t('megaMenu.serviciosCore'),
      items: [
        {
          name: t('services.godigital.title'),
          description: t('megaMenu.godigitalDesc'),
          href: `/${locale}/servicios/godigital`,
          icon: Zap,
          color: 'text-purple-600'
        },
        {
          name: t('services.transformation.title'),
          description: t('megaMenu.transformacionDesc'),
          href: `/${locale}/servicios/transformacion-digital`,
          icon: Rocket,
          color: 'text-blue-600'
        },
        {
          name: t('services.development.title'),
          description: t('megaMenu.desarrolloDesc'),
          href: `/${locale}/servicios/desarrollo-software`,
          icon: Code,
          color: 'text-cyan-600'
        }
      ]
    },
    {
      category: t('megaMenu.estrategia'),
      items: [
        {
          name: t('services.marketing.title'),
          description: t('megaMenu.marketingDesc'),
          href: `/${locale}/servicios/impulso-marketing`,
          icon: TrendingUp,
          color: 'text-pink-600'
        },
        {
          name: t('services.agile.title'),
          description: t('megaMenu.culturaDesc'),
          href: `/${locale}/servicios/cultura-agil`,
          icon: Target,
          color: 'text-amber-600'
        },
        {
          name: t('services.optimization.title'),
          description: t('megaMenu.optimizacionDesc'),
          href: `/${locale}/servicios/optimizacion-procesos`,
          icon: Cog,
          color: 'text-emerald-600'
        }
      ]
    }
  ];

  const industries = [
    { name: t('megaMenu.seguros'), icon: Building },
    { name: t('megaMenu.fintech'), icon: CreditCard },
    { name: t('megaMenu.ecommerce'), icon: ShoppingCart },
    { name: t('megaMenu.corporativo'), icon: Users }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeWithBlurVariants}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Mega Menu Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeInUpVariants}
            className="fixed top-[60px] left-0 right-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-800/50 z-50"
            style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
          >
            <div className="container mx-auto px-6 py-8">
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-12 gap-6"
              >
                
                {/* Servicios Core - 4 columnas */}
                <div className="md:col-span-4">
                  <h3 className="font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                    {services[0].category}
                  </h3>
                  <ul className="space-y-2">
                    {services[0].items.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <motion.li key={idx} variants={fadeInUpVariants}>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                          >
                            <div className={`w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                              <Icon className={`w-5 h-5 ${item.color}`} />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                {item.name}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {item.description}
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>

                {/* Estrategia - 4 columnas */}
                <div className="md:col-span-4">
                  <h3 className="font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                    {services[1].category}
                  </h3>
                  <ul className="space-y-2">
                    {services[1].items.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <motion.li key={idx} variants={fadeInUpVariants}>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                          >
                            <div className={`w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                              <Icon className={`w-5 h-5 ${item.color}`} />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                {item.name}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {item.description}
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>

                {/* Destacado - 4 columnas */}
                <div className="md:col-span-4">
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg border border-gray-200/60 dark:border-gray-700/60 h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-500 dark:text-gray-400">
                        {t('megaMenu.destacado')}
                      </span>
                    </div>
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                      {t('megaMenu.suiteTitle')}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {t('megaMenu.suiteDesc')}
                    </p>
                    <Link
                      href={`/${locale}/servicios/godigital`}
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-white hover:gap-2.5 transition-all duration-200"
                    >
                      {t('megaMenu.conocerMas')}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {/* Industrias */}
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h5 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {t('megaMenu.industrias')}
                      </h5>
                      <div className="grid grid-cols-2 gap-1.5">
                        {industries.map((industry, idx) => {
                          const Icon = industry.icon;
                          return (
                            <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                              <Icon className="w-3.5 h-3.5" />
                              <span>{industry.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MegaMenu;
