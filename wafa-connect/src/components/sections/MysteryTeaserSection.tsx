'use client'
import React, { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Eye, ArrowRight, CheckCircle2 } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { smoothScrollTo } from '@/lib/scroll'

export function MysteryTeaserSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)
  const [isLightsOn, setIsLightsOn] = useState(false)
  const [justToggled, setJustToggled] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return
    const rect = containerRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    const x = ((touch.clientX - rect.left) / rect.width) * 100
    const y = ((touch.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }, [])

  const toggleLights = () => {
    const nextState = !isLightsOn
    setIsLightsOn(nextState)
    setJustToggled(true)
    setTimeout(() => setJustToggled(false), 2000)
  }

  const scrollToConfirm = () => smoothScrollTo('#confirmer', -80, 0.95)

  return (
    <section id="teaser" className="relative py-24 md:py-32 bg-[#050608] overflow-hidden border-t border-white/5">
      {/* Heritage ambient — subtle slate glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#6D8080]/[0.05] blur-[180px] rounded-full pointer-events-none" />
      {/* Future ambient — warm terracotta glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[400px] bg-[#E0681C]/[0.05] blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 carbon-pattern opacity-20 pointer-events-none" />

      <SectionWrapper className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#6D8080]/30 bg-[#6D8080]/10 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(109,128,128,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#E0681C] animate-pulse" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#6D8080]">
              WORLD PREMIERE · CAYENNE E4 ELECTRIC
            </span>
          </div>

          <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-wider mb-2">
            HERITAGE{' '}
            <span className="text-[#6D8080] font-light">×</span>{' '}
            <span className="text-gradient-terracotta">FUTURE</span>
          </h2>
          <p className="font-outfit italic text-lg text-gray-300 mb-3">
            &ldquo;Two worlds. One drive.&rdquo;
          </p>
          <p className="font-sans text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Le Cayenne E4 — le point de rencontre entre l'héritage d'exception et la propulsion électrique haute performance.
            Activez la signature lumineuse pour révéler ses lignes.
          </p>
        </div>

        {/* Master Teaser Display Card */}
        <div className="relative w-full max-w-5xl mx-auto rounded-2xl sm:rounded-[2.5rem] bg-[#07080B] border border-white/15 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] select-none">
          {/* Subtle top hairline */}
          <div className="absolute top-0 left-0 right-0 h-[2px] z-20"
            style={{ background: 'linear-gradient(90deg, transparent, #6D8080 30%, #ffffff 50%, #E0681C 70%, transparent)' }}
          />

          {/* 1. Visual Stage: Full 16:9 Uncropped Cayenne E4 Canvas */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={toggleLights}
            className="relative w-full aspect-[16/9] overflow-hidden cursor-crosshair bg-black"
          >
            {/* 1. Shrouded Cayenne E4 SUV Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/porsche-shrouded.jpg"
                alt="Porsche Cayenne E4 Electric SUV — Silhouette & Dévoilement Mystère"
                fill
                priority
                unoptimized
                sizes="(max-width: 1280px) 100vw, 1280px"
                className={`object-cover object-center transition-all duration-700 ease-out ${isLightsOn ? 'brightness-110 contrast-105 saturate-110' : 'brightness-90 saturate-85'
                  }`}
              />

              {/* Dark luxury vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-transparent to-[#07080B]/50 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/50 via-transparent to-[#07080B]/50 pointer-events-none" />
            </div>

            {/* 2. Interactive Spotlight */}
            <div
              className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
              style={{
                background: isLightsOn
                  ? `radial-gradient(circle 380px at ${mousePos.x}% ${mousePos.y}%, rgba(224,104,28,0.18) 0%, rgba(109,128,128,0.08) 40%, transparent 75%)`
                  : `radial-gradient(circle 280px at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.12) 0%, rgba(109,128,128,0.06) 40%, transparent 75%)`,
                opacity: isHovered || isLightsOn ? 1 : 0.4,
              }}
            />

            {/* 3. Electric Future Lighting Layer (Active when Lights ON) */}
            <div
              className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-700 ease-out ${isLightsOn ? 'opacity-100' : 'opacity-0'
                }`}
            >
              {/* A. Cayenne E4 DRL — 4-Point LED Matrix signature (front headlight) */}
              <div className="absolute top-[46%] left-[13%] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-0.5 sm:gap-1 p-1 sm:p-1.5 rounded-md sm:rounded-lg bg-black/80 backdrop-blur-sm border border-white/40 shadow-[0_0_25px_rgba(255,255,255,0.8)]">
                <div className="flex gap-0.5 sm:gap-1">
                  <span className="w-2 h-1 sm:w-3.5 sm:h-2 rounded-[2px] bg-white shadow-[0_0_10px_#ffffff] animate-pulse" />
                  <span className="w-2 h-1 sm:w-3.5 sm:h-2 rounded-[2px] bg-white shadow-[0_0_10px_#ffffff] animate-pulse" />
                </div>
                <div className="flex gap-0.5 sm:gap-1">
                  <span className="w-2 h-1 sm:w-3.5 sm:h-2 rounded-[2px] bg-white shadow-[0_0_10px_#ffffff]" />
                  <span className="w-2 h-1 sm:w-3.5 sm:h-2 rounded-[2px] bg-white shadow-[0_0_10px_#ffffff]" />
                </div>
                <div className="absolute inset-0 -m-3 rounded-full bg-white/20 blur-lg pointer-events-none" />
              </div>

              {/* B. Electric beam projection forward */}
              <div
                className="absolute top-[42%] left-[-4%] w-[25%] h-[24%] blur-2xl transform -rotate-6 origin-right pointer-events-none"
                style={{ background: 'linear-gradient(to left, rgba(255,255,255,0.3), rgba(224,104,28,0.15), transparent)' }}
              />

              {/* C. Rear continuous Cayenne lightbar in Porsche Terracotta */}
              <div className="absolute top-[43%] left-[84%] w-[7%] sm:w-[8%] h-[3px] sm:h-[4px] rounded-full transform rotate-3"
                style={{ background: '#E0681C', boxShadow: '0 0 25px #E0681C, 0 0 50px rgba(224,104,28,0.7)' }}
              >
                <div className="w-full h-full rounded-full bg-white/90 blur-[1px]" />
              </div>

              {/* D. Ground reflection */}
              <div className="absolute top-[72%] left-[8%] w-[42%] h-[16%] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'rgba(224,104,28,0.14)' }}
              />

              {/* E. Rear ambient flare */}
              <div className="absolute top-[40%] left-[80%] w-[18%] h-[22%] blur-3xl rounded-full pointer-events-none"
                style={{ background: 'rgba(224,104,28,0.18)' }}
              />

              {/* F. Underbody glow */}
              <div className="absolute top-[70%] left-[20%] right-[20%] h-[12%] blur-2xl rounded-full pointer-events-none"
                style={{ background: 'rgba(224,104,28,0.08)' }}
              />
            </div>

            {/* 4. Camera Flash on Activation */}
            <AnimatePresence>
              {justToggled && isLightsOn && (
                <motion.div
                  initial={{ opacity: 0.6 }}

                  animate={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 z-20 pointer-events-none"
                  style={{ background: 'rgba(168,213,226,0.25)' }}
                />
              )}
            </AnimatePresence>

            {/* 5. Floating HUD Badges */}
            <div className="absolute top-2.5 xs:top-4 left-2.5 xs:left-4 flex items-center gap-2 xs:gap-3 z-20 pointer-events-none">
              <div className="flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-lg xs:rounded-xl bg-black/75 border border-white/10 backdrop-blur-md">
                <span className={`w-2 h-2 rounded-full ${isLightsOn ? 'bg-[#E0681C] animate-ping' : 'bg-[#6D8080]'}`} />
                <span className="font-mono text-[8px] xs:text-[10px] tracking-[0.15em] xs:tracking-[0.2em] uppercase text-white font-bold">
                  {isLightsOn ? 'CAYENNE E4 · MATRIX LED ACTIF' : 'HERITAGE × FUTURE'}
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md font-mono text-[10px] text-gray-300">
                <Eye className="w-3.5 h-3.5 text-[#E0681C]" />
                <span>Survolez pour inspecter</span>
              </div>
            </div>

            {/* Tap cue for mobile */}
            <div className="sm:hidden absolute top-2.5 right-2.5 z-20 pointer-events-none">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[8px] font-mono text-gray-300 backdrop-blur-sm">
                <span>{isLightsOn ? 'Toucher pour masquer' : 'Toucher pour éclairer'}</span>
              </div>
            </div>

            {/* Real-time Status Banner when lights are ON (Desktop) */}
            <AnimatePresence>
              {isLightsOn && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 right-4 z-20 hidden md:flex items-center gap-2 px-4 py-1.5 rounded-xl bg-black/80 border border-[#E0681C]/40 backdrop-blur-md shadow-[0_0_20px_rgba(224,104,28,0.25)]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#E0681C]" />
                  <span className="font-outfit text-xs font-bold text-white">
                    Signature DRL Matrix LED Active
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Desktop Floating Control Deck */}
            <div className="hidden sm:flex absolute bottom-4 left-4 right-4 z-20 items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-black/85 backdrop-blur-2xl border border-white/15 shadow-2xl">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); toggleLights(); }}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-outfit text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg ${isLightsOn
                      ? 'bg-[#E0681C]/20 border border-[#E0681C] text-white shadow-[0_0_20px_rgba(224,104,28,0.3)]'
                      : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:border-[#E0681C]/50'
                    }`}
                >
                  <Zap
                    className={`w-4 h-4 transition-transform duration-300 ${isLightsOn ? 'rotate-12 text-[#E0681C]' : 'text-gray-300'}`}
                  />
                  <span>
                    {isLightsOn ? 'Masquer la Signature Lumineuse' : 'Révéler la Signature LED'}
                  </span>
                </button>

                <span className="hidden lg:inline-block font-sans text-[11px] text-[#6D8080] pl-2">
                  {isLightsOn
                    ? '• Signature 4 points Matrix LED Porsche Cayenne E4'
                    : '• Cliquez ou déplacez le curseur pour explorer la silhouette'}
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); scrollToConfirm(); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-outfit font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] cursor-pointer ml-auto bg-[#E0681C] hover:bg-[#ff7a26] shadow-[0_0_25px_rgba(224,104,28,0.35)]"
              >
                <span>RSVP · Sécuriser Ma Place</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Dedicated Mobile Control Deck */}
          <div className="sm:hidden p-3 bg-[#0A0C10] border-t border-white/10 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={toggleLights}
              className={`w-full flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-outfit text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md ${isLightsOn
                  ? 'bg-[#E0681C]/20 border border-[#E0681C] text-white'
                  : 'bg-white/10 border border-white/20 text-white'
                }`}
            >
              <Zap className={`w-3.5 h-3.5 ${isLightsOn ? 'text-[#E0681C]' : 'text-gray-300'}`} />
              <span>{isLightsOn ? 'Masquer Signature LED' : 'Révéler Signature LED'}</span>
            </button>

            <button
              type="button"
              onClick={scrollToConfirm}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-outfit font-bold text-xs uppercase tracking-wider shadow-lg cursor-pointer bg-[#E0681C] hover:bg-[#ff7a26]"
            >
              <span>RSVP · Sécuriser Ma Place</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </SectionWrapper>
    </section>
  )
}
