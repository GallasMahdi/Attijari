// src/components/three/CameraRig.tsx
'use client'
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useMouseParallax } from '@/hooks/useMouseParallax'

interface CameraRigProps {
  children: React.ReactNode
}

// Minimum position delta to bother updating the camera matrix.
// Skips camera.lookAt() + matrix multiply when nothing has meaningfully changed.
const EPSILON = 0.0005

export function CameraRig({ children }: CameraRigProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()
  const mouseRef = useMouseParallax(0.18)

  // Base camera position
  const BASE_Z        = 8.0
  const DOLLY_AMP     = 0.18   // slow Z dolly range
  const DOLLY_PERIOD  = 22     // seconds for one full dolly cycle
  const BOB_AMP       = 0.025  // very subtle Y bob
  const BOB_PERIOD    = 14     // seconds for one bob cycle
  const DAMPING       = 0.012  // slightly faster settle → fewer active frames

  useFrame(({ clock }) => {
    const t     = clock.getElapsedTime()
    const mouse = mouseRef.current

    // Cinematic dolly — slow Z oscillation
    const targetZ = BASE_Z + Math.sin((t / DOLLY_PERIOD) * Math.PI * 2) * DOLLY_AMP
    const targetY = Math.sin((t / BOB_PERIOD) * Math.PI * 2) * BOB_AMP
    const targetX = mouse.x * 1.0

    const dx = (targetX - camera.position.x) * DAMPING
    const dy = (targetY - camera.position.y) * DAMPING
    const dz = (targetZ - camera.position.z) * DAMPING

    // Skip matrix recalculation when camera is essentially settled.
    // This saves a camera.lookAt() + matrixWorld update every frame
    // once the user stops moving the mouse.
    if (Math.abs(dx) < EPSILON && Math.abs(dy) < EPSILON && Math.abs(dz) < EPSILON) return

    camera.position.x += dx
    camera.position.y += dy
    camera.position.z += dz
    camera.lookAt(0, 0, 0)
  })

  return <group ref={groupRef as any}>{children}</group>
}
