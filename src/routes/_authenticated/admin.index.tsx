import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import Link from '@/components/site/NextLink'
import { supabase } from '@/integrations/supabase/client'

function AdminOverview() {
  const { data } = useQuery({
    queryKey: ['admin', 'counts'],
    queryFn: async () => {
      const [projects, enquiries] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('enquiries').select('id', { count: 'exact', head: true }),
      ])
      return { projects: projects.count ?? 0, enquiries: enquiries.count ?? 0 }
    },
  })

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Link href="/admin/projects" className="border border-charcoal/15 p-8 hover:border-brand">
        <p className="tech text-muted">Project records</p>
        <p className="tabular mt-4 font-display text-display-2 text-charcoal">
          {data ? String(data.projects).padStart(2, '0') : '—'}
        </p>
        <p className="tech mt-4 text-brand">Manage projects →</p>
      </Link>

      <div className="border border-charcoal/15 p-8">
        <p className="tech text-muted">Enquiries received</p>
        <p className="tabular mt-4 font-display text-display-2 text-charcoal">
          {data ? String(data.enquiries).padStart(2, '0') : '—'}
        </p>
        <p className="tech mt-4 text-muted">Contact form submissions</p>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_authenticated/admin/')({
  component: AdminOverview,
})
