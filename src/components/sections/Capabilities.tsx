
import { useEffect, useRef, useState } from 'react'
import { workflowStages, type Stage } from '@/data/capabilities'
import { SectionHeader } from '@/components/site/SectionHeader'
import { Button } from '@/components/site/Button'
import { cn } from '@/lib/cn'

/**
 * The integrated workflow, as a scroll-stepped engineering rail.
 *
 * The UI is the original rail: eight stages on a single hairline, a blue line
 * filling across it, the active stage's description and deliverables in the
 * panel below. What changed is how the active stage is driven on desktop:
 *
 * The section sits sticky inside a wrapper tall enough for one step of scroll
 * travel per stage. While it is pinned, wheel input is intercepted and folded
 * into *gestures* — deltas accumulate until they cross a threshold, that
 * triggers exactly one stage change, and the machine then locks and waits for
 * a quiet gap so trackpad momentum cannot fire again. One intentional gesture,
 * one stage, in either direction. At stage 01 scrolling up (or stage 08 down)
 * events are left alone, so the page releases and never traps the user.
 * Scrollbar drags and Home/End bypass the wheel path entirely; a passive
 * scroll listener keeps the active stage in sync with wherever the section is
 * in its travel, so those paths degrade gracefully instead of fighting.
 *
 * Keyboard: arrows, PageUp/Down and Space step the same way while pinned.
 * Clicking a stage number jumps straight to it.
 *
 * On mobile/tablet, and under prefers-reduced-motion, none of this engages:
 * the section keeps its original behaviour — the fill tracks the section's
 * pass through the viewport and stages are selectable by tap.
 */

const STAGES = workflowStages
const LAST = STAGES.length - 1

/** Scroll travel consumed by one stage while pinned. */
const STEP_PX = 240
/** Accumulated wheel delta (px) that counts as one intentional gesture. */
const GESTURE_PX = 90
/** A pause this long separates two gestures; anything denser is momentum. */
const GESTURE_GAP_MS = 160
/** Stage changes are locked out this long after one fires. */
const LOCK_MS = 700

type StepState = { index: number; prev: number | null; dir: 1 | -1 }

/** The active stage panel — one markup, rendered for live and exiting stage. */
function StageDetail({ stage, className }: { stage: Stage; className?: string }) {
  return (
    <div className={cn('grid gap-10 lg:grid-cols-12 lg:gap-16', className)}>
      <div className="lg:col-span-2">
        <p className="tech text-brand tabular">Stage {stage.index}</p>
      </div>

      <div className="lg:col-span-6">
        <h3 className="text-display-4 font-display text-charcoal">{stage.title}</h3>
        <p className="measure mt-5 text-body text-muted">{stage.description}</p>
      </div>

      <div className="lg:col-span-3 lg:col-start-10">
        <p className="tech mb-5 text-muted">Deliverables</p>
        <ul className="flex flex-col gap-3">
          {stage.outputs.map((output) => (
            <li key={output} className="flex items-start gap-3 text-small text-charcoal/80">
              <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-brand" />
              {output}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function Capabilities() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  /** Desktop + motion allowed → pinned stepping. Otherwise original flow. */
  const [enhanced, setEnhanced] = useState(false)

  /* ---- step mode ---- */
  const [step, setStep] = useState<StepState>({ index: 0, prev: null, dir: 1 })
  // The authoritative index for the event handlers. Updated synchronously at
  // every transition — React state is a render mirror of this, and wheel
  // events must never read an index that is a flush behind.
  const indexRef = useRef(0)

  /* ---- flow mode (the original behaviour) ---- */
  const [progress, setProgress] = useState(0)
  const [pinnedClick, setPinnedClick] = useState<number | null>(null)

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)')
    const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)')
    const decide = () => setEnhanced(wide.matches && motionOk.matches)
    decide()
    wide.addEventListener('change', decide)
    motionOk.addEventListener('change', decide)
    return () => {
      wide.removeEventListener('change', decide)
      motionOk.removeEventListener('change', decide)
    }
  }, [])

  /* ------------------------------------------------------- flow mode drive */
  useEffect(() => {
    if (enhanced) return
    const el = wrapperRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1)
      return
    }

    let ticking = false
    let active = false

    const update = () => {
      const rect = el.getBoundingClientRect()
      const start = window.innerHeight * 0.75
      const end = window.innerHeight * 0.35
      const travel = rect.height + (start - end)
      const moved = start - rect.top
      setProgress(Math.min(Math.max(moved / travel, 0), 1))
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
      { rootMargin: '200px 0px' },
    )

    observer.observe(el)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [enhanced])

  /* --------------------------------------------------------- fit the pin */
  // The pinned section must show everything — headline to deliverables — on
  // one screen. Spacing is already viewport-adaptive; on windows shorter than
  // the content's natural height, the whole plate scales down uniformly
  // instead of clipping. transform doesn't affect layout, so measuring
  // offsetHeight never feeds back into the scale.
  useEffect(() => {
    if (!enhanced) return
    const content = contentRef.current
    if (!content) return

    const PAD_TOP = 88 // clears the fixed site header
    const PAD_BOTTOM = 24

    const fit = () => {
      const avail = window.innerHeight - PAD_TOP - PAD_BOTTOM
      const scale = Math.min(1, avail / content.offsetHeight)
      content.style.transformOrigin = 'top center'
      content.style.transform = scale < 0.999 ? `scale(${scale.toFixed(4)})` : ''
    }

    const ro = new ResizeObserver(fit)
    ro.observe(content)
    window.addEventListener('resize', fit)
    fit()

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', fit)
      content.style.transform = ''
    }
  }, [enhanced])

  /* ------------------------------------------------------- step mode drive */
  useEffect(() => {
    if (!enhanced) return
    const wrapper = wrapperRef.current
    if (!wrapper) return

    // Wheel-gesture machine. Mutated per event; never triggers renders itself.
    const m = {
      accum: 0,
      lastT: 0,
      lockedUntil: 0,
      waitGap: false,
      wasPinned: false,
    }
    let prevTimer: ReturnType<typeof setTimeout> | undefined
    let ticking = false

    const wrapperTop = () => wrapper.getBoundingClientRect().top + window.scrollY

    const goTo = (next: number, dir: 1 | -1, t: number) => {
      const clamped = Math.max(0, Math.min(LAST, next))
      const current = indexRef.current
      if (clamped === current) return
      m.lockedUntil = t + LOCK_MS
      m.waitGap = true
      m.accum = 0
      indexRef.current = clamped
      setStep({ index: clamped, prev: current, dir })
      clearTimeout(prevTimer)
      prevTimer = setTimeout(() => {
        setStep((s) => (s.prev === null ? s : { ...s, prev: null }))
      }, 520)
      // 'instant' sidesteps the global `scroll-behavior: smooth` — the page
      // itself is pinned, so only the content should be seen to move.
      window.scrollTo({ top: wrapperTop() + clamped * STEP_PX, behavior: 'instant' })
    }

    const pinned = () => {
      const rect = wrapper.getBoundingClientRect()
      return rect.top <= 1 && rect.bottom >= window.innerHeight - 1
    }

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
      if (!pinned()) {
        m.wasPinned = false
        return
      }
      const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1
      const current = indexRef.current
      // Boundary in the travel direction: leave the event alone — the page
      // scrolls on and the section releases. Never trap the user.
      if ((current === 0 && dir < 0) || (current === LAST && dir > 0)) return

      e.preventDefault()
      const t = performance.now()
      const gap = t - m.lastT
      m.lastT = t

      // Arriving pinned mid-momentum: absorb the tail before counting.
      if (!m.wasPinned) {
        m.wasPinned = true
        m.waitGap = true
        m.lockedUntil = Math.max(m.lockedUntil, t + 350)
        m.accum = 0
        return
      }
      if (t < m.lockedUntil) {
        m.accum = 0
        return
      }
      if (m.waitGap) {
        // Still inside the previous gesture's momentum stream.
        if (gap < GESTURE_GAP_MS) return
        m.waitGap = false
      }
      if (gap > GESTURE_GAP_MS) m.accum = 0

      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1
      m.accum += e.deltaY * unit
      if (Math.abs(m.accum) < GESTURE_PX) return
      goTo(current + dir, dir, t)
    }

    const onKey = (e: KeyboardEvent) => {
      if (!pinned()) return
      const target = e.target as HTMLElement | null
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)))
        return
      let dir: 1 | -1 | 0 = 0
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) dir = 1
      if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) dir = -1
      if (!dir) return
      const current = indexRef.current
      if ((current === 0 && dir < 0) || (current === LAST && dir > 0)) return
      e.preventDefault()
      const t = performance.now()
      if (t < m.lockedUntil) return
      goTo(current + dir, dir, t)
    }

    // Scrollbar drags, Home/End and anchor jumps bypass the wheel machine —
    // follow the scroll position so the rail can never desynchronise.
    const syncToScroll = () => {
      const offset = window.scrollY - wrapperTop()
      const idx = Math.max(0, Math.min(LAST, Math.round(offset / STEP_PX)))
      const current = indexRef.current
      if (idx !== current) {
        indexRef.current = idx
        setStep({ index: idx, prev: current, dir: idx > current ? 1 : -1 })
        clearTimeout(prevTimer)
        prevTimer = setTimeout(() => {
          setStep((s) => (s.prev === null ? s : { ...s, prev: null }))
        }, 520)
      }
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(syncToScroll)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      clearTimeout(prevTimer)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
    }
  }, [enhanced])

  const selectStage = (i: number) => {
    if (enhanced) {
      const wrapper = wrapperRef.current
      const current = indexRef.current
      if (!wrapper || i === current) return
      indexRef.current = i
      setStep({ index: i, prev: current, dir: i > current ? 1 : -1 })
      window.scrollTo({
        top: wrapper.getBoundingClientRect().top + window.scrollY + i * STEP_PX,
        behavior: 'instant',
      })
    } else {
      setPinnedClick(i)
    }
  }

  const flowIndex = Math.min(LAST, Math.floor(progress * STAGES.length))
  const activeIndex = enhanced ? step.index : (pinnedClick ?? flowIndex)
  const passedIndex = enhanced ? step.index : flowIndex
  const fill = enhanced ? step.index / LAST : progress
  const active = STAGES[activeIndex]

  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={enhanced ? { height: `calc(100vh + ${LAST * STEP_PX}px)` } : undefined}
    >
      <section
        className={cn(
          'bg-white',
          enhanced
            ? 'sticky top-0 flex h-screen min-h-0 flex-col overflow-hidden pb-6 pt-[88px]'
            : 'py-24 md:py-32 lg:py-40',
        )}
        aria-label="Our integrated workflow"
      >
        {/* `my-auto` centres the plate when it fits and top-aligns it when it
            doesn't — unlike justify-center, which clips overflow at both ends. */}
        <div ref={contentRef} className={cn('container-site w-full', enhanced && 'my-auto')}>
          <SectionHeader
            index="04"
            eyebrow="Capabilities"
            size={enhanced ? 'md' : 'lg'}
            title={
              <>
                From engineering to erection.
                {' '}<br />
                One integrated system.
              </>
            }
            lead="Eight stages, one team. Nothing is handed to a third party at the point where responsibility usually gets lost."
            aside={
              <Button href="/manufacturing" variant="secondary" arrow>
                View Capabilities
              </Button>
            }
            className={enhanced ? 'mb-[clamp(20px,3.5vh,44px)]' : 'mb-16 md:mb-24'}
          />

          {/* ---------------- rail ---------------- */}
          <div className="-mx-gutter overflow-x-auto px-gutter pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="relative min-w-[860px] lg:min-w-0">
              {/* base hairline + blue fill */}
              <div aria-hidden="true" className="absolute inset-x-0 top-[62px] h-px bg-charcoal/15">
                <span
                  className="absolute inset-y-0 left-0 block bg-brand transition-[width] duration-500 ease-[var(--ease-expo)]"
                  style={{ width: `${fill * 100}%` }}
                />
              </div>

              <ol className="relative grid grid-cols-8 gap-3">
                {STAGES.map((stage, i) => {
                  const isActive = i === activeIndex
                  const isPassed = i <= passedIndex
                  return (
                    <li key={stage.index}>
                      <button
                        type="button"
                        onClick={() => selectStage(i)}
                        aria-current={isActive ? 'step' : undefined}
                        className="group block w-full pr-2 text-left"
                      >
                        <span
                          className={cn(
                            'font-display wdth-wide block text-display-4 tabular transition-colors duration-500',
                            isPassed ? 'text-charcoal' : 'text-steel',
                          )}
                        >
                          {stage.index}
                        </span>

                        {/* node on the rail */}
                        <span
                          aria-hidden="true"
                          className={cn(
                            'mt-[18px] block h-2.5 w-2.5 rounded-full border-2 transition-colors duration-500',
                            isActive
                              ? 'border-brand bg-brand'
                              : isPassed
                                ? 'border-brand bg-white'
                                : 'border-steel bg-white',
                          )}
                        />

                        <span
                          className={cn(
                            'mt-6 block text-small leading-snug transition-colors duration-500',
                            isActive
                              ? 'font-semibold text-brand'
                              : isPassed
                                ? 'font-medium text-charcoal/70'
                                : 'font-medium text-muted/60',
                          )}
                        >
                          {stage.title}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>

          {/* ---------------- active stage detail ---------------- */}
          <div
            className={cn(
              'border-t border-charcoal/10',
              enhanced
                ? 'mt-[clamp(16px,3vh,40px)] pt-[clamp(16px,2.5vh,32px)]'
                : 'mt-14 pt-12 md:mt-16',
            )}
          >
            <div
              aria-live="polite"
              className={cn('relative', enhanced && 'min-h-[clamp(200px,28vh,280px)]')}
            >
              {enhanced && step.prev !== null && (
                <StageDetail
                  stage={STAGES[step.prev]}
                  className={cn(
                    'pointer-events-none absolute inset-x-0 top-0',
                    step.dir > 0 ? 'stage-exit-up' : 'stage-exit-down',
                  )}
                />
              )}
              <StageDetail
                stage={active}
                className={
                  enhanced && step.prev !== null
                    ? step.dir > 0
                      ? 'stage-enter-up'
                      : 'stage-enter-down'
                    : undefined
                }
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
