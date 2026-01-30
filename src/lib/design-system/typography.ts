// Sistema Tipográfico Refinado - Hero-inspired
// Basado en la tipografía del hero section para consistencia total

export const typography = {
  // Display - Para hero sections (H1)
  display: {
    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', // 40px - 72px
    lineHeight: '1.1',
    fontWeight: '600',
    letterSpacing: '-0.025em',
  },
  
  // Headline - Para subtítulos principales (H2)
  headline: {
    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', // 24px - 36px
    lineHeight: '1.3',
    fontWeight: '500',
    letterSpacing: '-0.015em',
  },
  
  // Title - Para subtítulos y cards (H3)
  title: {
    fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)', // 20px - 30px
    lineHeight: '1.4',
    fontWeight: '600',
    letterSpacing: '-0.015em',
  },
  
  // Subtitle - Para títulos menores (H4)
  subtitle: {
    fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', // 18px - 24px
    lineHeight: '1.4',
    fontWeight: '500',
    letterSpacing: '-0.01em',
  },
  
  // Body Large - Para descripciones importantes
  bodyLarge: {
    fontSize: 'clamp(1.0625rem, 1.2vw, 1.125rem)', // 17px - 18px
    lineHeight: '1.6',
    fontWeight: '400',
    letterSpacing: '-0.01em',
  },
  
  // Body - Texto estándar
  body: {
    fontSize: 'clamp(0.9375rem, 1vw, 1rem)', // 15px - 16px
    lineHeight: '1.6',
    fontWeight: '400',
    letterSpacing: '-0.01em',
  },
  
  // Body Small - Texto secundario
  bodySmall: {
    fontSize: 'clamp(0.875rem, 0.9vw, 0.9375rem)', // 14px - 15px
    lineHeight: '1.5',
    fontWeight: '400',
    letterSpacing: '-0.005em',
  },
  
  // Caption - Texto muy pequeño
  caption: {
    fontSize: '0.8125rem', // 13px
    lineHeight: '1.4',
    fontWeight: '400',
    letterSpacing: '0',
  },
  
  // Button - Para botones y CTAs
  button: {
    fontSize: '0.9375rem', // 15px
    lineHeight: '1',
    fontWeight: '500',
    letterSpacing: '-0.01em',
  },
  
  // Link - Para enlaces
  link: {
    fontSize: '0.9375rem', // 15px
    lineHeight: '1.5',
    fontWeight: '500',
    letterSpacing: '-0.005em',
  },
};

// Utility classes para aplicar en Tailwind
export const typographyClasses = {
  display: 'text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] font-semibold tracking-[-0.025em]',
  headline: 'text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.3] font-medium tracking-[-0.015em]',
  title: 'text-[clamp(1.25rem,2.5vw,1.875rem)] leading-[1.4] font-semibold tracking-[-0.015em]',
  subtitle: 'text-[clamp(1.125rem,2vw,1.5rem)] leading-[1.4] font-medium tracking-[-0.01em]',
  bodyLarge: 'text-[clamp(1.0625rem,1.2vw,1.125rem)] leading-relaxed font-normal tracking-[-0.01em]',
  body: 'text-[clamp(0.9375rem,1vw,1rem)] leading-relaxed font-normal tracking-[-0.01em]',
  bodySmall: 'text-[clamp(0.875rem,0.9vw,0.9375rem)] leading-normal font-normal tracking-[-0.005em]',
  caption: 'text-[13px] leading-snug font-normal tracking-normal',
  button: 'text-[15px] leading-none font-medium tracking-[-0.01em]',
  link: 'text-[15px] leading-normal font-medium tracking-[-0.005em]',
};

export default typography;
