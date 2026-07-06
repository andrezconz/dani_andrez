import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-md items-center justify-between px-5 pb-2 pt-6">
      <span className="text-lg font-bold text-ink">🏡 Nuestro Hogar</span>
      <ThemeToggle />
    </header>
  )
}
