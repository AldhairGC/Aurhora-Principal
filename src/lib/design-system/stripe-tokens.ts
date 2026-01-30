// Stripe-inspired Design Tokens
// Sistema de diseño refinado basado en las mejores prácticas de Stripe

export const stripeInspiredTokens = {
  colors: {
    primary: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',  // Púrpura principal (Stripe-like)
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
    },
    accent: {
      cyan: {
        50: '#ecfeff',
        500: '#06b6d4',
        600: '#0891b2',
      },
      blue: {
        50: '#eff6ff',
        500: '#0ea5e9',
        600: '#0284c7',
      },
      indigo: {
        50: '#eef2ff',
        500: '#6366f1',
        600: '#4f46e5',
      },
    },
    neutral: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
    },
    semantic: {
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    }
  },
  
  spacing: {
    section: '8rem',      // 128px - Espaciado entre secciones (Stripe usa mucho espacio)
    sectionSm: '6rem',    // 96px - Para móviles
    container: '7rem',    // 112px - Padding del container
    containerSm: '2rem',  // 32px - Para móviles
    cardGap: '2rem',      // 32px - Gap entre cards
    cardPadding: '2rem',  // 32px - Padding interno de cards
  },
  
  typography: {
    display: {
      fontSize: 'clamp(3rem, 6vw, 5.5rem)',  // 48px - 88px
      lineHeight: '1.1',
      fontWeight: '700',
      letterSpacing: '-0.02em',
    },
    headline: {
      fontSize: 'clamp(2rem, 4vw, 3.5rem)',  // 32px - 56px
      lineHeight: '1.2',
      fontWeight: '600',
      letterSpacing: '-0.01em',
    },
    title: {
      fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',  // 24px - 36px
      lineHeight: '1.3',
      fontWeight: '600',
    },
    body: {
      fontSize: 'clamp(1rem, 1vw, 1.125rem)',  // 16px - 18px
      lineHeight: '1.6',
      fontWeight: '400',
    },
    caption: {
      fontSize: 'clamp(0.875rem, 1vw, 1rem)',  // 14px - 16px
      lineHeight: '1.5',
      fontWeight: '400',
    }
  },
  
  effects: {
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.08)',
      lg: '0 8px 16px -2px rgba(0, 0, 0, 0.10)',
      xl: '0 12px 24px -4px rgba(0, 0, 0, 0.12)',
      card: '0 8px 30px rgba(0, 0, 0, 0.12)',
      cardHover: '0 20px 40px rgba(0, 0, 0, 0.16)',
      subtle: '0 2px 8px rgba(0, 0, 0, 0.04)',
    },
    transitions: {
      fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
      base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
      slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: '500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
    borderRadius: {
      sm: '0.375rem',   // 6px
      md: '0.5rem',     // 8px
      lg: '0.75rem',    // 12px
      xl: '1rem',       // 16px
      '2xl': '1.5rem',  // 24px
      full: '9999px',
    }
  },
  
  gradients: {
    primary: 'linear-gradient(135deg, #8b5cf6 0%, #0ea5e9 100%)',
    secondary: 'linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)',
    subtle: 'linear-gradient(135deg, #f5f3ff 0%, #eff6ff 100%)',
    subtileDark: 'linear-gradient(135deg, #1e1b4b 0%, #1e3a8a 100%)',
  }
};

// Utility function to get token value
export const getToken = (path: string): string => {
  const keys = path.split('.');
  let value: any = stripeInspiredTokens;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return '';
    }
  }
  
  return typeof value === 'string' ? value : '';
};

// Export default
export default stripeInspiredTokens;
