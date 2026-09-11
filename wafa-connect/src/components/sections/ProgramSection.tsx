// src/components/sections/ProgramSection.tsx
'use client'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { TimelineItem } from '@/components/ui/TimelineItem'
import { PROGRAM } from '@/lib/constants'

export function ProgramSection() {
  return (
    <section id="programme" className="py-24 md:py-32 bg-[#08090C] relative overflow-hidden border-t border-white/5">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#E0681C]/[0.05] blur-[150px] rounded-full pointer-events-none" />

      <SectionWrapper className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#E0681C]/30 bg-[#E0681C]/10 backdrop-blur-md mb-4">
            <span className="w-2 h-2 rounded-full bg-[#E0681C]" />
            <span className="font-outfit text-[10px] font-bold uppercase tracking-[0.35em] text-[#F4F5F7]">
              DOMAINE NEFERIS · PROGRAMME DE LA SOIRÉE VIP
            </span>
          </div>

          <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-wider mb-4">
            Déroulé de la <span className="text-gradient-terracotta italic">Soirée d'Excellence</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            De l'accueil VIP sur le tapis rouge au salon d'honneur et aux essais dynamiques sur l'avenue dédiée.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Center Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#E0681C]/10 via-[#E0681C]/50 to-[#6D8080]/10 -translate-x-1/2 timeline-line animated" />

          {/* Vertical Left Line for Mobile */}
          <div className="md:hidden absolute left-[27px] sm:left-[35px] top-0 bottom-0 w-px bg-[#E0681C]/30" />

          <div className="flex flex-col">
            {PROGRAM.map((item, i) => (
              <TimelineItem
                key={i}
                index={i}
                time={item.time}
                label={item.label}
                sublabel={item.sublabel}
                icon={item.icon}
                highlight={item.highlight}
              />
            ))}
          </div>
        </div>
      </SectionWrapper>
    </section>
  )
}
