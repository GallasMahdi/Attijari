'use client'
import { useState, useRef, useEffect } from 'react'
import { EVENT } from '@/lib/constants'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GlassCard } from '@/components/ui/GlassCard'
import { MapPin, Navigation, MousePointer2 } from 'lucide-react'
import { TexturePattern } from '@/components/ui/TexturePattern'

export function MapSection() {
  const [mapInteractive, setMapInteractive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Deactivate map interaction when user clicks outside
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
      className="section-padding bg-wafa-cream relative border-t border-wafa-gold/10 overflow-hidden"
    >
      <TexturePattern src="/pattern.jpeg" opacity={0.15} blendMode="normal" />

      {/* Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-wafa-gold/5 blur-3xl rounded-full pointer-events-none" />

      <SectionWrapper className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: info ── */}
          <div>
            {/* Ornamental line + diamond */}
            <div className="flex items-center justify-start gap-4 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-wafa-gold/60" />
              <svg width="10" height="10" viewBox="0 0 12 12" className="text-wafa-gold fill-current rotate-45">
                <rect x="1" y="1" width="10" height="10" />
              </svg>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-wafa-gold/60" />
            </div>

            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-wafa-dark mb-6">
              Nous{' '}
              <span className="relative inline-block">
                <span className="text-wafa-gold italic">Rejoindre</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  preserveAspectRatio="none"
                  height="8"
                >
                  <path
                    d="M0 6 Q50 0 100 4 Q150 8 200 2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    className="text-wafa-gold/40"
                  />
                </svg>
              </span>
            </h2>
            <p className="font-montserrat text-gray-700 text-lg mb-8 leading-relaxed max-w-lg">
              Le nouveau siège d'Attijari Assurance est idéalement situé au Centre Urbain Nord,
              facilement accessible et doté d'un parking dédié pour nos invités.
            </p>

            <GlassCard className="mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-wafa-gold/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-wafa-gold" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-wafa-dark text-xl mb-1">Adresse</h3>
                  <p className="font-montserrat text-gray-600">{EVENT.venue}</p>
                  <p className="font-montserrat text-gray-600">{EVENT.city}</p>
                </div>
              </div>
            </GlassCard>

            <a
              href={EVENT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-wafa-gold font-montserrat font-bold hover:text-wafa-dark transition-colors"
            >
              <Navigation className="w-5 h-5" />
              Ouvrir dans Google Maps
            </a>
          </div>

          {/* ── Right: map ── */}
          <div
            ref={containerRef}
            className="relative aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden border-2 border-wafa-gold/20 shadow-2xl"
          >
            {/* Map iframe */}
            <iframe
              src={EVENT.mapsEmbed}
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: mapInteractive
                  ? 'none'
                  : 'grayscale(1) contrast(1.2) sepia(0.3) hue-rotate(100deg)',
                transition: 'filter 700ms ease',
              }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 z-0"
              title="Localisation Attijari Assurance"
            />

            {/*
             * Scroll-guard overlay — sits above the iframe with pointer-events ACTIVE.
             * This stops the iframe from swallowing wheel/touch events so Lenis can
             * keep scrolling the page smoothly. Clicking once removes the overlay
             * and lets the user interact with the map normally.
             */}
            {!mapInteractive && (
              <div
                onClick={() => setMapInteractive(true)}
                className="absolute inset-0 z-10 cursor-pointer select-none"
                aria-label="Cliquer pour interagir avec la carte"
              >
                {/* Subtle scrim */}
                <div className="absolute inset-0 bg-black/15 transition-opacity duration-300" />

                {/* Click-to-interact badge */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/65 backdrop-blur-md border border-wafa-gold/40 rounded-full px-4 py-2 shadow-xl">
                  <MousePointer2 className="w-4 h-4 text-wafa-gold flex-shrink-0" />
                  <span className="font-montserrat text-xs text-white/90 tracking-widest uppercase whitespace-nowrap">
                    Cliquer pour interagir
                  </span>
                </div>
              </div>
            )}

            {/* Active badge (non-interactive) */}
            {mapInteractive && (
              <div className="absolute top-3 right-3 z-10 pointer-events-none">
                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-wafa-gold/30 rounded-full px-3 py-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-montserrat text-[10px] text-white/80 tracking-wider uppercase">
                    Actif
                  </span>
                </div>
              </div>
            )}
          </div>

        </div>
      </SectionWrapper>
    </section>
  )
}
