import React from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface GoldButtonProps extends Omit<HTMLMotionProps<"button">, "size"> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  isLoading?: boolean
  className?: string
  children: React.ReactNode
}

export const GoldButton = React.forwardRef<HTMLButtonElement, GoldButtonProps>(
  ({ variant = 'primary', size = 'md', href, isLoading, className, children, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-montserrat font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-wafa-gold/50 rounded-xl"
    
    const variants = {
      primary: "bg-gradient-gold text-wafa-dark hover:shadow-gold-md active:shadow-none disabled:bg-wafa-gold/50 disabled:text-wafa-dark/70",
      outline: "border-2 border-wafa-gold text-wafa-gold hover:bg-wafa-gold/10 hover:shadow-gold-sm disabled:border-wafa-gold/50 disabled:text-wafa-gold/50",
      ghost: "text-wafa-gold hover:bg-wafa-gold/10 disabled:text-wafa-gold/50"
    }

    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base tracking-wide"
    }

    const classes = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      isLoading && "cursor-not-allowed opacity-80",
      className
    )

    const content = (
      <>
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </>
    )

    if (href) {
      const isExternal = href.startsWith('http')
      
      // Extract width classes to apply on the wrapper so w-full works on mobile
      const wrapperClass = [className].flat().join(' ').match(/(w-\S+|sm:w-\S+|md:w-\S+)/g)?.join(' ') ?? ''
      return (
        <motion.div
          whileHover={!isLoading && !props.disabled ? { scale: 1.02 } : {}}
          whileTap={!isLoading && !props.disabled ? { scale: 0.98 } : {}}
          className={cn('inline-block', wrapperClass)}
        >
          {isExternal ? (
            <a href={href} className={cn(classes, 'w-full')} target="_blank" rel="noopener noreferrer" aria-disabled={isLoading || props.disabled}>
              {content}
            </a>
          ) : (
            <Link href={href} className={cn(classes, 'w-full')} aria-disabled={isLoading || props.disabled}>
              {content}
            </Link>
          )}
        </motion.div>
      )
    }

    return (
      <motion.button
        ref={ref}
        className={classes}
        disabled={isLoading || props.disabled}
        whileHover={!isLoading && !props.disabled ? { scale: 1.02 } : {}}
        whileTap={!isLoading && !props.disabled ? { scale: 0.98 } : {}}
        {...props}
      >
        {content}
      </motion.button>
    )
  }
)

GoldButton.displayName = 'GoldButton'
