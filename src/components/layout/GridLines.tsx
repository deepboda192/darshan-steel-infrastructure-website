import { cn } from '@/lib/cn'

/**
 * The structural grid.
 *
 * A fixed set of vertical hairlines running the full height of the viewport,
 * aligned to the same edges as `container-site`. Content scrolls past them, so
 * the page reads as if it were drawn on a structural grid sheet — the site's
 * signature detail, and the reason sections feel measured rather than stacked.
 *
 * Deliberately neutral grey at low alpha so it reads on both white and
 * charcoal surfaces without needing to know which section is behind it.
 */
export function GridLines({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none fixed inset-0 z-20 hidden md:block', className)}
    >
      <div className="container-site relative h-full">
        <div className="relative grid h-full grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="relative">
              <span className="absolute inset-y-0 left-0 w-px bg-muted-2/[0.07]" />
            </div>
          ))}
          {/* closing line on the right edge */}
          <span className="absolute inset-y-0 right-0 w-px bg-muted-2/[0.07]" />
        </div>
      </div>
    </div>
  )
}
