import { ThemeProvider } from './context/ThemeContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ConfigError } from './components/ConfigError'
import { AppRouter } from './router/AppRouter'
import { isSupabaseConfigured } from './lib/supabaseClient'

function App() {
  if (!isSupabaseConfigured) {
    return <ConfigError />
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
