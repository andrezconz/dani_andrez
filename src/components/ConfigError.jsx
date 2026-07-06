export function ConfigError() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 p-6 text-center dark:bg-slate-950">
      <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
        Falta configurar Supabase
      </h1>
      <p className="max-w-lg text-sm text-slate-500 dark:text-slate-400">
        No se encontraron las variables de entorno{' '}
        <code className="rounded bg-slate-200 px-1 py-0.5 dark:bg-slate-800">VITE_SUPABASE_URL</code>{' '}
        y{' '}
        <code className="rounded bg-slate-200 px-1 py-0.5 dark:bg-slate-800">
          VITE_SUPABASE_ANON_KEY
        </code>
        .
      </p>
      <ul className="max-w-lg list-disc space-y-1 pl-5 text-left text-sm text-slate-500 dark:text-slate-400">
        <li>
          Local: copia <code>.env.example</code> a <code>.env</code> y completa los valores de tu
          proyecto de Supabase.
        </li>
        <li>
          Netlify: agrégalas en <em>Site settings → Environment variables</em> y vuelve a desplegar
          el sitio.
        </li>
      </ul>
    </div>
  )
}
