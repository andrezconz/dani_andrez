import { Card } from '../ui/Card'
import { formatCurrency, formatMonthLabel } from '../../utils/formatters'

export function ResumenMesCard({ mesActual, ingresosMes, gastosMes }) {
  const neto = ingresosMes - gastosMes

  return (
    <Card>
      <p className="text-sm capitalize text-slate-500 dark:text-slate-400">
        Resumen de {formatMonthLabel(`${mesActual}-01`)}
      </p>
      <div className="mt-3 grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Ingresos</p>
          <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(ingresosMes)}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Gastos</p>
          <p className="text-lg font-semibold text-red-600 dark:text-red-400">
            {formatCurrency(gastosMes)}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Neto</p>
          <p
            className={`text-lg font-semibold ${
              neto >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
            }`}
          >
            {formatCurrency(neto)}
          </p>
        </div>
      </div>
    </Card>
  )
}
