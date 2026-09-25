import { createFileRoute } from '@tanstack/react-router'
import { company } from '@/data/company'
import { projectsQueryOptions } from '@/lib/projects-query'
import { useMotion } from '@/lib/motion'

import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Clients } from '@/components/sections/Clients'
import { Solutions } from '@/components/sections/Solutions'
import { Projects } from '@/components/sections/Projects'
import { WhyDSI } from '@/components/sections/WhyDSI'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { Contact } from '@/components/sections/Contact'
import { JsonLd, websiteSchema } from '@/lib/schema'

/**
 * Homepage — the one active page.
 *
 * Section order: hero, about, the building types on dark, why DSI over the
 * works photograph, clients, projects, the workflow on neutral, then the
 * enquiry form. The footer (with its closing call to action) is rendered by
 * the root layout.
 */
function HomePage() {
  // The loader ran on the server and its result is dehydrated into the
  // client, so both sides render the same records — no refetch, no mismatch.
  const projects = Route.useLoaderData()

  // Counters, marquees and entrances — armed only once this page has mounted.
  useMotion()

  return (
    <>
      <JsonLd data={websiteSchema()} />

      <Hero />
      <About />
      <Solutions />
      <WhyDSI />
      <Clients />
      <Projects projects={projects} />
      <ProcessSteps />
      <Contact />
    </>
  )
}

export const Route = createFileRoute('/')({
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQueryOptions),
  head: () => ({
    meta: [
      { title: 'Darshan Steel Infrastructure | PEB & Structural Steel Solutions' },
      {
        name: 'description',
        content:
          'Darshan Steel Infrastructure provides engineered Pre-Engineered Buildings, industrial sheds, warehouses, factories, cold storage and structural steel solutions.',
      },
      { property: 'og:title', content: 'Darshan Steel Infrastructure | PEB & Structural Steel Solutions' },
      {
        property: 'og:description',
        content:
          'Darshan Steel Infrastructure provides engineered Pre-Engineered Buildings, industrial sheds, warehouses, factories, cold storage and structural steel solutions.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: `${company.siteUrl}/` }],
  }),
  component: HomePage,
})
