import { galleryFor, type PlateKind } from '@/data/images'
import type { Project, ProjectImage } from '@/data/projects'

/** A row of the `projects` table as returned by the Data API. */
export type ProjectRow = {
  id: string
  idx: string
  slug: string
  name: string
  building_type: string
  location: string
  year: string
  area: string
  scope: string[]
  verified: boolean
  photo: string
  plate: string
  overview: string
  challenge: string
  approach: string
  execution: string
  result: string
  technical: unknown
  gallery: unknown
  sort_order: number
}

const asPairs = (value: unknown): { label: string; value: string }[] =>
  Array.isArray(value)
    ? (value as Record<string, unknown>[])
        .filter((entry) => entry && typeof entry === 'object')
        .map((entry) => ({ label: String(entry['label'] ?? ''), value: String(entry['value'] ?? '') }))
    : []

const asGallery = (value: unknown): ProjectImage[] =>
  Array.isArray(value)
    ? (value as Record<string, unknown>[])
        .filter((entry) => entry && typeof entry === 'object')
        .map((entry, i) => ({
          src: String(entry['src'] ?? ''),
          alt: String(entry['alt'] ?? ''),
          plate: (entry['plate'] as PlateKind) ?? 'frames',
          label: String(entry['label'] ?? `PLATE 0${i + 1}`),
        }))
    : []

/** Maps a database row onto the shape the site's project components expect. */
export function rowToProject(row: ProjectRow, position: number): Project {
  const gallery = asGallery(row.gallery)

  return {
    index: row.idx,
    slug: row.slug,
    name: row.name,
    buildingType: row.building_type,
    location: row.location,
    year: row.year,
    area: row.area,
    scope: row.scope ?? [],
    verified: row.verified,
    photo: row.photo,
    plate: (row.plate as PlateKind) ?? 'frames',
    study: {
      overview: row.overview,
      challenge: row.challenge,
      approach: row.approach,
      execution: row.execution,
      result: row.result,
    },
    technical: asPairs(row.technical),
    gallery: gallery.length ? gallery : galleryFor(position, row.building_type),
  }
}

export const PROJECT_COLUMNS =
  'id, idx, slug, name, building_type, location, year, area, scope, verified, photo, plate, overview, challenge, approach, execution, result, technical, gallery, sort_order'
