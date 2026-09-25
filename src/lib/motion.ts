import { useEffect } from 'react'
import type SplitTypeCtor from 'split-type'

type Split = InstanceType<typeof SplitTypeCtor>

/**
 * Arms the scroll-driven motion for the whole document once the calling
 * page has mounted. Call it from the PAGE component, not a layout above it:
 * a page arrives as a lazily loaded route chunk, so a layout-level effect
 * fires before the page's subtree has hydrated — and GSAP would then write
 * inline styles (and split headings into word spans) onto DOM that React is
 * still about to reconcile, which React reports as a hydration mismatch.
 */
export function useMotion() {
  useEffect(() => initMotion(), [])
}

/**
 * Scroll-driven motion, mirroring the reference template's behaviours. Every
 * effect is opted into with a data attribute, so sections stay declarative:
 *
 *   data-counter="230" data-suffix="+"   counts up from zero when scrolled in
 *   data-scrub-words                     words brighten one by one with scroll
 *   data-animation="blur-stagger"        words blur-fade in from the side
 *   data-animation="blur-stagger-chars"  characters blur-fade in from below
 *   data-marquee="left|right"            infinite track loop, pauses on hover
 *   data-reveal="up|fade|left|right"     entrance when scrolled into view
 *   data-reveal-stagger                  children enter one after another
 *   data-stack / data-stack-item         covered sticky rows shrink and fade
 *
 * GSAP, ScrollTrigger and SplitType are imported lazily on the client, so the
 * server bundle never touches them. The returned function tears everything
 * down and restores the split text — call it on unmount.
 */
export function initMotion(scope?: HTMLElement): () => void {
  if (typeof window === 'undefined') return () => {}

  let cancelled = false
  let cleanup: (() => void) | null = null

  void (async () => {
    const [{ gsap }, { ScrollTrigger }, { default: SplitType }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('split-type'),
    ])
    if (cancelled) return

    gsap.registerPlugin(ScrollTrigger)

    const root = scope ?? document.body
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const splits: Split[] = []
    // Elements already on screen when motion arms (the hero foot, short
    // viewports, a page opened mid-scroll) play at once; the rest wait until
    // they are scrolled into view.
    const enter = (el: HTMLElement, at = 'top 88%') => ({
      start: el.getBoundingClientRect().top < window.innerHeight ? 'top bottom' : at,
      toggleActions: 'play none none none',
    })

    const mm = gsap.matchMedia()

    const ctx = gsap.context(() => {
      /* ------------------------------------------------------ counters */
      root.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
        const target = Number(el.dataset.counter)
        const suffix = el.dataset.suffix ?? ''
        const grouping = el.dataset.grouping !== 'false'
        const format = (n: number) =>
          (grouping ? Math.floor(n).toLocaleString('en-IN') : String(Math.floor(n))) + suffix

        if (reduced || Number.isNaN(target)) return

        const obj = { value: 0 }
        el.textContent = format(0)
        gsap.to(obj, {
          value: target,
          duration: 2.3,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top bottom', toggleActions: 'play none none none' },
          onUpdate: () => {
            el.textContent = format(obj.value)
          },
        })
      })

      /* --------------------------------------------- scrub-reveal text */
      root.querySelectorAll<HTMLElement>('[data-scrub-words]').forEach((el) => {
        if (reduced) return
        const split = new SplitType(el, { types: 'words', tagName: 'span' })
        splits.push(split)
        gsap
          .timeline({
            scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 15%', scrub: true },
          })
          .from(split.words, { opacity: 0.4, duration: 0.2, ease: 'none', stagger: { each: 0.4 } })
      })

      /* ---------------------------------------------- blur stagger text */
      root
        .querySelectorAll<HTMLElement>(
          '[data-animation="blur-stagger"], [data-animation="blur-stagger-chars"]',
        )
        .forEach((el) => {
          if (reduced) {
            gsap.set(el, { opacity: 1 })
            return
          }
          const chars = el.dataset.animation === 'blur-stagger-chars'
          const split = new SplitType(el, { types: chars ? 'words,chars' : 'words' })
          splits.push(split)
          const targets = chars ? split.chars : split.words
          gsap.set(el, { opacity: 1 })
          gsap.set(targets, { willChange: 'transform, filter, opacity' })
          gsap.from(targets, {
            opacity: 0,
            filter: 'blur(8px)',
            x: chars ? 0 : 14,
            y: chars ? 15 : 0,
            duration: 1.2,
            stagger: 0.06,
            ease: 'quart.out',
            scrollTrigger: { trigger: el, ...enter(el) },
          })
        })

      /* ------------------------------------------------------- marquees */
      root.querySelectorAll<HTMLElement>('[data-marquee]').forEach((wrap) => {
        const tracks = Array.from(wrap.querySelectorAll<HTMLElement>('[data-marquee-track]'))
        const right = wrap.dataset.marquee === 'right'
        const duration = Number(wrap.dataset.marqueeSpeed ?? 25)
        const tweens = tracks.map((track) => {
          gsap.set(track, { xPercent: right ? -100 : 0 })
          return gsap.to(track, {
            xPercent: right ? 0 : -100,
            duration,
            ease: 'none',
            repeat: -1,
            paused: reduced,
          })
        })
        wrap.addEventListener('mouseenter', () => tweens.forEach((t) => t.pause()))
        wrap.addEventListener('mouseleave', () => {
          if (!reduced) tweens.forEach((t) => t.resume())
        })
      })

      /* ----------------------------------------------------- entrances */
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        if (reduced) {
          gsap.set(el, { opacity: 1 })
          return
        }
        const kind = el.dataset.reveal || 'up'
        const from: Record<string, number> = { opacity: 0 }
        if (kind === 'up') from.y = 40
        if (kind === 'left') from.x = -40
        if (kind === 'right') from.x = 40
        gsap.fromTo(el, from, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          delay: Number(el.dataset.revealDelay ?? 0),
          scrollTrigger: { trigger: el, ...enter(el) },
        })
      })

      root.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((group) => {
        const items = Array.from(group.children) as HTMLElement[]
        if (reduced) {
          gsap.set(items, { opacity: 1 })
          return
        }
        gsap.fromTo(
          items,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: { trigger: group, ...enter(group, 'top 85%') },
          },
        )
      })

      /* -------------------------------------------------- sticky stacks */
      // The reference's stacked project rows: as the next row slides up
      // over a sticky one, the covered row shrinks to 80% and fades out,
      // scrubbed against the stack's own scroll — the first row over the
      // stack's first quarter, the second over the next, and so on. The
      // last row stays as it is. Rows only stick from 1024px up (below,
      // they flow), so the scrub is armed there alone.
      root.querySelectorAll<HTMLElement>('[data-stack]').forEach((stack) => {
        const items = Array.from(stack.querySelectorAll<HTMLElement>('[data-stack-item]'))
        if (reduced || items.length < 2) return
        const step = 100 / items.length
        mm.add('(min-width: 1024px)', () => {
          items.slice(0, -1).forEach((item, i) => {
            gsap.fromTo(
              item,
              { scale: 1, opacity: 1 },
              {
                scale: 0.8,
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                  trigger: stack,
                  start: `${i * step}% top`,
                  end: `${(i + 1) * step}% top`,
                  scrub: 0.8,
                },
              },
            )
          })
        })
      })
    }, root)

    // Web fonts change line wraps; re-measure every trigger once they land.
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh()
    })

    cleanup = () => {
      mm.revert()
      ctx.revert()
      splits.forEach((s) => s.revert())
    }
  })()

  return () => {
    cancelled = true
    cleanup?.()
  }
}
