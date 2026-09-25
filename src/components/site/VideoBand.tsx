import { Pause, Play } from 'lucide-react'
import { heroVideo } from '@/data/images'
import { useLazyVideo } from '@/lib/useLazyVideo'

/**
 * Full-width film band — the reference's video section: the works footage
 * filling most of the viewport with a quiet play/pause control in the
 * corner. Loads exactly like the hero video: nothing until the page has
 * loaded and the browser is idle.
 */
export function VideoBand() {
  const { ref, playing, toggle } = useLazyVideo(heroVideo.src)

  return (
    <section
      className="relative h-[90svh] overflow-hidden bg-secondary max-md:h-[60svh]"
      aria-label="Inside the works"
    >
      <video
        ref={ref}
        aria-hidden="true"
        muted
        loop
        playsInline
        autoPlay
        preload="none"
        disablePictureInPicture
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/20" />

      <div className="m-container flex h-full items-end pb-10 max-xs:pb-6">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause the film' : 'Play the film'}
          aria-pressed={playing}
          className="flex h-14 w-14 items-center justify-center border border-white/60 text-white opacity-40 transition-opacity duration-300 hover:opacity-100 focus-visible:opacity-100"
        >
          {playing ? (
            <Pause size={22} aria-hidden="true" />
          ) : (
            <Play size={22} className="ml-0.5" aria-hidden="true" />
          )}
        </button>
      </div>
    </section>
  )
}
