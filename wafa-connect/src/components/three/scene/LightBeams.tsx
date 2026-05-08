// src/components/three/scene/LightBeams.tsx
'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { ShaderMaterial } from 'three'

// GPU-pulsed beam material — MeshBasicMaterial equivalent with alpha animation on GPU
const vertexShader = /* glsl */`
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const fragmentShader = /* glsl */`
  uniform float uTime;
  uniform float uBaseOpacity;
  uniform float uPulseSpeed;
  uniform float uPulseOffset;
  void main() {
    float alpha = uBaseOpacity * (0.7 + sin(uTime * uPulseSpeed + uPulseOffset) * 0.3);
    gl_FragColor = vec4(0.788, 0.659, 0.298, alpha); // #c9a84c
  }
`

interface BeamConfig {
  position: [number, number, number]
  height: number
  radiusBottom: number
  rotation: [number, number, number]
  opacity: number
  pulseSpeed: number
  pulseOffset: number
}

const BEAMS: BeamConfig[] = [
  { position: [0,    2.5, -3], height: 6, radiusBottom: 0.8, rotation: [Math.PI, 0,    0],    opacity: 0.10, pulseSpeed: 0.25, pulseOffset: 0.0 },
  { position: [-3.5, 3,   -4], height: 7, radiusBottom: 0.6, rotation: [Math.PI, 0,  0.1],    opacity: 0.07, pulseSpeed: 0.20, pulseOffset: 1.0 },
  { position: [3.5,  3,   -4], height: 7, radiusBottom: 0.6, rotation: [Math.PI, 0, -0.1],    opacity: 0.07, pulseSpeed: 0.22, pulseOffset: 2.0 },
  { position: [0,    4,   -7], height: 9, radiusBottom: 1.2, rotation: [Math.PI, 0,    0],    opacity: 0.05, pulseSpeed: 0.18, pulseOffset: 0.5 },
]

export function LightBeams() {
  const matRefs = useRef<(ShaderMaterial | null)[]>([])

  const { geometries, materials } = useMemo(() => {
    const geometries = BEAMS.map(b => new THREE.ConeGeometry(b.radiusBottom, b.height, 8, 1, true))
    const materials  = BEAMS.map(b =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime:        { value: 0 },
          uBaseOpacity: { value: b.opacity },
          uPulseSpeed:  { value: b.pulseSpeed },
          uPulseOffset: { value: b.pulseOffset },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      })
    )
    return { geometries, materials }
  }, [])

  // One useFrame for all beams — only updates uTime
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    matRefs.current.forEach(mat => {
      if (mat) mat.uniforms.uTime.value = t
    })
  })

  return (
    <group>
      {BEAMS.map((b, i) => (
        <mesh
          key={i}
          position={b.position}
          rotation={b.rotation}
          geometry={geometries[i]}
          material={materials[i]}
          ref={el => { matRefs.current[i] = el?.material as ShaderMaterial ?? null }}
        />
      ))}
    </group>
  )
}
