'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TimelineItemProps {
  time: string
  label: string
  icon: string
  highlight?: boolean
  index: number
}

export const TimelineItem = React.memo(function TimelineItem({ time, label, icon, highlight, index }: TimelineItemProps) {
  const isEven = index % 2 === 0

  return (
    <div className={cn(
      "relative flex items-center justify-between md:justify-normal w-full mb-12 md:mb-20 last:mb-0",
      isEven ? "md:flex-row-reverse" : "md:flex-row"
    )}>
      <div className="hidden md:block w-[calc(50%-1.5rem)]" />
      
      {/* Center Dot */}
      <div className="absolute left-[23px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-6 h-6 z-10">
        <div className={cn(
          "w-3 h-3 rounded-full bg-wafa-gold transition-all duration-300",
          highlight ? "animate-pulse-gold w-4 h-4 shadow-gold-sm" : "opacity-50"
        )} />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={cn(
          "w-[calc(100%-4rem)] md:w-[calc(50%-1.5rem)] flex items-center gap-4 ml-16 md:ml-0 text-left",
          isEven ? "md:pr-8 md:justify-end md:text-right" : "md:pl-8 md:justify-start"
        )}
      >
        <div className={cn("flex items-center gap-4 w-full", isEven ? "md:flex-row-reverse" : "md:flex-row")}>
          <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-xl shadow-glass flex-shrink-0 border-wafa-gold/30">
            {icon}
          </div>
          <div className={cn("flex flex-col gap-1.5 flex-1 items-start", isEven ? "md:items-end" : "md:items-start")}>
            <span className="inline-block px-3 py-1 bg-wafa-gold text-wafa-dark rounded-full font-montserrat text-xs font-bold w-fit tracking-wider">
              {time}
            </span>
            <h3 className={cn(
              "font-playfair text-lg md:text-xl font-medium",
              highlight ? "text-wafa-gold" : "text-wafa-dark"
            )}>
              {label}
            </h3>
          </div>
        </div>
      </motion.div>
    </div>
  )
})
