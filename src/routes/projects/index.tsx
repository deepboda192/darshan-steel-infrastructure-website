import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { projectsQueryOptions } from '@/lib/projects-query'
import Link from '@/components/site/NextLink'

import { company } from '@/data/company'
import { siteImages, type SiteImage } from '@/data/images'
import { type Project } from '@/data/projects'

import { PageHero } from '@/components/layout/PageHero'
import { CTASection } from '@/components/sections/CTASection'
import { ImageFrame } from '@/components/media/ImageFrame'
import { Reveal } from '@/components/animations/Reveal'
import { Arrow } from '@/components/site/Arrow'
import { Container } from '@/components/site/Container'
import { Section } from '@/components/site/Section'
import { SectionHeader } from '@/components/site/SectionHeader'
import { TechLabel } from '@/components/site/TechLabel'
import { breadcrumbSchema, JsonLd } from '@/lib/schema'
import { cn } from '@/lib/cn'

/* -------------------------------------------------------------------------- */
/* Derived from the data layer — no counts or claims are written by hand.      */
/* -------------------------------------------------------------------------- */

const pad = (n: number) => String(n).padStart(2, '0')

/** The delivery scope carried on every record, in order. */
const scopeStagesOf = (list: Project[]) => Array.from(new Set(list.flatMap((p) => p.scope)))

const buildingTypeCountOf = (list: Project[]) => new Set(list.map((p) => p.buildingType)).size

/** Each record's own cover photograph. See `photo` in data/projects.ts. */
function coverImage(project: Project): SiteImage {
  return {
    src: project.photo,
    alt: `${project.buildingType} — erected steel structure`,
    plate: project.plate,
    label: `PLATE ${project.index}`,
  }
}

/* -------------------------------------------------------------------------- */
/* Grid rhythm                                                                 */
/* -------------------------------------------------------------------------- */

type CardLayout = {
  /** Column span on the 12-column desktop grid. */
  span: string
  /** Vertical offset that breaks the row line. */
  shift?: string
  /** Frame proportion — portrait for narrow cards, landscape for wide ones. */
  aspect: string
  sizes: string
  /** Wide cards get a larger title and a horizontal meta row. */
  feature?: boolean
}

/**
 * Six records, six positions. The pattern alternates wide/narrow, drops every
 * second card half a column height, opens out to a full-bleed record, then
 * closes indented from the left. Repeats if DSI adds more projects.
 */
const LAYOUT: CardLayout[] = [
  {
    span: 'lg:col-span-7',
    aspect: 'aspect-[4/3] lg:aspect-[3/2]',
    sizes: '(min-width: 1024px) 56vw, (min-width: 640px) 92vw, 100vw',
  },
  {
    span: 'lg:col-span-5',
    shift: 'lg:mt-28',
    aspect: 'aspect-[4/3] lg:aspect-[4/5]',
    sizes: '(min-width: 1024px) 40vw, (min-width: 640px) 92vw, 100vw',
  },
  {
    span: 'lg:col-span-5',
    aspect: 'aspect-[4/3] lg:aspect-[4/5]',
    sizes: '(min-width: 1024px) 40vw, (min-width: 640px) 92vw, 100vw',
  },
  {
    span: 'lg:col-span-7',
    shift: 'lg:mt-28',
    aspect: 'aspect-[4/3] lg:aspect-[3/2]',
    sizes: '(min-width: 1024px) 56vw, (min-width: 640px) 92vw, 100vw',
  },
  {
    span: 'lg:col-span-12',
    aspect: 'aspect-[4/3] lg:aspect-[16/7]',
    sizes: '(min-width: 1024px) 88vw, 100vw',
    feature: true,
  },
  {
    span: 'lg:col-span-8 lg:col-start-5',
    aspect: 'aspect-[4/3] lg:aspect-[16/9]',
    sizes: '(min-width: 1024px) 64vw, (min-width: 640px) 92vw, 100vw',
  },
]

/* -------------------------------------------------------------------------- */
/* What a record contains — mirrors the case-study structure in data/projects  */
/* -------------------------------------------------------------------------- */

const RECORD_ANATOMY = [
  {
    index: '01',
    title: 'The brief',
    description:
      'What the building has to hold, house or move, and the site it has to stand on.',
  },
  {
    index: '02',
    title: 'The constraint',
    description:
      'The condition that governs the frame — crane duty, rack geometry, operating temperature, a fixed footprint.',
  },
  {
    index: '03',
    title: 'The approach',
    description:
      'How the structure answers it: frame type, span arrangement, connection detailing and coating specification.',
  },
  {
    index: '04',
    title: 'The execution',
    description:
      'Fabrication sequence, inspection hold points, dispatch order and the lift plan followed on site.',
  },
  {
    index: '05',
    title: 'The result',
    description:
      'What was handed over, and how the finished structure measured against what it was designed to do.',
  },
]

const RELATED = [
  {
    label: 'PEB Solutions',
    href: '/peb-solutions',
    description: 'The six building types we engineer, fabricate and erect.',
  },
  {
    label: 'Industries Served',
    href: '/industries',
    description: 'Sectors and the structural drivers behind each of them.',
  },
]

/* ========================================================================== */

function ProjectsPage() {
  const { data: projects } = useSuspenseQuery(projectsQueryOptions)
  const scopeStages = scopeStagesOf(projects)
  const buildingTypeCount = buildingTypeCountOf(projects)

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
        ])}
      />

      <PageHero
        index="04"
        eyebrow="Projects"
        title={<>Built across industries.</>}
        image={siteImages.pageBanners.projects}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Projects' }]}
        lead={
          <p>
            {buildingTypeCount} building types, one delivery chain. Each record sets out what
            the structure had to do, what governed its design, and how it was fabricated and
            erected.
          </p>
        }
        aside={
          <dl className="grid grid-cols-2 gap-x-8 gap-y-8 border-t border-white/15 pt-8">
            {/* Counts what this page currently publishes, not how much DSI has
                built — the record set is still provisional, so it is flagged. */}
            <div data-placeholder="true">
              <dt className="tech text-white/55">Records published</dt>
              <dd className="tabular mt-3 font-display text-display-4 text-white">
                {pad(projects.length)}
              </dd>
            </div>
            <div>
              <dt className="tech text-white/55">Building types</dt>
              <dd className="tabular mt-3 font-display text-display-4 text-white">
                {pad(buildingTypeCount)}
              </dd>
            </div>
            <div className="col-span-2 border-t border-white/15 pt-7">
              <dt className="tech text-white/55">Scope on every record</dt>
              <dd className="mt-3.5 text-small text-white/75">{scopeStages.join(' → ')}</dd>
            </div>
          </dl>
        }
      />

      {/* ==================================================== RECORD INDEX == */}
      <Section tone="white" space="md" ariaLabel="Project records">
        <Container>
          <h2 className="sr-only">Project records</h2>

          <div className="grid gap-10 border-t border-charcoal/15 pt-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <TechLabel rule className="mb-7">
                Record index
              </TechLabel>
              <p className="measure text-lead text-charcoal">
                Work is listed by building type rather than by client. The structural problem is
                what carries across from one project to the next.
              </p>
            </div>

            <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
              {/* One honest note for the whole list — not repeated per card. */}
              <p
                className="tech flex items-start gap-3 text-muted"
                data-placeholder="true"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.4em] h-px w-8 shrink-0 bg-charcoal/25"
                />
                <span className="leading-[1.7]">
                  Project records are being finalised. Names, dates and figures shown below are
                  placeholders.
                </span>
              </p>
            </div>
          </div>

          <ul className="mt-16 grid grid-cols-1 items-start gap-x-8 gap-y-20 md:mt-20 lg:grid-cols-12 lg:gap-y-24">
            {projects.map((project, i) => {
              const layout = LAYOUT[i % LAYOUT.length]
              const flag = project.verified ? undefined : 'true'
              const specs: { label: string; value: string; className: string }[] = [
                { label: 'Location', value: project.location, className: '' },
                { label: 'Year', value: project.year, className: '' },
                // The area string is long — it takes the full width on mobile.
                {
                  label: 'Built-up area',
                  value: project.area,
                  className: 'col-span-2 sm:col-span-1',
                },
              ]

              return (
                <Reveal
                  as="li"
                  key={project.slug}
                  delay={i % 2 === 1 ? 0.08 : 0}
                  className={cn(layout.span, layout.shift)}
                >
                  <article>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group block focus-visible:outline-offset-8"
                    >
                      {/* --- record head: the number never moves ---------- */}
                      <div className="flex items-start justify-between gap-6 border-t border-charcoal/20 pt-6">
                        <span className="tabular font-display text-display-4 leading-none text-charcoal/45">
                          {project.index}
                        </span>
                        <span className="tech mt-1.5 max-w-[62%] text-right leading-[1.7] text-brand">
                          {project.buildingType}
                        </span>
                      </div>

                      {/* --- image ---------------------------------------- */}
                      <div className={cn('relative mt-7 overflow-hidden', layout.aspect)}>
                        <ImageFrame
                          image={coverImage(project)}
                          tone="light"
                          ratio="fill"
                          zoom
                          reveal
                          revealDelay={0.05}
                          sizes={layout.sizes}
                          showLabel
                        />
                      </div>

                      {/* --- title ---------------------------------------- */}
                      <h3
                        className={cn(
                          'mt-8 font-display wdth-wide uppercase text-charcoal',
                          layout.feature ? 'text-display-3' : 'text-display-4',
                        )}
                        data-placeholder={flag}
                      >
                        {project.name}
                      </h3>

                      {/* --- the rule that opens on hover ----------------- */}
                      <div aria-hidden="true" className="relative mt-6 h-px bg-charcoal/12">
                        <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-brand transition-transform duration-[700ms] ease-[var(--ease-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                      </div>

                      {/* --- spec row ------------------------------------- */}
                      <div
                        className={cn(
                          'mt-7',
                          layout.feature &&
                            'lg:flex lg:items-end lg:justify-between lg:gap-16',
                        )}
                      >
                        <dl
                          className={cn(
                            'grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-3',
                            layout.feature && 'lg:flex lg:gap-x-20',
                          )}
                        >
                          {specs.map((spec) => (
                            <div key={spec.label} className={spec.className}>
                              <dt className="tech text-muted">{spec.label}</dt>
                              <dd
                                className="tabular mt-3 text-small text-charcoal"
                                data-placeholder={flag}
                              >
                                {spec.value}
                              </dd>
                            </div>
                          ))}
                        </dl>

                        <p
                          className={cn(
                            'mt-8 flex items-center gap-3 tech text-charcoal/70 transition-colors duration-300 group-hover:text-brand',
                            layout.feature && 'lg:mt-0 lg:shrink-0',
                          )}
                        >
                          <span>View record</span>
                          <Arrow
                            angle={-45}
                            className="transition-transform duration-[400ms] ease-[var(--ease-expo)] group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1"
                          />
                        </p>
                      </div>
                    </Link>
                  </article>
                </Reveal>
              )
            })}
          </ul>
        </Container>
      </Section>

      {/* ================================================ RECORD STRUCTURE == */}
      <Section tone="charcoal" space="md" ariaLabel="How each record is structured">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader
                eyebrow="Record structure"
                tone="light"
                size="md"
                title={
                  <>
                    Every record answers
                    {' '}<br />
                    the same questions.
                  </>
                }
                lead="A case study is only useful if it explains the decision, not the outcome. Each entry is written the way an engineer would hand the job over."
              />
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <dl className="divide-y divide-white/10 border-y border-white/10">
                {RECORD_ANATOMY.map((item, i) => (
                  <Reveal
                    key={item.index}
                    delay={0.06 * i}
                    className="grid gap-4 py-8 sm:grid-cols-12 sm:gap-8"
                  >
                    <dt className="sm:col-span-4">
                      <span className="tabular tech mr-3 text-white/55">{item.index}</span>
                      <span className="font-display text-display-4 text-white">{item.title}</span>
                    </dt>
                    <dd className="text-small text-white/60 sm:col-span-8">
                      {item.description}
                    </dd>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>

          <Reveal delay={0.18}>
            <div className="mt-16 border-t border-white/15 pt-7">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-4 tech text-white/60 sm:gap-x-8">
                {scopeStages.map((stage, i) => (
                  <li key={stage} className="flex items-center gap-5 sm:gap-8">
                    {i > 0 && <Arrow size={13} className="text-brand" />}
                    <span className={i === 0 ? 'text-white' : undefined}>{stage}</span>
                  </li>
                ))}
                <li className="ml-auto hidden items-center gap-3 text-white/55 lg:flex">
                  <span aria-hidden="true" className="h-px w-10 bg-white/25" />
                  One team, drawing to handover
                </li>
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ========================================================= RELATED == */}
      <Section tone="offwhite" space="sm" ariaLabel="Related pages">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader
                eyebrow="Where to next"
                size="md"
                title={
                  <>
                    Start from the
                    {' '}<br />
                    building type.
                  </>
                }
              />
            </div>

            <nav aria-label="Related pages" className="lg:col-span-6 lg:col-start-7">
              <ul className="border-t border-charcoal/15">
                {RELATED.map((item, i) => (
                  <Reveal
                    as="li"
                    key={item.href}
                    delay={0.06 * i}
                    className="border-b border-charcoal/15"
                  >
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between gap-8 py-8"
                    >
                      <span>
                        <span className="block font-display wdth-wide text-display-4 uppercase text-charcoal transition-colors duration-300 group-hover:text-brand">
                          {item.label}
                        </span>
                        <span className="mt-3 block text-small text-muted">
                          {item.description}
                        </span>
                      </span>
                      <Arrow
                        angle={-45}
                        className="shrink-0 text-charcoal/40 transition-transform duration-[400ms] ease-[var(--ease-expo)] group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </Section>

      <CTASection
        title={
          <>
            Have a building
            {' '}<br />
            in mind?
          </>
        }
        lead="Send us the span, the eave height and what goes inside. We will come back with a structural approach."
      />
    </>
  )
}

export const Route = createFileRoute('/projects/')({
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQueryOptions),
  head: () => ({
    meta: [
      { title: "Projects | DSI" },
      { name: 'description', content: "Selected work from Darshan Steel Infrastructure \u2014 pre-engineered buildings, industrial sheds, warehouses, cold storage, crane-served factories and commercial steel structures, engineered and erected by one team." },
      { property: 'og:title', content: "Projects | DSI" },
      { property: 'og:description', content: "Selected work from Darshan Steel Infrastructure \u2014 pre-engineered buildings, industrial sheds, warehouses, cold storage, crane-served factories and commercial steel structures, engineered and erected by one team." },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: 'https://darshansteel.in/projects' }],
  }),
  component: ProjectsPage,
})
