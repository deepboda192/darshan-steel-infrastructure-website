import { Button } from '@/components/site/Button'

/**
 * Leadership — the reference's team opening (eyebrow left, heading right)
 * without the slider: profiles are not published until DSI supplies them,
 * so the block states that plainly and offers the way to the team instead.
 */
export function Leadership() {
  return (
    <section className="m-section overflow-hidden" aria-label="Leadership">
      <div className="m-container">
        <div className="flex justify-between gap-8 max-lg:flex-col" data-reveal="up">
          <div className="w-[200px] pt-2.5 max-lg:w-auto max-lg:pt-0">
            <p className="m-subtitle">Leadership</p>
          </div>
          <div className="flex max-w-[1000px] flex-1 flex-col gap-8 max-md:gap-6">
            <h2 className="m-h2 max-w-[500px]">The people behind it.</h2>
            <p className="m-paragraph max-w-[600px]">
              Engineering, fabrication and erection are staffed as one organisation, which is what
              keeps responsibility for the structure in a single place.
            </p>
            <p className="m-paragraph medium max-w-[600px] text-neutral-6" data-placeholder="true">
              [LEADERSHIP PROFILES TO BE SUPPLIED BY DSI] Names, roles, qualifications and
              photographs will be published here once DSI supplies them.
            </p>
            <div>
              <Button href="/#contact">Talk to our team</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
