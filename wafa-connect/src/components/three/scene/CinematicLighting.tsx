// src/components/three/scene/CinematicLighting.tsx
'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function CinematicLighting() {
  const spotRef = useRef<THREE.SpotLight>(null)

  // Only one useFrame — updates a single spot intensity
  useFrame(({ clock }) => {
    if (!spotRef.current) return
    const t = clock.getElapsedTime()
    spotRef.current.intensity = 1.8 + Math.sin(t * 0.3) * 0.2
  })

  return (
    <>
      {/* Key light — upper-left golden directional, NO shadow map */}
      <directionalLight
        position={[-6, 8, 4]}
        intensity={2.0}
        color="#d4a853"
        castShadow={false}
      />

      {/* Rim light — right side warm gold */}
      <pointLight
        position={[8, 3, -2]}
        intensity={3.5}
        color="#e8c97d"
        distance={20}
        decay={2}
      />

      {/* Cool fill light — lower left blue */}
      <pointLight
        position={[-7, -2, 2]}
        intensity={1.2}
        color="#1a3060"
        distance={18}
        decay={2}
      />

      {/* Floor cone spot — warm highlight on reflective surface */}
      <spotLight
        ref={spotRef}
        position={[0, 6, -1]}
        angle={Math.PI / 7}
        penumbra={0.8}
        intensity={2.5}
        color="#c9a84c"
        distance={20}
        decay={1.5}
        castShadow={false}
        target-position={[0, -2, -2]}
      />

      {/* Subtle back light */}
      <pointLight
        position={[0, 2, -12]}
        intensity={0.8}
        color="#0d1a40"
        distance={15}
        decay={2}
      />

      {/* Ambient — dark navy */}
      <ambientLight intensity={0.15} color="#0a0d20" />
    </>
  )
}
