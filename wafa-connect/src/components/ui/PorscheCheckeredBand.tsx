// src/components/ui/PorscheCheckeredBand.tsx
'use client'
import React, { useId } from 'react'

interface PorscheCheckeredBandProps {
  className?: string
  variant?: 'divider' | 'banner' | 'slim' | 'badge'
  title?: string
  subtitle?: string
  /** flip direction: tread right → checker left */
  flip?: boolean
}

const ORANGE = '#E0681C'
const TEAL   = '#6D8080'

/**
 * The Porsche Cayenne E4 signature visual — tire tread marks morphing
 * seamlessly into a checkered flag. Used as luxury section dividers.
 */
export function PorscheCheckeredBand({
  className = '',
  variant = 'divider',
  title = 'Cayenne Electric Launch Event',
  subtitle = 'THE FULLY ELECTRIC CAYENNE ERA · E4',
  flip = false,
}: PorscheCheckeredBandProps) {
  const uid = useId().replace(/:/g, '')

  // ── SLIM: ultra-thin 3px accent line ─────────────────────────────────
  if (variant === 'slim') {
    return (
      <div
        className={`relative w-full overflow-hidden ${className}`}
        style={{ height: '3px' }}
      >
        <svg viewBox="0 0 800 3" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`slim-grad-${uid}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor={TEAL}/>
              <stop offset="40%"  stopColor={ORANGE}/>
              <stop offset="70%"  stopColor={TEAL}/>
              <stop offset="100%" stopColor={ORANGE}/>
            </linearGradient>
          </defs>
          <rect width="800" height="3" fill={`url(#slim-grad-${uid})`}/>
        </svg>
      </div>
    )
  }

  // ── BADGE: small inline pill ──────────────────────────────────────────
  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-full overflow-hidden border border-[#E0681C]/40 bg-black/80 backdrop-blur-md ${className}`}>
        <span className="w-4 h-4 rounded-sm overflow-hidden flex-shrink-0 border border-white/20">
          <svg viewBox="0 0 16 16" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="16" height="16" fill={ORANGE}/>
            <rect width="8" height="8" x="8" y="0" fill={TEAL}/>
            <rect width="8" height="8" x="0" y="8" fill={TEAL}/>
            <rect x="1" width="1.5" height="8" fill={TEAL} opacity="0.8"/>
            <rect x="4" width="1"   height="8" fill={TEAL} opacity="0.6"/>
            <rect x="6" width="1.5" height="8" fill={TEAL} opacity="0.5"/>
          </svg>
        </span>
        <span className="font-outfit text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-[#F4F5F7]">
          {title}
        </span>
      </div>
    )
  }

  // ── BANNER: full section banner with title text ───────────────────────
  if (variant === 'banner') {
    return (
      <div className={`relative w-full overflow-hidden border-y border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] ${className}`}>
        <TreadCheckerSVG uid={uid} height={64} flip={flip} treadWidth={0.55} intensity="full" />

        {/* Centered label */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex items-center gap-3 sm:gap-6 px-6 sm:px-10 py-2 rounded-xl bg-[#08090C]/70 backdrop-blur-md border border-white/15 shadow-[0_4px_25px_rgba(0,0,0,0.7)]">
            <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-[#E0681C] animate-pulse" />
            <span className="font-outfit font-black text-xs sm:text-sm md:text-base text-white uppercase tracking-[0.28em] whitespace-nowrap drop-shadow-md">
              {title}
            </span>
            <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-[#E0681C] animate-pulse" />
          </div>
        </div>

        {/* Sub-ribbon */}
        <div className="bg-[#0A0C11] py-2 px-4 flex items-center justify-between text-[9px] sm:text-[11px] font-outfit uppercase tracking-[0.3em] text-gray-400 border-t border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E0681C]" />
            <span className="font-bold text-white">{subtitle}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#6D8080] hidden sm:inline">HERITAGE × FUTURE</span>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-white/90 font-bold">
              <span>2K EVENTS</span>
              <span className="text-[#E0681C]">×</span>
              <span>PORSCHE</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── DIVIDER: premium section separator (default) ──────────────────────
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: '48px' }}
      aria-hidden="true"
    >
      <TreadCheckerSVG uid={uid} height={48} flip={flip} treadWidth={0.5} intensity="full" />
    </div>
  )
}

// ─── Core SVG: tread → checker transition ────────────────────────────────────
interface TreadCheckerSVGProps {
  uid: string
  height: number
  flip: boolean
  treadWidth: number  // 0-1, what fraction of width is tread
  intensity: 'full' | 'soft'
}

function TreadCheckerSVG({ uid, height, flip, treadWidth, intensity }: TreadCheckerSVGProps) {
  const W = 1200
  const H = height
  const cellSize = Math.round(H * 0.75) // checker square size proportional to height
  const treadEnd = Math.round(W * treadWidth)
  const fadeStart = Math.round(W * (treadWidth - 0.12))
  const fadeEnd = Math.round(W * (treadWidth + 0.12))

  const checkerPatId  = `chk-${uid}`
  const treadPatId    = `trd-${uid}`
  const blendMaskId   = `msk-${uid}`
  const vignetteId    = `vig-${uid}`
  const grainId       = `grn-${uid}`
  const shadowTopId   = `st-${uid}`
  const shadowBotId   = `sb-${uid}`

  // Tread stripe widths (simulate real tire groove profile)
  const grooves = [
    { x: 0,  w: 5  },
    { x: 8,  w: 3  },
    { x: 14, w: 6  },
    { x: 22, w: 2  },
    { x: 27, w: 5  },
    { x: 35, w: 3  },
    { x: 41, w: 4  },
    { x: 48, w: 2  },
    { x: 53, w: 4  },
    { x: 60, w: 3  },
  ]
  const treadPitch = 66

  const checkerCell = cellSize > 0 ? cellSize : 16

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <defs>
        {/* ── Checker tile ── */}
        <pattern id={checkerPatId} x="0" y="0" width={checkerCell * 2} height={checkerCell * 2} patternUnits="userSpaceOnUse">
          <rect width={checkerCell} height={checkerCell} x="0"          y="0"          fill={ORANGE}/>
          <rect width={checkerCell} height={checkerCell} x={checkerCell} y="0"          fill={TEAL}/>
          <rect width={checkerCell} height={checkerCell} x="0"          y={checkerCell} fill={TEAL}/>
          <rect width={checkerCell} height={checkerCell} x={checkerCell} y={checkerCell} fill={ORANGE}/>
        </pattern>

        {/* ── Tire tread pattern ── */}
        <pattern id={treadPatId} x="0" y="0" width={treadPitch} height={H} patternUnits="userSpaceOnUse">
          <rect width={treadPitch} height={H} fill={ORANGE}/>
          {grooves.map((g, i) => (
            <rect key={i} x={g.x} y="0" width={g.w} height={H} fill={TEAL}/>
          ))}
          {/* Subtle highlight ridge */}
          <rect x="0" y="0" width="1" height={H} fill="rgba(255,255,255,0.08)"/>
          <rect x={treadPitch - 1} y="0" width="1" height={H} fill="rgba(0,0,0,0.12)"/>
        </pattern>

        {/* ── Blend mask: tread fades into checker ── */}
        <linearGradient id={blendMaskId} x1="0" y1="0" x2="1" y2="0">
          <stop offset={`${(fadeStart / W * 100).toFixed(1)}%`} stopColor="white" stopOpacity="1"/>
          <stop offset={`${(fadeEnd   / W * 100).toFixed(1)}%`} stopColor="white" stopOpacity="0"/>
        </linearGradient>
        <mask id={`mask-${uid}`}>
          <rect width={W} height={H} fill={`url(#${blendMaskId})`}/>
        </mask>

        {/* ── Edge vignette ── */}
        <linearGradient id={vignetteId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#08090C" stopOpacity="0.7"/>
          <stop offset="6%"   stopColor="#08090C" stopOpacity="0"/>
          <stop offset="94%"  stopColor="#08090C" stopOpacity="0"/>
          <stop offset="100%" stopColor="#08090C" stopOpacity="0.7"/>
        </linearGradient>

        {/* ── Top shadow line ── */}
        <linearGradient id={shadowTopId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="rgba(0,0,0,0.55)"/>
          <stop offset="30%" stopColor="rgba(0,0,0,0)"/>
        </linearGradient>
        {/* ── Bottom shadow line ── */}
        <linearGradient id={shadowBotId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="70%" stopColor="rgba(0,0,0,0)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0.55)"/>
        </linearGradient>

        {/* ── Film grain filter ── */}
        <filter id={grainId} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" result="noiseOut"/>
          <feColorMatrix type="saturate" values="0" in="noiseOut" result="grayNoise"/>
          <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blended"/>
          <feComposite in="blended" in2="SourceGraphic" operator="in"/>
        </filter>
      </defs>

      {/* 1 — Base: full checker */}
      <rect width={W} height={H} fill={`url(#${checkerPatId})`}/>

      {/* 2 — Tread overlay: fades out into checker */}
      <rect width={W} height={H} fill={`url(#${treadPatId})`} mask={`url(#mask-${uid})`}/>

      {/* 3 — Grain/noise for luxury texture */}
      <rect
        width={W} height={H}
        fill="rgba(0,0,0,0.08)"
        filter={`url(#${grainId})`}
        opacity={intensity === 'full' ? 0.55 : 0.3}
      />

      {/* 4 — Edge vignette */}
      <rect width={W} height={H} fill={`url(#${vignetteId})`}/>

      {/* 5 — Top & bottom shadow inset */}
      <rect width={W} height={H} fill={`url(#${shadowTopId})`}/>
      <rect width={W} height={H} fill={`url(#${shadowBotId})`}/>

      {/* 6 — 1px highlight line top */}
      <line x1="0" y1="0.5" x2={W} y2="0.5" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
      {/* 7 — 1px shadow line bottom */}
      <line x1="0" y1={H - 0.5} x2={W} y2={H - 0.5} stroke="rgba(0,0,0,0.5)" strokeWidth="1"/>
    </svg>
  )
}
