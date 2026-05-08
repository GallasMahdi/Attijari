// src/components/three/scene/AtmosphericDust.tsx
'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface AtmosphericDustProps {
  count?: number
}

const vertexShader = /* glsl */`
  attribute float aOffset;
  uniform float uTime;
  void main() {
    vec3 pos = position;
    pos.y += sin(uTime * 0.08 + aOffset) * 0.12;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 1.8 * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = /* glsl */`
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float alpha = 0.35 * (1.0 - d * 2.0);
    gl_FragColor = vec4(0.91, 0.79, 0.49, alpha);
  }
`

export function AtmosphericDust({ count = 500 }: AtmosphericDustProps) {
  // Ref to the THREE.Points object — we access .material from it
  const pointsRef = useRef<THREE.Points>(null)

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const offsets   = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3]     = (Math.random() - 0.5) * 18
      positions[i3 + 1] = (Math.random() - 0.5) * 8
      positions[i3 + 2] = Math.random() * -12 - 0.5
      offsets[i] = Math.random() * Math.PI * 2
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aOffset',  new THREE.BufferAttribute(offsets, 1))

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    return { geometry, material }
  }, [count])

  // Access material via pointsRef.current.material — avoids the ref type mismatch
  useFrame(({ clock }) => {
    const pts = pointsRef.current
    if (!pts) return
    const mat = pts.material as THREE.ShaderMaterial
    mat.uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      material={material}
    />
  )
}
