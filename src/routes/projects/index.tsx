import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { company } from '@/data/company'
import { siteImages } from '@/data/images'
import { projectsQueryOptions } from '@/lib/projects-query'
import { useMotion } from '@/lib/motion'
import { breadcrumbSchema, JsonLd } from '@/lib/schema'
import { InnerHero } from '@/components/site/InnerHero'
import { SectionIntro } from '@/components/site/SectionIntro'
import { ProjectCard } from '@/components/projects/ProjectCard'

const TITLE = `Projects | ${company.name}`
const DESCRIPTION =
  'Every project on record at Darshan Steel Infrastructure — factories, warehouses, industrial sheds and commercial buildings, listed by building type.'

/** Value of the filter that shows every record. */
const ALL = 'all'

/**
 * Projects index — the reference's projects page.
 *
 * The inner-page hero, then the record list: an intro, a row of filter chips
 * (one per building type on record, plus All) and the cards two across. The
 * filter is client-side; the server renders the full list, so the page is
 * complete without JavaScript and nothing shifts on hydration.
 */
function ProjectsPage() {
  const projects = Route.useLoaderData()
  useMotion()

  const [type, setType] = useState(ALL)
  const types = useMemo(() => Array.from(new Set(projects.map((p) => p.buildingType))), [projects])
  const shown = type === ALL ? projects : projects.filter((p) => p.buildingType === type)

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
        ])}
      />

      <InnerHero
        title="Projects"
        image={siteImages.projectsHero}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Projects' }]}
      />

      <section className="m-section" aria-label="All projects">
        <div className="m-container">
          <div className="flex flex-col gap-20 max-md:gap-16">
            <div className="flex max-w-[650px] flex-col gap-6" data-reveal="up">
              <SectionIntro subtitle="Project records" title="Built across industries." />
              <p className="m-paragraph">
                Work is listed by building type rather than by client. The structural problem is
                what carries across from one project to the next.
              </p>
            </div>

            <div className="flex flex-col gap-16 max-md:gap-12">
              {/* ---------------- filter ----------------
                  On phones the chips stay on one line and scroll sideways,
                  bleeding to the screen edges, instead of stacking. */}
              <div
                role="group"
                aria-label="Filter by building type"
                className="flex flex-wrap gap-2.5 max-md:-mx-(--container-pad) max-md:flex-nowrap max-md:overflow-x-auto max-md:px-(--container-pad) max-md:pb-1 max-md:[scrollbar-width:none]"
                data-reveal="up"
              >
                <button
                  type="button"
                  className="m-chip"
                  aria-pressed={type === ALL}
                  onClick={() => setType(ALL)}
                >
                  All
                </button>
                {types.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="m-chip"
                    aria-pressed={type === t}
                    onClick={() => setType(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* ---------------- records ----------------
                  The entrance runs on the list, not the cards: cards come and
                  go with the filter, and a card mounted after the motion armed
                  would otherwise stay hidden. */}
              <ul className="grid grid-cols-2 gap-[30px] max-lg:grid-cols-1" data-reveal="up">
                {shown.map((project, i) => (
                  <li key={project.slug}>
                    <ProjectCard project={project} priority={i < 2} />
                  </li>
                ))}
              </ul>
              {shown.length === 0 && (
                <p className="m-paragraph medium">No projects on record for this building type yet.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const Route = createFileRoute('/projects/')({
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQueryOptions),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: 'description', content: DESCRIPTION },
      { property: 'og:title', content: TITLE },
      { property: 'og:description', content: DESCRIPTION },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `${company.siteUrl}/projects` },
    ],
    links: [{ rel: 'canonical', href: `${company.siteUrl}/projects` }],
  }),
  component: ProjectsPage,
})
