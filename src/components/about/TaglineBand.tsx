import { company } from '@/data/company'
import { droneVideo } from '@/data/images'
import { useLazyVideo } from '@/lib/useLazyVideo'

/**
 * The tagline band — a full-viewport section with DSI's drone footage of the
 * works running behind the company line, set as hollow display type in a
 * marquee across the upper part of the screen. The video loads like the hero's:
 * nothing until the page has loaded and the browser is idle, and the dark
 * tint keeps the outlined type legible over the footage until then.
 */
export function TaglineBand() {
  const line = `${company.tagline}.`
  const { ref } = useLazyVideo(droneVideo.src)

  return (
    <section
      className="relative flex h-svh min-h-[520px] items-start overflow-hidden bg-secondary pt-[11svh] max-md:pt-[10svh]"
      aria-label={company.tagline}
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
      {/* A tint plus a soft band behind the line, so the outline reads over bright sky and roofs alike.
          The line sits in the upper part of the band (user's choice, 2026-09-28), with clear sky above it. */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/35" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[36svh] bg-[linear-gradient(180deg,transparent,#14141480_30%,#14141480_70%,transparent)]"
      />

      <div className="relative w-full m-marquee" data-marquee="left" data-marquee-speed="40" aria-hidden="true">
        {[0, 1].map((track) => (
          <div key={track} className="m-marquee-track gap-16 pr-16 max-xs:gap-10 max-xs:pr-10" data-marquee-track>
            {Array.from({ length: 4 }, (_, i) => (
              <p
                key={i}
                className="whitespace-nowrap font-heading text-[150px] font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_#fff] max-lg:text-[100px] max-md:text-[90px] max-xs:text-[64px] max-xs:[-webkit-text-stroke:1px_#fff]"
              >
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
      <p className="sr-only">{line}</p>
    </section>
  )
}
