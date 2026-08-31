
import Image from '@/components/media/NextImage'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { company } from '@/data/company'

const SESSION_KEY = 'dsi:intro-shown'

/**
 * Brief brand intro on first load of a session.
 *
 * The monogram fades in, a blue rule sweeps across, the company name resolves,
 * and the panel lifts. Total ~1.3s, and it never blocks the page underneath —
 * the site is fully rendered and interactive behind it, so this costs nothing
 * in real load time.
 *
 * Skipped entirely on repeat navigation within the session and whenever the
 * visitor prefers reduced motion.
 */
export function Loader() {
  const [state, setState] = useState<'hidden' | 'playing' | 'leaving'>('hidden')

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let seen = true
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === '1'
    } catch {
      // Private mode / storage blocked — treat as seen and skip the intro.
    }

    if (reduced || seen) return

    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* non-fatal */
    }

    setState('playing')
    document.body.style.overflow = 'hidden'

    const leave = window.setTimeout(() => setState('leaving'), 1250)
    const done = window.setTimeout(() => {
      setState('hidden')
      document.body.style.overflow = ''
    }, 2000)

    return () => {
      window.clearTimeout(leave)
      window.clearTimeout(done)
      document.body.style.overflow = ''
    }
  }, [])

  if (state === 'hidden') return null

  return (
    <div
      aria-hidden="true"
      className={cn(
        'fixed inset-0 z-[200] flex items-center justify-center bg-charcoal',
        'transition-[transform,opacity] duration-[750ms] ease-[var(--ease-expo)]',
        state === 'leaving' && '-translate-y-full opacity-0',
      )}
    >
      <div
        aria-hidden="true"
        className="blueprint pointer-events-none absolute inset-0 text-white opacity-[0.04]"
      />

      <div className="relative flex flex-col items-center">
        <Image
          src="/brand/dsi-monogram-white.png"
          alt=""
          width={92}
          height={92}
          priority
          className="dsi-intro-mark"
        />

        {/* blue rule sweeping out from the centre */}
        <span className="dsi-intro-rule mt-8 block h-px w-56 origin-center bg-brand" />

        <p className="dsi-intro-name mt-7 tech text-white/70">{company.name}</p>
      </div>

      <style>{`
        .dsi-intro-mark {
          opacity: 0;
          transform: translateY(8px);
          animation: dsi-in 700ms var(--ease-expo) 60ms forwards;
        }
        .dsi-intro-rule {
          transform: scaleX(0);
          animation: dsi-rule 900ms var(--ease-expo) 320ms forwards;
        }
        .dsi-intro-name {
          opacity: 0;
          animation: dsi-in 700ms var(--ease-expo) 620ms forwards;
        }
        @keyframes dsi-in {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dsi-rule {
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  )
}
