import { useId, useRef, useState, type ChangeEvent } from 'react'
import { ChevronLeft, ChevronRight, ImagePlus, Trash2, UploadCloud } from 'lucide-react'
import type { ProjectImage } from '@/data/projects'
import { PROJECT_IMAGE_ACCEPT, checkProjectImage, uploadProjectImage } from '@/lib/project-images'

type GalleryUploadProps = {
  value: ProjectImage[]
  onChange: (items: ProjectImage[]) => void
  /** Names the files in the bucket and the alt text of new photographs. */
  projectName?: string
  slugHint?: string
  disabled?: boolean
}

/** Re-numbers the plates so labels always run 01, 02, … in display order. */
const relabel = (items: ProjectImage[]): ProjectImage[] =>
  items.map((item, i) => ({ ...item, label: `PLATE ${String(i + 1).padStart(2, '0')}` }))

/**
 * Gallery control for the project editor: the photographs in display order
 * as thumbnails, each with move-left, move-right and remove; an upload button
 * that takes several files at once and appends them, uploaded to the public
 * `project-images` bucket. New photographs get the project's name as alt text
 * and a sequential plate label; a project with no gallery shows the stock set
 * on the site until photographs are added here.
 */
export function GalleryUpload({
  value,
  onChange,
  projectName,
  slugHint,
  disabled = false,
}: GalleryUploadProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null)
  const [errors, setErrors] = useState<string[]>([])

  const busy = progress !== null

  async function onPick(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? [])
    event.target.value = ''
    if (files.length === 0) return

    const problems: string[] = []
    const accepted = files.filter((file) => {
      const problem = checkProjectImage(file)
      if (problem) problems.push(problem)
      return !problem
    })
    setErrors(problems)
    if (accepted.length === 0) return

    setProgress({ done: 0, total: accepted.length })
    let next = value
    for (const [i, file] of accepted.entries()) {
      try {
        const src = await uploadProjectImage(file, 'gallery', slugHint || projectName || 'project')
        next = relabel([
          ...next,
          {
            src,
            alt: `${projectName?.trim() || 'Project'} — photograph ${next.length + 1}`,
            plate: 'frames',
            label: '',
          },
        ])
        onChange(next)
      } catch (e) {
        problems.push(`${file.name}: ${e instanceof Error ? e.message : 'the upload failed.'}`)
        setErrors([...problems])
      }
      setProgress({ done: i + 1, total: accepted.length })
    }
    setProgress(null)
  }

  const move = (from: number, to: number) => {
    if (to < 0 || to >= value.length) return
    const next = [...value]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    onChange(relabel(next))
  }
  const remove = (index: number) => onChange(relabel(value.filter((_, i) => i !== index)))

  return (
    <div className="mt-2 flex flex-col gap-4">
      {value.length > 0 ? (
        <ul className="grid grid-cols-4 gap-3 max-md:grid-cols-3 max-xs:grid-cols-2">
          {value.map((item, i) => (
            <li key={item.src} className="group relative overflow-hidden border border-black/15 bg-neutral-1">
              <div className="aspect-[4/3]">
                <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
              </div>
              <span className="absolute left-2 top-2 bg-secondary/80 px-1.5 py-0.5 font-heading text-[11px] font-semibold text-white">
                {item.label}
              </span>
              <div className="flex items-center justify-between border-t border-black/10 bg-white px-1.5 py-1">
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => move(i, i - 1)}
                    disabled={disabled || busy || i === 0}
                    aria-label={`Move ${item.label} earlier`}
                    className="flex h-8 w-8 items-center justify-center text-neutral-7 transition-colors hover:text-accent disabled:opacity-30"
                  >
                    <ChevronLeft aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, i + 1)}
                    disabled={disabled || busy || i === value.length - 1}
                    aria-label={`Move ${item.label} later`}
                    className="flex h-8 w-8 items-center justify-center text-neutral-7 transition-colors hover:text-accent disabled:opacity-30"
                  >
                    <ChevronRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  disabled={disabled || busy}
                  aria-label={`Remove ${item.label}`}
                  className="flex h-8 w-8 items-center justify-center text-error transition-opacity disabled:opacity-30"
                >
                  <Trash2 aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center gap-3 border border-dashed border-black/20 bg-neutral-1 px-4 py-5 text-[14px] text-neutral-6">
          <ImagePlus aria-hidden="true" className="h-5 w-5 shrink-0 text-neutral-5" strokeWidth={1.6} />
          No photographs yet. The site shows a stock set until some are added.
        </div>
      )}

      <div className="flex flex-col gap-2">
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={PROJECT_IMAGE_ACCEPT}
          multiple
          className="sr-only"
          onChange={onPick}
          disabled={disabled || busy}
        />
        <div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={disabled || busy}
            className="inline-flex items-center gap-2 border border-black/15 bg-white px-4 py-2.5 font-heading text-[14px] font-semibold uppercase tracking-[0.5px] text-neutral-10 transition-colors duration-200 hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
          >
            <UploadCloud aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            {progress ? `Uploading ${progress.done} of ${progress.total}…` : 'Add photographs'}
          </button>
        </div>
        <p className="text-[13px] leading-[1.5] text-neutral-6">
          Select several at once. JPEG, PNG, WebP or AVIF, up to 10 MB each. Order here is the
          order on the site.
        </p>
        {errors.length > 0 && (
          <ul role="alert" className="flex flex-col gap-1 text-[13px] text-error">
            {errors.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
