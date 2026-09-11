'use client'
import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-[#08090C] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/[0.08] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 carbon-pattern opacity-25 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-sm w-full">
        <div className="flex flex-col items-center text-center">
          <span className="font-montserrat font-black text-2xl tracking-[0.25em] text-white uppercase">
            PORSCHE
          </span>
          <div className="flex items-center gap-1.5 text-red-500 mt-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="font-montserrat text-[10px] tracking-[0.3em] uppercase font-bold">
              Race Control // Chargement du Poste
            </span>
          </div>
        </div>

        {/* Scanner placeholder skeleton */}
        <div className="w-full max-w-xs aspect-square rounded-3xl bg-black/50 border border-white/10 p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 animate-pulse flex items-center justify-center mb-4" />
          <div className="h-3 w-32 rounded bg-white/10 animate-pulse mb-2" />
          <div className="h-2 w-24 rounded bg-white/5 animate-pulse" />

          {/* Sweeping laser line skeleton */}
          <motion.div
            className="absolute left-0 right-0 h-0.5 bg-red-600 shadow-[0_0_12px_#EF4444]"
            animate={{ top: ['10%', '90%', '10%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <span className="font-montserrat text-[10px] uppercase tracking-widest text-gray-500 font-mono">
          Synchronisation Direct Pit-Lane...
        </span>
      </div>
    </div>
  )
}
