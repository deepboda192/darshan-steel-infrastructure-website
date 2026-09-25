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
 * band, over DSI's drone photograph of the works under a black wash: the
 * heading and call to action across the top, then eight translucent dark
 * cards — accent icon plate at the head, the reason and its
 * explanation — that lift and fill with the accent on hover. The plates keep
 * the copy legible over the photograph.
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
        <div className="absolute inset-0 bg-black/75" />
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
            className="grid w-full grid-cols-4 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1"
            data-reveal-stagger
          >
            {whyChooseDsi.map((item) => {
              const Icon = ICONS[item.index]
              return (
                <li
                  key={item.index}
                  className="group flex flex-col border border-white/10 bg-[#141414]/70 p-7 backdrop-blur-[2px] transition-[background-color,border-color,transform] duration-300 ease-out hover:-translate-y-1 hover:border-accent hover:bg-accent max-xs:p-6"
                >
                  <span className="m-icon-box mb-7 h-12 w-12 transition-colors duration-300 group-hover:bg-white group-hover:text-accent">
                    {Icon && <Icon size={22} strokeWidth={1.8} aria-hidden="true" />}
                  </span>
                  <h3 className="font-heading text-[22px] font-semibold leading-(--lh-sm) text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-neutral-2 transition-colors duration-300 group-hover:text-white">
                    {item.description}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
