import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/site/Button'

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
    },
    onError: (e: unknown) =>
      toast.error(e instanceof Error && e.message ? e.message : 'Could not update access'),
  })

  return (
    <div>
      <h2 className="font-heading text-[28px] font-bold leading-(--lh-sm) text-neutral-10">Staff accounts</h2>
      <p className="mt-3 max-w-[640px] text-[15px] leading-[1.6] text-neutral-7">
        Anyone can create an account at /auth, but only accounts marked as administrator here can
        manage site content.
      </p>

      {isLoading && (
        <p role="status" className="mt-8 text-[15px] text-neutral-6">
          Loading accounts…
        </p>
      )}
      {error && (
        <p role="alert" className="mt-8 border border-error/40 bg-error/5 px-4 py-3 text-[14px] text-error">
          {error.message}
        </p>
      )}

      {data && (
        <ul className="mt-8 border border-black/10 bg-white">
          {data.map((user) => (
            <li
              key={user.id}
              className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 p-5 last:border-b-0"
            >
              <div className="min-w-0">
                <p className="truncate text-[16px] font-medium text-neutral-10">{user.email}</p>
                <p className="mt-1 text-[13px] uppercase text-neutral-6">
                  Joined {new Date(user.created_at).toLocaleDateString('en-IN')} ·{' '}
                  {user.is_admin ? 'Administrator' : 'No admin access'}
                </p>
              </div>
              <Button
                variant={user.is_admin ? 'outline' : 'primary'}
                arrow={false}
                disabled={mutation.isPending}
                onClick={() => mutation.mutate({ userId: user.id, makeAdmin: !user.is_admin })}
              >
                {user.is_admin ? 'Remove admin' : 'Make admin'}
              </Button>
            </li>
          ))}
          {data.length === 0 && <li className="p-5 text-[15px] text-neutral-6">No accounts yet.</li>}
        </ul>
      )}
    </div>
  )
}

export const Route = createFileRoute('/_authenticated/admin/users')({
  component: AdminUsers,
})
