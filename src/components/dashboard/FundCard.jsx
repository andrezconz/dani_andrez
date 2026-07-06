import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFondoDisplay } from '../../constants'
import { formatCurrency, clampPercent } from '../../utils/formatters'
import { Celebration } from '../ui/Celebration'
import { ProgressCard } from './ProgressCard'

export function FundCard({ fondo }) {
  const display = getFondoDisplay(fondo)
  const porcentaje = fondo.meta ? clampPercent((Number(fondo.saldo) / Number(fondo.meta)) * 100) : 0
  const [celebrar, setCelebrar] = useState(false)
  const porcentajeAnterior = useRef(porcentaje)

  useEffect(() => {
    const anterior = porcentajeAnterior.current
    porcentajeAnterior.current = porcentaje

    if (anterior < 100 && porcentaje >= 100) {
      setCelebrar(true)
      const timeout = setTimeout(() => setCelebrar(false), 1600)
      return () => clearTimeout(timeout)
    }
  }, [porcentaje])

  return (
    <div className="relative overflow-hidden rounded-app border border-border bg-card p-5 shadow-soft">
      <Celebration show={celebrar} />
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full text-lg"
            style={{ backgroundColor: `var(--color-${display.color}-soft)` }}
          >
            {display.icono}
          </span>
          <p className="font-semibold text-ink">{display.nombre}</p>
        </div>
        <Link
          to={`/movimientos?fondo=${fondo.id}`}
          className="rounded-pill px-3 py-1.5 text-xs font-medium text-ink-muted transition-colors duration-[250ms] hover:bg-sage-soft hover:text-sage"
        >
          Ver todo
        </Link>
      </div>

      <p className="mt-4 text-2xl font-bold" style={{ color: `var(--color-${display.color})` }}>
        {formatCurrency(fondo.saldo)}
      </p>

      <ProgressCard saldo={fondo.saldo} meta={fondo.meta} color={display.color} />
    </div>
  )
}
