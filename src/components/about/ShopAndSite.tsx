import { company } from '@/data/company'
import { siteImages } from '@/data/images'
import { ImageFrame } from '@/components/media/ImageFrame'
import { SectionIntro } from '@/components/site/SectionIntro'

/**
 * Shop and site — laid out as the reference's history section: a sticky
 * left column with the heading, the argument and the company facts, and on
 * the right a card for each of the two works, its number standing in the
 * photograph and its name and address on the dark plate beneath.
 */
export function ShopAndSite() {
  const facts = [
    { label: 'Established', field: company.established },
    { label: 'Facility area', field: company.facilityArea },
    { label: 'Workforce', field: company.employees },
  ]
  const works = [
    { ...company.works[0], image: siteImages.manufacturing },
    { ...company.works[1], image: siteImages.worksWeld },
  ]

  return (
    <section className="m-section" aria-label="Shop and site">
      <div className="m-container">
        <div className="flex items-start justify-between gap-20 max-lg:flex-col">
          <div className="flex w-full max-w-[540px] flex-col gap-10 lg:sticky lg:top-12 max-lg:max-w-none" data-reveal="up">
            <SectionIntro subtitle="Shop and site" title="The shop decides what the site can do." />
            <div className="flex flex-col gap-5 text-[18px] leading-[1.5] text-neutral-8 max-md:text-[16px] max-md:leading-[1.6]">
              <p>
                Work done under a roof is work that can be measured. Cutting, built-up assembly,
                welding, blast cleaning and coating happen in controlled conditions, and every
                member is checked against its drawing before it is cleared for dispatch.
              </p>
              <p>
                By the time steel reaches site, the engineering questions are closed. Erection
                becomes assembly — setting out, lifting in sequence, bolting to specification and
                surveying the result.
              </p>
            </div>
            <dl className="grid grid-cols-3 gap-5 border-t border-black/10 pt-6 max-xs:grid-cols-1">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-heading text-[14px] font-semibold uppercase tracking-[0.5px] text-neutral-6">
                    {fact.label}
                  </dt>
                  <dd
                    className="mt-1 font-heading text-[22px] font-semibold text-neutral-10"
                    data-placeholder={fact.field.placeholder ? 'true' : undefined}
                  >
                    {fact.field.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="relative bg-neutral-1 pt-[62%]">
              <div className="absolute inset-0">
                <ImageFrame image={siteImages.quality} ratio="fill" sizes="(min-width: 1024px) 40vw, 100vw" />
              </div>
            </div>
          </div>

          <ul className="flex w-full max-w-[500px] flex-col gap-5 max-lg:max-w-none">
            {works.map((work, i) => (
              <li key={work.unit} className="flex flex-col gap-[5px]" data-reveal="up">
                <div className="relative h-[355px] overflow-hidden bg-neutral-2 max-xs:h-[260px]">
                  <div className="absolute inset-0">
                    <ImageFrame image={work.image} ratio="fill" sizes="(min-width: 1024px) 500px, 100vw" />
                  </div>
                  <p
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-3 bg-gradient-to-t from-white to-white/30 bg-clip-text text-center font-heading text-[170px] font-bold leading-none text-transparent max-xs:text-[110px]"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </p>
                </div>
                <div className="bg-secondary px-8 py-7 text-white max-md:p-6">
                  <p className="font-heading text-[14px] font-semibold uppercase tracking-[0.5px] text-neutral-2">
                    {work.unit}
                  </p>
                  <h3 className="mt-2 font-heading text-[28px] font-semibold leading-(--lh-sm) max-xs:text-[24px]">
                    {work.name}
                  </h3>
                  <p className="m-paragraph medium light mt-3">{work.address}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
