/**
 * Copy for the Accessories page — the fifth system of a pre-engineered
 * building: the ventilators, daylight panels, louvers, insulation and cage
 * ladders that make the enclosed shell work as a building. Everything here
 * describes general PEB practice. The only catalogue facts used are its
 * accessory list (turbo ventilators, roof monitor, ridge ventilator,
 * daylight panel, louvers, insulation, cage ladder), its S-type louvers and
 * poly-carbonate sheet, and XLPE or fibreglass insulation. No airflow rates,
 * thicknesses or ladder heights are quoted because the catalogue gives none.
 */

export const accessoriesMeta = {
  title: 'PEB Accessories: Ventilators, Daylight Panels, Louvers, Insulation & Ladders | DSI',
  description:
    'The accessories of a pre-engineered building: turbo ventilators, ridge ventilators and roof monitors, polycarbonate daylight panels, S-type louvers, XLPE or fibreglass insulation and cage ladders, chosen with the cladding and fitted with the frame.',
}

export const accessoriesIntro = {
  lead:
    'Accessories are the parts that make the enclosed shell work as a building: the ventilators that move the air, the panels that let the daylight in, the louvers, the insulation that keeps the heat out, and the ladders that give safe access to the roof.',
  paragraphs: [
    'A pre-engineered building is a large sealed volume, and without accessories it would be dark, hot and airless. Each accessory is set into the roof or wall cladding and trimmed like any other opening, so it has to be decided with the cladding, when the purlin and girt spacing is fixed, rather than cut in afterwards.',
    'DSI supplies and fits the accessories with the building. The turbo ventilators, ridge ventilators and roof monitors, the polycarbonate daylight panels, the louvers, the insulation and the cage ladders are on the same drawings and go up with the same crew as the sheeting, with the fixings and flashings each one needs.',
  ],
}

export type AccessoryItem = {
  name: string
  text: string
  /** The part of this page that describes it. */
  part: string
}

/** The seven accessories the catalogue lists, each pointing at its part below. */
export const accessoryItems: AccessoryItem[] = [
  { name: 'Turbo ventilators', text: 'Wind-driven turbines on the roof that draw the hot air out.', part: 'ventilation' },
  { name: 'Ridge ventilator', text: 'A continuous vented cap along the ridge.', part: 'ventilation' },
  { name: 'Roof monitor', text: 'A raised roof section with louvred sides, for air and light.', part: 'ventilation' },
  { name: 'Daylight panels', text: 'Polycarbonate sheets in the roof profile that light the floor.', part: 'daylight' },
  { name: 'Louvers', text: 'Angled S-type blades in the wall that let air in and keep rain out.', part: 'louvers' },
  { name: 'Insulation', text: 'XLPE or fibreglass blanket under the sheet against heat and noise.', part: 'insulation' },
  { name: 'Cage ladders', text: 'Fixed ladders with a safety cage for access to the roof and crane.', part: 'access' },
]

export type AccessoryPart = {
  slug: string
  eyebrow: string
  title: string
  summary: string
  paragraphs: string[]
  /** Short factual points shown as a checklist. */
  points: string[]
  /** Headline facts, as label / value rows. */
  specs: { label: string; value: string }[]
}

export const accessoryParts: AccessoryPart[] = [
  {
    slug: 'ventilation',
    eyebrow: 'Part 01',
    title: 'Ventilators & roof monitors',
    summary:
      'Turbo ventilators, ridge ventilators and roof monitors that let the hot air out at the top of the building and draw fresh air in below.',
    paragraphs: [
      'Hot air rises to the ridge, and a building that vents it there stays cooler without a fan. A turbo ventilator is a turbine of curved vanes on a base flashing formed to the roof profile; the slightest wind spins it, and the spinning draws air up through its throat. It needs no power and no maintenance beyond a bearing, and a row of them along the ridge line changes the air in a shed many times an hour.',
      'A ridge ventilator is a continuous opening along the ridge, covered by a raised cap with weather baffles, so the whole length of the building vents at once. A roof monitor is the same idea built larger: a raised section of roof with louvred or open sides, which vents hot air and can carry daylight panels in its sides. Both are framed on the purlins and flashed into the roof sheeting.',
      'Ventilators only work if air can come in lower down, so they are paired with louvers in the walls or with open doors, and sized for the heat the building makes: a forge or a paint shop needs far more than a store. DSI fixes the number and the position with the cladding, so each ventilator lands between purlins and the roof stays tight around it.',
    ],
    points: [
      'Turbo ventilators driven by the wind, with no power supply',
      'Base flashing formed to the roof profile',
      'Continuous ridge ventilators with weather baffles',
      'Roof monitors with louvred sides, with or without daylight panels',
      'Number and position set by the heat the building makes',
      'Paired with wall louvers for the incoming air',
    ],
    specs: [
      { label: 'Turbo ventilator', value: 'Wind-driven turbine on a profile-matched base' },
      { label: 'Ridge ventilator', value: 'Continuous raised cap along the ridge' },
      { label: 'Roof monitor', value: 'Raised roof section with louvred sides' },
      { label: 'Sizing', value: 'By the heat load and the air changes the use needs' },
    ],
  },
  {
    slug: 'daylight',
    eyebrow: 'Part 02',
    title: 'Daylight panels',
    summary: 'Translucent polycarbonate sheets in the roof profile that light the floor by day without a single lamp.',
    paragraphs: [
      'A daylight panel is a polycarbonate sheet formed to the same profile as the roof sheet, so it laps and fixes exactly like the steel sheet it replaces. Set at intervals along the slope, a small share of the roof area lights the whole floor evenly, and the lighting load of the building drops for the life of the roof.',
      'Polycarbonate is chosen over the older fibreglass sheet because it takes impact without cracking, carries a foot load at the purlin spacing the steel sheet uses, and is UV-stabilised on the outer face so it does not yellow. Panels can also go into the walls, above the girts, for side light.',
      'Daylight panels are placed with the layout inside: over the working aisles rather than over racking, clear of the ridge ventilators, and spaced so the light is even. The same fasteners and closures seal them as the steel sheet, with a wider washer to spread the load on the softer sheet.',
    ],
    points: [
      'Polycarbonate formed to the roof sheet profile',
      'Laps and fixes with the steel sheet, no special framing',
      'UV-stabilised outer face',
      'Takes foot load at the standard purlin spacing',
      'Placed over aisles and working areas for even light',
      'Wall panels above the girts for side light',
    ],
    specs: [
      { label: 'Material', value: 'Polycarbonate, UV-stabilised' },
      { label: 'Profile', value: 'Matches the roof and wall sheet' },
      { label: 'Fixing', value: 'Same fasteners as the steel sheet, with load-spreading washers' },
      { label: 'Layout', value: 'Spaced along the slope over the working areas' },
    ],
  },
  {
    slug: 'louvers',
    eyebrow: 'Part 03',
    title: 'Louvers',
    summary: 'Angled blades in a frame that let air through the wall and keep the rain out.',
    paragraphs: [
      'A louver is a frame of angled blades set into the wall cladding, sized to the girt spacing and flashed like a window. The blades let air pass and turn rain down and out; a bird mesh or an insect screen closes the back. Louvers are the inlet a ridge ventilator or a turbo ventilator needs: air comes in low through the louvers, warms, rises and leaves at the ridge.',
      'DSI’s standard is the S-type louver, its blades formed to an S profile from the same coated steel as the cladding, which sheds water better than a flat blade and is stiff enough to span a wide frame. Louvers can be fixed, or adjustable where the airflow has to be shut in a storm or in winter.',
      'Louvers also go into plant-room walls for compressors and generators, into the gables for cross ventilation, and across the sides of a roof monitor. Each is framed by the girts or purlins and trimmed with jamb, head and sill flashings.',
    ],
    points: [
      'S-type blades formed from coated steel',
      'Bird mesh or insect screen behind the blades',
      'Fixed or adjustable blades',
      'Framed to the girt spacing and flashed like a window',
      'Gable and plant-room louvers for cross ventilation',
      'Louvred sides on roof monitors',
    ],
    specs: [
      { label: 'Type', value: 'S-type louvers in coated steel' },
      { label: 'Screen', value: 'Bird mesh or insect screen' },
      { label: 'Blades', value: 'Fixed, or adjustable to shut' },
      { label: 'Fixing', value: 'Framed by the girts, with jamb, head and sill flashings' },
    ],
  },
  {
    slug: 'insulation',
    eyebrow: 'Part 04',
    title: 'Insulation',
    summary: 'A blanket under the roof and behind the walls that keeps the heat out and takes the drumming out of rain.',
    paragraphs: [
      'Steel sheet in the sun gets hot, and a building with no insulation gets hot under it. An insulation blanket laid over the purlins and girts, directly under the sheet, cuts the heat coming through the roof and quietens the rain. DSI uses XLPE foam or fibreglass blankets with a reflective or white facing to the inside, held in place by the sheet fixings and taped at the joints.',
      'XLPE, a cross-linked polyethylene foam, is thin, closed-cell and does not absorb water, so it suits sheds and warehouses where the blanket stays exposed. Fibreglass gives more insulation for its thickness and better sound absorption, and is chosen where a thicker blanket is worth its cost: offices, workshops, and food and pharmaceutical plants.',
      'Where a finished inner face is wanted, a liner panel goes inside the purlins and girts with the insulation between, protecting the blanket and giving a clean ceiling and wall. Cold stores go further, with insulated panels in place of sheet and blanket. The insulation is fixed as the sheeting goes on, so it is on the same programme as the frame.',
    ],
    points: [
      'XLPE foam or fibreglass blanket',
      'Laid over the purlins and girts, under the sheet',
      'Reflective or white facing to the inside',
      'Held by the sheet fixings, taped at the joints',
      'Liner panels for a finished inner face',
      'Insulated panels for cold stores',
    ],
    specs: [
      { label: 'Materials', value: 'XLPE foam or fibreglass blanket' },
      { label: 'Position', value: 'Over the purlins and girts, under the sheet' },
      { label: 'Facing', value: 'Reflective or white, to the inside' },
      { label: 'Upgrade', value: 'Liner panel inside, or insulated panels for cold stores' },
    ],
  },
  {
    slug: 'access',
    eyebrow: 'Part 05',
    title: 'Cage ladders',
    summary: 'Fixed steel ladders with a safety cage for access to the roof, the crane runway and the plant on the roof.',
    paragraphs: [
      'A roof of ventilators, daylight panels and gutters has to be reached for cleaning and checking, and a crane needs a way up for maintenance. A cage ladder is a fixed steel ladder bolted to the column or the wall steel, with hoops and stringers forming a cage around the climber from a short way above the floor to the landing at the top. The cage is what makes the climb safe: a person who slips is held inside it.',
      'Ladders are fabricated from hollow sections and angles, galvanized or painted, in flights with rest platforms where the height calls for them. The top lands on a walkway or a roof hatch with a handrail, so the climber steps off inside a guarded area, and a lockable gate at the bottom keeps unauthorised people off.',
      'Cage ladders also serve the crane runway, the mezzanine plant deck and water tanks on the roof. DSI supplies them with the frame, fixed to steel rather than to sheeting, together with the walkways and handrails they land on.',
    ],
    points: [
      'Fixed ladder with a safety cage of hoops and stringers',
      'Bolted to the column or wall steel, never to the sheeting',
      'Rest platforms on tall flights',
      'Landing on a guarded walkway or roof hatch',
      'Lockable gate at the bottom',
      'Access to the roof, the crane runway and plant',
    ],
    specs: [
      { label: 'Make-up', value: 'Steel ladder with cage hoops and stringers' },
      { label: 'Fixing', value: 'To the column or wall steel' },
      { label: 'Top', value: 'Guarded walkway, platform or roof hatch' },
      { label: 'Finish', value: 'Galvanized or painted' },
    ],
  },
]

export type AccessoriesFaq = { question: string; answer: string }

export const accessoriesFaq: AccessoriesFaq[] = [
  {
    question: 'How many turbo ventilators does a building need?',
    answer:
      'It depends on the volume of the building, the heat made inside it and how many times an hour the air should change. A store needs a few along the ridge; a forge, a foundry or a paint shop needs many more, and louvers low in the walls to let the air in. DSI works the number out from the use and sets them out with the roof sheeting.',
  },
  {
    question: 'Do daylight panels leak or yellow?',
    answer:
      'Not when they are the right sheet, fixed the right way. Polycarbonate panels are UV-stabilised on the outer face, so they keep their clarity, and they lap and fix with the steel sheet using the same closures and fasteners. Leaks at daylight panels almost always come from fixing, not from the panel, which is why DSI fits them with the sheeting.',
  },
  {
    question: 'Is insulation worth it in a plain warehouse?',
    answer:
      'Under the roof, yes. A thin XLPE blanket costs little, cuts the heat radiating down from the sheet and stops rain drumming on the roof. Walls are insulated where people work beside them or where the stock needs it. Offices, workshops and food and pharmaceutical plants go to a fibreglass blanket with a liner panel.',
  },
  {
    question: 'Can accessories be added after the building is up?',
    answer:
      'Yes, but they cost more later. A ventilator or daylight panel added afterwards means cutting a finished roof and flashing the hole; a louver means re-framing the girts; a ladder needs steel to fix to. Accessories planned with the cladding land between the purlins and girts and are sealed as the sheet goes on.',
  },
]
