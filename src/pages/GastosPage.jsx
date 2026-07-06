import { useState } from 'react'
import { usePersonas } from '../hooks/usePersonas'
import { useFondos } from '../hooks/useFondos'
import { useCategorias } from '../hooks/useCategorias'
import { createGasto } from '../services/movimientosService'
import { GastoForm } from '../components/movimientos/GastoForm'
import { Card, CardHeader } from '../components/ui/Card'
import { Spinner } from '../components/ui/Spinner'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { Alert } from '../components/ui/Alert'

export function GastosPage() {
  const { personas, loading: loadingPersonas, error: errorPersonas } = usePersonas()
  const { fondos, loading: loadingFondos, error: errorFondos, refetch: refetchFondos } = useFondos()
  const { categorias, loading: loadingCategorias, error: errorCategorias } = useCategorias()
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const loading = loadingPersonas || loadingFondos || loadingCategorias
  const error = errorPersonas || errorFondos || errorCategorias

  const handleSubmit = async (values) => {
    setSubmitting(true)
    setFeedback(null)
    try {
      await createGasto(values)
      setFeedback({ type: 'success', message: 'Gasto registrado correctamente.' })
      refetchFondos()
    } catch (err) {
      setFeedback({ type: 'error', message: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Spinner label="Cargando formulario..." />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Registrar gasto</h1>
      <Card>
        <CardHeader title="Nuevo gasto" subtitle="Registra un egreso desde uno de los fondos" />
        {feedback && <div className="mb-4"><Alert variant={feedback.type}>{feedback.message}</Alert></div>}
        <GastoForm
          personas={personas}
          fondos={fondos}
          categorias={categorias}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      </Card>
    </div>
  )
}
