const PARTICLES = ['✨', '🎉', '💫']

export function Celebration({ show }) {
  if (!show) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden rounded-app">
      <div className="animate-[celebration-pop_400ms_ease] rounded-pill bg-white/95 px-4 py-2 text-sm font-semibold text-sage shadow-soft dark:bg-card/95">
        🎉 ¡Meta alcanzada!
      </div>
      {PARTICLES.map((particle, index) => (
        <span
          key={particle}
          className="absolute bottom-6 animate-[celebration-float_1200ms_ease-out_forwards] text-lg"
          style={{ left: `${28 + index * 22}%`, animationDelay: `${index * 120}ms` }}
        >
          {particle}
        </span>
      ))}
    </div>
  )
}
