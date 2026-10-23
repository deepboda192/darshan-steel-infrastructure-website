import { siteImages } from '@/data/images'
import { company } from '@/data/company'
import { Button } from '@/components/site/Button'
import { HeroVideo } from './HeroVideo'
import Image from '@/components/media/NextImage'

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
      {/* The still is the largest contentful paint, so it is an <img> the browser can
          find early (and the route head preloads it), with srcset renditions so a phone
          does not download the 2000 px file. The video fades in over it. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={siteImages.hero.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_50%] max-xs:object-[72%_50%]"
        />
        <HeroVideo />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#000000a6,#0000008c)]" />
      </div>

      {/* ---------------- top: headline ---------------- */}
      {/* mt-auto pushes the headline block and the row beneath it to the foot of
          the viewport together, so the spare height on tall screens sits above
          the content; on short screens there is no slack. */}
      <div className="mt-auto border-b border-white/30 py-[min(32px,3svh)] max-lg:border-b-0 max-lg:pb-[70px] max-md:pb-20">
        <div className="m-container">
          <div className="flex max-w-[700px] flex-col gap-[min(48px,4.5svh)] max-md:gap-6">
            {/* Eyebrow: the three disciplines as hairline chips. */}
            <ul
              className="flex flex-wrap items-center gap-x-2.5 gap-y-2.5 font-heading text-[12px] font-semibold uppercase tracking-[1.2px] text-white/85 max-xs:text-[11px]"
              data-reveal="fade"
            >
              {DISCIPLINES.map((d) => (
                <li
                  key={d}
                  className="flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.06] px-3.5 py-[7px] backdrop-blur-[2px]"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {d}
                </li>
              ))}
            </ul>

            <h1 className="m-h1 light" data-animation="blur-stagger">
              A Place for Precise Work.
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
            {/* the certification marks as compact chips: a caption that says what they
                are, then each mark beside its standard and the system it covers */}
            <div className="flex flex-col gap-[min(14px,1.4svh)] pb-8 max-lg:pb-0" data-reveal="up">
              <p className="m-subtitle light">ISO certified</p>
              <ul
                className="flex flex-wrap items-center gap-x-8 gap-y-3 max-xs:flex-col max-xs:items-start max-xs:gap-y-2.5"
                aria-label="Certifications"
              >
                {certifications.map((cert) => (
                  <li key={cert.label} className="flex items-center gap-3.5">
                    <img
                      src={cert.logo}
                      srcSet={`${cert.logo.replace(/\.webp$/, '-112.webp')} 112w, ${cert.logo} 160w`}
                      sizes="(max-width: 479px) 56px, 76px"
                      width={160}
                      height={160}
                      alt={`${cert.label} certified — ${cert.issuer}`}
                      className="h-[min(76px,9svh)] w-[min(76px,9svh)] shrink-0 object-contain max-xs:h-14 max-xs:w-14"
                      decoding="async"
                    />
                    <div className="flex flex-col gap-0.5">
                      <span className="font-heading text-[16px] font-semibold leading-[1.2] text-white">
                        {cert.label}
                      </span>
                      <span className="text-[13px] leading-[1.3] text-neutral-2">{cert.scope}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

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
