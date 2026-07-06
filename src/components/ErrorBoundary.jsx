import { Component } from 'react'
import { Button } from './ui/Button'

export class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Error no controlado en la aplicación:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 p-6 text-center dark:bg-slate-950">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Algo salió mal
          </h1>
          <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">
            {this.state.error.message}
          </p>
          <Button onClick={() => window.location.reload()}>Recargar la página</Button>
        </div>
      )
    }

    return this.props.children
  }
}
