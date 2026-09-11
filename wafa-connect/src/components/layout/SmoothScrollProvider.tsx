'use client'
import React, { useEffect, useRef } from 'react'
import Lenis from 'lenis'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const reqIdRef = useRef<number | null>(null)

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return

    // Check if mobile or reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    const lenis = new Lenis({
      duration: isTouch ? 0.8 : 0.95, // Snappier, ultra-responsive scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 1.0,
      prevent: (node: Element) => node instanceof Element && (node.hasAttribute('data-lenis-prevent') || node.closest('[data-lenis-prevent]') !== null),
    })

    lenisRef.current = lenis
    ;(window as any).lenis = lenis

    let isRunning = true

    function raf(time: number) {
      if (!isRunning) return
      lenis.raf(time)
      reqIdRef.current = requestAnimationFrame(raf)
    }

    reqIdRef.current = requestAnimationFrame(raf)

    // Pause RAF on background tabs to conserve GPU/CPU cycles
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false
        if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current)
      } else {
        isRunning = true
        reqIdRef.current = requestAnimationFrame(raf)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Seamlessly intercept any internal hash link click for luxury smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!target) return
      const href = target.getAttribute('href')
      if (href && href.length > 1 && href.startsWith('#')) {
        const targetElement = document.querySelector(href)
        if (targetElement) {
          e.preventDefault()
          lenis.scrollTo(href, { offset: -70, duration: 0.95 })
          try {
            history.pushState(null, '', href)
          } catch {
            // ignore in sandboxed environments
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      isRunning = false
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
      ;(window as any).lenis = undefined
    }
  }, [])

  return <>{children}</>
}
