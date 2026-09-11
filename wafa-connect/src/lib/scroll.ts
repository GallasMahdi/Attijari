// src/lib/scroll.ts

/**
 * Unified high-performance smooth scrolling utility.
 * Always prefers the active Lenis smooth scroller instance for 120fps fluid motion,
 * with an instant-feel hardware-accelerated fallback.
 */
export function smoothScrollTo(target: string | number | HTMLElement, offset: number = -70, duration: number = 0.95) {
  if (typeof window === 'undefined') return

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

  // Fallback if Lenis is not yet mounted or disabled
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' })
    return
  }

  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
  if (el) {
    const elTop = el.getBoundingClientRect().top + window.pageYOffset + offset
    window.scrollTo({
      top: Math.max(0, elTop),
      behavior: 'smooth'
    })
  }
}
