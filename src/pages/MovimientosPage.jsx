import { useState } from 'react'
import { useMovimientos } from '../hooks/useMovimientos'
import { usePersonas } from '../hooks/usePersonas'
import { useFondos } from '../hooks/useFondos'
import { deleteMovimiento } from '../services/movimientosService'
import { MovimientosFilters } from '../components/movimientos/MovimientosFilters'
import { MovimientosTable } from '../components/movimientos/MovimientosTable'
import { Spinner } from '../components/ui/Spinner'
import { ErrorMessage } from '../components/ui/ErrorMessage'

const FILTROS_INICIALES = { mes: '', personaId: '', tipo: '', fondoId: '' }

export function MovimientosPage() {
  const [filters, setFilters] = useState(FILTROS_INICIALES)
  const { movimientos, loading, error, refetch } = useMovimientos(filters)
  const { personas } = usePersonas()
  const { fondos } = useFondos()

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este movimiento? Esta acción no se puede deshacer.')) return
    try {
      await deleteMovimiento(id)
      refetch()
    } catch (err) {
      window.alert(err.message)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
        Historial de movimientos
      </h1>

      <MovimientosFilters
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters(FILTROS_INICIALES)}
        personas={personas}
        fondos={fondos}
      />

      {loading && <Spinner label="Cargando movimientos..." />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {!loading && !error && <MovimientosTable movimientos={movimientos} onDelete={handleDelete} />}
    </div>
  )
}
