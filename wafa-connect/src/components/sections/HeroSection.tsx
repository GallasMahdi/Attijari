'use client'
import React, { useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useInView } from 'framer-motion'
import { EVENT } from '@/lib/constants'
import {
  cinematicContainer,
  cinematicFadeUp,
  cinematicEyebrow,
  cinematicFadeIn,
  cinematicRise,
  cinematicLine,
  scrollReveal,
} from '@/lib/animations'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GoldButton } from '@/components/ui/GoldButton'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { TexturePattern } from '@/components/ui/TexturePattern'
import { MapPin, ExternalLink } from 'lucide-react'


// Lazy load 3D canvas — SSR disabled
const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), {
  ssr: false,
  loading: () => <div className="absolute inset-0" style={{ background: '#050810' }} />,
})

interface HeroSectionProps {
  startAnimation?: boolean
}

export function HeroSection({ startAnimation = true }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { margin: '-10%', once: true })
  const isMobile = useMediaQuery('(max-width: 768px)')

  const scrollToConfirm = () => {
    const lenis = (window as any).lenis
    if (lenis) {
      lenis.scrollTo('#confirmer', { offset: -80 })
    } else {
      document.querySelector('#confirmer')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] md:h-screen w-full overflow-hidden flex items-center justify-center bg-wafa-cream py-8 md:py-0 pb-20 md:pb-16"
    >
      {/* ── 3D Cinematic Background (Memorized) ────────────────────────
      <div className="absolute inset-0 z-0">
        <HeroCanvas isInView={isInView} isMobile={isMobile} />
      </div>
      ────────────────────────────────────────────────────────────── */}

      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        <TexturePattern src="/pattern4.jpeg" opacity={0.5} blendMode="normal" />
      </div>

      {/* ── Cinematic gradient overlay — light vignette ────────────────── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 50%, transparent 20%, rgba(255,255,255,0.3) 65%, rgba(249,245,238,0.9) 100%)',
        }}
      />

      {/* ── Bottom fade — blends into next section ────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[2] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(249,245,238,0.5) 40%, rgba(255,255,255,1) 100%)',
        }}
      />

      {/* ── Content Layer ────────────────────────────────────────────── */}
      <SectionWrapper className="container relative z-10 mx-auto px-4 pt-6 md:pt-12">
        <motion.div
          variants={cinematicContainer}
          initial="hidden"
          animate={(isInView && startAnimation) ? "visible" : "hidden"}
          className="flex flex-col items-center text-center max-w-4xl mx-auto will-change-transform"
        >
          {/* 01. Eyebrow Reveal */}
          {/* <motion.div
            variants={cinematicEyebrow}
            className="mb-1 mt- md:mt-16 flex items-center gap-6"
          >
            <motion.div
              variants={cinematicLine}
              className="h-[1px] origin-left bg-gradient-to-r from-transparent to-wafa-gold/60 w-12 md:w-16"
            />
            <span
              className="font-montserrat text-[11px] md:text-xs font-semibold uppercase tracking-[0.4em]"
              style={{ color: '#C9A84C' }}
            >
              {EVENT.organizer}
            </span>
            <motion.div
              variants={cinematicLine}
              className="h-[1px] origin-right bg-gradient-to-l from-transparent to-wafa-gold/60 w-12 md:w-16"
            />
          </motion.div> */}

          {/* 02. Logo — High Priority Rapid Load */}
          <motion.div
            variants={cinematicFadeUp}
            className="mb-6 mt-20 md:mb-10 w-full flex justify-center"
            style={{
              transform: 'translateY(30px)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/wafa.png"
              alt="Wafa Assurance"
              className="h-21 md:h-32 object-contain"
              fetchPriority="high"
              decoding="sync"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.2))'
              }}
            />
          </motion.div>

          {/* 03. Description — High Legibility & Elegant Fade */}
          <motion.div
            variants={cinematicFadeIn}
            className="font-montserrat max-w-3xl mb-8 md:mb-14 leading-relaxed tracking-wide"
          >
            <div className="text-gray-800 font-normal space-y-1.5 text-center" style={{ fontSize: 'clamp(1rem, 2.2vw, 1.2rem)' }}>
              <p>
                Monsieur <span className="text-wafa-dark font-bold text-[1.05em]">Boubker JAI</span>,
              </p>
              <p >
                Président Directeur Général du Groupe Wafa Assurance,
              </p>
              <p>
                et l&apos;équipe dirigeante de <span className="text-wafa-dark font-bold text-[1.05em]">Attijari Assurance Tunisie</span>
              </p>
              <p className="pt-4">
                ont le plaisir de vous convier à une soirée de célébration et de partage
              </p>
              <p>
                à l&apos;occasion de l&apos;inauguration du nouveau siège d&apos;Attijari Assurance Tunisie.
              </p>


              {/* ── Date/Location Badge ──────────────────── */}
              <motion.div
                variants={cinematicFadeUp}
                className="pt-4 flex justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
                  className="group relative inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 rounded-full border border-gray-300 backdrop-blur-md bg-white/50 max-w-[95vw] cursor-default transition-all duration-500 overflow-hidden"
                >
                  {/* Shimmer Effect */}
                  <motion.div
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-0"
                  />

                  {/* Multi-layered Ripple Dot */}
                  <div className="relative flex items-center justify-center w-2 h-2 md:w-2.5 md:h-2.5 shrink-0 z-10">
                    <motion.span
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-0 rounded-full"
                      style={{ background: '#C9A84C', boxShadow: '0 0 10px rgba(201,168,76,0.4)' }}
                    />
                    {[1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ scale: [1, 3.5], opacity: [0.4, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full border border-wafa-gold/40"
                      />
                    ))}
                  </div>

                  <span className="relative z-10 font-montserrat text-700 text-[9px] md:text-[11px] tracking-[0.1em] md:tracking-[0.25em] uppercase font-medium flex flex-wrap justify-center items-center gap-x-2 text-center">
                    <motion.span
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="whitespace-nowrap"
                    >
                      {EVENT.dateLabel}
                    </motion.span>
                    <span className="hidden xs:inline opacity-40">·</span>
                    <motion.span
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="whitespace-nowrap"
                    >
                      {EVENT.venue}
                    </motion.span>
                  </span>
                </motion.div>
              </motion.div>

              <motion.div
                variants={cinematicFadeUp}
                className="pt-4 flex flex-col items-center gap-1.5"
              >
                {/* ── Google Maps Badge — always visibly clickable ── */}
                <div className="relative group/map">

                  {/* Outer glow ring — intensifies on hover */}
                  <motion.div
                    className="absolute -inset-[3px] rounded-full pointer-events-none transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(135deg, rgba(201,168,76,0.25), rgba(232,201,109,0.1))',
                      filter: 'blur(5px)',
                      opacity: 0.6,
                    }}
                    whileHover={{ opacity: 1 }}
                  />

                  <motion.a
                    href="https://www.google.com/maps/search/?api=1&query=Attijari+Assurance+Tunisie+Lot+A14+Bd+de+la+Terre+1082+Centre+Urbain+Nord+Tunis"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.04,
                      backgroundColor: 'rgba(255,255,255,0.88)',
                    }}
                    whileTap={{ scale: 0.96 }}
                    className="relative inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 rounded-full backdrop-blur-md bg-white/60 max-w-[95vw] cursor-pointer overflow-hidden no-underline transition-colors duration-300"
                    style={{
                      textDecoration: 'none',
                      border: '1.5px dashed rgba(201,168,76,0.7)',
                      boxShadow: '0 0 0 3px rgba(201,168,76,0.08), 0 4px 16px rgba(201,168,76,0.12)',
                    }}
                  >
                    {/* Shimmer sweep */}
                    <motion.div
                      animate={{ x: ['-100%', '220%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 0.5 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-0"
                    />

                    {/* Animated MapPin */}
                    <motion.div
                      animate={{ y: [0, -4, 0], scale: [1, 1.15, 1] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="z-10 relative shrink-0"
                    >
                      <MapPin size={14} className="text-[#C9A84C]" />
                    </motion.div>

                    {/* Address text — always underlined */}
                    <span className="relative z-10 font-montserrat text-[9px] md:text-[11px] tracking-[0.08em] md:tracking-[0.18em] uppercase font-semibold text-center leading-relaxed"
                      style={{ color: '#8a6a1f', textDecorationColor: 'rgba(201,168,76,0.5)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                    >
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                      >
                        Attijari Assurance Tunisie · Lot N°A14, Bd de la Terre, 1082 Centre Urbain Nord - Tunis
                      </motion.span>
                    </span>

                    {/* External link icon — always visible */}
                    <motion.div
                      animate={{ x: [0, 2, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                      className="z-10 relative shrink-0"
                    >
                      <ExternalLink size={12} style={{ color: '#C9A84C' }} />
                    </motion.div>
                  </motion.a>
                </div>

                {/* "Voir sur la carte" helper label — always visible */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="font-montserrat text-[8px] md:text-[9px] tracking-[0.22em] uppercase"
                  style={{ color: '#C9A84C' }}
                >
                  Voir sur la carte →
                </motion.span>
              </motion.div>
              {/* ─────────────────────────────────────────────────────────── */}
            </div>
          </motion.div>

          {/* 04. Action Group */}
          <motion.div
            variants={cinematicRise}
            className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto relative z-10 mb-8 md:mb-12"
          >
            <GoldButton
              size="lg"
              onClick={scrollToConfirm}
              className="w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 text-sm md:text-base shadow-[0_10px_30px_rgba(201,168,76,0.15)] hover:shadow-[0_15px_40px_rgba(201,168,76,0.25)] transition-all"
            >
              Confirmer Ma Présence
            </GoldButton>
            <GoldButton
              variant="outline"
              size="lg"
              href="#programme"
              className="w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 text-sm md:text-base bg-white/60 md:backdrop-blur-xl border border-wafa-gold/30 text-wafa-dark hover:border-wafa-gold/60"
            >
              Découvrir le Programme
            </GoldButton>
          </motion.div>
        </motion.div>
      </SectionWrapper>

    </section>
  )
}