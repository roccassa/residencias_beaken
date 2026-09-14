-- ============================================================================
-- Modelo de datos: Catálogo de Cursos, Talleres y Eventos
-- PostgreSQL 14+
--
-- Basado en los bocetos lo-fi (Relume): sitemap, Section-Cursos, Section-Talleres,
-- Section-Eventos, Section-Inscripción, login y "Mis cursos".
--
-- Decisiones confirmadas:
--   1. Cursos / talleres / eventos viven en UNA sola tabla (actividades) con
--      columna "tipo", en vez de tres tablas separadas.
--   2. El formulario "¿Tu empresa se quiere sumar?" del boceto de Inscripción
--      queda FUERA de este modelo (no se creó tabla de empresas).
--   3. Cada actividad tiene una única fecha de inicio/fin (no hay tabla de
--      sesiones/clases individuales).
--   4. No hay roles de administrador/instructor con login: el catálogo se
--      carga por otro medio. La tabla "usuarios" es solo para quien se inscribe.
--
-- Agregados justificados (ver el documento adjunto para el detalle):
--   - ubicaciones   (normaliza direcciones repetidas de actividades presenciales)
--   - categorias    (el "tema" del curso/taller/evento y los filtros
--                     "Category one/two/three/four" del catálogo)
--   - columnas "estado" en actividades/inscripciones/pagos (sold out, cancelación,
--     lista de espera, pagos pendientes/rechazados/reembolsados)
--
-- No se emiten certificados: se quitó la tabla "certificados" del modelo.
-- ============================================================================

create extension if not exists pgcrypto; -- para gen_random_uuid()

-- ----------------------------------------------------------------------------
-- Tipos enumerados
-- ----------------------------------------------------------------------------
create type tipo_actividad_enum      as enum ('curso', 'taller', 'evento');
create type modalidad_enum           as enum ('presencial', 'virtual');
create type estado_actividad_enum    as enum ('borrador', 'publicada', 'cancelada', 'finalizada');
create type estado_inscripcion_enum  as enum ('pendiente_pago', 'confirmada', 'cancelada', 'reembolsada', 'lista_espera');
create type metodo_pago_enum         as enum ('tarjeta', 'transferencia');
create type estado_pago_enum         as enum ('pendiente', 'aprobado', 'rechazado', 'reembolsado');

-- ----------------------------------------------------------------------------
-- Función auxiliar para mantener updated_at
-- ----------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------
-- usuarios: cuentas que se inscriben a actividades (login por correo/contraseña
-- o "Continuar con Google", según el boceto de login)
-- ----------------------------------------------------------------------------
create table usuarios (
    id              uuid primary key default gen_random_uuid(),
    nombre          varchar(100) not null,
    apellido        varchar(100),
    correo          varchar(255) not null unique,
    telefono        varchar(30),
    password_hash   varchar(255),
    google_id       varchar(255) unique,
    fecha_registro  timestamptz not null default now(),
    activo          boolean not null default true,
    created_at      timestamptz not null default now(),
    updated_at      timestamptz not null default now(),
    constraint chk_usuarios_tiene_metodo_login
        check (password_hash is not null or google_id is not null)
);

create trigger trg_usuarios_updated_at
    before update on usuarios
    for each row execute function set_updated_at();

-- ----------------------------------------------------------------------------
-- categorias: filtros del catálogo ("Category one, two, three, four")
-- ----------------------------------------------------------------------------
create table categorias (
    id              uuid primary key default gen_random_uuid(),
    nombre          varchar(100) not null,
    tipo_actividad  tipo_actividad_enum, -- null = aplica a cualquier tipo
    created_at      timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- instructores: "quién la imparte"
-- ----------------------------------------------------------------------------
create table instructores (
    id          uuid primary key default gen_random_uuid(),
    nombre      varchar(150) not null,
    correo      varchar(255),
    telefono    varchar(30),
    bio         text,
    foto_url    varchar(500),
    created_at  timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- ubicaciones: sedes físicas para actividades presenciales
-- ----------------------------------------------------------------------------
create table ubicaciones (
    id          uuid primary key default gen_random_uuid(),
    nombre      varchar(150) not null,
    direccion   varchar(255),
    ciudad      varchar(100),
    pais        varchar(100),
    mapa_url    varchar(500),
    created_at  timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- actividades: catálogo unificado de cursos, talleres y eventos
-- ----------------------------------------------------------------------------
create table actividades (
    id                  uuid primary key default gen_random_uuid(),
    tipo                tipo_actividad_enum not null,
    titulo              varchar(200) not null,
    categoria_id        uuid references categorias(id) on delete set null,
    descripcion         text,
    modalidad           modalidad_enum not null,
    ubicacion_id        uuid references ubicaciones(id) on delete set null,
    costo               numeric(10,2) not null default 0,
    moneda              char(3) not null default 'MXN',
    instructor_id       uuid references instructores(id) on delete set null,
    capacidad_minima    integer,
    capacidad_maxima    integer,
    fecha_inicio        timestamptz not null,
    fecha_fin           timestamptz not null,
    estado              estado_actividad_enum not null default 'borrador',
    imagen_url          varchar(500),
    created_at          timestamptz not null default now(),
    updated_at          timestamptz not null default now(),

    constraint chk_actividades_costo_no_negativo
        check (costo >= 0),
    constraint chk_actividades_capacidad
        check (capacidad_minima is null or capacidad_maxima is null or capacidad_maxima >= capacidad_minima),
    constraint chk_actividades_fechas
        check (fecha_fin >= fecha_inicio),
    constraint chk_actividades_presencial_requiere_ubicacion
        check (modalidad <> 'presencial' or ubicacion_id is not null)
);

create index idx_actividades_tipo_estado on actividades (tipo, estado);
create index idx_actividades_categoria on actividades (categoria_id);
create index idx_actividades_fecha_inicio on actividades (fecha_inicio);

create trigger trg_actividades_updated_at
    before update on actividades
    for each row execute function set_updated_at();

-- ----------------------------------------------------------------------------
-- inscripciones: une usuario + actividad. "Mis cursos" sale de aquí.
-- ----------------------------------------------------------------------------
create table inscripciones (
    id                  uuid primary key default gen_random_uuid(),
    usuario_id          uuid not null references usuarios(id) on delete cascade,
    actividad_id        uuid not null references actividades(id) on delete cascade,
    estado              estado_inscripcion_enum not null default 'pendiente_pago',
    fecha_inscripcion   timestamptz not null default now(),
    created_at          timestamptz not null default now(),
    updated_at          timestamptz not null default now(),

    constraint uk_inscripciones_usuario_actividad unique (usuario_id, actividad_id)
);

create index idx_inscripciones_usuario on inscripciones (usuario_id);
create index idx_inscripciones_actividad on inscripciones (actividad_id);
create index idx_inscripciones_estado on inscripciones (estado);

create trigger trg_inscripciones_updated_at
    before update on inscripciones
    for each row execute function set_updated_at();

-- ----------------------------------------------------------------------------
-- pagos: resultado de la pasarela de pago para actividades de costo.
-- 1 a 1 con inscripciones. Agnóstico al proveedor (Stripe, MercadoPago, etc.)
-- ----------------------------------------------------------------------------
create table pagos (
    id                      uuid primary key default gen_random_uuid(),
    inscripcion_id          uuid not null unique references inscripciones(id) on delete cascade,
    monto                   numeric(10,2) not null,
    moneda                  char(3) not null default 'MXN',
    metodo_pago             metodo_pago_enum,
    pasarela                varchar(50),
    referencia_pasarela     varchar(255),
    estado                  estado_pago_enum not null default 'pendiente',
    fecha_pago              timestamptz,
    created_at              timestamptz not null default now(),
    updated_at              timestamptz not null default now(),

    constraint chk_pagos_monto_no_negativo check (monto >= 0)
);

create index idx_pagos_estado on pagos (estado);

create trigger trg_pagos_updated_at
    before update on pagos
    for each row execute function set_updated_at();

-- ----------------------------------------------------------------------------
-- Vista: disponibilidad de cupos por actividad.
-- "Número de personas que se registraron" se calcula aquí en vez de guardarse
-- como columna, para que nunca se desincronice del estado real de inscripciones.
-- ----------------------------------------------------------------------------
create view vw_actividades_disponibilidad as
select
    a.*,
    count(i.id) filter (where i.estado = 'confirmada')                       as inscritos_confirmados,
    count(i.id) filter (where i.estado = 'lista_espera')                     as en_lista_espera,
    a.capacidad_maxima - count(i.id) filter (where i.estado = 'confirmada')  as cupos_disponibles
from actividades a
left join inscripciones i on i.actividad_id = a.id
group by a.id;

-- ============================================================================
-- Fin del script
-- ============================================================================
