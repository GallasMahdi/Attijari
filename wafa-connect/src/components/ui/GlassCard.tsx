import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps extends HTMLMotionProps<"div"> {
  hoverable?: boolean
  glow?: boolean
  className?: string
  children: React.ReactNode
}

export function GlassCard({ hoverable, glow, className, children, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'glass rounded-2xl p-6 md:p-8 relative overflow-hidden',
        glow && 'hover:shadow-gold-sm transition-shadow duration-300',
        className
      )}
      whileHover={hoverable ? { scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
