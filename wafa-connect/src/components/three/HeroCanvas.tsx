// src/components/three/HeroCanvas.tsx
'use client'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { CameraRig } from './CameraRig'
import { PostFX } from './PostFX'
import { CinematicLighting } from './scene/CinematicLighting'
import { ReflectiveFloor } from './scene/ReflectiveFloor'
import { ArchitecturalFrames } from './scene/ArchitecturalFrames'
import { GlassPanels } from './scene/GlassPanels'
import { LightBeams } from './scene/LightBeams'
import { SkylineBackground } from './scene/SkylineBackground'
import { AtmosphericDust } from './scene/AtmosphericDust'

interface HeroCanvasProps {
  isInView?: boolean
  isMobile?: boolean
}

export default function HeroCanvas({
  isInView = true,
  isMobile = false,
}: HeroCanvasProps) {
  return (
    <Canvas
      // Pause rendering when hero scrolls out of view
      frameloop={isInView ? 'always' : 'demand'}
      // Mobile locked at 1× DPR — halves fill-rate on Retina phones
      // Desktop allowed up to 1.5× — AdaptiveDpr manages it dynamically
      // DPR ceiling 1.2 on desktop — 1.5 caused ~56% more pixels on Retina
      dpr={isMobile ? [1, 1] : [1, 1.2]}
      gl={{
        antialias: !isMobile,
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      performance={{ min: 0.5 }}
      // Shadows disabled — saves 1024² depth-buffer render pass every frame
      shadows={false}
      camera={{
        position: [0, 0, 8],
        fov: isMobile ? 55 : 48,
        near: 0.1,
        far: 30, // nothing in scene beyond z=-14; tighter frustum = fewer frags
      }}
      style={{ background: '#050810' }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      {/* Cinematic deep navy atmosphere */}
      <fog attach="fog" args={['#08091a', 10, 28]} />
      <color attach="background" args={['#050810']} />

      <Suspense fallback={null}>
        <CameraRig>
          {/* === Lighting === */}
          <CinematicLighting />

          {/* === Far Background === */}
          <SkylineBackground />

          {/* === Background depth === */}
          <LightBeams />
          <GlassPanels isMobile={isMobile} />

          {/* === Midground === */}
          <ArchitecturalFrames />

          {/* === Ground === */}
          <ReflectiveFloor />

          {/* === Atmosphere — GPU-driven dust === */}
          <AtmosphericDust count={isMobile ? 200 : 500} />
        </CameraRig>

        {/* Post-processing — last in render order */}
        <PostFX isMobile={isMobile} />
        {/* Preload all removed — no textures to preload, was wasting traversal */}
      </Suspense>
    </Canvas>
  )
}
