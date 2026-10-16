/**
 * Image pipeline for public/images and public/brand.
 *
 *   node scripts/optimize-images.mjs
 *
 * Photographs (JPEG, PNG without transparency, WebP) under public/images are
 * re-encoded as WebP at a ceiling of 2000 px, with smaller renditions at the
 * widths below for `srcset`, and the original file is removed. A width added
 * to the ladder later is cut from the full-size WebP on the next run. The logo
 * and the certification marks get a 1x rendition beside the 2x master. Drawings
 * (PNG with transparency), client logos and the brand masters are kept in
 * their formats but recompressed in place. The result is recorded in
 * src/data/image-manifest.ts, which the Image component reads to build
 * `srcset`, `width` and `height` for every photo it renders.
 *
 * Re-running the script is safe: files already at the ceiling and format are
 * re-encoded only if the manifest has no entry for them.
 */
import sharp from 'sharp'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const IMAGES = path.join(ROOT, 'public', 'images')
const BRAND = path.join(ROOT, 'public', 'brand')
const CERTS = path.join(IMAGES, 'certifications')
const CLIENTS = path.join(IMAGES, 'clients')
const MANIFEST = path.join(ROOT, 'src', 'data', 'image-manifest.ts')

/** Rendition widths; the largest actual width is always included too. */
const WIDTHS = [480, 640, 768, 1024, 1200, 1600]
const CEILING = 2000
const WEBP = { quality: 72, effort: 6, smartSubsample: true }
const PNG = { palette: true, quality: 85, effort: 8, compressionLevel: 9 }

const kb = (n) => `${(n / 1024).toFixed(0)}K`
const sizeOf = async (f) => (await fs.stat(f)).size
let before = 0
let after = 0
const log = (label, a, b) => {
  before += a
  after += b
  console.log(`${label.padEnd(58)} ${kb(a).padStart(7)} -> ${kb(b).padStart(7)}`)
}

const manifest = {}
const webName = (stem, w) => (w === undefined ? `${stem}.webp` : `${stem}-${w}.webp`)

/** A photograph: WebP renditions + manifest entry, source removed. */
async function photo(file) {
  const stem = path.basename(file).replace(/\.[^.]+$/, '')
  const dir = path.dirname(file)
  const main = path.join(dir, webName(stem))
  const key = '/images/' + path.relative(IMAGES, main).replace(/\\/g, '/')
  const exists = async (p) => !!(await fs.stat(p).catch(() => null))

  // Already processed on an earlier run: record it without encoding it again.
  if (path.resolve(file) === path.resolve(main) && (await exists(path.join(dir, webName(stem, WIDTHS[0]))))) {
    const mainBuf = await fs.readFile(main)
    const { width, height } = await sharp(mainBuf).metadata()
    const widths = []
    for (const w of WIDTHS) {
      if (w >= width) continue
      const out = path.join(dir, webName(stem, w))
      if (!(await exists(out))) {
        // a width added to the ladder later: cut it from the full-size rendition
        await sharp(mainBuf).resize({ width: w }).webp(WEBP).toFile(out + '.tmp')
        await fs.rename(out + '.tmp', out)
      }
      widths.push(w)
    }
    manifest[key] = { w: width, h: height, widths: [...widths, width] }
    log(key + ' (kept)', mainBuf.length, mainBuf.length)
    return
  }

  const buf = await fs.readFile(file)
  const meta = await sharp(buf).metadata()
  const largest = Math.min(meta.width, CEILING)
  const widths = [...WIDTHS.filter((w) => w < largest), largest]
  const srcSize = buf.length
  let mainSize = 0
  for (const w of widths) {
    const out = path.join(dir, webName(stem, w === largest ? undefined : w))
    const tmp = out + '.tmp'
    await sharp(buf).rotate().resize({ width: w, withoutEnlargement: true }).webp(WEBP).toFile(tmp)
    if (await exists(out)) await fs.unlink(out)
    await fs.rename(tmp, out)
    if (w === largest) mainSize = await sizeOf(out)
  }
  const { width, height } = await sharp(await fs.readFile(main)).metadata()
  if (path.resolve(file) !== path.resolve(main)) await fs.unlink(file)
  manifest[key] = { w: width, h: height, widths: widths.map((w) => (w === largest ? width : w)) }
  log(key, srcSize, mainSize)
}

/** A drawing or logo with transparency: PNG recompressed in place. */
async function png(file, resizeTo) {
  const srcSize = await sizeOf(file)
  const tmp = file + '.tmp'
  let p = sharp(file)
  if (resizeTo) p = p.resize({ width: resizeTo, withoutEnlargement: true })
  await p.png(PNG).toFile(tmp)
  const newSize = await sizeOf(tmp)
  if (newSize < srcSize) await fs.rename(tmp, file)
  else await fs.unlink(tmp)
  log(path.relative(ROOT, file).replace(/\\/g, '/'), srcSize, Math.min(newSize, srcSize))
}

/** A single WebP at a fixed width (logos, thumbnails). Keeps the source. */
async function single(file, out, width, quality = 80) {
  const srcSize = await sizeOf(file)
  await sharp(file).resize({ width, withoutEnlargement: true }).webp({ quality, effort: 5 }).toFile(out)
  log(path.relative(ROOT, out).replace(/\\/g, '/'), srcSize, await sizeOf(out))
}

async function main() {
  // ---- photographs and drawings in public/images (top level only) ----
  for (const name of await fs.readdir(IMAGES)) {
    const file = path.join(IMAGES, name)
    if ((await fs.stat(file)).isDirectory()) continue
    const ext = path.extname(name).toLowerCase()
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue
    if (/-(480|640|768|1024|1200|1600)\.webp$/.test(name)) continue // a rendition from an earlier run
    if (ext === '.png') {
      const meta = await sharp(file).metadata()
      if (meta.hasAlpha) {
        await png(file)
        continue
      }
    }
    await photo(file)
  }

  // ---- client logos: recompressed in place, dimensions unchanged ----
  for (const name of await fs.readdir(CLIENTS)) {
    if (path.extname(name).toLowerCase() === '.png') await png(path.join(CLIENTS, name))
  }

  // ---- certification marks and scanned certificates ----
  for (const name of await fs.readdir(CERTS)) {
    const file = path.join(CERTS, name)
    if (/^tuv-sud-iso-\d+\.webp$/.test(name)) {
      const small = path.join(CERTS, name.replace(/\.webp$/, '-112.webp'))
      if (!(await fs.stat(small).catch(() => null))) await single(file, small, 112, 85)
      continue
    }
    if (path.extname(name).toLowerCase() !== '.png') continue
    const stem = name.replace(/\.png$/, '')
    if (stem.startsWith('certificate-')) {
      // the scan stays as the download; a preview and a thumbnail serve the page
      await single(file, path.join(CERTS, `${stem}.webp`), 1200, 80)
      await single(file, path.join(CERTS, `${stem}-thumb.webp`), 160, 75)
    } else {
      // a mark shown at 56–88 px: 2x and 1x WebPs replace the PNG
      await single(file, path.join(CERTS, `${stem}.webp`), 160, 85)
      await single(file, path.join(CERTS, `${stem}-112.webp`), 112, 85)
      await fs.unlink(file)
    }
  }

  // ---- brand: small WebP renditions beside the untouched masters ----
  // 2x and 1x renditions; components/layout/Logo.tsx lists both in a srcset
  for (const stem of ['dsi-logo', 'dsi-logo-white']) {
    await single(path.join(BRAND, `${stem}.png`), path.join(BRAND, `${stem}.webp`), 360, 85)
    await single(path.join(BRAND, `${stem}.png`), path.join(BRAND, `${stem}-180.webp`), 180, 85)
  }
  for (const stem of ['dsi-monogram', 'dsi-monogram-white']) {
    await single(path.join(BRAND, `${stem}.png`), path.join(BRAND, `${stem}.webp`), 120, 85)
    await single(path.join(BRAND, `${stem}.png`), path.join(BRAND, `${stem}-60.webp`), 60, 85)
  }

  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)))
  await fs.writeFile(
    MANIFEST,
    '/** Generated by scripts/optimize-images.mjs: every photograph, its size and the rendition widths on disk. */\n' +
      'export const imageManifest: Record<string, { w: number; h: number; widths: number[] }> = ' +
      JSON.stringify(sorted, null, 2) +
      '\n',
  )
  console.log(`\nmanifest: ${Object.keys(sorted).length} photographs`)
  console.log(`largest renditions: ${kb(before)} -> ${kb(after)} (${Math.round((1 - after / before) * 100)}% smaller)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
