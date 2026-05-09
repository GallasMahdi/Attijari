'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Scan, Search, CheckCircle, QrCode, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

const icons = { Scan, Search, CheckCircle, QrCode, Mail }

interface StepCardProps {
  number: string
  title: string
  description: string
  icon: keyof typeof icons
  isActive?: boolean
}

export const StepCard = React.memo(function StepCard({ number, title, description, icon, isActive }: StepCardProps) {
  const Icon = icons[icon]

  return (
    <motion.div
      className={cn(
        "relative flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-500 h-full",
        isActive ? "glass border-wafa-gold/50 shadow-gold-sm transform scale-105 z-10 bg-white" : "border border-gray-200 bg-white opacity-60 hover:opacity-100"
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center mb-4 border-2 transition-colors duration-500",
        isActive ? "border-wafa-gold bg-wafa-gold/10 text-wafa-gold shadow-[0_0_15px_rgba(201,168,76,0.3)]" : "border-gray-200 text-gray-400"
      )}>
        <span className="font-montserrat font-bold text-sm tracking-wider">{number}</span>
      </div>
      
      <div className="mb-3">
        <Icon className={cn("w-8 h-8 transition-colors duration-500", isActive ? "text-wafa-gold" : "text-gray-400")} />
      </div>
      
      <h3 className={cn(
        "font-montserrat font-bold tracking-wide mb-2 text-sm transition-colors duration-500 uppercase",
        isActive ? "text-wafa-dark" : "text-gray-500"
      )}>
        {title}
      </h3>
      
      <p className="font-montserrat text-xs text-gray-500 leading-relaxed max-w-[200px]">
        {description}
      </p>
    </motion.div>
  )
})
