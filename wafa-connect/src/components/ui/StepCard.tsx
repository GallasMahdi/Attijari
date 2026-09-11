// src/components/ui/StepCard.tsx
'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Scan, Search, CheckCircle, QrCode, Mail, ClipboardList, Flag } from 'lucide-react'
import { cn } from '@/lib/utils'

const icons = { Scan, Search, CheckCircle, QrCode, Mail, ClipboardList, Flag }

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
        isActive 
          ? "bg-[#0E1015] border-2 border-[#E0681C] shadow-[0_0_30px_rgba(224, 104, 28,0.3)] transform scale-105 z-10" 
          : "bg-[#0E1015]/60 border border-white/10 hover:border-white/20 opacity-80 hover:opacity-100"
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center mb-4 border-2 transition-colors duration-500",
        isActive ? "border-[#E0681C] bg-[#E0681C]/20 text-[#E0681C] shadow-[0_0_15px_rgba(224, 104, 28,0.4)]" : "border-white/10 text-gray-500"
      )}>
        <span className="font-outfit font-black text-sm tracking-wider">{number}</span>
      </div>
      
      <div className="mb-3">
        <Icon className={cn("w-7 h-7 transition-colors duration-500", isActive ? "text-[#E0681C]" : "text-gray-400")} />
      </div>
      
      <h3 className={cn(
        "font-outfit font-bold tracking-wider mb-2 text-sm uppercase",
        isActive ? "text-white" : "text-gray-300"
      )}>
        {title}
      </h3>
      
      <p className="font-sans text-xs text-gray-300 leading-relaxed max-w-[210px]">
        {description}
      </p>
    </motion.div>
  )
})
