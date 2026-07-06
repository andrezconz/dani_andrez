import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Si faltan las variables de entorno, no lanzamos aquí: este módulo se
// importa en cascada desde casi toda la app, y un throw a nivel de módulo
// rompe el bundle completo antes de que React pueda montar nada (pantalla
// en blanco, sin que el ErrorBoundary llegue a intervenir). En su lugar,
// exponemos `isSupabaseConfigured` para que App.jsx muestre una pantalla
// de configuración clara.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

if (!isSupabaseConfigured) {
  console.error(
    'Faltan las variables de entorno VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. ' +
      'Local: copia .env.example a .env. Netlify: agrégalas en Site settings > Environment variables.',
  )
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'public-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  },
)
