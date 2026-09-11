// src/components/layout/EventExperienceClient.tsx
'use client'
import React, { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useSpring } from 'framer-motion'
import { SplashScreen } from '@/components/ui/SplashScreen'
import { HeroSection } from '@/components/sections/HeroSection'
import { PorscheCheckeredBand } from '@/components/ui/PorscheCheckeredBand'
import { GuestResponse } from '@/types/guest'
import { SmoothScrollProvider } from './SmoothScrollProvider'

// Below-the-fold dynamic sections
const FleetShowcaseSection = dynamic(
  () => import('@/components/sections/FleetShowcaseSection').then((mod) => mod.FleetShowcaseSection),
  { loading: () => <SectionSkeleton title="COLLECTION CAYENNE E4" height="h-[600px]" /> }
)
const MysteryTeaserSection = dynamic(
  () => import('@/components/sections/MysteryTeaserSection').then((mod) => mod.MysteryTeaserSection),
  { loading: () => <SectionSkeleton title="DÉVOILEMENT DU MODÈLE" height="h-[500px]" /> }
)
const HeritageConceptSection = dynamic(
  () => import('@/components/sections/HeritageConceptSection').then((mod) => mod.HeritageConceptSection),
  { loading: () => <SectionSkeleton title="HERITAGE × FUTURE" height="h-[500px]" /> }
)
const CayenneExperienceSection = dynamic(
  () => import('@/components/sections/CayenneExperienceSection').then((mod) => mod.CayenneExperienceSection),
  { loading: () => <SectionSkeleton title="L'EXPÉRIENCE CAYENNE E4" height="h-[600px]" /> }
)
const CountdownSection = dynamic(
  () => import('@/components/sections/CountdownSection').then((mod) => mod.CountdownSection),
  { loading: () => <SectionSkeleton title="COMPTE À REBOURS DU LANCEMENT" height="h-[300px]" /> }
)
const JourneySection = dynamic(
  () => import('@/components/sections/JourneySection').then((mod) => mod.JourneySection),
  { loading: () => <SectionSkeleton title="PARCOURS DE L'INVITÉ VIP" height="h-[400px]" /> }
)
const ProgramSection = dynamic(
  () => import('@/components/sections/ProgramSection').then((mod) => mod.ProgramSection),
  { loading: () => <SectionSkeleton title="PROGRAMME DES VAGUES & SOIRÉE" height="h-[500px]" /> }
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
    if (sessionStorage.getItem('porsche_splash_seen')) {
      setIsSplashFinished(true)
    }
  }, [])

  const handleConfirmationSuccess = (data: GuestResponse) => {
    setGuestData(data)
  }

  return (
    <SmoothScrollProvider>
      <SplashScreen onComplete={() => setIsSplashFinished(true)} />

      <main className="relative bg-[#08090C]">
        {/* Critical LCP Hero section with genuine Cayenne E4 imagery */}
        <HeroSection startAnimation={isSplashFinished} />

        {/* Lineup: 8 Cayenne E4 vehicles + instructor cars */}
        <Suspense fallback={<SectionSkeleton title="COLLECTION CAYENNE E4" height="h-[600px]" />}>
          <FleetShowcaseSection />
        </Suspense>

        <PorscheCheckeredBand variant="divider" />

        {/* Feature 1: Interactive Shrouded Silhouette Teaser */}
        <Suspense fallback={<SectionSkeleton title="DÉVOILEMENT DU MODÈLE" height="h-[500px]" />}>
          <MysteryTeaserSection />
        </Suspense>

        <PorscheCheckeredBand variant="divider" flip />

        {/* Feature 2: Master Heritage × Future Concept (Slide 1) */}
        <Suspense fallback={<SectionSkeleton title="HERITAGE × FUTURE" height="h-[500px]" />}>
          <HeritageConceptSection />
        </Suspense>

        <PorscheCheckeredBand variant="divider" />

        {/* Feature 3: Cayenne E4 Driving Experience — 4 terrains, performance counters, RSVP */}
        <Suspense fallback={<SectionSkeleton title="L'EXPÉRIENCE CAYENNE E4" height="h-[600px]" />}>
          <CayenneExperienceSection />
        </Suspense>

        <PorscheCheckeredBand variant="divider" flip />

        {/* Feature 4: Luxury Launch Countdown to Domaine Neferis */}
        <Suspense fallback={<SectionSkeleton title="COMPTE À REBOURS DU LANCEMENT" height="h-[300px]" />}>
          <CountdownSection />
        </Suspense>

        <PorscheCheckeredBand variant="divider" />

        {/* Feature 5: VIP Guest Journey */}
        <Suspense fallback={<SectionSkeleton title="PARCOURS DE L'INVITÉ VIP" height="h-[400px]" />}>
          <JourneySection />
        </Suspense>

        <PorscheCheckeredBand variant="divider" flip />

        {/* Feature 6: Waves Timetable & Schedule */}
        <Suspense fallback={<SectionSkeleton title="PROGRAMME DES VAGUES & SOIRÉE" height="h-[500px]" />}>
          <ProgramSection />
        </Suspense>

        <PorscheCheckeredBand variant="divider" />

        {/* Feature 7: VIP RSVP Portal with Campaign ID tracking */}
        <Suspense fallback={<SectionSkeleton title="PORTAIL D'ACCRÉDITATION OFFICIEL" height="h-[500px]" />}>
          <ConfirmationSection
            onSuccess={handleConfirmationSuccess}
            guestData={guestData}
            onReset={() => setGuestData(null)}
          />
        </Suspense>

        <PorscheCheckeredBand variant="divider" flip />

        {/* Feature 8: Domaine Neferis Venue & SUV Off-Road Avenue */}
        <Suspense fallback={<SectionSkeleton title="LE DOMAINE NEFERIS & ACCÈS" height="h-[500px]" />}>
          <MapSection />
        </Suspense>
      </main>

      {/* Floating scroll progress bar — Porsche Terracotta to Cyan */}
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
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] 
                 bg-gradient-to-r from-[#E0681C] via-[#00B4C6] to-[#6D8080] origin-left will-change-transform shadow-[0_0_12px_#E0681C]"
      style={{ scaleX }}
    />
  )
}
