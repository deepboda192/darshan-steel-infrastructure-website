import { createServerFn } from '@tanstack/react-start'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/integrations/supabase/types'
import type { Project } from '@/data/projects'
import { projects as fallbackProjects } from '@/data/projects'
import { PROJECT_COLUMNS, rowToProject, type ProjectRow } from '@/lib/projects-map'

/**
 * Public, read-only list of published project records.
 * Falls back to the bundled records if the database is unreachable or empty,
 * so the site never renders an empty Projects page.
 */
export const listProjects = createServerFn({ method: 'GET' }).handler(async (): Promise<Project[]> => {
  const url = process.env['SUPABASE_URL']
  const key = process.env['SUPABASE_PUBLISHABLE_KEY']
  if (!url || !key) return fallbackProjects

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
})
