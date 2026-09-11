// src/components/sections/JourneySection.tsx
'use client'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { StepCard } from '@/components/ui/StepCard'
import { JOURNEY_STEPS } from '@/lib/constants'

export function JourneySection() {
  return (
    <section className="py-20 md:py-28 bg-[#08090C] relative border-t border-white/5">
      <SectionWrapper className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] mb-2 block text-[#E0681C]">
            PARCOURS D'ACCRÉDITATION OFFICIEL
          </span>
          <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-wider mb-4">
            Votre Parcours <span className="text-gradient-terracotta italic">VIP</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            De votre notification exclusive jusqu'au jour J au Domaine Neferis — 4 étapes simples pour vivre l'avènement du Cayenne E4 Electric.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector Line — Terracotta to Mystic Green */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5"
            style={{ background: 'linear-gradient(90deg, rgba(224, 104, 28,0.1), rgba(224, 104, 28,0.6), rgba(109, 128, 128,0.6), rgba(109, 128, 128,0.1))' }}
          />

          {JOURNEY_STEPS.map((step, i) => (
            <SectionWrapper key={i} delay={i * 0.1}>
              <StepCard
                number={step.number}
                title={step.title}
                description={step.description}
                icon={step.icon}
                isActive={i === 2}
              />
            </SectionWrapper>
          ))}
        </div>
      </SectionWrapper>
    </section>
  )
}
