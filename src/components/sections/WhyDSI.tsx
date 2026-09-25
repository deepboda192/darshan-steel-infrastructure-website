import {
  BadgeCheck,
  ClipboardCheck,
  Expand,
  Factory,
  Headphones,
  Layers,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { whyChooseDsi } from '@/data/capabilities'
import { siteImages } from '@/data/images'
import { Button } from '@/components/site/Button'

// One pictogram per reason, keyed by index. Presentation only, so the mapping
// lives here rather than in data/capabilities.ts.
const ICONS: Record<string, LucideIcon> = {
  '01': Layers,
  '02': ShieldCheck,
  '03': BadgeCheck,
  '04': Expand,
  '05': Truck,
  '06': Factory,
  '07': ClipboardCheck,
  '08': Headphones,
}

/**
 * Why DSI — the eight reasons, set like the about page's "how we work"
 * plate, over DSI's drone photograph of the works under a black wash: the
 * heading and call to action across the top, then a plate of cells divided
 * by hairlines, each with its icon, the reason and its explanation, filling
 * with the accent on hover, edge to edge.
 * Four across on desktop, two on tablets, one on phones.
 */
export function WhyDSI() {
  return (
    <section
      id="why-dsi"
      className="m-section relative isolate overflow-hidden bg-secondary text-white"
      aria-label="Why DSI"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <img
          src={siteImages.worksAerial.src}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: siteImages.worksAerial.focus }}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="m-container">
        <div className="flex flex-col gap-20 max-xs:gap-[72px]">
          <div className="flex items-end justify-between gap-8 max-lg:flex-col max-lg:items-start">
            <div className="flex max-w-[700px] flex-col gap-8 max-md:gap-6">
              <p className="m-subtitle light">Why DSI</p>
              <h2 className="m-h2 light" data-animation="blur-stagger">
                Why DSI?
              </h2>
              <p className="text-[18px] leading-[1.5] text-neutral-1 max-md:text-[16px]" data-reveal="fade">
                Eight reasons clients choose DSI for their pre-engineered buildings — from the first
                consultation to the final bolt.
              </p>
            </div>
            <div data-reveal="fade">
              <Button href="/#contact">Start Your Project</Button>
            </div>
          </div>

          <ul
            className="grid w-full grid-cols-4 border-l border-t border-white/20 max-lg:grid-cols-2 max-md:grid-cols-1"
            data-reveal="fade"
          >
            {whyChooseDsi.map((item) => {
              const Icon = ICONS[item.index]
              return (
                <li
                  key={item.index}
                  className="border-b border-r border-white/20 transition-colors duration-300 hover:bg-accent"
                >
                  <div className="w-fit p-[34px]">
                    {Icon && <Icon size={40} strokeWidth={1.5} aria-hidden="true" />}
                  </div>
                  <div className="px-[34px] pb-[34px] pt-[42px] max-xs:px-6 max-xs:pb-6 max-xs:pt-8">
                    <h3 className="font-heading text-[26px] font-semibold leading-(--lh-sm)">
                      {item.title}
                    </h3>
                    <p className="m-paragraph medium light mt-4">{item.description}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
