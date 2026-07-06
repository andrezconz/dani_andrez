import clsx from 'clsx'
import { Input } from '../ui/Input'
import { TIPO_MOVIMIENTO, TIPO_MOVIMIENTO_LABEL, getFondoDisplay, getPersonaDisplay } from '../../constants'

function ChipRow({ label, children }) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium text-ink-muted">{label}</p>
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">{children}</div>
    </div>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'shrink-0 rounded-pill border-2 px-3.5 py-1.5 text-sm font-medium transition-all duration-[250ms]',
        active ? 'border-sage bg-sage-soft text-ink' : 'border-border bg-card text-ink-muted',
      )}
    >
      {children}
    </button>
  )
}

export function MovimientosFilters({ filters, onChange, onClear, personas, fondos }) {
  const setField = (field, value) => {
    onChange({ ...filters, [field]: filters[field] === value ? '' : value })
  }

  return (
    <div className="flex flex-col gap-3">
      <Input
        type="month"
        label="Mes"
        value={filters.mes}
        onChange={(event) => onChange({ ...filters, mes: event.target.value })}
      />

      <ChipRow label="Persona">
        {personas.map((persona) => {
          const display = getPersonaDisplay(persona)
          return (
            <Chip key={persona.id} active={filters.personaId === persona.id} onClick={() => setField('personaId', persona.id)}>
              {display.avatar} {display.nombre}
            </Chip>
          )
        })}
      </ChipRow>

      <ChipRow label="Tipo">
        {Object.values(TIPO_MOVIMIENTO).map((tipo) => (
          <Chip key={tipo} active={filters.tipo === tipo} onClick={() => setField('tipo', tipo)}>
            {TIPO_MOVIMIENTO_LABEL[tipo]}
          </Chip>
        ))}
      </ChipRow>

      <ChipRow label="Fondo">
        {fondos.map((fondo) => {
          const display = getFondoDisplay(fondo)
          return (
            <Chip key={fondo.id} active={filters.fondoId === fondo.id} onClick={() => setField('fondoId', fondo.id)}>
              {display.icono} {display.nombre}
            </Chip>
          )
        })}
      </ChipRow>

      <button
        type="button"
        onClick={onClear}
        className="self-start text-sm font-medium text-ink-muted underline-offset-2 hover:text-ink hover:underline"
      >
        Limpiar filtros
      </button>
    </div>
  )
}
