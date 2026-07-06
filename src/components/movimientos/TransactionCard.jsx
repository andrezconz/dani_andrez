import { getFondoDisplay, getPersonaDisplay, TIPO_MOVIMIENTO } from '../../constants'
import { formatCurrency, formatDate } from '../../utils/formatters'

export function TransactionCard({ movimiento, onDelete }) {
  const esAporte = movimiento.tipo === TIPO_MOVIMIENTO.APORTE
  const fondo = getFondoDisplay(movimiento.fondo)
  const persona = getPersonaDisplay(movimiento.persona)

  return (
    <div className="flex items-center gap-3 rounded-app border border-border bg-card p-4 shadow-softer">
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg"
        style={{ backgroundColor: `var(--color-${fondo.color}-soft)` }}
      >
        {fondo.icono}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink">{fondo.nombre}</p>
        <p className="truncate text-sm text-ink-muted">{movimiento.descripcion}</p>
        <p className="mt-0.5 text-xs text-ink-muted">
          {persona.avatar} {persona.nombre} · {formatDate(movimiento.fecha, 'd MMM')}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className={`text-sm font-bold ${esAporte ? 'text-success' : 'text-error'}`}>
          {esAporte ? '+' : '-'}
          {formatCurrency(movimiento.valor)}
        </span>
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(movimiento.id)}
            className="text-xs text-ink-muted underline-offset-2 hover:text-error hover:underline"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  )
}
