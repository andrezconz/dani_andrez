import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { useToast } from '../../hooks/useToast'

const VARIANT_STYLES = {
  success: 'bg-sage text-white',
  error: 'bg-error text-white',
  info: 'bg-ink text-bg',
}

export function ToastViewport() {
  const { toasts, dismissToast } = useToast()

  if (typeof document === 'undefined') return null

  return createPortal(
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex flex-col items-center gap-2 px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          onClick={() => dismissToast(toast.id)}
          className={clsx(
            'pointer-events-auto left-1/2 max-w-sm rounded-app px-4 py-3 text-sm font-medium shadow-soft',
            'animate-[toast-in_250ms_ease]',
            VARIANT_STYLES[toast.variant] ?? VARIANT_STYLES.success,
          )}
        >
          {toast.message}
        </div>
      ))}
    </div>,
    document.body,
  )
}
