'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, Facebook, Instagram, Linkedin, Twitter, MapPin, Clock, Calendar } from 'lucide-react'
import { EVENT } from '@/lib/constants'
import { DiamondPattern } from '@/components/ui/DiamondPattern'

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-wafa-very-dark overflow-hidden border-t border-wafa-gold/10">
      <DiamondPattern opacity={0.03} color="#ffffff" />

      {/* ── Welcome Banner ── */}
      <div className="relative border-b border-wafa-gold/10">
        {/* Radial glow behind the text */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[600px] h-[200px] rounded-full bg-wafa-gold/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-16 text-center relative z-10">
          {/* Ornamental line + diamond */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-wafa-gold/60" />
            <svg width="12" height="12" viewBox="0 0 12 12" className="text-wafa-gold fill-current rotate-45">
              <rect x="1" y="1" width="10" height="10" />
            </svg>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-wafa-gold/60" />
          </div>

          <p className="font-montserrat text-xs uppercase tracking-[0.3em] text-wafa-gold/70 mb-4">
            Un moment d'exception vous attend
          </p>

          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white leading-snug mb-4">
            Nous serons heureux{' '}
            <span className="relative inline-block">
              <span className="text-wafa-gold">de vous accueillir</span>
              {/* underline flourish */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 8"
                preserveAspectRatio="none"
                height="8"
              >
                <path
                  d="M0 6 Q50 0 100 4 Q150 8 200 2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  className="text-wafa-gold/40"
                />
              </svg>
            </span>{' '}
            &amp; de vous voir.
          </h2>

          <p className="font-montserrat text-sm text-white/50 max-w-md mx-auto mt-6">
            Rejoignez-nous pour une soirée placée sous le signe de l'élégance, du partage et de la reconnaissance.
          </p>

          {/* Event detail pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { Icon: Calendar, label: EVENT.dateLabel },
              { Icon: Clock, label: EVENT.timeLabel },
              { Icon: MapPin, label: `${EVENT.venue}, ${EVENT.city}` },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-wafa-gold/20 bg-wafa-gold/5 text-white/70 text-xs font-montserrat"
              >
                <Icon className="w-3.5 h-3.5 text-wafa-gold" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div className="container mx-auto px-4 pt-14 pb-10 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-14">

          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="relative w-56 h-20 mb-5">
              <Image
                src="/logo1.png"
                alt="Attijari Assurance Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <h3 className="font-playfair text-xl font-bold text-white mb-2">{EVENT.name}</h3>
            <p className="font-montserrat text-xs text-white/50 leading-relaxed max-w-xs">
              Un événement organisé avec soin pour célébrer l'excellence et renforcer nos liens.
            </p>
          </div>

          {/* Social & contact */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <p className="font-montserrat text-xs text-wafa-gold/70 uppercase tracking-widest mb-5">Suivez-nous</p>
            <div className="flex gap-3 mb-6">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-wafa-gold hover:border-wafa-gold hover:bg-wafa-gold/10 transition-all duration-300"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="font-montserrat text-xs text-white/40 leading-relaxed">
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
          <p className="font-montserrat text-xs text-white/30">
            &copy; {new Date().getFullYear()} {EVENT.organizer}. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-montserrat text-xs text-white/30 hover:text-wafa-gold transition-colors">Mentions légales</a>
            <a href="#" className="font-montserrat text-xs text-white/30 hover:text-wafa-gold transition-colors">Politique de confidentialité</a>
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
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-wafa-dark border border-wafa-gold text-wafa-gold flex items-center justify-center shadow-gold-sm hover:bg-wafa-gold hover:text-wafa-dark transition-colors focus:outline-none focus:ring-2 focus:ring-wafa-gold"
            aria-label="Retour en haut"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}