import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ConfigError } from './components/ConfigError'
import { ToastViewport } from './components/ui/Toast'
import { AppRouter } from './router/AppRouter'
import { isSupabaseConfigured } from './lib/supabaseClient'

function App() {
  if (!isSupabaseConfigured) {
    return <ConfigError />
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <AppRouter />
          <ToastViewport />
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
