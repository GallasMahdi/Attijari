// src/components/ui/GuestQRCard.tsx
'use client'
import { useRef, useCallback } from 'react'
import Image from 'next/image'
import { QRCodeSVG } from 'qrcode.react'
import { motion } from 'framer-motion'
import { Download, Calendar, MapPin, User, CheckCircle } from 'lucide-react'
import { saveAs } from 'file-saver'
import html2canvas from 'html2canvas'
import { GuestResponse } from '@/types/guest'
import { EVENT, COLORS } from '@/lib/constants'
import { scaleIn, fadeUp, staggerContainer } from '@/lib/animations'
import { cn } from '@/lib/utils'
import { TexturePattern } from './TexturePattern'

interface GuestQRCardProps {
  guest: GuestResponse
}

export function GuestQRCard({ guest }: GuestQRCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isDownloading = useRef(false) // Use ref for immediate state in callback

  const handleDownload = useCallback(async () => {
    if (!cardRef.current || isDownloading.current) return
    isDownloading.current = true

    // Create a temporary loading toast/feedback if needed, but for now we'll just disable the button
    document.body.style.cursor = 'wait'

    try {
      // Ensure images/textures are ready
      await new Promise(resolve => setTimeout(resolve, 300))

      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 3, // Ultra-sharp
        useCORS: true,
        allowTaint: true,
        logging: false,
      })

      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `invitation-wafa-connect-${guest.prenom.toLowerCase()}.png`)
        }
        isDownloading.current = false
        document.body.style.cursor = 'default'
      }, 'image/png', 1.0)
    } catch (err) {
      console.error('Download failed:', err)
      isDownloading.current = false
      document.body.style.cursor = 'default'
    }
  }, [guest.prenom])

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center gap-6"
    >
      {/* Success message */}
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-3 text-wafa-dark"
      >
        <CheckCircle className="w-6 h-6" />
        <p className="font-montserrat font-medium text-base">
          {guest.message}
        </p>
      </motion.div>

      {/* Card (captured by html2canvas) */}
      <motion.div
        ref={cardRef}
        variants={scaleIn}
        className={cn(
          'relative w-full max-w-sm',
          'bg-white rounded-[2.5rem] overflow-hidden',
          'border border-gray-200 shadow-2xl'
        )}
      >
        {/* Top Section */}
        <div className="relative p-8 pb-8 bg-gradient-to-br from-wafa-cream to-white overflow-hidden">
          {/* Subtle texture */}
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
            <TexturePattern src="/pattern.jpeg" opacity={1} />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Dual Logos Container */}
            <div className="bg-white/95 px-6 py-4 rounded-2xl flex items-center justify-center gap-6 w-full shadow-xl">
              <div className="relative w-32 h-10">
                <Image src="/logo2.png" alt="Attijari" fill className="object-contain" />
              </div>
              <div className="w-px h-8 bg-black/10" />
              <div className="relative w-28 h-10">
                <Image src="/wafa.png" alt="Wafa" fill className="object-contain" />
              </div>
            </div>

            <div className="text-center">
              <p className="font-montserrat text-wafa-gold text-[10px] tracking-[0.4em] uppercase mb-2">
                Invitation Officielle
              </p>
              <h3 className="font-playfair font-bold text-wafa-dark text-3xl tracking-tight leading-none">
                Wafa <span className="text-wafa-gold italic">Connect</span>
              </h3>
            </div>
          </div>

          {/* Decorative radial light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-wafa-gold/10 blur-[100px] rounded-full" />
        </div>

        {/* Perforated Divider */}
        <div className="relative h-6 bg-white flex items-center justify-between">
          <div className="absolute left-0 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-r border-gray-200" />
          <div className="w-full border-t border-dashed border-gray-300 mx-4" />
          <div className="absolute right-0 translate-x-1/2 w-6 h-6 rounded-full bg-white border-l border-gray-200" />
        </div>

        {/* Bottom Section */}
        <div className="relative p-8 pt-6 flex flex-col items-center gap-8">
          <div className="text-center space-y-1">
            <p className="font-montserrat text-gray-500 text-[10px] uppercase tracking-[0.2em]">Accès Privilégié</p>
            <h4 className="font-playfair font-bold text-wafa-dark text-2xl">
              {guest.prenom} {guest.nom}
            </h4>
            <p className="font-montserrat text-wafa-gold/80 text-xs font-medium leading-none">{guest.fonction}</p>
          </div>

          {/* QR Code */}
          <div className="relative group">
            <div className="absolute inset-0 bg-wafa-gold/20 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-700" />

            <div className="relative p-5 bg-white rounded-3xl shadow-2xl">
              <QRCodeSVG
                value={guest.qrData}
                size={180}
                level="M"
                includeMargin={true}
                fgColor={COLORS.dark}
                bgColor="#FFFFFF"
              />
              <div className="absolute -inset-1 border-2 border-wafa-gold/20 rounded-[2rem] pointer-events-none" />
            </div>
          </div>

          {/* Info */}
          <div className="grid grid-cols-2 w-full gap-4 pt-4 border-t border-wafa-gold/10">
            <div className="space-y-1">
              <p className="text-[10px] text-gray-400 uppercase font-montserrat tracking-wider">Date & Heure</p>
              <p className="text-sm text-gray-700 font-montserrat font-medium">{EVENT.dateLabel} — 18h00</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] text-gray-400 uppercase font-montserrat tracking-wider">Lieu</p>
              <p className="text-sm text-gray-700 font-montserrat font-medium">{EVENT.city}</p>
            </div>
          </div>

          <p className="text-[9px] text-wafa-gold/40 uppercase tracking-[0.2em] font-montserrat">
            Accès strictement personnel • Code {guest.guestId.slice(-6).toUpperCase()}
          </p>
        </div>
      </motion.div>

      {/* Download Button */}
      <motion.button
        variants={fadeUp}
        onClick={handleDownload}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl 
                   font-montserrat font-semibold text-sm text-wafa-dark
                   bg-gradient-gold hover:shadow-gold-md 
                   transition-all duration-300 tracking-wide
                   disabled:opacity-50 disabled:cursor-wait"
      >
        <Download className="w-4 h-4" />
        Télécharger Mon Invitation (Photo)
      </motion.button>
    </motion.div>
  )
}

