import { Card, CardHeader } from '../ui/Card'
import { EmptyState } from '../ui/EmptyState'
import { TIPO_MOVIMIENTO } from '../../constants'
import { formatCurrency, formatDate } from '../../utils/formatters'

export function UltimosMovimientos({ movimientos }) {
  return (
    <Card>
      <CardHeader title="Últimos movimientos del mes" />
      {movimientos.length === 0 ? (
        <EmptyState title="Sin movimientos" description="Aún no hay aportes ni gastos este mes." />
      ) : (
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {movimientos.map((mov) => {
            const esAporte = mov.tipo === TIPO_MOVIMIENTO.APORTE
            return (
              <li key={mov.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                    {mov.descripcion}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {formatDate(mov.fecha)} · {mov.persona?.nombre} · {mov.fondo?.nombre}
                  </p>
                </div>
                <span
                  className={`shrink-0 text-sm font-semibold ${
                    esAporte ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {esAporte ? '+' : '-'}
                  {formatCurrency(mov.valor)}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </Card>
  )
}
