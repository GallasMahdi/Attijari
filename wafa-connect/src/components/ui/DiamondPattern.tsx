import React from 'react'

interface DiamondPatternProps {
  opacity?: number
  color?: string
}

export function DiamondPattern({ opacity = 0.05, color = '#ffffff' }: DiamondPatternProps) {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity }}
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="diamond-pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <polygon
              points="20,2 38,20 20,38 2,20"
              fill="none"
              stroke={color}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diamond-pattern)" />
      </svg>
    </div>
  )
}
