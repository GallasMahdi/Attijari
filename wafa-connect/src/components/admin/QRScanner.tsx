'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { motion } from 'framer-motion'
import { Camera, CameraOff, ScanLine, AlertCircle } from 'lucide-react'

interface QRScannerProps {
  onScan: (data: string) => void
  isProcessing: boolean
}

const playBeep = () => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioCtx) return
    const context = new AudioCtx()
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(960, context.currentTime) // High crisp notification beep
    gain.gain.setValueAtTime(0, context.currentTime)
    gain.gain.linearRampToValueAtTime(0.12, context.currentTime + 0.01)
    gain.gain.linearRampToValueAtTime(0, context.currentTime + 0.18)
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + 0.18)
  } catch (e) {
    console.warn('Audio feedback failed:', e)
  }
}

export function QRScanner({ onScan, isProcessing }: QRScannerProps) {
  const [active, setActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const isProcessingRef = useRef(isProcessing)
  const isMountedRef = useRef(true)
  const divId = 'qr-reader'

  // Keep ref in sync so scan callback gets current state without re-creating scanner
  useEffect(() => {
    isProcessingRef.current = isProcessing
  }, [isProcessing])

  useEffect(() => {
    isMountedRef.current = true
    return () => { isMountedRef.current = false }
  }, [])

  const stopScanner = useCallback(async () => {
    const scanner = scannerRef.current
    if (!scanner) return
    try {
      if (scanner.isScanning) {
        await scanner.stop()
      }
      await scanner.clear()
    } catch (err) {
      console.warn('Stop/clear error (safe to ignore):', err)
    } finally {
      scannerRef.current = null
      if (isMountedRef.current) setActive(false)
    }
  }, [])

  const startScanner = useCallback(async () => {
    if (scannerRef.current) {
      await stopScanner()
    }

    if (isMountedRef.current) {
      setError(null)
      setActive(false)
    }

    try {
      // Secure context check
      if (
        typeof window !== 'undefined' &&
        window.location.protocol !== 'https:' &&
        window.location.hostname !== 'localhost'
      ) {
        throw new Error('INSECURE_CONTEXT')
      }

      // Explicitly request camera permission first
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      stream.getTracks().forEach(t => t.stop())

      const devices = await Html5Qrcode.getCameras()
      if (!devices || devices.length === 0) {
        const err = new Error('No camera found')
        ;(err as any).name = 'NotFoundError'
        throw err
      }

      const scanner = new Html5Qrcode(divId, { verbose: false })
      scannerRef.current = scanner

      await scanner.start(
        { facingMode: 'environment' },
        { fps: 15, qrbox: { width: 260, height: 260 } },
        (decodedText) => {
          if (!isProcessingRef.current) {
            playBeep()
            onScan(decodedText)
          }
        },
        () => { /* suppress frame-level noise */ }
      )

      if (isMountedRef.current) setActive(true)
    } catch (err: any) {
      console.error('Camera error:', err)
      if (!isMountedRef.current) return

      if (err.message === 'INSECURE_CONTEXT') {
        setError('🌐 Accès sécurisé : La caméra requiert une connexion HTTPS en production.')
      } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('🔒 Accès caméra refusé. Veuillez autoriser la caméra dans les réglages de votre navigateur.')
      } else if (err.name === 'NotFoundError') {
        setError('📷 Aucun capteur optique / caméra détecté sur cet appareil.')
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setError('⚠️ La caméra est déjà utilisée par une autre application.')
      } else {
        setError(`❌ Erreur d'initialisation optique : ${err.message ?? 'Connexion impossible.'}`)
      }
      setActive(false)
      if (scannerRef.current) {
        try { await scannerRef.current.clear() } catch (_) { }
        scannerRef.current = null
      }
    }
  }, [onScan, stopScanner])

  useEffect(() => {
    return () => {
      const scanner = scannerRef.current
      if (scanner) {
        if (scanner.isScanning) {
          scanner.stop()
            .then(() => {
              try { scanner.clear() } catch (e) {}
            })
            .catch(() => { })
        } else {
          try { scanner.clear() } catch (e) {}
        }
        scannerRef.current = null
      }
    }
  }, [])

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Camera Viewfinder */}
      <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden bg-black border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        <div id={divId} className="w-full h-full" />

        {active && !isProcessing && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ border: '2px solid rgba(224, 104, 28, 0.4)', borderRadius: '16px' }}
          >
            {/* Porsche Terracotta High-Speed Optical Laser Sweep */}
            <motion.div
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#E0681C] to-transparent shadow-[0_0_12px_#E0681C]"
              animate={{ top: ['6%', '94%', '6%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Brackets */}
            {[
              'top-3 left-3 border-t-2 border-l-2',
              'top-3 right-3 border-t-2 border-r-2',
              'bottom-3 left-3 border-b-2 border-l-2',
              'bottom-3 right-3 border-b-2 border-r-2',
            ].map((cls, i) => (
              <div key={i} className={`absolute w-6 h-6 border-[#E0681C] rounded-sm ${cls}`} />
            ))}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/70 border border-[#E0681C]/40 backdrop-blur-md">
              <span className="font-mono text-[8px] uppercase tracking-widest text-[#E0681C] font-bold">
                ALIGNER LE CODE QR VIP
              </span>
            </div>
          </motion.div>
        )}

        {!active && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0B0C10]/95 backdrop-blur-sm p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#E0681C]/10 border border-[#E0681C]/25 flex items-center justify-center">
              <Camera className="w-8 h-8 text-[#E0681C]" />
            </div>
            <p className="font-outfit text-xs text-gray-300 font-semibold tracking-wide">
              Activez le capteur optique pour valider les Pass VIP Prestige
            </p>
            <span className="font-mono text-[9px] text-[#6D8080]">Domaine Neferis · Contrôle d'accès</span>
          </div>
        )}

        {isProcessing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/80 backdrop-blur-sm">
            <motion.div
              className="w-12 h-12 border-2 border-[#E0681C] border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
            />
            <span className="font-mono text-[9px] uppercase tracking-widest text-white font-bold animate-pulse">
              Vérification de l'Accréditation...
            </span>
          </div>
        )}
      </div>

      {error && (
        <div className="flex flex-col gap-3 max-w-sm w-full">
          <div className="flex items-start gap-2 p-3 bg-[#E0681C]/10 border border-[#E0681C]/30 rounded-xl">
            <AlertCircle className="w-4 h-4 text-[#E0681C] flex-shrink-0 mt-0.5" />
            <p className="font-sans text-xs text-gray-200 leading-relaxed">
              {error}
            </p>
          </div>
          {error.includes('autoriser') && (
            <div className="p-3 bg-black/50 border border-white/10 rounded-xl">
              <p className="font-mono text-[#E0681C] text-[10px] font-bold uppercase tracking-wider mb-2">
                💡 Instructions d'activation de la caméra :
              </p>
              <ol className="font-sans text-gray-300 text-[11px] space-y-1 list-decimal pl-4">
                <li>Touchez l'icône de <b>cadenas ou réglages</b> dans la barre d'adresse.</li>
                <li>Autorisez la <b>Caméra</b> pour ce site.</li>
                <li>Actualisez la page et relancez le terminal.</li>
              </ol>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-3">
        {!active ? (
          <button
            onClick={startScanner}
            className="flex items-center gap-2 px-7 py-3.5 bg-[#E0681C] hover:bg-[#ff7a26] text-white font-outfit font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-[0_0_25px_rgba(224,104,28,0.5)] transition-all cursor-pointer active:scale-95"
          >
            <ScanLine className="w-4 h-4" />
            <span>Activer le Terminal Optique</span>
          </button>
        ) : (
          <button
            onClick={stopScanner}
            className="flex items-center gap-2 px-7 py-3.5 bg-white/10 border border-white/20 text-white font-outfit font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#E0681C] hover:border-[#E0681C] transition-all shadow-sm cursor-pointer active:scale-95"
          >
            <CameraOff className="w-4 h-4" />
            <span>Mettre en Veille</span>
          </button>
        )}
      </div>
    </div>
  )
}