/** Initials for an avatar disc, from an e-mail or a name. */
export const initials = (value: string) => {
  const stem = value.split('@')[0].replace(/[._-]+/g, ' ').trim()
  const parts = stem.split(' ').filter(Boolean)
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase() || '?'
}
