import { createMiddleware } from 'hono/factory'
import { encode } from 'iconv-cp932'

export const shiftjis = createMiddleware(async (c, next) => {
  await next()
  const moto = await c.res.text()
  const encoded = encode(moto)
  c.res = new Response(encoded, c.res)
})