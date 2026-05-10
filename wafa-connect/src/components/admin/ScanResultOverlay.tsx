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
    bg: 'from-emerald-50 to-white',
    border: 'border-emerald-200',
    iconColor: 'text-emerald-500',
    title: 'Bienvenue !',
    titleColor: 'text-emerald-700',
  },
  already_scanned: {
    icon: AlertTriangle,
    bg: 'from-amber-50 to-white',
    border: 'border-amber-200',
    iconColor: 'text-amber-500',
    title: 'Déjà enregistré',
    titleColor: 'text-amber-700',
  },
  invalid: {
    icon: XCircle,
    bg: 'from-red-50 to-white',
    border: 'border-red-200',
    iconColor: 'text-red-500',
    title: 'QR invalide',
    titleColor: 'text-red-700',
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
        className={`relative rounded-3xl border ${cfg.border} bg-gradient-to-br ${cfg.bg} p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)]`}
      >
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 transition-colors"
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
            <h3 className={`font-playfair text-xl font-bold ${cfg.titleColor} mb-1`}>{cfg.title}</h3>

            {result.guest && (
              <div className="mb-4">
                <p className="font-montserrat font-bold text-wafa-dark text-xl leading-tight">
                  {result.guest.prenom} {result.guest.nom}
                </p>
                <p className="font-montserrat text-sm text-gray-500 font-medium">
                  {result.guest.fonction}
                </p>
                {result.status === 'valid' && (
                  <p className="font-montserrat text-[10px] text-gray-400 uppercase tracking-widest mt-2 font-bold">
                    Enregistré à {new Date(result.guest.arrivedAt).toLocaleTimeString('fr-TN', {
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                )}
              </div>
            )}

            <p className="font-montserrat text-sm text-gray-600 leading-relaxed font-medium">{result.message}</p>
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
