# Nuestro Hogar

Aplicación web de finanzas personales para Dani y Andrez, con tres fondos
independientes: 🏡 Hogar, 🌱 Sueños y 🛟 Tranquilidad.

Los nombres "Hogar/Sueños/Tranquilidad" y "Dani/Andrez" son solo una capa de
presentación (ver `getFondoDisplay` / `getPersonaDisplay` en
[`src/constants/index.js`](src/constants/index.js)): en Supabase las filas
siguen llamándose "Gastos Mensuales/Ahorro/Fondo de Emergencia" y
"Persona 1/Persona 2", así que no hace falta tocar la base de datos.

Stack: **React + Vite + Tailwind CSS v4**, base de datos **Supabase (Postgres)**, despliegue en **Netlify**.

## Estructura del proyecto

```
src/
  components/
    ui/          Componentes genéricos reutilizables (Button, Card, Input, Modal, Toast...)
    layout/      AppLayout, Header, BottomNavigation, ThemeToggle
    dashboard/   GreetingCard, QuoteCard, BalanceCard, FundCard, TransferCard, ProgressCard
    movimientos/ TransactionCard y filtros del historial
    reportes/    ChartCard + gráficos (recharts)
  pages/         Una página por ruta (Dashboard, Registrar, Movimientos, Reportes, Ajustes)
  hooks/         Hooks de datos (useFondos, useMovimientos, useDashboard, useReportes, useToast...)
  services/      Llamadas a Supabase, aisladas de la UI
  context/       ThemeContext (modo oscuro), ToastContext
  lib/           Cliente de Supabase
  constants/     Mapeo visual de fondos/personas, frases, saludo, colores
  utils/         Formatters, validadores (zod) y `cn` (clsx + tailwind-merge)
  router/        Definición de rutas con code-splitting (react-router-dom + React.lazy)
supabase/
  schema.sql     Esquema completo de la base de datos (tablas, vistas, RLS, seed)
```

## Requisitos previos

- Node.js 20+
- Una cuenta y proyecto en [Supabase](https://supabase.com)

## Configuración de Supabase

1. Crea un proyecto nuevo en Supabase.
2. Abre **SQL Editor** y ejecuta el contenido de [`supabase/schema.sql`](supabase/schema.sql).
   Esto crea las tablas (`personas`, `fondos`, `categorias_gasto`, `movimientos`),
   las vistas (`fondos_saldos`, `resumen_mensual`), políticas de RLS y datos iniciales.
3. Ajusta los nombres de `personas` (por defecto "Persona 1" / "Persona 2") y las
   metas de los fondos desde el **Table Editor** si lo necesitas.
4. Copia la URL del proyecto y la clave `anon public` desde **Project Settings > API**.

## Configuración local

```bash
cp .env.example .env
# Completa VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env

npm install
npm run dev
```

## Scripts disponibles

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción (carpeta `dist/`)
- `npm run preview` — sirve el build de producción localmente
- `npm run lint` — linting con oxlint

## Despliegue en Netlify

El repositorio incluye [`netlify.toml`](netlify.toml) con el comando de build,
la carpeta de publicación (`dist`) y una regla de redirección para el enrutado
del lado del cliente (SPA).

1. Sube el proyecto a GitHub.
2. En Netlify: **Add new site > Import an existing project** y selecciona el repositorio.
   Netlify detectará automáticamente `netlify.toml`.
3. En **Site settings > Environment variables**, agrega:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Cada push a la rama principal dispara un despliegue automático (CD).

## Notas de seguridad

La app actualmente usa la clave `anon` de Supabase compartida por la pareja, sin
autenticación, con políticas de RLS permisivas (`using (true)`). Es apta para uso
privado entre dos personas de confianza. Antes de exponerla públicamente, agrega
autenticación (ver siguiente sección) y ajusta las políticas de RLS en
`supabase/schema.sql` para restringir el acceso por usuario autenticado.

## Extensiones futuras previstas

La estructura del proyecto está preparada para crecer sin reorganizar el código:

- **Autenticación**: la tabla `personas` ya tiene una columna `auth_user_id` para
  vincularse a `auth.users` de Supabase (Supabase Auth). Agregar un `AuthContext`
  similar a `ThemeContext` y proteger las rutas en `router/AppRouter.jsx`.
- **Carga de comprobantes**: la tabla `movimientos` ya tiene la columna
  `comprobante_url`. Crear un bucket de Supabase Storage (ver comentario al final
  de `supabase/schema.sql`) y subir archivos con `supabase.storage.from(...)`.
- **Exportación a Excel/PDF**: agregar un botón en `ReportesPage` o
  `MovimientosPage` que use una librería como `xlsx` o `jspdf` a partir de los
  datos ya disponibles en `useMovimientos` / `useReportes`.
