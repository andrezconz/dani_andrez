import clsx from 'clsx'

export function Card({ className, children, ...props }) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm',
        'dark:border-slate-800 dark:bg-slate-900',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, action, className }) {
  return (
    <div className={clsx('mb-4 flex items-start justify-between gap-4', className)}>
      <div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
        {subtitle && <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
