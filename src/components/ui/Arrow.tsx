import { cn } from '@/lib/cn'

type ArrowProps = {
  className?: string
  /** Rotation in degrees — 0 points right, -45 points up-right. */
  angle?: number
  size?: number
}

/**
 * The site's only icon shape. A single-weight technical arrow, drawn rather
 * than imported, so it matches the hairline language of the rest of the UI.
 * Translates on `.group` hover wherever it is used.
 */
export function Arrow({ className, angle = 0, size = 16 }: ArrowProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn('shrink-0 overflow-visible', className)}
    >
      {/* Rotation is applied inside the SVG rather than as an element
          transform, so hover utilities like `group-hover:translate-x-1` on the
          same element are not overwritten by it. */}
      <g transform={angle ? `rotate(${angle} 8 8)` : undefined}>
        <path
          d="M1 8h13M9.2 3.2 14 8l-4.8 4.8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  )
}
