'use client'

import { useEffect, useRef, useState } from 'react'
import { workflowStages } from '@/data/capabilities'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

/**
 * The integrated workflow, as a scroll-driven engineering rail.
 *
 * Eight stages sit on a single hairline. A blue line fills across the rail as
 * the section passes through the viewport, and the stage it reaches becomes
 * the active one — its description and deliverables appear in the panel below.
 * Everything is keyboard reachable: each stage is a real button.
 *
 * Under prefers-reduced-motion the fill is not animated; the rail still works,
 * driven only by clicks.
 */
export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [pinned, setPinned] = useState<number | null>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1)
      return
    }

    let ticking = false
    let active = false

    const update = () => {
      const rect = el.getBoundingClientRect()
      // 0 when the section's top reaches 75% of the viewport,
      // 1 by the time its bottom passes 35%.
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
  }, [])

  const scrolled = Math.min(
    workflowStages.length - 1,
    Math.floor(progress * workflowStages.length),
  )
  const activeIndex = pinned ?? scrolled
  const active = workflowStages[activeIndex]

  return (
    <section
      ref={sectionRef}
      className="bg-white py-24 md:py-32 lg:py-40"
      aria-label="Our integrated workflow"
    >
      <div className="container-site">
        <SectionHeader
          index="04"
          eyebrow="Capabilities"
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
          className="mb-16 md:mb-24"
        />

        {/* ---------------- rail ---------------- */}
        <div className="-mx-gutter overflow-x-auto px-gutter pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="relative min-w-[860px] lg:min-w-0">
            {/* base hairline + blue fill */}
            <div aria-hidden="true" className="absolute inset-x-0 top-[62px] h-px bg-charcoal/15">
              <span
                className="absolute inset-y-0 left-0 block bg-brand transition-[width] duration-300 ease-out"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            <ol className="relative grid grid-cols-8 gap-3">
              {workflowStages.map((stage, i) => {
                const isActive = i === activeIndex
                const isPassed = i <= scrolled
                return (
                  <li key={stage.index}>
                    <button
                      type="button"
                      onClick={() => setPinned(i)}
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
        <div className="mt-14 border-t border-charcoal/10 pt-12 md:mt-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-2">
              <p className="tech text-brand tabular">Stage {active.index}</p>
            </div>

            <div className="lg:col-span-6">
              <h3 className="text-display-4 font-display text-charcoal">{active.title}</h3>
              <p className="measure mt-5 text-body text-muted">{active.description}</p>
            </div>

            <div className="lg:col-span-3 lg:col-start-10">
              <p className="tech mb-5 text-muted">Deliverables</p>
              <ul className="flex flex-col gap-3">
                {active.outputs.map((output) => (
                  <li key={output} className="flex items-start gap-3 text-small text-charcoal/80">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-px w-4 shrink-0 bg-brand"
                    />
                    {output}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
