import { createFileRoute, Outlet, useNavigate, useRouterState } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { ExternalLink, FolderKanban, Inbox, LayoutDashboard, LogOut, ShieldAlert, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Link from '@/components/site/NextLink'
import { supabase } from '@/integrations/supabase/client'
import { Logo } from '@/components/layout/Logo'
import { initials } from '@/lib/initials'
import { cn } from '@/lib/cn'

const NAV: { label: string; href: string; icon: LucideIcon; exact?: boolean }[] = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'Enquiries', href: '/admin/enquiries', icon: Inbox },
  { label: 'Users', href: '/admin/users', icon: Users },
]

/**
 * The admin shell: a dark sidebar with the brand, the sections and the
 * signed-in account, beside a light workspace. On phones the sidebar
 * becomes a compact top bar with the sections as a row of tabs. Screens
 * render in the outlet once the account is confirmed to hold the admin role.
 */
function AdminLayout() {
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const { data: session, isLoading } = useQuery({
    queryKey: ['admin', 'session'],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser()
      const user = userData.user
      if (!user) return { email: '', isAdmin: false }
      const { data, error } = await supabase.rpc('has_role', { _user_id: user.id, _role: 'admin' })
      return { email: user.email ?? '', isAdmin: !error && Boolean(data) }
    },
  })

  async function signOut() {
    await supabase.auth.signOut()
    navigate({ to: '/auth' })
  }

  const isCurrent = (item: (typeof NAV)[number]) =>
    item.exact ? pathname === item.href || pathname === `${item.href}/` : pathname.startsWith(item.href)

  return (
    <div className="flex min-h-svh bg-neutral-1 text-neutral-10 max-lg:flex-col">
      {/* ---------------- sidebar ---------------- */}
      <aside className="flex w-[264px] shrink-0 flex-col bg-secondary text-white lg:sticky lg:top-0 lg:h-svh max-lg:w-full">
        <div className="flex items-center justify-between gap-4 px-6 py-6 max-lg:py-4">
          <div className="flex items-center gap-3">
            <Logo tone="dark" height={32} />
          </div>
          <span className="rounded-full border border-white/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.5px] text-white/60">
            Admin
          </span>
        </div>

        <nav aria-label="Admin sections" className="px-3 max-lg:flex max-lg:gap-1 max-lg:overflow-x-auto max-lg:pb-3">
          {NAV.map((item) => {
            const current = isCurrent(item)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? 'page' : undefined}
                className={cn(
                  'relative flex items-center gap-3 rounded-[4px] px-3 py-2.5 text-[14px] font-medium transition-colors duration-200 max-lg:shrink-0',
                  current ? 'bg-white/10 text-white' : 'text-white/65 hover:bg-white/5 hover:text-white',
                )}
              >
                {current && (
                  <span aria-hidden="true" className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-accent max-lg:hidden" />
                )}
                <Icon size={18} strokeWidth={1.8} aria-hidden="true" className={current ? 'text-accent' : ''} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto border-t border-white/10 px-3 py-3 max-lg:hidden">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-[4px] px-3 py-2.5 text-[14px] font-medium text-white/65 transition-colors duration-200 hover:bg-white/5 hover:text-white"
          >
            <ExternalLink size={18} strokeWidth={1.8} aria-hidden="true" />
            View site
          </Link>
          <div className="mt-2 flex items-center gap-3 px-3 py-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-heading text-[13px] font-bold text-white">
              {initials(session?.email || 'Admin')}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-white" title={session?.email}>
                {session?.email || 'Signed in'}
              </p>
              <p className="text-[12px] text-white/50">{session?.isAdmin ? 'Administrator' : 'Staff account'}</p>
            </div>
            <button
              type="button"
              onClick={signOut}
              aria-label="Sign out"
              title="Sign out"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] text-white/60 transition-colors duration-200 hover:bg-white/10 hover:text-white"
            >
              <LogOut size={17} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* phone: the account row folds into a compact strip */}
        <div className="flex items-center justify-between gap-3 border-t border-white/10 px-6 py-3 lg:hidden">
          <p className="truncate text-[13px] text-white/70">{session?.email}</p>
          <div className="flex items-center gap-4 text-[13px] font-medium">
            <Link href="/" className="text-white/70 hover:text-white">
              View site
            </Link>
            <button type="button" onClick={signOut} className="text-white/70 hover:text-white">
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* ---------------- workspace ---------------- */}
      <main className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-[1200px] px-10 py-10 max-lg:px-6 max-lg:py-8 max-xs:px-4">
          {isLoading ? (
            <p role="status" className="text-[15px] text-neutral-6">
              Checking access…
            </p>
          ) : session?.isAdmin ? (
            <Outlet />
          ) : (
            <div className="max-w-[560px] rounded-[4px] border border-black/[0.08] bg-white p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                <ShieldAlert size={22} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h1 className="mt-5 font-heading text-[24px] font-bold leading-(--lh-sm) text-neutral-10">
                Access not enabled
              </h1>
              <p className="mt-2 text-[15px] leading-[1.6] text-neutral-6">
                Your account is signed in but has not been granted the admin role yet. Ask an
                existing administrator to add it from Users, then reload this page.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export const Route = createFileRoute('/_authenticated/admin')({
  head: () => ({
    meta: [
      { title: 'Admin — Darshan Steel Infrastructure' },
      { name: 'description', content: 'Manage Darshan Steel Infrastructure website content.' },
      { name: 'robots', content: 'noindex, nofollow' },
      { property: 'og:title', content: 'Admin — Darshan Steel Infrastructure' },
      { property: 'og:description', content: 'Internal content management for the DSI website.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: AdminLayout,
})
