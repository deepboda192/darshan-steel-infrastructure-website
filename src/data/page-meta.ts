/**
 * The <title> and meta description of each content page.
 *
 * Kept apart from the page content in the other data modules on purpose: a
 * route's head() runs from the shell bundle every page downloads, so whatever
 * it imports is shipped to every visitor. The content modules are imported by
 * the page components only, which are split into one chunk per page.
 */
export const pebMeta = {
  title: 'About PEB: Pre-Engineered Buildings Explained | DSI',
  description:
    'What a pre-engineered building (PEB) is, how it is built, its advantages over conventional construction and where it is used. By DSI, PEB manufacturer in Rajkot.',
}

export const primarySystemMeta = {
  title: 'PEB Primary Framing System: Frames, Cranes & Bracing | DSI',
  description:
    'The primary system of a pre-engineered building: the six rigid frame types, built-in crane systems, canopies and fascia, and the bracing that keeps it square.',
}

export const secondarySystemMeta = {
  title: 'PEB Secondary System: Purlins, Girts & Eave Struts | DSI',
  description:
    'The secondary system of a pre-engineered building: cold-formed Z and C purlins, wall girts and eave struts that span between the frames, carry the sheeting and brace the primary members.',
}

export const mezzanineMeta = {
  title: 'PEB Mezzanine Floors: Beams, Deck Sheet, Handrails & Stairs | DSI',
  description:
    'Mezzanine floors in a pre-engineered building: steel beams, joists and columns, profiled deck sheet under a concrete slab or chequered plate, handrails and staircases, designed and built with the frame.',
}

export const claddingMeta = {
  title: 'PEB Cladding System: Roof & Wall Sheeting, Standing Seam | DSI',
  description:
    'The cladding system of a pre-engineered building: roof and wall sheeting in S550 high-tensile steel, standing seam roofing, and the flashings, fasteners, sealants and insulation that close the envelope.',
}

export const accessoriesMeta = {
  title: 'PEB Accessories: Ventilators, Daylight Panels, Louvers, Insulation & Ladders | DSI',
  description:
    'The accessories of a pre-engineered building: turbo ventilators, ridge ventilators and roof monitors, polycarbonate daylight panels, S-type louvers, XLPE or fibreglass insulation and cage ladders, chosen with the cladding and fitted with the frame.',
}

export const manufacturingMeta = {
  title: 'Manufacturing: Works, Capacity & Machines | DSI',
  description:
    'Inside the Darshan Steel Infrastructure works at Rajkot: 15,000 MT annual capacity, ISO 9001, 14001 and 45001 certification by TÜV SÜD, and the CNC cutting, welding, drilling, blasting and roll-forming machines on the floor.',
}
