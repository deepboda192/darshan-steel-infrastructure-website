import { clients } from '@/data/clients'

/**
 * Our clients — the brand wall.
 *
 * A ruled line with the section heading at its centre, then every client
 * mark on a hairline grid: four across on desktop, three on tablets, two on
 * phones. Every mark is letterboxed into the same 160 × 72 box, so square and
 * wide marks read as one family, and scales up a touch when its cell is
 * hovered. Cells draw their own borders and overlap by a pixel, so the rules
 * stay a single hairline and an incomplete last row needs no filler. Marks
 * with a verified site link out in a new tab.
 */
export function Clients() {
  return (
    <section className="m-section" aria-label="Our clients">
      <div className="m-container">
        <div className="flex flex-col gap-[72px] max-md:gap-[54px] max-xs:gap-11" data-reveal="up">
          <div className="flex flex-col items-center gap-6">
            <div className="flex w-full items-center gap-10">
              <span aria-hidden="true" className="h-px flex-1 bg-secondary/20 max-xs:hidden" />
              <h2 className="m-h2 flex-none text-center max-xs:flex-auto">
                <span className="text-accent">Trusted</span> across industries.
              </h2>
              <span aria-hidden="true" className="h-px flex-1 bg-secondary/20 max-xs:hidden" />
            </div>
            <p className="m-paragraph medium max-w-[600px] text-center">
              A selection of the businesses DSI has built for — across paper, beverages, ceramics,
              forging, energy, automotive and more.
            </p>
          </div>

          <ul className="grid grid-cols-4 pb-px pr-px max-lg:grid-cols-3 max-md:grid-cols-2">
            {clients.map((client) => {
              const mark = (
                <img
                  src={client.src}
                  alt={client.name}
                  width={client.width}
                  height={client.height}
                  loading="lazy"
                  decoding="async"
                  className="h-[72px] w-[160px] object-contain transition-transform duration-300 ease-out group-hover:scale-[1.06] max-md:h-14 max-md:w-[124px]"
                />
              )
              return (
                <li
                  key={client.src}
                  className="group -mb-px -mr-px flex h-[132px] items-center justify-center border border-black/10 px-6 max-md:h-[104px] max-md:px-4"
                >
                  {client.url ? (
                    <a
                      href={client.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="block"
                    >
                      {mark}
                    </a>
                  ) : (
                    mark
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
