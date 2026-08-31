import { createFileRoute } from '@tanstack/react-router'
import { company } from '@/data/company'
import { listProjects } from '@/lib/projects.functions'

const BASE = company.siteUrl.replace(/\/+$/, '')

type Entry = { path: string; changeFrequency: string; priority: number }

const ROUTES: Entry[] = [
  { path: '/', changeFrequency: 'monthly', priority: 1.0 },
  { path: '/peb-solutions', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/manufacturing', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/quality-engineering', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/industries', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/projects', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.8 },
  { path: '/about', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/careers', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.2 },
]

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const projects = await listProjects()
        const lastModified = new Date().toISOString()

        const entries = ROUTES.flatMap((route) => {
          const rows = [
            {
              url: route.path === '/' ? `${BASE}/` : `${BASE}${route.path}`,
              changeFrequency: route.changeFrequency,
              priority: route.priority,
            },
          ]
          // Only verified project records are submitted for indexing.
          if (route.path === '/projects') {
            for (const project of projects.filter((p) => p.verified)) {
              rows.push({
                url: `${BASE}/projects/${project.slug}`,
                changeFrequency: 'yearly',
                priority: 0.6,
              })
            }
          }
          return rows
        })

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) =>
      `  <url><loc>${e.url}</loc><lastmod>${lastModified}</lastmod><changefreq>${e.changeFrequency}</changefreq><priority>${e.priority.toFixed(1)}</priority></url>`,
  )
  .join('\n')}
</urlset>`

        return new Response(xml, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        })
      },
    },
  },
})
