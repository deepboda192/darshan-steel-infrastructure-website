import { MapPin } from 'lucide-react'
import type { Project } from '@/data/projects'
import { ImageFrame } from '@/components/media/ImageFrame'
import Link from '@/components/site/NextLink'
import { Button } from '@/components/site/Button'
import { SectionIntro } from '@/components/site/SectionIntro'
import { cn } from '@/lib/cn'

type ProjectsProps = {
  /** Project records, already loaded by the route. */
  projects: Project[]
}

/**
 * Selected projects — the reference's stacked project rows.
 *
 * Four records, each a ruled white row of category, name, the case-study
 * overview and location beside its photograph; rows alternate the image
 * side. On desktop every row is sticky, so as the page scrolls the next
 * record slides up over the last, and the covered row shrinks and fades
 * out with the scroll (`data-stack`, see lib/motion.ts) — the
 * stacking-card effect of the reference. Below 1024px the rows simply
 * flow.
 *
 * Each row links to its record and the section closes with the way to the
 * full index. The records arrive from the route loader (Supabase, with the
 * catalogue list as fallback), so the server and the client render the same
 * data.
 */
export function Projects({ projects }: ProjectsProps) {
  const featured = projects.slice(0, 4)

  return (
    <section id="projects" className="m-section" aria-label="Selected projects">
      <div className="m-container">
        <div className="flex flex-col gap-24 max-xs:gap-[72px]">
          <div data-reveal="up">
            <SectionIntro
              align="center"
              subtitle="Projects"
              title="Built across industries."
              className="max-w-[700px]"
            />
          </div>

          <div className="relative max-lg:flex max-lg:flex-col max-lg:gap-10" data-stack>
            {featured.map((project, i) => {
              const flip = i % 2 === 1
              const pending = project.verified ? undefined : 'true'
              const overview = project.study.overview
              return (
                <div key={project.slug} className="sticky top-[8%] max-lg:static" data-stack-item>
                  <article
                    className={cn(
                      'grid items-start gap-8 border-y border-black/20 bg-white py-[54px] max-lg:grid-cols-1 max-lg:gap-10 max-lg:border-b-0 max-lg:pb-0 max-lg:pt-8',
                      flip ? 'grid-cols-[1.15fr_1fr]' : 'grid-cols-[1fr_1.15fr]',
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-full flex-col items-start justify-between gap-8 pl-10 max-lg:order-1 max-lg:pl-0',
                        flip && 'order-2 pl-0 pr-10 max-lg:pr-0',
                      )}
                    >
                      <div className="flex max-w-[500px] flex-col items-start gap-6 max-lg:max-w-none max-xs:gap-[15px]">
                        <p className="font-heading text-[16px] font-bold uppercase tracking-[0.5px] text-accent max-xs:text-[14px]">
                          {project.buildingType}
                        </p>
                        <h3
                          className="font-heading text-[48px] font-bold leading-(--lh-lg) text-neutral-10 max-md:text-[24px] max-md:leading-(--lh-sm)"
                          data-placeholder={pending}
                        >
                          <Link
                            href={`/projects/${project.slug}`}
                            className="transition-colors duration-300 hover:text-accent"
                          >
                            {project.name}
                          </Link>
                        </h3>
                        <p className="m-paragraph medium" data-placeholder={overview.includes('[') ? 'true' : undefined}>
                          {overview}
                        </p>
                      </div>

                      {(project.location || project.year) && (
                        <div className="flex w-full items-center gap-3.5 border-t border-black/15 pt-6">
                          <MapPin size={18} className="shrink-0 text-accent" aria-hidden="true" />
                          <p className="text-[18px] font-semibold text-neutral-10 max-xs:text-[16px]" data-placeholder={pending}>
                            {[project.location, project.year].filter(Boolean).join(' · ')}
                          </p>
                        </div>
                      )}
                    </div>

                    <div
                      className={cn(
                        'relative h-[500px] bg-neutral-1 max-lg:order-2 max-lg:h-[450px] max-md:h-[350px] max-xs:h-[264px]',
                        flip && 'order-1',
                      )}
                    >
                      <Link
                        href={`/projects/${project.slug}`}
                        className="group absolute inset-0 overflow-hidden"
                        aria-label={`${project.name} — view the project`}
                      >
                        <ImageFrame
                          image={{
                            src: project.photo,
                            alt: `${project.buildingType} — ${project.name}`,
                            plate: project.plate,
                            label: `PLATE ${project.index}`,
                          }}
                          tone="light"
                          ratio="fill"
                          zoom
                          sizes="(min-width: 1024px) 56vw, 100vw"
                        />
                      </Link>
                    </div>
                  </article>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center" data-reveal="up">
            <Button href="/projects">View all projects</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
