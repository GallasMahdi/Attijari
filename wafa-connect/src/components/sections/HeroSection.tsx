// src/components/sections/HeroSection.tsx
'use client'
import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { EVENT } from '@/lib/constants'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { ArrowRight, QrCode, MapPin, ChevronDown } from 'lucide-react'
import { PorscheHeroVisualizer } from '@/components/three/PorscheHeroVisualizer'
import { smoothScrollTo } from '@/lib/scroll'
import { InvitationUnboxingModal } from '@/components/ui/InvitationUnboxingModal'
import { PorscheWordmark } from '@/components/ui/PorscheLogo'

interface HeroSectionProps {
  startAnimation?: boolean
}

export function HeroSection({ startAnimation = true }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { margin: '-10%', once: true })
  const [unboxingOpen, setUnboxingOpen] = useState(false)
  const [isSharp, setIsSharp] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const scrollToConfirm = () => smoothScrollTo('#confirmer', -70, 0.95)
  const scrollToNext = () => smoothScrollTo('#flotte', -70, 0.95)

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col justify-between items-center bg-[#08090C] pt-28 sm:pt-32 pb-10 sm:pb-12"
      >
        {/* ── Dynamic Porsche Cayenne E4 Hero Visualizer (Soft Cinematic Blur & Luminous) ── */}
        <PorscheHeroVisualizer
          isInView={isInView}
          isMobile={isMobile}
          isSharp={isSharp}
          onToggleSharp={() => setIsSharp((prev) => !prev)}
        />

        {/* ── Minimalist Luxury Headline (Floating in Upper-Center Stage) ── */}
        <SectionWrapper className="container relative z-10 mx-auto px-4 sm:px-8 my-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView && startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            {/* 01. Refined Luxury Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 xs:gap-2.5 px-3 xs:px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 mb-3 sm:mb-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)] max-w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E0681C] animate-pulse flex-shrink-0" />
              <span className="font-outfit text-[9px] xs:text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] xs:tracking-[0.28em] sm:tracking-[0.35em] text-[#C4A882] truncate">
                THE FULLY ELECTRIC · E4 ERA
              </span>
              <span className="w-1 h-1 rounded-full bg-white/30 hidden xs:inline-block flex-shrink-0" />
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-300 hidden xs:inline-block truncate">
                DOMAINE NEFERIS
              </span>
            </div>

            {/* 02. Official Porsche Wordmark & Iconic Model Headline */}
            <PorscheWordmark className="h-3.5 xs:h-4 sm:h-5 md:h-6 w-auto text-white/90 mb-2 sm:mb-4 drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)] max-w-[85vw]" />
            <h1 className="font-outfit font-black text-[clamp(2.5rem,10.5vw,9.5rem)] tracking-[0.1em] xs:tracking-[0.14em] sm:tracking-[0.16em] text-white uppercase leading-none drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)] select-none">
              CAYENNE
            </h1>

            {/* 03. Poetic Tagline from Slide 1 */}
            <p className="font-outfit font-light text-sm xs:text-base sm:text-xl text-gray-100 tracking-wide mt-2 sm:mt-3 mb-6 sm:mb-7 drop-shadow-md">
              Heritage × Future <span className="text-[#E0681C] font-normal mx-1.5 sm:mx-2">·</span> Two worlds. One drive.
            </p>

            {/* 04. Minimalist Luxury CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full px-2">
              {/* Primary: Clean RSVP Button */}
              <button
                onClick={scrollToConfirm}
                className="group relative px-6 xs:px-8 py-3.5 sm:px-9 sm:py-4 rounded-full font-outfit font-black text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white bg-black/80 hover:bg-[#E0681C] border border-white/20 hover:border-[#E0681C] backdrop-blur-xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:shadow-[0_0_35px_rgba(224, 104, 28,0.6)] flex items-center justify-center gap-2.5 sm:gap-3 cursor-pointer w-full sm:w-auto"
              >
                <span>Sécuriser Ma Place · RSVP</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary: QR Invitation Preview */}
              <button
                onClick={() => setUnboxingOpen(true)}
                className="px-5 xs:px-6 py-3.5 sm:py-4 rounded-full font-outfit font-bold text-xs uppercase tracking-wider text-gray-200 hover:text-white bg-black/40 hover:bg-white/10 border border-white/15 hover:border-white/30 backdrop-blur-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.4)] w-full sm:w-auto"
              >
                <QrCode className="w-4 h-4 text-[#E0681C]" />
                <span>Mon Invitation QR</span>
              </button>
            </div>
          </motion.div>
        </SectionWrapper>

        {/* ── Single-Line Quiet Luxury Telemetry Dock (Floating at Bottom) ── */}
        <div className="relative z-10 w-full px-4 sm:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView && startAnimation ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 py-3 rounded-2xl sm:rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-gray-300 font-mono text-[10px] sm:text-xs tracking-wider shadow-2xl"
          >
            <div className="grid grid-cols-2 xs:grid-cols-4 md:flex items-center gap-2.5 sm:gap-6 text-center md:text-left w-full md:w-auto">
              <div className="p-1 rounded bg-white/[0.03] md:bg-transparent">
                <strong className="text-white font-outfit font-black text-xs sm:text-sm block sm:inline">517 CH</strong>{' '}
                <span className="text-[9px] sm:text-xs text-gray-400">(380 kW)</span>
              </div>
              <span className="text-white/20 hidden md:inline">•</span>
              <div className="p-1 rounded bg-white/[0.03] md:bg-transparent">
                <strong className="text-white font-outfit font-black text-xs sm:text-sm block sm:inline">830 Nm</strong>{' '}
                <span className="text-[9px] sm:text-xs text-gray-400">Immédiat</span>
              </div>
              <span className="text-white/20 hidden md:inline">•</span>
              <div className="p-1 rounded bg-white/[0.03] md:bg-transparent">
                <strong className="text-white font-outfit font-black text-xs sm:text-sm block sm:inline">4.0 s</strong>{' '}
                <span className="text-[9px] sm:text-xs text-gray-400">0—100</span>
              </div>
              <span className="text-white/20 hidden md:inline">•</span>
              <div className="p-1 rounded bg-white/[0.03] md:bg-transparent">
                <strong className="text-white font-outfit font-black text-xs sm:text-sm block sm:inline">21 min</strong>{' '}
                <span className="text-[9px] sm:text-xs text-gray-400">800V 270kW</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-400 text-[10px] sm:text-xs">
              <MapPin size={12} className="text-[#E0681C] flex-shrink-0" />
              <span className="truncate">{EVENT.dateLabel} · {EVENT.venue}</span>
            </div>
          </motion.div>

          {/* Centered Luxury Scroll Navigation Pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView && startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center mt-3 sm:mt-4"
          >
            <button
              onClick={scrollToNext}
              className="group flex items-center gap-2.5 px-5 py-2 rounded-full bg-black/50 hover:bg-black/80 border border-white/15 hover:border-[#E0681C]/60 backdrop-blur-xl transition-all duration-300 shadow-[0_6px_20px_rgba(0,0,0,0.6)] cursor-pointer"
              aria-label="Défiler vers la collection Cayenne E4"
              title="Défiler vers la collection Cayenne E4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E0681C] animate-ping" />
              <span className="font-outfit text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.28em] text-gray-300 group-hover:text-white transition-colors">
                Explorer l'Expérience & Flotte E4
              </span>
              <ChevronDown size={14} className="text-[#E0681C] animate-bounce group-hover:translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Unboxing Presentation Modal */}
      <InvitationUnboxingModal
        isOpen={unboxingOpen}
        onClose={() => setUnboxingOpen(false)}
        onRSVPClick={scrollToConfirm}
      />
    </>
  )
}