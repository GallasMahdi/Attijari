// src/lib/animations.ts
import { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] }
  },
}

// ─── Cinematic / Premium variants ────────────────────────────────────────────

/** Hero title: blur-to-focus + rise. Cinematic, executive. */
export const cinematicFadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: 'blur(12px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/** Eyebrow / label: letterSpacing expands during reveal */
export const cinematicEyebrow: Variants = {
  hidden: {
    opacity: 0,
    letterSpacing: '0.6em',
    y: 20,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    letterSpacing: '0.3em',
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/** Subtitle: clean fade, slightly slower */
export const cinematicFadeIn: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.4,
      ease: [0.25, 1, 0.35, 1],
    },
  },
}

/** CTA group: rises from below with light blur */
export const cinematicRise: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/** Divider line — scaleX reveal */
export const cinematicLine: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/** Premium stagger container — slow, deliberate pacing */
export const cinematicContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.28,
      delayChildren: 0.6,
    },
  },
}

/** Scroll indicator — delayed reveal */
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 3.2, duration: 1.2, ease: 'easeOut' },
  },
}

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
}

export const slideFromLeft: Variants = {
  hidden:  { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] }
  },
}

export const slideFromRight: Variants = {
  hidden:  { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] }
  },
}

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: { 
    opacity: 1, scale: 1,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
  },
}

export const staggerContainer: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  },
}


export const staggerContainerFast: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    }
  },
}

export const flipCard: Variants = {
  hidden:  { rotateX: 90, opacity: 0 },
  visible: {
    rotateX: 0, opacity: 1,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] }
  },
  exit:    { rotateX: -90, opacity: 0,
    transition: { duration: 0.3 }
  },
}

export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(201,168,76,0.3)',
      '0 0 40px rgba(201,168,76,0.6)',
      '0 0 20px rgba(201,168,76,0.3)',
    ],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
  }
}

export const hoverScale = {
  whileHover: { scale: 1.03, transition: { duration: 0.2 } },
  whileTap:   { scale: 0.97 },
}
