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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#6D8080]/30 bg-[#6D8080]/10 backdrop-blur-md mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E0681C]" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#6D8080]">
              LINEUP OFFICIEL · CAYENNE E4
            </span>
          </div>

          <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-wider mb-4">
            Experience the Cayenne{' '}
            <span className="text-gradient-terracotta italic">in a New Form</span>
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
                    ? 'text-white bg-[#E0681C]/20 border-[#E0681C] shadow-[0_0_20px_rgba(224,104,28,0.3)] scale-105'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {car.name}
                {car.isElectric && (
                  <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-[#E0681C] align-middle" />
                )}
                {isSelected && (
                  <motion.div
                    layoutId="fleet-active-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full bg-[#E0681C] shadow-[0_0_8px_#E0681C]"
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
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest font-mono bg-[#E0681C]/15 text-[#E0681C] border border-[#E0681C]/30"
                  >
                    {selectedModel.tag}
                  </span>
                  <span className="font-mono text-xs text-[#6D8080] uppercase tracking-widest">
                    {selectedModel.category}
                  </span>
                  {selectedModel.isElectric && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#6D8080]/15 border border-[#6D8080]/30 text-[9px] font-bold text-gray-200 font-mono uppercase">
                      <Leaf className="w-2.5 h-2.5 text-[#E0681C]" /> FULL ELECTRIC
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
                  <div className="flex items-center gap-2 mb-1 text-[#E0681C]">
                    <Zap size={15} />
                    <span className="font-sans text-[10px] uppercase tracking-wider text-[#6D8080] font-semibold">
                      Puissance
                    </span>
                  </div>
                  <span className="font-mono text-xl sm:text-2xl font-black text-white tracking-tight tabular-nums">
                    {selectedModel.power.split(' ')[0]}{' '}
                    <span className="text-xs font-bold text-[#E0681C]">CH</span>
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono mt-0.5">{selectedModel.power}</span>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col">
                  <div className="flex items-center gap-2 mb-1 text-[#E0681C]">
                    <Timer size={15} />
                    <span className="font-sans text-[10px] uppercase tracking-wider text-[#6D8080] font-semibold">
                      0 — 100 KM/H
                    </span>
                  </div>
                  <span className="font-mono text-xl sm:text-2xl font-black text-white tracking-tight tabular-nums">
                    {selectedModel.acceleration.split(' ')[0]}{' '}
                    <span className="text-xs font-bold text-[#E0681C]">sec</span>
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono mt-0.5">Instant torque</span>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col">
                  <div className="flex items-center gap-2 mb-1 text-[#E0681C]">
                    {selectedModel.isElectric ? <Battery size={15} /> : <Gauge size={15} />}
                    <span className="font-sans text-[10px] uppercase tracking-wider text-[#6D8080] font-semibold">
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
                  <div className="flex items-center gap-2 mb-1 text-[#E0681C]">
                    <Wind size={15} />
                    <span className="font-sans text-[10px] uppercase tracking-wider text-[#6D8080] font-semibold">
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
                <span className="w-1.5 h-8 rounded-full bg-[#E0681C]" />
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-wider text-[#6D8080] font-semibold">Architecture Motrice</p>
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
                      strokeWidth="5" fill="none"
                    />
                    <motion.circle
                      cx="50" cy="50" r="40"
                      stroke="#E0681C"
                      strokeWidth="5" fill="none"
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
                    <span className="text-[10px] font-mono tracking-widest text-[#6D8080] uppercase">
                      {isLaunching
                        ? 'MONTÉE EN PUISSANCE'
                        : launched
                        ? 'FULL POWER'
                        : isElectric
                        ? 'PROPULSION E4'
                        : 'MOTEUR ACTIF'}
                    </span>
                    <span
                      className={`font-outfit text-3xl sm:text-4xl font-black tracking-tight transition-colors ${
                        isLaunching ? 'animate-pulse text-[#E0681C]' : 'text-white'
                      }`}
                    >
                      {isLaunching ? (isElectric ? '830' : '700') : launched ? '100%' : isElectric ? '830' : '700'}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-[#E0681C]">
                      {isElectric ? 'NM INSTANTANÉ' : 'NM COUPLE'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status indicators */}
              <div className="w-full flex flex-col gap-3">
                <div className="flex items-center justify-center gap-2 py-1.5 px-3 bg-black/40 border border-white/10 rounded-xl">
                  {[0, 1, 2, 3, 4, 5].map((i) => {
                    const isLit = isLaunching ? i <= 5 : launched ? true : i <= 2
                    return (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full transition-all duration-150"
                        style={{
                          background: isLit ? (i < 4 ? '#E0681C' : '#FFFFFF') : 'rgba(255,255,255,0.08)',
                          boxShadow: isLit ? '0 0 8px rgba(224,104,28,0.5)' : 'none',
                        }}
                      />
                    )
                  })}
                </div>

                {/* Drive simulation button */}
                <button
                  onClick={handleDriveSimulation}
                  disabled={isLaunching}
                  className={`w-full py-3.5 px-6 rounded-xl font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2.5 border cursor-pointer ${
                    isLaunching
                      ? 'bg-[#E0681C]/20 border-[#E0681C] text-white'
                      : launched
                      ? 'bg-white/10 border-white/30 text-white'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:text-white hover:border-white/25'
                  }`}
                >
                  {isLaunching ? (
                    <>
                      <Activity className="w-4 h-4 animate-spin text-[#E0681C]" />
                      {isElectric ? 'ACCÉLÉRATION ÉLECTRIQUE SILENCIEUSE...' : 'MONTÉE EN PUISSANCE...'}
                    </>
                  ) : launched ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#E0681C]" />
                      PUISSANCE MAXIMALE DÉPLOYÉE
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-[#E0681C]" />
                      {isElectric ? 'Tester l\'Accélération E4' : 'Tester la Puissance'}
                    </>
                  )}
                </button>

                {/* CTA */}
                <button
                  onClick={scrollToConfirm}
                  className="w-full py-4 px-6 rounded-xl font-sans font-bold text-xs sm:text-sm uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer bg-[#E0681C] hover:bg-[#ff7a26] shadow-[0_0_25px_rgba(224,104,28,0.35)]"
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
            { label: 'Accès Exclusif', value: 'VIP', sub: 'Sur invitation nominative' },
            { label: 'Jours d\'Événement', value: '4', sub: 'Dates de lancement' },
            { label: 'Invités d\'Honneur', value: '290', sub: 'Capacité prestige' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <p className="font-outfit text-3xl font-black text-white">{stat.value}</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#6D8080] font-bold mt-1">{stat.label}</p>
              <p className="font-sans text-[10px] text-gray-500 mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </section>
  )
}
