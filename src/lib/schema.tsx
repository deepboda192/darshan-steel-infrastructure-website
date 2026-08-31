import { company } from '@/data/company'
import { solutions } from '@/data/solutions'

/**
 * JSON-LD builders.
 *
 * Placeholder values are deliberately OMITTED rather than emitted. Publishing
 * "[CITY]" as a structured-data address would be worse than publishing nothing
 * — search engines would index a fake location. Fields appear here only once
 * DSI supplies real data and the `placeholder` flag is cleared.
 */

type Json = Record<string, unknown>

const real = <T,>(field: { value: T; placeholder: boolean }): T | undefined =>
  field.placeholder ? undefined : field.value

/** Drops undefined keys so the emitted JSON-LD contains no empty properties. */
function compact<T extends Json>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== ''),
  ) as T
}

export function organizationSchema(): Json {
  const address = compact({
    '@type': 'PostalAddress',
    streetAddress: real(company.address.line1),
    addressLocality: real(company.address.city),
    addressRegion: real(company.address.state),
    postalCode: real(company.address.postalCode),
    addressCountry: real(company.address.country),
  })

  return compact({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${company.siteUrl}/#organization`,
    name: company.name,
    legalName: company.legalName,
    url: company.siteUrl,
    logo: `${company.siteUrl}/brand/dsi-logo.png`,
    description: company.about,
    // Only emitted once a real address exists (more than the country alone).
    address: Object.keys(address).length > 2 ? address : undefined,
    telephone: real(company.phone.primary),
    email: real(company.email.general),
    sameAs: company.social.filter((s) => s.url).map((s) => s.url),
    knowsAbout: [
      'Pre-Engineered Buildings',
      'Structural Steel Fabrication',
      'Industrial Shed Manufacturing',
      'Warehouse Construction',
      'Cold Storage Structures',
      'Steel Building Erection',
    ],
    areaServed: { '@type': 'Country', name: 'India' },
  })
}

export function websiteSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${company.siteUrl}/#website`,
    url: company.siteUrl,
    name: company.name,
    publisher: { '@id': `${company.siteUrl}/#organization` },
    inLanguage: 'en-IN',
  }
}

/** Service catalogue for the solutions page. */
export function serviceCatalogSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Pre-Engineered Building Solutions',
    itemListElement: solutions.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.title,
        description: s.short,
        provider: { '@id': `${company.siteUrl}/#organization` },
        url: `${company.siteUrl}/peb-solutions#${s.slug}`,
      },
    })),
  }
}

export function breadcrumbSchema(trail: { name: string; path: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${company.siteUrl}${item.path}`,
    })),
  }
}

export function faqSchema(items: { question: string; answer: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

/** Renders a JSON-LD block. Use inside a page's returned tree. */
export function JsonLd({ data }: { data: Json | Json[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
