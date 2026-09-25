import { Button } from '@/components/site/Button'
import { useMotion } from '@/lib/motion'

/**
 * 404 — the reference's not-found page: the number in the accent, one line
 * of explanation, and the way back.
 */
export function NotFoundPage() {
  // The footer beneath carries entrance animations; arm them for this page too.
  useMotion()

  return (
    <section
      className="relative flex min-h-[78svh] flex-col justify-center bg-secondary pb-20 pt-[78px] text-white"
      aria-label="Page not found"
    >
      <div className="m-container">
        <div className="flex flex-col items-center gap-8 py-10 text-center">
          <p className="font-heading text-[200px] font-bold leading-[0.8] text-accent max-md:text-[150px] max-xs:text-[130px]">
            404
          </p>
          <div className="flex flex-col gap-3">
            <h1 className="m-h3 light">This page is not in the drawing set.</h1>
            <p className="mx-auto max-w-[520px] text-[20px] leading-[1.5] text-neutral-1 max-xs:text-[16px]">
              The address you followed does not match a page on this site. It may have been moved,
              renamed, or typed incorrectly.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="/">Back to Home</Button>
            <Button href="/projects" variant="outline" tone="dark">
              View Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
