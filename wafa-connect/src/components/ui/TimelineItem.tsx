// src/components/ui/TimelineItem.tsx
'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TimelineItemProps {
  time: string
  label: string
  sublabel?: string
  icon: string
  highlight?: boolean
  index: number
}

export const TimelineItem = React.memo(function TimelineItem({ time, label, sublabel, icon, highlight, index }: TimelineItemProps) {
  const isEven = index % 2 === 0
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
  }, [])

  return (
    <div className={cn(
      "relative flex items-center justify-between md:justify-normal w-full mb-10 md:mb-14 last:mb-0",
      isEven ? "md:flex-row-reverse" : "md:flex-row"
    )}>
      <div className="hidden md:block w-[calc(50%-1.5rem)]" />
      
      {/* Center Dot */}
      <div className="absolute left-[15px] sm:left-[23px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-6 h-6 z-10">
        <div className={cn(
          "rounded-full transition-all duration-300",
          highlight ? "w-4 h-4 bg-[#E0681C] shadow-[0_0_10px_#E0681C] md:animate-pulse" : "w-3 h-3 bg-[#6D8080] opacity-70"
        )} />
      </div>

      {/* Content */}
      <motion.div
        initial={isMobile ? { opacity: 0, y: 12 } : { opacity: 0, x: isEven ? 35 : -35 }}
        whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "60px" }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        className={cn(
          "w-[calc(100%-2.75rem)] sm:w-[calc(100%-4rem)] md:w-[calc(50%-1.5rem)] flex items-center gap-3 sm:gap-4 ml-10 sm:ml-16 md:ml-0 text-left transform-gpu",
          isEven ? "md:pr-8 md:justify-end md:text-right" : "md:pl-8 md:justify-start"
        )}
      >
        <div className={cn("flex items-start gap-3 sm:gap-4 w-full", isEven ? "md:flex-row-reverse" : "md:flex-row")}>
          <div className={cn(
            "w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-xl flex-shrink-0 border transition-all mt-1",
            highlight ? "bg-[#E0681C]/20 border-[#E0681C]/60 shadow-[0_0_20px_rgba(224, 104, 28,0.3)]" : "bg-white/5 border-white/10"
          )}>
            {icon}
          </div>
          <div className={cn("flex flex-col gap-1 flex-1 items-start", isEven ? "md:items-end" : "md:items-start")}>
            <span className={cn(
              "inline-block px-3 py-0.5 rounded-full font-mono text-[11px] font-bold tracking-wider uppercase tabular-nums",
              highlight ? "bg-[#E0681C] text-white shadow-[0_0_12px_#E0681C]" : "bg-white/10 text-gray-300"
            )}>
              {time}
            </span>
            <h3 className={cn(
              "font-outfit text-base md:text-lg font-bold tracking-wide",
              highlight ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" : "text-gray-300"
            )}>
              {label}
            </h3>
            {sublabel && (
              <p className={cn(
                "font-sans text-xs text-gray-400 leading-relaxed max-w-sm",
                isEven ? "md:text-right" : "md:text-left"
              )}>
                {sublabel}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
})
