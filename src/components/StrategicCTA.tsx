// Strategic CTA Component - Stripe-inspired
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { scaleOnHover } from '@/lib/animations/stripe-motions';

interface CTAProps {
  variant?: 'primary' | 'secondary' | 'inline';
  size?: 'sm' | 'md' | 'lg';
  text: string;
  subtext?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  fullWidth?: boolean;
}

export function StrategicCTA({ 
  variant = 'primary', 
  size = 'md', 
  text, 
  subtext, 
  icon, 
  onClick,
  href,
  className = '',
  fullWidth = false
}: CTAProps) {
  
  const baseStyles = "group relative overflow-hidden font-semibold transition-all inline-flex items-center justify-center gap-2 active:scale-[0.98] touch-manipulation";
  
  const sizeStyles = {
    sm: "px-4 py-2.5 text-sm rounded-full min-h-[44px]",
    md: "px-5 md:px-6 py-3 text-sm md:text-base rounded-full min-h-[44px]",
    lg: "px-6 md:px-8 py-3.5 md:py-4 text-base md:text-lg rounded-full min-h-[48px]"
  };
  
  const variantStyles = {
    primary: "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-2xl hover:scale-105 hover:from-purple-700 hover:to-blue-700",
    secondary: "border-2 border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:scale-105",
    inline: "text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 underline-offset-4 hover:underline hover:gap-4"
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyles} ${className}`;

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {text}
        {icon && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
      </span>
      
      {/* Efecto de brillo al hover (estilo Stripe) - solo para primary */}
      {variant === 'primary' && (
        <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-gradient-to-t from-white/20 to-transparent transition-transform duration-300" />
      )}
      
      {subtext && (
        <span className="text-xs opacity-75 ml-2">{subtext}</span>
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={combinedClasses}
        variants={scaleOnHover}
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={combinedClasses}
      variants={scaleOnHover}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}

export default StrategicCTA;
