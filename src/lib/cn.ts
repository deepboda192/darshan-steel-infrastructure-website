import clsx, { type ClassValue } from 'clsx'

/** Conditional className helper used across every component. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
