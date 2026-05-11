'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, Facebook, Instagram, Linkedin, Twitter, MapPin, Clock, Calendar, Star, Users, Award, ArrowRight } from 'lucide-react'
import { EVENT } from '@/lib/constants'
import { DiamondPattern } from '@/components/ui/DiamondPattern'

/* ─── tiny helpers ─────────────────────────────────── */
const GoldDiamond = ({ size = 10 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" className="text-wafa-gold fill-current rotate-45 flex-shrink-0">
    <rect x="1" y="1" width="10" height="10" />
  </svg>
)

const OrnamentalRule = () => (
  <div className="flex items-center justify-center gap-3 my-1">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-wafa-gold/40" />
    <GoldDiamond size={8} />
    <div className="h-px w-6 bg-wafa-gold/40" />
    <GoldDiamond size={6} />
    <div className="h-px w-6 bg-wafa-gold/40" />
    <GoldDiamond size={8} />
    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-wafa-gold/40" />
  </div>
)

/* ─── stat card ────────────────────────────────────── */
const StatPill = ({ icon: Icon, value, label }: { icon: React.ElementType; value: string; label: string }) => (
  <div className="group flex flex-col items-center gap-1.5 px-6 py-4 rounded-2xl border border-wafa-gold/20 bg-white/40 backdrop-blur-sm hover:border-wafa-gold/50 hover:bg-white/70 transition-all duration-500">
    <div className="w-9 h-9 rounded-full border border-wafa-gold/30 bg-wafa-gold/5 flex items-center justify-center group-hover:bg-wafa-gold/15 transition-colors duration-300">
      <Icon className="w-4 h-4 text-wafa-gold" />
    </div>
    <span className="font-playfair text-2xl font-bold text-wafa-dark leading-none">{value}</span>
    <span className="font-montserrat text-[10px] uppercase tracking-widest text-gray-500">{label}</span>
  </div>
)

/* ─── nav link ─────────────────────────────────────── */
const NavLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <a
      href={href}
      className="group flex items-center gap-2 font-montserrat text-xs text-gray-600 hover:text-wafa-gold transition-colors duration-300"
    >
      <ArrowRight className="w-3 h-3 text-wafa-gold/0 group-hover:text-wafa-gold/70 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
      {label}
    </a>
  </li>
)

/* ═══════════════════════════════════════════════════════ */
export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative bg-wafa-cream overflow-hidden border-t border-wafa-gold/10">
      <DiamondPattern opacity={0.03} color="#003d2b" />

      {/* ── 1. Welcome Banner ─────────────────────────────── */}
      <div className="relative border-b border-wafa-gold/10">
        <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[200px] rounded-full bg-wafa-gold/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-16 text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-wafa-gold/60" />
            <GoldDiamond />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-wafa-gold/60" />
          </div>

          <p className="font-montserrat text-xs uppercase tracking-[0.3em] text-wafa-gold/70 mb-4">
            Un moment d'exception vous attend
          </p>

          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-wafa-dark leading-snug mb-4">
            Nous serons heureux{' '}
            <span className="relative inline-block">
              <span className="text-wafa-gold">de vous accueillir</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" preserveAspectRatio="none" height="8">
                <path d="M0 6 Q50 0 100 4 Q150 8 200 2" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-wafa-gold/40" />
              </svg>
            </span>{' '}
            &amp; de vous voir.
          </h2>

          <p className="font-montserrat text-sm text-gray-600 max-w-md mx-auto mt-6">
            Rejoignez-nous pour une soirée placée sous le signe de l'élégance, du partage et de la reconnaissance.
          </p>

          {/* Event pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { Icon: Calendar, label: EVENT.dateLabel },
              { Icon: Clock, label: EVENT.timeLabel },
              { Icon: MapPin, label: `${EVENT.venue}, ${EVENT.city}` },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full border border-wafa-gold/30 bg-white/50 text-gray-700 text-xs font-montserrat">
                <Icon className="w-3.5 h-3.5 text-wafa-gold" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* ── 3. Main footer body ──────────────────────────── */}
      <div className="container mx-auto px-4 pt-12 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10 mb-10">

          {/* Col 1 — Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="relative w-56 h-20 mb-5">
              <Image src="/logo2.png" alt="Attijari Assurance Logo" fill className="object-contain object-left" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-wafa-dark mb-2">{EVENT.name}</h3>
            <p className="font-montserrat text-xs text-gray-600 leading-relaxed max-w-xs">
              Un événement organisé avec soin pour célébrer l'excellence et renforcer nos liens.
            </p>
          </div>

          {/* Col 2 — Centre: vertical separators + RSVP nudge */}
          <div className="flex items-stretch gap-0 h-full">
            {/* left separator */}
            <div className="hidden md:flex flex-col items-center justify-center px-4">
              <div className="w-px flex-1 bg-gradient-to-b from-transparent via-wafa-gold/30 to-transparent" />
              <GoldDiamond size={7} />
              <div className="w-px flex-1 bg-gradient-to-b from-transparent via-wafa-gold/30 to-transparent" />
            </div>

            {/* content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-2 px-4">
              <p className="font-montserrat text-[9px] uppercase tracking-[0.3em] text-wafa-gold/60">
                Soirée de gala
              </p>
              <div className="flex flex-col items-center gap-0.5">
                <p className="font-playfair text-2xl font-bold text-wafa-dark leading-tight">{EVENT.dateLabel}</p>
                <p className="font-montserrat text-[10px] text-gray-500 tracking-widest">{EVENT.timeLabel}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-px w-6 bg-wafa-gold/30" />
                <GoldDiamond size={5} />
                <div className="h-px w-6 bg-wafa-gold/30" />
              </div>
              <p className="font-montserrat text-[10px] text-gray-500 leading-relaxed max-w-[140px]">
                {EVENT.venue},<br />{EVENT.city}
              </p>
            </div>

            {/* right separator */}
            <div className="hidden md:flex flex-col items-center justify-center px-4">
              <div className="w-px flex-1 bg-gradient-to-b from-transparent via-wafa-gold/30 to-transparent" />
              <GoldDiamond size={7} />
              <div className="w-px flex-1 bg-gradient-to-b from-transparent via-wafa-gold/30 to-transparent" />
            </div>
          </div>

          {/* Col 3 — Social & contact */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <p className="font-montserrat text-xs text-wafa-gold/70 uppercase tracking-widest mb-5">Suivez-nous</p>
            <div className="flex gap-3 mb-6">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-wafa-gold hover:border-wafa-gold hover:bg-wafa-gold/10 transition-all duration-300"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="font-montserrat text-xs text-gray-500 leading-relaxed">
              Pour toute question, contactez<br />
              <a href="mailto:contact@attijari-assurance.tn" className="text-wafa-gold/70 hover:text-wafa-gold transition-colors">
                contact@attijari-assurance.tn
              </a>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-wafa-gold/20 to-transparent mb-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="font-montserrat text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {EVENT.organizer}. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-montserrat text-xs text-gray-500 hover:text-wafa-gold transition-colors">Mentions légales</a>
            <a href="#" className="font-montserrat text-xs text-gray-500 hover:text-wafa-gold transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white border border-wafa-gold text-wafa-gold flex items-center justify-center shadow-gold-sm hover:bg-wafa-gold hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-wafa-gold"
            aria-label="Retour en haut"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}
