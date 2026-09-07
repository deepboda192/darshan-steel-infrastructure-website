import { clients } from '@/data/clients'
import { SectionHeader } from '@/components/site/SectionHeader'
import { Reveal } from '@/components/animations/Reveal'

/**
 * Our clients — a hairline logo wall.
 *
 * Twenty marks of wildly different shapes, colours and resolutions, so the
 * grid does the unifying: every logo sits centred in an identical white cell,
 * capped to the same height, and the cells are separated by 1px of the rule
 * colour showing through a `gap-px` grid rather than per-cell borders (no
 * doubled lines, no odd-row arithmetic). Logos stay in full colour and lift
 * slightly on hover.
 *
 * Three across below desktop, seven across on desktop — 21 logos make exact
 * rows at both steps, so the plate never ends on a ragged row (which the
 * `gap-px` technique would show as a tinted empty cell).
 */
export function Clients() {
  return (
    <section className="bg-white py-20 lg:py-24" aria-label="Our clients">
      <div className="container-site">
        <SectionHeader
          index="03"
          eyebrow="Our clients"
          title={
            <>
              Trusted across
              {' '}<br />
              industries.
            </>
          }
          lead="A selection of the businesses DSI has built for — across paper, beverages, ceramics, forging, energy, automotive and more."
          size="md"
          className="mb-12 md:mb-16"
        />

        <Reveal>
          <ul className="grid grid-cols-3 gap-px border border-charcoal/10 bg-charcoal/10 lg:grid-cols-7">
            {clients.map((client, i) => (
              <li
                key={client.src}
                className="group flex h-24 items-center justify-center bg-white px-4 sm:h-28 lg:h-32 lg:px-6"
              >
                <img
                  src={client.src}
                  alt={client.name}
                  title={client.name}
                  width={client.width}
                  height={client.height}
                  loading={i < 10 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-auto max-h-14 w-auto max-w-[80%] object-contain transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-110 lg:max-h-16"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
