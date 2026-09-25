import { createFileRoute } from '@tanstack/react-router'
import { company } from '@/data/company'
import { listProjects } from '@/lib/projects.functions'

const BASE = company.siteUrl.replace(/\/+$/, '')

type Entry = { path: string; changeFrequency: string; priority: number }

/** The public pages. Project records are appended from the live list. */
const ROUTES: Entry[] = [
  { path: '/', changeFrequency: 'monthly', priority: 1.0 },
  { path: '/about', changeFrequency: 'yearly', priority: 0.8 },
  { path: '/projects', changeFrequency: 'monthly', priority: 0.8 },
]

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const projects = await listProjects()
        const lastModified = new Date().toISOString()

        const entries: Entry[] = [
          ...ROUTES,
          // Only verified project records are submitted for indexing.
          ...projects
            .filter((p) => p.verified)
            .map((p) => ({ path: `/projects/${p.slug}`, changeFrequency: 'yearly', priority: 0.7 })),
        ]

        const body = entries
          .map(
            (entry) => `  <url>
    <loc>${entry.path === '/' ? `${BASE}/` : `${BASE}${entry.path}`}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`,
          )
          .join('\n')

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`
        return new Response(xml, {
          headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
        })
      },
    },
  },
})
