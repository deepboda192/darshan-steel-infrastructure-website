/**
 * ============================================================================
 * CENTRALISED IMAGE CONFIGURATION
 * ============================================================================
 * Every photograph on the site is referenced from this file. Components never
 * hard-code an image path.
 *
 * WHAT IS HERE NOW
 * ----------------
 * Licensed stock photography from Unsplash, downloaded into public/images/ so
 * the site has no runtime dependency on a third-party CDN. Sources are listed
 * in public/images/CREDITS.md. Re-fetch or extend the set with:
 *
 *     node scripts/fetch-photography.mjs
 *
 * These are STOCK PHOTOGRAPHS, not DSI's own buildings. They set the right
 * tone, but they do not depict DSI work.
 *
 * SWAPPING IN REAL DSI PHOTOGRAPHY
 * --------------------------------
 * Easiest: overwrite the file in public/images/ keeping the same filename —
 * nothing in the code changes. Otherwise drop the new file in, point `src` at
 * it here, and rewrite `alt` to describe what is actually in the frame.
 *
 * THE `plate` FIELD
 * -----------------
 * A procedurally drawn engineering scene (components/media/TechnicalPlate.tsx)
 * used only if `src` is ever emptied, so a missing file degrades to brand
 * artwork rather than a broken image. It is not rendered while `src` is set.
 * ============================================================================
 */

/** Fallback scenes in components/media/TechnicalPlate.tsx */
export type PlateKind =
  | 'frames'
  | 'erection'
  | 'plant'
  | 'blueprint'
  | 'warehouse'
  | 'coldstore'
  | 'aerial'

export type SiteImage = {
  /** Path under /public, or an absolute URL. Empty string → TechnicalPlate. */
  src: string
  /** Meaningful alt text. Required for accessibility. */
  alt: string
  /** Scene drawn only if `src` is empty. */
  plate: PlateKind
  /** Small technical caption drawn onto the fallback plate. */
  label: string
  /** Optional focal point for object-position, e.g. '50% 35%'. */
  focus?: string
}

const img = (
  src: string,
  alt: string,
  plate: PlateKind,
  label: string,
  focus?: string,
): SiteImage => ({ src: src ? `/images/${src}.jpg` : '', alt, plate, label, focus })

export const siteImages = {
  /* -------------------------------------------------------------------- HOME */
  /** Hero backdrop. */
  hero: img(
    'hero-steel-frame',
    'Steel portal frames and purlins of an industrial building rising against the sky',
    'frames',
    'FIG. 01 — PRIMARY FRAMING',
    '50% 45%',
  ),

  /** The six building types — used by data/solutions.ts. */
  whatWeBuild: {
    industrialSheds: img(
      'solution-industrial-shed',
      'Steel framework of a large industrial shed under construction',
      'warehouse',
      'IND. SHED',
    ),
    warehouses: img(
      'solution-warehouse',
      'High-bay warehouse interior lined with storage racking',
      'aerial',
      'WAREHOUSE',
    ),
    factoryBuildings: img(
      'solution-factory',
      'Factory floor filled with production machinery under a steel roof',
      'plant',
      'FACTORY',
    ),
    coldStorage: img(
      'solution-cold-storage',
      'Tall racking stacked with cartons inside a temperature-controlled store',
      'coldstore',
      'COLD STORE',
    ),
    commercial: img(
      'solution-commercial',
      'Commercial building elevation seen from a low angle',
      'frames',
      'COMMERCIAL',
    ),
    custom: img(
      'solution-custom',
      'Steel beams and roof sheeting on a building under construction',
      'blueprint',
      'CUSTOM',
    ),
  },

  /** About: the works, then the site. */
  aboutPrimary: img(
    'about-site-team',
    'Two workers inside a large steel-framed building under construction',
    'frames',
    'DSI — WORKS',
  ),
  aboutSecondary: img(
    'about-site-work',
    'Workers on an active industrial construction site',
    'erection',
    'DSI — SITE',
  ),

  /** The works on the about page. */
  manufacturing: img(
    'manufacturing-shop',
    'Fabrication shop with machinery running the length of the bay',
    'plant',
    'FIG. 04 — FABRICATION',
  ),

  /**
   * DSI's own drone photograph of the works at Rajkot — the backdrop behind
   * the Why DSI plate. A WebP supplied by DSI, so it bypasses the .jpg helper.
   */
  worksAerial: {
    src: '/images/works-aerial.webp',
    alt: 'Aerial view of the Darshan Steel Infrastructure works and yard at Rajkot, surrounded by farmland',
    plate: 'aerial',
    label: 'FIG. 05 — THE WORKS FROM ABOVE',
    focus: '50% 55%',
  } satisfies SiteImage,

  /** Photograph beside the enquiry form. */
  safety: img(
    'safety-site-crew',
    'Site crew in hard hats and high-visibility vests on an active site',
    'erection',
    'FIG. 08 — ERECTION',
  ),

  /** Backdrop behind the closing call to action and footer. */
  /* Inner-page heroes: the projects index and every project record. */
  projectsHero: img(
    'banner-projects',
    'Building under construction with tower cranes behind it',
    'erection',
    'FIG. 07 — PROJECTS',
    '50% 45%',
  ),
  projectHero: img(
    'banner-industries',
    'Interior of a working factory building',
    'aerial',
    'FIG. 08 — PROJECT RECORD',
    '50% 50%',
  ),
  /* About page: hero, the small projects still, the film poster, the
     tagline band, shop-and-site and the second works. */
  aboutHero: img('banner-about', 'Steel structure detail against an open sky', 'frames', 'FIG. 09 — ABOUT', '50% 50%'),
  aboutProjects: img('gallery-site-progress', 'Plant working beside a partly clad steel building', 'warehouse', 'FIG. 10 — SITE PROGRESS'),
  aboutFilm: img('banner-manufacturing', 'CNC laser cutter profiling a steel plate', 'plant', 'FIG. 11 — THE WORKS'),
  aboutBand: img('gallery-frame-sky', 'Steel portal frame standing against an overcast sky', 'frames', 'FIG. 12 — PORTAL FRAME'),
  quality: img('quality-inspection', 'Inspector in a hard hat checking a fabricated steel component', 'blueprint', 'FIG. 13 — INSPECTION'),
  worksWeld: img('manufacturing-weld', 'Close-up of a welder joining a fabricated steel member', 'plant', 'FIG. 14 — WELDING'),
  footer: img(
    'banner-projects',
    'Building under construction with tower cranes behind it',
    'erection',
    'PROJECTS',
  ),
} as const

/**
 * Pool used for project case-study galleries. Each project draws four of these,
 * offset by its index, so no two records show the same set in the same order.
 * Replace with real per-project photography in data/projects.ts when available.
 */
export const galleryPool: SiteImage[] = [
  img('gallery-erection', 'Rigger working at height during steel erection', 'erection', 'PLATE'),
  img('gallery-weld-detail', 'Welding a steel joint, arc light on the metal', 'blueprint', 'PLATE'),
  img('gallery-shop-floor', 'Operator working a machine on the fabrication floor', 'plant', 'PLATE'),
  img('gallery-site-progress', 'Plant working beside a partly clad steel building', 'warehouse', 'PLATE'),
  img('gallery-frame-sky', 'Steel portal frame standing against an overcast sky', 'frames', 'PLATE'),
  img('gallery-racking', 'Labelled cartons on warehouse racking', 'aerial', 'PLATE'),
  img('gallery-structure-detail', 'Detail of a grey steel structure in daylight', 'frames', 'PLATE'),
  img('gallery-crane-lift', 'Crane lifting a load on an industrial site', 'erection', 'PLATE'),
]

/** Four gallery plates for a project, rotated by its position in the list. */
export function galleryFor(index: number, prefix: string): SiteImage[] {
  return Array.from({ length: 4 }, (_, i) => {
    const base = galleryPool[(index * 3 + i) % galleryPool.length]
    return {
      ...base,
      alt: `${prefix} — ${base.alt.toLowerCase()}`,
      label: `PLATE 0${i + 1}`,
    }
  })
}

/**
 * Motion backdrop for the hero. Never part of the first paint: the hero
 * photograph renders immediately and sections/HeroVideo attaches this file
 * only after the page's load event, so First Contentful Paint is unaffected.
 */
export const heroVideo = {
  src: '/videos/hero-loop.mp4',
  type: 'video/mp4',
} as const
