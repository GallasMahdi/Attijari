'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { motion } from 'framer-motion'
import { Camera, CameraOff } from 'lucide-react'

interface QRScannerProps {
  onScan: (data: string) => void
  isProcessing: boolean
}

const playBeep = () => {
  try {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(880, context.currentTime) // A5 note
    gain.gain.setValueAtTime(0, context.currentTime)
    gain.gain.linearRampToValueAtTime(0.1, context.currentTime + 0.01)
    gain.gain.linearRampToValueAtTime(0, context.currentTime + 0.2)
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + 0.2)
  } catch (e) {
    console.warn('Audio feedback failed:', e)
  }
}

export function QRScanner({ onScan, isProcessing }: QRScannerProps) {
  const [active, setActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const isProcessingRef = useRef(isProcessing)        // ← Fix #1: ref for stale closure
  const isMountedRef = useRef(true)                   // ← Fix #2: prevent setState after unmount
  const divId = 'qr-reader'

  // Keep the ref in sync so the scan callback always sees the latest value
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
      await scanner.clear()           // ← Fix #3: clear the DOM element fully
    } catch (err) {
      console.warn('Stop/clear error (safe to ignore):', err)
    } finally {
      scannerRef.current = null
      if (isMountedRef.current) setActive(false)
    }
  }, [])

  const startScanner = useCallback(async () => {
    // Fix #4: Prevent double-initialization
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

      // Explicitly request permission first so the browser prompt fires
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      stream.getTracks().forEach(t => t.stop())

      const devices = await Html5Qrcode.getCameras()
      if (!devices || devices.length === 0) {
        const err = new Error('No camera found'); (err as any).name = 'NotFoundError'; throw err
      }

      // Fix #5: Always create a fresh instance after clearing
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
        () => { /* suppress frame-level decode errors */ }
      )

      if (isMountedRef.current) setActive(true)
    } catch (err: any) {
      console.error('Camera error:', err)
      if (!isMountedRef.current) return

      if (err.message === 'INSECURE_CONTEXT') {
        setError('🌐 Accès refusé : La caméra nécessite une connexion HTTPS en production.')
      } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('🔒 Permission refusée. Veuillez autoriser l\'accès à la caméra dans les réglages du navigateur.')
      } else if (err.name === 'NotFoundError') {
        setError('📷 Aucune caméra détectée sur cet appareil.')
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setError('⚠️ La caméra est déjà utilisée par une autre application.')
      } else {
        setError(`❌ Erreur caméra : ${err.message ?? 'Impossible d\'accéder à la vidéo.'}`)
      }
      setActive(false)
      // Clean up partial scanner state on error
      if (scannerRef.current) {
        try { await scannerRef.current.clear() } catch (_) { }
        scannerRef.current = null
      }
    }
  }, [onScan, stopScanner]) // Fix #6: removed isProcessing — using ref instead

  // Fix #7: No timer, no auto-start — user explicitly presses the button.
  // Auto-starting on mount is the #1 cause of "permission granted but still error"
  // because the DOM may not be painted yet, or the browser blocks unprompted camera access.
  useEffect(() => {
    return () => {
      // Cleanup on unmount
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
            style={{ border: '2px solid rgba(213,0,28,0.5)', borderRadius: '16px' }}
          >
            {/* Rapid Porsche Red Laser Sweep */}
            <motion.div
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_12px_#d5001c]"
              animate={{ top: ['5%', '95%', '5%'] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            {[
              'top-3 left-3 border-t-2 border-l-2',
              'top-3 right-3 border-t-2 border-r-2',
              'bottom-3 left-3 border-b-2 border-l-2',
              'bottom-3 right-3 border-b-2 border-r-2',
            ].map((cls, i) => (
              <div key={i} className={`absolute w-6 h-6 border-red-500 rounded-sm ${cls}`} />
            ))}
          </motion.div>
        )}

        {!active && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0B0C10]/95 backdrop-blur-sm p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Camera className="w-8 h-8 text-red-500/70" />
            </div>
            <p className="font-montserrat text-xs text-gray-400 font-medium">
              Activez le capteur optique pour valider les Paddock Passes
            </p>
          </div>
        )}

        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/75 backdrop-blur-sm">
            <motion.div
              className="w-12 h-12 border-2 border-red-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        )}
      </div>

      {error && (
        <div className="flex flex-col gap-3 max-w-sm w-full">
          <p className="font-montserrat text-xs text-red-400 text-center px-4 leading-relaxed">
            {error}
          </p>
          {error.includes('Permission') && (
            <div className="mx-4 p-3 bg-red-950/40 border border-red-500/30 rounded-xl">
              <p className="font-montserrat text-red-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                💡 Action Requise :
              </p>
              <ol className="font-montserrat text-gray-300 text-[10px] space-y-1.5 list-decimal pl-4">
                <li>Cliquez sur l'icône de <b>cadenas</b> à gauche de l'URL.</li>
                <li>Autorisez l'accès à la <b>Caméra</b>.</li>
                <li>Actualisez la page puis réessayez.</li>
              </ol>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-4">
        {!active ? (
          <button
            onClick={startScanner}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-porsche-red text-white font-montserrat font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-[0_0_25px_rgba(213,0,28,0.6)] transition-all active:scale-95"
          >
            <Camera className="w-4 h-4" />
            Activer Scanner Optique
          </button>
        ) : (
          <button
            onClick={stopScanner}
            className="flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-montserrat font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-red-600 hover:border-red-600 transition-all shadow-sm active:scale-95"
          >
            <CameraOff className="w-4 h-4" />
            Mettre en Pause
          </button>
        )}
      </div>
    </div>
  )
}