// src/components/sections/MapSection.tsx
'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { EVENT } from '@/lib/constants'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { MapPin, Navigation, MousePointer2, Car, Zap, Compass, TreePine } from 'lucide-react'

export function MapSection() {
  const [mapInteractive, setMapInteractive] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [iframeVisible, setIframeVisible] = useState(false)
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

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setIframeVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIframeVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="domaine"
      className="relative bg-[#08090C] border-t border-white/5 overflow-hidden py-20 md:py-28"
    >
      <div className="absolute inset-0 carbon-pattern opacity-20 pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#E0681C]/[0.04] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[#6D8080]/[0.05] blur-[140px] rounded-full pointer-events-none" />

      <SectionWrapper className="container mx-auto px-4 sm:px-6 xl:px-20 relative z-10">
        {/* SECTION HEADER */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#E0681C] animate-ping" />
            <p className="font-outfit text-[10px] tracking-[0.4em] uppercase text-[#E0681C] font-bold">
              DOMAINE NEFERIS · CADRE HISTORIQUE &amp; PISTE SUV
            </p>
          </div>

          <div className="relative max-w-3xl flex flex-col sm:flex-row sm:items-end gap-6">
            <div>
              <h2
                className="font-outfit font-black text-white leading-tight uppercase"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}
              >
                Accès au <span className="text-gradient-terracotta italic">Domaine Neferis</span>
              </h2>
            </div>
            {/* Domaine Neferis official logo */}
            <div className="flex-shrink-0 flex items-center">
              <Image
                src="/neferis-logo.png"
                alt="Domaine Neferis — Lieu de l'événement"
                width={160}
                height={105}
                className="h-16 sm:h-20 w-auto object-contain opacity-80"
                style={{ filter: 'brightness(0.85) sepia(0.15) saturate(0.9)' }}
              />
            </div>
          </div>
        </div>

        {/* BODY — 2 columns */}
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 xl:gap-12 items-center">
          {/* LEFT: Venue Information */}
          <div className="flex flex-col gap-6">
            <p className="font-sans text-gray-300 text-sm md:text-base leading-relaxed max-w-lg">
              L'accès au Domaine Neferis s'effectue par l'allée d'honneur bordée de pins méditerranéens. 
              Le passage sous l'Arche Noire Porsche constitue le point de départ du parcours 
              <strong> #PorscheSUVExperience</strong>. Un hub de recharge ultra-rapide 270 kW DC et un service de conciergerie VIP sont aménagés à l'arrivée.
            </p>

            {/* Cards — Venue, Parking & Charging */}
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: TreePine,
                  label: 'L\'Avenue d\'Arrivée & Arche Porsche',
                  value: EVENT.venue,
                  sub: 'Entrée monumentale · Allée de pins & drapeaux damier',
                  color: '#E0681C',
                },
                {
                  icon: Zap,
                  label: 'Hub de Recharge Électrique',
                  value: 'Bornes Ultra-Rapides 270 kW DC',
                  sub: 'Architecture 800V · Recharge 10-80% en 21 minutes',
                  color: '#E0681C',
                },
                {
                  icon: Car,
                  label: 'Piste Tout-Terrain & Parking',
                  value: 'Parking VIP & Parcours #PorscheSUVExperience',
                  sub: 'Accès direct Salon d\'Honneur & Vagues de Pilotage',
                  color: '#6D8080',
                },
              ].map(({ icon: Icon, label, value, sub, color }, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0E1015] px-6 py-5 transition-all duration-300 hover:border-[#E0681C]/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.8)]"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="mt-0.5 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{
                        backgroundColor: `${color}15`,
                        border: `1px solid ${color}35`,
                        color: color,
                      }}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.3em] uppercase font-bold mb-0.5" style={{ color: color }}>
                        {label}
                      </p>
                      <p className="font-outfit font-bold text-white text-sm leading-snug">
                        {value}
                      </p>
                      <p className="font-sans text-gray-400 text-xs mt-0.5">{sub}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
              <a
                href={EVENT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden text-white font-outfit font-bold text-xs tracking-wider uppercase px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl shadow-[0_6px_28px_rgba(224, 104, 28,0.35)] hover:shadow-[0_10px_36px_rgba(224, 104, 28,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-center"
                style={{
                  background: 'linear-gradient(135deg, #E0681C 0%, #6D8080 100%)',
                }}
              >
                <Navigation className="w-4 h-4 relative z-10" strokeWidth={2} />
                <span className="relative z-10">Itinéraire GPS Domaine Neferis</span>
              </a>

              <a
                href={EVENT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-outfit text-xs tracking-wider uppercase text-gray-400 hover:text-white transition-colors underline underline-offset-4 text-center sm:text-left py-1"
              >
                Ouvrir dans Google Maps
              </a>
            </div>
          </div>

          {/* RIGHT: Map Container with Dark Theme Filter */}
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E0681C]" />
              <span className="font-mono text-[8px] xs:text-[9px] tracking-wider sm:tracking-[0.3em] uppercase text-gray-400 truncate">
                GPS COORDINATES: 36.5985° N · 10.4501° E · DOMAINE NEFERIS
              </span>
            </div>

            <div
              ref={containerRef}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="relative z-10 rounded-2xl overflow-hidden border border-white/10"
              style={{
                aspectRatio: '16 / 10',
                boxShadow: hovered
                  ? '0 32px 80px rgba(0,0,0,0.8), 0 0 30px rgba(224, 104, 28,0.25)'
                  : '0 20px 56px rgba(0,0,0,0.6)',
                transition: 'all 500ms ease',
              }}
            >
              {iframeVisible ? (
                <iframe
                  title="Carte Accès Domaine Neferis"
                  src={EVENT.mapsEmbed}
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: 'invert(90%) hue-rotate(180deg) contrast(1.1) brightness(0.9)',
                    pointerEvents: mapInteractive ? 'auto' : 'none',
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="w-full h-full bg-[#0E1015] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-gray-600 font-mono text-xs">
                    <MapPin className="w-6 h-6 animate-pulse text-[#E0681C]" />
                    <span>CHARGEMENT DE LA CARTE DU DOMAINE...</span>
                  </div>
                </div>
              )}

              {/* Interactive Overlay Click to Unlock */}
              {!mapInteractive && (
                <div
                  onClick={() => setMapInteractive(true)}
                  className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:bg-black/20 group"
                >
                  <div className="w-12 h-12 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:border-[#E0681C] group-hover:text-[#E0681C] transition-all duration-300 shadow-xl">
                    <MousePointer2 className="w-5 h-5" />
                  </div>
                  <span className="font-outfit text-xs font-bold uppercase tracking-widest text-white drop-shadow">
                    Cliquer pour interagir avec la carte
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  )
}
