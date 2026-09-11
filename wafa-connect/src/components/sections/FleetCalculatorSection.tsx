// src/components/sections/FleetCalculatorSection.tsx
'use client'
import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Zap, Users, Car, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

export function FleetCalculatorSection() {
  // Inputs from Slide 4 with default official values
  const [annualTarget, setAnnualTarget] = useState(29)
  const [experientialPercent, setExperientialPercent] = useState(30)
  const [conversionLeadToOrder, setConversionLeadToOrder] = useState(12)
  const [conversionParticipantToLead, setConversionParticipantToLead] = useState(25)
  const [eventDays, setEventDays] = useState(4)
  const [wavesPerDay, setWavesPerDay] = useState(6)
  const [eventFormat, setEventFormat] = useState<'Track' | 'Domaine Neferis Dynamic' | 'Lifestyle'>('Domaine Neferis Dynamic')

  // Reverse funnel calculations matching Slide 4 logic exactly
  const calculations = useMemo(() => {
    const ordersFromExperiential = Math.round((annualTarget * experientialPercent) / 100)
    const targetLeads = Math.round(ordersFromExperiential / (conversionLeadToOrder / 100))
    const targetParticipants = Math.round(targetLeads / (conversionParticipantToLead / 100))
    const participantsPerDay = Math.ceil(targetParticipants / eventDays)
    const participantsPerWave = Math.ceil(participantsPerDay / wavesPerDay)
    
    // Official fleet sizing rules from Slide 4
    const launchVehicles = Math.max(8, Math.ceil(participantsPerWave * 0.7))
    const instructorCars = 3

    return {
      ordersFromExperiential,
      targetLeads,
      targetParticipants,
      participantsPerDay,
      participantsPerWave,
      launchVehicles,
      instructorCars,
    }
  }, [annualTarget, experientialPercent, conversionLeadToOrder, conversionParticipantToLead, eventDays, wavesPerDay])

  return (
    <section id="simulateur" className="relative py-24 md:py-32 bg-[#08090C] overflow-hidden border-t border-white/5">
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#E0681C]/[0.05] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#6D8080]/[0.08] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 carbon-pattern opacity-20 pointer-events-none" />

      <SectionWrapper className="container mx-auto px-4 relative z-10">
        {/* Header matching Slide 4 */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#E0681C]/30 bg-[#E0681C]/10 backdrop-blur-md mb-4">
            <Calculator className="w-3.5 h-3.5 text-[#E0681C]" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#F4F5F7]">
              PORSCHE MIDDLE EAST & AFRICA · E4 LAUNCH TOOLKIT
            </span>
          </div>

          <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-wider mb-3">
            Fleet <span className="text-gradient-terracotta">Calculator</span>
          </h2>
          <p className="font-outfit italic text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            "Reverse funnel planning tool ensuring alignment between overall Cayenne E4 order intake targets, test-drive participants, and launch fleet allocation."
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-gray-500">
            <span className="w-2 h-2 rounded-full bg-[#6D8080]" />
            <span>PME / Experiential Marketing · Validation Tool</span>
            <span className="w-2 h-2 rounded-full bg-[#E0681C]" />
          </div>
        </div>

        {/* Main Simulator Card */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#0E1015] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden">
          {/* Clean hairline */}
          <div className="h-[2px] w-full bg-[#E0681C]" />

          <div className="p-4 xs:p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
            {/* Step 1: Target Funnel Planning Inputs */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded bg-[#E0681C] text-black font-mono font-bold text-xs">
                    STEP 01
                  </span>
                  <h3 className="font-outfit text-lg font-black text-white uppercase tracking-wider">
                    Objectif Commandes & Ratios de Conversion
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest hidden sm:inline">
                  Modèle : E4 (Cayenne)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Annual Target */}
                <div className="p-4 rounded-2xl bg-black/50 border border-white/5 flex flex-col justify-between">
                  <span className="font-sans text-xs text-gray-400 font-semibold mb-2">
                    Annual Order Intake Target
                  </span>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-outfit text-3xl font-black text-white">{annualTarget}</span>
                    <span className="font-mono text-[10px] text-gray-500 uppercase">Unités</span>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={60}
                    value={annualTarget}
                    onChange={(e) => setAnnualTarget(Number(e.target.value))}
                    className="w-full accent-[#E0681C] cursor-pointer"
                  />
                </div>

                {/* Experiential Share */}
                <div className="p-4 rounded-2xl bg-black/50 border border-white/5 flex flex-col justify-between">
                  <span className="font-sans text-xs text-gray-400 font-semibold mb-2">
                    % Part Expérientielle
                  </span>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-outfit text-3xl font-black text-[#E0681C]">{experientialPercent}%</span>
                    <span className="font-mono text-[10px] text-gray-500 uppercase">
                      = {calculations.ordersFromExperiential} Ventes
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={60}
                    step={5}
                    value={experientialPercent}
                    onChange={(e) => setExperientialPercent(Number(e.target.value))}
                    className="w-full accent-[#E0681C] cursor-pointer"
                  />
                </div>

                {/* Lead to Order % */}
                <div className="p-4 rounded-2xl bg-black/50 border border-white/5 flex flex-col justify-between">
                  <span className="font-sans text-xs text-gray-400 font-semibold mb-2">
                    Conversion Lead → Commande
                  </span>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-outfit text-3xl font-black text-[#6D8080]">{conversionLeadToOrder}%</span>
                    <span className="font-mono text-[10px] text-gray-500 uppercase">Historique PME</span>
                  </div>
                  <input
                    type="range"
                    min={8}
                    max={25}
                    value={conversionLeadToOrder}
                    onChange={(e) => setConversionLeadToOrder(Number(e.target.value))}
                    className="w-full accent-[#6D8080] cursor-pointer"
                  />
                </div>

                {/* Participant to Lead % */}
                <div className="p-4 rounded-2xl bg-black/50 border border-white/5 flex flex-col justify-between">
                  <span className="font-sans text-xs text-gray-400 font-semibold mb-2">
                    Conversion Participant → Lead
                  </span>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-outfit text-3xl font-black text-[#E0681C]">{conversionParticipantToLead}%</span>
                    <span className="font-mono text-[10px] text-gray-500 uppercase">Moyenne Régionale</span>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={40}
                    value={conversionParticipantToLead}
                    onChange={(e) => setConversionParticipantToLead(Number(e.target.value))}
                    className="w-full accent-[#E0681C] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Reverse Funnel Key Outcomes Display */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-2xl bg-black/80 border border-white/10 text-center">
              <div>
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-1">
                  OBJECTIF VENTES EXPÉRIENTIELLES
                </span>
                <span className="font-outfit text-4xl font-black text-[#E0681C]">
                  {calculations.ordersFromExperiential}
                </span>
                <span className="font-sans text-xs text-gray-400 block mt-1">Commandes fermes E4</span>
              </div>

              <div className="border-y sm:border-y-0 sm:border-x border-white/10 py-4 sm:py-0">
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-1">
                  TARGET # LEADS QUALIFIÉS
                </span>
                <span className="font-outfit text-4xl font-black text-white">
                  {calculations.targetLeads}
                </span>
                <span className="font-sans text-xs text-gray-400 block mt-1">Prospects chauds identifiés</span>
              </div>

              <div>
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-1">
                  TARGET # PARTICIPANTS TOTAUX
                </span>
                <span className="font-outfit text-4xl font-black text-[#6D8080]">
                  {calculations.targetParticipants}
                </span>
                <span className="font-sans text-xs text-gray-400 block mt-1">Invités VIP à accueillir</span>
              </div>
            </div>

            {/* Step 2: Event Format & Schedule */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded bg-[#6D8080] text-white font-mono font-bold text-xs">
                    STEP 02
                  </span>
                  <h3 className="font-outfit text-lg font-black text-white uppercase tracking-wider">
                    Format de l'Événement & Répartition des Vagues
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-[#E0681C] uppercase tracking-widest font-bold">
                  Domaine Neferis · 4 Jours
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-black/50 border border-white/5">
                  <span className="font-sans text-xs text-gray-400 font-semibold mb-2 block">
                    Format d'Événement
                  </span>
                  <select
                    value={eventFormat}
                    onChange={(e: any) => setEventFormat(e.target.value)}
                    className="w-full bg-[#14171F] border border-white/15 rounded-xl px-3 py-2 text-white font-sans text-xs focus:outline-none focus:border-[#E0681C]"
                  >
                    <option value="Domaine Neferis Dynamic">Domaine Neferis Dynamic (Off-Road + Piste)</option>
                    <option value="Track">Track Day Circuit Pur</option>
                    <option value="Lifestyle">Expérience Lifestyle & Domaine</option>
                  </select>
                </div>

                <div className="p-4 rounded-2xl bg-black/50 border border-white/5">
                  <span className="font-sans text-xs text-gray-400 font-semibold mb-2 block">
                    Nombre de Jours d'Événement
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="font-outfit text-2xl font-black text-white">{eventDays} Jours</span>
                    <span className="font-mono text-[10px] text-gray-500">18 - 21 Juin</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/50 border border-white/5">
                  <span className="font-sans text-xs text-gray-400 font-semibold mb-2 block">
                    Vagues de Conduite / Jour
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="font-outfit text-2xl font-black text-white">{wavesPerDay} Vagues</span>
                    <span className="font-mono text-[10px] text-gray-500">Toutes les 1h30</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/50 border border-white/5">
                  <span className="font-sans text-xs text-gray-400 font-semibold mb-2 block">
                    Participants par Jour
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="font-outfit text-2xl font-black text-[#E0681C]">{calculations.participantsPerDay}</span>
                    <span className="font-mono text-[10px] text-gray-500">~{calculations.participantsPerWave}/vague</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Vehicle Fleet Calculation Outcome */}
            <div className="p-4 xs:p-6 rounded-2xl bg-gradient-to-r from-[#14171F] via-[#0E1015] to-[#14171F] border border-[#E0681C]/40 shadow-xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-[#E0681C] text-black font-mono font-bold text-[10px]">
                      STEP 03 · FLEET SIZING
                    </span>
                    <h4 className="font-outfit text-xl font-black text-white uppercase tracking-wider">
                      Flotte Officielle Requise pour le Lancement
                    </h4>
                  </div>
                  <p className="font-sans text-xs text-gray-300 max-w-xl">
                    Basé sur les données de conversion et le nombre de participants par vague, voici la dotation automobile officielle validée par le bureau régional Porsche Middle East & Africa (PME).
                  </p>
                </div>

                {/* Fleet counter badges */}
                <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-4 w-full md:w-auto flex-shrink-0">
                  <div className="px-4 sm:px-5 py-3 rounded-2xl bg-black/60 border border-[#E0681C]/60 text-center shadow-[0_0_20px_rgba(224, 104, 28,0.25)] flex-1 xs:flex-initial">
                    <span className="font-mono text-[9px] text-[#E0681C] uppercase tracking-widest block font-bold">
                      CAYENNE E4 ELECTRIC
                    </span>
                    <span className="font-outfit text-3xl font-black text-white">
                      {calculations.launchVehicles}
                    </span>
                    <span className="font-sans text-[10px] text-gray-400 block mt-0.5">Véhicules Essais</span>
                  </div>

                  <div className="px-4 sm:px-5 py-3 rounded-2xl bg-black/60 border border-[#6D8080]/80 text-center shadow-[0_0_20px_rgba(109, 128, 128,0.25)] flex-1 xs:flex-initial">
                    <span className="font-mono text-[9px] text-[#6D8080] uppercase tracking-widest block font-bold">
                      INSTRUCTOR CARS
                    </span>
                    <span className="font-outfit text-3xl font-black text-white">
                      {calculations.instructorCars}
                    </span>
                    <span className="font-sans text-[10px] text-gray-400 block mt-0.5">Voitures d'Appui</span>
                  </div>
                </div>
              </div>

              {/* Official Safe Note from Slide 4 */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-400 gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E0681C]" />
                  <span>Validation PME/Experiential Marketing Toolkit E4 · Reverse Funnel Conforme</span>
                </div>
                <span className="text-gray-500">
                  Deadline validation : 8 Juin 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  )
}
