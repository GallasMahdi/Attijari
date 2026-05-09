// src/components/ui/CountdownUnit.tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { flipCard } from '@/lib/animations'

interface CountdownUnitProps {
  value: number
  label: string
}

export function CountdownUnit({ value, label }: CountdownUnitProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const [isFlipping, setIsFlipping] = useState(false)
  const prevValue = useRef(value)

  useEffect(() => {
    if (value !== prevValue.current) {
      setIsFlipping(true)
      const timer = setTimeout(() => {
        setDisplayValue(value)
        setIsFlipping(false)
        prevValue.current = value
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [value])

  const formatted = String(displayValue).padStart(2, '0')

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      <div className="relative w-16 h-20 sm:w-20 sm:h-24 md:w-28 md:h-32
                      glass rounded-xl flex items-center justify-center
                      border border-wafa-gold/30 overflow-hidden shadow-gold-sm">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={`${label}-${displayValue}`}
            className="font-playfair font-bold text-4xl sm:text-5xl 
                       md:text-6xl text-wafa-gold leading-none"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {formatted}
          </motion.span>
        </AnimatePresence>

        {/* Decorative inner glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      </div>

      <span className="font-montserrat text-xs sm:text-sm font-medium 
                       tracking-[0.2em] uppercase text-gray-600">
        {label}
      </span>
    </div>
  )
}
