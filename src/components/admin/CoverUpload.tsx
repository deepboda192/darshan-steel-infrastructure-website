import { useId, useRef, useState, type ChangeEvent } from 'react'
import { ImagePlus, Trash2, UploadCloud } from 'lucide-react'
import { PROJECT_IMAGE_ACCEPT, checkProjectImage, uploadProjectImage } from '@/lib/project-images'

type CoverUploadProps = {
  /** The stored value: a public URL from the bucket, or a legacy /images path. */
  value: string
  onChange: (url: string) => void
  /** Used to name the file in the bucket, so uploads are easy to find. */
  slugHint?: string
  disabled?: boolean
}

/**
 * Cover image control for the project editor. Shows the current cover, and
 * lets an administrator pick a file which is uploaded to the public
 * `project-images` bucket; the resulting public URL becomes the record's
 * `photo`. Legacy `/images/…` paths keep working until replaced.
 */
export function CoverUpload({ value, onChange, slugHint, disabled = false }: CoverUploadProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onPick(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    setError(null)

    const problem = checkProjectImage(file)
    if (problem) {
      setError(problem)
      return
    }

    setBusy(true)
    try {
      onChange(await uploadProjectImage(file, 'covers', slugHint || 'project'))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'The upload failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mt-2 flex flex-col gap-3">
      <div className="flex items-start gap-4">
        <div className="flex h-[96px] w-[144px] shrink-0 items-center justify-center overflow-hidden border border-black/15 bg-neutral-1">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImagePlus aria-hidden="true" className="h-6 w-6 text-neutral-5" strokeWidth={1.6} />
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={PROJECT_IMAGE_ACCEPT}
            className="sr-only"
            onChange={onPick}
            disabled={disabled || busy}
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={disabled || busy}
              className="inline-flex items-center gap-2 border border-black/15 bg-white px-4 py-2.5 font-heading text-[14px] font-semibold uppercase tracking-[0.5px] text-neutral-10 transition-colors duration-200 hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
            >
              <UploadCloud aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              {busy ? 'Uploading…' : value ? 'Replace image' : 'Upload image'}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                disabled={disabled || busy}
                className="inline-flex items-center gap-1.5 text-[14px] font-medium text-error underline underline-offset-[3px] disabled:opacity-60"
              >
                <Trash2 aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                Remove
              </button>
            )}
          </div>
          <p className="text-[13px] leading-[1.5] text-neutral-6">
            JPEG, PNG, WebP or AVIF, up to 10 MB. Landscape works best; the site crops to fit.
          </p>
          {value && (
            <p className="truncate text-[12px] text-neutral-5" title={value}>
              {value}
            </p>
          )}
          {error && (
            <p role="alert" className="text-[13px] text-error">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
