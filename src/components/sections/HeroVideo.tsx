import { heroVideo } from '@/data/images'
import { useLazyVideo } from '@/lib/useLazyVideo'
import { cn } from '@/lib/cn'

/**
 * The looping backdrop behind the hero photograph.
 *
 * It costs nothing at first paint: the element is server-rendered without a
 * source and lib/useLazyVideo attaches the file only after the page's load
 * event, when the browser is idle. The layer fades in once frames are
 * actually playing — the photograph beneath stays the first (and largest)
 * contentful paint throughout. People who prefer reduced motion, or who are
 * on data saver or a slow connection, keep the still.
 */
export function HeroVideo() {
  const { ref, started } = useLazyVideo(heroVideo.src)

  return (
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
      className={cn(
        'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out',
        started ? 'opacity-100' : 'opacity-0',
      )}
    />
  )
}
