// src/components/three/scene/ReflectiveFloor.tsx
'use client'
import { useMemo } from 'react'
import * as THREE from 'three'

// Wet asphalt track floor material
const floorMat = new THREE.MeshStandardMaterial({
  color: '#07080B',
  emissive: '#0D0F14',
  emissiveIntensity: 0.2,
  metalness: 0.9,
  roughness: 0.25,
})

// Guards Red pit-lane laser strip
const stripMat = new THREE.MeshStandardMaterial({
  color: '#D5001C',
  emissive: '#E4002B',
  emissiveIntensity: 1.2,
  transparent: true,
  opacity: 0.65,
})

export function ReflectiveFloor() {
  const floorGeo = useMemo(() => new THREE.PlaneGeometry(50, 50), [])
  const stripGeo = useMemo(() => new THREE.PlaneGeometry(12, 0.04), [])

  return (
    <group>
      {/* Asphalt track surface */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.8, -2]}
        geometry={floorGeo}
        material={floorMat}
        receiveShadow={false}
      />
      {/* Porsche Red Racing line on track */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.79, -2]}
        geometry={stripGeo}
        material={stripMat}
      />
    </group>
  )
}

