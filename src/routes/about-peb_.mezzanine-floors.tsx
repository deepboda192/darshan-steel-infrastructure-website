import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Boxes, Briefcase, Check, Coffee, Fan, Truck, Wrench } from 'lucide-react'
import { company } from '@/data/company'
import { siteImages, type SiteImage } from '@/data/images'
import {
  mezzanineDrawings,
  mezzanineFaq,
  mezzanineIntro,
  mezzanineLegend,
  mezzanineMeta,
  mezzanineParts,
  mezzanineUses,
} from '@/data/mezzanine'
import { useMotion } from '@/lib/motion'
import { breadcrumbSchema, JsonLd, type Json } from '@/lib/schema'
import { InnerHero } from '@/components/site/InnerHero'
import { SectionIntro } from '@/components/site/SectionIntro'
import { Button } from '@/components/site/Button'
import { ImageFrame } from '@/components/media/ImageFrame'
import Image from '@/components/media/NextImage'
import Link from '@/components/site/NextLink'
import { cn } from '@/lib/cn'

/** A photograph for each part, shown beside the copy with a caption. */
const PART_PHOTO: Record<string, { image: SiteImage; caption: string }> = {
  'beams-and-columns': {
    image: siteImages.mezzanineParts.beams,
    caption: 'Steel beams on steel columns carrying the floor panels of an upper level, seen from below, with the handrail along its edge.',
  },
  'deck-sheet': {
    image: siteImages.mezzanineParts.deck,
    caption: 'A chequered plate floor on a mezzanine walkway, the alternative to a deck sheet and slab where the load is light.',
  },
  handrails: {
    image: siteImages.mezzanineParts.handrails,
    caption: 'Galvanized post-and-rail handrails on steel stairs and landings, with a kick plate at the floor.',
  },
  staircase: {
    image: siteImages.mezzanineParts.stair,
    caption: 'Two steel staircases with tubular handrails rising to a mezzanine floor.',
  },
}

/** The two catalogue drawings, by key. */
const DRAWING: Record<'section' | 'edge', { image: SiteImage; width: number; height: number }> = {
  section: { image: siteImages.mezzanineDrawings.section, width: 373, height: 232 },
  edge: { image: siteImages.mezzanineDrawings.edge, width: 456, height: 365 },
}

/** One icon per use, in the order the data lists them. */
const USE_ICONS = [Briefcase, Boxes, Wrench, Fan, Truck, Coffee]

const PATH = '/about-peb/mezzanine-floors'

function articleSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Mezzanine floors in a pre-engineered building',
    description: mezzanineMeta.description,
    mainEntityOfPage: `${company.siteUrl}${PATH}`,
    author: { '@type': 'Organization', name: company.name },
    publisher: { '@type': 'Organization', name: company.name, url: company.siteUrl },
  }
}

function faqSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: mezzanineFaq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

/**
 * Mezzanine Floors — the intermediate floor built inside a PEB, part by
 * part: beams and columns, deck sheet, handrails and staircase, then the two
 * catalogue details and the questions people ask. A page under About PEB, a
 * sibling of Primary System and Secondary System; the copy lives in
 * data/mezzanine.ts.
 */
function MezzanineFloorsPage() {
  useMotion()

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About PEB', path: '/about-peb' },
            { name: 'Mezzanine Floors', path: PATH },
          ]),
          articleSchema(),
          faqSchema(),
        ]}
      />

      <InnerHero
        title="Mezzanine Floors"
        image={siteImages.mezzanineHero}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About PEB', href: '/about-peb' }, { label: 'Mezzanine Floors' }]}
      />

      {/* ---------------- intro + contents + uses ---------------- */}
      <section className="m-section" aria-labelledby="mz-intro">
        <div className="m-container">
          <div className="grid grid-cols-[1fr_1.3fr] items-start gap-16 max-lg:grid-cols-1 max-lg:gap-12">
            <div className="flex flex-col gap-10 lg:sticky lg:top-12" data-reveal="up">
              <div>
                <SectionIntro subtitle="Mezzanine system" title={<span id="mz-intro">A second floor in the same building.</span>} />
                <p className="m-paragraph large mt-8 text-neutral-10">{mezzanineIntro.lead}</p>
              </div>
              <div className="flex flex-col gap-5">
                {mezzanineIntro.paragraphs.map((text) => (
                  <p key={text.slice(0, 24)} className="m-paragraph">
                    {text}
                  </p>
                ))}
              </div>
              <nav aria-label="On this page" className="border border-black/10 bg-neutral-1 p-6 max-xs:p-5">
                <p className="text-[13px] font-semibold uppercase tracking-[0.5px] text-neutral-6">On this page</p>
                <ol className="mt-4 flex flex-col gap-2">
                  {[...mezzanineParts.map((part) => ({ href: `#${part.slug}`, title: part.title })), { href: '#mz-details', title: 'Details' }].map(
                    (item, i) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          className="group flex items-center gap-4 border border-black/10 bg-white px-5 py-3.5 transition-[border-color] duration-300 hover:border-accent"
                        >
                          <span className="font-heading text-[13px] font-semibold text-neutral-5 tabular-nums">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="flex-1 font-heading text-[17px] font-semibold text-neutral-10 transition-colors group-hover:text-accent">
                            {item.title}
                          </span>
                          <ArrowRight
                            size={16}
                            aria-hidden="true"
                            className="shrink-0 text-neutral-4 transition-[translate,color] duration-300 group-hover:translate-x-1 group-hover:text-accent"
                          />
                        </a>
                      </li>
                    ),
                  )}
                </ol>
              </nav>
            </div>

            {/* What mezzanines are built for. */}
            <div className="flex flex-col gap-6" data-reveal="up">
              <div>
                <h3 className="font-heading text-[26px] font-bold leading-(--lh-sm) text-neutral-10 max-xs:text-[22px]">
                  What a mezzanine is built for
                </h3>
                <p className="m-paragraph mt-3">
                  The floor is sized for its use, so the use is the first thing DSI asks. The{' '}
                  <Link href="/about-peb/primary-system" className="m-link">
                    primary system
                  </Link>{' '}
                  and{' '}
                  <Link href="/about-peb/secondary-system" className="m-link">
                    secondary system
                  </Link>{' '}
                  have pages of their own.
                </p>
              </div>
              <ul className="grid grid-cols-2 gap-5 max-sm:grid-cols-1" data-reveal-stagger>
                {mezzanineUses.map((use, n) => {
                  const Icon = USE_ICONS[n] ?? Check
                  return (
                    <li
                      key={use.title}
                      className="flex flex-col gap-5 border border-secondary/15 bg-white p-6 transition-colors duration-300 hover:border-accent"
                    >
                      <span className="m-icon-box h-12 w-12">
                        <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <div>
                        <h4 className="font-heading text-[19px] font-bold leading-(--lh-sm) text-neutral-10">{use.title}</h4>
                        <p className="mt-2 text-[15px] leading-[1.55] text-neutral-8">{use.text}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- the four parts ---------------- */}
      {mezzanineParts.map((part, i) => {
        const dark = i % 2 === 1
        const photo = PART_PHOTO[part.slug]
        return (
          <section
            key={part.slug}
            id={part.slug}
            className={cn('m-section scroll-mt-6', dark && 'bg-secondary text-white')}
            aria-labelledby={`${part.slug}-title`}
          >
            <div className="m-container">
              <div className="flex flex-col gap-14 max-xs:gap-10">
                <div className="flex items-end justify-between gap-10 max-lg:flex-col max-lg:items-start max-lg:gap-6" data-reveal="up">
                  <div className="max-w-[640px]">
                    <SectionIntro
                      tone={dark ? 'light' : 'dark'}
                      subtitle={part.eyebrow}
                      title={<span id={`${part.slug}-title`}>{part.title}</span>}
                    />
                  </div>
                  <p
                    className={cn(
                      'mb-2 max-w-[440px] text-[18px] leading-[1.5] max-md:text-[16px]',
                      dark ? 'text-neutral-1' : 'text-neutral-8',
                    )}
                  >
                    {part.summary}
                  </p>
                </div>

                <div className="grid grid-cols-[1.4fr_1fr] gap-12 max-lg:grid-cols-1 max-lg:gap-10">
                  <div className="flex flex-col gap-5" data-reveal="up">
                    {part.paragraphs.map((text) => (
                      <p key={text.slice(0, 24)} className={cn('m-paragraph', dark && 'light')}>
                        {text}
                      </p>
                    ))}
                    <div className={cn('mt-4 border p-6', dark ? 'border-white/20 bg-white/5' : 'border-black/10 bg-neutral-1')}>
                      <h3 className={cn('font-heading text-[18px] font-semibold', dark ? 'text-white' : 'text-neutral-10')}>
                        At a glance
                      </h3>
                      <dl className="mt-2 grid grid-cols-2 gap-x-8 max-sm:grid-cols-1">
                        {part.specs.map((row) => (
                          <div
                            key={row.label}
                            className={cn('flex flex-col gap-0.5 border-b py-3', dark ? 'border-white/15' : 'border-black/10')}
                          >
                            <dt className={cn('text-[13px] font-semibold', dark ? 'text-neutral-3' : 'text-neutral-6')}>{row.label}</dt>
                            <dd className={cn('text-[15px] leading-[1.5]', dark ? 'text-white' : 'text-neutral-10')}>{row.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                  <div className="flex flex-col gap-5" data-reveal="up">
                    {photo && (
                      <figure className={cn('border p-3', dark ? 'border-white/20 bg-white/5' : 'border-black/10 bg-white')}>
                        <ImageFrame image={photo.image} ratio="16/10" sizes="(min-width: 1024px) 34vw, 100vw" captioned />
                        <figcaption className={cn('mt-3 px-2 text-[13px] leading-[1.5]', dark ? 'text-neutral-2' : 'text-neutral-6')}>
                          {photo.caption}
                        </figcaption>
                      </figure>
                    )}
                    <ul
                      className={cn(
                        'flex h-fit flex-col gap-3.5 border p-7 max-xs:p-6',
                        dark ? 'border-white/20' : 'border-black/10 bg-neutral-1',
                      )}
                    >
                      {part.points.map((point) => (
                        <li
                          key={point}
                          className={cn('flex items-start gap-3 text-[16px] leading-[1.5]', dark ? 'text-neutral-1' : 'text-neutral-8')}
                        >
                          <Check size={18} strokeWidth={2.2} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* ---------------- the catalogue details ---------------- */}
      <section className="m-section scroll-mt-6 bg-neutral-1" id="mz-details" aria-labelledby="mz-details-title">
        <div className="m-container">
          <div className="flex flex-col gap-14 max-xs:gap-10">
            <div className="flex items-end justify-between gap-10 max-lg:flex-col max-lg:items-start max-lg:gap-6" data-reveal="up">
              <div className="max-w-[640px]">
                <SectionIntro subtitle="Details" title={<span id="mz-details-title">How the floor meets the frame.</span>} />
              </div>
              <p className="mb-2 max-w-[440px] text-[18px] leading-[1.5] text-neutral-8 max-md:text-[16px]">
                Two details from the DSI catalogue: a section through the floor, and the edge where the
                mezzanine meets the sidewall.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1" data-reveal-stagger>
              {mezzanineDrawings.map((drawing) => {
                const art = DRAWING[drawing.key]
                return (
                  <figure key={drawing.key} className="flex flex-col border border-secondary/15 bg-white">
                    <div className="flex flex-1 items-center justify-center px-8 py-10 max-xs:px-5 max-xs:py-8">
                      <Image
                        src={art.image.src}
                        alt={art.image.alt}
                        width={art.width}
                        height={art.height}
                        className="h-auto w-full max-w-[460px]"
                      />
                    </div>
                    <figcaption className="border-t border-black/10 p-6 max-xs:p-5">
                      <h3 className="font-heading text-[19px] font-bold leading-(--lh-sm) text-neutral-10">{drawing.title}</h3>
                      <p className="mt-2 text-[14px] leading-[1.55] text-neutral-7">{drawing.caption}</p>
                    </figcaption>
                  </figure>
                )
              })}
            </div>

            {/* The labels in the drawings are small, so the parts are repeated as text. */}
            <dl className="grid grid-cols-3 gap-x-8 border border-black/10 bg-white px-6 py-3 max-lg:grid-cols-2 max-sm:grid-cols-1 max-xs:px-5" data-reveal="up">
              {mezzanineLegend.map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5 border-b border-black/10 py-3 last:border-b-0">
                  <dt className="font-heading text-[15px] font-bold leading-[1.35] text-accent">{item.label}</dt>
                  <dd className="text-[14px] leading-[1.5] text-neutral-8">{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="m-section" aria-labelledby="mz-faq">
        <div className="m-container">
          <div className="flex items-start justify-between gap-16 max-lg:flex-col max-lg:gap-12">
            <div className="w-full max-w-[440px] lg:sticky lg:top-12" data-reveal="up">
              <SectionIntro subtitle="FAQ" title={<span id="mz-faq">Questions about mezzanine floors.</span>} />
              <p className="m-paragraph mt-8">
                For the frames the mezzanine sits inside, see the{' '}
                <Link href="/about-peb/primary-system" className="m-link">
                  Primary System
                </Link>
                . For the rest of the building, see{' '}
                <Link href="/about-peb" className="m-link">
                  About PEB
                </Link>
                .
              </p>
            </div>
            <dl className="w-full max-w-[760px] max-lg:max-w-none" data-reveal="up">
              {mezzanineFaq.map((item, i) => (
                <details key={item.question} className="group border-b border-black/10" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-heading text-[20px] font-semibold leading-(--lh-sm) text-neutral-10 marker:hidden [&::-webkit-details-marker]:hidden max-xs:text-[18px]">
                    <dt>{item.question}</dt>
                    <span
                      aria-hidden="true"
                      className="relative h-6 w-6 shrink-0 before:absolute before:left-1/2 before:top-1/2 before:h-[2px] before:w-4 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-accent after:absolute after:left-1/2 after:top-1/2 after:h-4 after:w-[2px] after:-translate-x-1/2 after:-translate-y-1/2 after:bg-accent after:transition-[rotate] after:duration-300 group-open:after:rotate-90"
                    />
                  </summary>
                  <dd className="m-paragraph pb-7 pr-12 max-xs:pr-0">{item.answer}</dd>
                </details>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------- closing ---------------- */}
      <section className="m-section bg-secondary text-white" aria-label="Start a project">
        <div className="m-container">
          <div className="flex flex-col items-center gap-8 text-center" data-reveal="up">
            <SectionIntro
              tone="light"
              align="center"
              subtitle="Next step"
              title="Tell us what the floor is for."
              className="max-w-[640px]"
            />
            <p className="max-w-[560px] text-[18px] leading-[1.5] text-neutral-1 max-md:text-[16px]">
              The use, the area and the load are enough for DSI to lay out a mezzanine with the frame,
              in a new building or one already standing.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href="/?intent=quote#contact">Request a quote</Button>
              <Button href="/projects" variant="outline" tone="dark">
                See our projects
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const Route = createFileRoute('/about-peb_/mezzanine-floors')({
  head: () => ({
    meta: [
      { title: mezzanineMeta.title },
      { name: 'description', content: mezzanineMeta.description },
      { property: 'og:title', content: mezzanineMeta.title },
      { property: 'og:description', content: mezzanineMeta.description },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: `${company.siteUrl}${PATH}` },
    ],
    links: [{ rel: 'canonical', href: `${company.siteUrl}${PATH}` }],
  }),
  component: MezzanineFloorsPage,
})
