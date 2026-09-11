// src/components/sections/HospitalitySection.tsx
'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, Clock, Cpu, UtensilsCrossed, ArrowRight } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

interface ExperiencePillar {
  title: string
  subtitle: string
  description: string
  tag: string
  icon: React.ElementType
  accentColor: string
  glassClass: string
}

const PILLARS: ExperiencePillar[] = [
  {
    title: 'Arrivée & Briefing Pilotage',
    subtitle: 'Passage sous l\'Arche Porsche · Briefing Instructeurs Certifiés',
    description: 'Accueil solennel le long de l\'allée de pins du Domaine Neferis. Chaque invité VIP bénéficie d\'un briefing personnalisé sur l\'architecture 800V, la tenue de route électrique et les consignes dynamiques.',
    tag: 'PRE-DRIVE',
    icon: MapPin,
    accentColor: '#8B7355',
    glassClass: 'glass-heritage',
  },
  {
    title: 'Vagues de Conduite Dynamique',
    subtitle: '6 Vagues par Jour · 8 Véhicules Cayenne E4 sur Piste & SUV Avenue',
    description: 'Vivez l\'expérience de conduite électrique haute performance — silence absolu, couple instantané de 830 Nm et agilité tout-terrain lors du parcours #PorscheSUVExperience.',
    tag: 'DYNAMIC DRIVE',
    icon: Clock,
    accentColor: '#00B4C6',
    glassClass: 'glass-electric',
  },
  {
    title: 'Exposition Heritage × Future',
    subtitle: 'Musée Vivant · Archives Mécaniques & Projections Digitales',
    description: 'Immergez-vous dans le concept visuel : la pierre brute, le bois et les arches historiques du Domaine dialoguant avec la technologie de pointe, les surfaces numériques et l\'énergie lumineuse Porsche.',
    tag: 'IMMERSIVE',
    icon: Cpu,
    accentColor: '#6D8080',
    glassClass: 'glass',
  },
  {
    title: 'Salon d\'Honneur & Lounge VIP',
    subtitle: 'Mobilier Architectural Signature · Gastronomie & Networking',
    description: 'Retrouvez les représentants officiels Porsche Middle East & Africa et l\'équipe 2K Events dans un cadre raffiné inspiré du moodboard mobilier (canapés charbon, velours terracotta et finitions artisanales).',
    tag: 'HOSPITALITY',
    icon: UtensilsCrossed,
    accentColor: '#E0681C',
    glassClass: 'glass-terracotta',
  },
]

import { smoothScrollTo } from '@/lib/scroll'

export function HospitalitySection() {
  const scrollToConfirm = () => smoothScrollTo('#confirmer', -80, 0.95)

  return (
    <section id="hospitalite" className="relative py-24 md:py-32 bg-[#08090C] overflow-hidden border-t border-white/5">
      {/* Dual ambience */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[400px] bg-[#8B7355]/[0.05] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[#E0681C]/[0.05] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 carbon-pattern opacity-20 pointer-events-none" />

      <SectionWrapper className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#E0681C]/30 bg-[#E0681C]/10 backdrop-blur-md mb-4">
            <span className="w-2 h-2 rounded-full bg-[#E0681C]" />
            <span className="font-outfit text-[10px] font-bold uppercase tracking-[0.35em] text-[#F4F5F7]">
              HOSPITALITÉ PRESTIGE · 2K EVENTS × PORSCHE
            </span>
          </div>

          <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-wider mb-4 leading-tight">
            The <span className="text-gradient-terracotta italic">Domaine Neferis</span>
            <br />Experience
          </h2>
          <p className="font-sans text-sm md:text-base text-gray-300 leading-relaxed max-w-xl mx-auto">
            Une scénographie exclusive conçue par <strong>2K Events</strong> pour célébrer le lancement du Cayenne E4 Electric dans le cadre majestueux du Domaine Neferis.
          </p>
        </div>

        {/* 4 Pillars */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-14">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className={`group relative p-5 xs:p-6 sm:p-8 rounded-2xl sm:rounded-3xl ${pillar.glassClass} shadow-[0_15px_45px_rgba(0,0,0,0.6)] transition-all duration-300 overflow-hidden flex flex-col justify-between`}
              >
                {/* Hover glow */}
                <div
                  className="absolute top-0 right-0 w-36 h-36 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `${pillar.accentColor}20` }}
                />

                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span
                      className="font-mono text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{
                        color: pillar.accentColor,
                        background: `${pillar.accentColor}15`,
                        border: `1px solid ${pillar.accentColor}35`,
                      }}
                    >
                      {pillar.tag}
                    </span>

                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-inner"
                      style={{
                        background: `${pillar.accentColor}12`,
                        border: `1px solid ${pillar.accentColor}25`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: pillar.accentColor }} />
                    </div>
                  </div>

                  <h3 className="font-outfit font-black text-xl sm:text-2xl text-white uppercase tracking-wide mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-xs font-semibold mb-3" style={{ color: pillar.accentColor }}>
                    {pillar.subtitle}
                  </p>
                  <p className="font-sans text-sm text-gray-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-500 group-hover:text-gray-300 transition-colors">
                  <span>DOMAINE NEFERIS</span>
                  <span className="font-bold" style={{ color: pillar.accentColor }}>•</span>
                  <span>2K EVENTS × PME</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Banner matching Slide 5 */}
        <div className="max-w-4xl mx-auto rounded-2xl sm:rounded-3xl p-5 xs:p-6 sm:p-8 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 shadow-2xl bg-gradient-to-r from-[#17130F] via-[#0E1015] to-[#0A1519]">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-8 flex-shrink-0 flex items-center justify-center">
              <Image
                src="/2k.png"
                alt="2K Events Logo"
                width={64}
                height={30}
                className="object-contain brightness-125"
              />
            </div>
            <div>
              <p className="font-outfit font-bold text-sm sm:text-base text-white uppercase tracking-wider">
                Spaces are limited — RSVP now to secure your space
              </p>
              <p className="font-sans text-xs text-gray-400 mt-0.5">
                290 participants · 4 jours · 6 vagues par jour · 8 Cayenne E4 Electric
              </p>
            </div>
          </div>

          <button
            onClick={scrollToConfirm}
            className="flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-outfit font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg w-full sm:w-auto text-center"
            style={{
              background: 'linear-gradient(135deg, #E0681C 0%, #6D8080 100%)',
            }}
          >
            <span>RSVP · Sécuriser Ma Place</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </SectionWrapper>
    </section>
  )
}
