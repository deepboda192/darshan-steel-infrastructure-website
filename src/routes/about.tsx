import { createFileRoute } from '@tanstack/react-router'
import { company } from '@/data/company'
import { siteImages } from '@/data/images'
import { useMotion } from '@/lib/motion'
import { breadcrumbSchema, JsonLd } from '@/lib/schema'
import { InnerHero } from '@/components/site/InnerHero'
import { VideoBand } from '@/components/site/VideoBand'
import { AboutIntro } from '@/components/about/AboutIntro'
import { Solutions } from '@/components/sections/Solutions'
import { TaglineBand } from '@/components/about/TaglineBand'
import { Principles } from '@/components/about/Principles'
import { ShopAndSite } from '@/components/about/ShopAndSite'
import { IntegratedModel } from '@/components/about/IntegratedModel'
import { Leadership } from '@/components/about/Leadership'

const TITLE = `About | ${company.name}`
const DESCRIPTION =
  'Darshan Steel Infrastructure designs, manufactures and erects pre-engineered steel buildings. Structural engineering, fabrication, inspection and site erection handled by one team in Gujarat, India.'

/**
 * About — the reference's about page, section for section: the inner-page
 * hero, who we are with the big figures and the film, what we build, the
 * tagline band, how
 * we work on the dark surface, shop and site, the integrated model, the film
 * band and leadership. Team profiles and FAQs are left out until DSI has
 * content for them. The footer's closing call to action follows from the
 * root layout.
 */
function AboutPage() {
  useMotion()

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />

      <InnerHero
        title="About DSI"
        image={siteImages.aboutHero}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />
      <AboutIntro />
      <Solutions />
      <TaglineBand />
      <Principles />
      <ShopAndSite />
      <IntegratedModel />
      <VideoBand />
      <Leadership />
    </>
  )
}

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: 'description', content: DESCRIPTION },
      { property: 'og:title', content: TITLE },
      { property: 'og:description', content: DESCRIPTION },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `${company.siteUrl}/about` },
    ],
    links: [{ rel: 'canonical', href: `${company.siteUrl}/about` }],
  }),
  component: AboutPage,
})
