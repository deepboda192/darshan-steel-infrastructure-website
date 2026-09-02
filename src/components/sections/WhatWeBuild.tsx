import Link from '@/components/site/NextLink'
import { solutions } from '@/data/solutions'
import { ImageFrame } from '@/components/media/ImageFrame'
import { SectionHeader } from '@/components/site/SectionHeader'
import { Button } from '@/components/site/Button'
import { Arrow } from '@/components/site/Arrow'
import { cn } from '@/lib/cn'

/**
 * What we build.
 *
 * Six building types in one viewport: on desktop the section is exactly a
 * screen tall — a compact header, then a uniform 3×2 grid that flexes to fill
 * the remaining height, each tile's photograph stretched to its cell with
 * `ratio="fill"`. The earlier editorial spread of unequal spans ran to three
 * viewports; the uniform plate trades that variety for a section a visitor
 * takes in whole. Below lg the tiles fall back to fixed 16/10 ratios and the
 * section scrolls naturally — six stacked cells can never fit a phone screen.
 * The index number stays fixed while the image zooms and the blue rule opens
 * on hover.
 */

export function WhatWeBuild() {
  return (
    <section
      className="flex flex-col bg-offwhite py-16 md:py-20 lg:h-screen lg:min-h-[800px] lg:py-12"
      aria-label="What we build"
    >
      <div className="container-site flex w-full flex-1 flex-col lg:min-h-0">
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
          className="mb-10 md:mb-12 lg:mb-8"
        />

        {/*
          One column on phones, two on tablets, three-by-two on desktop.
          `flex-1` + `min-h-0` make the grid the section's remaining height at
          lg, and the row tracks split it evenly — the cells own their heights,
          so the tiles drop their aspect ratio (`lg:aspect-auto`) and let the
          fill-mode ImageFrame stretch to the cell.
        */}
        <div className="grid gap-5 sm:grid-cols-2 lg:min-h-0 lg:flex-1 lg:grid-cols-3 lg:grid-rows-2">
          {solutions.map((solution, i) => {
            return (
              <Link
                key={solution.slug}
                href={`/peb-solutions#${solution.slug}`}
                className={cn('group relative block overflow-hidden', 'aspect-[16/10] lg:aspect-auto')}
                aria-label={`${solution.title} — ${solution.short}`}
              >
                <ImageFrame
                  image={solution.image}
                  tone="dark"
                  ratio="fill"
                  scrim={72}
                  grain
                  zoom
                  revealDelay={0.05 * (i % 3)}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  showLabel={false}
                />

                {/* content sits over the image */}
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 md:p-7 lg:p-6">
                  <span className="tech text-white/55 tabular">{solution.index}</span>

                  <div>
                    {/* blue rule opens on hover */}
                    <span
                      aria-hidden="true"
                      className="mb-4 block h-0.5 w-10 origin-left bg-brand transition-transform duration-[600ms] ease-[var(--ease-expo)] group-hover:scale-x-[3.2]"
                    />
                    <div className="flex items-end justify-between gap-6">
                      <div>
                        <h3 className="font-display wdth-wide text-display-4 text-white transition-transform duration-[600ms] ease-[var(--ease-expo)] group-hover:-translate-y-0.5">
                          {solution.title}
                        </h3>
                        <p className="measure mt-2 text-small text-white/70">{solution.short}</p>
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
