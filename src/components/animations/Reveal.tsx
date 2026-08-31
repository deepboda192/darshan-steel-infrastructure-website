
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/cn'
import { onReveal, prefersReducedMotion } from '@/lib/revealManager'

type RevealProps = {
  children: ReactNode
  /** Seconds of delay before the transition starts. */
  delay?: number
  /** Travel distance in px. Use 0 for a pure fade. */
  y?: number
  className?: string
  style?: CSSProperties
  as?: ElementType
  /**
   * `fade`  — opacity + translate (default)
   * `line`  — masked line wipe, for headline lines
   * `image` — clip-path wipe with a settling scale, for image frames
   */
  variant?: 'fade' | 'line' | 'image'
}

const ATTR = {
  fade: 'data-reveal',
  line: 'data-reveal-line',
  image: 'data-reveal-image',
} as const

/**
 * Reveals its children once they scroll into view.
 *
 * Children are passed through untouched, so a Reveal placed in a server
 * component keeps its subtree on the server — only the observer is client-side.
 * Elements start visible unless JavaScript has confirmed it is running, so the
 * page is fully readable without JS and under prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  y,
  className,
  style,
  as: Tag = 'div',
  variant = 'fade',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return

    if (prefersReducedMotion()) {
      setVisible(true)
      return
    }

    // The shared scheduler fires as soon as the element reaches the trigger
    // line — including immediately if it is already there or has been scrolled
    // past. See lib/revealManager.ts for why this is position-based rather
    // than an IntersectionObserver.
    return onReveal(el, () => setVisible(true))
  }, [visible])

  const attrs = { [ATTR[variant]]: '' }

  return (
    <Tag
      ref={ref}
      {...attrs}
      className={cn(visible && 'is-visible', className)}
      style={
        {
          ...style,
          '--reveal-delay': `${delay}s`,
          ...(y !== undefined ? { '--reveal-y': `${y}px` } : {}),
        } as CSSProperties
      }
    >
      {variant === 'line' ? <span>{children}</span> : children}
    </Tag>
  )
}
