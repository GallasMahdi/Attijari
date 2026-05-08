// src/components/three/scene/SkylineBackground.tsx
'use client'
import { useMemo } from 'react'
import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

interface BuildingConfig {
  position: [number, number, number]
  width: number
  height: number
  depth: number
}

const BUILDINGS: BuildingConfig[] = [
  { position: [-1.5,  3,    -11], width: 1.2, height: 9,   depth: 0.5 },
  { position: [ 1.5,  2.5,  -11], width: 1.0, height: 8,   depth: 0.5 },
  { position: [-4,    1.5,  -10], width: 1.4, height: 6,   depth: 0.6 },
  { position: [-6,    1,    -11], width: 1.0, height: 5,   depth: 0.5 },
  { position: [-8,    0.5,  -12], width: 1.6, height: 4,   depth: 0.6 },
  { position: [ 4,    1.5,  -10], width: 1.4, height: 6,   depth: 0.6 },
  { position: [ 6,    1,    -11], width: 1.0, height: 5,   depth: 0.5 },
  { position: [ 8,    0.5,  -12], width: 1.6, height: 4,   depth: 0.6 },
  { position: [-3,   -0.5,  -13], width: 3.0, height: 2.5, depth: 1.0 },
  { position: [ 3,   -0.5,  -13], width: 3.0, height: 2.5, depth: 1.0 },
  { position: [ 0,   -0.5,  -14], width: 6.0, height: 2.0, depth: 1.5 },
  { position: [-10,   0,    -14], width: 2.0, height: 5,   depth: 0.5 },
  { position: [ 10,   0,    -14], width: 2.0, height: 5,   depth: 0.5 },
]

const LINE_POSITIONS: [number, number, number][] = [
  [0, -0.5, -8],
  [0,  0.5, -9],
  [0,  1.5, -10],
  [0,  2.5, -11],
]

// Shared static materials — created once
const buildingMaterial = new THREE.MeshStandardMaterial({
  color: '#05060f',
  emissive: '#0d1230',
  emissiveIntensity: 0.1,
  roughness: 0.9,
  metalness: 0.1,
})

const lineMaterial = new THREE.MeshStandardMaterial({
  color: '#c9a84c',
  emissive: '#c9a84c',
  emissiveIntensity: 0.4,
  transparent: true,
  opacity: 0.12,
})

export function SkylineBackground() {
  // Merge all 13 buildings → 1 draw call
  const buildingGeo = useMemo(() => {
    const geos = BUILDINGS.map(b => {
      const g = new THREE.BoxGeometry(b.width, b.height, b.depth)
      g.translate(...b.position)
      return g
    })
    return mergeGeometries(geos)
  }, [])

  // Merge all 4 horizontal lines → 1 draw call
  const linesGeo = useMemo(() => {
    const geos = LINE_POSITIONS.map(([x, y, z]) => {
      const g = new THREE.BoxGeometry(22, 0.008, 0.01)
      g.translate(x, y, z)
      return g
    })
    return mergeGeometries(geos)
  }, [])

  return (
    <group>
      {/* Was 13 draw calls → now 1 */}
      <mesh geometry={buildingGeo} material={buildingMaterial} receiveShadow={false} />
      {/* Was 4 draw calls → now 1 */}
      <mesh geometry={linesGeo} material={lineMaterial} />
    </group>
  )
}
