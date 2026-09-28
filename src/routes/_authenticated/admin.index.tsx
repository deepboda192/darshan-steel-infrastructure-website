import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { ArrowUpRight, FolderKanban, Inbox, Plus, Users } from 'lucide-react'
import Link from '@/components/site/NextLink'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/site/Button'
import { Card, Chip, PageHeader } from '@/components/admin/ui'

type Recent = { id: string; name: string; slug: string; building_type: string; location: string; photo: string }

/** Figures at a glance, the two things an administrator most often does next, and the latest records. */
function AdminOverview() {
  const { data } = useQuery({
    queryKey: ['admin', 'overview'],
    queryFn: async () => {
      const [projects, enquiries, users, newEnquiries, recent] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('enquiries').select('id', { count: 'exact', head: true }),
        supabase.rpc('admin_list_users'),
        supabase.from('enquiries').select('id', { count: 'exact', head: true }).neq('status', 'handled'),
        supabase
          .from('projects')
          .select('id, name, slug, building_type, location, photo')
          .order('sort_order', { ascending: true })
          .limit(5),
      ])
      return {
        projects: projects.count ?? 0,
        enquiries: enquiries.count ?? 0,
        users: users.data?.length ?? 0,
        newEnquiries: newEnquiries.count ?? 0,
        admins: users.data?.filter((u) => u.is_admin).length ?? 0,
        recent: (recent.data ?? []) as Recent[],
      }
    },
  })

  const stats = [
    { label: 'Projects', value: data?.projects, note: 'Published on the site', icon: FolderKanban, href: '/admin/projects' },
    {
      label: 'Enquiries',
      value: data?.enquiries,
      note: data ? `${data.newEnquiries} waiting for a reply` : '',
      icon: Inbox,
      href: '/admin/enquiries',
    },
    {
      label: 'Staff accounts',
      value: data?.users,
      note: data ? `${data.admins} with admin access` : '',
      icon: Users,
      href: '/admin/users',
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Overview"
        title="Site management"
        description="Manage the project records shown on darshansteelinfra.com and the staff who can edit them."
        actions={
          <Button href="/admin/projects" arrow={false}>
            <span className="inline-flex items-center gap-2">
              <Plus size={16} strokeWidth={2.2} aria-hidden="true" />
              Add project
            </span>
          </Button>
        }
      />

      <div className="grid gap-5 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          const body = (
            <>
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-accent/10 text-accent">
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                </span>
                {stat.href && (
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="text-neutral-4 transition-[color,translate] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  />
                )}
              </div>
              <p className="mt-5 font-heading text-[40px] font-bold leading-none text-neutral-10 tabular-nums">
                {stat.value === undefined ? '—' : stat.value}
              </p>
              <p className="mt-2 text-[14px] font-medium text-neutral-10">{stat.label}</p>
              <p className="text-[13px] text-neutral-6">{stat.note}</p>
            </>
          )
          return stat.href ? (
            <Link key={stat.label} href={stat.href} className="group">
              <Card className="h-full transition-[border-color,box-shadow] duration-200 hover:border-accent/40 hover:shadow-[0_8px_24px_#03599e14]">
                {body}
              </Card>
            </Link>
          ) : (
            <Card key={stat.label}>{body}</Card>
          )
        })}
      </div>

      <Card padded={false}>
        <div className="flex items-center justify-between gap-4 border-b border-black/[0.08] px-6 py-4">
          <h2 className="font-heading text-[16px] font-semibold text-neutral-10">Recent projects</h2>
          <Link href="/admin/projects" className="text-[14px] font-medium text-accent hover:underline">
            See all
          </Link>
        </div>
        <ul>
          {(data?.recent ?? []).map((p) => (
            <li key={p.id} className="flex items-center gap-4 border-b border-black/[0.06] px-6 py-3.5 last:border-b-0">
              <span className="h-11 w-16 shrink-0 overflow-hidden rounded-[3px] bg-neutral-1">
                {p.photo && <img src={p.photo} alt="" className="h-full w-full object-cover" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-medium text-neutral-10">{p.name}</p>
                <p className="truncate text-[13px] text-neutral-6">{p.location}</p>
              </div>
              <Chip>{p.building_type}</Chip>
              <a
                href={`/projects/${p.slug}`}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[13px] font-medium text-neutral-6 hover:text-accent max-md:hidden"
              >
                Open page
              </a>
            </li>
          ))}
          {data && data.recent.length === 0 && (
            <li className="px-6 py-8 text-center text-[14px] text-neutral-6">No projects yet.</li>
          )}
        </ul>
      </Card>
    </div>
  )
}

export const Route = createFileRoute('/_authenticated/admin/')({
  component: AdminOverview,
})
