// src/components/ui/InvitationUnboxingModal.tsx
'use client'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, QrCode, ShieldCheck, ArrowRight, Sparkles, ScanLine, Clock, MapPin } from 'lucide-react'
import { PorscheWordmark } from '@/components/ui/PorscheLogo'
import { smoothScrollTo } from '@/lib/scroll'
import { EVENT } from '@/lib/constants'

interface InvitationUnboxingModalProps {
  isOpen: boolean
  onClose: () => void
  onRSVPClick?: () => void
}

const perks = [
  {
    icon: ShieldCheck,
    color: '#E0681C',
    bg: 'rgba(224,104,28,0.12)',
    border: 'rgba(224,104,28,0.3)',
    title: 'Accès VIP Garanti',
    desc: 'Scan unique à l\'entrée — aucune file d\'attente, accueil prioritaire.',
  },
  {
    icon: ScanLine,
    color: '#6D8080',
    bg: 'rgba(109,128,128,0.12)',
    border: 'rgba(109,128,128,0.25)',
    title: 'Pass Essais Dynamiques',
    desc: 'Déblocage des créneaux d\'essai Cayenne E4 lors du scan.',
  },
  {
    icon: Clock,
    color: '#E0681C',
    bg: 'rgba(224,104,28,0.12)',
    border: 'rgba(224,104,28,0.3)',
    title: 'Confirmation Instantanée',
    desc: 'Reçu par e-mail dès validation — valable jusqu\'au jour J.',
  },
]

export function InvitationUnboxingModal({ isOpen, onClose, onRSVPClick }: InvitationUnboxingModalProps) {
  const handleCTA = () => {
    onClose()
    if (onRSVPClick) {
      onRSVPClick()
    } else {
      smoothScrollTo('#confirmer', -70, 0.95)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0E1015] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.95)] z-10 flex flex-col"
          >
            {/* Clean top hairline */}
            <div className="h-[2px] w-full bg-[#E0681C]" />

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#E0681C]/15 border border-[#E0681C]/30 flex items-center justify-center text-[#E0681C]">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <PorscheWordmark className="h-2.5 w-auto text-white/80" />
                    <span className="text-[#E0681C] font-bold text-[8px]">·</span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#E0681C] font-bold">
                      INVITATION DIGITALE
                    </span>
                  </div>
                  <h3 className="font-outfit text-lg sm:text-xl font-black text-white uppercase tracking-wider">
                    Votre Pass QR Code · Cayenne E4
                  </h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8 items-center">

              {/* Left: QR Preview */}
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="relative w-full max-w-[260px] mx-auto">
                  {/* Glow ring */}
                  <div className="absolute -inset-3 rounded-3xl bg-[#E0681C]/15 blur-xl pointer-events-none" />

                  <div className="relative rounded-2xl bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10">
                    {/* Mock QR grid */}
                    <div className="w-full aspect-square bg-white flex items-center justify-center rounded-lg overflow-hidden">
                      <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
                        {/* Corner squares */}
                        <rect x="10" y="10" width="50" height="50" rx="4" fill="#08090C"/>
                        <rect x="17" y="17" width="36" height="36" rx="2" fill="white"/>
                        <rect x="24" y="24" width="22" height="22" rx="1" fill="#08090C"/>

                        <rect x="140" y="10" width="50" height="50" rx="4" fill="#08090C"/>
                        <rect x="147" y="17" width="36" height="36" rx="2" fill="white"/>
                        <rect x="154" y="24" width="22" height="22" rx="1" fill="#08090C"/>

                        <rect x="10" y="140" width="50" height="50" rx="4" fill="#08090C"/>
                        <rect x="17" y="147" width="36" height="36" rx="2" fill="white"/>
                        <rect x="24" y="154" width="22" height="22" rx="1" fill="#08090C"/>

                        {/* Data dots pattern */}
                        {[75,85,95,105,115,125].map((x) =>
                          [10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190].map((y) => {
                            const hash = ((x * 7 + y * 13) % 3)
                            return hash === 0 ? (
                              <rect key={`${x}-${y}`} x={x} y={y} width="7" height="7" rx="1" fill="#08090C"/>
                            ) : null
                          })
                        )}
                        {[10,20,30,40,50,60,70].map((x) =>
                          [75,85,95,105,115,125,135].map((y) => {
                            const hash = ((x * 11 + y * 5) % 3)
                            return hash === 0 ? (
                              <rect key={`${x}-${y}`} x={x} y={y} width="7" height="7" rx="1" fill="#08090C"/>
                            ) : null
                          })
                        )}
                        {[130,140,150,160,170,180,190].map((x) =>
                          [75,85,95,105,115,125,135].map((y) => {
                            const hash = ((x * 3 + y * 17) % 3)
                            return hash === 0 ? (
                              <rect key={`${x}-${y}`} x={x} y={y} width="7" height="7" rx="1" fill="#08090C"/>
                            ) : null
                          })
                        )}

                        {/* Center logo placeholder */}
                        <rect x="85" y="85" width="30" height="30" rx="4" fill="white" stroke="#E0681C" strokeWidth="1.5"/>
                        <text x="100" y="105" textAnchor="middle" fontSize="16" fill="#E0681C" fontWeight="bold">P</text>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Status badge */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#E0681C]/10 border border-[#E0681C]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E0681C] animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#E0681C] font-bold">
                    En attente de confirmation RSVP
                  </span>
                </div>

                {/* Event info */}
                <div className="flex items-center gap-2 text-gray-400 text-[11px]">
                  <MapPin className="w-3 h-3 text-[#E0681C] flex-shrink-0" />
                  <span>{EVENT.dateLabel} · {EVENT.venue}</span>
                </div>
              </div>

              {/* Right: Info */}
              <div className="flex flex-col justify-between h-full space-y-5">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0681C]/10 border border-[#E0681C]/30 mb-3">
                    <Sparkles className="w-3 h-3 text-[#E0681C]" />
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#E0681C] font-semibold">
                      PASS NUMÉRIQUE OFFICIEL
                    </span>
                  </div>

                  <h4 className="font-outfit text-2xl font-black text-white uppercase tracking-wide mb-3">
                    Confirmation = QR Généré
                  </h4>

                  <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed mb-5">
                    Après validation de votre RSVP, votre invitation personnelle QR sera générée instantanément.
                    Présentez-la à l'entrée du Domaine Neferis pour un accueil VIP sans friction.
                  </p>

                  {/* Perks list */}
                  <div className="space-y-3">
                    {perks.map(({ icon: Icon, color, bg, border, title, desc }) => (
                      <div
                        key={title}
                        className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-colors"
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: bg, border: `1px solid ${border}`, color }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="font-outfit text-xs font-bold text-white uppercase tracking-wider">
                            {title}
                          </h5>
                          <p className="font-sans text-[11px] text-gray-400 mt-0.5">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left">
                    <p className="font-outfit text-xs font-bold text-white uppercase tracking-wider">
                      Places strictement limitées
                    </p>
                    <p className="font-mono text-[10px] text-gray-400">
                      290 participants · Domaine Neferis
                    </p>
                  </div>
                  <button
                    onClick={handleCTA}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl font-outfit text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer bg-[#E0681C] hover:bg-[#ff7a26] shadow-[0_0_20px_rgba(224,104,28,0.35)]"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Générer Mon QR · RSVP</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
