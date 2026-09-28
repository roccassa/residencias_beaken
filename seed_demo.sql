-- ============================================================================
-- Datos de demostración: catálogo de Cursos, Talleres y Eventos
--
-- Ejecutar UNA sola vez, DESPUÉS de schema_postgres.sql y en la misma base.
-- Reproduce los datos de ejemplo que hoy viven en frontend/src/data/ para que
-- el sitio se vea igual, pero leyendo desde PostgreSQL.
--
-- Las inscripciones de relleno (usuarios "demoN@beaken.demo") existen para que
-- los cupos y los "Sold out" sean reales: la vista vw_actividades_disponibilidad
-- cuenta las inscripciones confirmadas de cada actividad.
-- ============================================================================

begin;

-- ----------------------------------------------------------------------------
-- Categorías (filtros del catálogo)
-- ----------------------------------------------------------------------------
insert into categorias (nombre, tipo_actividad) values
    ('Diseño',     'curso'),
    ('Desarrollo', 'curso'),
    ('IA',         'curso'),
    ('Networking', 'evento'),
    ('Tecnología', 'evento'),
    ('Negocios',   'evento');

-- ----------------------------------------------------------------------------
-- Ubicaciones de las actividades presenciales
-- ----------------------------------------------------------------------------
insert into ubicaciones (nombre, direccion, ciudad, pais) values
    ('Sede León', 'León, Guanajuato', 'León', 'México'),
    ('León',      'León, Guanajuato', 'León', 'México');

-- ----------------------------------------------------------------------------
-- Actividades (hora de México, UTC-6)
-- ----------------------------------------------------------------------------
insert into actividades
    (tipo, titulo, categoria_id, descripcion, modalidad, ubicacion_id,
     costo, moneda, capacidad_maxima, fecha_inicio, fecha_fin, estado, imagen_url)
values
    -- Cursos ------------------------------------------------------------------
    ('curso', 'Fundamentos de UX/UI',
        (select id from categorias where nombre = 'Diseño' and tipo_actividad = 'curso'),
        'Aprende los principios de diseño centrado en el usuario y crea tus primeros prototipos interactivos.',
        'presencial', (select id from ubicaciones where nombre = 'Sede León'),
        120, 'MXN', 20, '2026-10-09 10:00:00-06', '2026-10-09 13:00:00-06', 'publicada', null),

    ('curso', 'Desarrollo web con React',
        (select id from categorias where nombre = 'Desarrollo' and tipo_actividad = 'curso'),
        'Construye interfaces modernas con React y consume APIs reales paso a paso.',
        'virtual', null,
        150, 'MXN', 10, '2026-11-10 09:00:00-06', '2026-11-10 12:00:00-06', 'publicada', null),

    ('curso', 'Taller para emprendedores',
        (select id from categorias where nombre = 'IA' and tipo_actividad = 'curso'),
        'Estrategias prácticas de redes sociales, email y publicidad paga para hacer crecer tu negocio.',
        'presencial', (select id from ubicaciones where nombre = 'León'),
        100, 'MXN', 10, '2026-10-30 16:00:00-06', '2026-10-30 19:00:00-06', 'publicada', null),

    ('curso', 'Uso de IA',
        (select id from categorias where nombre = 'IA' and tipo_actividad = 'curso'),
        'Comprende el buen uso de la IA para mejorar en tu negocio.',
        'virtual', null,
        0, 'MXN', 10, '2026-10-16 18:00:00-06', '2026-10-16 21:00:00-06', 'publicada', null),

    ('curso', 'Fundamentos de IA',
        (select id from categorias where nombre = 'IA' and tipo_actividad = 'curso'),
        'Conoce la historia de la IA y toda su evolución',
        'virtual', null,
        0, 'MXN', 10, '2026-11-09 18:00:00-06', '2026-11-09 21:00:00-06', 'publicada', null),

    -- Talleres (la duración que muestra el sitio sale de fecha_fin - fecha_inicio)
    ('taller', 'Aprende a usar Figma', null,
        'Taller presencial de introducción a Figma: interfaces, componentes y prototipos. Trae tu laptop.',
        'presencial', (select id from ubicaciones where nombre = 'León'),
        120, 'MXN', 15, '2026-10-05 10:00:00-06', '2026-10-05 14:00:00-06', 'publicada',
        '/img/talleres/taller1.webp'),

    ('taller', 'Prompts eficientes', null,
        'Automatiza tu contenido y campañas con herramientas de inteligencia artificial.',
        'virtual', null,
        0, 'MXN', 30, '2026-11-10 18:00:00-06', '2026-11-10 21:00:00-06', 'publicada',
        '/img/talleres/taller5.webp'),

    ('taller', 'Inteligencia de negocios', null,
        'Aprende a tomar decisiones basadas en datos.',
        'virtual', null,
        50, 'MXN', 30, '2026-10-26 18:00:00-06', '2026-10-26 22:00:00-06', 'publicada',
        '/img/talleres/taller3.jpg'),

    ('taller', 'Marketing con IA', null,
        'Automatiza tu contenido y campañas con herramientas de inteligencia artificial.',
        'virtual', null,
        0, 'MXN', 30, '2026-11-03 10:00:00-06', '2026-11-03 16:00:00-06', 'publicada',
        '/img/talleres/taller4.jpg'),

    ('taller', 'Taller para emprendedores', null,
        'Taller presencial para quienes van comenzando un emprendimiento: validación de ideas, propuesta de valor y primeros clientes.',
        'presencial', (select id from ubicaciones where nombre = 'León'),
        35, 'MXN', 20, '2026-10-17 16:00:00-06', '2026-10-17 19:00:00-06', 'publicada',
        '/img/talleres/taller2.jpg'),

    -- Eventos -----------------------------------------------------------------
    ('evento', 'Networking para emprendedores',
        (select id from categorias where nombre = 'Networking' and tipo_actividad = 'evento'),
        'Una noche para conocer a otros emprendedores, compartir retos y crear alianzas.',
        'presencial', (select id from ubicaciones where nombre = 'León'),
        0, 'MXN', 10, '2026-10-09 19:00:00-06', '2026-10-09 22:00:00-06', 'publicada', null),

    ('evento', 'Foro de IA aplicada',
        (select id from categorias where nombre = 'Tecnología' and tipo_actividad = 'evento'),
        'Casos reales de inteligencia artificial en pequeñas y medianas empresas.',
        'virtual', null,
        0, 'MXN', 100, '2026-10-10 18:00:00-06', '2026-10-10 20:00:00-06', 'publicada', null),

    ('evento', 'Demo Day Beaken',
        (select id from categorias where nombre = 'Negocios' and tipo_actividad = 'evento'),
        'Conoce los proyectos que se validaron en el Lab y habla directo con sus equipos.',
        'presencial', (select id from ubicaciones where nombre = 'León'),
        0, 'MXN', 60, '2026-10-11 17:00:00-06', '2026-10-11 20:00:00-06', 'publicada', null),

    ('evento', 'Meetup de inteligencia de negocios',
        (select id from categorias where nombre = 'Negocios' and tipo_actividad = 'evento'),
        'Charlas cortas sobre cómo tomar decisiones con datos en tu operación diaria.',
        'virtual', null,
        50, 'MXN', 80, '2026-10-15 18:30:00-06', '2026-10-15 20:30:00-06', 'publicada', null),

    ('evento', 'Charla sobre business skills',
        (select id from categorias where nombre = 'Negocios' and tipo_actividad = 'evento'),
        'Charlas cortas sobre las habilidades más importantes para tu negocio.',
        'virtual', null,
        50, 'MXN', 80, '2026-10-16 18:30:00-06', '2026-10-16 20:30:00-06', 'publicada', null);

-- ----------------------------------------------------------------------------
-- Usuarios de relleno (sin contraseña) para poblar los cupos
-- ----------------------------------------------------------------------------
insert into usuarios (nombre, apellido, correo)
select 'Demo', 'Usuario ' || g, 'demo' || g || '@beaken.demo'
from generate_series(1, 45) as g;

-- ----------------------------------------------------------------------------
-- Inscripciones confirmadas de relleno: n inscritos por actividad
-- ----------------------------------------------------------------------------
insert into inscripciones (usuario_id, actividad_id, estado)
select u.id, a.id, 'confirmada'::estado_inscripcion_enum
from (values
    ('curso'::tipo_actividad_enum,  'Fundamentos de UX/UI',                20),
    ('curso',                       'Desarrollo web con React',            10),
    ('curso',                       'Taller para emprendedores',            8),
    ('curso',                       'Uso de IA',                            5),
    ('curso',                       'Fundamentos de IA',                    5),
    ('taller',                      'Aprende a usar Figma',                 6),
    ('taller',                      'Prompts eficientes',                  12),
    ('taller',                      'Inteligencia de negocios',             9),
    ('taller',                      'Marketing con IA',                     4),
    ('taller',                      'Taller para emprendedores',            7),
    ('evento',                      'Networking para emprendedores',       10),
    ('evento',                      'Foro de IA aplicada',                 42),
    ('evento',                      'Demo Day Beaken',                     25),
    ('evento',                      'Meetup de inteligencia de negocios',  30),
    ('evento',                      'Charla sobre business skills',        30)
) as v(tipo, titulo, n)
join actividades a
  on a.tipo = v.tipo and a.titulo = v.titulo
join (
    select id, row_number() over (order by correo) as rn
    from usuarios
    where correo like 'demo%@beaken.demo'
) u on u.rn <= v.n;

commit;

-- ----------------------------------------------------------------------------
-- Verificación: debe mostrar 15 actividades y los mismos cupos del sitio
-- (Fundamentos de UX/UI, Desarrollo web con React y Networking para
-- emprendedores con cupos_disponibles = 0, es decir, "Sold out").
-- ----------------------------------------------------------------------------
select tipo, titulo, capacidad_maxima, inscritos_confirmados, cupos_disponibles
from vw_actividades_disponibilidad
order by tipo, fecha_inicio;
