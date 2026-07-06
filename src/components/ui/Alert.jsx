import clsx from 'clsx'

const VARIANTS = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400',
  error: 'border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400',
}

export function Alert({ variant = 'success', children }) {
  if (!children) return null
  return (
    <div className={clsx('rounded-xl border px-4 py-3 text-sm', VARIANTS[variant])}>{children}</div>
  )
}
