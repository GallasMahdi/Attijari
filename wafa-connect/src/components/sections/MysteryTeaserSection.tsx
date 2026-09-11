'use client'
import React, { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Eye, ArrowRight, CheckCircle2, Radio } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { smoothScrollTo } from '@/lib/scroll'

// Electric motor sound synthesizer using Web Audio API
function playElectricSound(type: 'activate' | 'whir') {
  if (typeof window === 'undefined') return
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()

    if (type === 'activate') {
      // Electric capacitor charge — futuristic activation tone
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(200, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.2)
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.4)

      gain.gain.setValueAtTime(0.01, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.08)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.65)
    } else {
      // Electric motor whir — Cayenne E4 silent launch
      const osc1 = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      osc1.type = 'sine'
      osc2.type = 'sine'
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(800, ctx.currentTime)
      filter.Q.setValueAtTime(5, ctx.currentTime)

      osc1.frequency.setValueAtTime(120, ctx.currentTime)
      osc1.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.8)
      osc1.frequency.linearRampToValueAtTime(420, ctx.currentTime + 1.4)

      osc2.frequency.setValueAtTime(130, ctx.currentTime)
      osc2.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.8)

      gain.gain.setValueAtTime(0.04, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.4)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.6)

      osc1.connect(filter)
      osc2.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      osc1.start(ctx.currentTime)
      osc2.start(ctx.currentTime)
      osc1.stop(ctx.currentTime + 1.8)
      osc2.stop(ctx.currentTime + 1.8)
    }
  } catch {
    // Audio context may be blocked by browser policy until user gesture
  }
}

export function MysteryTeaserSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)
  const [isLightsOn, setIsLightsOn] = useState(false)
  const [justToggled, setJustToggled] = useState(false)
  const [soundPlaying, setSoundPlaying] = useState(false)

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
    playElectricSound('activate')
    setTimeout(() => setJustToggled(false), 2000)
  }

  const triggerElectricSound = () => {
    setSoundPlaying(true)
    playElectricSound('whir')
    setTimeout(() => setSoundPlaying(false), 2400)
  }

  const scrollToConfirm = () => smoothScrollTo('#confirmer', -80, 0.95)

  return (
    <section className="relative py-24 md:py-32 bg-[#050608] overflow-hidden border-t border-white/5">
      {/* Heritage ambient — warm stone glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#8B7355]/[0.06] blur-[200px] rounded-full pointer-events-none" />
      {/* Future ambient — electric teal glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[400px] bg-[#00B4C6]/[0.06] blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 carbon-pattern opacity-20 pointer-events-none" />

      <SectionWrapper className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#00B4C6]/30 bg-[#00B4C6]/10 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(0,180,198,0.15)]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00B4C6] animate-pulse" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#A8D5E2]">
              E4 WORLD PREMIERE · CAYENNE ELECTRIC
            </span>
          </div>

          <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-wider mb-2">
            HERITAGE{' '}
            <span className="text-gradient-heritage">×</span>{' '}
            <span className="text-gradient-electric">FUTURE</span>
          </h2>
          <p className="font-outfit italic text-lg text-gray-300 mb-3">
            "Two worlds. One drive."
          </p>
          <p className="font-sans text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto">
            The Cayenne E4 — the connection point between the past and the electric future.
            Move your cursor to inspect the silhouette, or activate the electric signature to reveal the light.
          </p>
        </div>

        {/* Master Teaser Display Card */}
        <div className="relative w-full max-w-5xl mx-auto rounded-2xl sm:rounded-[2.5rem] bg-[#07080B] border border-white/15 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] select-none">
          {/* Heritage × Future dual horizon lines */}
          <div className="absolute top-0 left-0 right-0 h-[2px] z-20"
            style={{ background: 'linear-gradient(90deg, transparent, #8B7355 30%, #ffffff 50%, #00B4C6 70%, transparent)' }}
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
                className={`object-cover object-center transition-all duration-700 ease-out ${
                  isLightsOn ? 'brightness-110 contrast-105 saturate-110' : 'brightness-90 saturate-85'
                }`}
              />

              {/* Heritage warm vignette (left side) */}
              <div className={`absolute inset-0 transition-opacity duration-700 ${isLightsOn ? 'opacity-0' : 'opacity-100'}`}
                style={{ background: 'linear-gradient(to right, rgba(44,35,24,0.5) 0%, transparent 45%, rgba(8,9,12,0.4) 100%)' }}
              />
              {/* Dark standard vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-transparent to-[#07080B]/50 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/50 via-transparent to-[#07080B]/50 pointer-events-none" />
            </div>

            {/* 2. Interactive Spotlight */}
            <div
              className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
              style={{
                background: isLightsOn
                  ? `radial-gradient(circle 380px at ${mousePos.x}% ${mousePos.y}%, rgba(168,213,226,0.20) 0%, rgba(0,180,198,0.10) 40%, transparent 75%)`
                  : `radial-gradient(circle 280px at ${mousePos.x}% ${mousePos.y}%, rgba(196,168,130,0.18) 0%, rgba(139,115,85,0.08) 40%, transparent 75%)`,
                opacity: isHovered || isLightsOn ? 1 : 0.4,
              }}
            />

            {/* 3. Electric Future Lighting Layer (Active when Lights ON) */}
            <div
              className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-700 ease-out ${
                isLightsOn ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* A. Cayenne E4 DRL — 4-Point LED Matrix signature (front headlight) */}
              <div className="absolute top-[46%] left-[13%] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-0.5 sm:gap-1 p-1 sm:p-1.5 rounded-md sm:rounded-lg bg-[#001a1d]/70 backdrop-blur-sm border border-[#00B4C6]/50 shadow-[0_0_35px_rgba(0,180,198,0.95)]">
                <div className="flex gap-0.5 sm:gap-1">
                  <span className="w-2 h-1 sm:w-3.5 sm:h-2 rounded-[2px] bg-[#A8D5E2] shadow-[0_0_12px_#00E5FF] animate-pulse" />
                  <span className="w-2 h-1 sm:w-3.5 sm:h-2 rounded-[2px] bg-[#A8D5E2] shadow-[0_0_12px_#00E5FF] animate-pulse" />
                </div>
                <div className="flex gap-0.5 sm:gap-1">
                  <span className="w-2 h-1 sm:w-3.5 sm:h-2 rounded-[2px] bg-white shadow-[0_0_12px_#00E5FF]" />
                  <span className="w-2 h-1 sm:w-3.5 sm:h-2 rounded-[2px] bg-white shadow-[0_0_12px_#00E5FF]" />
                </div>
                <div className="absolute inset-0 -m-3 rounded-full bg-[#00B4C6]/30 blur-lg pointer-events-none" />
              </div>

              {/* B. Electric beam projection forward */}
              <div
                className="absolute top-[42%] left-[-4%] w-[25%] h-[24%] blur-2xl transform -rotate-6 origin-right pointer-events-none"
                style={{ background: 'linear-gradient(to left, rgba(168,213,226,0.4), rgba(0,180,198,0.18), transparent)' }}
              />

              {/* C. Rear continuous Cayenne lightbar */}
              <div className="absolute top-[43%] left-[84%] w-[7%] sm:w-[8%] h-[3px] sm:h-[4px] rounded-full transform rotate-3"
                style={{ background: '#00B4C6', boxShadow: '0 0 30px #00B4C6, 0 0 60px rgba(0,180,198,0.85)' }}
              >
                <div className="w-full h-full rounded-full bg-white/80 blur-[1px]" />
              </div>

              {/* D. Ground electric reflection */}
              <div className="absolute top-[72%] left-[8%] w-[42%] h-[16%] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'rgba(0,180,198,0.18)' }}
              />

              {/* E. Rear ambient teal flare */}
              <div className="absolute top-[40%] left-[80%] w-[18%] h-[22%] blur-3xl rounded-full pointer-events-none"
                style={{ background: 'rgba(0,180,198,0.2)' }}
              />

              {/* F. Underbody electric glow */}
              <div className="absolute top-[70%] left-[20%] right-[20%] h-[12%] blur-2xl rounded-full pointer-events-none"
                style={{ background: 'rgba(0,180,198,0.12)' }}
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
                <span className={`w-2 h-2 rounded-full ${isLightsOn ? 'bg-[#00B4C6] animate-ping' : 'bg-[#8B7355]'}`} />
                <span className="font-mono text-[8px] xs:text-[10px] tracking-[0.15em] xs:tracking-[0.2em] uppercase text-white font-bold">
                  {isLightsOn ? 'E4 ELECTRIC · DRL ACTIF' : 'HERITAGE × FUTURE'}
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md font-mono text-[10px] text-gray-300">
                <Eye className="w-3.5 h-3.5 text-[#00B4C6]" />
                <span>Survolez pour inspecter</span>
              </div>
            </div>

            {/* Tap cue for mobile */}
            <div className="sm:hidden absolute top-2.5 right-2.5 z-20 pointer-events-none">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[8px] font-mono text-gray-300 backdrop-blur-sm">
                <span>{isLightsOn ? 'Toucher pour éteindre' : 'Toucher pour éclairer'}</span>
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
                  className="absolute top-4 right-4 z-20 hidden md:flex items-center gap-2 px-4 py-1.5 rounded-xl bg-[#001a20]/80 border border-[#00B4C6]/40 backdrop-blur-md shadow-[0_0_20px_rgba(0,180,198,0.25)]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#A8D5E2]" />
                  <span className="font-outfit text-xs font-bold text-[#A8D5E2]">
                    Signature DRL Cayenne E4 Active
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Electric Motor Sound Wave Overlay */}
            <AnimatePresence>
              {soundPlaying && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute bottom-4 sm:bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#001a20]/90 border border-[#00B4C6]/60 backdrop-blur-xl shadow-[0_0_30px_rgba(0,180,198,0.5)] pointer-events-none"
                >
                  <div className="flex items-center gap-1 h-3 sm:h-3.5">
                    {[3, 10, 6, 16, 10, 14, 5].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [3, h, 3] }}
                        transition={{ duration: 0.3, repeat: Infinity, delay: i * 0.06 }}
                        className="w-1 rounded-full"
                        style={{ background: '#00B4C6' }}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[8px] sm:text-[10px] font-bold text-[#A8D5E2] uppercase tracking-widest ml-1.5 sm:ml-2">
                    MOTEUR ÉLECTRIQUE E4 ACTIF
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
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-outfit text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg ${
                    isLightsOn
                      ? 'border text-white'
                      : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:border-[#00B4C6]/50'
                  }`}
                  style={isLightsOn ? {
                    background: 'rgba(0,90,105,0.4)',
                    border: '1px solid #00B4C6',
                    boxShadow: '0 0 20px rgba(0,180,198,0.4)',
                  } : {}}
                >
                  <Zap
                    className={`w-4 h-4 transition-transform duration-300 ${isLightsOn ? 'rotate-12' : ''}`}
                    style={{ color: isLightsOn ? '#A8D5E2' : '#00B4C6' }}
                  />
                  <span>
                    {isLightsOn ? 'Éteindre la Signature E4' : 'Activer la Signature Électrique'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); triggerElectricSound(); }}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-gray-200 hover:text-white font-sans text-xs font-medium transition-all duration-200 cursor-pointer"
                  title="Écouter le moteur électrique Cayenne E4"
                >
                  <Radio className="w-3.5 h-3.5" style={{ color: '#00B4C6' }} />
                  <span>Son Électrique</span>
                </button>

                <span className="hidden lg:inline-block font-sans text-[11px] text-gray-400 pl-2">
                  {isLightsOn
                    ? '• La signature DRL Cayenne E4 traverse le voile'
                    : '• Cliquez pour activer les feux électriques'}
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); scrollToConfirm(); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-outfit font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] cursor-pointer ml-auto"
                style={{
                  background: 'linear-gradient(135deg, #E0681C 0%, #6D8080 100%)',
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 25px rgba(224, 104, 28,0.6)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
              >
                <span>RSVP · Sécuriser Ma Place</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Dedicated Mobile Control Deck (Sits directly underneath the photo stage, never covering the car) */}
          <div className="sm:hidden p-3 bg-[#0A0C10] border-t border-white/10 flex flex-col gap-2.5">
            <div className="flex items-center gap-2 w-full">
              <button
                type="button"
                onClick={toggleLights}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-outfit text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md ${
                  isLightsOn
                    ? 'border text-white'
                    : 'bg-white/10 border border-white/20 text-white'
                }`}
                style={isLightsOn ? {
                  background: 'rgba(0,90,105,0.45)',
                  border: '1px solid #00B4C6',
                  boxShadow: '0 0 15px rgba(0,180,198,0.35)',
                } : {}}
              >
                <Zap
                  className={`w-3.5 h-3.5 ${isLightsOn ? 'rotate-12' : ''}`}
                  style={{ color: isLightsOn ? '#A8D5E2' : '#00B4C6' }}
                />
                <span className="truncate">
                  {isLightsOn ? 'Éteindre Feux E4' : 'Activer Signature E4'}
                </span>
              </button>

              <button
                type="button"
                onClick={triggerElectricSound}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 font-sans text-xs font-medium cursor-pointer"
                title="Écouter le son électrique"
              >
                <Radio className="w-3.5 h-3.5" style={{ color: '#00B4C6' }} />
                <span>Son</span>
              </button>
            </div>

            <button
              type="button"
              onClick={scrollToConfirm}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-outfit font-bold text-xs uppercase tracking-wider shadow-lg cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #E0681C 0%, #6D8080 100%)',
              }}
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
