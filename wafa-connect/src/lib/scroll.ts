// src/lib/scroll.ts

/**
 * Unified high-performance smooth scrolling utility.
 * Always prefers the active Lenis smooth scroller instance for 120fps fluid motion,
 * with an instant-feel hardware-accelerated fallback.
 */
export function smoothScrollTo(target: string | number | HTMLElement, offset: number = -70, duration: number = 0.9) {
  if (typeof window === 'undefined') return

  const isTouchOrMobile =
    window.innerWidth < 1024 ||
    'ontouchstart' in window ||
    (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0)

  // 1. Mobile devices: native hardware compositor thread (never drops frames or lags)
  if (isTouchOrMobile) {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' })
      return
    }

    const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
    if (el) {
      const elTop = el.getBoundingClientRect().top + window.pageYOffset + offset
      window.scrollTo({
        top: Math.max(0, elTop),
        behavior: 'smooth',
      })
    }
    return
  }

  // 2. Desktop devices: Lenis smooth inertial scrolling
  const lenis = (window as any).lenis
  if (lenis && typeof lenis.scrollTo === 'function') {
    lenis.scrollTo(target, {
      offset,
      duration,
      immediate: false,
      lock: false,
    })
    return
  }

  // 3. Fallback
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' })
    return
  }

  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
  if (el) {
    const elTop = el.getBoundingClientRect().top + window.pageYOffset + offset
    window.scrollTo({
      top: Math.max(0, elTop),
      behavior: 'smooth',
    })
  }
}
