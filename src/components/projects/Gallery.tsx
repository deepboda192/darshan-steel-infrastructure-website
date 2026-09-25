import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { ProjectImage } from '@/data/projects'
import { ImageFrame } from '@/components/media/ImageFrame'

type GalleryProps = {
  images: ProjectImage[]
  heading?: string
}

const CONTROL =
  'flex h-11 w-11 items-center justify-center border border-white/60 text-white transition-colors duration-[250ms] hover:border-accent hover:bg-accent'

/**
 * Project gallery — the reference's two-across tiles, each opening in a
 * lightbox. A tile's wash grows from its centre on hover; the lightbox is a
 * native <dialog> (Escape closes it, focus stays inside) with previous/next
 * controls and arrow-key navigation. Tiles without a photograph render the
 * plate and do not open.
 */
export function Gallery({ images, heading = 'Gallery' }: GalleryProps) {
  // A fresh object per opening, so re-opening the same image straight after
  // closing it is still a state change (React would batch null → 2 → 2 away).
  const [shown, setShown] = useState<{ index: number } | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const open = shown !== null

  useEffect(() => {
    const dialog = dialogRef.current
    if (shown && dialog && !dialog.open) dialog.showModal()
  }, [shown])

  // The page must not scroll behind the lightbox.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  // Closing goes through the element (X, the surround, Escape) and resets the
  // state at once. The element's own close event arrives a task late, so one
  // that lands after a fresh showModal() is ignored rather than allowed to
  // shut the new image.
  const close = () => {
    dialogRef.current?.close()
    setShown(null)
  }
  const onClose = () => {
    if (!dialogRef.current?.open) setShown(null)
  }

  const step = useCallback(
    (delta: number) =>
      setShown((current) =>
        current ? { index: (current.index + delta + images.length) % images.length } : current,
      ),
    [images.length],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, step])

  const current = shown ? images[shown.index] : null

  return (
    <>
      <h2 className="m-h4">{heading}</h2>
      <ul className="mt-6 grid grid-cols-2 gap-6 max-xs:grid-cols-1">
        {images.map((image, i) => {
          const frame = (
            <div className="absolute inset-0">
              <ImageFrame image={image} ratio="fill" sizes="(min-width: 1024px) 30vw, 100vw" />
            </div>
          )
          return (
            <li key={image.src + image.label}>
              {image.src ? (
                <button
                  type="button"
                  onClick={() => setShown({ index: i })}
                  aria-label={`Open image ${i + 1} of ${images.length}: ${image.alt}`}
                  className="group relative block w-full overflow-hidden bg-neutral-1 pt-[70%]"
                >
                  {frame}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 scale-0 bg-black/20 transition-transform duration-300 ease-out group-hover:scale-100"
                  />
                </button>
              ) : (
                <div className="relative overflow-hidden bg-neutral-1 pt-[70%]">{frame}</div>
              )}
            </li>
          )
        })}
      </ul>

      <dialog
        ref={dialogRef}
        onCancel={() => setShown(null)}
        onClose={onClose}
        aria-label="Gallery image"
        className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-white backdrop:bg-black/90"
      >
        {current && shown && (
          <div
            className="relative flex h-full w-full flex-col items-center justify-center gap-6 p-6"
            onClick={(event) => {
              // A click on the dark surround, not on the picture or a control, closes.
              if (event.target === event.currentTarget) close()
            }}
          >
            <button type="button" onClick={close} aria-label="Close" className={`${CONTROL} absolute right-6 top-6`}>
              <X size={20} aria-hidden="true" />
            </button>

            <figure className="flex max-h-full flex-col items-center gap-4">
              <img src={current.src} alt={current.alt} className="max-h-[74vh] max-w-[90vw] object-contain" />
              <figcaption className="max-w-[90vw] text-center text-[14px] text-neutral-2">{current.alt}</figcaption>
            </figure>

            {images.length > 1 && (
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => step(-1)} aria-label="Previous image" className={CONTROL}>
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <p className="tabular font-heading text-[14px] font-semibold text-neutral-2" aria-live="polite">
                  {shown.index + 1} / {images.length}
                </p>
                <button type="button" onClick={() => step(1)} aria-label="Next image" className={CONTROL}>
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  )
}
