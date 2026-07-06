import { createContext, useCallback, useMemo, useState } from 'react'

export const ToastContext = createContext(null)

let nextId = 1

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (message, { variant = 'success', duration = 2600 } = {}) => {
      const id = nextId++
      setToasts((current) => [...current, { id, message, variant }])
      window.setTimeout(() => dismissToast(id), duration)
    },
    [dismissToast],
  )

  const value = useMemo(() => ({ toasts, showToast, dismissToast }), [toasts, showToast, dismissToast])

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}
