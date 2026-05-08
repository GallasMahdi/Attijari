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
    bg: 'from-emerald-900/95 to-emerald-800/95',
    border: 'border-emerald-500',
    iconColor: 'text-emerald-400',
    title: 'Bienvenue !',
  },
  already_scanned: {
    icon: AlertTriangle,
    bg: 'from-amber-900/95 to-amber-800/95',
    border: 'border-amber-500',
    iconColor: 'text-amber-400',
    title: 'Déjà enregistré',
  },
  invalid: {
    icon: XCircle,
    bg: 'from-red-900/95 to-red-800/95',
    border: 'border-red-500',
    iconColor: 'text-red-400',
    title: 'QR invalide',
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
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -10 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`relative rounded-2xl border ${cfg.border} bg-gradient-to-br ${cfg.bg} backdrop-blur-md p-6 shadow-2xl`}
      >
        <button
          onClick={onDismiss}
          className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
          >
            <Icon className={`w-10 h-10 ${cfg.iconColor}`} />
          </motion.div>

          <div className="flex-1">
            <h3 className="font-playfair text-xl font-bold text-white mb-1">{cfg.title}</h3>

            {result.guest && (
              <div className="mb-3">
                <p className="font-montserrat font-bold text-white text-lg">
                  {result.guest.prenom} {result.guest.nom}
                </p>
                <p className="font-montserrat text-sm text-white/60">
                  {result.guest.fonction}
                </p>
                {result.status === 'valid' && (
                  <p className="font-montserrat text-xs text-white/40 mt-1">
                    Enregistré à {new Date(result.guest.arrivedAt).toLocaleTimeString('fr-TN', {
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                )}
              </div>
            )}

            <p className="font-montserrat text-sm text-white/70">{result.message}</p>
          </div>
        </div>

        {/* Auto-dismiss progress bar for valid scans */}
        {result.status === 'valid' && (
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-emerald-400 rounded-b-2xl"
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
