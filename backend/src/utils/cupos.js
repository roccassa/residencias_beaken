// Una inscripción pendiente de pago reserva su lugar un rato; pasado ese tiempo
// deja de contar y el lugar se libera (la persona puede volver a pagar si aún hay).
export const MINUTOS_RESERVA = 30

// Fragmento SQL: inscripciones que ocupan un cupo (el número es una constante, no entrada de usuario).
// Se usa sin alias de tabla, sobre `inscripciones`.
export const OCUPA_CUPO = `(estado = 'confirmada' or (estado = 'pendiente_pago' and fecha_inscripcion > now() - make_interval(mins => ${MINUTOS_RESERVA})))`

// Solo las reservas vigentes (pendientes de pago que aún conservan su lugar).
export const ES_RESERVA = `(estado = 'pendiente_pago' and fecha_inscripcion > now() - make_interval(mins => ${MINUTOS_RESERVA}))`
