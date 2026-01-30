// Stripe-inspired Animation Variants for Framer Motion
// Animaciones sofisticadas y fluidas

import { Variants } from 'framer-motion';

// Fade in desde abajo
export const fadeInUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0]  // Curva Stripe
    }
  }
};

// Fade in desde arriba
export const fadeInDownVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: -40,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

// Fade in desde la izquierda
export const fadeInLeftVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -40,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

// Fade in desde la derecha
export const fadeInRightVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: 40,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

// Stagger container para elementos hijos
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Scale on hover
export const scaleOnHover: Variants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { 
      duration: 0.3,
      ease: 'easeOut' 
    }
  }
};

// Scale up (para cards)
export const scaleUpVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.95 
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

// Slide in from bottom (para modales, sticky bars)
export const slideInUpVariants: Variants = {
  hidden: { 
    y: '100%',
    opacity: 0 
  },
  visible: { 
    y: 0,
    opacity: 1,
    transition: { 
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: { 
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

// Fade with backdrop blur (para mega menú, overlays)
export const fadeWithBlurVariants: Variants = {
  hidden: { 
    opacity: 0,
  },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    transition: { 
      duration: 0.2,
      ease: 'easeIn'
    }
  }
};

// Rotate and scale (para iconos interactivos)
export const rotateScaleVariants: Variants = {
  rest: { 
    scale: 1,
    rotate: 0 
  },
  hover: { 
    scale: 1.1,
    rotate: 5,
    transition: { 
      duration: 0.3,
      ease: 'easeOut' 
    }
  }
};

// Shimmer effect (para CTAs)
export const shimmerVariants: Variants = {
  initial: {
    backgroundPosition: '-100%'
  },
  animate: {
    backgroundPosition: '200%',
    transition: {
      duration: 2,
      ease: 'linear',
      repeat: Infinity
    }
  }
};

// Pulse effect (para badges, notificaciones)
export const pulseVariants: Variants = {
  rest: { 
    scale: 1,
    opacity: 1
  },
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity
    }
  }
};

// Configuraciones de viewport para animaciones en scroll
export const viewportConfig = {
  once: true,  // Animar solo una vez
  amount: 0.2,  // Trigger cuando 20% es visible
  margin: '0px 0px -100px 0px'  // Trigger antes de que sea completamente visible
};

// Transition presets
export const transitions = {
  fast: {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1]
  },
  base: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1]
  },
  slow: {
    duration: 0.5,
    ease: [0.4, 0, 0.2, 1]
  },
  bounce: {
    duration: 0.5,
    ease: [0.68, -0.55, 0.265, 1.55]
  },
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30
  }
};

// Export all
export default {
  fadeInUpVariants,
  fadeInDownVariants,
  fadeInLeftVariants,
  fadeInRightVariants,
  staggerContainer,
  scaleOnHover,
  scaleUpVariants,
  slideInUpVariants,
  fadeWithBlurVariants,
  rotateScaleVariants,
  shimmerVariants,
  pulseVariants,
  viewportConfig,
  transitions
};
