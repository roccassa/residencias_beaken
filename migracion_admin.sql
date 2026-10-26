-- ============================================================================
-- Migración: rol de administrador (módulo de administración)
--
-- Para una base que YA existe (creada con una versión anterior de
-- schema_postgres.sql). Una instalación nueva no la necesita: el esquema ya
-- incluye la columna "rol".
--
-- Cómo usarla en pgAdmin (Query Tool, sobre la base de Beaken):
--   1. Ejecuta el PASO 1 una sola vez.
--   2. En el PASO 2 cambia el correo por el de una cuenta YA REGISTRADA en el
--      sitio (regístrate primero en /login?modo=registro si hace falta) y
--      ejecútalo. Esa cuenta será la primera administradora; desde el panel
--      podrá dar el rol a otras personas.
-- ============================================================================

-- PASO 1: tipo y columna. Todas las cuentas existentes quedan como "usuario".
begin;

create type rol_usuario_enum as enum ('usuario', 'admin');

alter table usuarios
    add column rol rol_usuario_enum not null default 'usuario';

commit;

-- PASO 2: la primera cuenta administradora (cambia el correo).
-- Debe decir "UPDATE 1"; si dice "UPDATE 0", ese correo no tiene cuenta.
update usuarios
   set rol = 'admin'
 where correo = lower(trim('admin@beaken.mx'));

-- Comprobación: lista de administradores.
select nombre, apellido, correo, activo from usuarios where rol = 'admin';
