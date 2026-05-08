'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, fadeIn, slideFromLeft, slideFromRight } from '@/lib/animations'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'fade'
}

export function SectionWrapper({ children, className, delay = 0, direction = 'up' }: SectionWrapperProps) {
  const getVariant = () => {
    switch (direction) {
      case 'left': return slideFromLeft
      case 'right': return slideFromRight
      case 'fade': return fadeIn
      case 'up':
      default: return fadeUp
    }
  }

  const variant = getVariant()

  return (
    <motion.div
      className={className}
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
