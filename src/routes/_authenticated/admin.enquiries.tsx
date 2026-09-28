import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Check, ChevronDown, Inbox, Mail, Phone, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/integrations/supabase/client'
import type { Database } from '@/integrations/supabase/types'
import { Card, Chip, EmptyState, PageHeader } from '@/components/admin/ui'
import { cn } from '@/lib/cn'

type Enquiry = Database['public']['Tables']['enquiries']['Row']
type Filter = 'new' | 'handled' | 'all'

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'new', label: 'New' },
  { key: 'handled', label: 'Handled' },
  { key: 'all', label: 'All' },
]

const when = (value: string) =>
  new Date(value).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

const dialable = (value: string) => value.replace(/[^+\d]/g, '')

/**
 * The inbox for the contact form: every submission, newest first, with the
 * details the visitor gave and a way to mark it handled once someone has
 * replied. Reads and updates go through the signed-in client under the
 * table's admin-only policies.
 */
function AdminEnquiries() {
  const queryClient = useQueryClient()
  const [filter, setFilter] = useState<Filter>('new')
  const [open, setOpen] = useState<string | null>(null)

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin', 'enquiries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(500)
      if (error) throw new Error(error.message)
      return data
    },
  })

  const setStatus = useMutation({
    mutationFn: async (vars: { id: string; status: 'new' | 'handled' }) => {
      const { error } = await supabase.from('enquiries').update({ status: vars.status }).eq('id', vars.id)
      if (error) throw new Error(error.message)
    },
    onSuccess: (_r, vars) => {
      toast.success(vars.status === 'handled' ? 'Marked as handled' : 'Moved back to new')
      queryClient.invalidateQueries({ queryKey: ['admin', 'enquiries'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'overview'] })
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const all = data ?? []
  const counts = {
    new: all.filter((e) => e.status !== 'handled').length,
    handled: all.filter((e) => e.status === 'handled').length,
    all: all.length,
  }
  const shown = all.filter((e) =>
    filter === 'all' ? true : filter === 'handled' ? e.status === 'handled' : e.status !== 'handled',
  )

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Enquiries"
        title="Enquiries"
        description="Everything sent through the site's contact form. Mark one handled once someone has replied."
      />

      {error && (
        <p role="alert" className="rounded-[4px] border border-error/30 bg-error/5 px-4 py-3 text-[14px] text-error">
          {error.message}
        </p>
      )}

      <Card padded={false}>
        <div className="flex flex-wrap items-center gap-2 border-b border-black/[0.08] px-6 py-3">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors',
                filter === f.key
                  ? 'bg-secondary text-white'
                  : 'text-neutral-7 hover:bg-neutral-1 hover:text-neutral-10',
              )}
            >
              {f.label}
              <span className={cn('text-[12px] tabular-nums', filter === f.key ? 'text-white/70' : 'text-neutral-5')}>
                {counts[f.key]}
              </span>
            </button>
          ))}
        </div>

        {isLoading && (
          <p role="status" className="px-6 py-8 text-[14px] text-neutral-6">
            Loading enquiries…
          </p>
        )}

        {!isLoading && shown.length === 0 && (
          <EmptyState
            icon={<Inbox size={22} strokeWidth={1.8} aria-hidden="true" />}
            title={filter === 'new' ? 'No new enquiries' : 'Nothing here'}
            body={
              filter === 'new'
                ? 'New submissions from the contact form will appear here.'
                : 'Change the filter above to see other enquiries.'
            }
          />
        )}

        {shown.length > 0 && (
          <ul>
            {shown.map((e) => {
              const isOpen = open === e.id
              const handled = e.status === 'handled'
              return (
                <li key={e.id} className="border-b border-black/[0.06] last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : e.id)}
                    aria-expanded={isOpen}
                    className="grid w-full grid-cols-[1fr_180px_160px_28px] items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-neutral-1/60 max-lg:grid-cols-[1fr_28px]"
                  >
                    <div className="flex min-w-0 items-center gap-3.5">
                      <span
                        aria-hidden="true"
                        className={cn('h-2.5 w-2.5 shrink-0 rounded-full', handled ? 'bg-neutral-3' : 'bg-accent')}
                      />
                      <div className="min-w-0">
                        <p className={cn('truncate text-[15px] text-neutral-10', !handled && 'font-semibold')}>
                          {e.name}
                          {e.company ? <span className="font-normal text-neutral-6"> · {e.company}</span> : null}
                        </p>
                        <p className="truncate text-[13px] text-neutral-6">
                          {[e.project_type, e.location, e.area].filter(Boolean).join(' · ') || e.subject}
                        </p>
                      </div>
                    </div>
                    <div className="max-lg:hidden">
                      <Chip tone={handled ? 'neutral' : 'accent'}>{e.subject}</Chip>
                    </div>
                    <p className="text-[13px] text-neutral-6 max-lg:hidden">{when(e.created_at)}</p>
                    <ChevronDown
                      size={18}
                      aria-hidden="true"
                      className={cn('text-neutral-5 transition-[rotate] duration-200', isOpen && 'rotate-180')}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-black/[0.06] bg-neutral-1/50 px-6 py-5">
                      <div className="grid gap-x-8 gap-y-4 md:grid-cols-[1fr_1fr]">
                        <dl className="grid grid-cols-[130px_1fr] gap-y-2 text-[14px]">
                          <dt className="text-neutral-6">Phone</dt>
                          <dd>
                            <a href={`tel:${dialable(e.phone)}`} className="inline-flex items-center gap-1.5 text-neutral-10 hover:text-accent">
                              <Phone size={14} strokeWidth={2} aria-hidden="true" />
                              {e.phone}
                            </a>
                          </dd>
                          <dt className="text-neutral-6">Email</dt>
                          <dd>
                            <a href={`mailto:${e.email}`} className="inline-flex items-center gap-1.5 break-all text-neutral-10 hover:text-accent">
                              <Mail size={14} strokeWidth={2} aria-hidden="true" />
                              {e.email}
                            </a>
                          </dd>
                          {e.project_type && (
                            <>
                              <dt className="text-neutral-6">Project type</dt>
                              <dd className="text-neutral-10">{e.project_type}</dd>
                            </>
                          )}
                          {e.location && (
                            <>
                              <dt className="text-neutral-6">Location</dt>
                              <dd className="text-neutral-10">{e.location}</dd>
                            </>
                          )}
                          {e.area && (
                            <>
                              <dt className="text-neutral-6">Built-up area</dt>
                              <dd className="text-neutral-10">{e.area}</dd>
                            </>
                          )}
                          <dt className="text-neutral-6">Received</dt>
                          <dd className="text-neutral-10">{when(e.created_at)}</dd>
                        </dl>
                        <div>
                          <p className="text-[12px] font-semibold uppercase tracking-[0.5px] text-neutral-5">Message</p>
                          <p className="mt-1.5 whitespace-pre-line text-[14px] leading-[1.6] text-neutral-9">
                            {e.message || <span className="text-neutral-5">No message left.</span>}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-black/[0.06] pt-4">
                        <a
                          href={`mailto:${e.email}?subject=${encodeURIComponent(`Re: ${e.subject} — Darshan Steel Infrastructure`)}`}
                          className="inline-flex items-center gap-1.5 rounded-[4px] bg-accent px-3.5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-accent-deep"
                        >
                          <Mail size={14} strokeWidth={2} aria-hidden="true" />
                          Reply by email
                        </a>
                        <button
                          type="button"
                          disabled={setStatus.isPending}
                          onClick={() => setStatus.mutate({ id: e.id, status: handled ? 'new' : 'handled' })}
                          className="inline-flex items-center gap-1.5 rounded-[4px] border border-black/10 bg-white px-3.5 py-2 text-[13px] font-medium text-neutral-8 transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
                        >
                          {handled ? (
                            <RotateCcw size={14} strokeWidth={2} aria-hidden="true" />
                          ) : (
                            <Check size={14} strokeWidth={2} aria-hidden="true" />
                          )}
                          {handled ? 'Move back to new' : 'Mark handled'}
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </Card>
    </div>
  )
}

export const Route = createFileRoute('/_authenticated/admin/enquiries')({
  component: AdminEnquiries,
})
