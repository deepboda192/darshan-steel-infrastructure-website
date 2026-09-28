import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ClipboardCopy, ExternalLink, FolderKanban, Pencil, Plus, Trash2, X } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/integrations/supabase/client'
import { PROJECT_COLUMNS, asGallery, type ProjectRow } from '@/lib/projects-map'
import type { ProjectImage } from '@/data/projects'
import { cn } from '@/lib/cn'
import { Button } from '@/components/site/Button'
import { Select } from '@/components/site/Select'
import { Card, Chip, EmptyState, IconButton, PageHeader } from '@/components/admin/ui'
import { CoverUpload } from '@/components/admin/CoverUpload'
import { GalleryUpload } from '@/components/admin/GalleryUpload'
import { overviewPrompt } from '@/lib/overview-prompt'


/** The building types a record can be filed under, as shown on the cards and the filter chips. */
const BUILDING_TYPES = [
  'Warehouse / Logistics',
  'Industrial Manufacturing',
  'Textile',
  'Pharmaceutical',
  'Food Processing',
  'Cold Storage',
  'Agriculture',
  'Automotive',
  'Chemical',
  'Power / Energy',
  'Infrastructure',
  'Commercial',
  'Other',
]

/**
 * Options for the building-type select. A record filed under a value from
 * before the list existed keeps it at the top so nothing is lost on save.
 */
const buildingTypeOptions = (current: string) =>
  (current && !BUILDING_TYPES.includes(current) ? [current, ...BUILDING_TYPES] : BUILDING_TYPES).map(
    (type) => ({ value: type, label: type }),
  )

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
  gallery: ProjectImage[]
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
  verified: true,
  photo: '',
  // The drawn fallback shown only when a photograph is missing; no longer
  // chosen in the editor, every new record uses the portal-frame scene.
  plate: 'frames',
  overview: '',
  challenge: '',
  approach: '',
  execution: '',
  result: '',
  technical: '',
  gallery: [],
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
  // Records filed under the older 'Industrial Manufacturing Facility' name
  // open on the current option.
  building_type: /^industrial manufacturing/i.test(row.building_type)
    ? 'Industrial Manufacturing'
    : row.building_type,
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
  gallery: asGallery(row.gallery),
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
  /**
   * Copies a ready-to-paste prompt for an AI assistant, built from the form's
   * facts; the administrator pastes the answer back into the overview box.
   */
  async function copyPrompt(state: FormState) {
    const text = overviewPrompt({
      name: state.name,
      buildingType: state.building_type,
      location: state.location,
      area: state.area,
    })
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Prompt copied — paste it into your AI assistant, then paste the answer here')
    } catch {
      toast.error('Could not copy. Select the overview box and use the prompt from the docs.')
    }
  }

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
        // The record number is no longer edited: kept for existing records, and
        // assigned from the list length for new ones.
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
        // Anything saved through the editor is real, published data: the old
        // placeholder flag from the seeded catalogue is cleared on save.
        verified: true,
        photo: state.photo,
        plate: state.plate,
        overview: state.overview,
        challenge: state.challenge,
        approach: state.approach,
        execution: state.execution,
        result: state.result,
        technical: textToPairs(state.technical),
        gallery: state.gallery,
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

  const addProject = () => setForm({ ...EMPTY, sort_order: rows.length + 1 })

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Projects"
        title="Project records"
        description="The projects shown on the site, in display order. Each opens on its own page."
        actions={
          <Button arrow={false} onClick={addProject}>
            <span className="inline-flex items-center gap-2">
              <Plus size={16} strokeWidth={2.2} aria-hidden="true" />
              Add project
            </span>
          </Button>
        }
      />

      <Card padded={false}>
        <div className="grid grid-cols-[64px_1fr_170px_180px_120px_120px] items-center gap-4 border-b border-black/[0.08] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.5px] text-neutral-5 max-lg:hidden">
          <span />
          <span>Project</span>
          <span>Building type</span>
          <span>Location</span>
          <span>Order</span>
          <span className="text-right">Actions</span>
        </div>

        {isLoading && (
          <p role="status" className="px-6 py-8 text-[14px] text-neutral-6">
            Loading…
          </p>
        )}

        {!isLoading && rows.length === 0 && (
          <EmptyState
            icon={<FolderKanban size={22} strokeWidth={1.8} aria-hidden="true" />}
            title="No projects yet"
            body="Add the first record: the name, building type, location, area, a short overview and the photographs."
            action={
              <Button arrow={false} onClick={addProject}>
                Add project
              </Button>
            }
          />
        )}

        {rows.length > 0 && (
          <ul>
            {rows.map((row) => (
              <li
                key={row.id}
                className="grid grid-cols-[64px_1fr_170px_180px_120px_120px] items-center gap-4 border-b border-black/[0.06] px-6 py-3.5 last:border-b-0 max-lg:grid-cols-[64px_1fr_auto] max-lg:gap-3"
              >
                <span className="h-12 w-16 overflow-hidden rounded-[3px] bg-neutral-1">
                  {row.photo && <img src={row.photo} alt="" className="h-full w-full object-cover" />}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-medium text-neutral-10">{row.name}</p>
                  <p className="truncate text-[13px] text-neutral-6">/projects/{row.slug}</p>
                </div>
                <div className="max-lg:hidden">
                  <Chip>{row.building_type}</Chip>
                </div>
                <p className="truncate text-[14px] text-neutral-7 max-lg:hidden">{row.location}</p>
                <p className="text-[14px] text-neutral-7 tabular-nums max-lg:hidden">{row.sort_order}</p>
                <div className="flex items-center justify-end gap-1">
                  <IconButton label="Open the project page" href={`/projects/${row.slug}`}>
                    <ExternalLink size={16} strokeWidth={1.8} aria-hidden="true" />
                  </IconButton>
                  <IconButton label={`Edit ${row.name}`} onClick={() => setForm(rowToForm(row))}>
                    <Pencil size={16} strokeWidth={1.8} aria-hidden="true" />
                  </IconButton>
                  <IconButton
                    label={`Delete ${row.name}`}
                    tone="danger"
                    disabled={remove.isPending}
                    onClick={() => {
                      if (confirm(`Delete "${row.name}"? This cannot be undone.`)) remove.mutate(row.id)
                    }}
                  >
                    <Trash2 size={16} strokeWidth={1.8} aria-hidden="true" />
                  </IconButton>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {form ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/60 p-4 backdrop-blur-[2px] sm:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) setForm(null)
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (!form.building_type) {
                toast.error('Choose a building type')
                return
              }
              save.mutate(form)
            }}
            className="flex max-h-[calc(100svh-32px)] w-full max-w-[880px] flex-col overflow-hidden rounded-[6px] bg-white shadow-[0_24px_64px_#00000040] sm:max-h-[calc(100svh-64px)]"
          >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-black/[0.08] bg-white px-8 py-5 max-xs:px-5">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.5px] text-neutral-5">
                  {form.id ? 'Editing' : 'New record'}
                </p>
                <h3 className="font-heading text-[22px] font-bold leading-(--lh-sm) text-neutral-10">
                  {form.id ? form.name || 'Edit project' : 'New project'}
                </h3>
              </div>
              <IconButton label="Close" onClick={() => setForm(null)}>
                <X size={18} strokeWidth={2} aria-hidden="true" />
              </IconButton>
            </div>

            <div className="grid min-h-0 flex-1 content-start gap-5 overflow-y-auto px-8 py-7 sm:grid-cols-2 max-xs:px-5">
              <Field label="Project name">
                <input
                  required
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                />
              </Field>
              <div className="flex flex-col">
                <label htmlFor="project-building-type" className={`${LABEL} mb-2`}>
                  Building type
                </label>
                <Select
                  id="project-building-type"
                  value={form.building_type}
                  onChange={(next) => set('building_type', next)}
                  options={buildingTypeOptions(form.building_type)}
                  placeholder="Select building type"
                />
              </div>
              <Field label="URL slug">
                <input
                  className={inputClass}
                  placeholder="auto from name"
                  value={form.slug}
                  onChange={(e) => set('slug', e.target.value)}
                />
              </Field>
              <Field label="Location">
                <input
                  className={inputClass}
                  value={form.location}
                  onChange={(e) => set('location', e.target.value)}
                />
              </Field>
              <Field label="Built-up area">
                <input
                  className={inputClass}
                  value={form.area}
                  onChange={(e) => set('area', e.target.value)}
                />
              </Field>
              <Field label="Display order">
                <input
                  type="number"
                  className={inputClass}
                  value={form.sort_order}
                  onChange={(e) => set('sort_order', Number(e.target.value))}
                />
              </Field>
              {/* The site shows only the overview; the challenge, approach, execution,
                  result and technical fields stay in the record untouched but are
                  not edited here. */}
              <div className="flex flex-col sm:col-span-2">
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor="project-overview" className={LABEL}>
                    Overview
                  </label>
                  <button
                    type="button"
                    onClick={() => copyPrompt(form)}
                    disabled={save.isPending || !form.name.trim()}
                    title={
                      form.name.trim()
                        ? 'Copies a prompt for an AI assistant with these project details filled in'
                        : 'Enter the project name first'
                    }
                    className="inline-flex items-center gap-1.5 font-heading text-[13px] font-semibold uppercase tracking-[0.5px] text-accent transition-colors duration-200 hover:text-accent-deep disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ClipboardCopy aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                    Copy prompt
                  </button>
                </div>
                <textarea
                  id="project-overview"
                  rows={4}
                  className={inputClass}
                  value={form.overview}
                  onChange={(e) => set('overview', e.target.value)}
                  placeholder="Two or three sentences on the client and what DSI built — or copy the prompt, run it in an AI assistant and paste the answer here."
                />
              </div>
              <div className="flex flex-col sm:col-span-2">
                <span className={LABEL}>Cover image</span>
                <CoverUpload
                  value={form.photo}
                  onChange={(url) => set('photo', url)}
                  slugHint={form.slug || form.name}
                  disabled={save.isPending}
                />
              </div>
              <div className="flex flex-col sm:col-span-2">
                <span className={LABEL}>Gallery</span>
                <GalleryUpload
                  value={form.gallery}
                  onChange={(items) => set('gallery', items)}
                  projectName={form.name}
                  slugHint={form.slug || form.name}
                  disabled={save.isPending}
                />
              </div>


            </div>

            <div className="flex shrink-0 flex-wrap items-center justify-end gap-3 border-t border-black/[0.08] bg-white px-8 py-4 max-xs:px-5">
              <Button variant="outline" arrow={false} onClick={() => setForm(null)}>
                Cancel
              </Button>
              <Button type="submit" arrow={false} disabled={save.isPending}>
                {save.isPending ? 'Saving…' : form.id ? 'Save changes' : 'Create project'}
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
