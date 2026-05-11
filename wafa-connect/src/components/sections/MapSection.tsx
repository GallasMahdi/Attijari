'use client'
import { useState, useRef, useEffect } from 'react'
import { EVENT } from '@/lib/constants'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { MapPin, Navigation, MousePointer2, Car } from 'lucide-react'
import { TexturePattern } from '@/components/ui/TexturePattern'

/* ─────────────────────────────────────────────
   Tiny reusable primitives
───────────────────────────────────────────── */

function GoldRule({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-wafa-gold/40 to-wafa-gold/70" />
      <svg width="9" height="9" viewBox="0 0 9 9" className="text-wafa-gold fill-current rotate-45 flex-shrink-0">
        <rect x="0.5" y="0.5" width="8" height="8" />
      </svg>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-wafa-gold/40 to-wafa-gold/70" />
    </div>
  )
}

function StarOrnament({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      className="text-wafa-gold fill-current animate-[spin_18s_linear_infinite]"
      style={{ flexShrink: 0 }}
    >
      <polygon points="10,1 11.9,7.5 18.5,7.5 13.3,11.5 15.2,18 10,14 4.8,18 6.7,11.5 1.5,7.5 8.1,7.5" />
    </svg>
  )
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export function MapSection() {
  const [mapInteractive, setMapInteractive] = useState(false)
  const [hovered, setHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapInteractive) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMapInteractive(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [mapInteractive])

  return (
    <section
      id="localisation"
      className="relative bg-wafa-cream border-t border-wafa-gold/10 overflow-hidden"
    >
      <TexturePattern src="/pattern.jpeg" opacity={0.12} blendMode="normal" />

      {/* Ambient light pools */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-wafa-gold/[0.045] blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-wafa-gold/[0.035] blur-[100px] rounded-full pointer-events-none" />

      {/* Vertical side label — left */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 pointer-events-none z-10">
        <div className="w-px h-20 bg-gradient-to-b from-transparent to-wafa-gold/40" />
        <span
          className="font-montserrat text-[9px] tracking-[0.45em] uppercase text-wafa-gold/50"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Localisation
        </span>
        <div className="w-px h-20 bg-gradient-to-t from-transparent to-wafa-gold/40" />
      </div>

      {/* Vertical side label — right */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 pointer-events-none z-10">
        <div className="w-px h-20 bg-gradient-to-b from-transparent to-wafa-gold/40" />
        <span
          className="font-montserrat text-[9px] tracking-[0.45em] uppercase text-wafa-gold/50"
          style={{ writingMode: 'vertical-rl' }}
        >
          Attijari Assurance
        </span>
        <div className="w-px h-20 bg-gradient-to-t from-transparent to-wafa-gold/40" />
      </div>

      <SectionWrapper className="container mx-auto px-8 xl:px-20 py-14 xl:py-20 relative z-10">

        {/* ══════════════════════════
            SECTION HEADER
        ══════════════════════════ */}
        <div className="mb-10 xl:mb-12">
          {/* Eyebrow */}
          <div className="flex items-center gap-5 mb-4">
            <StarOrnament size={14} />
            <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-wafa-gold/70">
              Siège Social — Centre Urbain Nord
            </p>
          </div>

          {/* Headline */}
          <div className="relative max-w-3xl">
            <h2
              className="font-playfair font-bold text-wafa-dark leading-[1.05]"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
            >
              Nous{' '}
              <em className="not-italic text-wafa-gold italic relative">
                Rejoindre
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 10"
                  preserveAspectRatio="none"
                  height="10"
                >
                  <path
                    d="M0 8 Q40 2 80 6 Q130 10 180 5 Q230 0 300 4"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    fill="none"
                    className="text-wafa-gold/45"
                    strokeLinecap="round"
                  />
                </svg>
              </em>
            </h2>

            {/* Floating circle ornament */}
            <div className="absolute -top-6 right-0 hidden lg:block opacity-25 pointer-events-none">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="39" stroke="currentColor" strokeWidth="0.6" className="text-wafa-gold" />
                <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 4" className="text-wafa-gold" />
                <circle cx="40" cy="40" r="2" fill="currentColor" className="text-wafa-gold" />
              </svg>
            </div>
          </div>
        </div>

        {/* ══════════════════════════
            BODY — 2 columns
        ══════════════════════════ */}
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 xl:gap-12 items-center">

          {/* ── LEFT ── */}
          <div className="flex flex-col gap-5">

            <p className="font-montserrat text-gray-600 text-base leading-loose max-w-sm">
              Notre nouveau siège est idéalement situé au cœur du Centre Urbain Nord,
              facilement accessible et doté d'un parking dédié pour tous nos invités.
            </p>

            {/* Cards — Address & Parking only */}
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: MapPin,
                  label: 'Adresse',
                  value: EVENT.venue,
                  sub: EVENT.city,
                },
                {
                  icon: Car,
                  label: 'Parking',
                  value: 'Parking dédié visiteurs',
                  sub: 'Accès inclus — entrée principale',
                },
              ].map(({ icon: Icon, label, value, sub }, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-wafa-gold/20 bg-white/50 backdrop-blur-sm px-6 py-5 transition-all duration-500 hover:border-wafa-gold/45 hover:bg-white/75 hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.10)]"
                >
                  {/* Left accent stripe */}
                  <div className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full bg-gradient-to-b from-transparent via-wafa-gold/70 to-transparent transition-all duration-500 group-hover:top-0 group-hover:bottom-0" />
                  {/* Top hairline */}
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-wafa-gold/0 to-transparent group-hover:via-wafa-gold/50 transition-all duration-500" />

                  <div className="flex items-start gap-4 pl-3">
                    <div className="mt-0.5 w-10 h-10 rounded-xl bg-wafa-gold/12 flex items-center justify-center flex-shrink-0 group-hover:bg-wafa-gold/22 transition-colors duration-300">
                      <Icon className="w-[18px] h-[18px] text-wafa-gold" strokeWidth={1.6} />
                    </div>
                    <div>
                      <p className="font-montserrat text-[9px] tracking-[0.4em] uppercase text-wafa-gold/60 mb-1">
                        {label}
                      </p>
                      <p className="font-montserrat font-semibold text-wafa-dark text-sm leading-snug">
                        {value}
                      </p>
                      <p className="font-montserrat text-gray-500 text-xs mt-0.5">{sub}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <GoldRule />

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={EVENT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group relative inline-flex items-center gap-2.5 overflow-hidden
                  bg-wafa-gold text-white font-montserrat font-semibold
                  text-[11px] tracking-[0.2em] uppercase
                  px-7 py-3.5 rounded-full
                  shadow-[0_6px_28px_-4px_rgba(0,0,0,0.22)]
                  hover:shadow-[0_10px_36px_-4px_rgba(0,0,0,0.28)]
                  hover:scale-[1.03] active:scale-[0.97]
                  transition-all duration-300
                "
              >
                {/* Shimmer */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                <Navigation className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                <span className="relative z-10">Itinéraire</span>
              </a>

              <a
                href={EVENT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  font-montserrat text-[11px] tracking-[0.15em] uppercase text-wafa-gold/80
                  underline underline-offset-4 decoration-wafa-gold/30
                  hover:text-wafa-gold hover:decoration-wafa-gold/70
                  transition-all duration-200
                "
              >
                Ouvrir dans Google Maps
              </a>
            </div>

          </div>

          {/* ── RIGHT: Map ── */}
          <div className="relative">

            {/* Coordinate stamp */}
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-5 bg-wafa-gold/40" />
              <span className="font-montserrat text-[9px] tracking-[0.35em] uppercase text-wafa-gold/55">
                36.8417° N &nbsp;·&nbsp; 10.1942° E
              </span>
            </div>

            {/* Outer decorative halo frame */}
            <div
              className="absolute -inset-3 rounded-[28px] border border-wafa-gold/12 pointer-events-none z-0"
              style={{
                background: 'linear-gradient(135deg, rgba(var(--wafa-gold-rgb),0.04) 0%, transparent 60%)',
              }}
            />

            {/* Map card */}
            <div
              ref={containerRef}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="relative z-10 rounded-2xl overflow-hidden"
              style={{
                aspectRatio: '16 / 10',
                boxShadow: hovered
                  ? '0 32px 80px -16px rgba(0,0,0,0.22), 0 0 0 1px rgba(var(--wafa-gold-rgb),0.28), 0 0 0 5px rgba(var(--wafa-gold-rgb),0.07)'
                  : '0 20px 56px -12px rgba(0,0,0,0.16), 0 0 0 1px rgba(var(--wafa-gold-rgb),0.16), 0 0 0 5px rgba(var(--wafa-gold-rgb),0.04)',
                transition: 'box-shadow 600ms ease',
              }}
            >
              {/* Corner bracket accents */}
              {[
                'top-3 left-3',
                'top-3 right-3 rotate-90',
                'bottom-3 right-3 rotate-180',
                'bottom-3 left-3 -rotate-90',
              ].map((pos, i) => (
                <div key={i} className={`absolute ${pos} z-20 pointer-events-none`}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M0 14 L0 0 L14 0"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-wafa-gold/55"
                    />
                  </svg>
                </div>
              ))}

              {/* iframe */}
              <iframe
                src={EVENT.mapsEmbed}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: mapInteractive
                    ? 'none'
                    : 'grayscale(1) contrast(1.2) sepia(0.3) hue-rotate(100deg)',
                  transition: 'filter 750ms ease',
                }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 z-0 w-full h-full"
                title="Localisation Attijari Assurance"
              />

              {/* Scroll-guard overlay */}
              {!mapInteractive && (
                <div
                  onClick={() => setMapInteractive(true)}
                  className="absolute inset-0 z-10 cursor-pointer select-none"
                  aria-label="Cliquer pour interagir avec la carte"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/25" />

                  {/* Pulse target */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-16 h-16">
                      {[0, 150, 300].map((delay, i) => (
                        <div
                          key={i}
                          className="absolute inset-0 rounded-full border border-wafa-gold/30 animate-ping"
                          style={{ animationDelay: `${delay}ms`, animationDuration: '2s' }}
                        />
                      ))}
                      <div className="absolute inset-[6px] rounded-full bg-white/15 backdrop-blur-md border border-wafa-gold/40 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-wafa-gold drop-shadow-md" strokeWidth={1.8} />
                      </div>
                    </div>
                  </div>

                  {/* Bottom badge */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-wafa-gold/35 rounded-full px-4 py-2 shadow-xl">
                      <MousePointer2 className="w-3.5 h-3.5 text-wafa-gold flex-shrink-0" strokeWidth={1.6} />
                      <span className="font-montserrat text-[9px] tracking-[0.35em] text-white/85 uppercase whitespace-nowrap">
                        Cliquer pour interagir
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Active indicator */}
              {mapInteractive && (
                <div className="absolute top-3.5 right-8 z-20 pointer-events-none">
                  <div className="flex items-center gap-1.5 bg-black/55 backdrop-blur-sm border border-wafa-gold/25 rounded-full px-3 py-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-montserrat text-[9px] tracking-wider uppercase text-white/75">
                      Actif
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Below-map dot trail */}
            <div className="mt-4 flex items-center justify-between px-0.5">
              <div className="flex items-center gap-1.5">
                {[3, 3, 6, 3, 3].map((sz, i) => (
                  <div
                    key={i}
                    className="rounded-full bg-wafa-gold/30"
                    style={{ width: sz, height: sz }}
                  />
                ))}
              </div>
              <span className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-gray-400">
                Tunis, Tunisie
              </span>
            </div>
          </div>
        </div>

        {/* Footer ornament */}
        <div className="mt-10 xl:mt-14 flex items-center gap-6">
          <div className="flex-1 h-px bg-gradient-to-r from-wafa-gold/30 to-transparent" />
          <StarOrnament size={12} />
          <div className="w-16 h-px bg-wafa-gold/20" />
          <StarOrnament size={8} />
          <div className="flex-1 h-px bg-gradient-to-l from-wafa-gold/30 to-transparent" />
        </div>

      </SectionWrapper>
    </section>
  )
}
