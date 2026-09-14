// src/components/ui/SplashScreen.tsx
'use client'
import { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { PorscheWordmark } from '@/components/ui/PorscheLogo'

interface SplashScreenProps {
  onComplete?: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [show, setShow] = useState(true)
  const [revProgress, setRevProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const isFinishedRef = useRef(false)

  const handleFinish = useCallback(() => {
    if (isFinishedRef.current) return
    isFinishedRef.current = true
    try {
      sessionStorage.setItem('porsche_splash_seen', '1')
    } catch {}
    setShow(false)
    onComplete?.()
  }, [onComplete])

  useEffect(() => {
    // Detect mobile for faster timing
    const mobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window)
    setIsMobile(mobile)

    // Mobile duration 1200ms; desktop duration 2400ms for luxury ignition
    const duration = mobile ? 1200 : 2400
    const sweepDuration = mobile ? 1000 : 2000
    const startTime = performance.now()

    let reqId: number
    let lastUpdate = 0

    const animateSweep = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const t = Math.min(1, elapsed / sweepDuration)
      const eased = t * t * t * (t * (t * 6 - 15) + 10)
      const progress = Math.min(100, Math.round(eased * 100))

      // Throttle React state updates to ~30-40ms intervals to eliminate main-thread lockup
      if (currentTime - lastUpdate > 35 || progress === 100) {
        setRevProgress(progress)
        lastUpdate = currentTime
      }

      if (elapsed < duration && !isFinishedRef.current) {
        reqId = requestAnimationFrame(animateSweep)
      } else {
        handleFinish()
      }
    }

    reqId = requestAnimationFrame(animateSweep)

    return () => {
      cancelAnimationFrame(reqId)
    }
  }, [handleFinish])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="porsche-splash"
          initial={{ opacity: 1 }}
          // Silky smooth GPU opacity fade
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleFinish}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#08090C] overflow-hidden select-none cursor-pointer"
        >
          {/* Ambient subtle Terracotta flare */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'w-[320px] h-[160px] blur-2xl' : 'w-[600px] h-[280px] blur-[100px]'} rounded-full bg-[#E0681C]/[0.08]`} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Core Ignition & Co-Branding */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-4 max-w-4xl w-full">
            {/* Top Prestige Pill */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/[0.03]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E0681C] animate-pulse" />
              <span className="font-outfit text-[9px] tracking-[0.3em] uppercase text-[#6D8080] font-bold">
                PORSCHE CAYENNE E4 · WORLD PREMIERE
              </span>
            </motion.div>

            {/* 2K EVENTS & PORSCHE Dual Prestige Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center relative flex flex-col items-center w-full"
            >
              <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12 w-full py-4">
                {/* 1. 2K Events Logo */}
                <div className="flex-1 flex items-center justify-center md:justify-end w-full">
                  <Image
                    src="/2k.png"
                    alt="2K Events - Société Organisatrice"
                    width={682}
                    height={266}
                    priority
                    className="w-48 sm:w-56 md:w-64 h-auto brightness-0 invert opacity-100 drop-shadow-[0_4px_25px_rgba(255,255,255,0.3)] object-contain"
                  />
                </div>

                {/* Prestige Vertical Separation */}
                <div className="hidden md:block h-12 md:h-16 w-px bg-gradient-to-b from-transparent via-white/25 to-transparent flex-shrink-0" />
                <div className="md:hidden w-24 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                {/* 2. Official Porsche Brandmark */}
                <div className="flex-1 flex items-center justify-center md:justify-start w-full">
                  <PorscheWordmark className="w-48 sm:w-56 md:w-64 h-auto text-white drop-shadow-[0_4px_25px_rgba(255,255,255,0.35)]" />
                </div>
              </div>

              {/* Subtitle */}
              <div className="mt-3 flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E0681C] flex-shrink-0" />
                <p className="font-outfit text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.35em] uppercase text-gray-300 font-bold">
                  2K EVENTS PRÉSENTE · PORSCHE NIGHT OF EXCELLENCE
                </p>
              </div>
            </motion.div>

            {/* Telemetry Shift Lights Gantry (Porsche Performance Style) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 sm:gap-2.5 py-1 px-3.5 rounded-full bg-black/60 border border-white/10 shadow-lg"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
                const isActive = (revProgress / 100) * 8 >= idx
                const isPeak = idx >= 6

                return (
                  <div
                    key={idx}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-100 ${
                      isActive
                        ? isPeak
                          ? 'bg-white shadow-[0_0_10px_#ffffff]'
                          : 'bg-[#E0681C] shadow-[0_0_10px_#E0681C]'
                        : 'bg-white/10 border border-white/5'
                    }`}
                  />
                )
              })}
            </motion.div>

            {/* Central Tachometer RPM / Power Counter Display */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-col items-center gap-0.5"
            >
              <div className="flex items-baseline gap-2 font-montserrat">
                <span className="font-outfit text-3xl sm:text-4xl font-black text-white tracking-wider tabular-nums">
                  {Math.round((revProgress / 100) * 8500).toLocaleString('fr-FR')}
                </span>
                <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#E0681C]">
                  RPM
                </span>
              </div>
              <span className="text-[9px] font-mono tracking-[0.3em] text-[#6D8080] uppercase font-semibold">
                {revProgress >= 95 ? 'POWER READY · 800V ACTIVE' : 'CAYENNE E4 · LAUNCH ACTIVATION'}
              </span>
            </motion.div>

            {/* Precision Laser Lightbar */}
            <div className="w-full max-w-[280px] sm:max-w-xs flex flex-col gap-2">
              <div className="w-full h-[3px] rounded-full bg-white/10 overflow-hidden relative">
                <div
                  style={{ width: `${revProgress}%` }}
                  className="h-full bg-gradient-to-r from-[#E0681C]/70 via-[#E0681C] to-white shadow-[0_0_10px_#E0681C]"
                />
              </div>

              <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-[#6D8080] uppercase">
                <span>Domaine Neferis</span>
                <span className="text-white font-bold">{revProgress}%</span>
              </div>
            </div>

            {/* Motto & Direct Ignition Skip Trigger */}
            <div className="flex flex-col items-center gap-3 mt-1">
              <p className="font-outfit text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-[#6D8080] font-semibold">
                Driven by Dreams
              </p>

              <button
                type="button"
                onClick={handleFinish}
                className="px-4 py-1.5 rounded-full bg-white/[0.04] hover:bg-[#E0681C] border border-white/15 hover:border-[#E0681C] text-gray-300 hover:text-white font-outfit text-[10px] font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
              >
                Passer l'Ignition &rarr;
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
