import type { ReactNode } from 'react'

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Sets the given phrases of a plain-text sentence in bold, leaving the source
 * string untouched so it can still be used verbatim (metadata, structured
 * data). Phrases are matched exactly and wrapped in <strong>.
 */
export function emphasise(text: string, phrases: readonly string[]): ReactNode[] {
  if (phrases.length === 0) return [text]
  const pattern = new RegExp(`(${phrases.map(escape).join('|')})`, 'g')
  return text.split(pattern).map((part, i) =>
    phrases.includes(part) ? (
      <strong key={i} className="font-semibold text-neutral-10">
        {part}
      </strong>
    ) : (
      part
    ),
  )
}
