import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

export type SelectOption = { value: string; label: string }

type SelectProps = {
  id: string
  value: string
  onChange: (value: string) => void
  options: readonly SelectOption[]
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  /** ids of the hint / error copy, as on a native control. */
  describedBy?: string
  /** Accessible name when there is no visible <label htmlFor={id}>. */
  ariaLabel?: string
  /** Extra classes for the trigger (widths, paddings). */
  className?: string
  /** Lets the list grow past the trigger — for narrow triggers like a unit. */
  fitContent?: boolean
}

/**
 * A select in the site's own dress. The native <select> paints its list with
 * the operating system's theme, which cannot be styled, so this is the
 * "select-only combobox" of the ARIA authoring practices: a button that
 * opens a listbox panel drawn like the rest of the form — white, hairline,
 * square corners, the active row on neutral-1 and the chosen row in the
 * accent with a check. Arrow keys move, Home/End jump, typing a letter
 * jumps to the next match, Enter/Space choose, Escape and outside clicks
 * close.
 */
export function Select({
  id,
  value,
  onChange,
  options,
  placeholder = 'Select',
  disabled = false,
  invalid = false,
  describedBy,
  ariaLabel,
  className,
  fitContent = false,
}: SelectProps) {
  const listId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [open, setOpen] = useState(false)
  const selectedIndex = options.findIndex((o) => o.value === value)
  const [active, setActive] = useState(Math.max(selectedIndex, 0))

  const optionId = (i: number) => `${id}-option-${i}`

  const show = () => {
    if (disabled) return
    setActive(Math.max(selectedIndex, 0))
    setOpen(true)
  }
  const hide = () => setOpen(false)
  const choose = (i: number) => {
    const option = options[i]
    if (option) onChange(option.value)
    hide()
  }

  // Outside clicks close the list.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) hide()
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  // Keep the active row in view while arrowing through a long list.
  useEffect(() => {
    if (!open) return
    listRef.current
      ?.querySelector<HTMLElement>(`#${CSS.escape(optionId(active))}`)
      ?.scrollIntoView({ block: 'nearest' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, open])

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        if (!open) show()
        else setActive((i) => Math.min(i + 1, last))
        break
      case 'ArrowUp':
        event.preventDefault()
        if (!open) show()
        else setActive((i) => Math.max(i - 1, 0))
        break
      case 'Home':
        if (open) {
          event.preventDefault()
          setActive(0)
        }
        break
      case 'End':
        if (open) {
          event.preventDefault()
          setActive(last)
        }
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (open) choose(active)
        else show()
        break
      case 'Escape':
        if (open) {
          event.preventDefault()
          hide()
        }
        break
      case 'Tab':
        hide()
        break
      default: {
        // Type-ahead: jump to the next option starting with the typed letter.
        if (event.key.length !== 1 || event.metaKey || event.ctrlKey || event.altKey) return
        const letter = event.key.toLowerCase()
        const from = open ? active + 1 : selectedIndex + 1
        const order = [...options.keys()].map((i) => (i + from) % options.length)
        const hit = order.find((i) => options[i].label.toLowerCase().startsWith(letter))
        if (hit === undefined) return
        event.preventDefault()
        if (open) setActive(hit)
        else onChange(options[hit].value)
      }
    }
  }

  const selected = selectedIndex >= 0 ? options[selectedIndex] : null

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? optionId(active) : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={() => (open ? hide() : show())}
        onKeyDown={onKeyDown}
        className={cn(
          'm-field flex items-center justify-between gap-3 text-left',
          !selected && 'text-neutral-5',
          className,
        )}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <ChevronDown
          aria-hidden="true"
          strokeWidth={2}
          className={cn(
            'h-4 w-4 shrink-0 text-neutral-6 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={ariaLabel ? undefined : id}
          aria-label={ariaLabel}
          className={cn(
            'absolute left-0 top-full z-20 mt-1 max-h-[280px] overflow-auto border border-black/15 bg-white py-1.5 shadow-[0_12px_28px_#0000001f]',
            fitContent ? 'min-w-full whitespace-nowrap' : 'w-full',
          )}
        >
          {options.map((option, i) => {
            const isSelected = i === selectedIndex
            const isActive = i === active
            return (
              <li
                key={option.value}
                id={optionId(i)}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(i)}
                className={cn(
                  'flex cursor-pointer items-center justify-between gap-3 px-[18px] py-3 text-[16px] font-medium leading-[1.5] text-neutral-10 max-xs:text-[14px]',
                  isActive && 'bg-neutral-1',
                  isSelected && 'text-accent',
                )}
              >
                <span className="truncate">{option.label}</span>
                {isSelected && <Check aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={2.2} />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
