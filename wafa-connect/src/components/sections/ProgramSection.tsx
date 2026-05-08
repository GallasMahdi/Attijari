'use client'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { TimelineItem } from '@/components/ui/TimelineItem'
import { PROGRAM } from '@/lib/constants'
import { DiamondPattern } from '@/components/ui/DiamondPattern'

export function ProgramSection() {
  return (
    <section id="programme" className="section-padding bg-wafa-very-dark relative overflow-hidden">
      <DiamondPattern opacity={0.03} color="#ffffff" />
      
      <SectionWrapper className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 relative">
          {/* Radial glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
            <div className="w-[400px] h-[150px] rounded-full bg-wafa-gold/5 blur-3xl" />
          </div>

          {/* Ornamental line + diamond */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-wafa-gold/60" />
            <svg width="10" height="10" viewBox="0 0 12 12" className="text-wafa-gold fill-current rotate-45">
              <rect x="1" y="1" width="10" height="10" />
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-wafa-gold/60" />
          </div>

          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
            <span className="relative inline-block">
              Le <span className="text-wafa-gold">Programme</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 8"
                preserveAspectRatio="none"
                height="8"
              >
                <path
                  d="M0 6 Q50 0 100 4 Q150 8 200 2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  className="text-wafa-gold/40"
                />
              </svg>
            </span>
          </h2>
          <p className="font-montserrat text-wafa-gold/80 max-w-2xl mx-auto uppercase tracking-widest text-sm">
            Déroulé de la soirée
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Center Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-wafa-gold/20 -translate-x-1/2 timeline-line animated" />
          
          {/* Vertical Left Line for Mobile */}
          <div className="md:hidden absolute left-[35px] top-0 bottom-0 w-px bg-wafa-gold/20" />

          <div className="flex flex-col">
            {PROGRAM.map((item, i) => (
              <TimelineItem
                key={i}
                index={i}
                time={item.time}
                label={item.label}
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
