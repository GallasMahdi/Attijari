// src/components/three/scene/ArchitecturalFrames.tsx
'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

interface FrameConfig {
  position: [number, number, number]
  width: number
  height: number
  depth: number
  rotationY: number
  floatSpeed: number
  floatAmplitude: number
  floatOffset: number
  opacity: number
}

const FRAMES: FrameConfig[] = [
  { position: [-3.5,  0.2, -2.5], width: 1.6, height: 2.8, depth: 0.03, rotationY:  0.12, floatSpeed: 0.18, floatAmplitude: 0.06, floatOffset: 0.0, opacity: 0.9  },
  { position: [ 3.5,  0.0, -2.5], width: 1.4, height: 2.6, depth: 0.03, rotationY: -0.10, floatSpeed: 0.15, floatAmplitude: 0.05, floatOffset: 1.2, opacity: 0.85 },
  { position: [ 0,    0.5, -5.0], width: 2.2, height: 3.8, depth: 0.02, rotationY:  0.00, floatSpeed: 0.12, floatAmplitude: 0.04, floatOffset: 2.4, opacity: 0.55 },
  { position: [-5,    0.8, -7.5], width: 2.0, height: 4.2, depth: 0.02, rotationY:  0.06, floatSpeed: 0.10, floatAmplitude: 0.03, floatOffset: 0.8, opacity: 0.3  },
  { position: [ 5,    0.6, -7.5], width: 1.8, height: 3.6, depth: 0.02, rotationY: -0.06, floatSpeed: 0.11, floatAmplitude: 0.03, floatOffset: 1.6, opacity: 0.3  },
  { position: [ 2.2, -0.8, -1.5], width: 0.7, height: 1.2, depth: 0.03, rotationY: -0.20, floatSpeed: 0.22, floatAmplitude: 0.04, floatOffset: 3.0, opacity: 0.7  },
]

const BAR = 0.04

/**
 * Build all 8 bars of a frame in LOCAL space (relative to its own center).
 * Position/rotation are applied at the <group> level — no baking.
 */
function buildLocalFrameGeo(cfg: FrameConfig): THREE.BufferGeometry {
  const { width: w, height: h, depth: d } = cfg

  const barDefs: [number, number, number, number, number, number][] = [
    [0,        h / 2, 0, w,    BAR,  d ],  // top bar
    [0,       -h / 2, 0, w,    BAR,  d ],  // bottom bar
    [-w / 2,   0,     0, BAR,  h,    d ],  // left bar
    [ w / 2,   0,     0, BAR,  h,    d ],  // right bar
    [-w / 2,   h / 2, 0, 0.06, 0.06, 0.06], // corner TL
    [ w / 2,   h / 2, 0, 0.06, 0.06, 0.06], // corner TR
    [-w / 2,  -h / 2, 0, 0.06, 0.06, 0.06], // corner BL
    [ w / 2,  -h / 2, 0, 0.06, 0.06, 0.06], // corner BR
  ]

  const geos = barDefs.map(([lx, ly, lz, bw, bh, bd]) => {
    const geo = new THREE.BoxGeometry(bw, bh, bd)
    geo.translate(lx, ly, lz)
    return geo
  })

  return mergeGeometries(geos)
}

export function ArchitecturalFrames() {
  const groupRefs = useRef<(THREE.Group | null)[]>([])

  // 8 meshes per frame → merged into 1 geometry → 1 draw call per frame (6 total)
  const mergedGeos = useMemo(() => FRAMES.map(buildLocalFrameGeo), [])

  // Per-frame materials — opacity varies per frame
  const materials = useMemo(
    () =>
      FRAMES.map(
        cfg =>
          new THREE.MeshStandardMaterial({
            color: '#c9a84c',
            metalness: 0.95,
            roughness: 0.12,
            envMapIntensity: 0.8, // no env map loaded; >1 wastes IBL shader cycles
            transparent: true,
            opacity: cfg.opacity,
          })
      ),
    []
  )

  // Cache initial Y positions for float animation
  const initialYs = useMemo(() => FRAMES.map(f => f.position[1]), [])

  // Single useFrame for all 6 frames — Y float + slow Y rotation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    FRAMES.forEach((cfg, i) => {
      const g = groupRefs.current[i]
      if (!g) return
      g.position.y = initialYs[i] + Math.sin(t * cfg.floatSpeed + cfg.floatOffset) * cfg.floatAmplitude
      g.rotation.y += 0.0003
    })
  })

  return (
    <group>
      {FRAMES.map((cfg, i) => (
        // Group holds position (X,Z) and initial rotationY — useFrame drives Y + rotation
        <group
          key={i}
          ref={el => { groupRefs.current[i] = el }}
          position={cfg.position}
          rotation={[0, cfg.rotationY, 0]}
        >
          <mesh geometry={mergedGeos[i]} material={materials[i]} />
        </group>
      ))}
    </group>
  )
}
