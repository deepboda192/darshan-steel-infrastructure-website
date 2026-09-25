import { Building2 } from 'lucide-react'
import { industriesServed } from '@/data/capabilities'
import { SectionIntro } from '@/components/site/SectionIntro'
import { Button } from '@/components/site/Button'
import { cn } from '@/lib/cn'

/**
 * Industries served — the reference's twin marquee band.
 *
 * A dark band: centred heading, then two ruled rows of sector cells
 * looping in opposite directions (each row is two identical tracks; see
 * lib/motion.ts), and the sector statement with a CTA beneath.
 */
export function IndustriesMarquee() {
  const half = Math.ceil(industriesServed.length / 2)
  const rows = [
    industriesServed.slice(0, half).map((name, i) => ({ name, index: i + 1 })),
    industriesServed.slice(half).map((name, i) => ({ name, index: half + i + 1 })),
  ]

  return (
    <section id="industries" className="m-section bg-secondary text-white" aria-label="Industries we serve">
      <div className="flex flex-col gap-24 max-xs:gap-[72px]">
        <div className="m-container">
          <div data-reveal="up">
            <SectionIntro
              tone="light"
              align="center"
              subtitle="Industries"
              title="Built for the industries that keep business moving."
              className="max-w-[650px]"
            />
          </div>
        </div>

        <div data-reveal="fade">
          {rows.map((row, r) => (
            <div
              key={r}
              className={cn(
                'm-marquee h-[120px] border-l border-t border-white/20 max-xs:h-[100px]',
                r === rows.length - 1 && 'border-b',
              )}
              style={{ overflow: 'clip' }}
              data-marquee={r % 2 === 0 ? 'left' : 'right'}
              data-marquee-speed="32"
            >
              {[0, 1].map((track) => (
                <div
                  key={track}
                  className="m-marquee-track h-full"
                  data-marquee-track
                  aria-hidden={track === 1 ? true : undefined}
                >
                  {row.map((item) => (
                    <div
                      key={item.name}
                      className="flex h-full min-w-[480px] items-center gap-6 border-r border-white/20 pl-5 pr-6 max-md:min-w-[450px] max-xs:min-w-[400px] max-xs:gap-5"
                    >
                      <span className="m-icon-box h-20 w-20 max-md:h-[70px] max-md:w-[70px] max-xs:h-[60px] max-xs:w-[60px]">
                        <Building2 size={32} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <div className="flex flex-col gap-1.5">
                        <p className="tabular font-heading text-[18px] font-medium leading-[1.5] text-neutral-2 max-md:text-[16px]">
                          {String(item.index).padStart(2, '0')}
                        </p>
                        <p className="font-heading text-[24px] font-semibold leading-(--lh-sm) text-white max-md:text-[22px] max-xs:text-[20px]">
                          {item.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="m-container">
          <div className="mx-auto flex max-w-[600px] flex-col items-center gap-8" data-reveal="up">
            <p className="text-center text-[18px] leading-[1.5] text-neutral-1 max-md:text-[16px] max-xs:text-[14px] max-xs:leading-[1.6]">
              What changes between sectors is not the steel — it is the loading, the envelope, the
              tolerance and the programme.
            </p>
            <Button href="/#contact">Start Your Project</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
