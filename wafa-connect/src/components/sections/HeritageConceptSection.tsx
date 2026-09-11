// src/components/sections/HeritageConceptSection.tsx
'use client'
import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { smoothScrollTo } from '@/lib/scroll'
import { Sparkles, Layers, Landmark, Zap, ArrowRight, Eye, Armchair, DoorOpen } from 'lucide-react'

export function HeritageConceptSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const [activeTab, setActiveTab] = useState<'silhouette' | 'lounge' | 'entrance'>('silhouette')

  return (
    <section
      id="concept"
      ref={ref}
      className="relative py-24 md:py-32 bg-[#06070A] overflow-hidden border-t border-white/5"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-0 w-[550px] h-[500px] bg-[#6D8080]/[0.05] blur-[170px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[550px] h-[500px] bg-[#E0681C]/[0.05] blur-[170px] rounded-full pointer-events-none" />

      <SectionWrapper className="container mx-auto px-4 relative z-10">
        {/* Section Eyebrow & Title */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#6D8080]/30 bg-black/60 backdrop-blur-md mb-6 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6D8080]" />
            <span className="font-outfit text-[10px] sm:text-xs font-black uppercase tracking-[0.35em] text-[#6D8080]">
              LE CONCEPT DE L'ÉVÉNEMENT · DOMAINE NEFERIS
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E0681C]" />
          </div>

          <h2 className="font-outfit text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-wider leading-none mb-6">
            <span className="text-white">HERITAGE</span>
            <span className="text-[#E0681C] mx-2 xs:mx-3 sm:mx-5">×</span>
            <span className="text-gradient-terracotta">FUTURE</span>
          </h2>

          <p className="font-outfit italic text-xl sm:text-2xl text-gray-200 mb-4 tracking-wide">
            &ldquo;Two worlds. One drive.&rdquo;
          </p>

          <p className="font-sans text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            L'idée n'est pas simplement de faire un événement « Porsche rétro ».
            Il s'agit de créer une tension visuelle entre deux univers,
            puis de démontrer que le nouveau <strong>Cayenne Electric E4</strong> devient leur point de rencontre absolu.
          </p>
        </div>

        {/* ── 3 Universal Pillars (Heritage, Cayenne, Future) ─────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {/* Pillar 1: Heritage / The Past */}
          <div className="relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0E1015] border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between group hover:border-[#6D8080]/50 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[#6D8080] font-mono text-[9px] uppercase tracking-widest font-bold">
                  HERITAGE / L'ORIGINE
                </span>
                <Landmark className="w-5 h-5 text-[#6D8080]" />
              </div>
              <h3 className="font-outfit text-2xl font-black text-white uppercase mb-3">
                Le Domaine Neferis
              </h3>
              <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                La pierre brute, les allées séculaires, les arches historiques, l'artisanat d'exception, l'histoire automobile et les objets mécaniques qui forgent la légende.
              </p>
            </div>
            <div className="flex gap-1.5 pt-4 border-t border-white/5">
              {['#08090C', '#1E232E', '#6D8080', '#FFFFFF'].map((c, i) => (
                <div key={i} className="w-7 h-5 rounded-md border border-white/10" style={{ background: c }} />
              ))}
            </div>
          </div>

          {/* Pillar 2: The Cayenne (The Connection) */}
          <div className="relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#12151D] border border-[#E0681C]/50 backdrop-blur-xl shadow-[0_15px_45px_rgba(224,104,28,0.15)] flex flex-col justify-between group scale-[1.01] sm:scale-[1.02] z-10">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#E0681C]/20 border border-[#E0681C]/40 text-[#E0681C] font-mono text-[9px] uppercase tracking-widest font-bold">
                  LE POINT DE CONNEXION
                </span>
                <Layers className="w-5 h-5 text-[#E0681C]" />
              </div>
              <h3 className="font-outfit text-2xl font-black text-white uppercase mb-3">
                The Cayenne E4
              </h3>
              <p className="font-sans text-xs sm:text-sm text-gray-200 leading-relaxed mb-6">
                Elle devient le point de rencontre entre ces deux univers.
                Au lieu d'essayer de faire disparaître l'architecture ancienne du Domaine, on l'utilise comme révélateur de modernité.
              </p>
            </div>
            <div className="flex gap-1.5 pt-4 border-t border-white/10">
              {['#08090C', '#6D8080', '#E0681C', '#FFFFFF'].map((c, i) => (
                <div key={i} className="w-7 h-5 rounded-md border border-white/20" style={{ background: c }} />
              ))}
            </div>
          </div>

          {/* Pillar 3: Future / The Electric */}
          <div className="relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0E1015] border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between group hover:border-[#6D8080]/50 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white font-mono text-[9px] uppercase tracking-widest font-bold">
                  FUTURE / L'ÉLECTRIQUE
                </span>
                <Zap className="w-5 h-5 text-[#E0681C]" />
              </div>
              <h3 className="font-outfit text-2xl font-black text-white uppercase mb-3">
                L'Ère Électrique
              </h3>
              <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                La Cayenne Electric, la technologie de pointe 800V, la précision aérodynamique, la signature LED 4 points et l'accélération instantanée.
              </p>
            </div>
            <div className="flex gap-1.5 pt-4 border-t border-white/5">
              {['#08090C', '#1E232E', '#6D8080', '#FFFFFF'].map((c, i) => (
                <div key={i} className="w-7 h-5 rounded-md border border-white/10" style={{ background: c }} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Sub-navigation: Silhouette vs Moodboard vs Entrance ── */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-2xl mx-auto">
          <button
            onClick={() => setActiveTab('silhouette')}
            className={`px-4 py-2 rounded-full font-outfit text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'silhouette'
                ? 'bg-[#E0681C] text-white shadow-[0_0_20px_rgba(224, 104, 28,0.5)]'
                : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Silhouette Cayenne E4</span>
          </button>
          <button
            onClick={() => setActiveTab('lounge')}
            className={`px-4 py-2 rounded-full font-outfit text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'lounge'
                ? 'bg-[#E0681C] text-white shadow-[0_0_20px_rgba(224, 104, 28,0.5)]'
                : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
            }`}
          >
            <Armchair className="w-3.5 h-3.5" />
            <span>Salon VIP Domaine</span>
          </button>
          <button
            onClick={() => setActiveTab('entrance')}
            className={`px-4 py-2 rounded-full font-outfit text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'entrance'
                ? 'bg-[#E0681C] text-white shadow-[0_0_20px_rgba(224, 104, 28,0.5)]'
                : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
            }`}
          >
            <DoorOpen className="w-3.5 h-3.5" />
            <span>Avenue & Entrée</span>
          </button>
        </div>


        {/* Tab 1.5: The Authentic Cayenne E4 Shrouded Silhouette */}
        {activeTab === 'silhouette' && (
          <div className="max-w-5xl mx-auto rounded-2xl sm:rounded-3xl bg-[#0E1015] border border-white/15 p-4 xs:p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl group bg-black">
                <Image
                  src="/porsche-shrouded.webp"
                  alt="Porsche Cayenne E4 Electric SUV — Silhouette Shrouded"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 border border-[#6D8080]/40 backdrop-blur-md">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#6D8080] font-bold">
                    CAYENNE E4 SUV · SILHOUETTE
                  </span>
                </div>
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#E0681C] uppercase tracking-[0.3em] font-bold block mb-2">
                  HERITAGE × FUTURE · LE MODÈLE RÉVÉLÉ
                </span>
                <h3 className="font-outfit text-2xl sm:text-3xl font-black text-white uppercase tracking-wider mb-4">
                  La Stature SUV du Cayenne E4
                </h3>
                <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                  Sous son drap de soie noir ajusté sur-mesure, le nouveau <strong>Cayenne E4 Electric</strong> dévoile ses proportions sculpturales de SUV haute performance : ligne de pavillon tendue, ailes arrière musclées, spoiler de toit intégré et signature optique Matrix LED 4 points.
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs font-sans mb-6">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="font-bold text-white block">Forme SUV Cayenne</span>
                    <span className="text-gray-400 text-[11px]">Garde au sol & stature athlétique</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="font-bold text-white block">Aérodynamisme E4</span>
                    <span className="text-gray-400 text-[11px]">800V & flux d'air optimisé</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => smoothScrollTo('#confirmer', -70, 0.95)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E0681C] hover:bg-[#ff7a26] text-white font-outfit text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(224,104,28,0.35)] cursor-pointer"
                >
                  <span>Réserver Ma Place au Dévoilement</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Lounge & Furniture Moodboard from Slide 1 */}
        {activeTab === 'lounge' && (
          <div className="max-w-5xl mx-auto rounded-2xl sm:rounded-3xl bg-[#0E1015] border border-white/15 p-4 xs:p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-[16/9] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                <Image
                  src="/porsche-lounge-furniture.webp"
                  alt="Salon VIP Domaine Neferis Furniture Moodboard"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#E0681C] uppercase tracking-[0.3em] font-bold block mb-2">
                  EVENT IDENTITY · FURNITURE MOODBOARD
                </span>
                <h3 className="font-outfit text-2xl sm:text-3xl font-black text-white uppercase tracking-wider mb-4">
                  Le Salon d'Honneur Neferis
                </h3>
                <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                  Inspiré du moodboard mobilier officiel : canapés modulaires en lin charbon, coussins velours terracotta, poufs cylindriques en velours rouille, pouf capitonné à motif pied-de-poule et tables hautes noires minimalistes.
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs font-sans">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="font-bold text-white block">Teinte Terracotta</span>
                    <span className="text-gray-400 text-[11px]">Velours chaud signature</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="font-bold text-white block">Charbon Architectural</span>
                    <span className="text-gray-400 text-[11px]">Structures mates sobres</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Entrance & SUV Avenue from Slide 1 */}
        {activeTab === 'entrance' && (
          <div className="max-w-5xl mx-auto rounded-2xl sm:rounded-3xl bg-[#0E1015] border border-white/15 p-4 xs:p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-[16/9] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                <Image
                  src="/domaine-neferis-entrance.webp"
                  alt="Entrée Domaine Neferis et Arche Porsche"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#E0681C] uppercase tracking-[0.3em] font-bold block mb-2">
                  EVENT IDENTITY · SCENIC ARRIVAL
                </span>
                <h3 className="font-outfit text-2xl sm:text-3xl font-black text-white uppercase tracking-wider mb-4">
                  L'Arrivée au Domaine Neferis
                </h3>
                <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                  Une allée bordée de pins méditerranéens et d'oliviers séculaires. Passage obligatoire sous l'arche architecturale noire rétroéclairée « PORSCHE ».
                </p>
                <div className="p-3.5 rounded-xl bg-[#E0681C]/10 border border-[#E0681C]/30 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#E0681C] animate-pulse" />
                  <span className="font-mono text-xs font-bold text-white">
                    #PorscheSUVExperience · Avenue Tout-Terrain
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Official Motto Banner ─────────────────────────────────── */}
        <div className="mt-16 text-center max-w-3xl mx-auto p-8 rounded-2xl border border-white/10 bg-[#0E1015] shadow-2xl">
          <p className="font-outfit font-black text-xl sm:text-2xl text-white uppercase tracking-wider mb-2">
            &ldquo;A museum of the past, activated by the technology of the future.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="h-px w-12 bg-[#6D8080]" />
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
              Porsche Cayenne E4 · 2K Events Official Concept
            </span>
            <span className="h-px w-12 bg-[#E0681C]" />
          </div>
        </div>
      </SectionWrapper>
    </section>
  )
}
