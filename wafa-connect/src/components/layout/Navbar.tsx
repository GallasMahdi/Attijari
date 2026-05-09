// src/components/layout/Navbar.tsx
'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80)
  })

  // Close menu on route change / resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)

    // Use Lenis if available for smoother/more reliable scrolling
    const lenis = (window as any).lenis
    if (lenis) {
      lenis.scrollTo(href, { offset: -80 })
      return
    }

    const el = document.querySelector(href)
    if (el) {
      const headerOffset = 80
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 py-3 shadow-sm'
            : 'bg-transparent py-5'
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 focus:outline-none 
                       focus-visible:ring-2 focus-visible:ring-wafa-gold rounded transition-transform hover:scale-105 active:scale-95"
          >
            <div className="relative w-48 h-14 md:w-72 md:h-24 flex items-center justify-start transition-all duration-300">
              <Image
                src="/logo2.png"
                alt="Attijari Assurance Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => handleNavClick(href)}
                className="font-montserrat text-sm font-medium text-wafa-dark
                           hover:text-wafa-gold px-4 py-2 rounded-lg
                           hover:bg-gray-100 transition-all duration-200
                           focus:outline-none focus-visible:ring-2 
                           focus-visible:ring-wafa-gold"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#confirmer')}
              className="ml-2 px-5 py-2.5 bg-wafa-gold hover:bg-wafa-gold-light
                         text-wafa-dark font-montserrat font-bold text-sm
                         rounded-xl transition-all duration-200
                         hover:shadow-gold-sm active:scale-95
                         focus:outline-none focus-visible:ring-2 
                         focus-visible:ring-wafa-gold-light"
            >
              Confirmer
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-wafa-dark hover:text-wafa-gold
                       transition-colors focus:outline-none 
                       focus-visible:ring-2 focus-visible:ring-wafa-gold rounded"
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
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-wafa-dark/80 
                         backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className={cn(
                "fixed left-0 right-0 z-40 md:hidden bg-white border-b border-gray-200 shadow-xl overflow-hidden",
                scrolled ? "top-[72px]" : "top-[88px]"
              )}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.button
                    key={href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(href)}
                    className="text-left px-4 py-3.5 font-montserrat 
                               font-medium text-wafa-dark hover:text-wafa-gold
                               hover:bg-gray-50 rounded-xl transition-all
                               focus:outline-none border border-transparent
                               hover:border-wafa-gold/20"
                  >
                    {label}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => handleNavClick('#confirmer')}
                  className="mt-2 w-full py-4 bg-wafa-gold text-wafa-dark
                             font-montserrat font-bold rounded-xl
                             hover:bg-wafa-gold-light transition-colors"
                >
                  Confirmer Ma Présence
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
