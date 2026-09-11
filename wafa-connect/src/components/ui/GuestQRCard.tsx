// src/components/ui/GuestQRCard.tsx
'use client'
import { useRef, useCallback, useState } from 'react'
import Image from 'next/image'
import { QRCodeSVG } from 'qrcode.react'
import { motion } from 'framer-motion'
import {
  Download,
  CheckCircle2,
  Calendar,
  Copy,
  Check,
  MapPin,
  Clock,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Package,
} from 'lucide-react'
import { GuestResponse } from '@/types/guest'
import { EVENT } from '@/lib/constants'
import { scaleIn, fadeUp, staggerContainer } from '@/lib/animations'
import { cn } from '@/lib/utils'
import { PorscheCheckeredBand } from '@/components/ui/PorscheCheckeredBand'

interface GuestQRCardProps {
  guest: GuestResponse
  onReset?: () => void
}

// Helper to safely trigger file downloads in all modern browsers without external dependencies
function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function GuestQRCard({ guest, onReset }: GuestQRCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isDownloading = useRef(false)
  const [copied, setCopied] = useState(false)

  // Download high-resolution PNG of the luxury pass
  const handleDownload = useCallback(async () => {
    if (!cardRef.current || isDownloading.current) return
    isDownloading.current = true
    document.body.style.cursor = 'wait'

    try {
      await new Promise((resolve) => setTimeout(resolve, 150))

      const { default: html2canvas } = await import('html2canvas')

      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#08090C',
        scale: 2.5, // Crisp 300 DPI equivalent for retina displays and mobile
        useCORS: true,
        allowTaint: true,
        logging: false,
      })

      const fileName = `pass-porsche-cayenne-e4-${(guest.prenom || 'vip').toLowerCase()}.png`

      if (canvas.toBlob) {
        canvas.toBlob((blob) => {
          if (blob) {
            triggerBlobDownload(blob, fileName)
          } else {
            const dataUrl = canvas.toDataURL('image/png')
            const a = document.createElement('a')
            a.href = dataUrl
            a.download = fileName
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
          }
          isDownloading.current = false
          document.body.style.cursor = 'default'
        }, 'image/png', 1.0)
      } else {
        const dataUrl = canvas.toDataURL('image/png')
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        isDownloading.current = false
        document.body.style.cursor = 'default'
      }
    } catch (err) {
      console.error('Download failed:', err)
      isDownloading.current = false
      document.body.style.cursor = 'default'
    }
  }, [guest.prenom])

  // Download official .ics Calendar Invitation for Apple/Google Calendar
  const handleAddToCalendar = useCallback(async () => {
    try {
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//2K Events//Porsche Cayenne E4 Launch//FR',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `SUMMARY:Porsche Cayenne E4 Electric Launch — Domaine Neferis`,
        `DESCRIPTION:Invitation VIP Officielle pour ${guest.prenom} ${guest.nom}. Heritage × Future : Lancement dynamique du Cayenne Electric E4 au Domaine Neferis organisé par 2K Events × Porsche Middle East & Africa. Code d'accès: ${guest.guestId}`,
        `LOCATION:${EVENT.venue}, ${EVENT.city}`,
        'DTSTART:20260618T080000Z',
        'DTEND:20260621T180000Z',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR',
      ].join('\r\n')

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
      triggerBlobDownload(blob, `invitation-cayenne-e4-neferis.ics`)
    } catch (err) {
      console.error('Calendar export failed:', err)
    }
  }, [guest.prenom, guest.nom, guest.guestId])

  // Copy pass invitation code to clipboard
  const handleCopyCode = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(guest.guestId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [guest.guestId])

  // 3D Holographic Tilt & Glare Tracking
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 })

  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rX = ((y - centerY) / centerY) * -10
    const rY = ((x - centerX) / centerX) * 10

    setRotateX(rX)
    setRotateY(rY)
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    })
  }, [])

  const handleCardMouseLeave = useCallback(() => {
    setRotateX(0)
    setRotateY(0)
    setGlarePos((prev) => ({ ...prev, opacity: 0 }))
  }, [])

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center gap-5 w-full max-w-[440px] mx-auto [perspective:1000px]"
    >
      {/* Success banner */}
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.2)]"
      >
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        <p className="font-sans font-semibold text-xs tracking-wide">
          Accréditation VIP Confirmée avec Succès
        </p>
      </motion.div>

      {/* Official 2K Events x Porsche VIP Invitation Pass (3D Reactive Tilt) */}
      <motion.div
        ref={cardRef}
        variants={scaleIn}
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: rotateX === 0 && rotateY === 0 ? 'transform 0.5s ease-out' : 'transform 0.08s ease-out',
        }}
        className={cn(
          'relative w-full cursor-grab active:cursor-grabbing',
          'bg-[#0E1015] rounded-[2.2rem] overflow-hidden',
          'border-2 border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.95)]',
          'will-change-transform select-none'
        )}
      >
        {/* Checkered Top Ribbon Band */}
        <PorscheCheckeredBand variant="slim" />

        {/* 3D Holographic Iridescent Sheen Layer */}
        <div
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle 240px at ${glarePos.x}% ${glarePos.y}%, rgba(224, 104, 28, 0.25) 0%, rgba(109, 128, 128, 0.2) 40%, transparent 80%)`,
            mixBlendMode: 'screen',
          }}
        />

        {/* Lanyard Slot Cutout Hole at Top with metallic ring */}
        <div className="pt-3 pb-2 flex justify-center bg-[#07080B] border-b border-white/5">
          <div className="w-16 h-2 rounded-full bg-black border border-white/25 shadow-inner flex items-center justify-center">
            <div className="w-10 h-0.5 rounded-full bg-white/15" />
          </div>
        </div>

        {/* Top Header — 2K EVENTS × PORSCHE CO-BRANDING */}
        <div className="relative px-4 sm:px-6 pt-4 sm:pt-5 pb-4 sm:pb-5 bg-gradient-to-b from-[#181512] via-[#10121A] to-[#0E1015] overflow-hidden border-b border-white/10">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#E0681C]/20 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute top-0 left-0 w-40 h-40 bg-[#6D8080]/20 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-2.5 sm:gap-3 text-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className="relative w-36 xs:w-44 sm:w-52 h-12 xs:h-14 sm:h-16 flex items-center justify-center">
                <Image
                  src="/2k.png"
                  alt="2K Events Logo"
                  width={220}
                  height={80}
                  className="object-contain w-auto h-full max-h-16 brightness-125 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  priority
                />
              </div>

              {/* Co-Branding Presentation Bar */}
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.28em] uppercase text-gray-400 mt-0.5">
                <span>PORSCHE MEA</span>
                <span className="text-[#E0681C] font-bold">×</span>
                <span className="text-white font-extrabold tracking-[0.25em]">2K EVENTS</span>
              </div>
            </div>

            {/* Event Title Badge */}
            <div className="flex flex-col items-center gap-1">
              <h3 className="font-outfit font-black text-lg xs:text-xl sm:text-2xl tracking-[0.1em] xs:tracking-[0.14em] text-white uppercase leading-tight">
                CAYENNE E4 LAUNCH
              </h3>
              <p className="font-mono text-[8px] xs:text-[9px] text-[#A8D5E2] uppercase tracking-[0.2em] xs:tracking-[0.25em]">
                HERITAGE × FUTURE · LE DOMAINE NEFERIS
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E0681C] text-white font-mono text-[9px] font-black tracking-widest uppercase shadow-[0_0_20px_rgba(224, 104, 28,0.5)] border border-white/30">
              <Sparkles className="w-2.5 h-2.5 text-white animate-pulse" />
              PORTAIL C@P · ACCRÉDITATION OFFICIELLE
            </div>
          </div>
        </div>

        {/* Middle Section: Guest Identification */}
        <div className="px-6 py-4 text-center border-b border-dashed border-white/15 relative bg-black/30">
          <p className="font-sans text-gray-400 text-[9px] uppercase tracking-[0.28em] mb-1 font-semibold">
            TITULAIRE DE L'INVITATION
          </p>
          <h4 className="font-outfit font-black text-white text-2xl sm:text-3xl tracking-wide uppercase leading-tight">
            {guest.prenom} {guest.nom}
          </h4>
          
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E0681C]/15 border border-[#E0681C]/40 font-mono text-[11px] font-bold text-[#FF7A45] uppercase tracking-wider shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E0681C] animate-ping" />
              {guest.fonction}
            </span>
          </div>

          {guest.sessionSlot && (
            <p className="font-sans text-[11px] text-gray-300 mt-2 font-medium">
              {guest.sessionSlot}
            </p>
          )}
        </div>

        {/* Bottom Section: QR Code & Event Specs */}
        <div className="px-6 pt-4 pb-5 flex flex-col items-center gap-4 bg-[#0B0D12]">
          {/* QR Code Container with Terracotta Precision Brackets */}
          <div className="relative p-3.5 bg-white rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] border border-white/20">
            {/* Corner brackets in Porsche Terracotta */}
            <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-[#E0681C] pointer-events-none" />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-[#E0681C] pointer-events-none" />
            <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-[#E0681C] pointer-events-none" />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-[#E0681C] pointer-events-none" />

            <QRCodeSVG
              value={guest.qrData}
              size={175}
              level="H"
              includeMargin={false}
              fgColor="#08090C"
              bgColor="#FFFFFF"
            />
          </div>

          <p className="font-mono text-[9px] text-gray-400 tracking-[0.25em] uppercase text-center font-bold">
            SCAN UNIQUE AUX PORTIQUES D'ACCÈS NEFERIS
          </p>

          {/* Event & Venue Specs Grid */}
          <div className="grid grid-cols-2 w-full gap-2 pt-3 border-t border-white/10 text-left text-xs">
            <div>
              <div className="flex items-center gap-1.5 text-gray-400 mb-0.5">
                <Clock className="w-3 h-3 text-[#E0681C] flex-shrink-0" />
                <p className="text-[9px] uppercase font-sans tracking-wider font-semibold">Date & Heure</p>
              </div>
              <p className="text-xs text-gray-100 font-sans font-bold">{EVENT.dateLabel}</p>
              <p className="text-[10px] text-[#E0681C] font-mono font-medium">{EVENT.timeLabel}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-1.5 text-gray-400 mb-0.5">
                <MapPin className="w-3 h-3 text-[#00B4C6] flex-shrink-0" />
                <p className="text-[9px] uppercase font-sans tracking-wider font-semibold">Lieu de Lancement</p>
              </div>
              <p className="text-xs text-gray-100 font-sans font-bold">Le Domaine Neferis</p>
              <p className="text-[10px] text-gray-400 font-sans">Avenue SUV & Salon d'Honneur</p>
            </div>
          </div>

          {/* Security Pass Serial */}
          <div className="flex items-center justify-between w-full pt-2 border-t border-white/5 text-[9px] text-gray-500 font-mono tracking-widest uppercase">
            <span>PASS ID: {guest.guestId.toUpperCase()}</span>
            <span className="text-[#E0681C] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              PME-E4-2026
            </span>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons Suite */}
      <div className="w-full flex flex-col gap-2.5">
        {/* Download Pass Image Button */}
        <motion.button
          variants={fadeUp}
          onClick={handleDownload}
          className="w-full py-4 px-6 rounded-xl font-outfit font-black text-xs uppercase tracking-[0.2em] text-white shadow-[0_10px_25px_rgba(224, 104, 28,0.35)] flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #E0681C 0%, #6D8080 100%)',
          }}
        >
          <Download className="w-4 h-4" />
          <span>Télécharger Mon Pass VIP (HD)</span>
        </motion.button>

        {/* Secondary actions grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5">
          <button
            onClick={handleAddToCalendar}
            className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-sans text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#00B4C6]" />
            <span>Ajouter au Calendrier</span>
          </button>

          <button
            onClick={handleCopyCode}
            className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-sans text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Code Copié</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-gray-400" />
                <span>Copier Code Pass</span>
              </>
            )}
          </button>
        </div>

        {onReset && (
          <button
            onClick={onReset}
            className="mt-1 text-center font-mono text-[11px] text-gray-500 hover:text-[#E0681C] transition-colors py-1 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Enregistrer un autre invité</span>
          </button>
        )}
      </div>
    </motion.div>
  )
}
