import { Button } from './Button'

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-app border border-error/20 bg-error-soft p-6 text-center">
      <p className="text-sm font-medium text-error">{message || 'Ocurrió un error inesperado.'}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Reintentar
        </Button>
      )}
    </div>
  )
}
