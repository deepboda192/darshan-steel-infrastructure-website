import { createFileRoute } from '@tanstack/react-router'
import { company } from '@/data/company'

const BASE = company.siteUrl.replace(/\/+$/, '')

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: () => {
        const body = [
          'User-agent: *',
          'Allow: /',
          'Disallow: /api/',
          'Disallow: /admin',
          'Disallow: /auth',
          '',
          `Sitemap: ${BASE}/sitemap.xml`,
          `Host: ${BASE}`,
          '',
        ].join('\n')

        return new Response(body, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        })
      },
    },
  },
})
