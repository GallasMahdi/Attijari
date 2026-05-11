'use client'
import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GlassCard } from '@/components/ui/GlassCard'
import { GoldDivider } from '@/components/ui/GoldDivider'

export function AboutSection() {
  return (
    <section
      id="concept"
      className="pt-4 md:pt-10 pb-10 md:pb-20 relative bg-white z-10"
    >
      <SectionWrapper className="container mx-auto px-4">

        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-16">

          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-wafa-dark mb-4 md:mb-6">
            L'Excellence <span className="text-wafa-gold italic">Réinventée</span>
          </h2>

          <GoldDivider className="mb-5 md:mb-8" />

          <p className="font-montserrat text-base md:text-lg text-gray-700 leading-relaxed">
            Plus qu'un bâtiment, le nouveau siège d'Attijari Assurance incarne notre vision
            d'avenir : moderne, innovante et profondément ancrée dans nos valeurs de
            proximité et de confiance. Un joyau architectural conçu pour offrir la meilleure
            expérience à nos partenaires et collaborateurs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">

          {[
            {
              title: "Innovation",
              desc: "Des espaces repensés pour favoriser la collaboration et l'agilité."
            },
            {
              title: "Durabilité",
              desc: "Un bâtiment éco-responsable certifié aux normes internationales."
            },
            {
              title: "Proximité",
              desc: "Un emplacement stratégique pour mieux vous servir au quotidien."
            }
          ].map((feature, i) => (

            <SectionWrapper key={i} delay={i * 0.1}>

              <GlassCard
                hoverable
                className="h-full flex flex-col items-center text-center"
              >

                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-wafa-gold/10 border border-wafa-gold/30 flex items-center justify-center mb-4 md:mb-6">
                  <span className="font-playfair text-xl md:text-2xl text-wafa-gold">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="font-montserrat font-bold text-lg md:text-xl text-wafa-dark mb-3 md:mb-4">
                  {feature.title}
                </h3>

                <p className="font-montserrat text-sm md:text-sm text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>

              </GlassCard>

            </SectionWrapper>

          ))}

        </div>

      </SectionWrapper>
    </section>
  )
}