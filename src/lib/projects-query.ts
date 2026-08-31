import { queryOptions } from '@tanstack/react-query'
import { listProjects } from '@/lib/projects.functions'

export const projectsQueryOptions = queryOptions({
  queryKey: ['projects', 'public'],
  queryFn: () => listProjects(),
  staleTime: 60_000,
})
