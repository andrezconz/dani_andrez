import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useMovimientos } from '../hooks/useMovimientos'
import { usePersonas } from '../hooks/usePersonas'
import { useFondos } from '../hooks/useFondos'
import { deleteMovimiento } from '../services/movimientosService'
import { MovimientosFilters } from '../components/movimientos/MovimientosFilters'
import { TransactionCard } from '../components/movimientos/TransactionCard'
import { Spinner } from '../components/ui/Spinner'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { EmptyState } from '../components/ui/EmptyState'
import { useToast } from '../hooks/useToast'

export function MovimientosPage() {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    mes: '',
    personaId: '',
    tipo: '',
    fondoId: searchParams.get('fondo') || '',
  })
  const { movimientos, loading, error, refetch } = useMovimientos(filters)
  const { personas } = usePersonas()
  const { fondos } = useFondos()
  const { showToast } = useToast()

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este movimiento? Esta acción no se puede deshacer.')) return
    try {
      await deleteMovimiento(id)
      showToast('Movimiento eliminado')
      refetch()
    } catch (err) {
      showToast(err.message, { variant: 'error' })
    }
  }

  return (
    <div className="flex flex-col gap-5 pb-6">
      <h1 className="text-xl font-bold text-ink">Movimientos</h1>

      <MovimientosFilters
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters({ mes: '', personaId: '', tipo: '', fondoId: '' })}
        personas={personas}
        fondos={fondos}
      />

      {loading && <Spinner label="Cargando movimientos..." />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {!loading && !error && (
        <>
          {movimientos.length === 0 ? (
            <EmptyState
              title="No hay movimientos con estos filtros"
              description="Ajusta los filtros o registra un nuevo movimiento."
            />
          ) : (
            <div className="flex flex-col gap-3">
              {movimientos.map((mov) => (
                <TransactionCard key={mov.id} movimiento={mov} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
