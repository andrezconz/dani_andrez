-- ============================================================================
-- Finanzas de Pareja - Esquema de base de datos para Supabase (PostgreSQL)
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- ============================================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- personas: los dos integrantes de la pareja. Se modela como tabla (no enum)
-- para poder renombrarlos o, en el futuro, vincularlos a auth.users.id.
-- ----------------------------------------------------------------------------
create table if not exists personas (
  id uuid primary key default gen_random_uuid(),
  nombre text not null unique,
  color text not null default '#6366f1',
  auth_user_id uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- fondos: los tres fondos independientes (y espacio para futuros fondos).
-- ----------------------------------------------------------------------------
create table if not exists fondos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null unique,
  tipo text not null check (tipo in ('gastos_mensuales', 'ahorro', 'emergencia', 'otro')),
  meta numeric(14, 2) check (meta is null or meta >= 0),
  descripcion text,
  orden int not null default 0,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- categorias_gasto: catálogo editable de categorías para gastos.
-- ----------------------------------------------------------------------------
create table if not exists categorias_gasto (
  id uuid primary key default gen_random_uuid(),
  nombre text not null unique,
  icono text not null default 'tag',
  activa boolean not null default true
);

-- ----------------------------------------------------------------------------
-- movimientos: aportes (ingresos a un fondo) y gastos (egresos de un fondo).
-- ----------------------------------------------------------------------------
create table if not exists movimientos (
  id uuid primary key default gen_random_uuid(),
  fecha date not null default current_date,
  tipo text not null check (tipo in ('aporte', 'gasto')),
  persona_id uuid not null references personas (id) on delete restrict,
  fondo_id uuid not null references fondos (id) on delete restrict,
  categoria text,
  descripcion text not null,
  valor numeric(14, 2) not null check (valor > 0),
  comprobante_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint gasto_requiere_categoria check (tipo <> 'gasto' or categoria is not null)
);

create index if not exists idx_movimientos_fecha on movimientos (fecha desc);
create index if not exists idx_movimientos_fondo on movimientos (fondo_id);
create index if not exists idx_movimientos_persona on movimientos (persona_id);
create index if not exists idx_movimientos_tipo on movimientos (tipo);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_movimientos_updated_at on movimientos;
create trigger trg_movimientos_updated_at
  before update on movimientos
  for each row execute function set_updated_at();

-- ----------------------------------------------------------------------------
-- Vista: saldo actual de cada fondo (aportes - gastos).
-- ----------------------------------------------------------------------------
create or replace view fondos_saldos as
select
  f.id as fondo_id,
  f.nombre,
  f.tipo,
  f.meta,
  f.descripcion,
  f.orden,
  coalesce(sum(case when m.tipo = 'aporte' then m.valor else -m.valor end), 0) as saldo,
  coalesce(sum(case when m.tipo = 'aporte' then m.valor else 0 end), 0) as total_aportes,
  coalesce(sum(case when m.tipo = 'gasto' then m.valor else 0 end), 0) as total_gastos
from fondos f
left join movimientos m on m.fondo_id = f.id
group by f.id, f.nombre, f.tipo, f.meta, f.descripcion, f.orden;

-- ----------------------------------------------------------------------------
-- Vista: resumen mensual de ingresos y gastos (para dashboard y reportes).
-- ----------------------------------------------------------------------------
create or replace view resumen_mensual as
select
  date_trunc('month', fecha)::date as mes,
  tipo,
  fondo_id,
  persona_id,
  categoria,
  sum(valor) as total
from movimientos
group by date_trunc('month', fecha), tipo, fondo_id, persona_id, categoria;

-- ----------------------------------------------------------------------------
-- Seed inicial: personas y fondos por defecto (ajustar nombres desde la app).
-- ----------------------------------------------------------------------------
insert into personas (nombre, color)
values ('Persona 1', '#6366f1'), ('Persona 2', '#ec4899')
on conflict (nombre) do nothing;

insert into fondos (nombre, tipo, meta, descripcion, orden)
values
  ('Gastos Mensuales', 'gastos_mensuales', null, 'Gastos del hogar y del día a día', 1),
  ('Ahorro', 'ahorro', 10000000, 'Metas de ahorro compartidas', 2),
  ('Fondo de Emergencia', 'emergencia', 5000000, 'Reserva para imprevistos', 3)
on conflict (nombre) do nothing;

insert into categorias_gasto (nombre, icono)
values
  ('Alimentación', 'shopping-cart'),
  ('Transporte', 'car'),
  ('Servicios', 'zap'),
  ('Arriendo/Hipoteca', 'home'),
  ('Salud', 'heart-pulse'),
  ('Entretenimiento', 'popcorn'),
  ('Educación', 'book'),
  ('Otros', 'tag')
on conflict (nombre) do nothing;

-- ----------------------------------------------------------------------------
-- Row Level Security.
-- La app todavía no tiene autenticación (usa la clave anon compartida por la
-- pareja), así que se habilita RLS con políticas permisivas. Cuando se agregue
-- auth (ver README), reemplazar estas políticas por reglas por usuario.
-- ----------------------------------------------------------------------------
alter table personas enable row level security;
alter table fondos enable row level security;
alter table categorias_gasto enable row level security;
alter table movimientos enable row level security;

drop policy if exists "acceso_total_personas" on personas;
create policy "acceso_total_personas" on personas for all using (true) with check (true);

drop policy if exists "acceso_total_fondos" on fondos;
create policy "acceso_total_fondos" on fondos for all using (true) with check (true);

drop policy if exists "acceso_total_categorias" on categorias_gasto;
create policy "acceso_total_categorias" on categorias_gasto for all using (true) with check (true);

drop policy if exists "acceso_total_movimientos" on movimientos;
create policy "acceso_total_movimientos" on movimientos for all using (true) with check (true);

-- ----------------------------------------------------------------------------
-- Storage (opcional, para carga futura de comprobantes).
-- Crear manualmente en Supabase Dashboard > Storage un bucket "comprobantes"
-- (público o privado con políticas propias) o descomentar lo siguiente:
-- ----------------------------------------------------------------------------
-- insert into storage.buckets (id, name, public)
-- values ('comprobantes', 'comprobantes', false)
-- on conflict (id) do nothing;
