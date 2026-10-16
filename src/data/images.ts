/**
 * ============================================================================
 * CENTRALISED IMAGE CONFIGURATION
 * ============================================================================
 * Every photograph on the site is referenced from this file. Components never
 * hard-code an image path.
 *
 * WHAT IS HERE NOW
 * ----------------
 * Photographs live in public/images as WebP, each with smaller renditions
 * (name-480.webp, name-768.webp, …) and an entry in image-manifest.ts, all
 * written by `node scripts/optimize-images.mjs`. Drop a new JPEG or PNG into
 * the folder, run the script, and reference it here by its stem. Sources are
 * listed in public/images/CREDITS.md.
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
): SiteImage => ({ src: src ? `/images/${src}.webp` : '', alt, plate, label, focus })

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
      'Inside a long factory hall: an overhead crane lifting a steel rack above racks of stock and bundles of profiles on the floor',
      'plant',
      'FACTORY',
    ),
    coldStorage: img(
      'solution-cold-storage',
      'Tall racking stacked with cartons inside a temperature-controlled store',
      'coldstore',
      'COLD STORE',
    ),
    commercial: {
      src: '/images/commercial-structure.webp',
      alt: 'Three-storey steel-framed commercial building under construction, blue columns and beams with decking laid and a blue roof on, amid greenery',
      plate: 'frames',
      label: 'COMMERCIAL',
      focus: '50% 55%',
    } satisfies SiteImage,
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

  /**
   * DSI's own photograph of a welder at work on the shop floor, supplied on
   * 2026-10-11. The frame on the About page is landscape and the photo is
   * portrait, so the focal point sits low to keep the welder in view.
   */
  worksWelder: img(
    'works-welder',
    'A DSI welder in a yellow hard hat and mask welding a fabricated steel member on the shop floor, sparks flying',
    'plant',
    'FIG. 22 — SHOP FLOOR',
    '52% 95%',
  ),

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
    'footer-steel-frames',
    'Grey steel main frames of a pre-engineered building under erection, purlins and girts fixed, mountains behind',
    'frames',
    'FIG. 15 — PEB',
    '50% 45%',
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
    'Two-level steel mezzanine running the length of a pre-engineered building, with railings, a steel staircase and offices beneath, under a skylit roof',
    'warehouse',
    'MEZZANINE FLOORS',
    '50% 50%',
  ),
  mezzanineParts: {
    beams: img(
      'mezzanine-beams',
      'Grey steel beams and columns carrying grating floor panels and a handrail on an upper level, seen from below',
      'frames',
      'FIG. 28 — MEZZANINE BEAMS',
      '50% 45%',
    ),
    deck: {
      src: '/images/mezzanine-deck.webp',
      alt: 'Underside of a mezzanine floor: galvanized profiled deck sheet spanning between dark steel joists, bolted to the mezzanine beam on a steel column',
      plate: 'plant',
      label: 'FIG. 29 — MEZZANINE DECK',
      focus: '50% 40%',
    } satisfies SiteImage,
    handrails: img(
      'mezzanine-handrails',
      'Post-and-rail handrail along the open edge of a chequered-plate mezzanine walkway, with steel storage units on the other side',
      'frames',
      'FIG. 30 — HANDRAILS',
      '35% 55%',
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
  claddingHero: img(
    'cladding-hero',
    'Red and white profiled wall sheeting of a pre-engineered building, seen from below against a clear sky, with a red eave trim along the top',
    'warehouse',
    'CLADDING SYSTEM',
    '50% 60%',
  ),
  claddingParts: {
    roof: img(
      'cladding-roof',
      'Drone view straight down onto the white profiled roof sheeting of a DSI building: a gabled roof with ridge, rows of turbo ventilators and skylight strips at every bay',
      'aerial',
      'FIG. 32 — ROOF CLADDING',
      '50% 45%',
    ),
    wall: img(
      'cladding-wall',
      'Three-tone colour-coated wall cladding on a DSI shed: red and silver sheeting above a dark grey band with louvre panels, over a plastered base',
      'warehouse',
      'FIG. 33 — WALL CLADDING',
      '45% 50%',
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
      'Red and white profiled wall sheeting of a DSI shed running under a red eave flashing, with vertical corner and joint trims and screws along the rib lines',
      'frames',
      'FIG. 35 — FLASHINGS',
      '35% 45%',
    ),
  },
  /**
   * Accessories page: the hero and a photograph for each part. Stock
   * photographs from Pexels; sources in CREDITS.md.
   */
  accessoriesHero: img(
    'accessories-hero',
    'Aerial view of a DSI shed with red and white cladding, its roof lined with rows of turbo ventilators and skylight panels, a canopy along the loading front',
    'aerial',
    'ACCESSORIES',
    '50% 55%',
  ),
  accessoryParts: {
    ventilation: img(
      'accessory-ventilator',
      'A turbo ventilator on its base flashing on a DSI roof, with a long row of ventilators running along the ridge behind it over farmland',
      'plant',
      'FIG. 36 — TURBO VENTILATOR',
      '60% 55%',
    ),
    daylight: img(
      'accessory-daylight',
      'The roof of a DSI building from below: rafters and purlins carrying the sheeting, with strips of translucent daylight panels running along every bay',
      'frames',
      'FIG. 37 — DAYLIGHT PANELS',
      '50% 50%',
    ),
    louvers: img(
      'accessory-louvers',
      'A continuous band of louver panels along the upper wall of a DSI shed, between dark grey sheeting above and white sheeting below',
      'warehouse',
      'FIG. 38 — LOUVERS',
      '50% 60%',
    ),
    insulation: img(
      'accessory-insulation',
      'The roof of a DSI building from below: insulation blanket held by wire mesh over the purlins, under the roof sheet, with the rafter and rod bracing beneath',
      'plant',
      'FIG. 39 — INSULATION',
      '50% 45%',
    ),
    access: img(
      'accessory-ladder',
      'A galvanized cage ladder fixed to the clad wall of an industrial building, rising to the roof against a blue sky',
      'warehouse',
      'FIG. 40 — CAGE LADDER',
      '50% 40%',
    ),
  },
  /** Blogs index hero. Stock photograph from Unsplash; source in CREDITS.md. */
  blogsHero: img(
    'blog-hero',
    'Dark steel skeleton of a building under construction against a pale sky',
    'frames',
    'BLOGS',
    '50% 45%',
  ),
  /**
   * Article images, grouped by post. Stock photographs from Unsplash; sources
   * in CREDITS.md. The cover doubles as the article's hero and og:image.
   */
  blog: {
    pebVsConventional: {
      cover: img(
        'blog-peb-vs-conventional-cover',
        'White steel portal frames of a large pre-engineered hall under erection, with mobile cranes and an excavator working on the site',
        'erection',
        'FIG. 41 — PEB UNDER ERECTION',
        '50% 40%',
      ),
      steel: img(
        'blog-peb-vs-conventional-steel',
        'Primed steel portal frame of a pre-engineered building with its purlins and sag rods fixed, against a blue sky',
        'frames',
        'FIG. 42 — PEB FRAME',
        '50% 50%',
      ),
      concrete: img(
        'blog-peb-vs-conventional-concrete',
        'Reinforced concrete frame of a conventional building under construction, with formwork, scaffolding and workers on the top floor',
        'blueprint',
        'FIG. 43 — RCC FRAME',
        '50% 50%',
      ),
    },
  },
  /**
   * Manufacturing page: the hero is DSI's own shop-floor photograph; the
   * machine cards are stock photographs of the same machine types from
   * Pexels and Unsplash, chosen to show the process honestly until DSI's
   * own machine photographs replace them. Sources in CREDITS.md.
   */
  manufacturingHero: {
    src: '/images/works-interior.webp',
    alt: 'Inside the DSI fabrication shop: a long steel-framed bay with overhead cranes and machinery either side of the aisle',
    plate: 'plant',
    label: 'MANUFACTURING',
    focus: '50% 50%',
  } satisfies SiteImage,
  machines: {
    plasmaCnc: img('machine-plasma-cnc', 'CNC plasma torch cutting a shape from steel plate, the arc lighting the cut', 'plant', 'PLS-1', '50% 50%'),
    shearingCnc: img('machine-shearing-cnc', 'A large green guillotine shearing machine in a fabrication shop', 'plant', 'SRG-1', '50% 50%'),
    shearing: img('machine-shearing', 'Operators feeding a steel sheet into a guillotine shearing machine', 'plant', 'SRG-2', '50% 45%'),
    pressBrake: img('machine-press-brake', 'A gloved hand positioning sheet under the tooling of a CNC press brake', 'plant', 'CNC PB-1', '50% 50%'),
    powerPress: img('machine-power-press', 'An operator feeding a strip into a mechanical power press', 'plant', 'MPP-1', '50% 50%'),
    hydraulicPunch: img('machine-hydraulic-punch', 'A hydraulic ram pressing a steel component on a punching bed', 'plant', 'HPH-1', '50% 50%'),
    radialDrill: img('machine-radial-drill', 'A drill boring a bolt hole in a steel bar, swarf curling from the bit', 'plant', 'RDM-1', '50% 50%'),
    threadRolling: img('machine-thread-rolling', 'Close-up of a rolled thread on a steel rod', 'plant', 'HTM-1', '60% 50%'),
    beamWelding: img('machine-beam-welding', 'Automatic welding heads running along a large steel section on a welding line', 'plant', 'PHI-1', '50% 50%'),
    migWelding: img('machine-mig-welding', 'A welder MIG welding steel sections inside a fabrication shop', 'plant', 'MIG-1', '50% 50%'),
    shotBlasting: img('machine-shot-blasting', 'An operator in a hooded suit treating a large steel component inside an enclosed booth', 'plant', 'SBT-1', '50% 50%'),
    purlinRollForming: img('machine-purlin-roll-forming', 'The roller stands of a cold roll-forming line for purlins and girts', 'plant', 'RFP-1', '50% 50%'),
    sheetForming: img('machine-sheet-forming', 'A sheet roll-forming machine with blue roller stands in a workshop', 'plant', 'RFS-1', '50% 50%'),
    standingSeam: img('machine-standing-seam', 'Close-up of a grooved forming roller on a roll-forming machine', 'plant', 'SSR-1', '50% 50%'),
    deckForming: img('machine-deck-forming', 'A steel coil on a crane hook, ready to feed a forming line', 'plant', 'DSF-1', '50% 50%'),
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
  /** The 480 px rendition, attached on phones instead of the 1280 px clip. */
  srcSmall: '/videos/hero-loop-480.mp4',
  type: 'video/mp4',
} as const

/** DSI's drone footage of the works, behind the About page's tagline band (user's choice, 2026-09-28). */
export const droneVideo = {
  src: '/videos/dsi-drone-shot.mp4',
  type: 'video/mp4',
} as const
