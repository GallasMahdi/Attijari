// src/components/layout/EventExperienceClient.tsx
'use client'
import React, { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useSpring } from 'framer-motion'
import { SplashScreen } from '@/components/ui/SplashScreen'
import { HeroSection } from '@/components/sections/HeroSection'
import { GuestResponse } from '@/types/guest'
import { SmoothScrollProvider } from './SmoothScrollProvider'

// Below-the-fold dynamic sections — Clean, essential luxury flow
const MysteryTeaserSection = dynamic(
  () => import('@/components/sections/MysteryTeaserSection').then((mod) => mod.MysteryTeaserSection),
  { loading: () => <SectionSkeleton title="DÉVOILEMENT DU MODÈLE" height="h-[500px]" /> }
)
const FleetShowcaseSection = dynamic(
  () => import('@/components/sections/FleetShowcaseSection').then((mod) => mod.FleetShowcaseSection),
  { loading: () => <SectionSkeleton title="COLLECTION CAYENNE E4" height="h-[600px]" /> }
)
const HeritageConceptSection = dynamic(
  () => import('@/components/sections/HeritageConceptSection').then((mod) => mod.HeritageConceptSection),
  { loading: () => <SectionSkeleton title="HERITAGE × FUTURE" height="h-[500px]" /> }
)
const ProgramSection = dynamic(
  () => import('@/components/sections/ProgramSection').then((mod) => mod.ProgramSection),
  { loading: () => <SectionSkeleton title="PROGRAMME DE LA SOIRÉE VIP" height="h-[500px]" /> }
)
const ConfirmationSection = dynamic(
  () => import('@/components/sections/ConfirmationSection').then((mod) => mod.ConfirmationSection),
  { loading: () => <SectionSkeleton title="PORTAIL D'ACCRÉDITATION OFFICIEL" height="h-[500px]" /> }
)
const MapSection = dynamic(
  () => import('@/components/sections/MapSection').then((mod) => mod.MapSection),
  { loading: () => <SectionSkeleton title="LE DOMAINE NEFERIS & ACCÈS" height="h-[500px]" /> }
)

function SectionSkeleton({ title, height }: { title: string; height: string }) {
  return (
    <div className={`w-full ${height} bg-[#08090C] flex flex-col items-center justify-center p-6 border-t border-white/5`}>
      <div className="w-48 h-3 rounded-full bg-white/5 animate-pulse mb-3" />
      <div className="w-72 h-6 rounded-lg bg-white/10 animate-pulse mb-2" />
      <span className="font-outfit text-[10px] tracking-[0.3em] uppercase text-gray-500">
        {title}
      </span>
    </div>
  )
}

export function EventExperienceClient() {
  const [isSplashFinished, setIsSplashFinished] = useState(false)
  const [guestData, setGuestData] = useState<GuestResponse | null>(null)

  useEffect(() => {
    // In production, keep 1 view per session; in dev, allow seeing updates on each refresh
    if (process.env.NODE_ENV !== 'development' && sessionStorage.getItem('porsche_splash_seen')) {
      setIsSplashFinished(true)
    }
  }, [])

  const handleConfirmationSuccess = (data: GuestResponse) => {
    setGuestData(data)
  }

  return (
    <SmoothScrollProvider>
      {!isSplashFinished && (
        <SplashScreen onComplete={() => setIsSplashFinished(true)} />
      )}

      <main className="relative bg-[#08090C]">
        {/* Critical LCP Hero section with genuine Cayenne E4 imagery */}
        <HeroSection startAnimation={isSplashFinished} />

        {/* 1. Interactive Shrouded Silhouette Teaser */}
        <Suspense fallback={<SectionSkeleton title="DÉVOILEMENT DU MODÈLE" height="h-[500px]" />}>
          <MysteryTeaserSection />
        </Suspense>

        <div className="w-full max-w-6xl mx-auto px-4"><div className="h-px bg-white/[0.08]" /></div>

        {/* 2. Official Collection Lineup: 8 Cayenne E4 vehicles */}
        <Suspense fallback={<SectionSkeleton title="COLLECTION CAYENNE E4" height="h-[600px]" />}>
          <FleetShowcaseSection />
        </Suspense>

        <div className="w-full max-w-6xl mx-auto px-4"><div className="h-px bg-white/[0.08]" /></div>

        {/* 3. Heritage × Future Concept */}
        <Suspense fallback={<SectionSkeleton title="HERITAGE × FUTURE" height="h-[500px]" />}>
          <HeritageConceptSection />
        </Suspense>

        <div className="w-full max-w-6xl mx-auto px-4"><div className="h-px bg-white/[0.08]" /></div>

        {/* 4. Soirée Program & Milestones */}
        <Suspense fallback={<SectionSkeleton title="PROGRAMME DE LA SOIRÉE VIP" height="h-[500px]" />}>
          <ProgramSection />
        </Suspense>

        <div className="w-full max-w-6xl mx-auto px-4"><div className="h-px bg-white/[0.08]" /></div>

        {/* 5. VIP RSVP Portal with Instant Pass QR */}
        <Suspense fallback={<SectionSkeleton title="PORTAIL D'ACCRÉDITATION OFFICIEL" height="h-[500px]" />}>
          <ConfirmationSection
            onSuccess={handleConfirmationSuccess}
            guestData={guestData}
            onReset={() => setGuestData(null)}
          />
        </Suspense>

        <div className="w-full max-w-6xl mx-auto px-4"><div className="h-px bg-white/[0.08]" /></div>

        {/* 6. Domaine Neferis Venue & Access */}
        <Suspense fallback={<SectionSkeleton title="LE DOMAINE NEFERIS & ACCÈS" height="h-[500px]" />}>
          <MapSection />
        </Suspense>
      </main>

      {/* Minimalist Floating scroll progress bar — Terracotta to Slate */}
      <ScrollProgressBar />
    </SmoothScrollProvider>
  )
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] 
                 bg-gradient-to-r from-[#E0681C] to-[#6D8080] origin-left will-change-transform opacity-80"
      style={{ scaleX }}
    />
  )
}
