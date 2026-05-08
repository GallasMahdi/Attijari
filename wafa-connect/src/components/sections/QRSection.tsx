'use client'
import { GuestResponse } from '@/types/guest'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GuestQRCard } from '@/components/ui/GuestQRCard'

interface QRSectionProps {
  guest: GuestResponse
}

export function QRSection({ guest }: QRSectionProps) {
  return (
    <section className="py-20 bg-wafa-very-dark relative">
      <SectionWrapper className="container mx-auto px-4 flex flex-col items-center">
        <div className="text-center mb-10">
          <h2 className="font-playfair text-3xl font-bold text-white mb-2">
            Votre Accès <span className="text-wafa-gold italic">Personnel</span>
          </h2>
          <p className="font-montserrat text-white/60 text-sm">
            Veuillez présenter ce code lors de votre arrivée à l'événement.
          </p>
        </div>

        <GuestQRCard guest={guest} />
      </SectionWrapper>
    </section>
  )
}
