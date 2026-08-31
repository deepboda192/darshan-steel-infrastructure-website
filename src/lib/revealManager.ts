/**
 * ============================================================================
 * SHARED REVEAL SCHEDULER
 * ============================================================================
 * Decides when a scroll-reveal element becomes visible.
 *
 * Why not IntersectionObserver
 * ----------------------------
 * IO only fires when the intersection ratio *crosses a threshold*. During a
 * fast fling scroll, an anchor jump, or a restored scroll position, an element
 * can go from below the viewport to above it between two sampled frames — the
 * ratio is 0 before and 0 after, no threshold is crossed, and no callback ever
 * arrives. The element then stays hidden permanently, which on this site means
 * white text on a white background.
 *
 * Instead one rAF-throttled scroll listener serves every registered element and
 * simply asks whether each has reached the trigger line. Elements unregister as
 * soon as they fire, so the set shrinks to empty as the page is read. All the
 * reads happen together in one pass, so it costs a single layout flush per
 * frame rather than one per element.
 * ============================================================================
 */

type Entry = { el: Element; fire: () => void }

const entries = new Set<Entry>()
let listening = false
let ticking = false

/** Elements are revealed once their top edge passes 90% of the viewport. */
const TRIGGER = 0.9

function flush() {
  ticking = false
  if (entries.size === 0) return

  const limit = window.innerHeight * TRIGGER

  // Read every rect first, then fire — keeps this to one layout pass.
  const due: Entry[] = []
  for (const entry of entries) {
    if (entry.el.getBoundingClientRect().top < limit) due.push(entry)
  }

  for (const entry of due) {
    entries.delete(entry)
    entry.fire()
  }

  if (entries.size === 0) stop()
}

function schedule() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(flush)
}

function start() {
  if (listening) return
  listening = true
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule, { passive: true })
}

function stop() {
  if (!listening) return
  listening = false
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
}

/**
 * Registers an element. `fire` is called once, as soon as the element has
 * reached the trigger line — including immediately, if it already has.
 * Returns an unsubscribe function for React cleanup.
 */
export function onReveal(el: Element, fire: () => void): () => void {
  // Already at or past the trigger line: fire synchronously and skip the queue.
  if (el.getBoundingClientRect().top < window.innerHeight * TRIGGER) {
    fire()
    return () => {}
  }

  const entry: Entry = { el, fire }
  entries.add(entry)
  start()

  return () => {
    entries.delete(entry)
    if (entries.size === 0) stop()
  }
}

/** True when the visitor has asked for reduced motion. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}
