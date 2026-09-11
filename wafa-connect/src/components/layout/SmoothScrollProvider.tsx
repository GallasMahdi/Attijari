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

    // If reduced motion is requested
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const isMobile = window.innerWidth < 768

    // ── MOBILE STRATEGY (100% Native 120Hz Compositor Scrolling) ─────────────
    // On touch/mobile devices, Lenis JS touch interception causes frame drops & freezing.
    // We use native hardware compositor scrolling for 0ms input latency & 120fps fluid speed,
    // while exposing a compliant scrollTo API for all section buttons & nav links.
    if (isMobile) {
      const mobileScroller = {
        scrollTo: (target: any, options?: any) => {
          const offset = options?.offset ?? -70
          let top = 0
          if (typeof target === 'number') {
            top = target
          } else {
            const el = typeof target === 'string' ? document.querySelector(target) : target
            if (el) {
              top = el.getBoundingClientRect().top + window.pageYOffset + offset
            }
          }
          window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
        },
      }

      ;(window as any).lenis = mobileScroller

      const handleAnchorClick = (e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
        if (!target) return
        const href = target.getAttribute('href')
        if (href && href.length > 1 && href.startsWith('#')) {
          const targetElement = document.querySelector(href)
          if (targetElement) {
            e.preventDefault()
            mobileScroller.scrollTo(href, { offset: -70 })
            try { history.pushState(null, '', href) } catch {}
          }
        }
      }

      document.addEventListener('click', handleAnchorClick)

      return () => {
        document.removeEventListener('click', handleAnchorClick)
        ;(window as any).lenis = undefined
      }
    }

    // ── DESKTOP STRATEGY (Luxury Inertial Smooth Scroll) ───────────────────────
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      syncTouch: false,
      prevent: (node: Element) =>
        node instanceof Element &&
        (node.hasAttribute('data-lenis-prevent') || node.closest('[data-lenis-prevent]') !== null),
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

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!target) return
      const href = target.getAttribute('href')
      if (href && href.length > 1 && href.startsWith('#')) {
        const targetElement = document.querySelector(href)
        if (targetElement) {
          e.preventDefault()
          lenis.scrollTo(href, { offset: -70, duration: 0.9 })
          try {
            history.pushState(null, '', href)
          } catch {}
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
