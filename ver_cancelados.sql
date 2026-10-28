select p.referencia_pasarela, u.correo
  from pagos p
  join inscripciones i on i.id = p.inscripcion_id
  join usuarios u on u.id = i.usuario_id
 where i.estado = 'reembolsada';

 -- node --env-file=.env --input-type=module -e "const r = await fetch('https://api.mercadopago.com/v1/payments/' + process.argv[1] + '/refunds', { method: 'POST', headers: { Authorization: 'Bearer ' + process.env.MP_ACCESS_TOKEN, 'X-Idempotency-Key': crypto.randomUUID() } }); console.log(r.status, (await r.json()).status)" REFERENCIA_PASARELA
