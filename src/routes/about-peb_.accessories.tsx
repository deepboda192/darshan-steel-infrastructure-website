import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, ArrowUpToLine, Blinds, Check, Fan, Sun, Thermometer, Warehouse, Wind } from 'lucide-react'
import { company } from '@/data/company'
import { siteImages, type SiteImage } from '@/data/images'
import {
  accessoriesFaq,
  accessoriesIntro,
  accessoriesMeta,
  accessoryItems,
  accessoryParts,
} from '@/data/accessories'
import { useMotion } from '@/lib/motion'
import { breadcrumbSchema, JsonLd, type Json } from '@/lib/schema'
import { InnerHero } from '@/components/site/InnerHero'
import { SectionIntro } from '@/components/site/SectionIntro'
import { Button } from '@/components/site/Button'
import { ImageFrame } from '@/components/media/ImageFrame'
import Link from '@/components/site/NextLink'
import { cn } from '@/lib/cn'

/** A photograph for each part, shown beside the copy with a caption. */
const PART_PHOTO: Record<string, { image: SiteImage; caption: string }> = {
  ventilation: {
    image: siteImages.accessoryParts.ventilation,
    caption: 'A turbo ventilator on its base flashing: the wind spins the vanes and the spinning draws the hot air out.',
  },
  daylight: {
    image: siteImages.accessoryParts.daylight,
    caption: 'Daylight panels set along the roof slope between the steel sheets, lighting the floor from above.',
  },
  louvers: {
    image: siteImages.accessoryParts.louvers,
    caption: 'Louver panels set into profiled wall cladding: air passes between the blades and rain is turned down and out.',
  },
  insulation: {
    image: siteImages.accessoryParts.insulation,
    caption: 'A fibreglass blanket being fitted between framing. In a PEB the blanket is laid over the purlins and girts, under the sheet.',
  },
  access: {
    image: siteImages.accessoryParts.access,
    caption: 'A galvanized cage ladder fixed to the clad wall of an industrial building, with the hoops and stringers that hold a climber who slips.',
  },
}

/** One icon per accessory, in the order the data lists them. */
const ITEM_ICONS = [Fan, Wind, Warehouse, Sun, Blinds, Thermometer, ArrowUpToLine]

const PATH = '/about-peb/accessories'

function articleSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Accessories of a pre-engineered building',
    description: accessoriesMeta.description,
    mainEntityOfPage: `${company.siteUrl}${PATH}`,
    author: { '@type': 'Organization', name: company.name },
    publisher: { '@type': 'Organization', name: company.name, url: company.siteUrl },
  }
}

function faqSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: accessoriesFaq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

/**
 * Accessories — the fifth system of a PEB, in five parts: ventilators and
 * roof monitors, daylight panels, louvers, insulation and cage ladders, with
 * the catalogue's seven-item accessory list beside the intro. A page under
 * About PEB, a sibling of the other system pages; the copy lives in
 * data/accessories.ts.
 */
function AccessoriesPage() {
  useMotion()

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About PEB', path: '/about-peb' },
            { name: 'Accessories', path: PATH },
          ]),
          articleSchema(),
          faqSchema(),
        ]}
      />

      <InnerHero
        title="Accessories"
        image={siteImages.accessoriesHero}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About PEB', href: '/about-peb' }, { label: 'Accessories' }]}
      />

      {/* ---------------- intro + contents + the accessory list ---------------- */}
      <section className="m-section" aria-labelledby="ac-intro">
        <div className="m-container">
          <div className="grid grid-cols-[1fr_1.3fr] items-start gap-16 max-lg:grid-cols-1 max-lg:gap-12">
            <div className="flex flex-col gap-10 lg:sticky lg:top-12" data-reveal="up">
              <div>
                <SectionIntro subtitle="Accessories" title={<span id="ac-intro">What makes the shell a building.</span>} />
                <p className="m-paragraph large mt-8 text-neutral-10">{accessoriesIntro.lead}</p>
              </div>
              <div className="flex flex-col gap-5">
                {accessoriesIntro.paragraphs.map((text) => (
                  <p key={text.slice(0, 24)} className="m-paragraph">
                    {text}
                  </p>
                ))}
              </div>
              <nav aria-label="On this page" className="border border-black/10 bg-neutral-1 p-6 max-xs:p-5">
                <p className="text-[13px] font-semibold uppercase tracking-[0.5px] text-neutral-6">On this page</p>
                <ol className="mt-4 flex flex-col gap-2">
                  {accessoryParts.map((part, i) => (
                    <li key={part.slug}>
                      <a
                        href={`#${part.slug}`}
                        className="group flex items-center gap-4 border border-black/10 bg-white px-5 py-3.5 transition-[border-color] duration-300 hover:border-accent"
                      >
                        <span className="font-heading text-[13px] font-semibold text-neutral-5 tabular-nums">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="flex-1 font-heading text-[17px] font-semibold text-neutral-10 transition-colors group-hover:text-accent">
                          {part.title}
                        </span>
                        <ArrowRight
                          size={16}
                          aria-hidden="true"
                          className="shrink-0 text-neutral-4 transition-[translate,color] duration-300 group-hover:translate-x-1 group-hover:text-accent"
                        />
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            {/* The catalogue's seven accessories, each linking to its part. */}
            <div className="flex flex-col gap-6" data-reveal="up">
              <div>
                <h3 className="font-heading text-[26px] font-bold leading-(--lh-sm) text-neutral-10 max-xs:text-[22px]">
                  Seven accessories, one supplier
                </h3>
                <p className="m-paragraph mt-3">
                  Every one is set into the{' '}
                  <Link href="/about-peb/cladding-system" className="m-link">
                    cladding
                  </Link>{' '}
                  and fixed to the{' '}
                  <Link href="/about-peb/secondary-system" className="m-link">
                    purlins and girts
                  </Link>
                  , so they are chosen with the building rather than added to it.
                </p>
              </div>
              <ul className="grid grid-cols-2 gap-4 max-sm:grid-cols-1" data-reveal-stagger>
                {accessoryItems.map((item, n) => {
                  const Icon = ITEM_ICONS[n] ?? Check
                  return (
                    <li key={item.name}>
                      <a
                        href={`#${item.part}`}
                        className="group flex h-full items-start gap-4 border border-secondary/15 bg-white p-5 transition-colors duration-300 hover:border-accent"
                      >
                        <span className="m-icon-box h-11 w-11 shrink-0">
                          <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-heading text-[17px] font-bold leading-(--lh-sm) text-neutral-10 transition-colors group-hover:text-accent">
                            {item.name}
                          </span>
                          <span className="mt-1.5 block text-[14px] leading-[1.5] text-neutral-8">{item.text}</span>
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- the five parts ---------------- */}
      {accessoryParts.map((part, i) => {
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

      {/* ---------------- FAQ ---------------- */}
      <section className="m-section bg-neutral-1" aria-labelledby="ac-faq">
        <div className="m-container">
          <div className="flex items-start justify-between gap-16 max-lg:flex-col max-lg:gap-12">
            <div className="w-full max-w-[440px] lg:sticky lg:top-12" data-reveal="up">
              <SectionIntro subtitle="FAQ" title={<span id="ac-faq">Questions about accessories.</span>} />
              <p className="m-paragraph mt-8">
                For the sheeting the accessories sit in, see the{' '}
                <Link href="/about-peb/cladding-system" className="m-link">
                  Cladding System
                </Link>
                . For the rest of the building, see{' '}
                <Link href="/about-peb" className="m-link">
                  About PEB
                </Link>
                .
              </p>
            </div>
            <dl className="w-full max-w-[760px] max-lg:max-w-none" data-reveal="up">
              {accessoriesFaq.map((item, i) => (
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
              title="Tell us how the building has to breathe."
              className="max-w-[640px]"
            />
            <p className="max-w-[560px] text-[18px] leading-[1.5] text-neutral-1 max-md:text-[16px]">
              The use inside, the heat it makes and the hours it runs are enough for DSI to set the
              ventilation, daylight and insulation with the cladding.
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

export const Route = createFileRoute('/about-peb_/accessories')({
  head: () => ({
    meta: [
      { title: accessoriesMeta.title },
      { name: 'description', content: accessoriesMeta.description },
      { property: 'og:title', content: accessoriesMeta.title },
      { property: 'og:description', content: accessoriesMeta.description },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: `${company.siteUrl}${PATH}` },
    ],
    links: [{ rel: 'canonical', href: `${company.siteUrl}${PATH}` }],
  }),
  component: AccessoriesPage,
})
