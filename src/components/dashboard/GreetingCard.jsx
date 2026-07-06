import { useMemo } from 'react'
import { getGreeting } from '../../constants'

export function GreetingCard() {
  const greeting = useMemo(() => getGreeting(), [])

  return (
    <div>
      <p className="text-2xl">{greeting.emoji}</p>
      <h1 className="mt-1 text-xl font-bold text-ink">{greeting.titulo}</h1>
      <p className="mt-1 text-sm text-ink-muted">{greeting.subtitulo}</p>
    </div>
  )
}
