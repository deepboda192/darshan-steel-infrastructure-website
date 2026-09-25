import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'
import Link from '@/components/site/NextLink'
import { supabase } from '@/integrations/supabase/client'

/** Two figure cards: the project records (a link to manage them) and the enquiry count. */
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

  const figure = (n: number | undefined) => (n === undefined ? '—' : String(n).padStart(2, '0'))

  return (
    <div>
      <h2 className="font-heading text-[28px] font-bold leading-(--lh-sm) text-neutral-10">Overview</h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Link
          href="/admin/projects"
          className="group border border-black/10 bg-white p-8 transition-colors duration-300 hover:border-accent"
        >
          <p className="text-[13px] font-medium uppercase text-neutral-6">Project records</p>
          <p className="mt-4 font-heading text-[64px] font-bold leading-none text-neutral-10 tabular-nums">
            {figure(data?.projects)}
          </p>
          <p className="m-link mt-6 inline-flex items-center gap-2">
            Manage projects
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </p>
        </Link>

        <div className="border border-black/10 bg-white p-8">
          <p className="text-[13px] font-medium uppercase text-neutral-6">Enquiries received</p>
          <p className="mt-4 font-heading text-[64px] font-bold leading-none text-neutral-10 tabular-nums">
            {figure(data?.enquiries)}
          </p>
          <p className="mt-6 text-[15px] text-neutral-7">Contact form submissions</p>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_authenticated/admin/')({
  component: AdminOverview,
})
