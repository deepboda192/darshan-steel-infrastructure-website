import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ShieldCheck, ShieldOff, Users } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/integrations/supabase/client'
import { Card, Chip, EmptyState, PageHeader } from '@/components/admin/ui'
import { initials } from '@/lib/initials'

/**
 * Staff accounts and the switch that grants or removes the admin role.
 *
 * Both calls go straight to the database functions `admin_list_users` and
 * `admin_set_role` (supabase/migrations/20260925123000_admin_user_functions.sql),
 * which run as their definer and refuse anyone without the admin role — so
 * the screen works wherever the site runs, with no service-role key.
 */
function AdminUsers() {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('admin_list_users')
      if (error) throw new Error(error.message)
      return data
    },
  })

  const mutation = useMutation({
    mutationFn: async (vars: { userId: string; makeAdmin: boolean }) => {
      const { error } = await supabase.rpc('admin_set_role', {
        _user_id: vars.userId,
        _make_admin: vars.makeAdmin,
      })
      if (error) throw new Error(error.message)
    },
    onSuccess: (_res, vars) => {
      toast.success(vars.makeAdmin ? 'Admin access granted' : 'Admin access removed')
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'overview'] })
    },
    onError: (e: unknown) =>
      toast.error(e instanceof Error && e.message ? e.message : 'Could not update access'),
  })

  const date = (value: string) =>
    new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Users"
        title="Staff accounts"
        description="Anyone can create an account at /auth, but only accounts marked as administrator here can manage site content."
      />

      {error && (
        <p role="alert" className="rounded-[4px] border border-error/30 bg-error/5 px-4 py-3 text-[14px] text-error">
          {error.message}
        </p>
      )}

      <Card padded={false}>
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-black/[0.08] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.5px] text-neutral-5 max-md:hidden">
          <span>Account</span>
          <span className="w-[130px]">Role</span>
          <span className="w-[150px] text-right">Access</span>
        </div>

        {isLoading && (
          <p role="status" className="px-6 py-8 text-[14px] text-neutral-6">
            Loading accounts…
          </p>
        )}

        {data && data.length === 0 && (
          <EmptyState
            icon={<Users size={22} strokeWidth={1.8} aria-hidden="true" />}
            title="No accounts yet"
            body="Staff create their own account at /auth; they appear here once they have signed up."
          />
        )}

        {data && data.length > 0 && (
          <ul>
            {data.map((user) => (
              <li
                key={user.id}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-black/[0.06] px-6 py-4 last:border-b-0 max-md:grid-cols-1 max-md:gap-3"
              >
                <div className="flex min-w-0 items-center gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary font-heading text-[13px] font-bold text-white">
                    {initials(user.email)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-medium text-neutral-10">{user.email}</p>
                    <p className="text-[13px] text-neutral-6">
                      Joined {date(user.created_at)}
                      {user.last_sign_in_at ? ` · Last seen ${date(user.last_sign_in_at)}` : ''}
                    </p>
                  </div>
                </div>
                <div className="w-[130px] max-md:w-auto">
                  {user.is_admin ? <Chip tone="accent">Administrator</Chip> : <Chip>Member</Chip>}
                </div>
                <div className="w-[150px] text-right max-md:w-auto max-md:text-left">
                  <button
                    type="button"
                    disabled={mutation.isPending}
                    onClick={() => mutation.mutate({ userId: user.id, makeAdmin: !user.is_admin })}
                    className={
                      user.is_admin
                        ? 'inline-flex items-center gap-1.5 rounded-[4px] border border-black/10 bg-white px-3 py-2 text-[13px] font-medium text-neutral-8 transition-colors hover:border-error/30 hover:text-error disabled:opacity-50'
                        : 'inline-flex items-center gap-1.5 rounded-[4px] bg-accent px-3 py-2 text-[13px] font-medium text-white transition-colors hover:bg-accent-deep disabled:opacity-50'
                    }
                  >
                    {user.is_admin ? (
                      <ShieldOff size={15} strokeWidth={2} aria-hidden="true" />
                    ) : (
                      <ShieldCheck size={15} strokeWidth={2} aria-hidden="true" />
                    )}
                    {user.is_admin ? 'Remove admin' : 'Make admin'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}

export const Route = createFileRoute('/_authenticated/admin/users')({
  component: AdminUsers,
})
