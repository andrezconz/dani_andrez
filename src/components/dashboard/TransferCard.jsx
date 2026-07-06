import QRCode from 'react-qr-code'
import { TRANSFER_KEY } from '../../constants'
import { useToast } from '../../hooks/useToast'
import { Button } from '../ui/Button'

export function TransferCard() {
  const { showToast } = useToast()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(TRANSFER_KEY)
      showToast('Llave copiada ✨')
    } catch {
      showToast('No se pudo copiar la llave', { variant: 'error' })
    }
  }

  return (
    <div className="rounded-app border border-border bg-card p-5 text-center shadow-soft">
      <p className="font-semibold text-ink">💸 Realiza un aporte</p>
      <p className="mt-1 text-sm text-ink-muted">Realiza una transferencia utilizando nuestra llave.</p>

      <p className="mt-4 text-xl font-bold tracking-wide text-sage">🔑 {TRANSFER_KEY}</p>

      <div className="mx-auto mt-4 flex w-fit items-center justify-center rounded-app bg-white p-3">
        <QRCode value={TRANSFER_KEY} size={128} />
      </div>

      <Button variant="secondary" size="sm" className="mt-4 w-full" onClick={handleCopy}>
        📋 Copiar llave
      </Button>

      <p className="mt-4 text-xs text-ink-muted">❤️ Gracias por seguir construyendo este sueño juntos.</p>
    </div>
  )
}
