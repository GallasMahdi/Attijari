// src/components/three/GoldParticles.tsx
'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Points } from 'three'

export function GoldParticles() {
  const pointsRef = useRef<Points>(null)

  const [positions, sizes] = useMemo(() => {
    const count = 1800
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3]     = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 15
      sizes[i] = Math.random() * 2 + 0.5
    }

    return [positions, sizes]
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const t = clock.getElapsedTime()
    pointsRef.current.rotation.y = t * 0.02
    pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.1
  })

  return (
    <points ref={pointsRef as any}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#C9A84C"
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
