import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { MONEDA_CODIGO, MONEDA_LOCALE } from '../constants'

const currencyFormatter = new Intl.NumberFormat(MONEDA_LOCALE, {
  style: 'currency',
  currency: MONEDA_CODIGO,
  maximumFractionDigits: 0,
})

export function formatCurrency(value) {
  const numeric = Number(value) || 0
  return currencyFormatter.format(numeric)
}

export function formatDate(value, pattern = 'd MMM yyyy') {
  if (!value) return ''
  const date = typeof value === 'string' ? parseISO(value) : value
  return format(date, pattern, { locale: es })
}

export function formatMonthLabel(value) {
  return formatDate(value, 'MMMM yyyy')
}

export function formatPercent(value, digits = 0) {
  const numeric = Number(value) || 0
  return `${numeric.toFixed(digits)}%`
}

export function clampPercent(value) {
  if (Number.isNaN(value) || !Number.isFinite(value)) return 0
  return Math.min(100, Math.max(0, value))
}
