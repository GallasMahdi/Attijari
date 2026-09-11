// src/components/three/scene/CinematicLighting.tsx
'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function CinematicLighting() {
  const spotRef = useRef<THREE.SpotLight>(null)

  useFrame(({ clock }) => {
    if (!spotRef.current) return
    const t = clock.getElapsedTime()
    spotRef.current.intensity = 2.5 + Math.sin(t * 0.8) * 0.4
  })

  return (
    <>
      {/* Porsche Matrix LED Key light — Crisp cold white */}
      <directionalLight
        position={[-6, 8, 4]}
        intensity={2.8}
        color="#E0EEFF"
        castShadow={false}
      />

      {/* Porsche Guards Red Rear Rim Light */}
      <pointLight
        position={[8, 3, -2]}
        intensity={5.0}
        color="#D5001C"
        distance={25}
        decay={2}
      />

      {/* Cool fill light — deep motorsport obsidian */}
      <pointLight
        position={[-7, -2, 2]}
        intensity={1.5}
        color="#152035"
        distance={20}
        decay={2}
      />

      {/* Center Track spotlight — intense pulse on asphalt */}
      <spotLight
        ref={spotRef}
        position={[0, 7, 0]}
        angle={Math.PI / 6}
        penumbra={0.7}
        intensity={3.2}
        color="#FFFFFF"
        distance={25}
        decay={1.5}
        castShadow={false}
        target-position={[0, -2, -2]}
      />

      {/* Tail lightbar horizontal back glow */}
      <pointLight
        position={[0, 1, -8]}
        intensity={4.0}
        color="#E4002B"
        distance={18}
        decay={2}
      />

      {/* Ambient dark canvas */}
      <ambientLight intensity={0.2} color="#08090C" />
    </>
  )
}
