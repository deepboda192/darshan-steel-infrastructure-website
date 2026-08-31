/**
 * ============================================================================
 * DSI — SINGLE SOURCE OF TRUTH FOR COMPANY DATA
 * ============================================================================
 * Everything the site says about Darshan Steel Infrastructure lives here.
 * Components never hard-code company facts.
 *
 * SOURCE
 * ------
 * Contact details, plant capacity, material grades and the expertise list are
 * taken from the Darshan Steel Group product catalogue (Edition 3). That
 * catalogue is printed under the group's earlier name and logo; only the FACTS
 * are carried across — the naming, branding and design of this site are
 * deliberately unchanged.
 *
 * PLACEHOLDER POLICY
 * ------------------
 * No company claim has been invented. Any value that DSI has not supplied is
 * marked `placeholder: true` (structured data) or wrapped in [SQUARE BRACKETS]
 * (plain strings). Search this file for "placeholder" or "[" to find every
 * item that still needs real data.
 *
 * To audit placeholders visually, open any page with `?audit=1` appended to
 * the URL — every unverified value is outlined in amber.
 * ============================================================================
 */

export type Placeholder<T> = {
  value: T
  /** true = awaiting real DSI data, do not treat as a factual claim */
  placeholder: boolean
}

const todo = <T,>(value: T): Placeholder<T> => ({ value, placeholder: true })
const real = <T,>(value: T): Placeholder<T> => ({ value, placeholder: false })

export const company = {
  /* ---------------------------------------------------------------- IDENTITY */
  name: 'Darshan Steel Infrastructure',
  shortName: 'DSI',
  legalName: 'Darshan Steel Infrastructure',
  tagline: 'Engineered for Industry',
  descriptor: 'Pre-Engineered Buildings & Structural Steel',

  /** Strapline carried over from the product catalogue. */
  strapline: 'A Place for Precise Work',

  /** One-line positioning used in the footer and meta descriptions. */
  summary:
    'Engineering and manufacturing steel structures for modern industry.',

  /** Longer positioning paragraph — About page and Organization schema. */
  about:
    'Darshan Steel Infrastructure is a trusted name in pre-engineered steel buildings and structural steel solutions. We deliver end-to-end services — from consulting and design through fabrication and erection — using the latest technology and advanced manufacturing facilities, so that responsibility for the structure stays with one team from drawing to handover.',

  /** Vision, as published in the company catalogue. */
  vision:
    'To delight clients by building the future together — through precise designing, superior products, and unmatched customer service. We aim to create lasting value by shaping modern infrastructure and strengthening communities.',

  /** Mission, as published in the company catalogue. */
  mission:
    'To deliver high-quality steel products and services that exceed expectations. We are committed to sustainable growth, empowering employees, and building long-term partnerships with customers through innovation, reliability, and excellence.',

  /**
   * Fast-track, turnkey construction for non-residential projects.
   * From the catalogue's "Our Expertise" panel.
   */
  expertise: [
    'Manufacturing plants & heavy industry',
    'Warehouses & logistics hubs',
    'Exhibition centres & shopping malls',
    'Sports facilities & offices',
    'High-rise & commercial complexes',
    'Transportation hubs & aircraft hangars',
  ],

  /* ------------------------------------------------------------------ CONTACT */
  /** Registered head office. */
  address: {
    line1: real('501, Lotus Arcade, 8-Royal Park'),
    line2: real('Nr. KKV Circle, 150-ft. Ring Road'),
    city: real('Rajkot'),
    state: real('Gujarat'),
    postalCode: real('360005'),
    country: real('India'),
    mapsQuery: real(
      'https://www.google.com/maps/search/?api=1&query=Lotus+Arcade+Royal+Park+KKV+Circle+150+Feet+Ring+Road+Rajkot+360005',
    ),
  },

  /**
   * Manufacturing units. Both sit on the Rajkot–Morbi highway and are listed
   * separately in the catalogue.
   */
  works: [
    {
      unit: 'Unit 1',
      name: 'Darshan Steel Infrastructure',
      address: 'At. Chhatar, Sr. No. 169, Rajkot–Morbi Highway, Rajkot, Gujarat 363650',
    },
    {
      unit: 'Unit 2',
      name: 'Darshan Pre-Fab Pvt. Ltd.',
      address: 'At. Kagdadi, Sr. No. 225, Rajkot–Morbi Highway, Rajkot, Gujarat 360003',
    },
  ],

  phone: {
    primary: real('+91 81415 23000'),
    secondary: real('+91 81415 23500'),
  },

  email: {
    general: real('info@darshansteelinfra.com'),
    enquiries: real('info@darshansteelinfra.com'),
    careers: todo('[careers@darshansteelinfra.com]'),
  },

  hours: todo('[MON – SAT · 09:00 – 18:00 IST]'),

  /* ------------------------------------------------------------------- ONLINE */
  siteUrl: 'https://www.darshansteelinfra.com',

  /** Only rendered if `url` is non-empty — remove entries DSI does not use. */
  social: [
    { label: 'LinkedIn', url: '', handle: '[LINKEDIN PROFILE]' },
    { label: 'Instagram', url: '', handle: '[INSTAGRAM PROFILE]' },
    { label: 'YouTube', url: '', handle: '[YOUTUBE CHANNEL]' },
  ] as { label: string; url: string; handle: string }[],

  /* ------------------------------------------------------------------ METRICS */
  /**
   * Homepage counters.
   *
   * The four figures carrying a value are evidenced by the product catalogue:
   *  - capacity   — the stated plant capacity, 2,300 MT per month.
   *  - area       — sum of the built-up areas of the 14 documented projects.
   *  - clients    — client marks published on the catalogue's client wall.
   *  - industries — unique entries in the "Industries we serve" list.
   *
   * `years` and `projects` carry value 0: the catalogue states neither a
   * founding year nor a lifetime project count, so they are filtered out of the
   * homepage band and render as bracketed placeholders on /about.
   */
  metrics: [
    { key: 'capacity',   value: 2300,   suffix: ' MT / Month', label: 'Fabrication Capacity',    note: 'Fully enclosed, automated production line', placeholder: false },
    { key: 'area',       value: 134540, suffix: '+ Sq.Mt.',    label: 'Built-Up Area Delivered', note: 'Across 14 documented projects',             placeholder: false },
    { key: 'clients',    value: 34,     suffix: '+',           label: 'Clients Served',          note: 'Paper, ceramics, forging, logistics',       placeholder: false },
    { key: 'industries', value: 14,     suffix: '+',           label: 'Industries Served',       note: 'Automobile to pharmaceutical',              placeholder: false },
    { key: 'years',      value: 0,      suffix: '+',           label: 'Years of Experience',     note: '[YEAR ESTABLISHED — TO BE SUPPLIED]',       placeholder: true },
    { key: 'projects',   value: 0,      suffix: '+',           label: 'Projects Delivered',      note: '[LIFETIME PROJECT COUNT — TO BE SUPPLIED]', placeholder: true },
  ],

  /* ----------------------------------------------------------- CERTIFICATIONS */
  /**
   * IMPORTANT: no certification is claimed until DSI supplies proof. The
   * catalogue names material standards (below) but no certifying body.
   */
  certifications: [
    { label: '[CERTIFICATION 1 — e.g. ISO 9001:2015]', issuer: '[ISSUING BODY]', verified: false },
    { label: '[CERTIFICATION 2]',                      issuer: '[ISSUING BODY]', verified: false },
  ],

  /**
   * Material grades and standards quoted in the product catalogue. These are
   * specifications DSI builds to, not certifications it holds.
   */
  materialStandards: [
    { label: 'Primary & secondary members', value: '345 MPa structural steel' },
    { label: 'Roof & wall sheeting', value: 'S550 high-tensile steel' },
    { label: 'Standing seam roofing', value: '300 MPa, 0.50–0.80 mm core' },
    { label: 'Surface preparation', value: 'Shot-blasted to SA 2.5' },
    { label: 'Primer coat', value: '80–120 microns' },
    { label: 'Optional corrosion protection', value: '100 microns' },
    { label: 'Bare Galvalume', value: 'IS 513, 0.4–0.8 mm' },
    { label: 'Colour-coated Galvalume', value: 'IS 513 (AZ 150), 0.4–0.8 mm' },
    { label: 'Colour-coated Galvanized', value: 'IS 277 (120 GSM), 0.5–0.8 mm' },
  ],

  /** Design codes DSI works to. Confirm which apply before publishing. */
  designCodes: [
    { code: '[IS 800]',   scope: 'General construction in steel' },
    { code: '[IS 875]',   scope: 'Design loads — dead, live, wind' },
    { code: '[MBMA]',     scope: 'Metal building systems' },
    { code: '[AISC]',     scope: 'Steel construction' },
  ],

  /* -------------------------------------------------------------- WORKFORCE */
  employees: todo('[NUMBER OF EMPLOYEES]'),
  facilityArea: todo('[FACILITY AREA — SQ.FT.]'),
  established: todo('[YEAR ESTABLISHED]'),
} as const

/** Formatted single-line address, skipping any unfilled parts. */
export function formattedAddress(): string {
  const a = company.address
  return [a.line1.value, a.line2.value, a.city.value, `${a.state.value} ${a.postalCode.value}`, a.country.value]
    .filter(Boolean)
    .join(', ')
}

/** Social links that actually point somewhere. */
export function activeSocials() {
  return company.social.filter((s) => s.url.trim().length > 0)
}
