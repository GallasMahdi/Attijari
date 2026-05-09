'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Splash duration (ms) ─────────────────────────────────────────────────────
// Keep this in sync with the progress-bar transition duration below (2 000 ms)
// so the bar always finishes filling before the screen dismisses.
const SPLASH_DURATION = 2400

interface SplashScreenProps {
  onComplete?: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    // Block scroll while splash is visible
    document.body.style.overflow = 'hidden'

    const timer = setTimeout(() => {
      setShow(false)
      document.body.style.overflow = 'unset'
      onComplete?.()
    }, SPLASH_DURATION)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = 'unset'
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          // ── Critical layout styles are inlined so the shell renders
          //    even before the Tailwind CSS bundle has arrived. ──────────
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0a0a0f',
            padding: '0 20px',
            overflow: 'hidden',
          }}
        >
          {/* Responsive CSS variables for instant paint before JS/Tailwind */}
          <style>{`
            :root {
              --splash-logo-size: 190px;
              --splash-gap: 4rem;
              --splash-separator-h: 100px;
              --splash-glow-size: 500px;
            }
            @media (max-width: 768px) {
              :root {
                --splash-logo-size: 140px;
                --splash-gap: 2.5rem;
                --splash-separator-h: 80px;
                --splash-glow-size: 400px;
              }
            }
            @media (max-width: 480px) {
              :root {
                --splash-logo-size: 105px;
                --splash-gap: 1.5rem;
                --splash-separator-h: 60px;
                --splash-glow-size: 300px;
              }
            }
          `}</style>
          {/* ── Subtle radial gold glow – deferred so logo renders first ── */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background:
                'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,168,76,0.14) 0%, transparent 70%)',
            }}
          />

          {/* ── Content ──────────────────────────────────────────────────── */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3rem',
              width: '100%',
            }}
          >
            {/* ── Logo ─────────────────────────────────────────────────────
                · Plain <img> (no next/image wrapper) → zero JS overhead
                · fetchpriority="high"  → browser fetches this before
                  anything else in the document
                · decoding="sync"       → painted in the very first frame
                · width/height set explicitly → no layout shift
                · Fade-in starts immediately (delay: 0) ──────────────── */}
            {/* ── Logos ─────────────────────────────────────────────────────
                · Two logos separated by a vertical bar
                · Staggered animations for a cinematic feel
                · fetchpriority="high" and decoding="sync" maintained for performance ── */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--splash-gap)',
                position: 'relative',
                width: '100%',
              }}
            >
              {/* First Logo: Attijari */}
              <motion.div
                initial={{ opacity: 0, x: -25, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'relative' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo1.png"
                  alt="Attijariwafa Bank"
                  width={200}
                  height={200}
                  fetchPriority="high"
                  decoding="sync"
                  style={{
                    width: 'var(--splash-logo-size)',
                    height: 'var(--splash-logo-size)',
                    objectFit: 'contain',
                    display: 'block',
                    filter: 'drop-shadow(0 0 40px rgba(201,168,76,0.4))',
                  }}
                />
              </motion.div>

              {/* Advanced Separator */}
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 0.6 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                style={{
                  width: '1px',
                  height: 'var(--splash-separator-h)',
                  background: 'linear-gradient(to bottom, transparent, #c9a84c, transparent)',
                  transformOrigin: 'center',
                }}
              />

              {/* Second Logo: Wafa */}
              <motion.div
                initial={{ opacity: 0, x: 25, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                style={{ position: 'relative' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/wafa.png"
                  alt="Wafa Assurance"
                  width={200}
                  height={200}
                  fetchPriority="high"
                  decoding="sync"
                  style={{
                    width: 'var(--splash-logo-size)',
                    height: 'var(--splash-logo-size)',
                    objectFit: 'contain',
                    display: 'block',
                    filter: 'drop-shadow(0 0 40px rgba(201,168,76,0.4))',
                  }}
                />
              </motion.div>

              {/* Shared Cinematic Glow */}
              <motion.div
                aria-hidden
                animate={{ 
                  scale: [1, 1.15, 1], 
                  opacity: [0.15, 0.25, 0.15] 
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                }}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 'var(--splash-glow-size)',
                  height: 'var(--splash-glow-size)',
                  background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)',
                  pointerEvents: 'none',
                  zIndex: -1,
                }}
              />
            </div>

            {/* ── Tagline ───────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              style={{ textAlign: 'center' }}
            >
              <p
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '10px',
                  letterSpacing: '0.4em',
                  color: '#c9a84c',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                Attijari Assurance
              </p>
            </motion.div>

            {/* ── Progress bar ──────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              style={{
                width: '180px',
                height: '2px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '9999px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  // Fills in exactly SPLASH_DURATION - exit overlap
                  duration: (SPLASH_DURATION - 600) / 1000,
                  delay: 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  borderRadius: '9999px',
                  background: 'linear-gradient(90deg, #c9a84c, #f0d080, #c9a84c)',
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
