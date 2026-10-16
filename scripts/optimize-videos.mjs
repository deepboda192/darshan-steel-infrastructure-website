/**
 * Re-encodes the background clips in public/videos for the web.
 *
 *   node scripts/optimize-videos.mjs
 *
 * Needs an `ffmpeg` on the PATH (or the ffmpeg-static package installed as
 * a dev dependency for a one-off run). Each clip is scaled to 1280 px wide,
 * H.264 at a constant quality, with the index moved to the front so playback
 * starts before the download finishes. The hero loop is muted so its audio
 * track is dropped, and a 480 px rendition of it is written for phones; the
 * drone shot keeps a small audio track if it has one.
 */
import { spawnSync } from 'node:child_process'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const VIDEOS = path.join(ROOT, 'public', 'videos')

let ffmpeg = 'ffmpeg'
try {
  ffmpeg = (await import('ffmpeg-static')).default ?? ffmpeg
} catch {
  /* fall back to the PATH */
}

const CLIPS = [
  // The phone rendition of the hero loop first, cut from the source before it is re-encoded.
  { file: 'hero-loop.mp4', output: 'hero-loop-480.mp4', width: 854, fps: 24, crf: 32, audio: false },
  { file: 'hero-loop.mp4', width: 1280, fps: 24, crf: 30, audio: false },
  { file: 'dsi-drone-shot.mp4', width: 1280, fps: 30, crf: 28, audio: true },
]

const kb = (n) => `${(n / 1048576).toFixed(1)} MB`

/** A clip's width and bitrate, read from ffmpeg's own stream listing. */
const probe = (file) => {
  const info = spawnSync(ffmpeg, ['-hide_banner', '-i', file], { encoding: 'utf8' }).stderr || ''
  const line = info.match(/Video:[^\n]*/)?.[0] ?? ''
  const size = line.match(/(\d{2,5})x(\d{2,5})/)
  const rate = line.match(/(\d+) kb\/s/)
  return { width: size ? Number(size[1]) : Infinity, kbps: rate ? Number(rate[1]) : Infinity }
}

/** Above this, a clip at the right size is still worth re-encoding. */
const MODEST_KBPS = 2500

/** Replaces `target` with `tmp`. A browser tab playing the clip can hold a lock on Windows; retry briefly. */
const swapIn = async (tmp, target) => {
  for (let attempt = 0; ; attempt++) {
    try {
      await fs.rm(target, { force: true })
      await fs.rename(tmp, target)
      return
    } catch (err) {
      if (attempt >= 5) throw err
      await new Promise((r) => setTimeout(r, 1000))
    }
  }
}

for (const clip of CLIPS) {
  const input = path.join(VIDEOS, clip.file)
  const target = path.join(VIDEOS, clip.output ?? clip.file)
  const output = target + '.tmp.mp4'
  // An in-place job on a clip already at its target width and a modest bitrate
  // has been done before; encoding it again would only lose quality.
  const { width, kbps } = probe(input)
  if (!clip.output && width <= clip.width && kbps <= MODEST_KBPS) {
    console.log(`${clip.file.padEnd(24)} already ${width} px at ${kbps} kb/s, skipped`)
    continue
  }
  // A rendition that already exists at its size is kept as well.
  if (clip.output && (await fs.stat(target).catch(() => null)) && probe(target).width <= clip.width) {
    console.log(`${clip.output.padEnd(24)} already written, skipped`)
    continue
  }
  const before = (await fs.stat(clip.output ? input : target)).size
  const args = [
    '-y', '-i', input,
    '-vf', `scale=${clip.width}:-2,fps=${clip.fps}`,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', String(clip.crf), '-pix_fmt', 'yuv420p', '-profile:v', 'high',
    '-movflags', '+faststart',
    ...(clip.audio ? ['-c:a', 'aac', '-b:a', '64k', '-ac', '1'] : ['-an']),
    output,
  ]
  const run = spawnSync(ffmpeg, args, { stdio: ['ignore', 'ignore', 'pipe'] })
  if (run.status !== 0) {
    console.error(run.stderr?.toString().split('\n').slice(-8).join('\n'))
    throw new Error(`ffmpeg failed on ${clip.file}`)
  }
  const after = (await fs.stat(output)).size
  const name = path.basename(target)
  if (clip.output || after < before) {
    await swapIn(output, target)
    console.log(`${name.padEnd(24)} ${kb(before)} -> ${kb(after)}`)
  } else {
    await fs.unlink(output)
    console.log(`${name.padEnd(24)} kept (${kb(before)}; re-encode was not smaller)`)
  }
}
