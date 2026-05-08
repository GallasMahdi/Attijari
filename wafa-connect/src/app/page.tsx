// src/app/page.tsx
'use client'
import dynamic from 'next/dynamic'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'

const AboutSection = dynamic(() => import('@/components/sections/AboutSection').then(mod => mod.AboutSection))
const CountdownSection = dynamic(() => import('@/components/sections/CountdownSection').then(mod => mod.CountdownSection))
const JourneySection = dynamic(() => import('@/components/sections/JourneySection').then(mod => mod.JourneySection))
const ProgramSection = dynamic(() => import('@/components/sections/ProgramSection').then(mod => mod.ProgramSection))
const ConfirmationSection = dynamic(() => import('@/components/sections/ConfirmationSection').then(mod => mod.ConfirmationSection))
const QRSection = dynamic(() => import('@/components/sections/QRSection').then(mod => mod.QRSection))
const MapSection = dynamic(() => import('@/components/sections/MapSection').then(mod => mod.MapSection))
import { GuestResponse } from '@/types/guest'
import { SplashScreen } from '@/components/ui/SplashScreen'

import { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { motion, AnimatePresence, useScroll, useSpring, useAnimationFrame } from 'framer-motion'
export default function HomePage() {
  const [isSplashFinished, setIsSplashFinished] = useState(false)
  const [guestData, setGuestData] = useState<GuestResponse | null>(null)
  const qrRef = useRef<HTMLDivElement>(null)
  const [lenisStore, setLenisStore] = useState<Lenis | null>(null)

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      prevent: (node: Element) => node.hasAttribute('data-lenis-prevent'),
    })

    setLenisStore(lenisInstance)
    
    // Use a robust global assignment
    if (typeof window !== 'undefined') {
      (window as any).lenis = lenisInstance
    }

    return () => {
      lenisInstance.destroy()
      if (typeof window !== 'undefined') {
        (window as any).lenis = undefined
      }
    }
  }, [])

  // Synchronize Lenis with Framer Motion's ticker
  useAnimationFrame((time) => {
    lenisStore?.raf(time)
  })

  const handleConfirmationSuccess = (data: GuestResponse) => {
    setGuestData(data)
  }

  return (
    <>
      <SplashScreen onComplete={() => setIsSplashFinished(true)} />
      <Navbar />
      <main className="relative">
        <HeroSection startAnimation={isSplashFinished} />
        <AboutSection />
        <CountdownSection />
        <JourneySection />
        <ProgramSection />
        <ConfirmationSection onSuccess={handleConfirmationSuccess} />

        <AnimatePresence>
          {guestData && (
            <div ref={qrRef} id="mon-acces">
              <QRSection guest={guestData} />
            </div>
          )}
        </AnimatePresence>

        <MapSection />
      </main>
      <Footer />

      {/* Floating scroll progress bar */}
      <ScrollProgressBar />
    </>
  )
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-0.5 
                 bg-gradient-gold origin-left will-change-transform"
      style={{ scaleX }}
    />
  )
}
