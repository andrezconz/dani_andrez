import { cn } from '../../utils/cn'

const VARIANTS = {
  primary: 'bg-sage text-white hover:bg-sage/90 active:scale-[0.98] disabled:bg-sage/50',
  secondary:
    'bg-card text-ink ring-1 ring-inset ring-border hover:bg-sage-soft active:scale-[0.98]',
  danger: 'bg-error text-white hover:bg-error/90 active:scale-[0.98]',
  ghost: 'bg-transparent text-ink-muted hover:bg-sage-soft active:scale-[0.98]',
}

const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-pill font-semibold shadow-softer',
        'transition-all duration-[250ms] ease-out',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage',
        'disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    />
  )
}
