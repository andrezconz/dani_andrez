import clsx from 'clsx'

const VARIANTS = {
  success: 'bg-success-soft text-success',
  error: 'bg-error-soft text-error',
}

export function Alert({ variant = 'success', children }) {
  if (!children) return null
  return (
    <div className={clsx('rounded-app px-4 py-3 text-sm font-medium', VARIANTS[variant])}>
      {children}
    </div>
  )
}
