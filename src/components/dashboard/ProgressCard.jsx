import { clampPercent, formatCurrency, formatPercent } from '../../utils/formatters'

export function ProgressCard({ saldo, meta, color = 'sage' }) {
  if (!meta) return null

  const porcentaje = clampPercent((Number(saldo) / Number(meta)) * 100)

  return (
    <div className="mt-4">
      <div className="mb-1.5 flex items-center justify-between text-xs text-ink-muted">
        <span>Meta: {formatCurrency(meta)}</span>
        <span className="font-semibold">{formatPercent(porcentaje)}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-pill bg-black/5 dark:bg-white/10">
        <div
          className="h-full rounded-pill transition-[width] duration-500 ease-out"
          style={{ width: `${porcentaje}%`, backgroundColor: `var(--color-${color})` }}
        />
      </div>
    </div>
  )
}
