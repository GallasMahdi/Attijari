// src/components/three/FloatingDiamonds.tsx
'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Mesh } from 'three'

interface DiamondProps {
  position: [number, number, number]
  scale: number
  speed: number
  rotSpeed: [number, number, number]
  color: string
  opacity: number
}

function Diamond({ position, scale, speed, rotSpeed, color, opacity }: DiamondProps) {
  const meshRef = useRef<Mesh>(null)
  const initialY = position[1]

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.position.y = initialY + Math.sin(t * speed) * 0.5
    meshRef.current.rotation.x += rotSpeed[0]
    meshRef.current.rotation.y += rotSpeed[1]
    meshRef.current.rotation.z += rotSpeed[2]
  })

  return (
    <mesh ref={meshRef as any} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        metalness={0.9}
        roughness={0.1}
        envMapIntensity={1.5}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

export function FloatingDiamonds() {
  const diamonds = useMemo<DiamondProps[]>(() => [
    { position: [-4, 1, -2],   scale: 0.6,  speed: 0.5,  rotSpeed: [0.003, 0.005, 0.002], color: '#C9A84C', opacity: 0.85 },
    { position: [4, -1, -3],   scale: 0.8,  speed: 0.4,  rotSpeed: [0.004, 0.002, 0.006], color: '#C9A84C', opacity: 0.7  },
    { position: [-2, -2, -1],  scale: 0.4,  speed: 0.7,  rotSpeed: [0.002, 0.007, 0.003], color: '#7dc242', opacity: 0.5  },
    { position: [3, 2.5, -4],  scale: 1.0,  speed: 0.3,  rotSpeed: [0.001, 0.004, 0.005], color: '#C9A84C', opacity: 0.6  },
    { position: [-3.5, -0.5, -5],scale:0.5, speed: 0.6,  rotSpeed: [0.006, 0.003, 0.001], color: '#f5c518', opacity: 0.75 },
    { position: [1, 3, -3],    scale: 0.35, speed: 0.8,  rotSpeed: [0.005, 0.006, 0.004], color: '#006633', opacity: 0.6  },
    { position: [-1, -3, -2],  scale: 0.55, speed: 0.45, rotSpeed: [0.003, 0.002, 0.007], color: '#C9A84C', opacity: 0.65 },
    { position: [2.5, 0.5, -1],scale: 0.3,  speed: 0.9,  rotSpeed: [0.007, 0.004, 0.002], color: '#f5c518', opacity: 0.8  },
  ], [])

  return (
    <group>
      {diamonds.map((props, i) => (
        <Diamond key={i} {...props} />
      ))}
    </group>
  )
}
