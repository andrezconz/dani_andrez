import { clampPercent, formatCurrency, formatPercent } from '../../utils/formatters'

export function MetaProgress({ saldo, meta, colorClass = 'bg-indigo-500' }) {
  if (!meta) return null

  const porcentaje = clampPercent((Number(saldo) / Number(meta)) * 100)

  return (
    <div className="mt-3">
      <div className="mb-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>Meta: {formatCurrency(meta)}</span>
        <span>{formatPercent(porcentaje)}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className={`h-full rounded-full ${colorClass} transition-all`}
          style={{ width: `${porcentaje}%` }}
        />
      </div>
    </div>
  )
}
