import { Check } from 'lucide-react'
import type { BlogBlock } from '@/data/blogs'
import { ImageFrame } from '@/components/media/ImageFrame'

/**
 * Renders an article's blocks with the site's typography: question headings
 * that the sidebar links to, paragraphs at reading size, checklists, a
 * responsive comparison table, captioned figures and accent callouts.
 */
export function BlogBody({ blocks }: { blocks: BlogBlock[] }) {
  let ordered = 0
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2 key={block.id} id={block.id} className="m-h4 scroll-mt-28 pt-6 first:pt-0">
                {block.text}
              </h2>
            )
          case 'h3':
            return (
              <h3 key={i} className="m-h5 pt-2">
                {block.text}
              </h3>
            )
          case 'p':
            return (
              <p key={i} className="text-[18px] leading-[1.65] text-neutral-8 max-md:text-[16px]">
                {block.text}
              </p>
            )
          case 'ul':
            return (
              <ul key={i} className="flex flex-col gap-3.5 border border-black/10 bg-neutral-1 p-7 max-xs:p-5">
                {block.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[17px] leading-[1.55] text-neutral-8 max-md:text-[16px]">
                    <Check size={18} strokeWidth={2.2} aria-hidden="true" className="mt-1 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            )
          case 'ol':
            ordered += 1
            return (
              <ol key={i} className="flex flex-col gap-3.5" aria-label={`Steps ${ordered}`}>
                {block.items.map((item, n) => (
                  <li key={item} className="flex items-start gap-4 text-[17px] leading-[1.55] text-neutral-8 max-md:text-[16px]">
                    <span className="m-icon-box h-8 min-w-8 shrink-0 font-heading text-[13px] font-bold tabular-nums">
                      {String(n + 1).padStart(2, '0')}
                    </span>
                    <span className="pt-1">{item}</span>
                  </li>
                ))}
              </ol>
            )
          case 'table':
            return (
              <figure key={i} className="my-2 overflow-hidden border border-black/10">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] border-collapse text-left text-[15px] leading-[1.5]">
                    <caption className="sr-only">{block.caption}</caption>
                    <thead>
                      <tr className="bg-secondary text-white">
                        {block.head.map((cell, c) => (
                          <th key={cell} scope="col" className={c === 0 ? 'w-[22%] px-5 py-4 font-heading text-[15px] font-bold' : 'px-5 py-4 font-heading text-[15px] font-bold'}>
                            {cell}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row) => (
                        <tr key={row[0]} className="border-t border-black/10 align-top odd:bg-white even:bg-neutral-1">
                          {row.map((cell, c) =>
                            c === 0 ? (
                              <th key={c} scope="row" className="px-5 py-4 font-heading text-[15px] font-semibold text-neutral-10">
                                {cell}
                              </th>
                            ) : (
                              <td key={c} className="px-5 py-4 text-neutral-8">
                                {cell}
                              </td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <figcaption className="border-t border-black/10 bg-neutral-1 px-5 py-3 text-[13px] text-neutral-6">{block.caption}</figcaption>
              </figure>
            )
          case 'image':
            return (
              <figure key={i} className="my-2 border border-black/10 bg-white p-3">
                <ImageFrame image={block.image} ratio="16/9" sizes="(min-width: 1024px) 60vw, 100vw" captioned />
                <figcaption className="mt-3 px-2 text-[14px] leading-[1.5] text-neutral-6">{block.caption}</figcaption>
              </figure>
            )
          case 'callout':
            return (
              <aside key={i} className="my-2 border-l-4 border-accent bg-neutral-1 px-7 py-6 max-xs:px-5" aria-label={block.title}>
                <p className="font-heading text-[18px] font-bold leading-(--lh-sm) text-neutral-10">{block.title}</p>
                <p className="mt-2 text-[16px] leading-[1.6] text-neutral-8">{block.text}</p>
              </aside>
            )
        }
      })}
    </div>
  )
}
