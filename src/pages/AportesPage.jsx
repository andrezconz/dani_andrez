import { useState } from 'react'
import { usePersonas } from '../hooks/usePersonas'
import { useFondos } from '../hooks/useFondos'
import { createAporte } from '../services/movimientosService'
import { AporteForm } from '../components/movimientos/AporteForm'
import { Card, CardHeader } from '../components/ui/Card'
import { Spinner } from '../components/ui/Spinner'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { Alert } from '../components/ui/Alert'

export function AportesPage() {
  const { personas, loading: loadingPersonas, error: errorPersonas } = usePersonas()
  const { fondos, loading: loadingFondos, error: errorFondos, refetch: refetchFondos } = useFondos()
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const loading = loadingPersonas || loadingFondos
  const error = errorPersonas || errorFondos

  const handleSubmit = async (values) => {
    setSubmitting(true)
    setFeedback(null)
    try {
      await createAporte(values)
      setFeedback({ type: 'success', message: 'Aporte registrado correctamente.' })
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
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Registrar aporte</h1>
      <Card>
        <CardHeader
          title="Nuevo aporte"
          subtitle="Registra un ingreso hacia uno de los fondos"
        />
        {feedback && <div className="mb-4"><Alert variant={feedback.type}>{feedback.message}</Alert></div>}
        <AporteForm
          personas={personas}
          fondos={fondos}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      </Card>
    </div>
  )
}
