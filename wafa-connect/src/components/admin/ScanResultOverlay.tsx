'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react'
import type { ScanResult } from '@/types/guest'

interface ScanResultOverlayProps {
  result: ScanResult | null
  onDismiss: () => void
}

const CONFIG = {
  valid: {
    icon: CheckCircle2,
    bg: 'from-[#0A1A12] to-[#0E1015]',
    border: 'border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.2)]',
    iconColor: 'text-emerald-400',
    title: 'Accès Paddock Autorisé',
    titleColor: 'text-emerald-400',
  },
  already_scanned: {
    icon: AlertTriangle,
    bg: 'from-[#1A1408] to-[#0E1015]',
    border: 'border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.2)]',
    iconColor: 'text-amber-400',
    title: 'Passage Déjà Effectué',
    titleColor: 'text-amber-400',
  },
  invalid: {
    icon: XCircle,
    bg: 'from-[#200A0D] to-[#0E1015]',
    border: 'border-red-500/40 shadow-[0_0_30px_rgba(213,0,28,0.2)]',
    iconColor: 'text-red-400',
    title: 'Accréditation Non Reconnue',
    titleColor: 'text-red-400',
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
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -10 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={`relative rounded-3xl border ${cfg.border} bg-gradient-to-br ${cfg.bg} p-6 backdrop-blur-xl`}
      >
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.05, type: 'spring', stiffness: 350 }}
          >
            <Icon className={`w-10 h-10 ${cfg.iconColor}`} />
          </motion.div>

          <div className="flex-1">
            <h3 className={`font-montserrat text-base font-bold uppercase tracking-wider ${cfg.titleColor} mb-1.5`}>
              {cfg.title}
            </h3>

            {result.guest && (
              <div className="mb-3">
                <p className="font-montserrat font-black text-white text-xl leading-tight">
                  {result.guest.prenom} {result.guest.nom}
                </p>
                <p className="font-montserrat text-xs text-red-400 font-bold uppercase tracking-wider mt-0.5">
                  {result.guest.fonction}
                </p>
                {result.status === 'valid' && (
                  <p className="font-montserrat text-[10px] text-gray-400 uppercase tracking-widest mt-2">
                    Horodaté à {new Date(result.guest.arrivedAt).toLocaleTimeString('fr-FR', {
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                )}
              </div>
            )}

            <p className="font-montserrat text-xs text-gray-300 leading-relaxed">{result.message}</p>
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
