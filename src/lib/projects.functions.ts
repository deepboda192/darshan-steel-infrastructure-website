import { createServerFn } from '@tanstack/react-start'
import type { Database } from '@/integrations/supabase/types'
import type { Project } from '@/data/projects'
import { projects as fallbackProjects } from '@/data/projects'
import { PROJECT_COLUMNS, rowToProject, type ProjectRow } from '@/lib/projects-map'

/**
 * Reads the published project records from the database, or the bundled
 * records if the database is unreachable or empty, so the site never renders
 * an empty Projects page.
 */
async function fetchProjects(): Promise<Project[]> {
  const url = process.env['SUPABASE_URL']
  const key = process.env['SUPABASE_PUBLISHABLE_KEY']
  if (!url || !key) return fallbackProjects

  // Imported inside the handler: a static import would carry the whole Supabase
  // client into the public bundle, since this module sits behind every route loader.
  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers)
        if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) {
          headers.delete('Authorization')
        }
        headers.set('apikey', key)
        return fetch(input, { ...init, headers })
      },
    },
  })

  const { data, error } = await supabase
    .from('projects')
    .select(PROJECT_COLUMNS)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (error || !data || data.length === 0) return fallbackProjects

  return (data as unknown as ProjectRow[]).map((row, i) => rowToProject(row, i))
}

/**
 * The list is read on every server render of the home page, the projects
 * index, a project record and the sitemap, and it changes only when staff
 * save a record. So the server keeps one copy: fresh for a minute, and served
 * stale for up to ten minutes while a refresh runs in the background, so a
 * visitor never waits on the database unless the cache is empty.
 */
const FRESH_MS = 60_000
const STALE_MS = 10 * 60_000
let cached: { at: number; data: Project[] } | undefined
let refreshing: Promise<Project[]> | undefined

const refreshProjects = () =>
  (refreshing ??= fetchProjects()
    .then((data) => {
      cached = { at: Date.now(), data }
      return data
    })
    .finally(() => {
      refreshing = undefined
    }))

/** Public, read-only list of published project records. */
export const listProjects = createServerFn({ method: 'GET' }).handler(async (): Promise<Project[]> => {
  const age = cached ? Date.now() - cached.at : Infinity
  if (age < FRESH_MS) return cached!.data
  const refresh = refreshProjects()
  if (age < STALE_MS) return cached!.data
  return refresh
})
