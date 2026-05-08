'use client'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { StepCard } from '@/components/ui/StepCard'
import { JOURNEY_STEPS } from '@/lib/constants'

export function JourneySection() {
  return (
    <section className="section-padding bg-wafa-very-dark relative">
      <SectionWrapper className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
            Votre Parcours <span className="text-wafa-gold italic">Digital</span>
          </h2>
          <p className="font-montserrat text-white/60 max-w-2xl mx-auto">
            Une expérience fluide et sans contact, de votre invitation jusqu'à votre accueil.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-wafa-gold/20" />
          
          {JOURNEY_STEPS.map((step, i) => (
            <SectionWrapper key={i} delay={i * 0.1}>
              <StepCard
                number={step.number}
                title={step.title}
                description={step.description}
                icon={step.icon}
                isActive={i === 2} // highlight 'Confirmez'
              />
            </SectionWrapper>
          ))}
        </div>
      </SectionWrapper>
    </section>
  )
}
