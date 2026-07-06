import { ThemeProvider } from './context/ThemeContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { AppRouter } from './router/AppRouter'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
