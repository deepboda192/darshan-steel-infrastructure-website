export type NavItem = { label: string; href: string; description?: string; children?: NavItem[] }

/**
 * The menu bar (set by the user on Sept 28, 2026): About DSI, About PEB with
 * the five structural-system pages beneath it, and Projects. The home page
 * sections stay reachable from the footer. Every href starts with `/` so the
 * links also resolve from the project, admin and sign-in screens.
 */
export const primaryNav: NavItem[] = [
  { label: 'About DSI', href: '/about', description: 'Who we are' },
  {
    label: 'About PEB',
    href: '/about-peb',
    description: 'What a pre-engineered building is',
    children: [
      { label: 'Primary System', href: '/about-peb/primary-system', description: 'Frames, cranes, canopies and bracing' },
      { label: 'Secondary System', href: '/about-peb/secondary-system', description: 'Purlins, girts and eave struts' },
      { label: 'Mezzanine Floors', href: '/about-peb/mezzanine-floors', description: 'Beams, deck sheet, handrails and stairs' },
      { label: 'Cladding System', href: '/about-peb/cladding-system', description: 'Roof and wall sheeting, standing seam' },
      { label: 'Building Accessories', href: '/about-peb/accessories', description: 'Ventilators, daylight panels, louvers, insulation, ladders' },
    ],
  },
  { label: 'Projects', href: '/projects', description: 'Every project on record' },
]

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: 'Company',
    items: [
      { label: 'About Us', href: '/about' },
      { label: 'About PEB', href: '/about-peb' },
      { label: 'Solutions', href: '/#solutions' },
      { label: 'Projects', href: '/projects' },
      { label: 'Why DSI', href: '/#why-dsi' },
      { label: 'Process', href: '/#process' },
    ],
  },
  {
    heading: 'Enquiries',
    items: [
      { label: 'Start Your Project', href: '/#contact' },
      { label: 'Request a Quote', href: '/?intent=quote#contact' },
      { label: 'Talk to Our Experts', href: '/?intent=consult#contact' },
      { label: 'Vendor Registration', href: '/?intent=vendor#contact' },
    ],
  },
]
