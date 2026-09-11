// src/components/sections/CountdownSection.tsx
'use client'
import { EVENT } from '@/lib/constants'
import { useCountdown } from '@/hooks/useCountdown'
import { CountdownUnit } from '@/components/ui/CountdownUnit'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Sparkles, Zap } from 'lucide-react'

export function CountdownSection() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(EVENT.date)

  if (isExpired) return null

  return (
    <section className="py-20 relative overflow-hidden bg-[#07090D] border-y border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-[#E0681C]/[0.06] blur-[140px] pointer-events-none rounded-full" />

      {/* Starting Grid Lights Strip — E4 800V Architecture Status */}
      <div className="flex justify-center items-center gap-2 sm:gap-6 mb-6 sm:mb-8">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-black/70 border border-white/10"
          >
            <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full bg-[#E0681C] shadow-[0_0_15px_#E0681C] animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#6D8080]" />
          </div>
        ))}
      </div>

      <SectionWrapper className="container mx-auto px-3 sm:px-4 relative z-10">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E0681C]/30 bg-[#E0681C]/10 backdrop-blur-md mb-3 max-w-full">
            <Sparkles className="w-3 h-3 text-[#E0681C] flex-shrink-0" />
            <span className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.35em] text-white truncate">
              LE DOMAINE NEFERIS · WORLD PREMIERE
            </span>
          </div>

          <h2 className="font-outfit text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-wider">
            Compte à Rebours <span className="text-gradient-terracotta italic">Avant le Lancement</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-gray-400 mt-2 max-w-lg mx-auto">
            18 — 21 Juin 2026 · Ouverture officielle des 6 vagues d'essais quotidiennes du Cayenne E4 Electric
          </p>
        </div>

        <div className="flex justify-center items-center gap-1.5 xs:gap-3 sm:gap-6 md:gap-8 lg:gap-10">
          <CountdownUnit value={days} label="Jours" />
          <div className="text-[#E0681C] font-outfit text-xl xs:text-3xl sm:text-5xl font-black mb-4 sm:mb-6 animate-pulse select-none">:</div>
          <CountdownUnit value={hours} label="Heures" />
          <div className="text-[#E0681C] font-outfit text-xl xs:text-3xl sm:text-5xl font-black mb-4 sm:mb-6 animate-pulse select-none">:</div>
          <CountdownUnit value={minutes} label="Minutes" />
          <div className="text-[#E0681C] font-outfit text-xl xs:text-3xl sm:text-5xl font-black mb-4 sm:mb-6 animate-pulse select-none">:</div>
          <CountdownUnit value={seconds} label="Secondes" />
        </div>
      </SectionWrapper>
    </section>
  )
}
