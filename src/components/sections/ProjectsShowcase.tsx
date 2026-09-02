import { useEffect, useRef, useState } from 'react'
import Link from '@/components/site/NextLink'
import { useQuery } from '@tanstack/react-query'
import { featuredProjects, projects as allProjects } from '@/data/projects'
import { projectsQueryOptions } from '@/lib/projects-query'
import { SectionHeader } from '@/components/site/SectionHeader'
import { Button } from '@/components/site/Button'
import { Arrow } from '@/components/site/Arrow'
import { Reveal } from '@/components/animations/Reveal'
import { cn } from '@/lib/cn'

/**
 * Selected projects — a 3D loop carousel, viewed from INSIDE the cylinder.
 *
 * Cards are placed on the far wall of a ring around the camera: each rotated
 * i·(360/N)° and pushed AWAY by the radius, so the card ahead is the farthest
 * and smallest, and cards toward the screen edges swing nearer, larger and
 * angled inward — the concave band of the reference. Cards that pass beside
 * and behind the camera face away and are culled by backface-visibility.
 * The list is repeated until the ring holds ~18 cards, keeping the arc
 * shallow and dense; the loop shows repeats by design. The ring turns slowly
 * on its own, pauses under the pointer, can be dragged, and steps one card
 * per arrow click.
 *
 * The rotation itself lives in refs and is applied by mutating the ring's
 * transform inside one rAF loop — React renders the ring once per data or
 * geometry change, never per frame. The only per-frame state write is the
 * front-card counter, guarded so it fires at most once per card change.
 *
 * Under prefers-reduced-motion the ring holds still: no auto-rotation, and the
 * arrows snap instead of easing. Cards remain plain links throughout — the
 * carousel is presentation, not navigation.
 */

/** Degrees per second of idle rotation — a full lap in one minute. */
const AUTO_DEG_PER_S = 6
/** Drag sensitivity: degrees per pixel — tuned so one card is ~a palm swipe. */
const DRAG_DEG_PER_PX = 0.07
/** Idle time after a drag before the auto-rotation resumes. */
const RESUME_MS = 2000

export function ProjectsShowcase() {
  const { data } = useQuery(projectsQueryOptions)
  // The ring needs enough cards to read as a ring; the file fallback has 14.
  const source = data && data.length >= 6 ? data : allProjects.length >= 6 ? allProjects : featuredProjects
  const unique = source.slice(0, 10)
  // Repeat the list until the ring is dense enough for a shallow, full arc.
  const repeats = Math.max(1, Math.ceil(18 / unique.length))
  const cards = Array.from({ length: unique.length * repeats }, (_, i) => unique[i % unique.length])
  const count = cards.length
  const step = 360 / count

  const stageRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  // Geometry derived from the measured stage width; deterministic initials so
  // SSR and the first client render agree.
  const [cardW, setCardW] = useState(320)
  const [frontIndex, setFrontIndex] = useState(0)
  // Radius from the chord between neighbours (card width + breathing room).
  const radius = Math.round((cardW + 36) / 2 / Math.sin(Math.PI / count))
  // Camera sits inside the ring, pushed toward its far wall: ahead is far and
  // small, the edges of the band come close — the concave look.
  const ringZ = Math.round(radius * 0.52)
  const cardH = Math.round(cardW * 1.08)

  /* ----------------------------------------------------------- measurement */
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const measure = () => {
      const byWidth = stage.clientWidth * 0.26
      // cardH = 1.08·cardW must sit inside the stage with headroom for the
      // perspective-enlarged edge cards, so height also bounds the card.
      const byHeight = (stage.clientHeight * 0.78) / 1.08
      setCardW(Math.round(Math.min(380, Math.max(200, byWidth), Math.max(200, byHeight))))
    }
    const ro = new ResizeObserver(measure)
    ro.observe(stage)
    measure()
    return () => ro.disconnect()
  }, [])

  /* ------------------------------------------------------------- the drive */
  useEffect(() => {
    const ring = ringRef.current
    const stage = stageRef.current
    if (!ring || !stage) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const s = {
      angle: 0,
      target: null as number | null,
      dragging: false,
      hovered: false,
      resumeAt: 0,
      dragStartX: 0,
      dragStartAngle: 0,
      moved: 0,
      lastT: performance.now(),
      frame: 0,
    }

    // backface-visibility hides a rear-facing card's paint but NOT its hit
    // area — a card passing behind the camera projects as an enormous
    // invisible rectangle that would swallow every click on the stage. Track
    // facing per card and hide the element itself, which kills events too.
    const facing: boolean[] = []
    const apply = () => {
      ring.style.transform = `translateZ(${ringZ}px) rotateY(${s.angle}deg)`
      const kids = ring.children
      for (let i = 0; i < kids.length; i++) {
        const faces = Math.cos(((s.angle + i * step) * Math.PI) / 180) > 0.02
        if (facing[i] !== faces) {
          facing[i] = faces
          ;(kids[i] as HTMLElement).style.visibility = faces ? '' : 'hidden'
        }
      }
      const front = ((Math.round(-s.angle / step) % count) + count) % count
      // Guarded: one state write per card change, not per frame.
      setFrontIndex((prev) => (prev === front ? prev : front))
    }

    const tick = (t: number) => {
      const dt = Math.min(0.1, (t - s.lastT) / 1000)
      s.lastT = t
      if (s.target !== null) {
        const d = s.target - s.angle
        if (Math.abs(d) < 0.05) {
          s.angle = s.target
          s.target = null
        } else {
          s.angle += d * Math.min(1, dt * 7)
        }
        apply()
      } else if (!reduced && !s.dragging && !s.hovered && t > s.resumeAt) {
        s.angle -= AUTO_DEG_PER_S * dt
        apply()
      }
      s.frame = requestAnimationFrame(tick)
    }

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return
      s.dragging = true
      s.target = null
      s.moved = 0
      s.dragStartX = e.clientX
      s.dragStartAngle = s.angle
      stage.setPointerCapture(e.pointerId)
      stage.style.cursor = 'grabbing'
    }
    const onMove = (e: PointerEvent) => {
      if (!s.dragging) return
      s.moved = Math.max(s.moved, Math.abs(e.clientX - s.dragStartX))
      s.angle = s.dragStartAngle + (e.clientX - s.dragStartX) * DRAG_DEG_PER_PX
      apply()
    }
    const onUp = () => {
      if (!s.dragging) return
      s.dragging = false
      s.resumeAt = performance.now() + RESUME_MS
      stage.style.cursor = 'grab'
    }
    // A release at the end of a drag lands on a card, and the click that
    // follows pointerup would navigate to it. Swallow clicks that conclude a
    // real drag; taps and stationary clicks pass through untouched.
    const onClickCapture = (e: MouseEvent) => {
      if (s.moved > 8) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
    const onEnter = () => (s.hovered = true)
    const onLeave = () => {
      s.hovered = false
      onUp()
    }

    /** Arrow steps: rotate one card, snapped to the grid of steps. */
    const stepBy = (dir: 1 | -1) => {
      const base = s.target ?? s.angle
      const snapped = Math.round((base - dir * step) / step) * step
      if (reduced) {
        s.angle = snapped
        s.target = null
        apply()
      } else {
        s.target = snapped
      }
      s.resumeAt = performance.now() + RESUME_MS
    }
    ;(stage as HTMLDivElement & { __stepBy?: (d: 1 | -1) => void }).__stepBy = stepBy

    stage.addEventListener('pointerdown', onDown)
    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerup', onUp)
    stage.addEventListener('pointercancel', onUp)
    stage.addEventListener('click', onClickCapture, true)
    stage.addEventListener('pointerenter', onEnter)
    stage.addEventListener('pointerleave', onLeave)
    apply()
    s.frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(s.frame)
      stage.removeEventListener('pointerdown', onDown)
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerup', onUp)
      stage.removeEventListener('pointercancel', onUp)
      stage.removeEventListener('click', onClickCapture, true)
      stage.removeEventListener('pointerenter', onEnter)
      stage.removeEventListener('pointerleave', onLeave)
    }
  }, [count, step, radius, ringZ])

  const stepBy = (dir: 1 | -1) =>
    (stageRef.current as (HTMLDivElement & { __stepBy?: (d: 1 | -1) => void }) | null)?.__stepBy?.(
      dir,
    )

  return (
    <section
      className="overflow-hidden bg-white py-24 md:py-32 lg:flex lg:h-[calc(100vh-76px)] lg:min-h-[680px] lg:flex-col lg:justify-center lg:py-10"
      aria-label="Selected projects"
    >
      <div className="container-site">
        <SectionHeader
          index="07"
          eyebrow="Projects"
          title={
            <>
              Built across
              {' '}<br />
              industries.
            </>
          }
          lead="Manufacturing plants, distribution warehouses, cold stores and commercial structures — engineered, fabricated and erected by the same team."
          aside={
            <Button href="/projects" variant="secondary" arrow>
              View All Projects
            </Button>
          }
          className="mb-10 md:mb-12 lg:mb-2"
        />
      </div>

      {/* ---------------- the ring ---------------- */}
      <Reveal className="lg:min-h-0 lg:flex-1">
        <div
          ref={stageRef}
          role="group"
          aria-roledescription="carousel"
          aria-label="Project carousel — drag to rotate"
          className="relative h-[26rem] w-full cursor-grab select-none touch-pan-y sm:h-[30rem] lg:h-full"
          style={{ perspective: '1150px' }}
        >
          <div
            ref={ringRef}
            className="absolute left-1/2 top-1/2 h-0 w-0 will-change-transform"
            style={{
              transformStyle: 'preserve-3d',
              transform: `translateZ(${ringZ}px)`,
            }}
          >
            {cards.map((project, i) => (
              <Link
                key={`${project.slug}-${i}`}
                href={`/projects/${project.slug}`}
                draggable={false}
                className="group absolute block overflow-hidden bg-charcoal"
                style={{
                  width: cardW,
                  height: cardH,
                  left: -cardW / 2,
                  top: -cardH / 2,
                  transform: `rotateY(${i * step}deg) translateZ(${-radius}px)`,
                  backfaceVisibility: 'hidden',
                }}
              >
                <img
                  src={project.photo}
                  alt={`${project.buildingType} — ${project.name}`}
                  draggable={false}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-expo)] group-hover:scale-[1.05]"
                />
                {/* charcoal scrim so the caption reads on any photograph */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/15"
                />

                <div className="absolute inset-0 flex flex-col justify-between p-5">
                  <span className="tech text-white/60 tabular">Project {project.index}</span>
                  <div>
                    <span
                      aria-hidden="true"
                      className="mb-3 block h-0.5 w-8 origin-left bg-brand transition-transform duration-[600ms] ease-[var(--ease-expo)] group-hover:scale-x-[2.5]"
                    />
                    <h3 className="font-display wdth-wide text-[1.15rem] leading-[1.15] text-white">
                      {project.name}
                    </h3>
                    <p className="tech mt-2 text-white/60">{project.buildingType}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ---------------- controls + readout ---------------- */}
      <div className="container-site">
        <div className="mt-8 flex items-center justify-between border-t border-charcoal/10 pt-6 lg:mt-2 lg:pt-4">
          <p className="tech text-muted tabular" aria-live="polite">
            {/* The ring repeats the list; the readout names the unique project. */}
            {String((frontIndex % unique.length) + 1).padStart(2, '0')}
            <span className="text-charcoal/30"> / {String(unique.length).padStart(2, '0')}</span>
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => stepBy(-1)}
              aria-label="Previous project"
              className="flex h-11 w-11 items-center justify-center border border-charcoal/20 text-charcoal transition-colors hover:border-brand hover:text-brand"
            >
              <Arrow size={16} className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => stepBy(1)}
              aria-label="Next project"
              className="flex h-11 w-11 items-center justify-center border border-charcoal/20 text-charcoal transition-colors hover:border-brand hover:text-brand"
            >
              <Arrow size={16} />
            </button>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 border-t border-charcoal/10 pt-8 lg:hidden">
            <Button href="/projects" arrow>
              View All Projects
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
