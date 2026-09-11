// src/components/ui/CountdownUnit.tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface CountdownUnitProps {
  value: number
  label: string
}

export function CountdownUnit({ value, label }: CountdownUnitProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const prevValue = useRef(value)

  useEffect(() => {
    if (value !== prevValue.current) {
      const timer = setTimeout(() => {
        setDisplayValue(value)
        prevValue.current = value
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [value])

  const formatted = String(displayValue).padStart(2, '0')

  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-3">
      <div className="relative w-13 h-17 xs:w-16 xs:h-20 sm:w-22 sm:h-26 md:w-28 md:h-32 bg-[#0E1015] rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden group">
        {/* Top split reflection */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/[0.04] border-b border-black/60 pointer-events-none" />
        
        {/* Subtle terracotta corner glow */}
        <div className="absolute -inset-1 bg-[#E0681C]/5 group-hover:bg-[#E0681C]/15 transition-colors pointer-events-none rounded-xl sm:rounded-2xl" />

        <AnimatePresence mode="popLayout">
          <motion.span
            key={`${label}-${displayValue}`}
            className="relative font-montserrat font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-white tracking-wider leading-none tabular-nums"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </div>

      <span className="font-montserrat text-[9px] xs:text-[10px] sm:text-xs font-bold tracking-wider sm:tracking-[0.25em] uppercase text-gray-400">
        {label}
      </span>
    </div>
  )
}
