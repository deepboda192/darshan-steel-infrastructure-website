import type { Project } from '@/data/projects'
import { listProjects } from '@/lib/projects.functions'

/** How long a fetched list serves later navigations before it is fetched again. */
const FRESH_MS = 60_000

let cached: { at: number; projects: Promise<Project[]> } | undefined

/**
 * The public project list for a route loader. One fetch serves the home,
 * projects and project pages for a minute of navigation; a failed fetch is
 * not kept, so the next loader tries again. On the server, listProjects has
 * its own cache across requests.
 */
export function loadProjects(): Promise<Project[]> {
  if (cached && Date.now() - cached.at < FRESH_MS) return cached.projects
  const projects = listProjects().catch((error: unknown) => {
    cached = undefined
    throw error
  })
  cached = { at: Date.now(), projects }
  return projects
}
