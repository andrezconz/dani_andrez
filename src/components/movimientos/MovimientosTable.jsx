import { Card } from '../ui/Card'
import { EmptyState } from '../ui/EmptyState'
import { Button } from '../ui/Button'
import { TIPO_MOVIMIENTO, TIPO_MOVIMIENTO_LABEL } from '../../constants'
import { formatCurrency, formatDate } from '../../utils/formatters'

export function MovimientosTable({ movimientos, onDelete }) {
  if (movimientos.length === 0) {
    return (
      <EmptyState
        title="No hay movimientos"
        description="Ajusta los filtros o registra un nuevo aporte o gasto."
      />
    )
  }

  return (
    <Card className="overflow-x-auto p-0">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-slate-200 text-xs uppercase text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <tr>
            <th className="px-4 py-3">Fecha</th>
            <th className="px-4 py-3">Tipo</th>
            <th className="px-4 py-3">Persona</th>
            <th className="px-4 py-3">Fondo</th>
            <th className="px-4 py-3">Categoría</th>
            <th className="px-4 py-3">Descripción</th>
            <th className="px-4 py-3 text-right">Valor</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {movimientos.map((mov) => {
            const esAporte = mov.tipo === TIPO_MOVIMIENTO.APORTE
            return (
              <tr key={mov.id} className="text-slate-700 dark:text-slate-300">
                <td className="whitespace-nowrap px-4 py-3">{formatDate(mov.fecha)}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      esAporte
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-red-600 dark:text-red-400'
                    }
                  >
                    {TIPO_MOVIMIENTO_LABEL[mov.tipo]}
                  </span>
                </td>
                <td className="px-4 py-3">{mov.persona?.nombre}</td>
                <td className="px-4 py-3">{mov.fondo?.nombre}</td>
                <td className="px-4 py-3">{mov.categoria || '—'}</td>
                <td className="max-w-xs truncate px-4 py-3">{mov.descripcion}</td>
                <td className="whitespace-nowrap px-4 py-3 text-right font-medium">
                  {esAporte ? '+' : '-'}
                  {formatCurrency(mov.valor)}
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="sm" onClick={() => onDelete(mov.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Card>
  )
}
