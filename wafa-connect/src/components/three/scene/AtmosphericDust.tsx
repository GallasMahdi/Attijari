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
  attribute float aSpeed;
  uniform float uTime;
  varying float vRed;
  void main() {
    vec3 pos = position;
    // Aerodynamic slipstream wind-tunnel motion along z/x
    pos.z = mod(pos.z + uTime * aSpeed * 3.0, 14.0) - 14.0;
    pos.y += sin(uTime * 1.2 + aOffset) * 0.08;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (2.2 + aSpeed * 1.5) * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    vRed = step(0.65, fract(aOffset * 3.14));
  }
`

const fragmentShader = /* glsl */`
  varying float vRed;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float alpha = 0.6 * (1.0 - d * 2.0);
    // Mix cold white with Porsche Guards Red streaks
    vec3 col = mix(vec3(0.95, 0.98, 1.0), vec3(0.9, 0.0, 0.12), vRed);
    gl_FragColor = vec4(col, alpha);
  }
`

export function AtmosphericDust({ count = 500 }: AtmosphericDustProps) {
  // Ref to the THREE.Points object — we access .material from it
  const pointsRef = useRef<THREE.Points>(null)

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const offsets   = new Float32Array(count)
    const speeds    = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3]     = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 8
      positions[i3 + 2] = Math.random() * -14
      offsets[i] = Math.random() * Math.PI * 2
      speeds[i]  = 0.4 + Math.random() * 1.2
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aOffset',  new THREE.BufferAttribute(offsets, 1))
    geometry.setAttribute('aSpeed',   new THREE.BufferAttribute(speeds, 1))

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
