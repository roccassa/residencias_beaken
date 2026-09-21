// Datos de ejemplo con la misma forma que tendrá la respuesta de la API
// (tabla `actividades` filtrada por tipo = 'evento', ver schema_postgres.sql).
// Cuando el backend esté listo, este archivo se reemplaza por un fetch real.

export const categoriasEventos = [
  { id: 'cat-ev-1', nombre: 'Networking' },
  { id: 'cat-ev-2', nombre: 'Tecnología' },
  { id: 'cat-ev-3', nombre: 'Negocios' },
]

export const eventos = [
  {
    id: 'evento-1',
    titulo: 'Networking para emprendedores',
    categoriaId: 'cat-ev-1',
    descripcion:
      'Una noche para conocer a otros emprendedores, compartir retos y crear alianzas.',
    modalidad: 'presencial',
    ubicacion: 'León',
    fechaInicio: '2024-02-09T19:00:00',
    costo: 0,
    moneda: 'MXN',
    capacidadMaxima: 10,
    inscritosConfirmados: 10,
  },
  {
    id: 'evento-2',
    titulo: 'Foro de IA aplicada',
    categoriaId: 'cat-ev-2',
    descripcion:
      'Casos reales de inteligencia artificial en pequeñas y medianas empresas.',
    modalidad: 'virtual',
    ubicacion: null,
    fechaInicio: '2024-02-10T18:00:00',
    costo: 0,
    moneda: 'MXN',
    capacidadMaxima: 100,
    inscritosConfirmados: 42,
  },
  {
    id: 'evento-3',
    titulo: 'Demo Day Beaken',
    categoriaId: 'cat-ev-3',
    descripcion:
      'Conoce los proyectos que se validaron en el Lab y habla directo con sus equipos.',
    modalidad: 'presencial',
    ubicacion: 'León',
    fechaInicio: '2024-02-11T17:00:00',
    costo: 0,
    moneda: 'MXN',
    capacidadMaxima: 60,
    inscritosConfirmados: 25,
  },
  {
    id: 'evento-4',
    titulo: 'Meetup de inteligencia de negocios',
    categoriaId: 'cat-ev-3',
    descripcion:
      'Charlas cortas sobre cómo tomar decisiones con datos en tu operación diaria.',
    modalidad: 'virtual',
    ubicacion: null,
    fechaInicio: '2024-02-15T18:30:00',
    costo: 50,
    moneda: 'MXN',
    capacidadMaxima: 80,
    inscritosConfirmados: 30,
  },
  {
    id: 'evento-5',
    titulo: 'Charla sobre business skills',
    categoriaId: 'cat-ev-3',
    descripcion:
      'Charlas cortas sobre las habilidades mas importantes para tu negocio.',
    modalidad: 'virtual',
    ubicacion: null,
    fechaInicio: '2024-02-15T18:30:00',
    costo: 50,
    moneda: 'MXN',
    capacidadMaxima: 80,
    inscritosConfirmados: 30,
  },
]
