import { createFileRoute } from '@tanstack/react-router'
import { company } from '@/data/company'
import { projectsQueryOptions } from '@/lib/projects-query'

import { Hero } from '@/components/sections/Hero'
import { Metrics } from '@/components/sections/Metrics'
import { WhyDSI } from '@/components/sections/WhyDSI'
import { Clients } from '@/components/sections/Clients'
import { ProjectsShowcase } from '@/components/sections/ProjectsShowcase'
import { Process } from '@/components/sections/Process'
import { CTASection } from '@/components/sections/CTASection'
import { JsonLd, websiteSchema } from '@/lib/schema'

/**
 * Homepage.
 *
 * The vertical rhythm is deliberate — dark hero, then light bands broken by
 * two dark ones (Engineering, Quality) and closed by the dark CTA. Section
 * indices run 01–10 in the technical labels so the page reads as a numbered
 * document.
 */
function HomePage() {
  return (
    <>
      <JsonLd data={websiteSchema()} />

      <Hero />
      <Metrics />
      <WhyDSI />
      <Clients />
      <ProjectsShowcase />
      <Process />
      <CTASection />
    </>
  )
}

export const Route = createFileRoute('/')({
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQueryOptions),
  head: () => ({
    meta: [
      { title: "Darshan Steel Infrastructure | PEB & Structural Steel Solutions" },
      { name: 'description', content: "Darshan Steel Infrastructure provides engineered Pre-Engineered Buildings, industrial sheds, warehouses, factories, cold storage and structural steel solutions." },
      { property: 'og:title', content: "Darshan Steel Infrastructure | PEB & Structural Steel Solutions" },
      { property: 'og:description', content: "Darshan Steel Infrastructure provides engineered Pre-Engineered Buildings, industrial sheds, warehouses, factories, cold storage and structural steel solutions." },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: `${company.siteUrl}/` }],
  }),
  component: HomePage,
})
