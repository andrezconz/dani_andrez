import { Select } from '../ui/Select'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { TIPO_MOVIMIENTO, TIPO_MOVIMIENTO_LABEL } from '../../constants'

export function MovimientosFilters({ filters, onChange, onClear, personas, fondos }) {
  const handleField = (field) => (event) => {
    onChange({ ...filters, [field]: event.target.value })
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <Input type="month" label="Mes" value={filters.mes} onChange={handleField('mes')} />

      <Select label="Persona" placeholder="Todas" value={filters.personaId} onChange={handleField('personaId')}>
        {personas.map((persona) => (
          <option key={persona.id} value={persona.id}>
            {persona.nombre}
          </option>
        ))}
      </Select>

      <Select label="Tipo" placeholder="Todos" value={filters.tipo} onChange={handleField('tipo')}>
        {Object.values(TIPO_MOVIMIENTO).map((tipo) => (
          <option key={tipo} value={tipo}>
            {TIPO_MOVIMIENTO_LABEL[tipo]}
          </option>
        ))}
      </Select>

      <Select label="Fondo" placeholder="Todos" value={filters.fondoId} onChange={handleField('fondoId')}>
        {fondos.map((fondo) => (
          <option key={fondo.id} value={fondo.id}>
            {fondo.nombre}
          </option>
        ))}
      </Select>

      <div className="flex items-end">
        <Button variant="secondary" onClick={onClear} className="w-full">
          Limpiar filtros
        </Button>
      </div>
    </div>
  )
}
