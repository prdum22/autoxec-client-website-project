import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

const ToastContext = createContext<(msg: string) => void>(() => {})

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<string | null>(null)

  const showToast = useCallback((msg: string) => {
    setToast(msg)
  }, [])

  useEffect(() => {
    if (!toast) return
    const id = window.setTimeout(() => setToast(null), 2200)
    return () => window.clearTimeout(id)
  }, [toast])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className={`toast${toast ? ' show' : ''}`} role="status">
        {toast}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
