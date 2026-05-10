'use client'
import { GuestResponse } from '@/types/guest'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GuestQRCard } from '@/components/ui/GuestQRCard'
import { EVENT } from '@/lib/constants'

interface QRSectionProps {
  guest: GuestResponse
}

export function QRSection({ guest }: QRSectionProps) {
  return (
    <section className="py-20 bg-wafa-cream relative">
      <SectionWrapper className="container mx-auto px-4 flex flex-col items-center">
        <div className="text-center mb-10">
          <h2 className="font-playfair text-3xl font-bold text-wafa-dark mb-3">
            Votre Accès <span className="text-wafa-gold italic">Personnel</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="font-montserrat text-[10px] font-bold text-wafa-gold uppercase tracking-[0.2em]">{EVENT.dateLabel}</span>
            <div className="w-1 h-1 rounded-full bg-wafa-gold/30" />
            <span className="font-montserrat text-[10px] font-bold text-wafa-gold uppercase tracking-[0.2em]">18h00</span>
          </div>
          <p className="font-montserrat text-gray-600 text-sm max-w-sm mx-auto leading-relaxed">
            Veuillez présenter ce code lors de votre arrivée le <span className="font-bold text-wafa-dark">21 Mai</span> à partir de <span className="font-bold text-wafa-dark">18h</span>.
          </p>
        </div>

        <GuestQRCard guest={guest} />
      </SectionWrapper>
    </section>
  )
}
