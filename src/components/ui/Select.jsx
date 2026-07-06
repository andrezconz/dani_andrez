import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export const Select = forwardRef(function Select(
  { label, error, className, id, children, placeholder, ...props },
  ref,
) {
  const selectId = id || props.name

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <select
        id={selectId}
        ref={ref}
        className={cn(
          'rounded-app border border-border bg-card px-4 py-3 text-base text-ink',
          'focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30',
          'transition-colors duration-[250ms]',
          error && 'border-error focus:border-error focus:ring-error/30',
          className,
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      {error && <span className="text-xs font-medium text-error">{error}</span>}
    </div>
  )
})
