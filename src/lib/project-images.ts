import { supabase } from '@/integrations/supabase/client'

/**
 * Uploads for the project editor: the cover and the gallery both go to the
 * public `project-images` bucket
 * (supabase/migrations/20260926100000_project_images_bucket.sql) and the
 * site renders them by public URL. The checks here mirror the bucket's own
 * limits so a bad file is refused before it leaves the browser.
 */
export const PROJECT_IMAGE_BUCKET = 'project-images'
export const PROJECT_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
export const PROJECT_IMAGE_ACCEPT = PROJECT_IMAGE_TYPES.join(',')
export const PROJECT_IMAGE_MAX_BYTES = 10 * 1024 * 1024

export const safeName = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/^-|-$/g, '')

/** Returns a message for the administrator if the file cannot be used, else null. */
export function checkProjectImage(file: File): string | null {
  if (!PROJECT_IMAGE_TYPES.includes(file.type)) return `${file.name}: use a JPEG, PNG, WebP or AVIF image.`
  if (file.size > PROJECT_IMAGE_MAX_BYTES) return `${file.name}: keep the image under 10 MB.`
  return null
}

/** Uploads one image and returns its public URL. Throws with a readable message. */
export async function uploadProjectImage(
  file: File,
  folder: 'covers' | 'gallery',
  stem: string,
): Promise<string> {
  const path = `${folder}/${safeName(stem) || 'project'}-${Date.now()}-${safeName(file.name)}`
  const { error } = await supabase.storage
    .from(PROJECT_IMAGE_BUCKET)
    .upload(path, file, { cacheControl: '31536000', upsert: false, contentType: file.type })
  if (error) throw new Error(error.message)
  return supabase.storage.from(PROJECT_IMAGE_BUCKET).getPublicUrl(path).data.publicUrl
}
