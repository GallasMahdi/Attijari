import React from 'react'

interface TexturePatternProps {
  opacity?: number
  blendMode?: 'overlay' | 'multiply' | 'screen' | 'normal' | 'soft-light'
  src?: string
}

export function TexturePattern({ 
  opacity = 0.05, 
  blendMode = 'normal',
  src = "/pattern.jpeg" 
}: TexturePatternProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url("${src}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        opacity: opacity,
        mixBlendMode: blendMode,
        zIndex: 0,
        // border: '2px solid red' // Temporary for debugging
      }}
    />
  )
}
