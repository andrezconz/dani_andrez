import clsx from 'clsx'

export function Spinner({ className, label = 'Cargando...' }) {
  return (
    <div className={clsx('flex items-center justify-center gap-2 py-10 text-ink-muted', className)}>
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-sage-soft border-t-sage" />
      <span className="text-sm">{label}</span>
    </div>
  )
}
