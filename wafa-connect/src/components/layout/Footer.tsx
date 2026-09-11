// src/components/layout/Footer.tsx
'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, MapPin, Clock, Calendar, Users, Award, ArrowRight, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import { EVENT, COLORS } from '@/lib/constants'
import { PorscheWordmark } from '@/components/ui/PorscheLogo'
import { smoothScrollTo } from '@/lib/scroll'

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => smoothScrollTo(0, 0, 0.85)

  return (
    <footer className="relative bg-[#050608] overflow-hidden border-t border-white/10 text-white">
      {/* ── 1. Welcome & Motto Banner ─────────────────────────────── */}
      <div className="relative border-b border-white/5 py-16 md:py-20">
        <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[250px] rounded-full bg-[#E0681C]/[0.05] blur-[140px]" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#E0681C]/30 bg-[#E0681C]/10 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[#E0681C] animate-pulse" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#F4F5F7]">
              PORSCHE MIDDLE EAST & AFRICA × 2K EVENTS
            </span>
          </div>

          <h2 className="font-outfit text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight uppercase mb-4 tracking-wider">
            "A museum of the past, <br />
            <span className="text-gradient-terracotta italic">activated by the technology of the future."</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
            L'avènement du Cayenne E4 100% électrique au cœur de l'architecture séculaire du Domaine Neferis.
            Deux univers réunis en une seule expérience de conduite.
          </p>

          {/* Key Event Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { label: 'LIEU D\'EXCELLENCE', val: 'Domaine Neferis', sub: 'Tunisie' },
              { label: 'DATES OFFICIELLES', val: '18 — 21 Juin 2026', sub: '4 Jours d\'Essais' },
              { label: 'FLOTTE D\'ESSAIS', val: '8 Cayenne E4', sub: '3 Instructor Cars' },
              { label: 'ACCÈS PRIVÉ', val: '290 Invités VIP', sub: 'Sur Invitation Privée' },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                <span className="font-mono text-[8px] uppercase tracking-widest text-gray-500 block mb-1">
                  {stat.label}
                </span>
                <span className="font-outfit text-sm sm:text-base font-black text-white block">
                  {stat.val}
                </span>
                <span className="font-sans text-[10px] text-[#E0681C] block mt-0.5">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2. Brandmark & Links ───────────────────────────────────── */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/5">
          {/* Brand Presentation */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3 xs:gap-4">
              <div className="relative w-14 xs:w-18 sm:w-20 h-8 xs:h-9 sm:h-10 flex items-center justify-center flex-shrink-0">
                <Image
                  src="/2k.png"
                  alt="2K Events Logo"
                  width={80}
                  height={36}
                  className="object-contain brightness-150"
                />
              </div>
              <div className="h-7 sm:h-8 w-px bg-white/20 flex-shrink-0" />
              <div className="flex flex-col items-start justify-center">
                <PorscheWordmark className="h-3 xs:h-3.5 sm:h-4 md:h-5 w-auto text-white" />
                <span className="font-mono text-[6px] xs:text-[7px] sm:text-[8px] tracking-[0.22em] sm:tracking-[0.35em] text-[#E0681C] uppercase font-bold mt-1 block">
                  CAYENNE E4 ELECTRIC ERA
                </span>
              </div>
              <div className="h-7 sm:h-8 w-px bg-white/20 flex-shrink-0" />
              {/* Domaine Neferis venue logo */}
              <Image
                src="/neferis-logo.png"
                alt="Domaine Neferis"
                width={110}
                height={72}
                className="h-10 sm:h-12 w-auto object-contain opacity-70 brightness-0 invert"
              />
            </div>
          </div>

          {/* Quick Anchor Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 xs:gap-4 sm:gap-6 text-[10px] xs:text-xs font-outfit uppercase tracking-wider sm:tracking-widest text-gray-400">
            <a href="#flotte" className="hover:text-[#E0681C] transition-colors">Cayenne E4</a>
            <a href="#concept" className="hover:text-[#E0681C] transition-colors">Heritage × Future</a>
            <a href="#experience" className="hover:text-[#E0681C] transition-colors">Expérience</a>
            <a href="#domaine" className="hover:text-[#E0681C] transition-colors">Domaine Neferis</a>
            <a href="#programme" className="hover:text-[#E0681C] transition-colors">Programme</a>
            <a href="#confirmer" className="hover:text-[#E0681C] transition-colors">RSVP VIP</a>
          </div>
        </div>

        {/* ── 3. Copyright & Legal ───────────────────────────────────── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] font-sans text-gray-300">
          <p>
            © 2026 <strong>2K Events</strong> & <strong>Porsche Middle East & Africa FZE</strong>. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 font-mono text-[10px] text-gray-400">
            <span>Campaign ID: {EVENT.campaignId}</span>
            <span>•</span>
            <span>Système C@P & CMM Conforme</span>
          </div>
        </div>
      </div>

      {/* Scroll to Top Floating Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            aria-label="Retour en haut de page"
            className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#0E1015] border border-white/20 text-white flex items-center justify-center shadow-2xl hover:border-[#E0681C] hover:text-[#E0681C] transition-all cursor-pointer"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}
