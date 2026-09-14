// src/components/three/PorscheHeroVisualizer.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Sparkles, Compass, Zap } from 'lucide-react'

const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#08090C]" />,
})

export interface PorscheHeroVisualizerProps {
  isInView: boolean
  isMobile: boolean
  isSharp?: boolean
  onToggleSharp?: () => void
}

type HeroVisualMode = 'e4-domaine' | 'e4-avenue' | '3d-chamber'

export function PorscheHeroVisualizer({
  isInView,
  isMobile,
  isSharp = false,
  onToggleSharp,
}: PorscheHeroVisualizerProps) {
  const [activeMode, setActiveMode] = useState<HeroVisualMode>('e4-avenue')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Subtle luxury 3D tilt tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return
    const { innerWidth, innerHeight } = window
    const x = (e.clientX / innerWidth - 0.5) * 2
    const y = (e.clientY / innerHeight - 0.5) * 2
    setMousePos({ x, y })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 z-0 overflow-hidden select-none bg-[#08090C]"
    >
      {/* ── Visual Backdrop Layers ────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {/* Mode 1: Porsche Cayenne Electric (E4) at Domaine Neferis */}
        {activeMode === 'e4-domaine' && (
          <motion.div
            key="e4-domaine"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{
              opacity: 1,
              scale: isMobile ? 1 : (isSharp ? 1 : 1.03),
              x: isMobile ? 0 : mousePos.x * -8,
              y: isMobile ? 0 : mousePos.y * -5,
            }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src="/porsche-cayenne-e4-hero.webp"
              alt="Porsche Cayenne Electric (E4) — Domaine Neferis"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 100vw"
              style={{
                objectPosition: isMobile ? '38% 38%' : 'center 36%',
                transform: isMobile ? 'scale(1.08)' : undefined,
                filter: isMobile
                  ? 'brightness(1.08) contrast(1.06)'
                  : isSharp
                  ? 'brightness(1.04) contrast(1.03)'
                  : 'brightness(1.08) contrast(1.03) saturate(1.04) blur(3.5px)',
                willChange: 'filter, transform',
              }}
              className="object-cover transform-gpu transition-all duration-700"
            />

            {/* Matrix LED Headlight Glows */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[40%] sm:top-[44%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-44 h-44 sm:w-64 sm:h-64 bg-white/30 blur-2xl rounded-full" />
              <div className="absolute top-[40%] sm:top-[44%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[340px] h-[2px] bg-gradient-to-r from-transparent via-white to-transparent blur-[1px] opacity-75" />
              <div className="absolute top-[42%] sm:top-[46%] left-[48%] -translate-x-1/2 -translate-y-1/2 w-44 h-44 sm:w-64 sm:h-64 bg-white/30 blur-2xl rounded-full" />
              <div className="absolute top-[42%] sm:top-[46%] left-[48%] -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[340px] h-[2px] bg-gradient-to-r from-transparent via-white to-transparent blur-[1px] opacity-75" />
              <div className="absolute bottom-[4%] right-[10%] w-[550px] h-36 bg-[#E0681C]/18 blur-[90px] rounded-full pointer-events-none" />
            </div>
          </motion.div>
        )}

        {/* Mode 2: Domaine Neferis Entrance Avenue & Black Porsche Archway */}
        {activeMode === 'e4-avenue' && (
          <motion.div
            key="e4-avenue"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: isMobile ? 0 : mousePos.x * -8,
              y: isMobile ? 0 : mousePos.y * -5,
            }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src="/domaine-neferis-entrance.webp"
              alt="Domaine Neferis Entrance Avenue — #PorscheSUVExperience"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 100vw"
              style={{
                objectPosition: isMobile ? 'center 20%' : 'center center',
                filter: 'brightness(1.0) contrast(1.03)',
              }}
              className="object-cover transform-gpu will-change-transform transition-all duration-700"
            />
            {/* Illuminated Porsche Gate Glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-[500px] h-16 bg-white/20 blur-2xl rounded-full" />
            </div>
          </motion.div>
        )}

        {/* Mode 3: Real-Time WebGL 3D Speed Chamber Canvas */}
        {activeMode === '3d-chamber' && (
          <motion.div
            key="3d-chamber"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <HeroCanvas isInView={isInView} isMobile={isMobile} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Minimalist Luxury Cinematic Vignette (Car is 100% visible) ─────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(8,9,12,0.45) 0%, transparent 20%, transparent 75%, rgba(8,9,12,0.88) 100%)',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#08090C]/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#08090C] via-[#08090C]/60 to-transparent pointer-events-none" />

      {/* ── Discreet Mode & Focus Switcher Pill (Top Right) ──────────────── */}
      <div className="absolute top-24 sm:top-28 right-2 xs:right-4 sm:right-8 z-30 flex items-center gap-1 sm:gap-1.5 p-1 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-lg max-w-[calc(100vw-1rem)] overflow-x-auto">
        {onToggleSharp && (
          <button
            onClick={onToggleSharp}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-outfit text-[10px] uppercase font-bold tracking-wider transition-all duration-300 ${
              isSharp
                ? 'bg-white text-black shadow-[0_0_12px_rgba(255,255,255,0.6)]'
                : 'text-gray-400 hover:text-white'
            }`}
            title={isSharp ? 'Activer le flou cinématique doux' : 'Afficher en mise au point nette'}
          >
            <span>{isSharp ? 'Mode Net' : 'Focus Doux'}</span>
          </button>
        )}

        <div className="w-px h-3.5 bg-white/15" />

        <button
          onClick={() => setActiveMode('e4-avenue')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-outfit text-[10px] uppercase font-bold tracking-wider transition-all duration-200 ${
            activeMode === 'e4-avenue'
              ? 'bg-[#6D8080] text-white shadow-[0_0_12px_rgba(109,128,128,0.5)]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Compass className="w-3 h-3" />
          <span className="hidden sm:inline">Avenue</span>
        </button>

        <button
          onClick={() => setActiveMode('e4-domaine')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-outfit text-[10px] uppercase font-bold tracking-wider transition-all duration-200 ${
            activeMode === 'e4-domaine'
              ? 'bg-[#E0681C] text-white shadow-[0_0_12px_rgba(224,104,28,0.5)]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3 h-3" />
          <span className="hidden sm:inline">Cour d'Honneur</span>
        </button>

        <button
          onClick={() => setActiveMode('3d-chamber')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-outfit text-[10px] uppercase font-bold tracking-wider transition-all duration-200 ${
            activeMode === '3d-chamber'
              ? 'bg-[#6D8080] text-white shadow-[0_0_12px_rgba(109,128,128,0.5)]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Zap className="w-3 h-3" />
          <span className="hidden sm:inline">3D</span>
        </button>
      </div>
    </div>
  )
}
