import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        wafa: {
          dark:        '#003d2b',
          green:       '#006633',
          light:       '#7dc242',
          gold:        '#C9A84C',
          'gold-light':'#f5c518',
          cream:       '#f9f5ee',
          'very-dark': '#001a0f',
          overlay:     'rgba(0,61,43,0.85)',
          // Cinematic dark canvas tokens
          navy:        '#050810',
          'navy-mid':  '#0d0f1e',
          'navy-deep': '#08091a',
        },

      },
      fontFamily: {
        playfair:   ['var(--font-playfair)', 'Georgia', 'serif'],
        montserrat: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'fluid-sm':  'clamp(0.875rem, 2vw, 1rem)',
        'fluid-base':'clamp(1rem, 2.5vw, 1.125rem)',
        'fluid-lg':  'clamp(1.125rem, 3vw, 1.5rem)',
        'fluid-xl':  'clamp(1.5rem, 4vw, 2rem)',
        'fluid-2xl': 'clamp(2rem, 5vw, 3rem)',
        'fluid-3xl': 'clamp(2.5rem, 6vw, 4rem)',
        'fluid-hero':'clamp(2.8rem, 8vw, 6rem)',
      },
      spacing: {
        'section': 'clamp(4rem, 8vw, 8rem)',
      },
      backgroundImage: {
        'gradient-wafa':  'linear-gradient(135deg, #003d2b 0%, #006633 50%, #003d2b 100%)',
        'gradient-gold':  'linear-gradient(90deg, #C9A84C 0%, #f5c518 50%, #C9A84C 100%)',
        'gradient-hero':  'linear-gradient(180deg, rgba(5,8,16,0) 0%, rgba(5,8,16,0.5) 60%, rgba(0,61,43,0.95) 100%)',
        'gradient-card':  'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
        'gradient-navy':  'linear-gradient(180deg, #050810 0%, #0d0f1e 100%)',

      },
      boxShadow: {
        'gold-sm':  '0 0 15px rgba(201,168,76,0.3)',
        'gold-md':  '0 0 30px rgba(201,168,76,0.4)',
        'gold-lg':  '0 0 60px rgba(201,168,76,0.5)',
        'green-glow':'0 0 40px rgba(0,102,51,0.5)',
        'glass':    '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
      },
      animation: {
        shimmer:      'shimmer 3s linear infinite',
        float:        'float 4s ease-in-out infinite',
        'float-delay':'float 4s ease-in-out 1s infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'spin-slow':  'spin 12s linear infinite',
        'flip-in':    'flip-in 0.6s cubic-bezier(0.23,1,0.32,1)',
        'draw-line':  'draw-line 1.5s ease-in-out forwards',
        'fade-up':    'fade-up 0.8s ease-out forwards',
        'glow-border':'glow-border 3s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':     { transform: 'translateY(-12px) rotate(1deg)' },
          '66%':     { transform: 'translateY(-6px) rotate(-1deg)' },
        },
        'pulse-gold': {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0.4)' },
          '50%':     { boxShadow: '0 0 0 16px rgba(201,168,76,0)' },
        },
        'flip-in': {
          '0%':   { transform: 'rotateX(90deg)', opacity: '0' },
          '100%': { transform: 'rotateX(0deg)',  opacity: '1' },
        },
        'draw-line': {
          '0%':   { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-border': {
          '0%,100%': { borderColor: 'rgba(201,168,76,0.4)' },
          '50%':     { borderColor: 'rgba(201,168,76,0.9)' },
        },
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
export default config
