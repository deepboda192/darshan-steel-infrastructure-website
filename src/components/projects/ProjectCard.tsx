import { MapPin } from 'lucide-react'
import type { Project } from '@/data/projects'
import Link from '@/components/site/NextLink'
import { ImageFrame } from '@/components/media/ImageFrame'

type ProjectCardProps = {
  project: Project
  /** Set on the first cards above the fold so their photographs load eagerly. */
  priority?: boolean
}

/**
 * Project card — the reference's `project-link`: a 76%-tall photograph under
 * a gradient wash, the building type as an accent tag at the top and, at the
 * foot, the location above the project name. The photograph eases in a
 * little on hover. The whole card links to the project's record.
 */
export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const pending = project.verified ? undefined : 'true'

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block overflow-hidden bg-neutral-1 pt-[76%] max-xs:pt-[78%]"
    >
      <div className="absolute inset-0">
        <ImageFrame
          image={{
            src: project.photo,
            alt: `${project.name} — ${project.buildingType}`,
            plate: project.plate,
            label: `PLATE ${project.index}`,
          }}
          tone="dark"
          ratio="fill"
          zoom
          priority={priority}
          sizes="(min-width: 1024px) 45vw, 100vw"
          captioned
        />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#000000e6,#0000000d_55%)]" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-between p-10 max-md:p-8 max-xs:p-6">
        <span className="m-tag">{project.buildingType}</span>

        <div className="flex flex-col">
          {project.location && (
            <div className="mb-6 flex items-center gap-3.5 border-b border-white/50 pb-6">
              <MapPin size={18} className="shrink-0 text-accent" aria-hidden="true" />
              <p className="text-[18px] font-semibold text-white" data-placeholder={pending}>
                {project.location}
              </p>
            </div>
          )}
          <h3 className="m-h3 light max-w-[360px] max-xs:max-w-none" data-placeholder={pending}>
            {project.name}
          </h3>
        </div>
      </div>
    </Link>
  )
}
