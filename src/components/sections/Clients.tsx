import { clients } from '@/data/clients'
import { SectionHeader } from '@/components/site/SectionHeader'
import { Reveal } from '@/components/animations/Reveal'

/**
 * Our clients — a hairline logo wall.
 *
 * Thirty marks of wildly different shapes, colours and resolutions, so the
 * grid does the unifying: every logo sits centred in an identical white cell,
 * capped to the same height, and the cells are separated by 1px of the rule
 * colour showing through a `gap-px` grid rather than per-cell borders (no
 * doubled lines, no odd-row arithmetic). Logos stay in full colour and lift
 * slightly on hover.
 *
 * Two across on phones, three on tablets, six on desktop — 30 logos make
 * exact rows at every step, so the plate never ends on a ragged row (which
 * the `gap-px` technique would show as a tinted empty cell).
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
          className="mb-12 md:mb-16"
        />

        <Reveal>
          <ul className="grid grid-cols-2 gap-px border border-charcoal/10 bg-charcoal/10 sm:grid-cols-3 lg:grid-cols-6">
            {clients.map((client, i) => {
              const logo = (
                <img
                  src={client.src}
                  alt={client.name}
                  title={client.name}
                  width={client.width}
                  height={client.height}
                  loading={i < 10 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-auto max-h-16 w-auto max-w-[85%] object-contain transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-110 sm:max-h-20 lg:max-h-24"
                />
              )
              // Only marks with a confirmed site are links; the rest stay
              // plain images so nothing on the wall is a dead end.
              return (
                <li key={client.src} className="bg-white">
                  {client.url ? (
                    <a
                      href={client.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${client.name} (opens in a new tab)`}
                      className="group flex h-28 items-center justify-center px-5 sm:h-32 lg:h-40 lg:px-8"
                    >
                      {logo}
                    </a>
                  ) : (
                    <div className="group flex h-28 items-center justify-center px-5 sm:h-32 lg:h-40 lg:px-8">
                      {logo}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
