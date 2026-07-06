import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { usePersonas } from '../hooks/usePersonas'
import { useFondos } from '../hooks/useFondos'
import { useCategorias } from '../hooks/useCategorias'
import { useToast } from '../hooks/useToast'
import { createAporte, createGasto } from '../services/movimientosService'
import { aporteSchema, gastoSchema } from '../utils/validators'
import { distribuirAporte, getFondoDisplay, getPersonaDisplay, TIPO_MOVIMIENTO } from '../constants'
import { formatCurrency, formatPercent } from '../utils/formatters'
import { Spinner } from '../components/ui/Spinner'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

const initialValues = {
  tipo: '',
  personaId: '',
  fondoId: '',
  categoria: '',
  valor: '',
  descripcion: '',
  fecha: new Date().toISOString().slice(0, 10),
}

function OptionCard({ selected, onClick, icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex flex-1 flex-col items-center gap-2 rounded-app border-2 p-5 text-center shadow-softer',
        'transition-all duration-[250ms] active:scale-[0.97]',
        selected ? 'border-sage bg-sage-soft' : 'border-border bg-card hover:border-sage/40',
      )}
    >
      <span className="text-3xl">{icon}</span>
      <span className="text-sm font-semibold text-ink">{label}</span>
    </button>
  )
}

export function RegistrarPage() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { personas, loading: loadingPersonas, error: errorPersonas } = usePersonas()
  const { fondos, loading: loadingFondos, error: errorFondos } = useFondos()
  const { categorias, loading: loadingCategorias, error: errorCategorias } = useCategorias()

  const [stepIndex, setStepIndex] = useState(0)
  const [values, setValues] = useState(initialValues)
  const [fieldError, setFieldError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const steps = useMemo(() => {
    if (values.tipo === TIPO_MOVIMIENTO.GASTO) {
      return ['tipo', 'persona', 'fondo', 'categoria', 'valor', 'descripcion']
    }
    // El aporte no elige fondo: se reparte automáticamente (ver APORTE_DISTRIBUCION).
    return ['tipo', 'persona', 'valor', 'descripcion']
  }, [values.tipo])

  const currentStep = steps[stepIndex]
  const loading = loadingPersonas || loadingFondos || loadingCategorias
  const error = errorPersonas || errorFondos || errorCategorias

  const goNext = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1))
  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0))

  const selectAndAdvance = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }))
    setFieldError('')
    goNext()
  }

  const handleSubmit = async () => {
    setFieldError('')
    const schema = values.tipo === TIPO_MOVIMIENTO.GASTO ? gastoSchema : aporteSchema
    const result = schema.safeParse(values)

    if (!result.success) {
      setFieldError(result.error.issues[0]?.message || 'Revisa los datos ingresados')
      return
    }

    setSubmitting(true)
    try {
      if (values.tipo === TIPO_MOVIMIENTO.GASTO) {
        await createGasto(result.data)
      } else {
        const fondosDistribuidos = distribuirAporte(result.data.valor).map((item) => ({
          fondoId: fondos.find((fondo) => fondo.tipo === item.tipoFondo)?.id,
          valor: item.valor,
        }))
        await createAporte({ ...result.data, fondos: fondosDistribuidos })
      }
      showToast('Movimiento registrado correctamente ✨')
      navigate('/')
    } catch (err) {
      setFieldError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Spinner label="Preparando el formulario..." />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="flex flex-col gap-6 pb-6">
      <div>
        <h1 className="text-xl font-bold text-ink">¿Qué deseas registrar hoy?</h1>
        <div className="mt-3 flex gap-1.5">
          {steps.map((step, index) => (
            <span
              key={step}
              className={clsx(
                'h-1.5 flex-1 rounded-pill transition-colors duration-[250ms]',
                index <= stepIndex ? 'bg-sage' : 'bg-border',
              )}
            />
          ))}
        </div>
      </div>

      {currentStep === 'tipo' && (
        <div className="flex gap-3">
          <OptionCard
            icon="💰"
            label="Un aporte"
            selected={values.tipo === TIPO_MOVIMIENTO.APORTE}
            onClick={() => selectAndAdvance('tipo', TIPO_MOVIMIENTO.APORTE)}
          />
          <OptionCard
            icon="💸"
            label="Un gasto"
            selected={values.tipo === TIPO_MOVIMIENTO.GASTO}
            onClick={() => selectAndAdvance('tipo', TIPO_MOVIMIENTO.GASTO)}
          />
        </div>
      )}

      {currentStep === 'persona' && (
        <div>
          <p className="mb-3 text-sm font-medium text-ink-muted">¿Quién realizó este movimiento?</p>
          <div className="flex gap-3">
            {personas.map((persona) => {
              const display = getPersonaDisplay(persona)
              return (
                <OptionCard
                  key={persona.id}
                  icon={display.avatar}
                  label={display.nombre}
                  selected={values.personaId === persona.id}
                  onClick={() => selectAndAdvance('personaId', persona.id)}
                />
              )
            })}
          </div>
        </div>
      )}

      {currentStep === 'fondo' && (
        <div>
          <p className="mb-3 text-sm font-medium text-ink-muted">¿En qué fondo?</p>
          <div className="flex flex-col gap-3">
            {fondos.map((fondo) => {
              const display = getFondoDisplay(fondo)
              return (
                <button
                  key={fondo.id}
                  type="button"
                  onClick={() => selectAndAdvance('fondoId', fondo.id)}
                  className={clsx(
                    'flex items-center gap-3 rounded-app border-2 p-4 text-left shadow-softer',
                    'transition-all duration-[250ms] active:scale-[0.98]',
                    values.fondoId === fondo.id
                      ? 'border-sage bg-sage-soft'
                      : 'border-border bg-card hover:border-sage/40',
                  )}
                >
                  <span className="text-2xl">{display.icono}</span>
                  <span className="font-semibold text-ink">{display.nombre}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {currentStep === 'categoria' && (
        <div>
          <p className="mb-3 text-sm font-medium text-ink-muted">¿Qué categoría?</p>
          <div className="flex flex-wrap gap-2">
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                type="button"
                onClick={() => selectAndAdvance('categoria', categoria.nombre)}
                className={clsx(
                  'rounded-pill border-2 px-4 py-2 text-sm font-medium transition-all duration-[250ms] active:scale-95',
                  values.categoria === categoria.nombre
                    ? 'border-sage bg-sage-soft text-ink'
                    : 'border-border bg-card text-ink-muted hover:border-sage/40',
                )}
              >
                {categoria.nombre}
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === 'valor' && (
        <div>
          <p className="mb-3 text-sm font-medium text-ink-muted">¿Cuánto fue?</p>
          <Input
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            placeholder="0"
            autoFocus
            className="text-center text-3xl font-bold"
            value={values.valor}
            onChange={(event) => setValues((current) => ({ ...current, valor: event.target.value }))}
          />
          {values.tipo === TIPO_MOVIMIENTO.APORTE && Number(values.valor) > 0 && (
            <div className="mt-4 flex flex-col gap-2 rounded-app border border-border bg-card p-4">
              <p className="text-xs font-medium text-ink-muted">Este aporte se reparte así:</p>
              {distribuirAporte(values.valor).map((item) => {
                const display = getFondoDisplay({ tipo: item.tipoFondo })
                return (
                  <div key={item.tipoFondo} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium text-ink">
                      <span>{display.icono}</span>
                      {display.nombre}
                      <span className="text-ink-muted">({formatPercent(item.porcentaje * 100)})</span>
                    </span>
                    <span className="font-semibold text-ink">{formatCurrency(item.valor)}</span>
                  </div>
                )
              })}
            </div>
          )}
          <Button
            className="mt-4 w-full"
            disabled={!values.valor || Number(values.valor) <= 0}
            onClick={() => {
              setFieldError('')
              goNext()
            }}
          >
            Continuar
          </Button>
        </div>
      )}

      {currentStep === 'descripcion' && (
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-3 text-sm font-medium text-ink-muted">Cuéntanos un poco más</p>
            <Input
              label="Descripción"
              placeholder="Ej: Mercado, salario, arriendo..."
              value={values.descripcion}
              onChange={(event) =>
                setValues((current) => ({ ...current, descripcion: event.target.value }))
              }
            />
          </div>
          {fieldError && <p className="text-sm font-medium text-error">{fieldError}</p>}
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Guardando...' : 'Guardar movimiento'}
          </Button>
        </div>
      )}

      {stepIndex > 0 && (
        <button
          type="button"
          onClick={goBack}
          className="self-start text-sm font-medium text-ink-muted hover:text-ink"
        >
          ← Atrás
        </button>
      )}
    </div>
  )
}
