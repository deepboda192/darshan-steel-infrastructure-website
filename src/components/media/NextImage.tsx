import type { CSSProperties, ImgHTMLAttributes } from 'react'
import { imageManifest } from '@/data/image-manifest'

/**
 * The URL of the rendition of `src` at `width` px, or `src` itself when the
 * manifest has no such rendition. Renditions are written by
 * scripts/optimize-images.mjs as `name-480.webp`, `name-768.webp`, … beside
 * the full-size `name.webp`.
 */
export function renditionUrl(src: string, width: number): string {
  const entry = imageManifest[src]
  if (!entry || width === entry.w || !entry.widths.includes(width)) return src
  return src.replace(/\.webp$/, `-${width}.webp`)
}

/** A `srcset` for a photograph in the manifest; undefined for anything else. */
export function srcSetFor(src: string): string | undefined {
  const entry = imageManifest[src]
  if (!entry) return undefined
  return entry.widths.map((w) => `${renditionUrl(src, w)} ${w}w`).join(', ')
}

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'width' | 'height'> & {
  src: string
  alt: string
  /** Absolute, filling the positioned parent. */
  fill?: boolean
  /** The largest contentful paint only: eager, high priority, decoded synchronously. */
  priority?: boolean
  quality?: number
  width?: number | string
  height?: number | string
  sizes?: string
  style?: CSSProperties
}

/**
 * The site's image element. For a photograph in the manifest it adds the
 * `srcset` of its renditions and the intrinsic `width`/`height` (so the
 * browser can reserve the space and pick the smallest file that fills the
 * slot described by `sizes`); anything else renders as a plain <img>.
 * Everything is lazy and async unless `priority` is set.
 */
export default function Image({ fill, priority, quality: _q, style, className, src, width, height, sizes, srcSet: srcSetProp, ...rest }: Props) {
  const entry = imageManifest[src]
  const srcSet = srcSetFor(src) ?? srcSetProp
  const fillStyle: CSSProperties = fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%' } : {}

  return (
    <img
      {...rest}
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? (sizes ?? (srcSetProp ? undefined : '100vw')) : sizes}
      width={width ?? entry?.w}
      height={height ?? entry?.h}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      style={{ ...fillStyle, ...style }}
    />
  )
}
