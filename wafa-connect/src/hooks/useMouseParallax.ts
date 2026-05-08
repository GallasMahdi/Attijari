import { useEffect, useRef } from 'react'

export interface MousePosition { x: number; y: number }

export function useMouseParallax(intensity: number = 0.02) {
  const currentRef = useRef<MousePosition>({ x: 0, y: 0 })
  const targetRef = useRef<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * intensity,
        y: (e.clientY / window.innerHeight - 0.5) * intensity,
      }
    }

    let rafId: number
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      currentRef.current = {
        x: lerp(currentRef.current.x, targetRef.current.x, 0.05),
        y: lerp(currentRef.current.y, targetRef.current.y, 0.05),
      }
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [intensity])

  return currentRef
}
