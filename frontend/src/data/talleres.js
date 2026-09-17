// Datos de ejemplo con la misma forma que tendrá la respuesta de la API
// (tabla `actividades` filtrada por tipo = 'taller', ver schema_postgres.sql).
// Cuando el backend esté listo, este archivo se reemplaza por un fetch real.

export const talleres = [
  {
    id: 'taller-1',
    titulo: 'Aprende a usar Figma',
    duracion: '2 semanas',
    modalidad: 'presencial',
    ubicacion: 'León',
    fechaInicio: '2024-02-16T10:00:00',
    costo: 120,
    moneda: 'MXN',
    descripcion:
      'Curso presencial de tres semanas. Incluye tableta de dibujo digital.',
  },
  {
    id: 'taller-2',
    titulo: 'Taller para emprendedores',
    duracion: '2 días',
    modalidad: 'online',
    ubicacion: 'León',
    fechaInicio: '2024-02-17T16:00:00',
    costo: 35,
    moneda: 'MXN',
    descripcion:
      'Taller presencial para quienes van comenzando un emprendimiento  ',
  },
  {
    id: 'taller-3',
    titulo: 'Inteligencia de negocios',
    duracion: '4 horas',
    modalidad: 'virtual',
    ubicacion: null,
    fechaInicio: '2024-02-18T18:00:00',
    costo: 50,
    moneda: 'MXN',
    descripcion:
      'Aprende a tomar decisiones basadas en datos.',
  },
  {
    id: 'taller-4',
    titulo: 'Marketing con IA',
    duracion: '6 horas',
    modalidad: 'virtual',
    ubicacion: null,
    fechaInicio: '2024-02-20T18:00:00',
    costo: 0,
    moneda: 'MXN',
    descripcion:
      'Automatiza tu contenido y campañas con herramientas de inteligencia artificial.',
  },
]
