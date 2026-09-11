'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

import { PorscheWordmark } from '@/components/ui/PorscheLogo'

// Cinematic Porsche Tachometer Ignition Splash Duration (ms)
const SPLASH_DURATION = 1500

interface SplashScreenProps {
  onComplete?: () => void
}

import { useCallback } from 'react'

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [show, setShow] = useState(true)
  const [revProgress, setRevProgress] = useState(0)

  const handleFinish = useCallback(() => {
    setShow(false)
    document.body.style.overflow = 'unset'
    onComplete?.()
  }, [onComplete])

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    // High-adrenaline tachometer sweep from 0 to 100% in ~1100ms
    const interval = setInterval(() => {
      setRevProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 4
      })
    }, 40)

    const timer = setTimeout(() => {
      handleFinish()
    }, SPLASH_DURATION)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
      document.body.style.overflow = 'unset'
    }
  }, [handleFinish])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="porsche-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#08090C] overflow-hidden select-none"
        >
          {/* Ambient red laser flares */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-600/[0.12] blur-[120px] rounded-full" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />
          </div>

          {/* Carbon weave background overlay */}
          <div className="absolute inset-0 opacity-40 pointer-events-none carbon-pattern" />

          {/* Core Ignition & Co-Branding */}
          <div className="relative z-10 flex flex-col items-center gap-7 px-4 max-w-5xl w-full">
            {/* Top Left Ignition Heritage Indicator */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 px-3.5 py-1 rounded-full border border-red-600/30 bg-red-950/20 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-red-400 font-bold">
                SYSTEM IGNITION · READY
              </span>
            </motion.div>

            {/* 2K EVENTS & PORSCHE Dual Prestige Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-center relative flex flex-col items-center w-full"
            >
              {/* Glowing Red Backlight */}
              <div className="absolute -inset-10 bg-red-600/25 blur-3xl rounded-full pointer-events-none" />

              <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12 w-full">
                {/* 1. 2K Events Logo - Equal Size & Presence */}
                <div className="flex-1 flex items-center justify-center md:justify-end w-full">
                  <Image
                    src="/2k.png"
                    alt="2K Events - Société Organisatrice"
                    width={682}
                    height={266}
                    priority
                    className="w-52 sm:w-64 md:w-72 lg:w-80 xl:w-[360px] h-auto brightness-0 invert opacity-100 drop-shadow-[0_4px_30px_rgba(255,255,255,0.45)] object-contain"
                  />
                </div>

                {/* Prestige Vertical Separation */}
                <div className="hidden md:block h-16 md:h-24 w-px bg-gradient-to-b from-transparent via-red-500/80 to-transparent flex-shrink-0" />
                <div className="md:hidden w-32 h-px bg-gradient-to-r from-transparent via-red-500/80 to-transparent" />

                {/* 2. Official Porsche Brandmark (Official Text Only) - Equal Size & Presence */}
                <div className="flex-1 flex items-center justify-center md:justify-start w-full">
                  <PorscheWordmark className="w-52 sm:w-64 md:w-72 lg:w-80 xl:w-[360px] h-auto text-white drop-shadow-[0_4px_35px_rgba(255,255,255,0.55)]" />
                </div>
              </div>

              {/* High-value Subtitle */}
              <div className="mt-4 sm:mt-5 flex items-center justify-center gap-2 xs:gap-2.5 px-3.5 xs:px-5 py-1.5 sm:py-2 rounded-full border border-red-600/40 bg-black/50 backdrop-blur-md shadow-[0_0_20px_rgba(213,0,28,0.2)] max-w-full">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping flex-shrink-0" />
                <p className="font-outfit text-[9px] xs:text-[11px] sm:text-sm tracking-[0.18em] xs:tracking-[0.28em] sm:tracking-[0.4em] uppercase text-gray-200 font-bold truncate">
                  2K EVENTS PRÉSENTE · PORSCHE NIGHT OF EXCELLENCE
                </p>
              </div>
            </motion.div>

            {/* Telemetry Shift Lights Gantry (F1 / Porsche GT Style) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 sm:gap-3 py-1 px-4 rounded-xl bg-black/60 border border-white/10"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
                const isActive = (revProgress / 100) * 8 >= idx
                const isRedline = idx >= 6
                const isMid = idx >= 3 && idx < 6
                const colorClass = isRedline
                  ? 'bg-red-500 shadow-[0_0_12px_#EF4444]'
                  : isMid
                  ? 'bg-amber-400 shadow-[0_0_10px_#F59E0B]'
                  : 'bg-emerald-400 shadow-[0_0_10px_#10B981]'

                return (
                  <div
                    key={idx}
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-100 ${
                      isActive ? colorClass : 'bg-gray-800/80 border border-white/5'
                    }`}
                  />
                )
              })}
            </motion.div>

            {/* Central Tachometer RPM Display */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="flex items-baseline gap-1.5 font-montserrat">
                <span className="text-2xl sm:text-3xl font-black text-white tracking-wider tabular-nums">
                  {Math.round((revProgress / 100) * 9000).toLocaleString()}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-red-500">
                  RPM
                </span>
              </div>
              <span className="text-[9px] font-mono tracking-[0.25em] text-gray-400 uppercase">
                LAUNCH CONTROL ACTIVE
              </span>
            </motion.div>

            {/* Rapid Horizontal Red Laser Lightbar */}
            <div className="w-full max-w-[280px] h-[3px] rounded-full bg-white/10 overflow-hidden relative">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: (SPLASH_DURATION - 300) / 1000,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full bg-gradient-to-r from-red-600 via-red-400 to-white shadow-[0_0_12px_#DC2626]"
              />
            </div>

            {/* Motto & Direct Ignition Trigger */}
            <div className="flex flex-col items-center gap-3">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.4 }}
                className="font-montserrat text-[9px] tracking-[0.45em] uppercase text-gray-400"
              >
                Driven by Dreams
              </motion.p>

              <button
                type="button"
                onClick={handleFinish}
                className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-red-600 border border-white/15 text-white font-montserrat text-[10px] font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 shadow-lg cursor-pointer"
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
