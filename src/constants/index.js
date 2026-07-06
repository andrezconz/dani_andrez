export const TIPO_MOVIMIENTO = {
  APORTE: 'aporte',
  GASTO: 'gasto',
}

export const TIPO_MOVIMIENTO_LABEL = {
  [TIPO_MOVIMIENTO.APORTE]: 'Aporte',
  [TIPO_MOVIMIENTO.GASTO]: 'Gasto',
}

export const TIPO_FONDO = {
  GASTOS_MENSUALES: 'gastos_mensuales',
  AHORRO: 'ahorro',
  EMERGENCIA: 'emergencia',
  OTRO: 'otro',
}

export const TIPO_FONDO_LABEL = {
  [TIPO_FONDO.GASTOS_MENSUALES]: 'Gastos Mensuales',
  [TIPO_FONDO.AHORRO]: 'Ahorro',
  [TIPO_FONDO.EMERGENCIA]: 'Fondo de Emergencia',
  [TIPO_FONDO.OTRO]: 'Otro',
}

export const TIPO_FONDO_COLOR = {
  [TIPO_FONDO.GASTOS_MENSUALES]: {
    bar: 'bg-sky-500',
    text: 'text-sky-600 dark:text-sky-400',
    chip: 'bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400',
  },
  [TIPO_FONDO.AHORRO]: {
    bar: 'bg-emerald-500',
    text: 'text-emerald-600 dark:text-emerald-400',
    chip: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  },
  [TIPO_FONDO.EMERGENCIA]: {
    bar: 'bg-amber-500',
    text: 'text-amber-600 dark:text-amber-400',
    chip: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  },
  [TIPO_FONDO.OTRO]: {
    bar: 'bg-slate-500',
    text: 'text-slate-600 dark:text-slate-400',
    chip: 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400',
  },
}

export const CHART_COLORS = [
  '#6366f1',
  '#ec4899',
  '#10b981',
  '#f59e0b',
  '#0ea5e9',
  '#8b5cf6',
  '#ef4444',
  '#14b8a6',
]

export const MONEDA_LOCALE = 'es-CO'
export const MONEDA_CODIGO = 'COP'
