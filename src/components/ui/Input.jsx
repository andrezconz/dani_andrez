import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export const Input = forwardRef(function Input(
  { label, error, className, id, ...props },
  ref,
) {
  const inputId = id || props.name

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        className={cn(
          'rounded-app border border-border bg-card px-4 py-3 text-base text-ink shadow-none',
          'placeholder:text-ink-muted focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30',
          'transition-colors duration-[250ms]',
          error && 'border-error focus:border-error focus:ring-error/30',
          className,
        )}
        {...props}
      />
      {error && <span className="text-xs font-medium text-error">{error}</span>}
    </div>
  )
})
