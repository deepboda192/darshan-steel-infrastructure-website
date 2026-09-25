import { useEffect, useRef, useState } from 'react'

type NetworkInformation = { saveData?: boolean; effectiveType?: string }

/** Connections on which a multi-megabyte clip is not worth the bytes. */
const SLOW = ['slow-2g', '2g', '3g']

/**
 * Drives a muted, looping background video that costs nothing at first
 * paint: the element is rendered without a source, and the file is attached
 * only after the page's load event, when the browser is idle. Skipped for
 * people who prefer reduced motion or are on data saver or a slow
 * connection. A clip a browser paused while the tab was hidden resumes when
 * it is visible again, unless the visitor paused it themselves.
 *
 * Returns `started` (frames have played at least once — for fade-ins),
 * `playing` (currently running — for a play/pause control) and `toggle`.
 */
export function useLazyVideo(src: string) {
  const ref = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection
    if (connection?.saveData || SLOW.includes(connection?.effectiveType ?? '')) return

    let cancelled = false
    let idle: number | undefined
    let timer: number | undefined

    const attach = () => {
      if (cancelled) return
      // React sets `muted` as a property, which some engines ignore for
      // autoplay decisions; setting it here before the source is attached
      // makes muted autoplay reliable everywhere.
      video.muted = true
      video.src = src
      video.load()
      video.play().catch(() => {
        /* autoplay refused — whatever sits beneath the video stays */
      })
    }
    const whenIdle = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idle = window.requestIdleCallback(attach, { timeout: 2000 })
      } else {
        timer = window.setTimeout(attach, 500)
      }
    }

    if (document.readyState === 'complete') whenIdle()
    else window.addEventListener('load', whenIdle, { once: true })

    const onPlaying = () => {
      setStarted(true)
      setPlaying(true)
    }
    const onPause = () => setPlaying(false)
    video.addEventListener('playing', onPlaying)
    video.addEventListener('pause', onPause)

    const onVisible = () => {
      if (
        document.visibilityState === 'visible' &&
        video.src &&
        video.paused &&
        !video.dataset.userPaused
      ) {
        video.play().catch(() => {})
      }
    }
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      cancelled = true
      window.removeEventListener('load', whenIdle)
      if (idle !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idle)
      }
      if (timer !== undefined) window.clearTimeout(timer)
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('pause', onPause)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [src])

  const toggle = () => {
    const video = ref.current
    if (!video || !video.src) return
    if (video.paused) {
      delete video.dataset.userPaused
      video.play().catch(() => {})
    } else {
      video.dataset.userPaused = 'true'
      video.pause()
    }
  }

  return { ref, started, playing, toggle }
}
