import Link from 'next/link'
import { solutions } from '@/data/solutions'
import { ImageFrame } from '@/components/media/ImageFrame'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { Arrow } from '@/components/ui/Arrow'
import { cn } from '@/lib/cn'

/**
 * What we build.
 *
 * Six building types on a 12-column grid with deliberately unequal spans, so
 * the block reads as an editorial spread rather than a card grid. The index
 * number stays fixed while the image zooms and the blue rule opens on hover.
 */

// span, aspect ratio — varied on purpose to break the grid rhythm
const LAYOUT = [
  { span: 'lg:col-span-7', ratio: '16/10' },
  { span: 'lg:col-span-5', ratio: '4/5' },
  { span: 'lg:col-span-5', ratio: '4/5' },
  { span: 'lg:col-span-7', ratio: '16/10' },
  { span: 'lg:col-span-6', ratio: '3/2' },
  { span: 'lg:col-span-6', ratio: '3/2' },
]

export function WhatWeBuild() {
  return (
    <section className="bg-offwhite py-24 md:py-32 lg:py-40" aria-label="What we build">
      <div className="container-site">
        <SectionHeader
          index="02"
          eyebrow="What we build"
          title={
            <>
              Steel structures built
              {' '}<br />
              around your business.
            </>
          }
          lead="Every building starts from what happens inside it — the process, the material flow, the equipment. The structure follows."
          aside={
            <Button href="/peb-solutions" variant="secondary" arrow>
              All Solutions
            </Button>
          }
          className="mb-16 md:mb-20"
        />

        {/*
          One column on phones, two on tablets, then the 12-col editorial grid.
          `items-start` is load-bearing: rows mix 16/10 and 4/5 tiles, and the
          default `stretch` would make the shorter tile's <a> as tall as its
          partner while the image kept its own ratio — dropping the white
          caption, which is absolutely positioned to the <a>, off the bottom of
          the picture and onto the off-white background, where it is invisible.
        */}
        <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {solutions.map((solution, i) => {
            const layout = LAYOUT[i] ?? LAYOUT[0]
            return (
              <Link
                key={solution.slug}
                href={`/peb-solutions#${solution.slug}`}
                className={cn('group relative block overflow-hidden', layout.span)}
                aria-label={`${solution.title} — ${solution.short}`}
              >
                <ImageFrame
                  image={solution.image}
                  tone="dark"
                  ratio={layout.ratio}
                  scrim={72}
                  grain
                  zoom
                  revealDelay={0.05 * (i % 2)}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  showLabel={false}
                />

                {/* content sits over the image */}
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-7 md:p-9">
                  <span className="tech text-white/55 tabular">{solution.index}</span>

                  <div>
                    {/* blue rule opens on hover */}
                    <span
                      aria-hidden="true"
                      className="mb-6 block h-0.5 w-10 origin-left bg-brand transition-transform duration-[600ms] ease-[var(--ease-expo)] group-hover:scale-x-[3.2]"
                    />
                    <div className="flex items-end justify-between gap-6">
                      <div>
                        <h3 className="font-display wdth-wide text-display-4 text-white transition-transform duration-[600ms] ease-[var(--ease-expo)] group-hover:-translate-y-0.5">
                          {solution.title}
                        </h3>
                        <p className="measure mt-3 text-small text-white/70">{solution.short}</p>
                      </div>
                      <Arrow
                        size={20}
                        className="mb-1 shrink-0 text-white transition-transform duration-[600ms] ease-[var(--ease-expo)] group-hover:translate-x-2"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
