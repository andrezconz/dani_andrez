import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'
import { gastoSchema } from '../../utils/validators'

export function GastoForm({ personas, fondos, categorias, onSubmit, submitting }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(gastoSchema),
    defaultValues: {
      fecha: format(new Date(), 'yyyy-MM-dd'),
      personaId: '',
      fondoId: '',
      categoria: '',
      valor: '',
      descripcion: '',
    },
  })

  const submit = async (values) => {
    await onSubmit(values)
    reset({ ...values, valor: '', descripcion: '' })
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Input type="date" label="Fecha" error={errors.fecha?.message} {...register('fecha')} />

      <Select
        label="Persona"
        placeholder="Selecciona una persona"
        error={errors.personaId?.message}
        {...register('personaId')}
      >
        {personas.map((persona) => (
          <option key={persona.id} value={persona.id}>
            {persona.nombre}
          </option>
        ))}
      </Select>

      <Select
        label="Categoría"
        placeholder="Selecciona una categoría"
        error={errors.categoria?.message}
        {...register('categoria')}
      >
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.nombre}>
            {categoria.nombre}
          </option>
        ))}
      </Select>

      <Select
        label="Fondo del que se descuenta"
        placeholder="Selecciona un fondo"
        error={errors.fondoId?.message}
        {...register('fondoId')}
      >
        {fondos.map((fondo) => (
          <option key={fondo.id} value={fondo.id}>
            {fondo.nombre}
          </option>
        ))}
      </Select>

      <Input
        type="number"
        step="0.01"
        min="0"
        label="Valor"
        placeholder="0"
        error={errors.valor?.message}
        {...register('valor')}
      />

      <div className="sm:col-span-2">
        <Input
          label="Descripción"
          placeholder="Ej: Supermercado, gasolina, cine"
          error={errors.descripcion?.message}
          {...register('descripcion')}
        />
      </div>

      <div className="sm:col-span-2">
        <Button type="submit" variant="danger" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? 'Guardando...' : 'Registrar gasto'}
        </Button>
      </div>
    </form>
  )
}
