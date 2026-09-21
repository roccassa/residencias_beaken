// Datos de ejemplo con la misma forma que tendrá la respuesta de la API
// (tabla `actividades` filtrada por tipo = 'taller', ver schema_postgres.sql).
// Cuando el backend esté listo, este archivo se reemplaza por un fetch real.

import taller1 from '../assets/images/talleres/taller1.webp'
import taller2 from '../assets/images/talleres/taller2.jpg'
import taller3 from '../assets/images/talleres/taller3.jpg'
import taller4 from '../assets/images/talleres/taller4.jpg'
import taller5 from '../assets/images/talleres/taller5.webp'

export const talleres = [
  {
    id: 'taller-1',
    titulo: 'Aprende a usar Figma',
    duracion: '2 semanas',
    imagen: taller1,
    modalidad: 'presencial',
    ubicacion: 'León',
    fechaInicio: '2026-10-05T10:00:00',
    costo: 120,
    moneda: 'MXN',
    descripcion:
      'Curso presencial de tres semanas. Incluye tableta de dibujo digital.',
  },
{
    id: 'taller-2',
    titulo: 'Prompts eficientes',
    duracion: '3 horas',
    imagen: taller5,
    modalidad: 'virtual',
    ubicacion: null,
    fechaInicio: '2026-11-10T18:00:00',
    costo: 0,
    moneda: 'MXN',
    descripcion:
      'Automatiza tu contenido y campañas con herramientas de inteligencia artificial.',
  },

  {
    id: 'taller-3',
    titulo: 'Inteligencia de negocios',
    duracion: '4 horas',
    imagen: taller3,
    modalidad: 'virtual',
    ubicacion: null,
    fechaInicio: '2026-10-26T18:00:00',
    costo: 50,
    moneda: 'MXN',
    descripcion:
      'Aprende a tomar decisiones basadas en datos.',
  },
  {
    id: 'taller-4',
    titulo: 'Marketing con IA',
    duracion: '6 horas',
    imagen: taller4,
    modalidad: 'virtual',
    ubicacion: null,
    fechaInicio: '2026-11-03T18:00:00',
    costo: 0,
    moneda: 'MXN',
    descripcion:
      'Automatiza tu contenido y campañas con herramientas de inteligencia artificial.',
  },
    {
    id: 'taller-5',
    titulo: 'Taller para emprendedores',
    duracion: '2 días',
    imagen: taller2,
    modalidad: 'online',
    ubicacion: 'León',
    fechaInicio: '2026-10-17T16:00:00',
    costo: 35,
    moneda: 'MXN',
    descripcion:
      'Taller presencial para quienes van comenzando un emprendimiento  ',
  },
  ]
