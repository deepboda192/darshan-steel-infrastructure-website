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

/** A catalogue frame-type drawing: a transparent PNG shown on the card head. */
const frame = (code: string, alt: string): SiteImage => ({
  src: `/images/peb-frame-${code}.png`,
  alt,
  plate: 'frames',
  label: code.toUpperCase(),
})

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

  /**
   * About: DSI's own photographs of the works — the drone view beside the stat
   * plate, the shop floor beneath it. WebPs supplied by DSI, so they bypass
   * the .jpg helper.
   */
  aboutPrimary: {
    src: '/images/works-aerial.webp',
    alt: 'Aerial view of the Darshan Steel Infrastructure works and yard at Rajkot, surrounded by farmland',
    plate: 'aerial',
    label: 'DSI — THE WORKS FROM ABOVE',
    focus: '45% 50%',
  } satisfies SiteImage,
  aboutSecondary: {
    src: '/images/works-interior.webp',
    alt: 'Inside the DSI fabrication shop: a long steel-framed bay with overhead cranes and machinery either side of the aisle',
    plate: 'plant',
    label: 'DSI — SHOP FLOOR',
    focus: '50% 50%',
  } satisfies SiteImage,

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

  /**
   * DSI's own photograph of a double-girder EOT crane on its crane beams
   * inside a pre-engineered building, cropped from the product catalogue's
   * Crane Beam System page. Shown on the Primary System page. A WebP, so it
   * bypasses the .jpg helper.
   */
  craneSystem: {
    src: '/images/crane-beam-system.webp',
    alt: 'Double-girder EOT crane running on crane beams inside a DSI pre-engineered building',
    plate: 'plant',
    label: 'FIG. 16 — CRANE BEAM SYSTEM',
    focus: '50% 50%',
  } satisfies SiteImage,

  /**
   * The catalogue's "Structural systems & its components" poster, recoloured
   * from the old red to the brand blue on 2026-09-27. A WebP, so it bypasses
   * the .jpg helper. Shown beside the Primary System intro.
   */
  structuralSystems: {
    src: '/images/structural-systems.webp',
    alt: 'A tower crane lowering a roof onto a table of the five structural systems of a pre-engineered building: primary, secondary, mezzanine and cladding systems, and accessories',
    plate: 'frames',
    label: 'FIG. 20 — STRUCTURAL SYSTEMS',
    focus: '50% 50%',
  } satisfies SiteImage,

  /**
   * The catalogue's "Top running crane" drawing, recoloured for the dark crane
   * band on 2026-09-28: the red frame to the brand blue, outlines and labels
   * to white, the crane bridge kept yellow. A transparent PNG.
   */
  craneDrawing: {
    src: '/images/crane-top-running.png',
    alt: 'Top running crane drawn in section: the crane bridge and hoist on crane beams, carried by column brackets on a rigid frame above the finished floor level',
    plate: 'frames',
    label: 'FIG. 21 — TOP RUNNING CRANE',
  } satisfies SiteImage,

  /**
   * Primary System page: a photograph for each part and for each of the six
   * frame types, chosen to show the configuration. Stock photographs; sources
   * in CREDITS.md.
   */
  pebParts: {
    framing: img(
      'peb-primary-framing',
      'Grey steel main frames of a pre-engineered building under erection, with purlins and girts fixed and mountains behind',
      'frames',
      'FIG. 17 — PRIMARY FRAMING',
      '50% 50%',
    ),
    canopy: img(
      'peb-canopy-fascia',
      'Curved steel canopy cantilevered over the rolling-shutter door of a white and grey clad pre-engineered shed',
      'warehouse',
      'FIG. 18 — CANOPY',
      '50% 40%',
    ),
    bracing: {
      src: '/images/peb-bracing.webp',
      alt: 'Inside a pre-engineered building: rod X-bracing in the sidewall bays between the columns, with girts and wall sheeting behind',
      plate: 'frames',
      label: 'FIG. 19 — BRACING',
      focus: '60% 50%',
    } satisfies SiteImage,
  },
  /**
   * The catalogue's eight frame-type drawings, recoloured from red to the
   * brand blue on 2026-09-28. Transparent PNGs, so they bypass the .jpg helper.
   */
  pebFrames: {
    CS: frame('cs', 'Clear span frame: one rigid frame from sidewall to sidewall, practical width 50 m'),
    'MS-1': frame('ms-1', 'Multi-span 1 frame: one line of interior columns, practical width module 70 m'),
    'MS-2': frame('ms-2', 'Multi-span 2 frame: two lines of interior columns, practical width module 90 m'),
    'MS-3': frame('ms-3', 'Multi-span 3 frame: three lines of interior columns, practical width module 120 m'),
    MG: frame('mg', 'Multi-gable frame: two gables sharing a valley column, practical width module 80 m'),
    RS: frame('rs', 'Roof system: a gabled roof frame on supports not by DSI, practical width 30 m'),
    SS: frame('ss', 'Single slope frame: the roof falling to one side, practical width 50 m'),
    LT: frame('lt', 'Lean-to frame: a single slope borrowing support from an existing building, practical width 24 m'),
  },

  /** Photograph beside the enquiry form. */
  safety: img(
    'safety-site-crew',
    'Site crew in hard hats and high-visibility vests on an active site',
    'erection',
    'FIG. 08 — ERECTION',
  ),

  /** Backdrop behind the closing call to action and footer. */
  /* Inner-page heroes: the projects index and every project record. */
  /** Projects index hero: DSI's drone photo of the Fortune Enterprise logistics facility (user's choice, 2026-09-28). */
  projectsHero: img(
    'projects-hero',
    'Drone view of the Fortune Enterprise logistics facility at Rajkot: three red and white pre-engineered sheds with turbo ventilators along their roofs, beside a canal',
    'erection',
    'FIG. 07 — FORTUNE ENTERPRISE',
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
  /** About PEB page hero. */
  pebHero: img(
    'banner-solutions',
    'Steel portal frames of a pre-engineered building under construction',
    'frames',
    'FIG. 15 — PEB',
    '50% 50%',
  ),
  /** About page hero: DSI's own drone view of the works (user's choice, 2026-09-28). */
  aboutHero: {
    src: '/images/works-aerial.webp',
    alt: 'Aerial view of the Darshan Steel Infrastructure works and yard at Rajkot, surrounded by farmland',
    plate: 'aerial',
    label: 'FIG. 09 — THE WORKS FROM ABOVE',
    focus: '50% 45%',
  } satisfies SiteImage,
  /** The "Our projects" plate on the About page: DSI's own drone photo of the G.M. Engineering plant (2026-09-28). */
  aboutProjects: img(
    'about-projects',
    'Drone view of the G.M. Engineering plant at Rajkot: a white pre-engineered building with blue trim, beside farmland',
    'warehouse',
    'FIG. 10 — G.M. ENGINEERING',
    '55% 55%',
  ),
  aboutFilm: img('banner-manufacturing', 'CNC laser cutter profiling a steel plate', 'plant', 'FIG. 11 — THE WORKS'),
  aboutBand: img('gallery-frame-sky', 'Steel portal frame standing against an overcast sky', 'frames', 'FIG. 12 — PORTAL FRAME'),
  /**
   * Secondary System page hero: the home hero's portal frames seen from below,
   * with the purlins, girts and eave line fixed. Same file, framed on the eave.
   */
  secondarySystemHero: img(
    'hero-steel-frame',
    'Steel portal frames seen from below with purlins, girts and the eave strut fixed, against a dusk sky',
    'frames',
    'SECONDARY SYSTEM',
    '50% 35%',
  ),
  /**
   * The Z-section and C-section profiles cropped from the catalogue's
   * secondary-system drawing on 2026-09-28. A transparent PNG, shown beside
   * the Secondary System intro.
   */
  secondarySections: {
    src: '/images/secondary-sections.png',
    alt: 'Two grey cold-formed steel profiles drawn in perspective and labelled: a Z-section above and a C-section below',
    plate: 'frames',
    label: 'FIG. 25 — Z AND C SECTIONS',
  } satisfies SiteImage,
  /** Secondary System page: a photograph for each part. Sources in CREDITS.md. */
  secondaryParts: {
    purlins: img(
      'primary-system-hero',
      'Z-purlins spanning between the rafters of a pre-engineered building under erection, with crane beams below them',
      'frames',
      'FIG. 22 — PURLINS',
      '50% 35%',
    ),
    girts: {
      src: '/images/peb-bracing.webp',
      alt: 'Inside a pre-engineered building: galvanized girts running between the columns behind the wall sheeting, with rod bracing across the bay',
      plate: 'frames',
      label: 'FIG. 23 — GIRTS',
      focus: '65% 50%',
    } satisfies SiteImage,
    eaveStrut: img(
      'peb-primary-framing',
      'Main frames under erection with the eave strut and purlins fixed along the top of the sidewall columns',
      'frames',
      'FIG. 24 — EAVE STRUT',
      '50% 30%',
    ),
  },
  /**
   * The catalogue's two mezzanine details, recoloured on 2026-09-28 from the
   * old red to the brand blue; the grey steel, the concrete and the labels
   * are left as drawn. Transparent PNGs, shown on the Mezzanine Floors page.
   */
  mezzanineDrawings: {
    section: {
      src: '/images/mezzanine-section.png',
      alt: 'Section through a mezzanine floor: a reinforced concrete slab, marked as not provided by DSI, on a profiled deck panel carried by blue mezzanine joists bolted into the web of a mezzanine beam',
      plate: 'frames',
      label: 'FIG. 26 — MEZZANINE SECTION',
    } satisfies SiteImage,
    edge: {
      src: '/images/mezzanine-edge.png',
      alt: 'Mezzanine edge detail at the sidewall: the mezzanine beam bolted to the main-frame column, the deck panel and slab stopping short of the sidewall girt and panel behind a mezzanine edge trim',
      plate: 'frames',
      label: 'FIG. 27 — MEZZANINE EDGE',
    } satisfies SiteImage,
  },
  /**
   * Mezzanine Floors page: the hero and a photograph for each part. Stock
   * photographs from Pexels and Unsplash; sources in CREDITS.md.
   */
  mezzanineHero: img(
    'mezzanine-hero',
    'Empty pre-engineered warehouse with a blue steel frame and a mezzanine office block along one wall, reached by a blue steel staircase',
    'warehouse',
    'MEZZANINE FLOORS',
    '55% 55%',
  ),
  mezzanineParts: {
    beams: img(
      'mezzanine-beams',
      'Grey steel beams and columns carrying grating floor panels and a handrail on an upper level, seen from below',
      'frames',
      'FIG. 28 — MEZZANINE BEAMS',
      '50% 45%',
    ),
    deck: img(
      'mezzanine-deck',
      'Chequered steel plate floor of a mezzanine walkway with a handrail along its open edge and steel storage units beside it',
      'plant',
      'FIG. 29 — MEZZANINE DECK',
      '40% 60%',
    ),
    handrails: img(
      'mezzanine-handrails',
      'Galvanized steel stairs and landings with post-and-rail handrails against a dark wall',
      'frames',
      'FIG. 30 — HANDRAILS',
      '50% 40%',
    ),
    stair: img(
      'mezzanine-stair',
      'Two red steel staircases with tubular handrails rising to a mezzanine floor inside a building',
      'plant',
      'FIG. 31 — STAIRCASE',
      '50% 50%',
    ),
  },
  /**
   * Cladding System page: the hero is DSI's own aerial of the works, framed
   * on its roofs; wall cladding is DSI's own shed photograph; the rest are
   * stock photographs from Pexels. Sources in CREDITS.md.
   */
  claddingHero: {
    src: '/images/works-aerial.webp',
    alt: 'Aerial view of the white roof and wall sheeting of the Darshan Steel Infrastructure works at Rajkot, with farmland around',
    plate: 'aerial',
    label: 'CLADDING SYSTEM',
    focus: '50% 42%',
  } satisfies SiteImage,
  claddingParts: {
    roof: img(
      'cladding-roof',
      'Grey trapezoidal steel roof sheeting over a yellow clad wall, with the eave gutter and a downspout',
      'warehouse',
      'FIG. 32 — ROOF CLADDING',
      '50% 40%',
    ),
    wall: img(
      'peb-canopy-fascia',
      'White and grey colour-coated wall cladding of a DSI shed, with a curved canopy over the rolling-shutter door',
      'warehouse',
      'FIG. 33 — WALL CLADDING',
      '60% 45%',
    ),
    standingSeam: img(
      'cladding-standing-seam',
      'Dark seamed metal roof panels with raised seams running down the slope past a rooflight',
      'frames',
      'FIG. 34 — STANDING SEAM',
      '50% 50%',
    ),
    components: img(
      'cladding-components',
      'Blue profiled wall sheeting under a white eave flashing and corner trim, fixed with screws',
      'frames',
      'FIG. 35 — FLASHINGS',
      '50% 45%',
    ),
  },
  /**
   * Accessories page: the hero and a photograph for each part. Stock
   * photographs from Pexels; sources in CREDITS.md.
   */
  accessoriesHero: img(
    'accessories-hero',
    'A row of roof ventilators along the ridge of a curved metal roof, with steam rising past them',
    'plant',
    'ACCESSORIES',
    '50% 45%',
  ),
  accessoryParts: {
    ventilation: img(
      'accessory-ventilator',
      'A stainless steel turbine ventilator on its base, with a vent pipe beside it against a cloudy sky',
      'plant',
      'FIG. 36 — TURBO VENTILATOR',
      '50% 55%',
    ),
    daylight: img(
      'accessory-daylight',
      'An industrial roof seen from below, with translucent daylight panels set between the steel sheets and purlins',
      'frames',
      'FIG. 37 — DAYLIGHT PANELS',
      '50% 45%',
    ),
    louvers: img(
      'accessory-louvers',
      'Two louver panels set into grey profiled wall cladding',
      'warehouse',
      'FIG. 38 — LOUVERS',
      '50% 50%',
    ),
    insulation: img(
      'accessory-insulation',
      'Fibreglass insulation blanket being fitted between framing members by a worker in gloves',
      'plant',
      'FIG. 39 — INSULATION',
      '40% 50%',
    ),
    access: img(
      'accessory-ladder',
      'A galvanized cage ladder fixed to the clad wall of an industrial building, rising to the roof against a blue sky',
      'warehouse',
      'FIG. 40 — CAGE LADDER',
      '50% 40%',
    ),
  },
  /** Primary System page hero: main frames, purlins and crane beams against a clear sky. */
  primarySystemHero: img(
    'primary-system-hero',
    'Grey steel columns, rafters, crane beams and purlins of a pre-engineered building under erection against a clear blue sky',
    'frames',
    'PRIMARY SYSTEM',
    '50% 45%',
  ),
  quality: img('quality-inspection', 'Inspector in a hard hat checking a fabricated steel component', 'blueprint', 'FIG. 13 — INSPECTION'),
  worksWeld: img('manufacturing-weld', 'Close-up of a welder joining a fabricated steel member', 'plant', 'FIG. 14 — WELDING'),
  footer: img(
    'footer-steel-frames',
    'Grey steel main frames of a pre-engineered building under erection against mountains',
    'frames',
    'FOOTER',
    '50% 55%',
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

/** DSI's drone footage of the works, behind the About page's tagline band (user's choice, 2026-09-28). */
export const droneVideo = {
  src: '/videos/dsi-drone-shot.mp4',
  type: 'video/mp4',
} as const
