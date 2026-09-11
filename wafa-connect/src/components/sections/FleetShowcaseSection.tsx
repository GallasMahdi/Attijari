'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PORSCHE_FLEET, PorscheModel } from '@/lib/constants'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { smoothScrollTo } from '@/lib/scroll'
import { Gauge, Zap, Battery, Timer, Wind, CheckCircle2, Activity, Leaf } from 'lucide-react'

export function FleetShowcaseSection() {
  const [selectedModel, setSelectedModel] = useState<PorscheModel>(PORSCHE_FLEET[0])
  const [isLaunching, setIsLaunching] = useState(false)
  const [launched, setLaunched] = useState(false)

  const handleDriveSimulation = () => {
    if (isLaunching) return
    setIsLaunching(true)
    setLaunched(false)

    setTimeout(() => {
      setIsLaunching(false)
      setLaunched(true)
      setTimeout(() => setLaunched(false), 3200)
    }, 1400)
  }

  const scrollToConfirm = () => smoothScrollTo('#confirmer', -80, 0.95)

  const isElectric = selectedModel.isElectric
  const primaryColor = selectedModel.accentColor

  return (
    <section id="flotte" className="relative py-24 md:py-32 bg-[#08090C] overflow-hidden border-t border-white/5">
      {/* Background radial atmosphere */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] blur-[150px] rounded-full pointer-events-none transition-all duration-700"
        style={{ background: `${primaryColor}12` }}
      />
      <div className="absolute inset-0 carbon-pattern opacity-25 pointer-events-none" />

      <SectionWrapper className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#00B4C6]/30 bg-[#00B4C6]/10 backdrop-blur-md mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00B4C6]" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#A8D5E2]">
              LINEUP OFFICIEL · 2K EVENTS × PORSCHE
            </span>
          </div>

          <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-wider mb-4">
            Experience the Cayenne{' '}
            <span className="text-gradient-electric italic">in a New Form</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-gray-300 leading-relaxed max-w-xl mx-auto">
            Trois expressions d'un même ADN. Le Cayenne E4 Electric en vedette — 8 véhicules de lancement sur piste.
          </p>
        </div>

        {/* Model Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12 max-w-2xl mx-auto">
          {PORSCHE_FLEET.map((car) => {
            const isSelected = selectedModel.id === car.id
            return (
              <button
                key={car.id}
                onClick={() => {
                  setSelectedModel(car)
                  setLaunched(false)
                }}
                className={`relative px-3.5 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-full font-outfit text-[10px] xs:text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  isSelected
                    ? 'text-white scale-105'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
                style={isSelected ? {
                  backgroundColor: `${car.accentColor}25`,
                  borderColor: car.accentColor,
                  boxShadow: `0 0 20px ${car.accentColor}50`,
                } : {}}
              >
                {car.name}
                {car.isElectric && (
                  <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-[#00B4C6] align-middle" />
                )}
                {isSelected && (
                  <motion.div
                    layoutId="fleet-active-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full"
                    style={{ background: car.accentColor, boxShadow: `0 0 8px ${car.accentColor}` }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Featured Vehicle Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedModel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto p-4 xs:p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#0E1015] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden"
          >
            {/* Ambient accent glow */}
            <div
              className="absolute -right-32 -top-32 w-96 h-96 blur-[120px] rounded-full pointer-events-none opacity-25 transition-all duration-700"
              style={{ background: primaryColor }}
            />

            {/* Left: Car Identity & Specs */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest font-mono"
                    style={{
                      backgroundColor: `${primaryColor}20`,
                      color: primaryColor,
                      border: `1px solid ${primaryColor}40`,
                    }}
                  >
                    {selectedModel.tag}
                  </span>
                  <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                    {selectedModel.category}
                  </span>
                  {selectedModel.isElectric && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#00B4C6]/10 border border-[#00B4C6]/30 text-[9px] font-bold text-[#A8D5E2] font-mono uppercase">
                      <Leaf className="w-2.5 h-2.5" /> FULL ELECTRIC
                    </span>
                  )}
                </div>

                <h3 className="font-outfit text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                  {selectedModel.name}
                </h3>
                <p className="mt-2 font-sans text-sm text-gray-400 italic">
                  &ldquo;{selectedModel.subtitle}&rdquo;
                </p>

                {/* Event units badge */}
                {selectedModel.eventUnits && (
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/8 text-xs font-mono text-gray-400">
                    <span className="font-bold text-white">{selectedModel.eventUnits}</span>
                    <span>véhicules sur piste au lancement</span>
                  </div>
                )}
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col">
                  <div className="flex items-center gap-2 mb-1" style={{ color: primaryColor }}>
                    <Zap size={15} />
                    <span className="font-sans text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                      Puissance
                    </span>
                  </div>
                  <span className="font-mono text-xl sm:text-2xl font-black text-white tracking-tight tabular-nums">
                    {selectedModel.power.split(' ')[0]}{' '}
                    <span className="text-xs font-bold" style={{ color: primaryColor }}>CH</span>
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono mt-0.5">{selectedModel.power}</span>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col">
                  <div className="flex items-center gap-2 mb-1" style={{ color: primaryColor }}>
                    <Timer size={15} />
                    <span className="font-sans text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                      0 — 100 KM/H
                    </span>
                  </div>
                  <span className="font-mono text-xl sm:text-2xl font-black text-white tracking-tight tabular-nums">
                    {selectedModel.acceleration.split(' ')[0]}{' '}
                    <span className="text-xs font-bold" style={{ color: primaryColor }}>sec</span>
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono mt-0.5">Instant torque</span>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col">
                  <div className="flex items-center gap-2 mb-1" style={{ color: primaryColor }}>
                    {selectedModel.isElectric ? <Battery size={15} /> : <Gauge size={15} />}
                    <span className="font-sans text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                      {selectedModel.isElectric ? 'Autonomie' : 'Vitesse Max'}
                    </span>
                  </div>
                  <span className="font-mono text-xl sm:text-2xl font-black text-white tracking-tight tabular-nums">
                    {selectedModel.isElectric ? selectedModel.range?.split(' ')[0] : selectedModel.topSpeed}
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono mt-0.5">
                    {selectedModel.isElectric ? selectedModel.range : 'Ligne droite'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col">
                  <div className="flex items-center gap-2 mb-1" style={{ color: primaryColor }}>
                    <Wind size={15} />
                    <span className="font-sans text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                      Couple Max
                    </span>
                  </div>
                  <span className="font-mono text-xl sm:text-2xl font-black text-white tracking-tight tabular-nums">
                    {selectedModel.torque}
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono mt-0.5">{selectedModel.highlight}</span>
                </div>
              </div>

              {/* Engine spec */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
                <span className="w-1.5 h-8 rounded-full" style={{ background: primaryColor }} />
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Architecture Motrice</p>
                  <p className="font-mono text-xs text-white font-medium">{selectedModel.engine}</p>
                </div>
              </div>
            </div>

            {/* Right: Drive Simulation */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center gap-6 p-6 sm:p-8 rounded-2xl bg-black/60 border border-white/10 relative">
              {/* Visual Gauge Arc */}
              <div className="w-full relative py-6 flex flex-col items-center justify-center">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50" cy="50" r="40"
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth="6" fill="none"
                    />
                    <motion.circle
                      cx="50" cy="50" r="40"
                      stroke={primaryColor}
                      strokeWidth="6" fill="none"
                      strokeDasharray="251.2"
                      animate={{
                        strokeDashoffset: isLaunching ? [251.2, 20, 251.2] : 80,
                      }}
                      transition={{
                        duration: isLaunching ? 1.2 : 0.6,
                        ease: 'easeInOut',
                      }}
                      strokeLinecap="round"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">
                      {isLaunching
                        ? 'MONTÉE EN PUISSANCE'
                        : launched
                        ? 'FULL POWER'
                        : isElectric
                        ? 'MOTEUR ÉLECTRIQUE'
                        : 'MOTEUR ACTIF'}
                    </span>
                    <span
                      className={`font-outfit text-3xl sm:text-4xl font-black tracking-tight transition-colors ${
                        isLaunching ? 'animate-pulse' : ''
                      }`}
                      style={{ color: isLaunching ? primaryColor : launched ? '#3D8B37' : '#ffffff' }}
                    >
                      {isLaunching ? (isElectric ? '830' : '700') : launched ? '100%' : isElectric ? '830' : '700'}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest font-mono" style={{ color: primaryColor }}>
                      {isElectric ? 'NM INSTANT' : 'NM COUPLE'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shift light indicators */}
              <div className="w-full flex flex-col gap-3">
                <div className="flex items-center justify-center gap-1.5 py-1 px-3 bg-black/40 border border-white/10 rounded-xl">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                    const isLit = isLaunching ? i <= 6 : launched ? true : i <= 2
                    const colorMap = [primaryColor, primaryColor, primaryColor, '#3D8B37', '#3D8B37', '#A8D5E2', '#ffffff', '#ffffff']
                    return (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full transition-all duration-150"
                        style={{
                          background: isLit ? colorMap[i] : 'rgba(255,255,255,0.06)',
                          boxShadow: isLit ? `0 0 8px ${colorMap[i]}` : 'none',
                        }}
                      />
                    )
                  })}
                </div>

                {/* Drive simulation button */}
                <button
                  onClick={handleDriveSimulation}
                  disabled={isLaunching}
                  className={`w-full py-4 px-6 rounded-xl font-sans font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2.5 border cursor-pointer`}
                  style={
                    isLaunching
                      ? { background: `${primaryColor}30`, borderColor: primaryColor, boxShadow: `0 0 35px ${primaryColor}60`, color: '#fff' }
                      : launched
                      ? { background: 'rgba(61,139,55,0.3)', borderColor: '#3D8B37', boxShadow: '0 0 25px rgba(61,139,55,0.4)', color: '#fff' }
                      : { background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.15)', color: '#fff' }
                  }
                >
                  {isLaunching ? (
                    <>
                      <Activity className="w-4 h-4 animate-spin" />
                      {isElectric ? 'ACCÉLÉRATION ÉLECTRIQUE SILENCIEUSE...' : 'MONTÉE EN PUISSANCE...'}
                    </>
                  ) : launched ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" style={{ color: '#3D8B37' }} />
                      SIMULATION TERMINÉE — PUISSANCE MAXIMALE !
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" style={{ color: primaryColor }} />
                      {isElectric ? 'Simuler le Départ Électrique' : 'Simuler la Puissance'}
                    </>
                  )}
                </button>

                {/* CTA */}
                <button
                  onClick={scrollToConfirm}
                  className="w-full py-4 px-6 rounded-xl font-sans font-bold text-xs sm:text-sm uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor} 0%, ${isElectric ? '#3D8B37' : '#D5001C'} 100%)`,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 30px ${primaryColor}80`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
                >
                  Piloter le {selectedModel.name} sur Piste
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Track Day Info */}
        <div className="mt-10 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: 'Vagues / Jour', value: '6', sub: 'Sessions organisées' },
            { label: 'Jours d\'Événement', value: '4', sub: 'Dates de lancement' },
            { label: 'Participants / Jour', value: '73', sub: 'Places limitées' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <p className="font-outfit text-3xl font-black text-white">{stat.value}</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#00B4C6] font-bold mt-1">{stat.label}</p>
              <p className="font-sans text-[10px] text-gray-500 mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </section>
  )
}
