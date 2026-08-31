import { createFileRoute, notFound } from '@tanstack/react-router'
import Link from '@/components/site/NextLink'

import { company } from '@/data/company'
import type { SiteImage } from '@/data/images'
import { projects, projectBySlug } from '@/data/projects'

import { PageHero } from '@/components/layout/PageHero'
import { CTASection } from '@/components/sections/CTASection'
import { ImageFrame } from '@/components/media/ImageFrame'
import { Reveal } from '@/components/animations/Reveal'
import { Arrow } from '@/components/site/Arrow'
import { Button } from '@/components/site/Button'
import { Container } from '@/components/site/Container'
import { Section } from '@/components/site/Section'
import { SectionHeader } from '@/components/site/SectionHeader'
import { TechLabel } from '@/components/site/TechLabel'
import { breadcrumbSchema, JsonLd } from '@/lib/schema'
import { cn } from '@/lib/cn'

/* -------------------------------------------------------------------------- */
/* Placeholder handling                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Every unconfirmed value in data/projects.ts is written in [SQUARE BRACKETS].
 * These two helpers are the only place this page decides what is real: values
 * containing a bracket are flagged with `data-placeholder` so `?audit=1`
 * outlines them, and are stripped out of metadata so no invented fact is ever
 * published to a search engine.
 */
const isPending = (value: string) => value.includes('[')

const pendingAttr = (value: string) => (isPending(value) ? 'true' : undefined)

/** Removes bracketed placeholders from a sentence, leaving clean prose. */
const stripPending = (value: string) =>
  value
    .replace(/\[[^\]]*\]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

/**
 * Renders case-study prose, marking any bracketed run so it is visible in
 * audit mode and typographically distinct from confirmed copy.
 */
function Prose({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\[[^\]]*\])/g).filter(Boolean)

  return (
    <p className={className}>
      {parts.map((part, i) =>
        part.startsWith('[') ? (
          <span key={i} data-placeholder="true" className="text-charcoal/55">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </p>
  )
}

/* -------------------------------------------------------------------------- */
/* Layout tables                                                               */
/* -------------------------------------------------------------------------- */

/** Gallery rhythm — 7/5 then 5/7, so no two rows read the same. */
const GALLERY_LAYOUT = [
  { span: 'lg:col-span-7', ratio: '3/2', sizes: '(min-width: 1024px) 56vw, 100vw' },
  { span: 'lg:col-span-5', ratio: '4/5', sizes: '(min-width: 1024px) 40vw, 100vw' },
  { span: 'lg:col-span-5', ratio: '4/5', sizes: '(min-width: 1024px) 40vw, 100vw' },
  { span: 'lg:col-span-7', ratio: '3/2', sizes: '(min-width: 1024px) 56vw, 100vw' },
] as const

/* -------------------------------------------------------------------------- */
/* Route                                                                       */
/* -------------------------------------------------------------------------- */

function ProjectDetailPage() {
  const { slug } = Route.useParams()
  const project = projectBySlug(slug)

  if (!project) throw notFound()

  const position = projects.findIndex((p) => p.slug === project.slug)
  const nextProject = projects[(position + 1) % projects.length]

  /* The hero plate is built from the project's own scene so each record opens
     on the structure type it describes. */
  const heroImage: SiteImage = {
    src: project.photo,
    alt: `${project.buildingType} — pre-engineered steel structure delivered by ${company.name}`,
    plate: project.plate,
    label: `FIG. ${project.index} — PROJECT RECORD`,
  }

  const facts = [
    { label: 'Building type', value: project.buildingType },
    { label: 'Location', value: project.location },
    { label: 'Year', value: project.year },
    { label: 'Built-up area', value: project.area },
  ]

  const chapters = [
    { index: '01', id: 'overview', title: 'Overview', body: project.study.overview },
    { index: '02', id: 'challenge', title: 'Challenge', body: project.study.challenge },
    {
      index: '03',
      id: 'engineering-approach',
      title: 'Engineering Approach',
      body: project.study.approach,
    },
    { index: '04', id: 'execution', title: 'Execution', body: project.study.execution },
    { index: '05', id: 'result', title: 'Result', body: project.study.result },
  ]

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          // Unverified names are not emitted — the category is real data.
          { name: project.verified ? project.name : project.buildingType, path: `/projects/${project.slug}` },
        ])}
      />

      {/* ==================================================== 00 — PROJECT HERO */}
      <PageHero
        index={project.index}
        eyebrow={project.buildingType}
        title={<span data-placeholder={pendingAttr(project.name)}>{project.name}</span>}
        lead={`The engineering record for a ${project.buildingType.toLowerCase()}: what the structure had to carry, how the frame was resolved, and how it reached site.`}
        image={heroImage}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
          { label: project.name, placeholder: !project.verified },
        ]}
        aside={
          <div>
            <p className="tech mb-6 text-white/55">Key facts</p>

            <dl className="divide-y divide-white/10 border-y border-white/15">
              {facts.map((fact) => (
                <div key={fact.label} className="flex items-baseline justify-between gap-6 py-5">
                  <dt className="tech shrink-0 text-white/55">{fact.label}</dt>
                  <dd
                    className="tabular text-right text-small text-white/85"
                    data-placeholder={pendingAttr(fact.value)}
                  >
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            {!project.verified && (
              <p className="tech mt-6 text-white/55" data-placeholder="true">
                [PROJECT RECORD AWAITING CONFIRMATION BY DSI]
              </p>
            )}
          </div>
        }
      />

      {/* ========================================================= SCOPE OF WORK */}
      <Section tone="offwhite" space="none" ariaLabel="Scope of work">
        <Container>
          <div className="grid gap-10 py-14 md:py-16 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-3">
              <Reveal>
                <TechLabel rule>Scope of work</TechLabel>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="mt-5 text-small text-muted">
                  Single-point responsibility from drawing to handover.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.12} className="lg:col-span-9">
              <ol className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                {project.scope.map((item, i) => (
                  <li key={item} className="border-t border-charcoal/15 pt-5">
                    <span className="tech tabular text-brand">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="tech-lg mt-4 text-charcoal">{item}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* =========================================================== CASE STUDY */}
      <Section tone="white" space="lg" ariaLabel="Case study">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* -------- sticky index -------- */}
            <div className="lg:col-span-3">
              <nav aria-label="Case study contents" className="lg:sticky lg:top-32">
                <Reveal>
                  <TechLabel rule className="mb-8">
                    Case study
                  </TechLabel>
                </Reveal>

                <Reveal delay={0.06}>
                  <ol className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-y-5">
                    {chapters.map((chapter) => (
                      <li key={chapter.id}>
                        <a
                          href={`#${chapter.id}`}
                          className="group flex items-baseline gap-3 tech text-muted transition-colors hover:text-charcoal"
                        >
                          <span className="tabular text-charcoal/35 transition-colors group-hover:text-brand">
                            {chapter.index}
                          </span>
                          <span>{chapter.title}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="mt-10 hidden border-t border-charcoal/12 pt-6 lg:block">
                    <p className="tech text-muted">Delivered by</p>
                    <p className="mt-3 text-small text-charcoal">{company.name}</p>
                  </div>
                </Reveal>
              </nav>
            </div>

            {/* -------- body -------- */}
            <div className="lg:col-span-8 lg:col-start-5">
              {chapters.map((chapter, i) => (
                <article
                  key={chapter.id}
                  id={chapter.id}
                  className={cn(
                    'scroll-mt-32',
                    i > 0 && 'mt-14 border-t border-charcoal/12 pt-14 md:mt-20 md:pt-20',
                  )}
                >
                  <Reveal>
                    <p className="tech tabular mb-6 text-brand">{chapter.index}</p>
                  </Reveal>

                  <Reveal delay={0.05}>
                    <h2 className="font-display wdth-wide text-display-4 uppercase text-charcoal">
                      {chapter.title}
                    </h2>
                  </Reveal>

                  <Reveal delay={0.1}>
                    <div
                      className={cn(
                        'measure mt-6 text-lead text-muted',
                        chapter.id === 'result' && 'border-l-2 border-brand pl-6 md:pl-8',
                      )}
                    >
                      <Prose text={chapter.body} />
                    </div>
                  </Reveal>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ============================================================== GALLERY */}
      <Section tone="charcoal" space="md" ariaLabel="Project gallery">
        <Container>
          <SectionHeader
            eyebrow="Gallery"
            tone="light"
            title={
              <>
                On the drawing,
                {' '}<br />
                in the shop, on site.
              </>
            }
            aside={
              <p className="tech max-w-[24ch] text-white/55" data-placeholder="true">
                [PROJECT PHOTOGRAPHY TO BE SUPPLIED BY DSI]
              </p>
            }
          />

          <div className="mt-14 grid grid-cols-1 items-start gap-x-8 gap-y-12 md:gap-y-16 lg:grid-cols-12">
            {project.gallery.map((plate, i) => {
              const layout = GALLERY_LAYOUT[i % GALLERY_LAYOUT.length]

              return (
                <figure key={plate.label} className={cn('group', layout.span)}>
                  <ImageFrame
                    image={plate}
                    tone="dark"
                    ratio={layout.ratio}
                    sizes={layout.sizes}
                    revealDelay={i % 2 === 0 ? 0 : 0.08}
                    showLabel={false}
                    captioned
                    zoom
                    grain
                  />
                  <figcaption className="mt-5 flex items-baseline gap-4 border-t border-white/12 pt-4">
                    <span className="tech tabular shrink-0 text-brand">{plate.label}</span>
                    <span className="text-small text-white/55">{plate.alt}</span>
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* ==================================================== TECHNICAL DETAILS */}
      <Section tone="offwhite" space="md" ariaLabel="Technical details">
        <Container>
          <SectionHeader
            eyebrow="Technical details"
            title={
              <>
                Frame geometry
                {' '}<br />
                and principal quantities.
              </>
            }
            lead="The parameters that governed the structure — span, height, grid and the loads the frame was sized against."
            size="md"
            aside={
              <Button href="/contact" variant="secondary" size="md" arrow>
                Discuss a similar structure
              </Button>
            }
          />

          <Reveal delay={0.1}>
            <dl className="mt-14 grid grid-cols-1 border-t border-charcoal/15 md:grid-cols-2 md:gap-x-16">
              {project.technical.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-8 border-b border-charcoal/12 py-6"
                >
                  <dt className="tech shrink-0 text-muted">{row.label}</dt>
                  <dd
                    className="tabular text-right text-body text-charcoal"
                    data-placeholder={pendingAttr(row.value)}
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="tech mt-8 text-muted" data-placeholder="true">
              [BRACKETED VALUES TO BE CONFIRMED BY DSI BEFORE PUBLICATION]
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ========================================================= NEXT PROJECT */}
      <Section tone="white" space="sm" ariaLabel="Next project">
        <Container>
          <div className="flex flex-col gap-10 border-t border-charcoal/15 pt-10 md:flex-row md:items-end md:justify-between md:gap-16">
            <Reveal className="min-w-0">
              <Link href={`/projects/${nextProject.slug}`} className="group block">
                <TechLabel rule className="mb-6">
                  Next project
                </TechLabel>

                <h2 className="font-display wdth-wide text-display-3 uppercase text-charcoal">
                  <span
                    className="rule-grow inline-block"
                    data-placeholder={pendingAttr(nextProject.name)}
                  >
                    {nextProject.name}
                  </span>
                </h2>

                <p className="mt-6 flex items-center gap-4 tech text-muted">
                  <span>{nextProject.buildingType}</span>
                  <Arrow
                    size={14}
                    className="text-brand transition-transform duration-[400ms] ease-[var(--ease-expo)] group-hover:translate-x-1.5"
                  />
                </p>
              </Link>
            </Reveal>

            <Reveal delay={0.08} className="shrink-0">
              <Button href="/projects" variant="secondary" size="md">
                All Projects
              </Button>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CTASection
        title={
          <>
            Building something
            {' '}<br />
            like this?
          </>
        }
        lead="Send us the use case, the site and the programme. We will come back with a structural approach and a scope."
        primaryLabel="Request a Quotation"
      />
    </>
  )
}

export const Route = createFileRoute('/projects/$slug')({
  head: ({ params }) => {
    const project = projectBySlug(params.slug)
    const title = project
      ? `${project.buildingType} — Project ${project.index} | ${company.shortName}`
      : `Project Not Found | ${company.shortName}`
    const description = project
      ? (project.verified
          ? `${stripPending(project.study.overview)} Pre-engineered steel structure designed, fabricated and erected by ${company.name}.`
          : `Pre-engineered steel ${project.buildingType.toLowerCase()} — design, fabrication, supply and erection by ${company.name}.`)
      : 'This project record is not available.'

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'article' },
        { name: 'twitter:card', content: 'summary_large_image' },
        ...(project?.verified ? [] : [{ name: 'robots', content: 'noindex, follow' }]),
      ],
      links: [{ rel: 'canonical', href: `https://darshansteel.in/projects/${params.slug}` }],
    }
  },
  component: ProjectDetailPage,
})
