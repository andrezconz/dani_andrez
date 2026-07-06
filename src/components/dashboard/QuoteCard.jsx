import { useMemo } from 'react'
import { getQuoteOfTheMoment } from '../../constants'

export function QuoteCard() {
  const quote = useMemo(() => getQuoteOfTheMoment(), [])

  return (
    <div className="rounded-app bg-sand-soft px-4 py-3 text-sm font-medium text-ink">{quote}</div>
  )
}
