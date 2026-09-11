'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RotateCcw } from 'lucide-react'

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Root App Error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#08090C] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-red-600/15 blur-[120px] rounded-full" />
        <div className="absolute inset-0 carbon-pattern opacity-30" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
        <div className="w-16 h-16 rounded-2xl bg-red-600/15 border border-red-500/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(213,0,28,0.4)]">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>

        <span className="font-montserrat text-xs tracking-[0.3em] text-red-500 uppercase font-black mb-2">
          INCIDENT DE COURSE // PIT-LANE FLAG
        </span>

        <h1 className="font-montserrat text-2xl sm:text-3xl font-black text-white uppercase tracking-wider mb-3">
          Arrêt aux Stands Imprévu
        </h1>

        <p className="font-montserrat text-xs sm:text-sm text-gray-400 mb-8 leading-relaxed">
          Une anomalie technique passagère a été détectée sur la télémétrie. Cliquez ci-dessous pour relancer la session.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-porsche-red text-white font-montserrat font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(213,0,28,0.6)] transition-all active:scale-95 w-full sm:w-auto"
          >
            <RotateCcw className="w-4 h-4" />
            Relancer la Télémétrie
          </button>

          <Link
            href="/"
            className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-montserrat font-bold text-xs uppercase tracking-widest transition-all active:scale-95 w-full sm:w-auto"
          >
            Retour au Stand
          </Link>
        </div>
      </div>
    </div>
  )
}
