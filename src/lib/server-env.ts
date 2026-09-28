import { existsSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Server-side settings, with a development fallback.
 *
 * In production the host injects environment variables and this is a plain
 * `process.env` read. In development the dev server loads `.env` into
 * `process.env` but only exposes `VITE_`-prefixed keys from `.env.local`, so
 * server-only secrets kept there (SMTP settings, for instance — the file is
 * git-ignored, unlike `.env`) would never be seen. This reads `.env.local`
 * from the working directory once and uses it for any key `process.env`
 * lacks. Real environment variables always win.
 */

let local: Record<string, string> | null = null
let localStamp = -1

function loadLocal(): Record<string, string> {
  if (process.env['NODE_ENV'] === 'production') return {}
  const file = join(process.cwd(), '.env.local')
  if (!existsSync(file)) return {}
  // Re-read whenever the file changes, so an edit takes effect on the next
  // request without restarting the dev server.
  const stamp = statSync(file).mtimeMs
  if (local && stamp === localStamp) return local
  localStamp = stamp
  local = {}
  for (const rawLine of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq <= 0) continue
    const key = line.slice(0, eq).trim()
    let value = line.slice(eq + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    local[key] = value
  }
  return local
}

/** A server setting: the environment first, then `.env.local` in development. */
export function serverEnv(name: string): string | undefined {
  const fromEnv = process.env[name]
  if (fromEnv !== undefined && fromEnv !== '') return fromEnv
  const fromLocal = loadLocal()[name]
  return fromLocal !== undefined && fromLocal !== '' ? fromLocal : undefined
}
