import clsx from 'clsx'
import { useTheme } from '../hooks/useTheme'
import { useToast } from '../hooks/useToast'
import { TRANSFER_KEY } from '../constants'
import { Card, CardHeader } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className="flex w-full items-center justify-between py-1"
    >
      <span className="text-sm font-medium text-ink">{label}</span>
      <span
        className={clsx(
          'relative h-7 w-12 rounded-pill transition-colors duration-[250ms]',
          checked ? 'bg-sage' : 'bg-border',
        )}
      >
        <span
          className={clsx(
            'absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-softer transition-transform duration-[250ms]',
            checked ? 'translate-x-[22px]' : 'translate-x-0.5',
          )}
        />
      </span>
    </button>
  )
}

export function AjustesPage() {
  const { isDark, toggleTheme } = useTheme()
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
    <div className="flex flex-col gap-4 pb-6">
      <h1 className="text-xl font-bold text-ink">Ajustes</h1>

      <Card>
        <CardHeader title="Apariencia" />
        <Switch checked={isDark} onChange={toggleTheme} label="🌙 Modo oscuro" />
      </Card>

      <Card>
        <CardHeader title="Nuestro equipo" />
        <div className="flex items-center gap-6 text-sm text-ink">
          <span>👩🏻 Dani</span>
          <span>👨🏻 Andrez</span>
        </div>
      </Card>

      <Card>
        <CardHeader title="Llave de transferencia" subtitle="Para recibir aportes de otras cuentas" />
        <p className="text-lg font-bold text-sage">🔑 {TRANSFER_KEY}</p>
        <Button variant="secondary" size="sm" className="mt-3" onClick={handleCopy}>
          📋 Copiar llave
        </Button>
      </Card>

      <Card className="text-center">
        <p className="text-sm text-ink-muted">🏡 Nuestro Hogar</p>
        <p className="mt-2 text-sm text-ink-muted">
          Cada detalle de esta app existe para recordarles que construir su futuro juntos también se
          celebra en los pequeños aportes de cada día. 🤍
        </p>
      </Card>
    </div>
  )
}
