export const TIPO_MOVIMIENTO = {
  APORTE: 'aporte',
  GASTO: 'gasto',
}

export const TIPO_MOVIMIENTO_LABEL = {
  [TIPO_MOVIMIENTO.APORTE]: 'Aporte',
  [TIPO_MOVIMIENTO.GASTO]: 'Gasto',
}

export const TIPO_FONDO = {
  GASTOS_MENSUALES: 'gastos_mensuales',
  AHORRO: 'ahorro',
  EMERGENCIA: 'emergencia',
  OTRO: 'otro',
}

// Los fondos se llaman así en la base de datos (columna `tipo`, fija) pero en
// la interfaz se muestran con nombres más cercanos y cálidos. Mapeamos por
// `tipo` (no por `nombre`, que es editable) para que el rediseño no dependa
// de renombrar filas en Supabase.
export const FONDO_DISPLAY = {
  [TIPO_FONDO.GASTOS_MENSUALES]: {
    nombre: 'Hogar',
    icono: '🏡',
    color: 'hogar',
  },
  [TIPO_FONDO.AHORRO]: {
    nombre: 'Sueños',
    icono: '🌱',
    color: 'suenos',
  },
  [TIPO_FONDO.EMERGENCIA]: {
    nombre: 'Tranquilidad',
    icono: '🛟',
    color: 'tranquilidad',
  },
  [TIPO_FONDO.OTRO]: {
    nombre: 'Otro',
    icono: '💼',
    color: 'sand',
  },
}

export function getFondoDisplay(fondo) {
  return FONDO_DISPLAY[fondo?.tipo] ?? { nombre: fondo?.nombre ?? 'Fondo', icono: '💼', color: 'sand' }
}

// Todo aporte se distribuye de forma fija entre los tres fondos: no se elige
// un fondo al registrar, el valor ingresado se reparte según estos porcentajes.
export const APORTE_DISTRIBUCION = [
  { tipoFondo: TIPO_FONDO.GASTOS_MENSUALES, porcentaje: 0.6 },
  { tipoFondo: TIPO_FONDO.AHORRO, porcentaje: 0.25 },
  { tipoFondo: TIPO_FONDO.EMERGENCIA, porcentaje: 0.15 },
]

// Reparte `valor` según APORTE_DISTRIBUCION. Los dos primeros fondos se
// redondean y el último recibe el remanente, así la suma siempre da exacto.
export function distribuirAporte(valor) {
  const total = Number(valor) || 0
  let acumulado = 0

  return APORTE_DISTRIBUCION.map((item, index) => {
    const esUltimo = index === APORTE_DISTRIBUCION.length - 1
    const monto = esUltimo ? total - acumulado : Math.round(total * item.porcentaje)
    acumulado += monto
    return { ...item, valor: monto }
  })
}

// Igual que con los fondos: en Supabase las personas se llaman "Persona 1" y
// "Persona 2"; aquí solo se traduce la presentación visual (avatar + nombre
// cercano) sin tocar los datos.
const PERSONA_DISPLAY_BY_NAME = {
  'Persona 1': { nombre: 'Dani', avatar: '👩🏻' },
  'Persona 2': { nombre: 'Andrez', avatar: '👨🏻' },
}

export function getPersonaDisplay(persona) {
  const nombre = persona?.nombre ?? ''
  return PERSONA_DISPLAY_BY_NAME[nombre] ?? { nombre: nombre || 'Alguien', avatar: '🧑' }
}

export const CHART_COLORS = ['#7D9D7C', '#FFB74D', '#64B5F6', '#D9C7A3', '#81C784', '#EF9A9A']

export const MONEDA_LOCALE = 'es-CO'
export const MONEDA_CODIGO = 'COP'

export const TRANSFER_KEY = '@DLAGT400'

export const QUOTES = [
  '❤️ Cada peso ahorrado es un paso más hacia sus sueños.',
  '🏡 Las grandes historias también se construyen con pequeños aportes.',
  '🌱 Hoy siembran tranquilidad para el mañana.',
  '✨ Todo gran proyecto comienza con la decisión de construirlo juntos.',
  '🤍 Lo importante no es cuánto ahorran, sino que lo hacen unidos.',
  '🌿 El mejor patrimonio siempre será el que construyan juntos.',
  '💚 Un hogar también se construye organizando las finanzas.',
  '🌅 Cada día están más cerca de la vida que imaginan.',
  '🏠 Su futuro comienza con las decisiones de hoy.',
  '🌎 Pequeños esfuerzos crean grandes resultados.',
]

export function getQuoteOfTheMoment() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)]
}

export function getGreeting(date = new Date()) {
  const hour = date.getHours()

  if (hour < 12) {
    return {
      emoji: '☀️',
      titulo: 'Buenos días, Dani y Andrez ❤️',
      subtitulo: 'Hoy es un gran día para seguir construyendo sus sueños.',
    }
  }

  if (hour < 19) {
    return {
      emoji: '🌤️',
      titulo: 'Buenas tardes ❤️',
      subtitulo: 'Cada aporte de hoy fortalece el hogar que están construyendo.',
    }
  }

  return {
    emoji: '🌙',
    titulo: 'Buenas noches ❤️',
    subtitulo: 'Gracias por seguir cuidando el futuro de su familia.',
  }
}
