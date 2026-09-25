import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { supabase } from '@/integrations/supabase/client'
import { PROJECT_COLUMNS, type ProjectRow } from '@/lib/projects-map'
import { cn } from '@/lib/cn'
import { Button } from '@/components/site/Button'
import { Select } from '@/components/site/Select'

const PLATES = ['frames', 'erection', 'plant', 'blueprint', 'warehouse', 'coldstore', 'aerial']

type FormState = {
  id?: string
  idx: string
  slug: string
  name: string
  building_type: string
  location: string
  year: string
  area: string
  scope: string
  verified: boolean
  photo: string
  plate: string
  overview: string
  challenge: string
  approach: string
  execution: string
  result: string
  technical: string
  sort_order: number
}

const EMPTY: FormState = {
  idx: '',
  slug: '',
  name: '',
  building_type: '',
  location: '',
  year: '',
  area: '',
  scope: 'Design & Engineering, Fabrication, Supply, Erection',
  verified: false,
  photo: '',
  plate: 'frames',
  overview: '',
  challenge: '',
  approach: '',
  execution: '',
  result: '',
  technical: 'Frame type: Clear-span portal\nSpan: \nEave height: ',
  sort_order: 0,
}

const pairsToText = (value: unknown) =>
  Array.isArray(value)
    ? (value as { label?: string; value?: string }[])
        .map((p) => `${p.label ?? ''}: ${p.value ?? ''}`)
        .join('\n')
    : ''

const textToPairs = (text: string) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const at = line.indexOf(':')
      return at === -1
        ? { label: line, value: '' }
        : { label: line.slice(0, at).trim(), value: line.slice(at + 1).trim() }
    })

const rowToForm = (row: ProjectRow): FormState => ({
  id: row.id,
  idx: row.idx,
  slug: row.slug,
  name: row.name,
  building_type: row.building_type,
  location: row.location,
  year: row.year,
  area: row.area,
  scope: (row.scope ?? []).join(', '),
  verified: row.verified,
  photo: row.photo,
  plate: row.plate,
  overview: row.overview,
  challenge: row.challenge,
  approach: row.approach,
  execution: row.execution,
  result: row.result,
  technical: pairsToText(row.technical),
  sort_order: row.sort_order,
})

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const inputClass = 'm-field mt-2'
const LABEL = 'font-heading text-[14px] font-semibold uppercase tracking-[0.5px] text-neutral-8'

function Field({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <label className={cn('block', className)}>
      <span className={LABEL}>{label}</span>
      {children}
    </label>
  )
}

function AdminProjects() {
  const queryClient = useQueryClient()
  const [form, setForm] = useState<FormState | null>(null)

  const { data: rows = [], isLoading } = useQuery({
    queryKey: ['admin', 'projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(PROJECT_COLUMNS)
        .order('sort_order', { ascending: true })
      if (error) throw error
      return data as unknown as ProjectRow[]
    },
  })

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['admin', 'projects'] })
    queryClient.invalidateQueries({ queryKey: ['projects'] })
  }

  const save = useMutation({
    mutationFn: async (state: FormState) => {
      const payload = {
        idx: state.idx || String((rows.length ?? 0) + 1).padStart(2, '0'),
        slug: state.slug || slugify(state.name || state.building_type),
        name: state.name,
        building_type: state.building_type,
        location: state.location,
        year: state.year,
        area: state.area,
        scope: state.scope
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        verified: state.verified,
        photo: state.photo,
        plate: state.plate,
        overview: state.overview,
        challenge: state.challenge,
        approach: state.approach,
        execution: state.execution,
        result: state.result,
        technical: textToPairs(state.technical),
        sort_order: Number(state.sort_order) || 0,
      }

      const query = state.id
        ? supabase.from('projects').update(payload).eq('id', state.id)
        : supabase.from('projects').insert(payload)

      const { error } = await query
      if (error) throw error
    },
    onSuccess: () => {
      toast.success('Project saved')
      setForm(null)
      invalidate()
    },
    onError: (error: Error) => toast.error(error.message),
  })

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('projects').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      toast.success('Project deleted')
      invalidate()
    },
    onError: (error: Error) => toast.error(error.message),
  })

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev))

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-heading text-[28px] font-bold leading-(--lh-sm) text-neutral-10">Projects</h2>
        <Button arrow={false} onClick={() => setForm({ ...EMPTY, sort_order: rows.length + 1 })}>
          Add project
        </Button>
      </div>

      {isLoading ? (
        <p role="status" className="mt-8 text-[15px] text-neutral-6">
          Loading…
        </p>
      ) : (
        <ul className="mt-8 border border-black/10 bg-white">
          {rows.map((row) => (
            <li
              key={row.id}
              className="flex flex-wrap items-center gap-5 border-b border-black/10 p-5 last:border-b-0"
            >
              <span className="font-heading text-[24px] font-bold text-neutral-3 tabular-nums">{row.idx}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-heading text-[18px] font-semibold text-neutral-10">{row.name}</p>
                <p className="mt-1 text-[13px] uppercase text-neutral-6">
                  {row.building_type} · /projects/{row.slug} ·{' '}
                  {row.verified ? 'Published data' : 'Placeholder data'}
                </p>
              </div>
              <button type="button" onClick={() => setForm(rowToForm(row))} className="m-link">
                Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Delete "${row.name}"? This cannot be undone.`)) remove.mutate(row.id)
                }}
                className="text-[16px] font-medium text-error underline underline-offset-[3px]"
              >
                Delete
              </button>
            </li>
          ))}
          {rows.length === 0 ? <li className="p-5 text-[15px] text-neutral-6">No projects yet.</li> : null}
        </ul>
      )}

      {form ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 p-4 sm:p-10">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              save.mutate(form)
            }}
            className="mx-auto max-w-3xl bg-white p-8 shadow-[0_10px_25px_#0000004d] max-xs:p-5"
          >
            <div className="flex items-center justify-between border-b border-black/10 pb-5">
              <h3 className="font-heading text-[24px] font-bold leading-(--lh-sm) text-neutral-10">
                {form.id ? 'Edit project' : 'New project'}
              </h3>
              <button type="button" onClick={() => setForm(null)} className="m-link">
                Close
              </button>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Project name">
                <input
                  required
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                />
              </Field>
              <Field label="Building type">
                <input
                  required
                  className={inputClass}
                  value={form.building_type}
                  onChange={(e) => set('building_type', e.target.value)}
                />
              </Field>
              <Field label="URL slug">
                <input
                  className={inputClass}
                  placeholder="auto from name"
                  value={form.slug}
                  onChange={(e) => set('slug', e.target.value)}
                />
              </Field>
              <Field label="Record number (e.g. 07)">
                <input
                  className={inputClass}
                  value={form.idx}
                  onChange={(e) => set('idx', e.target.value)}
                />
              </Field>
              <Field label="Location">
                <input
                  className={inputClass}
                  value={form.location}
                  onChange={(e) => set('location', e.target.value)}
                />
              </Field>
              <Field label="Year">
                <input
                  className={inputClass}
                  value={form.year}
                  onChange={(e) => set('year', e.target.value)}
                />
              </Field>
              <Field label="Built-up area">
                <input
                  className={inputClass}
                  value={form.area}
                  onChange={(e) => set('area', e.target.value)}
                />
              </Field>
              <Field label="Cover image path (e.g. /images/project-01.jpg)">
                <input
                  className={inputClass}
                  value={form.photo}
                  onChange={(e) => set('photo', e.target.value)}
                />
              </Field>
              <Field label="Scope (comma separated)" className="sm:col-span-2">
                <input
                  className={inputClass}
                  value={form.scope}
                  onChange={(e) => set('scope', e.target.value)}
                />
              </Field>
              <div className="flex flex-col">
                <label htmlFor="project-plate" className={`${LABEL} mb-2`}>
                  Fallback plate style
                </label>
                <Select
                  id="project-plate"
                  value={form.plate}
                  onChange={(next) => set('plate', next)}
                  options={PLATES.map((plate) => ({ value: plate, label: plate }))}
                />
              </div>
              <Field label="Display order">
                <input
                  type="number"
                  className={inputClass}
                  value={form.sort_order}
                  onChange={(e) => set('sort_order', Number(e.target.value))}
                />
              </Field>

              {(
                [
                  ['overview', 'Overview'],
                  ['challenge', 'Challenge'],
                  ['approach', 'Approach'],
                  ['execution', 'Execution'],
                  ['result', 'Result'],
                ] as const
              ).map(([key, label]) => (
                <Field key={key} label={label} className="sm:col-span-2">
                  <textarea
                    rows={3}
                    className={inputClass}
                    value={form[key]}
                    onChange={(e) => set(key, e.target.value)}
                  />
                </Field>
              ))}

              <Field label="Technical specs — one per line, 'Label: value'" className="sm:col-span-2">
                <textarea
                  rows={6}
                  className={inputClass}
                  value={form.technical}
                  onChange={(e) => set('technical', e.target.value)}
                />
              </Field>

              <label className="flex items-center gap-3 sm:col-span-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-accent"
                  checked={form.verified}
                  onChange={(e) => set('verified', e.target.checked)}
                />
                <span className="text-[15px] leading-[1.5] text-neutral-8">
                  All figures on this record are real and checked (removes the placeholder flag)
                </span>
              </label>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 border-t border-black/10 pt-6">
              <Button type="submit" arrow={false} disabled={save.isPending}>
                {save.isPending ? 'Saving…' : 'Save project'}
              </Button>
              <Button variant="outline" arrow={false} onClick={() => setForm(null)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  )
}

export const Route = createFileRoute('/_authenticated/admin/projects')({
  component: AdminProjects,
})
