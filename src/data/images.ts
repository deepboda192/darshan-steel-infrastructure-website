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
  hero: img(
    'hero-steel-frame',
    'Steel portal frames and purlins of an industrial building rising against the sky',
    'frames',
    'FIG. 01 — PRIMARY FRAMING',
    '50% 45%',
  ),

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

  manufacturing: img(
    'manufacturing-shop',
    'Fabrication shop with machinery running the length of the bay',
    'plant',
    'FIG. 04 — FABRICATION',
  ),
  manufacturingDetail: img(
    'manufacturing-weld',
    'Close-up of a welder joining a fabricated steel member',
    'blueprint',
    'WELD DETAIL',
  ),

  engineering: img(
    'engineering-drawings',
    'Structural drawings laid out with drafting pencils and a steel rule',
    'blueprint',
    'FIG. 05 — CONNECTION DETAIL',
  ),

  quality: img(
    'quality-inspection',
    'Inspector in a hard hat checking a fabricated steel component',
    'plant',
    'FIG. 07 — INSPECTION',
  ),
  safety: img(
    'safety-site-crew',
    'Site crew in hard hats and high-visibility vests on an active site',
    'erection',
    'FIG. 08 — ERECTION',
  ),

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

  careers: img(
    'careers-crew',
    'Construction crew in hard hats gathered on site',
    'plant',
    'DSI — TEAM',
  ),

  /* ---------------------------------------------------------- PAGE BANNERS */
  pageBanners: {
    about: img('banner-about', 'Steel structure detail against an open sky', 'frames', 'ABOUT'),
    solutions: img(
      'banner-solutions',
      'Large industrial warehouse with loading gates',
      'warehouse',
      'SOLUTIONS',
    ),
    industries: img(
      'banner-industries',
      'Interior of a working factory building',
      'aerial',
      'INDUSTRIES',
    ),
    manufacturing: img(
      'banner-manufacturing',
      'CNC laser cutter profiling a steel plate',
      'plant',
      'MANUFACTURING',
    ),
    projects: img(
      'banner-projects',
      'Building under construction with tower cranes behind it',
      'erection',
      'PROJECTS',
    ),
    quality: img(
      'engineering-blueprints',
      'Engineering blueprints spread across a work surface',
      'blueprint',
      'QUALITY',
    ),
    contact: img(
      'banner-contact',
      'Dark steel frame silhouetted against a pale sky',
      'frames',
      'CONTACT',
    ),
    careers: img(
      'banner-careers',
      'Roofing machine at work inside a building under construction',
      'plant',
      'CAREERS',
    ),
  },
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
