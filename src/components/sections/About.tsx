import { Eye, Target } from 'lucide-react'
import { company } from '@/data/company'
import { emphasise } from '@/lib/emphasise'
import { siteImages } from '@/data/images'
import { ImageFrame } from '@/components/media/ImageFrame'
import { Counter } from './Counter'
import { cn } from '@/lib/cn'

const STAT_KEYS = ['projects', 'clients', 'industries'] as const
const STAT_TONES = ['secondary', 'neutral', 'accent'] as const

/**
 * About — who DSI is.
 *
 * The eyebrow and name on the left; on the right the positioning paragraph
 * as the reference's scroll-brightened statement — set in the body face at
 * lead size (`m-paragraph large`), since it is a paragraph — then vision
 * and mission as a
 * pair of feature blocks. Beneath: the works photograph beside a plate of
 * three figures in the dark / neutral / accent boxes, closed by the
 * second photograph. All copy and figures come from data/company.ts.
 */
export function About() {
  const stats = STAT_KEYS.map((key) => company.metrics.find((m) => m.key === key)).filter(
    (m): m is NonNullable<typeof m> => Boolean(m),
  )

  return (
    <section id="about" className="m-section" aria-label="About Darshan Steel Infrastructure">
      <div className="m-container">
        <div className="flex flex-col gap-20 max-xs:gap-[72px]">
          {/* ---------------- top ---------------- */}
          <div className="flex justify-between gap-10 max-lg:flex-col max-lg:gap-[54px] max-xs:gap-10">
            <div className="flex flex-col justify-between gap-10 max-lg:flex-row max-lg:items-end">
              <p className="m-subtitle">About us</p>
              <h2 className="m-h3 max-w-[420px] max-lg:hidden">Darshan Steel Infrastructure</h2>
            </div>

            <div className="flex min-w-0 max-w-[800px] flex-col gap-[54px] max-lg:max-w-none max-md:gap-10">
              <p
                className="m-paragraph large"
                data-scrub-words
              >
                {emphasise(company.about, company.aboutEmphasis)}
              </p>

              <div className="flex justify-between gap-4 max-lg:gap-6 max-md:flex-col max-md:gap-10">
                {[
                  { icon: Eye, label: 'Vision', text: company.vision },
                  { icon: Target, label: 'Mission', text: company.mission },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      className="flex w-full min-w-0 max-w-[350px] flex-col gap-6 max-md:w-full max-md:max-w-none max-xs:gap-5"
                    >
                      <div className="flex items-center gap-4 max-xs:gap-3">
                        <Icon
                          aria-hidden="true"
                          className="h-8 w-8 text-accent max-xs:h-7 max-xs:w-7"
                          strokeWidth={2}
                        />
                        <h3 className="font-heading text-[24px] font-bold leading-(--lh-sm) text-neutral-10 max-md:text-[22px] max-xs:text-[20px]">
                          {item.label}
                        </h3>
                      </div>
                      <p className="m-paragraph medium">{item.text}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ---------------- bottom ---------------- */}
          <div className="grid grid-cols-[1fr_1.1fr] gap-5 max-lg:grid-cols-1" data-reveal="up">
            <div className="relative min-h-[560px] bg-neutral-1 max-lg:min-h-[480px] max-xs:min-h-[360px]">
              <ImageFrame
                image={siteImages.aboutPrimary}
                tone="light"
                ratio="fill"
                sizes="(min-width: 1024px) 46vw, 100vw"
              />
            </div>

            <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
              {stats.map((metric, i) => {
                const tone = STAT_TONES[i]
                const dark = tone !== 'neutral'
                return (
                  <div
                    key={metric.key}
                    className={cn(
                      'px-[30px] pb-6 pt-7',
                      tone === 'secondary' && 'bg-secondary',
                      tone === 'accent' && 'bg-accent',
                      tone === 'neutral' && 'bg-neutral-1',
                    )}
                    data-placeholder={metric.placeholder}
                  >
                    <p
                      className={cn(
                        'mb-24 border-b pb-6 font-heading text-[22px] font-bold leading-(--lh-sm) max-xs:mb-20 max-xs:text-[20px]',
                        dark ? 'border-white/20 text-neutral-1' : 'border-black/20 text-neutral-10',
                      )}
                    >
                      {metric.label}
                    </p>
                    <p
                      className={cn(
                        'font-heading text-[68px] font-bold leading-none max-xs:text-[60px]',
                        dark ? 'text-white' : 'text-neutral-10',
                      )}
                    >
                      <Counter metric={metric} />
                    </p>
                  </div>
                )
              })}

              <div className="relative min-h-[300px] bg-neutral-1 max-md:min-h-[400px] max-xs:min-h-[350px]">
                <ImageFrame
                  image={siteImages.aboutSecondary}
                  tone="light"
                  ratio="fill"
                  sizes="(min-width: 1024px) 26vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
