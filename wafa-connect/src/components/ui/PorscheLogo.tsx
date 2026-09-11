// src/components/ui/PorscheLogo.tsx
'use client'
import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface PorscheLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'wordmark' | 'crest' | 'combined' | 'badge'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  wordmarkClassName?: string
  crestClassName?: string
}

/**
 * Official Porsche Wordmark Vector
 * Extracted directly from the official Porsche PDF provided by the user (viewBox 0 0 4000 300)
 */
export function PorscheWordmark({ className, fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 4000 300"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Porsche"
      className={cn('h-4 w-auto fill-current transition-colors', className)}
      {...props}
    >
      <title>Porsche</title>
      <path
        d="M456.807 208.014C499.268 208.014 522.132 185.236 522.132 142.932L522.132 78.729C522.132 36.425 499.268 13.647 456.807 13.647L13.653 13.647L13.653 277.494L73.682 277.494L73.682 208.014ZM462.104 82.247L462.104 139.414C462.104 146.274 458.396 149.968 451.510 149.968L73.682 149.968L73.682 71.693L451.510 71.693C458.396 71.693 462.104 75.387 462.104 82.247M663.377 277.494C620.915 277.494 598.051 254.715 598.051 212.411L598.051 78.729C598.051 36.425 620.915 13.647 663.376 13.647L1031.458 13.647C1073.978 13.647 1096.857 36.425 1096.857 78.729L1096.857 212.411C1096.857 254.715 1073.978 277.494 1031.458 277.494ZM1026.161 219.447C1033.076 219.447 1036.755 215.753 1036.755 208.894L1036.754 82.247C1036.754 75.387 1033.076 71.693 1026.161 71.693L668.673 71.693C661.788 71.693 658.080 75.387 658.080 82.247L658.080 208.894C658.080 215.753 661.788 219.447 668.673 219.447ZM1622.035 187.786C1657.273 202.525 1681.990 237.125 1682.064 277.494L1622.036 277.494C1622.036 230.001 1599.966 208.014 1552.370 208.014L1233.614 208.014L1233.614 277.494L1173.658 277.494L1173.658 13.647L1616.739 13.647C1659.259 13.647 1682.064 36.425 1682.064 78.729L1682.064 122.829C1682.064 163.336 1661.098 185.940 1622.035 187.786M1611.442 149.968C1618.357 149.968 1622.035 146.274 1622.035 139.414L1622.035 82.247C1622.035 75.387 1618.357 71.693 1611.442 71.693L1233.614 71.693L1233.614 149.968ZM1754.452 78.729C1754.452 36.425 1777.330 13.647 1819.777 13.647L2254.103 13.647L2254.103 62.898L1825.074 62.898C1818.233 62.898 1814.481 66.592 1814.481 73.452L1814.481 110.391C1814.481 117.251 1818.233 120.945 1825.074 120.945L2197.606 120.945C2240.126 120.945 2262.931 143.724 2262.931 186.027L2262.932 212.411C2262.932 254.715 2240.127 277.494 2197.606 277.494L1763.280 277.494L1763.280 228.242L2192.309 228.242C2199.224 228.242 2202.902 224.548 2202.902 217.688L2202.902 180.750C2202.902 173.890 2199.224 170.197 2192.309 170.197L1819.777 170.196C1777.331 170.196 1754.452 147.418 1754.452 105.114ZM2337.967 78.729C2337.967 36.425 2360.846 13.647 2403.293 13.647L2827.026 13.647L2827.026 71.693L2408.590 71.693C2401.748 71.693 2397.996 75.387 2397.996 82.247L2397.996 208.894C2397.996 215.754 2401.748 219.447 2408.590 219.447L2827.026 219.447L2827.026 277.494L2403.293 277.494C2360.846 277.494 2337.967 254.715 2337.967 212.411ZM3383.175 13.647L3383.175 277.494L3323.146 277.494L3323.146 174.594L2963.856 174.594L2963.856 277.494L2903.827 277.494L2903.827 13.647L2963.856 13.647L2963.856 116.547L3323.146 116.547L3323.146 13.647ZM3520.888 62.898L3520.888 120.945L3986.112 120.945L3986.112 170.197L3520.888 170.197L3520.888 228.242L3986.112 228.242L3986.112 277.494L3460.859 277.494L3460.859 13.647L3986.112 13.647L3986.112 62.898Z"
        fill={fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

/**
 * Official Porsche Crest
 * Authentic Stuttgart coat-of-arms crest with high-DPI assets from Porsche Design System CDN
 */
export function PorscheCrest({
  className,
  size = 36,
  alt = "Official Porsche Crest",
  priority = false
}: {
  className?: string
  size?: number
  alt?: string
  priority?: boolean
}) {
  const height = size
  const width = Math.round((size * 30) / 40)

  return (
    <picture className={cn('inline-block flex-shrink-0', className)}>
      <source srcSet="/porsche-crest@3x.webp 3x, /porsche-crest@2x.png 2x" type="image/webp" />
      <source srcSet="/porsche-crest@3x.png 3x, /porsche-crest@2x.png 2x" type="image/png" />
      <Image
        src="/porsche-crest@3x.png"
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={cn('object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]', className)}
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    </picture>
  )
}

/**
 * Official Porsche Brandmark Component (Pure Vector Text Logo by Default)
 */
export function PorscheLogo({
  variant = 'wordmark',
  size = 'md',
  className,
  wordmarkClassName,
  crestClassName,
  ...props
}: PorscheLogoProps) {
  if (variant === 'wordmark') {
    const sizeClasses = {
      sm: 'h-2.5 sm:h-3',
      md: 'h-3.5 sm:h-4 md:h-[18px]',
      lg: 'h-6 sm:h-8 md:h-10',
      xl: 'h-8 sm:h-11 md:h-14 lg:h-16'
    }[size]

    return (
      <div className={cn('inline-flex items-center', className)} {...props}>
        <PorscheWordmark className={cn(sizeClasses, wordmarkClassName)} />
      </div>
    )
  }

  if (variant === 'crest') {
    const crestSizes = {
      sm: 24,
      md: 32,
      lg: 48,
      xl: 64
    }[size]

    return (
      <div className={cn('inline-flex items-center justify-center', className)} {...props}>
        <PorscheCrest size={crestSizes} className={crestClassName} />
      </div>
    )
  }

  if (variant === 'badge') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md shadow-lg',
          className
        )}
        {...props}
      >
        <PorscheCrest size={20} className={crestClassName} />
        <PorscheWordmark className={cn('h-3 sm:h-3.5 text-white', wordmarkClassName)} />
      </div>
    )
  }

  // default 'combined' (crest + wordmark)
  const crestSizes = {
    sm: 22,
    md: 28,
    lg: 44,
    xl: 60
  }[size]

  const wordmarkSizes = {
    sm: 'h-2.5 sm:h-3',
    md: 'h-3.5 sm:h-4 md:h-[17px]',
    lg: 'h-6 sm:h-7 md:h-8',
    xl: 'h-8 sm:h-10 md:h-12'
  }[size]

  return (
    <div className={cn('inline-flex items-center gap-2 sm:gap-3', className)} {...props}>
      <PorscheCrest size={crestSizes} className={crestClassName} />
      <PorscheWordmark className={cn(wordmarkSizes, 'text-white', wordmarkClassName)} />
    </div>
  )
}
