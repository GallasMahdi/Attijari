// src/components/sections/CayenneExperienceSection.tsx
'use client'
import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { smoothScrollTo } from '@/lib/scroll'
import {
  Zap, Mountain, Wind, Trophy, ArrowRight,
  Gauge, Timer, BatteryCharging
} from 'lucide-react'

const EXPERIENCES = [
  {
    id: 'off-road',
    tag: 'TERRAIN 01',
    title: "Avenue des Pins",
    subtitle: 'Off-Road SUV Course',
    description:
      "Longez l'allée séculaire de pins méditerranéens du Domaine Neferis au volant du Cayenne E4. La transmission intégrale à 4 moteurs électriques domine chaque ornière, chaque dévers, chaque texture de sol.",
    icon: Mountain,
    accent: '#6D8080',
    glow: 'rgba(109,128,128,0.2)',
    bg: 'rgba(109,128,128,0.06)',
    border: 'rgba(109,128,128,0.2)',
    stat: { label: 'Couple disponible', value: '830 Nm', sub: 'dès 0 tr/min' },
  },
  {
    id: 'performance',
    tag: 'TERRAIN 02',
    title: "Piste Dynamique",
    subtitle: 'High-Performance Track',
    description:
      "Expérimentez les 517 CH de propulsion électrique sur la piste haute performance du Domaine. Passage de 0 à 100 km/h en 4,0 secondes — dans un silence saisissant que seul le Cayenne E4 peut offrir.",
    icon: Gauge,
    accent: '#E0681C',
    glow: 'rgba(224,104,28,0.25)',
    bg: 'rgba(224,104,28,0.08)',
    border: 'rgba(224,104,28,0.3)',
    stat: { label: '0 — 100 km/h', value: '4.0 s', sub: '517 CH · 380 kW' },
  },
  {
    id: 'recharge',
    tag: 'TERRAIN 03',
    title: "Hub 800V Ultra-Rapide",
    subtitle: 'Charging Technology Demo',
    description:
      "Vivez la démonstration de recharge ultra-rapide 270 kW DC en conditions réelles. En 21 minutes, le Cayenne E4 récupère 80% d'autonomie — une révolution silencieuse face au moteur thermique.",
    icon: BatteryCharging,
    accent: '#E0681C',
    glow: 'rgba(224,104,28,0.25)',
    bg: 'rgba(224,104,28,0.08)',
    border: 'rgba(224,104,28,0.3)',
    stat: { label: 'Recharge 10→80%', value: '21 min', sub: '800V · 270 kW DC' },
  },
  {
    id: 'lounge',
    tag: 'TERRAIN 04',
    title: "Cour d'Honneur VIP",
    subtitle: 'Reveal & Lounge Prestige',
    description:
      "Dévoilement officiel du Cayenne E4 dans la Cour d'Honneur du Domaine Neferis. Networking avec les représentants Porsche Middle East & Africa, gastronomie fine et remise de votre pass accréditation.",
    icon: Trophy,
    accent: '#6D8080',
    glow: 'rgba(109,128,128,0.2)',
    bg: 'rgba(109,128,128,0.06)',
    border: 'rgba(109,128,128,0.2)',
    stat: { label: 'Invités VIP', value: '290', sub: 'Accréditation exclusive' },
  },
]

const COUNTERS = [
  { value: 517,  suffix: ' CH',  label: 'Puissance Totale',  sub: '380 kW combinés',  icon: Zap,            color: '#E0681C' },
  { value: 830,  suffix: ' Nm',  label: 'Couple Instantané', sub: 'Dès 0 tr/min',     icon: Wind,           color: '#FFFFFF' },
  { value: 4,    suffix: '.0 s', label: '0 — 100 km/h',      sub: 'En silence total', icon: Timer,          color: '#6D8080' },
  { value: 270,  suffix: ' kW',  label: 'Recharge DC Ultra', sub: 'Architecture 800V',icon: BatteryCharging,color: '#E0681C' },
]

function AnimatedCounter({ target, suffix, trigger }: { target: number; suffix: string; trigger: boolean }) {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let start = 0
    const duration = 1400
    const step = 16
    const increment = target / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { setCurrent(target); clearInterval(timer) }
      else { setCurrent(Math.floor(start)) }
    }, step)
    return () => clearInterval(timer)
  }, [trigger, target])
  return <span>{current}{suffix}</span>
}

export function CayenneExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { margin: '-10%', once: true })
  const [activeCard, setActiveCard] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const id = setInterval(() => setActiveCard(p => (p + 1) % EXPERIENCES.length), 4000)
    return () => clearInterval(id)
  }, [isInView])

  const active = EXPERIENCES[activeCard]

  return (
    <section ref={sectionRef} id="experience" className="relative bg-[#08090C] overflow-hidden py-24 sm:py-32">
      {/* Ambient glow */}
      <motion.div
        key={active.id}
        animate={{ background: `radial-gradient(ellipse 60% 40% at 50% 60%, ${active.glow} 0%, transparent 70%)` }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 pointer-events-none"
      />
      <div className="absolute inset-0 carbon-pattern opacity-20 pointer-events-none" />

      <SectionWrapper className="container mx-auto px-4 sm:px-6 xl:px-20 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#E0681C] animate-ping flex-shrink-0" />
            <p className="font-outfit text-[10px] tracking-[0.45em] uppercase text-[#E0681C] font-bold">
              CE QUE VOUS ALLEZ VIVRE · CAYENNE E4
            </p>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-outfit font-black text-white leading-[0.92] uppercase" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}>
              Quatre Terrains.<br />
              <span className="text-gradient-terracotta">Une Conduite.</span>
            </h2>
            <p className="font-sans text-sm text-gray-400 leading-relaxed max-w-md lg:text-right">
              Chaque invité VIP vivra un parcours d'expérience unique — conçu pour révéler
              chaque facette du Cayenne E4 Electric dans le cadre exceptionnel du Domaine Neferis.
            </p>
          </div>
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-6 xl:gap-10 items-start mb-16">
          {/* Active card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.3, 1] }}
              className="relative rounded-3xl overflow-hidden border p-8 sm:p-10 min-h-[340px] flex flex-col justify-between"
              style={{
                background: `linear-gradient(135deg, ${active.bg} 0%, rgba(14,16,21,0.92) 100%)`,
                borderColor: active.border,
                boxShadow: `0 0 60px ${active.glow}, 0 24px 60px rgba(0,0,0,0.7)`,
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[9px] uppercase tracking-[0.35em] font-bold px-3 py-1 rounded-full" style={{ color: active.accent, background: active.bg, border: `1px solid ${active.border}` }}>
                  {active.tag}
                </span>
                <active.icon className="w-6 h-6 opacity-50" style={{ color: active.accent }} />
              </div>
              <div className="flex-1">
                <h3 className="font-outfit font-black text-white uppercase leading-tight mb-1" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                  {active.title}
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-widest mb-6" style={{ color: active.accent }}>{active.subtitle}</p>
                <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">{active.description}</p>
              </div>
              <div className="mt-8 inline-flex items-center gap-4 px-5 py-3 rounded-2xl self-start" style={{ background: active.bg, border: `1px solid ${active.border}` }}>
                <div>
                  <span className="font-outfit font-black text-2xl block leading-none" style={{ color: active.accent }}>{active.stat.value}</span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400 mt-0.5 block">{active.stat.sub}</span>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <span className="font-outfit text-xs font-bold text-white uppercase tracking-wide">{active.stat.label}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Card selector */}
          <div className="flex flex-col gap-3">
            {EXPERIENCES.map((exp, i) => (
              <motion.button
                key={exp.id}
                onClick={() => setActiveCard(i)}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                className="relative text-left rounded-2xl p-4 transition-all duration-300 cursor-pointer group overflow-hidden"
                style={{
                  background: activeCard === i ? exp.bg : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${activeCard === i ? exp.border : 'rgba(255,255,255,0.06)'}`,
                  boxShadow: activeCard === i ? `0 0 20px ${exp.glow}` : 'none',
                }}
              >
                {activeCard === i && (
                  <motion.div key={`bar-${exp.id}`} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 4, ease: 'linear' }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] origin-left" style={{ background: exp.accent }} />
                )}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{ background: activeCard === i ? exp.bg : 'rgba(255,255,255,0.04)', border: `1px solid ${activeCard === i ? exp.border : 'rgba(255,255,255,0.08)'}` }}>
                    <exp.icon className="w-4 h-4 transition-colors duration-300" style={{ color: activeCard === i ? exp.accent : '#6b7280' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-outfit text-sm font-black uppercase tracking-wide transition-colors duration-300" style={{ color: activeCard === i ? '#fff' : '#9ca3af' }}>
                      {exp.title}
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-gray-500 truncate">{exp.tag} · {exp.stat.value}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0" style={{ color: exp.accent }} />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Performance counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {COUNTERS.map((c) => (
            <div key={c.label} className="p-5 rounded-2xl text-center hover:border-white/15 transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <c.icon className="w-4 h-4 mx-auto mb-3 opacity-60" style={{ color: c.color }} />
              <div className="font-outfit font-black text-2xl sm:text-3xl leading-none mb-1" style={{ color: c.color }}>
                <AnimatedCounter target={c.value} suffix={c.suffix} trigger={isInView} />
              </div>
              <p className="font-outfit text-xs font-bold text-white uppercase tracking-wide mb-0.5">{c.label}</p>
              <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">{c.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-white/[0.08]"
        >
          <div>
            <p className="font-outfit font-black text-white text-lg uppercase tracking-wide mb-1">Votre place dans cette expérience</p>
            <p className="font-sans text-sm text-gray-400">290 invités VIP · 4 jours d'essais · Domaine Neferis, Tunisie</p>
          </div>
          <button
            onClick={() => smoothScrollTo('#confirmer', -70, 0.9)}
            className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-outfit font-black text-xs uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer shadow-xl overflow-hidden flex-shrink-0 bg-[#E0681C] hover:bg-[#ff7a26] shadow-[0_0_25px_rgba(224,104,28,0.35)]"
          >
            <span className="relative z-10">Sécuriser Mon Expérience · RSVP</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </SectionWrapper>
    </section>
  )
}
