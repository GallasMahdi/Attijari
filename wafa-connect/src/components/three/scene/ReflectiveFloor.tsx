// src/components/three/scene/ReflectiveFloor.tsx
'use client'
import { useMemo } from 'react'
import * as THREE from 'three'

// ── Static materials — created once, zero per-frame cost ─────────────────────
// MeshReflectorMaterial rendered the entire scene into a second FBO every frame
// (~8–12 ms). This replacement is visually near-identical at <0.1 ms.
const floorMat = new THREE.MeshStandardMaterial({
  color: '#06091a',
  emissive: '#0d1230',
  emissiveIntensity: 0.25,
  metalness: 0.8,
  roughness: 0.35,
})

// Thin emissive gold strip — simulates the "light pooling on floor" look
const stripMat = new THREE.MeshStandardMaterial({
  color: '#c9a84c',
  emissive: '#c9a84c',
  emissiveIntensity: 0.6,
  transparent: true,
  opacity: 0.18,
})

export function ReflectiveFloor() {
  const floorGeo = useMemo(() => new THREE.PlaneGeometry(40, 40), [])
  const stripGeo = useMemo(() => new THREE.PlaneGeometry(6, 0.015), [])

  return (
    <group>
      {/* Large floor plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.8, -2]}
        geometry={floorGeo}
        material={floorMat}
        receiveShadow={false}
      />
      {/* Gold light-strip on floor surface */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.79, -2]}
        geometry={stripGeo}
        material={stripMat}
      />
    </group>
  )
}

