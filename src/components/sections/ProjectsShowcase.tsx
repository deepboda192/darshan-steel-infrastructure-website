import Link from '@/components/site/NextLink'
import { featuredProjects } from '@/data/projects'
import { ImageFrame } from '@/components/media/ImageFrame'
import { SectionHeader } from '@/components/site/SectionHeader'
import { Button } from '@/components/site/Button'
import { Arrow } from '@/components/site/Arrow'
import { Reveal } from '@/components/animations/Reveal'
import { cn } from '@/lib/cn'

/**
 * Selected projects.
 *
 * Building type carries the headline rather than a project name: client and
 * project names have not been supplied, and a bracketed placeholder as a
 * headline would read as an unfinished site. The unverified fields — location,
 * year, area — stay visible in the spec row and are flagged for ?audit=1.
 */

// The stagger comes from pushing the tall second tile down. A matching
// negative offset on the fourth tile was removed: with a 56px row gap it
// pulled the fourth image 40px into row one, painting over the second
// project's location/year/area row.
const LAYOUT = [
  { span: 'lg:col-span-8', ratio: '3/2', offset: '' },
  { span: 'lg:col-span-4', ratio: '3/4', offset: 'lg:mt-24' },
  { span: 'lg:col-span-4', ratio: '3/4', offset: '' },
  { span: 'lg:col-span-8', ratio: '3/2', offset: '' },
]

export function ProjectsShowcase() {
  return (
    <section className="bg-white py-24 md:py-32 lg:py-40" aria-label="Selected projects">
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
          className="mb-16 md:mb-20"
        />

        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-12">
          {featuredProjects.map((project, i) => {
            const layout = LAYOUT[i] ?? LAYOUT[0]
            return (
              <article key={project.slug} className={cn(layout.span, layout.offset)}>
                <Link href={`/projects/${project.slug}`} className="group block">
                  <div className="relative overflow-hidden">
                    <ImageFrame
                      image={{
                        src: project.photo,
                        alt: `${project.buildingType} — pre-engineered steel structure by Darshan Steel Infrastructure`,
                        plate: project.plate,
                        label: `PROJECT ${project.index}`,
                      }}
                      tone="light"
                      ratio={layout.ratio}
                      zoom
                      revealDelay={0.05 * (i % 2)}
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />
                  </div>

                  <div className="mt-7 flex items-start justify-between gap-8">
                    <div className="min-w-0">
                      {/* the number stays put while everything else moves */}
                      <p className="tech text-muted tabular">Project {project.index}</p>

                      <h3 className="mt-4 text-display-4 font-display text-charcoal">
                        {project.buildingType}
                      </h3>

                      <span
                        aria-hidden="true"
                        className="mt-5 block h-0.5 w-10 origin-left bg-brand transition-transform duration-[600ms] ease-[var(--ease-expo)] group-hover:scale-x-[3.4]"
                      />

                      <dl
                        className="mt-6 flex flex-wrap gap-x-8 gap-y-3 tech text-muted"
                        data-placeholder={!project.verified}
                      >
                        <div className="flex gap-2.5">
                          <dt className="text-charcoal/40">Loc</dt>
                          <dd>{project.location}</dd>
                        </div>
                        <div className="flex gap-2.5">
                          <dt className="text-charcoal/40">Year</dt>
                          <dd>{project.year}</dd>
                        </div>
                        <div className="flex gap-2.5">
                          <dt className="text-charcoal/40">Area</dt>
                          <dd>{project.area}</dd>
                        </div>
                      </dl>
                    </div>

                    <Arrow
                      size={20}
                      className="mt-1 shrink-0 text-charcoal transition-transform duration-[600ms] ease-[var(--ease-expo)] group-hover:translate-x-2"
                    />
                  </div>
                </Link>
              </article>
            )
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-20 border-t border-charcoal/10 pt-10 lg:hidden">
            <Button href="/projects" arrow>
              View All Projects
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
