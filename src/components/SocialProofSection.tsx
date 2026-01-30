// Social Proof Section - Redesigned with Marquee (Optimized)
"use client";

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Building, Users, Award, TrendingUp, CheckCircle } from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const SocialProofSection = memo(function SocialProofSection() {
  const t = useTranslations('socialProof');

  const stats = [
    {
      value: '10+',
      label: t('yearsExperience'),
      icon: Award,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      value: '150+',
      label: t('projectsCompleted'),
      icon: TrendingUp,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      value: '98%',
      label: t('clientSatisfaction'),
      icon: Users,
      color: 'text-cyan-600 dark:text-cyan-400',
      bg: 'bg-cyan-100 dark:bg-cyan-900/20'
    },
    {
      value: '50+',
      label: t('activeClients'),
      icon: Building,
      color: 'text-pink-600 dark:text-pink-400',
      bg: 'bg-pink-100 dark:bg-pink-900/20'
    }
  ];

  // Client names for marquee
  const clients = [
    "TechCorp", "InnovateLab", "DigitalFlow", "FutureSystems", 
    "CloudNine", "DataWise", "SmartSolutions", "NextGen",
    "AlphaTech", "BetaSoft", "GammaGroup", "DeltaDynamics"
  ];

  // Duplicate clients for seamless loop
  const marqueeClients = [...clients, ...clients];

  return (
    <section className="relative py-24 bg-white dark:bg-gray-900 overflow-hidden z-10">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50 dark:from-gray-800/50 to-transparent" />
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gray-50 dark:from-gray-800/50 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium text-gray-600 dark:text-gray-400 mb-6">
            <CheckCircle className="w-3.5 h-3.5 text-green-500" />
            {t('trustedBy')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Resultados que <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">{t('resultsSpeak')}</span>
          </h2>
        </motion.div>

        {/* Stats Grid - Modern Cards */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="group relative p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
              >
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Client Logos Marquee */}
        <div className="relative w-full overflow-hidden py-10 border-y border-gray-100 dark:border-gray-800">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />
          
          <motion.div
            className="flex gap-16 w-max"
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {marqueeClients.map((client, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center min-w-[150px] opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
              >
                <span className="text-xl md:text-2xl font-bold text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 cursor-default">
                  {client}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-24 max-w-4xl mx-auto text-center"
        >
          <div className="relative p-10 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl border border-purple-100 dark:border-gray-700">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
               <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                 <span className="text-3xl leading-none text-white font-serif">"</span>
               </div>
            </div>
            
            <blockquote className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-medium leading-relaxed mt-4 mb-8">
              {t('testimonialQuote')}
            </blockquote>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mb-3 flex items-center justify-center text-lg font-bold text-gray-500">
                A
              </div>
              <div className="text-base font-bold text-gray-900 dark:text-white">
                {t('testimonialName')}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {t('testimonialRole')}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
});

export default SocialProofSection;
