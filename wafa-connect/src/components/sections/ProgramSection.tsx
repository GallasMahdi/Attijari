// src/components/sections/ProgramSection.tsx
'use client'
import React from 'react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { PROGRAM } from '@/lib/constants'
import { ShieldCheck, Sparkles, Zap, UtensilsCrossed, Award, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const ICONS = [ShieldCheck, Sparkles, Zap, UtensilsCrossed, Award]

export function ProgramSection() {
  return (
    <section
      id="programme"
      className="py-16 sm:py-24 bg-[#08090C] relative overflow-hidden border-t border-white/5"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(224, 104, 28, 0.05) 0%, #08090C 70%)',
      }}
    >
      <SectionWrapper className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
        {/* Section Header — Minimalist Luxury */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E0681C]" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-300">
              18 JUIN 2026 · DOMAINE NEFERIS
            </span>
          </div>

          <h2 className="font-outfit text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-wider mb-2">
            Programme <span className="text-gradient-terracotta">VIP</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
            L'exclusivité Porsche en 5 temps forts.
          </p>
        </div>

        {/* ── DESKTOP HOROLOGY TIMELINE (lg and above) ──────────────── */}
        <div className="hidden lg:block">
          {/* Interconnected Track Line */}
          <div className="relative mb-6 px-12">
            <div className="absolute top-1/2 left-16 right-16 h-[2px] -translate-y-1/2 bg-white/10" />
            <div className="grid grid-cols-5 relative z-10">
              {PROGRAM.map((step, idx) => {
                const stepNum = String(idx + 1).padStart(2, '0')
                const isHighlight = step.highlight

                return (
                  <div key={step.time} className="flex justify-center">
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center font-mono text-[11px] font-bold transition-colors duration-200 border',
                        isHighlight
                          ? 'bg-[#E0681C] text-white border-[#E0681C] shadow-[0_0_12px_rgba(224,104,28,0.5)]'
                          : 'bg-[#0E1015] text-gray-400 border-white/20'
                      )}
                    >
                      {stepNum}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 5 Progression Pillar Cards */}
          <div className="grid grid-cols-5 gap-3.5">
            {PROGRAM.map((step, idx) => {
              const Icon = ICONS[idx] || Clock
              const isHighlight = step.highlight

              return (
                <div
                  key={step.time}
                  className={cn(
                    'relative flex flex-col justify-between p-4 rounded-2xl border transition-colors duration-200',
                    isHighlight
                      ? 'bg-[#12151D] border-[#E0681C]/40 hover:border-[#E0681C]'
                      : 'bg-[#0D0F14] border-white/10 hover:border-white/20'
                  )}
                >
                  {/* Top: Time & Highlight Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span
                        className={cn(
                          'font-mono text-xs font-bold tracking-wider px-2.5 py-1 rounded-lg border',
                          isHighlight
                            ? 'bg-[#E0681C]/15 text-[#E0681C] border-[#E0681C]/30'
                            : 'bg-white/5 text-gray-300 border-white/10'
                        )}
                      >
                        {step.time}
                      </span>
                      {step.badge && (
                        <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-[#E0681C] bg-[#E0681C]/10 border border-[#E0681C]/25 px-2 py-0.5 rounded-full">
                          {step.badge}
                        </span>
                      )}
                    </div>

                    {/* Icon */}
                    <div
                      className={cn(
                        'w-9 h-9 rounded-xl flex items-center justify-center mb-3 border',
                        isHighlight
                          ? 'bg-[#E0681C]/10 text-[#E0681C] border-[#E0681C]/30'
                          : 'bg-white/5 text-gray-400 border-white/10'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Label & Tag */}
                    <h3
                      className={cn(
                        'font-outfit text-sm font-bold tracking-wide mb-1 leading-snug',
                        isHighlight ? 'text-white' : 'text-gray-200'
                      )}
                    >
                      {step.label}
                    </h3>
                  </div>

                  <p className="font-sans text-[11px] text-gray-400 mt-2">
                    {step.tag}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── MOBILE / TABLET CHRONO-TRACK (< lg) ──────────────────── */}
        <div className="block lg:hidden relative pl-8 sm:pl-10">
          {/* Continuous Vertical Timeline Line */}
          <div className="absolute top-4 bottom-4 left-[15px] sm:left-[19px] w-[2px] bg-gradient-to-b from-[#E0681C] via-white/15 to-white/5" />

          <div className="flex flex-col gap-3 sm:gap-4">
            {PROGRAM.map((step, idx) => {
              const Icon = ICONS[idx] || Clock
              const isHighlight = step.highlight
              const stepNum = String(idx + 1).padStart(2, '0')

              return (
                <div key={step.time} className="relative group">
                  {/* Timeline Node on the vertical line */}
                  <div
                    className={cn(
                      'absolute -left-8 sm:-left-10 top-3.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border transition-colors',
                      isHighlight
                        ? 'bg-[#E0681C] text-white border-[#E0681C] shadow-[0_0_10px_rgba(224,104,28,0.5)]'
                        : 'bg-[#0E1015] text-gray-400 border-white/20'
                    )}
                  >
                    {stepNum}
                  </div>

                  {/* Compact Mobile Card */}
                  <div
                    className={cn(
                      'p-3.5 sm:p-4 rounded-xl border transition-colors duration-150',
                      isHighlight
                        ? 'bg-[#12151D] border-[#E0681C]/40'
                        : 'bg-[#0D0F14] border-white/10'
                    )}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            'font-mono text-xs font-bold tracking-wider px-2 py-0.5 rounded-md border',
                            isHighlight
                              ? 'bg-[#E0681C]/20 text-[#E0681C] border-[#E0681C]/40'
                              : 'bg-white/5 text-gray-300 border-white/10'
                          )}
                        >
                          {step.time}
                        </span>

                        {step.badge && (
                          <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-[#E0681C] bg-[#E0681C]/15 border border-[#E0681C]/30 px-1.5 py-0.5 rounded">
                            {step.badge}
                          </span>
                        )}
                      </div>

                      <div
                        className={cn(
                          'w-6 h-6 rounded-lg flex items-center justify-center border flex-shrink-0',
                          isHighlight
                            ? 'bg-[#E0681C]/10 text-[#E0681C] border-[#E0681C]/30'
                            : 'bg-white/5 text-gray-400 border-white/10'
                        )}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <h3
                      className={cn(
                        'font-outfit text-sm font-bold tracking-wide leading-snug',
                        isHighlight ? 'text-white' : 'text-gray-200'
                      )}
                    >
                      {step.label}
                    </h3>

                    <p className="font-sans text-[11px] text-gray-400 mt-0.5">
                      {step.tag}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </SectionWrapper>
    </section>
  )
}
