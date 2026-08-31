
import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ParallaxProps = {
  children: ReactNode
  /** Travel as a fraction of scroll distance. 0.2 = moves at 20% of scroll. */
  speed?: number
  className?: string
}

/**
 * Subtle vertical parallax.
 *
 * Only listens while the element is on screen, writes a transform inside a
 * single rAF, and does nothing at all under prefers-reduced-motion or on
 * narrow viewports where the effect costs more than it adds.
 */
export function Parallax({ children, speed = 0.18, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(max-width: 767px)').matches) return

    let active = false
    let ticking = false

    const update = () => {
      const rect = el.getBoundingClientRect()
      // Distance of the element's centre from the viewport centre.
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2
      el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(2)}px, 0)`
      ticking = false
    }

    const onScroll = () => {
      if (!active || ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        active = entries[0].isIntersecting
        if (active) update()
      },
      { rootMargin: '120px 0px' },
    )

    observer.observe(el)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [speed])

  return (
    <div ref={ref} className={cn('will-change-transform', className)}>
      {children}
    </div>
  )
}
