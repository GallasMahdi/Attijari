'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertTriangle, XCircle, X, ShieldCheck } from 'lucide-react'
import type { ScanResult } from '@/types/guest'

interface ScanResultOverlayProps {
  result: ScanResult | null
  onDismiss: () => void
}

const CONFIG = {
  valid: {
    icon: CheckCircle2,
    bg: 'from-[#0A1A12] to-[#0E1015]',
    border: 'border-emerald-500/40 shadow-[0_0_35px_rgba(16,185,129,0.25)]',
    iconColor: 'text-emerald-400',
    title: 'Accès VIP Prestige Autorisé',
    titleColor: 'text-emerald-400',
  },
  already_scanned: {
    icon: AlertTriangle,
    bg: 'from-[#1E1408] to-[#0E1015]',
    border: 'border-amber-500/40 shadow-[0_0_35px_rgba(245,158,11,0.25)]',
    iconColor: 'text-amber-400',
    title: 'Passage Déjà Validé',
    titleColor: 'text-amber-400',
  },
  invalid: {
    icon: XCircle,
    bg: 'from-[#220E0E] to-[#0E1015]',
    border: 'border-[#E0681C]/50 shadow-[0_0_35px_rgba(224,104,28,0.25)]',
    iconColor: 'text-[#E0681C]',
    title: 'Accréditation Non Reconnue',
    titleColor: 'text-[#E0681C]',
  },
}

export function ScanResultOverlay({ result, onDismiss }: ScanResultOverlayProps) {
  if (!result) return null
  const cfg = CONFIG[result.status]
  const Icon = cfg.icon

  return (
    <AnimatePresence>
      <motion.div
        key={result.message}
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: -10 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={`relative rounded-3xl border ${cfg.border} bg-gradient-to-br ${cfg.bg} p-6 backdrop-blur-xl`}
      >
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Fermer la notification de scan"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.05, type: 'spring', stiffness: 350 }}
            className="flex-shrink-0"
          >
            <Icon className={`w-10 h-10 ${cfg.iconColor}`} />
          </motion.div>

          <div className="flex-1 min-w-0">
            <h3 className={`font-outfit text-base font-black uppercase tracking-wider ${cfg.titleColor} mb-1.5`}>
              {cfg.title}
            </h3>

            {result.guest && (
              <div className="mb-3">
                <p className="font-outfit font-black text-white text-xl leading-tight">
                  {result.guest.prenom} {result.guest.nom}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-sans text-xs text-[#E0681C] font-bold uppercase tracking-wider">
                    {result.guest.fonction}
                  </span>
                  <span className="text-white/20">·</span>
                  <span className="inline-flex items-center gap-1 font-mono text-[9px] text-[#6D8080] font-semibold">
                    <ShieldCheck className="w-3 h-3 text-[#E0681C]" />
                    Pass VIP Prestige
                  </span>
                </div>
                {result.status === 'valid' && (
                  <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mt-2">
                    Horodaté à {new Date(result.guest.arrivedAt).toLocaleTimeString('fr-FR', {
                      hour: '2-digit', minute: '2-digit'
                    })} · Domaine Neferis
                  </p>
                )}
              </div>
            )}

            <p className="font-sans text-xs text-gray-300 leading-relaxed">{result.message}</p>
          </div>
        </div>

        {/* Auto-dismiss progress bar for valid scans */}
        {result.status === 'valid' && (
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-b-2xl shadow-[0_0_8px_#10b981]"
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 4, ease: 'linear' }}
            onAnimationComplete={onDismiss}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
