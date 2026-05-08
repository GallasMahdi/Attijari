import React from 'react'
import { cn } from '@/lib/utils'

interface GoldDividerProps {
  className?: string
  shimmer?: boolean
}

export function GoldDivider({ className, shimmer = true }: GoldDividerProps) {
  return (
    <div className={cn('flex items-center justify-center gap-4', className)}>
      <div className={cn('h-px w-full max-w-[100px] bg-gradient-gold', shimmer && 'opacity-70')} />
      <div className="relative flex items-center justify-center w-4 h-4 flex-shrink-0">
        <div className="absolute inset-0 border border-wafa-gold rotate-45" />
        {shimmer && <div className="absolute inset-1 bg-wafa-gold/30 rotate-45 animate-pulse-gold" />}
      </div>
      <div className={cn('h-px w-full max-w-[100px] bg-gradient-gold', shimmer && 'opacity-70')} />
    </div>
  )
}
