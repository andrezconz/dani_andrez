import { forwardRef } from 'react'
import clsx from 'clsx'

export const Select = forwardRef(function Select(
  { label, error, className, id, children, placeholder, ...props },
  ref,
) {
  const selectId = id || props.name

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <select
        id={selectId}
        ref={ref}
        className={clsx(
          'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm',
          'focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500',
          'dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100',
          error && 'border-red-400 focus:border-red-500 focus:ring-red-500',
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
      {error && <span className="text-xs text-red-600 dark:text-red-400">{error}</span>}
    </div>
  )
})
