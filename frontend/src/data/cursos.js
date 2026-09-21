// Datos de ejemplo con la misma forma que tendrá la respuesta de la API
// (tabla `actividades` filtrada por tipo = 'curso', ver schema_postgres.sql).
// Cuando el backend esté listo, este archivo se reemplaza por un fetch real.

export const categorias = [
  { id: 'cat-1', nombre: 'Diseño' },
  { id: 'cat-2', nombre: 'Desarrollo' },
  { id: 'cat-3', nombre: 'IA' },
]

export const cursos = [
  {
    id: 'curso-1',
    titulo: 'Fundamentos de UX/UI',
    categoriaId: 'cat-1',
    descripcion:
      'Aprende los principios de diseño centrado en el usuario y crea tus primeros prototipos interactivos.',
    modalidad: 'presencial',
    ubicacion: 'Sede León',
    fechaInicio: '2026-10-09T10:00:00',
    costo: 120,
    moneda: 'MXN',
    imagenUrl: null,
    capacidadMaxima: 20,
    inscritosConfirmados: 20,
  },
  {
    id: 'curso-2',
    titulo: 'Desarrollo web con React',
    categoriaId: 'cat-2',
    descripcion:
      'Construye interfaces modernas con React y consume APIs reales paso a paso.',
    modalidad: 'virtual',
    ubicacion: null,
    fechaInicio: '2026-11-10T09:00:00',
    costo: 150,
    moneda: 'MXN',
    imagenUrl: null,
    capacidadMaxima: 10,
    inscritosConfirmados: 10
  },
  {
    id: 'curso-3',
    titulo: 'Taller para emprendedores',
    categoriaId: 'cat-3',
    descripcion:
      'Estrategias prácticas de redes sociales, email y publicidad paga para hacer crecer tu negocio.',
    modalidad: 'presencial',
    ubicacion: 'León',
    fechaInicio: '2026-10-30T16:00:00',
    costo: 100,
    moneda: 'MXN',
    imagenUrl: null,
    capacidadMaxima: 10,
    inscritosConfirmados: 8,
  },
  {
    id: 'curso-4',
    titulo: 'Uso de IA',
    categoriaId: 'cat-3',
    descripcion:
      'Comprende el buen uso de la IA para mejorar en tu negocio.',
    modalidad: 'virtual',
    ubicacion: null,
    fechaInicio: '2026-10-16T18:00:00',
    costo: 0,
    moneda: 'MXN',
    imagenUrl: null,
    capacidadMaxima: 10,
    inscritosConfirmados: 5,
  },
    {
    id: 'curso-5',
    titulo: 'Fundamentos de IA',
    categoriaId: 'cat-3',
    descripcion:
      'Conoce la historia de la IA y toda su evolución',
    modalidad: 'virtual',
    ubicacion: null,
    fechaInicio: '2026-11-09T18:00:00',
    costo: 0,
    moneda: 'MXN',
    imagenUrl: null,
    capacidadMaxima: 10,
    inscritosConfirmados: 5,
  },
]
