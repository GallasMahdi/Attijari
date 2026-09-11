'use client'
import { motion } from 'framer-motion'

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-[#08090C] flex flex-col items-center justify-center relative overflow-hidden z-50">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 carbon-pattern opacity-20 pointer-events-none" />

      {/* Center Porsche telemetry skeleton */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-xs w-full px-4">
        <div className="flex flex-col items-center text-center">
          <span className="font-montserrat font-black text-2xl tracking-[0.3em] text-white uppercase leading-none">
            PORSCHE
          </span>
          <span className="font-montserrat text-[9px] font-bold tracking-[0.4em] uppercase text-red-500 mt-1">
            NIGHT OF EXCELLENCE
          </span>
        </div>

        {/* Rapid shift light skeleton */}
        <div className="flex items-center gap-2 py-1 px-4 rounded-xl bg-black/60 border border-white/10">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.12 }}
              className={`w-2.5 h-2.5 rounded-full ${i >= 4 ? 'bg-red-500' : 'bg-white'}`}
            />
          ))}
        </div>

        {/* Linear progress bar */}
        <div className="w-48 h-1 rounded-full bg-white/10 overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-red-600 to-white shadow-[0_0_10px_#EF4444]"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <span className="font-montserrat text-[10px] uppercase tracking-widest text-gray-500">
          Initialisation Télémétrie...
        </span>
      </div>
    </div>
  )
}
