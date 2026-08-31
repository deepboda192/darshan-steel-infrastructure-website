/**
 * ============================================================================
 * DSI — SINGLE SOURCE OF TRUTH FOR COMPANY DATA
 * ============================================================================
 * Everything the site says about Darshan Steel Infrastructure lives here.
 * Components never hard-code company facts.
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

  /** One-line positioning used in the footer and meta descriptions. */
  summary:
    'Engineering and manufacturing steel structures for modern industry.',

  /** Longer positioning paragraph — About page and Organization schema. */
  about:
    'Darshan Steel Infrastructure designs, manufactures and erects pre-engineered steel buildings for industrial and commercial use. We work across the full build cycle — structural engineering, detailing, fabrication, surface treatment, dispatch and site erection — so that responsibility for the structure stays with one team from drawing to handover.',

  /* ------------------------------------------------------------------ CONTACT */
  // TODO(DSI): replace with the registered office / works address.
  address: {
    line1: todo('[ADDRESS LINE 1 — PLOT / SURVEY NO.]'),
    line2: todo('[ADDRESS LINE 2 — INDUSTRIAL ESTATE / AREA]'),
    city: todo('[CITY]'),
    state: real('Gujarat'),
    postalCode: todo('[PIN CODE]'),
    country: real('India'),
    /** Google Maps place URL or embed query. */
    mapsQuery: todo('[GOOGLE MAPS LINK OR PLUS CODE]'),
  },

  // TODO(DSI): confirm public-facing numbers before launch.
  phone: {
    primary: todo('[+91 XXXXX XXXXX]'),
    secondary: todo('[+91 XXXXX XXXXX]'),
  },

  email: {
    // Inferred from the darshansteelinfra.com domain — confirm before launch.
    general: todo('[info@darshansteelinfra.com]'),
    enquiries: todo('[projects@darshansteelinfra.com]'),
    careers: todo('[careers@darshansteelinfra.com]'),
  },

  hours: todo('[MON – SAT · 09:00 – 18:00 IST]'),

  /* ------------------------------------------------------------------- ONLINE */
  // TODO(DSI): confirm the production domain.
  siteUrl: 'https://www.darshansteelinfra.com',

  /** Only rendered if `url` is non-empty — remove entries DSI does not use. */
  social: [
    { label: 'LinkedIn', url: '', handle: '[LINKEDIN PROFILE]' },
    { label: 'Instagram', url: '', handle: '[INSTAGRAM PROFILE]' },
    { label: 'YouTube', url: '', handle: '[YOUTUBE CHANNEL]' },
  ] as { label: string; url: string; handle: string }[],

  /* ------------------------------------------------------------------ METRICS */
  /**
   * Homepage counters. Every figure below is a PLACEHOLDER.
   * Replace `value` and set `placeholder: false` once DSI confirms.
   */
  metrics: [
    { key: 'years',      value: 15,  suffix: '+',      label: 'Years of Experience', note: 'Since [YEAR ESTABLISHED]',   placeholder: true },
    { key: 'projects',   value: 500, suffix: '+',      label: 'Projects Delivered',  note: 'Across [N] states',          placeholder: true },
    { key: 'area',       value: 10,  suffix: 'M+ Sq.Ft.', label: 'Built-Up Area Delivered', note: 'Cumulative',          placeholder: true },
    { key: 'industries', value: 12,  suffix: '+',      label: 'Industries Served',   note: 'Manufacturing to logistics', placeholder: true },
    { key: 'capacity',   value: 0,   suffix: ' MT / Month', label: 'Fabrication Capacity', note: '[ANNUAL PRODUCTION CAPACITY]', placeholder: true },
  ],

  /* ----------------------------------------------------------- CERTIFICATIONS */
  /**
   * IMPORTANT: no certification is claimed until DSI supplies proof.
   * The Quality page renders this list only when `verified` entries exist.
   */
  certifications: [
    { label: '[CERTIFICATION 1 — e.g. ISO 9001:2015]', issuer: '[ISSUING BODY]', verified: false },
    { label: '[CERTIFICATION 2]',                      issuer: '[ISSUING BODY]', verified: false },
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
