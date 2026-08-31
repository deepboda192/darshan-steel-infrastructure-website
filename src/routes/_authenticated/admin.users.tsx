import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { toast } from 'sonner'
import { listAdminUsers, setAdminRole } from '@/lib/admin-users.functions'

function AdminUsers() {
  const fetchUsers = useServerFn(listAdminUsers)
  const updateRole = useServerFn(setAdminRole)
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: () => fetchUsers(),
  })

  const mutation = useMutation({
    mutationFn: (vars: { userId: string; makeAdmin: boolean }) => updateRole({ data: vars }),
    onSuccess: (_res, vars) => {
      toast.success(vars.makeAdmin ? 'Admin access granted' : 'Admin access removed')
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
    },
    onError: (e: any) => toast.error(e?.message ?? 'Could not update access'),
  })

  return (
    <div>
      <h2 className="font-display text-display-4 uppercase text-charcoal">Staff accounts</h2>
      <p className="measure mt-3 text-small text-muted">
        Anyone can create an account at /auth, but only accounts marked as administrator here can
        manage site content.
      </p>

      {isLoading ? <p className="tech mt-8 text-muted">Loading accounts…</p> : null}
      {error ? <p className="tech mt-8 text-brand">{(error as Error).message}</p> : null}

      <div className="mt-8 border border-charcoal/15">
        {(data ?? []).map((user) => (
          <div
            key={user.id}
            className="flex flex-wrap items-center justify-between gap-4 border-b border-charcoal/10 p-5 last:border-b-0"
          >
            <div>
              <p className="text-charcoal">{user.email}</p>
              <p className="tech mt-1 text-muted">
                Joined {new Date(user.createdAt).toLocaleDateString()} ·{' '}
                {user.isAdmin ? 'Administrator' : 'No admin access'}
              </p>
            </div>
            <button
              type="button"
              disabled={mutation.isPending}
              onClick={() => mutation.mutate({ userId: user.id, makeAdmin: !user.isAdmin })}
              className={
                user.isAdmin
                  ? 'tech border border-charcoal/25 px-5 py-2.5 uppercase text-charcoal hover:border-charcoal disabled:opacity-50'
                  : 'tech bg-brand px-5 py-2.5 uppercase text-white hover:opacity-90 disabled:opacity-50'
              }
            >
              {user.isAdmin ? 'Remove admin' : 'Make admin'}
            </button>
          </div>
        ))}
        {data && data.length === 0 ? <p className="tech p-5 text-muted">No accounts yet.</p> : null}
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_authenticated/admin/users')({
  component: AdminUsers,
})
