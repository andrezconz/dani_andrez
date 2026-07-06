import { z } from 'zod'

const baseMovimientoSchema = {
  fecha: z
    .string()
    .min(1, 'La fecha es obligatoria')
    .refine((value) => !Number.isNaN(new Date(value).getTime()), 'Fecha inválida'),
  personaId: z.string().min(1, 'Selecciona quién realiza el movimiento'),
  fondoId: z.string().min(1, 'Selecciona un fondo'),
  descripcion: z
    .string()
    .trim()
    .min(3, 'La descripción debe tener al menos 3 caracteres')
    .max(200, 'La descripción es muy larga'),
  valor: z.coerce
    .number({ invalid_type_error: 'El valor debe ser un número' })
    .positive('El valor debe ser mayor a 0')
    .max(999999999, 'El valor es demasiado alto'),
}

export const aporteSchema = z.object({ ...baseMovimientoSchema })

export const gastoSchema = z.object({
  ...baseMovimientoSchema,
  categoria: z.string().min(1, 'Selecciona una categoría'),
})

export const movimientoFiltersSchema = z.object({
  mes: z.string().optional().default(''),
  personaId: z.string().optional().default(''),
  tipo: z.string().optional().default(''),
  fondoId: z.string().optional().default(''),
})
