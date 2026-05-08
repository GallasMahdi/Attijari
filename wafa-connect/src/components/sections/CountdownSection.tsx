'use client'
import { EVENT } from '@/lib/constants'
import { useCountdown } from '@/hooks/useCountdown'
import { CountdownUnit } from '@/components/ui/CountdownUnit'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { DiamondPattern } from '@/components/ui/DiamondPattern'

export function CountdownSection() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(EVENT.date)

  if (isExpired) return null

  return (
    <section className="py-20 relative overflow-hidden bg-wafa-dark border-y border-wafa-gold/20">
      <DiamondPattern opacity={0.05} />
      
      {/* Subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.1)_0%,transparent_70%)]" />

      <SectionWrapper className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-2">
            Le Compte à Rebours
          </h2>
          <p className="font-montserrat text-wafa-gold uppercase tracking-widest text-sm">
            Avant le grand jour
          </p>
        </div>

        <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          <CountdownUnit value={days} label="Jours" />
          <div className="text-wafa-gold font-playfair text-4xl sm:text-5xl font-bold mt-4 sm:mt-6 animate-pulse">:</div>
          <CountdownUnit value={hours} label="Heures" />
          <div className="text-wafa-gold font-playfair text-4xl sm:text-5xl font-bold mt-4 sm:mt-6 animate-pulse hidden sm:block">:</div>
          <CountdownUnit value={minutes} label="Minutes" />
          <div className="text-wafa-gold font-playfair text-4xl sm:text-5xl font-bold mt-4 sm:mt-6 animate-pulse">:</div>
          <CountdownUnit value={seconds} label="Secondes" />
        </div>
      </SectionWrapper>
    </section>
  )
}
