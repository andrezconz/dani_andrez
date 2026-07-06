import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

// Combina clases condicionales (clsx) y resuelve conflictos entre utilidades
// de Tailwind del mismo grupo (ej. text-base vs. text-3xl) para que el
// className recibido por props siempre pueda sobreescribir el valor por
// defecto del componente, sin depender del orden de generación del CSS.
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
