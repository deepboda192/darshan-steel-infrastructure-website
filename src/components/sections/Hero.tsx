import { siteImages } from '@/data/images'
import { company } from '@/data/company'
import { Button } from '@/components/site/Button'
import { HeroVideo } from './HeroVideo'

const DISCIPLINES = ['PEB Manufacturing', 'Structural Steel', 'Engineering & Erection']

/**
 * Homepage hero.
 *
 * A full-height photograph — a looping video fades in over it once the page
 * has loaded — under a dark wash, the headline blurring in word
 * by word, one solid call to action beside the positioning line. Directly
 * beneath, on the hairline: the certification marks on the left, the project
 * count in the accent stat box on the right. Figures and certifications come
 * from data/company.ts.
 */
export function Hero() {
  const projectsMetric = company.metrics.find((m) => m.key === 'projects')
  const certifications = company.certifications.filter((c) => c.verified)

  return (
    <section
      className="relative isolate flex min-h-svh flex-col overflow-hidden pb-[min(54px,5svh)] pt-[78px] text-white"
      aria-label="Introduction"
    >
      {/* ---------------- background ---------------- */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cover bg-[50%] bg-fixed max-md:bg-scroll max-xs:bg-[72%]"
        style={{ backgroundImage: `url(${siteImages.hero.src})` }}
      >
        <HeroVideo />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#000000a6,#0000008c)]" />
      </div>

      {/* ---------------- top: headline ---------------- */}
      <div className="border-b border-white/30 py-[min(32px,3svh)] max-lg:border-b-0 max-lg:pb-[70px] max-md:pb-20">
        <div className="m-container">
          <div className="flex max-w-[700px] flex-col gap-[min(48px,4.5svh)] max-md:gap-6">
            <ul
              className="flex flex-wrap items-center gap-x-6 gap-y-2 font-heading text-[14px] font-semibold uppercase tracking-[0.5px] text-white/70"
              data-reveal="fade"
            >
              {DISCIPLINES.map((d, i) => (
                <li key={d} className="flex items-center gap-6">
                  {i > 0 && <span aria-hidden="true" className="h-3 w-px bg-white/30 max-md:hidden" />}
                  {d}
                </li>
              ))}
            </ul>

            <h1 className="m-h1 light" data-animation="blur-stagger">
              Pre-Engineered For Industry.
            </h1>

            <div
              className="flex items-center gap-10 max-md:flex-col-reverse max-md:items-start max-md:gap-8"
              data-reveal="up"
            >
              <Button href="/#contact">Start Your Project</Button>
              <div className="max-w-[400px]">
                <p className="text-[18px] leading-[1.5] text-white max-xs:text-[16px] max-xs:leading-[1.6]">
                  Darshan Steel Infrastructure delivers complete Pre-Engineered Building solutions
                  for modern industrial spaces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- bottom: figures ---------------- */}
      <div className="border-b border-white/30 max-lg:border-b-0">
        <div className="m-container">
          <div className="flex items-end justify-between max-md:flex-col max-md:items-start max-md:gap-8">
            {/* the certification marks, on equal white plates */}
            <ul
              className="flex items-center gap-5 pb-8 max-lg:pb-0 max-xs:gap-4"
              aria-label="Certifications"
              data-reveal="up"
            >
              {certifications.map((cert) => (
                <li
                  key={cert.label}
                  className="flex h-[min(180px,23svh)] w-[min(180px,23svh)] items-center justify-center max-lg:h-[156px] max-lg:w-[156px] max-xs:h-[100px] max-xs:w-[100px]"
                >
                  <img
                    src={cert.logo}
                    alt={`${cert.label} certified — ${cert.issuer}`}
                    className="h-full w-full object-contain"
                    decoding="async"
                  />
                </li>
              ))}
            </ul>

            {projectsMetric && (
              <div
                className="relative flex h-[clamp(170px,26svh,270px)] w-full max-w-[320px] flex-col justify-between bg-accent px-[30px] py-6 max-lg:h-[240px] max-lg:max-w-[290px] max-lg:px-[26px] max-lg:py-5 max-md:max-w-full max-md:pr-[54px]"
                data-reveal="fade"
                data-placeholder={projectsMetric.placeholder}
              >
                <p className="font-heading text-[length:min(68px,7.5svh)] font-semibold leading-none text-white max-lg:text-[64px] max-xs:text-[60px]">
                  <span data-counter={projectsMetric.value} data-suffix={projectsMetric.suffix}>
                    {projectsMetric.value}
                    {projectsMetric.suffix}
                  </span>
                </p>
                <div>
                  <p className="font-heading text-[24px] font-bold leading-(--lh-sm) text-white max-lg:text-[22px]">
                    {projectsMetric.label}
                  </p>
                  <p className="mt-1.5 text-neutral-1 max-lg:mt-3.5">{projectsMetric.note}</p>
                </div>

                {/* Vertical rules from the top of the page to the foot of the hero: they
                    overshoot on purpose and the section's overflow-hidden trims them. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-[100vh] left-0 h-[350vh] w-px bg-white/30 max-lg:hidden"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-[100vh] right-0 h-[350vh] w-px bg-white/30 max-lg:hidden"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
