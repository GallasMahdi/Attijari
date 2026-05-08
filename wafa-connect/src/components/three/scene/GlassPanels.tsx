// src/components/three/scene/GlassPanels.tsx
'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface PanelConfig {
  position: [number, number, number]
  rotation: [number, number, number]
  width: number
  height: number
  floatSpeed: number
  floatOffset: number
}

const PANELS: PanelConfig[] = [
  { position: [-2.5, 0.5, -4],  rotation: [0,  0.15, 0], width: 2.5, height: 4.0, floatSpeed: 0.13, floatOffset: 0   },
  { position: [ 2.5, 0.3, -4.5], rotation: [0, -0.12, 0], width: 2.2, height: 3.6, floatSpeed: 0.11, floatOffset: 1.8 },
  { position: [ 0,   2.2, -6],   rotation: [0.08, 0, 0],  width: 6.0, height: 1.2, floatSpeed: 0.09, floatOffset: 3.0 },
]

// Shared cheap material — zero extra render passes
// MeshPhysicalMaterial was triggering full BRDF LUT + clearcoat path. At
// opacity=0.12 MeshStandardMaterial is visually indistinguishable.
const glassMaterial = new THREE.MeshStandardMaterial({
  color: '#1a2550',
  transparent: true,
  opacity: 0.12,
  metalness: 0.15,
  roughness: 0.05,
  side: THREE.DoubleSide,
})

const mobileMaterial = new THREE.MeshStandardMaterial({
  color: '#2a3060',
  transparent: true,
  opacity: 0.08,
  metalness: 0.2,
  roughness: 0.1,
  side: THREE.DoubleSide,
})

interface GlassPanelsProps {
  isMobile?: boolean
}

export function GlassPanels({ isMobile = false }: GlassPanelsProps) {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([])
  const initialYs = useMemo(() => PANELS.map(p => p.position[1]), [])
  const mat = isMobile ? mobileMaterial : glassMaterial

  // Single consolidated useFrame for all panels
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    PANELS.forEach((cfg, i) => {
      const mesh = meshRefs.current[i]
      if (!mesh) return
      mesh.position.y = initialYs[i] + Math.sin(t * cfg.floatSpeed + cfg.floatOffset) * 0.08
    })
  })

  const geometries = useMemo(
    () => PANELS.map(p => new THREE.PlaneGeometry(p.width, p.height)),
    []
  )

  return (
    <group>
      {PANELS.map((cfg, i) => (
        <mesh
          key={i}
          ref={el => { meshRefs.current[i] = el }}
          position={cfg.position}
          rotation={cfg.rotation}
          geometry={geometries[i]}
          material={mat}
        />
      ))}
    </group>
  )
}
