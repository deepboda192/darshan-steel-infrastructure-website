import { createFileRoute, notFound } from '@tanstack/react-router'
import { Calendar, ClipboardList, Factory, MapPin, Ruler, User } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { company, shortAddress } from '@/data/company'
import { siteImages } from '@/data/images'
import type { Project } from '@/data/projects'
import { projectsQueryOptions } from '@/lib/projects-query'
import { useMotion } from '@/lib/motion'
import { breadcrumbSchema, JsonLd } from '@/lib/schema'
import { cn } from '@/lib/cn'
import { InnerHero } from '@/components/site/InnerHero'
import { Button } from '@/components/site/Button'
import { ImageFrame } from '@/components/media/ImageFrame'
import { Logo } from '@/components/layout/Logo'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { Gallery } from '@/components/projects/Gallery'

/** The case study, in the order the record tells it. */
const STUDY: { key: keyof Project['study']; title: string }[] = [
  { key: 'overview', title: 'Project overview' },
  { key: 'challenge', title: 'The challenge' },
  { key: 'approach', title: 'Engineering approach' },
  { key: 'execution', title: 'Execution' },
  { key: 'result', title: 'Result' },
]

type DetailRow = { icon: LucideIcon; label: string; value: string }

/** Strips a display number down to something a dialler accepts. */
const dialable = (value: string) => value.replace(/[^+\d]/g, '')

/**
 * Project record — the reference's project page.
 *
 * The inner-page hero, the cover photograph, then two columns: the case study
 * (overview through result, then the gallery) on the left; on the right, a
 * sticky rail with the record's details, the standard specification and the
 * contact card. "More projects" closes the page with the next two records.
 * Everything comes from the record itself and data/company.ts.
 */
function ProjectPage() {
  const projects = Route.useLoaderData()
  const { slug } = Route.useParams()
  // The loader has already thrown notFound() for an unknown slug.
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index] as Project
  useMotion()

  const pending = project.verified ? undefined : 'true'
  const cover = {
    src: project.photo,
    alt: `${project.name} — ${project.buildingType}, ${project.location}`,
    plate: project.plate,
    label: `PLATE ${project.index}`,
  }

  const details: DetailRow[] = [
    { icon: User, label: 'Client', value: project.name },
    { icon: MapPin, label: 'Location', value: project.location },
    { icon: Factory, label: 'Building type', value: project.buildingType },
    { icon: Ruler, label: 'Built-up area', value: project.area },
    ...(project.year ? [{ icon: Calendar, label: 'Year', value: project.year }] : []),
    { icon: ClipboardList, label: 'Scope', value: project.scope.join(' · ') },
  ].filter((row) => row.value.trim().length > 0)

  // The next two records in list order, wrapping round at the end.
  const more =
    projects.length > 1
      ? [1, 2].map((k) => projects[(index + k) % projects.length]).filter((p) => p.slug !== slug)
      : []

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: project.name, path: `/projects/${project.slug}` },
        ])}
      />

      <InnerHero
        tall
        title={project.name}
        image={siteImages.projectHero}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects' }, { label: project.name }]}
      />

      <section className="m-section" aria-label="Project record">
        <div className="m-container">
          {/* ---------------- cover ---------------- */}
          <div
            className="relative overflow-hidden bg-neutral-1 pt-[54%] max-lg:pt-[58%] max-xs:pt-[64%]"
            data-reveal="up"
          >
            <div className="absolute inset-0">
              <ImageFrame image={cover} ratio="fill" priority sizes="(min-width: 1370px) 1310px, 100vw" />
            </div>
          </div>

          <div className="grid grid-cols-[1.72fr_1fr] items-start gap-[75px] pt-16 max-lg:grid-cols-1 max-lg:gap-16">
            {/* ---------------- case study ---------------- */}
            <div data-reveal="up">
              {STUDY.map((section, i) => {
                const body = project.study[section.key]
                return (
                  <div key={section.key}>
                    {i > 0 && <hr className="my-12 border-0 border-b border-black/10" />}
                    <h2 className="m-h4">{section.title}</h2>
                    <p
                      className="mt-4 text-[18px] leading-[1.6] text-neutral-8"
                      data-placeholder={body.includes('[') ? 'true' : undefined}
                    >
                      {body}
                    </p>
                  </div>
                )
              })}

              {project.gallery.length > 0 && (
                <>
                  <hr className="my-12 border-0 border-b border-black/10" />
                  <Gallery images={project.gallery} />
                </>
              )}
            </div>

            {/* ---------------- rail ---------------- */}
            <aside className="flex flex-col gap-5 lg:sticky lg:top-6" data-reveal="up">
              <div className="bg-neutral-1 px-[34px] pb-5 pt-8 max-xs:px-6">
                <h2 className="m-h5">Project details</h2>
                <dl className="mt-6">
                  {details.map((row, i) => {
                    const Icon = row.icon
                    return (
                      <div
                        key={row.label}
                        className={cn(
                          'flex items-center justify-between gap-[18px] py-3.5',
                          i < details.length - 1 && 'border-b border-black/10',
                        )}
                      >
                        <dt className="flex items-center gap-3.5">
                          <span className="m-icon-box h-[42px] w-[42px]">
                            <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                          </span>
                          <span className="font-medium text-neutral-9">{row.label}</span>
                        </dt>
                        <dd className="text-right text-neutral-7" data-placeholder={pending}>
                          {row.value}
                        </dd>
                      </div>
                    )
                  })}
                </dl>
              </div>

              {project.technical.length > 0 && (
                <div className="bg-neutral-1 px-[34px] pb-5 pt-8 max-xs:px-6">
                  <h2 className="m-h5">Specification</h2>
                  <dl className="mt-6">
                    {project.technical.map((row, i) => (
                      <div
                        key={row.label}
                        className={cn(
                          'flex items-start justify-between gap-[18px] py-3.5',
                          i < project.technical.length - 1 && 'border-b border-black/10',
                        )}
                      >
                        <dt className="shrink-0 font-medium text-neutral-9">{row.label}</dt>
                        <dd className="text-right text-neutral-7">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* the reference's contact card */}
              <div className="flex flex-col">
                <div className="flex flex-col items-center gap-7 bg-secondary px-8 py-11 text-center text-white">
                  <Logo variant="mark" tone="dark" height={56} />
                  <div className="flex flex-col gap-2">
                    <p className="m-h5 light">Let&apos;s work together</p>
                    <a
                      href={`tel:${dialable(company.phone.primary.value)}`}
                      className="font-heading text-[26px] font-semibold leading-(--lh-sm) text-neutral-1 transition-colors duration-300 hover:text-accent"
                      data-placeholder={company.phone.primary.placeholder}
                    >
                      {company.phone.primary.value}
                    </a>
                  </div>
                  <div className="flex flex-col gap-1.5 text-neutral-1">
                    <p data-placeholder={company.address.line1.placeholder}>{shortAddress()}</p>
                    <a
                      href={`mailto:${company.email.enquiries.value}`}
                      className="transition-colors duration-300 hover:text-accent"
                      data-placeholder={company.email.enquiries.placeholder}
                    >
                      {company.email.enquiries.value}
                    </a>
                    <p data-placeholder={company.hours.placeholder}>{company.hours.value}</p>
                  </div>
                </div>
                <div className="relative bg-neutral-2 pt-[50%]">
                  <div className="absolute inset-0">
                    <ImageFrame image={siteImages.safety} ratio="fill" sizes="(min-width: 1024px) 30vw, 100vw" />
                  </div>
                </div>
                <Button href="/#contact" arrow={false} className="w-full justify-center">
                  Get in touch
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ---------------- more projects ---------------- */}
      {more.length > 0 && (
        <section className="m-section bg-neutral-1" aria-label="More projects">
          <div className="m-container">
            <div className="flex flex-col gap-20 max-md:gap-12">
              <div
                className="flex items-center justify-between gap-8 max-md:flex-col max-md:items-start"
                data-reveal="up"
              >
                <h2 className="m-h2">More projects</h2>
                <Button href="/projects">All projects</Button>
              </div>
              <ul className="grid grid-cols-2 gap-[30px] max-lg:grid-cols-1" data-reveal="up">
                {more.map((p) => (
                  <li key={p.slug}>
                    <ProjectCard project={p} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export const Route = createFileRoute('/projects/$slug')({
  loader: async ({ context, params }) => {
    const projects = await context.queryClient.ensureQueryData(projectsQueryOptions)
    if (!projects.some((p) => p.slug === params.slug)) throw notFound()
    return projects
  },
  head: ({ params, loaderData }) => {
    const project = (loaderData ?? []).find((p) => p.slug === params.slug)
    const title = project ? `${project.name} | Projects | ${company.name}` : `Projects | ${company.name}`
    const description = project
      ? `${project.buildingType} in ${project.location}${project.area ? ` — ${project.area}` : ''}. ${project.study.overview}`.slice(0, 160)
      : ''
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: `${company.siteUrl}/projects/${params.slug}` },
        ...(project?.photo ? [{ property: 'og:image', content: `${company.siteUrl}${project.photo}` }] : []),
      ],
      links: [{ rel: 'canonical', href: `${company.siteUrl}/projects/${params.slug}` }],
    }
  },
  component: ProjectPage,
})
