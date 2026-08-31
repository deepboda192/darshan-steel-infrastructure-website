'use client'

import { useEffect, useRef, useState } from 'react'
import { onReveal, prefersReducedMotion } from '@/lib/revealManager'
import { cn } from '@/lib/cn'

type CounterProps = {
  value: number
  suffix?: string
  prefix?: string
  /** Animation length in ms. */
  duration?: number
  className?: string
  /** Decimal places to display. */
  decimals?: number
}

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

/**
 * Counts up from zero the first time it enters the viewport.
 * Under prefers-reduced-motion the final value is rendered immediately.
 */
export function Counter({
  value,
  suffix = '',
  prefix = '',
  duration = 1800,
  className,
  decimals = 0,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)
  const started = useRef(false)
  const timers = useRef<{ frame?: number; settle?: number }>({})

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const run = () => {
      if (started.current) return
      started.current = true

      if (prefersReducedMotion()) {
        setDisplay(value)
        return
      }

      const start = performance.now()

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        setDisplay(value * easeOutExpo(progress))
        if (progress < 1) timers.current.frame = requestAnimationFrame(tick)
      }

      timers.current.frame = requestAnimationFrame(tick)

      // Browsers suspend requestAnimationFrame in background tabs. Without
      // this the figure would stay frozen at zero for anyone who opens the
      // page in a background tab and switches to it after it has scrolled in.
      timers.current.settle = window.setTimeout(() => setDisplay(value), duration + 400)
    }

    const pending = timers.current
    // Shares the scroll scheduler with Reveal, so a figure scrolled past
    // during a fast fling still lands on its final value instead of zero.
    const unsubscribe = onReveal(el, run)

    return () => {
      unsubscribe()
      if (pending.frame) cancelAnimationFrame(pending.frame)
      if (pending.settle) clearTimeout(pending.settle)
    }
  }, [value, duration])

  const shown = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toString()

  return (
    <span ref={ref} className={cn('tabular', className)}>
      {prefix}
      {shown}
      {suffix}
    </span>
  )
}
