// src/components/layout/Navbar.tsx
'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { PorscheWordmark } from '@/components/ui/PorscheLogo'

import { smoothScrollTo } from '@/lib/scroll'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isOver = latest > 80
    setScrolled((prev) => (prev !== isOver ? isOver : prev))
  })

  // Close menu on route change / resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNavClick = (href: string) => {
    if (menuOpen) {
      setMenuOpen(false)
    }
    smoothScrollTo(href, -70)
  }

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[#08090C]/98 md:backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.85)]'
            : 'bg-transparent py-5'
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="container mx-auto px-3 sm:px-4 flex items-center justify-between">
          {/* 2K Events & Porsche Co-Branding Brandmark */}
          <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-4">
            {/* 1. 2K Events Logo */}
            <button
              onClick={() => smoothScrollTo(0, 0, 0.8)}
              className="flex items-center gap-1.5 sm:gap-2 group focus:outline-none rounded transition-transform hover:scale-[1.02] active:scale-95 text-left"
              title="2K Events - Société Organisatrice de l'Événement"
              aria-label="2K Events"
            >
              <Image
                src="/2k.png"
                alt="2K Events - Société Organisatrice"
                width={682}
                height={266}
                priority
                className="w-14 xs:w-18 sm:w-28 md:w-32 h-auto brightness-0 invert opacity-95 group-hover:opacity-100 group-hover:brightness-110 transition-all duration-300 drop-shadow-[0_2px_14px_rgba(255,255,255,0.25)] object-contain"
              />
              <span className="hidden xl:inline-flex flex-col font-outfit text-[7px] tracking-[0.25em] uppercase text-gray-300 font-bold border-l border-white/20 pl-2 leading-tight">
                <span className="text-white">EVENT</span>
                <span className="text-[#E0681C]">PRODUCER</span>
              </span>
            </button>

            {/* Prestige Separator */}
            <div className="h-6 sm:h-8 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />

            {/* 2. Official Porsche Brandmark (Official Text Only) */}
            <button
              onClick={() => smoothScrollTo(0, 0, 0.8)}
              className="flex flex-col items-start justify-center focus:outline-none rounded transition-transform hover:scale-[1.02] active:scale-95 text-left group py-1"
              aria-label="Porsche Experience Accueil"
            >
              <PorscheWordmark className="h-2.5 xs:h-3 sm:h-3.5 md:h-4 w-auto text-white group-hover:text-[#E0681C] transition-colors drop-shadow-[0_2px_14px_rgba(255,255,255,0.3)]" />
              <span className="font-mono text-[6px] xs:text-[7px] sm:text-[8px] font-bold tracking-[0.25em] sm:tracking-[0.42em] uppercase mt-1 text-[#E0681C]">
                CAYENNE E4 LAUNCH
              </span>
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => handleNavClick(href)}
                className="font-outfit text-xs font-bold uppercase tracking-wider text-gray-300
                           hover:text-[#E0681C] px-3.5 py-2 rounded-lg hover:bg-white/5
                           transition-all duration-200 focus:outline-none cursor-pointer"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#confirmer')}
              className="ml-3 px-5 py-2 text-white font-outfit font-bold text-xs uppercase tracking-widest
                         rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 focus:outline-none cursor-pointer bg-[#E0681C] hover:bg-[#ff7525] shadow-[0_4px_16px_rgba(224,104,28,0.35)]"
            >
              RSVP VIP
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-white hover:text-[#E0681C] transition-colors focus:outline-none rounded cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Minimalist luxury hairline at bottom of navbar when scrolled */}
        {scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
        )}
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/85 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className={cn(
                "fixed left-0 right-0 z-40 md:hidden bg-[#0E1015] border-b border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.95)] overflow-hidden will-change-transform",
                scrolled ? "top-[64px]" : "top-[80px]"
              )}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {/* Mobile Drawer Co-Branding */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2.5 sm:py-3 mb-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 xs:gap-3">
                    <Image
                      src="/2k.png"
                      alt="2K Events"
                      width={682}
                      height={266}
                      className="w-13 xs:w-16 h-auto brightness-0 invert opacity-95 object-contain"
                    />
                    <span className="text-[#E0681C] font-bold text-xs">×</span>
                    <PorscheWordmark className="h-3 sm:h-3.5 w-auto text-white" />
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-wider text-[#E0681C] font-bold bg-[#E0681C]/10 px-2 py-0.5 rounded border border-[#E0681C]/30">
                    E4 LAUNCH
                  </span>
                </div>

                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.button
                    key={href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(href)}
                    className="text-left px-4 py-3.5 font-outfit 
                               font-semibold text-gray-300 hover:text-white
                               hover:bg-white/5 rounded-xl transition-all
                               focus:outline-none border border-transparent cursor-pointer"
                  >
                    {label}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => handleNavClick('#confirmer')}
                  className="mt-2 w-full py-3.5 text-white
                             font-outfit font-bold text-xs uppercase tracking-widest rounded-xl
                             bg-[#E0681C] hover:bg-[#ff7525] transition-colors cursor-pointer shadow-lg"
                >
                  RSVP VIP · Sécuriser Ma Place
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
