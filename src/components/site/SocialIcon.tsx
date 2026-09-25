import type { ReactNode } from 'react'

export type Network = 'facebook' | 'instagram' | 'linkedin' | 'x' | 'youtube'

/**
 * Brand glyphs for the footer's social buttons. Facebook, Instagram, LinkedIn
 * and X are the reference's own drawings; YouTube is added in the same filled
 * style. Each keeps its native box so the set sits optically even at 44px.
 */
const GLYPHS: Record<Network, { viewBox: string; width: number; height: number; body: ReactNode }> = {
  facebook: {
    viewBox: '0 0 24 24',
    width: 24,
    height: 24,
    body: (
      <path d="M9.1592 6.10111V8.74342H7.22266V11.9741H9.1592V21.5761H13.1342V11.9752H15.8025C15.8025 11.9752 16.0524 10.4262 16.1736 8.73188H13.1505V6.52226C13.1505 6.19246 13.5832 5.74823 14.0121 5.74823H16.1793V2.38477H13.2333C9.06015 2.38477 9.1592 5.61841 9.1592 6.10111Z" />
    ),
  },
  instagram: {
    viewBox: '0 0 19 19',
    width: 19,
    height: 19,
    body: (
      <>
        <path d="M9.49965 6.33313C7.75078 6.33313 6.33301 7.75089 6.33301 9.49977C6.33301 11.2487 7.75078 12.6665 9.49965 12.6665C11.2486 12.6665 12.6664 11.2487 12.6664 9.49977C12.6664 7.75089 11.2486 6.33313 9.49965 6.33313Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.7 0C2.55198 0 0 2.55198 0 5.7V13.3C0 16.448 2.55198 19 5.7 19H13.3C16.448 19 19 16.448 19 13.3V5.7C19 2.55198 16.448 0 13.3 0H5.7ZM5.06666 9.5C5.06666 7.05154 7.05154 5.06666 9.5 5.06666C11.9484 5.06666 13.9334 7.05154 13.9334 9.5C13.9334 11.9484 11.9484 13.9334 9.5 13.9334C7.05154 13.9334 5.06666 11.9484 5.06666 9.5ZM13.9334 5.06666H15.2V3.8H13.9334V5.06666Z"
        />
      </>
    ),
  },
  linkedin: {
    viewBox: '0 0 19 18',
    width: 19,
    height: 18,
    body: (
      <path d="M3.98741 1.9947C3.98714 2.52346 3.77684 3.03047 3.40276 3.40417C3.02868 3.77788 2.52147 3.98767 1.99271 3.98741C1.46394 3.98714 0.956943 3.77684 0.583238 3.40276C0.209533 3.02868 -0.000264132 2.52147 2.49573e-07 1.99271C0.000264631 1.46394 0.210568 0.956943 0.584648 0.583238C0.958727 0.209533 1.46594 -0.000264132 1.9947 2.49573e-07C2.52346 0.000264631 3.03047 0.210568 3.40417 0.584648C3.77788 0.958727 3.98767 1.46594 3.98741 1.9947ZM4.04722 5.46375H0.0598113V17.9443H4.04722V5.46375ZM10.3473 5.46375H6.37985V17.9443H10.3075V11.395C10.3075 7.74654 15.0624 7.40761 15.0624 11.395V17.9443H19V10.0393C19 3.88872 11.9622 4.118 10.3075 7.13846L10.3473 5.46375Z" />
    ),
  },
  x: {
    viewBox: '0 0 20 19',
    width: 20,
    height: 19,
    body: (
      <path d="M15.75 0H18.8171L12.1171 7.67714L20 18.1257H13.8286L8.99143 11.79L3.46286 18.1257H0.392857L7.55857 9.91143L0 0.00142855H6.32857L10.6943 5.79143L15.75 0ZM14.6714 16.2857H16.3714L5.4 1.74429H3.57714L14.6714 16.2857Z" />
    ),
  },
  youtube: {
    viewBox: '0 0 24 24',
    width: 22,
    height: 22,
    body: (
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    ),
  },
}

/** Maps a label from data/company.ts ("LinkedIn", "X", "Twitter"…) to a glyph. */
function networkFor(label: string): Network | null {
  const key = label.trim().toLowerCase()
  if (key === 'x' || key === 'twitter') return 'x'
  return (Object.keys(GLYPHS) as Network[]).find((n) => n === key) ?? null
}

/** The glyph for a network label, or `fallback` when the label is not one we draw. */
export function SocialIcon({ label, fallback = null }: { label: string; fallback?: ReactNode }) {
  const network = networkFor(label)
  if (!network) return fallback
  const glyph = GLYPHS[network]
  return (
    <svg
      width={glyph.width}
      height={glyph.height}
      viewBox={glyph.viewBox}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className="block"
    >
      {glyph.body}
    </svg>
  )
}
