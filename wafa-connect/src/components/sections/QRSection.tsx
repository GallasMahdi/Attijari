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
    <section className="py-24 bg-[#08090C] relative border-t border-white/5">
      <SectionWrapper className="container mx-auto px-4 flex flex-col items-center">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/20 backdrop-blur-md mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-emerald-400">
              INVITATION VIP VALIDÉE
            </span>
          </div>

          <h2 className="font-outfit text-3xl sm:text-4xl font-black text-white uppercase tracking-wider mb-2">
            Votre Invitation <span className="text-gradient-terracotta italic">VIP Exclusive</span>
          </h2>
          
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="font-mono text-[11px] font-bold text-[#E0681C] uppercase tracking-widest">{EVENT.dateLabel}</span>
            <div className="w-1 h-1 rounded-full bg-[#E0681C]" />
            <span className="font-mono text-[11px] font-bold text-gray-300 uppercase tracking-widest">{EVENT.timeLabel}</span>
          </div>

          <p className="font-sans text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            Présentez cette invitation officielle avec QR Code lors de votre arrivée au salon d'honneur 2K Events pour accéder à l'exposition privée et assister à la révélation mondiale de la nouvelle Porsche.
          </p>
        </div>

        <GuestQRCard guest={guest} />
      </SectionWrapper>
    </section>
  )
}

