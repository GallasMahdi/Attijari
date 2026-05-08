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
  const isInView = useInView(sectionRef, { margin: '-10%' })
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
      className="relative h-screen min-h-[640px] w-full overflow-hidden flex items-center justify-center bg-wafa-dark"
    >
      {/* ── 3D Cinematic Background (Memorized) ────────────────────────
      <div className="absolute inset-0 z-0">
        <HeroCanvas isInView={isInView} isMobile={isMobile} />
      </div>
      ────────────────────────────────────────────────────────────── */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <TexturePattern src="/pattern3.jpeg" opacity={0.35} blendMode="normal" />
      </div>

      {/* ── Cinematic gradient overlay — navy vignette ────────────────── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 50%, transparent 20%, rgba(5,8,16,0.3) 65%, rgba(5,8,16,0.85) 100%)',
        }}
      />

      {/* ── Bottom fade — blends into next section ────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-[2] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(5,8,16,0.5) 40%, rgba(3,5,10,1) 100%)',
        }}
      />

      {/* ── Content Layer ────────────────────────────────────────────── */}
      <SectionWrapper className="container relative z-10 mx-auto px-4 pt-12">
        <motion.div
          variants={cinematicContainer}
          initial="hidden"
          animate={(isInView && startAnimation) ? "visible" : "hidden"}
          className="flex flex-col items-center text-center max-w-4xl mx-auto will-change-transform"
        >
          {/* 01. Date/Location Badge with floating effect */}
          <motion.div
            variants={cinematicFadeIn}
            className="mb-10 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 backdrop-blur-md"
            style={{
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-2 h-2 rounded-full shadow-[0_0_10px_#C9A84C]"
              style={{ background: '#C9A84C' }}
            />
            <span
              className="font-montserrat text-white/70 text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-medium"
            >
              {EVENT.dateLabel} &nbsp;·&nbsp; {EVENT.venue}
            </span>
          </motion.div>

          {/* 02. Eyebrow Reveal */}
          <motion.div
            variants={cinematicEyebrow}
            className="mb-8 flex items-center gap-6"
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
          </motion.div>

          {/* 03. Main Title — Luxury Reveal */}
          <motion.h1
            variants={cinematicFadeUp}
            className="font-playfair font-bold text-white mb-8 leading-[1.1] will-change-[transform,filter,opacity]"
            style={{
              fontSize: 'clamp(2.2rem, 6.5vw, 3.8rem)',
            }}
          >
            Wafa{' '}
            <span
              className="italic relative inline-block px-1"
              style={{
                background:
                  'linear-gradient(90deg, #C9A84C 0%, #F3D991 45%, #C9A84C 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer 4s linear infinite',
              }}
            >
              Connect
              {/* Subtle underline glow */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isInView ? 1 : 0 }}
                transition={{ delay: 1.5, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-1 left-0 right-0 h-px bg-wafa-gold/30 blur-[1px]"
              />
            </span>
          </motion.h1>

          {/* 04. Description — High Legibility & Elegant Fade */}
          <motion.div
            variants={cinematicFadeIn}
            className="font-montserrat max-w-3xl mb-14 leading-relaxed tracking-wide"
          >
            <p className="mb-6 text-wafa-gold font-playfair italic text-2xl md:text-4xl opacity-90">
              Inauguration du Nouveau Siège
            </p>
            <div className="text-white/80 font-light space-y-4" style={{ fontSize: 'clamp(1rem, 2.2vw, 1.2rem)' }}>
              <p>
                M. <span className="text-white font-semibold">Boubker JAI</span>, Président Directeur Général du Groupe Wafa Assurance,
                et l&apos;équipe dirigeante de <span className="text-white font-semibold">Attijari Assurance Tunisie</span>,
              </p>
              <p>
                ont le plaisir de vous convier à un cocktail dinatoire le
                <span className="text-wafa-gold font-bold ml-2 border-b border-wafa-gold/30 pb-0.5">Jeudi 21 Mai 2026</span>.
              </p>
            </div>
          </motion.div>

          {/* 05. Action Group */}
          <motion.div
            variants={cinematicRise}
            className="flex flex-col sm:flex-row items-center gap-5"
          >
            <GoldButton
              size="lg"
              onClick={scrollToConfirm}
              className="w-full sm:w-auto px-10 py-5 text-base shadow-[0_10px_30px_rgba(201,168,76,0.15)] hover:shadow-[0_15px_40px_rgba(201,168,76,0.25)] transition-all"
            >
              Confirmer Ma Présence
            </GoldButton>
            <GoldButton
              variant="outline"
              size="lg"
              href="#programme"
              className="w-full sm:w-auto px-10 py-5 text-base backdrop-blur-xl border-white/10 hover:border-wafa-gold/40"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              Découvrir le Programme
            </GoldButton>
          </motion.div>
        </motion.div>
      </SectionWrapper>

    </section>
  )
}
